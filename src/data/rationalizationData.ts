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
  { id: 'kpi', label: 'KPI Overlaps', value: 24, highlight: true },
  { id: 'schema', label: 'Schema Overlaps', value: 8 },
  { id: 'bi-etl-conn', label: 'BI-ETL Connections', value: 32 },
  { id: 'cross-tech', label: 'Cross-Technology Overlaps', value: 8, highlight: true },
];

export const etlOverlapMetrics: OverlapMetric[] = [
  { id: 'etl-source-overlap', label: 'Source Overlaps', value: 14 },
  { id: 'etl-logic', label: 'Logic Overlaps', value: 9 },
  { id: 'etl-target', label: 'Target Overlaps', value: 6 },
  { id: 'etl-schedule', label: 'Schedule Conflicts', value: 4 },
  { id: 'etl-bi-conn', label: 'BI-ETL Connections', value: 32 },
  { id: 'cross-tech', label: 'Cross-Technology Overlaps', value: 6, highlight: true },
];

/* ── Recommendation types ── */
export type RecommendationCategory =
  | 'merge-bi'
  | 'etl-merge'
  | 'bi-retire'
  | 'etl-retire'
  | 'bi-keep'
  | 'bi-etl-connections';

export interface CategoryInfo {
  id: RecommendationCategory;
  label: string;
  count: number;
  color: string;
  section: 'bi' | 'etl' | 'both';
}

export const categories: CategoryInfo[] = [
  { id: 'merge-bi', label: 'Merge BI', count: 6, color: '#FB4E0B', section: 'bi' },
  { id: 'etl-merge', label: 'ETL Merge', count: 4, color: '#0EA5E9', section: 'etl' },
  { id: 'bi-retire', label: 'BI Retire', count: 5, color: '#EF4444', section: 'bi' },
  { id: 'etl-retire', label: 'ETL Retire', count: 3, color: '#F97316', section: 'etl' },
  { id: 'bi-keep', label: 'BI Keep', count: 8, color: '#22C55E', section: 'bi' },
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
    title: 'Claims Overview Consolidation',
    businessArea: 'Claims',
    overlapPct: 72,
    assets: [asset('claims_overview', 'Tableau'), asset('claims_executive_dashboard', 'Power BI')],
    rationale: 'Both dashboards track identical claims KPIs (open/closed ratio, cycle time, loss ratio) from the same data sources. The Tableau version has 3 fewer KPIs and 40% lower monthly usage.',
    action: 'Consolidate into Power BI claims_executive_dashboard. Migrate 3 unique Tableau visuals.',
    tags: ['High Overlap', 'Same Sources'],
    kpis: ['Open/Closed Ratio', 'Avg Cycle Time', 'Loss Ratio', 'Claims by Region', 'Severity Distribution', 'Pending Queue', 'Reserve Accuracy', 'Adjuster Workload'],
    tables: ['claims_fact', 'claims_dim_status', 'claims_loss_data', 'policy_master'],
    owner: 'Sarah Mitchell',
    lastViewed: '14 days ago',
    userGroups: ['Claims Ops', 'Executive', 'Actuarial'],
    summary: 'Executive overview of claims operations including open/closed ratios, average cycle time, and regional breakdown.',
    commonKpis: ['Open/Closed Ratio', 'Avg Cycle Time', 'Loss Ratio', 'Claims by Region', 'Severity Distribution'],
    commonTables: ['claims_fact', 'claims_loss_data', 'policy_master'],
    mergeTarget: 'claims_executive_dashboard',
  },
  {
    id: 'mb2',
    category: 'merge-bi',
    title: 'Underwriting Risk Dashboard Merger',
    businessArea: 'Underwriting',
    overlapPct: 58,
    assets: [asset('risk_appetite_monitor', 'Tableau'), asset('underwriting_scorecard', 'Power BI')],
    rationale: 'Both track underwriting risk metrics with 58% KPI overlap. Risk appetite monitor adds exposure-based views; scorecard adds hit-ratio analysis.',
    action: 'Merge into a unified Power BI underwriting dashboard combining both perspectives.',
    tags: ['Cross-Platform'],
    kpis: ['Risk Appetite Score', 'Exposure by Class', 'Hit Ratio', 'Quote-to-Bind', 'Premium Adequacy', 'Loss Emergence', 'Submission Volume'],
    tables: ['underwriting_fact', 'risk_appetite_dim', 'rating_bureau_data', 'exposure_model'],
    owner: 'Lisa Wang',
    lastViewed: '7 days ago',
    userGroups: ['Underwriting Mgmt', 'Risk Committee'],
    summary: 'Risk appetite monitoring with exposure-based views and underwriting performance metrics.',
    commonKpis: ['Risk Appetite Score', 'Exposure by Class', 'Hit Ratio', 'Premium Adequacy'],
    commonTables: ['underwriting_fact', 'rating_bureau_data'],
    mergeTarget: 'underwriting_scorecard',
  },
  {
    id: 'mb3',
    category: 'merge-bi',
    title: 'Claims Operations Consolidation',
    businessArea: 'Claims',
    overlapPct: 65,
    assets: [asset('claims_performance', 'Tableau'), asset('claims_operations_dashboard', 'Power BI')],
    rationale: 'Significant overlap in claims operational metrics. Both use Claims_Extract_Volume as primary source. Performance dashboard has unique trend views.',
    action: 'Consolidate into Power BI. Port trend analysis visuals from Tableau.',
    tags: ['Same ETL Source'],
    kpis: ['Claims Throughput', 'Avg Settlement Time', 'Reopened Rate', 'SLA Compliance', 'Adjuster Productivity', 'Cost per Claim'],
    tables: ['claims_fact', 'claims_etl_staging', 'adjuster_dim'],
    owner: 'Sarah Mitchell',
    lastViewed: '9 days ago',
    userGroups: ['Claims Ops', 'Claims Supervisors'],
    summary: 'Claims operational performance tracking with trend analysis and adjuster productivity metrics.',
    commonKpis: ['Claims Throughput', 'Avg Settlement Time', 'SLA Compliance', 'Cost per Claim'],
    commonTables: ['claims_fact', 'claims_etl_staging'],
    mergeTarget: 'claims_operations_dashboard',
  },
  {
    id: 'mb4',
    category: 'merge-bi',
    title: 'Financial Reporting Merger',
    businessArea: 'Finance',
    overlapPct: 54,
    assets: [asset('loss_ratio_analysis', 'Tableau'), asset('financial_overview', 'Power BI')],
    rationale: 'Loss ratio analysis is a subset of the financial overview. All 5 KPIs in the Tableau version exist in the Power BI dashboard.',
    action: 'Retire Tableau loss_ratio_analysis. Ensure loss-ratio tab in Power BI financial_overview.',
    kpis: ['Loss Ratio', 'Combined Ratio', 'Net Loss', 'Incurred Claims', 'Development Factor'],
    tables: ['finance_fact', 'loss_development_tri', 'premium_earned'],
    owner: 'Jennifer Adams',
    lastViewed: '10 days ago',
    userGroups: ['Finance', 'Actuarial'],
    summary: 'Loss ratio analysis dashboard tracking incurred claims and development factors.',
    commonKpis: ['Loss Ratio', 'Combined Ratio', 'Net Loss', 'Incurred Claims', 'Development Factor'],
    commonTables: ['finance_fact', 'premium_earned'],
    mergeTarget: 'financial_overview',
  },
  {
    id: 'mb5',
    category: 'merge-bi',
    title: 'Customer Retention Consolidation',
    businessArea: 'Customer',
    overlapPct: 61,
    assets: [asset('nps_survey_analysis', 'Tableau'), asset('customer_retention_dashboard', 'Power BI')],
    rationale: 'NPS survey data feeds into retention analysis. 61% of retention dashboard KPIs overlap with NPS report calculations.',
    action: 'Integrate NPS analysis as a tab within the Power BI retention dashboard.',
    kpis: ['NPS Score', 'Customer Satisfaction', 'Churn Rate', 'Retention Rate'],
    tables: ['customer_survey', 'customer_dim', 'policy_master'],
    owner: 'Paul Kim',
    lastViewed: '52 days ago',
    userGroups: ['Customer Experience', 'Marketing'],
    summary: 'NPS survey analysis tracking customer satisfaction and loyalty metrics.',
    commonKpis: ['NPS Score', 'Churn Rate', 'Retention Rate'],
    commonTables: ['customer_dim', 'policy_master'],
    mergeTarget: 'customer_retention_dashboard',
  },
  {
    id: 'mb6',
    category: 'merge-bi',
    title: 'Policy Lifecycle Consolidation',
    businessArea: 'Policy Administration',
    overlapPct: 52,
    assets: [asset('policy_book_analysis', 'Tableau'), asset('policy_lifecycle_dashboard', 'Power BI')],
    rationale: 'Policy book analysis shares 52% of its data model with lifecycle dashboard. Both pull from Policy_Consolidation_Workflow ETL.',
    action: 'Add book analysis views to the Power BI policy lifecycle dashboard.',
    kpis: ['Book Premium', 'Policy Count', 'Retention Rate', 'Endorsement Volume', 'Cancellation Rate', 'New Business Ratio', 'Renewal Rate'],
    tables: ['policy_fact', 'policy_dim', 'policy_data_extract_out', 'product_dim'],
    owner: 'Diana Lee',
    lastViewed: '23 days ago',
    userGroups: ['Policy Admin', 'Underwriting'],
    summary: 'Policy book analysis covering premium distribution, retention, and endorsement trends.',
    commonKpis: ['Book Premium', 'Policy Count', 'Retention Rate', 'Renewal Rate'],
    commonTables: ['policy_fact', 'policy_data_extract_out'],
    mergeTarget: 'policy_lifecycle_dashboard',
  },

  /* ── ETL Merge ── */
  {
    id: 'em1',
    category: 'etl-merge',
    title: 'Claims ETL Consolidation',
    businessArea: 'Claims',
    overlapPct: 68,
    assets: [asset('Claims_Extract_Volume', 'Alteryx'), asset('endorsement_processing', 'Python')],
    rationale: 'Both pipelines extract from the same policy core system. Claims ETL and endorsement processing share 4 common transformation steps and 3 target tables.',
    action: 'Consolidate into a single Alteryx workflow with endorsement processing as a sub-module.',
    tags: ['Shared Sources'],
    kpis: ['Extract Row Count', 'Load Latency (s)', 'Error Rate', 'Transformation Steps'],
    tables: ['claims_raw', 'policy_core', 'claims_fact', 'endorsement_staging', 'endorsement_fact'],
    owner: 'David Park',
    lastViewed: '1 day ago',
    userGroups: ['Data Engineering', 'Claims Ops'],
    summary: 'Daily ETL pipeline transforming raw claims data from multiple source systems into the claims data mart.',
    commonKpis: ['Extract Row Count', 'Load Latency (s)'],
    commonTables: ['policy_core', 'claims_fact'],
    mergeTarget: 'claims_etl_workflow',
  },
  {
    id: 'em2',
    category: 'etl-merge',
    title: 'Finance Pipeline Consolidation',
    businessArea: 'Finance',
    overlapPct: 55,
    assets: [asset('Finance_ETL', 'Alteryx'), asset('regulatory_reporting_pipeline', 'Python')],
    rationale: 'Regulatory reporting pipeline duplicates 55% of the consolidation ETL logic. Both aggregate the same premium and loss data.',
    action: 'Merge regulatory reporting into the Alteryx finance consolidation as a downstream branch.',
    kpis: ['Premium Aggregation', 'Loss Data Consolidation', 'Regulatory Fields', 'Data Freshness'],
    tables: ['premium_raw', 'loss_raw', 'finance_consolidated', 'regulatory_output'],
    owner: 'Carlos Rivera',
    lastViewed: '5 days ago',
    userGroups: ['Data Engineering', 'Finance'],
    summary: 'Monthly financial consolidation aggregating data from policy, claims, and investment systems.',
    commonKpis: ['Premium Aggregation', 'Loss Data Consolidation'],
    commonTables: ['premium_raw', 'loss_raw'],
    mergeTarget: 'finance_consolidation_etl',
  },
  {
    id: 'em3',
    category: 'etl-merge',
    title: 'Underwriting Data Pipeline Merger',
    businessArea: 'Underwriting',
    overlapPct: 48,
    assets: [asset('Workflow_04', 'Alteryx'), asset('quote_generation_pipeline', 'Python')],
    rationale: 'Quote generation pipeline re-extracts rating bureau data already available in the risk ETL output. Shared source overlap of 48%.',
    action: 'Refactor quote pipeline to consume risk ETL output instead of re-extracting source data.',
    kpis: ['Bureau Data Freshness', 'Risk Score Calculation', 'Quote Throughput'],
    tables: ['rating_bureau_data', 'risk_model_output', 'quote_staging', 'exposure_raw'],
    owner: 'Kevin Liu',
    lastViewed: '9 days ago',
    userGroups: ['Data Engineering', 'Underwriting'],
    summary: 'Risk data pipeline consolidating external rating bureau data, loss history, and exposure models.',
    commonKpis: ['Bureau Data Freshness', 'Risk Score Calculation'],
    commonTables: ['rating_bureau_data'],
    mergeTarget: 'underwriting_risk_etl',
  },
  {
    id: 'em4',
    category: 'etl-merge',
    title: 'Customer Data Deduplication',
    businessArea: 'Customer',
    overlapPct: 42,
    assets: [asset('Customer_Thursday_Metrics', 'Alteryx'), asset('actuarial_data_pipeline', 'Python')],
    rationale: 'Actuarial pipeline extracts customer demographics already consolidated by the customer data integration ETL. Redundant extraction from CRM system.',
    action: 'Have actuarial pipeline consume customer integration output for demographics.',
    kpis: ['Customer Match Rate', 'Demographics Completeness', 'CRM Sync Lag'],
    tables: ['crm_customer', 'customer_consolidated', 'actuarial_customer_dim'],
    owner: 'Megan Scott',
    lastViewed: '2 days ago',
    userGroups: ['Data Engineering', 'Actuarial'],
    summary: 'Customer data integration pipeline consolidating CRM and policy system customer records.',
    commonKpis: ['Customer Match Rate', 'Demographics Completeness'],
    commonTables: ['crm_customer'],
    mergeTarget: 'customer_data_integration',
  },

  /* ── BI Retire ── */
  {
    id: 'br1',
    category: 'bi-retire',
    title: 'Retire Submission Tracker (Orphan Cascade)',
    businessArea: 'Underwriting',
    assets: [asset('submission_tracker', 'MicroStrategy')],
    rationale: 'ORPHAN CASCADE: Not viewed by any user in the past 194 days. The associated Workflow_04 partially feeds this dashboard — but also feeds 2 other active dashboards, so the ETL is retained.',
    action: 'Decommission MicroStrategy submission_tracker. No ETL cascade required.',
    tags: ['Orphan', '194 days unused'],
    kpis: ['Submission Count', 'Bind Ratio', 'Avg Premium', 'Decline Rate'],
    tables: ['submission_fact', 'underwriting_dim'],
    owner: 'Tom Harrison',
    lastViewed: '194 days ago',
    userGroups: [],
    summary: 'Submission tracking report for underwriting pipeline. No active viewers detected.',
  },
  {
    id: 'br2',
    category: 'bi-retire',
    title: 'Retire Broker Commission Report',
    businessArea: 'Distribution',
    assets: [asset('broker_commission_report', 'MicroStrategy')],
    rationale: 'ORPHAN CASCADE: Not viewed in 210 days. Fully superseded by Power BI channel_analytics dashboard which includes commission tracking with enhanced broker segmentation.',
    action: 'Decommission MicroStrategy broker_commission_report. Verify channel_analytics covers all commission views.',
    tags: ['Orphan', 'Superseded', '210 days unused'],
    dependentAsset: asset('distribution_data_etl', 'Alteryx'),
    kpis: ['Commission Rate', 'Broker Volume', 'Payout Schedule'],
    tables: ['broker_commission_fact', 'broker_dim', 'distribution_data'],
    owner: 'Steve Williams',
    lastViewed: '210 days ago',
    userGroups: [],
    summary: 'Broker commission reporting. Fully superseded by channel_analytics dashboard.',
  },
  {
    id: 'br3',
    category: 'bi-retire',
    title: 'Retire Claims Loss Ratio (Tableau)',
    businessArea: 'Claims',
    assets: [asset('claims_loss_ratio', 'Tableau')],
    rationale: 'Tableau retirement due to similar Power BI: All KPIs in claims_loss_ratio exist in claims_executive_dashboard. 100% functional overlap after merger MB1 is executed.',
    action: 'Retire after Claims Overview Consolidation (MB1) is complete.',
    tags: ['Post-Merge Retire', 'Tableau→PowerBI'],
    kpis: ['Loss Ratio', 'Incurred Claims', 'Paid Claims', 'Reserve Movement'],
    tables: ['claims_loss_data', 'claims_fact'],
    owner: 'James Chen',
    lastViewed: '57 days ago',
    userGroups: ['Claims Ops'],
    summary: 'Claims loss ratio reporting. All KPIs exist in claims_executive_dashboard.',
  },
  {
    id: 'br4',
    category: 'bi-retire',
    title: 'Retire Pricing Adequacy Report',
    businessArea: 'Actuarial',
    assets: [asset('pricing_adequacy_report', 'MicroStrategy')],
    rationale: 'ORPHAN CASCADE: Last viewed 165 days ago. Pricing adequacy metrics are now tracked in the ThoughtSpot loss_triangle_workbook with live data refresh.',
    action: 'Decommission after confirming loss_triangle_workbook covers all pricing views.',
    tags: ['Orphan', '165 days unused'],
    kpis: ['Rate Adequacy', 'Frequency Trend', 'Severity Trend', 'Target Loss Ratio', 'Rate Change', 'Territorial Factor'],
    tables: ['pricing_model', 'rate_history', 'loss_development_tri'],
    owner: 'Dr. Robert Lin',
    lastViewed: '165 days ago',
    userGroups: [],
    summary: 'Pricing adequacy analysis. Metrics now tracked in ThoughtSpot loss_triangle_workbook.',
  },
  {
    id: 'br5',
    category: 'bi-retire',
    title: 'Retire Premium Revenue Report',
    businessArea: 'Finance',
    assets: [asset('premium_revenue_report', 'MicroStrategy')],
    rationale: 'Fully superseded by Power BI financial_overview which provides real-time premium revenue tracking plus additional investment income and expense ratio views.',
    action: 'Decommission MicroStrategy premium_revenue_report. Cascade retire regulatory_reporting_pipeline.',
    tags: ['Superseded', 'Cascade'],
    dependentAsset: asset('regulatory_reporting_pipeline', 'Python'),
    kpis: ['Written Premium', 'Earned Premium', 'Premium Growth', 'Binding Ratio', 'Revenue by Line', 'Renewal Premium'],
    tables: ['premium_fact', 'premium_earned', 'product_line_dim'],
    owner: 'Mark Sullivan',
    lastViewed: '86 days ago',
    userGroups: ['Finance'],
    summary: 'Premium revenue reporting. Superseded by Power BI financial_overview with real-time data.',
  },

  /* ── ETL Retire ── */
  {
    id: 'er1',
    category: 'etl-retire',
    title: 'Retire Endorsement Processing (Zombie ETL)',
    businessArea: 'Policy Administration',
    assets: [asset('endorsement_processing', 'Python')],
    rationale: 'ZOMBIE ETL: Runs daily on schedule. DB target tables (endorsement_staging, endorsement_fact) are not consumed by any active BI dashboard or reporting system. Last downstream query: 98 days ago.',
    action: 'Decommission Python endorsement_processing pipeline. Archive target tables.',
    tags: ['Zombie', 'No BI Consumer'],
    kpis: ['Endorsement Volume', 'Processing Time', 'Error Rate'],
    tables: ['endorsement_staging', 'endorsement_fact', 'policy_core'],
    owner: 'Rob Taylor',
    lastViewed: '98 days ago',
    userGroups: [],
    summary: 'Endorsement processing pipeline. Target tables have no active BI consumers.',
  },
  {
    id: 'er2',
    category: 'etl-retire',
    title: 'Retire Regulatory Reporting Pipeline',
    businessArea: 'Finance',
    assets: [asset('regulatory_reporting_pipeline', 'Python')],
    rationale: 'ZOMBIE ETL: Runs weekly but its output tables are only consumed by the retired premium_revenue_report (MicroStrategy). After BI retire BR5, this ETL has zero downstream consumers.',
    action: 'Decommission after BR5 (Premium Revenue Report retirement) is confirmed. Cascade retire.',
    tags: ['Zombie', 'Cascade from BR5'],
    kpis: ['Regulatory Field Count', 'Submission Deadline Compliance', 'Data Freshness'],
    tables: ['regulatory_output', 'premium_raw', 'loss_raw'],
    owner: 'Carlos Rivera',
    lastViewed: '42 days ago',
    userGroups: [],
    summary: 'Regulatory reporting pipeline. Zero downstream consumers after BR5 retirement.',
  },
  {
    id: 'er3',
    category: 'etl-retire',
    title: 'Retire Quote Generation Pipeline',
    businessArea: 'Underwriting',
    assets: [asset('quote_generation_pipeline', 'Python')],
    rationale: 'ZOMBIE ETL: DB target quote_staging is not serving any BI dashboard. The downstream quoting system switched to a direct API integration 6 months ago.',
    action: 'Decommission Python quote_generation_pipeline after confirming API integration is stable.',
    tags: ['Zombie', 'API Replaced'],
    kpis: ['Quote Throughput', 'Quote Latency', 'API Migration Coverage'],
    tables: ['quote_staging', 'rating_bureau_data'],
    owner: 'Kevin Liu',
    lastViewed: '120 days ago',
    userGroups: [],
    summary: 'Quote generation pipeline. Replaced by direct API integration 6 months ago.',
  },

  /* ── BI Keep ── */
  {
    id: 'bk1',
    category: 'bi-keep',
    title: 'Keep Financial Overview',
    businessArea: 'Finance',
    assets: [asset('financial_overview', 'Power BI')],
    rationale: 'CFO-level dashboard with 14 KPIs, 7 data sources, and high daily usage (47 unique users/week). Critical for monthly board reporting.',
    action: 'Retain as-is. Designate as golden source for financial reporting.',
    tags: ['Critical', 'High Usage'],
  },
  {
    id: 'bk2',
    category: 'bi-keep',
    title: 'Keep Customer 360 View',
    businessArea: 'Customer',
    assets: [asset('customer_360_view', 'ThoughtSpot')],
    rationale: 'Unified customer profile with 10 KPIs combining policy, claims, billing, and interaction data. No equivalent exists on other platforms. 32 active users.',
    action: 'Retain. Unique asset with no platform overlap.',
    tags: ['Unique', 'High Usage'],
  },
  {
    id: 'bk3',
    category: 'bi-keep',
    title: 'Keep Policy Lifecycle Dashboard',
    businessArea: 'Policy Administration',
    assets: [asset('policy_lifecycle_dashboard', 'Power BI')],
    rationale: 'End-to-end policy visibility with 11 KPIs. Primary operational dashboard for policy administration team. Will absorb policy_book_analysis views after merge.',
    action: 'Retain and enhance with merged content from MB6.',
    tags: ['Critical', 'Merge Target'],
  },
  {
    id: 'bk4',
    category: 'bi-keep',
    title: 'Keep Underwriting Pipeline Dashboard',
    businessArea: 'Underwriting',
    assets: [asset('underwriting_pipeline', 'Power BI')],
    rationale: 'Active pipeline management dashboard with 5 KPIs. Used daily by underwriting managers. No overlap with other dashboards.',
    action: 'Retain as-is.',
    tags: ['Daily Use'],
  },
  {
    id: 'bk5',
    category: 'bi-keep',
    title: 'Keep Agent Performance Dashboard',
    businessArea: 'Distribution',
    assets: [asset('agent_performance', 'Tableau')],
    rationale: 'Primary agent/broker tracking with 8 KPIs. Distribution team prefers Tableau for interactive filtering. No Power BI equivalent.',
    action: 'Retain. Evaluate future migration to Power BI in Phase 3.',
    tags: ['Team Preference'],
  },
  {
    id: 'bk6',
    category: 'bi-keep',
    title: 'Keep Reserve Adequacy Dashboard',
    businessArea: 'Actuarial',
    assets: [asset('reserve_adequacy_dashboard', 'Tableau')],
    rationale: 'IBNR reserve monitoring with 8 KPIs. Critical actuarial tool with specialized triangle visualizations. High usage among actuaries.',
    action: 'Retain. Specialized actuarial tooling.',
    tags: ['Critical', 'Specialized'],
  },
  {
    id: 'bk7',
    category: 'bi-keep',
    title: 'Keep Loss Triangle Workbook',
    businessArea: 'Actuarial',
    assets: [asset('loss_triangle_workbook', 'ThoughtSpot')],
    rationale: 'Interactive loss development analysis with ThoughtSpot AI search capabilities. Unique analytical tool for actuarial modeling.',
    action: 'Retain. Unique AI-search capabilities for actuarial analysis.',
    tags: ['Unique', 'AI-Enabled'],
  },
  {
    id: 'bk8',
    category: 'bi-keep',
    title: 'Keep Channel Analytics',
    businessArea: 'Distribution',
    assets: [asset('channel_analytics', 'Power BI')],
    rationale: 'Comprehensive channel performance dashboard with 6 KPIs. Replaces retired broker_commission_report. Growing user base.',
    action: 'Retain. Absorbs commission reporting from retired MicroStrategy asset.',
    tags: ['Growing Usage', 'Replacement'],
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
