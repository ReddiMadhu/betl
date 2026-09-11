import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  LayoutDashboard,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Copy,
  Check,
  Search,
  Code,
  Database,
  ArrowRight,
  Calendar,
  User,
  ShieldCheck,
  FileSpreadsheet,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * MicroStrategyDetail — Dashboard & Dossier Inventory
 *
 * Modeled directly on ms-tb DashboardInventory.tsx:
 * - Executive Conversion Summary Cards (Source Dossier, Planned Visuals, Converted, Parity %)
 * - Accordion Conversion Cards with dual-column side-by-side:
 *   Left: MicroStrategy Bindings (Visual Type, Shelves, Metrics, Attributes)
 *   Right: Target Tableau/PBI Worksheet Equivalent (Mark Type, Shelves, Encodings)
 * - Expandable Worksheet XML Spec Inspector with "Copy Schematic" button
 * - Schema & Metric Translation Catalog + Lineage tabs
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

export interface MstrVisualDef {
  type: string;
  rows: string[];
  columns: string[];
  color?: string | null;
  metrics: string[];
  attributes: string[];
}

export interface TargetVisualDef {
  markType: string;
  columnsShelf: string[];
  rowsShelf: string[];
  colorEncoding?: string | null;
  labelEncoding?: string | null;
  worksheetXmlSpec: string;
}

export interface ConversionCardItem {
  id: string;
  worksheetName: string;
  chartType: string;
  status: 'SUCCESS' | 'MANUAL_REVIEW';
  failureReason?: string | null;
  mstr: MstrVisualDef;
  target: TargetVisualDef;
}

interface MstrMetricMapping {
  id: string;
  name: string;
  mstrExpression: string;
  targetExpression: string;
  confidence: number;
  method: string;
}

function getMicroStrategyData(assetName: string) {
  const visuals: ConversionCardItem[] = [
    {
      id: 'vis1',
      worksheetName: 'Executive Underwriting Overview',
      chartType: 'Clustered Bar Chart',
      status: 'SUCCESS',
      mstr: {
        type: 'Bar Chart (Standard Grid Visualization)',
        rows: ['[Earned Premium]', '[Loss Ratio]'],
        columns: ['[Region Name]', '[Line of Business]'],
        color: '[Line of Business]',
        metrics: ['Total Earned Premium', 'Incurred Loss Ratio', 'Binding Count'],
        attributes: ['Region Name', 'Line of Business', 'Underwriting Team'],
      },
      target: {
        markType: 'Bar',
        columnsShelf: ['[Region Name]', '[Line of Business]'],
        rowsShelf: ['SUM([Earned Premium])', '[Loss Ratio]'],
        colorEncoding: '[Line of Business]',
        labelEncoding: 'SUM([Earned Premium])',
        worksheetXmlSpec: `<worksheet name="Executive Underwriting Overview">
  <table>
    <rows>[Region Name][Line of Business]</rows>
    <cols>SUM([Earned Premium])[Loss Ratio]</cols>
    <encodings>
      <color column="[Line of Business]" palette="Tableau 10" />
      <text column="SUM([Earned Premium])" />
    </encodings>
  </table>
</worksheet>`,
      },
    },
    {
      id: 'vis2',
      worksheetName: 'Claims Severity Distribution',
      chartType: 'Histogram / Frequency Bar',
      status: 'SUCCESS',
      mstr: {
        type: 'Interactive MicroChart (Histogram)',
        rows: ['[Claim Frequency Count]'],
        columns: ['[Severity Band Bucket]'],
        color: null,
        metrics: ['Claim Frequency Count', 'Average Incurred Loss'],
        attributes: ['Severity Band Bucket', 'Catastrophe Indicator'],
      },
      target: {
        markType: 'Bar (Binned)',
        columnsShelf: ['[Severity Band Bucket (bin)]'],
        rowsShelf: ['COUNT([Claim ID])'],
        colorEncoding: null,
        labelEncoding: 'COUNT([Claim ID])',
        worksheetXmlSpec: `<worksheet name="Claims Severity Distribution">
  <table>
    <rows>[Severity Band Bucket (bin)]</rows>
    <cols>COUNT([Claim ID])</cols>
    <encodings>
      <text column="COUNT([Claim ID])" />
    </encodings>
  </table>
</worksheet>`,
      },
    },
    {
      id: 'vis3',
      worksheetName: 'Monthly Loss Emergence Trend',
      chartType: 'Multi-Line Trend',
      status: 'SUCCESS',
      mstr: {
        type: 'Dual Axis Line Graph',
        rows: ['[Incurred Loss Ratio]', '[Target Loss Ratio Benchmark]'],
        columns: ['[Accident Month Year]'],
        color: '[Accident Month Year]',
        metrics: ['Incurred Loss Ratio', 'Target Loss Ratio Benchmark'],
        attributes: ['Accident Month Year'],
      },
      target: {
        markType: 'Line (Dual Axis)',
        columnsShelf: ['[Accident Month Year]'],
        rowsShelf: ['[Incurred Loss Ratio]', '[Target Benchmark]'],
        colorEncoding: 'Measure Names',
        labelEncoding: null,
        worksheetXmlSpec: `<worksheet name="Monthly Loss Emergence Trend">
  <table>
    <rows>[Incurred Loss Ratio][Target Benchmark]</rows>
    <cols>[Accident Month Year]</cols>
    <encodings>
      <color column="Measure Names" />
      <dual-axis synchronized="true" />
    </encodings>
  </table>
</worksheet>`,
      },
    },
    {
      id: 'vis4',
      worksheetName: 'Territorial Loss Ratio Heatmap',
      chartType: 'Geographic Map / Density',
      status: 'MANUAL_REVIEW',
      failureReason: 'MicroStrategy ESRI custom boundary polygon requires shapefile remap in Tableau',
      mstr: {
        type: 'ESRI Custom Geospatial Layer',
        rows: ['[Latitude Coordinate]'],
        columns: ['[Longitude Coordinate]'],
        color: '[Territory Loss Severity]',
        metrics: ['Territory Loss Severity', 'Direct Incurred Amount'],
        attributes: ['Territory Boundary Code', 'Postal FIPS'],
      },
      target: {
        markType: 'Polygon (Map Shapefile)',
        columnsShelf: ['[Longitude]'],
        rowsShelf: ['[Latitude]'],
        colorEncoding: '[Territory Loss Severity]',
        labelEncoding: null,
        worksheetXmlSpec: `<worksheet name="Territorial Loss Ratio Heatmap">
  <table>
    <rows>[Latitude]</rows>
    <cols>[Longitude]</cols>
    <encodings>
      <color column="[Territory Loss Severity]" palette="Red-Green Diverging" />
      <polygon shapefile="territory_zones_2026.shp" />
    </encodings>
  </table>
</worksheet>`,
      },
    },
    {
      id: 'vis5',
      worksheetName: 'Broker Commission Ledger',
      chartType: 'Grid Matrix with Subtotals',
      status: 'SUCCESS',
      mstr: {
        type: 'CrossTab Grid with Dynamic Thresholds',
        rows: ['[Broker Agency Name]', '[Producer Code]'],
        columns: ['[Calendar Year Quarter]', '[Policy Type]'],
        color: null,
        metrics: ['Total Paid Commission', 'Written Premium Volume', 'Net Retained Share'],
        attributes: ['Broker Agency Name', 'Producer Code', 'Calendar Year Quarter', 'Policy Type'],
      },
      target: {
        markType: 'Text Table (Matrix)',
        columnsShelf: ['[Calendar Year Quarter]', '[Policy Type]'],
        rowsShelf: ['[Broker Agency Name]', '[Producer Code]'],
        colorEncoding: null,
        labelEncoding: 'SUM([Total Paid Commission])',
        worksheetXmlSpec: `<worksheet name="Broker Commission Ledger">
  <table>
    <rows>[Broker Agency Name][Producer Code]</rows>
    <cols>[Calendar Year Quarter][Policy Type]</cols>
    <encodings>
      <text column="SUM([Total Paid Commission])" />
      <subtotals enabled="true" position="bottom" />
    </encodings>
  </table>
</worksheet>`,
      },
    },
  ];

  const metricMappings: MstrMetricMapping[] = [
    {
      id: 'm1',
      name: 'Total Earned Premium',
      mstrExpression: 'Sum(fact_premium.earned_premium){~+}',
      targetExpression: 'SUM([Earned Premium])',
      confidence: 0.98,
      method: 'Direct Aggregate Translation',
    },
    {
      id: 'm2',
      name: 'Incurred Loss Ratio',
      mstrExpression: 'Sum(fact_claims.incurred_loss){~+} / Sum(fact_premium.earned_premium){~+}',
      targetExpression: 'SUM([Incurred Loss]) / SUM([Earned Premium])',
      confidence: 0.95,
      method: 'Compound Expression Decomposition',
    },
    {
      id: 'm3',
      name: 'Dynamic Risk Tier Categorization',
      mstrExpression: 'ApplySimple("CASE WHEN #0 > 100000 THEN \'High Severity\' WHEN #0 > 25000 THEN \'Medium\' ELSE \'Low\' END", fact_claims.claim_amount)',
      targetExpression: 'IF [Claim Amount] > 100000 THEN "High Severity"\nELSEIF [Claim Amount] > 25000 THEN "Medium"\nELSE "Low"\nEND',
      confidence: 0.88,
      method: 'ApplySimple to IF/THEN Statement',
    },
    {
      id: 'm4',
      name: 'Rolling 12M Earned Premium',
      mstrExpression: 'Sum(fact_premium.earned_premium){~+}<[Accident Date] between (CurrentDate - 365) and CurrentDate>',
      targetExpression: 'WINDOW_SUM(SUM([Earned Premium]), -11, 0)',
      confidence: 0.82,
      method: 'Level Metric to Window Table Calculation',
    },
  ];

  return { visuals, metricMappings };
}

export default function MicroStrategyDetail({ asset, onBack }: Props) {
  const data = useMemo(() => getMicroStrategyData(asset.name), [asset.name]);

  const [activeTab, setActiveTab] = useState<'visuals' | 'metrics' | 'lineage'>('visuals');
  const [visualSearch, setVisualSearch] = useState('');
  const [expandedCardIds, setExpandedCardIds] = useState<Set<string>>(new Set(['vis1']));
  const [expandedSpecId, setExpandedSpecId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const copySpec = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredVisuals = useMemo(() => {
    if (!visualSearch.trim()) return data.visuals;
    const q = visualSearch.toLowerCase();
    return data.visuals.filter(
      (v) =>
        v.worksheetName.toLowerCase().includes(q) ||
        v.chartType.toLowerCase().includes(q) ||
        v.mstr.type.toLowerCase().includes(q)
    );
  }, [data.visuals, visualSearch]);

  const totalVisuals = data.visuals.length;
  const successCount = data.visuals.filter((v) => v.status === 'SUCCESS').length;
  const parityRate = Math.round((successCount / totalVisuals) * 100);

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
                  <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
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
                <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Dashboard Inventory — Visual conversion mapping, schema translation, and target parity analysis
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  <span className="flex items-center gap-1.5">
                    <User size={13} /> {asset.owner || 'Steward: Mark Sullivan'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} /> Last Inspected: 194 days ago (Orphan Candidate)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Executive Conversion Summary Cards (From DashboardInventory.tsx) ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Source Dossier Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex flex-col justify-between shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
            MSTR Source Dossier
          </span>
          <span className="text-sm font-bold truncate mt-2" style={{ color: 'var(--color-text-primary)' }} title={asset.name}>
            {asset.name}
          </span>
        </div>

        {/* Planned Worksheets Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex flex-col justify-between shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
            Planned Worksheets
          </span>
          <span className="text-2xl font-bold mt-1" style={{ color: 'var(--color-text-primary)' }}>
            {totalVisuals}
          </span>
        </div>

        {/* Converted Worksheets Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex flex-col justify-between shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
            Target Worksheets Converted
          </span>
          <span className="text-2xl font-bold mt-1 text-emerald-500">
            {successCount}
          </span>
        </div>

        {/* Visual Conversion Parity Card */}
        <div
          className="rounded-xl border p-4 theme-transition flex flex-col justify-between shadow-sm"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
          }}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
            Visual Conversion Parity
          </span>
          <span className="text-2xl font-bold mt-1 text-emerald-500">
            {parityRate}%
          </span>
        </div>
      </div>

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--color-border-primary)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('visuals')}
          className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 border"
          style={{
            backgroundColor: activeTab === 'visuals' ? 'var(--color-accent)' : 'transparent',
            color: activeTab === 'visuals' ? '#FFFFFF' : 'var(--color-text-secondary)',
            borderColor: activeTab === 'visuals' ? 'var(--color-accent)' : 'transparent',
          }}
        >
          <LayoutDashboard size={14} /> Visual Conversion Inventory ({filteredVisuals.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('metrics')}
          className="px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 border"
          style={{
            backgroundColor: activeTab === 'metrics' ? 'var(--color-accent)' : 'transparent',
            color: activeTab === 'metrics' ? '#FFFFFF' : 'var(--color-text-secondary)',
            borderColor: activeTab === 'metrics' ? 'var(--color-accent)' : 'transparent',
          }}
        >
          <Code size={14} /> Schema & Metric Translation ({data.metricMappings.length})
        </button>
      </div>

      {/* ── Tab 1: Visual Conversion Inventory (Exact DashboardInventory Pattern) ── */}
      {activeTab === 'visuals' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search worksheets or chart types..."
              value={visualSearch}
              onChange={(e) => setVisualSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border outline-none transition-all"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-primary)',
              }}
            />
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {filteredVisuals.map((card) => {
              const isCardExpanded = expandedCardIds.has(card.id);
              const isSpecExpanded = expandedSpecId === card.id;

              const shelfSummary = [
                card.target.columnsShelf.length > 0 ? `Cols: ${card.target.columnsShelf.join(', ')}` : null,
                card.target.rowsShelf.length > 0 ? `Rows: ${card.target.rowsShelf.join(', ')}` : null,
                card.target.colorEncoding ? `Color: ${card.target.colorEncoding}` : null,
              ].filter(Boolean).join(' | ');

              return (
                <div
                  key={card.id}
                  className="rounded-2xl border overflow-hidden shadow-xs transition-all"
                  style={{
                    backgroundColor: 'var(--color-bg-elevated)',
                    borderColor: 'var(--color-border-primary)',
                  }}
                >
                  {/* Clickable Header */}
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer transition-colors"
                    style={{ backgroundColor: 'var(--color-surface)' }}
                    onClick={() => toggleCard(card.id)}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-4 flex-1">
                      <span className="text-gray-400 shrink-0">
                        {isCardExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>
                            {card.worksheetName}
                          </h3>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0"
                            style={{
                              backgroundColor: 'rgba(59, 130, 246, 0.08)',
                              borderColor: 'rgba(59, 130, 246, 0.25)',
                              color: '#3B82F6',
                            }}
                          >
                            {card.chartType}
                          </span>
                        </div>
                        {!isCardExpanded && shelfSummary && (
                          <p className="text-[11px] text-gray-400 font-mono truncate mt-0.5">
                            {shelfSummary}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="shrink-0">
                      {card.status === 'SUCCESS' ? (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg border bg-emerald-500/10 text-emerald-500 border-emerald-500/20 flex items-center gap-1.5">
                          <CheckCircle2 size={13} /> Converted
                        </span>
                      ) : (
                        <span
                          className="text-[11px] font-bold px-2.5 py-1 rounded-lg border bg-amber-500/10 text-amber-500 border-amber-500/20 flex items-center gap-1.5"
                          title={card.failureReason || undefined}
                        >
                          <AlertTriangle size={13} /> Review Needed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Body: Dual-Column Comparison */}
                  {isCardExpanded && (
                    <div className="border-t divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left Column: MicroStrategy Bindings */}
                        <div
                          className="p-4 rounded-xl border space-y-3"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderColor: 'var(--color-border-subtle)',
                          }}
                        >
                          <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                              <Layers size={13} /> MicroStrategy Bindings
                            </h4>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">MSTR Visual Type:</span>
                              <p className="font-semibold text-xs mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
                                {card.mstr.type}
                              </p>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">Columns Shelf:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {card.mstr.columns.map((c, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded border text-[11px] font-mono bg-blue-500/10 text-blue-500 border-blue-500/20">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">Rows Shelf:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {card.mstr.rows.map((r, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded border text-[11px] font-mono bg-blue-500/10 text-blue-500 border-blue-500/20">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {card.mstr.metrics.length > 0 && (
                              <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Source Metrics:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {card.mstr.metrics.map((m, i) => (
                                    <span key={i} className="px-2 py-0.5 rounded border text-[11px] font-mono bg-purple-500/10 text-purple-500 border-purple-500/20">
                                      {m}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Column: Target Equivalent Definition */}
                        <div
                          className="p-4 rounded-xl border space-y-3"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderColor: 'var(--color-border-subtle)',
                          }}
                        >
                          <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                              <CheckCircle2 size={13} /> Target Equivalent (Tableau / XML)
                            </h4>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">Mark Type:</span>
                              <p className="font-bold text-xs mt-0.5 text-emerald-500">
                                {card.target.markType}
                              </p>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">Columns Shelf:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {card.target.columnsShelf.map((c, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded border text-[11px] font-mono bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase">Rows Shelf:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {card.target.rowsShelf.map((r, i) => (
                                  <span key={i} className="px-2 py-0.5 rounded border text-[11px] font-mono bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                    {r}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {card.target.labelEncoding && (
                              <div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase">Label Shelf:</span>
                                <div className="mt-1">
                                  <span className="px-2 py-0.5 rounded border text-[11px] font-mono bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                                    {card.target.labelEncoding}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Spec Accordion */}
                      <div className="p-4" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
                        <div
                          className="flex items-center justify-between cursor-pointer py-1"
                          onClick={() => setExpandedSpecId(isSpecExpanded ? null : card.id)}
                        >
                          <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                            <Code size={14} className="text-blue-500" />
                            <span>{isSpecExpanded ? 'Hide Generated Worksheet XML Spec' : 'Inspect Generated Target XML Spec'}</span>
                          </div>
                          <span style={{ color: 'var(--color-text-tertiary)' }}>
                            {isSpecExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </span>
                        </div>

                        {isSpecExpanded && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] text-gray-400 font-mono">
                                Worksheet shelf schematic generated from migration translation engine
                              </span>
                              <button
                                type="button"
                                onClick={() => copySpec(card.target.worksheetXmlSpec, card.id)}
                                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer hover:opacity-80 transition-all"
                                style={{
                                  backgroundColor: 'var(--color-bg-elevated)',
                                  borderColor: 'var(--color-border-primary)',
                                  color: copiedId === card.id ? '#22C55E' : 'var(--color-text-primary)',
                                }}
                              >
                                {copiedId === card.id ? <Check size={12} /> : <Copy size={12} />}
                                <span>{copiedId === card.id ? 'Copied' : 'Copy Schematic'}</span>
                              </button>
                            </div>
                            <pre
                              className="p-4 rounded-xl font-mono text-[11px] leading-relaxed border overflow-x-auto"
                              style={{
                                backgroundColor: 'var(--color-bg-tertiary)',
                                borderColor: 'var(--color-border-primary)',
                                color: 'var(--color-text-primary)',
                              }}
                            >
                              <code>{card.target.worksheetXmlSpec}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tab 2: Schema & Metric Translation Catalog ── */}
      {activeTab === 'metrics' && (
        <div className="space-y-4">
          <div
            className="rounded-2xl border p-5 theme-transition shadow-sm"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <h3 className="font-bold text-sm mb-4" style={{ color: 'var(--color-text-primary)' }}>
              MicroStrategy Expression Translation Engine
            </h3>
            <div className="space-y-3">
              {data.metricMappings.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl border p-4 transition-all"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border-subtle)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-xs" style={{ color: 'var(--color-text-primary)' }}>
                      {m.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      {Math.round(m.confidence * 100)}% Confidence
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="p-2.5 rounded-lg border font-mono text-[11px] space-y-1" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                      <span className="text-[9px] font-bold uppercase text-red-400 block font-sans">MSTR Source Expression</span>
                      <code className="text-gray-300 break-all">{m.mstrExpression}</code>
                    </div>
                    <div className="p-2.5 rounded-lg border font-mono text-[11px] space-y-1" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                      <span className="text-[9px] font-bold uppercase text-emerald-400 block font-sans">Target Calculation</span>
                      <code className="text-emerald-400 break-all">{m.targetExpression}</code>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2">
                    Method: {m.method}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
