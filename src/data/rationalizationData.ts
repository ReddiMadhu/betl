import { TECHNOLOGY_LOGOS, allAssets, isEtlAsset } from './discoveryData';
import type { TechnologyName } from './discoveryData';
import { ALTERYX_DETAIL_DATA } from './alteryxDetailData';
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

/**
 * Dynamically computes ETL overlap metrics from actual ETL workflow detail data,
 * canonical IDs, input sources, output targets, execution schedules, and BI lineage graph.
 */
export function computeEtlOverlapMetrics(): OverlapMetric[] {
  // 1. Unique canonical ETL workflows (deduplicating p4, p5, p6 aliases)
  const etlAssets = allAssets.filter(isEtlAsset);
  const uniqueCanonicalIds: string[] = Array.from(new Set(etlAssets.map((a) => a.canonicalId ?? a.id)));

  // 2. Canonical sources per unique workflow derived from ALTERYX_DETAIL_DATA and workflow metadata
  const workflowSources: Record<string, string[]> = {
    c10: ['Claims_Volume_Extract_Demo.xlsx', 'Policy_Master_Demo.xlsx', 'Claim_Payments_Demo.xlsx', 'Claim_Diary_Notes_Demo.xlsx'],
    c11: ['Claims_Data', 'Policy_Data', 'Payment_Data', 'Diagnosis_Data'],
    c12: ['Claims_Data', 'Payment_Data', 'Diagnosis_Data'],
    c13: ['Claim_Industry_Data', 'Claims_Data', 'Payment_Data'],
    c14: ['Claims_Volume_Extract_Demo.xlsx', 'Policy_Master_Demo.xlsx', 'Claim_Payments_Demo.xlsx', 'Claim_Diary_Notes_Demo.xlsx'],
    c15: ['Claims_Data', 'Policy_Data', 'Payment_Data', 'Validation_Rules'],
    u4: ['Customer_Underwriting_Data', 'Customer_Characteristics_Mapping'],
    d6: ['4701229_YK5IEQ9R.xlsx'],
  };

  // 3. Canonical targets per unique workflow derived from ALTERYX_DETAIL_DATA and downstream sinks
  const workflowTargets: Record<string, string[]> = {
    c10: [
      'Claims_Historical_Extract_Demo_Output.xlsx|||Detail',
      'Claims_Historical_Extract_Demo_Output.xlsx|||QuarterSummary',
      'Claims_By_Product_Type_Demo_Output.xlsx|||ProductTypeSummary',
      'Claims_By_State_Demo_Output.xlsx|||StateSummary',
      'Claims_Aging_Risk_Demo_Output.xlsx|||AgingRiskSummary',
    ],
    c11: ['Policy_Consolidation_Output.xlsx', 'Claims_Consolidated_Mart'],
    c12: ['WF01_Output.xlsx', 'Claims_Consolidated_Mart'],
    c13: ['SL_Monthly_C_Volume.xlsx', 'Claims_Consolidated_Mart'],
    c14: [
      'Claims_Historical_Extract_Demo_Output.xlsx|||Detail',
      'Claims_Historical_Extract_Demo_Output.xlsx|||QuarterSummary',
      'Claims_By_Product_Type_Demo_Output.xlsx|||ProductTypeSummary',
      'Claims_By_State_Demo_Output.xlsx|||StateSummary',
      'Claims_Aging_Risk_Demo_Output.xlsx|||AgingRiskSummary',
    ],
    c15: ['Claims_Processed_Mart', 'Claims_Consolidated_Mart'],
    u4: [],
    d6: ['Workflow8_output.xlsx|||Sheet1'],
  };

  // 1. Source Overlaps: pair-wise shared source files/datasets across distinct canonical workflows
  let sourceOverlapCount = 0;
  for (let i = 0; i < uniqueCanonicalIds.length; i++) {
    for (let j = i + 1; j < uniqueCanonicalIds.length; j++) {
      const idA = uniqueCanonicalIds[i];
      const idB = uniqueCanonicalIds[j];
      const srcA = workflowSources[idA] ?? [];
      const srcB = workflowSources[idB] ?? [];
      const shared = srcA.filter((s: string) => srcB.includes(s));
      sourceOverlapCount += shared.length;
    }
  }

  // 2. Logic Overlaps: verified transformation logic, formulas, and summarizations across workflows
  const sharedLogicPatterns = [
    { id: 'lo1', name: 'Quarter_End_Date_Summarization', workflows: ['c10', 'c14'] },
    { id: 'lo2', name: 'CrossTab_Claim_Status_Pivot', workflows: ['c10', 'c14'] },
    { id: 'lo3', name: 'Manager_Examiner_Team_Rollup', workflows: ['c10', 'c14'] },
    { id: 'lo4', name: 'Adjuster_Diary_Aging_Calculation', workflows: ['c10', 'c14'] },
    { id: 'lo5', name: 'Product_Type_State_Aggregation', workflows: ['c10', 'c14'] },
    { id: 'lo6', name: 'Month_End_Date_Formula', workflows: ['c11', 'c12', 'c13'] },
    { id: 'lo7', name: 'Diagnosis_Max_ICD_Rollup', workflows: ['c11', 'c12'] },
    { id: 'lo8', name: 'Payment_Amount_Sum_Count_Rollup', workflows: ['c11', 'c12'] },
    { id: 'lo9', name: 'Claims_Ingestion_Validation_Parity', workflows: ['c10', 'c11', 'c15'] },
  ];
  const logicOverlapCount = sharedLogicPatterns.length;

  // 3. Target Overlaps: pair-wise shared output targets and marts across distinct canonical workflows
  let targetOverlapCount = 0;
  for (let i = 0; i < uniqueCanonicalIds.length; i++) {
    for (let j = i + 1; j < uniqueCanonicalIds.length; j++) {
      const idA = uniqueCanonicalIds[i];
      const idB = uniqueCanonicalIds[j];
      const tgtA = workflowTargets[idA] ?? [];
      const tgtB = workflowTargets[idB] ?? [];
      const shared = tgtA.filter((t: string) => tgtB.includes(t));
      targetOverlapCount += shared.length;
    }
  }

  // 4. Schedule Conflicts: conflicting workflows colliding in the same scheduled execution window
  const schedules: Record<string, string> = {};
  for (const id of uniqueCanonicalIds) {
    const detail = ALTERYX_DETAIL_DATA[id];
    schedules[id] = detail?.schedule && detail.schedule.trim() !== '' ? detail.schedule.trim() : (id === 'c15' ? 'Daily 6:00 AM EST' : 'Unscheduled');
  }
  const scheduleGroups: Record<string, string[]> = {};
  for (const [id, sched] of Object.entries(schedules)) {
    if (sched !== 'Unscheduled') {
      scheduleGroups[sched] = scheduleGroups[sched] ?? [];
      scheduleGroups[sched].push(id);
    }
  }
  let scheduleConflictCount = 0;
  for (const group of Object.values(scheduleGroups)) {
    if (group.length > 1) {
      scheduleConflictCount += group.length;
    }
  }

  // 5. BI-ETL Connections: direct lineage relationships connecting the 16 BI assets to upstream ETL workflows
  const biEtlLineage: Record<string, string[]> = {
    c1: ['c10', 'c15'], // Claims - Executive Summary -> Claims_Extract_Volume, claims_processing
    c2: ['c10'],        // Claims - State Performance -> Claims_Extract_Volume
    d1: ['c10'],        // Claims - Agent Performance -> Claims_Extract_Volume
    d2: ['c11'],        // Cross Sell Dashboard -> Workflow_03
    u1: ['c10'],        // Car Insurance Dashboard -> Claims_Extract_Volume
    u2: ['u4'],         // Motor Insurance Dashboard -> Workflow_04
    cu1: ['c11'],       // Benefeciery services_v1 -> Workflow_03
    cu2: ['c10'],       // Benefeciery_services_Aging_Dashboard -> Claims_Extract_Volume
    d3: ['d6'],         // Jornaya Dashboard PBI -> Burritos_Distribution
    d4: ['c11'],        // Revenue Opportunities -> Workflow_03
    d5: ['d6'],         // Bottom 25% Agents -> Burritos_Distribution
    u3: ['c10', 'c11'], // Loss Ratio -> Claims_Extract_Volume, Workflow_03
    f1: ['c13'],        // IT Spend Analysis Sample PBIX -> Workflow_02
    p1: ['c11'],        // Survival Rate -> Workflow_03
    f2: ['d6'],         // Store Sales -> Burritos_Distribution
    f3: ['c12'],        // Sales & Returns Sample v3 -> Workflow_01
  };
  const biEtlConnections = Object.values(biEtlLineage).reduce((sum: number, deps: string[]) => sum + deps.length, 0);

  // 6. Cross-Technology Overlaps: Alteryx workflows that have verified functional/source/target overlap with Python (c15)
  const alteryxIds = uniqueCanonicalIds.filter((id) => id !== 'c15');
  let crossTechCount = 0;
  for (const altId of alteryxIds) {
    const hasSrcOverlap = (workflowSources['c15'] ?? []).some((s: string) => (workflowSources[altId] ?? []).includes(s));
    const hasTgtOverlap = (workflowTargets['c15'] ?? []).some((t: string) => (workflowTargets[altId] ?? []).includes(t));
    if (hasSrcOverlap || hasTgtOverlap) {
      crossTechCount += 1;
    }
  }

  return [
    { id: 'etl-source-overlap', label: 'Source Overlaps', value: sourceOverlapCount, highlight: sourceOverlapCount > 10 },
    { id: 'etl-logic', label: 'Logic Overlaps', value: logicOverlapCount, highlight: logicOverlapCount > 8 },
    { id: 'etl-target', label: 'Target Overlaps', value: targetOverlapCount, highlight: targetOverlapCount > 5 },
    { id: 'etl-schedule', label: 'Schedule Conflicts', value: scheduleConflictCount, highlight: scheduleConflictCount > 3 },
    { id: 'etl-bi-conn', label: 'BI-ETL Connections', value: biEtlConnections, highlight: biEtlConnections > 15 },
    { id: 'cross-tech', label: 'Cross-Technology Overlaps', value: crossTechCount, highlight: crossTechCount > 3 },
  ];
}

export const etlOverlapMetrics: OverlapMetric[] = computeEtlOverlapMetrics();

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
  { id: 'merge-bi', label: 'Merge BI', count: 4, color: '#FB4E0B', section: 'bi' },
  { id: 'etl-merge', label: 'ETL Merge', count: 1, color: '#0EA5E9', section: 'etl' },
  { id: 'bi-retire', label: 'BI Retire', count: 5, color: '#EF4444', section: 'bi' },
  { id: 'etl-retire', label: 'ETL Retire', count: 2, color: '#F97316', section: 'etl' },
  { id: 'bi-keep', label: 'BI Keep', count: 13, color: '#22C55E', section: 'bi' },
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
    id: 'tb_merge_1',
    category: 'merge-bi',
    title: 'Cross Sell & Distribution Revenue Consolidation',
    businessArea: 'Distribution',
    overlapPct: 84,
    assets: [asset('Cross Sell Dashboard', 'Tableau'), asset('INSURANCE ANALYTICS DASHBOARD', 'Tableau')],
    rationale: 'Both workbooks source from identical brokerage sales and broker performance extracts (brokerage_202001231040) tracking account executive meetings, cross-sell conversion stages, and open pipeline revenue. Consolidating into INSURANCE ANALYTICS DASHBOARD establishes a single distribution analytics hub.',
    action: 'Consolidate Cross Sell Dashboard into INSURANCE ANALYTICS DASHBOARD in Distribution. Port executive cross-sell and renewal breakdown views.',
    tags: ['High Overlap', 'Same Datasource', 'Distribution Hub'],
    kpis: ['Number of Invoices by Account Executive', 'Number of Meetings by Account Executive', 'Top 4 Open Opportunities by Revenue', 'Revenue Distribution by Top 4 Opportunities', 'Revenue Distribution by Product', 'Revenue by Sales Stage', 'Cross Sell Performance', 'Renewal Performance', 'Budget Allocation by Employee'],
    tables: ['brokerage_202001231040', 'fees_202001231041', 'invoice_202001231041', 'meeting_list_202001231041', 'gcrm_opportunity_202001231041', 'nn_en_ee_indi_bdgt'],
    owner: 'Amanda Foster',
    lastViewed: '3 days ago',
    userGroups: ['Distribution Leadership', 'Sales Ops', 'Account Management'],
    summary: 'Consolidation of broker cross-sell opportunities and comprehensive insurance distribution revenue analytics.',
    commonKpis: ['Number of Invoices by Account Executive', 'Number of Meetings by Account Executive', 'Top 4 Open Opportunities by Revenue', 'Revenue Distribution by Top 4 Opportunities', 'Revenue Distribution by Product', 'Revenue by Sales Stage'],
    commonTables: ['brokerage_202001231040', 'fees_202001231041', 'invoice_202001231041', 'meeting_list_202001231041', 'gcrm_opportunity_202001231041'],
    mergeTarget: 'INSURANCE ANALYTICS DASHBOARD',
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
    id: 'tb_retire_1',
    category: 'bi-retire',
    title: 'Retire Car Insurance Dashboard',
    businessArea: 'Underwriting',
    assets: [asset('Car Insurance Dashboard', 'Tableau')],
    rationale: 'SUPERSEDED: Personal lines auto damage and driver risk demographic analysis has been superseded by enterprise commercial underwriting models and centralized lakehouse risk marts.',
    action: 'Decommission Tableau Car Insurance Dashboard following commercial risk model cutover.',
    tags: ['Superseded', 'Underwriting'],
    kpis: ['Average Claim Amount', 'Claim Frequency', 'Average Household Income', 'Vehicle Age Risk', 'Driver Education Level', 'Total Policies'],
    tables: ['insurance_policies', 'customer_demographics', 'vehicle_dim'],
    owner: 'Rachel Torres',
    lastViewed: '94 days ago',
    userGroups: ['Personal Auto Underwriting'],
    summary: 'Legacy personal auto underwriting workbook replaced by modern risk portfolio rating models.',
  },
  {
    id: 'tb_retire_2',
    category: 'bi-retire',
    title: 'Retire Healthcare Claim Analysis Dashboard',
    businessArea: 'Claims',
    assets: [asset('Healthcare Claim Analysis Dashboard', 'Tableau')],
    rationale: 'LEGACY DATA MODEL: Diagnostic category and clinical benefit cost tracking relies on static extracts superseded by the central claims lakehouse mart.',
    action: 'Decommission Healthcare Claim Analysis Dashboard after clinical KPI migration.',
    tags: ['Redundant Mart', 'Clinical Claims'],
    kpis: ['Claims Cost', 'Benefit Nature Distribution', 'Regional Claimant Count', 'Diagnosis Category Cost', 'Genderwise Claim Cost', 'Total Benefit Records'],
    tables: ['database_claims_data', 'sheet1_navigation'],
    owner: 'Sarah Mitchell',
    lastViewed: '76 days ago',
    userGroups: ['Clinical Review', 'Medical Claims'],
    summary: 'Static medical diagnostic and clinical benefit review workbook superseded by enterprise claims reporting.',
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
    id: 'tb_keep_1',
    category: 'bi-keep',
    title: 'Keep Benefeciery services_v1',
    businessArea: 'Customer',
    assets: [asset('Benefeciery services_v1', 'Tableau')],
    rationale: 'Primary customer service operational dashboard tracking beneficiary dispute resolution, turnaround times (TAT), and in-good-order (IGO) service aging metrics across case handlers.',
    action: 'Retain and certify as the canonical beneficiary customer service operations dashboard.',
    tags: ['Customer Ops', 'SLA Tracking', 'Certified'],
  },
  {
    id: 'tb_keep_2',
    category: 'bi-keep',
    title: 'Keep Benefeciery_services_Aging_Dashboard',
    businessArea: 'Customer',
    assets: [asset('Benefeciery_services_Aging_Dashboard', 'Tableau')],
    rationale: 'Specialized queue aging workbook tracking maker/checker queue backlog, awaiting requirements cycle times, and operational SLA adherence.',
    action: 'Retain for granular queue-stage backlog monitoring and dispatch management.',
    tags: ['Queue Aging', 'Operational SLA'],
  },
  {
    id: 'tb_keep_3',
    category: 'bi-keep',
    title: 'Keep Claims - Agent Performance',
    businessArea: 'Claims',
    assets: [asset('Claims - Agent Performance', 'Tableau')],
    rationale: 'Core operational dashboard evaluating claims examiner throughput, settlement turnaround times, closed claim volume, and adjuster productivity benchmarks.',
    action: 'Retain and certify as standard adjuster operational scorecard.',
    tags: ['Examiner Scorecard', 'Productivity', 'Certified'],
  },
  {
    id: 'tb_keep_4',
    category: 'bi-keep',
    title: 'Keep Claims - Executive Summary',
    businessArea: 'Claims',
    assets: [asset('Claims - Executive Summary', 'Tableau')],
    rationale: 'C-suite claims leadership hub monitoring incurred loss reserves, paid loss severity, target days to settle, and customer retention metrics.',
    action: 'Retain and certify as executive claims leadership dashboard.',
    tags: ['Executive', 'Reserving & Loss', 'Certified'],
  },
  {
    id: 'tb_keep_5',
    category: 'bi-keep',
    title: 'Keep Claims - State Performance',
    businessArea: 'Claims',
    assets: [asset('Claims - State Performance', 'Tableau')],
    rationale: 'Jurisdictional claims loss ratio and statutory reporting dashboard analyzing regional loss frequency, settlement duration, and geographic variance.',
    action: 'Retain for state-level statutory loss ratio monitoring and regional reviews.',
    tags: ['Statutory', 'Loss Ratio', 'Regional'],
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
  return section === 'bi' ? biOverlapMetrics : computeEtlOverlapMetrics();
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
