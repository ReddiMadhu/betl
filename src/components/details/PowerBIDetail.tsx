import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Layout,
  Grid,
  Database,
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Calendar,
  User,
  Calculator,
  Network,
  Target,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';
import { POWERBI_DETAIL_DATA } from '../../data/powerbiDetailData';
import type { PageDetail, PowerBIDetailData } from '../../data/powerbiDetailData';

/* ─────────────────────────────────────────────────────────
 * Page 1: Data Understanding - COMMAND CENTER DASHBOARD
 * (Power BI Semantic Model & Report Deep Inspection)
 *
 * Modeled after tb-bi migration-wizard Page1DataUnderstanding:
 * - Executive summary KPI bar (Report Pages, Visuals, Semantic Tables, DAX Measures, KPIs Tracked)
 * - Report Pages / Visuals card with fields, measures, and visual containers
 * - DAX Measures card with DAX formula inspector and page filter sync
 * - Authoritative Extracted KPI Inventory with evidence & calculation mapping
 * - Full-width Semantic Model Tables card with live multi-row preview & relationships
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

export default function PowerBIDetail({ asset, onBack }: Props) {
  const metadata: PowerBIDetailData = useMemo(() => {
    return POWERBI_DETAIL_DATA[asset.id] ?? {
      summary: { totalPages: 1, totalVisuals: 0, totalTables: 0, totalDAXMeasures: 0, totalKpis: 0 },
      kpis: [],
      pages: [],
      daxMeasures: [],
      tables: [],
    };
  }, [asset.id]);

  const [pageSearch, setPageSearch] = useState('');
  const [measureSearch, setMeasureSearch] = useState('');
  const [tableSearch, setTableSearch] = useState('');
  const [kpiSearch, setKpiSearch] = useState('');

  const [selectedPage, setSelectedPage] = useState<PageDetail | null>(null);
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

  // Filter pages
  const filteredPages = useMemo(() => {
    if (!pageSearch.trim()) return metadata.pages;
    const q = pageSearch.toLowerCase();
    return metadata.pages.filter(
      (pg) =>
        pg.name.toLowerCase().includes(q) ||
        pg.visualType.toLowerCase().includes(q) ||
        pg.dimensions.some((d) => d.toLowerCase().includes(q))
    );
  }, [metadata.pages, pageSearch]);

  // Filter measures
  const filteredMeasures = useMemo(() => {
    let list = metadata.daxMeasures;

    if (selectedPage) {
      list = list.filter((m) => m.usedInPages.includes(selectedPage.name));
    }

    if (measureSearch.trim()) {
      const q = measureSearch.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.expression.toLowerCase().includes(q) ||
          m.homeTable.toLowerCase().includes(q)
      );
    }

    return list;
  }, [metadata.daxMeasures, selectedPage, measureSearch]);

  // Filter authoritative KPIs
  const filteredKpis = useMemo(() => {
    const list = metadata.kpis ?? [];
    if (!kpiSearch.trim()) return list;
    const q = kpiSearch.toLowerCase();
    return list.filter(
      (k) =>
        k.name.toLowerCase().includes(q) ||
        k.evidence.toLowerCase().includes(q) ||
        (k.logic && k.logic.toLowerCase().includes(q)) ||
        (k.definition && k.definition.toLowerCase().includes(q))
    );
  }, [metadata.kpis, kpiSearch]);

  // Filter tables
  const filteredTables = useMemo(() => {
    if (!tableSearch.trim()) return metadata.tables;
    const q = tableSearch.toLowerCase();
    return metadata.tables.filter(
      (t) =>
        t.displayName.toLowerCase().includes(q) ||
        t.source.toLowerCase().includes(q) ||
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
                  src={TECHNOLOGY_LOGOS['Power BI']}
                  alt="Power BI"
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
                      backgroundColor: 'rgba(242, 200, 17, 0.15)',
                      borderColor: 'rgba(242, 200, 17, 0.4)',
                      color: '#B48400',
                    }}
                  >
                    Power BI Report & Semantic Model
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
                  Source Dashboard Exploration — Complete inspection of report pages, DAX measures, and data model tables
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  <span className="flex items-center gap-1.5">
                    <User size={13} /> {asset.owner || 'Author: Rachel Davies'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> Last Refresh: Today, 04:30 AM
                  </span>
                  <span>•</span>
                  <span>Storage: Import Mode</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Executive Summary Bar (5 KPI Cards from Page 1 Command Center) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Report Pages Card */}
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
              {metadata.summary.totalPages}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Report Pages
            </div>
          </div>
        </div>

        {/* Visuals Card */}
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
              {metadata.summary.totalVisuals}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              Visual Containers
            </div>
          </div>
        </div>

        {/* Semantic Model Tables Card */}
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
              Semantic Tables
            </div>
          </div>
        </div>

        {/* DAX Measures Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Calculator className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalDAXMeasures}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              DAX Measures
            </div>
          </div>
        </div>

        {/* KPIs Tracked Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex items-center gap-3.5 shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              {metadata.summary.totalKpis ?? metadata.kpis?.length ?? asset.kpiCount ?? 0}
            </div>
            <div className="text-xs font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
              KPIs Tracked
            </div>
          </div>
        </div>
      </div>

      {/* ── 2-Column Grid Layout: Pages/Visuals & DAX Measures ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Pages & Visuals Card */}
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
                Report Pages & Visuals ({filteredPages.length})
              </h2>
              <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
                Click page to filter DAX
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search report pages or visual types..."
                value={pageSearch}
                onChange={(e) => setPageSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          {/* Card Body - Scrollable list of Pages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredPages.map((pg) => {
              const isSelected = selectedPage?.id === pg.id;
              return (
                <div
                  key={pg.id}
                  className="rounded-xl border transition-all cursor-pointer overflow-hidden"
                  style={{
                    backgroundColor: isSelected
                      ? 'color-mix(in srgb, #3B82F6 10%, var(--color-bg-elevated))'
                      : 'var(--color-surface)',
                    borderColor: isSelected ? '#3B82F6' : 'var(--color-border-subtle)',
                    boxShadow: isSelected ? '0 0 0 1px #3B82F6' : 'none',
                  }}
                  onClick={() => setSelectedPage(isSelected ? null : pg)}
                >
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs truncate" style={{ color: 'var(--color-text-primary)' }}>
                          {pg.name}
                        </h3>
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                          style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            borderColor: 'rgba(59, 130, 246, 0.25)',
                            color: '#3B82F6',
                          }}
                        >
                          {pg.visualType}
                        </span>
                      </div>
                      <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        {pg.dimensions.length} Fields • {pg.measures.length} DAX Measures
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
                        {/* Fields list */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                            Referenced Columns
                          </span>
                          <div
                            className="max-h-24 overflow-y-auto rounded-lg p-1.5 space-y-1 border"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            {pg.dimensions.map((d, i) => (
                              <div key={i} className="truncate pl-1.5 border-l-2 border-amber-400 text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                                {d}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Measures list */}
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                            Explicit DAX Measures
                          </span>
                          <div
                            className="max-h-24 overflow-y-auto rounded-lg p-1.5 space-y-1 border"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            {pg.measures.map((m, i) => (
                              <div key={i} className="truncate pl-1.5 border-l-2 border-emerald-500 text-[11px] font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                [{m.name}] ★
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Visual Slots */}
                      <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                          Visual Bindings
                        </span>
                        <div className="p-2 rounded border space-y-1 text-[11px]" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                          <div>
                            <span className="font-bold text-[9px] uppercase text-gray-400">Values: </span>
                            <span style={{ color: 'var(--color-text-primary)' }}>{pg.visualSlots.values}</span>
                          </div>
                          <div>
                            <span className="font-bold text-[9px] uppercase text-gray-400">Axes/Slices: </span>
                            <span style={{ color: 'var(--color-text-primary)' }}>{pg.visualSlots.axes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: DAX Measures Card */}
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
                <Calculator className="w-5 h-5 text-emerald-500" />
                DAX Measures ({filteredMeasures.length})
              </h2>
              {selectedPage && (
                <div
                  className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px]"
                  style={{
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderColor: 'rgba(59, 130, 246, 0.3)',
                    color: '#3B82F6',
                  }}
                >
                  <span>Filtered by: {selectedPage.name}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPage(null)}
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
                placeholder="Search DAX measures or syntax..."
                value={measureSearch}
                onChange={(e) => setMeasureSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          {/* Card Body - Scrollable list of DAX Measures */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filteredMeasures.map((m) => {
              const isExpanded = expandedFormulas.has(m.id);
              const isCopied = copiedId === m.id;
              return (
                <div
                  key={m.id}
                  className="rounded-xl border overflow-hidden transition-all"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: isExpanded ? '#10B981' : 'var(--color-border-subtle)',
                  }}
                >
                  <div
                    className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-opacity-80"
                    onClick={() => toggleFormula(m.id)}
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-xs truncate" style={{ color: 'var(--color-text-primary)' }}>
                          [{m.name}]
                        </h3>
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        >
                          {m.homeTable}
                        </span>
                        <span className="text-[10px] text-gray-400 font-mono">
                          Format: {m.formatString}
                        </span>
                      </div>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                        Bound in {m.usedInPages.length} report page{m.usedInPages.length > 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {/* Expanded DAX Formula Box */}
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
                          DAX Calculation Formula
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copyFormula(m.expression, m.id);
                          }}
                          className="flex items-center gap-1 text-[11px] font-semibold cursor-pointer hover:opacity-80 px-2 py-0.5 rounded border"
                          style={{
                            borderColor: 'var(--color-border-primary)',
                            color: isCopied ? '#22C55E' : 'var(--color-text-secondary)',
                          }}
                        >
                          {isCopied ? <Check size={12} /> : <Copy size={12} />}
                          <span>{isCopied ? 'Copied' : 'Copy DAX'}</span>
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
                        <code>{m.expression}</code>
                      </pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Extracted KPI Inventory & Evidence Mapping Card ── */}
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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4 text-amber-500" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                Extracted KPIs & Evidence Mapping ({filteredKpis.length})
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                Authoritative business metrics with source report lineage and DAX calculation logic
              </p>
            </div>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search KPIs, evidence, or formulas..."
              value={kpiSearch}
              onChange={(e) => setKpiSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>
        </div>

        {/* Card Body - Grid of KPI Cards */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto">
          {filteredKpis.map((kpi, idx) => (
            <div
              key={kpi.id || idx}
              className="p-3.5 rounded-xl border transition-all hover:border-amber-500/40 flex flex-col justify-between gap-2.5 shadow-xs"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-subtle)',
              }}
            >
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/20">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xs leading-snug" style={{ color: 'var(--color-text-primary)' }}>
                    {kpi.name}
                  </h3>
                  {kpi.definition && (
                    <p className="text-[11px] mt-1 line-clamp-2" style={{ color: 'var(--color-text-tertiary)' }}>
                      {kpi.definition}
                    </p>
                  )}
                </div>
              </div>

              <div
                className="pt-2 border-t flex flex-col gap-1.5 text-[11px]"
                style={{ borderColor: 'var(--color-border-subtle)' }}
              >
                {kpi.logic && (
                  <div className="flex items-start gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500 shrink-0 mt-0.5">
                      Logic:
                    </span>
                    <span className="font-mono text-[10px] truncate" style={{ color: 'var(--color-text-secondary)' }} title={kpi.logic}>
                      {kpi.logic}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 shrink-0">
                    Evidence:
                  </span>
                  <span
                    className="font-mono text-[10px] truncate px-1.5 py-0.5 rounded border"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor: 'var(--color-border-subtle)',
                      color: 'var(--color-text-secondary)',
                    }}
                    title={kpi.evidence}
                  >
                    {kpi.evidence}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {filteredKpis.length === 0 && (
            <div className="col-span-full text-center py-8 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
              No KPIs match your search query.
            </div>
          )}
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
              Semantic Model Tables & Schema Preview ({filteredTables.length})
            </h2>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search model tables or columns..."
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
                  <span className="text-[10px] text-gray-400 font-mono">({tbl.source})</span>
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

              {/* Relationships Footer */}
              <div
                className="px-4 py-2.5 border-t text-[11px] flex flex-wrap items-center justify-between gap-2"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <div className="flex items-center gap-1.5 flex-wrap">
                  <Network size={12} className="text-blue-500" />
                  <span className="font-semibold text-gray-400">Relationships:</span>
                  {tbl.relationships.map((rel, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-1.5 py-0.5 rounded border text-[10px] font-mono"
                      style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
                    >
                      {rel}
                    </span>
                  ))}
                </div>
                <div>Showing 5 of {tbl.rowCount.toLocaleString()} sample rows</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
