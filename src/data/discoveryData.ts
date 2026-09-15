import thoughtspotLogo from '../assets/logos/thoughtspot.svg';
import powerbiLogo from '../assets/logos/powerbi.svg';
import tableauLogo from '../assets/logos/tableau.svg';
import microstrategyLogo from '../assets/logos/microstrategy.svg';
import alteryxLogo from '../assets/logos/alteryx.svg';
import pythonLogo from '../assets/logos/python.svg';

/* ─────────────────────────────────────────────────────────
 * Discovery Data — typed models, mock data, and helpers
 *
 * Represents the output of the Assessment
 * agents, organized by insurance business areas.
 * ───────────────────────────────────────────────────────── */

export type TechnologyName =
  | 'ThoughtSpot'
  | 'Power BI'
  | 'Tableau'
  | 'MicroStrategy'
  | 'Alteryx'
  | 'Python';

export const TECHNOLOGY_LOGOS: Record<TechnologyName, string> = {
  ThoughtSpot: thoughtspotLogo,
  'Power BI': powerbiLogo,
  Tableau: tableauLogo,
  MicroStrategy: microstrategyLogo,
  Alteryx: alteryxLogo,
  Python: pythonLogo,
};

export interface Asset {
  id: string;
  name: string;
  technology: TechnologyName;
  businessArea: string;
  assetType?: string;
  owner?: string;
  sourceCount?: number;
  targetCount?: number;
  kpiCount?: number;
  dependencies?: string[];
  relatedAssets?: string[];
  lastUpdated?: string;
  description?: string;
  canonicalId?: string;
}

export interface BusinessArea {
  id: string;
  name: string;
  description: string;
  assets: Asset[];
}

import { TABLEAU_DETAIL_DATA } from './tableauDetailData';
import { POWERBI_DETAIL_DATA } from './powerbiDetailData';

/* ── Mock discovered assets ── */
export const allAssets: Asset[] = [
  // ─── Claims ───
  { id: 'c1', name: 'Claims - Executive Summary', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'EXLService', sourceCount: 2, targetCount: 1, kpiCount: 8, dependencies: ['Claims_Extract_Volume'], relatedAssets: ['Claims - State Performance'], lastUpdated: '2026-09-02', description: 'Executive overview of claims volume, paid losses, pending reserves, and loss frequency.' },
  { id: 'c2', name: 'Claims - State Performance', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'EXLService', sourceCount: 2, targetCount: 1, kpiCount: 6, lastUpdated: '2026-07-15', description: 'Geographic and state-by-state claims distribution and severity metrics.' },
  { id: 'c3', name: 'P&C Claims Dashboard v3', technology: 'MicroStrategy', businessArea: 'Claims', assetType: 'Dashboard', owner: 'EXLService', sourceCount: 6, targetCount: 1, kpiCount: 18, dependencies: ['Claims_Extract_Volume'], relatedAssets: ['Claims - Executive Summary', 'Claims - State Performance'], lastUpdated: '2026-08-20', description: 'Multi-chapter property and casualty dossier with loss reserve projections, severity analysis, and dimensional metrics.' },
  { id: 'c4', name: 'Healthcare Claim Analysis Dashboard', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'EXLService', sourceCount: 2, targetCount: 1, kpiCount: 8, lastUpdated: '2026-09-05', description: 'Comprehensive clinical healthcare claims evaluation, diagnostic categorization, benefit utilization, and regional cost distribution.' },
  { id: 'c10', name: 'Claims_Extract_Volume', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'EXLService', sourceCount: 4, targetCount: 5, dependencies: ['Workflow_03'], lastUpdated: '2026-09-01', description: 'Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status.' },
  { id: 'c11', name: 'Workflow_03', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'EXLService', sourceCount: 5, targetCount: 3, lastUpdated: '2026-09-01', description: 'Consolidates policy, claims and payment data from multiple sources.' },
  { id: 'c12', name: 'Workflow_01', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'EXLService', sourceCount: 3, targetCount: 1, lastUpdated: '2026-09-01', description: 'Consolidates claims and payments data through various transformations.' },
  { id: 'c13', name: 'Workflow_02', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'EXLService', sourceCount: 3, targetCount: 1, lastUpdated: '2026-09-01', description: 'Calculates key dates and aggregates claim volumes by industry type.' },
  { id: 'c14', name: 'Claims_Extract_Volume_v2', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'EXLService', sourceCount: 4, targetCount: 5, lastUpdated: '2026-09-01', description: 'Secondary extract workflow for aging-litigation risk categorization.' },
  { id: 'c15', name: 'claims_processing', technology: 'Python', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'EXLService', sourceCount: 4, targetCount: 5, kpiCount: 8, dependencies: ['Claims_Extract_Volume'], lastUpdated: '2026-09-01', description: 'Vectorized Python ETL pipeline transpiled from Alteryx workflow. Ingests claims, policy, payment, and diary data to produce historical extracts, product type summaries, state summaries, and aging risk marts.' },

  // ─── Underwriting ───
  { id: 'u1', name: 'Car Insurance Dashboard', technology: 'Tableau', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'EXL', sourceCount: 1, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-25', description: 'Auto physical damage and bodily injury claims summary and repair cost analytics.' },
  { id: 'u2', name: 'Motor Insurance Dashboard', technology: 'Tableau', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'EXL', sourceCount: 1, targetCount: 1, kpiCount: 7, lastUpdated: '2026-09-04', description: 'Commercial fleet and personal auto underwriting exposure and rating analysis.' },
  { id: 'u3', name: 'Loss Ratio', technology: 'Power BI', businessArea: 'Claims', assetType: 'Dashboard', owner: 'EXL', sourceCount: 3, targetCount: 1, kpiCount: 8, lastUpdated: '2026-09-03', description: 'Incurred losses compared against earned premiums with quarterly trend modeling.' },
  { id: 'u6', name: 'FFQ_Test', technology: 'Power BI', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'EXL', sourceCount: 2, targetCount: 1, kpiCount: 3, lastUpdated: '2026-08-22', description: 'Full Form Quotation (FFQ) experimental rating prototype and quotation latency review.' },
  { id: 'u4', name: 'Workflow_04', technology: 'Alteryx', businessArea: 'Underwriting', assetType: 'ETL Workflow', owner: 'EXL', sourceCount: 7, targetCount: 3, lastUpdated: '2026-09-02', description: 'Consolidates operational data across volume performance, geography, and operation metrics.' },

  // ─── Distribution ───
  { id: 'd1', name: 'Claims - Agent Performance', technology: 'Tableau', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXLDistribution', sourceCount: 2, targetCount: 1, kpiCount: 8, dependencies: ['Claims_Extract_Volume'], relatedAssets: ['Cross Sell Dashboard'], lastUpdated: '2026-08-28', description: 'Agent-level claims resolution performance, cycle times, and operational SLA tracking.' },
  { id: 'd2', name: 'Cross Sell Dashboard', technology: 'Tableau', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXLDistribution', sourceCount: 1, targetCount: 1, kpiCount: 6, lastUpdated: '2026-09-01', description: 'Policy cross-selling opportunities across commercial, property, and casualty lines.' },
  { id: 'd7', name: 'INSURANCE ANALYTICS DASHBOARD', technology: 'Tableau', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXLDistribution', sourceCount: 1, targetCount: 1, kpiCount: 9, lastUpdated: '2026-09-04', description: 'Distribution sales performance analytics tracking account executive meetings, open opportunities, renewal pipelines, and stage revenues.' },
  { id: 'd3', name: 'Jornaya Dashboard PBI', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXLDistribution', sourceCount: 1, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-29', description: 'Customer journey touchpoint compliance, lead verification, and consumer intent analysis.' },
  { id: 'd4', name: 'Revenue Opportunities', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXLDistribution', sourceCount: 6, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-29', description: 'Premium growth opportunities, rate change impacts, and pipeline revenue forecast.' },
  { id: 'd5', name: 'Bottom 25% Agents', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXLDistribution', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-28', description: 'Agent production review identifying lower quartile broker support needs and coaching targets.' },
  { id: 'd8', name: 'Cross_Sell_dashboardpbip', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXLDistribution', sourceCount: 0, targetCount: 1, kpiCount: 0, lastUpdated: '2026-08-28', description: 'Power BI Project (PBIP) descriptor linking to Cross_Sell_dashboardpbip report artifacts.' },
  { id: 'd9', name: 'New Business (Bottom 25% agents)', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXL_S', sourceCount: 6, targetCount: 1, kpiCount: 4, lastUpdated: '2026-08-27', description: 'New policy acquisition and production performance analysis for lower quartile broker support.' },
  { id: 'd10', name: 'Insurance_Analytics_Dashboard', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'EXL_S', sourceCount: 0, targetCount: 1, kpiCount: 0, lastUpdated: '2026-08-29', description: 'Power BI Project (PBIP) descriptor linking to Insurance_Analytics_Dashboard report artifacts.' },
  { id: 'd6', name: 'Burritos_Distribution', technology: 'Alteryx', businessArea: 'Distribution', assetType: 'ETL Workflow', owner: 'EXL_S', sourceCount: 5, targetCount: 3, lastUpdated: '2026-09-03', description: 'Processes operational distribution data with date filtering and volume aggregations.' },

  // ─── Policy Administration ───
  { id: 'p1', name: 'Survival Rate', technology: 'Power BI', businessArea: 'Policy Administration', assetType: 'Dashboard', owner: 'EXLPolicy', sourceCount: 2, targetCount: 1, kpiCount: 5, lastUpdated: '2026-09-04', description: 'Policy retention and survival rate analysis across coverage tiers and customer cohorts.' },
  { id: 'p4', canonicalId: 'c11', name: 'Workflow_03', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'EXLPolicy', sourceCount: 5, targetCount: 3, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates policy, claims and payment data from multiple sources. Categorises policies into premium groupd based on monthly premium accounts and calculates month-end dates for payments' },
  { id: 'p5', canonicalId: 'c12', name: 'Workflow_01', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'EXLPolicyAdmin', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates claims and payments data. Processes diagnosis, claims and payments information through various transformations.' },
  { id: 'p6', canonicalId: 'c13', name: 'Workflow_02', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'EXLPolicyAdmin', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Calculates key dates such as Clm_Service_Date and Month_End_Date using predefined formulas and aggregates claim volumes by industry type' },

  // ─── Finance ───
  { id: 'f1', name: 'IT Spend Analysis Sample PBIX', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'EXL_IT', sourceCount: 8, targetCount: 1, kpiCount: 7, lastUpdated: '2026-08-25', description: 'Departmental IT operational expenditure, vendor allocation, and budget variance tracking.' },
  { id: 'f2', name: 'Store Sales', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'EXL_Store', sourceCount: 5, targetCount: 1, kpiCount: 7, lastUpdated: '2026-08-24', description: 'Retail agency and physical branch location production analysis.' },
  { id: 'f3', name: 'Sales & Returns Sample v3', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'EXL_Services', sourceCount: 13, targetCount: 1, kpiCount: 10, lastUpdated: '2026-09-06', description: 'Financial reconciliation of premium billing, returned endorsements, and net revenue.' },

  // ─── Customer ───
  { id: 'cu1', name: 'Benefeciery services_v1', technology: 'Tableau', businessArea: 'Customer', assetType: 'Dashboard', owner: 'EXL_Beneficiaries', sourceCount: 1, targetCount: 1, kpiCount: 6, lastUpdated: '2026-09-03', description: 'Beneficiary claims processing and customer payout satisfaction indicators.' },
  { id: 'cu2', name: 'Benefeciery_services_Aging_Dashboard', technology: 'Tableau', businessArea: 'Customer', assetType: 'Dashboard', owner: 'EXL_Beneficiaries_Aging', sourceCount: 1, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-31', description: 'Aging analysis of unresolved beneficiary inquiries and open settlement queues.' },
];

/* ── Derive business areas from the asset data ── */
const AREA_DESCRIPTIONS: Record<string, string> = {
  Claims: 'Claims operations, processing & loss analytics',
  Underwriting: 'Risk assessment, scoring & submission management',
  Distribution: 'Agent, broker & channel performance',
  'Policy Administration': 'Policy lifecycle, renewals & endorsements',
  Finance: 'Financial reporting, revenue & regulatory compliance',
  Customer: 'Customer experience, retention & engagement',
  Actuarial: 'Reserving, pricing adequacy & loss modeling',
};

export function getBusinessAreas(): BusinessArea[] {
  const areaMap = new Map<string, Asset[]>();
  for (const asset of allAssets) {
    const list = areaMap.get(asset.businessArea) ?? [];
    list.push(asset);
    areaMap.set(asset.businessArea, list);
  }

  return Array.from(areaMap.entries()).map(([name, assets]) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    description: AREA_DESCRIPTIONS[name] ?? '',
    assets,
  }));
}

/* ── Summary metrics derived from the data ── */
export interface SummaryMetric {
  label: string;
  value: number;
  icon: 'dashboard' | 'etl' | 'source' | 'target' | 'kpi' | 'worksheet' | 'calculated';
}

export function getSummaryMetrics(filter: CategoryFilter = 'ALL'): SummaryMetric[] {
  const biKpis = 636;
  const etlKpis = 15;
  const kpis = filter === 'BI' ? biKpis : filter === 'ETL' ? etlKpis : biKpis + etlKpis;

  const dashboards = allAssets.filter(
    (a) => a.assetType === 'Dashboard' || a.assetType === 'Report' || !isEtlAsset(a),
  ).length;
  const etlWorkflows = new Set(
    allAssets
      .filter((a) => isEtlAsset(a))
      .map((a) => a.canonicalId ?? a.id),
  ).size;
  const sources = allAssets.reduce((sum, a) => sum + (a.sourceCount ?? 0), 0);
  const targets = allAssets.reduce((sum, a) => sum + (a.targetCount ?? 0), 0);

  const worksheets = Object.values(TABLEAU_DETAIL_DATA).reduce(
    (sum, item) => sum + item.summary.totalWorksheets,
    0,
  );
  const calcFields =
    Object.values(TABLEAU_DETAIL_DATA).reduce(
      (sum, item) => sum + item.summary.totalCalculatedFields,
      0,
    ) +
    Object.values(POWERBI_DETAIL_DATA).reduce(
      (sum, item) => sum + item.summary.totalDAXMeasures,
      0,
    );

  return [
    { label: 'Dashboards & Reports', value: dashboards, icon: 'dashboard' },
    { label: 'ETL Workflows', value: etlWorkflows, icon: 'etl' },
    { label: 'Data Sources', value: sources, icon: 'source' },
    { label: 'Data Targets', value: targets, icon: 'target' },
    { label: 'KPIs Tracked', value: kpis, icon: 'kpi' },
    { label: 'Worksheets', value: worksheets, icon: 'worksheet' },
    { label: 'Calculated Fields', value: calcFields, icon: 'calculated' },
  ];
}

/* ── Technology distribution helper ── */
export function getTechCounts(assets: Asset[]): { tech: TechnologyName; count: number; logo: string }[] {
  const map = new Map<TechnologyName, number>();
  for (const a of assets) {
    map.set(a.technology, (map.get(a.technology) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([tech, count]) => ({ tech, count, logo: TECHNOLOGY_LOGOS[tech] }))
    .sort((a, b) => b.count - a.count);
}

/* ── Helper to differentiate ETL vs BI assets ── */
export function isEtlAsset(asset: Asset): boolean {
  return (
    asset.technology === 'Alteryx' ||
    asset.technology === 'Python' ||
    (asset.assetType?.toLowerCase().includes('etl') ?? false)
  );
}

/* ── Category filter type ── */
export type CategoryFilter = 'ALL' | 'BI' | 'ETL';

/* ── Filtered summary metrics based on category ── */
export function getFilteredSummaryMetrics(filter: CategoryFilter): SummaryMetric[] {
  const all = getSummaryMetrics(filter);
  if (filter === 'ALL') return all;

  const biIcons = new Set(['dashboard', 'kpi', 'worksheet', 'calculated']);
  const etlIcons = new Set(['etl', 'source', 'target', 'kpi']);

  const allowedIcons = filter === 'BI' ? biIcons : etlIcons;
  return all.filter((m) => allowedIcons.has(m.icon));
}

/* ── Filtered business areas based on category ── */
export function getFilteredBusinessAreas(filter: CategoryFilter): BusinessArea[] {
  const areas = getBusinessAreas();
  if (filter === 'ALL') return areas;

  return areas
    .map((area) => ({
      ...area,
      assets: area.assets.filter((a) =>
        filter === 'BI' ? !isEtlAsset(a) : isEtlAsset(a),
      ),
    }))
    .filter((area) => area.assets.length > 0);
}

