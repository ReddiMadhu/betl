import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Code2,
  Database,
  Package,
  FileCode,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Terminal,
  Braces,
  FileInput,
  FileOutput,
  ArrowRight,
  Clock,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * PythonDetail — full-page detail view for Python scripts
 *
 * Script/notebook perspective: code structure,
 * dependencies, data pipeline flow
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

interface PythonModule {
  id: string;
  name: string;
  type: 'function' | 'class' | 'module';
  description: string;
  lineCount: number;
  complexity: 'low' | 'medium' | 'high';
  signature?: string;
}

interface PythonDependency {
  id: string;
  name: string;
  version: string;
  purpose: string;
  isStdLib: boolean;
}

interface DataConnection {
  id: string;
  name: string;
  type: string;
  details: string;
  direction: 'input' | 'output';
}

/* ── Accurate Python ETL Data ── */
function getPythonData(assetId: string) {
  if (assetId === 'c15' || assetId === 'claims_processing') {
    const modules: PythonModule[] = [
      {
        id: 'fn1',
        name: 'ingest_claims_extract',
        type: 'function',
        description: 'Ingests raw claims volume extract from Excel (Claims_Volume_Extract_Demo.xlsx) into pandas DataFrame (Tool #1)',
        lineCount: 16,
        complexity: 'low',
        signature: 'df_1 = pd.read_excel("./Data/Claims_Volume_Extract_Demo.xlsx", sheet_name="Sheet1")',
      },
      {
        id: 'fn2',
        name: 'aggregate_quarter_status_crosstab',
        type: 'function',
        description: 'Groups claims by Quarter End Date and Claim Status, aggregates distinct claim count, and pivots into status matrix (Tools #3-#6)',
        lineCount: 42,
        complexity: 'medium',
        signature: 'df_4 = pd.pivot_table(df_3, index=["Quarter End Date"], columns="Claim Status", values="CountDistinct_Claim Number", aggfunc="sum")',
      },
      {
        id: 'fn3',
        name: 'examiner_manager_rollup',
        type: 'function',
        description: 'Performs multi-level examiner and manager aggregation joined with latest quarter filter (Tools #8-#13)',
        lineCount: 48,
        complexity: 'medium',
        signature: 'df_10_joined = pd.merge(df_8, df_9, left_on=["Quarter End Date"], right_on=["Last Quarter"], how="inner")',
      },
      {
        id: 'fn4',
        name: 'enrich_policy_master_join',
        type: 'function',
        description: 'Enriches claims data with policy master metadata via inner and left join on Policy Number (Tools #101, #111)',
        lineCount: 35,
        complexity: 'medium',
        signature: 'df_111_joined = pd.merge(df_1, df_101, on=["Policy Number"], how="inner")',
      },
      {
        id: 'fn5',
        name: 'aggregate_and_join_payments',
        type: 'function',
        description: 'Aggregates payment transactions (sum Total Paid, count Payment Count) and joins to claims stream with null imputation (Tools #102, #104, #112-#114)',
        lineCount: 38,
        complexity: 'medium',
        signature: 'df_104 = df_102.groupby(["Claim Number"]).agg(Total_Paid=("Payment Amount", "sum"), Payment_Count=("Payment Amount", "count"))',
      },
      {
        id: 'fn6',
        name: 'process_diary_notes_aging',
        type: 'function',
        description: 'Joins adjuster diary notes, calculates days since last activity, applies litigation/reopened defaults, and assigns 30/90+ day aging buckets (Tools #103, #115-#118)',
        lineCount: 45,
        complexity: 'high',
        signature: 'df_118["Aging Bucket"] = np.where(df_118["Days Since Last Activity"].isna(), "No Diary Activity", np.where(df_118["Days ..."] > 90, "90+ Days", ...))',
      },
      {
        id: 'fn7',
        name: 'export_dimensional_summaries',
        type: 'function',
        description: 'Generates dimensional aggregations by Product Type, State geography, and Aging/Litigation Risk matrix (Tools #130-#151)',
        lineCount: 67,
        complexity: 'medium',
        signature: 'df_130 = df_118.groupby(["Quarter End Date", "Product Type"]).agg(Claim_Count=("Claim Number", "nunique"), Total_Paid_Amount=("Total Paid", "sum"))',
      },
      {
        id: 'fn8',
        name: 'write_excel_marts',
        type: 'function',
        description: 'Writes 5 distinct summary sheets across 4 Excel deliverable workbooks using openpyxl writer engine (Tools #17, #18, #132, #142, #152)',
        lineCount: 40,
        complexity: 'low',
        signature: 'with pd.ExcelWriter("Claims_Historical_Extract_Demo_Output.xlsx", engine="openpyxl", mode="a") as writer: ...',
      },
    ];

    const dependencies: PythonDependency[] = [
      { id: 'd1', name: 'pandas', version: '2.2.0', purpose: 'DataFrame vectorization, groupby aggregations, pivot tables, merges, and joins', isStdLib: false },
      { id: 'd2', name: 'numpy', version: '1.26.4', purpose: 'Vectorized conditional evaluations (np.where) for null imputation and aging bucketing', isStdLib: false },
      { id: 'd3', name: 'openpyxl', version: '3.1.2', purpose: 'Excel workbook parsing and multi-sheet openpyxl ExcelWriter engine', isStdLib: false },
      { id: 'd4', name: 'datetime', version: 'stdlib', purpose: 'Timestamp delta calculations for adjuster diary activity and date normalization', isStdLib: true },
    ];

    const connections: DataConnection[] = [
      { id: 'c1', name: 'Claims_Volume_Extract_Demo.xlsx', type: 'Excel Spreadsheet', details: './Data/Claims_Volume_Extract_Demo.xlsx · Sheet1 (Tool #1)', direction: 'input' },
      { id: 'c2', name: 'Policy_Master_Demo.xlsx', type: 'Excel Spreadsheet', details: './Data/Policy_Master_Demo.xlsx · Sheet1 (Tool #101)', direction: 'input' },
      { id: 'c3', name: 'Claim_Payments_Demo.xlsx', type: 'Excel Spreadsheet', details: './Data/Claim_Payments_Demo.xlsx · Sheet1 (Tool #102)', direction: 'input' },
      { id: 'c4', name: 'Claim_Diary_Notes_Demo.xlsx', type: 'Excel Spreadsheet', details: './Data/Claim_Diary_Notes_Demo.xlsx · Sheet1 (Tool #103)', direction: 'input' },
      { id: 'c5', name: 'Claims_Historical_Extract_Demo_Output.xlsx', type: 'Excel Data Mart', details: 'Sheets: Detail (Tool #17), QuarterSummary (Tool #18)', direction: 'output' },
      { id: 'c6', name: 'Claims_By_Product_Type_Demo_Output.xlsx', type: 'Excel Data Mart', details: 'Sheet: ProductTypeSummary (Tool #132)', direction: 'output' },
      { id: 'c7', name: 'Claims_By_State_Demo_Output.xlsx', type: 'Excel Data Mart', details: 'Sheet: StateSummary (Tool #142)', direction: 'output' },
      { id: 'c8', name: 'Claims_Aging_Risk_Demo_Output.xlsx', type: 'Excel Data Mart', details: 'Sheet: AgingRiskSummary (Tool #152)', direction: 'output' },
    ];

    return { modules, dependencies, connections, totalLines: 331 };
  }

  const modules: PythonModule[] = [
    { id: 'fn1', name: 'extract_policy_data', type: 'function', description: 'Connect to source database and extract policy records with incremental loading', lineCount: 45, complexity: 'medium', signature: 'def extract_policy_data(conn_str: str, last_run: datetime) -> pd.DataFrame' },
    { id: 'fn2', name: 'transform_claims', type: 'function', description: 'Apply business rules, calculate derived fields, handle null values and data type conversions', lineCount: 78, complexity: 'high', signature: 'def transform_claims(df: pd.DataFrame, config: dict) -> pd.DataFrame' },
    { id: 'fn3', name: 'validate_schema', type: 'function', description: 'Validate DataFrame schema against expected column types and constraints', lineCount: 32, complexity: 'low', signature: 'def validate_schema(df: pd.DataFrame, schema: dict) -> ValidationResult' },
    { id: 'cl1', name: 'DataQualityChecker', type: 'class', description: 'Runs data quality checks including null rates, uniqueness, referential integrity, and range validation', lineCount: 120, complexity: 'high', signature: 'class DataQualityChecker(BaseValidator)' },
    { id: 'fn4', name: 'load_to_warehouse', type: 'function', description: 'Batch load transformed data into Snowflake warehouse with upsert logic', lineCount: 38, complexity: 'medium', signature: 'def load_to_warehouse(df: pd.DataFrame, table: str, mode: str = "upsert") -> int' },
    { id: 'fn5', name: 'generate_audit_report', type: 'function', description: 'Generate execution audit report with row counts, timing, and data quality metrics', lineCount: 25, complexity: 'low', signature: 'def generate_audit_report(stats: ExecutionStats) -> dict' },
    { id: 'md1', name: 'config', type: 'module', description: 'Configuration module with database credentials, file paths, and schedule parameters', lineCount: 42, complexity: 'low' },
  ];

  const dependencies: PythonDependency[] = [
    { id: 'd1', name: 'pandas', version: '2.1.4', purpose: 'DataFrame operations and data manipulation', isStdLib: false },
    { id: 'd2', name: 'sqlalchemy', version: '2.0.25', purpose: 'Database connection and ORM for SQL Server / Snowflake', isStdLib: false },
    { id: 'd3', name: 'snowflake-connector-python', version: '3.6.0', purpose: 'Native Snowflake warehouse connectivity', isStdLib: false },
    { id: 'd4', name: 'pyodbc', version: '5.1.0', purpose: 'SQL Server ODBC driver interface', isStdLib: false },
    { id: 'd5', name: 'great_expectations', version: '0.18.8', purpose: 'Data validation and quality assertion framework', isStdLib: false },
    { id: 'd6', name: 'logging', version: 'stdlib', purpose: 'Structured logging and audit trail', isStdLib: true },
    { id: 'd7', name: 'datetime', version: 'stdlib', purpose: 'Date/time handling for incremental loads', isStdLib: true },
    { id: 'd8', name: 'pathlib', version: 'stdlib', purpose: 'File path management for config and outputs', isStdLib: true },
  ];

  const connections: DataConnection[] = [
    { id: 'c1', name: 'Policy Administration DB', type: 'SQL Server', details: 'PROD-DB01 · PolicyDB · ODBC Connection', direction: 'input' },
    { id: 'c2', name: 'Claims History Table', type: 'SQL Server', details: 'PROD-DB01 · ClaimsDB · Incremental Load', direction: 'input' },
    { id: 'c3', name: 'Reference Data (CSV)', type: 'File System', details: '/data/reference/state_codes.csv', direction: 'input' },
    { id: 'c4', name: 'Insurance Data Warehouse', type: 'Snowflake', details: 'ANALYTICS_WH · INSURANCE_DB · PUBLIC schema', direction: 'output' },
    { id: 'c5', name: 'Execution Log', type: 'File System', details: '/logs/etl_{date}.json', direction: 'output' },
  ];

  return { modules, dependencies, connections, totalLines: 370 };
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, value, color }: { icon: typeof Code2; label: string; value: string | number; color: string }) {
  return (
    <div
      className="rounded-xl border p-5 theme-transition"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 4px var(--color-card-shadow)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
            {label}
          </p>
          <p className="text-2xl font-bold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Complexity badge ── */
function ComplexityBadge({ complexity }: { complexity: 'low' | 'medium' | 'high' }) {
  const config = {
    low: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', label: 'Low' },
    medium: { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', label: 'Medium' },
    high: { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', label: 'High' },
  }[complexity];
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      {config.label}
    </span>
  );
}

/* ── Type badge ── */
function TypeBadge({ type }: { type: 'function' | 'class' | 'module' }) {
  const colors: Record<string, string> = { function: '#3B82F6', class: '#8B5CF6', module: '#06B6D4' };
  const icons: Record<string, string> = { function: 'def', class: 'cls', module: 'mod' };
  const c = colors[type];
  return (
    <span
      className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md"
      style={{ backgroundColor: `${c}15`, color: c }}
    >
      {icons[type]}
    </span>
  );
}

export default function PythonDetail({ asset, onBack }: Props) {
  const { modules, dependencies, connections, totalLines: loc } = getPythonData(asset.id);
  const [expandedMod, setExpandedMod] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'structure' | 'deps' | 'pipeline'>('structure');

  const logo = TECHNOLOGY_LOGOS[asset.technology];
  const totalLines = loc ?? modules.reduce((s, m) => s + m.lineCount, 0);
  const inputConns = connections.filter((c) => c.direction === 'input');
  const outputConns = connections.filter((c) => c.direction === 'output');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* ── Back button ── */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium mb-5 px-2 py-1 rounded-lg transition-colors duration-150"
        style={{ color: 'var(--color-text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <ArrowLeft size={14} />
        Back to Results
      </button>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 p-2.5"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <img src={logo} alt="Python" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1
                className="text-xl md:text-2xl font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {asset.name}
              </h1>
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'rgb(34, 197, 94)' }}
              >
                Cataloged
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
              {asset.assetType && (
                <span className="font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                  {asset.assetType}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Terminal size={11} />
                Python 3.11
              </span>
              {asset.owner && (
                <span className="flex items-center gap-1">
                  <User size={11} />
                  {asset.owner}
                </span>
              )}
              {asset.lastUpdated && (
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {asset.lastUpdated}
                </span>
              )}
            </div>
            {asset.description && (
              <p className="text-[13px] mt-2 max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {asset.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#22C55E' }}
          >
            <CheckCircle2 size={12} />
            Last Run: Success
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6' }}
          >
            <Clock size={12} />
            Cron: 0 6 * * *
          </div>
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <StatCard icon={FileCode} label="Lines of Code" value={totalLines} color="#3B82F6" />
        <StatCard icon={Package} label="Dependencies" value={dependencies.filter((d) => !d.isStdLib).length} color="#8B5CF6" />
        <StatCard icon={Braces} label="Functions & Classes" value={modules.length} color="#F59E0B" />
        <StatCard icon={Database} label="Data Sources" value={asset.sourceCount ?? inputConns.length} color="#22C55E" />
      </motion.div>

      {/* ── Tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="mb-6"
      >
        <div
          className="flex gap-1 p-1 rounded-xl mb-5"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          {([
            { key: 'structure', label: 'Code Structure', icon: Code2 },
            { key: 'deps', label: 'Dependencies', icon: Package },
            { key: 'pipeline', label: 'Data Pipeline', icon: Database },
          ] as const).map(({ key, label, icon: TabIcon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[12px] font-semibold transition-all duration-200"
              style={{
                backgroundColor: activeTab === key ? 'var(--color-bg-elevated)' : 'transparent',
                color: activeTab === key ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: activeTab === key ? '0 1px 4px var(--color-card-shadow)' : 'none',
              }}
            >
              <TabIcon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Code Structure Tab ── */}
        {activeTab === 'structure' && (
          <div className="flex flex-col gap-3">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="rounded-xl border theme-transition overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  borderColor: expandedMod === mod.id ? 'var(--color-accent)' : 'var(--color-border-primary)',
                  boxShadow: '0 1px 4px var(--color-card-shadow)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedMod(expandedMod === mod.id ? null : mod.id)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors duration-150"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {expandedMod === mod.id ? (
                      <ChevronDown size={14} style={{ color: 'var(--color-accent)' }} />
                    ) : (
                      <ChevronRight size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                    )}
                    <TypeBadge type={mod.type} />
                    <span className="text-[13px] font-semibold font-mono" style={{ color: 'var(--color-text-primary)' }}>
                      {mod.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <ComplexityBadge complexity={mod.complexity} />
                    <span className="text-[11px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                      {mod.lineCount} lines
                    </span>
                  </div>
                </button>

                {expandedMod === mod.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="border-t"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    <div className="p-4">
                      <p className="text-[12px] mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                        {mod.description}
                      </p>
                      {mod.signature && (
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                            Signature
                          </span>
                          <pre
                            className="text-[12px] font-mono p-3 rounded-lg overflow-x-auto"
                            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)' }}
                          >
                            {mod.signature}
                          </pre>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Dependencies Tab ── */}
        {activeTab === 'deps' && (
          <div
            className="rounded-xl border overflow-hidden theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 4px var(--color-card-shadow)',
            }}
          >
            <div className="p-4 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Package Dependencies
              </h3>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                {dependencies.filter((d) => !d.isStdLib).length} third-party · {dependencies.filter((d) => d.isStdLib).length} standard library
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                    {['Package', 'Version', 'Purpose', 'Type'].map((h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-2.5 font-semibold uppercase tracking-wider text-[10px]"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dependencies.map((dep, i) => (
                    <tr
                      key={dep.id}
                      className="transition-colors duration-100"
                      style={{ borderTop: i > 0 ? '1px solid var(--color-border-subtle)' : 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <td className="px-4 py-3 font-semibold font-mono" style={{ color: 'var(--color-text-primary)' }}>
                        <div className="flex items-center gap-2">
                          <Package size={12} style={{ color: dep.isStdLib ? '#06B6D4' : '#8B5CF6' }} />
                          {dep.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                        {dep.version}
                      </td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>
                        {dep.purpose}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: dep.isStdLib ? 'rgba(6, 182, 212, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                            color: dep.isStdLib ? '#06B6D4' : '#8B5CF6',
                          }}
                        >
                          {dep.isStdLib ? 'stdlib' : 'pip'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Data Pipeline Tab ── */}
        {activeTab === 'pipeline' && (
          <div
            className="rounded-xl border p-6 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 4px var(--color-card-shadow)',
            }}
          >
            <h3 className="text-[14px] font-bold mb-5" style={{ color: 'var(--color-text-primary)' }}>
              Data Pipeline Flow
            </h3>

            <div className="flex items-start justify-between gap-4 overflow-x-auto py-4">
              {/* Inputs */}
              <div className="flex flex-col gap-2 shrink-0 min-w-[180px]">
                <h4 className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                  Inputs
                </h4>
                {inputConns.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[11px]"
                    style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)' }}
                  >
                    <FileInput size={12} style={{ color: '#3B82F6' }} />
                    <div>
                      <span className="font-medium block" style={{ color: 'var(--color-text-primary)' }}>{c.name}</span>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>{c.type}</span>
                    </div>
                  </div>
                ))}
              </div>

              <ArrowRight size={20} className="shrink-0 mt-10" style={{ color: 'var(--color-border-secondary)' }} />

              {/* Processing */}
              <div
                className="flex-1 min-w-[200px] rounded-xl border p-4"
                style={{ borderColor: 'var(--color-accent)', backgroundColor: 'var(--color-accent-subtle)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={14} style={{ color: 'var(--color-accent)' }} />
                  <span className="text-[12px] font-bold" style={{ color: 'var(--color-accent)' }}>
                    {asset.name}.py
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {modules.filter((m) => m.type === 'function').slice(0, 4).map((m) => (
                    <div key={m.id} className="text-[10px] font-mono px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-secondary)' }}>
                      {m.name}()
                    </div>
                  ))}
                </div>
              </div>

              <ArrowRight size={20} className="shrink-0 mt-10" style={{ color: 'var(--color-border-secondary)' }} />

              {/* Outputs */}
              <div className="flex flex-col gap-2 shrink-0 min-w-[180px]">
                <h4 className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                  Outputs
                </h4>
                {outputConns.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-[11px]"
                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)' }}
                  >
                    <FileOutput size={12} style={{ color: '#22C55E' }} />
                    <div>
                      <span className="font-medium block" style={{ color: 'var(--color-text-primary)' }}>{c.name}</span>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>{c.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
