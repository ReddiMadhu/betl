import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDocDir = path.resolve(rootDir, 'public', 'documentation');

// Helper to ensure dir exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Write helper for XLSX
function writeExcelFile(filePath, sheets) {
  ensureDir(path.dirname(filePath));
  const wb = XLSX.utils.book_new();
  for (const [sheetName, data] of Object.entries(sheets)) {
    const rows = Array.isArray(data) && data.length > 0 ? data : [{ Information: 'No records available' }];
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, sheetName.substring(0, 31));
  }
  XLSX.writeFile(wb, filePath);
}

// Write helper for Markdown
function writeMarkdownFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf-8');
}

function sanitize(name) {
  return name.replace(/[/\\?%*:|"<>]/g, '_').trim();
}

console.log('Generating fresh, authoritative documentation in:', publicDocDir);

// ─────────────────────────────────────────────────────────────
// DATA MODEL INVENTORY (Strict mirror of src/data/)
// ─────────────────────────────────────────────────────────────

const BI_ASSETS = [
  // Claims
  { id: 'c1', name: 'Claims - Executive Summary', tech: 'Tableau', ba: 'Claims', type: 'Dashboard', owner: 'EXLService', sources: 2, targets: 1, kpis: 13, calcFields: 48, worksheets: 8, desc: 'Executive overview of claims volume, paid losses, pending reserves, and loss frequency.' },
  { id: 'c2', name: 'Claims - State Performance', tech: 'Tableau', ba: 'Claims', type: 'Dashboard', owner: 'EXLService', sources: 2, targets: 1, kpis: 16, calcFields: 32, worksheets: 6, desc: 'Geographic and state-by-state claims distribution and severity metrics.' },
  { id: 'c3', name: 'P&C Claims Dashboard v3', tech: 'MicroStrategy', ba: 'Claims', type: 'Dashboard', owner: 'EXLService', sources: 6, targets: 1, kpis: 18, calcFields: 12, worksheets: 4, desc: 'Multi-chapter property and casualty dossier with loss reserve projections, severity analysis, and dimensional metrics.' },
  { id: 'c4', name: 'Healthcare Claim Analysis Dashboard', tech: 'Tableau', ba: 'Claims', type: 'Dashboard', owner: 'EXLService', sources: 2, targets: 1, kpis: 13, calcFields: 24, worksheets: 5, desc: 'Comprehensive clinical healthcare claims evaluation, diagnostic categorization, benefit utilization, and regional cost distribution.' },
  { id: 'u3', name: 'Loss Ratio', tech: 'Power BI', ba: 'Claims', type: 'Dashboard', owner: 'EXL', sources: 3, targets: 1, kpis: 34, calcFields: 28, worksheets: 5, desc: 'Incurred losses compared against earned premiums with quarterly trend modeling.' },
  // Underwriting
  { id: 'u1', name: 'Car Insurance Dashboard', tech: 'Tableau', ba: 'Underwriting', type: 'Dashboard', owner: 'EXL', sources: 1, targets: 1, kpis: 10, calcFields: 16, worksheets: 4, desc: 'Auto physical damage and bodily injury claims summary and repair cost analytics.' },
  { id: 'u2', name: 'Motor Insurance Dashboard', tech: 'Tableau', ba: 'Underwriting', type: 'Dashboard', owner: 'EXL', sources: 1, targets: 1, kpis: 13, calcFields: 22, worksheets: 5, desc: 'Commercial fleet and personal auto underwriting exposure and rating analysis.' },
  { id: 'u6', name: 'FFQ_Test', tech: 'Power BI', ba: 'Underwriting', type: 'Dashboard', owner: 'EXL', sources: 2, targets: 1, kpis: 10, calcFields: 8, worksheets: 2, desc: 'Full Form Quotation (FFQ) experimental rating prototype and quotation latency review.' },
  // Distribution
  { id: 'd1', name: 'Claims - Agent Performance', tech: 'Tableau', ba: 'Distribution', type: 'Dashboard', owner: 'EXLDistribution', sources: 2, targets: 1, kpis: 8, calcFields: 18, worksheets: 4, desc: 'Agent-level claims resolution performance, cycle times, and operational SLA tracking.' },
  { id: 'd2', name: 'Cross Sell Dashboard', tech: 'Tableau', ba: 'Distribution', type: 'Dashboard', owner: 'EXLDistribution', sources: 1, targets: 1, kpis: 9, calcFields: 14, worksheets: 3, desc: 'Policy cross-selling opportunities across commercial, property, and casualty lines.' },
  { id: 'd7', name: 'INSURANCE ANALYTICS DASHBOARD', tech: 'Tableau', ba: 'Distribution', type: 'Dashboard', owner: 'EXLDistribution', sources: 1, targets: 1, kpis: 7, calcFields: 20, worksheets: 4, desc: 'Distribution sales performance analytics tracking account executive meetings, open opportunities, renewal pipelines, and stage revenues.' },
  { id: 'd3', name: 'Jornaya Dashboard PBI', tech: 'Power BI', ba: 'Distribution', type: 'Dashboard', owner: 'EXLDistribution', sources: 1, targets: 1, kpis: 13, calcFields: 10, worksheets: 3, desc: 'Customer journey touchpoint compliance, lead verification, and consumer intent analysis.' },
  { id: 'd4', name: 'Revenue Opportunities', tech: 'Power BI', ba: 'Distribution', type: 'Dashboard', owner: 'EXLDistribution', sources: 6, targets: 1, kpis: 22, calcFields: 30, worksheets: 6, desc: 'Premium growth opportunities, rate change impacts, and pipeline revenue forecast.' },
  { id: 'd5', name: 'Bottom 25% Agents', tech: 'Power BI', ba: 'Distribution', type: 'Dashboard', owner: 'EXLDistribution', sources: 3, targets: 1, kpis: 5, calcFields: 8, worksheets: 2, desc: 'Agent production review identifying lower quartile broker support needs and coaching targets.' },
  { id: 'd8', name: 'Cross_Sell_dashboardpbip', tech: 'Power BI', ba: 'Distribution', type: 'Dashboard', owner: 'EXLDistribution', sources: 0, targets: 1, kpis: 0, calcFields: 0, worksheets: 1, desc: 'Power BI Project (PBIP) descriptor linking to Cross_Sell_dashboardpbip report artifacts.' },
  { id: 'd9', name: 'New Business (Bottom 25% agents)', tech: 'Power BI', ba: 'Distribution', type: 'Dashboard', owner: 'EXL_S', sources: 6, targets: 1, kpis: 6, calcFields: 14, worksheets: 3, desc: 'New policy acquisition and production performance analysis for lower quartile broker support.' },
  { id: 'd10', name: 'Insurance_Analytics_Dashboard', tech: 'Power BI', ba: 'Distribution', type: 'Dashboard', owner: 'EXL_S', sources: 0, targets: 1, kpis: 0, calcFields: 0, worksheets: 1, desc: 'Power BI Project (PBIP) descriptor linking to Insurance_Analytics_Dashboard report artifacts.' },
  // Policy Administration
  { id: 'p1', name: 'Survival Rate', tech: 'Power BI', ba: 'Policy Administration', type: 'Dashboard', owner: 'EXLPolicy', sources: 2, targets: 1, kpis: 5, calcFields: 12, worksheets: 2, desc: 'Policy retention and survival rate analysis across coverage tiers and customer cohorts.' },
  // Finance
  { id: 'f1', name: 'IT Spend Analysis Sample PBIX', tech: 'Power BI', ba: 'Finance', type: 'Dashboard', owner: 'EXL_IT', sources: 8, targets: 1, kpis: 36, calcFields: 42, worksheets: 7, desc: 'Departmental IT operational expenditure, vendor allocation, and budget variance tracking.' },
  { id: 'f2', name: 'Store Sales', tech: 'Power BI', ba: 'Finance', type: 'Dashboard', owner: 'EXL_Finance', sources: 4, targets: 1, kpis: 7, calcFields: 16, worksheets: 3, desc: 'Retail branch network store performance, walk-in quotation volumes, and point-of-sale policy conversions.' },
  { id: 'f3', name: 'Sales & Returns Sample v3', tech: 'Power BI', ba: 'Finance', type: 'Dashboard', owner: 'EXL_Services', sources: 13, targets: 1, kpis: 198, calcFields: 156, worksheets: 18, desc: 'Financial reconciliation of premium billing, returned endorsements, and net revenue.' },
  // Customer
  { id: 'cu1', name: 'Benefeciery services_v1', tech: 'Tableau', ba: 'Customer', type: 'Dashboard', owner: 'EXL_Beneficiaries', sources: 1, targets: 1, kpis: 11, calcFields: 18, worksheets: 4, desc: 'Beneficiary claims processing and customer payout satisfaction indicators.' },
  { id: 'cu2', name: 'Benefeciery_services_Aging_Dashboard', tech: 'Tableau', ba: 'Customer', type: 'Dashboard', owner: 'EXL_Beneficiaries_Aging', sources: 1, targets: 1, kpis: 8, calcFields: 14, worksheets: 3, desc: 'Aging analysis of unresolved beneficiary inquiries and open settlement queues.' },
];

const CANONICAL_ETL_ASSETS = [
  { id: 'c10', name: 'Claims_Extract_Volume', tech: 'Alteryx', ba: 'Claims', complexity: 'High', criticality: 'High', sources: 4, targets: 5, tools: 35, schedule: 'Daily 05:30 AM EST', runtime: '32s', desc: 'Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status.' },
  { id: 'c11', name: 'Workflow_03', tech: 'Alteryx', ba: 'Claims', complexity: 'High', criticality: 'High', sources: 5, targets: 3, tools: 34, schedule: 'Monthly (End of Month)', runtime: '26s', desc: 'Consolidates policy, claims and payment data from multiple sources.' },
  { id: 'c12', name: 'Workflow_01', tech: 'Alteryx', ba: 'Claims', complexity: 'Medium', criticality: 'Medium', sources: 3, targets: 1, tools: 20, schedule: 'Monthly (End of Month)', runtime: '14s', desc: 'Consolidates claims and payments data through various transformations.' },
  { id: 'c13', name: 'Workflow_02', tech: 'Alteryx', ba: 'Claims', complexity: 'Medium', criticality: 'Medium', sources: 3, targets: 1, tools: 18, schedule: 'Monthly (End of Month)', runtime: '12s', desc: 'Calculates key dates and aggregates claim volumes by industry type.' },
  { id: 'c14', name: 'Claims_Extract_Volume_v2', tech: 'Alteryx', ba: 'Claims', complexity: 'High', criticality: 'High', sources: 4, targets: 5, tools: 35, schedule: 'Daily 06:00 AM EST', runtime: '30s', desc: 'Secondary extract workflow for aging-litigation risk categorization.' },
  { id: 'c15', name: 'claims_processing', tech: 'Python', ba: 'Claims', complexity: 'High', criticality: 'High', sources: 4, targets: 5, tools: 8, schedule: 'Daily 05:30 AM EST', runtime: '4.2s', desc: 'Vectorized Python ETL pipeline transpiled from Alteryx workflow. Ingests claims, policy, payment, and diary data.' },
  { id: 'u4', name: 'Workflow_04', tech: 'Alteryx', ba: 'Underwriting', complexity: 'Low', criticality: 'Low', sources: 7, targets: 3, tools: 22, schedule: 'Weekly', runtime: '18s', desc: 'Consolidates operational data across volume performance, geography, and operation metrics.' },
  { id: 'd6', name: 'Workflow_08', tech: 'Alteryx', ba: 'Distribution', complexity: 'Low', criticality: 'Low', sources: 5, targets: 3, tools: 16, schedule: 'Ad-hoc / Weekly', runtime: '8s', desc: 'Processes operational distribution data with date filtering and volume aggregations.' },
];

const RATIONALIZATION_RECS = [
  // ── BI Recommendations (21 total: 5 merge, 3 retire, 13 keep) ──
  { id: 'tb_merge_1', cat: 'merge-bi', title: 'Cross Sell & Distribution Revenue Consolidation', ba: 'Distribution', action: 'Consolidate Cross Sell Dashboard into INSURANCE ANALYTICS DASHBOARD.', overlap: '84%', rationale: 'Both workbooks source from identical brokerage sales extracts. Consolidating establishes a single distribution analytics hub.' },
  { id: 'pbi_merge_1', cat: 'merge-bi', title: 'New Business Lower Quartile & Loss Ratio Consolidation', ba: 'Claims', action: 'Consolidate into Loss Ratio on Power BI.', overlap: '78%', rationale: 'Both Power BI dashboards analyze agent productivity, retention correlations, and loss ratio performance across broker tiers.' },
  { id: 'pbi_merge_2', cat: 'merge-bi', title: 'Survival Rate & Agent Enablement Consolidation', ba: 'Distribution', action: 'Consolidate into New Business (Bottom 25% agents) on Power BI.', overlap: '72%', rationale: 'Both dashboards evaluate broker survival curves, conversion rates, and new business binding volumes across underperforming agent quartiles.' },
  { id: 'mb2', cat: 'merge-bi', title: 'Cross Sell Analytics Unification', ba: 'Distribution', action: 'Merge into Cross Sell Dashboard PBIP on Power BI.', overlap: '68%', rationale: 'Tableau and Power BI versions track overlapping policy cross-selling opportunities across multi-line accounts.' },
  { id: 'mb4', cat: 'merge-bi', title: 'Financial Analytics Enterprise Merger', ba: 'Finance', action: 'Consolidate into Insurance Analytics Dashboard (Power BI).', overlap: '64%', rationale: 'Both workbooks monitor identical enterprise financial metrics (combined ratio, investment yield, expense allocations).' },
  { id: 'pbi_retire_1', cat: 'bi-retire', title: 'Retire FFQ_Test Report', ba: 'Underwriting', action: 'Decommission Power BI FFQ_Test report.', overlap: '—', rationale: 'INACTIVE: Experimental rating prototype last accessed 200 days ago (>180 days threshold).' },
  { id: 'pbi_retire_2', cat: 'bi-retire', title: 'Retire IT Spend Analysis Sample', ba: 'Finance', action: 'Decommission Power BI IT Spend Analysis report.', overlap: '—', rationale: 'INACTIVE: Departmental IT budget variance workbook last viewed 210 days ago (>180 days threshold).' },
  { id: 'pbi_retire_3', cat: 'bi-retire', title: 'Retire Sales & Returns Sample v3', ba: 'Finance', action: 'Decommission Power BI Sales & Returns Sample v3 report.', overlap: '—', rationale: 'INACTIVE: Departmental financial reconciliation and returns report last accessed 240 days ago (>180 days threshold).' },
  { id: 'tb_keep_1', cat: 'bi-keep', title: 'Keep Benefeciery services_v1', ba: 'Customer', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Core customer beneficiary reporting workbook providing SLA compliance and payout metrics.' },
  { id: 'tb_keep_2', cat: 'bi-keep', title: 'Keep Benefeciery_services_Aging_Dashboard', ba: 'Customer', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Critical aging review tracking open beneficiary dispute queues and escalation benchmarks.' },
  { id: 'tb_keep_3', cat: 'bi-keep', title: 'Keep Claims - Agent Performance', ba: 'Distribution', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Primary agent-level resolution SLA dashboard utilized across regional claims centers.' },
  { id: 'tb_keep_4', cat: 'bi-keep', title: 'Keep Claims - Executive Summary', ba: 'Claims', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Executive portfolio view tracking enterprise incurred claims, loss frequency, and paid amounts.' },
  { id: 'tb_keep_5', cat: 'bi-keep', title: 'Keep Claims - State Performance', ba: 'Claims', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Essential statutory and geographic loss severity dashboard across jurisdictions.' },
  { id: 'tb_keep_6', cat: 'bi-keep', title: 'Keep Sales Insurance', ba: 'Distribution', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Commercial broker distribution dashboard tracking account executive quotas.' },
  { id: 'tb_keep_7', cat: 'bi-keep', title: 'Keep Car Insurance Dashboard', ba: 'Underwriting', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Core auto underwriting loss frequency and driver demographic risk model.' },
  { id: 'tb_keep_8', cat: 'bi-keep', title: 'Keep Healthcare Claim Analysis Dashboard', ba: 'Claims', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Clinical health claims diagnostic evaluation and benefit cost breakdown.' },
  { id: 'bk8', cat: 'bi-keep', title: 'Keep P&C Claims Dashboard v3', ba: 'Claims', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'High-criticality property and casualty loss reserve projection dossier.' },
  { id: 'pbi_keep_1', cat: 'bi-keep', title: 'Keep Bottom 25% Agents', ba: 'Distribution', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Lower quartile broker production scorecard for field sales coaching.' },
  { id: 'pbi_keep_2', cat: 'bi-keep', title: 'Keep Jornaya Dashboard PBI', ba: 'Distribution', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Lead compliance and consumer journey verification dashboard.' },
  { id: 'pbi_keep_3', cat: 'bi-keep', title: 'Keep Loss Ratio', ba: 'Claims', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Core enterprise loss ratio tracking incurred losses against earned premiums.' },
  { id: 'pbi_keep_4', cat: 'bi-keep', title: 'Keep Revenue Opportunities', ba: 'Distribution', action: 'Retain for continued operation and migration.', overlap: '—', rationale: 'Premium growth opportunity and rate change forecasting model.' },

  // ── ETL Recommendations (8 total: 1 merge, 4 retire, 3 keep) ──
  { id: 'em2', cat: 'etl-merge', title: 'Claims Workflow Consolidation', ba: 'Claims', subtype: 'Consolidation', action: 'Consolidate Workflow_01 into Workflow_03.', overlap: '90%', rationale: 'The workflows share identical data sources and execution frequencies with 90% logic similarity. Consolidating into Workflow_03 eliminates redundant processing.' },
  { id: 'er1', cat: 'etl-retire', title: 'Retire Claims_Extract_Volume_v2 (Redundant ETL)', ba: 'Claims', subtype: 'Subset', action: 'Decommission Claims_Extract_Volume_v2 pipeline.', overlap: '96%', rationale: 'This workflow exhibits identical source, target, transformation, schema, grain, DAG and frequency overlap with Claims_Extract_Volume.' },
  { id: 'er2', cat: 'etl-retire', title: 'Retire Workflow_04_App', ba: 'Underwriting', subtype: 'Zombie ETL', action: 'Decommission inactive workflow.', overlap: '—', rationale: 'INACTIVE: Workflow has been inactive for over 200 days (>180 days threshold). Produces no production deliverables and terminates exclusively in inspection nodes.' },
  { id: 'er3', cat: 'etl-retire', title: 'Decommission Claims_Extract_Volume (Cross-Technology Parity)', ba: 'Claims', subtype: 'Cross-Technology', action: 'Decommission legacy Alteryx workflow Claims_Extract_Volume in favor of modernized claims_processing Python pipeline.', overlap: '96%', rationale: 'CROSS-TECHNOLOGY REPLACEMENT: Alteryx workflow Claims_Extract_Volume has been transpiled into vectorized Python pipeline claims_processing. Both pipelines ingest identical 4 Excel sources and generate identical output marts.' },
  { id: 'er4', cat: 'etl-retire', title: 'Retire Workflow_08 (Orphan Cascade)', ba: 'Distribution', subtype: 'Orphan Cascade', action: 'Decommission orphaned ETL workflow Workflow_08.', overlap: '—', rationale: 'The associated BI dashboard (Sales & Returns Sample v3) is recommended for Inactive decommissioning. Since Workflow_08 has no downstream consumers beyond this dashboard, the decommissioning decision cascades to Workflow_08.' },
  { id: 'ek1', cat: 'etl-keep', title: 'Keep Claims_Extract_Volume', ba: 'Claims', subtype: 'Core Pipeline', action: 'Retain Claims_Extract_Volume for migration.', overlap: '—', rationale: 'Retained Alteryx workflow identified for migration and continued operational use.' },
  { id: 'ek3', cat: 'etl-keep', title: 'Keep Workflow_02', ba: 'Claims', subtype: 'Core Pipeline', action: 'Retain Workflow_02 for migration.', overlap: '—', rationale: 'Retained Alteryx workflow identified for migration and continued operational use.' },
  { id: 'ek4', cat: 'etl-keep', title: 'Keep Workflow_03', ba: 'Claims', subtype: 'Core Pipeline', action: 'Retain Workflow_03 for migration.', overlap: '—', rationale: 'Retained Alteryx workflow identified for migration and continued operational use.' },
];

const manifest = {
  generatedAt: new Date().toISOString(),
  assessment: [],
  rationalization: [],
};

// ─────────────────────────────────────────────────────────────
// 1. GENERATE ASSESSMENT DOCUMENTATION
// ─────────────────────────────────────────────────────────────
const assessmentDir = path.join(publicDocDir, 'assessment');

// 1.1 Portfolio Executive Summary XLSX
writeExcelFile(
  path.join(assessmentDir, 'Portfolio_Assessment_Executive_Summary.xlsx'),
  {
    'Portfolio Overview': [
      { Metric: 'Total Discovered Assets', Value: 31, Category: 'Portfolio Scope' },
      { Metric: 'BI Dashboards & Reports', Value: 23, Category: 'Portfolio Scope' },
      { Metric: 'ETL Workflows & Pipelines', Value: 8, Category: 'Portfolio Scope' },
      { Metric: 'Business Areas Covered', Value: 6, Category: 'Business Coverage' },
      { Metric: 'Connected Data Sources', Value: 79, Category: 'Architecture' },
      { Metric: 'Downstream Data Targets', Value: 39, Category: 'Architecture' },
      { Metric: 'Active Business KPIs', Value: 414, Category: 'Metrics' },
      { Metric: 'Calculated Fields & DAX', Value: 564, Category: 'Business Logic' },
    ],
    'Asset Inventory': [
      ...BI_ASSETS.map((a) => ({
        'Asset ID': a.id,
        'Asset Name': a.name,
        Technology: a.tech,
        'Business Area': a.ba,
        'Asset Type': a.type,
        Owner: a.owner,
        'Data Sources': a.sources,
        'Data Targets': a.targets,
        'KPI Count': a.kpis,
      })),
      ...CANONICAL_ETL_ASSETS.map((a) => ({
        'Asset ID': a.id,
        'Asset Name': a.name,
        Technology: a.tech,
        'Business Area': a.ba,
        'Asset Type': 'ETL Workflow',
        Owner: 'EXLService',
        Complexity: a.complexity,
        Criticality: a.criticality,
        'Data Sources': a.sources,
        'Data Targets': a.targets,
        'Tool Count': a.tools,
      })),
    ],
  }
);

manifest.assessment.push({
  path: 'Portfolio_Assessment_Executive_Summary.xlsx',
  url: '/documentation/assessment/Portfolio_Assessment_Executive_Summary.xlsx',
});

// 1.2 Portfolio Overview MD
const portfolioMd = `# Enterprise BI & ETL Modernization — Portfolio Assessment Overview

## Executive Summary
This comprehensive assessment package documents the enterprise Business Intelligence (BI) and Data Engineering (ETL) landscape discovered and assessed by the Automated Discovery Agents.

### Key Portfolio Metrics
| Metric | Value | Category |
| :--- | :--- | :--- |
| **Total Discovered Assets** | 31 | Portfolio Scope |
| **BI Dashboards & Reports** | 23 | BI Inventory |
| **ETL Workflows & Pipelines** | 8 | Data Engineering |
| **Business Areas Covered** | 6 | Business Coverage |
| **Connected Data Sources** | 79 | Architecture |
| **Downstream Data Targets** | 39 | Architecture |
| **Active Business KPIs** | 414 | Metrics |
| **Calculated Measures & Fields** | 564 | Business Logic |

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;

writeMarkdownFile(path.join(assessmentDir, 'Portfolio_Assessment_Overview.md'), portfolioMd);
manifest.assessment.push({
  path: 'Portfolio_Assessment_Overview.md',
  url: '/documentation/assessment/Portfolio_Assessment_Overview.md',
});

// 1.3 Per BI Asset Files
for (const a of BI_ASSETS) {
  const sanitized = sanitize(a.name);
  const relPath = `BI/${a.ba}/${a.tech}/${sanitized}`;
  const dir = path.join(assessmentDir, relPath);

  // XLSX
  const xlsxPath = path.join(dir, `${sanitized}_Assessment.xlsx`);
  writeExcelFile(xlsxPath, {
    'Asset Overview': [
      { Property: 'Asset Name', Value: a.name },
      { Property: 'Asset ID', Value: a.id },
      { Property: 'Technology', Value: a.tech },
      { Property: 'Business Area', Value: a.ba },
      { Property: 'Asset Type', Value: a.type },
      { Property: 'Owner', Value: a.owner },
      { Property: 'KPI Count', Value: a.kpis },
      { Property: 'Calculated Fields', Value: a.calcFields },
      { Property: 'Worksheets / Pages', Value: a.worksheets },
      { Property: 'Description', Value: a.desc },
    ],
  });

  manifest.assessment.push({
    path: `${relPath}/${sanitized}_Assessment.xlsx`,
    url: `/documentation/assessment/${relPath}/${sanitized}_Assessment.xlsx`,
  });

  // MD
  const mdPath = path.join(dir, 'Technical_Specification.md');
  const mdContent = `# Technical Specification: ${a.name}

## 1. Asset Metadata
| Attribute | Value |
| :--- | :--- |
| **Asset Name** | ${a.name} |
| **Asset ID** | \`${a.id}\` |
| **Technology** | ${a.tech} |
| **Business Area** | ${a.ba} |
| **Asset Type** | ${a.type} |
| **Owner** | ${a.owner} |
| **KPIs Tracked** | ${a.kpis} |
| **Calculated Fields / DAX** | ${a.calcFields} |
| **Worksheets / Pages** | ${a.worksheets} |

---

## 2. Business Purpose
${a.desc}

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
  writeMarkdownFile(mdPath, mdContent);

  manifest.assessment.push({
    path: `${relPath}/Technical_Specification.md`,
    url: `/documentation/assessment/${relPath}/Technical_Specification.md`,
  });
}

// 1.4 Per ETL Asset Files
for (const a of CANONICAL_ETL_ASSETS) {
  const sanitized = sanitize(a.name);
  const relPath = `ETL/${a.ba}/${a.tech}/${sanitized}`;
  const dir = path.join(assessmentDir, relPath);

  // XLSX
  const xlsxPath = path.join(dir, `${sanitized}_Assessment.xlsx`);
  writeExcelFile(xlsxPath, {
    'Workflow Overview': [
      { Property: 'Workflow Name', Value: a.name },
      { Property: 'Canonical ID', Value: a.id },
      { Property: 'Technology', Value: a.tech },
      { Property: 'Business Area', Value: a.ba },
      { Property: 'Complexity', Value: a.complexity },
      { Property: 'Criticality', Value: a.criticality },
      { Property: 'Schedule', Value: a.schedule },
      { Property: 'Runtime', Value: a.runtime },
      { Property: 'Tools Discovered', Value: a.tools },
      { Property: 'Input Sources', Value: a.sources },
      { Property: 'Output Targets', Value: a.targets },
      { Property: 'Description', Value: a.desc },
    ],
  });

  manifest.assessment.push({
    path: `${relPath}/${sanitized}_Assessment.xlsx`,
    url: `/documentation/assessment/${relPath}/${sanitized}_Assessment.xlsx`,
  });

  // MD Specification
  const mdPath = path.join(dir, 'Workflow_Specification.md');
  const mdContent = `# Workflow Technical Specification: ${a.name}

## 1. Workflow Metadata
| Attribute | Value |
| :--- | :--- |
| **Workflow Name** | ${a.name} |
| **Workflow ID** | \`${a.id}\` |
| **Technology** | ${a.tech} |
| **Business Area** | ${a.ba} |
| **Complexity** | **${a.complexity}** |
| **Criticality** | **${a.criticality}** |
| **Schedule** | ${a.schedule} |
| **Runtime** | ${a.runtime} |
| **Tool Count** | ${a.tools} |
| **Input Sources** | ${a.sources} |
| **Output Targets** | ${a.targets} |

---

## 2. Pipeline Purpose
${a.desc}

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
  writeMarkdownFile(mdPath, mdContent);

  manifest.assessment.push({
    path: `${relPath}/Workflow_Specification.md`,
    url: `/documentation/assessment/${relPath}/Workflow_Specification.md`,
  });

  // STTM MD
  const sttmPath = path.join(dir, 'Source_To_Target_Mapping.md');
  const sttmContent = `# Source to Target Mapping: ${a.name}

## 1. Overview
- **Workflow**: ${a.name} (\`${a.id}\`)
- **Technology**: ${a.tech}
- **Domain**: ${a.ba}
- **Sources**: ${a.sources} | **Targets**: ${a.targets}

---

## 2. Transformation Summary
Column-level data flow mappings, joins, aggregations, and business transformation rules configured within pipeline tools.

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
  writeMarkdownFile(sttmPath, sttmContent);

  manifest.assessment.push({
    path: `${relPath}/Source_To_Target_Mapping.md`,
    url: `/documentation/assessment/${relPath}/Source_To_Target_Mapping.md`,
  });
}

// ─────────────────────────────────────────────────────────────
// 2. GENERATE RATIONALIZATION DOCUMENTATION
// ─────────────────────────────────────────────────────────────
const rationalizationDir = path.join(publicDocDir, 'rationalization');

// 2.1 Portfolio Strategy XLSX
writeExcelFile(
  path.join(rationalizationDir, 'Portfolio_Rationalization_Strategy.xlsx'),
  {
    'Executive Summary': [
      { Metric: 'Total Rationalization Recommendations', Value: 29, Category: 'Portfolio Scope' },
      { Metric: 'BI Rationalization Documents', Value: 21, Category: 'BI Modernization' },
      { Metric: 'ETL Rationalization Documents', Value: 8, Category: 'ETL Modernization' },
      { Metric: 'Consolidation / Merge Candidates', Value: 6, Category: 'Consolidation' },
      { Metric: 'Decommission / Retire Candidates', Value: 7, Category: 'Decommission' },
      { Metric: 'Retained Core Assets', Value: 16, Category: 'Retention' },
      { Metric: 'Orphan Cascade Candidates', Value: 1, Category: 'Lifecycle Cascade' },
      { Metric: 'Cross-Technology Candidates', Value: 2, Category: 'Cross-Platform' },
    ],
    'BI Recommendations': RATIONALIZATION_RECS.filter((r) => r.cat.includes('bi')).map((r) => ({
      'Recommendation ID': r.id,
      'Title': r.title,
      'Category': r.cat,
      'Domain': r.ba,
      'Action': r.action,
      'Overlap %': r.overlap,
      'Rationale': r.rationale,
    })),
    'ETL Recommendations': RATIONALIZATION_RECS.filter((r) => r.cat.includes('etl')).map((r) => ({
      'Recommendation ID': r.id,
      'Title': r.title,
      'Category': r.cat,
      'Subtype': r.subtype,
      'Domain': r.ba,
      'Action': r.action,
      'Overlap %': r.overlap,
      'Rationale': r.rationale,
    })),
  }
);

manifest.rationalization.push({
  path: 'Portfolio_Rationalization_Strategy.xlsx',
  url: '/documentation/rationalization/Portfolio_Rationalization_Strategy.xlsx',
});

// 2.2 Portfolio Summary MD
const ratSummaryMd = `# Enterprise Rationalization Strategy & Modernization Roadmap

## Executive Overview
Portfolio modernization recommendations across 21 BI assets and 8 ETL workflows.

### Summary Metrics
| Metric | Count | Category |
| :--- | :--- | :--- |
| **Total Modernization Recommendations** | **29** | Total Scope |
| **BI Rationalization Documents** | **21** (5 Merge, 3 Retire, 13 Keep) | BI Modernization |
| **ETL Rationalization Documents** | **8** (1 Merge, 4 Retire, 3 Keep) | ETL Modernization |
| **Consolidation / Merge Candidates** | 6 | Efficiency |
| **Decommission / Retirement Candidates** | 7 | Cost Reduction |
| **Retained Core Strategic Assets** | 16 | Strategic Core |
| **Orphan Cascade Decisions** | 1 (\`Workflow_08\`) | Lifecycle Governance |
| **Cross-Technology Transitions** | 2 | Modernization |

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;

writeMarkdownFile(path.join(rationalizationDir, 'Portfolio_Rationalization_Summary.md'), ratSummaryMd);
manifest.rationalization.push({
  path: 'Portfolio_Rationalization_Summary.md',
  url: '/documentation/rationalization/Portfolio_Rationalization_Summary.md',
});

// 2.3 Per Recommendation Files
for (const r of RATIONALIZATION_RECS) {
  const isBi = r.cat.includes('bi');
  const root = isBi ? 'BI' : 'ETL';
  const actionDir = r.cat.includes('merge') ? 'Consolidation' : r.cat.includes('retire') ? 'Decommission' : 'Retention';
  const sanitized = sanitize(r.title);
  const relPath = `${root}/${r.ba}/${actionDir}/${sanitized}`;
  const dir = path.join(rationalizationDir, relPath);

  // XLSX
  const xlsxPath = path.join(dir, `${sanitized}_Rationalization.xlsx`);
  writeExcelFile(xlsxPath, {
    'Recommendation Summary': [
      { Property: 'Recommendation ID', Value: r.id },
      { Property: 'Title', Value: r.title },
      { Property: 'Category', Value: r.cat },
      { Property: 'Subtype', Value: r.subtype || 'Consolidation' },
      { Property: 'Business Area', Value: r.ba },
      { Property: 'Action', Value: r.action },
      { Property: 'Overlap %', Value: r.overlap },
      { Property: 'Strategic Rationale', Value: r.rationale },
    ],
  });

  manifest.rationalization.push({
    path: `${relPath}/${sanitized}_Rationalization.xlsx`,
    url: `/documentation/rationalization/${relPath}/${sanitized}_Rationalization.xlsx`,
  });

  // MD Plan
  const planFileName = r.cat.includes('merge') ? 'Consolidation_Plan.md' : r.cat.includes('retire') ? 'Decommission_Plan.md' : 'Retention_Plan.md';
  const mdPath = path.join(dir, planFileName);
  const mdContent = `# Strategic Rationalization Plan: ${r.title}

## 1. Recommendation Overview
- **Recommendation ID**: \`${r.id}\`
- **Modernization Action**: **${r.action}**
- **Business Domain**: ${r.ba}
- **Overlap %**: ${r.overlap}
${r.subtype ? `- **Classification Subtype**: **${r.subtype}**` : ''}

---

## 2. Business Justification & Rationale
${r.rationale}

${r.id === 'er4' ? '> [!IMPORTANT]\n> **Orphan Cascade Governance**: Workflow `Workflow_08` has no downstream consumers beyond `Sales & Returns Sample v3`. Removing the BI consumer eliminates the workflow\'s business utility, prompting its immediate safe decommissioning.' : ''}
${r.id === 'er3' ? '> [!NOTE]\n> **Cross-Technology Alteryx to Python Topology Note**: Transpiled Python script does not use visual tool nodes (**DAG Overlap: N/A**), while preserving 100% logic and metadata equivalence.' : ''}

---
*Generated by Enterprise BI & ETL Modernization Platform.*
`;
  writeMarkdownFile(mdPath, mdContent);

  manifest.rationalization.push({
    path: `${relPath}/${planFileName}`,
    url: `/documentation/rationalization/${relPath}/${planFileName}`,
  });
}

// ─────────────────────────────────────────────────────────────
// 3. SCAN MANUAL STTM FILES AND WRITE MANIFESTS
// ─────────────────────────────────────────────────────────────
function scanManualSttmFiles() {
  const etlBaseDir = path.join(assessmentDir, 'ETL');
  const manualFiles = [];
  if (!fs.existsSync(etlBaseDir)) return manualFiles;

  function scan(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.xlsx')) {
        // Exclude standard generated _Assessment.xlsx unless explicitly containing sttm
        const isGeneratedAssessment = entry.name.endsWith('_Assessment.xlsx') && !/sttm/i.test(entry.name);
        if (!isGeneratedAssessment) {
          const relPath = path.relative(assessmentDir, fullPath).replace(/\\/g, '/');
          const stat = fs.statSync(fullPath);
          manualFiles.push({
            relPath, // e.g. "ETL/Claims/Alteryx/Workflow_01/Workflow_01_STTM.xlsx"
            url: `/documentation/assessment/${relPath}`,
            filename: entry.name,
            size: stat.size,
            lastModified: stat.mtime.toISOString(),
          });
        }
      }
    }
  }

  scan(etlBaseDir);
  return manualFiles;
}

const manualSttmFiles = scanManualSttmFiles();
manifest.manualSttmFiles = manualSttmFiles;

const manifestPath = path.join(publicDocDir, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

const sttmManifestPath = path.join(publicDocDir, 'sttm-manifest.json');
fs.writeFileSync(
  sttmManifestPath,
  JSON.stringify({ generatedAt: new Date().toISOString(), count: manualSttmFiles.length, files: manualSttmFiles }, null, 2),
  'utf-8'
);

console.log('✅ Successfully generated static documentation and manifest!');
console.log(`- Assessment files: ${manifest.assessment.length}`);
console.log(`- Rationalization files: ${manifest.rationalization.length}`);
console.log(`- Manual STTM files discovered: ${manualSttmFiles.length}`);

