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
  | 'Power BI'
  | 'Tableau'
  | 'MicroStrategy'
  | 'Alteryx'
  | 'Python';

export const TECHNOLOGY_LOGOS: Record<TechnologyName, string> = {
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

/* ── Discovered assets based on ingested directories & db ── */
const allAssets: Asset[] = [
  // ─── Claims ───
  { id: 'c1', name: 'Claims - Executive Summary', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Sarah Mitchell', sourceCount: 4, targetCount: 2, kpiCount: 8, dependencies: ['Claims_Extract_Volume'], relatedAssets: ['Claims - Agent Performance', 'Claims - State Performance'], lastUpdated: '2026-08-28', description: 'Executive summary of claims operations including open/closed ratios, cycle times, and regional loss breakdown.' },
  { id: 'c2', name: 'Claims - Agent Performance', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Sarah Mitchell', sourceCount: 3, targetCount: 1, kpiCount: 6, dependencies: ['Claims_Extract_Volume'], relatedAssets: ['Claims - Executive Summary'], lastUpdated: '2026-09-02' },
  { id: 'c3', name: 'Claims - State Performance', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'James Chen', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-07-15' },
  { id: 'c4', name: 'Healthcare Claim Analysis Dashboard', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Rachel Torres', sourceCount: 5, targetCount: 2, kpiCount: 9, lastUpdated: '2026-09-05' },
  { id: 'c5', name: 'Insurance Claim Dashboard', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Rachel Torres', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-20' },
  { id: 'c6', name: 'Benefeciery_services_Aging_Dashboard', technology: 'Tableau', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Sarah Mitchell', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-22' },
  { id: 'c7', name: 'Insurance_Analytics_Dashboard', technology: 'Power BI', businessArea: 'Claims', assetType: 'Dashboard', owner: 'Michael Zhang', sourceCount: 5, targetCount: 3, kpiCount: 12, dependencies: ['claims_processing'], lastUpdated: '2026-09-04', description: 'Enterprise Power BI claims intelligence suite covering incurred losses, claim severity, and litigation trends.' },
  { id: 'c8', name: 'P&C Claims Dashboard_v3', technology: 'MicroStrategy', businessArea: 'Claims', assetType: 'Dossier', owner: 'Administrator', sourceCount: 6, targetCount: 2, kpiCount: 14, dependencies: ['Claims_Extract_Volume_v2'], lastUpdated: '2026-08-20', description: 'MicroStrategy core dossier with 66 metrics and 40 attributes for Property & Casualty litigation and fraud analytics.' },
  { id: 'c9', name: 'Claims_Extract_Volume', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 4, targetCount: 5, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Extracts and enriches claims data from multiple sources, summarising claim volume by quarter and aging risk.' },
  { id: 'c10', name: 'Workflow_03', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 5, targetCount: 3, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates policy, claims and payment data from multiple sources and calculates month-end dates for payments.' },
  { id: 'c11', name: 'Workflow_01', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Consolidates claims and payments data and processes diagnosis and claims through various transformations.' },
  { id: 'c12', name: 'Workflow_02', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 3, targetCount: 1, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Calculates key dates such as Clm_Service_Date and Month_End_Date using predefined formulas.' },
  { id: 'c13', name: 'Claims_Extract_Volume_v2', technology: 'Alteryx', businessArea: 'Claims', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 4, targetCount: 5, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-01', description: 'Enhanced claims volume extract with multidimensional fraud flags and state litigation risk indexes.' },
  { id: 'c14', name: 'claims_processing', technology: 'Python', businessArea: 'Claims', assetType: 'ETL Script', owner: 'EXL', sourceCount: 4, targetCount: 5, lastUpdated: '2026-09-01' },

  // ─── Underwriting ───
  { id: 'u1', name: 'Car Insurance Dashboard', technology: 'Tableau', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Lisa Wang', sourceCount: 4, targetCount: 2, kpiCount: 8, dependencies: ['Workflow_04'], lastUpdated: '2026-09-04', description: 'Vehicle line underwriting risk assessment with driver tiering and quote-to-bind conversion tracking.' },
  { id: 'u2', name: 'Motor Insurance Dashboard', technology: 'Tableau', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Lisa Wang', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-09-02' },
  { id: 'u3', name: 'New_Business Dashboard', technology: 'Tableau', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Michael Zhang', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-30' },
  { id: 'u4', name: 'FFQ_Test', technology: 'Power BI', businessArea: 'Underwriting', assetType: 'Dashboard', owner: 'Michael Zhang', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-09-03', description: 'Financial feasibility questionnaire and risk appetite scorecard.' },
  { id: 'u5', name: 'Workflow_04', technology: 'Alteryx', businessArea: 'Underwriting', assetType: 'ETL Workflow', owner: 'Kevin Liu', sourceCount: 7, targetCount: 3, lastUpdated: '2026-09-02', description: 'Consolidates operational underwriting data with reference master data and geographic risk metrics.' },

  // ─── Distribution ───
  { id: 'd1', name: 'Cross Sell Dashboard', technology: 'Tableau', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 3, targetCount: 1, kpiCount: 8, lastUpdated: '2026-09-01', description: 'Multi-line product cross-selling trends across agent channels and commercial broker tiers.' },
  { id: 'd2', name: 'Bottom 25% Agents', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-28' },
  { id: 'd3', name: 'Cross_Sell_dashboardpbip', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 4, targetCount: 2, kpiCount: 7, dependencies: ['Burritos_Distribution'], lastUpdated: '2026-08-29' },
  { id: 'd4', name: 'New Business (Bottom 25% agents)', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Steve Williams', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-07-30' },
  { id: 'd5', name: 'Store Sales', technology: 'Power BI', businessArea: 'Distribution', assetType: 'Dashboard', owner: 'Amanda Foster', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-15' },
  { id: 'd6', name: 'Burritos_Distribution', technology: 'Alteryx', businessArea: 'Distribution', assetType: 'ETL Workflow', owner: 'Nina Patel', sourceCount: 5, targetCount: 3, lastUpdated: '2026-09-03', description: 'Processes operational distribution data and aggregates agent channel throughput.' },

  // ─── Policy Administration ───
  { id: 'p1', name: 'Benefeciery services_v1', technology: 'Tableau', businessArea: 'Policy Administration', assetType: 'Dashboard', owner: 'Diana Lee', sourceCount: 4, targetCount: 2, kpiCount: 7, lastUpdated: '2026-08-18', description: 'Policyholder beneficiary service tracking, lifecycle renewals, and endorsement logs.' },
  { id: 'p2', name: 'Sales & Returns Sample v3', technology: 'Power BI', businessArea: 'Policy Administration', assetType: 'Dashboard', owner: 'Chris Morgan', sourceCount: 4, targetCount: 2, kpiCount: 8, dependencies: ['Policy_Consolidation_Workflow'], lastUpdated: '2026-09-04' },
  { id: 'p3', name: 'Policy_Consolidation_Workflow', technology: 'Alteryx', businessArea: 'Policy Administration', assetType: 'ETL Workflow', owner: 'Mass Mutual', sourceCount: 5, targetCount: 3, lastUpdated: '2026-09-01', description: 'Consolidates policy, claims and payment master tables into centralized data lake extracts.' },

  // ─── Finance ───
  { id: 'f1', name: 'INSURANCE ANALYTICS DASHBOARD', technology: 'Tableau', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 5, targetCount: 3, kpiCount: 12, lastUpdated: '2026-09-06', description: 'Executive enterprise financial intelligence covering gross written premium, loss ratio, and investment yield.' },
  { id: 'f2', name: 'IT Spend Analysis Sample PBIX', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 4, targetCount: 2, kpiCount: 8, lastUpdated: '2026-09-01' },
  { id: 'f3', name: 'Loss Ratio', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Mark Sullivan', sourceCount: 3, targetCount: 1, kpiCount: 6, lastUpdated: '2026-08-25' },
  { id: 'f4', name: 'Revenue Opportunities', technology: 'Power BI', businessArea: 'Finance', assetType: 'Dashboard', owner: 'Jennifer Adams', sourceCount: 4, targetCount: 2, kpiCount: 9, lastUpdated: '2026-09-02' },

  // ─── Customer ───
  { id: 'cu1', name: 'Jornaya Dashboard PBI', technology: 'Power BI', businessArea: 'Customer', assetType: 'Dashboard', owner: 'Emily Watson', sourceCount: 4, targetCount: 2, kpiCount: 8, lastUpdated: '2026-09-03', description: 'Customer journey analytics, lead verification scores, and consumer engagement tracking.' },

  // ─── Actuarial ───
  { id: 'a1', name: 'Survival Rate', technology: 'Power BI', businessArea: 'Actuarial', assetType: 'Dashboard', owner: 'Dr. Robert Lin', sourceCount: 4, targetCount: 2, kpiCount: 8, lastUpdated: '2026-09-04', description: 'Policy retention and cohort survival rate analysis across insurance underwriting classes.' },
  { id: 'a2', name: 'Test', technology: 'Power BI', businessArea: 'Actuarial', assetType: 'Dashboard', owner: 'Anna Chen', sourceCount: 3, targetCount: 1, kpiCount: 5, lastUpdated: '2026-08-30' },
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

