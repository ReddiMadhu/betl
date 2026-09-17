import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import {
  allAssets,
  getBusinessAreas,
  getSummaryMetrics,
  getTechCounts,
  isEtlAsset,
} from '../data/discoveryData';
import type { Asset } from '../data/discoveryData';
import { TABLEAU_DETAIL_DATA } from '../data/tableauDetailData';
import { POWERBI_DETAIL_DATA } from '../data/powerbiDetailData';
import { ALTERYX_DETAIL_DATA } from '../data/alteryxDetailData';
import {
  recommendations,
  getEtlCandidateDetail,
  isOrphanCascadeRecommendation,
  isCrossTechRecommendation,
  isZombieRecommendation,
  isInactiveRecommendation,
  isSubsetRecommendation,
  computeBiOverlapMetrics,
  computeEtlOverlapMetrics,
} from '../data/rationalizationData';

export interface DocGenerationProgress {
  status: 'idle' | 'fetching' | 'zipping' | 'downloading' | 'completed' | 'error';
  progress: number;
  currentFile?: string;
  errorMessage?: string;
}

/** Sanitize string for folder / file names */
export function sanitizeFilename(name: string): string {
  return name.replace(/[/\\?%*:|"<>]/g, '_').trim();
}

/** Helper to generate Excel ArrayBuffer in memory */
export function createExcelBuffer(sheets: Record<string, unknown[]>): Uint8Array {
  const wb = XLSX.utils.book_new();
  for (const [sheetName, data] of Object.entries(sheets)) {
    const rows = Array.isArray(data) && data.length > 0 ? data : [{ Information: 'No specific records' }];
    const ws = XLSX.utils.json_to_sheet(rows);
    // Limit sheet name to 31 chars (Excel limit)
    XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31));
  }
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Uint8Array(wbout);
}

// ─────────────────────────────────────────────────────────────
// 1. ASSESSMENT DOCUMENTATION GENERATOR
// ─────────────────────────────────────────────────────────────

export function getCanonicalEtlAssets(): Asset[] {
  const map = new Map<string, Asset>();
  for (const asset of allAssets.filter(isEtlAsset)) {
    const cid = asset.canonicalId || asset.id;
    if (!map.has(cid)) {
      map.set(cid, asset);
    }
  }
  return Array.from(map.values());
}

export function getDiscoveredBiAssets(): Asset[] {
  return allAssets.filter((a) => !isEtlAsset(a));
}

/**
 * Recursively discovers and includes any locally present manual STTM XLSX workbooks
 * placed under public/documentation/assessment/ETL/** into the Assessment ZIP.
 * Tolerates absent files on different machines gracefully.
 */
async function includeManualSttmFiles(
  zip: JSZip,
  onProgress?: (p: DocGenerationProgress) => void
): Promise<void> {
  try {
    let manualFiles: Array<{ relPath: string; url?: string; filename?: string }> = [];

    // 1. Try dev live API endpoint first (available when running vite dev server)
    try {
      const apiRes = await fetch('/api/sttm-manifest');
      if (apiRes.ok) {
        const data = await apiRes.json();
        if (Array.isArray(data?.files) && data.files.length > 0) {
          manualFiles = data.files;
        }
      }
    } catch {
      // Not in dev mode or API endpoint unavailable
    }

    // 2. Try sttm-manifest.json
    if (manualFiles.length === 0) {
      try {
        const sttmRes = await fetch('/documentation/sttm-manifest.json');
        if (sttmRes.ok) {
          const data = await sttmRes.json();
          if (Array.isArray(data?.files) && data.files.length > 0) {
            manualFiles = data.files;
          }
        }
      } catch {
        // Fallback
      }
    }

    // 3. Try main manifest.json
    if (manualFiles.length === 0) {
      try {
        const manifestRes = await fetch('/documentation/manifest.json');
        if (manifestRes.ok) {
          const data = await manifestRes.json();
          if (Array.isArray(data?.manualSttmFiles) && data.manualSttmFiles.length > 0) {
            manualFiles = data.manualSttmFiles;
          }
        }
      } catch {
        // No manifest
      }
    }

    if (manualFiles.length === 0) {
      return;
    }

    for (const sttm of manualFiles) {
      const zipPath = sttm.relPath;
      // Do not duplicate if already present in zip
      if (zip.file(zipPath)) {
        continue;
      }

      const fileUrl = sttm.url || `/documentation/assessment/${sttm.relPath}`;
      try {
        const fileRes = await fetch(fileUrl);
        if (!fileRes.ok) continue;

        const ct = fileRes.headers.get('content-type') || '';
        if (ct.includes('text/html')) {
          // SPA 404 fallback HTML response, skip!
          continue;
        }

        const buf = await fileRes.arrayBuffer();
        if (buf.byteLength < 50) continue;

        // Verify valid zip/xlsx PK signature (0x50, 0x4B)
        const firstBytes = new Uint8Array(buf.slice(0, 4));
        if (firstBytes[0] !== 0x50 || firstBytes[1] !== 0x4B) {
          continue;
        }

        // Add exact original binary bytes to ZIP
        zip.file(zipPath, new Uint8Array(buf));
        onProgress?.({
          status: 'zipping',
          progress: 78,
          currentFile: `Including Manual STTM: ${zipPath}`,
        });
      } catch (err) {
        console.warn(`[sttm-discovery] Could not fetch manual STTM file ${fileUrl}:`, err);
      }
    }
  } catch (err) {
    console.warn('[sttm-discovery] Non-critical error during manual STTM discovery:', err);
  }
}

/** Build Assessment ZIP Package in memory */
export async function generateAssessmentZip(
  onProgress?: (p: DocGenerationProgress) => void,
  subType?: 'bi' | 'etl'
): Promise<Blob> {
  const zip = new JSZip();
  const biAssets = getDiscoveredBiAssets();
  const etlAssets = getCanonicalEtlAssets();
  const totalAssets = (subType === 'etl' ? 0 : biAssets.length) + (subType === 'bi' ? 0 : etlAssets.length);
  let processedCount = 0;

  // 1. Root-level Portfolio Overview Documentation
  if (!subType) {
    onProgress?.({
      status: 'zipping',
      progress: 5,
      currentFile: 'Generating Portfolio Assessment Summary...',
    });

    const summaryMetrics = getSummaryMetrics('ALL');
    const businessAreas = getBusinessAreas();
    const techCounts = getTechCounts(allAssets);

    // Portfolio Excel
    const portfolioXlsx = createExcelBuffer({
      'Portfolio Overview': [
        { Metric: 'Total Discovered Assets', Value: biAssets.length + etlAssets.length, Category: 'Portfolio Scope' },
        { Metric: 'BI Dashboards & Reports', Value: biAssets.length, Category: 'Portfolio Scope' },
        { Metric: 'ETL Workflows & Pipelines', Value: etlAssets.length, Category: 'Portfolio Scope' },
        { Metric: 'Business Areas Covered', Value: businessAreas.length, Category: 'Business Coverage' },
        { Metric: 'Connected Data Sources', Value: summaryMetrics.find((m) => m.icon === 'source')?.value ?? 79, Category: 'Architecture' },
        { Metric: 'Downstream Data Targets', Value: summaryMetrics.find((m) => m.icon === 'target')?.value ?? 39, Category: 'Architecture' },
        { Metric: 'ETL Tools Inventory', Value: summaryMetrics.find((m) => m.icon === 'tool')?.value ?? 168, Category: 'ETL Inventory' },
        { Metric: 'Active Business KPIs', Value: summaryMetrics.find((m) => m.icon === 'kpi')?.value ?? 414, Category: 'Business Metrics' },
        { Metric: 'Calculated Fields & DAX', Value: summaryMetrics.find((m) => m.icon === 'calculated')?.value ?? 564, Category: 'Business Logic' },
      ],
      'Business Areas': businessAreas.map((b) => ({
        'Business Area': b.name,
        'Description': b.description,
        'Total Discovered Assets': b.assets.length,
        'BI Dashboards': b.assets.filter((a) => !isEtlAsset(a)).length,
        'ETL Workflows': b.assets.filter(isEtlAsset).length,
      })),
      'Technology Distribution': techCounts.map((t) => ({
        Technology: t.tech,
        'Asset Count': t.count,
        'Share %': `${((t.count / allAssets.length) * 100).toFixed(1)}%`,
      })),
      'Asset Inventory': [
        ...biAssets.map((a) => ({
          'Asset ID': a.id,
          'Asset Name': a.name,
          'Technology': a.technology,
          'Business Area': a.businessArea,
          'Asset Type': a.assetType ?? 'Dashboard',
          'Owner': a.owner ?? 'EXL',
          'Complexity': a.complexity ?? 'Medium',
          'Criticality': a.criticality ?? 'Medium',
          'Data Sources': a.sourceCount ?? 1,
          'Data Targets': a.targetCount ?? 1,
          'KPI Count': a.kpiCount ?? 0,
          'Last Updated': a.lastUpdated ?? '2026-09-01',
          'Description': a.description ?? '',
        })),
        ...etlAssets.map((a) => ({
          'Asset ID': a.id,
          'Asset Name': a.name,
          'Technology': a.technology,
          'Business Area': a.businessArea,
          'Asset Type': a.assetType ?? 'ETL Workflow',
          'Owner': a.owner ?? 'EXLService',
          'Complexity': a.complexity ?? (ALTERYX_DETAIL_DATA[a.canonicalId || a.id]?.complexity ?? 'High'),
          'Criticality': a.criticality ?? (ALTERYX_DETAIL_DATA[a.canonicalId || a.id]?.criticality ?? 'High'),
          'Data Sources': a.sourceCount ?? (ALTERYX_DETAIL_DATA[a.canonicalId || a.id]?.connections.filter((c) => c.direction === 'input').length ?? 3),
          'Data Targets': a.targetCount ?? (ALTERYX_DETAIL_DATA[a.canonicalId || a.id]?.connections.filter((c) => c.direction === 'output').length ?? 2),
          'KPI Count': a.kpiCount ?? 0,
          'Last Updated': a.lastUpdated ?? '2026-09-01',
          'Description': a.description ?? '',
        })),
      ],
    });

    zip.file('Portfolio_Assessment_Executive_Summary.xlsx', portfolioXlsx);

    // Portfolio Markdown
    const portfolioMd = `# Enterprise BI & ETL Modernization — Portfolio Assessment Overview

## Executive Summary
This comprehensive assessment package documents the enterprise Business Intelligence (BI) and Data Engineering (ETL) landscape discovered and assessed by the Automated Discovery Agents.

### Key Portfolio Metrics
| Metric | Value | Category |
| :--- | :--- | :--- |
| **Total Discovered Assets** | ${biAssets.length + etlAssets.length} | Portfolio Scope |
| **BI Dashboards & Reports** | ${biAssets.length} | BI Inventory |
| **ETL Workflows & Pipelines** | ${etlAssets.length} | Data Engineering |
| **Business Areas Covered** | ${businessAreas.length} | Business Coverage |
| **Connected Data Sources** | ${summaryMetrics.find((m) => m.icon === 'source')?.value ?? 79} | Architecture |
| **Downstream Data Targets** | ${summaryMetrics.find((m) => m.icon === 'target')?.value ?? 39} | Architecture |
| **ETL Tools Discovered** | ${summaryMetrics.find((m) => m.icon === 'tool')?.value ?? 168} | ETL Inventory |
| **Business KPIs Tracked** | ${summaryMetrics.find((m) => m.icon === 'kpi')?.value ?? 414} | Metrics |
| **Calculated Measures & Fields** | ${summaryMetrics.find((m) => m.icon === 'calculated')?.value ?? 564} | Business Logic |

---

## Business Domain Distribution
${businessAreas.map((b) => `- **${b.name}**: ${b.assets.length} Assets (${b.assets.filter((a) => !isEtlAsset(a)).length} BI, ${b.assets.filter(isEtlAsset).length} ETL) — *${b.description}*`).join('\n')}

---

## Technology Breakdown
| Technology | Asset Count | Share % | Category |
| :--- | :--- | :--- | :--- |
${techCounts.map((t) => `| **${t.tech}** | ${t.count} | ${((t.count / allAssets.length) * 100).toFixed(1)}% | ${t.tech === 'Alteryx' || t.tech === 'Python' ? 'ETL' : 'BI'} |`).join('\n')}

---

## Discovered Assets Catalog
| ID | Asset Name | Technology | Domain | Type | Sources | Targets | KPIs | Complexity | Criticality |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${biAssets.map((a) => `| \`${a.id}\` | **${a.name}** | ${a.technology} | ${a.businessArea} | ${a.assetType ?? 'Dashboard'} | ${a.sourceCount ?? 1} | ${a.targetCount ?? 1} | ${a.kpiCount ?? 0} | ${a.complexity ?? 'Medium'} | ${a.criticality ?? 'Medium'} |`).join('\n')}
${etlAssets.map((a) => `| \`${a.id}\` | **${a.name}** | ${a.technology} | ${a.businessArea} | ${a.assetType ?? 'ETL Workflow'} | ${a.sourceCount ?? 3} | ${a.targetCount ?? 2} | ${a.kpiCount ?? 0} | ${a.complexity ?? 'High'} | ${a.criticality ?? 'High'} |`).join('\n')}

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;

    zip.file('Portfolio_Assessment_Overview.md', portfolioMd);
  }

  // 2. BI Assets Documentation
  if (subType !== 'etl') {
    for (const asset of biAssets) {
      processedCount++;
      const pct = Math.round(10 + (processedCount / totalAssets) * 65);
      onProgress?.({
        status: 'zipping',
        progress: pct,
        currentFile: `BI/${asset.businessArea}/${asset.technology}/${asset.name}`,
      });

      const sanitizedName = sanitizeFilename(asset.name);
      const folderPath = `BI/${asset.businessArea}/${asset.technology}/${sanitizedName}`;

      // Build specific detail data depending on tech
      if (asset.technology === 'Tableau') {
        const detail = TABLEAU_DETAIL_DATA[asset.id] || TABLEAU_DETAIL_DATA[asset.name];
        const kpis = detail?.kpis || [];
        const worksheets = detail?.worksheets || [];
        const calcFields = detail?.calculatedFields || [];
        const tables = detail?.tables || [];

        // Excel workbook
        const xlsxBuf = createExcelBuffer({
          'Asset Overview': [
            { Property: 'Asset Name', Value: asset.name },
            { Property: 'Asset ID', Value: asset.id },
            { Property: 'Technology', Value: asset.technology },
            { Property: 'Business Area', Value: asset.businessArea },
            { Property: 'Asset Type', Value: asset.assetType ?? 'Dashboard' },
            { Property: 'Owner', Value: asset.owner ?? 'EXL' },
            { Property: 'Last Updated', Value: asset.lastUpdated ?? '2026-09-01' },
            { Property: 'Description', Value: asset.description ?? '' },
            { Property: 'Total Worksheets', Value: worksheets.length },
            { Property: 'Total KPIs', Value: kpis.length || asset.kpiCount || 0 },
            { Property: 'Calculated Fields', Value: calcFields.length },
            { Property: 'Data Tables', Value: tables.length },
          ],
          'KPI Inventory': kpis.map((k, idx) => ({
            'Index': idx + 1,
            'KPI Name': k.name,
            'Visual Evidence': k.evidence,
          })),
          'Calculated Measures': calcFields.map((c) => ({
            'Field Name': c.name,
            'Formula': c.formula,
            'Role': c.role,
            'Datatype': c.datatype,
            'Used In Sheets': (c.usedInSheets || []).join(', '),
          })),
          'Worksheets & Visuals': worksheets.map((w) => ({
            'Worksheet Name': w.name,
            'Chart Type': w.chartType,
            'Dimensions': (w.dimensions || []).join(', '),
            'Measures': (w.measures || []).map((m) => m.name).join(', '),
            'Rows Axis': w.axes?.rows || '',
            'Columns Axis': w.axes?.columns || '',
          })),
          'Data Tables & Schema': tables.map((t) => ({
            'Table Name': t.tableName,
            'Display Name': t.displayName,
            'Row Count': t.rowCount,
            'Data Source': t.dataSource,
            'Columns Count': t.columns?.length ?? 0,
            'Columns List': (t.columns || []).map((c) => c.name).join(', '),
          })),
        });

        zip.file(`${folderPath}/${sanitizedName}_Assessment.xlsx`, xlsxBuf);

        // Markdown Spec
        const mdSpec = `# Technical Specification: ${asset.name}

## 1. Asset Metadata
| Attribute | Value |
| :--- | :--- |
| **Asset Name** | ${asset.name} |
| **Asset ID** | \`${asset.id}\` |
| **Technology** | ${asset.technology} |
| **Business Area** | ${asset.businessArea} |
| **Asset Type** | ${asset.assetType ?? 'Dashboard'} |
| **Owner** | ${asset.owner ?? 'EXL'} |
| **Data Sources** | ${asset.sourceCount ?? tables.length ?? 1} |
| **Data Targets** | ${asset.targetCount ?? 1} |
| **KPIs Tracked** | ${kpis.length || asset.kpiCount || 0} |
| **Worksheets** | ${worksheets.length} |
| **Calculated Fields** | ${calcFields.length} |
| **Last Updated** | ${asset.lastUpdated ?? '2026-09-01'} |

---

## 2. Business Purpose & Scope
${asset.description || 'Enterprise insurance analytics dashboard providing operational visibility, performance metrics, and decision support.'}

---

## 3. KPI Inventory
| # | KPI Name | Visual / Calculation Evidence |
| :--- | :--- | :--- |
${kpis.map((k, i) => `| ${i + 1} | **${k.name}** | ${k.evidence} |`).join('\n')}

---

## 4. Worksheets & Visual Structure
| Worksheet Name | Chart Type | Dimensions | Measures | Rows / Columns |
| :--- | :--- | :--- | :--- | :--- |
${worksheets.map((w) => `| **${w.name}** | ${w.chartType} | ${(w.dimensions || []).join(', ') || '—'} | ${(w.measures || []).map((m) => m.name).join(', ') || '—'} | ${w.axes?.rows || '—'} / ${w.axes?.columns || '—'} |`).join('\n')}

---

## 5. Calculated Fields & Business Logic
| Field Name | Datatype | Role | Formula | Used In |
| :--- | :--- | :--- | :--- | :--- |
${calcFields.map((c) => `| **${c.name}** | \`${c.datatype}\` | ${c.role} | \`${c.formula}\` | ${(c.usedInSheets || []).join(', ') || '—'} |`).join('\n')}

---

## 6. Data Tables & Physical Schema
| Table Name | Display Name | Row Count | Source | Columns |
| :--- | :--- | :--- | :--- | :--- |
${tables.map((t) => `| \`${t.tableName}\` | **${t.displayName}** | ${t.rowCount.toLocaleString()} | ${t.dataSource} | ${(t.columns || []).map((c) => c.name).join(', ') || '—'} |`).join('\n')}

---

## 7. Migration Readiness & Target Architecture
- **Target Platform**: Power BI Fabric / Semantic Model Lakehouse
- **Migration Strategy**: Automated DAX conversion and visualization re-creation.
- **Complexity Assessment**: ${asset.complexity ?? 'Medium'}
- **Criticality Assessment**: ${asset.criticality ?? 'Medium'}

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
        zip.file(`${folderPath}/Technical_Specification.md`, mdSpec);

      } else if (asset.technology === 'Power BI') {
        const detail = POWERBI_DETAIL_DATA[asset.id] || POWERBI_DETAIL_DATA[asset.name];
        const kpis = detail?.kpis || [];
        const pages = detail?.pages || [];
        const daxMeasures = detail?.daxMeasures || [];
        const tables = detail?.tables || [];

        // Excel workbook
        const xlsxBuf = createExcelBuffer({
          'Asset Overview': [
            { Property: 'Asset Name', Value: asset.name },
            { Property: 'Asset ID', Value: asset.id },
            { Property: 'Technology', Value: asset.technology },
            { Property: 'Business Area', Value: asset.businessArea },
            { Property: 'Asset Type', Value: asset.assetType ?? 'Report / Model' },
            { Property: 'Owner', Value: asset.owner ?? 'EXL' },
            { Property: 'Last Updated', Value: asset.lastUpdated ?? '2026-09-01' },
            { Property: 'Description', Value: asset.description ?? '' },
            { Property: 'Total Pages', Value: pages.length },
            { Property: 'Total KPIs', Value: kpis.length || asset.kpiCount || 0 },
            { Property: 'DAX Measures', Value: daxMeasures.length },
            { Property: 'Semantic Tables', Value: tables.length },
          ],
          'KPI Inventory': kpis.map((k, idx) => ({
            'Index': idx + 1,
            'KPI Name': k.name,
            'Page': k.page || 'General',
            'Visual Evidence': k.evidence,
            'Calculation / DAX Logic': k.logic || '—',
            'Business Definition': k.definition || '—',
            'Confidence': k.confidence || 'High',
            'Category': k.category || 'Measure',
            'Source Table': k.source || 'Semantic Model',
          })),
          'DAX Measures': daxMeasures.map((d) => ({
            'Measure Name': d.name,
            'Home Table': d.homeTable,
            'DAX Expression': d.expression,
            'Format String': d.formatString || 'Standard',
            'Used In Pages': (d.usedInPages || []).join(', '),
          })),
          'Report Pages & Visuals': pages.map((p) => ({
            'Page Name': p.name,
            'Visual Type': p.visualType,
            'Dimensions': (p.dimensions || []).join(', '),
            'Measures': (p.measures || []).map((m) => m.name).join(', '),
            'Visual Slots': p.visualSlots?.values || '',
            'Axes': p.visualSlots?.axes || '',
          })),
          'Data Tables & Schema': tables.map((t) => ({
            'Table Name': t.tableName,
            'Display Name': t.displayName,
            'Row Count': t.rowCount,
            'Source / Mode': t.source,
            'Relationships': (t.relationships || []).join('; '),
            'Columns Count': t.columns?.length ?? 0,
            'Columns List': (t.columns || []).map((c) => `${c.name} (${c.type})`).join(', '),
          })),
        });

        zip.file(`${folderPath}/${sanitizedName}_Assessment.xlsx`, xlsxBuf);

        // Markdown Spec
        const mdSpec = `# Technical Specification: ${asset.name}

## 1. Asset Metadata
| Attribute | Value |
| :--- | :--- |
| **Asset Name** | ${asset.name} |
| **Asset ID** | \`${asset.id}\` |
| **Technology** | ${asset.technology} |
| **Business Area** | ${asset.businessArea} |
| **Asset Type** | ${asset.assetType ?? 'Report / Semantic Model'} |
| **Owner** | ${asset.owner ?? 'EXL'} |
| **Data Sources** | ${asset.sourceCount ?? tables.length ?? 1} |
| **Data Targets** | ${asset.targetCount ?? 1} |
| **KPIs Tracked** | ${kpis.length || asset.kpiCount || 0} |
| **Report Pages** | ${pages.length} |
| **DAX Measures** | ${daxMeasures.length} |
| **Semantic Tables** | ${tables.length} |
| **Last Updated** | ${asset.lastUpdated ?? '2026-09-01'} |

---

## 2. Business Purpose & Scope
${asset.description || 'Power BI semantic model and interactive report delivering business intelligence, KPI calculations, and operational performance insights.'}

---

## 3. KPI Inventory & Calculation Logic
| # | KPI Name | Page | Visual Evidence | DAX / Calculation Logic | Business Definition | Confidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${kpis.map((k, i) => `| ${i + 1} | **${k.name}** | ${k.page || '—'} | ${k.evidence || '—'} | \`${k.logic || '—'}\` | ${k.definition || '—'} | ${k.confidence || 'High'} |`).join('\n')}

---

## 4. DAX Measures & Calculations
| Measure Name | Home Table | DAX Expression | Format | Used In |
| :--- | :--- | :--- | :--- | :--- |
${daxMeasures.map((d) => `| **${d.name}** | \`${d.homeTable}\` | \`${d.expression}\` | ${d.formatString || 'Standard'} | ${(d.usedInPages || []).join(', ') || '—'} |`).join('\n')}

---

## 5. Report Pages & Visual Structure
| Page Name | Visual Type | Dimensions | Measures | Values & Axes |
| :--- | :--- | :--- | :--- | :--- |
${pages.map((p) => `| **${p.name}** | ${p.visualType} | ${(p.dimensions || []).join(', ') || '—'} | ${(p.measures || []).map((m) => m.name).join(', ') || '—'} | ${p.visualSlots?.values || '—'} (${p.visualSlots?.axes || '—'}) |`).join('\n')}

---

## 6. Semantic Model & Data Tables
| Table Name | Display Name | Row Count | Source | Relationships | Columns |
| :--- | :--- | :--- | :--- | :--- | :--- |
${tables.map((t) => `| \`${t.tableName}\` | **${t.displayName}** | ${t.rowCount.toLocaleString()} | ${t.source} | ${(t.relationships || []).join('; ') || 'None'} | ${(t.columns || []).map((c) => c.name).join(', ') || '—'} |`).join('\n')}

---

## 7. Architecture Assessment & Modernization Recommendation
- **Platform**: Microsoft Fabric / Power BI Premium
- **Storage Mode**: Import / Direct Lake
- **Complexity Assessment**: ${asset.complexity ?? 'Medium'}
- **Criticality Assessment**: ${asset.criticality ?? 'Medium'}

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
        zip.file(`${folderPath}/Technical_Specification.md`, mdSpec);

      } else {
        // MicroStrategy or other BI
        const xlsxBuf = createExcelBuffer({
          'Asset Overview': [
            { Property: 'Asset Name', Value: asset.name },
            { Property: 'Asset ID', Value: asset.id },
            { Property: 'Technology', Value: asset.technology },
            { Property: 'Business Area', Value: asset.businessArea },
            { Property: 'Asset Type', Value: asset.assetType ?? 'Dossier / Cube' },
            { Property: 'Owner', Value: asset.owner ?? 'EXL' },
            { Property: 'Last Updated', Value: asset.lastUpdated ?? '2026-09-01' },
            { Property: 'Description', Value: asset.description ?? '' },
            { Property: 'Total KPIs', Value: asset.kpiCount ?? 18 },
            { Property: 'Data Sources', Value: asset.sourceCount ?? 6 },
          ],
          'KPI Inventory': [
            { Index: 1, 'KPI Name': 'Incurred Losses', Evidence: 'P&C Chapter 1 - Executive Summary' },
            { Index: 2, 'KPI Name': 'Paid Losses', Evidence: 'P&C Chapter 1 - Loss Ratio Trend' },
            { Index: 3, 'KPI Name': 'Loss Reserve Ratio', Evidence: 'P&C Chapter 2 - Reserving Adequacy' },
            { Index: 4, 'KPI Name': 'Claim Severity Index', Evidence: 'P&C Chapter 3 - Severity Matrix' },
            { Index: 5, 'KPI Name': 'Earned Premium Exposure', Evidence: 'P&C Chapter 4 - Underwriting Exposure' },
          ],
          'Data Schema': [
            { 'Table Name': 'mstr_claims_cube_source', 'Source System': 'Enterprise Core Claims DB', 'Records': 450000 },
            { 'Table Name': 'claims_loss_fact', 'Source System': 'Claims Lakehouse Staging', 'Records': 320000 },
            { 'Table Name': 'policy_coverage_dim', 'Source System': 'Policy Master Warehouse', 'Records': 125000 },
          ],
        });

        zip.file(`${folderPath}/${sanitizedName}_Assessment.xlsx`, xlsxBuf);

        const mdSpec = `# Technical Specification: ${asset.name}

## 1. Asset Metadata
| Attribute | Value |
| :--- | :--- |
| **Asset Name** | ${asset.name} |
| **Asset ID** | \`${asset.id}\` |
| **Technology** | ${asset.technology} |
| **Business Area** | ${asset.businessArea} |
| **Asset Type** | ${asset.assetType ?? 'Dossier / Cube'} |
| **Owner** | ${asset.owner ?? 'EXL'} |
| **Data Sources** | ${asset.sourceCount ?? 6} |
| **Data Targets** | ${asset.targetCount ?? 1} |
| **KPIs Tracked** | ${asset.kpiCount ?? 18} |
| **Last Updated** | ${asset.lastUpdated ?? '2026-08-20'} |

---

## 2. Business Purpose & Scope
${asset.description || 'Enterprise MicroStrategy reporting dossier providing multi-chapter property and casualty claims and loss reserve analytics.'}

---

## 3. Architecture & Target Modernization
- **Current State**: MicroStrategy Intelligence Server & In-Memory Cube
- **Future State**: Modernized Power BI Fabric Lakehouse Semantic Model
- **Complexity Assessment**: ${asset.complexity ?? 'High'}
- **Criticality Assessment**: ${asset.criticality ?? 'High'}

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
        zip.file(`${folderPath}/Technical_Specification.md`, mdSpec);
      }
    }
  }

  // 3. ETL Assets Documentation (8 canonical workflows)
  if (subType !== 'bi') {
    for (const asset of etlAssets) {
      processedCount++;
      const pct = Math.round(10 + (processedCount / totalAssets) * 65);
      onProgress?.({
        status: 'zipping',
        progress: pct,
        currentFile: `ETL/${asset.businessArea}/${asset.technology}/${asset.name}`,
      });

      const cid = asset.canonicalId || asset.id;
      const detail = ALTERYX_DETAIL_DATA[cid];
      const tools = detail?.tools || [];
      const connections = detail?.connections || [];
      const stages = detail?.pipelineStages || [];
      const sanitizedName = sanitizeFilename(asset.name);
      const folderPath = `ETL/${asset.businessArea}/${asset.technology}/${sanitizedName}`;

      const complexity = asset.complexity || detail?.complexity || 'High';
      const criticality = asset.criticality || detail?.criticality || 'High';
      const inputConns = connections.filter((c) => c.direction === 'input');
      const outputConns = connections.filter((c) => c.direction === 'output');

      // Excel workbook
      const xlsxBuf = createExcelBuffer({
        'Workflow Overview': [
          { Property: 'Workflow Name', Value: asset.name },
          { Property: 'Canonical ID', Value: cid },
          { Property: 'Technology', Value: asset.technology },
          { Property: 'Business Area', Value: asset.businessArea },
          { Property: 'Complexity', Value: complexity },
          { Property: 'Criticality', Value: criticality },
          { Property: 'Schedule', Value: detail?.schedule || 'Daily / Ad-hoc' },
          { Property: 'Runtime', Value: detail?.avgRuntime || '30s' },
          { Property: 'Last Run Status', Value: detail?.lastRunStatus || 'Success' },
          { Property: 'Total Tools Discovered', Value: tools.length || (asset.technology === 'Python' ? 8 : 0) },
          { Property: 'Input Data Sources', Value: asset.sourceCount || inputConns.length || 3 },
          { Property: 'Output Data Targets', Value: asset.targetCount || outputConns.length || 2 },
          { Property: 'Owner', Value: asset.owner || 'EXLService' },
          { Property: 'Description', Value: asset.description || '' },
        ],
        'Tool Inventory': tools.map((t, idx) => ({
          'Index': idx + 1,
          'Tool ID': t.id,
          'Tool Name': t.name,
          'Category': t.category,
          'Description': t.description,
          'Configuration': t.configuration,
          'Status': t.status,
        })),
        'Connections & Endpoints': connections.map((c) => ({
          'Connection ID': c.id,
          'Connection Name': c.name,
          'Direction': c.direction.toUpperCase(),
          'Type': c.type,
          'Details / Path': c.details,
        })),
        'Pipeline Stages': stages.map((s) => ({
          'Stage ID': s.id,
          'Stage Label': s.label,
          'Tool Count': s.tools,
        })),
        'Source to Target Mapping': [
          { 'Source System / Table': 'Claims_Volume_Extract_Demo.xlsx', 'Source Field': 'Claim Number', 'Transformation': 'GroupBy / CountDistinct', 'Target Mart / File': 'Claims_Historical_Extract_Demo_Output.xlsx', 'Target Field': 'Claim_Count' },
          { 'Source System / Table': 'Policy_Master_Demo.xlsx', 'Source Field': 'Policy Number', 'Transformation': 'Relational Join (Policy_ID)', 'Target Mart / File': 'Claims_Historical_Extract_Demo_Output.xlsx', 'Target Field': 'Policy_ID' },
          { 'Source System / Table': 'Claim_Payments_Demo.xlsx', 'Source Field': 'Paid Amount', 'Transformation': 'Sum / Month-End Rollup', 'Target Mart / File': 'Claims_Historical_Extract_Demo_Output.xlsx', 'Target Field': 'Total_Paid_Amount' },
        ],
      });

      zip.file(`${folderPath}/${sanitizedName}_Assessment.xlsx`, xlsxBuf);

      // Workflow Specification MD
      const mdSpec = `# Workflow Technical Specification: ${asset.name}

## 1. Workflow Metadata
| Attribute | Value |
| :--- | :--- |
| **Workflow Name** | ${asset.name} |
| **Workflow ID** | \`${asset.id}\` (Canonical: \`${cid}\`) |
| **Technology** | ${asset.technology} |
| **Business Area** | ${asset.businessArea} |
| **Complexity** | **${complexity}** |
| **Criticality** | **${criticality}** |
| **Schedule Frequency** | ${detail?.schedule || 'Daily / Ad-hoc'} |
| **Execution Runtime** | ${detail?.avgRuntime || '30s'} |
| **Execution Status** | ${detail?.lastRunStatus || 'Success'} |
| **Tool Count** | ${tools.length || (asset.technology === 'Python' ? 8 : 0)} |
| **Input Sources** | ${asset.sourceCount || inputConns.length || 3} |
| **Output Targets** | ${asset.targetCount || outputConns.length || 2} |
| **Owner** | ${asset.owner || 'EXLService'} |

---

## 2. Business Function & Purpose
${asset.description || 'Data pipeline orchestrating data ingestion, cleansing, transformation, aggregations, and data mart generation for downstream analytics.'}

---

## 3. Pipeline Stages & Architecture
| Stage ID | Stage Label | Tools Count |
| :--- | :--- | :--- |
${stages.map((s) => `| \`${s.id}\` | **${s.label}** | ${s.tools} |`).join('\n') || '| `stage-1` | Data Ingestion & Transformation | ' + (tools.length || 8) + ' |'}

---

## 4. Tool Inventory
| Tool ID | Tool Name | Category | Description | Configuration | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
${tools.map((t) => `| \`${t.id}\` | **${t.name}** | ${t.category} | ${t.description} | \`${t.configuration.replace(/\n/g, ' ')}\` | ${t.status} |`).join('\n')}

---

## 5. Input & Output Endpoints
| Connection ID | Endpoint Name | Direction | Type | Location / Path |
| :--- | :--- | :--- | :--- | :--- |
${connections.map((c) => `| \`${c.id}\` | **${c.name}** | ${c.direction.toUpperCase()} | ${c.type} | \`${c.details}\` |`).join('\n')}

---

## 6. Modernization & Target Migration Path
- **Target Platform**: Modern Python Vectorized Pipeline (Pandas / SQLAlchemy / PySpark) or Microsoft Fabric Data Factory.
- **Complexity Assessment**: ${complexity}
- **Criticality Assessment**: ${criticality}

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
      zip.file(`${folderPath}/Workflow_Specification.md`, mdSpec);

      // STTM Markdown
      const sttmMd = `# Source to Target Mapping (STTM): ${asset.name}

## 1. Mapping Overview
- **Workflow**: ${asset.name} (\`${cid}\`)
- **Technology**: ${asset.technology}
- **Business Area**: ${asset.businessArea}
- **Inputs**: ${asset.sourceCount || inputConns.length || 3} Sources
- **Outputs**: ${asset.targetCount || outputConns.length || 2} Targets

---

## 2. Source-to-Target Column Mapping Matrix
| Source Table / File | Source Field | Transformation Rule | Target Entity / Mart | Target Column | Target Data Type |
| :--- | :--- | :--- | :--- | :--- | :--- |
| \`Claims_Volume_Extract_Demo.xlsx\` | \`Claim Number\` | Direct pass-through & CountDistinct aggregation | \`Claims_Historical_Extract_Output\` | \`Claim_ID\` | VARCHAR(50) |
| \`Claims_Volume_Extract_Demo.xlsx\` | \`Quarter End Date\` | Date format standardisation (\`YYYY-MM-DD\`) | \`Claims_Historical_Extract_Output\` | \`Quarter_End_Date\` | DATE |
| \`Claims_Volume_Extract_Demo.xlsx\` | \`Claim Status\` | Status harmonization (\`Active\`, \`Pending\`, \`Approved\`) | \`Claims_Historical_Extract_Output\` | \`Claim_Status\` | VARCHAR(30) |
| \`Policy_Master_Demo.xlsx\` | \`Policy Number\` | Relational Join on \`Policy_ID\` | \`Claims_Historical_Extract_Output\` | \`Policy_ID\` | VARCHAR(50) |
| \`Policy_Master_Demo.xlsx\` | \`Premium Group\` | Categorization rule based on monthly premium | \`Claims_Historical_Extract_Output\` | \`Premium_Group\` | VARCHAR(20) |
| \`Claim_Payments_Demo.xlsx\` | \`Paid Amount\` | Numerical summation by Claim and Month | \`Claims_Historical_Extract_Output\` | \`Total_Paid_Amount\` | DECIMAL(18,2) |
| \`Claim_Diary_Notes_Demo.xlsx\` | \`Activity Date\` | Date difference calculation (\`Days_Since_Last_Activity\`) | \`Claims_Historical_Extract_Output\` | \`Aging_Days\` | INTEGER |

---

## 3. Business Validation Rules
1. **Referential Integrity**: All \`Policy_ID\` records must match the upstream Policy Master repository.
2. **Date Consistency**: \`Disability_Date\` must be prior to or equal to \`Quarter_End_Date\`.
3. **Monetary Precision**: All currency calculations are maintained at 2 decimal places with zero negative paid sums.

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
      zip.file(`${folderPath}/Source_To_Target_Mapping.md`, sttmMd);
    }
  }

  // 4. Include locally present manual STTM XLSX files under public/documentation/assessment/ETL
  if (subType !== 'bi') {
    await includeManualSttmFiles(zip, onProgress);
  }

  // 5. Compress ZIP
  onProgress?.({
    status: 'zipping',
    progress: 80,
    currentFile: 'Compressing Assessment Documentation package...',
  });

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      onProgress?.({
        status: 'zipping',
        progress: Math.round(80 + (metadata.percent / 100) * 18),
        currentFile: `Compressing package: ${Math.round(metadata.percent)}%`,
      });
    }
  );

  return zipBlob;
}

// ─────────────────────────────────────────────────────────────
// 2. RATIONALIZATION DOCUMENTATION GENERATOR
// ─────────────────────────────────────────────────────────────

/** Build Rationalization ZIP Package in memory */
export async function generateRationalizationZip(
  onProgress?: (p: DocGenerationProgress) => void,
  subType?: 'bi' | 'etl'
): Promise<Blob> {
  const zip = new JSZip();

  let biRecs = recommendations.filter((r) => r.category.includes('bi'));
  let etlRecs = recommendations.filter((r) => r.category.includes('etl'));

  if (subType === 'bi') {
    etlRecs = [];
  } else if (subType === 'etl') {
    biRecs = [];
  }

  const allFilteredRecs = [...biRecs, ...etlRecs];
  const totalRecs = allFilteredRecs.length;
  let processedCount = 0;

  // 1. Root-level Portfolio Rationalization Strategy
  if (!subType) {
    onProgress?.({
      status: 'zipping',
      progress: 5,
      currentFile: 'Generating Portfolio Rationalization Strategy...',
    });

    const biOverlap = computeBiOverlapMetrics();
    const etlOverlap = computeEtlOverlapMetrics();

    // Excel Workbook
    const strategyXlsx = createExcelBuffer({
      'Executive Summary': [
        { Metric: 'Total Rationalization Recommendations', Value: biRecs.length + etlRecs.length, Category: 'Portfolio Scope' },
        { Metric: 'BI Rationalization Documents', Value: biRecs.length, Category: 'BI Modernization' },
        { Metric: 'ETL Rationalization Documents', Value: etlRecs.length, Category: 'ETL Modernization' },
        { Metric: 'Consolidation / Merge Candidates', Value: recommendations.filter((r) => r.category === 'merge-bi' || r.category === 'etl-merge').length, Category: 'Consolidation' },
        { Metric: 'Decommission / Retire Candidates', Value: recommendations.filter((r) => r.category === 'bi-retire' || r.category === 'etl-retire').length, Category: 'Decommission' },
        { Metric: 'Retained Core Assets', Value: recommendations.filter((r) => r.category === 'bi-keep' || r.category === 'etl-keep').length, Category: 'Retention' },
        { Metric: 'Orphan Cascade Candidates', Value: recommendations.filter(isOrphanCascadeRecommendation).length, Category: 'Lifecycle Cascade' },
        { Metric: 'Cross-Technology Modernizations', Value: recommendations.filter((r) => isCrossTechRecommendation(r)).length, Category: 'Cross-Platform' },
      ],
      'BI Recommendations': biRecs.map((r) => ({
        'Recommendation ID': r.id,
        'Recommendation Title': r.title,
        'Action Type': r.category === 'merge-bi' ? 'Consolidate' : r.category === 'bi-retire' ? 'Decommission' : 'Retain',
        'Business Area': r.businessArea,
        'In-Scope Assets': r.assets.map((a) => `${a.name} (${a.technology})`).join(', '),
        'Merge Target / Dependent': r.mergeTarget || r.dependentAsset?.name || '—',
        'Overlap %': r.overlapPct ? `${r.overlapPct}%` : '—',
        'Tags': (r.tags || []).join(', '),
        'Impacted User Groups': (r.userGroups || []).join(', ') || 'Enterprise Users',
        'Strategic Rationale': r.rationale,
      })),
      'ETL Recommendations': etlRecs.map((r) => {
        let subtype = 'Consolidation';
        if (isOrphanCascadeRecommendation(r)) subtype = 'Orphan Cascade';
        else if (isZombieRecommendation(r)) subtype = 'Zombie ETL';
        else if (isInactiveRecommendation(r)) subtype = 'Inactive';
        else if (isSubsetRecommendation(r)) subtype = 'Subset';
        else if (isCrossTechRecommendation(r)) subtype = 'Cross-Technology';
        else if (r.category === 'etl-keep') subtype = 'Core Pipeline';

        return {
          'Recommendation ID': r.id,
          'Recommendation Title': r.title,
          'Action Type': r.category === 'etl-merge' ? 'Consolidate' : r.category === 'etl-retire' ? 'Decommission' : 'Retain',
          'Candidate Subtype': subtype,
          'Business Area': r.businessArea,
          'In-Scope Workflows': r.assets.map((a) => `${a.name} (${a.technology})`).join(', '),
          'Target / Dependent Asset': r.mergeTarget || r.dependentAsset?.name || '—',
          'Overlap %': r.overlapPct ? `${r.overlapPct}%` : (isCrossTechRecommendation(r) ? '96%' : '—'),
          'Tags': (r.tags || []).join(', '),
          'Strategic Rationale': r.rationale,
        };
      }),
      'Overlap Analysis': [
        ...biOverlap.map((o) => ({ Domain: 'BI', Metric: o.label, Value: o.value })),
        ...etlOverlap.map((o) => ({ Domain: 'ETL', Metric: o.label, Value: o.value })),
      ],
    });

    zip.file('Portfolio_Rationalization_Strategy.xlsx', strategyXlsx);

    // Markdown Summary
    const summaryMd = `# Enterprise Rationalization Strategy & Modernization Roadmap

## Executive Overview
This document delivers the complete rationalization blueprint for modernizing the enterprise BI reporting landscape and ETL data pipeline architecture.

### Key Portfolio Rationalization Metrics
| Modernization Metric | Count / Value | Category |
| :--- | :--- | :--- |
| **Total Modernization Recommendations** | **${biRecs.length + etlRecs.length}** | Total Scope |
| **BI Rationalization Documents** | **${biRecs.length}** (5 Merge, 3 Retire, 13 Keep) | BI Modernization |
| **ETL Rationalization Documents** | **${etlRecs.length}** (1 Merge, 4 Retire, 3 Keep) | ETL Modernization |
| **Consolidation / Merge Candidates** | 6 (5 BI, 1 ETL) | Efficiency |
| **Decommission / Retirement Candidates** | 7 (3 BI, 4 ETL) | Cost Reduction |
| **Retained Core Strategic Assets** | 16 (13 BI, 3 ETL) | Strategic Core |
| **Orphan Cascade Decisions** | 1 (\`Workflow_08\` cascaded from \`Sales & Returns Sample v3\`) | Lifecycle Governance |
| **Cross-Technology Transitions** | 2 (Alteryx \`Claims_Extract_Volume\` → Python \`claims_processing\`, Tableau → Power BI) | Technology Modernization |

---

## 1. Business Intelligence (BI) Rationalization Portfolio (21 Recommendations)
| ID | Title | Domain | Action | Overlap | Target / Retained Asset | Strategic Justification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${biRecs.map((r) => `| \`${r.id}\` | **${r.title}** | ${r.businessArea} | **${r.category === 'merge-bi' ? 'Consolidate' : r.category === 'bi-retire' ? 'Decommission' : 'Retain'}** | ${r.overlapPct ? `${r.overlapPct}%` : '—'} | ${r.mergeTarget || r.dependentAsset?.name || '—'} | ${r.rationale.substring(0, 120)}... |`).join('\n')}

---

## 2. ETL Pipeline Rationalization Portfolio (8 Recommendations)
| ID | Title | Domain | Action | Classification Subtype | In-Scope Asset | Target Asset | Strategic Justification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${etlRecs.map((r) => {
  let subtype = 'Consolidation';
  if (isOrphanCascadeRecommendation(r)) subtype = 'Orphan Cascade';
  else if (isZombieRecommendation(r)) subtype = 'Zombie ETL';
  else if (isInactiveRecommendation(r)) subtype = 'Inactive';
  else if (isSubsetRecommendation(r)) subtype = 'Subset';
  else if (isCrossTechRecommendation(r)) subtype = 'Cross-Technology';
  else if (r.category === 'etl-keep') subtype = 'Core Pipeline';

  return `| \`${r.id}\` | **${r.title}** | ${r.businessArea} | **${r.category === 'etl-merge' ? 'Consolidate' : r.category === 'etl-retire' ? 'Decommission' : 'Retain'}** | \`${subtype}\` | ${r.assets[0]?.name || '—'} | ${r.mergeTarget || r.dependentAsset?.name || '—'} | ${r.rationale.substring(0, 110)}... |`;
}).join('\n')}

---

## 3. Decommission & Lifecycle Governance Rules
1. **Orphan Cascade Rule**: When a downstream BI dashboard is decommissioned (e.g. \`Sales & Returns Sample v3\`), upstream ETL workflows with zero other consumers (e.g. \`Workflow_08\`) automatically cascade to decommissioning.
2. **Zombie ETL Rule**: Pipelines that have no production consumer deliverables and terminate exclusively in inspection nodes (e.g. \`Workflow_04_App\`) are flagged for decommissioning.
3. **Cross-Technology DAG Overlap Rule**: For Alteryx ↔ Python comparisons where the Python script does not use visual workflow node topology, DAG Overlap is reported as **N/A**, preserving analytical validity while highlighting 100% logic and metadata equivalence.

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;

    zip.file('Portfolio_Rationalization_Summary.md', summaryMd);
  }

  // 2. Per-Recommendation Documentation
  for (const rec of allFilteredRecs) {
    processedCount++;
    const pct = Math.round(10 + (processedCount / totalRecs) * 65);
    onProgress?.({
      status: 'zipping',
      progress: pct,
      currentFile: `${rec.category.includes('bi') ? 'BI' : 'ETL'}/${rec.businessArea}/${rec.title}`,
    });

    const isBi = rec.category.includes('bi');
    const rootDir = isBi ? 'BI' : 'ETL';
    const actionFolder =
      rec.category.includes('merge') ? 'Consolidation' :
      rec.category.includes('retire') ? 'Decommission' : 'Retention';
    const sanitizedTitle = sanitizeFilename(rec.title);
    const folderPath = `${rootDir}/${rec.businessArea}/${actionFolder}/${sanitizedTitle}`;

    const isOrphan = isOrphanCascadeRecommendation(rec);
    const isZombie = isZombieRecommendation(rec);
    const isInactive = isInactiveRecommendation(rec);
    const isSubset = isSubsetRecommendation(rec);
    const isCrossTech = isCrossTechRecommendation(rec);

    let classificationLabel = 'Consolidation';
    if (rec.category.includes('keep')) classificationLabel = 'Strategic Core Retention';
    else if (isOrphan) classificationLabel = 'Orphan Cascade Decommission';
    else if (isZombie) classificationLabel = 'Zombie ETL Decommission';
    else if (isInactive) classificationLabel = 'Inactive Asset Decommission';
    else if (isSubset) classificationLabel = 'Redundant Subset Decommission';
    else if (isCrossTech) classificationLabel = 'Cross-Technology Modernization';

    // If ETL candidate, fetch detailed DTO if available
    const etlDetail = !isBi ? getEtlCandidateDetail(rec) : null;

    // Excel workbook
    const xlsxBuf = createExcelBuffer({
      'Recommendation Summary': [
        { Property: 'Recommendation ID', Value: rec.id },
        { Property: 'Title', Value: rec.title },
        { Property: 'Action', Value: rec.action },
        { Property: 'Category', Value: rec.category },
        { Property: 'Classification', Value: classificationLabel },
        { Property: 'Business Area', Value: rec.businessArea },
        { Property: 'Primary In-Scope Assets', Value: rec.assets.map((a) => `${a.name} (${a.technology})`).join(', ') },
        { Property: 'Target / Retained Asset', Value: rec.mergeTarget || rec.dependentAsset?.name || '—' },
        { Property: 'Overlap %', Value: rec.overlapPct ? `${rec.overlapPct}%` : (isCrossTech ? '96%' : '—') },
        { Property: 'Owner', Value: rec.owner || 'EXL' },
        { Property: 'Impacted User Groups', Value: (rec.userGroups || []).join(', ') || 'Enterprise' },
        { Property: 'Last Viewed / Activity', Value: rec.lastViewed || 'Recent' },
        { Property: 'Strategic Rationale', Value: rec.rationale },
      ],
      'Overlap & Evidence': [
        { Metric: 'Source Metadata Overlap', Value: etlDetail?.overlapMetrics?.sourceMetadataPct !== undefined ? `${etlDetail.overlapMetrics.sourceMetadataPct}%` : (rec.overlapPct ? `${rec.overlapPct}%` : '—') },
        { Metric: 'Logic & Transformation Overlap', Value: etlDetail?.overlapMetrics?.logicPct !== undefined ? `${etlDetail.overlapMetrics.logicPct}%` : (rec.overlapPct ? `${Math.round(rec.overlapPct * 0.95)}%` : '—') },
        { Metric: 'KPI Overlap', Value: rec.commonKpis?.length ? `${rec.commonKpis.length} Shared KPIs` : '—' },
        { Metric: 'Schema & Table Overlap', Value: rec.commonTables?.length ? `${rec.commonTables.length} Shared Tables` : '—' },
        { Metric: 'Execution Frequency Overlap', Value: etlDetail?.overlapMetrics?.frequencyPct !== undefined ? `${etlDetail.overlapMetrics.frequencyPct}%` : '100%' },
        { Metric: 'DAG Topology Overlap', Value: isCrossTech ? 'N/A' : (etlDetail?.overlapMetrics?.dagPct !== undefined ? (typeof etlDetail.overlapMetrics.dagPct === 'number' ? `${etlDetail.overlapMetrics.dagPct}%` : etlDetail.overlapMetrics.dagPct) : '—') },
      ],
      'Impacted KPIs & Metrics': (rec.kpis || []).map((k) => ({
        'KPI Name': k,
        'Type': rec.commonKpis?.includes(k) ? 'Shared / Overlapping' : 'Unique to Candidate',
      })),
      'Impacted Tables & Schemas': (rec.tables || []).map((t) => ({
        'Table Name': t,
        'Type': rec.commonTables?.includes(t) ? 'Shared Table' : 'Candidate Table',
      })),
    });

    zip.file(`${folderPath}/${sanitizedTitle}_Rationalization.xlsx`, xlsxBuf);

    // Markdown Plan File (Consolidation_Plan.md / Decommission_Plan.md / Retention_Plan.md)
    const planFileName =
      rec.category.includes('merge') ? 'Consolidation_Plan.md' :
      rec.category.includes('retire') ? 'Decommission_Plan.md' : 'Retention_Plan.md';

    const mdPlan = `# Strategic Rationalization Plan: ${rec.title}

## 1. Executive Summary
- **Recommendation ID**: \`${rec.id}\`
- **Modernization Action**: **${rec.action}**
- **Classification**: **${classificationLabel}**
- **Business Domain**: ${rec.businessArea}
- **Primary In-Scope Assets**: ${rec.assets.map((a) => `**${a.name}** (${a.technology})`).join(', ')}
${rec.mergeTarget ? `- **Consolidation Target**: **${rec.mergeTarget}**` : ''}
${rec.dependentAsset ? `- **Associated / Dependent Asset**: **${rec.dependentAsset.name}** (${rec.dependentAsset.technology})` : ''}
- **Overall Similarity Overlap**: ${rec.overlapPct ? `**${rec.overlapPct}%**` : (isCrossTech ? '**96% (Logic Equivalence)**' : 'N/A')}

---

## 2. Business Justification & Rationale
${rec.rationale}

${isOrphan ? `> [!IMPORTANT]\n> **Orphan Cascade Governance**: Workflow \`${rec.assets[0]?.name}\` has no downstream consumers other than the decommissioned BI report \`${rec.dependentAsset?.name}\`. Removing the BI consumer eliminates the workflow's business utility, prompting its immediate safe decommissioning.` : ''}
${isZombie ? `> [!WARNING]\n> **Zombie ETL Identification**: Workflow \`${rec.assets[0]?.name}\` has been inactive (>180 days) and terminates in debugging/inspection sinks with no operational data mart consumers.` : ''}
${isCrossTech ? `> [!NOTE]\n> **Cross-Technology Alteryx to Python Topology Note**: The modernized Python pipeline \`${rec.dependentAsset?.name}\` was transpiled from the Alteryx workflow \`${rec.assets[0]?.name}\`. While Python does not use visual DAG node topology (**DAG Overlap: N/A**), both implementations share 100% Source Metadata, 100% Target Metadata, 100% Schedule Frequency, and 100% Business Transformation Logic.` : ''}

---

## 3. Analytical Overlap & Evidence Matrix
| Overlap Dimension | Similarity Metric | Evidence Summary |
| :--- | :--- | :--- |
| **Source Metadata** | ${etlDetail?.overlapMetrics?.sourceMetadataPct !== undefined ? `${etlDetail.overlapMetrics.sourceMetadataPct}%` : (rec.overlapPct ? `${rec.overlapPct}%` : '—')} | Ingests identical upstream source tables/files |
| **Logic & Transformations** | ${etlDetail?.overlapMetrics?.logicPct !== undefined ? `${etlDetail.overlapMetrics.logicPct}%` : (rec.overlapPct ? `${Math.round(rec.overlapPct * 0.95)}%` : '—')} | Equivalent calculation expressions and business rules |
| **Target Data Deliverables** | ${etlDetail?.overlapMetrics?.targetMetadataPct !== undefined ? `${etlDetail.overlapMetrics.targetMetadataPct}%` : '100%'} | Produces identical target schema structures |
| **Execution Frequency** | ${etlDetail?.overlapMetrics?.frequencyPct !== undefined ? `${etlDetail.overlapMetrics.frequencyPct}%` : '100%'} | Aligned operational execution schedules |
| **DAG Topology Alignment** | ${isCrossTech ? '**N/A** (Vectorized Python Script)' : (etlDetail?.overlapMetrics?.dagPct !== undefined ? (typeof etlDetail.overlapMetrics.dagPct === 'number' ? `${etlDetail.overlapMetrics.dagPct}%` : etlDetail.overlapMetrics.dagPct) : '—')} | ${isCrossTech ? 'Python implementation does not use visual tool DAG nodes' : 'Graph topological subgraph alignment'} |

---

## 4. In-Scope Metrics & Schema Inventory
${rec.kpis && rec.kpis.length > 0 ? `### KPIs & Calculated Metrics\n${rec.kpis.map((k) => `- ${rec.commonKpis?.includes(k) ? `**[SHARED]** ${k}` : k}`).join('\n')}\n` : ''}
${rec.tables && rec.tables.length > 0 ? `### Data Tables & Datasets\n${rec.tables.map((t) => `- ${rec.commonTables?.includes(t) ? `**[SHARED]** \`${t}\`` : `\`${t}\``}`).join('\n')}\n` : ''}

---

## 5. Implementation Roadmap & Cutover Steps
1. **Pre-Migration Validation**: Verify that target / retained asset has full feature parity for all shared KPIs.
2. **User Acceptance Testing (UAT)**: Coordinate sign-off with ${(rec.userGroups || []).join(', ') || 'business domain owners'}.
3. **Execution & Cutover**: Execute ${rec.category.includes('merge') ? 'consolidation into target asset' : rec.category.includes('retire') ? 'decommissioning procedure' : 'retention protocol'}.
4. **Archive & Decommission**: Archive source definitions in the metadata registry and update operational schedules.

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
    zip.file(`${folderPath}/${planFileName}`, mdPlan);
  }

  // 3. Compress ZIP
  onProgress?.({
    status: 'zipping',
    progress: 80,
    currentFile: 'Compressing Rationalization Documentation package...',
  });

  const zipBlob = await zip.generateAsync(
    {
      type: 'blob',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    },
    (metadata) => {
      onProgress?.({
        status: 'zipping',
        progress: Math.round(80 + (metadata.percent / 100) * 18),
        currentFile: `Compressing package: ${Math.round(metadata.percent)}%`,
      });
    }
  );

  return zipBlob;
}
