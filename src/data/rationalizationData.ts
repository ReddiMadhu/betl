import { TECHNOLOGY_LOGOS } from './discoveryData';
import type { TechnologyName } from './discoveryData';
export { TECHNOLOGY_LOGOS };
export type { TechnologyName };

/* ─────────────────────────────────────────────────────────
 * Rationalization Data — overlap analysis, recommendations,
 * and AI-generated rationale for BI/ETL modernization.
 * ───────────────────────────────────────────────────────── */

/* ── Overlap metrics ── */
export interface OverlapMetric {
  id: string;
  label: string;
  value: number;
  highlight?: boolean; // orange when overlap > 50%
}

export const biOverlapMetrics: OverlapMetric[] = [
  { id: 'source-metadata', label: 'Source Metadata Overlaps', value: 18 },
  { id: 'logic', label: 'Logic Overlaps', value: 12 },
  { id: 'kpi', label: 'KPI Overlaps', value: 24 },
  { id: 'schema', label: 'Schema Overlaps', value: 8 },
  { id: 'bi-etl-conn', label: 'BI-ETL Connections', value: 32 },
  { id: 'cross-tech', label: 'Cross-Technology Overlaps', value: 8 },
];

export const etlOverlapMetrics: OverlapMetric[] = [
  { id: 'etl-source-overlap', label: 'Source Overlaps', value: 14 },
  { id: 'etl-logic', label: 'Logic Overlaps', value: 9 },
  { id: 'etl-target', label: 'Target Overlaps', value: 6 },
  { id: 'etl-schedule', label: 'Schedule Conflicts', value: 4 },
  { id: 'etl-bi-conn', label: 'BI-ETL Connections', value: 32 },
  { id: 'cross-tech', label: 'Cross-Technology Overlaps', value: 6 },
];

/* ── Recommendation types ── */
export type RecommendationCategory =
  | 'merge-bi'
  | 'etl-merge'
  | 'bi-retire'
  | 'etl-retire'
  | 'bi-keep'
  | 'etl-keep'
  | 'bi-etl-connections';

export interface CategoryInfo {
  id: RecommendationCategory;
  label: string;
  count: number;
  color: string;
  section: 'bi' | 'etl' | 'both';
}

export const categories: CategoryInfo[] = [
  { id: 'merge-bi', label: 'Merge BI', count: 5, color: '#FB4E0B', section: 'bi' },
  { id: 'etl-merge', label: 'ETL Merge', count: 1, color: '#0EA5E9', section: 'etl' },
  { id: 'bi-retire', label: 'BI Retire', count: 4, color: '#EF4444', section: 'bi' },
  { id: 'etl-retire', label: 'ETL Retire', count: 2, color: '#F97316', section: 'etl' },
  { id: 'bi-keep', label: 'BI Keep', count: 15, color: '#22C55E', section: 'bi' },
  { id: 'etl-keep', label: 'ETL Keep', count: 4, color: '#10B981', section: 'etl' },
  { id: 'bi-etl-connections', label: 'BI-ETL Connections', count: 32, color: '#8B5CF6', section: 'both' },
];

/* ── Individual recommendation ── */
export interface AffectedAsset {
  name: string;
  technology: TechnologyName;
  logo: string;
}

export interface Recommendation {
  id: string;
  category: RecommendationCategory;
  title: string;
  businessArea: string;
  overlapPct?: number;
  assets: AffectedAsset[];
  rationale: string;
  action: string;
  tags?: string[];
  /** Linked BI↔ETL dependency asset (for cascade decommission visualization) */
  dependentAsset?: AffectedAsset;
  /* ── Enriched fields for review modals ── */
  kpis?: string[];
  tables?: string[];
  owner?: string;
  lastViewed?: string;
  userGroups?: string[];
  summary?: string;
  commonKpis?: string[];
  commonTables?: string[];
  mergeTarget?: string;
}

function asset(name: string, tech: TechnologyName): AffectedAsset {
  return { name, technology: tech, logo: TECHNOLOGY_LOGOS[tech] };
}

export const recommendations: Recommendation[] = [
  /* ── Merge BI ── */
  {
    id: 'mb1',
    category: 'merge-bi',
    title: 'Claims Performance & Executive Consolidation',
    businessArea: 'Claims',
    overlapPct: 72,
    assets: [asset('Claims - Agent Performance', 'Tableau'), asset('Claims - Executive Summary', 'Tableau')],
    rationale: 'Both Tableau dashboards evaluate claims throughput, resolution turnaround times, and loss frequency from identical claims fact tables. Consolidating reduces visual fragmentation.',
    action: 'Consolidate into Claims - Executive Summary. Port individual agent drill-through views.',
    tags: ['High Overlap', 'Same Sources'],
    kpis: ['Incurred Claims', 'Paid Losses', 'Pending Reserves', 'Cycle Time', 'Loss Ratio', 'Adjuster SLA'],
    tables: ['claims_fact', 'claims_loss_data', 'adjuster_dim'],
    owner: 'Sarah Mitchell',
    lastViewed: '4 days ago',
    userGroups: ['Claims Ops', 'Executive', 'Actuarial'],
    summary: 'Consolidation of claims operational throughput and executive loss summary metrics.',
    commonKpis: ['Incurred Claims', 'Paid Losses', 'Loss Ratio'],
    commonTables: ['claims_fact', 'claims_loss_data'],
    mergeTarget: 'Claims - Executive Summary',
  },
  {
    id: 'mb2',
    category: 'merge-bi',
    title: 'Cross Sell Analytics Unification',
    businessArea: 'Distribution',
    overlapPct: 68,
    assets: [asset('Cross Sell Dashboard', 'Tableau'), asset('Cross Sell Dashboard PBIP', 'Power BI')],
    rationale: 'Tableau and Power BI versions track overlapping policy cross-selling opportunities across multi-line insurance accounts. Power BI version contains modern DAX segmentation.',
    action: 'Merge into Cross Sell Dashboard PBIP on Power BI. Port Tableau custom visual slicers.',
    tags: ['Cross-Platform', 'Direct Parity'],
    kpis: ['Cross-Sell Ratio', 'Multi-Line Penetration', 'Average Premium per Account', 'Quote Conversion'],
    tables: ['policy_master', 'customer_dim', 'line_of_business_dim'],
    owner: 'Amanda Foster',
    lastViewed: '6 days ago',
    userGroups: ['Distribution', 'Sales Leadership'],
    summary: 'Unification of commercial, property, and casualty cross-selling dashboards.',
    commonKpis: ['Cross-Sell Ratio', 'Multi-Line Penetration'],
    commonTables: ['policy_master', 'customer_dim'],
    mergeTarget: 'Cross Sell Dashboard PBIP',
  },
  {
    id: 'mb3',
    category: 'merge-bi',
    title: 'Agent Performance & Lower Quartile Consolidation',
    businessArea: 'Distribution',
    overlapPct: 75,
    assets: [asset('Bottom 25% Agents', 'Power BI'), asset('New Business (Bottom 25% agents)', 'Power BI')],
    rationale: 'Both Power BI dashboards focus on lower-quartile broker production, sales enablement, and new business binding bottlenecks.',
    action: 'Consolidate into Bottom 25% Agents as a comprehensive multi-tab agency coaching suite.',
    tags: ['Power BI Consolidation'],
    kpis: ['Bind Rate', 'New Business Volume', 'Agent Commission', 'Broker Retention'],
    tables: ['agent_fact', 'production_summary'],
    owner: 'Amanda Foster',
    lastViewed: '8 days ago',
    userGroups: ['Agency Operations', 'Field Sales'],
    summary: 'Consolidation of lower quartile agent support and new policy production analytics.',
    commonKpis: ['Bind Rate', 'New Business Volume'],
    commonTables: ['agent_fact', 'production_summary'],
    mergeTarget: 'Bottom 25% Agents',
  },
  {
    id: 'mb4',
    category: 'merge-bi',
    title: 'Financial Analytics Enterprise Merger',
    businessArea: 'Finance',
    overlapPct: 64,
    assets: [asset('Insurance Analytics Dashboard (Tableau)', 'Tableau'), asset('Insurance Analytics Dashboard (Power BI)', 'Power BI')],
    rationale: 'Both workbooks monitor identical enterprise financial metrics (combined ratio, investment yield, expense allocations). Migrating to Power BI provides unified financial semantic modeling.',
    action: 'Consolidate into Insurance Analytics Dashboard (Power BI).',
    tags: ['Cross-Platform', 'Golden Dataset'],
    kpis: ['Gross Written Premium', 'Net Earned Premium', 'Combined Ratio', 'Expense Ratio', 'Investment Yield'],
    tables: ['finance_ledger', 'premium_fact', 'expense_dim'],
    owner: 'Jennifer Adams',
    lastViewed: '3 days ago',
    userGroups: ['Corporate Finance', 'Executive'],
    summary: 'Consolidation of enterprise insurance financial statements and quarterly performance.',
    commonKpis: ['Gross Written Premium', 'Net Earned Premium', 'Combined Ratio'],
    commonTables: ['finance_ledger', 'premium_fact'],
    mergeTarget: 'Insurance Analytics Dashboard (Power BI)',
  },
  {
    id: 'mb5',
    category: 'merge-bi',
    title: 'Beneficiary Services & Aging Consolidation',
    businessArea: 'Customer',
    overlapPct: 58,
    assets: [asset('Beneficiary Services v1', 'Tableau'), asset('Beneficiary Services Aging Dashboard', 'Tableau')],
    rationale: 'Beneficiary aging queues feed directly into claimant satisfaction and resolution tracking. Unifying them gives service supervisors a single workflow dashboard.',
    action: 'Merge into Beneficiary Services v1 with an integrated Aging & SLA queue tab.',
    tags: ['Tableau Consolidation'],
    kpis: ['Claimant Satisfaction', 'Aging Days > 30', 'Open Settlement Queue', 'Resolution Turnaround'],
    tables: ['beneficiary_claims', 'service_ticket_dim'],
    owner: 'Emily Watson',
    lastViewed: '5 days ago',
    userGroups: ['Customer Support', 'Claims Operations'],
    summary: 'Integrated beneficiary service level and inquiry aging dashboard.',
    commonKpis: ['Claimant Satisfaction', 'Open Settlement Queue'],
    commonTables: ['beneficiary_claims'],
    mergeTarget: 'Beneficiary Services v1',
  },

  /* ── ETL Merge ── */
  {
    id: 'em2',
    category: 'etl-merge',
    title: 'Claims Workflow Consolidation',
    businessArea: 'Claims',
    overlapPct: 90,
    assets: [asset('Workflow_01', 'Alteryx'), asset('Workflow_03', 'Alteryx')],
    rationale: 'The workflows share identical data sources and execution frequencies and exhibit significant similarity in the transformation logic and data processing grain. They can be consolidated to eliminate redundancy and improve maintainability.',
    action: 'Merge regulatory reporting into the Alteryx finance consolidation as a downstream branch.',
    kpis: ['Claim_Date', 'Claim_Status', 'Customer_ID', 'Policy_ID', 'Service_Location', 'Payment_Amount', 'Payment_ID', 'Diagnosis_Type', 'ICD_Code'],
    tables: ['Claims_Data', 'Policy_Data', 'Diagnosis_Data'],
    owner: 'Mass Mutual',
    lastViewed: '5 days ago',
    userGroups: ['Data Engineering', 'Claims Ops'],
    summary: 'Monthly claims consolidation aggregating data from policy, claims, and investment systems.',
    commonKpis: ['Claim_Date', 'Claim_Status', 'Customer_ID', 'Policy_ID', 'Service_Location', 'Payment_Amount', 'Payment_ID', 'Diagnosis_Type', 'ICD_Code'],
    commonTables: ['Claims_Data', 'Policy_Data', 'Diagnosis_Data'],
    mergeTarget: 'Workflow_03',
  },

  /* ── ETL Keep ── */
  {
    id: 'ek1',
    category: 'etl-keep',
    title: 'Keep Claims_Extract_Volume',
    businessArea: 'Claims',
    assets: [asset('Claims_Extract_Volume', 'Alteryx')],
    rationale: 'Retained Alteryx workflow identified for migration and continued use.',
    action: 'Retain Claims_Extract_Volume for migration and future-state processing.',
    tags: ['Retain', 'Alteryx'],
  },
  {
    id: 'ek2',
    category: 'etl-keep',
    title: 'Keep Burritos_Distribution',
    businessArea: 'Distribution',
    assets: [asset('Burritos_Distribution', 'Alteryx')],
    rationale: 'Retained Alteryx workflow identified for migration and continued use.',
    action: 'Retain Burritos_Distribution for migration and future-state processing.',
    tags: ['Retain', 'Alteryx'],
  },
  {
    id: 'ek3',
    category: 'etl-keep',
    title: 'Keep Workflow_02',
    businessArea: 'Claims',
    assets: [asset('Workflow_02', 'Alteryx')],
    rationale: 'Retained Alteryx workflow identified for migration and continued use.',
    action: 'Retain Workflow_02 for migration and future-state processing.',
    tags: ['Retain', 'Alteryx'],
  },
  {
    id: 'ek4',
    category: 'etl-keep',
    title: 'Keep Workflow_03',
    businessArea: 'Claims',
    assets: [asset('Workflow_03', 'Alteryx')],
    rationale: 'Retained Alteryx workflow identified for migration and continued use.',
    action: 'Retain Workflow_03 for migration and future-state processing.',
    tags: ['Retain', 'Alteryx'],
  },

  /* ── BI Retire ── */
  {
    id: 'br1',
    category: 'bi-retire',
    title: 'Retire Test Sandbox Dashboard',
    businessArea: 'Underwriting',
    assets: [asset('Test', 'Power BI')],
    rationale: 'ORPHAN ASSET: Temporary underwriting sandbox report with no active business viewers in the past 180 days. Contains mock calculations superseded by production underwriting models.',
    action: 'Decommission Power BI Test report.',
    tags: ['Sandbox', '180 days unused'],
    kpis: ['Test Score', 'Sample Ratio'],
    tables: ['test_data_mart'],
    owner: 'Michael Zhang',
    lastViewed: '180 days ago',
    userGroups: [],
    summary: 'Experimental testing dataset with zero active business consumers.',
  },
  {
    id: 'br2',
    category: 'bi-retire',
    title: 'Retire FFQ Test Report',
    businessArea: 'Underwriting',
    assets: [asset('FFQ Test', 'Power BI')],
    rationale: 'SUPERSEDED: Experimental quotation rating engine prototype. Production rating workflows now run directly through automated underwriting pipelines.',
    action: 'Decommission Power BI FFQ Test report.',
    tags: ['Superseded', 'Prototype'],
    kpis: ['Quotation Latency', 'Rating Multiplier'],
    tables: ['rating_staging'],
    owner: 'Michael Zhang',
    lastViewed: '145 days ago',
    userGroups: [],
    summary: 'Full form quotation prototype report replaced by production rating engines.',
  },
  {
    id: 'br3',
    category: 'bi-retire',
    title: 'Retire Insurance Claim Dashboard (Tableau)',
    businessArea: 'Claims',
    assets: [asset('Insurance Claim Dashboard', 'Tableau')],
    rationale: 'FUNCTIONAL OVERLAP: 100% of the metrics in this dashboard are covered with higher data fidelity in Claims - Executive Summary and Healthcare Claim Analysis Dashboard.',
    action: 'Retire Insurance Claim Dashboard after Claims migration to Power BI is complete.',
    tags: ['Redundant', 'Tableau→PowerBI'],
    kpis: ['Claim Intake Volume', 'Triage Status', 'Pending Loss Amount'],
    tables: ['claims_fact', 'claims_dim_status'],
    owner: 'Rachel Torres',
    lastViewed: '62 days ago',
    userGroups: ['Claims Ops'],
    summary: 'Redundant claim intake workbook superseded by consolidated claims dashboards.',
  },
  {
    id: 'br4',
    category: 'bi-retire',
    title: 'Retire Legacy Claims Cube',
    businessArea: 'Claims',
    assets: [asset('Claims Cube', 'MicroStrategy')],
    rationale: 'LEGACY RETIREMENT: MicroStrategy cube report replaced by the modernized semantic model in P&C Claims Dashboard v3 and direct Lakehouse Power BI datasets.',
    action: 'Decommission MicroStrategy Claims Cube.',
    tags: ['Legacy Cube', 'MicroStrategy'],
    kpis: ['Aggregated Claim Count', 'Paid Total', 'Incurred Total'],
    tables: ['mstr_claims_cube_source'],
    owner: 'Tom Harrison',
    lastViewed: '120 days ago',
    userGroups: [],
    summary: 'Legacy MicroStrategy aggregation cube superseded by modern semantic models.',
  },

  /* ── ETL Retire ── */
  {
    id: 'er1',
    category: 'etl-retire',
    title: 'Retire Claims_Extract_Volume_v2 (Redundant ETL)',
    businessArea: 'Claims',
    assets: [asset('Claims_Extract_Volume_v2', 'Alteryx')],
    rationale: 'This workflow exhibits identical source, target, transformation, schema, grain, DAG and frequency overlap with Claims_Extract_Volume. The shared logic includes identical formulas, joins, and summarisation operations indicating redundant functionality.',
    action: 'Decommission Claims_Extract_Volume_v2 pipeline.',
    tags: ['Redundant', 'Shared Logic'],
    kpis: ['Extract Row Count', 'Load Latency (s)', 'Error Rate', 'Transformation Steps'],
    tables: ['claims_diary_notes', 'claims_policy', 'claims_volume_extract', 'policy_master'],
    owner: 'Mass Mutual',
    lastViewed: '98 days ago',
    userGroups: [],
    summary: 'Daily ETL pipeline transforming raw claims data from multiple source systems into the claims data mart. Redundant with Claims_Extract_Volume.',
  },
  {
    id: 'er2',
    category: 'etl-retire',
    title: 'Retire Workflow_04_App',
    businessArea: 'Underwriting',
    assets: [asset('Workflow_04_App', 'Alteryx')],
    rationale: 'This produces no production deliverables and terminates exclusively in inspection nodes. Likely represents an ad hoc data investigation as the linked YXMC file is not available.',
    action: 'Decommission after confirming no YXMC file is linked with the workflow.',
    tags: ['Unknown Macro', 'Ad-Hoc'],
    kpis: ['Age', 'BMI', 'Policy_Status', 'Health_Status', 'Policy_ID', 'Policy_Type', 'Submit_ID'],
    tables: ['Health_Data', 'Policy_Data'],
    owner: 'Mass Mutual',
    lastViewed: '42 days ago',
    userGroups: [],
    summary: 'Zero downstream consumers.',
  },

  /* ── BI Keep ── */
  {
    id: 'bk1',
    category: 'bi-keep',
    title: 'Keep Claims - Agent Performance',
    businessArea: 'Claims',
    assets: [asset('Claims - Agent Performance', 'Tableau')],
    rationale: 'Core operational dashboard tracking individual adjuster productivity, resolution cycles, and settlement SLAs across claims branches.',
    action: 'Retain and modernize to Power BI.',
    tags: ['Operational', 'High Usage'],
  },
  {
    id: 'bk2',
    category: 'bi-keep',
    title: 'Keep Claims - Executive Summary',
    businessArea: 'Claims',
    assets: [asset('Claims - Executive Summary', 'Tableau')],
    rationale: 'C-suite claims dashboard providing executive visibility into loss reserves, paid claims trends, and geographic severity distribution.',
    action: 'Retain as central claims executive hub.',
    tags: ['Executive', 'Critical'],
  },
  {
    id: 'bk3',
    category: 'bi-keep',
    title: 'Keep Claims - State Performance',
    businessArea: 'Claims',
    assets: [asset('Claims - State Performance', 'Tableau')],
    rationale: 'State-by-state statutory reporting and loss ratio comparison dashboard across regional business units.',
    action: 'Retain for regulatory and regional reviews.',
    tags: ['Regional', 'Statutory'],
  },
  {
    id: 'bk4',
    category: 'bi-keep',
    title: 'Keep Healthcare Claim Analysis Dashboard',
    businessArea: 'Claims',
    assets: [asset('Healthcare Claim Analysis Dashboard', 'Tableau')],
    rationale: 'Specialized medical provider diagnostic and billing analysis workbook with 9 key clinical metrics.',
    action: 'Retain for medical claims adjudication.',
    tags: ['Specialized', 'Clinical'],
  },
  {
    id: 'bk5',
    category: 'bi-keep',
    title: 'Keep Car Insurance Dashboard',
    businessArea: 'Claims',
    assets: [asset('Car Insurance Dashboard', 'Tableau')],
    rationale: 'Auto physical damage and repair cost benchmark workbook serving property and casualty adjusters.',
    action: 'Retain and convert to Power BI Direct Lake model.',
    tags: ['P&C Core', 'High Volume'],
  },
  {
    id: 'bk6',
    category: 'bi-keep',
    title: 'Keep Motor Insurance Dashboard',
    businessArea: 'Underwriting',
    assets: [asset('Motor Insurance Dashboard', 'Tableau')],
    rationale: 'Commercial fleet motor underwriting exposure and fleet risk rating dashboard.',
    action: 'Retain for commercial underwriting reviews.',
    tags: ['Commercial', 'Underwriting'],
  },
  {
    id: 'bk7',
    category: 'bi-keep',
    title: 'Keep New Business Dashboard',
    businessArea: 'Policy Administration',
    assets: [asset('New Business Dashboard', 'Tableau')],
    rationale: 'Policy acquisition tracking with real-time bind velocity and premium volume monitoring.',
    action: 'Retain for policy administration operations.',
    tags: ['Policy Ops', 'Daily Use'],
  },
  {
    id: 'bk8',
    category: 'bi-keep',
    title: 'Keep P&C Claims Dashboard v3',
    businessArea: 'Claims',
    assets: [asset('P&C Claims Dashboard v3', 'MicroStrategy')],
    rationale: 'Enterprise property and casualty dossier with multi-chapter loss reserve analysis and complex dimensional metrics.',
    action: 'Retain and modernize from MicroStrategy to Power BI / Tableau.',
    tags: ['Enterprise Dossier', 'Modernize'],
  },
  {
    id: 'bk9',
    category: 'bi-keep',
    title: 'Keep Loss Ratio Dashboard',
    businessArea: 'Claims',
    assets: [asset('Loss Ratio', 'Power BI')],
    rationale: 'Quarterly incurred-to-earned premium loss ratio tracking with actuarial development indicators.',
    action: 'Retain as Power BI golden reporting asset.',
    tags: ['Actuarial', 'Golden Asset'],
  },
  {
    id: 'bk10',
    category: 'bi-keep',
    title: 'Keep Store Sales Dashboard',
    businessArea: 'Distribution',
    assets: [asset('Store Sales', 'Power BI')],
    rationale: 'Branch office and retail agency sales performance tracking across regional territories.',
    action: 'Retain on Power BI.',
    tags: ['Distribution', 'Retail'],
  },
  {
    id: 'bk11',
    category: 'bi-keep',
    title: 'Keep Revenue Opportunities',
    businessArea: 'Finance',
    assets: [asset('Revenue Opportunities', 'Power BI')],
    rationale: 'Pipeline revenue forecasts and premium rate increase impact modeling.',
    action: 'Retain on Power BI.',
    tags: ['Finance', 'Growth'],
  },
  {
    id: 'bk12',
    category: 'bi-keep',
    title: 'Keep Sales & Returns Sample v3',
    businessArea: 'Finance',
    assets: [asset('Sales & Returns Sample v3', 'Power BI')],
    rationale: 'Financial reconciliation of premium collections and endorsements.',
    action: 'Retain on Power BI.',
    tags: ['Reconciliation', 'Accounting'],
  },
  {
    id: 'bk13',
    category: 'bi-keep',
    title: 'Keep IT Spend Analysis Sample',
    businessArea: 'Finance',
    assets: [asset('IT Spend Analysis Sample', 'Power BI')],
    rationale: 'Departmental IT operational expenditure and infrastructure vendor allocation tracking.',
    action: 'Retain on Power BI.',
    tags: ['OpEx', 'Internal'],
  },
  {
    id: 'bk14',
    category: 'bi-keep',
    title: 'Keep Survival Rate Dashboard',
    businessArea: 'Policy Administration',
    assets: [asset('Survival Rate', 'Power BI')],
    rationale: 'Multi-year policy retention and customer lifetime survival curve modeling.',
    action: 'Retain on Power BI.',
    tags: ['Retention', 'Analytics'],
  },
  {
    id: 'bk15',
    category: 'bi-keep',
    title: 'Keep Jornaya Dashboard PBI',
    businessArea: 'Customer',
    assets: [asset('Jornaya Dashboard PBI', 'Power BI')],
    rationale: 'Consumer intent data, lead verification, and customer acquisition journey tracking.',
    action: 'Retain on Power BI.',
    tags: ['Customer Journey', 'Compliance'],
  },
];

/* ── Helpers ── */
export function getRecommendationsByCategory(cat: RecommendationCategory): Recommendation[] {
  return recommendations.filter((r) => r.category === cat);
}

export function getCategoriesForSection(section: 'bi' | 'etl'): CategoryInfo[] {
  return categories.filter((c) => c.section === section || c.section === 'both');
}

export function getOverlapMetrics(section: 'bi' | 'etl'): OverlapMetric[] {
  return section === 'bi' ? biOverlapMetrics : etlOverlapMetrics;
}

/** Returns true if the recommendation involves assets from 2+ different technology platforms */
export function isCrossTechRecommendation(rec: Recommendation): boolean {
  const techs = new Set(rec.assets.map((a) => a.technology));
  if (rec.dependentAsset) techs.add(rec.dependentAsset.technology);
  return techs.size >= 2;
}

/** Count cross-technology recommendations for a given section */
export function getCrossTechCounts(
  recs: Recommendation[],
  section: 'bi' | 'etl',
): { mergeCount: number; retireCount: number; total: number } {
  const mergeCat = section === 'bi' ? 'merge-bi' : 'etl-merge';
  const retireCat = section === 'bi' ? 'bi-retire' : 'etl-retire';
  const mergeCount = recs.filter((r) => r.category === mergeCat && isCrossTechRecommendation(r)).length;
  const retireCount = recs.filter((r) => r.category === retireCat && isCrossTechRecommendation(r)).length;
  return { mergeCount, retireCount, total: mergeCount + retireCount };
}
