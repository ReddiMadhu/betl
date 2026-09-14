import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, CheckCircle, AlertTriangle,
  Search, ChevronRight, ChevronDown, Copy, Check,
  LayoutDashboard, Code2, FileDown, Database, Layers, BarChart3,
  FileSpreadsheet, BookOpen, Calculator, LineChart, Table as TableIcon,
  X, FolderTree, FileCode, CheckCircle2, PieChart,
} from 'lucide-react';
import {
  mstrJobSummary, mstrObjects, mstrWorksheets, mstrDashboards,
  mstrCalculations, mstrSampleDataRows, mstrArtifacts, mstrVisualConversions,
} from '../../data/mstrTableauData';

/* ─────────────────────────────────────────────────────────
 * MstrTableauWorkspace — 4-Tab Workspace
 *   Replicates the ms-tb frontend inch-by-inch:
 *   Tab 1: Object Explorer (Objects.tsx)
 *   Tab 2: Visual Conversion (DashboardInventory.tsx)
 *   Tab 3: Logic Explorer (LogicExplorer.tsx)
 *   Tab 4: Export Center (ExportCenter.tsx)
 * ───────────────────────────────────────────────────────── */

const TABS = [
  { id: 'objects', label: 'Object Explorer', icon: Layers },
  { id: 'visuals', label: 'Visual Conversion', icon: LayoutDashboard },
  { id: 'logic', label: 'Logic Explorer', icon: Code2 },
  { id: 'export', label: 'Export Center', icon: FileDown },
] as const;

type TabId = typeof TABS[number]['id'];

interface Props {
  onBack?: () => void;
  onFinish?: () => void;
}

const DOSSIER_PAGES = [
  { id: 'all', label: 'All Pages', count: 45 },
  { id: 'Executive Summary', label: 'Executive Summary', count: 16 },
  { id: 'Financial & Severity View', label: 'Financial & Severity', count: 10 },
  { id: 'Fraud & Litigation View', label: 'Fraud & Litigation', count: 7 },
  { id: 'Geography View', label: 'Geography', count: 7 },
  { id: 'Adjuster Performance View', label: 'Adjuster Performance', count: 5 },
];

export default function MstrTableauWorkspace({ onBack, onFinish }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('visuals');

  // Objects state
  const [wsSearch, setWsSearch] = useState('');
  const [wsPageFilter, setWsPageFilter] = useState('all');
  const [calcSearch, setCalcSearch] = useState('');
  const [expandedWs, setExpandedWs] = useState<Set<string>>(new Set());
  const [selectedWs, setSelectedWs] = useState<string | null>(null);
  const [expandedCalcs, setExpandedCalcs] = useState<Set<string>>(new Set());

  // Logic Explorer state
  const [expandedLogicIds, setExpandedLogicIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Visual Conversion state
  const [expandedVisualIds, setExpandedVisualIds] = useState<Set<string>>(new Set(['vis-W62', 'vis-W93']));
  const [expandedSpecId, setExpandedSpecId] = useState<string | null>(null);
  const [visualSearch, setVisualSearch] = useState('');
  const [visualPageFilter, setVisualPageFilter] = useState('all');
  const [visualTypeFilter, setVisualTypeFilter] = useState('all');

  /* ── Derived data ── */
  const dossiers = useMemo(() => mstrObjects.filter(o => o.type_name === 'dossier'), []);
  const cubes = useMemo(() => mstrObjects.filter(o => o.type_name === 'cube'), []);
  const uniqueAttributes = useMemo(() => mstrObjects.filter(o => o.type_name === 'attribute'), []);
  const baseMeasures = useMemo(() =>
    mstrObjects.filter(o => o.type_name === 'metric' && !o.expression_text), []);
  const derivedMetrics = useMemo(() =>
    mstrObjects.filter(o => o.type_name === 'metric' && !!o.expression_text), []);

  const mstrPagesCount = useMemo(() => {
    if (mstrDashboards.length > 0) return mstrDashboards.length;
    return 5;
  }, []);

  const cubeName = cubes[0]?.name || 'Claims';

  const filteredWs = useMemo(() => {
    let list = mstrWorksheets;
    if (wsPageFilter !== 'all') {
      list = list.filter(w => w.page === wsPageFilter);
    }
    if (wsSearch.trim()) {
      const q = wsSearch.toLowerCase();
      list = list.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.type.toLowerCase().includes(q) ||
        (w.viz_key && w.viz_key.toLowerCase().includes(q))
      );
    }
    return list;
  }, [wsSearch, wsPageFilter]);

  const selectedVisual = mstrWorksheets.find(w => w.name === selectedWs);

  const filteredCalcs = useMemo(() => {
    let list = derivedMetrics;
    if (selectedWs && selectedVisual) {
      const usedSet = new Set(selectedVisual.used_calculated_fields.map(f => f.replace(/^\[|\]$/g, '')));
      list = list.filter(cf => usedSet.has(cf.name));
    }
    if (calcSearch.trim()) {
      const q = calcSearch.toLowerCase();
      list = list.filter(cf => cf.name.toLowerCase().includes(q));
    }
    return list;
  }, [selectedWs, selectedVisual, calcSearch, derivedMetrics]);

  // Visuals filtering
  const filteredVisuals = useMemo(() => {
    let list = mstrVisualConversions;
    if (visualPageFilter !== 'all') {
      list = list.filter(v => v.page === visualPageFilter);
    }
    if (visualTypeFilter !== 'all') {
      list = list.filter(v => {
        if (visualTypeFilter === 'kpi') return v.mstrVisualType === 'kpi' || v.chartType.includes('KPI');
        if (visualTypeFilter === 'bar') return v.mstrVisualType === 'bar_chart' || v.chartType.includes('Bar');
        if (visualTypeFilter === 'combo') return v.mstrVisualType === 'combo_chart' || v.chartType.includes('Combination');
        if (visualTypeFilter === 'table') return v.mstrVisualType === 'grid' || v.chartType.includes('Matrix') || v.chartType.includes('Table');
        if (visualTypeFilter === 'donut') return v.mstrVisualType === 'donut_chart' || v.chartType.includes('Pie') || v.chartType.includes('Donut');
        if (visualTypeFilter === 'bubble') return v.mstrVisualType === 'bubble_chart' || v.chartType.includes('Bubble');
        if (visualTypeFilter === 'line') return v.mstrVisualType === 'line_chart' || v.chartType.includes('Line');
        return true;
      });
    }
    if (visualSearch.trim()) {
      const q = visualSearch.toLowerCase();
      list = list.filter(v =>
        v.worksheetName.toLowerCase().includes(q) ||
        v.chartType.toLowerCase().includes(q) ||
        (v.vizKey && v.vizKey.toLowerCase().includes(q)) ||
        (v.mstr.attributes && v.mstr.attributes.some(a => a.toLowerCase().includes(q))) ||
        (v.mstr.metrics && v.mstr.metrics.some(m => m.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [visualSearch, visualPageFilter, visualTypeFilter]);

  const handleSelectWs = (name: string) => {
    setSelectedWs(prev => prev === name ? null : name);
    setExpandedWs(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const toggleCalcExpand = (name: string) => {
    setExpandedCalcs(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const toggleLogicCard = (id: string) => {
    setExpandedLogicIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleVisualCard = (id: string) => {
    setExpandedVisualIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const expandAllVisuals = () => {
    setExpandedVisualIds(new Set(filteredVisuals.map(v => v.id)));
  };

  const collapseAllVisuals = () => {
    setExpandedVisualIds(new Set());
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const chartTypeIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('bar')) return <BarChart3 size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />;
    if (t.includes('line')) return <LineChart size={16} style={{ color: '#3b82f6', flexShrink: 0 }} />;
    if (t.includes('pie') || t.includes('donut')) return <PieChart size={16} style={{ color: '#ec4899', flexShrink: 0 }} />;
    return <TableIcon size={16} style={{ color: '#f59e0b', flexShrink: 0 }} />;
  };

  const chartTypeBadgeColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('bar')) return { bg: 'rgba(251,78,11,0.1)', color: 'var(--color-accent)' };
    if (t.includes('line')) return { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6' };
    if (t.includes('pie') || t.includes('donut')) return { bg: 'rgba(236,72,153,0.1)', color: '#ec4899' };
    if (t.includes('kpi') || t.includes('text mark')) return { bg: 'rgba(16,185,129,0.1)', color: '#10b981' };
    return { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' };
  };

  const statusBadge = (status: 'VALID' | 'WARNING' | 'FAIL') =>
    status === 'VALID' ? { bg: '#10b98120', color: '#10b981', icon: <CheckCircle size={14} /> } :
    status === 'WARNING' ? { bg: '#f59e0b20', color: '#f59e0b', icon: <AlertTriangle size={14} /> } :
    { bg: '#ef444420', color: '#ef4444', icon: <X size={14} /> };

  const categoryBadge = (cat: string) =>
    cat === 'LOD' ? { bg: '#8b5cf620', color: '#8b5cf6' } :
    cat === 'CONDITIONAL' ? { bg: '#3b82f620', color: '#3b82f6' } :
    cat === 'TABLE_CALC' ? { bg: '#f59e0b20', color: '#f59e0b' } :
    { bg: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 pb-12">
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="p-2 rounded-lg border hover:opacity-80 cursor-pointer theme-transition"
              style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}>
              <ArrowLeft size={16} style={{ color: 'var(--color-text-secondary)' }} />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
              MicroStrategy → Tableau Migration Results
            </h1>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {mstrJobSummary.name} · {mstrJobSummary.mstrProjectName} · {mstrWorksheets.length} Visualizations across {mstrPagesCount} Chapters
            </p>
          </div>
        </div>
      </div>


      {/* ── Tab Bar ── */}
      <div className="flex items-center gap-1 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium cursor-pointer theme-transition border-b-2"
            style={{
              borderColor: activeTab === tab.id ? 'var(--color-accent)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
            }}>
            <tab.icon size={15} />
            {tab.label}
            {tab.id === 'visuals' && (
              <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full"
                style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
                {mstrVisualConversions.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>

          {/* ═══ TAB 1: OBJECT EXPLORER (mirrors Objects.tsx) ═══ */}
          {activeTab === 'objects' && (
            <div className="space-y-5">
              {/* KPI Cards row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { icon: <LayoutDashboard size={16} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />, label: 'MSTR Dossiers', value: dossiers.length },
                  { icon: <BookOpen size={16} style={{ color: '#3b82f6', flexShrink: 0 }} />, label: 'Dossier Chapters', value: mstrPagesCount },
                  { icon: <BarChart3 size={16} style={{ color: '#10b981', flexShrink: 0 }} />, label: 'MSTR Visualizations', value: mstrWorksheets.length },
                  { icon: <Calculator size={16} style={{ color: '#9B51E0', flexShrink: 0 }} />, label: 'Derived Metrics', value: derivedMetrics.length },
                  { icon: <Database size={16} style={{ color: '#3b82f6', flexShrink: 0 }} />, label: 'Cube Attrs & Measures', value: uniqueAttributes.length + baseMeasures.length },
                ].map(kpi => (
                  <div key={kpi.label} className="rounded-xl border p-3 theme-transition"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}>
                    <div className="flex items-center gap-1.5 mb-1">{kpi.icon}
                      <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>{kpi.label}</span>
                    </div>
                    <span className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{kpi.value}</span>
                  </div>
                ))}
              </div>

              {/* Two-column: Visualizations + Derived Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-4">
                {/* Left: MSTR Visualizations */}
                <div className="rounded-xl border theme-transition overflow-hidden"
                  style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}>
                  <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="flex items-center gap-2">
                      <BarChart3 size={15} style={{ color: 'var(--color-accent)' }} />
                      <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>MSTR Visualizations</h3>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
                      {filteredWs.length} of {mstrWorksheets.length}
                    </span>
                  </div>
                  <div className="p-3">
                    {/* Chapter filter tabs */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2.5 text-xs">
                      {DOSSIER_PAGES.map(p => (
                        <button
                          key={p.id}
                          onClick={() => setWsPageFilter(p.id)}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer transition-colors"
                          style={{
                            backgroundColor: wsPageFilter === p.id ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                            color: wsPageFilter === p.id ? '#FFFFFF' : 'var(--color-text-secondary)',
                          }}
                        >
                          {p.label} ({p.count})
                        </button>
                      ))}
                    </div>

                    <div className="relative mb-3">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-quaternary)' }} />
                      <input type="text" placeholder="Search across 45 visualizations by name, viz key, or chart type..." value={wsSearch} onChange={e => setWsSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-lg border text-xs theme-transition"
                        style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }} />
                    </div>
                    <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
                      {filteredWs.map(ws => {
                        const isSelected = selectedWs === ws.name;
                        const isExpanded = expandedWs.has(ws.name);
                        const badge = chartTypeBadgeColor(ws.type);
                        return (
                          <div key={ws.id || ws.name} onClick={() => handleSelectWs(ws.name)}
                            className="rounded-lg border p-3.5 cursor-pointer transition-all"
                            style={{
                              backgroundColor: isSelected ? 'var(--color-accent-muted)' : 'var(--color-bg-secondary)',
                              borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-border-subtle)',
                            }}>
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                {chartTypeIcon(ws.type)}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    {ws.viz_key && (
                                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-accent)' }}>
                                        {ws.viz_key}
                                      </span>
                                    )}
                                    <span className="text-[0.9375rem] font-bold break-words" style={{ color: 'var(--color-text-primary)' }}>{ws.name}</span>
                                  </div>
                                  <span className="text-[10px] block mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                                    {ws.page}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: badge.bg, color: badge.color }}>{ws.type}</span>
                                <ChevronRight size={14} style={{ color: 'var(--color-text-quaternary)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                              </div>
                            </div>
                            {isExpanded && (
                              <div className="mt-3 pt-3 border-t space-y-2" style={{ borderColor: 'var(--color-border-subtle)' }} onClick={e => e.stopPropagation()}>
                                <div>
                                  <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--color-text-tertiary)' }}>Axis & Shelf Layout (Rows / Cols)</span>
                                  <div className="flex flex-wrap gap-1.5 mt-1">
                                    {ws.columns.map((c, i) => <span key={`c-${i}`} className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>Col: {c}</span>)}
                                    {ws.rows.map((r, i) => <span key={`r-${i}`} className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: '#10b98120', color: '#10b981' }}>Row: {r}</span>)}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--color-text-tertiary)' }}>Dimensions</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {ws.dimensions.map(d => <span key={d} className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }}>{d}</span>)}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--color-text-tertiary)' }}>Measures</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {ws.measures.map(m => <span key={m} className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#3b82f610', color: '#3b82f6' }}>{m}</span>)}
                                  </div>
                                </div>
                                {ws.encodings.length > 0 && (
                                  <div>
                                    <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--color-text-tertiary)' }}>Encodings</span>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {ws.encodings.map((enc, i) => <span key={i} className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-tertiary)' }}>{enc.channel}: {enc.field_name}</span>)}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right: Derived Metrics */}
                <div className="rounded-xl border theme-transition overflow-hidden"
                  style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}>
                  <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="flex items-center gap-2">
                      <Calculator size={15} style={{ color: '#9B51E0' }} />
                      <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>MSTR Derived Metrics</h3>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#9B51E020', color: '#9B51E0' }}>{filteredCalcs.length}</span>
                  </div>
                  <div className="p-3">
                    <div className="relative mb-3">
                      <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-quaternary)' }} />
                      <input type="text" placeholder="Search derived metrics..." value={calcSearch} onChange={e => setCalcSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-lg border text-xs theme-transition"
                        style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-primary)' }} />
                    </div>
                    <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
                      {filteredCalcs.map(cf => {
                        const isExpanded = expandedCalcs.has(cf.name);
                        return (
                          <div key={cf.id} onClick={() => toggleCalcExpand(cf.name)}
                            className="rounded-lg border p-3 cursor-pointer transition-all"
                            style={{
                              backgroundColor: isExpanded ? 'rgba(155,81,224,0.08)' : 'var(--color-bg-secondary)',
                              borderColor: isExpanded ? '#9B51E0' : 'var(--color-border-subtle)',
                            }}>
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-bold break-words" style={{ color: 'var(--color-text-primary)' }}>{cf.name}</span>
                              <ChevronRight size={14} style={{ color: 'var(--color-text-quaternary)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                            </div>
                            {isExpanded && (
                              <div className="mt-2.5 pt-2.5 border-t space-y-2" style={{ borderColor: 'var(--color-border-subtle)' }} onClick={e => e.stopPropagation()}>
                                <div>
                                  <span className="text-[10px] font-bold uppercase block" style={{ color: 'var(--color-text-tertiary)' }}>MicroStrategy Formula</span>
                                  <pre className="text-[11px] font-mono p-2 rounded-lg mt-1 whitespace-pre-wrap break-all overflow-x-auto"
                                    style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)', color: '#9B51E0' }}>
                                    {cf.expression_text || '—'}
                                  </pre>
                                </div>
                                {cf.tableau_calc && (
                                  <div>
                                    <span className="text-[10px] font-bold uppercase block" style={{ color: 'var(--color-text-tertiary)' }}>Tableau Calculation</span>
                                    <pre className="text-[11px] font-mono p-2 rounded-lg mt-1 whitespace-pre-wrap break-all overflow-x-auto"
                                      style={{ backgroundColor: '#3b82f610', border: '1px solid #3b82f630', color: '#3b82f6' }}>
                                      {cf.tableau_calc}
                                    </pre>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Cube Inspector */}
              <div className="rounded-xl border p-5 theme-transition"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}>
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                  <div>
                    <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                      <Database size={18} style={{ color: '#3b82f6' }} /> MicroStrategy Intelligent Cube Inspector
                    </h3>
                    <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Interactive entity schema synthesized from cube dataset</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4">
                  <div className="rounded-lg p-4 border" style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-subtle)' }}>
                    <div className="text-[10px] font-bold uppercase mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Intelligent Cube Source</div>
                    <div className="flex items-center gap-3 p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-primary)', borderColor: 'var(--color-border-subtle)' }}>
                      <Database size={22} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                      <div>
                        <div className="text-[0.9375rem] font-bold" style={{ color: 'var(--color-text-primary)' }}>{cubeName}</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>MicroStrategy Cube Dataset</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg p-4 border flex flex-col justify-center" style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-subtle)' }}>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2 rounded-lg border text-center" style={{ backgroundColor: 'var(--color-bg-primary)', borderColor: 'var(--color-border-subtle)' }}>
                        <span className="text-[10px] font-semibold block" style={{ color: 'var(--color-text-tertiary)' }}>Cube Attrs & Measures</span>
                        <span className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>{uniqueAttributes.length + baseMeasures.length}</span>
                      </div>
                      <div className="p-2 rounded-lg border text-center" style={{ backgroundColor: 'var(--color-bg-primary)', borderColor: 'var(--color-border-subtle)' }}>
                        <span className="text-[10px] font-semibold block" style={{ color: 'var(--color-text-tertiary)' }}>Derived Metrics</span>
                        <span className="text-lg font-bold" style={{ color: '#9B51E0' }}>{derivedMetrics.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Data Preview Table */}
              <div className="rounded-xl border p-5 theme-transition"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}>
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
                  <div>
                    <h3 className="text-base font-bold flex items-center gap-2" style={{ color: 'var(--color-text-primary)' }}>
                      <FileSpreadsheet size={18} style={{ color: 'var(--color-accent)' }} /> Data Model Sample Data Preview
                    </h3>
                    <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Sample records preview ({mstrSampleDataRows.length} sample rows from {cubeName} dataset)</span>
                  </div>
                </div>
                <div className="rounded-lg border overflow-x-auto max-h-[420px]"
                  style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-subtle)' }}>
                  <table className="w-full text-xs" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ textAlign: 'left' }}>
                        {Object.keys(mstrSampleDataRows[0]).map(key => (
                          <th key={key} className="px-2.5 py-2 font-bold whitespace-nowrap sticky top-0 z-10"
                            style={{ color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-secondary)' }}>
                            {key}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mstrSampleDataRows.map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                          {Object.entries(row).map(([k, val], cIdx) => (
                            <td key={cIdx} className="px-2.5 py-2 whitespace-nowrap"
                              style={{ color: k.includes('USD') ? '#10b981' : k.includes('ID') ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
                              {String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══ TAB 2: VISUAL CONVERSION (mirrors DashboardInventory.tsx - ALL 45 VISUALS) ═══ */}
          {activeTab === 'visuals' && (
            <div className="space-y-4">
              {/* Page / Chapter Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {DOSSIER_PAGES.map(p => {
                  const isSelected = visualPageFilter === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setVisualPageFilter(p.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all whitespace-nowrap flex items-center gap-1.5"
                      style={{
                        backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
                        color: isSelected ? '#FFFFFF' : 'var(--color-text-secondary)',
                        border: `1px solid ${isSelected ? 'var(--color-accent)' : 'var(--color-border-primary)'}`,
                      }}
                    >
                      <span>{p.label}</span>
                      <span
                        className="px-1.5 py-0.2 rounded-full text-[10px]"
                        style={{
                          backgroundColor: isSelected ? 'rgba(255,255,255,0.25)' : 'var(--color-bg-secondary)',
                          color: isSelected ? '#FFFFFF' : 'var(--color-text-tertiary)',
                        }}
                      >
                        {p.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search & Type Controls Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="relative flex-1 min-w-[240px] max-w-md">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-quaternary)' }} />
                  <input
                    type="text"
                    placeholder="Search 45 worksheets by title, viz key, shelves, or metric..."
                    value={visualSearch}
                    onChange={e => setVisualSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border text-xs outline-none theme-transition"
                    style={{
                      backgroundColor: 'var(--color-bg-elevated)',
                      borderColor: 'var(--color-border-primary)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  {visualSearch && (
                    <button onClick={() => setVisualSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200">
                      ×
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                    Showing <strong>{filteredVisuals.length}</strong> of <strong>{mstrVisualConversions.length}</strong> worksheets
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={expandAllVisuals}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-secondary)' }}
                    >
                      Expand All
                    </button>
                    <button
                      onClick={collapseAllVisuals}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer hover:opacity-80"
                      style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)', color: 'var(--color-text-secondary)' }}
                    >
                      Collapse All
                    </button>
                  </div>
                </div>
              </div>

              {/* Chart Type Filter Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'All Mark Types', count: 45 },
                  { id: 'kpi', label: 'KPI Big Number', count: 25 },
                  { id: 'bar', label: 'Bar Charts', count: 12 },
                  { id: 'combo', label: 'Combo Charts', count: 3 },
                  { id: 'table', label: 'Matrix & Tables', count: 2 },
                  { id: 'donut', label: 'Donut / Pie', count: 1 },
                  { id: 'bubble', label: 'Bubble / Scatter', count: 1 },
                  { id: 'line', label: 'Line Trends', count: 1 },
                ].map(ct => {
                  const isSel = visualTypeFilter === ct.id;
                  return (
                    <button
                      key={ct.id}
                      onClick={() => setVisualTypeFilter(ct.id)}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium cursor-pointer transition-colors"
                      style={{
                        backgroundColor: isSel ? 'var(--color-accent-muted)' : 'var(--color-bg-secondary)',
                        color: isSel ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                        border: `1px solid ${isSel ? 'var(--color-accent)' : 'transparent'}`,
                      }}
                    >
                      {ct.label} ({ct.count})
                    </button>
                  );
                })}
              </div>

              {/* Visuals Accordion Cards List */}
              <div className="space-y-3">
                {filteredVisuals.map(card => {
                  const isExpanded = expandedVisualIds.has(card.id);
                  const isSpecOpen = expandedSpecId === card.id;

                  // Compute shelf summary for collapsed state
                  const shelfSummary = [
                    card.tableau.columnsShelf.length > 0 ? `Cols: ${card.tableau.columnsShelf.join(', ')}` : null,
                    card.tableau.rowsShelf.length > 0 ? `Rows: ${card.tableau.rowsShelf.join(', ')}` : null,
                    card.tableau.colorEncoding ? `Color: ${card.tableau.colorEncoding}` : null,
                    card.tableau.labelEncoding ? `Label: ${card.tableau.labelEncoding}` : null,
                  ].filter(Boolean).join(' · ');

                  const badge = chartTypeBadgeColor(card.chartType);

                  return (
                    <div
                      key={card.id}
                      className="rounded-xl border theme-transition overflow-hidden shadow-xs"
                      style={{
                        backgroundColor: 'var(--color-bg-elevated)',
                        borderColor: isExpanded ? 'var(--color-border-primary)' : 'var(--color-border-subtle)',
                      }}
                    >
                      {/* Accordion Card Header */}
                      <div
                        onClick={() => toggleVisualCard(card.id)}
                        className="px-4 py-3.5 flex items-center justify-between gap-3 cursor-pointer hover:opacity-95 transition-colors"
                        style={{ backgroundColor: 'var(--color-surface)' }}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span style={{ color: 'var(--color-text-quaternary)' }}>
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          </span>

                          <div className="flex items-center gap-2 flex-wrap min-w-0">
                            <span
                              className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded"
                              style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}
                            >
                              #{card.index}
                            </span>
                            {card.vizKey && (
                              <span
                                className="text-[11px] font-mono px-1.5 py-0.5 rounded"
                                style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}
                              >
                                {card.vizKey}
                              </span>
                            )}
                            <h4 className="text-sm font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                              {card.worksheetName}
                            </h4>
                            <span
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: badge.bg, color: badge.color }}
                            >
                              {card.chartType}
                            </span>
                            <span
                              className="text-[10px] px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }}
                            >
                              {card.page}
                            </span>
                          </div>

                          {!isExpanded && shelfSummary && (
                            <span className="text-[11px] truncate hidden md:inline-block max-w-[360px]" style={{ color: 'var(--color-text-quaternary)' }}>
                              {shelfSummary}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                            style={{ backgroundColor: '#10b98120', color: '#10b981' }}
                          >
                            <CheckCircle2 size={12} /> 100% Parity
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedSpecId(isSpecOpen ? null : card.id);
                              setExpandedVisualIds(prev => new Set(prev).add(card.id));
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border cursor-pointer transition-colors"
                            style={{
                              backgroundColor: isSpecOpen ? 'var(--color-accent-muted)' : 'var(--color-bg-secondary)',
                              borderColor: isSpecOpen ? 'var(--color-accent)' : 'var(--color-border-primary)',
                              color: isSpecOpen ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                            }}
                          >
                            <FileCode size={12} />
                            <span>XML Spec</span>
                          </button>
                        </div>
                      </div>

                      {/* Expanded Accordion Body */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t p-4 space-y-4"
                            style={{ borderColor: 'var(--color-border-subtle)' }}
                          >
                            {/* Dual-Column Side-by-Side Visual Comparison */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              {/* Left Column: MicroStrategy Bindings */}
                              <div
                                className="rounded-xl border p-4 space-y-3"
                                style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-subtle)' }}
                              >
                                <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                  <div className="flex items-center gap-2">
                                    <Layers size={14} style={{ color: '#9B51E0' }} />
                                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#9B51E0' }}>
                                      MicroStrategy Source Bindings
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-tertiary)' }}>
                                    Type: {card.mstrVisualType || card.mstr.type || 'Standard'}
                                  </span>
                                </div>

                                <div className="space-y-2 text-xs">
                                  {card.mstr.columns && card.mstr.columns.length > 0 && (
                                    <div className="flex items-start gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Columns Shelf:
                                      </span>
                                      <div className="flex flex-wrap gap-1">
                                        {card.mstr.columns.map((col, ci) => (
                                          <span key={ci} className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>
                                            {col}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {card.mstr.rows && card.mstr.rows.length > 0 && (
                                    <div className="flex items-start gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Rows Shelf:
                                      </span>
                                      <div className="flex flex-wrap gap-1">
                                        {card.mstr.rows.map((row, ri) => (
                                          <span key={ri} className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>
                                            {row}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {card.mstr.color && (
                                    <div className="flex items-center gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Color Shelf:
                                      </span>
                                      <span className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>
                                        {card.mstr.color}
                                      </span>
                                    </div>
                                  )}

                                  {card.mstr.metrics && card.mstr.metrics.length > 0 && (
                                    <div className="flex items-start gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Source Metrics:
                                      </span>
                                      <div className="flex flex-wrap gap-1">
                                        {card.mstr.metrics.map((m, mi) => (
                                          <span key={mi} className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'rgba(155,81,224,0.12)', color: '#9B51E0' }}>
                                            {m}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {card.mstr.attributes && card.mstr.attributes.length > 0 && (
                                    <div className="flex items-start gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Attributes:
                                      </span>
                                      <div className="flex flex-wrap gap-1">
                                        {card.mstr.attributes.map((a, ai) => (
                                          <span key={ai} className="px-1.5 py-0.5 rounded text-[11px]" style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-text-secondary)' }}>
                                            {a}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {card.mstr.mstrFormulas && card.mstr.mstrFormulas.length > 0 && (
                                    <div>
                                      <span className="text-[10px] font-bold uppercase block mt-2" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Source MSTR Formula
                                      </span>
                                      <pre className="text-[11px] font-mono p-2 rounded-lg mt-1 whitespace-pre-wrap break-all"
                                        style={{ backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border-subtle)', color: '#9B51E0' }}>
                                        {card.mstr.mstrFormulas.join('\n')}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right Column: Tableau Target Equivalent */}
                              <div
                                className="rounded-xl border p-4 space-y-3"
                                style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-subtle)' }}
                              >
                                <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                  <div className="flex items-center gap-2">
                                    <LayoutDashboard size={14} style={{ color: '#10b981' }} />
                                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#10b981' }}>
                                      Target Tableau Worksheet (VQL / XML)
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded text-emerald-500" style={{ backgroundColor: 'rgba(16,185,129,0.1)' }}>
                                    Mark: {card.tableau.markType}
                                  </span>
                                </div>

                                <div className="space-y-2 text-xs">
                                  {card.tableau.columnsShelf.length > 0 && (
                                    <div className="flex items-start gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Columns Shelf:
                                      </span>
                                      <div className="flex flex-wrap gap-1">
                                        {card.tableau.columnsShelf.map((col, ci) => (
                                          <span key={ci} className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                                            {col}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {card.tableau.rowsShelf.length > 0 && (
                                    <div className="flex items-start gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Rows Shelf:
                                      </span>
                                      <div className="flex flex-wrap gap-1">
                                        {card.tableau.rowsShelf.map((row, ri) => (
                                          <span key={ri} className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                                            {row}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {card.tableau.colorEncoding && (
                                    <div className="flex items-center gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Color Shelf:
                                      </span>
                                      <span className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                                        {card.tableau.colorEncoding}
                                      </span>
                                    </div>
                                  )}

                                  {card.tableau.labelEncoding && (
                                    <div className="flex items-center gap-2">
                                      <span className="w-24 shrink-0 text-[11px] font-semibold" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Label Shelf:
                                      </span>
                                      <span className="px-1.5 py-0.5 rounded text-[11px] font-mono" style={{ backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981' }}>
                                        {card.tableau.labelEncoding}
                                      </span>
                                    </div>
                                  )}

                                  {card.tableau.tableauCalculations && card.tableau.tableauCalculations.length > 0 && (
                                    <div>
                                      <span className="text-[10px] font-bold uppercase block mt-2" style={{ color: 'var(--color-text-tertiary)' }}>
                                        Translated Tableau Calculation
                                      </span>
                                      <pre className="text-[11px] font-mono p-2 rounded-lg mt-1 whitespace-pre-wrap break-all"
                                        style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.25)', color: '#3b82f6' }}>
                                        {card.tableau.tableauCalculations.join('\n')}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Expandable Tableau XML Spec Accordion */}
                            {isSpecOpen && (
                              <div
                                className="rounded-xl border p-4 space-y-2 mt-2"
                                style={{ backgroundColor: 'var(--color-bg-primary)', borderColor: 'var(--color-border-primary)' }}
                              >
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2">
                                    <FileCode size={14} style={{ color: 'var(--color-accent)' }} />
                                    <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                      Emitted Tableau Worksheet XML Specification
                                    </span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleCopy(card.tableau.worksheetXmlSpec || '', `xml-${card.id}`)}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border cursor-pointer hover:opacity-80"
                                    style={{
                                      backgroundColor: 'var(--color-bg-secondary)',
                                      borderColor: 'var(--color-border-primary)',
                                      color: 'var(--color-accent)',
                                    }}
                                  >
                                    {copiedId === `xml-${card.id}` ? (
                                      <>
                                        <Check size={12} className="text-emerald-500" /> Copied XML
                                      </>
                                    ) : (
                                      <>
                                        <Copy size={12} /> Copy XML Spec
                                      </>
                                    )}
                                  </button>
                                </div>
                                <pre
                                  className="text-[11px] font-mono p-3 rounded-lg overflow-x-auto whitespace-pre leading-relaxed border"
                                  style={{
                                    backgroundColor: 'var(--color-bg-secondary)',
                                    borderColor: 'var(--color-border-subtle)',
                                    color: '#38bdf8',
                                  }}
                                >
                                  <code>{card.tableau.worksheetXmlSpec}</code>
                                </pre>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ═══ TAB 3: LOGIC EXPLORER (mirrors LogicExplorer.tsx) ═══ */}
          {activeTab === 'logic' && (
            <div className="space-y-4">
              {/* Summary pills */}
              <div className="flex flex-wrap gap-2">
                {(['LOD', 'CONDITIONAL', 'TABLE_CALC', 'STANDARD'] as const).map(cat => {
                  const count = mstrCalculations.filter(c => c.category === cat).length;
                  const badge = categoryBadge(cat);
                  return (
                    <span key={cat} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                      style={{ backgroundColor: badge.bg, color: badge.color }}>
                      {cat.replace('_', ' ')} ({count})
                    </span>
                  );
                })}
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                  style={{ backgroundColor: '#10b98120', color: '#10b981' }}>
                  {mstrCalculations.filter(c => c.validationStatus === 'VALID').length} Valid
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                  style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
                  {mstrCalculations.filter(c => c.validationStatus === 'WARNING').length} Review
                </span>
              </div>

              {/* Calculation cards */}
              {mstrCalculations.map(calc => {
                const isExpanded = expandedLogicIds.has(calc.id);
                const sBadge = statusBadge(calc.validationStatus);
                const cBadge = categoryBadge(calc.category);
                return (
                  <div key={calc.id}
                    className="rounded-xl border theme-transition overflow-hidden"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}>
                    <button onClick={() => toggleLogicCard(calc.id)}
                      className="w-full px-4 py-3.5 flex items-center justify-between cursor-pointer text-left">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ backgroundColor: sBadge.bg }}>
                          {sBadge.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold break-words" style={{ color: 'var(--color-text-primary)' }}>{calc.name}</div>
                          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: cBadge.bg, color: cBadge.color }}>{calc.category.replace('_', ' ')}</span>
                            <span className="text-[10px]" style={{ color: 'var(--color-text-quaternary)' }}>{calc.formulaType}</span>
                            <span className="text-[10px]" style={{ color: 'var(--color-text-quaternary)' }}>· {calc.method}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono font-bold" style={{ color: calc.confidence >= 0.9 ? '#10b981' : calc.confidence >= 0.8 ? '#f59e0b' : '#ef4444' }}>
                          {Math.round(calc.confidence * 100)}%
                        </span>
                        <ChevronRight size={14} style={{ color: 'var(--color-text-quaternary)', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-4 pb-4 space-y-3">
                            {/* Source Formula */}
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--color-text-tertiary)' }}>MicroStrategy Formula</span>
                              </div>
                              <pre className="text-[11px] font-mono p-3 rounded-lg mt-1 whitespace-pre-wrap break-all overflow-x-auto"
                                style={{ backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border-subtle)', color: '#9B51E0' }}>
                                {calc.sourceFormula || '— no MSTR expression stored'}
                              </pre>
                            </div>
                            {/* Target Calc */}
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--color-text-tertiary)' }}>Tableau Calculated Field</span>
                                <button onClick={() => handleCopy(calc.targetCalc, calc.id)}
                                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] hover:opacity-80 cursor-pointer"
                                  style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-accent)' }}>
                                  {copiedId === calc.id ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
                                </button>
                              </div>
                              <pre className="text-[11px] font-mono p-3 rounded-lg mt-1 whitespace-pre-wrap break-all overflow-x-auto"
                                style={{ backgroundColor: '#3b82f610', border: '1px solid #3b82f630', color: '#3b82f6' }}>
                                {calc.targetCalc}
                              </pre>
                            </div>
                            {/* Definition Chain */}
                            {calc.definitionChain && calc.definitionChain.length > 0 && (
                              <div>
                                <span className="text-[10px] font-bold uppercase block" style={{ color: 'var(--color-text-tertiary)' }}>MSTR Definition Lineage</span>
                                <div className="mt-1 space-y-0.5 text-xs font-mono">
                                  {calc.definitionChain.map((d, di) => (
                                    <div key={di} className="flex gap-1 flex-wrap" style={{ color: 'var(--color-text-secondary)' }}>
                                      <span style={{ color: 'var(--color-text-quaternary)' }}>{di === 0 ? '└─' : '  ├─'}</span>
                                      <span className="font-bold" style={{ color: 'var(--color-text-primary)' }}>{d.name}</span>
                                      <span style={{ color: 'var(--color-text-quaternary)' }}>≔</span>
                                      <span style={{ color: '#9B51E0' }}>{d.formula}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            {/* Explanation */}
                            <div className="text-[11px] p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
                              {calc.explanation}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

          {/* ═══ TAB 4: EXPORT CENTER (mirrors ExportCenter.tsx) ═══ */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-center gap-2">
                <FolderTree size={18} style={{ color: 'var(--color-accent)' }} />
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>Artifact Explorer</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>{mstrArtifacts.length}</span>
              </div>

              {/* Artifact Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mstrArtifacts.map(art => {
                  const isTwbx = art.file_name.endsWith('.twbx');
                  const isHyper = art.file_name.endsWith('.hyper');
                  const isXlsx = art.file_name.endsWith('.xlsx');
                  return (
                    <div key={art.id} className="rounded-xl border p-5 flex flex-col justify-between gap-4 theme-transition"
                      style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}>
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: isTwbx ? 'var(--color-accent-muted)' : isHyper ? '#10b98120' : isXlsx ? '#10b98120' : '#3b82f620',
                              color: isTwbx ? 'var(--color-accent)' : isHyper ? '#10b981' : isXlsx ? '#10b981' : '#3b82f6',
                            }}>
                            {isTwbx ? <Layers size={18} /> : isHyper ? <Database size={18} /> : isXlsx ? <FileSpreadsheet size={18} /> : <FileCode size={18} />}
                          </div>
                          <div>
                            <h4 className="text-[0.9375rem] font-bold" style={{ color: 'var(--color-text-primary)' }}>{art.file_name}</h4>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }}>{art.type}</span>
                          </div>
                        </div>
                        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{art.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <span className="text-xs font-mono" style={{ color: 'var(--color-text-quaternary)' }}>
                          {Math.round(art.size_bytes / 1024)} KB
                        </span>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer theme-transition"
                          style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-accent)' }}>
                          <Download size={13} /> Download
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <button onClick={onFinish ?? onBack}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer"
                  style={{ backgroundColor: '#8b5cf6', color: '#fff' }}>
                  <CheckCircle size={14} /> Complete &amp; Take a Glance
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
