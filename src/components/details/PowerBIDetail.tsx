import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FileBarChart,
  Database,
  Calculator,
  Table2,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
  Layers,
  RefreshCw,
  Link2,
  BarChart3,
  PieChart,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * PowerBIDetail — full-page detail view for Power BI assets
 *
 * Showcases Power BI's semantic model paradigm:
 * stats → pages/visuals → DAX measures → data model
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

interface ReportPage {
  id: string;
  name: string;
  visualCount: number;
  visualTypes: string[];
  isHidden: boolean;
}

interface DAXMeasure {
  id: string;
  name: string;
  expression: string;
  table: string;
  formatString: string;
  referencedColumns: string[];
  usedInPages: string[];
}

interface SemanticTable {
  id: string;
  name: string;
  columns: number;
  rows: string;
  source: string;
  relationships: string[];
}

/* ── Mock data ── */
function getMockData() {
  const pages: ReportPage[] = [
    { id: 'pg1', name: 'Executive Summary', visualCount: 8, visualTypes: ['Card', 'Line Chart', 'Bar Chart', 'KPI'], isHidden: false },
    { id: 'pg2', name: 'Claims Analysis', visualCount: 6, visualTypes: ['Matrix', 'Clustered Bar', 'Pie Chart'], isHidden: false },
    { id: 'pg3', name: 'Trend Overview', visualCount: 5, visualTypes: ['Area Chart', 'Line Chart', 'Slicer'], isHidden: false },
    { id: 'pg4', name: 'Regional Drill-Down', visualCount: 7, visualTypes: ['Map', 'Table', 'Decomposition Tree'], isHidden: false },
    { id: 'pg5', name: 'Hidden Tooltip Page', visualCount: 3, visualTypes: ['Card', 'Gauge'], isHidden: true },
  ];

  const measures: DAXMeasure[] = [
    { id: 'm1', name: 'Total Premium', expression: 'SUMX( Policy, Policy[Written Premium] )', table: 'Measures', formatString: '$#,##0', referencedColumns: ['Policy[Written Premium]'], usedInPages: ['Executive Summary', 'Claims Analysis'] },
    { id: 'm2', name: 'Loss Ratio', expression: 'DIVIDE(\n  [Total Incurred Losses],\n  [Total Earned Premium],\n  0\n)', table: 'Measures', formatString: '0.0%', referencedColumns: ['[Total Incurred Losses]', '[Total Earned Premium]'], usedInPages: ['Executive Summary', 'Trend Overview'] },
    { id: 'm3', name: 'Claims Count MTD', expression: 'CALCULATE(\n  COUNTROWS( Claims ),\n  DATESMTD( Calendar[Date] )\n)', table: 'Measures', formatString: '#,##0', referencedColumns: ['Claims', 'Calendar[Date]'], usedInPages: ['Claims Analysis'] },
    { id: 'm4', name: 'YoY Premium Growth', expression: 'VAR CurrentYear = [Total Premium]\nVAR PriorYear =\n  CALCULATE(\n    [Total Premium],\n    SAMEPERIODLASTYEAR( Calendar[Date] )\n  )\nRETURN\n  DIVIDE( CurrentYear - PriorYear, PriorYear )', table: 'Measures', formatString: '+0.0%;-0.0%', referencedColumns: ['[Total Premium]', 'Calendar[Date]'], usedInPages: ['Executive Summary', 'Trend Overview'] },
    { id: 'm5', name: 'Avg Claim Severity', expression: 'AVERAGEX(\n  Claims,\n  Claims[Claim Amount]\n)', table: 'Claims Metrics', formatString: '$#,##0', referencedColumns: ['Claims[Claim Amount]'], usedInPages: ['Claims Analysis', 'Regional Drill-Down'] },
    { id: 'm6', name: 'Combined Ratio', expression: '[Loss Ratio] + [Expense Ratio]', table: 'Measures', formatString: '0.0%', referencedColumns: ['[Loss Ratio]', '[Expense Ratio]'], usedInPages: ['Executive Summary'] },
  ];

  const tables: SemanticTable[] = [
    { id: 't1', name: 'Policy', columns: 18, rows: '2.4M', source: 'SQL Server - PolicyDB', relationships: ['Claims (1:N)', 'Customer (N:1)'] },
    { id: 't2', name: 'Claims', columns: 24, rows: '890K', source: 'SQL Server - ClaimsDB', relationships: ['Policy (N:1)', 'ClaimType (N:1)'] },
    { id: 't3', name: 'Customer', columns: 12, rows: '340K', source: 'SQL Server - CRM', relationships: ['Policy (1:N)'] },
    { id: 't4', name: 'Calendar', columns: 15, rows: '3,650', source: 'Generated', relationships: ['Policy[Date] (1:N)', 'Claims[Date] (1:N)'] },
    { id: 't5', name: 'Geography', columns: 8, rows: '52', source: 'Excel - StateRef.xlsx', relationships: ['Policy[State] (1:N)'] },
  ];

  return { pages, measures, tables };
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, value, color }: { icon: typeof FileBarChart; label: string; value: string | number; color: string }) {
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

export default function PowerBIDetail({ asset, onBack }: Props) {
  const { pages, measures, tables } = getMockData();
  const [expandedMeasure, setExpandedMeasure] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pages' | 'measures' | 'model'>('pages');

  const logo = TECHNOLOGY_LOGOS[asset.technology];

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
            <img src={logo} alt="Power BI" className="w-full h-full object-contain" />
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
                Published
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
              {asset.assetType && (
                <span className="font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                  {asset.assetType}
                </span>
              )}
              <span className="font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                Workspace: Insurance Analytics
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
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6' }}
          >
            <RefreshCw size={12} />
            Scheduled Refresh: Daily 6 AM
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
        <StatCard icon={FileBarChart} label="Report Pages" value={pages.length} color="#F59E0B" />
        <StatCard icon={Calculator} label="DAX Measures" value={measures.length} color="#3B82F6" />
        <StatCard icon={Table2} label="Semantic Tables" value={tables.length} color="#8B5CF6" />
        <StatCard icon={BarChart3} label="Total Visuals" value={pages.reduce((s, p) => s + p.visualCount, 0)} color="#10B981" />
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
            { key: 'pages', label: 'Report Pages', icon: FileBarChart },
            { key: 'measures', label: 'DAX Measures', icon: Calculator },
            { key: 'model', label: 'Data Model', icon: Database },
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

        {/* ── Pages Tab ── */}
        {activeTab === 'pages' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="rounded-xl border p-5 theme-transition"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 4px var(--color-card-shadow)',
                  opacity: page.isHidden ? 0.6 : 1,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
                    >
                      <PieChart size={16} style={{ color: '#F59E0B' }} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                        {page.name}
                      </h4>
                      <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                        {page.visualCount} visuals
                      </p>
                    </div>
                  </div>
                  {page.isHidden && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-tertiary)' }}
                    >
                      Hidden
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  {page.visualTypes.map((vt) => (
                    <span
                      key={vt}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                    >
                      {vt}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── DAX Measures Tab ── */}
        {activeTab === 'measures' && (
          <div className="flex flex-col gap-3">
            {measures.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border theme-transition overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  borderColor: expandedMeasure === m.id ? 'var(--color-accent)' : 'var(--color-border-primary)',
                  boxShadow: '0 1px 4px var(--color-card-shadow)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedMeasure(expandedMeasure === m.id ? null : m.id)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors duration-150"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div className="flex items-center gap-3">
                    {expandedMeasure === m.id ? (
                      <ChevronDown size={14} style={{ color: 'var(--color-accent)' }} />
                    ) : (
                      <ChevronRight size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                    )}
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {m.name}
                    </span>
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6' }}
                    >
                      {m.table}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                    {m.formatString}
                  </span>
                </button>

                {expandedMeasure === m.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="border-t"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    <div className="p-4">
                      <div className="mb-4">
                        <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                          DAX Expression
                        </span>
                        <pre
                          className="text-[12px] font-mono p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre-wrap"
                          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)' }}
                        >
                          {m.expression}
                        </pre>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                            Referenced Columns
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {m.referencedColumns.map((c) => (
                              <span
                                key={c}
                                className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md"
                                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                            Used In Pages
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {m.usedInPages.map((p) => (
                              <span
                                key={p}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                                style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#F59E0B' }}
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Data Model Tab ── */}
        {activeTab === 'model' && (
          <div
            className="rounded-xl border overflow-hidden theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 4px var(--color-card-shadow)',
            }}
          >
            <div className="p-4 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div className="flex items-center gap-2">
                <Layers size={16} style={{ color: '#8B5CF6' }} />
                <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Semantic Model — Tables & Relationships
                </h3>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                    {['Table', 'Columns', 'Row Count', 'Source', 'Relationships'].map((h) => (
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
                  {tables.map((t, i) => (
                    <tr
                      key={t.id}
                      className="transition-colors duration-100"
                      style={{ borderTop: i > 0 ? '1px solid var(--color-border-subtle)' : 'none' }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <td className="px-4 py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        <div className="flex items-center gap-2">
                          <Table2 size={12} style={{ color: '#8B5CF6' }} />
                          {t.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono" style={{ color: 'var(--color-text-secondary)' }}>{t.columns}</td>
                      <td className="px-4 py-3 font-mono" style={{ color: 'var(--color-text-secondary)' }}>{t.rows}</td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>{t.source}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {t.relationships.map((r) => (
                            <span
                              key={r}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-md inline-flex items-center gap-1"
                              style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)', color: '#8B5CF6' }}
                            >
                              <Link2 size={8} />
                              {r}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
