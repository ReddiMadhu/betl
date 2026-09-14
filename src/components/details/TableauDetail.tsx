import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Layout,
  Grid,
  Database,
  Code,
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Calendar,
  User,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';
import { TABLEAU_DETAIL_DATA } from '../../data/tableauDetailData';
import type { WorksheetDetail, TableauDetailData } from '../../data/tableauDetailData';

/* ─────────────────────────────────────────────────────────
 * Page 1: Data Understanding - COMMAND CENTER DASHBOARD
 * (Tableau Workbook Deep Inspection)
 *
 * Inspired by tb-bi migration-wizard Page1DataUnderstanding:
 * - Executive summary KPI bar (Dashboards, Worksheets, Tables, Calc Fields)
 * - Worksheets / Charts card with dimension/measure/axes breakdown
 * - Calculated Fields card with formula inspector and worksheet filter
 * - Full-width Data Tables card with realistic multi-row preview
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

export default function TableauDetail({ asset, onBack }: Props) {
  const metadata: TableauDetailData = useMemo(() => {
    return TABLEAU_DETAIL_DATA[asset.id] ?? {
      summary: { totalDashboards: 1, totalWorksheets: 0, totalTables: 0, totalCalculatedFields: 0 },
      worksheets: [],
      calculatedFields: [],
      tables: [],
    };
  }, [asset.id]);

  const [worksheetSearch, setWorksheetSearch] = useState('');
  const [calcFieldSearch, setCalcFieldSearch] = useState('');
  const [tableSearch, setTableSearch] = useState('');

  const [selectedWorksheet, setSelectedWorksheet] = useState<WorksheetDetail | null>(null);
  const [expandedFormulas, setExpandedFormulas] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFormula = (id: string) => {
    setExpandedFormulas((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copyFormula = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filter worksheets
  const filteredWorksheets = useMemo(() => {
    if (!worksheetSearch.trim()) return metadata.worksheets;
    const q = worksheetSearch.toLowerCase();
    return metadata.worksheets.filter(
      (ws) =>
        ws.name.toLowerCase().includes(q) ||
        ws.chartType.toLowerCase().includes(q) ||
        ws.dimensions.some((d) => d.toLowerCase().includes(q))
    );
  }, [metadata.worksheets, worksheetSearch]);

  // Filter calculated fields (by search and by selected worksheet)
  const filteredCalculatedFields = useMemo(() => {
    let list = metadata.calculatedFields;

    if (selectedWorksheet) {
      list = list.filter((cf) => cf.usedInSheets.includes(selectedWorksheet.name));
    }

    if (calcFieldSearch.trim()) {
      const q = calcFieldSearch.toLowerCase();
      list = list.filter(
        (cf) =>
          cf.name.toLowerCase().includes(q) ||
          cf.formula.toLowerCase().includes(q) ||
          cf.role.toLowerCase().includes(q)
      );
    }

    return list;
  }, [metadata.calculatedFields, selectedWorksheet, calcFieldSearch]);

  // Filter data tables
  const filteredTables = useMemo(() => {
    if (!tableSearch.trim()) return metadata.tables;
    const q = tableSearch.toLowerCase();
    return metadata.tables.filter(
      (t) =>
        t.displayName.toLowerCase().includes(q) ||
        t.dataSource.toLowerCase().includes(q) ||
        t.columns.some((c) => c.name.toLowerCase().includes(q))
    );
  }, [metadata.tables, tableSearch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="space-y-6 pb-12"
    >
      {/* ── Header ── */}
      <div
        className="rounded-2xl border p-6 theme-transition shadow-sm"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={onBack}
              className="p-2.5 rounded-xl border cursor-pointer hover:scale-105 active:scale-95 transition-all mt-0.5 shrink-0"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
              title="Back to Asset Discovery"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center p-2 shrink-0 border"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <img
                  src={TECHNOLOGY_LOGOS.Tableau}
                  alt="Tableau"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                    {asset.name}
                  </h1>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
                    style={{
                      backgroundColor: 'rgba(235, 106, 38, 0.1)',
                      borderColor: 'rgba(235, 106, 38, 0.3)',
                      color: '#EB6A26',
                    }}
                  >
                    Tableau Workbook (.twbx)
                  </span>
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md border"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor: 'var(--color-border-subtle)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {asset.businessArea}
                  </span>
                </div>
                <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Source Dashboard Exploration — Complete inspection of sheets, calculated logic, and data sources
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  <span className="flex items-center gap-1.5">
                    <User size={13} /> {asset.owner || 'Steward: Sarah Mitchell'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> Last Modified: 14 days ago
                  </span>
                  <span>•</span>
                  <span>Usage: High (420 views/mo)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Executive Summary Bar (4 KPI Cards from Page 1 Command Center) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dashboards Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Layout className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalDashboards}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Tableau Dashboards
            </div>
          </div>
        </div>

        {/* Worksheets Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Grid className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalWorksheets}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Worksheets / Charts
            </div>
          </div>
        </div>

        {/* Data Tables Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Database className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalTables}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Data Sources & Tables
            </div>
          </div>
        </div>

        {/* Calculated Fields Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Code className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalCalculatedFields}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Calculated Fields
            </div>
          </div>
        </div>
      </div>

      {/* ── 2-Column Grid Layout: Worksheets & Calculated Fields ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Worksheets / Charts Card */}
        <div
          className="rounded-2xl border flex flex-col shadow-sm overflow-hidden"
          style={{
            height: '470px',
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          {/* Card Header */}
          <div
            className="p-4 border-b shrink-0"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <Grid className="w-5 h-5 text-blue-500" />
                Worksheets / Charts ({filteredWorksheets.length})
              </h2>
              <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
                Click card to filter formulas
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search worksheets or chart types..."
                value={worksheetSearch}
                onChange={(e) => setWorksheetSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          {/* Card Body - Scrollable list of Worksheets */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredWorksheets.map((ws) => {
              const isSelected = selectedWorksheet?.id === ws.id;
              return (
                <div
                  key={ws.id}
                  className="rounded-xl border transition-all cursor-pointer overflow-hidden"
                  style={{
                    backgroundColor: isSelected
                      ? 'color-mix(in srgb, #3B82F6 10%, var(--color-bg-elevated))'
                      : 'var(--color-surface)',
                    borderColor: isSelected ? '#3B82F6' : 'var(--color-border-subtle)',
                    boxShadow: isSelected ? '0 0 0 1px #3B82F6' : 'none',
                  }}
                  onClick={() => setSelectedWorksheet(isSelected ? null : ws)}
                >
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs truncate" style={{ color: 'var(--color-text-primary)' }}>
                          {ws.name}
                        </h3>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                          style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            borderColor: 'rgba(59, 130, 246, 0.25)',
                            color: '#3B82F6',
                          }}
                        >
                          {ws.chartType}
                        </span>
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        {ws.dimensions.length} Dimensions • {ws.measures.length} Measures
                      </p>
                    </div>
                    <div className="shrink-0 text-blue-500">
                      {isSelected ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isSelected && (
                    <div
                      className="px-3.5 pb-3.5 pt-2 border-t text-xs space-y-2.5"
                      style={{ borderColor: 'rgba(59, 130, 246, 0.2)' }}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {/* Dimensions list */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                            Dimensions
                          </span>
                          <div
                            className="max-h-24 overflow-y-auto rounded-lg p-1.5 space-y-1 border"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            {ws.dimensions.map((d, i) => (
                              <div key={i} className="truncate pl-1.5 border-l-2 border-purple-400 text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                                {d}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Measures list */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                            Measures
                          </span>
                          <div
                            className="max-h-24 overflow-y-auto rounded-lg p-1.5 space-y-1 border"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            {ws.measures.map((m, i) => (
                              <div
                                key={i}
                                className={`truncate pl-1.5 border-l-2 text-[11px] ${
                                  m.type === 'calculated' ? 'border-emerald-500 font-medium' : 'border-gray-400'
                                }`}
                                style={{ color: 'var(--color-text-secondary)' }}
                              >
                                {m.name} {m.type === 'calculated' ? '★' : ''}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Axes Shelves */}
                      <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                          Tableau Shelves
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div
                            className="p-1.5 rounded border truncate"
                            style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}
                            title={ws.axes.rows}
                          >
                            <span className="font-bold text-[9px] uppercase text-gray-400 block">Rows</span>
                            <span style={{ color: 'var(--color-text-primary)' }}>{ws.axes.rows}</span>
                          </div>
                          <div
                            className="p-1.5 rounded border truncate"
                            style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}
                            title={ws.axes.columns}
                          >
                            <span className="font-bold text-[9px] uppercase text-gray-400 block">Columns</span>
                            <span style={{ color: 'var(--color-text-primary)' }}>{ws.axes.columns}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredWorksheets.length === 0 && (
              <div className="text-center py-10 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                No worksheets match your query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Calculated Fields Card */}
        <div
          className="rounded-2xl border flex flex-col shadow-sm overflow-hidden"
          style={{
            height: '470px',
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          {/* Card Header */}
          <div
            className="p-4 border-b shrink-0"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                <Code className="w-5 h-5 text-emerald-500" />
                Calculated Fields ({filteredCalculatedFields.length})
              </h2>
              {selectedWorksheet && (
                <div
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px]"
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    color: '#3B82F6',
                  }}
                >
                  <span>Filtered by: {selectedWorksheet.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedWorksheet(null)}
                    className="font-bold cursor-pointer hover:opacity-75"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search calculated fields or formulas..."
                value={calcFieldSearch}
                onChange={(e) => setCalcFieldSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          {/* Card Body - Scrollable list of Calculated Fields */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredCalculatedFields.map((cf) => {
              const isExpanded = expandedFormulas.has(cf.id);
              const isCopied = copiedId === cf.id;
              return (
                <div
                  key={cf.id}
                  className="rounded-xl border overflow-hidden transition-all"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: isExpanded ? 'var(--color-accent)' : 'var(--color-border-subtle)',
                  }}
                >
                  <div
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-opacity-80"
                    onClick={() => toggleFormula(cf.id)}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs truncate" style={{ color: 'var(--color-text-primary)' }}>
                          {cf.name}
                        </h3>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            cf.role === 'measure'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                          }`}
                        >
                          {cf.role}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">[{cf.datatype}]</span>
                      </div>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        Used in {cf.usedInSheets.length} sheet{cf.usedInSheets.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Formula Box */}
                  {isExpanded && (
                    <div
                      className="px-3.5 py-3 border-t text-xs space-y-2"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                          Tableau Formula Definition
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyFormula(cf.formula, cf.id);
                          }}
                          className="flex items-center gap-1 text-[11px] font-semibold cursor-pointer hover:opacity-80 px-2 py-0.5 rounded border"
                          style={{
                            borderColor: 'var(--color-border-primary)',
                            color: isCopied ? '#22C55E' : 'var(--color-text-secondary)',
                          }}
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          <span>{isCopied ? 'Copied' : 'Copy Formula'}</span>
                        </button>
                      </div>
                      <pre
                        className="p-3 rounded-lg font-mono text-[11px] leading-relaxed overflow-x-auto border"
                        style={{
                          backgroundColor: 'var(--color-bg-primary)',
                          borderColor: 'var(--color-border-primary)',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        <code>{cf.formula}</code>
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredCalculatedFields.length === 0 && (
              <div className="text-center py-10 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                {selectedWorksheet
                  ? `No calculated fields used in '${selectedWorksheet.name}'.`
                  : 'No calculated fields match your search.'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Full-Width Data Tables Card ── */}
      <div
        className="rounded-2xl border flex flex-col shadow-sm overflow-hidden"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        {/* Card Header */}
        <div
          className="p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0"
          style={{ borderColor: 'var(--color-border-primary)' }}
        >
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-500" />
            <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Data Tables & Schema Preview ({filteredTables.length})
            </h2>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search data tables or columns..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
        </div>

        {/* Card Body - List of Tables with Live Data Previews */}
        <div className="p-4 space-y-4 max-h-[560px] overflow-y-auto">
          {filteredTables.map((tbl) => (
            <div
              key={tbl.tableName}
              className="rounded-xl border overflow-hidden shadow-xs"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              {/* Table Meta Bar */}
              <div
                className="px-4 py-3 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <h3 className="font-bold text-xs" style={{ color: 'var(--color-text-primary)' }}>
                    {tbl.displayName}
                  </h3>
                  <span className="text-[10px] text-gray-400 font-mono">({tbl.dataSource})</span>
                </div>
                <div className="text-[11px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>{tbl.rowCount.toLocaleString()}</strong> rows ×{' '}
                  <strong style={{ color: 'var(--color-text-primary)' }}>{tbl.columns.length}</strong> columns
                </div>
              </div>

              {/* Data Preview Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className="border-b"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      {tbl.columns.map((col, idx) => (
                        <th
                          key={idx}
                          className="px-4 py-2.5 font-bold uppercase tracking-wider text-[10px] whitespace-nowrap"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          <div>{col.name}</div>
                          <span className="text-[9px] font-mono text-gray-400 font-normal">
                            {col.type}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    {tbl.sampleRows.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="hover:bg-opacity-50 transition-colors"
                        style={{ backgroundColor: rowIdx % 2 === 0 ? 'transparent' : 'var(--color-bg-tertiary)' }}
                      >
                        {tbl.columns.map((col, colIdx) => (
                          <td
                            key={colIdx}
                            className="px-4 py-2 whitespace-nowrap font-mono text-[11px]"
                            style={{ color: 'var(--color-text-primary)' }}
                          >
                            {row[col.name] !== undefined && row[col.name] !== null
                              ? String(row[col.name])
                              : <span className="text-gray-400 italic">null</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div
                className="px-4 py-2 border-t text-[11px] text-center font-medium"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                Showing 5 of {tbl.rowCount.toLocaleString()} sample rows
              </div>
            </div>
          ))}
          {filteredTables.length === 0 && (
            <div className="text-center py-10 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              No data tables match your search query.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
