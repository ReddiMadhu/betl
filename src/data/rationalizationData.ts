import { TECHNOLOGY_LOGOS } from './discoveryData';
import type { TechnologyName } from './discoveryData';

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
];

export const etlOverlapMetrics: OverlapMetric[] = [
  { id: 'etl-source-overlap', label: 'Source Overlaps', value: 14 },
  { id: 'etl-logic', label: 'Logic Overlaps', value: 9 },
  { id: 'etl-target', label: 'Target Overlaps', value: 6 },
  { id: 'etl-schedule', label: 'Schedule Conflicts', value: 4 },
  { id: 'etl-bi-conn', label: 'BI-ETL Connections', value: 32 },
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
  },
  {
    id: 'mb3',
    category: 'merge-bi',
    title: 'Claims Operations Consolidation',
    businessArea: 'Claims',
    overlapPct: 65,
    assets: [asset('claims_performance', 'Tableau'), asset('claims_operations_dashboard', 'Power BI')],
    rationale: 'Significant overlap in claims operational metrics. Both use claims_etl_workflow as primary source. Performance dashboard has unique trend views.',
    action: 'Consolidate into Power BI. Port trend analysis visuals from Tableau.',
    tags: ['Same ETL Source'],
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
  },
  {
    id: 'mb6',
    category: 'merge-bi',
    title: 'Policy Lifecycle Consolidation',
    businessArea: 'Policy Administration',
    overlapPct: 52,
    assets: [asset('policy_book_analysis', 'Tableau'), asset('policy_lifecycle_dashboard', 'Power BI')],
    rationale: 'Policy book analysis shares 52% of its data model with lifecycle dashboard. Both pull from policy_data_extract ETL.',
    action: 'Add book analysis views to the Power BI policy lifecycle dashboard.',
  },

  /* ── ETL Merge ── */
  {
    id: 'em1',
    category: 'etl-merge',
    title: 'Claims ETL Consolidation',
    businessArea: 'Claims',
    overlapPct: 68,
    assets: [asset('claims_etl_workflow', 'Alteryx'), asset('endorsement_processing', 'Python')],
    rationale: 'Both pipelines extract from the same policy core system. Claims ETL and endorsement processing share 4 common transformation steps and 3 target tables.',
    action: 'Consolidate into a single Alteryx workflow with endorsement processing as a sub-module.',
    tags: ['Shared Sources'],
  },
  {
    id: 'em2',
    category: 'etl-merge',
    title: 'Finance Pipeline Consolidation',
    businessArea: 'Finance',
    overlapPct: 55,
    assets: [asset('finance_consolidation_etl', 'Alteryx'), asset('regulatory_reporting_pipeline', 'Python')],
    rationale: 'Regulatory reporting pipeline duplicates 55% of the consolidation ETL logic. Both aggregate the same premium and loss data.',
    action: 'Merge regulatory reporting into the Alteryx finance consolidation as a downstream branch.',
  },
  {
    id: 'em3',
    category: 'etl-merge',
    title: 'Underwriting Data Pipeline Merger',
    businessArea: 'Underwriting',
    overlapPct: 48,
    assets: [asset('underwriting_risk_etl', 'Alteryx'), asset('quote_generation_pipeline', 'Python')],
    rationale: 'Quote generation pipeline re-extracts rating bureau data already available in the risk ETL output. Shared source overlap of 48%.',
    action: 'Refactor quote pipeline to consume risk ETL output instead of re-extracting source data.',
  },
  {
    id: 'em4',
    category: 'etl-merge',
    title: 'Customer Data Deduplication',
    businessArea: 'Customer',
    overlapPct: 42,
    assets: [asset('customer_data_integration', 'Alteryx'), asset('actuarial_data_pipeline', 'Python')],
    rationale: 'Actuarial pipeline extracts customer demographics already consolidated by the customer data integration ETL. Redundant extraction from CRM system.',
    action: 'Have actuarial pipeline consume customer integration output for demographics.',
  },

  /* ── BI Retire ── */
  {
    id: 'br1',
    category: 'bi-retire',
    title: 'Retire Submission Tracker (Orphan Cascade)',
    businessArea: 'Underwriting',
    assets: [asset('submission_tracker', 'MicroStrategy')],
    rationale: 'ORPHAN CASCADE: Not viewed by any user in the past 194 days. The associated underwriting_risk_etl partially feeds this dashboard — but also feeds 2 other active dashboards, so the ETL is retained.',
    action: 'Decommission MicroStrategy submission_tracker. No ETL cascade required.',
    tags: ['Orphan', '194 days unused'],
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
  },
  {
    id: 'br5',
    category: 'bi-retire',
    title: 'Retire Premium Revenue Report',
    businessArea: 'Finance',
    assets: [asset('premium_revenue_report', 'MicroStrategy')],
    rationale: 'Fully superseded by Power BI financial_overview which provides real-time premium revenue tracking plus additional investment income and expense ratio views.',
    action: 'Decommission MicroStrategy premium_revenue_report.',
    tags: ['Superseded'],
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
