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
  /* ── BI Keep — Tableau → Power BI (8 assets) ── */
  {
    id: 'ma_tab_ins',
    name: 'Sales Insurance.twbx',
    technology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Distribution',
    type: 'bi',
    complexity: 'Medium',
    estimatedHours: 24,
    kpiCount: 9,
    description: 'Insurance distribution sales performance workbook (Sales Insurance.twbx) tracking new sales placed, account executive achievement, and renewal pipelines. Migrates to Power BI against the Insurance_Model semantic layer.',
  },
  {
    id: 'ma1',
    name: 'Claims - Agent Performance',
    technology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Distribution',
    type: 'bi',
    complexity: 'Medium',
    estimatedHours: 24,
    kpiCount: 8,
    description: 'Primary claims resolution and adjuster throughput dashboard with interactive filters.',
  },
  {
    id: 'ma2',
    name: 'Claims - Executive Summary',
    technology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Claims',
    type: 'bi',
    complexity: 'High',
    estimatedHours: 36,
    kpiCount: 8,
    description: 'Executive claims overview with paid loss severity and reserve adequacy projections.',
  },
  {
    id: 'ma3',
    name: 'Claims - State Performance',
    technology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Claims',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 16,
    kpiCount: 6,
    description: 'Geographic distribution and regional claims settlement metrics.',
  },
  {
    id: 'ma9',
    name: 'Beneficiary Services v1',
    technology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Customer',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 16,
    kpiCount: 6,
    description: 'Beneficiary service levels, claimant satisfaction, and settlement timeliness.',
  },
  {
    id: 'ma10',
    name: 'Beneficiary Services Aging Dashboard',
    technology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Customer',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 16,
    kpiCount: 6,
    description: 'Aging analysis of unresolved beneficiary inquiries and open claim files.',
  },

  /* ── BI Keep — MicroStrategy → Power BI (1 asset) ── */
  {
    id: 'ma_mstr1',
    name: 'P&C Claims Dashboard v3',
    technology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    businessArea: 'Claims',
    type: 'bi',
    complexity: 'High',
    estimatedHours: 48,
    kpiCount: 18,
    description: 'Multi-chapter property and casualty dossier with loss reserve projections and dimensional metrics.',
  },

  /* ── BI Keep — already on Power BI (5 assets, no migration required) ── */
  {
    id: 'ma_pbi1',
    name: 'Loss Ratio',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Claims',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 8,
    description: 'Golden claims & underwriting loss ratio dashboard consolidating lower quartile agent production and survival rate trends. Already on Power BI.',
  },
  {
    id: 'ma_pbi3',
    name: 'Revenue Opportunities',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Distribution',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 6,
    description: 'Pipeline revenue forecasts and premium growth analysis. Already on Power BI.',
  },
  {
    id: 'ma_pbi4',
    name: 'Sales & Returns Sample v3',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Finance',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 10,
    description: 'Financial reconciliation of premium billing. Already on Power BI.',
  },
  {
    id: 'ma_pbi7',
    name: 'Jornaya Dashboard PBI',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Distribution',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 6,
    description: 'Customer journey compliance and consumer intent analysis. Already on Power BI.',
  },
  {
    id: 'ma_pbi8',
    name: 'Bottom 25% Agents',
    technology: 'Power BI',
    targetTechnology: null,
    businessArea: 'Distribution',
    type: 'bi',
    complexity: 'Low',
    estimatedHours: 0,
    kpiCount: 6,
    description: 'Agent production review identifying lower quartile broker support needs. Already on Power BI.',
  },

  /* ── ETL Keep — Alteryx → Python (4 retained workflows) ── */
  {
    id: 'ma_etl1',
    name: 'Claims_Extract_Volume',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Claims',
    type: 'etl',
    complexity: 'High',
    estimatedHours: 48,
    description: 'Extracts and enriches claims data from multiple excel sources, summarising claim volume by quarter and status.',
  },
  {
    id: 'ma_etl2',
    name: 'Workflow_08',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Distribution',
    type: 'etl',
    complexity: 'Low',
    estimatedHours: 32,
    description: 'Processes operational distribution data with date filtering and volume aggregations.',
  },
  {
    id: 'ma_etl3',
    name: 'Workflow_02',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Claims',
    type: 'etl',
    complexity: 'Medium',
    estimatedHours: 28,
    description: 'Calculates key dates and aggregates claim volumes by industry type.',
  },
  {
    id: 'ma_etl4',
    name: 'Workflow_03',
    technology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Claims',
    type: 'etl',
    complexity: 'High',
    estimatedHours: 44,
    description: 'Consolidates policy, claims and payment data from multiple sources. Serves as consolidated claims ETL pipeline.',
  },

  /* ── ETL Keep — Python Retained Pipelines (1 asset) ── */
  {
    id: 'ma_etl8',
    name: 'claims_processing',
    technology: 'Python',
    targetTechnology: null,
    businessArea: 'Claims',
    type: 'etl',
    complexity: 'High',
    estimatedHours: 0,
    description: 'Claim modeling data preparation pipeline. Retained on Python / PySpark stack.',
  },
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
    assetName: 'Claims - Agent Performance',
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
    assetName: 'Claims - Agent Performance',
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
    assetName: 'Claims - Executive Summary',
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
    assetName: 'INSURANCE ANALYTICS DASHBOARD',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    fieldName: 'Cross Sell Conversion Rate',
    fieldCategory: 'Measure',
    sourceFormula: 'COUNTD([Closed Opportunities]) / COUNTD([Total Leads])',
    targetFormula: 'DIVIDE(DISTINCTCOUNT(Opportunities[Opportunity_ID]), DISTINCTCOUNT(Leads[Lead_ID]), 0)',
    parityStatus: 'Validated',
    validationNotes: 'Cross sell conversion rate formula translated to Power BI DAX DIVIDE measure.',
  },
  {
    id: 'calc5',
    assetName: 'Claims_Extract_Volume',
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
    assetName: 'Workflow_08',
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
    assetName: 'P&C Claims Dashboard v3',
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
    assetName: 'Workflow_02',
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
    assetName: 'Claims - Agent Performance',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Claims',
    type: 'bi',
    status: 'Validated',
    complexity: 'Medium',
    estimatedHours: 24,
    calculationsCount: 8,
    downloadFileName: 'claims_agent_performance_model.bim',
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
    assetName: 'Claims - Executive Summary',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Claims',
    type: 'bi',
    status: 'Migrated',
    complexity: 'High',
    estimatedHours: 36,
    calculationsCount: 8,
    downloadFileName: 'claims_executive_summary_visuals.json',
    downloadFileType: 'PBI Visual Specification / DAX',
    packageSnippet: `// IBNR Reserve Calculation Module
Table: Actuarial_Reserve
Measure: Customer Lifetime Premium = CALCULATE(SUM(Policy[Total_Premium]), ALLEXCEPT(Customer, Customer[Customer_ID]))
Measure: IBNR Severity = AVERAGE(Claims[Outstanding_Reserve]) * SELECTEDVALUE(Parameters[Inflation_Factor], 1.04)`,
    migrationNotes: 'Executive summary loss visualizations rebuilt as custom Power BI visuals. IBNR reserve calculations preserved via DAX measures.',
  },
  {
    id: 'mr3',
    assetName: 'INSURANCE ANALYTICS DASHBOARD',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    businessArea: 'Distribution',
    type: 'bi',
    status: 'Validated',
    complexity: 'High',
    estimatedHours: 32,
    calculationsCount: 9,
    downloadFileName: 'insurance_analytics_distribution_model.pbix.json',
    downloadFileType: 'Power BI Schema Definition',
    packageSnippet: `// Insurance Analytics Semantic Model
Relationships:
  AccountExecutive[AE_ID] 1:* Opportunities[AE_ID]
  Product[Product_ID] 1:* Opportunities[Product_ID]
Measures:
  [Cross Sell Performance] = CALCULATE(SUM(Opportunities[Revenue]), Opportunities[Stage] = "Closed Won")`,
    migrationNotes: '9 KPIs migrated. Account executive hierarchies, opportunity pipelines, and multi-line insurance analytics preserved.',
  },
  {
    id: 'mr4',
    assetName: 'P&C Claims Dashboard v3',
    sourceTechnology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    businessArea: 'Claims',
    type: 'bi',
    status: 'Validated',
    complexity: 'High',
    estimatedHours: 48,
    calculationsCount: 11,
    downloadFileName: 'pc_claims_dossier.pbix.json',
    downloadFileType: 'Power BI Fabric Dataset / Schema',
    packageSnippet: `// MicroStrategy Dossier Conversion
Table: PC_Claims
Measure: Quota Attainment Ratio = DIVIDE(CALCULATE(SUM(Sales[Written_Premium]), ALLEXCEPT(Agent, Agent[Region])), SUM(Targets[Quota_Amount]), 0)
Measure: Loss Severity Tier = IF([Loss Severity] >= 50000, "High Severity", "Standard")
Visual: DecompositionTree (Claims[Coverage] -> Claims[State] -> [Loss Severity])`,
    migrationNotes: 'Multi-chapter property and casualty dossier converted to DAX hierarchies. Dimensional metric qualifications rebuilt with ALLEXCEPT.',
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
    """Transpiled from Alteryx Workflow Claims_Extract_Volume.yxmd"""
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
    assetName: 'Workflow_08',
    sourceTechnology: 'Alteryx',
    targetTechnology: 'Python',
    businessArea: 'Customer',
    type: 'etl',
    status: 'Migrated',
    complexity: 'Medium',
    estimatedHours: 32,
    calculationsCount: 7,
    downloadFileName: 'distribution_service.py',
    downloadFileType: 'Python PySpark Script',
    packageSnippet: `from pyspark.sql import functions as F
from rapidfuzz import fuzz

def process_distribution(sales_df, branch_df):
    """Transpiled from Alteryx Distribution Workflow"""
    joined = sales_df.join(branch_df, 'Branch_ID')
    return joined.filter(F.dayofweek(F.col('Date')) == 5)`,
    migrationNotes: 'Distribution pipeline converted to Python with automated data transformation assertions.',
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
    estimatedHours: 42,
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
    worksheetName: 'Adjuster Loss Ratio & SLA Distribution',
    assetName: 'Claims - Agent Performance',
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
    worksheetName: 'Executive Loss & Reserve Summary Triangle',
    assetName: 'Claims - Executive Summary',
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
    worksheetName: 'Distribution Revenue & Opportunity Breakdown',
    assetName: 'INSURANCE ANALYTICS DASHBOARD',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    chartType: 'Clustered Bar & Line Combo',
    status: '100% Parity',
    sourceVisual: {
      type: 'Combo Chart',
      rows: ['[Account Executive]'],
      columns: ['[Open Pipeline Revenue]'],
      color: '[Stage Name]',
      size: '[Opportunity Count]',
      filters: ['[Sales Stage] != "Closed Lost"'],
      metrics: ['[Pipeline Revenue]', '[Win Rate %]'],
      tooltips: ['[Account Executive]', '[Primary Product]'],
    },
    targetVisual: {
      markType: 'pbi-combo-chart',
      rowsShelf: ['AccountExecutive[AE_Name]'],
      columnsShelf: ['Measures[Open_Pipeline_Revenue]'],
      colorEncoding: 'Rules(Stage = "Closed Won": #10B981, Stage = "Negotiation": #3B82F6, Else: #6B7280)',
      slicers: ['Product[Line_Of_Business]', 'Date[Fiscal_Year]'],
      tooltipsShelf: ['[AccountExecutive_Name]', '[Product_Line]'],
      xmlSpec: `<visualContainer>
  <type>lineAndClusteredColumnChart</type>
  <dataRoles>
    <category role="Category" queryRef="AccountExecutive.AE_Name" />
    <series role="Y" queryRef="Measures.Open_Pipeline_Revenue" />
  </dataRoles>
</visualContainer>`,
    },
  },
  {
    id: 'viz4',
    worksheetName: 'P&C Loss Reserve & Severity Waterfall',
    assetName: 'P&C Claims Dashboard v3',
    sourceTechnology: 'MicroStrategy',
    targetTechnology: 'Power BI',
    chartType: 'KPI Scorecard & Waterfall',
    status: 'Validated',
    sourceVisual: {
      type: 'MSTR Micro-Chart & Grid',
      rows: ['[Coverage Line]', '[Loss Tier]'],
      columns: ['[Accident Quarter]'],
      color: '[Settlement Status]',
      filters: ['[Business Unit] = "Commercial Property"'],
      metrics: ['[Paid Loss]', '[Outstanding Reserve]', '[Variance %]'],
      tooltips: ['[Litigation Flag]', '[Severity Index]'],
    },
    targetVisual: {
      markType: 'pbi-waterfall-card',
      rowsShelf: ['Claims[Coverage_Line]', 'Claims[Loss_Tier]'],
      columnsShelf: ['Date[Accident_Quarter]'],
      colorEncoding: 'Rule(Variance >= 0: #10B981, Variance < 0: #EF4444)',
      slicers: ['Organization[Business_Unit]', 'Date[Calendar_Year]'],
      tooltipsShelf: ['Claims[Litigation_Flag]', 'Claims[Severity_Index]'],
      xmlSpec: `<waterfallVisual id="pc_claims_waterfall">
  <category field="Date.Accident_Quarter" />
  <breakdown field="Claims.Coverage_Line" />
  <yAxis field="Measures.Reserve_Variance_Amount" />
  <sentimentColors positive="#10B981" negative="#EF4444" total="#3B82F6" />
</waterfallVisual>`,
    },
  },
  {
    id: 'viz5',
    worksheetName: 'Earned Premium & Incurred Trend',
    assetName: 'Policy Underwriting Risk Model',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    chartType: 'Line & Clustered Column',
    status: '100% Parity',
    sourceVisual: {
      type: 'Dual Axis Combo',
      rows: ['[Calendar Year Month]'],
      columns: ['SUM([Earned Premium])', 'SUM([Incurred Loss])', '[Loss Ratio %]'],
      color: 'Measure Names',
      filters: ['[Policy Status] = "Active"'],
      metrics: ['[Earned Premium]', '[Incurred Loss]', '[Loss Ratio %]'],
      tooltips: ['[Retention Rate]', '[Audit Variance]'],
    },
    targetVisual: {
      markType: 'pbi-line-column-combo',
      rowsShelf: ['Date[YearMonth]'],
      columnsShelf: ['[Earned_Premium_USD]', '[Incurred_Loss_USD]'],
      colorEncoding: 'Rules(Primary: #3B82F6, Secondary: #EF4444, Line: #10B981)',
      slicers: ['Policy[Status]', 'Geography[State]'],
      tooltipsShelf: ['[Retention_Rate_Measure]', '[Audit_Variance_Measure]'],
      xmlSpec: `<lineAndStackedColumnCombo id="underwriting_combo">
  <category field="Date.YearMonth" />
  <columnValues field="Measures.Earned_Premium_USD" />
  <columnValues field="Measures.Incurred_Loss_USD" />
  <lineValues field="Measures.Loss_Ratio_Percent" />
</lineAndStackedColumnCombo>`,
    },
  },
  {
    id: 'viz6',
    worksheetName: 'Catastrophe Exposure & Flood Zone Risk',
    assetName: 'Catastrophe Loss Model',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    chartType: 'Shape Map / Choropleth',
    status: '100% Parity',
    sourceVisual: {
      type: 'Filled Map',
      rows: ['[State FIPS]', '[County Name]'],
      columns: ['SUM([Total Insured Value])'],
      color: '[Flood Risk Zone Score]',
      filters: ['[PML Category] IN ("Zone A", "Zone V")'],
      metrics: ['[TIV Exposure]', '[Probable Maximum Loss]'],
      tooltips: ['[Policy Count]', '[Building Deductible]'],
    },
    targetVisual: {
      markType: 'pbi-shape-map',
      rowsShelf: ['Geography[County_Name]', 'Geography[State_FIPS]'],
      columnsShelf: ['[TIV_Total_Measure]'],
      colorEncoding: 'ContinuousDiverging(#10B981 -> #F59E0B -> #EF4444)',
      slicers: ['Risk[PML_Zone]', 'Date[Effective_Year]'],
      tooltipsShelf: ['[Policy_Count_Measure]', '[Avg_Deductible_Measure]'],
      xmlSpec: `<shapeMapVisual id="cat_exposure_map">
  <location field="Geography.County_FIPS" />
  <colorSaturation field="Measures.PML_Ratio" />
  <projection type="albersUsa" />
</shapeMapVisual>`,
    },
  },
  {
    id: 'viz7',
    worksheetName: 'Subrogation & Fraud Recovery Pipeline',
    assetName: 'SIU Investigative Analytics',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    chartType: 'Funnel / Process Stage Flow',
    status: '100% Parity',
    sourceVisual: {
      type: 'Funnel Chart',
      rows: ['[SIU Stage Name]'],
      columns: ['COUNTD([Investigation ID])', 'SUM([Potential Recovery USD])'],
      color: '[Stage Tier]',
      filters: ['[Investigation Disposition] != "Closed - No Action"'],
      metrics: ['[Recovery Rate]', '[Days in Investigation]'],
      tooltips: ['[Lead Investigator]', '[Prosecution Flag]'],
    },
    targetVisual: {
      markType: 'pbi-funnel-chart',
      rowsShelf: ['Investigation[Stage_Name]'],
      columnsShelf: ['[Investigation_Count]', '[Potential_Recovery_USD]'],
      colorEncoding: 'CategoricalThemePalette(NavyToCyan)',
      slicers: ['Disposition[Category]', 'Investigator[Unit]'],
      tooltipsShelf: ['[Avg_Investigation_Days]', '[Prosecution_Flag]'],
      xmlSpec: `<funnelVisual id="siu_recovery_funnel">
  <category field="Investigation.Stage_Name" />
  <values field="Measures.Investigation_Count" />
  <tooltips field="Measures.Recovery_Rate" />
</funnelVisual>`,
    },
  },
  {
    id: 'viz8',
    worksheetName: 'Litigation Expense & Counsel Severity',
    assetName: 'Legal & Bodily Injury Claims',
    sourceTechnology: 'Tableau',
    targetTechnology: 'Power BI',
    chartType: 'Treemap & Hierarchical Decomposition',
    status: '100% Parity',
    sourceVisual: {
      type: 'Treemap',
      rows: ['[Defense Firm Name]', '[Jurisdiction State]'],
      columns: ['SUM([Legal Expense Incurred])'],
      color: '[Expense Variance Benchmark %]',
      filters: ['[Claim Severity Band] IN ("Tier 3", "Tier 4 - Catastrophic")'],
      metrics: ['[Avg Defense Cost Per Day]', '[Settlement Success Rate]'],
      tooltips: ['[Trial Rate %]', '[Judge Rating]'],
    },
    targetVisual: {
      markType: 'pbi-treemap-card',
      rowsShelf: ['Counsel[Defense_Firm]', 'Court[Jurisdiction_State]'],
      columnsShelf: ['[Legal_Expense_Total]'],
      colorEncoding: 'DivergingGradient(#3B82F6 -> #F59E0B -> #EF4444, Midpoint=0)',
      slicers: ['Claims[Severity_Tier]', 'Date[Filing_Year]'],
      tooltipsShelf: ['[Settlement_Success_Measure]', '[Trial_Rate_Measure]'],
      xmlSpec: `<treemapVisual id="legal_severity_treemap">
  <group field="Counsel.Defense_Firm" />
  <details field="Court.Jurisdiction_State" />
  <values field="Measures.Legal_Expense_Total" />
</treemapVisual>`,
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
    fileName: 'claims_agent_performance_model.bim',
    targetTechnology: 'Power BI',
    category: 'Semantic Model',
    fileSize: '2.4 MB',
    environment: 'Production',
    description: 'Complete Tabular Model BIM with automated DAX measures, table relationships, and Direct Lake partitions.',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    codeSnippet: `{
  "name": "Claims_Agent_Performance_Model",
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
    fileName: 'claims_executive_summary_cloud.twbx',
    targetTechnology: 'Tableau',
    category: 'Packaged Workbook',
    fileSize: '4.1 MB',
    environment: 'Production',
    description: 'Production Tableau Packaged Workbook with extracted Hyper schemas, Level-of-Detail calcs, and executive mobile layout.',
    sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    codeSnippet: `<?xml version='1.0' encoding='utf-8' ?>
<workbook source-build='2025.1.0' version='18.1' xmlns:user='http://www.tableausoftware.com/xml/user'>
  <datasources>
    <datasource caption='Claims Executive Hyper' inline='true' name='hyper.claims_exec'>
      <connection class='hyper' filename='Data/Extracts/claims_executive.hyper' />
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

