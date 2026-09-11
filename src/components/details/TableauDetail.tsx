import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  LayoutDashboard,
  Database,
  FunctionSquare,
  Filter,
  Table2,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Layers,
  ArrowRightLeft,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * TableauDetail — full-page detail view for Tableau assets
 *
 * Inspired by the tb-bi reference project.
 * Shows: stats → worksheet inventory → calculated fields
 *        → data sources → lineage
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

/* ── Mock data structures ── */
interface Worksheet {
  id: string;
  name: string;
  chartType: string;
  dataSource: string;
  calculatedFields: number;
  filters: number;
  status: 'valid' | 'warning' | 'error';
}

interface CalculatedField {
  id: string;
  name: string;
  formula: string;
  category: 'LOD' | 'Table Calc' | 'Standard' | 'Conditional';
  dependsOn: string[];
  usedInSheets: string[];
}

interface DataSourceInfo {
  id: string;
  name: string;
  type: string;
  tables: number;
  joins: number;
  connectionStatus: 'live' | 'extract';
  lastRefresh: string;
}

/* ── Mock data generator ── */
function getMockData() {
  const worksheets: Worksheet[] = [
    { id: 'ws1', name: 'Summary Overview', chartType: 'Bar Chart', dataSource: 'Claims Data Mart', calculatedFields: 4, filters: 3, status: 'valid' },
    { id: 'ws2', name: 'Trend Analysis', chartType: 'Line Chart', dataSource: 'Claims Data Mart', calculatedFields: 6, filters: 5, status: 'valid' },
    { id: 'ws3', name: 'Regional Breakdown', chartType: 'Map', dataSource: 'Geography Lookup', calculatedFields: 2, filters: 4, status: 'warning' },
    { id: 'ws4', name: 'KPI Scorecard', chartType: 'Text Table', dataSource: 'Claims Data Mart', calculatedFields: 8, filters: 2, status: 'valid' },
    { id: 'ws5', name: 'Monthly Comparison', chartType: 'Combo Chart', dataSource: 'Claims Data Mart', calculatedFields: 5, filters: 3, status: 'valid' },
    { id: 'ws6', name: 'Detail Drilldown', chartType: 'Cross Tab', dataSource: 'Policy Detail', calculatedFields: 3, filters: 6, status: 'error' },
  ];

  const calculatedFields: CalculatedField[] = [
    { id: 'cf1', name: 'Running Total Claims', formula: 'RUNNING_SUM(SUM([Claim Amount]))', category: 'Table Calc', dependsOn: ['Claim Amount'], usedInSheets: ['Trend Analysis', 'Monthly Comparison'] },
    { id: 'cf2', name: 'Loss Ratio', formula: 'SUM([Incurred Losses]) / SUM([Earned Premium])', category: 'Standard', dependsOn: ['Incurred Losses', 'Earned Premium'], usedInSheets: ['Summary Overview', 'KPI Scorecard'] },
    { id: 'cf3', name: 'Avg Cycle Time (LOD)', formula: '{ FIXED [Region], [Line of Business] : AVG([Cycle Days]) }', category: 'LOD', dependsOn: ['Region', 'Line of Business', 'Cycle Days'], usedInSheets: ['Regional Breakdown'] },
    { id: 'cf4', name: 'YoY Growth %', formula: '(SUM([Claim Amount]) - LOOKUP(SUM([Claim Amount]), -1)) / ABS(LOOKUP(SUM([Claim Amount]), -1))', category: 'Table Calc', dependsOn: ['Claim Amount'], usedInSheets: ['Monthly Comparison'] },
    { id: 'cf5', name: 'Severity Tier', formula: 'IF [Claim Amount] > 100000 THEN "High"\nELSEIF [Claim Amount] > 25000 THEN "Medium"\nELSE "Low"\nEND', category: 'Conditional', dependsOn: ['Claim Amount'], usedInSheets: ['Summary Overview', 'Detail Drilldown'] },
    { id: 'cf6', name: 'Region LOD Claim Count', formula: '{ FIXED [Region] : COUNTD([Claim ID]) }', category: 'LOD', dependsOn: ['Region', 'Claim ID'], usedInSheets: ['Regional Breakdown', 'KPI Scorecard'] },
  ];

  const dataSources: DataSourceInfo[] = [
    { id: 'ds1', name: 'Claims Data Mart', type: 'SQL Server', tables: 8, joins: 5, connectionStatus: 'extract', lastRefresh: '2026-09-10 06:00 AM' },
    { id: 'ds2', name: 'Geography Lookup', type: 'Excel', tables: 1, joins: 0, connectionStatus: 'live', lastRefresh: 'N/A' },
    { id: 'ds3', name: 'Policy Detail', type: 'Snowflake', tables: 4, joins: 3, connectionStatus: 'extract', lastRefresh: '2026-09-10 06:15 AM' },
  ];

  return { worksheets, calculatedFields, dataSources };
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, value, color }: { icon: typeof LayoutDashboard; label: string; value: string | number; color: string }) {
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

/* ── Status badge ── */
function StatusBadge({ status }: { status: 'valid' | 'warning' | 'error' }) {
  const config = {
    valid: { bg: 'rgba(34, 197, 94, 0.1)', color: 'rgb(34, 197, 94)', icon: CheckCircle2, label: 'Valid' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', color: 'rgb(245, 158, 11)', icon: AlertTriangle, label: 'Warning' },
    error: { bg: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', icon: AlertTriangle, label: 'Error' },
  }[status];
  const Icon = config.icon;

  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}

/* ── Category badge ── */
function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    'LOD': '#8B5CF6',
    'Table Calc': '#3B82F6',
    'Conditional': '#F59E0B',
    'Standard': '#6B7280',
  };
  const c = colors[category] || '#6B7280';
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
      style={{ backgroundColor: `${c}15`, color: c }}
    >
      {category}
    </span>
  );
}

export default function TableauDetail({ asset, onBack }: Props) {
  const { worksheets, calculatedFields, dataSources } = getMockData();
  const [expandedCalc, setExpandedCalc] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'worksheets' | 'calcs' | 'sources'>('worksheets');

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
        style={{
          color: 'var(--color-text-secondary)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
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
            <img src={logo} alt="Tableau" className="w-full h-full object-contain" />
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

        {/* Confidence badge */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl shrink-0"
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.08)',
            color: 'rgb(34, 197, 94)',
            fontWeight: 700,
            fontSize: '0.875rem',
          }}
        >
          <CheckCircle2 size={16} />
          <span>92% Confidence</span>
        </div>
      </motion.div>

      {/* ── Stats cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <StatCard icon={LayoutDashboard} label="Worksheets" value={worksheets.length} color="#3B82F6" />
        <StatCard icon={Database} label="Data Sources" value={dataSources.length} color="#8B5CF6" />
        <StatCard icon={FunctionSquare} label="Calculated Fields" value={calculatedFields.length} color="#F59E0B" />
        <StatCard icon={Filter} label="Total Filters" value={worksheets.reduce((s, w) => s + w.filters, 0)} color="#10B981" />
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
            { key: 'worksheets', label: 'Worksheets', icon: Table2 },
            { key: 'calcs', label: 'Calculated Fields', icon: FunctionSquare },
            { key: 'sources', label: 'Data Sources', icon: Database },
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

        {/* ── Worksheets Tab ── */}
        {activeTab === 'worksheets' && (
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
                Worksheet Inventory
              </h3>
              <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                {worksheets.length} worksheets discovered across {dataSources.length} data sources
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                    {['Worksheet', 'Chart Type', 'Data Source', 'Calc Fields', 'Filters', 'Status'].map((h) => (
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
                  {worksheets.map((ws, i) => (
                    <tr
                      key={ws.id}
                      className="transition-colors duration-100"
                      style={{
                        borderTop: i > 0 ? '1px solid var(--color-border-subtle)' : 'none',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <td className="px-4 py-3 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        <div className="flex items-center gap-2">
                          <Eye size={12} style={{ color: 'var(--color-text-tertiary)' }} />
                          {ws.name}
                        </div>
                      </td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>
                        {ws.chartType}
                      </td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text-secondary)' }}>
                        {ws.dataSource}
                      </td>
                      <td className="px-4 py-3 text-center font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                        {ws.calculatedFields}
                      </td>
                      <td className="px-4 py-3 text-center font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                        {ws.filters}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={ws.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Calculated Fields Tab ── */}
        {activeTab === 'calcs' && (
          <div className="flex flex-col gap-3">
            {calculatedFields.map((cf) => (
              <div
                key={cf.id}
                className="rounded-xl border theme-transition overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  borderColor: expandedCalc === cf.id ? 'var(--color-accent)' : 'var(--color-border-primary)',
                  boxShadow: '0 1px 4px var(--color-card-shadow)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedCalc(expandedCalc === cf.id ? null : cf.id)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors duration-150"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div className="flex items-center gap-3">
                    {expandedCalc === cf.id ? (
                      <ChevronDown size={14} style={{ color: 'var(--color-accent)' }} />
                    ) : (
                      <ChevronRight size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                    )}
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {cf.name}
                    </span>
                    <CategoryBadge category={cf.category} />
                  </div>
                  <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    Used in {cf.usedInSheets.length} sheet{cf.usedInSheets.length !== 1 ? 's' : ''}
                  </span>
                </button>

                {expandedCalc === cf.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="border-t"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    <div className="p-4">
                      {/* Formula */}
                      <div className="mb-4">
                        <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                          Formula
                        </span>
                        <pre
                          className="text-[12px] font-mono p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre-wrap"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            color: 'var(--color-text-primary)',
                          }}
                        >
                          {cf.formula}
                        </pre>
                      </div>

                      {/* Dependencies + Used In */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                            Depends On
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {cf.dependsOn.map((dep) => (
                              <span
                                key={dep}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                                style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                              >
                                {dep}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                            Used In Sheets
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {cf.usedInSheets.map((s) => (
                              <span
                                key={s}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-md"
                                style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6' }}
                              >
                                {s}
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

        {/* ── Data Sources Tab ── */}
        {activeTab === 'sources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {dataSources.map((ds) => (
              <div
                key={ds.id}
                className="rounded-xl border p-5 theme-transition"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 4px var(--color-card-shadow)',
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                    >
                      <Database size={16} style={{ color: '#8B5CF6' }} />
                    </div>
                    <div>
                      <h4 className="text-[13px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                        {ds.name}
                      </h4>
                      <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                        {ds.type}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: ds.connectionStatus === 'live' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                      color: ds.connectionStatus === 'live' ? 'rgb(34, 197, 94)' : '#3B82F6',
                    }}
                  >
                    {ds.connectionStatus === 'live' ? '● Live' : '↻ Extract'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Tables</p>
                    <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>{ds.tables}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Joins</p>
                    <p className="text-lg font-bold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>{ds.joins}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <p className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    Last Refresh: {ds.lastRefresh}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Lineage Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className="mt-6 rounded-xl border p-5 theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
          boxShadow: '0 1px 4px var(--color-card-shadow)',
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <ArrowRightLeft size={16} style={{ color: 'var(--color-accent)' }} />
          <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Asset Lineage & Dependencies
          </h3>
        </div>

        {/* Visual lineage flow */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto py-4">
          {/* Sources */}
          <div className="flex flex-col gap-2 shrink-0">
            {dataSources.map((ds) => (
              <div
                key={ds.id}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium"
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.08)',
                  color: '#8B5CF6',
                }}
              >
                <Database size={12} />
                {ds.name}
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="shrink-0 px-2">
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--color-border-secondary)' }} />
          </div>

          {/* Workbook */}
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl shrink-0 border"
            style={{
              backgroundColor: 'var(--color-accent-subtle)',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-accent)',
            }}
          >
            <Layers size={14} />
            <div className="text-center">
              <span className="text-[12px] font-bold block">{asset.name}</span>
              <span className="text-[10px] opacity-75">{worksheets.length} worksheets</span>
            </div>
          </div>

          {/* Arrow */}
          <div className="shrink-0 px-2">
            <div className="w-12 h-px" style={{ backgroundColor: 'var(--color-border-secondary)' }} />
          </div>

          {/* Consumers */}
          <div className="flex flex-col gap-2 shrink-0">
            {(asset.relatedAssets || ['Published to Server', 'Embedded in Portal']).map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-medium"
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.08)',
                  color: 'rgb(34, 197, 94)',
                }}
              >
                <LayoutDashboard size={12} />
                {r}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
