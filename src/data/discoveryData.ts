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

/* ── Mock discovered assets ── */
const allAssets: Asset[] = [
  // ─── Claims ───
  { id: 'c1', name: 'Claims - Agent Performance', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Sarah Mitchell', sourceCount: 4, targetCount: 2, kpiCount: 8, dependencies: ['Claims_Extract_Volume'], relatedAssets: ['Claims - Executive Summary', 'Claims - State Performance'], lastUpdated: '2026-08-28', description: 'Agent-level claims resolution performance, cycle times, and operational SLA tracking.' },
  { id: 'c2', name: 'Claims - Executive Summary', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Sarah Mitchell', sourceCount: 3, targetCount: 1, kpiCount: 6, dependencies: ['Claims_Extract_Volume'], relatedAssets: ['Claims - Agent Performance'], lastUpdated: '2026-09-02', description: 'Executive overview of claims volume, paid losses, pending reserves, and loss frequency.' },
  { id: 'c3', name: 'Claims - State Performance', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'James Chen', sourceCount: 2, targetCount: 1, kpiCount: 5, lastUpdated: '2026-07-15', description: 'Geographic and state-by-state claims distribution and severity metrics.' },
  { id: 'c4', name: 'Insurance Claim Dashboard', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Rachel Torres', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-20', description: 'End-to-end insurance claim intake, triage status, and settlement cycle analysis.' },
  { id: 'c5', name: 'Healthcare Claim Analysis Dashboard', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Rachel Torres', sourceCount: 5, targetCount: 3, kpiCount: 9, lastUpdated: '2026-09-05', description: 'Healthcare provider claims, medical billing breakdown, and diagnostic code metrics.' },
  { id: 'c6', name: 'Car Insurance Dashboard', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Sarah Mitchell', sourceCount: 3, targetCount: 2, kpiCount: 6, lastUpdated: '2026-08-25', description: 'Auto physical damage and bodily injury claims summary and repair cost analytics.' },
  { id: 'c7', name: 'Loss Ratio', technology: 'Power BI', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Michael Zhang', sourceCount: 4, targetCount: 2, kpiCount: 8, lastUpdated: '2026-09-03', description: 'Incurred losses compared against earned premiums with quarterly trend modeling.' },
  { id: 'c8', name: 'P&C Claims Dashboard v3', technology: 'MicroStrategy', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Tom Harrison', sourceCount: 5, targetCount: 2, kpiCount: 11, lastUpdated: '2026-08-15', description: 'Multi-chapter property and casualty dossier with loss reserve projections and settlement metrics.' },
  { id: 'c9', name: 'Claims Cube', technology: 'MicroStrategy', businessArea: 'Claims', assetType: 'Report', owner: 'Tom Harrison', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-12', description: 'Multidimensional semantic cube for high-volume claims aggregation and financial reconciliation.' },
  { id: 'c10', name: 'Claims_Extract_Volume', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 4, targetCount: 5, dependencies: ['Workflow_03'], lastUpdated: '2026-09-01', description: 'Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status.' },
  { id: 'c11', name: 'Workflow_03', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 5, targetCount: 3, lastUpdated: '2026-09-01', description: 'Consolidates policy, claims and payment data from multiple sources.' },
  { id: 'c12', name: 'Workflow_01', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, lastUpdated: '2026-09-01', description: 'Consolidates claims and payments data through various transformations.' },
  { id: 'c13', name: 'Workflow_02', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, lastUpdated: '2026-09-01', description: 'Calculates key dates and aggregates claim volumes by industry type.' },
  { id: 'c14', name: 'Claims_Extract_Volume_v2', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 4, targetCount: 5, lastUpdated: '2026-09-01', description: 'Secondary extract workflow for aging-litigation risk categorization.' },
  { id: 'c15', name: 'claims_processing', technology: 'Python', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'EXL', sourceCount: 4, targetCount: 5, lastUpdated: '2026-09-01', description: 'Vectorized Python ETL pipeline for automated claims ingestion and validation.' },

  // ─── Underwriting ───
  { id: 'u1', name: 'Motor Insurance Dashboard', technology: 'Tableau', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Lisa Wang', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-09-04', description: 'Commercial fleet and personal auto underwriting exposure and rating analysis.' },
  { id: 'u2', name: 'FFQ Test', technology: 'Power BI', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Michael Zhang', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-08-30', description: 'Full form quotation rating engine verification and risk scoring model.' },
  { id: 'u3', name: 'Test', technology: 'Power BI', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Michael Zhang', sourceCount: 2, targetCount: 1, kpiCount: 4, lastUpdated: '2026-08-28', description: 'Underwriting risk scoring experimental dataset and sandbox report.' },
  { id: 'u4', name: 'Workflow_04', technology: 'Alteryx', businessArea: 'Underwriting', assetType: 'ETL Workflow', owner: 'Kevin Liu', sourceCount: 7, targetCount: 3, lastUpdated: '2026-09-02', description: 'Consolidates operational data across volume performance, geography, and operation metrics.' },

  // ─── Distribution ───
  { id: 'd1', name: 'Cross Sell Dashboard', technology: 'Tableau', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-09-01', description: 'Policy cross-selling opportunities across commercial, property, and casualty lines.' },
  { id: 'd2', name: 'Bottom 25% Agents', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 4, targetCount: 2, kpiCount: 6, lastUpdated: '2026-08-28', description: 'Agent production review identifying lower quartile broker support needs and coaching targets.' },
  { id: 'd3', name: 'New Business (Bottom 25% agents)', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-08-27', description: 'New policy bind counts and conversion ratios for bottom quartile distribution channels.' },
  { id: 'd4', name: 'Cross Sell Dashboard PBIP', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-26', description: 'Power BI project format cross-sell tracker with customer segmentation slicing.' },
  { id: 'd5', name: 'Store Sales', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-24', description: 'Retail agency and physical branch location production analysis.' },
  { id: 'd6', name: 'Burritos_Distribution', technology: 'Alteryx', businessArea: 'Distribution', assetType: 'ETL Workflow', owner: 'Nina Patel', sourceCount: 5, targetCount: 3, lastUpdated: '2026-09-03', description: 'Processes operational distribution data with date filtering and volume aggregations.' },

  // ─── Policy Administration ───
  { id: 'p1', name: 'policy_lifecycle_dashboard', technology: 'Power BI', businessArea: 'Policy Administration', assetType: 'Dashboard', owner: 'Chris Morgan', sourceCount: 6, targetCount: 3, kpiCount: 11, dependencies: ['Policy_Consolidation_Workflow'], relatedAssets: ['policy_renewal_tracker'], lastUpdated: '2026-09-04', description: 'End-to-end policy lifecycle visibility from new business through renewal, endorsement, and cancellation.' },
  { id: 'p2', name: 'policy_renewal_tracker', technology: 'Power BI', businessArea: 'Policy Administration', assetType: 'Dashboard', owner: 'Chris Morgan', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-08-22' },
  { id: 'p3', name: 'policy_book_analysis', technology: 'Tableau', businessArea: 'Policy Administration', assetType: 'Report', owner: 'Diana Lee', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-18' },
  { id: 'p4', canonicalId: 'c11', name: 'Workflow_03', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 5, targetCount: 3, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates policy, claims and payment data from multiple sources. Categorises policies into premium groupd based on monthly premium accounts and calculates month-end dates for payments' },
  { id: 'p5', canonicalId: 'c12', name: 'Workflow_01', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates claims and payments data. Processes diagnosis, claims and payments information through various transformations.' },
  { id: 'p6', canonicalId: 'c13', name: 'Workflow_02', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Calculates key dates such as Clm_Service_Date and Month_End_Date using predefined formulas and aggregates claim volumes by industry type'},

  // ─── Finance ───
  { id: 'f1', name: 'Insurance Analytics Dashboard (Tableau)', technology: 'Tableau', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 4, targetCount: 2, kpiCount: 8, lastUpdated: '2026-09-01', description: 'Tableau financial overview covering combined ratios, investment return, and written premiums.' },
  { id: 'f2', name: 'Insurance Analytics Dashboard (Power BI)', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 5, targetCount: 2, kpiCount: 9, lastUpdated: '2026-09-02', description: 'Power BI financial reporting with expense breakdown and quarterly margin analysis.' },
  { id: 'f3', name: 'IT Spend Analysis Sample', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Mark Sullivan', sourceCount: 4, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-25', description: 'Departmental IT operational expenditure, vendor allocation, and budget variance tracking.' },
  { id: 'f4', name: 'Revenue Opportunities', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-29', description: 'Premium growth opportunities, rate change impacts, and pipeline revenue forecast.' },
  { id: 'f5', name: 'Sales & Returns Sample v3', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 6, targetCount: 3, kpiCount: 10, lastUpdated: '2026-09-06', description: 'Financial reconciliation of premium billing, returned endorsements, and net revenue.' },

  // ─── Customer ───
  { id: 'cu1', name: 'Beneficiary Services v1', technology: 'Tableau', businessArea: 'Customer', assetType: 'Dashboard', owner: 'Emily Watson', sourceCount: 4, targetCount: 2, kpiCount: 6, lastUpdated: '2026-09-03', description: 'Beneficiary claims processing and customer payout satisfaction indicators.' },
  { id: 'cu2', name: 'Beneficiary Services Aging Dashboard', technology: 'Tableau', businessArea: 'Customer', assetType: 'Dashboard', owner: 'Emily Watson', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-08-31', description: 'Aging analysis of unresolved beneficiary inquiries and open settlement queues.' },
  { id: 'cu3', name: 'Jornaya Dashboard PBI', technology: 'Power BI', businessArea: 'Customer', assetType: 'Dashboard', owner: 'Emily Watson', sourceCount: 4, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-29', description: 'Customer journey touchpoint compliance, lead verification, and consumer intent analysis.' },
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
  icon: 'dashboard' | 'etl' | 'source' | 'target' | 'kpi';
}

export function getSummaryMetrics(): SummaryMetric[] {
  const dashboards = allAssets.filter(
    (a) => a.assetType === 'Dashboard' || a.assetType === 'Report',
  ).length;
  const etlWorkflows = new Set(
    allAssets
      .filter((a) => a.assetType === 'ETL Workflow' || a.assetType === 'ETL Script')
      .map((a) => a.canonicalId ?? a.id),
  ).size;
  const sources = allAssets.reduce((sum, a) => sum + (a.sourceCount ?? 0), 0);
  const targets = allAssets.reduce((sum, a) => sum + (a.targetCount ?? 0), 0);
  const kpis = allAssets.reduce((sum, a) => sum + (a.kpiCount ?? 0), 0);

  return [
    { label: 'Dashboards & Reports', value: dashboards, icon: 'dashboard' },
    { label: 'ETL Workflows', value: etlWorkflows, icon: 'etl' },
    { label: 'Data Sources', value: sources, icon: 'source' },
    { label: 'Data Targets', value: targets, icon: 'target' },
    { label: 'KPIs Tracked', value: kpis, icon: 'kpi' },
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

