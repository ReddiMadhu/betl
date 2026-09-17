import { useState, Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import {
  X,
  GitMerge,
  Trash2,
  Mail,
  ExternalLink,
  Layers,
  Cpu,
  Database,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Target,
  CheckCircle,
  AlertTriangle,
  Workflow,
} from 'lucide-react';
import type { Recommendation } from '../../data/rationalizationData';
import {
  getEtlCandidateDetail,
  TECHNOLOGY_LOGOS,
  getComplexityCriticalityBadgeStyle,
  getComplexityCriticalityColor,
} from '../../data/rationalizationData';
import type {
  EtlCandidateDetailDTO,
  EtlDatasetComparison,
  EtlTargetComparison,
} from '../../data/rationalizationData';
import { allAssets } from '../../data/discoveryData';
import type { Asset } from '../../data/discoveryData';
import EmailNotificationModal from './EmailNotificationModal';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackLabel?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class EvidenceErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('EvidenceErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="p-4 rounded-xl border flex items-center gap-3 text-xs"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            borderColor: 'rgba(239, 68, 68, 0.35)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <AlertTriangle size={16} className="text-red-400 shrink-0" />
          <div>
            <span className="font-bold text-red-300 block">
              {this.props.fallbackLabel || 'Evidence Panel Encountered An Error'}
            </span>
            <span className="text-[11px] text-gray-400">
              {this.state.error?.message || 'Unable to render this evidence tab for the current candidate.'}
            </span>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

interface Props {
  rec: Recommendation;
  onClose: () => void;
  onToast: (message: string) => void;
  onAssetDetail?: (asset: Asset) => void;
}

type OverlapMetricKey = 'source' | 'target' | 'frequency' | 'logic' | 'dag';

export default function EtlRationalisationReviewModal({
  rec,
  onClose,
  onToast,
  onAssetDetail,
}: Props) {
  const [showEmail, setShowEmail] = useState(false);
  const [activeEvidenceMetric, setActiveEvidenceMetric] = useState<OverlapMetricKey>('source');
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({
    'src-A-0': true,
    'src-B-0': true,
  });
  const [expandedTargets, setExpandedTargets] = useState<Record<string, boolean>>({
    'tgt-A-0': true,
    'tgt-B-0': true,
  });

  const detail: EtlCandidateDetailDTO = getEtlCandidateDetail(rec);

  const toggleSource = (key: string) => {
    setExpandedSources((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleTarget = (key: string) => {
    setExpandedTargets((prev) => ({
      ...prev,
      [key]: !prev[key],
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
  const isOrphan = detail.recommendationBadge === 'Orphan Cascade' || rec.tags?.some((t) => /orphan/i.test(t)) || rec.id === 'er4';
  const badgeColor = isConsolidate ? '#34d399' : isOrphan ? '#EC4899' : '#fbbf24';

  const wfA = detail.inScopeWorkflows[0];
  const wfB = detail.inScopeWorkflows[1];
  const wfA_name = wfA?.name || 'Workflow A';
  const wfB_name = wfB?.name || (isConsolidate ? 'Target Workflow' : 'Active Replacement');

  // Sources split by workflow
  const sourcesA = detail.sourcesComparison.filter((s) => s.leftPresent);
  const sourcesB = detail.sourcesComparison.filter((s) => s.rightPresent);
  const sharedSourcesCount = detail.sourcesComparison.filter((s) => s.matchStatus === 'exact').length;
  const sharedSourceFieldsCount = detail.dataSubsumptionEvidence?.sharedRequiredFields?.length ||
    detail.sourcesComparison.reduce((acc, s) => acc + (s.matchingColumnsCount || 0), 0);

  // Targets split by workflow
  const targetsA = detail.targetsComparison.filter((t) => t.leftPresent);
  const targetsB = detail.targetsComparison.filter((t) => t.rightPresent);
  const sharedTargetsCount = detail.targetsComparison.filter((t) => t.matchStatus === 'exact').length;
  const sharedTargetFieldsCount = detail.targetsComparison.reduce(
    (acc, t) => acc + (t.columns?.filter((c) => c.isMatching).length || 0),
    0
  );

  return (
    <>
      <div
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
      >
        <div
          className="rounded-2xl border w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden my-auto"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ══════════════════════════════════════════════════════════
           * 1. MODAL HEADER (Matching Alteryx Header Structure)
           * ══════════════════════════════════════════════════════════ */}
          <div
            className="flex items-start justify-between px-6 py-5 border-b shrink-0 gap-4"
            style={{
              borderColor: 'var(--color-border-subtle)',
              backgroundColor: 'var(--color-surface)',
            }}
          >
            <div>
              <div
                className="text-[10.5px] font-extrabold uppercase tracking-widest mb-1"
                style={{ color: 'var(--color-accent)' }}
              >
                DETAILED OPPORTUNITY ANALYSIS
              </div>
              <h2
                className="text-xl sm:text-2xl font-extrabold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {detail.title}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold border"
                  style={{
                    backgroundColor: `${badgeColor}15`,
                    borderColor: `${badgeColor}40`,
                    color: badgeColor,
                  }}
                >
                  {isConsolidate ? <GitMerge size={12} /> : <Trash2 size={12} />}
                  {detail.recommendationBadge}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.12)',
                  borderColor: 'rgba(59, 130, 246, 0.35)',
                  color: '#60a5fa',
                }}
                title="Compose and send rationalisation recommendation email"
              >
                <Mail size={14} />
                <span>Email</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg border cursor-pointer transition-colors hover:opacity-80"
                style={{
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-secondary)',
                }}
                title="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
           * 2. SCROLLABLE CONTENT BODY (Alteryx Information Architecture)
           * ══════════════════════════════════════════════════════════ */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* ── Section A: In-Scope Workflows (Side-by-Side Comparison) ── */}
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-wider mb-2.5"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                IN-SCOPE WORKFLOWS
              </div>
              <div
                className={`grid gap-4 ${
                  detail.inScopeWorkflows.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {detail.inScopeWorkflows.map((wf, idx) => {
                  const logo = TECHNOLOGY_LOGOS[wf.technology];
                  const isRetainedMaster = idx === 1 && isConsolidate;
                  return (
                    <div
                      key={wf.id || idx}
                      className="p-4 rounded-xl border flex flex-col justify-between gap-3 relative overflow-hidden"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: isRetainedMaster
                          ? 'rgba(16, 185, 129, 0.4)'
                          : 'var(--color-border-primary)',
                      }}
                    >
                      {isRetainedMaster && (
                        <div className="absolute top-0 right-0 bg-emerald-500/15 text-emerald-400 border-b border-l border-emerald-500/30 text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-bl">
                          Retained Master Target
                        </div>
                      )}

                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2">
                          {logo && <img src={logo} alt={wf.technology} className="w-4 h-4 object-contain" />}
                          <div className="text-sm font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                            {wf.name}
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded border"
                            style={getComplexityCriticalityBadgeStyle(wf.complexity)}
                          >
                            Complexity: {wf.complexity}
                          </span>
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded border"
                            style={getComplexityCriticalityBadgeStyle(wf.criticality)}
                          >
                            Criticality: {wf.criticality}
                          </span>
                        </div>
                      </div>

                      {/* Inspect Workflow Action */}
                      <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <button
                          type="button"
                          onClick={() => handleInspect(wf.id, wf.name)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all hover:opacity-90"
                          style={{
                            backgroundColor: 'var(--color-bg-tertiary)',
                            borderColor: 'var(--color-border-primary)',
                            color: 'var(--color-accent)',
                          }}
                        >
                          <span>Inspect Workflow</span>
                          <ExternalLink size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* ── Section G: Recommendation Rationale ── */}
            <div className="space-y-2">
              <div
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                RECOMMENDATION RATIONALE
              </div>
              <div
                className="p-4 rounded-xl border space-y-3"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-subtle)',
                }}
              >
                {detail.rationalePoints.map((point, idx) => {
                  const badgeMatch = point.match(/^(INACTIVE|ZOMBIE ETL|ZOMBIE ETLS|SUBSET|CROSS TECHNOLOGY|ORPHAN CASCADE)\s*[—–-]\s*([^:]+):\s*(.+)$/i);
                  if (badgeMatch) {
                    const [, rawBadge, subtitle, explanation] = badgeMatch;
                    const badgeUpper = rawBadge.toUpperCase();
                    const tagColorMap: Record<string, string> = {
                      'INACTIVE': '#F43F5E',
                      'ZOMBIE ETL': '#3B82F6',
                      'ZOMBIE ETLS': '#3B82F6',
                      'SUBSET': '#F97316',
                      'CROSS TECHNOLOGY': '#A855F7',
                      'ORPHAN CASCADE': '#EC4899',
                    };
                    const tagColor = tagColorMap[badgeUpper] || '#EF4444';
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg border space-y-2"
                        style={{
                          backgroundColor: `${tagColor}08`,
                          borderColor: `${tagColor}25`,
                        }}
                      >
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span
                            className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border"
                            style={{
                              backgroundColor: `${tagColor}15`,
                              color: tagColor,
                              borderColor: `${tagColor}35`,
                              boxShadow: `0 1px 4px ${tagColor}20`,
                            }}
                          >
                            {badgeUpper}
                          </span>
                          <span className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {subtitle.trim()}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                          {explanation.trim()}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--color-accent)' }} />
                      <span>{point}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ── Section B: Directional Merge Banner (Consolidate) OR Cutover Banner (Retire) ── */}
            {isConsolidate && wfB && (
              <div
                className="p-4 rounded-xl border flex flex-col gap-2.5"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderColor: 'rgba(16, 185, 129, 0.35)',
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <GitMerge size={16} className="text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Consolidation Direction
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded text-emerald-400"
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)' }}
                  >
                    Deterministic Merge
                  </span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap text-sm font-bold">
                  <div className="px-3 py-1 rounded bg-amber-500/12 text-amber-300 border border-amber-500/30">
                    {wfA_name} <span className="text-[11px] opacity-80">(Absorbed Candidate)</span>
                  </div>
                  <span className="text-emerald-400 font-extrabold text-base">➔</span>
                  <div className="px-3 py-1 rounded bg-emerald-500/12 text-emerald-300 border border-emerald-500/30">
                    {wfB_name} <span className="text-[11px] opacity-80">(Retained Superset Workflow)</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {detail.direction.bannerText}
                </p>
              </div>
            )}

            {!isConsolidate && isOrphan && (
              <div
                className="p-4 rounded-xl border flex flex-col gap-2.5"
                style={{
                  backgroundColor: 'rgba(236, 72, 153, 0.06)',
                  borderColor: 'rgba(236, 72, 153, 0.35)',
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Trash2 size={16} className="text-pink-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                      Orphan Cascade Lineage & Dependency
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded text-pink-400"
                    style={{ backgroundColor: 'rgba(236, 72, 153, 0.15)' }}
                  >
                    BI-Induced ETL Decommission
                  </span>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap text-sm font-bold">
                    <div className="px-3 py-1 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                      <span>{detail.direction.retained.name}</span>
                      <span className="text-[10px] opacity-80 font-normal">({detail.direction.retained.tech} — Inactive / Decommission)</span>
                    </div>
                    <span className="text-pink-400 font-extrabold text-base">➔</span>
                    <div className="px-3 py-1 rounded bg-pink-500/15 text-pink-300 border border-pink-500/30 flex items-center gap-1.5">
                      <span>{detail.direction.absorbed.name}</span>
                      <span className="text-[10px] opacity-80 font-normal">({detail.direction.absorbed.tech} — Orphan Cascade)</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {detail.direction.bannerText}
                </p>
              </div>
            )}

            {!isConsolidate && !isOrphan && wfB && (
              <div
                className="p-4 rounded-xl border flex flex-col gap-2.5"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.05)',
                  borderColor: 'rgba(239, 68, 68, 0.35)',
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Trash2 size={16} className="text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Retirement Cutover / Coverage
                    </span>
                  </div>
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded text-emerald-400"
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)' }}
                  >
                    Covered by Target Workflow
                  </span>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2.5 flex-wrap text-sm font-bold">
                    <div className="px-3 py-1 rounded bg-red-500/12 text-red-300 border border-red-500/30">
                      {wfA_name} <span className="text-[11px] opacity-80">(To Be Retired)</span>
                    </div>
                    <span className="text-emerald-400 font-extrabold text-base">➔</span>
                    <div className="px-3 py-1 rounded bg-emerald-500/12 text-emerald-300 border border-emerald-500/30">
                      {wfB_name} <span className="text-[11px] opacity-80">(Active Replacement)</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInspect(wfB.id, wfB.name)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all hover:opacity-90"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border-primary)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    <span>Inspect Replacement</span>
                    <ExternalLink size={11} />
                  </button>
                </div>
                <p className="text-xs leading-relaxed mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  {detail.direction.bannerText}
                </p>
              </div>
            )}

            {/* ── Section C: Interactive Overlap Evidence Metric Selector ── */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  OVERLAP EVIDENCE (CLICK TO INSPECT)
                </div>
                <div className="text-[11px] font-semibold text-yellow-400">
                  Select metric to inspect matching evidence
                </div>
              </div>

              {/* 5 Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-4">
                {[
                  {
                    key: 'source' as const,
                    label: 'Source Metadata Overlap',
                    val: detail.overlapMetrics.sourceMetadataPct,
                    icon: Database,
                  },
                  {
                    key: 'target' as const,
                    label: 'Target Metadata Overlap',
                    val: detail.overlapMetrics.targetMetadataPct,
                    icon: Target,
                  },
                  {
                    key: 'frequency' as const,
                    label: 'Frequency Overlap',
                    val: detail.overlapMetrics.frequencyPct,
                    icon: Clock,
                  },
                  {
                    key: 'logic' as const,
                    label: 'Logic Overlap',
                    val: detail.overlapMetrics.logicPct,
                    icon: Cpu,
                  },
                  {
                    key: 'dag' as const,
                    label: 'DAG Overlap',
                    val: detail.overlapMetrics.dagPct,
                    icon: Layers,
                  },
                ].map((m) => {
                  const isSelected = activeEvidenceMetric === m.key;
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.key}
                      type="button"
                      onClick={() => setActiveEvidenceMetric(m.key)}
                      className="p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 flex flex-col justify-between gap-1.5"
                      style={{
                        backgroundColor: isSelected ? 'rgba(234, 179, 8, 0.09)' : 'var(--color-surface)',
                        borderColor: isSelected ? '#facc15' : 'var(--color-border-subtle)',
                        boxShadow: isSelected ? '0 0 12px rgba(234, 179, 8, 0.18)' : 'none',
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: isSelected ? '#facc15' : 'var(--color-text-secondary)' }}>
                        <Icon size={13} style={{ color: isSelected ? '#facc15' : 'var(--color-text-tertiary)' }} />
                        <span className="truncate">{m.label}</span>
                      </div>
                      <span className="text-xl font-extrabold tabular-nums" style={{ color: isSelected ? '#facc15' : 'var(--color-text-primary)' }}>
                        {m.val}%
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Section D: Side-by-Side Evidence Inspection Panel (Exact 2-Column Comparative Layout) ── */}
            <EvidenceErrorBoundary fallbackLabel="Error loading evidence inspection panel">
              <div className="space-y-4">
                {/* TAB 1: SOURCE METADATA EVIDENCE */}
                {activeEvidenceMetric === 'source' && (
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        SOURCE DATASETS & COLUMN HEADERS (YELLOW = MATCHING)
                      </div>
                      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                        {sharedSourcesCount > 0 && (
                          <span>Source Identity: <strong className="text-yellow-400">{sharedSourcesCount} matching</strong></span>
                        )}
                        <span>Field Metadata: <strong className="text-yellow-400">{sharedSourceFieldsCount} matching fields</strong></span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left Column: Workflow A Sources */}
                      <div className="p-4 rounded-xl border space-y-2.5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                        <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {wfA_name} ({sourcesA.length} source{sourcesA.length !== 1 ? 's' : ''})
                        </div>
                        {sourcesA.length === 0 ? (
                          <div className="text-xs text-gray-400 py-3">No input sources configured</div>
                        ) : (
                          sourcesA.map((src: EtlDatasetComparison, idx: number) => {
                            const isMatch = src.matchStatus === 'exact';
                            const sourceKey = `src-A-${idx}`;
                            const isExpanded = expandedSources[sourceKey] ?? true;
                            return (
                              <div
                                key={idx}
                                className="rounded-lg border overflow-hidden transition-all"
                                style={{
                                  backgroundColor: isMatch ? 'rgba(234, 179, 8, 0.08)' : 'var(--color-bg-tertiary)',
                                  borderColor: isMatch ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-border-subtle)',
                                }}
                              >
                                <div
                                  onClick={() => toggleSource(sourceKey)}
                                  className="p-2.5 flex items-center justify-between cursor-pointer select-none"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span style={{ color: 'var(--color-text-tertiary)' }}>
                                      {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                    </span>
                                    <Database size={13} className={isMatch ? 'text-yellow-400 shrink-0' : 'text-gray-400 shrink-0'} />
                                    <span className={`text-xs font-bold truncate ${isMatch ? 'text-yellow-400' : 'text-gray-200'}`}>
                                      {src.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-[10.5px]">
                                    {src.matchingColumnsCount !== undefined && (
                                      <span className="text-gray-400">
                                        {src.matchingColumnsCount > 0 ? (
                                          <strong className="text-yellow-400">{src.matchingColumnsCount}/{src.totalColumnsCount} matching</strong>
                                        ) : (
                                          <span>{src.totalColumnsCount} fields</span>
                                        )}
                                      </span>
                                    )}
                                    {isMatch && (
                                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold uppercase bg-yellow-500/20 text-yellow-300">
                                        Matching Identity
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Expanded Field Badges */}
                                {isExpanded && src.columns && src.columns.length > 0 && (
                                  <div className="p-2.5 border-t flex flex-wrap gap-1.5" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                    {src.columns.map((col, cI) => (
                                      <span
                                        key={cI}
                                        className="px-2 py-0.5 rounded text-[10.5px] font-mono border"
                                        style={{
                                          backgroundColor: col.isMatching ? 'rgba(234, 179, 8, 0.18)' : 'var(--color-surface)',
                                          borderColor: col.isMatching ? 'rgba(234, 179, 8, 0.4)' : 'var(--color-border-subtle)',
                                          color: col.isMatching ? '#facc15' : 'var(--color-text-secondary)',
                                        }}
                                      >
                                        {col.isMatching ? `✓ ${col.name}` : col.name}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Right Column: Workflow B Sources */}
                      <div className="p-4 rounded-xl border space-y-2.5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                        <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                          {wfB_name} ({sourcesB.length} source{sourcesB.length !== 1 ? 's' : ''})
                        </div>
                        {sourcesB.length === 0 ? (
                          <div className="text-xs text-gray-400 py-3">No input sources configured</div>
                        ) : (
                          sourcesB.map((src: EtlDatasetComparison, idx: number) => {
                            const isMatch = src.matchStatus === 'exact';
                            const sourceKey = `src-B-${idx}`;
                            const isExpanded = expandedSources[sourceKey] ?? true;
                            return (
                              <div
                                key={idx}
                                className="rounded-lg border overflow-hidden transition-all"
                                style={{
                                  backgroundColor: isMatch ? 'rgba(234, 179, 8, 0.08)' : 'var(--color-bg-tertiary)',
                                  borderColor: isMatch ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-border-subtle)',
                                }}
                              >
                                <div
                                  onClick={() => toggleSource(sourceKey)}
                                  className="p-2.5 flex items-center justify-between cursor-pointer select-none"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span style={{ color: 'var(--color-text-tertiary)' }}>
                                      {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                    </span>
                                    <Database size={13} className={isMatch ? 'text-yellow-400 shrink-0' : 'text-gray-400 shrink-0'} />
                                    <span className={`text-xs font-bold truncate ${isMatch ? 'text-yellow-400' : 'text-gray-200'}`}>
                                      {src.name}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 shrink-0 text-[10.5px]">
                                    {src.matchingColumnsCount !== undefined && (
                                      <span className="text-gray-400">
                                        {src.matchingColumnsCount > 0 ? (
                                          <strong className="text-yellow-400">{src.matchingColumnsCount}/{src.totalColumnsCount} matching</strong>
                                        ) : (
                                          <span>{src.totalColumnsCount} fields</span>
                                        )}
                                      </span>
                                    )}
                                    {isMatch && (
                                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold uppercase bg-yellow-500/20 text-yellow-300">
                                        Matching Identity
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Expanded Field Badges */}
                                {isExpanded && src.columns && src.columns.length > 0 && (
                                  <div className="p-2.5 border-t flex flex-wrap gap-1.5" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                    {src.columns.map((col, cI) => (
                                      <span
                                        key={cI}
                                        className="px-2 py-0.5 rounded text-[10.5px] font-mono border"
                                        style={{
                                          backgroundColor: col.isMatching ? 'rgba(234, 179, 8, 0.18)' : 'var(--color-surface)',
                                          borderColor: col.isMatching ? 'rgba(234, 179, 8, 0.4)' : 'var(--color-border-subtle)',
                                          color: col.isMatching ? '#facc15' : 'var(--color-text-secondary)',
                                        }}
                                      >
                                        {col.isMatching ? `✓ ${col.name}` : col.name}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: TARGET METADATA EVIDENCE */}
                {activeEvidenceMetric === 'target' && (
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-2.5">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        PRODUCTION TARGETS & OUTPUT SCHEMAS (YELLOW = MATCHING)
                      </div>
                      {(targetsA.length > 0 || targetsB.length > 0) && (
                        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          {sharedTargetsCount > 0 && (
                            <span>Target Identity: <strong className="text-yellow-400">{sharedTargetsCount} matching</strong></span>
                          )}
                          <span>Output Schema: <strong className="text-yellow-400">{sharedTargetFieldsCount} matching output fields</strong></span>
                        </div>
                      )}
                    </div>

                    {targetsA.length === 0 && targetsB.length === 0 ? (
                      <div
                        className="p-4 rounded-xl border text-xs text-gray-400"
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: 'var(--color-border-primary)',
                        }}
                      >
                        <div className="font-semibold text-gray-300 mb-1">
                          Target metadata evidence unavailable
                        </div>
                        <div>
                          {isConsolidate
                            ? 'No verified target metadata evidence is available for this consolidation candidate.'
                            : 'No verified target metadata evidence is available for this retirement candidate.'}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Left: Workflow A Targets */}
                        <div className="p-4 rounded-xl border space-y-2.5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                          <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {wfA_name} ({targetsA.length} target{targetsA.length !== 1 ? 's' : ''})
                          </div>
                          {targetsA.length === 0 ? (
                            <div className="text-xs text-gray-400 py-3">No production deliverables configured</div>
                          ) : (
                            targetsA.map((tgt: EtlTargetComparison, idx: number) => {
                              const isMatch = tgt.matchStatus === 'exact';
                              const targetKey = `tgt-A-${idx}`;
                              const isExpanded = expandedTargets[targetKey] ?? true;
                              return (
                                <div
                                  key={idx}
                                  className="rounded-lg border overflow-hidden"
                                  style={{
                                    backgroundColor: isMatch ? 'rgba(234, 179, 8, 0.08)' : 'var(--color-bg-tertiary)',
                                    borderColor: isMatch ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-border-subtle)',
                                  }}
                                >
                                  <div
                                    onClick={() => toggleTarget(targetKey)}
                                    className="p-2.5 flex items-center justify-between cursor-pointer select-none"
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span style={{ color: 'var(--color-text-tertiary)' }}>
                                        {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                      </span>
                                      <Target size={13} className={isMatch ? 'text-yellow-400 shrink-0' : 'text-gray-400 shrink-0'} />
                                      <span className={`text-xs font-bold truncate ${isMatch ? 'text-yellow-400' : 'text-gray-200'}`}>
                                        {tgt.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 text-[10.5px]">
                                      {isMatch && (
                                        <span className="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold uppercase bg-yellow-500/20 text-yellow-300">
                                          Matching Target
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {isExpanded && tgt.columns && tgt.columns.length > 0 && (
                                    <div className="p-2.5 border-t flex flex-wrap gap-1.5" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                      {tgt.columns.map((col, cI) => (
                                        <span
                                          key={cI}
                                          className="px-2 py-0.5 rounded text-[10.5px] font-mono border"
                                          style={{
                                            backgroundColor: col.isMatching ? 'rgba(234, 179, 8, 0.18)' : 'var(--color-surface)',
                                            borderColor: col.isMatching ? 'rgba(234, 179, 8, 0.4)' : 'var(--color-border-subtle)',
                                            color: col.isMatching ? '#facc15' : 'var(--color-text-secondary)',
                                          }}
                                        >
                                          {col.isMatching ? `✓ ${col.name}` : col.name}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>

                        {/* Right: Workflow B Targets */}
                        <div className="p-4 rounded-xl border space-y-2.5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                          <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {wfB_name} ({targetsB.length} target{targetsB.length !== 1 ? 's' : ''})
                          </div>
                          {targetsB.length === 0 ? (
                            <div className="text-xs text-gray-400 py-3">No production deliverables configured</div>
                          ) : (
                            targetsB.map((tgt: EtlTargetComparison, idx: number) => {
                              const isMatch = tgt.matchStatus === 'exact';
                              const targetKey = `tgt-B-${idx}`;
                              const isExpanded = expandedTargets[targetKey] ?? true;
                              return (
                                <div
                                  key={idx}
                                  className="rounded-lg border overflow-hidden"
                                  style={{
                                    backgroundColor: isMatch ? 'rgba(234, 179, 8, 0.08)' : 'var(--color-bg-tertiary)',
                                    borderColor: isMatch ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-border-subtle)',
                                  }}
                                >
                                  <div
                                    onClick={() => toggleTarget(targetKey)}
                                    className="p-2.5 flex items-center justify-between cursor-pointer select-none"
                                  >
                                    <div className="flex items-center gap-2 min-w-0">
                                      <span style={{ color: 'var(--color-text-tertiary)' }}>
                                        {isExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                      </span>
                                      <Target size={13} className={isMatch ? 'text-yellow-400 shrink-0' : 'text-gray-400 shrink-0'} />
                                      <span className={`text-xs font-bold truncate ${isMatch ? 'text-yellow-400' : 'text-gray-200'}`}>
                                        {tgt.name}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0 text-[10.5px]">
                                      {isMatch && (
                                        <span className="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold uppercase bg-yellow-500/20 text-yellow-300">
                                          Matching Target
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {isExpanded && tgt.columns && tgt.columns.length > 0 && (
                                    <div className="p-2.5 border-t flex flex-wrap gap-1.5" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                      {tgt.columns.map((col, cI) => (
                                        <span
                                          key={cI}
                                          className="px-2 py-0.5 rounded text-[10.5px] font-mono border"
                                          style={{
                                            backgroundColor: col.isMatching ? 'rgba(234, 179, 8, 0.18)' : 'var(--color-surface)',
                                            borderColor: col.isMatching ? 'rgba(234, 179, 8, 0.4)' : 'var(--color-border-subtle)',
                                            color: col.isMatching ? '#facc15' : 'var(--color-text-secondary)',
                                          }}
                                        >
                                          {col.isMatching ? `✓ ${col.name}` : col.name}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 3: FREQUENCY OVERLAP */}
                {activeEvidenceMetric === 'frequency' && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                      OPERATIONAL EXECUTION FREQUENCY (YELLOW = MATCHING SCHEDULE)
                    </div>
                    {detail.frequencyComparison ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div
                          className="p-4 rounded-xl border flex flex-col gap-2"
                          style={{
                            backgroundColor: detail.frequencyComparison.overlapPct === 100 ? 'rgba(234, 179, 8, 0.08)' : 'var(--color-surface)',
                            borderColor: detail.frequencyComparison.overlapPct === 100 ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-border-primary)',
                          }}
                        >
                          <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{wfA_name}</div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className={detail.frequencyComparison.overlapPct === 100 ? 'text-yellow-400' : 'text-gray-400'} />
                            <span className={`text-base font-bold ${detail.frequencyComparison.overlapPct === 100 ? 'text-yellow-400' : 'text-gray-200'}`}>
                              {detail.frequencyComparison.leftSchedule || 'Not configured'}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-400 space-y-0.5">
                            <div>Trigger: {detail.frequencyComparison.leftTrigger || 'N/A'}</div>
                            <div>Runtime: {detail.frequencyComparison.leftRuntime || 'N/A'}</div>
                          </div>
                          <div className="text-[11px] font-semibold text-yellow-400 mt-1">
                            {detail.frequencyComparison.overlapPct === 100 ? 'Matching Operational Schedule' : ''}
                          </div>
                        </div>

                        <div
                          className="p-4 rounded-xl border flex flex-col gap-2"
                          style={{
                            backgroundColor: detail.frequencyComparison.overlapPct === 100 ? 'rgba(234, 179, 8, 0.08)' : 'var(--color-surface)',
                            borderColor: detail.frequencyComparison.overlapPct === 100 ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-border-primary)',
                          }}
                        >
                          <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{wfB_name}</div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className={detail.frequencyComparison.overlapPct === 100 ? 'text-yellow-400' : 'text-gray-400'} />
                            <span className={`text-base font-bold ${detail.frequencyComparison.overlapPct === 100 ? 'text-yellow-400' : 'text-gray-200'}`}>
                              {detail.frequencyComparison.rightSchedule || 'N/A'}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-400 space-y-0.5">
                            <div>Trigger: {detail.frequencyComparison.rightTrigger || 'N/A'}</div>
                            <div>Runtime: {detail.frequencyComparison.rightRuntime || 'N/A'}</div>
                          </div>
                          <div className="text-[11px] font-semibold text-yellow-400 mt-1">
                            {detail.frequencyComparison.overlapPct === 100 ? 'Matching Operational Schedule' : ''}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-xl border text-xs text-gray-400" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                        No frequency overlap evidence available for this candidate.
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: LOGIC OVERLAP */}
                {activeEvidenceMetric === 'logic' && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                      OPERATIONAL LOGIC & TRANSFORMATIONS (YELLOW = SHARED / EQUIVALENT)
                    </div>
                    {(() => {
                      // Support both leftOperations/rightOperations and legacy rules
                      const opsA: { text: string; isShared: boolean }[] =
                        detail.logicComparison?.leftOperations?.map((op) => ({
                          text: op.operationText,
                          isShared: op.isShared,
                        })) ||
                        detail.logicComparison?.rules?.map((r) => ({
                          text: `${r.name}: ${r.leftExpression || r.description}`,
                          isShared: r.matchType === 'Identical' || r.matchType === 'Equivalent',
                        })) || [];

                      const opsB: { text: string; isShared: boolean }[] =
                        detail.logicComparison?.rightOperations?.map((op) => ({
                          text: op.operationText,
                          isShared: op.isShared,
                        })) ||
                        detail.logicComparison?.rules?.map((r) => ({
                          text: `${r.name}: ${r.rightExpression || r.description}`,
                          isShared: r.matchType === 'Identical' || r.matchType === 'Equivalent',
                        })) || [];

                      if (opsA.length === 0 && opsB.length === 0) {
                        return (
                          <div className="p-4 rounded-xl border text-xs text-gray-400" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                            No transformation logic comparison recorded for this candidate.
                          </div>
                        );
                      }

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Left: Logic A */}
                          <div className="p-4 rounded-xl border space-y-2.5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                            <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                              {wfA_name} ({opsA.length} operation{opsA.length !== 1 ? 's' : ''})
                            </div>
                            {opsA.map((op, idx) => {
                              const isShared = op.isShared;
                              return (
                                <div
                                  key={idx}
                                  className="p-2.5 rounded-lg border flex items-center justify-between gap-2"
                                  style={{
                                    backgroundColor: isShared ? 'rgba(234, 179, 8, 0.08)' : 'var(--color-bg-tertiary)',
                                    borderColor: isShared ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-border-subtle)',
                                  }}
                                >
                                  <span className={`text-xs break-words ${isShared ? 'font-bold text-yellow-400' : 'text-gray-200'}`}>
                                    {op.text}
                                  </span>
                                  {isShared && (
                                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold uppercase bg-yellow-500/20 text-yellow-300 shrink-0">
                                      Shared
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Right: Logic B */}
                          <div className="p-4 rounded-xl border space-y-2.5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                            <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                              {wfB_name} ({opsB.length} operation{opsB.length !== 1 ? 's' : ''})
                            </div>
                            {opsB.map((op, idx) => {
                              const isShared = op.isShared;
                              return (
                                <div
                                  key={idx}
                                  className="p-2.5 rounded-lg border flex items-center justify-between gap-2"
                                  style={{
                                    backgroundColor: isShared ? 'rgba(234, 179, 8, 0.08)' : 'var(--color-bg-tertiary)',
                                    borderColor: isShared ? 'rgba(234, 179, 8, 0.45)' : 'var(--color-border-subtle)',
                                  }}
                                >
                                  <span className={`text-xs break-words ${isShared ? 'font-bold text-yellow-400' : 'text-gray-200'}`}>
                                    {op.text}
                                  </span>
                                  {isShared && (
                                    <span className="px-1.5 py-0.5 rounded text-[9.5px] font-extrabold uppercase bg-yellow-500/20 text-yellow-300 shrink-0">
                                      Shared
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* TAB 5: DAG OVERLAP */}
                {activeEvidenceMetric === 'dag' && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                      DAG TOPOLOGY & COMPLEXITY ATTRIBUTES
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: DAG A */}
                      <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                        <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{wfA_name}</div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                            <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>Nodes / Tools</span>
                            <span className="text-base font-bold tabular-nums" style={{ color: 'var(--color-text-primary)' }}>{wfA?.toolCount ?? 20}</span>
                          </div>
                          <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                            <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>Connections</span>
                            <span className="text-base font-bold tabular-nums" style={{ color: 'var(--color-text-primary)' }}>{wfA?.connectionsCount ?? 20}</span>
                          </div>
                          <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                            <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>Complexity</span>
                            <span className="text-xs font-bold" style={{ color: getComplexityCriticalityColor(wfA?.complexity) }}>{wfA?.complexity || 'Medium'}</span>
                          </div>
                          <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                            <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>Criticality</span>
                            <span className="text-xs font-bold" style={{ color: getComplexityCriticalityColor(wfA?.criticality) }}>{wfA?.criticality || 'Medium'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: DAG B / No Active Replacement */}
                      {wfB ? (
                        <div className="p-4 rounded-xl border space-y-3" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                          <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>{wfB.name}</div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                              <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>Nodes / Tools</span>
                              <span className="text-base font-bold tabular-nums" style={{ color: 'var(--color-text-primary)' }}>{wfB.toolCount}</span>
                            </div>
                            <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                              <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>Connections</span>
                              <span className="text-base font-bold tabular-nums" style={{ color: 'var(--color-text-primary)' }}>{wfB.connectionsCount ?? wfB.toolCount}</span>
                            </div>
                            <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                              <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>Complexity</span>
                              <span className="text-xs font-bold" style={{ color: getComplexityCriticalityColor(wfB.complexity) }}>{wfB.complexity}</span>
                            </div>
                            <div className="p-2.5 rounded-lg border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                              <span className="text-[10px] block" style={{ color: 'var(--color-text-tertiary)' }}>Criticality</span>
                              <span className="text-xs font-bold" style={{ color: getComplexityCriticalityColor(wfB.criticality) }}>{wfB.criticality}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 rounded-xl border flex flex-col items-center justify-center text-center space-y-2.5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}>
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-400" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                            <Workflow size={20} />
                          </div>
                          <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            No Active Replacement
                          </div>
                          <p className="text-xs max-w-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                            {isOrphan
                              ? 'No replacement workflow required. Pipeline is being decommissioned due to downstream BI consumer retirement (Orphan Cascade).'
                              : 'No replacement workflow is configured for this Zombie / Inactive candidate.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </EvidenceErrorBoundary>

            {/* ── Section E: Comprehensive Data Subsumption Layers (Layer 1 & Layer 2) (For Consolidate) ── */}
            {isConsolidate && detail.dataSubsumptionEvidence && (
              <div
                className="p-5 rounded-xl border space-y-5"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.05)',
                  borderColor: 'rgba(16, 185, 129, 0.35)',
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-3" style={{ borderColor: 'rgba(16, 185, 129, 0.25)' }}>
                  <div className="flex items-center gap-2">
                    <GitMerge size={18} className="text-emerald-400" />
                    <span className="text-sm font-extrabold uppercase tracking-wider text-emerald-400">
                      DETERMINISTIC DATA-SUPERSET SUBSUMPTION EVIDENCE
                    </span>
                  </div>
                  <span
                    className="text-[11.5px] font-bold px-2.5 py-1 rounded text-emerald-300"
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}
                  >
                    100% Data Sufficiency + Substitutable Processing
                  </span>
                </div>

                {/* Layer 1: Source Metadata Analysis */}
                <div className="space-y-3">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                    Layer 1: Source Metadata Analysis
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                      <div className="text-[11px] text-gray-400">Source Metadata Coverage</div>
                      <div className="text-2xl font-extrabold text-emerald-400">
                        {Math.round((detail.dataSubsumptionEvidence.dataCoveragePct || 1) * 100)}%
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-0.5">0 missing fields required</div>
                    </div>
                    <div className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                      <div className="text-[11px] text-gray-400">Shared Required Fields</div>
                      <div className="text-2xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
                        {detail.dataSubsumptionEvidence.sharedRequiredFields.length}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Fully available in target workflow</div>
                    </div>
                    <div className="p-3 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                      <div className="text-[11px] text-gray-400">Additional Target Fields</div>
                      <div className="text-2xl font-extrabold text-blue-400">
                        +{detail.dataSubsumptionEvidence.additionalFieldsInTarget.length}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">Superset enrichment</div>
                    </div>
                  </div>

                  {/* Required Fields Verified Cloud */}
                  <div className="p-3.5 rounded-lg border" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                    <div className="text-xs font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
                      Required Fields Verified in Retained Workflow ({detail.dataSubsumptionEvidence.sharedRequiredFields.length}):
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {detail.dataSubsumptionEvidence.sharedRequiredFields.map((fld, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold"
                          style={{
                            backgroundColor: 'rgba(16, 185, 129, 0.12)',
                            color: '#34d399',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                          }}
                        >
                          ✓ {fld}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Field Provenance Table */}
                  {Object.keys(detail.dataSubsumptionEvidence.fieldProvenanceMap || {}).length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                        Field Provenance & Origin Details
                      </div>
                      <div className="rounded-lg border overflow-x-auto" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b" style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                              <th className="p-2.5 font-bold">Field Name</th>
                              <th className="p-2.5 font-bold">Source / Dataset</th>
                              <th className="p-2.5 font-bold">Origin & Provenance Path</th>
                              <th className="p-2.5 font-bold">Sample Values</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            {Object.entries(detail.dataSubsumptionEvidence.fieldProvenanceMap).map(([fname, prov], idx) => (
                              <tr key={idx} className="hover:bg-white/[0.02]">
                                <td className="p-2.5 font-mono font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                  {prov.originalName || fname}
                                </td>
                                <td className="p-2.5" style={{ color: 'var(--color-text-secondary)' }}>
                                  {prov.sourceDataset}
                                </td>
                                <td className="p-2.5" style={{ color: 'var(--color-text-secondary)' }}>
                                  {prov.provenance}
                                </td>
                                <td className="p-2.5 font-mono text-emerald-400">
                                  {prov.sampleValues && prov.sampleValues.length > 0 ? prov.sampleValues.slice(0, 3).join(', ') : 'Verified in pipeline'}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Layer 2: Processing Substitutability Matrix */}
                {detail.dataSubsumptionEvidence.processingSubstitutabilityMatrix && detail.dataSubsumptionEvidence.processingSubstitutabilityMatrix.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
                      Layer 2: Logic & DAG Overlap (Processing Substitutability Matrix)
                    </div>
                    <div className="rounded-lg border overflow-x-auto" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}>
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b" style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                            <th className="p-2.5 font-bold">Source Tool / Op</th>
                            <th className="p-2.5 font-bold">Operation Type</th>
                            <th className="p-2.5 font-bold">Target Equivalent Capability</th>
                            <th className="p-2.5 font-bold">Compatibility</th>
                            <th className="p-2.5 font-bold">Technical Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                          {detail.dataSubsumptionEvidence.processingSubstitutabilityMatrix.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02]">
                              <td className="p-2.5 font-bold" style={{ color: 'var(--color-text-primary)' }}>
                                Tool #{row.sourceToolId}: {row.sourceOperation || row.sourceToolType}
                              </td>
                              <td className="p-2.5 font-semibold" style={{ color: 'var(--color-accent)' }}>
                                {row.sourceToolType}
                              </td>
                              <td className="p-2.5" style={{ color: 'var(--color-text-secondary)' }}>
                                {row.targetEquivalent}
                              </td>
                              <td className="p-2.5">
                                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  {row.status || 'SUPPORTED'}
                                </span>
                              </td>
                              <td className="p-2.5 text-gray-300">
                                {row.notes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Section F: Downstream Dependency & Retirement Safety Audit (For Retire) ── */}
            {!isConsolidate && detail.retirementSafetyChecks && (
              <div
                className="p-5 rounded-xl border space-y-3"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.05)',
                  borderColor: 'rgba(239, 68, 68, 0.35)',
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-3" style={{ borderColor: 'rgba(239, 68, 68, 0.25)' }}>
                  <div className="flex items-center gap-2">
                    <Trash2 size={18} className="text-red-400" />
                    <span className="text-sm font-extrabold uppercase tracking-wider text-red-400">
                      DOWNSTREAM DEPENDENCY & RETIREMENT SAFETY AUDIT
                    </span>
                  </div>
                  <span
                    className="text-[11.5px] font-bold px-2.5 py-1 rounded text-emerald-300"
                    style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)' }}
                  >
                    5 Pre-Retirement Checks Verified
                  </span>
                </div>

                <div className="space-y-2">
                  {detail.retirementSafetyChecks.map((chk, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border flex items-start justify-between gap-3"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border-subtle)',
                      }}
                    >
                      <div className="flex items-start gap-2.5">
                        <Check className="text-emerald-400 shrink-0 mt-0.5" size={15} />
                        <div>
                          <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {chk.checkItem}
                          </div>
                          <div className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                            {chk.details}
                          </div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                        {chk.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            

            {/* ── Section H: Validation Checklist ── */}
            {detail.validationRequirements.length > 0 && (
              <div>
                <div
                  className="text-[11px] font-bold uppercase tracking-wider mb-2"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  PRE-DECOMMISSIONING & EXECUTION VALIDATION CHECKLIST
                </div>
                <div
                  className="p-4 rounded-xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border-subtle)',
                  }}
                >
                  {detail.validationRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════════════════════════
           * 3. ACTION FOOTER
           * ══════════════════════════════════════════════════════════ */}
          <div
            className="flex items-center justify-between px-6 py-4 border-t shrink-0"
            style={{
              borderColor: 'var(--color-border-subtle)',
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
                <CheckCircle size={15} />
                <span>
                  {isConsolidate ? 'Apply Consolidation' : 'Decommission Workflow'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
