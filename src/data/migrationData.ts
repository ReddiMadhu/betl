import type { TechnologyName } from './discoveryData';

/* ─────────────────────────────────────────────────────────
 * Migration Data — paths, keep-assets, and migration results
 *
 * Provides the data model for the migration selection,
 * loading, and results screens.
 * ───────────────────────────────────────────────────────── */

/* ── Migration paths ── */
export interface MigrationPath {
  id: string;
  source: TechnologyName;
  target: TechnologyName;
  type: 'bi' | 'etl';
  label: string;
}

export const MIGRATION_PATHS: MigrationPath[] = [
  { id: 'tab-pbi', source: 'Tableau', target: 'Power BI', type: 'bi', label: 'Tableau → Power BI' },
  { id: 'ts-pbi', source: 'ThoughtSpot', target: 'Power BI', type: 'bi', label: 'ThoughtSpot → Power BI' },
  { id: 'ms-tab', source: 'MicroStrategy', target: 'Tableau', type: 'bi', label: 'MicroStrategy → Tableau' },
  { id: 'alt-py', source: 'Alteryx', target: 'Python', type: 'etl', label: 'Alteryx → Python' },
];

/* ── Migration asset ── */
export interface MigrationAsset {
  id: string;
  name: string;
  technology: TechnologyName;
  targetTechnology: TechnologyName | null; // null = already on target, no migration
  businessArea: string;
  type: 'bi' | 'etl';
  complexity: 'Low' | 'Medium' | 'High';
  estimatedHours: number;
  kpiCount?: number;
  description: string;
}

/* ── Keep assets that need migration ── */
export const migrationAssets: MigrationAsset[] = [
  /* ── BI Keep — Tableau → Power BI ── */
  {
    id: 'ma1',
    name: 'agent_performance',
    technology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Distribution',
    type: 'bi',
    complexity: 'Medium',
    estimatedHours: 24,
    kpiCount: 8,
    description: 'Primary agent/broker tracking with interactive filtering. Distribution team\'s core operational dashboard.',
  },
  {
    id: 'ma2',
    name: 'reserve_adequacy_dashboard',
    technology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Actuarial',
    type: 'bi',
    complexity: 'High',
    estimatedHours: 40,
    kpiCount: 8,
    description: 'IBNR reserve monitoring with specialized triangle visualizations. Critical actuarial tool.',
  },

  /* ── BI Keep — ThoughtSpot → Power BI ── */
  {
    id: 'ma3',
    name: 'customer_360_view',
    technology: 'ThoughtSpot',
    targetTechnology: 'Power BI',
    businessArea: 'Customer',
    type: 'bi',
    complexity: 'High',
    estimatedHours: 36,
    kpiCount: 10,
    description: 'Unified customer profile combining policy, claims, billing, and interaction data.',
  },
  {
    id: 'ma4',
    name: 'loss_triangle_workbook',
    technology: 'ThoughtSpot',
    targetTechnology: 'Power BI',
    businessArea: 'Actuarial',
    type: 'bi',
    complexity: 'High',
    estimatedHours: 32,
    kpiCount: 6,
    description: 'Interactive loss development analysis with AI search capabilities for actuarial modeling.',
  },

  /* ── BI Keep — already on Power BI (no migration) ── */
  {
    id: 'ma5',
    name: 'financial_overview',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Finance',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 14,
    description: 'CFO-level dashboard. Already on Power BI — no migration required.',
  },
  {
    id: 'ma6',
    name: 'policy_lifecycle_dashboard',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Policy Administration',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 11,
    description: 'End-to-end policy visibility. Already on Power BI — no migration required.',
  },
  {
    id: 'ma7',
    name: 'underwriting_pipeline',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Underwriting',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 5,
    description: 'Active pipeline management dashboard. Already on Power BI — no migration required.',
  },
  {
    id: 'ma8',
    name: 'channel_analytics',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Distribution',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 6,
    description: 'Comprehensive channel performance dashboard. Already on Power BI — no migration required.',
  },

  /* ── ETL Keep — Alteryx → Python ── */
  {
    id: 'ma9',
    name: 'Claims_Extract_Volume',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Claims',
    type: 'etl',
    complexity: 'High',
    estimatedHours: 48,
    description: 'Core claims data extraction and transformation pipeline. Feeds multiple BI dashboards.',
  },
  {
    id: 'ma10',
    name: 'Customer_Thursday_Metrics',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Customer',
    type: 'etl',
    complexity: 'Medium',
    estimatedHours: 32,
    description: 'Customer demographics consolidation from CRM, policy core, and billing systems.',
  },
  {
    id: 'ma11',
    name: 'Finance_ETL',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Finance',
    type: 'etl',
    complexity: 'Medium',
    estimatedHours: 28,
    description: 'Premium and loss data aggregation for financial reporting and regulatory compliance.',
  },
  {
    id: 'ma12',
    name: 'Underwriting_Workflow',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Underwriting',
    type: 'etl',
    complexity: 'High',
    estimatedHours: 44,
    description: 'Rating bureau data extraction and risk scoring transformation for underwriting.',
  },
];

/* ── Migration result (post-migration) ── */
export interface MigrationResult {
  id: string;
  assetName: string;
  sourceTechnology: TechnologyName;
  targetTechnology: TechnologyName;
  businessArea: string;
  type: 'bi' | 'etl';
  status: 'Migrated' | 'Validated' | 'Optimized';
  complexity: 'Low' | 'Medium' | 'High';
  estimatedHours: number;
  migrationNotes: string;
}

export const migrationResults: MigrationResult[] = [
  /* Tableau → Power BI */
  {
    id: 'mr1',
    assetName: 'agent_performance',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Distribution',
    type: 'bi',
    status: 'Validated',
    complexity: 'Medium',
    estimatedHours: 24,
    migrationNotes: '8 KPIs converted. Interactive filters rebuilt as Power BI slicers. All calculated fields validated against source.',
  },
  {
    id: 'mr2',
    assetName: 'reserve_adequacy_dashboard',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Actuarial',
    type: 'bi',
    status: 'Migrated',
    complexity: 'High',
    estimatedHours: 40,
    migrationNotes: 'Triangle visualizations rebuilt as custom Power BI visuals. IBNR reserve calculations preserved via DAX measures.',
  },

  /* ThoughtSpot → Power BI */
  {
    id: 'mr3',
    assetName: 'customer_360_view',
    sourceTechnology: 'ThoughtSpot',
    targetTechnology: 'Power BI',
    businessArea: 'Customer',
    type: 'bi',
    status: 'Validated',
    complexity: 'High',
    estimatedHours: 36,
    migrationNotes: '10 KPIs migrated. AI search capabilities replaced with Power BI Q&A natural language queries. Data model preserved.',
  },
  {
    id: 'mr4',
    assetName: 'loss_triangle_workbook',
    sourceTechnology: 'ThoughtSpot',
    targetTechnology: 'Power BI',
    businessArea: 'Actuarial',
    type: 'bi',
    status: 'Optimized',
    complexity: 'High',
    estimatedHours: 32,
    migrationNotes: 'Loss development analysis rebuilt with Power BI paginated reports. AI search replaced by Copilot integration.',
  },

  /* Alteryx → Python */
  {
    id: 'mr5',
    assetName: 'Claims_Extract_Volume',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Claims',
    type: 'etl',
    status: 'Validated',
    complexity: 'High',
    estimatedHours: 48,
    migrationNotes: 'Alteryx workflow transpiled to Python (pandas + SQLAlchemy). 12 transformation steps preserved. Unit tests generated for each step.',
  },
  {
    id: 'mr6',
    assetName: 'Customer_Thursday_Metrics',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Customer',
    type: 'etl',
    status: 'Migrated',
    complexity: 'Medium',
    estimatedHours: 32,
    migrationNotes: 'CRM and billing connectors rebuilt as Python API clients. Data deduplication logic preserved with fuzzy matching.',
  },
  {
    id: 'mr7',
    assetName: 'Finance_ETL',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Finance',
    type: 'etl',
    status: 'Validated',
    complexity: 'Medium',
    estimatedHours: 28,
    migrationNotes: 'Premium aggregation and loss data pipelines converted. Regulatory compliance checks automated via pytest assertions.',
  },
  {
    id: 'mr8',
    assetName: 'Underwriting_Workflow',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Underwriting',
    type: 'etl',
    status: 'Optimized',
    complexity: 'High',
    estimatedHours: 44,
    migrationNotes: 'Rating bureau extraction and risk scoring rebuilt in Python. Performance improved 3× with vectorized pandas operations.',
  },
];

/* ── Summary metrics for results page ── */
export interface MigrationSummaryMetric {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  highlight?: boolean;
}

export function getMigrationSummaryMetrics(): MigrationSummaryMetric[] {
  const biMigrations = migrationResults.filter((r) => r.type === 'bi').length;
  const etlMigrations = migrationResults.filter((r) => r.type === 'etl').length;
  const validated = migrationResults.filter((r) => r.status === 'Validated').length;

  return [
    { id: 'total', label: 'Assets Migrated', value: migrationResults.length, highlight: true },
    { id: 'bi', label: 'BI Migrations', value: biMigrations },
    { id: 'etl', label: 'ETL Migrations', value: etlMigrations },
    { id: 'validated', label: 'Validated', value: validated },
  ];
}

/* ── Get assets needing migration (exclude already-on-target) ── */
export function getAssetsNeedingMigration(): MigrationAsset[] {
  return migrationAssets.filter((a) => a.targetTechnology !== null);
}

/* ── Get assets already on target platform ── */
export function getAssetsNoMigration(): MigrationAsset[] {
  return migrationAssets.filter((a) => a.targetTechnology === null);
}

/* ── Get assets grouped by migration path ── */
export function getAssetsByPath(pathId: string): MigrationAsset[] {
  const path = MIGRATION_PATHS.find((p) => p.id === pathId);
  if (!path) return [];
  return migrationAssets.filter(
    (a) => a.technology === path.source && a.targetTechnology === path.target,
  );
}

/* ── Get results grouped by migration path ── */
export function getResultsByPath(pathId: string): MigrationResult[] {
  const path = MIGRATION_PATHS.find((p) => p.id === pathId);
  if (!path) return [];
  return migrationResults.filter(
    (r) => r.sourceTechnology === path.source && r.targetTechnology === path.target,
  );
}
