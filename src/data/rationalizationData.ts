import { TECHNOLOGY_LOGOS, allAssets } from './discoveryData';
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

// Mappings of BI candidate logic and schema overlaps
const BI_CANDIDATE_LOGIC_OVERLAPS: Record<string, number> = {
  tb_merge_1: 3, // Revenue by Sales Stage, Open Opportunity Rank, Budget Allocation by Employee
  pbi_merge_1: 3, // Conversion Rate by Agent, Survival Rate by Agent, R12 Loss Ratio Score
  pbi_merge_2: 2, // New Business Counts AOR, Survival Rate by Agent
  mb2: 2,         // Cross-Sell Ratio LOD, Multi-Line Penetration DAX
  mb4: 1,         // Combined Ratio Ledger Calculation
};

const BI_CANDIDATE_SCHEMA_OVERLAPS: Record<string, number> = {
  tb_merge_1: 2, // brokerage_202001231040 ↔ gcrm_opportunity, fees ↔ invoice
  pbi_merge_1: 2, // Agent Retention Data ↔ Agent Performance Metrics, Loss Ratio Metrics ↔ Claims
  pbi_merge_2: 1, // Agent Performance Metrics ↔ Quartile Rankings
  mb2: 1,         // policy_master ↔ customer_dim
  mb4: 1,         // finance_ledger ↔ premium_fact
};

// Lineage mapping from BI asset name to upstream ETL workflow IDs
const BI_NAME_TO_ETL_WORKFLOWS: Record<string, string[]> = {
  'Claims - Executive Summary': ['c10', 'c15'],
  'Claims - State Performance': ['c10'],
  'Healthcare Claim Analysis Dashboard': ['c10'],
  'Claims - Agent Performance': ['c10'],
  'Cross Sell Dashboard': ['c11'],
  'INSURANCE ANALYTICS DASHBOARD': ['c11'],
  'Car Insurance Dashboard': ['c10'],
  'Motor Insurance Dashboard': ['u4'],
  'Loss Ratio': ['c10', 'c11'],
  'FFQ_Test': ['u4'],
  'Benefeciery services_v1': ['c11'],
  'Benefeciery_services_Aging_Dashboard': ['c10'],
  'Jornaya Dashboard PBI': ['d6'],
  'Revenue Opportunities': ['c11'],
  'Bottom 25% Agents': ['d6'],
  'Cross Sell Dashboard PBIP': ['c11'],
  'Cross_Sell_dashboardpbip': ['c11'],
  'New Business (Bottom 25% agents)': ['d6'],
  'Insurance Analytics Dashboard': ['c11'],
  'Insurance Analytics Dashboard (Tableau)': ['c11'],
  'Insurance Analytics Dashboard (Power BI)': ['c11'],
  'Sales Insurance.twbx': ['c11'],
  'Survival Rate': ['c11'],
  'IT Spend Analysis Sample PBIX': ['c13'],
  'Sales & Returns Sample v3': ['d6'],
};

// Lineage mapping from ETL workflow name/ID to downstream BI reports
const ETL_WORKFLOW_TO_BI_ASSETS: Record<string, string[]> = {
  'c10': ['Claims - Executive Summary', 'Claims - State Performance', 'Healthcare Claim Analysis Dashboard', 'Claims - Agent Performance', 'Car Insurance Dashboard', 'Loss Ratio', 'Benefeciery_services_Aging_Dashboard'],
  'Claims_Extract_Volume': ['Claims - Executive Summary', 'Claims - State Performance', 'Healthcare Claim Analysis Dashboard', 'Claims - Agent Performance', 'Car Insurance Dashboard', 'Loss Ratio', 'Benefeciery_services_Aging_Dashboard'],
  'Claims_Extract_Volume_Daily': ['Claims - Executive Summary', 'Claims - State Performance', 'Healthcare Claim Analysis Dashboard', 'Claims - Agent Performance', 'Car Insurance Dashboard', 'Loss Ratio', 'Benefeciery_services_Aging_Dashboard'],
  'c14': ['Claims - Executive Summary', 'Claims - State Performance', 'Healthcare Claim Analysis Dashboard', 'Claims - Agent Performance', 'Car Insurance Dashboard', 'Loss Ratio', 'Benefeciery_services_Aging_Dashboard'],
  'claims_processing': ['Claims - Executive Summary'],
  'c15': ['Claims - Executive Summary'],
  'c11': ['Cross Sell Dashboard', 'INSURANCE ANALYTICS DASHBOARD', 'Loss Ratio', 'Benefeciery services_v1', 'Revenue Opportunities', 'Cross Sell Dashboard PBIP', 'Cross_Sell_dashboardpbip', 'Insurance Analytics Dashboard', 'Insurance Analytics Dashboard (Tableau)', 'Insurance Analytics Dashboard (Power BI)', 'Sales Insurance.twbx', 'Survival Rate'],
  'Workflow_03': ['Cross Sell Dashboard', 'INSURANCE ANALYTICS DASHBOARD', 'Loss Ratio', 'Benefeciery services_v1', 'Revenue Opportunities', 'Cross Sell Dashboard PBIP', 'Cross_Sell_dashboardpbip', 'Insurance Analytics Dashboard', 'Insurance Analytics Dashboard (Tableau)', 'Insurance Analytics Dashboard (Power BI)', 'Sales Insurance.twbx', 'Survival Rate'],
  'c12': ['Insurance Analytics Dashboard'],
  'Workflow_01': ['Insurance Analytics Dashboard'],
  'c13': ['IT Spend Analysis Sample PBIX'],
  'Workflow_02': ['IT Spend Analysis Sample PBIX'],
  'd6': ['Sales & Returns Sample v3'],
  'Workflow_08': ['Sales & Returns Sample v3'],
  'u4': ['Motor Insurance Dashboard', 'FFQ_Test'],
  'Workflow_04': ['Motor Insurance Dashboard', 'FFQ_Test'],
};

/**
 * Dynamically computes BI overlap metrics from the currently displayed candidate subset.
 */
export function computeBiOverlapMetrics(displayedRecs?: Recommendation[]): OverlapMetric[] {
  const recs = displayedRecs ?? recommendations.filter((r) => r.category.startsWith('bi') || r.category === 'merge-bi');

  // 1. Source Metadata Overlaps: total count of shared tables / datasources across displayed recommendations
  const sourceOverlapCount = recs.reduce((sum, r) => sum + (r.commonTables?.length ?? 0), 0);

  // 2. Logic Overlaps: verified shared formula and calculation logic patterns across displayed candidate pairs
  const logicOverlapCount = recs.reduce((sum, r) => sum + (BI_CANDIDATE_LOGIC_OVERLAPS[r.id] ?? 0), 0);

  // 3. KPI Overlaps: total count of shared KPIs across displayed recommendations
  const kpiOverlapCount = recs.reduce((sum, r) => sum + (r.commonKpis?.length ?? 0), 0);

  // 4. Schema Overlaps: entity-relationship and dimensional model overlaps across displayed candidates
  const schemaOverlapCount = recs.reduce((sum, r) => sum + (BI_CANDIDATE_SCHEMA_OVERLAPS[r.id] ?? 0), 0);

  // 5. BI-ETL Connections: direct lineage relationships connecting the displayed BI assets to upstream ETL workflows
  const biAssetNames = new Set<string>();
  recs.forEach((r) => {
    r.assets?.forEach((a) => biAssetNames.add(a.name));
    if (r.dependentAsset) biAssetNames.add(r.dependentAsset.name);
  });
  let biEtlConnections = 0;
  biAssetNames.forEach((name) => {
    const deps = BI_NAME_TO_ETL_WORKFLOWS[name] || [];
    biEtlConnections += deps.length;
  });

  // 6. Cross-Technology Overlaps: count of cross-platform recommendations in displayed candidates
  const crossTechCount = recs.filter(isCrossTechRecommendation).length;

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
 * Dynamically computes ETL overlap metrics from the currently displayed ETL candidate subset.
 */
export function computeEtlOverlapMetrics(displayedRecs?: Recommendation[]): OverlapMetric[] {
  const recs = displayedRecs ?? recommendations.filter((r) => r.category.startsWith('etl'));

  // 1. Source Overlaps: matching sources derived from detailed evidence comparison of displayed candidates
  let sourceOverlapCount = 0;
  recs.forEach((r) => {
    if (r.category === 'etl-merge' || r.category === 'etl-retire') {
      try {
        const detail = getEtlCandidateDetail(r);
        if (detail?.sourcesComparison && detail.sourcesComparison.length > 0) {
          const matches = detail.sourcesComparison.filter(
            (s) => s.matchStatus === 'exact' || (s.leftPresent && s.rightPresent),
          ).length;
          sourceOverlapCount += matches;
        }
      } catch {
        // detail not available for this rec
      }
    }
  });

  // 2. Logic Overlaps: verified transformation logic, formulas, and summarizations from displayed candidates
  let logicOverlapCount = 0;
  recs.forEach((r) => {
    if (r.category === 'etl-merge' || r.category === 'etl-retire') {
      try {
        const detail = getEtlCandidateDetail(r);
        if (detail?.logicComparison?.leftOperations && detail.logicComparison.leftOperations.length > 0) {
          const sharedOps = detail.logicComparison.leftOperations.filter((op) => op.isShared).length;
          logicOverlapCount += sharedOps;
        } else if (detail?.logicComparison?.rules && detail.logicComparison.rules.length > 0) {
          const matchedRules = detail.logicComparison.rules.filter(
            (rule) => rule.matchType === 'Identical' || rule.matchType === 'Equivalent',
          ).length;
          logicOverlapCount += matchedRules;
        }
      } catch {
        // detail not available for this rec
      }
    }
  });

  // 3. Target Overlaps: matching targets derived from detailed comparison
  let targetOverlapCount = 0;
  recs.forEach((r) => {
    if (r.category === 'etl-merge' || r.category === 'etl-retire') {
      try {
        const detail = getEtlCandidateDetail(r);
        if (detail?.targetsComparison && detail.targetsComparison.length > 0) {
          const matches = detail.targetsComparison.filter(
            (t) => t.matchStatus === 'exact' || (t.leftPresent && t.rightPresent),
          ).length;
          targetOverlapCount += matches;
        }
      } catch {
        // detail not available for this rec
      }
    }
  });

  // 4. Schedule Conflicts: conflicting workflows in displayed candidates colliding in schedule window
  let scheduleConflictCount = 0;
  recs.forEach((r) => {
    if (r.category === 'etl-merge' || r.category === 'etl-retire') {
      try {
        const detail = getEtlCandidateDetail(r);
        if (detail?.frequencyComparison?.overlapPct === 100 && r.id === 'er1') {
          scheduleConflictCount += 1;
        }
      } catch {
        // detail not available for this rec
      }
    }
  });

  // 5. BI-ETL Connections: direct lineage relationships connecting displayed workflows to downstream BI assets
  const etlWorkflowNamesOrIds = new Set<string>();
  recs.forEach((r) => {
    r.assets?.forEach((a) => etlWorkflowNamesOrIds.add(a.name));
    if (r.dependentAsset) etlWorkflowNamesOrIds.add(r.dependentAsset.name);
  });
  let biEtlConnections = 0;
  etlWorkflowNamesOrIds.forEach((wf) => {
    const biReports = ETL_WORKFLOW_TO_BI_ASSETS[wf] || [];
    biEtlConnections += biReports.length;
  });

  // 6. Cross-Technology Overlaps: ETL recommendations that involve multiple technology platforms
  const crossTechCount = recs.filter(isCrossTechRecommendation).length;

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
  { id: 'bi-retire', label: 'BI Retire', count: 2, color: '#EF4444', section: 'bi' },
  { id: 'etl-retire', label: 'ETL Retire', count: 3, color: '#F97316', section: 'etl' },
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
  targetKpis?: string[];
  targetTables?: string[];
  owner?: string;
  targetOwner?: string;
  lastViewed?: string;
  userGroups?: string[];
  targetUserGroups?: string[];
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
    targetKpis: ['Number of Invoices by Account Executive', 'Number of Meetings by Account Executive', 'Top 4 Open Opportunities by Revenue', 'Revenue Distribution by Top 4 Opportunities', 'Revenue Distribution by Product', 'Revenue by Sales Stage', 'Achieved Cross Sell Target', 'Budget Attainment Rate', 'Executive Pipeline Volume'],
    targetTables: ['brokerage_202001231040', 'fees_202001231041', 'invoice_202001231041', 'meeting_list_202001231041', 'gcrm_opportunity_202001231041', 'sales_quota_master'],
    owner: 'EXL',
    targetOwner: 'EXLDistribution',
    lastViewed: '3 days ago',
    userGroups: ['Distribution Leadership', 'Sales Ops', 'Account Management'],
    targetUserGroups: ['Distribution Leadership', 'Field Sales Ops', 'Underwriting Executive'],
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
    targetKpis: ['R12 Loss Ratio Score', 'Conversion Rate by Agent', 'Survival Rate by Agent', 'Earned Premium Exposure', 'Direct Incurred Losses', 'Loss Ratio Performance Index'],
    targetTables: ['Agent Retention Data', 'Agent Performance Metrics', 'Loss Ratio Metrics', 'Claims and Premiums Data'],
    owner: 'EXL',
    targetOwner: 'EXL',
    lastViewed: '8 days ago',
    userGroups: ['Claims Team', 'Underwriting Team'],
    targetUserGroups: ['Claims Leadership', 'Actuarial Analytics', 'Underwriting Risk'],
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
    targetKpis: ['Conversion Rate by Agent', 'Survival Rate by Agent', 'New Business Counts by Agent', 'R12 Loss Ratio Score', 'New Business Counts by AOR and Agent', 'R12 Loss Ratio Score Variance to Bottom Quartile by Agent', 'Incurred Losses vs Earned Premium', 'Quartile Performance Index'],
    targetTables: ['Agent Performance Metrics', 'Agent Retention Data', 'New Business Metrics', 'Quartile Rankings'],
    owner: 'EXL',
    targetOwner: 'EXL_S',
    lastViewed: '12 days ago',
    userGroups: ['Claims Team', 'Underwriting Team'],
    targetUserGroups: ['Agency Enablement', 'Distribution Sales', 'Regional Directors'],
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
    targetKpis: ['Cross-Sell Ratio', 'Multi-Line Penetration', 'Policy Bundle Velocity', 'Target Market Penetration Rate', 'Cross-Sell Commission Margin'],
    targetTables: ['policy_master', 'customer_dim', 'line_of_business_dim', 'sales_rep_dim'],
    owner: 'EXL',
    targetOwner: 'EXLDistribution',
    lastViewed: '6 days ago',
    userGroups: ['Distribution', 'Sales Leadership'],
    targetUserGroups: ['Distribution Analytics', 'Commercial Sales', 'Digital Agency'],
    summary: 'Unification of commercial, property, and casualty cross-selling dashboards.',
    commonKpis: ['Cross-Sell Ratio', 'Multi-Line Penetration'],
    commonTables: ['policy_master', 'customer_dim', 'line_of_business_dim'],
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
    targetKpis: ['Gross Written Premium', 'Net Earned Premium', 'Combined Ratio', 'Underwriting Profitability Index', 'Policyholder Surplus Ratio', 'Claims Expense Frequency'],
    targetTables: ['finance_ledger', 'premium_fact', 'expense_dim', 'reinsurance_treaty_fact'],
    owner: 'EXL',
    targetOwner: 'EXL_S',
    lastViewed: '3 days ago',
    userGroups: ['Corporate Finance', 'Executive'],
    targetUserGroups: ['Corporate Finance', 'FP&A Team', 'Executive Board'],
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
    targetKpis: ['Claim_Date', 'Claim_Status', 'Customer_ID', 'Policy_ID', 'Service_Location', 'Payment_Amount', 'Payment_ID', 'Diagnosis_Type', 'ICD_Code', 'Premium_Group', 'Monthly_Premium_Account', 'Month_End_Date'],
    targetTables: ['Claims_Data', 'Policy_Data', 'Diagnosis_Data', 'Payment_Data', 'Validation_Rules'],
    owner: 'EXL',
    targetOwner: 'EXLService',
    lastViewed: '5 days ago',
    userGroups: ['Data Engineering', 'Claims Ops'],
    targetUserGroups: ['Claims Engineering', 'Core IT Operations', 'Enterprise Reporting'],
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
    rationale: 'INACTIVE: Experimental rating prototype last accessed 200 days ago (>180 days threshold).',
    action: 'Decommission Power BI FFQ_Test report.',
    tags: ['Inactive', '200d inactive', '100% Unique'],
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
    rationale: 'INACTIVE: Departmental IT budget variance workbook last viewed 210 days ago (>180 days threshold).',
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
    id: 'pbi_retire_3',
    category: 'bi-retire',
    title: 'Retire Sales & Returns Sample v3',
    businessArea: 'Finance',
    assets: [asset('Sales & Returns Sample v3', 'Power BI')],
    rationale: 'INACTIVE: Departmental financial reconciliation and returns report last accessed 240 days ago (>180 days threshold). Superseded by centralized enterprise lakehouse reporting.',
    action: 'Decommission Power BI Sales & Returns Sample v3 report.',
    tags: ['Inactive', '240d unused', 'Finance'],
    kpis: ['Net Premium Written', 'Returned Endorsements', 'Billing Discrepancy %', 'Gross Sales Volume', 'Reconciled Revenue'],
    tables: ['premium_billing_ledger', 'endorsement_returns_fact', 'account_reconciliation_dim'],
    owner: 'EXL',
    lastViewed: '240 days ago',
    userGroups: ['Corporate Finance', 'Premium Accounting'],
    summary: 'Financial premium reconciliation and endorsement return analytics.',
  },
  // {
  //   id: 'tb_retire_1',
  //   category: 'bi-retire',
  //   title: 'Retire Car Insurance Dashboard',
  //   businessArea: 'Underwriting',
  //   assets: [asset('Car Insurance Dashboard', 'Tableau')],
  //   rationale: 'SUPERSEDED: Personal lines auto damage and driver risk demographic analysis has been superseded by enterprise commercial underwriting models and centralized lakehouse risk marts.',
  //   action: 'Decommission Tableau Car Insurance Dashboard following commercial risk model cutover.',
  //   tags: ['Superseded', 'Underwriting'],
  //   kpis: ['Average Claim Amount', 'Claim Frequency', 'Average Household Income', 'Vehicle Age Risk', 'Driver Education Level', 'Total Policies'],
  //   tables: ['insurance_policies', 'customer_demographics', 'vehicle_dim'],
  //   owner: 'EXL',
  //   lastViewed: '94 days ago',
  //   userGroups: ['Personal Auto Underwriting'],
  //   summary: 'Legacy personal auto underwriting workbook replaced by modern risk portfolio rating models.',
  // },
  // {
  //   id: 'tb_retire_2',
  //   category: 'bi-retire',
  //   title: 'Retire Healthcare Claim Analysis Dashboard',
  //   businessArea: 'Claims',
  //   assets: [asset('Healthcare Claim Analysis Dashboard', 'Tableau')],
  //   rationale: 'LEGACY DATA MODEL: Diagnostic category and clinical benefit cost tracking relies on static extracts superseded by the central claims lakehouse mart.',
  //   action: 'Decommission Healthcare Claim Analysis Dashboard after clinical KPI migration.',
  //   tags: ['Redundant Mart', 'Clinical Claims'],
  //   kpis: ['Claims Cost', 'Benefit Nature Distribution', 'Regional Claimant Count', 'Diagnosis Category Cost', 'Genderwise Claim Cost', 'Total Benefit Records'],
  //   tables: ['database_claims_data', 'sheet1_navigation'],
  //   owner: 'EXL',
  //   lastViewed: '76 days ago',
  //   userGroups: ['Clinical Review', 'Medical Claims'],
  //   summary: 'Static medical diagnostic and clinical benefit review workbook superseded by enterprise claims reporting.',
  // },
  // {
  //   id: 'br4',
  //   category: 'bi-retire',
  //   title: 'Retire Legacy Claims Cube',
  //   businessArea: 'Claims',
  //   assets: [asset('Claims Cube', 'MicroStrategy')],
  //   dependentAsset: asset('P&C Claims Dashboard v3', 'Power BI'),
  //   rationale: 'LEGACY RETIREMENT: MicroStrategy cube report replaced by the modernized semantic model in P&C Claims Dashboard v3 and direct Lakehouse Power BI datasets.',
  //   action: 'Decommission MicroStrategy Claims Cube.',
  //   tags: ['Cross Technology', 'Legacy Cube', 'MicroStrategy'],
  //   kpis: ['Aggregated Claim Count', 'Paid Total', 'Incurred Total'],
  //   tables: ['mstr_claims_cube_source'],
  //   owner: 'EXL',
  //   lastViewed: '120 days ago',
  //   userGroups: [],
  //   summary: 'Legacy MicroStrategy aggregation cube superseded by modern semantic models.',
  // },

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
    kpis: ['Total Paid Amount', 'Claim Count', 'Payment Transaction Count', 'Days Since Last Activity', 'Claim Count by Status', 'Claim Count by Product Type', 'Claim Count by State', 'Litigation Risk Claim Count'],
    tables: ['Claims_Volume_Extract_Demo', 'Policy_Master_Demo', 'Claim_Payments_Demo', 'Claim_Diary_Notes_Demo'],
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
    rationale: 'INACTIVE: Workflow has been inactive for over 200 days (>180 days threshold). Produces no production deliverables and terminates exclusively in inspection nodes with no active downstream consumers.',
    action: 'Decommission inactive workflow.',
    tags: ['Inactive', 'Zombie ETLs'],
    kpis: ['Age', 'BMI', 'Policy_Status', 'Health_Status', 'Policy_ID', 'Policy_Type', 'Submit_ID'],
    tables: ['Health_Data', 'Policy_Data'],
    owner: 'EXL',
    lastViewed: '200 days ago',
    userGroups: [],
    summary: 'Inactive workflow with zero downstream consumers.',
  },
  {
    id: 'er3',
    category: 'etl-retire',
    title: 'Decommission Claims_Extract_Volume (Cross-Technology Parity)',
    businessArea: 'Claims',
    overlapPct: 96,
    assets: [asset('Claims_Extract_Volume', 'Alteryx')],
    dependentAsset: asset('claims_processing', 'Python'),
    rationale: 'CROSS-TECHNOLOGY REPLACEMENT: Alteryx workflow Claims_Extract_Volume has been transpiled and modernized into the vectorized Python pipeline claims_processing. Both pipelines ingest the exact same 4 Excel data sources (Claims_Volume_Extract_Demo, Policy_Master_Demo, Claim_Payments_Demo, Claim_Diary_Notes_Demo) and generate identical output data marts (Claims_Historical_Extract_Demo_Output, Claims_By_Product_Type_Demo_Output, Claims_By_State_Demo_Output, Claims_Aging_Risk_Demo_Output). The legacy Alteryx workflow can be safely decommissioned without operational disruption.',
    action: 'Decommission legacy Alteryx workflow Claims_Extract_Volume in favor of the modernized claims_processing Python pipeline.',
    tags: ['Cross Technology', 'Migrated to Python', 'Legacy ETL'],
    kpis: ['Total Paid Amount', 'Payment Count', 'Days Since Last Activity', 'Aging Bucket', 'Claim Count by Status', 'Claim Count by Product Type', 'Claim Count by State', 'Aging & Litigation Risk'],
    tables: ['Claims_Volume_Extract_Demo', 'Policy_Master_Demo', 'Claim_Payments_Demo', 'Claim_Diary_Notes_Demo'],
    owner: 'EXLService',
    lastViewed: '45 days ago',
    userGroups: ['Data Engineering', 'Claims Analytics'],
    summary: 'Full functional replacement of legacy Alteryx claims volume extract workflow with high-performance vectorized Python pipeline.',
  },
  {
    id: 'er4',
    category: 'etl-retire',
    title: 'Retire Workflow_08 (Orphan Cascade)',
    businessArea: 'Distribution',
    assets: [asset('Workflow_08', 'Alteryx')],
    dependentAsset: asset('Sales & Returns Sample v3', 'Power BI'),
    rationale: 'Associated BI dashboard is under Inactive decommission. Workflow_08 serves only this dashboard, and this decision also cascades to this ETL workflow because the workflow serves only that BI dashboard.',
    action: 'Decommission orphaned ETL workflow Workflow_08.',
    tags: ['Orphan Cascade', 'BI Dependent', 'Decommission Cascade'],
    kpis: ['Date', 'Burritos', 'DateTime_Out', 'Avg_Burritos'],
    tables: ['4701229_YK5IEQ9R.xlsx', 'Workflow8_output.xlsx'],
    owner: 'EXL_S',
    lastViewed: '14 days ago',
    userGroups: ['Distribution Analytics', 'Core IT Operations'],
    summary: 'Orphan Cascade retirement: Sole downstream BI consumer (Sales & Returns Sample v3) is decommissioned, removing the only downstream business consumer of Workflow_08.',
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
    id: 'tb_keep_6',
    category: 'bi-keep',
    title: 'Keep Sales Insurance',
    businessArea: 'Distribution',
    assets: [asset('Sales Insurance.twbx', 'Tableau')],
    rationale: 'Active dashboard: last accessed 22 days ago (<90 days). Insurance distribution sales performance workbook tracking new sales placed, account executive achievement, renewal pipelines, and brokerage revenue across the Insurance_Model semantic layer. High KPI uniqueness of 67%.',
    action: 'Retain and certify as the canonical insurance distribution sales analytics workbook.',
    tags: ['Active (<90d)', '67% Unique', 'Certified'],
    kpis: ['New Sales Placed', 'Account Executive Achievement', 'Renewal Pipeline Value', 'Brokerage Revenue', 'Sales Stage Pipeline', 'Cross-Sell Conversion', 'Open Opportunities by Revenue', 'Revenue by Product', 'Budget Allocation'],
    tables: ['Insurance_Model', 'brokerage_202001231040'],
    owner: 'EXLDistribution',
    lastViewed: '22 days ago',
    userGroups: ['Distribution Leadership', 'Sales Ops'],
    summary: 'Insurance distribution sales performance and account executive achievement tracking workbook.',
  },
    {
    id: 'tb_keep_7',
    category: 'bi-keep',
    title: 'Keep Car Insurance Dashboard',
    businessArea: 'Underwriting',
    assets: [asset('Car Insurance Dashboard', 'Tableau')],
    rationale: 'Active dashboard tracking personal lines auto physical damage, bodily injury claims summary, and driver risk demographics.',
    action: 'Retain and certify for personal auto repair cost and underwriting analytics.',
    tags: ['Active', 'Underwriting', 'Certified'],
    kpis: ['Average Claim Amount', 'Claim Frequency', 'Average Household Income', 'Vehicle Age Risk', 'Driver Education Level', 'Total Policies'],
    tables: ['insurance_policies', 'customer_demographics', 'vehicle_dim'],
    owner: 'EXL',
    lastViewed: '94 days ago',
    userGroups: ['Personal Auto Underwriting'],
    summary: 'Personal lines auto physical damage, bodily injury claims summary, and repair cost analytics.',
  },
  {
    id: 'tb_keep_8',
    category: 'bi-keep',
    title: 'Keep Healthcare Claim Analysis Dashboard',
    businessArea: 'Claims',
    assets: [asset('Healthcare Claim Analysis Dashboard', 'Tableau')],
    rationale: 'Active dashboard tracking clinical healthcare claims evaluation, diagnostic categorization, benefit utilization, and regional cost distribution.',
    action: 'Retain and certify for clinical claims review and benefit utilization analytics.',
    tags: ['Active', 'Clinical Claims', 'Certified'],
    kpis: ['Claims Cost', 'Benefit Nature Distribution', 'Regional Claimant Count', 'Diagnosis Category Cost', 'Genderwise Claim Cost', 'Total Benefit Records'],
    tables: ['database_claims_data', 'sheet1_navigation'],
    owner: 'EXLService',
    lastViewed: '76 days ago',
    userGroups: ['Clinical Review', 'Medical Claims'],
    summary: 'Clinical healthcare claims evaluation, diagnostic categorization, benefit utilization, and regional cost distribution.',
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
];

/* ── Helpers ── */
export function getRecommendationsByCategory(cat: RecommendationCategory): Recommendation[] {
  return recommendations.filter((r) => r.category === cat);
}

export function getCategoriesForSection(section: 'bi' | 'etl'): CategoryInfo[] {
  return categories
    .filter((c) => c.section === section || c.section === 'both')
    .map((c) => {
      const recCount = recommendations.filter((r) => r.category === c.id).length;
      return {
        ...c,
        count: recCount > 0 ? recCount : c.count,
      };
    });
}

export function getOverlapMetrics(
  section: 'bi' | 'etl',
  displayedCandidates?: Recommendation[],
): OverlapMetric[] {
  return section === 'bi' ? computeBiOverlapMetrics(displayedCandidates) : computeEtlOverlapMetrics(displayedCandidates);
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

/**
 * Standardised colour tokens for Complexity and Criticality across ETL Rationalisation:
 * HIGH   → GREEN (#10B981)
 * MEDIUM → YELLOW / AMBER (#F59E0B)
 * LOW    → RED (#EF4444)
 */
export function getComplexityCriticalityBadgeStyle(level: string | undefined): {
  backgroundColor: string;
  borderColor: string;
  color: string;
} {
  const norm = (level || '').toLowerCase().trim();
  if (norm === 'high') {
    return {
      backgroundColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.35)',
      color: '#10B981',
    };
  }
  if (norm === 'low') {
    return {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      borderColor: 'rgba(239, 68, 68, 0.35)',
      color: '#EF4444',
    };
  }
  // Medium / Default
  return {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderColor: 'rgba(245, 158, 11, 0.35)',
    color: '#F59E0B',
  };
}

export function getComplexityCriticalityColor(level: string | undefined): string {
  const norm = (level || '').toLowerCase().trim();
  if (norm === 'high') return '#10B981';
  if (norm === 'low') return '#EF4444';
  return '#F59E0B';
}

/* ─────────────────────────────────────────────────────────
 * ETL Rationalisation Detail Analysis DTOs & Helper
 * ───────────────────────────────────────────────────────── */

export interface EtlWorkflowMeta {
  id: string;
  name: string;
  technology: TechnologyName;
  complexity: 'Low' | 'Medium' | 'High';
  criticality: 'Low' | 'Medium' | 'High';
  toolCount: number;
  connectionsCount?: number;
  sourcesCount: number;
  targetsCount: number;
  schedule: string;
  runtime: string;
  lastRunStatus: 'Success' | 'Warning' | 'Error' | 'Inactive';
  owner: string;
  businessArea: string;
}

export interface SchemaField {
  name: string;
  type: string;
  sampleValue?: string;
  isMatching?: boolean;
}

export interface EtlDatasetComparison {
  name: string;
  sourceType: string;
  matchStatus: 'exact' | 'partial' | 'unique_left' | 'unique_right';
  leftPresent: boolean;
  rightPresent: boolean;
  matchingColumnsCount: number;
  totalColumnsCount: number;
  columns: SchemaField[];
}

export interface EtlTargetComparison {
  name: string;
  targetType: string;
  matchStatus: 'exact' | 'partial' | 'unique_left' | 'unique_right';
  leftPresent: boolean;
  rightPresent: boolean;
  downstreamConsumers: string[];
  columnsCount: number;
  columns: SchemaField[];
}

export interface EtlFrequencyComparison {
  leftSchedule: string;
  rightSchedule: string;
  leftTrigger: string;
  rightTrigger: string;
  leftRuntime: string;
  rightRuntime: string;
  leftStatus: string;
  rightStatus: string;
  alignmentSummary: string;
  overlapPct: number;
}

export interface EtlLogicOperation {
  category: 'Formula' | 'Join' | 'Filter' | 'Summarize' | 'Select' | string;
  operationText: string;
  isShared: boolean;
}

export interface EtlLogicRule {
  name: string;
  category: 'Formula' | 'Join' | 'Filter' | 'Summarize' | 'Sort/Select';
  leftExpression?: string;
  rightExpression?: string;
  matchType: 'Identical' | 'Equivalent' | 'Superset' | 'Unique';
  description: string;
}

export interface EtlLogicComparison {
  leftOperations?: EtlLogicOperation[];
  rightOperations?: EtlLogicOperation[];
  rules?: EtlLogicRule[];
  similarityScore: number;
  summary: string;
}

export interface EtlDagStage {
  stageName: string;
  leftToolCount: number;
  rightToolCount: number;
  description: string;
}

export interface EtlDagComparison {
  stages: EtlDagStage[];
  leftTotalNodes: number;
  rightTotalNodes: number;
  similarityScore: number;
  topologyAlignment: string;
}

export interface EtlFieldProvenance {
  originalName: string;
  sourceDataset: string;
  provenance: string;
  sampleValues: string[];
  isRequired: boolean;
}

export interface EtlProcessingCompatibility {
  sourceToolId: string;
  sourceToolType: string;
  sourceOperation: string;
  targetEquivalent: string;
  status: 'SUPPORTED' | 'EQUIVALENT' | 'SUPERSET' | 'UNSUPPORTED';
  notes: string;
}

export interface EtlDataSubsumptionEvidence {
  sourceWorkflowName: string;
  targetWorkflowName: string;
  dataCoveragePct: number;
  missingFieldsCount: number;
  sharedRequiredFields: string[];
  additionalFieldsInTarget: string[];
  fieldProvenanceMap: Record<string, EtlFieldProvenance>;
  processingSubstitutabilityMatrix: EtlProcessingCompatibility[];
  outputCompatibility: string;
  recommendationSummary: string;
}

export interface EtlSubsumptionItem {
  attributeOrTransformation: string;
  candidateStatus: string;
  targetStatus: string;
  subsumptionType: string;
  details: string;
}

export interface EtlDownstreamDependency {
  consumerName: string;
  type: string;
  impact: string;
  status: 'ACTIVE' | 'MIGRATED' | 'NONE' | 'INACTIVE / DECOMMISSION' | 'DECOMMISSIONED' | string;
}

export interface EtlRetirementSafetyCheck {
  checkItem: string;
  details: string;
  status: 'PASSED' | 'VERIFIED' | 'WARNING' | 'ALERT' | 'passed' | 'verified' | 'warning' | 'alert' | string;
}

export interface EtlCandidateDetailDTO {
  recId: string;
  title: string;
  recType: 'CONSOLIDATE' | 'RETIRE';
  recommendationBadge: string;
  direction: {
    absorbed: { name: string; tech: TechnologyName; role: string };
    retained: { name: string; tech: TechnologyName; role: string };
    bannerText: string;
  };
  inScopeWorkflows: EtlWorkflowMeta[];
  overlapMetrics: {
    sourceMetadataPct: number;
    targetMetadataPct: number;
    frequencyPct: number;
    logicPct: number;
    dagPct: number;
  };
  sourcesComparison: EtlDatasetComparison[];
  targetsComparison: EtlTargetComparison[];
  frequencyComparison: EtlFrequencyComparison;
  logicComparison: EtlLogicComparison;
  dagComparison: EtlDagComparison;
  subsumptionItems?: EtlSubsumptionItem[];
  dataSubsumptionEvidence?: EtlDataSubsumptionEvidence;
  uniqueFunctionality?: Record<string, string[]>;
  downstreamDependencies?: EtlDownstreamDependency[];
  retirementSafetyChecks?: EtlRetirementSafetyCheck[];
  rationalePoints: string[];
  validationRequirements: string[];
}

export function getEtlCandidateDetail(rec: Recommendation): EtlCandidateDetailDTO {
  // 1. Workflow Consolidation: Workflow_01 into Workflow_03 (em2)
  if (rec.id === 'em2') {
    return {
      recId: 'em2',
      title: 'Claims Workflow Consolidation Analysis',
      recType: 'CONSOLIDATE',
      recommendationBadge: 'Consolidate',
      direction: {
        absorbed: { name: 'Workflow_01', tech: 'Alteryx', role: 'Absorbed Candidate' },
        retained: { name: 'Workflow_03', tech: 'Alteryx', role: 'Retained Superset' },
        bannerText: 'ABSORBED CANDIDATE: Workflow_01 (Alteryx) → RETAINED SUPERSET: Workflow_03 (Alteryx)',
      },
      inScopeWorkflows: [
        {
          id: 'c12',
          name: 'Workflow_01',
          technology: 'Alteryx',
          complexity: 'Medium',
          criticality: 'Medium',
          toolCount: 20,
          connectionsCount: 20,
          sourcesCount: 3,
          targetsCount: 2,
          schedule: 'Monthly (End of Month, 02:00 AM)',
          runtime: '14s',
          lastRunStatus: 'Success',
          owner: 'EXL',
          businessArea: 'Claims',
        },
        {
          id: 'c11',
          name: 'Workflow_03',
          technology: 'Alteryx',
          complexity: 'High',
          criticality: 'High',
          toolCount: 34,
          connectionsCount: 32,
          sourcesCount: 4,
          targetsCount: 2,
          schedule: 'Monthly (End of Month, 02:30 AM)',
          runtime: '26s',
          lastRunStatus: 'Success',
          owner: 'EXLService',
          businessArea: 'Claims',
        },
      ],
      overlapMetrics: {
        sourceMetadataPct: 75,
        targetMetadataPct: 0,
        frequencyPct: 100,
        logicPct: 90,
        dagPct: 82,
      },
      sourcesComparison: [
        {
          name: 'Claims_Data',
          sourceType: 'Alteryx Text Input / Database Table',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 6,
          totalColumnsCount: 6,
          columns: [
            { name: 'Claim_ID', type: 'Int64', sampleValue: 'CLM-10029', isMatching: true },
            { name: 'Policy_ID', type: 'Int64', sampleValue: 'POL-8831', isMatching: true },
            { name: 'Customer_ID', type: 'Int64', sampleValue: 'CUST-4410', isMatching: true },
            { name: 'Claim_Date', type: 'Date', sampleValue: '2024-03-15', isMatching: true },
            { name: 'Claim_Status', type: 'V_WString', sampleValue: 'Approved', isMatching: true },
            { name: 'Service_Location', type: 'V_WString', sampleValue: 'NY-Metro Clinic', isMatching: true },
          ],
        },
        {
          name: 'Policy_Data',
          sourceType: 'Alteryx Text Input / Core System',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 4,
          totalColumnsCount: 4,
          columns: [
            { name: 'Policy_ID', type: 'Int64', sampleValue: 'POL-8831', isMatching: true },
            { name: 'Policy Type', type: 'V_WString', sampleValue: 'Commercial Property', isMatching: true },
            { name: 'Plan', type: 'V_WString', sampleValue: 'Comprehensive Plus', isMatching: true },
            { name: 'Policy_Start_Date', type: 'Date', sampleValue: '2023-01-01', isMatching: true },
          ],
        },
        {
          name: 'Diagnosis_Data',
          sourceType: 'Alteryx Text Input / Medical Registry',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 3,
          totalColumnsCount: 3,
          columns: [
            { name: 'Claim_ID', type: 'Int64', sampleValue: 'CLM-10029', isMatching: true },
            { name: 'Diagnosis_Type', type: 'V_WString', sampleValue: 'Orthopedic', isMatching: true },
            { name: 'ICD_Code', type: 'V_WString', sampleValue: 'M54.5', isMatching: true },
          ],
        },
        {
          name: 'Policy_Premium_Data',
          sourceType: 'Alteryx Text Input / Premium Ledger',
          matchStatus: 'unique_right',
          leftPresent: false,
          rightPresent: true,
          matchingColumnsCount: 0,
          totalColumnsCount: 3,
          columns: [
            { name: 'Policy_ID', type: 'Int64', sampleValue: 'POL-8831', isMatching: false },
            { name: 'Snapshot_Month', type: 'Date', sampleValue: '2024-03-01', isMatching: false },
            { name: 'Monthly_Premium', type: 'Double', sampleValue: '4,250.00', isMatching: false },
          ],
        },
      ],
      targetsComparison: [],
      frequencyComparison: {
        leftSchedule: 'Monthly (End of Month, 02:00 AM)',
        rightSchedule: 'Monthly (End of Month, 02:30 AM)',
        leftTrigger: 'Alteryx Server Schedule (Monthly Batch)',
        rightTrigger: 'Alteryx Server Schedule (Monthly Batch)',
        leftRuntime: '14 seconds',
        rightRuntime: '26 seconds',
        leftStatus: 'Active / Success',
        rightStatus: 'Active / Success',
        alignmentSummary: 'Both workflows execute on a monthly end-of-period cadence, making unified single-run consolidation seamless.',
        overlapPct: 100,
      },
      logicComparison: {
        leftOperations: [
          {
            category: 'Formula',
            operationText: "Formula: DateTimeAdd(DateTimeTrim(DateTimeAdd([Payment_Date], 1, 'month'), 'month'), -1, 'day')",
            isShared: true,
          },
          {
            category: 'Join',
            operationText: 'Join: Join on: Claim_ID = Claim_ID',
            isShared: true,
          },
          {
            category: 'Join',
            operationText: 'Join: Join on: Diagnosis_Type = Diagnosis_Type',
            isShared: true,
          },
          {
            category: 'Summarize',
            operationText: 'Summarize: GroupBy(Claim_ID), GroupBy(Month_End_Date), CountDistinct(Payment_ID) as Payments_Made, Sum(Payment_Amount) as Paid Amount',
            isShared: true,
          },
          {
            category: 'Summarize',
            operationText: 'Summarize: GroupBy(Diagnosis_Type), Max(ICD_Code) as Max_ICD_Code',
            isShared: true,
          },
        ],
        rightOperations: [
          {
            category: 'Formula',
            operationText: "Formula: DateTimeAdd(DateTimeTrim(DateTimeAdd([Payment_Date], 1, 'month'), 'month'), -1, 'day')",
            isShared: true,
          },
          {
            category: 'Formula',
            operationText: "Formula: if [monthly_premium] < 300 then 'high' elseif [monthly_premium] < 500 then 'medium' else 'high' endif",
            isShared: false,
          },
          {
            category: 'Join',
            operationText: 'Join: Join on: Claim_ID = Claim_ID',
            isShared: true,
          },
          {
            category: 'Join',
            operationText: 'Join: Join on: Diagnosis_Type = Diagnosis_Type',
            isShared: true,
          },
          {
            category: 'Join',
            operationText: 'Join: Join on: Policy_ID = Policy_ID',
            isShared: false,
          },
          {
            category: 'Summarize',
            operationText: 'Summarize: GroupBy(Claim_ID), GroupBy(Month_End_Date), CountDistinct(Payment_ID) as Payments_Made, Sum(Payment_Amount) as Paid Amount',
            isShared: true,
          },
          {
            category: 'Summarize',
            operationText: 'Summarize: GroupBy(Diagnosis_Type), Max(ICD_Code) as Max_ICD_Code',
            isShared: true,
          },
          {
            category: 'Summarize',
            operationText: 'Summarize: GroupBy(Policy_ID), CountDistinct(Claim_ID) as Claim Count, Max(Claim_Date) as Latest_Claim_Date, Sum(Paid Amount) as Total_Claims_Paid',
            isShared: false,
          },
        ],
        similarityScore: 90,
        summary: '5 shared/equivalent operations, 3 unique operations to Workflow_03.',
      },
      dagComparison: {
        stages: [
          { stageName: 'Source Ingestion (TextInput / Parse)', leftToolCount: 3, rightToolCount: 5, description: 'Ingestion of Claims, Policy, and Diagnosis tables' },
          { stageName: 'Data Preparation & Renaming', leftToolCount: 9, rightToolCount: 13, description: 'Delimited text splitting, column pruning, and dynamic field naming' },
          { stageName: 'Relational Joins & Transformations', leftToolCount: 5, rightToolCount: 10, description: 'Policy enrichment, payment rollup, and formula flags' },
          { stageName: 'Summarization & Aggregation', leftToolCount: 2, rightToolCount: 4, description: 'Rollup by Policy_ID and Diagnosis_Type' },
          { stageName: 'Output & Control Containers', leftToolCount: 1, rightToolCount: 2, description: 'Containerized execution blocks and output targets' },
        ],
        leftTotalNodes: 20,
        rightTotalNodes: 34,
        similarityScore: 82,
        topologyAlignment: 'Direct hierarchical subgraph. Workflow_01 is an exact topological subset of Workflow_03 containerized data flows.',
      },
      subsumptionItems: [
        {
          attributeOrTransformation: 'Claims Master Fact Table Ingestion',
          candidateStatus: 'Extracted & Parsed (6 columns)',
          targetStatus: 'Extracted & Parsed (6 columns)',
          subsumptionType: 'Fully Subsumed',
          details: 'All 6 fields from Workflow_01 are parsed with identical data types in Workflow_03 container #46.',
        },
        {
          attributeOrTransformation: 'Policy Dimension Mapping',
          candidateStatus: 'Joined on Policy_ID',
          targetStatus: 'Joined on Policy_ID + Premium Dimension',
          subsumptionType: 'Superset Match',
          details: 'Workflow_03 carries all policy dimension fields and enriches with Monthly_Premium calculation.',
        },
        {
          attributeOrTransformation: 'Claim Payment Rollup Calculation',
          candidateStatus: 'Paid Amount & Payments Made',
          targetStatus: 'Paid Amount, Payments Made, Month_End_Date',
          subsumptionType: 'Superset Match',
          details: 'Superset calculation with temporal month-end partitioning.',
        },
        {
          attributeOrTransformation: 'Diagnosis Categorization',
          candidateStatus: 'Max ICD Code by Diagnosis Type',
          targetStatus: 'Max ICD Code by Diagnosis Type',
          subsumptionType: 'Fully Subsumed',
          details: 'Identical summarize tool parameters and join logic.',
        },
      ],
      dataSubsumptionEvidence: {
        sourceWorkflowName: 'Workflow_01',
        targetWorkflowName: 'Workflow_03',
        dataCoveragePct: 1.0,
        missingFieldsCount: 0,
        sharedRequiredFields: [
          'Claim_ID',
          'Policy_ID',
          'Customer_ID',
          'Claim_Date',
          'Claim_Status',
          'Service_Location',
          'Policy Type',
          'Plan',
          'Policy_Start_Date',
          'Diagnosis_Type',
          'ICD_Code',
          'Payment_Amount',
          'Payment_ID',
        ],
        additionalFieldsInTarget: [
          'Monthly_Premium',
          'Snapshot_Month',
          'Premium_Group',
          'Month_End_Date',
          'Validation_Flag',
        ],
        fieldProvenanceMap: {
          Claim_ID: {
            originalName: 'Claim_ID',
            sourceDataset: 'Claims_Data',
            provenance: 'Tool #1 (TextInput) → Tool #5 (Select) → Master Join (Tool #18)',
            sampleValues: ['CLM-10029', 'CLM-10030', 'CLM-10031'],
            isRequired: true,
          },
          Policy_ID: {
            originalName: 'Policy_ID',
            sourceDataset: 'Policy_Data',
            provenance: 'Tool #2 (TextInput) → Tool #8 (Formula) → Relational Join',
            sampleValues: ['POL-8831', 'POL-8832', 'POL-8833'],
            isRequired: true,
          },
          Customer_ID: {
            originalName: 'Customer_ID',
            sourceDataset: 'Claims_Data',
            provenance: 'Tool #1 (TextInput) → Preserved via passthrough to Mart',
            sampleValues: ['CUST-4410', 'CUST-4411', 'CUST-4412'],
            isRequired: true,
          },
          Claim_Date: {
            originalName: 'Claim_Date',
            sourceDataset: 'Claims_Data',
            provenance: 'Tool #1 (TextInput) → Tool #6 (DateTime Parse)',
            sampleValues: ['2024-03-15', '2024-03-18', '2024-03-22'],
            isRequired: true,
          },
          Claim_Status: {
            originalName: 'Claim_Status',
            sourceDataset: 'Claims_Data',
            provenance: 'Tool #1 (TextInput) → Filter Active Status',
            sampleValues: ['Approved', 'Settled', 'Open_Investigation'],
            isRequired: true,
          },
          Payment_Amount: {
            originalName: 'Payment_Amount',
            sourceDataset: 'Payment_Data',
            provenance: 'Tool #3 (TextInput) → Tool #14 (Summarize: Sum)',
            sampleValues: ['1,450.00', '3,200.50', '850.00'],
            isRequired: true,
          },
          Diagnosis_Type: {
            originalName: 'Diagnosis_Type',
            sourceDataset: 'Diagnosis_Data',
            provenance: 'Tool #4 (TextInput) → GroupBy Diagnosis Categorization',
            sampleValues: ['Orthopedic', 'Cardiology', 'Neurology'],
            isRequired: true,
          },
          ICD_Code: {
            originalName: 'ICD_Code',
            sourceDataset: 'Diagnosis_Data',
            provenance: 'Tool #4 (TextInput) → Max ICD Rollup (Tool #21)',
            sampleValues: ['M54.5', 'I10', 'R07.9'],
            isRequired: true,
          },
        },
        processingSubstitutabilityMatrix: [
          {
            sourceToolId: '1',
            sourceToolType: 'TextInput / Parse',
            sourceOperation: 'Ingest Claims_Data and Policy_Data',
            targetEquivalent: 'Container #46 (Master Ingestion Node)',
            status: 'SUPPORTED',
            notes: 'Exact schema matching with 100% field type alignment.',
          },
          {
            sourceToolId: '5',
            sourceToolType: 'Join',
            sourceOperation: 'Join on Left.Policy_ID = Right.Policy_ID',
            targetEquivalent: 'Tool #18 (Multi-Dimension Relational Join)',
            status: 'EQUIVALENT',
            notes: 'Topologically identical join node with additional premium attributes.',
          },
          {
            sourceToolId: '9',
            sourceToolType: 'Summarize',
            sourceOperation: 'GroupBy(Claim_ID), Sum(Payment_Amount)',
            targetEquivalent: 'Tool #24 (Summarize with Month-End partition)',
            status: 'SUPERSET',
            notes: 'Target generates identical aggregate metric and enriches with date grain.',
          },
          {
            sourceToolId: '12',
            sourceToolType: 'DbFileOutput',
            sourceOperation: 'Write to Claims_Consolidated_Mart',
            targetEquivalent: 'Tool #29 (Master Lakehouse Mart Writer)',
            status: 'SUPPORTED',
            notes: 'Single consolidated destination target eliminates duplicate I/O write locks.',
          },
        ],
        outputCompatibility: 'COMPATIBLE',
        recommendationSummary: 'Workflow_03 provides 100% functional data sufficiency and generates all production outputs required by downstream consumers with zero data loss.',
      },
      uniqueFunctionality: {
        'Workflow_01': [
          'Legacy single-sheet Excel export (WF01_Output.xlsx)',
        ],
        'Workflow_03': [
          'Monthly_Premium calculation and tiered band classification',
          'Temporal month-end date partitioning for trend analytics',
          'Automated validation rule integrity checks',
        ],
      },
      downstreamDependencies: [
        { consumerName: 'Loss Ratio', type: 'Power BI / Tableau', impact: 'Direct Lineage', status: 'ACTIVE' },
        { consumerName: 'Cross Sell Dashboard', type: 'Power BI', impact: 'Direct Lineage', status: 'ACTIVE' },
        { consumerName: 'INSURANCE ANALYTICS DASHBOARD', type: 'Tableau', impact: 'Direct Lineage', status: 'ACTIVE' },
        { consumerName: 'Sales & Returns Sample v3', type: 'Power BI (Legacy)', impact: 'Redirected to Mart', status: 'MIGRATED' },
      ],
      rationalePoints: [
        'High Schema Overlap (75% Sources, 100% Shared Field Parity): Workflow_01 and Workflow_03 share identical Claims, Policy, and Diagnosis schemas.',
        'Synchronized Execution Schedule: Both workflows execute on a monthly end-of-period cadence, making unified execution seamless.',
        'Zero Data Loss: Workflow_03 is a strict functional superset of Workflow_01, generating all metrics required by downstream consumers.',
        'Compute & Maintenance Reduction: Consolidating eliminates 12 duplicate Alteryx tool nodes and reduces monthly scheduled jobs.',
      ],
      validationRequirements: [
        'Run side-by-side execution on latest Month-End claims extract and verify 100% hash parity on Claims_Consolidated_Mart.',
        'Confirm downstream BI dashboard Sales & Returns Sample v3 can consume Claims_Consolidated_Mart or the unified export.',
        'Validate that Premium_Group categorization does not alter existing policy join cardinality.',
      ],
    };
  }

  // 2. Redundant ETL Retirement: Claims_Extract_Volume_v2 (er1)
  if (rec.id === 'er1') {
    return {
      recId: 'er1',
      title: 'Redundant ETL Pipeline Retirement Analysis',
      recType: 'RETIRE',
      recommendationBadge: 'Retire',
      direction: {
        absorbed: { name: 'Claims_Extract_Volume_v2', tech: 'Alteryx', role: 'Redundant Candidate' },
        retained: { name: 'Claims_Extract_Volume', tech: 'Alteryx', role: 'Retained Master' },
        bannerText: 'REDUNDANT CANDIDATE: Claims_Extract_Volume_v2 (Alteryx) → RETAINED MASTER: Claims_Extract_Volume (Alteryx)',
      },
      inScopeWorkflows: [
        {
          id: 'c14',
          name: 'Claims_Extract_Volume_v2',
          technology: 'Alteryx',
          complexity: 'High',
          criticality: 'High',
          toolCount: 35,
          sourcesCount: 4,
          targetsCount: 5,
          schedule: 'Daily 05:30 AM EST',
          runtime: '34s',
          lastRunStatus: 'Success',
          owner: 'EXL',
          businessArea: 'Claims',
        },
        {
          id: 'c10',
          name: 'Claims_Extract_Volume',
          technology: 'Alteryx',
          complexity: 'High',
          criticality: 'High',
          toolCount: 35,
          sourcesCount: 4,
          targetsCount: 5,
          schedule: 'Daily 05:30 AM EST',
          runtime: '32s',
          lastRunStatus: 'Success',
          owner: 'EXL',
          businessArea: 'Claims',
        },
      ],
      overlapMetrics: {
        sourceMetadataPct: 100,
        targetMetadataPct: 100,
        frequencyPct: 100,
        logicPct: 100,
        dagPct: 100,
      },
      sourcesComparison: [
        {
          name: 'Claims_Volume_Extract_Demo.xlsx',
          sourceType: 'Excel Workbook (Sheet1$)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 11,
          totalColumnsCount: 11,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'Claim Number', type: 'V_WString', sampleValue: 'CLM-90123', isMatching: true },
            { name: 'Policy Number', type: 'V_WString', sampleValue: 'POL-10492', isMatching: true },
            { name: 'Team', type: 'V_WString', sampleValue: 'Team Alpha', isMatching: true },
            { name: 'Manager', type: 'V_WString', sampleValue: 'Sarah Jenkins', isMatching: true },
            { name: 'Examiner', type: 'V_WString', sampleValue: 'David Miller', isMatching: true },
            { name: 'Claim Status', type: 'V_WString', sampleValue: 'Active_Pending', isMatching: true },
            { name: 'Disability Date', type: 'Date', sampleValue: '2024-01-15', isMatching: true },
            { name: 'ICD1Code', type: 'V_WString', sampleValue: 'S82.1', isMatching: true },
            { name: 'ICD1Description', type: 'V_WString', sampleValue: 'Fracture of upper end of tibia', isMatching: true },
            { name: 'ICD1GroupName', type: 'V_WString', sampleValue: 'Musculoskeletal System', isMatching: true },
          ],
        },
        {
          name: 'Policy_Master_Demo.xlsx',
          sourceType: 'Excel Workbook (Sheet1$)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 7,
          totalColumnsCount: 7,
          columns: [
            { name: 'Policy Number', type: 'V_WString', sampleValue: 'POL-10492', isMatching: true },
            { name: 'Product Type', type: 'V_WString', sampleValue: 'Workers Compensation', isMatching: true },
            { name: 'State', type: 'V_WString', sampleValue: 'CA', isMatching: true },
            { name: 'Effective Date', type: 'Date', sampleValue: '2023-01-01', isMatching: true },
            { name: 'Expiration Date', type: 'Date', sampleValue: '2024-01-01', isMatching: true },
            { name: 'Insured Name', type: 'V_WString', sampleValue: 'Apex Industrial LLC', isMatching: true },
            { name: 'Annual Premium', type: 'Double', sampleValue: '54,000.00', isMatching: true },
          ],
        },
        {
          name: 'Claim_Payments_Demo.xlsx',
          sourceType: 'Excel Workbook (Sheet1$)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 4,
          totalColumnsCount: 4,
          columns: [
            { name: 'Claim Number', type: 'V_WString', sampleValue: 'CLM-90123', isMatching: true },
            { name: 'Payment Date', type: 'Date', sampleValue: '2024-02-10', isMatching: true },
            { name: 'Payment Amount', type: 'Double', sampleValue: '1,450.00', isMatching: true },
            { name: 'Payment Type', type: 'V_WString', sampleValue: 'Medical Indemnity', isMatching: true },
          ],
        },
        {
          name: 'Claim_Diary_Notes_Demo.xlsx',
          sourceType: 'Excel Workbook (Sheet1$)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 4,
          totalColumnsCount: 4,
          columns: [
            { name: 'Claim Number', type: 'V_WString', sampleValue: 'CLM-90123', isMatching: true },
            { name: 'Last Activity Date', type: 'Date', sampleValue: '2024-03-20', isMatching: true },
            { name: 'Litigation Flag', type: 'V_WString', sampleValue: 'N', isMatching: true },
            { name: 'Reopened Flag', type: 'V_WString', sampleValue: 'N', isMatching: true },
          ],
        },
      ],
      targetsComparison: [
        {
          name: 'Claims_Historical_Extract_Demo_Output.xlsx|||Detail',
          targetType: 'Excel Extract',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Claims - Executive Summary', 'Claims - State Performance'],
          columnsCount: 17,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'Claim Number', type: 'V_WString', sampleValue: 'CLM-90123', isMatching: true },
            { name: 'Policy Number', type: 'V_WString', sampleValue: 'POL-10492', isMatching: true },
            { name: 'Team', type: 'V_WString', sampleValue: 'Team Alpha', isMatching: true },
            { name: 'Manager', type: 'V_WString', sampleValue: 'Sarah Jenkins', isMatching: true },
            { name: 'Examiner', type: 'V_WString', sampleValue: 'David Miller', isMatching: true },
            { name: 'Claim Status', type: 'V_WString', sampleValue: 'Active_Pending', isMatching: true },
            { name: 'Disability Date', type: 'Date', sampleValue: '2024-01-15', isMatching: true },
            { name: 'ICD1Code', type: 'V_WString', sampleValue: 'S82.1', isMatching: true },
            { name: 'ICD1Description', type: 'V_WString', sampleValue: 'Fracture of tibia', isMatching: true },
            { name: 'ICD1GroupName', type: 'V_WString', sampleValue: 'Musculoskeletal', isMatching: true },
            { name: 'Total Paid', type: 'Double', sampleValue: '1,450.00', isMatching: true },
            { name: 'Payment Count', type: 'Int32', sampleValue: '3', isMatching: true },
            { name: 'Litigation Flag', type: 'V_WString', sampleValue: 'N', isMatching: true },
            { name: 'Reopened Flag', type: 'V_WString', sampleValue: 'N', isMatching: true },
            { name: 'Days Since Last Activity', type: 'Int32', sampleValue: '12', isMatching: true },
            { name: 'Aging Bucket', type: 'V_WString', sampleValue: '0-30 Days', isMatching: true },
          ],
        },
        {
          name: 'Claims_Historical_Extract_Demo_Output.xlsx|||QuarterSummary',
          targetType: 'Excel Summary',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Claims - Executive Summary', 'Claims - Agent Performance'],
          columnsCount: 7,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'Manager', type: 'V_WString', sampleValue: 'Sarah Jenkins', isMatching: true },
            { name: 'Examiner', type: 'V_WString', sampleValue: 'David Miller', isMatching: true },
            { name: 'Preclaim', type: 'Int32', sampleValue: '8', isMatching: true },
            { name: 'Active_Pending', type: 'Int32', sampleValue: '42', isMatching: true },
            { name: 'Approved', type: 'Int32', sampleValue: '115', isMatching: true },
            { name: 'Stable_and_Mature', type: 'Int32', sampleValue: '24', isMatching: true },
          ],
        },
        {
          name: 'Claims_By_Product_Type_Demo_Output.xlsx|||ProductTypeSummary',
          targetType: 'Excel Summary',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Healthcare Claim Analysis Dashboard'],
          columnsCount: 4,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'Product Type', type: 'V_WString', sampleValue: 'Workers Comp', isMatching: true },
            { name: 'Claim Count', type: 'Int32', sampleValue: '128', isMatching: true },
            { name: 'Total Paid Amount', type: 'Double', sampleValue: '482,900.00', isMatching: true },
          ],
        },
        {
          name: 'Claims_By_State_Demo_Output.xlsx|||StateSummary',
          targetType: 'Excel Summary',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Claims - State Performance', 'Car Insurance Dashboard'],
          columnsCount: 4,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'State', type: 'V_WString', sampleValue: 'CA', isMatching: true },
            { name: 'Claim Count', type: 'Int32', sampleValue: '94', isMatching: true },
            { name: 'Total Paid', type: 'Double', sampleValue: '341,200.00', isMatching: true },
          ],
        },
        {
          name: 'Claims_Aging_Risk_Demo_Output.xlsx|||AgingRiskSummary',
          targetType: 'Excel Summary',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Benefeciery_services_Aging_Dashboard'],
          columnsCount: 3,
          columns: [
            { name: 'Aging Bucket', type: 'V_WString', sampleValue: '90+ Days', isMatching: true },
            { name: 'Litigation Flag', type: 'V_WString', sampleValue: 'N', isMatching: true },
            { name: 'Claim Count', type: 'Int32', sampleValue: '31', isMatching: true },
          ],
        },
      ],
      frequencyComparison: {
        leftSchedule: 'Daily 05:30 AM EST',
        rightSchedule: 'Daily 05:30 AM EST',
        leftTrigger: 'Redundant Alteryx Server Job',
        rightTrigger: 'Master Alteryx Server Schedule',
        leftRuntime: '34 seconds',
        rightRuntime: '32 seconds',
        leftStatus: 'Active / Success',
        rightStatus: 'Active / Success',
        alignmentSummary: 'Exact duplicate schedule running simultaneously every morning, writing identical files.',
        overlapPct: 100,
      },
      logicComparison: {
        rules: [
          {
            name: 'Days Since Activity Formula',
            category: 'Formula',
            leftExpression: "DateTimeDiff(DateTimeToday(),[Last Activity Date],'days')",
            rightExpression: "DateTimeDiff(DateTimeToday(),[Last Activity Date],'days')",
            matchType: 'Identical',
            description: 'Identical date calculation determining adjuster diary recency.',
          },
          {
            name: 'Aging Bucket Rule',
            category: 'Formula',
            leftExpression: "if [Days Since Last Activity] > 90 then '90+ Days' elseif [Days Since Last Activity] > 30 then '31-90 Days' else '0-30 Days' endif",
            rightExpression: "if [Days Since Last Activity] > 90 then '90+ Days' elseif [Days Since Last Activity] > 30 then '31-90 Days' else '0-30 Days' endif",
            matchType: 'Identical',
            description: 'Identical claims aging categorisation thresholds.',
          },
          {
            name: 'Cross Tab Quarterly Pivot',
            category: 'Summarize',
            leftExpression: 'Group: Quarter End Date, Header: Claim Status, Data: CountDistinct(Claim Number)',
            rightExpression: 'Group: Quarter End Date, Header: Claim Status, Data: CountDistinct(Claim Number)',
            matchType: 'Identical',
            description: 'Exact match matrix pivot on claim status.',
          },
          {
            name: 'Payment & Diary Join Chain',
            category: 'Join',
            leftExpression: 'Left Join Policy Number → Left Join Claim Number (Payments) → Left Join Claim Number (Diary)',
            rightExpression: 'Left Join Policy Number → Left Join Claim Number (Payments) → Left Join Claim Number (Diary)',
            matchType: 'Identical',
            description: 'Exact 3-tier join sequence with identical union null-handling logic.',
          },
        ],
        similarityScore: 100,
        summary: '100% duplicate logic across all 35 tool configurations, formula definitions, joins, and aggregations.',
      },
      dagComparison: {
        stages: [
          { stageName: 'Source Ingestion (4 Input Nodes)', leftToolCount: 4, rightToolCount: 4, description: 'Reads 4 Excel source tables' },
          { stageName: 'Historical Detail Branch & Cross Tab', leftToolCount: 14, rightToolCount: 14, description: 'Generates quarterly summaries and examiner breakdowns' },
          { stageName: 'Payment & Policy Enrichment Join Chain', leftToolCount: 7, rightToolCount: 7, description: 'Multi-table join and null substitution formulas' },
          { stageName: 'Product, State & Risk Summary Branches', leftToolCount: 6, rightToolCount: 6, description: 'Aggregates by Product Type, State, and Aging Bucket' },
          { stageName: 'Excel Output Generation (5 Sinks)', leftToolCount: 5, rightToolCount: 5, description: 'Writes to 5 workbook target sheets' },
        ],
        leftTotalNodes: 35,
        rightTotalNodes: 35,
        similarityScore: 100,
        topologyAlignment: '100% identical DAG node-for-node and connection-for-connection.',
      },
      subsumptionItems: [
        {
          attributeOrTransformation: 'Claims Master Fact Table Ingestion',
          candidateStatus: '11 Columns Extracted',
          targetStatus: '11 Columns Extracted (Identical)',
          subsumptionType: 'Fully Subsumed',
          details: 'All 4 Excel source workbooks are read identically with matching configurations.',
        },
        {
          attributeOrTransformation: 'Quarterly Pivot & Cross Tab Aggregation',
          candidateStatus: 'Quarter End Date x Claim Status Pivot',
          targetStatus: 'Quarter End Date x Claim Status Pivot',
          subsumptionType: 'Fully Subsumed',
          details: 'Exact node-for-node parameter match on Cross Tab tool #12.',
        },
        {
          attributeOrTransformation: 'Adjuster Diary Aging Calculation',
          candidateStatus: 'Formula: DateTimeDiff(DateTimeToday(), [Last Activity Date], "days")',
          targetStatus: 'Formula: DateTimeDiff(DateTimeToday(), [Last Activity Date], "days")',
          subsumptionType: 'Fully Subsumed',
          details: 'Identical formula expression and binning thresholds.',
        },
        {
          attributeOrTransformation: 'Multi-Sheet Excel Output Generation',
          candidateStatus: '5 Sheet Extracts Written',
          targetStatus: '5 Sheet Extracts Written',
          subsumptionType: 'Fully Subsumed',
          details: 'Identical output files and destination schemas.',
        },
      ],
      dataSubsumptionEvidence: {
        sourceWorkflowName: 'Claims_Extract_Volume_v2',
        targetWorkflowName: 'Claims_Extract_Volume',
        dataCoveragePct: 1.0,
        missingFieldsCount: 0,
        sharedRequiredFields: [
          'Quarter End Date',
          'Claim Number',
          'Policy Number',
          'Team',
          'Manager',
          'Examiner',
          'Claim Status',
          'Disability Date',
          'ICD1Code',
          'ICD1Description',
          'ICD1GroupName',
          'Product Type',
          'State',
          'Effective Date',
          'Expiration Date',
          'Payment Date',
          'Payment Amount',
          'Last Activity Date',
        ],
        additionalFieldsInTarget: [],
        fieldProvenanceMap: {
          'Quarter End Date': {
            originalName: 'Quarter End Date',
            sourceDataset: 'Claims_Volume_Extract_Demo.xlsx',
            provenance: 'Tool #1 (Excel Input) → Passthrough to Cross Tab & Summary Sinks',
            sampleValues: ['2024-03-31', '2023-12-31', '2023-09-30'],
            isRequired: true,
          },
          'Claim Number': {
            originalName: 'Claim Number',
            sourceDataset: 'Claims_Volume_Extract_Demo.xlsx',
            provenance: 'Tool #1 (Excel Input) → Master Join Key (Tool #7, Tool #9)',
            sampleValues: ['CLM-90123', 'CLM-90124', 'CLM-90125'],
            isRequired: true,
          },
          'Policy Number': {
            originalName: 'Policy Number',
            sourceDataset: 'Policy_Master_Demo.xlsx',
            provenance: 'Tool #2 (Excel Input) → Left Join Policy Master',
            sampleValues: ['POL-10492', 'POL-10493', 'POL-10494'],
            isRequired: true,
          },
          'Payment Amount': {
            originalName: 'Payment Amount',
            sourceDataset: 'Claim_Payments_Demo.xlsx',
            provenance: 'Tool #3 (Excel Input) → Tool #16 (Summarize: Total Paid)',
            sampleValues: ['1,450.00', '2,800.00', '650.00'],
            isRequired: true,
          },
          'Last Activity Date': {
            originalName: 'Last Activity Date',
            sourceDataset: 'Claim_Diary_Notes_Demo.xlsx',
            provenance: 'Tool #4 (Excel Input) → Tool #19 (Aging Formula Calculation)',
            sampleValues: ['2024-03-20', '2024-02-14', '2024-01-05'],
            isRequired: true,
          },
        },
        processingSubstitutabilityMatrix: [
          {
            sourceToolId: '1-4',
            sourceToolType: 'DbFileInput',
            sourceOperation: 'Reads 4 Excel source files',
            targetEquivalent: 'Master Input Nodes (Tools #1-4 in Claims_Extract_Volume)',
            status: 'SUPPORTED',
            notes: '100% byte-for-byte parameter and schema equality.',
          },
          {
            sourceToolId: '5-20',
            sourceToolType: 'Formula / Filter / CrossTab',
            sourceOperation: 'Date parsing, pivoting, and categorization',
            targetEquivalent: 'Tools #5-20 in Claims_Extract_Volume',
            status: 'EQUIVALENT',
            notes: 'Identical AST expressions and evaluation order.',
          },
          {
            sourceToolId: '21-30',
            sourceToolType: 'Join / Union',
            sourceOperation: 'Multi-table join sequence',
            targetEquivalent: 'Tools #21-30 in Claims_Extract_Volume',
            status: 'EQUIVALENT',
            notes: 'Identical join keys and null replacement logic.',
          },
          {
            sourceToolId: '31-35',
            sourceToolType: 'DbFileOutput',
            sourceOperation: 'Writes 5 Excel workbook sheets',
            targetEquivalent: 'Tools #31-35 in Claims_Extract_Volume',
            status: 'SUPPORTED',
            notes: 'Master workflow produces identical files; duplicate write can be removed immediately.',
          },
        ],
        outputCompatibility: 'IDENTICAL',
        recommendationSummary: 'Claims_Extract_Volume_v2 is a 100% duplicate clone of master workflow Claims_Extract_Volume. Retiring v2 eliminates redundant computation with zero risk.',
      },
      uniqueFunctionality: {
        'Claims_Extract_Volume_v2': [],
        'Claims_Extract_Volume': [],
      },
      downstreamDependencies: [
        { consumerName: 'Claims - Executive Summary', type: 'Tableau', impact: 'Consumes Master Output', status: 'ACTIVE' },
        { consumerName: 'Claims - State Performance', type: 'Tableau', impact: 'Consumes Master Output', status: 'ACTIVE' },
        { consumerName: 'Claims - Agent Performance', type: 'Tableau', impact: 'Consumes Master Output', status: 'ACTIVE' },
        { consumerName: 'Healthcare Claim Analysis Dashboard', type: 'Tableau', impact: 'Consumes Master Output', status: 'ACTIVE' },
        { consumerName: 'Car Insurance Dashboard', type: 'Tableau', impact: 'Consumes Master Output', status: 'ACTIVE' },
        { consumerName: 'Benefeciery_services_Aging_Dashboard', type: 'Tableau', impact: 'Consumes Master Output', status: 'ACTIVE' },
      ],
      retirementSafetyChecks: [
        {
          checkItem: 'Input Data Sources Redundancy Audit',
          status: 'passed',
          details: 'All 4 input Excel files are identically consumed by master workflow Claims_Extract_Volume.',
        },
        {
          checkItem: 'Output Data Mart Parity Audit',
          status: 'passed',
          details: 'All 5 output target datasets match the master workflow down to byte and row counts.',
        },
        {
          checkItem: 'Downstream Consumer Impact Assessment',
          status: 'passed',
          details: 'All downstream BI dashboards (Executive Summary, State Performance, Agent Performance) point to master outputs.',
        },
        {
          checkItem: 'Scheduler De-registration Safety',
          status: 'passed',
          details: 'Disabling Claims_Extract_Volume_v2 will free up 1 daily Alteryx engine worker slot with zero data impact.',
        },
      ],
      rationalePoints: [
        'Complete Redundancy (100% Exact Match): Claims_Extract_Volume_v2 is a byte-for-byte replica of Claims_Extract_Volume.',
        'Zero Distinct Business Logic: Contains zero unique calculations, custom filters, or proprietary outputs.',
        'Safe Immediate Decommissioning: All 6 downstream Tableau and Power BI assets already read the output created by Claims_Extract_Volume.',
        'Resource Optimization: Eliminates redundant server execution, disk I/O, and lock contention on output Excel files.',
      ],
      validationRequirements: [
        'De-register the scheduled job for Claims_Extract_Volume_v2 in Alteryx Server Gallery.',
        'Confirm master workflow Claims_Extract_Volume completed today’s 05:30 AM run successfully.',
        'Archive Claims_Extract_Volume_v2.yxmd into the decommissioned backup repository folder.',
      ],
    };
  }

  // 3. Stale Workflow Retirement: Workflow_04_App (er2)
  if (rec.id === 'er2') {
    return {
      recId: 'er2',
      title: 'Inactive / Zombie Workflow Decommission Analysis',
      recType: 'RETIRE',
      recommendationBadge: 'Retire',
      direction: {
        absorbed: { name: 'Workflow_04_App', tech: 'Alteryx', role: 'Stale Candidate' },
        retained: { name: 'None', tech: 'Alteryx', role: 'No Replacement Required' },
        bannerText: 'RETIRED STALE PIPELINE: Workflow_04_App (Alteryx) → REASON: Zero Downstream Consumers & Inactive > 200 Days',
      },
      inScopeWorkflows: [
        {
          id: 'u4',
          name: 'Workflow_04_App',
          technology: 'Alteryx',
          complexity: 'Low',
          criticality: 'Low',
          toolCount: 11,
          sourcesCount: 2,
          targetsCount: 0,
          schedule: 'Inactive (No Active Schedule)',
          runtime: '8s',
          lastRunStatus: 'Inactive',
          owner: 'EXL',
          businessArea: 'Underwriting',
        },
      ],
      overlapMetrics: {
        sourceMetadataPct: 0,
        targetMetadataPct: 0,
        frequencyPct: 0,
        logicPct: 0,
        dagPct: 0,
      },
      sourcesComparison: [
        {
          name: 'Health_Data',
          sourceType: 'Alteryx Text Input / Staging Sample',
          matchStatus: 'unique_left',
          leftPresent: true,
          rightPresent: false,
          matchingColumnsCount: 0,
          totalColumnsCount: 4,
          columns: [
            { name: 'Submit_ID', type: 'Int64', sampleValue: 'SUB-101', isMatching: false },
            { name: 'Age', type: 'Int32', sampleValue: '42', isMatching: false },
            { name: 'BMI', type: 'Double', sampleValue: '26.4', isMatching: false },
            { name: 'Health_Status', type: 'V_WString', sampleValue: 'Standard', isMatching: false },
          ],
        },
        {
          name: 'Policy_Data',
          sourceType: 'Alteryx Text Input / Staging Sample',
          matchStatus: 'unique_left',
          leftPresent: true,
          rightPresent: false,
          matchingColumnsCount: 0,
          totalColumnsCount: 3,
          columns: [
            { name: 'Policy_ID', type: 'Int64', sampleValue: 'POL-009', isMatching: false },
            { name: 'Policy_Type', type: 'V_WString', sampleValue: 'Term Life', isMatching: false },
            { name: 'Policy_Status', type: 'V_WString', sampleValue: 'Active', isMatching: false },
          ],
        },
      ],
      targetsComparison: [],
      frequencyComparison: {
        leftSchedule: 'Inactive (No Schedule Triggered)',
        rightSchedule: 'N/A',
        leftTrigger: 'Manual Ad-Hoc Execution Only',
        rightTrigger: 'N/A',
        leftRuntime: '8 seconds (Last run >200 days ago)',
        rightRuntime: 'N/A',
        leftStatus: 'Stale / Inactive (>180 Days Threshold)',
        rightStatus: 'N/A',
        alignmentSummary: 'Pipeline has had zero executions in the last 200 days. No production scheduler triggers configured.',
        overlapPct: 0,
      },
      logicComparison: {
        rules: [
        ],
        similarityScore: 0,
        summary: 'Contains experimental prototype logic from early 2024 underwriting testing. Zero active production relevance.',
      },
      dagComparison: {
        stages: [
          { stageName: 'Sample Data Inputs', leftToolCount: 2, rightToolCount: 0, description: 'Hardcoded Text Input nodes' },
          { stageName: 'Preparation & Filtering', leftToolCount: 5, rightToolCount: 0, description: 'Data cleansing and filter prototypes' },
          { stageName: 'Browse Terminals', leftToolCount: 4, rightToolCount: 0, description: 'Browse tools with zero output writers' },
        ],
        leftTotalNodes: 11,
        rightTotalNodes: 0,
        similarityScore: 0,
        topologyAlignment: 'Dead-end workflow terminating exclusively in Browse inspection tools. No export sink.',
      },
      uniqueFunctionality: {
        'Workflow_04_App': [
          'Experimental Underwriting prototype join on Submit_ID / Policy_ID',
          'Rudimentary risk score filter ([BMI] < 30 AND [Age] < 60)',
        ],
      },
      downstreamDependencies: [],
      retirementSafetyChecks: [
        {
          checkItem: 'Downstream BI Asset Audit',
          status: 'passed',
          details: 'Zero BI dashboards, semantic models, or reports consume data from Workflow_04_App.',
        },
        {
          checkItem: 'Production Sink Check',
          status: 'passed',
          details: 'Workflow contains 0 Output Data nodes. All data paths terminate in Browse tools.',
        },
        {
          checkItem: 'Inactivity Threshold Audit',
          status: 'passed',
          details: 'Last accessed 200 days ago, exceeding enterprise governance threshold of 180 days.',
        },
        {
          checkItem: 'Business Process Ownership Verification',
          status: 'passed',
          details: 'Underwriting confirmed manual experimental testing concluded; production underwriting moved to lakehouse API.',
        },
      ],
      rationalePoints: [
        'INACTIVE — Exceeds Inactivity Threshold: Workflow_04_App has been inactive for >200 days (>180 days policy rule for automated decommissioning). Dead-End DAG Topology: Terminates in 4 Browse tools without any persistent database or file output nodes.',
        'ZOMBIE ETL — Zero Downstream Consumers: No downstream BI tools, warehouses, reporting layers, or other consumers depend on the workflow. Workspace Cleanup: Decommissioning removes obsolete assets and reduces governance inventory overhead.',
      ],
      validationRequirements: [
        'Export and archive the workflow XML definition into the audit archive.',
        'Delete the unpublished workflow asset from Alteryx Server sandbox space.',
        'Log decommission event in the BI & ETL Governance audit trail.',
      ],
    };
  }

  // 4. Cross-Technology Modernization Decommission: Claims_Extract_Volume (er3)
  if (rec.id === 'er3') {
    return {
      recId: 'er3',
      title: 'Modernized Alteryx to Python Decommission Analysis',
      recType: 'RETIRE',
      recommendationBadge: 'Retire',
      direction: {
        absorbed: { name: 'Claims_Extract_Volume', tech: 'Alteryx', role: 'Legacy Pipeline' },
        retained: { name: 'claims_processing', tech: 'Python', role: 'Active Modernized Target' },
        bannerText: 'RETIRED LEGACY PIPELINE: Claims_Extract_Volume (Alteryx) → ACTIVE MODERNIZED TARGET: claims_processing (Python)',
      },
      inScopeWorkflows: [
        {
          id: 'c10',
          name: 'Claims_Extract_Volume',
          technology: 'Alteryx',
          complexity: 'High',
          criticality: 'High',
          toolCount: 35,
          sourcesCount: 4,
          targetsCount: 5,
          schedule: 'Daily 05:30 AM EST',
          runtime: '32s',
          lastRunStatus: 'Success',
          owner: 'EXLService',
          businessArea: 'Claims',
        },
        {
          id: 'c15',
          name: 'claims_processing',
          technology: 'Python',
          complexity: 'High',
          criticality: 'High',
          toolCount: 44,
          sourcesCount: 4,
          targetsCount: 5,
          schedule: 'Daily 05:30 AM EST',
          runtime: '4.2s',
          lastRunStatus: 'Success',
          owner: 'Data Engineering',
          businessArea: 'Claims',
        },
      ],
      overlapMetrics: {
        sourceMetadataPct: 100,
        targetMetadataPct: 100,
        frequencyPct: 100,
        logicPct: 96,
        dagPct: 94,
      },
      sourcesComparison: [
        {
          name: 'Claims_Volume_Extract_Demo.xlsx',
          sourceType: 'Excel Workbook (Sheet1$)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 11,
          totalColumnsCount: 11,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'Claim Number', type: 'String / V_WString', sampleValue: 'CLM-90123', isMatching: true },
            { name: 'Policy Number', type: 'String / V_WString', sampleValue: 'POL-10492', isMatching: true },
            { name: 'Team', type: 'String / V_WString', sampleValue: 'Team Alpha', isMatching: true },
            { name: 'Manager', type: 'String / V_WString', sampleValue: 'Sarah Jenkins', isMatching: true },
            { name: 'Examiner', type: 'String / V_WString', sampleValue: 'David Miller', isMatching: true },
            { name: 'Claim Status', type: 'String / V_WString', sampleValue: 'Active_Pending', isMatching: true },
            { name: 'Disability Date', type: 'Date', sampleValue: '2024-01-15', isMatching: true },
            { name: 'ICD1Code', type: 'String / V_WString', sampleValue: 'S82.1', isMatching: true },
            { name: 'ICD1Description', type: 'String / V_WString', sampleValue: 'Fracture of upper end of tibia', isMatching: true },
            { name: 'ICD1GroupName', type: 'String / V_WString', sampleValue: 'Musculoskeletal System', isMatching: true },
          ],
        },
        {
          name: 'Policy_Master_Demo.xlsx',
          sourceType: 'Excel Workbook (Sheet1$)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 7,
          totalColumnsCount: 7,
          columns: [
            { name: 'Policy Number', type: 'String / V_WString', sampleValue: 'POL-10492', isMatching: true },
            { name: 'Product Type', type: 'String / V_WString', sampleValue: 'Workers Compensation', isMatching: true },
            { name: 'State', type: 'String / V_WString', sampleValue: 'CA', isMatching: true },
            { name: 'Effective Date', type: 'Date', sampleValue: '2023-01-01', isMatching: true },
            { name: 'Expiration Date', type: 'Date', sampleValue: '2024-01-01', isMatching: true },
            { name: 'Insured Name', type: 'String / V_WString', sampleValue: 'Apex Industrial LLC', isMatching: true },
            { name: 'Annual Premium', type: 'Float64 / Double', sampleValue: '54,000.00', isMatching: true },
          ],
        },
        {
          name: 'Claim_Payments_Demo.xlsx',
          sourceType: 'Excel Workbook (Sheet1$)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 4,
          totalColumnsCount: 4,
          columns: [
            { name: 'Claim Number', type: 'String / V_WString', sampleValue: 'CLM-90123', isMatching: true },
            { name: 'Payment Date', type: 'Date', sampleValue: '2024-02-10', isMatching: true },
            { name: 'Payment Amount', type: 'Float64 / Double', sampleValue: '1,450.00', isMatching: true },
            { name: 'Payment Type', type: 'String / V_WString', sampleValue: 'Medical Indemnity', isMatching: true },
          ],
        },
        {
          name: 'Claim_Diary_Notes_Demo.xlsx',
          sourceType: 'Excel Workbook (Sheet1$)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          matchingColumnsCount: 4,
          totalColumnsCount: 4,
          columns: [
            { name: 'Claim Number', type: 'String / V_WString', sampleValue: 'CLM-90123', isMatching: true },
            { name: 'Last Activity Date', type: 'Date', sampleValue: '2024-03-20', isMatching: true },
            { name: 'Litigation Flag', type: 'String / V_WString', sampleValue: 'N', isMatching: true },
            { name: 'Reopened Flag', type: 'String / V_WString', sampleValue: 'N', isMatching: true },
          ],
        },
      ],
      targetsComparison: [
        {
          name: 'Claims_Historical_Extract_Demo_Output.xlsx|||Detail',
          targetType: 'Excel Data Mart (Sheet: Detail)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Claims - Executive Summary', 'Claims - State Performance'],
          columnsCount: 17,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'Claim Number', type: 'String / V_WString', sampleValue: 'CLM-90123', isMatching: true },
            { name: 'Policy Number', type: 'String / V_WString', sampleValue: 'POL-10492', isMatching: true },
            { name: 'Team', type: 'String / V_WString', sampleValue: 'Team Alpha', isMatching: true },
            { name: 'Manager', type: 'String / V_WString', sampleValue: 'Sarah Jenkins', isMatching: true },
            { name: 'Examiner', type: 'String / V_WString', sampleValue: 'David Miller', isMatching: true },
            { name: 'Claim Status', type: 'String / V_WString', sampleValue: 'Active_Pending', isMatching: true },
            { name: 'Disability Date', type: 'Date', sampleValue: '2024-01-15', isMatching: true },
            { name: 'ICD1Code', type: 'String / V_WString', sampleValue: 'S82.1', isMatching: true },
            { name: 'ICD1Description', type: 'String / V_WString', sampleValue: 'Fracture of tibia', isMatching: true },
            { name: 'ICD1GroupName', type: 'String / V_WString', sampleValue: 'Musculoskeletal', isMatching: true },
            { name: 'Total Paid', type: 'Float64 / Double', sampleValue: '1,450.00', isMatching: true },
            { name: 'Payment Count', type: 'Int64 / Int32', sampleValue: '3', isMatching: true },
            { name: 'Litigation Flag', type: 'String / V_WString', sampleValue: 'N', isMatching: true },
            { name: 'Reopened Flag', type: 'String / V_WString', sampleValue: 'N', isMatching: true },
            { name: 'Days Since Last Activity', type: 'Int64 / Int32', sampleValue: '12', isMatching: true },
            { name: 'Aging Bucket', type: 'String / V_WString', sampleValue: '0-30 Days', isMatching: true },
          ],
        },
        {
          name: 'Claims_Historical_Extract_Demo_Output.xlsx|||QuarterSummary',
          targetType: 'Excel Data Mart (Sheet: QuarterSummary)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Claims - Executive Summary', 'Claims - Agent Performance'],
          columnsCount: 7,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'Manager', type: 'String / V_WString', sampleValue: 'Sarah Jenkins', isMatching: true },
            { name: 'Examiner', type: 'String / V_WString', sampleValue: 'David Miller', isMatching: true },
            { name: 'Preclaim', type: 'Int64 / Int32', sampleValue: '8', isMatching: true },
            { name: 'Active_Pending', type: 'Int64 / Int32', sampleValue: '42', isMatching: true },
            { name: 'Approved', type: 'Int64 / Int32', sampleValue: '115', isMatching: true },
            { name: 'Stable_and_Mature', type: 'Int64 / Int32', sampleValue: '24', isMatching: true },
          ],
        },
        {
          name: 'Claims_By_Product_Type_Demo_Output.xlsx|||ProductTypeSummary',
          targetType: 'Excel Data Mart (Sheet: ProductTypeSummary)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Healthcare Claim Analysis Dashboard'],
          columnsCount: 4,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'Product Type', type: 'String / V_WString', sampleValue: 'Workers Comp', isMatching: true },
            { name: 'Claim Count', type: 'Int64 / Int32', sampleValue: '128', isMatching: true },
            { name: 'Total Paid Amount', type: 'Float64 / Double', sampleValue: '482,900.00', isMatching: true },
          ],
        },
        {
          name: 'Claims_By_State_Demo_Output.xlsx|||StateSummary',
          targetType: 'Excel Data Mart (Sheet: StateSummary)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Claims - State Performance', 'Car Insurance Dashboard'],
          columnsCount: 4,
          columns: [
            { name: 'Quarter End Date', type: 'Date', sampleValue: '2024-03-31', isMatching: true },
            { name: 'State', type: 'String / V_WString', sampleValue: 'CA', isMatching: true },
            { name: 'Claim Count', type: 'Int64 / Int32', sampleValue: '94', isMatching: true },
            { name: 'Total Paid', type: 'Float64 / Double', sampleValue: '341,200.00', isMatching: true },
          ],
        },
        {
          name: 'Claims_Aging_Risk_Demo_Output.xlsx|||AgingRiskSummary',
          targetType: 'Excel Data Mart (Sheet: AgingRiskSummary)',
          matchStatus: 'exact',
          leftPresent: true,
          rightPresent: true,
          downstreamConsumers: ['Benefeciery_services_Aging_Dashboard'],
          columnsCount: 3,
          columns: [
            { name: 'Aging Bucket', type: 'String / V_WString', sampleValue: '90+ Days', isMatching: true },
            { name: 'Litigation Flag', type: 'String / V_WString', sampleValue: 'N', isMatching: true },
            { name: 'Claim Count', type: 'Int64 / Int32', sampleValue: '31', isMatching: true },
          ],
        },
      ],
      frequencyComparison: {
        leftSchedule: 'Daily 05:30 AM EST (Alteryx Server)',
        rightSchedule: 'Daily 05:30 AM EST (Airflow / Cron)',
        leftTrigger: 'Alteryx Server Engine Scheduler',
        rightTrigger: 'Airflow Python Pipeline DAG',
        leftRuntime: '32 seconds',
        rightRuntime: '4.2 seconds (7.6x Speedup)',
        leftStatus: 'Active Legacy',
        rightStatus: 'Active Modernized',
        alignmentSummary: 'Modernized Python pipeline matches the daily 05:30 AM schedule while cutting processing time from 32s to 4.2s.',
        overlapPct: 100,
      },
      logicComparison: {
        rules: [
          {
            name: 'Days Since Activity Vectorization',
            category: 'Formula',
            leftExpression: "Alteryx DateTimeDiff(DateTimeToday(),[Last Activity Date],'days')",
            rightExpression: "(pd.Timestamp.today() - df['Last Activity Date']).dt.days",
            matchType: 'Equivalent',
            description: 'Vectorized datetime difference calculation with matching leap year and null handling.',
          },
          {
            name: 'Aging Bucket Categorization',
            category: 'Formula',
            leftExpression: 'Alteryx Formula conditional switch statement (0-30, 31-90, 90+)',
            rightExpression: "pd.cut(df['Days Since Last Activity'], bins=[-1, 30, 90, np.inf], labels=['0-30 Days', '31-90 Days', '90+ Days'])",
            matchType: 'Equivalent',
            description: 'Vectorized binning producing identical string classifications.',
          },
          {
            name: 'Multi-Table Relational Merges',
            category: 'Join',
            leftExpression: 'Alteryx Join + Union tools for Policy, Payments, and Diary notes',
            rightExpression: "df_claims.merge(df_policy, how='left').merge(df_payments, how='left').merge(df_diary, how='left')",
            matchType: 'Equivalent',
            description: 'Vectorized left joins with automated zero/null imputation for unallocated claims.',
          },
          {
            name: 'Status Matrix CrossTab',
            category: 'Summarize',
            leftExpression: 'Alteryx Cross Tab tool pivoting Claim Status across quarters',
            rightExpression: "pd.pivot_table(df, index='Quarter End Date', columns='Claim Status', values='Claim Number', aggfunc='nunique', fill_value=0)",
            matchType: 'Identical',
            description: 'Identical quarter-by-status matrix aggregations.',
          },
        ],
        similarityScore: 96,
        summary: '96% logic parity achieved through vectorized Python operations. Automated unit test suite verifies 100% output cell parity.',
      },
      dagComparison: {
        stages: [
          { stageName: 'Source Ingestion (4 Input Sources)', leftToolCount: 4, rightToolCount: 4, description: 'Pandas / Calamine excel reader vs Alteryx Input' },
          { stageName: 'Claims & Payment Feature Engineering', leftToolCount: 14, rightToolCount: 18, description: 'Vectorized calculations and temporal summaries' },
          { stageName: 'Relational Merge & Null Imputation', leftToolCount: 7, rightToolCount: 8, description: 'Data frame left joins and fillna logic' },
          { stageName: 'Multidimensional Aggregations', leftToolCount: 5, rightToolCount: 9, description: 'Pivoting and grouping by Quarter, Product, State, Risk' },
          { stageName: 'Data Mart Output Writers', leftToolCount: 5, rightToolCount: 5, description: 'XlsxWriter / OpenPyXL multi-sheet export' },
        ],
        leftTotalNodes: 35,
        rightTotalNodes: 44,
        similarityScore: 94,
        topologyAlignment: 'Topologically identical multi-branch DAG implemented as a modern modular Python package.',
      },
      subsumptionItems: [
        {
          attributeOrTransformation: 'Vectorized Pandas Ingestion',
          candidateStatus: '35 Alteryx Tools',
          targetStatus: 'Modular Python Package (claims_processing)',
          subsumptionType: 'Direct Migration',
          details: 'Complete functional transpile into high-performance Python code.',
        },
        {
          attributeOrTransformation: 'Relational Merge & Null Imputation',
          candidateStatus: 'Sequential Join Tools',
          targetStatus: 'Optimized Polars / Pandas C-Engine Vector Join',
          subsumptionType: 'Superset Match',
          details: '7.6x performance acceleration with bit-for-bit output parity.',
        },
        {
          attributeOrTransformation: 'Output Data Mart Writers',
          candidateStatus: 'Alteryx Output Files',
          targetStatus: 'Native OpenPyXL / Database Loader',
          subsumptionType: 'Fully Subsumed',
          details: 'Identical destination schemas for downstream BI dashboards.',
        },
      ],
      dataSubsumptionEvidence: {
        sourceWorkflowName: 'Claims_Extract_Volume',
        targetWorkflowName: 'claims_processing',
        dataCoveragePct: 1.0,
        missingFieldsCount: 0,
        sharedRequiredFields: [
          'Quarter End Date',
          'Claim Number',
          'Policy Number',
          'Team',
          'Manager',
          'Examiner',
          'Claim Status',
          'Disability Date',
          'ICD1Code',
          'ICD1Description',
          'ICD1GroupName',
          'Product Type',
          'State',
          'Effective Date',
          'Expiration Date',
          'Payment Date',
          'Payment Amount',
          'Last Activity Date',
        ],
        additionalFieldsInTarget: [
          'Pipeline_Execution_Timestamp',
          'Batch_ID',
          'Row_Checksum',
        ],
        fieldProvenanceMap: {
          'Quarter End Date': {
            originalName: 'Quarter End Date',
            sourceDataset: 'Claims_Volume_Extract_Demo.xlsx',
            provenance: 'pd.read_excel() → df["Quarter End Date"] (pd.to_datetime)',
            sampleValues: ['2024-03-31', '2023-12-31', '2023-09-30'],
            isRequired: true,
          },
          'Claim Number': {
            originalName: 'Claim Number',
            sourceDataset: 'Claims_Volume_Extract_Demo.xlsx',
            provenance: 'Primary key index in claims dataframe merges',
            sampleValues: ['CLM-90123', 'CLM-90124', 'CLM-90125'],
            isRequired: true,
          },
          'Policy Number': {
            originalName: 'Policy Number',
            sourceDataset: 'Policy_Master_Demo.xlsx',
            provenance: 'Merged via df_claims.merge(df_policy, on="Policy Number")',
            sampleValues: ['POL-10492', 'POL-10493', 'POL-10494'],
            isRequired: true,
          },
          'Payment Amount': {
            originalName: 'Payment Amount',
            sourceDataset: 'Claim_Payments_Demo.xlsx',
            provenance: 'Aggregated via df_payments.groupby("Claim Number")["Payment Amount"].sum()',
            sampleValues: ['1,450.00', '2,800.00', '650.00'],
            isRequired: true,
          },
        },
        processingSubstitutabilityMatrix: [
          {
            sourceToolId: '1-4',
            sourceToolType: 'Input Data',
            sourceOperation: 'Reads 4 Excel source files',
            targetEquivalent: 'calamine / openpyxl pandas reader',
            status: 'SUPPORTED',
            notes: 'High throughput binary parsing with automated type inference.',
          },
          {
            sourceToolId: '5-20',
            sourceToolType: 'Formula / Filter / CrossTab',
            sourceOperation: 'Date parsing, status pivoting',
            targetEquivalent: 'pd.pivot_table & datetime vectorization',
            status: 'EQUIVALENT',
            notes: '7.6x faster runtime without proprietary server engine requirement.',
          },
          {
            sourceToolId: '21-30',
            sourceToolType: 'Join / Union',
            sourceOperation: 'Multi-table join sequence',
            targetEquivalent: 'df.merge() with how="left"',
            status: 'EQUIVALENT',
            notes: 'Zero variance in left join null handling.',
          },
          {
            sourceToolId: '31-35',
            sourceToolType: 'Output Data',
            sourceOperation: 'Writes 5 Excel workbook sheets',
            targetEquivalent: 'pd.ExcelWriter engine="xlsxwriter"',
            status: 'SUPPORTED',
            notes: 'Exact cell-for-cell format parity confirmed across 10,000+ rows.',
          },
        ],
        outputCompatibility: 'IDENTICAL',
        recommendationSummary: 'Modernized Python pipeline claims_processing replicates 100% of Alteryx logic with a 7.6x speedup. Legacy Alteryx workflow can be retired safely.',
      },
      uniqueFunctionality: {
        'Claims_Extract_Volume': [
          'Proprietary Alteryx Server engine execution model',
        ],
        'claims_processing': [
          'Vectorized NumPy / Pandas execution with 7.6x speedup (4.2s runtime)',
          'Airflow / Prefect cloud-native DAG orchestration compatibility',
          'PyTest automated regression suite and CI/CD integration',
        ],
      },
      downstreamDependencies: [
        { consumerName: 'Claims - Executive Summary', type: 'Tableau', impact: 'Consumes Modernized Output', status: 'ACTIVE' },
        { consumerName: 'Claims - State Performance', type: 'Tableau', impact: 'Consumes Modernized Output', status: 'ACTIVE' },
        { consumerName: 'Claims - Agent Performance', type: 'Tableau', impact: 'Consumes Modernized Output', status: 'ACTIVE' },
        { consumerName: 'Healthcare Claim Analysis Dashboard', type: 'Tableau', impact: 'Consumes Modernized Output', status: 'ACTIVE' },
        { consumerName: 'Car Insurance Dashboard', type: 'Tableau', impact: 'Consumes Modernized Output', status: 'ACTIVE' },
        { consumerName: 'Benefeciery_services_Aging_Dashboard', type: 'Tableau', impact: 'Consumes Modernized Output', status: 'ACTIVE' },
      ],
      retirementSafetyChecks: [
        {
          checkItem: 'Automated Regression Testing Parity',
          status: 'passed',
          details: 'PyTest automated regression suite confirms 0 cell-level diffs across 10,000+ historical rows.',
        },
        {
          checkItem: 'Performance & Latency Benchmark',
          status: 'passed',
          details: 'Python execution completes in 4.2s compared to 32s in Alteryx (7.6x improvement).',
        },
        {
          checkItem: 'Downstream BI Lineage Confirmation',
          status: 'passed',
          details: 'Tableau and Power BI dashboards have been tested against the Python output and verified.',
        },
        {
          checkItem: 'License Cost Elimination',
          status: 'passed',
          details: 'Retiring the Alteryx workflow releases proprietary server engine licensing costs.',
        },
      ],
      rationalePoints: [
        'Full Modernization Parity: The vectorized Python pipeline claims_processing replicates all 35 Alteryx tools with 100% data fidelity.',
        'Safe Decommissioning: Legacy Alteryx workflow can be retired with zero risk to downstream reporting consumers.',
      ],
      validationRequirements: [
        'Complete final dual-run comparison check for today’s production batch.',
        'Point Airflow production DAG to production target folder.',
        'Decommission Alteryx Server scheduled task and archive workflow repository.',
      ],
    };
  }

  // 5. Orphan Cascade Retirement: Workflow_08 (er4)
  if (rec.id === 'er4' || (rec.assets[0]?.name === 'Workflow_08' && rec.tags?.includes('Orphan Cascade'))) {
    return {
      recId: 'er4',
      title: 'Orphan Cascade Decommission Analysis',
      recType: 'RETIRE',
      recommendationBadge: 'Orphan Cascade',
      direction: {
        absorbed: { name: 'Workflow_08', tech: 'Alteryx', role: 'Orphaned ETL Pipeline' },
        retained: { name: 'Sales & Returns Sample v3', tech: 'Power BI', role: 'Cascade Source (Decommissioned)' },
        bannerText: 'CASCADE SOURCE: Sales & Returns Sample v3 (Power BI) [Inactive / Decommission] ➔ ORPHANED ETL: Workflow_08 (Alteryx) [Orphan Cascade Decommission]',
      },
      inScopeWorkflows: [
        {
          id: 'd6',
          name: 'Workflow_08',
          technology: 'Alteryx',
          complexity: 'Low',
          criticality: 'Low',
          toolCount: 5,
          connectionsCount: 2,
          sourcesCount: 1,
          targetsCount: 1,
          schedule: 'Weekly (Every Thursday, 06:00 AM)',
          runtime: '12s',
          lastRunStatus: 'Success',
          owner: 'EXL_S',
          businessArea: 'Distribution',
        },
      ],
      overlapMetrics: {
        sourceMetadataPct: 0,
        targetMetadataPct: 0,
        frequencyPct: 0,
        logicPct: 0,
        dagPct: 0,
      },
      sourcesComparison: [
        {
          name: '4701229_YK5IEQ9R.xlsx',
          sourceType: 'Excel Workbook (Sheet1)',
          matchStatus: 'unique_left',
          leftPresent: true,
          rightPresent: false,
          matchingColumnsCount: 0,
          totalColumnsCount: 2,
          columns: [
            { name: 'Date', type: 'DateTime', sampleValue: '2024-03-14', isMatching: false },
            { name: 'Burritos', type: 'Double', sampleValue: '128', isMatching: false },
          ],
        },
      ],
      targetsComparison: [
        {
          name: 'Workflow8_output.xlsx|||Sheet1',
          targetType: 'Excel Workbook (Sheet1)',
          matchStatus: 'unique_left',
          leftPresent: true,
          rightPresent: false,
          downstreamConsumers: ['Sales & Returns Sample v3'],
          columnsCount: 1,
          columns: [
            { name: 'Avg_Burritos', type: 'Double', sampleValue: '142.50', isMatching: false },
          ],
        },
      ],
      frequencyComparison: {
        leftSchedule: 'Weekly (Every Thursday, 06:00 AM)',
        rightSchedule: 'N/A',
        leftTrigger: 'Alteryx Server Schedule (Weekly Batch)',
        rightTrigger: 'N/A',
        leftRuntime: '12 seconds',
        rightRuntime: 'N/A',
        leftStatus: 'Orphaned Batch',
        rightStatus: 'N/A',
        alignmentSummary: 'No matching execution schedule. Workflow is orphaned due to downstream BI consumer decommission.',
        overlapPct: 0,
      },
      logicComparison: {
        rules: [],
        leftOperations: [],
        similarityScore: 0,
        summary: 'No shared transformation logic. Candidate retirement is caused by downstream BI dependency removal, not logical overlap.',
      },
      dagComparison: {
        stages: [
          { stageName: 'Data Ingestion (1 Input Feed)', leftToolCount: 1, rightToolCount: 0, description: 'Reads operational distribution records from Excel workbook (4701229_YK5IEQ9R.xlsx)' },
          { stageName: 'Date Parsing & Filtering (2 Nodes)', leftToolCount: 2, rightToolCount: 0, description: 'Converts date strings to datetime and filters records for Thursday operational cycles' },
          { stageName: 'Volume Aggregation (1 Node)', leftToolCount: 1, rightToolCount: 0, description: 'Calculates the average value of Burritos (Avg_Burritos)' },
          { stageName: 'Deliverable Export (1 Sink)', leftToolCount: 1, rightToolCount: 0, description: 'Writes summarized data to Workflow8_output.xlsx (Sheet1)' },
        ],
        leftTotalNodes: 5,
        rightTotalNodes: 0,
        similarityScore: 0,
        topologyAlignment: 'No active topological match. Workflow is an orphaned single-sink pipeline with zero active downstream consumers.',
      },
      uniqueFunctionality: {
        'Workflow_08': [
          'Thursday operational distribution volume aggregation and filtering',
          'Single-sheet Excel deliverable export (Workflow8_output.xlsx)',
        ],
      },
      downstreamDependencies: [
        { consumerName: 'Sales & Returns Sample v3', type: 'Power BI', impact: 'Sole Downstream Consumer', status: 'INACTIVE / DECOMMISSION' },
      ],
      retirementSafetyChecks: [
        {
          checkItem: 'Sole Downstream Consumer Audit',
          status: 'passed',
          details: 'Deterministic lineage analysis confirms Sales & Returns Sample v3 is the only downstream BI asset consuming Workflow8_output.xlsx.',
        },
        {
          checkItem: 'BI Decommission Status Verification',
          status: 'passed',
          details: 'Sales & Returns Sample v3 is scheduled for Inactive decommissioning, eliminating the business purpose for this pipeline.',
        },
        {
          checkItem: 'No Secondary Consumer Dependencies',
          status: 'passed',
          details: 'Zero other BI dashboards, downstream ETL workflows, or operational data marts depend on Workflow_08.',
        },
        {
          checkItem: 'Scheduler De-registration Safety',
          status: 'passed',
          details: 'Safe to de-register scheduled job on Alteryx Server Gallery upon BI asset retirement.',
        },
      ],
      rationalePoints: [
        'ORPHAN CASCADE — Sole Downstream Consumer Decommissioned: Associated BI dashboard is under Inactive decommission. Workflow_08 serves only this dashboard, and this decision also cascades to this ETL workflow because the workflow serves only that BI dashboard.',
        'LINEAGE CASCADE — Deterministic Dependency: Workflow_08 output (Workflow8_output.xlsx) has zero active consumers once Sales & Returns Sample v3 is retired.',
      ],
      validationRequirements: [
        'Confirm decommission approval for downstream Power BI dashboard Sales & Returns Sample v3.',
        'De-register scheduled job for Workflow_08 on Alteryx Server Gallery.',
        'Archive Workflow_08.yxmd definition to decommissioned backup repository folder.',
      ],
    };
  }

  // Generic Fallback for any other recommendation
  const isRetire = rec.category.includes('retire');
  const w1 = rec.assets[0];
  const w2 = rec.assets[1] || rec.dependentAsset;
  const a1 = allAssets.find((a) => a.name === w1?.name);
  const a2 = w2 ? allAssets.find((a) => a.name === w2.name) : undefined;
  const w1Tools = (a1 && (ALTERYX_DETAIL_DATA as any)[a1.id]?.tools?.length) || 10;
  const w2Tools = (a2 && (ALTERYX_DETAIL_DATA as any)[a2.id]?.tools?.length) || (w2 ? 15 : 0);

  return {
    recId: rec.id,
    title: `${rec.title} Analysis`,
    recType: isRetire ? 'RETIRE' : 'CONSOLIDATE',
    recommendationBadge: isRetire ? 'Retire' : 'Consolidate',
    direction: {
      absorbed: { name: w1?.name || 'Asset 1', tech: w1?.technology || 'Alteryx', role: isRetire ? 'Candidate to Retire' : 'Absorbed Candidate' },
      retained: { name: w2?.name || (isRetire ? 'None' : 'Target Asset'), tech: w2?.technology || 'Alteryx', role: isRetire ? 'Retained Alternative' : 'Retained Superset' },
      bannerText: isRetire
        ? `RETIRED ASSET: ${w1?.name || ''} (${w1?.technology || ''}) → ${w2 ? `ALTERNATIVE: ${w2.name} (${w2.technology})` : 'REASON: Inactive / Redundant'}`
        : `ABSORBED CANDIDATE: ${w1?.name || ''} (${w1?.technology || ''}) → RETAINED SUPERSET: ${w2?.name || rec.mergeTarget || ''}`,
    },
    inScopeWorkflows: [
      {
        id: a1?.id || 'w1',
        name: w1?.name || 'Workflow 1',
        technology: w1?.technology || 'Alteryx',
        complexity: 'Medium',
        criticality: 'Medium',
        toolCount: w1Tools,
        sourcesCount: rec.tables?.length || 2,
        targetsCount: 1,
        schedule: 'Daily Scheduled',
        runtime: '20s',
        lastRunStatus: 'Success',
        owner: rec.owner || 'EXL',
        businessArea: rec.businessArea,
      },
      ...(w2
        ? [
            {
              id: a2?.id || 'w2',
              name: w2.name,
              technology: w2.technology,
              complexity: 'High' as const,
              criticality: 'High' as const,
              toolCount: w2Tools,
              sourcesCount: rec.targetTables?.length || rec.tables?.length || 3,
              targetsCount: 2,
              schedule: 'Daily Scheduled',
              runtime: '25s',
              lastRunStatus: 'Success' as const,
              owner: rec.targetOwner || rec.owner || 'EXL',
              businessArea: rec.businessArea,
            },
          ]
        : []),
    ],
    overlapMetrics: {
      sourceMetadataPct: rec.overlapPct || 70,
      targetMetadataPct: rec.overlapPct || 65,
      frequencyPct: 100,
      logicPct: rec.overlapPct || 75,
      dagPct: 70,
    },
    sourcesComparison: (rec.tables || ['Source_Data_1', 'Source_Data_2']).map((t, idx) => ({
      name: t,
      sourceType: 'Relational / File Source',
      matchStatus: idx % 2 === 0 ? 'exact' : 'partial',
      leftPresent: true,
      rightPresent: true,
      matchingColumnsCount: 5,
      totalColumnsCount: 6,
      columns: [
        { name: 'Record_ID', type: 'Int64', sampleValue: '1001', isMatching: true },
        { name: 'Dimension_Key', type: 'V_WString', sampleValue: 'DIM-01', isMatching: true },
        { name: 'Amount_Value', type: 'Double', sampleValue: '1,200.00', isMatching: true },
      ],
    })),
    targetsComparison: [
      {
        name: 'Consolidated_Output_Mart',
        targetType: 'Data Mart Sink',
        matchStatus: 'exact',
        leftPresent: true,
        rightPresent: true,
        downstreamConsumers: ['Executive Dashboard'],
        columnsCount: 8,
        columns: [
          { name: 'Record_ID', type: 'Int64', isMatching: true },
          { name: 'Total_Metric', type: 'Double', isMatching: true },
        ],
      },
    ],
    frequencyComparison: {
      leftSchedule: 'Daily 05:00 AM',
      rightSchedule: 'Daily 05:30 AM',
      leftTrigger: 'Scheduled Cron',
      rightTrigger: 'Scheduled Cron',
      leftRuntime: '20s',
      rightRuntime: '25s',
      leftStatus: 'Active',
      rightStatus: 'Active',
      alignmentSummary: 'Both workflows execute on matching daily cadences.',
      overlapPct: 90,
    },
    logicComparison: {
      rules: [
        {
          name: 'Core Transformation & Filter',
          category: 'Formula',
          leftExpression: 'Filter Active Records',
          rightExpression: 'Filter Active Records',
          matchType: 'Identical',
          description: 'Standard operational filtering on active entities.',
        },
      ],
      similarityScore: rec.overlapPct || 75,
      summary: 'High logical alignment across primary transformation paths.',
    },
    dagComparison: {
      stages: [
        { stageName: 'Ingestion & Prep', leftToolCount: 4, rightToolCount: 6, description: 'Source ingestion and clean' },
        { stageName: 'Transformation & Sinks', leftToolCount: 6, rightToolCount: 9, description: 'Transform and write' },
      ],
      leftTotalNodes: w1Tools,
      rightTotalNodes: w2Tools || 10,
      similarityScore: 75,
      topologyAlignment: 'Aligned pipeline stages and data processing flow.',
    },
    rationalePoints: [rec.rationale],
    validationRequirements: ['Verify output data parity on test run before applying recommendation.'],
  };
}

