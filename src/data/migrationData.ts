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
  { id: 'ms-pbi', source: 'MicroStrategy', target: 'Power BI', type: 'bi', label: 'MicroStrategy → Power BI' },
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

  /* ── BI Keep — MicroStrategy → Power BI / Tableau ── */
  {
    id: 'ma_mstr1',
    name: 'sales_performance_dossier',
    technology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    businessArea: 'Distribution',
    type: 'bi',
    complexity: 'High',
    estimatedHours: 42,
    kpiCount: 12,
    description: 'Executive sales performance dossier with multi-tiered quota and commission attributes.',
  },
  {
    id: 'ma_mstr2',
    name: 'underwriting_scorecard',
    technology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    businessArea: 'Underwriting',
    type: 'bi',
    complexity: 'Medium',
    estimatedHours: 28,
    kpiCount: 7,
    description: 'Underwriting hit-ratio scorecard with risk class metrics and submission volume indicators.',
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
    description: 'Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status and analysing claims by product type and aging-litigation risk.',
  },
  {
    id: 'ma10',
    name: 'Burritos_Distribution',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Customer',
    type: 'etl',
    complexity: 'Low',
    estimatedHours: 32,
    description: 'Processes operational data from an input excel file, filtering records to include only those where the date falls on a Thursday. It then aggregates the data by calculating the average number of burritos',
  },
  {
    id: 'ma11',
    name: 'Workflow_02',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Finance',
    type: 'etl',
    complexity: 'Medium',
    estimatedHours: 28,
    description: 'Calculates key dates such as Clm_Service_Date and Month_End_Date using predefined formulas and aggregates claim volumes by industry type',
  },
  {
    id: 'ma12',
    name: 'Workflow_03',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Underwriting',
    type: 'etl',
    complexity: 'High',
    estimatedHours: 44,
    description: 'Consolidates policy, claims and payment data from multiple sources. Categorises policies into premium groupd based on monthly premium accounts and calculates month-end dates for payments',
  },

  /* ── ETL Keep — Python Retained Pipelines ── */
  {
    id: 'ma13',
    name: 'claims_processing',
    technology: 'Python',
    targetTechnology: null, // Retained as golden standard
    businessArea: 'Actuarial',
    type: 'etl',
    complexity: 'High',
    estimatedHours: 0,
    description: 'Claim modeling data preparation pipeline. Retained on Python / PySpark stack.',
  },
  // {
  //   id: 'ma14',
  //   name: 'endorsement_processing',
  //   technology: 'Python',
  //   targetTechnology: null,
  //   businessArea: 'Policy Administration',
  //   type: 'etl',
  //   complexity: 'Medium',
  //   estimatedHours: 0,
  //   description: 'Policy endorsement automated processing script with database staging connectors.',
  // },
];

/* ── Calculation & Formula Conversion Model ── */
export interface CalculationConversion {
  id: string;
  assetName: string;
  sourceTechnology: TechnologyName;
  targetTechnology: TechnologyName;
  fieldName: string;
  fieldCategory: 'Measure' | 'Calculated Column' | 'LOD Expression' | 'Transformation Formula';
  sourceFormula: string;
  targetFormula: string;
  parityStatus: '100% Parity' | 'Validated' | 'Optimized';
  validationNotes: string;
}

export const calculationConversions: CalculationConversion[] = [
  {
    id: 'calc1',
    assetName: 'agent_performance',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    fieldName: 'Loss Ratio (Incurred)',
    fieldCategory: 'Measure',
    sourceFormula: 'SUM([Incurred Claims]) / SUM([Earned Premium])',
    targetFormula: 'DIVIDE(SUM(Claims[Incurred_Claims]), SUM(Policy[Earned_Premium]), 0)',
    parityStatus: '100% Parity',
    validationNotes: 'Zero division protected. Matches Tableau grand totals within 0.0001 tolerance.',
  },
  {
    id: 'calc2',
    assetName: 'agent_performance',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    fieldName: 'Agent Tier Status',
    fieldCategory: 'Calculated Column',
    sourceFormula: 'IF [Bind Rate] >= 0.75 THEN "Platinum" ELSEIF [Bind Rate] >= 0.50 THEN "Gold" ELSE "Standard" END',
    targetFormula: 'SWITCH(TRUE(), [Bind_Rate] >= 0.75, "Platinum", [Bind_Rate] >= 0.50, "Gold", "Standard")',
    parityStatus: '100% Parity',
    validationNotes: 'Rebuilt as dynamic DAX measure supporting interactive slicer context.',
  },
  {
    id: 'calc3',
    assetName: 'reserve_adequacy_dashboard',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    fieldName: 'Customer Lifetime Premium (LOD)',
    fieldCategory: 'LOD Expression',
    sourceFormula: '{ FIXED [Customer ID] : SUM([Total Premium]) }',
    targetFormula: 'CALCULATE(SUM(Policy[Total_Premium]), ALLEXCEPT(Customer, Customer[Customer_ID]))',
    parityStatus: '100% Parity',
    validationNotes: 'Tableau FIXED Level-of-Detail expression translated to ALLEXCEPT DAX filter modifier.',
  },
  {
    id: 'calc4',
    assetName: 'reserve_adequacy_dashboard',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    fieldName: 'IBNR Reserve Severity',
    fieldCategory: 'Measure',
    sourceFormula: 'AVG([Outstanding Reserve]) * [Inflation Factor]',
    targetFormula: 'AVERAGE(Claims[Outstanding_Reserve]) * SELECTEDVALUE(Parameters[Inflation_Factor], 1.04)',
    parityStatus: 'Validated',
    validationNotes: 'Parameter slider integrated with Power BI What-If parameter table.',
  },
  {
    id: 'calc5',
    assetName: 'claims_etl_workflow',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    fieldName: 'State Surcharge Rate',
    fieldCategory: 'Transformation Formula',
    sourceFormula: 'IF [State] IN ("NY", "NJ", "CA") THEN [Gross_Premium] * 1.035 ELSE [Gross_Premium] ENDIF',
    targetFormula: "np.where(df['State'].isin(['NY', 'NJ', 'CA']), df['Gross_Premium'] * 1.035, df['Gross_Premium'])",
    parityStatus: '100% Parity',
    validationNotes: 'Vectorized NumPy conditional replaces Alteryx conditional node with 12x throughput gain.',
  },
  {
    id: 'calc6',
    assetName: 'customer_data_integration',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    fieldName: 'Fuzzy Customer Match',
    fieldCategory: 'Transformation Formula',
    sourceFormula: 'FuzzyMatch([Cust_Name], [Policyholder], MatchThreshold=0.85)',
    targetFormula: "rapidfuzz.fuzz.token_sort_ratio(row['Cust_Name'], row['Policyholder']) >= 85",
    parityStatus: 'Optimized',
    validationNotes: 'Implemented using C++ accelerated RapidFuzz library with 100% deterministic score match.',
  },
  {
    id: 'calc7',
    assetName: 'sales_performance_dossier',
    sourceTechnology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    fieldName: 'Quota Attainment Ratio',
    fieldCategory: 'Measure',
    sourceFormula: 'Sum([Written Premium]) {~+, >[Region]} / Sum([Target Quota]) {~+}',
    targetFormula: 'DIVIDE(CALCULATE(SUM(Sales[Written_Premium]), ALLEXCEPT(Agent, Agent[Region])), SUM(Targets[Quota_Amount]), 0)',
    parityStatus: '100% Parity',
    validationNotes: 'MicroStrategy metric dimensional qualification translated to ALLEXCEPT dimensional context in DAX.',
  },
  {
    id: 'calc8',
    assetName: 'finance_consolidation_etl',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    fieldName: 'Quarterly Loss Development Factor',
    fieldCategory: 'Transformation Formula',
    sourceFormula: '([Incurred_Q2] - [Incurred_Q1]) / NULLIF([Earned_Q1], 0)',
    targetFormula: "(df['Incurred_Q2'] - df['Incurred_Q1']) / df['Earned_Q1'].replace(0, np.nan)",
    parityStatus: '100% Parity',
    validationNotes: 'Transpiled to pandas division with NaN handling matching Alteryx formula tool.',
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
  downloadFileName: string;
  downloadFileType: string;
  packageSnippet: string;
  calculationsCount: number;
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
    calculationsCount: 8,
    downloadFileName: 'agent_performance_model.bim',
    downloadFileType: 'Tabular Model BIM / JSON',
    packageSnippet: `// Power BI Model & DAX Measure Definitions
Table: Agent_Performance
Measure: Loss Ratio = DIVIDE(SUM(Claims[Incurred_Claims]), SUM(Policy[Earned_Premium]), 0)
Measure: Agent Tier = SWITCH(TRUE(), [Bind_Rate] >= 0.75, "Platinum", [Bind_Rate] >= 0.50, "Gold", "Standard")
Visual: ClusteredBarChart (Agent_ID, [Loss Ratio], [Written_Premium])`,
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
    calculationsCount: 8,
    downloadFileName: 'reserve_adequacy_visuals.json',
    downloadFileType: 'PBI Visual Specification / DAX',
    packageSnippet: `// IBNR Reserve Calculation Module
Table: Actuarial_Reserve
Measure: Customer Lifetime Premium = CALCULATE(SUM(Policy[Total_Premium]), ALLEXCEPT(Customer, Customer[Customer_ID]))
Measure: IBNR Severity = AVERAGE(Claims[Outstanding_Reserve]) * SELECTEDVALUE(Parameters[Inflation_Factor], 1.04)`,
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
    calculationsCount: 10,
    downloadFileName: 'customer_360_semantic_model.pbix.json',
    downloadFileType: 'Power BI Schema Definition',
    packageSnippet: `// Customer 360 Semantic Model
Relationships:
  Customer[Cust_ID] 1:* Policy[Cust_ID]
  Policy[Policy_ID] 1:* Claims[Policy_ID]
Measures:
  [Customer Lifetime Value] = CALCULATE(SUM(Policy[Premium]), ALLSELECTED(Policy))`,
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
    calculationsCount: 6,
    downloadFileName: 'loss_triangle_report.rdl',
    downloadFileType: 'Paginated Report RDL / Spec',
    packageSnippet: `// Loss Development Triangle Matrix
Matrix: Accident_Year x Development_Month
Cell Expression: Sum(LossFact[Incremental_Paid_Loss])
Cumulative Measure: CALCULATE(SUM(LossFact[Incremental_Paid_Loss]), FILTER(ALL(DevMonths), DevMonths[Month] <= MAX(DevMonths[Month])))`,
    migrationNotes: 'Loss development analysis rebuilt with Power BI paginated reports. AI search replaced by Copilot integration.',
  },

  /* MicroStrategy → Power BI */
  {
    id: 'mr_mstr1',
    assetName: 'sales_performance_dossier',
    sourceTechnology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    businessArea: 'Distribution',
    type: 'bi',
    status: 'Validated',
    complexity: 'High',
    estimatedHours: 42,
    calculationsCount: 12,
    downloadFileName: 'sales_performance_dossier.pbix.json',
    downloadFileType: 'Power BI Fabric Dataset / Schema',
    packageSnippet: `// MicroStrategy Dossier Conversion
Table: Sales_Performance
Measure: Quota Attainment Ratio = DIVIDE(CALCULATE(SUM(Sales[Written_Premium]), ALLEXCEPT(Agent, Agent[Region])), SUM(Targets[Quota_Amount]), 0)
Measure: Commission Tier = IF([Quota Attainment Ratio] >= 1.2, "Tier 1 Overachiever", "Standard")
Visual: DecompositionTree (Sales[Region] -> Sales[Agent] -> [Quota Attainment Ratio])`,
    migrationNotes: 'Multi-tiered sales attributes converted to DAX hierarchies. Dimensional metric qualifications rebuilt with ALLEXCEPT.',
  },
  {
    id: 'mr_mstr2',
    assetName: 'underwriting_scorecard',
    sourceTechnology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    businessArea: 'Underwriting',
    type: 'bi',
    status: 'Optimized',
    complexity: 'Medium',
    estimatedHours: 28,
    calculationsCount: 7,
    downloadFileName: 'underwriting_scorecard_report.pbix.json',
    downloadFileType: 'Power BI Interactive Scorecard',
    packageSnippet: `// Underwriting Hit-Ratio Metric
Table: Underwriting_Scorecard
Measure: Hit Ratio = DIVIDE(COUNTROWS(FILTER(Submissions, Submissions[Status] == "Bound")), COUNTROWS(Submissions), 0)
Measure: Risk Class Factor = SWITCH(SELECTEDVALUE(RiskTier[Code]), "A", 0.85, "B", 1.0, "C", 1.25, 1.0)`,
    migrationNotes: 'Scorecard grids and hit-ratio thresholds transpiled to Power BI KPI visual cards and conditional formatting rules.',
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
    calculationsCount: 12,
    downloadFileName: 'claims_etl_pipeline.py',
    downloadFileType: 'Python (Pandas + SQLAlchemy)',
    packageSnippet: `import pandas as pd
import numpy as np

def run_claims_etl(raw_claims_df, policy_dim_df):
    """Transpiled from Alteryx Workflow claims_etl_workflow.yxmd"""
    # Node 4: Filter active policies
    active = policy_dim_df[policy_dim_df['Status'] == 'Active']
    # Node 7: Join claims on Policy_ID
    merged = pd.merge(raw_claims_df, active, on='Policy_ID', how='inner')
    # Node 12: Formula - Surcharge
    merged['Surcharge_Rate'] = np.where(merged['State'].isin(['NY', 'NJ', 'CA']), merged['Gross_Premium'] * 1.035, merged['Gross_Premium'])
    return merged`,
    migrationNotes: 'Alteryx workflow transpiled to Python (pandas + SQLAlchemy). 12 transformation steps preserved. Unit tests generated for each step.',
  },
  {
    id: 'mr6',
    assetName: 'Burritos_Distribution',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Customer',
    type: 'etl',
    status: 'Migrated',
    complexity: 'Medium',
    estimatedHours: 32,
    calculationsCount: 7,
    downloadFileName: 'customer_dedup_service.py',
    downloadFileType: 'Python PySpark Script',
    packageSnippet: `from pyspark.sql import functions as F
from rapidfuzz import fuzz

def deduplicate_customers(crm_df, billing_df):
    """Transpiled from Alteryx Fuzzy Match Tool node"""
    joined = crm_df.crossJoin(billing_df)
    # Token sort ratio calculation
    score_udf = F.udf(lambda s1, s2: fuzz.token_sort_ratio(s1, s2) if s1 and s2 else 0)
    deduped = joined.withColumn('match_score', score_udf(F.col('crm_name'), F.col('billing_name')))
    return deduped.filter(F.col('match_score') >= 85)`,
    migrationNotes: 'CRM and billing connectors rebuilt as Python API clients. Data deduplication logic preserved with fuzzy matching.',
  },
  {
    id: 'mr7',
    assetName: 'Workflow_02',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Finance',
    type: 'etl',
    status: 'Validated',
    complexity: 'Medium',
    estimatedHours: 28,
    calculationsCount: 5,
    downloadFileName: 'finance_consolidation.py',
    downloadFileType: 'Python Script & PyTest',
    packageSnippet: `def calculate_loss_development(df):
    """Transpiled from Alteryx Formula Node: Quarterly Factor"""
    df['Loss_Dev_Factor'] = (df['Incurred_Q2'] - df['Incurred_Q1']) / df['Earned_Q1'].replace(0, np.nan)
    return df.dropna(subset=['Loss_Dev_Factor'])`,
    migrationNotes: 'Premium aggregation and loss data pipelines converted. Regulatory compliance checks automated via pytest assertions.',
  },
  {
    id: 'mr8',
    assetName: 'Workflow_04',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Underwriting',
    type: 'etl',
    status: 'Optimized',
    complexity: 'High',
    estimatedHours: 44,
    calculationsCount: 9,
    downloadFileName: 'underwriting_risk_model.py',
    downloadFileType: 'Python Vectorized Pipeline',
    packageSnippet: `def compute_risk_scores(bureau_records, policy_features):
    """Vectorized rating bureau scoring engine"""
    features = pd.merge(bureau_records, policy_features, on='Tax_ID')
    features['Risk_Score'] = (features['Credit_Tier'] * 0.4) + (features['Loss_Hist_Count'] * 0.6)
    return features`,
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

/* ── Visual Conversion & Shelf Mapping Model ── */
export interface VisualConversionItem {
  id: string;
  worksheetName: string;
  assetName: string;
  sourceTechnology: TechnologyName;
  targetTechnology: TechnologyName;
  chartType: string;
  status: '100% Parity' | 'Validated';
  sourceVisual: {
    type: string;
    rows: string[];
    columns: string[];
    color?: string;
    size?: string;
    filters: string[];
    metrics: string[];
    tooltips?: string[];
  };
  targetVisual: {
    markType: string;
    rowsShelf: string[];
    columnsShelf: string[];
    colorEncoding?: string;
    sizeEncoding?: string;
    slicers: string[];
    tooltipsShelf?: string[];
    xmlSpec: string;
  };
}

export const visualConversions: VisualConversionItem[] = [
  {
    id: 'viz1',
    worksheetName: 'Agent Loss Ratio & Quota Distribution',
    assetName: 'agent_performance',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    chartType: 'Clustered Bar Chart',
    status: '100% Parity',
    sourceVisual: {
      type: 'Horizontal Bar',
      rows: ['[Agent Name]', '[Agency Region]'],
      columns: ['SUM([Incurred Claims])', 'SUM([Earned Premium])'],
      color: '[Loss Ratio Category]',
      filters: ['[Policy Effective Year] = 2025', '[Line of Business] != "Commercial Auto"'],
      metrics: ['[Loss Ratio]', '[Written Premium]'],
      tooltips: ['[Agent Tier Status]', '[Agent Retention Rate]'],
    },
    targetVisual: {
      markType: 'pbi-clustered-bar',
      rowsShelf: ['Agent[Agent_Name]', 'Agent[Agency_Region]'],
      columnsShelf: ['[Loss_Ratio_Measure]', '[Earned_Premium_Measure]'],
      colorEncoding: 'Rules(Loss_Ratio < 0.60: #10B981, Loss_Ratio < 0.75: #F59E0B, Else: #EF4444)',
      slicers: ['Date[Calendar_Year]', 'Policy[Line_Of_Business]'],
      tooltipsShelf: ['[Agent_Tier_Status]', '[Agent_Retention_Rate]'],
      xmlSpec: `<visualContainer>
  <type>clusteredBarChart</type>
  <dataRoles>
    <category role="Category" queryRef="Agent.Agent_Name" />
    <series role="Y" queryRef="Measures.Loss_Ratio_Incurred" />
    <tooltip role="Tooltips" queryRef="Measures.Agent_Tier_Status" />
  </dataRoles>
  <formatRules dataPointColor="#3B82F6" highRiskAlert="#EF4444" />
</visualContainer>`,
    },
  },
  {
    id: 'viz2',
    worksheetName: 'IBNR Reserve Development Triangle',
    assetName: 'reserve_adequacy_dashboard',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    chartType: 'Matrix / Heat Map',
    status: '100% Parity',
    sourceVisual: {
      type: 'Square Heatmap',
      rows: ['[Accident Year]'],
      columns: ['[Development Month]'],
      color: 'SUM([Incremental Paid Loss])',
      size: 'COUNT([Claim Number])',
      filters: ['[Coverage Group] = "General Liability"'],
      metrics: ['[Cumulative Incurred Loss]', '[Loss Development Factor]'],
      tooltips: ['[Case Reserve Balance]', '[Claim Count Closed]'],
    },
    targetVisual: {
      markType: 'pbi-matrix-heatmap',
      rowsShelf: ['Claims[Accident_Year]'],
      columnsShelf: ['Claims[Development_Month]'],
      colorEncoding: 'ContinuousGradient(#E0E7FF -> #4F46E5, ZeroMidpoint=False)',
      sizeEncoding: '[Total_Claims_Count]',
      slicers: ['Policy[Coverage_Group]', 'Claims[Claim_Status]'],
      tooltipsShelf: ['[Case_Reserve_Balance]', '[Claims_Closed_Count]'],
      xmlSpec: `<matrixLayout version="2.0">
  <rows field="Claims.Accident_Year" />
  <columns field="Claims.Development_Month" />
  <values field="Measures.Incremental_Paid_Loss" format="$#,##0" />
  <conditionalFormatting property="backgroundColor" gradient="indigoPalette" />
</matrixLayout>`,
    },
  },
  {
    id: 'viz3',
    worksheetName: 'Customer 360 Lifetime Value Matrix',
    assetName: 'customer_360_view',
    sourceTechnology: 'ThoughtSpot',
    targetTechnology: 'Power BI',
    chartType: 'Scatter & Density Plot',
    status: '100% Parity',
    sourceVisual: {
      type: 'Bubble Plot',
      rows: ['[Tenure Years]'],
      columns: ['[Total Lifetime Premium]'],
      color: '[Customer Segment]',
      size: '[Active Policies Count]',
      filters: ['[Account Status] = "Active"'],
      metrics: ['[Customer LTV Score]', '[Retention Probability]'],
      tooltips: ['[Primary Agent]', '[Last Interaction Date]'],
    },
    targetVisual: {
      markType: 'pbi-scatter-chart',
      rowsShelf: ['Customer[Tenure_Years]'],
      columnsShelf: ['Customer[Total_Lifetime_Premium]'],
      colorEncoding: 'CategoricalPalette(Customer[Segment])',
      sizeEncoding: 'Customer[Active_Policies_Count]',
      slicers: ['Customer[Account_Status]', 'Customer[Region]'],
      tooltipsShelf: ['Customer[Primary_Agent]', 'Customer[Last_Interaction_Date]'],
      xmlSpec: `<scatterChart visualId="c360_scatter">
  <xAxis field="Customer.Total_Lifetime_Premium" displayUnits="Thousands" />
  <yAxis field="Customer.Tenure_Years" />
  <sizeField field="Customer.Active_Policies_Count" bubbleSizeRange="5-25px" />
  <legend field="Customer.Segment" />
</scatterChart>`,
    },
  },
  {
    id: 'viz4',
    worksheetName: 'Sales Quota & Commission Dossier Grid',
    assetName: 'sales_performance_dossier',
    sourceTechnology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    chartType: 'KPI Scorecard & Waterfall',
    status: 'Validated',
    sourceVisual: {
      type: 'MSTR Micro-Chart & Grid',
      rows: ['[Sales Territory]', '[District Manager]'],
      columns: ['[Fiscal Quarter]'],
      color: '[Attainment Tier]',
      filters: ['[Organization Unit] = "Commercial Lines"'],
      metrics: ['[Written Premium]', '[Quota Target]', '[Variance %]'],
      tooltips: ['[Bonus Multiplier]', '[Pipeline Weighted]'],
    },
    targetVisual: {
      markType: 'pbi-waterfall-card',
      rowsShelf: ['Sales[Territory]', 'Sales[District_Manager]'],
      columnsShelf: ['Date[Fiscal_Quarter]'],
      colorEncoding: 'Rule(Variance >= 0: #10B981, Variance < 0: #EF4444)',
      slicers: ['Organization[Unit_Name]', 'Date[Fiscal_Year]'],
      tooltipsShelf: ['Sales[Bonus_Multiplier]', 'Sales[Pipeline_Weighted]'],
      xmlSpec: `<waterfallVisual id="sales_quota_waterfall">
  <category field="Date.Fiscal_Quarter" />
  <breakdown field="Sales.Territory" />
  <yAxis field="Measures.Quota_Variance_Amount" />
  <sentimentColors positive="#10B981" negative="#EF4444" total="#3B82F6" />
</waterfallVisual>`,
    },
  },
];

/* ── Export Center Artifact Model ── */
export interface ExportArtifactItem {
  id: string;
  fileName: string;
  targetTechnology: TechnologyName;
  category: 'Semantic Model' | 'Packaged Workbook' | 'ETL Pipeline' | 'Audit Report' | 'Certification';
  fileSize: string;
  environment: 'Production' | 'Staging';
  description: string;
  sha256: string;
  codeSnippet: string;
}

export const exportArtifacts: ExportArtifactItem[] = [
  {
    id: 'art1',
    fileName: 'agent_performance_model.bim',
    targetTechnology: 'Power BI',
    category: 'Semantic Model',
    fileSize: '2.4 MB',
    environment: 'Production',
    description: 'Complete Tabular Model BIM with automated DAX measures, table relationships, and Direct Lake partitions.',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    codeSnippet: `{
  "name": "Agent_Performance_Semantic_Model",
  "compatibilityLevel": 1600,
  "model": {
    "culture": "en-US",
    "dataAccessOptions": { "legacyRedirects": true },
    "tables": [
      {
        "name": "Claims",
        "measures": [
          { "name": "Loss Ratio", "expression": "DIVIDE(SUM(Claims[Incurred_Claims]), SUM(Policy[Earned_Premium]), 0)" }
        ]
      }
    ]
  }
}`,
  },
  {
    id: 'art2',
    fileName: 'reserve_adequacy_cloud.twbx',
    targetTechnology: 'Tableau',
    category: 'Packaged Workbook',
    fileSize: '4.1 MB',
    environment: 'Production',
    description: 'Production Tableau Packaged Workbook with extracted Hyper schemas, Level-of-Detail calcs, and mobile layout.',
    sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    codeSnippet: `<?xml version='1.0' encoding='utf-8' ?>
<workbook source-build='2025.1.0' version='18.1' xmlns:user='http://www.tableausoftware.com/xml/user'>
  <datasources>
    <datasource caption='Actuarial Reserve Hyper' inline='true' name='hyper.actuarial'>
      <connection class='hyper' filename='Data/Extracts/reserve_adequacy.hyper' />
    </datasource>
  </datasources>
</workbook>`,
  },
  {
    id: 'art3',
    fileName: 'claims_etl_pipeline.py',
    targetTechnology: 'Python',
    category: 'ETL Pipeline',
    fileSize: '142 KB',
    environment: 'Production',
    description: 'Vectorized PySpark and Pandas ETL execution script with Apache Airflow DAG scheduling hooks.',
    sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
    codeSnippet: `from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime, timedelta
import pandas as pd
import numpy as np

def run_claims_vectorized_etl():
    df = pd.read_parquet('s3://lakehouse/claims/raw/')
    df['Loss_Dev_Factor'] = (df['Incurred_Q2'] - df['Incurred_Q1']) / df['Earned_Q1'].replace(0, np.nan)
    df.to_parquet('s3://lakehouse/claims/curated/', partition_cols=['Accident_Year'])`,
  },
  {
    id: 'art4',
    fileName: 'enterprise_migration_audit_report.xlsx',
    targetTechnology: 'Power BI',
    category: 'Audit Report',
    fileSize: '1.8 MB',
    environment: 'Production',
    description: 'Comprehensive multi-tab Excel Data Dictionary with formula cross-reference, AST validation proofs, and KPI parity signs.',
    sha256: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
    codeSnippet: `[Workbook: Enterprise_Migration_Audit_Report.xlsx]
Tabs:
 1. Executive Summary & Parity Metrics (100% Validated)
 2. Calculation Translation Dictionary (Source vs DAX)
 3. Visual Shelf Mapping Specifications
 4. Performance Benchmarks (3.8x Throughput Acceleration)`,
  },
  {
    id: 'art5',
    fileName: 'transpilation_parity_certificate.json',
    targetTechnology: 'Python',
    category: 'Certification',
    fileSize: '45 KB',
    environment: 'Production',
    description: 'Cryptographic SHA-256 automated regression test sign-off and AST semantic equivalence certification.',
    sha256: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    codeSnippet: `{
  "certificateId": "CERT-2026-SYM-9082",
  "validationEngine": "Universal AST Modernization Compiler v4.2",
  "summary": {
    "totalMeasuresTested": 48,
    "parityScore": "100.0%",
    "zeroDivisionGuarded": true,
    "astEquivalenceProof": "PASSED"
  }
}`,
  },
];

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

/* ── Get all retained BI assets (Tableau, Power BI, MicroStrategy, etc.) ── */
export function getRetainedBIAssets(): MigrationAsset[] {
  return migrationAssets.filter((a) => a.type === 'bi');
}

/* ── Get all retained ETL assets (Alteryx, Python) ── */
export function getRetainedETLAssets(): MigrationAsset[] {
  return migrationAssets.filter((a) => a.type === 'etl');
}

