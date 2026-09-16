import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  GitMerge,
  Trash2,
  ShieldCheck,
  Mail,
  ExternalLink,
  Layers,
  Cpu,
  Database,
  Calendar,
  Code2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Clock,
  ArrowRight,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import type { Recommendation } from '../../data/rationalizationData';
import {
  getEtlCandidateDetail,
  TECHNOLOGY_LOGOS,
} from '../../data/rationalizationData';
import type {
  EtlCandidateDetailDTO,
  EtlDatasetComparison,
  EtlTargetComparison,
} from '../../data/rationalizationData';
import { allAssets } from '../../data/discoveryData';
import type { Asset } from '../../data/discoveryData';
import EmailNotificationModal from './EmailNotificationModal';

interface Props {
  rec: Recommendation;
  onClose: () => void;
  onToast: (message: string) => void;
  onAssetDetail?: (asset: Asset) => void;
}

type OverlapTab = 'sources' | 'targets' | 'frequency' | 'logic' | 'dag';

export default function EtlRationalisationReviewModal({
  rec,
  onClose,
  onToast,
  onAssetDetail,
}: Props) {
  const [showEmail, setShowEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<OverlapTab>('sources');
  const [expandedDatasets, setExpandedDatasets] = useState<Record<string, boolean>>({
    0: true,
    1: true,
  });

  const detail: EtlCandidateDetailDTO = getEtlCandidateDetail(rec);

  const toggleDataset = (name: string) => {
    setExpandedDatasets((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleInspect = (workflowId: string, workflowName: string) => {
    if (!onAssetDetail) return;
    const found =
      allAssets.find((a) => a.id === workflowId || a.canonicalId === workflowId) ||
      allAssets.find((a) => a.name.toLowerCase() === workflowName.toLowerCase());
    if (found) {
      onClose();
      onAssetDetail(found);
    }
  };

  const isConsolidate = detail.recType === 'CONSOLIDATE';
  const badgeColor = isConsolidate ? '#22C55E' : '#EF4444';
  const matchingYellow = '#EAB308';

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        style={{ backgroundColor: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="rounded-2xl border w-full max-w-6xl max-h-[94vh] flex flex-col overflow-hidden my-auto"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* ══════════════════════════════════════════════════════════
           * 1. TOP HEADER
           * ══════════════════════════════════════════════════════════ */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b shrink-0"
            style={{
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                style={{
                  backgroundColor: isConsolidate ? 'rgba(34, 197, 94, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                  borderColor: isConsolidate ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                }}
              >
                {isConsolidate ? (
                  <GitMerge size={20} style={{ color: '#22C55E' }} />
                ) : (
                  <Trash2 size={20} style={{ color: '#EF4444' }} />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      color: 'var(--color-accent)',
                      borderColor: 'var(--color-border-subtle)',
                      backgroundColor: 'var(--color-accent-subtle)',
                    }}
                  >
                    DETAILED OPPORTUNITY ANALYSIS
                  </span>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                    style={{
                      color: badgeColor,
                      borderColor: `${badgeColor}40`,
                      backgroundColor: `${badgeColor}15`,
                    }}
                  >
                    {detail.recommendationBadge}
                  </span>
                </div>
                <h2
                  className="font-bold text-lg sm:text-xl mt-1 tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {detail.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <Mail size={14} />
                <span>Email</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg border cursor-pointer transition-colors hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
           * 2. SCROLLABLE CONTENT BODY
           * ══════════════════════════════════════════════════════════ */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* ── Direction Banner ── */}
            <div
              className="rounded-xl border p-3.5 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-subtle)',
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-xs font-mono font-bold tracking-wide"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {detail.direction.bannerText}
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-xs">
                <span style={{ color: 'var(--color-text-tertiary)' }}>Target Strategy:</span>
                <span
                  className="font-semibold px-2 py-0.5 rounded text-[11px]"
                  style={{
                    backgroundColor: isConsolidate ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: isConsolidate ? '#22C55E' : '#EF4444',
                  }}
                >
                  {isConsolidate ? 'Superset Merge' : 'Decommission / Cutover'}
                </span>
              </div>
            </div>

            {/* ── In-Scope Workflows (Side-by-Side) ── */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3
                  className="text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <Cpu size={14} style={{ color: 'var(--color-accent)' }} />
                  In-Scope Workflows ({detail.inScopeWorkflows.length})
                </h3>
              </div>

              <div
                className={`grid gap-4 ${
                  detail.inScopeWorkflows.length === 1
                    ? 'grid-cols-1'
                    : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {detail.inScopeWorkflows.map((wf, idx) => {
                  const logo = TECHNOLOGY_LOGOS[wf.technology];
                  const isMaster = idx === 1;
                  return (
                    <div
                      key={wf.id}
                      className="rounded-xl border p-4 flex flex-col justify-between relative overflow-hidden"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: isMaster && isConsolidate
                          ? 'rgba(34, 197, 94, 0.35)'
                          : 'var(--color-border-primary)',
                      }}
                    >
                      {isMaster && isConsolidate && (
                        <div className="absolute top-0 right-0 bg-emerald-500/15 text-emerald-400 border-b border-l border-emerald-500/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-bl">
                          Retained Master Target
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          {logo && (
                            <img
                              src={logo}
                              alt={wf.technology}
                              className="w-5 h-5 object-contain"
                            />
                          )}
                          <div>
                            <h4
                              className="font-bold text-base leading-tight"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {wf.name}
                            </h4>
                            <span
                              className="text-[11px]"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              {wf.technology} • {wf.businessArea} • Owner: {wf.owner}
                            </span>
                          </div>
                        </div>

                        {/* Workflow Metric Badges */}
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 my-3">
                          <div
                            className="rounded-lg p-2 border text-center"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            <span
                              className="text-[10px] block"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              Tools
                            </span>
                            <span
                              className="text-sm font-bold tabular-nums"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {wf.toolCount}
                            </span>
                          </div>

                          <div
                            className="rounded-lg p-2 border text-center"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            <span
                              className="text-[10px] block"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              Sources
                            </span>
                            <span
                              className="text-sm font-bold tabular-nums"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {wf.sourcesCount}
                            </span>
                          </div>

                          <div
                            className="rounded-lg p-2 border text-center"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            <span
                              className="text-[10px] block"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              Targets
                            </span>
                            <span
                              className="text-sm font-bold tabular-nums"
                              style={{ color: 'var(--color-text-primary)' }}
                            >
                              {wf.targetsCount}
                            </span>
                          </div>

                          <div
                            className="rounded-lg p-2 border text-center"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            <span
                              className="text-[10px] block"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              Complexity
                            </span>
                            <span
                              className="text-xs font-bold"
                              style={{
                                color:
                                  wf.complexity === 'High'
                                    ? '#EF4444'
                                    : wf.complexity === 'Medium'
                                    ? '#F59E0B'
                                    : '#22C55E',
                              }}
                            >
                              {wf.complexity}
                            </span>
                          </div>

                          <div
                            className="rounded-lg p-2 border text-center"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            <span
                              className="text-[10px] block"
                              style={{ color: 'var(--color-text-tertiary)' }}
                            >
                              Criticality
                            </span>
                            <span
                              className="text-xs font-bold"
                              style={{
                                color:
                                  wf.criticality === 'High'
                                    ? '#EF4444'
                                    : wf.criticality === 'Medium'
                                    ? '#F59E0B'
                                    : '#22C55E',
                              }}
                            >
                              {wf.criticality}
                            </span>
                          </div>
                        </div>

                        {/* Schedule & Runtime meta */}
                        <div
                          className="text-[11px] space-y-1 mb-3 p-2.5 rounded-lg border"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderColor: 'var(--color-border-subtle)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} style={{ color: 'var(--color-text-tertiary)' }} />
                              Schedule:
                            </span>
                            <span className="font-medium text-right font-mono text-[10px]">
                              {wf.schedule}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1">
                              <Clock size={12} style={{ color: 'var(--color-text-tertiary)' }} />
                              Avg Runtime:
                            </span>
                            <span className="font-medium font-mono text-[10px]">{wf.runtime}</span>
                          </div>
                        </div>
                      </div>

                      {/* Inspect Workflow Action */}
                      <button
                        type="button"
                        onClick={() => handleInspect(wf.id, wf.name)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all hover:opacity-90"
                        style={{
                          backgroundColor: 'var(--color-bg-tertiary)',
                          borderColor: 'var(--color-border-primary)',
                          color: 'var(--color-accent)',
                        }}
                      >
                        <ExternalLink size={13} />
                        <span>Inspect Workflow</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Deterministic Overlap Metrics Pills ── */}
            <div>
              <h3
                className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <Layers size={14} style={{ color: 'var(--color-accent)' }} />
                Deterministic Overlap Metrics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: 'Source Metadata Overlap', val: detail.overlapMetrics.sourceMetadataPct },
                  { label: 'Target Metadata Overlap', val: detail.overlapMetrics.targetMetadataPct },
                  { label: 'Frequency Overlap', val: detail.overlapMetrics.frequencyPct },
                  { label: 'Logic Overlap', val: detail.overlapMetrics.logicPct },
                  { label: 'DAG Overlap', val: detail.overlapMetrics.dagPct },
                ].map((m, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-3 flex flex-col justify-between"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: m.val > 70 ? `${matchingYellow}50` : 'var(--color-border-primary)',
                    }}
                  >
                    <span
                      className="text-xl font-bold tabular-nums"
                      style={{ color: m.val > 70 ? matchingYellow : 'var(--color-text-primary)' }}
                    >
                      {m.val}%
                    </span>
                    <span
                      className="text-[11px] font-medium leading-tight mt-1"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Interactive Overlap Evidence Selector (5 Tabs) ── */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              <div
                className="flex items-center gap-1 p-2 border-b overflow-x-auto"
                style={{
                  borderColor: 'var(--color-border-primary)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                }}
              >
                {[
                  { id: 'sources' as OverlapTab, label: 'Source Metadata Overlap', icon: Database, count: detail.sourcesComparison.length },
                  { id: 'targets' as OverlapTab, label: 'Target Metadata Overlap', icon: FileSpreadsheet, count: detail.targetsComparison.length },
                  { id: 'frequency' as OverlapTab, label: 'Frequency Overlap', icon: Calendar },
                  { id: 'logic' as OverlapTab, label: 'Logic Overlap', icon: Code2, count: detail.logicComparison.rules.length },
                  { id: 'dag' as OverlapTab, label: 'DAG Overlap', icon: Layers, count: detail.dagComparison.stages.length },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all whitespace-nowrap shrink-0"
                      style={{
                        backgroundColor: isActive ? 'var(--color-bg-elevated)' : 'transparent',
                        borderColor: isActive ? 'var(--color-border-primary)' : 'transparent',
                        borderWidth: 1,
                        color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                        boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
                      }}
                    >
                      <Icon size={14} style={{ color: isActive ? 'var(--color-accent)' : 'inherit' }} />
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span
                          className="text-[10px] px-1.5 py-0.2 rounded font-bold"
                          style={{
                            backgroundColor: isActive ? 'var(--color-accent-subtle)' : 'rgba(255,255,255,0.05)',
                            color: isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                          }}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display */}
              <div className="p-5">
                {/* ── TAB 1: SOURCES METADATA ── */}
                {activeTab === 'sources' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>Input tables & files consumed by in-scope workflows:</span>
                      <span className="text-[11px] font-mono">
                        Yellow badge indicates shared / exact field matches across workflows.
                      </span>
                    </div>

                    {detail.sourcesComparison.length === 0 ? (
                      <div className="text-center py-8 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        No input sources configured for this pipeline.
                      </div>
                    ) : (
                      detail.sourcesComparison.map((src: EtlDatasetComparison, sIdx) => {
                        const isExpanded = expandedDatasets[src.name] ?? (sIdx < 2);
                        return (
                          <div
                            key={src.name}
                            className="rounded-xl border overflow-hidden"
                            style={{
                              backgroundColor: 'var(--color-bg-tertiary)',
                              borderColor: src.matchStatus === 'exact' ? `${matchingYellow}40` : 'var(--color-border-subtle)',
                            }}
                          >
                            <div
                              onClick={() => toggleDataset(src.name)}
                              className="p-3.5 flex items-center justify-between cursor-pointer select-none hover:opacity-90"
                            >
                              <div className="flex items-center gap-3">
                                <Database size={16} style={{ color: src.matchStatus === 'exact' ? matchingYellow : 'var(--color-text-tertiary)' }} />
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                                      {src.name}
                                    </span>
                                    {src.matchStatus === 'exact' && (
                                      <span
                                        className="text-[10px] font-bold px-2 py-0.5 rounded border"
                                        style={{
                                          backgroundColor: `${matchingYellow}15`,
                                          borderColor: `${matchingYellow}40`,
                                          color: matchingYellow,
                                        }}
                                      >
                                        Exact Match ({src.matchingColumnsCount}/{src.totalColumnsCount} matching)
                                      </span>
                                    )}
                                    {src.matchStatus === 'unique_left' && (
                                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                                        Unique to Absorbed Candidate
                                      </span>
                                    )}
                                    {src.matchStatus === 'unique_right' && (
                                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                        Unique to Master Target
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                                    {src.sourceType} • {src.columns.length} schema fields
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                              </div>
                            </div>

                            {/* Schema Breakdown Table */}
                            {isExpanded && src.columns.length > 0 && (
                              <div className="border-t p-3 overflow-x-auto" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                <table className="w-full text-left text-xs border-collapse">
                                  <thead>
                                    <tr style={{ color: 'var(--color-text-tertiary)' }}>
                                      <th className="pb-2 font-semibold">Column / Field Name</th>
                                      <th className="pb-2 font-semibold">Data Type</th>
                                      <th className="pb-2 font-semibold">Sample Value</th>
                                      <th className="pb-2 font-semibold text-right">Match Status</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                    {src.columns.map((col, cIdx) => (
                                      <tr key={cIdx} className="hover:bg-white/[0.02]">
                                        <td className="py-1.5 font-mono text-[11px]" style={{ color: col.isMatching ? matchingYellow : 'var(--color-text-primary)' }}>
                                          {col.name}
                                        </td>
                                        <td className="py-1.5 font-mono text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                                          {col.type}
                                        </td>
                                        <td className="py-1.5 text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                                          {col.sampleValue || '—'}
                                        </td>
                                        <td className="py-1.5 text-right">
                                          {col.isMatching ? (
                                            <span
                                              className="text-[10px] font-bold px-1.5 py-0.5 rounded border inline-flex items-center gap-1"
                                              style={{
                                                backgroundColor: `${matchingYellow}15`,
                                                borderColor: `${matchingYellow}40`,
                                                color: matchingYellow,
                                              }}
                                            >
                                              <CheckCircle2 size={10} />
                                              Matching
                                            </span>
                                          ) : (
                                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                                              Distinct
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* ── TAB 2: TARGETS METADATA ── */}
                {activeTab === 'targets' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <span>Destination outputs, data marts, and downstream consumers:</span>
                    </div>

                    {detail.targetsComparison.length === 0 ? (
                      <div className="text-center py-8 rounded-xl border border-dashed text-xs" style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                        Zero persistent target outputs. Workflow terminates in temporary Browse tools.
                      </div>
                    ) : (
                      detail.targetsComparison.map((tgt: EtlTargetComparison) => (
                        <div
                          key={tgt.name}
                          className="rounded-xl border p-4"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderColor: tgt.matchStatus === 'exact' ? `${matchingYellow}40` : 'var(--color-border-subtle)',
                          }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <FileSpreadsheet size={18} style={{ color: tgt.matchStatus === 'exact' ? matchingYellow : 'var(--color-text-tertiary)' }} />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                                    {tgt.name}
                                  </h4>
                                  {tgt.matchStatus === 'exact' && (
                                    <span
                                      className="text-[10px] font-bold px-2 py-0.5 rounded border"
                                      style={{
                                        backgroundColor: `${matchingYellow}15`,
                                        borderColor: `${matchingYellow}40`,
                                        color: matchingYellow,
                                      }}
                                    >
                                      Identical Sink ({tgt.columnsCount} columns)
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                                  {tgt.targetType}
                                </span>

                                {/* Downstream Consumers */}
                                <div className="mt-3 flex items-center gap-2 flex-wrap">
                                  <span className="text-[11px] font-medium" style={{ color: 'var(--color-text-tertiary)' }}>
                                    Downstream BI Reports:
                                  </span>
                                  {tgt.downstreamConsumers.map((c, cI) => (
                                    <span
                                      key={cI}
                                      className="text-[10px] font-semibold px-2 py-0.5 rounded border"
                                      style={{
                                        backgroundColor: 'var(--color-bg-elevated)',
                                        borderColor: 'var(--color-border-primary)',
                                        color: 'var(--color-accent)',
                                      }}
                                    >
                                      {c}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* ── TAB 3: FREQUENCY OVERLAP ── */}
                {activeTab === 'frequency' && (
                  <div className="space-y-4">
                    <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
                        Execution Schedule & Trigger Alignment
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-lg p-3 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                          <span className="text-[11px] font-bold block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                            {detail.inScopeWorkflows[0]?.name} (Absorbed Candidate)
                          </span>
                          <p className="font-mono text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {detail.frequencyComparison.leftSchedule}
                          </p>
                          <div className="text-[11px] mt-2 space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                            <div>Trigger: {detail.frequencyComparison.leftTrigger}</div>
                            <div>Runtime: {detail.frequencyComparison.leftRuntime}</div>
                            <div>Status: {detail.frequencyComparison.leftStatus}</div>
                          </div>
                        </div>

                        {detail.inScopeWorkflows[1] ? (
                          <div className="rounded-lg p-3 border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                            <span className="text-[11px] font-bold block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                              {detail.inScopeWorkflows[1]?.name} (Master Target)
                            </span>
                            <p className="font-mono text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                              {detail.frequencyComparison.rightSchedule}
                            </p>
                            <div className="text-[11px] mt-2 space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                              <div>Trigger: {detail.frequencyComparison.rightTrigger}</div>
                              <div>Runtime: {detail.frequencyComparison.rightRuntime}</div>
                              <div>Status: {detail.frequencyComparison.rightStatus}</div>
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-lg p-3 border flex items-center justify-center text-xs" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                            No target scheduler needed (Orphaned / Stale)
                          </div>
                        )}
                      </div>

                      <div className="mt-4 p-3 rounded-lg border text-xs" style={{ backgroundColor: 'var(--color-accent-subtle)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}>
                        <strong style={{ color: 'var(--color-accent)' }}>Alignment Summary: </strong>
                        {detail.frequencyComparison.alignmentSummary}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── TAB 4: LOGIC OVERLAP ── */}
                {activeTab === 'logic' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span style={{ color: 'var(--color-text-secondary)' }}>
                        Comparison of formulas, transformations, and join conditions:
                      </span>
                      <span className="font-bold text-xs" style={{ color: matchingYellow }}>
                        Logic Similarity Score: {detail.logicComparison.similarityScore}%
                      </span>
                    </div>

                    <div className="space-y-3">
                      {detail.logicComparison.rules.map((rule, rIdx) => (
                        <div
                          key={rIdx}
                          className="rounded-xl border p-4"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderColor: 'var(--color-border-subtle)',
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Code2 size={15} style={{ color: 'var(--color-accent)' }} />
                              <span className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                                {rule.name}
                              </span>
                              <span
                                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border"
                                style={{
                                  backgroundColor: 'var(--color-bg-elevated)',
                                  borderColor: 'var(--color-border-subtle)',
                                  color: 'var(--color-text-tertiary)',
                                }}
                              >
                                {rule.category}
                              </span>
                            </div>

                            <span
                              className="text-[10px] font-bold px-2 py-0.5 rounded border"
                              style={{
                                backgroundColor: rule.matchType === 'Identical' ? `${matchingYellow}15` : 'rgba(34, 197, 94, 0.15)',
                                borderColor: rule.matchType === 'Identical' ? `${matchingYellow}40` : 'rgba(34, 197, 94, 0.3)',
                                color: rule.matchType === 'Identical' ? matchingYellow : '#22C55E',
                              }}
                            >
                              {rule.matchType} Match
                            </span>
                          </div>

                          <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                            {rule.description}
                          </p>

                          {/* Code Expressions */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                            {rule.leftExpression && (
                              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                                <span className="text-[10px] block text-gray-400 mb-1">
                                  {detail.inScopeWorkflows[0]?.name} Expression:
                                </span>
                                <code className="text-[11px]" style={{ color: 'var(--color-text-primary)' }}>
                                  {rule.leftExpression}
                                </code>
                              </div>
                            )}
                            {rule.rightExpression && (
                              <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                                <span className="text-[10px] block text-gray-400 mb-1">
                                  {detail.inScopeWorkflows[1]?.name || 'Target'} Expression:
                                </span>
                                <code className="text-[11px]" style={{ color: matchingYellow }}>
                                  {rule.rightExpression}
                                </code>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── TAB 5: DAG OVERLAP ── */}
                {activeTab === 'dag' && (
                  <div className="space-y-4">
                    <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                          Pipeline Stage & Tool Topology Alignment
                        </h4>
                        <span className="text-xs font-bold" style={{ color: matchingYellow }}>
                          DAG Similarity: {detail.dagComparison.similarityScore}%
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {detail.dagComparison.stages.map((stage, stIdx) => (
                          <div
                            key={stIdx}
                            className="rounded-lg p-3 border flex items-center justify-between gap-4"
                            style={{
                              backgroundColor: 'var(--color-surface)',
                              borderColor: 'var(--color-border-subtle)',
                            }}
                          >
                            <div>
                              <span className="font-bold text-xs block" style={{ color: 'var(--color-text-primary)' }}>
                                Stage {stIdx + 1}: {stage.stageName}
                              </span>
                              <span className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                                {stage.description}
                              </span>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 text-xs font-mono font-bold">
                              <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px]">
                                {stage.leftToolCount} tools
                              </span>
                              <ArrowRight size={12} style={{ color: 'var(--color-text-tertiary)' }} />
                              <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px]">
                                {stage.rightToolCount} tools
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-3 rounded-lg border text-xs" style={{ backgroundColor: 'var(--color-accent-subtle)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}>
                        <strong style={{ color: 'var(--color-accent)' }}>Topology Summary: </strong>
                        {detail.dagComparison.topologyAlignment}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── Data Subsumption Matrix (For Consolidate) OR Safety Checks (For Retire) ── */}
            {isConsolidate && detail.subsumptionItems && (
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <ShieldCheck size={14} style={{ color: '#22C55E' }} />
                  Data Subsumption & Feature Coverage Matrix
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr style={{ color: 'var(--color-text-tertiary)' }}>
                        <th className="pb-2 font-semibold">Data Flow / Transformation</th>
                        <th className="pb-2 font-semibold">Absorbed Candidate Status</th>
                        <th className="pb-2 font-semibold">Master Target Status</th>
                        <th className="pb-2 font-semibold text-right">Subsumption Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                      {detail.subsumptionItems.map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="py-2.5 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            {item.attributeOrTransformation}
                            <span className="block text-[11px] font-normal" style={{ color: 'var(--color-text-tertiary)' }}>
                              {item.details}
                            </span>
                          </td>
                          <td className="py-2.5 font-mono text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                            {item.candidateStatus}
                          </td>
                          <td className="py-2.5 font-mono text-[11px]" style={{ color: '#22C55E' }}>
                            {item.targetStatus}
                          </td>
                          <td className="py-2.5 text-right">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                              {item.subsumptionType}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!isConsolidate && detail.retirementSafetyChecks && (
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  <ShieldCheck size={14} style={{ color: '#22C55E' }} />
                  Retirement Safety & Downstream Dependency Audit
                </h3>

                <div className="space-y-2.5">
                  {detail.retirementSafetyChecks.map((chk, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg p-3 border flex items-start justify-between gap-3"
                      style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-xs block" style={{ color: 'var(--color-text-primary)' }}>
                            {chk.checkItem}
                          </span>
                          <span className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                            {chk.details}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                        {chk.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Rationale & Validation Requirements ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rationale */}
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2"
                  style={{ color: 'var(--color-accent)' }}
                >
                  <Sparkles size={14} />
                  System Rationale
                </h3>
                <ul className="space-y-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {detail.rationalePoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Validation Requirements */}
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <h3
                  className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-2"
                  style={{ color: '#F59E0B' }}
                >
                  <AlertCircle size={14} />
                  Pre-Action Validation Requirements
                </h3>
                <ul className="space-y-2 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {detail.validationRequirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
           * 3. ACTION FOOTER
           * ══════════════════════════════════════════════════════════ */}
          <div
            className="flex items-center justify-between px-6 py-4 border-t shrink-0"
            style={{
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Decline / Dismiss
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors hover:opacity-90"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Mail size={14} />
                <span>Notify Stakeholders</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onToast(
                    isConsolidate
                      ? `Consolidation recommendation for ${rec.title} approved and scheduled for execution.`
                      : `Decommission recommendation for ${rec.title} approved. Retirement audit recorded.`
                  );
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all hover:opacity-90"
                style={{
                  backgroundColor: isConsolidate ? '#22C55E' : '#EF4444',
                  color: '#FFFFFF',
                  boxShadow: isConsolidate
                    ? '0 4px 14px rgba(34, 197, 94, 0.4)'
                    : '0 4px 14px rgba(239, 68, 68, 0.4)',
                }}
              >
                <CheckCircle2 size={15} />
                <span>
                  {isConsolidate ? 'Apply Consolidation' : 'Decommission Workflow'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Email Notification Modal ── */}
      {showEmail && (
        <EmailNotificationModal
          rec={rec}
          type={isConsolidate ? 'merge' : 'decommission'}
          onClose={() => setShowEmail(false)}
          onSend={(msg) => {
            setShowEmail(false);
            onToast(msg);
          }}
        />
      )}
    </>
  );
}
