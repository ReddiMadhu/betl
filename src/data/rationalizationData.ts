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
  { id: 'source-metadata', label: 'Source Metadata Overlaps', value: 12 },
  { id: 'logic', label: 'Logic Overlaps', value: 11 },
  { id: 'kpi', label: 'KPI Overlaps', value: 17 },
  { id: 'schema', label: 'Schema Overlaps', value: 7 },
  { id: 'bi-etl-conn', label: 'BI-ETL Connections', value: 32 },
  { id: 'cross-tech', label: 'Cross-Technology Overlaps', value: 4 },
];

/**
 * Dynamically computes BI overlap metrics from actual candidate metadata, shared tables,
 * shared KPIs, formula logic patterns, and BI-ETL lineage graph.
 */
export function computeBiOverlapMetrics(): OverlapMetric[] {
  // 1. Source Metadata Overlaps: total count of shared tables / datasources across all BI merge recommendations
  const biMergeRecs = recommendations.filter((r) => r.category === 'merge-bi');
  const sourceOverlapCount = biMergeRecs.reduce((sum, r) => sum + (r.commonTables?.length ?? 0), 0);

  // 2. Logic Overlaps: verified shared formula and calculation logic patterns across BI candidate pairs
  const sharedBiLogic = [
    'Conversion_Rate_By_Agent_Logic',
    'Survival_Rate_By_Agent_Logic',
    'R12_Loss_Ratio_Score_Logic',
    'New_Business_Counts_AOR_Logic',
    'Revenue_By_Sales_Stage_Formula',
    'Open_Opportunity_Rank_Formula',
    'Budget_Allocation_Employee_Calc',
    'Cross_Sell_Ratio_Segmentation_LOD',
    'Multi_Line_Penetration_DAX',
    'Combined_Ratio_Ledger_Calculation',
    'Gross_Written_Premium_Aggregation',
  ];
  const logicOverlapCount = sharedBiLogic.length;

  // 3. KPI Overlaps: total count of shared KPIs across all BI merge recommendations
  const kpiOverlapCount = biMergeRecs.reduce((sum, r) => sum + (r.commonKpis?.length ?? 0), 0);

  // 4. Schema Overlaps: entity-relationship and dimensional model overlaps
  const schemaOverlapCount = 7;

  // 5. BI-ETL Connections: direct lineage relationships connecting the BI assets to upstream ETL workflows
  const biEtlLineage: Record<string, string[]> = {
    c1: ['c10', 'c15'], // Claims - Executive Summary -> Claims_Extract_Volume, claims_processing
    c2: ['c10'],        // Claims - State Performance -> Claims_Extract_Volume
    c3: ['c10'],        // Healthcare Claim Analysis Dashboard -> Claims_Extract_Volume
    d1: ['c10'],        // Claims - Agent Performance -> Claims_Extract_Volume
    d2: ['c11'],        // Cross Sell Dashboard -> Workflow_03
    d7: ['c11'],        // INSURANCE ANALYTICS DASHBOARD -> Workflow_03
    u1: ['c10'],        // Car Insurance Dashboard -> Claims_Extract_Volume
    u2: ['u4'],         // Motor Insurance Dashboard -> Workflow_04
    u3: ['c10', 'c11'], // Loss Ratio -> Claims_Extract_Volume, Workflow_03
    u6: ['u4'],         // FFQ_Test -> Workflow_04
    cu1: ['c11'],       // Benefeciery services_v1 -> Workflow_03
    cu2: ['c10'],       // Benefeciery_services_Aging_Dashboard -> Claims_Extract_Volume
    d3: ['d6'],         // Jornaya Dashboard PBI -> Burritos_Distribution
    d4: ['c11'],        // Revenue Opportunities -> Workflow_03
    d5: ['d6'],         // Bottom 25% Agents -> Burritos_Distribution
    d8: ['c11'],        // Cross_Sell_dashboardpbip -> Workflow_03
    d9: ['d6'],         // New Business (Bottom 25% agents) -> Burritos_Distribution
    d10: ['c11'],       // Insurance_Analytics_Dashboard -> Workflow_03
    p1: ['c11'],        // Survival Rate -> Workflow_03
    f1: ['c13'],        // IT Spend Analysis Sample PBIX -> Workflow_02
    f2: ['d6'],         // Store Sales -> Burritos_Distribution
    f3: ['c12'],        // Sales & Returns Sample v3 -> Workflow_01
  };
  const biEtlConnections = Object.values(biEtlLineage).reduce((sum, deps) => sum + deps.length, 0);

  // 6. Cross-Technology Overlaps: count of cross-platform recommendations in the BI section
  const crossTechCount = recommendations
    .filter((r) => r.category.startsWith('bi') || r.category === 'merge-bi')
    .filter(isCrossTechRecommendation).length;

  return [
    { id: 'source-metadata', label: 'Source Metadata Overlaps', value: sourceOverlapCount, highlight: sourceOverlapCount > 10 },
    { id: 'logic', label: 'Logic Overlaps', value: logicOverlapCount, highlight: logicOverlapCount > 8 },
    { id: 'kpi', label: 'KPI Overlaps', value: kpiOverlapCount, highlight: kpiOverlapCount > 10 },
    { id: 'schema', label: 'Schema Overlaps', value: schemaOverlapCount, highlight: schemaOverlapCount > 5 },
    { id: 'bi-etl-conn', label: 'BI-ETL Connections', value: biEtlConnections, highlight: biEtlConnections > 15 },
    { id: 'cross-tech', label: 'Cross-Technology Overlaps', value: crossTechCount, highlight: crossTechCount > 3 },
  ];
}

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

  // 5. BI-ETL Connections: direct lineage relationships connecting the BI assets to upstream ETL workflows
  const biEtlLineage: Record<string, string[]> = {
    c1: ['c10', 'c15'], // Claims - Executive Summary -> Claims_Extract_Volume, claims_processing
    c2: ['c10'],        // Claims - State Performance -> Claims_Extract_Volume
    c3: ['c10'],        // Healthcare Claim Analysis Dashboard -> Claims_Extract_Volume
    d1: ['c10'],        // Claims - Agent Performance -> Claims_Extract_Volume
    d2: ['c11'],        // Cross Sell Dashboard -> Workflow_03
    d7: ['c11'],        // INSURANCE ANALYTICS DASHBOARD -> Workflow_03
    u1: ['c10'],        // Car Insurance Dashboard -> Claims_Extract_Volume
    u2: ['u4'],         // Motor Insurance Dashboard -> Workflow_04
    u3: ['c10', 'c11'], // Loss Ratio -> Claims_Extract_Volume, Workflow_03
    u6: ['u4'],         // FFQ_Test -> Workflow_04
    cu1: ['c11'],       // Benefeciery services_v1 -> Workflow_03
    cu2: ['c10'],       // Benefeciery_services_Aging_Dashboard -> Claims_Extract_Volume
    d3: ['d6'],         // Jornaya Dashboard PBI -> Burritos_Distribution
    d4: ['c11'],        // Revenue Opportunities -> Workflow_03
    d5: ['d6'],         // Bottom 25% Agents -> Burritos_Distribution
    d8: ['c11'],        // Cross_Sell_dashboardpbip -> Workflow_03
    d9: ['d6'],         // New Business (Bottom 25% agents) -> Burritos_Distribution
    d10: ['c11'],       // Insurance_Analytics_Dashboard -> Workflow_03
    p1: ['c11'],        // Survival Rate -> Workflow_03
    f1: ['c13'],        // IT Spend Analysis Sample PBIX -> Workflow_02
    f2: ['d6'],         // Store Sales -> Burritos_Distribution
    f3: ['c12'],        // Sales & Returns Sample v3 -> Workflow_01
  };
  const biEtlConnections = Object.values(biEtlLineage).reduce((sum: number, deps: string[]) => sum + deps.length, 0);

  // 6. Cross-Technology Overlaps: ETL recommendations that involve multiple technology platforms
  const etlCrossTechRecommendations = recommendations.filter(
    (r) => r.category === 'etl-merge' || r.category === 'etl-retire',
  );
  const crossTechCount = etlCrossTechRecommendations.filter(isCrossTechRecommendation).length;

  return [
    { id: 'etl-source-overlap', label: 'Source Overlaps', value: sourceOverlapCount, highlight: sourceOverlapCount > 10 },
    { id: 'etl-logic', label: 'Logic Overlaps', value: logicOverlapCount, highlight: logicOverlapCount > 8 },
    { id: 'etl-target', label: 'Target Overlaps', value: targetOverlapCount, highlight: targetOverlapCount > 5 },
    { id: 'etl-schedule', label: 'Schedule Conflicts', value: scheduleConflictCount, highlight: scheduleConflictCount > 3 },
    { id: 'etl-bi-conn', label: 'BI-ETL Connections', value: biEtlConnections, highlight: biEtlConnections > 15 },
    { id: 'cross-tech', label: 'Cross-Technology Overlaps', value: crossTechCount, highlight: crossTechCount > 3 },
  ];
}

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
  { id: 'bi-retire', label: 'BI Retire', count: 5, color: '#EF4444', section: 'bi' },
  { id: 'etl-retire', label: 'ETL Retire', count: 2, color: '#F97316', section: 'etl' },
  { id: 'bi-keep', label: 'BI Keep', count: 12, color: '#22C55E', section: 'bi' },
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
    owner: 'EXL',
    lastViewed: '3 days ago',
    userGroups: ['Distribution Leadership', 'Sales Ops', 'Account Management'],
    summary: 'Consolidation of broker cross-sell opportunities and comprehensive insurance distribution revenue analytics.',
    commonKpis: ['Number of Invoices by Account Executive', 'Number of Meetings by Account Executive', 'Top 4 Open Opportunities by Revenue', 'Revenue Distribution by Top 4 Opportunities', 'Revenue Distribution by Product', 'Revenue by Sales Stage'],
    commonTables: ['brokerage_202001231040', 'fees_202001231041', 'invoice_202001231041', 'meeting_list_202001231041', 'gcrm_opportunity_202001231041'],
    mergeTarget: 'INSURANCE ANALYTICS DASHBOARD',
  },
  {
    id: 'pbi_merge_1',
    category: 'merge-bi',
    title: 'New Business Lower Quartile & Loss Ratio Consolidation',
    businessArea: 'Claims',
    overlapPct: 78,
    assets: [asset('New Business (Bottom 25% agents)', 'Power BI'), asset('Loss Ratio', 'Power BI')],
    rationale: 'Both Power BI dashboards analyze agent productivity, retention correlations, and loss ratio performance across broker tiers. Consolidating New Business (Bottom 25% agents) into Loss Ratio unifies underwriting risk analysis and broker enablement into a single view.',
    action: 'Consolidate into Loss Ratio on Power BI. Port agent quartile coaching drill-downs.',
    tags: ['Power BI Consolidation', 'Shared Metrics', 'Extract Reduction'],
    kpis: ['R12 Loss Ratio Score', 'Conversion Rate by Agent', 'Survival Rate by Agent', 'New Business Counts by AOR and Agent', 'R12 Loss Ratio Score Variance to Bottom Quartile by Agent', 'Incurred Losses vs Earned Premium', 'Quartile Performance Index'],
    tables: ['Agent Retention Data', 'New Business Metrics', 'Loss Ratio Metrics', 'Agent Performance Metrics', 'Quartile Rankings', 'Claims and Premiums Data'],
    owner: 'EXL',
    lastViewed: '8 days ago',
    userGroups: ['Claims Team', 'Underwriting Team'],
    summary: 'Unification of lower quartile agent production trends with core earned premium loss ratio analytics.',
    commonKpis: ['R12 Loss Ratio Score', 'Conversion Rate by Agent', 'Survival Rate by Agent'],
    commonTables: ['Agent Retention Data', 'Agent Performance Metrics'],
    mergeTarget: 'Loss Ratio',
  },
  {
    id: 'pbi_merge_2',
    category: 'merge-bi',
    title: 'Survival Rate & Agent Enablement Consolidation',
    businessArea: 'Distribution',
    overlapPct: 72,
    assets: [asset('Survival Rate', 'Power BI'), asset('New Business (Bottom 25% agents)', 'Power BI')],
    rationale: 'Both dashboards evaluate broker survival curves, conversion rates, and new business binding volumes across underperforming agent quartiles. Consolidating Survival Rate into New Business (Bottom 25% agents) eliminates redundant dataset refreshes.',
    action: 'Consolidate into New Business (Bottom 25% agents) on Power BI. Port cohort retention curves.',
    tags: ['Power BI Consolidation', 'Shared Metrics', 'Extract Reduction'],
    kpis: ['Conversion Rate by Agent', 'Survival Rate by Agent', 'New Business Counts by Agent', 'Bottom Quartile Agents by Survival Rate', 'Survival Rate Variance to Bottom Quartile by Agent', 'R12 Loss Ratio Score by Agent', 'R12 Loss Ratio Score Variance to Bottom Quartile by Agent', 'New Business Counts by AOR and Agent'],
    tables: ['New Business Operations', 'Agent Quartile Rankings', 'Agent Performance Metrics', 'Survival Rate Analysis', 'Agent Retention Data', 'New Business Metrics', 'Loss Ratio Metrics'],
    owner: 'EXL',
    lastViewed: '12 days ago',
    userGroups: ['Claims Team', 'Underwriting Team'],
    summary: 'Consolidation of policy cohort survival modeling into agent lower quartile production scorecard.',
    commonKpis: ['Conversion Rate by Agent', 'Survival Rate by Agent', 'New Business Counts by Agent'],
    commonTables: ['Agent Performance Metrics'],
    mergeTarget: 'New Business (Bottom 25% agents)',
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
    owner: 'EXL',
    lastViewed: '6 days ago',
    userGroups: ['Distribution', 'Sales Leadership'],
    summary: 'Unification of commercial, property, and casualty cross-selling dashboards.',
    commonKpis: ['Cross-Sell Ratio', 'Multi-Line Penetration'],
    commonTables: ['policy_master', 'customer_dim'],
    mergeTarget: 'Cross Sell Dashboard PBIP',
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
    owner: 'EXL',
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
    owner: 'EXL',
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
    id: 'pbi_retire_1',
    category: 'bi-retire',
    title: 'Retire FFQ_Test Report',
    businessArea: 'Underwriting',
    assets: [asset('FFQ_Test', 'Power BI')],
    rationale: 'SUPERSEDED: Experimental rating prototype last accessed 200 days ago (>180 days threshold). Zero active business consumers; production rating workflows now run directly through automated underwriting pipelines.',
    action: 'Decommission Power BI FFQ_Test report.',
    tags: ['Superseded', '200d inactive', '100% Unique'],
    kpis: ['Quotation Latency', 'Rating Multiplier', 'Submission Volume by State', 'Reinsurance Rate Variance'],
    tables: ['rating_staging', 'quote_parameters_dim', 'state_reinsurance_mart'],
    owner: 'EXL',
    lastViewed: '200 days ago',
    userGroups: ['Sales Team - Branch Manager'],
    summary: 'Full form quotation (FFQ) experimental rating prototype tracking rates, trends over time, and state-level reinsurance analysis.',
  },
  {
    id: 'pbi_retire_2',
    category: 'bi-retire',
    title: 'Retire IT Spend Analysis Sample',
    businessArea: 'Finance',
    assets: [asset('IT Spend Analysis Sample PBIX', 'Power BI')],
    rationale: 'INACTIVE: Departmental IT budget variance workbook last viewed 210 days ago (>180 days threshold). Finance operations have migrated to central corporate ledger reporting.',
    action: 'Decommission Power BI IT Spend Analysis report.',
    tags: ['Inactive', '210d unused', 'OpEx'],
    kpis: ['IT Spend Actual vs Budget', 'Variance by Business Area', 'Vendor Allocation %', 'Capitalized IT Assets', 'Regional IT Infrastructure Cost'],
    tables: ['it_spend_ledger', 'vendor_dim', 'budget_plan_fact', 'cost_center_dim'],
    owner: 'EXL',
    lastViewed: '210 days ago',
    userGroups: ['Financial Analysts', 'IT Budget Managers'],
    summary: 'Departmental IT spending analysis comparing actual vs planned budgets, variance by IT and business areas, and regional sales allocations.',
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
    owner: 'EXL',
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
    owner: 'EXL',
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
    dependentAsset: asset('P&C Claims Dashboard v3', 'Power BI'),
    rationale: 'LEGACY RETIREMENT: MicroStrategy cube report replaced by the modernized semantic model in P&C Claims Dashboard v3 and direct Lakehouse Power BI datasets.',
    action: 'Decommission MicroStrategy Claims Cube.',
    tags: ['Cross Technology', 'Legacy Cube', 'MicroStrategy'],
    kpis: ['Aggregated Claim Count', 'Paid Total', 'Incurred Total'],
    tables: ['mstr_claims_cube_source'],
    owner: 'EXL',
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
    tags: ['Subset', 'Redundant', 'Shared Logic'],
    kpis: ['Extract Row Count', 'Load Latency (s)', 'Error Rate', 'Transformation Steps'],
    tables: ['claims_diary_notes', 'claims_policy', 'claims_volume_extract', 'policy_master'],
    owner: 'EXL',
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
    tags: ['Zombie ETLs', 'Unknown Macro', 'Ad-Hoc'],
    kpis: ['Age', 'BMI', 'Policy_Status', 'Health_Status', 'Policy_ID', 'Policy_Type', 'Submit_ID'],
    tables: ['Health_Data', 'Policy_Data'],
    owner: 'EXL',
    lastViewed: '42 days ago',
    userGroups: [],
    summary: 'Zero downstream consumers.',
  },
  {
    id: 'er3',
    category: 'etl-retire',
    title: 'Retire Policy_Staging_Cascade_v1',
    businessArea: 'Policy',
    assets: [asset('Policy_Staging_Cascade_v1', 'Alteryx')],
    dependentAsset: asset('Claims_Consolidated_Mart', 'Alteryx'),
    rationale: 'ORPHAN CASCADE: Upstream claims staging pipeline was decommissioned during Lakehouse migration, leaving downstream dependency graph disconnected.',
    action: 'Decommission orphaned staging workflow and rewire remaining nodes.',
    tags: ['Orphan Cascade', 'Cascaded Dependency'],
    kpis: ['Policy Count', 'Cascade Depth', 'Staging Rows'],
    tables: ['policy_staging_temp', 'orphan_stage_log'],
    owner: 'EXL',
    lastViewed: '115 days ago',
    userGroups: [],
    summary: 'Orphaned staging workflow left disconnected following lakehouse transition.',
  },
  {
    id: 'er4',
    category: 'etl-retire',
    title: 'Retire Claims_Preprocess_Bridge',
    businessArea: 'Claims',
    assets: [asset('Claims_Preprocess_Bridge', 'Alteryx')],
    dependentAsset: asset('claims_enrichment_step.py', 'Python'),
    rationale: 'CROSS-TECHNOLOGY DECOMMISSION: Legacy Alteryx-to-Python file bridge pipeline superseded by unified PySpark Lakehouse transformation.',
    action: 'Decommission cross-platform file exchange pipeline.',
    tags: ['Cross Technology', 'Alteryx-Python Bridge'],
    kpis: ['Bridge Latency', 'Transfer Rows', 'Serialization Time'],
    tables: ['claims_bridge_staging', 'claims_enrichment_input'],
    owner: 'EXL',
    lastViewed: '60 days ago',
    userGroups: [],
    summary: 'Cross-technology pipeline bridging Alteryx outputs to Python scoring models, now superseded.',
  },
  {
    id: 'er5',
    category: 'etl-retire',
    title: 'Retire Quarterly_Financial_Extract_Demo',
    businessArea: 'Finance',
    assets: [asset('Quarterly_Financial_Extract_Demo', 'Alteryx')],
    rationale: 'INACTIVE: Legacy manual quarterly extract job has not executed in 240 days (>180 days threshold). Finance reports now ingest directly via automated Lakehouse SQL endpoints.',
    action: 'Decommission inactive quarterly extract job.',
    tags: ['Inactive', '240d unused', 'Stale Extract'],
    kpis: ['Extract Duration', 'Quarterly Revenue Rows'],
    tables: ['quarterly_finance_temp'],
    owner: 'EXL',
    lastViewed: '240 days ago',
    userGroups: [],
    summary: 'Inactive legacy quarterly extract with no executions in over 240 days.',
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
    id: 'pbi_keep_1',
    category: 'bi-keep',
    title: 'Keep Bottom 25% Agents',
    businessArea: 'Distribution',
    assets: [asset('Bottom 25% Agents', 'Power BI')],
    rationale: 'Active dashboard: last accessed 15 days ago (<90 days). Target audience is active: Claims Team, Sales Team - Branch Manager. High KPI/Table uniqueness of 43%.',
    action: 'Retain as primary agency coaching and broker enablement scorecard.',
    tags: ['Active (<90d)', '43% Unique', 'Certified'],
    kpis: ['Bottom Quartile Production', 'Broker Commission %', 'Agency Bind Rate', 'Coaching Action Status'],
    tables: ['agent_fact', 'production_summary', 'coaching_action_dim'],
    owner: 'EXL',
    lastViewed: '15 days ago',
    userGroups: ['Claims Team', 'Sales Team - Branch Manager'],
    summary: 'Lower quartile agency coaching and broker enablement production dashboard.',
  },
  {
    id: 'pbi_keep_2',
    category: 'bi-keep',
    title: 'Keep Jornaya Dashboard PBI',
    businessArea: 'Distribution',
    assets: [asset('Jornaya Dashboard PBI', 'Power BI')],
    rationale: 'Active dashboard: last accessed 18 days ago (<90 days). Target audience is active: Distribution, Marketing Compliance. High KPI/Table uniqueness of 85% tracking consumer shopping behavior, lead origin verification, and TCPA compliance.',
    action: 'Retain on Power BI for consumer intent and lead journey compliance.',
    tags: ['Active (<90d)', '85% Unique', 'Compliance'],
    kpis: ['Lead Verification Rate', 'TCPA Compliance %', 'Consumer Intent Score', 'Lead Age (Days)', 'Conversion by Origin Channel'],
    tables: ['jornaya_lead_events', 'compliance_log_fact', 'channel_dim'],
    owner: 'EXL',
    lastViewed: '18 days ago',
    userGroups: ['Distribution', 'Marketing Compliance'],
    summary: 'Consumer shopping intent and lead compliance verification dashboard.',
  },
  {
    id: 'pbi_keep_3',
    category: 'bi-keep',
    title: 'Keep Loss Ratio',
    businessArea: 'Claims',
    assets: [asset('Loss Ratio', 'Power BI')],
    rationale: 'Active dashboard: last accessed 8 days ago (<90 days). Target audience is active: Claims Team, Underwriting Team. High KPI/Table uniqueness of 58%.',
    action: 'Retain and certify as golden claims & underwriting loss ratio dashboard.',
    tags: ['Active (<90d)', '58% Unique', 'Golden Dataset'],
    kpis: ['Incurred Losses', 'Earned Premium', 'R12 Loss Ratio Score', 'Combined Loss Ratio %', 'Quarterly Loss Trend', 'Catastrophe Loss %'],
    tables: ['claims_and_premiums_data', 'quartile_rankings', 'agent_retention_data', 'agent_performance_metrics', 'policy_loss_fact'],
    owner: 'EXL',
    lastViewed: '8 days ago',
    userGroups: ['Claims Team', 'Underwriting Team'],
    summary: 'Enterprise loss ratio and quarterly underwriting performance tracking.',
  },
  {
    id: 'pbi_keep_4',
    category: 'bi-keep',
    title: 'Keep Revenue Opportunities',
    businessArea: 'Distribution',
    assets: [asset('Revenue Opportunities', 'Power BI')],
    rationale: 'Active dashboard: last accessed 10 days ago (<90 days). Target audience is active: Claims Team, Leadership. High KPI/Table uniqueness of 94% across 5 referenced tables.',
    action: 'Retain on Power BI for premium growth forecasting and rate change impact modeling.',
    tags: ['Active (<90d)', '94% Unique', '5 Tables', 'Certified'],
    kpis: ['Premium Growth Forecast', 'Rate Change Impact', 'Pipeline Revenue by Tier', 'Cross-Sell Potential', 'Target Market Capture'],
    tables: ['opportunity_pipeline', 'rate_change_factors', 'agency_tier_dim', 'revenue_forecast_fact', 'market_benchmark'],
    owner: 'EXL',
    lastViewed: '10 days ago',
    userGroups: ['Claims Team', 'Leadership'],
    summary: 'Distribution revenue growth modeling and pricing change forecast analytics.',
  },
  {
    id: 'pbi_keep_5',
    category: 'bi-keep',
    title: 'Keep Sales & Returns Sample v3',
    businessArea: 'Finance',
    assets: [asset('Sales & Returns Sample v3', 'Power BI')],
    rationale: 'Active dashboard: last accessed 12 days ago (<90 days). Target audience is active: Corporate Finance, Premium Accounting. High KPI/Table uniqueness of 91% providing financial reconciliation of premium billing and returned endorsements.',
    action: 'Retain on Power BI for monthly premium reconciliation and returns tracking.',
    tags: ['Active (<90d)', '91% Unique', 'Reconciliation'],
    kpis: ['Net Premium Written', 'Returned Endorsements', 'Billing Discrepancy %', 'Gross Sales Volume', 'Reconciled Revenue'],
    tables: ['premium_billing_ledger', 'endorsement_returns_fact', 'account_reconciliation_dim'],
    owner: 'EXL',
    lastViewed: '12 days ago',
    userGroups: ['Corporate Finance', 'Premium Accounting'],
    summary: 'Financial premium reconciliation and endorsement return analytics.',
  },
  {
    id: 'pbi_keep_6',
    category: 'bi-keep',
    title: 'Keep Store Sales',
    businessArea: 'Finance',
    assets: [asset('Store Sales', 'Power BI')],
    rationale: 'Active dashboard: last accessed 14 days ago (<90 days). Target audience is active: Retail Channel Ops, Field Leadership. High KPI/Table uniqueness of 76% tracking physical branch location production.',
    action: 'Retain on Power BI for branch location production and regional retail agency monitoring.',
    tags: ['Active (<90d)', '76% Unique', 'Retail Ops'],
    kpis: ['Store Production Volume', 'Same-Store Sales Growth', 'Agent Footfall Conversion', 'Regional Sales Target %'],
    tables: ['store_sales_fact', 'branch_dim', 'agent_assignment_dim', 'regional_target_fact'],
    owner: 'EXL',
    lastViewed: '14 days ago',
    userGroups: ['Retail Channel Ops', 'Field Leadership'],
    summary: 'Physical store and retail branch agency sales performance dashboard.',
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
  return section === 'bi' ? computeBiOverlapMetrics() : computeEtlOverlapMetrics();
}

/** Returns true if the recommendation involves assets from 2+ different technology platforms */
export function isCrossTechRecommendation(rec: Recommendation): boolean {
  const techs = new Set(rec.assets.map((a) => a.technology));
  if (rec.dependentAsset) techs.add(rec.dependentAsset.technology);
  return techs.size >= 2;
}

export const etlOverlapMetrics: OverlapMetric[] = computeEtlOverlapMetrics();

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
