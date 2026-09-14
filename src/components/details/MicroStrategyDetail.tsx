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
  Table,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';
import {
  mstrObjects,
  mstrCalculations,
  mstrVisualConversions,
  mstrSampleDataRows,
} from '../../data/mstrTableauData';

/* ─────────────────────────────────────────────────────────
 * MicroStrategyDetail — P&C Claims Dossier Deep Inspection
 *
 * Modeled directly on the unified Assessment design language
 * (matching TableauDetail.tsx and PowerBIDetail.tsx):
 * - Executive Summary Bar (4 KPI Cards)
 * - 2-Column Grid: Worksheets / Charts & Calculated Metrics
 * - Full-Width Claims Semantic Cube & Live Data Preview
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

export default function MicroStrategyDetail({ asset, onBack }: Props) {
  const [worksheetSearch, setWorksheetSearch] = useState('');
  const [calcFieldSearch, setCalcFieldSearch] = useState('');
  const [selectedWorksheetId, setSelectedWorksheetId] = useState<string | null>(null);
  const [expandedFormulas, setExpandedFormulas] = useState<Set<string>>(new Set(['calc-1']));
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
    if (!worksheetSearch.trim()) return mstrVisualConversions;
    const q = worksheetSearch.toLowerCase();
    return mstrVisualConversions.filter(
      (ws) =>
        ws.worksheetName.toLowerCase().includes(q) ||
        ws.chartType.toLowerCase().includes(q) ||
        ws.mstrVisualType?.toLowerCase().includes(q) ||
        ws.mstr?.columns?.some((c: string) => c.toLowerCase().includes(q)) ||
        ws.mstr?.rows?.some((r: string) => r.toLowerCase().includes(q)),
    );
  }, [worksheetSearch]);

  const selectedWorksheet = useMemo(() => {
    if (!selectedWorksheetId) return null;
    return mstrVisualConversions.find((w) => w.id === selectedWorksheetId) ?? null;
  }, [selectedWorksheetId]);

  // Filter calculations
  const filteredCalculations = useMemo(() => {
    let list = mstrCalculations;

    // Filter by selected worksheet if one is selected and has metrics
    if (selectedWorksheet?.mstr?.metrics && selectedWorksheet.mstr.metrics.length > 0) {
      const metricsInSheet = selectedWorksheet.mstr.metrics;
      const filtered = list.filter((c) =>
        metricsInSheet.some(
          (m: string) =>
            m.toLowerCase().includes(c.name.toLowerCase()) ||
            c.name.toLowerCase().includes(m.toLowerCase()),
        ),
      );
      if (filtered.length > 0) {
        list = filtered;
      }
    }

    if (calcFieldSearch.trim()) {
      const q = calcFieldSearch.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.sourceFormula.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.formulaType.toLowerCase().includes(q),
      );
    }

    return list;
  }, [selectedWorksheet, calcFieldSearch]);

  // Attributes from mstrObjects
  const attributes = useMemo(
    () => mstrObjects.filter((o) => o.type_name === 'attribute'),
    [],
  );

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
                  src={TECHNOLOGY_LOGOS.MicroStrategy}
                  alt="MicroStrategy"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {asset.name}
                  </h1>
                  <span
                    className="text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider"
                    style={{
                      backgroundColor: 'rgba(217, 35, 44, 0.1)',
                      borderColor: 'rgba(217, 35, 44, 0.3)',
                      color: '#D9232C',
                    }}
                  >
                    MicroStrategy Dossier
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
                <div
                  className="flex items-center gap-4 mt-2 text-xs"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <span className="flex items-center gap-1.5">
                    <User size={13} /> {asset.owner || 'Commercial Ops'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> Last Updated: {asset.lastUpdated || '2026-08-20'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Database size={13} /> Source Cube: Claims
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Executive Summary Bar (4 KPI Cards matching TableauDetail design) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Dossier Pages Card */}
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
            <div
              className="text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              5
            </div>
            <div
              className="text-xs font-semibold"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Dossier Pages
            </div>
          </div>
        </div>

        {/* Worksheets / Charts Card */}
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
            <div
              className="text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {mstrVisualConversions.length}
            </div>
            <div
              className="text-xs font-semibold"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Worksheets / Charts
            </div>
          </div>
        </div>

        {/* Semantic Cube Card */}
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
            <div
              className="text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              1
            </div>
            <div
              className="text-xs font-semibold"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Claims Semantic Cube
            </div>
          </div>
        </div>

        {/* Calculated Metrics Card */}
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
            <div
              className="text-2xl font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {mstrCalculations.length}
            </div>
            <div
              className="text-xs font-semibold"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Calculated Metrics
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
              <h2
                className="text-base font-bold flex items-center gap-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <Grid className="w-5 h-5 text-blue-500" />
                Worksheets / Charts ({filteredWorksheets.length})
              </h2>
              <span
                className="text-[11px] font-medium"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                Click card to inspect shelves
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
              const isSelected = selectedWorksheetId === ws.id;
              const columns = ws.mstr?.columns || [];
              const rows = ws.mstr?.rows || [];
              const metrics = ws.mstr?.metrics || [];

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
                  onClick={() => setSelectedWorksheetId(isSelected ? null : ws.id)}
                >
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <h3
                          className="font-bold text-xs truncate"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {ws.worksheetName}
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
                      <p
                        className="text-[11px] mt-0.5"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        {columns.length + rows.length} Attributes • {metrics.length} Metrics
                        {ws.pageName ? ` • ${ws.pageName}` : ''}
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
                        {/* Attributes Shelf */}
                        <div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider block mb-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            Attributes / Dimensions
                          </span>
                          <div
                            className="max-h-24 overflow-y-auto rounded-lg p-1.5 space-y-1 border"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            {[...columns, ...rows].length > 0 ? (
                              [...columns, ...rows].map((d: string, i: number) => (
                                <div
                                  key={i}
                                  className="truncate pl-1.5 border-l-2 border-purple-400 text-[11px]"
                                  style={{ color: 'var(--color-text-secondary)' }}
                                >
                                  {d}
                                </div>
                              ))
                            ) : (
                              <div
                                className="text-[11px] italic"
                                style={{ color: 'var(--color-text-tertiary)' }}
                              >
                                None
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Metrics Shelf */}
                        <div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider block mb-1"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            Metrics
                          </span>
                          <div
                            className="max-h-24 overflow-y-auto rounded-lg p-1.5 space-y-1 border"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            {metrics.length > 0 ? (
                              metrics.map((m: string, i: number) => (
                                <div
                                  key={i}
                                  className="truncate pl-1.5 border-l-2 border-emerald-500 font-medium text-[11px]"
                                  style={{ color: 'var(--color-text-secondary)' }}
                                >
                                  {m}
                                </div>
                              ))
                            ) : (
                              <div
                                className="text-[11px] italic"
                                style={{ color: 'var(--color-text-tertiary)' }}
                              >
                                None
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* MicroStrategy Shelves */}
                      <div
                        className="pt-2 border-t"
                        style={{ borderColor: 'var(--color-border-subtle)' }}
                      >
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider block mb-1"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          MicroStrategy Shelves
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div
                            className="p-1.5 rounded border truncate"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                            title={rows.join(', ') || 'None'}
                          >
                            <span className="font-bold text-[9px] uppercase text-gray-400 block">
                              Rows Shelf
                            </span>
                            <span style={{ color: 'var(--color-text-primary)' }}>
                              {rows.join(', ') || 'None'}
                            </span>
                          </div>
                          <div
                            className="p-1.5 rounded border truncate"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                            title={columns.join(', ') || 'None'}
                          >
                            <span className="font-bold text-[9px] uppercase text-gray-400 block">
                              Columns Shelf
                            </span>
                            <span style={{ color: 'var(--color-text-primary)' }}>
                              {columns.join(', ') || 'None'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredWorksheets.length === 0 && (
              <div
                className="text-center py-10 text-xs"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                No worksheets match your query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Calculated Metrics Card (MicroStrategy Formulas Only — No Target Migration Formulas) */}
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
              <h2
                className="text-base font-bold flex items-center gap-2"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <Code className="w-5 h-5 text-emerald-500" />
                Calculated Metrics ({filteredCalculations.length})
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
                  <span>Filtered by sheet</span>
                  <button
                    type="button"
                    onClick={() => setSelectedWorksheetId(null)}
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
                placeholder="Search calculated metrics or formulas..."
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
            {filteredCalculations.map((cf) => {
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
                        <h3
                          className="font-bold text-xs truncate"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {cf.name}
                        </h3>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            cf.category === 'STANDARD'
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          }`}
                        >
                          {cf.category}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          [{cf.formulaType}]
                        </span>
                      </div>
                      <p
                        className="text-[10px] mt-0.5"
                        style={{ color: 'var(--color-text-tertiary)' }}
                      >
                        MicroStrategy Metric • {cf.datasource}
                      </p>
                    </div>
                    <div className="shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded Formula Box (MicroStrategy Formula Only) */}
                  {isExpanded && (
                    <div
                      className="px-3.5 py-3 border-t text-xs space-y-2"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider"
                          style={{ color: 'var(--color-text-tertiary)' }}
                        >
                          MicroStrategy Formula Definition
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyFormula(cf.sourceFormula, cf.id);
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
                          borderColor: 'var(--color-border-subtle)',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        <code>{cf.sourceFormula}</code>
                      </pre>

                      {/* Definition Chain */}
                      {cf.definitionChain && cf.definitionChain.length > 0 && (
                        <div
                          className="pt-2 border-t space-y-1.5"
                          style={{ borderColor: 'var(--color-border-subtle)' }}
                        >
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider block"
                            style={{ color: 'var(--color-text-tertiary)' }}
                          >
                            Underlying Fact Bindings:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {cf.definitionChain.map((dep, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded border text-[11px] font-mono bg-[var(--color-surface)] border-[var(--color-border-subtle)] text-[var(--color-text-secondary)]"
                                title={dep.formula}
                              >
                                {dep.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {filteredCalculations.length === 0 && (
              <div
                className="text-center py-10 text-xs"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                No calculations match your query.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Full-Width Card: Claims Semantic Cube & Data Preview ── */}
      <div
        className="rounded-2xl border p-6 theme-transition shadow-sm"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
              <Table className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2
                className="text-base font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Claims Semantic Cube — Schema &amp; Data Preview
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Multidimensional fact and attribute bindings supporting P&amp;C claims reporting
              </p>
            </div>
          </div>

          <span
            className="text-xs font-semibold px-3 py-1 rounded-full border self-start sm:self-auto"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              borderColor: 'var(--color-border-subtle)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            1,275 Records • 12 Attributes • 7 Fact Measures
          </span>
        </div>

        {/* Live Data Preview Table */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-subtle)]">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[var(--color-bg-tertiary)] text-[11px] uppercase text-gray-400 border-b border-[var(--color-border-subtle)]">
              <tr>
                <th className="p-3">Claim ID</th>
                <th className="p-3">Policy ID</th>
                <th className="p-3">Line of Business</th>
                <th className="p-3">Coverage</th>
                <th className="p-3">Claim Status</th>
                <th className="p-3 text-right">Paid Amount</th>
                <th className="p-3 text-right">Reserve Amount</th>
                <th className="p-3 text-right">Total Incurred</th>
                <th className="p-3">State</th>
                <th className="p-3">Adjuster</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-subtle)] text-[var(--color-text-primary)]">
              {mstrSampleDataRows.slice(0, 8).map((rawRow, idx) => {
                const row = rawRow as Record<string, any>;
                const claimId = row['Claim ID'] || row.claim_id || '-';
                const policyId = row['Policy ID'] || row.policy_id || '-';
                const lob = row['Line of Business'] || row.line_of_business || '-';
                const coverage = row['Coverage'] || row.coverage || '-';
                const status = row['Claim Status'] || row.claim_status || 'Closed';
                const paid = row['Paid Amount USD'] || (typeof row.paid_amount === 'number' ? `$${row.paid_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.00');
                const reserve = row['Reserve Amount USD'] || (typeof row.reserve_amount === 'number' ? `$${row.reserve_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.00');
                const total = row['Total Incurred USD'] || (typeof row.total_incurred === 'number' ? `$${row.total_incurred.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : '$0.00');
                const state = row['State Name'] || row.state_name || '-';
                const adjuster = row['Adjuster Name'] || row.adjuster_name || '-';

                return (
                  <tr key={idx} className="hover:bg-[var(--color-surface)] transition-colors">
                    <td className="p-3 font-bold text-blue-400">{claimId}</td>
                    <td className="p-3 text-gray-300">{policyId}</td>
                    <td className="p-3 text-gray-300">{lob}</td>
                    <td className="p-3 text-gray-300">{coverage}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          status === 'Closed'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold text-emerald-400">{paid}</td>
                    <td className="p-3 text-right font-bold text-amber-400">{reserve}</td>
                    <td className="p-3 text-right font-bold text-blue-400">{total}</td>
                    <td className="p-3 text-gray-300">{state}</td>
                    <td className="p-3 text-gray-300">{adjuster}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
