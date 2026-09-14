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
  { id: 'c1', name: 'claims_overview', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Sarah Mitchell', sourceCount: 4, targetCount: 2, kpiCount: 8, dependencies: ['Claims_Extract_Volume', 'claims_loss_data'], relatedAssets: ['claims_performance', 'claims_loss_ratio'], lastUpdated: '2026-08-28', description: 'Executive overview of claims operations including open/closed ratios, average cycle time, and regional breakdown.' },
  { id: 'c2', name: 'claims_performance', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Sarah Mitchell', sourceCount: 3, targetCount: 1, kpiCount: 6, dependencies: ['Claims_Extract_Volume'], relatedAssets: ['claims_overview'], lastUpdated: '2026-09-02' },
  { id: 'c3', name: 'claims_loss_ratio', technology: 'Tableau', businessArea: 'Claims', assetType: 'Report', owner: 'James Chen', sourceCount: 2, targetCount: 1, kpiCount: 4, lastUpdated: '2026-07-15' },
  { id: 'c4', name: 'claims_executive_dashboard', technology: 'Power BI', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Rachel Torres', sourceCount: 5, targetCount: 3, kpiCount: 12, dependencies: ['claims_data_mart'], relatedAssets: ['claims_operations_dashboard'], lastUpdated: '2026-09-05', description: 'C-suite claims dashboard with real-time KPIs, trend analysis, and fraud detection metrics.' },
  { id: 'c5', name: 'claims_operations_dashboard', technology: 'Power BI', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Rachel Torres', sourceCount: 3, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-20' },
  { id: 'c6', name: 'Claims_Extract_Volume', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 4, targetCount: 5, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status and analysing claims by product type and aging-litigation risk' },
  { id: 'c7', name: 'Workflow_03', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 5, targetCount: 3, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates policy, claims and payment data from multiple sources. Categorises policies into premium groupd based on monthly premium accounts and calculates month-end dates for payments' },
  { id: 'c8', name: 'Workflow_01', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates claims and payments data. Processes diagnosis, claims and payments information through various transformations.' },
  { id: 'c9', name: 'Workflow_02', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Calculates key dates such as Clm_Service_Date and Month_End_Date using predefined formulas and aggregates claim volumes by industry type'},
  { id: 'c10', name: 'Claims_Extract_Volume_v2', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 4, targetCount: 5, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status and analysing claims by product type and aging-litigation risk' },
  { id: 'c11', name: 'claims_processing', technology: 'Python', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'EXL', sourceCount: 4, targetCount: 5, lastUpdated: '2026-09-01' },

  // ─── Underwriting ───
  { id: 'u1', name: 'underwriting_scorecard', technology: 'Power BI', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Michael Zhang', sourceCount: 4, targetCount: 2, kpiCount: 9, dependencies: ['Workflow_04'], relatedAssets: ['risk_appetite_monitor'], lastUpdated: '2026-09-03', description: 'Underwriting performance scorecard with hit ratios, quote-to-bind conversion, and average premium analysis.' },
  { id: 'u2', name: 'underwriting_pipeline', technology: 'Power BI', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Michael Zhang', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-08-30' },
  { id: 'u3', name: 'risk_appetite_monitor', technology: 'Tableau', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Lisa Wang', sourceCount: 5, targetCount: 2, kpiCount: 7, dependencies: ['Workflow_04'], lastUpdated: '2026-09-04' },
  { id: 'u4', name: 'submission_tracker', technology: 'MicroStrategy', businessArea: 'Underwriting', assetType: 'Report', owner: 'Tom Harrison', sourceCount: 2, targetCount: 1, kpiCount: 4, lastUpdated: '2026-08-15' },
  { id: 'u5', name: 'Workflow_04', technology: 'Alteryx', businessArea: 'Underwriting', assetType: 'ETL Workflow', owner: 'Kevin Liu', sourceCount: 7, targetCount: 3, lastUpdated: '2026-09-02', description: 'Consolidates operational data from multiple sources and which is it with reference master data and dates, multidimensional reporting across volume performance, geography, and operation metrics' },

  // ─── Distribution ───
  { id: 'd1', name: 'agent_performance', technology: 'Tableau', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 3, targetCount: 1, kpiCount: 8, lastUpdated: '2026-09-01', description: 'Agent/broker performance tracking with commission, production volume, and retention metrics.' },
  { id: 'd2', name: 'channel_analytics', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 4, targetCount: 2, kpiCount: 6, dependencies: ['Burritos_Distribution'], lastUpdated: '2026-08-28' },
  { id: 'd3', name: 'broker_commission_report', technology: 'MicroStrategy', businessArea: 'Distribution', assetType: 'Report', owner: 'Steve Williams', sourceCount: 2, targetCount: 1, kpiCount: 3, lastUpdated: '2026-07-30' },
  { id: 'd4', name: 'Burritos_Distribution', technology: 'Alteryx', businessArea: 'Distribution', assetType: 'ETL Workflow', owner: 'Nina Patel', sourceCount: 5, targetCount: 3, lastUpdated: '2026-09-03' , description: 'Processes operational data from an input excel file, filtering records to include only those where the date falls on a Thursday. It then aggregates the data by calculating the average number of burritos'},

  // ─── Policy Administration ───
  { id: 'p1', name: 'policy_lifecycle_dashboard', technology: 'Power BI', businessArea: 'Policy Administration', assetType: 'Dashboard', owner: 'Chris Morgan', sourceCount: 6, targetCount: 3, kpiCount: 11, dependencies: ['Policy_Consolidation_Workflow'], relatedAssets: ['policy_renewal_tracker'], lastUpdated: '2026-09-04', description: 'End-to-end policy lifecycle visibility from new business through renewal, endorsement, and cancellation.' },
  { id: 'p2', name: 'policy_renewal_tracker', technology: 'Power BI', businessArea: 'Policy Administration', assetType: 'Dashboard', owner: 'Chris Morgan', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-08-22' },
  { id: 'p3', name: 'policy_book_analysis', technology: 'Tableau', businessArea: 'Policy Administration', assetType: 'Report', owner: 'Diana Lee', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-18' },
  { id: 'p4', name: 'Workflow_03', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 5, targetCount: 3, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates policy, claims and payment data from multiple sources. Categorises policies into premium groupd based on monthly premium accounts and calculates month-end dates for payments' },
  { id: 'p5', name: 'Workflow_01', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates claims and payments data. Processes diagnosis, claims and payments information through various transformations.' },
  { id: 'p6', name: 'Workflow_02', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Calculates key dates such as Clm_Service_Date and Month_End_Date using predefined formulas and aggregates claim volumes by industry type'},

  // ─── Finance ───
  { id: 'f1', name: 'financial_overview', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 7, targetCount: 4, kpiCount: 14, dependencies: ['Finance_ETL'], relatedAssets: ['premium_revenue_report', 'loss_ratio_analysis'], lastUpdated: '2026-09-06', description: 'CFO-level financial dashboard covering premium revenue, combined ratio, investment income, and expense ratios.' },
  { id: 'f2', name: 'premium_revenue_report', technology: 'MicroStrategy', businessArea: 'Finance', assetType: 'Report', owner: 'Mark Sullivan', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-25' },
  { id: 'f3', name: 'loss_ratio_analysis', technology: 'Tableau', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 4, targetCount: 2, kpiCount: 5, lastUpdated: '2026-09-01' },
  

  // ─── Customer ───
  { id: 'cu1', name: 'customer_360_view', technology: 'ThoughtSpot', businessArea: 'Customer', assetType: 'Dashboard', owner: 'Emily Watson', sourceCount: 6, targetCount: 2, kpiCount: 10, dependencies: ['Customer_Thursday_Metrics'], relatedAssets: ['customer_retention_dashboard'], lastUpdated: '2026-09-03', description: '360-degree customer view combining policy, claims, billing, and interaction history for a unified customer profile.' },
  { id: 'cu2', name: 'customer_retention_dashboard', technology: 'Power BI', businessArea: 'Customer', assetType: 'Dashboard', owner: 'Emily Watson', sourceCount: 4, targetCount: 1, kpiCount: 7, lastUpdated: '2026-08-29' },
  { id: 'cu3', name: 'nps_survey_analysis', technology: 'Tableau', businessArea: 'Customer', assetType: 'Report', owner: 'Paul Kim', sourceCount: 2, targetCount: 1, kpiCount: 4, lastUpdated: '2026-07-20' },

  // ─── Actuarial ───
  { id: 'a1', name: 'reserve_adequacy_dashboard', technology: 'Tableau', businessArea: 'Actuarial', assetType: 'Dashboard', owner: 'Dr. Robert Lin', sourceCount: 5, targetCount: 2, kpiCount: 8, dependencies: ['actuarial_data_pipeline'], lastUpdated: '2026-09-04', description: 'IBNR reserve adequacy monitoring with triangle development, loss emergence patterns, and reserve release tracking.' },
  { id: 'a2', name: 'pricing_adequacy_report', technology: 'MicroStrategy', businessArea: 'Actuarial', assetType: 'Report', owner: 'Dr. Robert Lin', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-15' },
  { id: 'a3', name: 'loss_triangle_workbook', technology: 'ThoughtSpot', businessArea: 'Actuarial', assetType: 'Dashboard', owner: 'Anna Chen', sourceCount: 4, targetCount: 2, kpiCount: 5, lastUpdated: '2026-08-30' },
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
  const etlWorkflows = allAssets.filter(
    (a) => a.assetType === 'ETL Workflow' || a.assetType === 'ETL Script',
  ).length;
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

