import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeftRight,
  GitMerge,
  Trash2,
  ShieldCheck,
  ExternalLink,
  X,
  CheckCircle,
} from 'lucide-react';
import {
  recommendations,
  getOverlapMetrics,
  isCrossTechRecommendation,
  getEtlCandidateDetail,
} from '../../data/rationalizationData';
import type { Recommendation, TechnologyName } from '../../data/rationalizationData';
import { useCountUp } from '../../hooks/useAnimations';
import type { OverlapMetric } from '../../data/rationalizationData';
import MergeReviewModal from './MergeReviewModal';
import DecommissionReviewModal from './DecommissionReviewModal';
import EtlRationalisationReviewModal from './EtlRationalisationReviewModal';
import DownloadDocumentationButton from './DownloadDocumentationButton';
import { allAssets } from '../../data/discoveryData';
import type { Asset } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * RationalizationResults — BI Compass-inspired layout
 *
 * 1. Header + BI|ETL tabs to the right + Active Rules banner
 * 2. Uniform Overlap Metric Cards
 * 3. Filter bar: search + All|Consolidate|Decommission|Keep pills
 * 4. Three-column parallel grid (All) or single column (filtered)
 * 5. Each card: name, assets, uniqueness%, metadata, rationale, action
 * 6. Start Migration CTA
 * ───────────────────────────────────────────────────────── */

/* ── Uniform Metric card ── */
const CROSS_TECH_COLOR = '#8B5CF6';

function MetricPill({
  metric,
  index,
  onClick,
  isActive,
}: {
  metric: OverlapMetric;
  index: number;
  onClick?: () => void;
  isActive?: boolean;
}) {
  const count = useCountUp(metric.value, 900, 150 + index * 70);
  const isClickable = !!onClick;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.04, duration: 0.3 }}
      onClick={onClick}
      className={`rounded-xl border p-4 theme-transition flex flex-col justify-between h-full min-h-[90px] ${
        isClickable ? 'cursor-pointer hover:opacity-90 transition-transform hover:scale-[1.02]' : ''
      }`}
      style={{
        backgroundColor: isActive ? 'var(--color-bg-tertiary)' : 'var(--color-surface)',
        borderColor: isActive ? CROSS_TECH_COLOR : 'var(--color-border-primary)',
        boxShadow: isActive ? `0 0 0 1px ${CROSS_TECH_COLOR}` : '0 1px 3px var(--color-card-shadow)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-2xl font-bold tabular-nums tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {count}
        </span>
        {isActive && (
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
            style={{
              borderColor: CROSS_TECH_COLOR,
              color: CROSS_TECH_COLOR,
              backgroundColor: CROSS_TECH_COLOR + '15',
            }}
          >
            Filter Active
          </span>
        )}
      </div>
      <span className="text-[11px] font-medium leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
        {metric.label}
      </span>
    </motion.div>
  );
}

/** Helper to determine if a decommission recommendation involves both BI and ETL assets */
function isBiEtlDecommission(rec: Recommendation): boolean {
  const isDecom = rec.category === 'bi-retire' || rec.category === 'etl-retire';
  if (!isDecom) return false;

  const biTechs: TechnologyName[] = ['Tableau', 'Power BI', 'MicroStrategy', 'ThoughtSpot'];
  const etlTechs: TechnologyName[] = ['Alteryx', 'Python'];

  const allAssets = [...rec.assets];
  if (rec.dependentAsset) allAssets.push(rec.dependentAsset);

  const hasBi = allAssets.some((a) => biTechs.includes(a.technology));
  const hasEtl = allAssets.some((a) => etlTechs.includes(a.technology));

  return hasBi && hasEtl;
}

/* ── Recommendation card — matches BI Compass card pattern ── */
function RecCard({
  rec,
  accentColor,
  bulletIcon,
  onCrossTechClick,
  crossTechActive,
  onReview,
}: {
  rec: Recommendation;
  accentColor: string;
  bulletIcon: string;
  onCrossTechClick?: () => void;
  crossTechActive?: boolean;
  onReview?: () => void;
}) {
  const isCrossTech = isCrossTechRecommendation(rec);
  const isBiEtlDecom = isBiEtlDecommission(rec);
  return (
    <div
      className="rounded-2xl border p-5 theme-transition flex flex-col gap-3 transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: isCrossTech && crossTechActive
          ? CROSS_TECH_COLOR + '50'
          : 'var(--color-border-primary)',
        boxShadow: isCrossTech && crossTechActive
          ? `0 2px 12px ${CROSS_TECH_COLOR}15`
          : '0 1px 4px var(--color-card-shadow)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor + '40';
        e.currentTarget.style.boxShadow = `0 4px 20px ${accentColor}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = isCrossTech && crossTechActive
          ? CROSS_TECH_COLOR + '50'
          : 'var(--color-border-primary)';
        e.currentTarget.style.boxShadow = isCrossTech && crossTechActive
          ? `0 2px 12px ${CROSS_TECH_COLOR}15`
          : '0 1px 4px var(--color-card-shadow)';
      }}
    >
      {/* Top: title + uniqueness badge or BI<=>ETL tag */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4 className="text-[14px] font-bold leading-snug mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
            {rec.title}
          </h4>
          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{rec.businessArea}</p>
        </div>
        {rec.overlapPct !== undefined && (
          <span
            className="text-[10px] font-bold shrink-0 px-2 py-1 rounded-lg border"
            style={{
              color: accentColor,
              backgroundColor: accentColor + '10',
              borderColor: accentColor + '20',
            }}
          >
            {rec.overlapPct}% overlap
          </span>
        )}
        {isBiEtlDecom && (
          <span
            className="text-[10px] font-bold shrink-0 px-2 py-0.5 rounded-md border inline-flex items-center gap-1 shadow-sm"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              color: '#A78BFA',
              borderColor: 'rgba(139, 92, 246, 0.4)',
            }}
          >
            BI &lt;=&gt; ETL
          </span>
        )}
      </div>

      {/* Affected assets with logos — standard vertical list */}
      {!rec.dependentAsset && (
        <div className="flex flex-col gap-1.5">
          {rec.assets.map((a) => (
            <div key={a.name} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded flex items-center justify-center p-0.5 shrink-0"
                style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
              >
                <img src={a.logo} alt={a.technology} className="w-full h-full object-contain" />
              </div>
              <span className="text-[12px] font-medium truncate" style={{ color: 'var(--color-text-secondary)' }}>
                {a.name}
              </span>
              <span className="text-[10px] ml-auto shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                {a.technology}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* BI ↔ ETL dependency — side by side with double arrow */}
      {rec.dependentAsset && (
        <div className="flex flex-col gap-1.5">
          {rec.assets.map((a) => (
            <div key={a.name} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded flex items-center justify-center p-0.5 shrink-0"
                style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
              >
                <img src={a.logo} alt={a.technology} className="w-full h-full object-contain" />
              </div>
              <span className="text-[12px] font-medium truncate" style={{ color: 'var(--color-text-secondary)' }}>
                {a.name}
              </span>
              <span className="text-[10px] ml-auto shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
                {a.technology}
              </span>
            </div>
          ))}
          {/* Double arrow connector */}
          <div className="flex items-center gap-2 py-1 px-2">
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to right, ${CROSS_TECH_COLOR}40, ${CROSS_TECH_COLOR})` }}
            />
            <ArrowLeftRight size={14} style={{ color: CROSS_TECH_COLOR }} />
            <div
              className="flex-1 h-px"
              style={{ background: `linear-gradient(to left, ${CROSS_TECH_COLOR}40, ${CROSS_TECH_COLOR})` }}
            />
          </div>
          {/* Dependent ETL/BI asset */}
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded flex items-center justify-center p-0.5 shrink-0"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <img src={rec.dependentAsset.logo} alt={rec.dependentAsset.technology} className="w-full h-full object-contain" />
            </div>
            <span className="text-[12px] font-medium truncate" style={{ color: 'var(--color-text-secondary)' }}>
              {rec.dependentAsset.name}
            </span>
            <span className="text-[10px] ml-auto shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>
              {rec.dependentAsset.technology}
            </span>
          </div>
        </div>
      )}

      {/* Governance Rationale box */}
      <div
        className="rounded-xl p-3 border"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          borderColor: 'var(--color-border-subtle)',
        }}
      >
        <p
          className="text-[9px] font-bold uppercase tracking-widest mb-1.5"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          AI Rationale
        </p>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          <span style={{ color: accentColor, fontWeight: 700, marginRight: '4px' }}>{bulletIcon}</span>
          {rec.rationale}
        </p>
      </div>

      {/* Tags — includes cross-technology clickable badge & BI<=>ETL decommission tag */}
      <div className="flex flex-wrap gap-1">
        {isCrossTech && (
          <button
            type="button"
            onClick={onCrossTechClick}
            className="text-[9px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded cursor-pointer transition-all duration-200 border"
            style={{
              backgroundColor: crossTechActive ? CROSS_TECH_COLOR : CROSS_TECH_COLOR + '15',
              color: crossTechActive ? '#FFFFFF' : CROSS_TECH_COLOR,
              borderColor: crossTechActive ? CROSS_TECH_COLOR : CROSS_TECH_COLOR + '30',
            }}
          >
            Cross-Technology
          </button>
        )}
        {isBiEtlDecom && (
          <span
            className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border inline-flex items-center gap-1"
            style={{
              backgroundColor: 'rgba(139, 92, 246, 0.15)',
              color: '#A78BFA',
              borderColor: 'rgba(139, 92, 246, 0.35)',
            }}
          >
            BI &lt;=&gt; ETL
          </span>
        )}
        {rec.tags && rec.tags.map((t) => (
          <span
            key={t}
            className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
            style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-tertiary)' }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Footer: action + review button */}
      <div
        className="flex items-center justify-between pt-2 border-t gap-2"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <p className="text-[11px] leading-snug flex-1" style={{ color: 'var(--color-text-tertiary)' }}>
          {rec.action}
        </p>
        {onReview && (
          <button
            type="button"
            onClick={onReview}
            className="px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1 shrink-0"
            style={{
              backgroundColor: accentColor,
              color: accentColor === '#22C55E' ? '#FFFFFF' : '#0F172A',
              border: 'none',
              boxShadow: `0 2px 8px ${accentColor}25`,
            }}
          >
            {rec.category.includes('merge') ? 'Review Merger' : 'Review Details'}
            <ArrowRight size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Individual ETL Candidate Card (Compact Opportunity Card) ── */
function EtlCandidateCard({
  cand,
  onReview,
  onInspect,
}: {
  cand: Recommendation;
  onReview: () => void;
  onInspect: (idOrName: string) => void;
}) {
  const isConsolidate = cand.category === 'etl-merge';
  const detail = getEtlCandidateDetail(cand);

  const wf1 = detail.inScopeWorkflows[0];
  const wf2 = detail.inScopeWorkflows[1];

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6 space-y-4 transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      }}
    >
      {/* Workflow Identification Strip: Header -> Workflow Name -> Complexity + Criticality -> Inspect */}
      <div
        className="rounded-xl border p-3.5 space-y-2.5"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          borderColor: 'var(--color-border-subtle)',
        }}
      >
        <span className="text-[10.5px] font-bold uppercase tracking-wider block" style={{ color: 'var(--color-text-tertiary)' }}>
          {isConsolidate ? 'WORKFLOW TO BE CONSOLIDATED' : 'WORKFLOW TO BE RETIRED'}
        </span>

        <div className="text-base font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
          {wf1?.name || cand.assets[0]?.name}
        </div>

        {wf1 && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded border"
              style={{
                backgroundColor: wf1.complexity === 'High' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                borderColor: wf1.complexity === 'High' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                color: wf1.complexity === 'High' ? '#EF4444' : '#F59E0B',
              }}
            >
              Complexity: {wf1.complexity}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded border"
              style={{
                backgroundColor: wf1.criticality === 'High' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                borderColor: wf1.criticality === 'High' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                color: wf1.criticality === 'High' ? '#EF4444' : '#F59E0B',
              }}
            >
              Criticality: {wf1.criticality}
            </span>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={() => onInspect(wf1?.id || wf1?.name || cand.assets[0]?.name)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-accent)',
            }}
          >
            <span>Inspect</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Directional Data-Superset Merge Callout Banner (for consolidate) */}
      {isConsolidate && wf2 && (
        <div
          className="rounded-xl border p-4 space-y-2.5"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.08)',
            borderColor: 'rgba(16, 185, 129, 0.35)',
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <GitMerge size={16} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                DIRECTIONAL DATA-SUPERSET MERGE
              </span>
            </div>
            <span className="text-[11px] font-bold" style={{ color: 'var(--color-text-tertiary)' }}>
              Subsumption Rule Matched
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap text-xs font-bold">
            <span className="px-2.5 py-1 rounded border bg-amber-500/15 text-amber-300 border-amber-500/35">
              {wf1?.name} (Absorbed)
            </span>
            <span className="text-emerald-400 font-extrabold">↓ can be consolidated into ↓</span>
            <span className="px-2.5 py-1 rounded border bg-emerald-500/15 text-emerald-300 border-emerald-500/35">
              {wf2?.name} (Retained Superset)
            </span>
          </div>
        </div>
      )}

      {/* Retained Replacement Banner for Retire Candidate (if pairwise) */}
      {!isConsolidate && (cand.id === 'er1' || cand.id === 'er3') && (
        <div
          className="rounded-xl border p-3.5 flex items-center justify-between flex-wrap gap-3"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.06)',
            borderColor: 'rgba(239, 68, 68, 0.25)',
          }}
        >
          <div className="flex items-center gap-2 text-xs">
            <span style={{ color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
              {cand.id === 'er3' ? 'Modernization Cutover Replacement:' : 'Replaced / Covered By:'}
            </span>
            <span className="px-2.5 py-0.5 rounded border text-xs font-bold bg-emerald-500/15 text-emerald-300 border-emerald-500/35">
              {cand.id === 'er3' ? 'claims_processing (Python)' : 'Claims_Extract_Volume'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onInspect(cand.id === 'er3' ? 'claims_processing' : 'Claims_Extract_Volume')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-bold cursor-pointer transition-all hover:opacity-90"
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
      )}

      {/* Five Overlap Evidence Metrics — Vertically Stacked in exact required order */}
      <div className="space-y-2.5 pt-1">
        {[
          { label: 'Source Metadata Overlap', value: detail.overlapMetrics.sourceMetadataPct },
          { label: 'Target Metadata Overlap', value: detail.overlapMetrics.targetMetadataPct },
          { label: 'Frequency Overlap', value: detail.overlapMetrics.frequencyPct },
          { label: 'Logic Overlap', value: detail.overlapMetrics.logicPct },
          { label: 'DAG Overlap', value: detail.overlapMetrics.dagPct },
        ].map((m, mI) => {
          const fillColor = m.value >= 70 ? '#34d399' : m.value >= 40 ? '#fbbf24' : '#38bdf8';
          return (
            <div key={mI} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {m.label}
                </span>
                <span className="font-extrabold tabular-nums" style={{ color: fillColor }}>
                  {m.value}%
                </span>
              </div>
              <div
                className="w-full h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--color-border-subtle)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${m.value}%`, backgroundColor: fillColor }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Card Footer: View Detailed Analysis CTA Button */}
      <div
        className="flex items-center justify-end pt-3 border-t"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <button
          type="button"
          onClick={onReview}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white cursor-pointer transition-all shadow-md hover:brightness-110 active:scale-98"
          style={{
            backgroundColor: 'var(--color-accent)',
            boxShadow: '0 2px 8px var(--color-accent-glow)',
          }}
        >
          <span>View Detailed Analysis</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

/* ── Individual ETL Keep Card ── */
function EtlKeepCard({
  cand,
  onInspect,
}: {
  cand: Recommendation;
  onInspect: (idOrName: string) => void;
}) {
  const assetName = cand.assets[0]?.name || cand.title;
  const isPrimary = assetName === 'Claims_Extract_Volume' || assetName === 'Workflow_03';

  return (
    <div
      className="rounded-2xl border p-5 sm:p-6 space-y-4"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
      }}
    >
      {/* Workflow Identification Strip: Header -> Workflow Name -> Complexity + Criticality -> Inspect */}
      <div
        className="rounded-xl border p-3.5 space-y-2.5"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          borderColor: 'var(--color-border-subtle)',
        }}
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[10.5px] font-bold uppercase tracking-wider block" style={{ color: 'var(--color-text-tertiary)' }}>
            RETAINED WORKFLOW
          </span>
          <span
            className="text-[10.5px] font-bold px-2 py-0.5 rounded border"
            style={{
              backgroundColor: isPrimary ? 'rgba(56, 189, 248, 0.1)' : 'var(--color-bg-tertiary)',
              borderColor: isPrimary ? 'rgba(56, 189, 248, 0.25)' : 'var(--color-border-subtle)',
              color: isPrimary ? '#38bdf8' : 'var(--color-text-tertiary)',
            }}
          >
            {isPrimary ? 'Primary Retained' : 'Retain As-Is'}
          </span>
        </div>

        <div className="text-base font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
          {assetName}
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/25">
            Complexity: {assetName.includes('03') || assetName.includes('Extract') ? 'High' : 'Medium'}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-emerald-500/10 text-emerald-400 border-emerald-500/25">
            Criticality: {assetName.includes('03') || assetName.includes('Extract') ? 'High' : 'Medium'}
          </span>
        </div>

        <div>
          <button
            type="button"
            onClick={() => onInspect(assetName)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-all hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-accent)',
            }}
          >
            <span>Inspect Workflow</span>
            <ExternalLink size={12} />
          </button>
        </div>
      </div>

      {/* Rationale Callout Banner */}
      <div
        className="rounded-xl border p-3.5 space-y-1"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          borderColor: 'var(--color-border-subtle)',
        }}
      >
        <span className="text-[10.5px] font-bold uppercase tracking-wider block" style={{ color: 'var(--color-text-tertiary)' }}>
          DECISION RATIONALE
        </span>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {isPrimary
            ? 'Primary workflow retained after rationalisation analysis. Meets enterprise grain and data quality requirements.'
            : cand.rationale || 'The workflow is not identified as a rationalisation candidate and is retained for continued operation.'}
        </p>
      </div>

      {/* Footer Metrics */}
      <div
        className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
          <span>Tools: <strong style={{ color: 'var(--color-text-primary)' }}>{assetName.includes('03') ? 29 : assetName.includes('Extract') ? 24 : 16}</strong></span>
          <span>Inputs: <strong style={{ color: 'var(--color-text-primary)' }}>{assetName.includes('Distribution') ? 2 : 4}</strong></span>
          <span>Outputs: <strong style={{ color: 'var(--color-text-primary)' }}>{assetName.includes('03') ? 2 : assetName.includes('Extract') ? 5 : 1}</strong></span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 *  MAIN
 * ═══════════════════════════════════════════════════════════ */

interface Props {
  onStartMigration?: () => void;
  onAssetDetail?: (asset: Asset) => void;
}

export default function RationalizationResults({ onStartMigration, onAssetDetail }: Props) {
  const [activeSection, setActiveSection] = useState<'bi' | 'etl'>('bi');
  const [activeTab, setActiveTab] = useState<'all' | 'merge' | 'decommission' | 'keep'>('all');
  const [search, setSearch] = useState('');
  const [crossTechFilterColumn, setCrossTechFilterColumn] = useState<'merge' | 'decommission' | 'all' | null>(null);
  const [etlModalRec, setEtlModalRec] = useState<Recommendation | null>(null);
  const [mergeModalRec, setMergeModalRec] = useState<Recommendation | null>(null);
  const [decommissionModalRec, setDecommissionModalRec] = useState<Recommendation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTagFilter, setActiveTagFilter] = useState<{ column: 'merge' | 'decommission'; tag: string } | null>(null);

  const handleReviewRec = useCallback((r: Recommendation, defaultType: 'merge' | 'decommission') => {
    const isEtl =
      r.category.startsWith('etl-') ||
      r.assets.some((a) => a.technology === 'Alteryx' || a.technology === 'Python');
    if (isEtl) {
      setEtlModalRec(r);
    } else if (defaultType === 'merge') {
      setMergeModalRec(r);
    } else {
      setDecommissionModalRec(r);
    }
  }, []);

  const handleInspectWorkflow = useCallback((workflowIdOrName: string) => {
    if (!onAssetDetail) return;
    const found =
      allAssets.find((a) => a.id === workflowIdOrName || a.canonicalId === workflowIdOrName) ||
      allAssets.find((a) => a.name.toLowerCase() === workflowIdOrName.toLowerCase());
    if (found) {
      onAssetDetail(found);
    }
  }, [onAssetDetail]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const metrics = useMemo(() => getOverlapMetrics(activeSection), [activeSection]);

  // Filter recs by section, tab, and search
  const sectionRecs = useMemo(() => {
    const biCats = ['merge-bi', 'bi-retire', 'bi-keep', 'bi-etl-connections'];
    const etlCats = ['etl-merge', 'etl-retire', 'etl-keep'];
    return recommendations.filter((r) =>
      activeSection === 'bi' ? biCats.includes(r.category) : etlCats.includes(r.category),
    );
  }, [activeSection]);

  const filterBySearch = (list: Recommendation[]) => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.businessArea.toLowerCase().includes(q) ||
        r.assets.some((a) => a.name.toLowerCase().includes(q) || a.technology.toLowerCase().includes(q)),
    );
  };

  const mergeRecs = useMemo(
    () => filterBySearch(sectionRecs.filter((r) => r.category === (activeSection === 'bi' ? 'merge-bi' : 'etl-merge'))),
    [sectionRecs, search, activeSection],
  );
  const retireRecs = useMemo(
    () => filterBySearch(sectionRecs.filter((r) => r.category === (activeSection === 'bi' ? 'bi-retire' : 'etl-retire'))),
    [sectionRecs, search, activeSection],
  );
  const keepRecs = useMemo(
    () => filterBySearch(
      sectionRecs.filter((r) => r.category === (activeSection === 'bi' ? 'bi-keep' : 'etl-keep')),
    ),
    [sectionRecs, search, activeSection],
  );

  // Toggle cross-tech filter per column or globally
  const toggleCrossTechFilter = useCallback((column: 'merge' | 'decommission' | 'all') => {
    setCrossTechFilterColumn((prev) => (prev === column ? null : column));
  }, []);

  // ── Explicit tag configurations per mode (always shown even if count is 0) ──
  const mergeTags = useMemo(() => ['Cross Technology', 'Same Technology'], []);
  const decommissionTags = useMemo(() => {
    if (activeSection === 'bi') {
      return ['Inactive', 'Subset', 'Cross Technology'];
    }
    return ['Orphan Cascade', 'Zombie ETLs', 'Subset', 'Cross Technology', 'Inactive'];
  }, [activeSection]);

  const classifyDecommissionRec = useCallback((rec: Recommendation, section: 'bi' | 'etl'): string[] => {
    const tags: string[] = [];
    if (section === 'bi') {
      // BI decommission tags: Inactive, Subset, Cross Technology
      const hasInactive = rec.tags?.some((t) => /inactive|unused|\d+d\s*(inactive|unused)/i.test(t)) ||
        (rec.lastViewed ? parseInt(rec.lastViewed) > 180 : false);
      const hasSubset = !hasInactive && (rec.tags?.some((t) => /redundant|legacy|superseded|subset/i.test(t)) || rec.assets[0]?.name === 'Claims Cube');
      const isCross = isCrossTechRecommendation(rec) || rec.tags?.some((t) => /cross-?(tech|platform)/i.test(t));
      if (hasInactive) tags.push('Inactive');
      if (hasSubset) tags.push('Subset');
      if (isCross) tags.push('Cross Technology');
      if (tags.length === 0) tags.push('Subset'); // fallback
    } else {
      // ETL decommission tags: Orphan Cascade, Zombie ETLs, Subset, Cross Technology, Inactive
      const hasInactive = rec.tags?.some((t) => /inactive|unused|\d+d\s*(inactive|unused)/i.test(t)) ||
        (rec.lastViewed ? parseInt(rec.lastViewed) > 180 : false);
      const hasOrphan = rec.tags?.some((t) => /orphan/i.test(t)) || (rec.dependentAsset !== undefined && !isCrossTechRecommendation(rec));
      const hasSubset = rec.tags?.some((t) => /redundant|shared\s*logic|subset/i.test(t));
      const isCross = isCrossTechRecommendation(rec) || rec.tags?.some((t) => /cross-?(tech|platform)/i.test(t));
      const isZombie = !hasInactive && !hasOrphan && !hasSubset && !isCross && rec.tags?.some((t) => /zombie|no consumers|ad-hoc/i.test(t));
      if (hasOrphan) tags.push('Orphan Cascade');
      if (isZombie) tags.push('Zombie ETLs');
      if (hasSubset) tags.push('Subset');
      if (isCross) tags.push('Cross Technology');
      if (hasInactive) tags.push('Inactive');
    }
    return tags;
  }, []);

  // ── Compute tag counts for summary cards (defaults to 0 for all configured tags) ──
  const mergeTagCounts: Record<string, number> = useMemo(() => {
    const crossTech = mergeRecs.filter(isCrossTechRecommendation).length;
    const sameTech = mergeRecs.length - crossTech;
    return { 'Cross Technology': crossTech, 'Same Technology': sameTech };
  }, [mergeRecs]);

  const decommissionTagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    decommissionTags.forEach((t) => { counts[t] = 0; });
    retireRecs.forEach((r) => {
      const tags = classifyDecommissionRec(r, activeSection);
      tags.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return counts;
  }, [retireRecs, activeSection, classifyDecommissionRec, decommissionTags]);

  // ── Tag filter toggle ──
  const toggleTagFilter = useCallback((column: 'merge' | 'decommission', tag: string) => {
    setActiveTagFilter((prev) => {
      if (prev && prev.column === column && prev.tag === tag) return null;
      return { column, tag };
    });
    // Also sync crossTechFilterColumn for cross-tech tag clicks
    if (tag === 'Cross Technology') {
      setCrossTechFilterColumn((prev) => prev === column ? null : column);
    } else {
      setCrossTechFilterColumn(null);
    }
  }, []);

  // ── Filtered lists accounting for tag filter ──
  const displayedMergeRecs = useMemo(() => {
    if (activeTagFilter && activeTagFilter.column === 'merge') {
      if (activeTagFilter.tag === 'Cross Technology') return mergeRecs.filter(isCrossTechRecommendation);
      if (activeTagFilter.tag === 'Same Technology') return mergeRecs.filter((r) => !isCrossTechRecommendation(r));
    }
    if (crossTechFilterColumn === 'merge' || crossTechFilterColumn === 'all') return mergeRecs.filter(isCrossTechRecommendation);
    return mergeRecs;
  }, [mergeRecs, activeTagFilter, crossTechFilterColumn]);

  const displayedRetireRecs = useMemo(() => {
    if (activeTagFilter && activeTagFilter.column === 'decommission') {
      return retireRecs.filter((r) => classifyDecommissionRec(r, activeSection).includes(activeTagFilter.tag));
    }
    if (crossTechFilterColumn === 'decommission' || crossTechFilterColumn === 'all') return retireRecs.filter(isCrossTechRecommendation);
    return retireRecs;
  }, [retireRecs, activeTagFilter, crossTechFilterColumn, activeSection, classifyDecommissionRec]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* ════════════════════════════════════════════════════
       *  PAGE HEADING + START MIGRATION (above card)
       * ════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3.5 flex-wrap">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Rationalization Results
          </h1>

          {/* BI / ETL switch toggle beside Rationalization Results */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border select-none transition-colors"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 3px var(--color-card-shadow)',
            }}
          >
            <span
              onClick={() => {
                if (activeSection !== 'bi') {
                  setActiveSection('bi');
                  setActiveTab('all');
                  setSearch('');
                  setCrossTechFilterColumn(null);
                  setActiveTagFilter(null);
                }
              }}
              className="text-xs font-bold cursor-pointer transition-colors"
              style={{
                color: activeSection === 'bi' ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
              }}
            >
              BI
            </span>

            {/* Switch button between BI and ETL */}
            <button
              type="button"
              role="switch"
              aria-checked={activeSection === 'etl'}
              title={`Switch to ${activeSection === 'bi' ? 'ETL' : 'BI'} Rationalization`}
              onClick={() => {
                const next = activeSection === 'bi' ? 'etl' : 'bi';
                setActiveSection(next);
                setActiveTab('all');
                setSearch('');
                setCrossTechFilterColumn(null);
                setActiveTagFilter(null);
              }}
              className="w-10 h-5 rounded-full p-0.5 cursor-pointer transition-all duration-200 relative flex items-center shrink-0 border-0"
              style={{
                background: 'linear-gradient(135deg, var(--color-accent) 0%, #FF6B35 50%, #EA580C 100%)',
                boxShadow: '0 2px 6px rgba(251, 78, 11, 0.35)',
              }}
            >
              <motion.div
                animate={{ x: activeSection === 'etl' ? 20 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-3.5 h-3.5 rounded-full shadow-md"
                style={{
                  backgroundColor: '#FFFFFF',
                }}
              />
            </button>

            <span
              onClick={() => {
                if (activeSection !== 'etl') {
                  setActiveSection('etl');
                  setActiveTab('all');
                  setSearch('');
                  setCrossTechFilterColumn(null);
                  setActiveTagFilter(null);
                }
              }}
              className="text-xs font-bold cursor-pointer transition-colors"
              style={{
                color: activeSection === 'etl' ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
              }}
            >
              ETL
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Download Documentation Button */}
          <DownloadDocumentationButton type="rationalization" />
          {/* Start Migration button — top right */}
          {onStartMigration && (
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartMigration}
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white cursor-pointer transition-all duration-300 shadow-sm"
              style={{
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 2px 8px var(--color-accent-glow)',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 16px var(--color-accent-glow)';
                e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px var(--color-accent-glow)';
                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
              }}
              aria-label="Start Migration"
            >
              Start Migration
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          )}
        </div>
      </motion.div>

      {activeSection === 'etl' ? (
        /* ════════════════════════════════════════════════════
         *  ETL RATIONALISATION COMPACT VIEW (MATCHING BI STRUCTURE)
         * ════════════════════════════════════════════════════ */
        <>
          {/* CARD 1: KEY OBSERVATIONS */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-2xl border p-6 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-engine-border)',
              boxShadow: '0 2px 12px var(--color-card-shadow)',
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                  Key Observations
                </h2>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  ETL overlap analysis and cross-technology workflow insights
                </p>
              </div>
            </div>

            {/* 6 Overlap metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {metrics.map((m, i) => {
                const isCrossTech = m.id === 'cross-tech';
                return (
                  <MetricPill
                    key={`etl-${m.id}`}
                    metric={m}
                    index={i}
                    onClick={isCrossTech ? () => toggleCrossTechFilter('all') : undefined}
                    isActive={isCrossTech && crossTechFilterColumn === 'all'}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* KEY RECOMMENDATIONS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                  Key Recommendations
                </h2>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Actionable consolidation, decommission, and retention candidates
                </p>
              </div>
              {activeTagFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTagFilter(null);
                    setCrossTechFilterColumn(null);
                  }}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-md border cursor-pointer hover:opacity-80 transition-all flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span>Reset Filter</span>
                  <X size={12} />
                </button>
              )}
            </div>

            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Consolidate & Merge Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                className="rounded-xl border p-4 theme-transition flex flex-col justify-between min-h-[96px] gap-2.5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitMerge size={16} className="shrink-0" style={{ color: '#FBBF24' }} />
                    <h3 className="text-[13px] font-bold" style={{ color: '#FBBF24' }}>Consolidate & Merge</h3>
                  </div>
                  <span className="text-2xl font-bold tabular-nums tracking-tight text-amber-400">
                    {mergeRecs.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mergeTags.map((tag) => {
                    const count = mergeTagCounts[tag] ?? 0;
                    const isActive = activeTagFilter?.column === 'merge' && activeTagFilter?.tag === tag;
                    const tagColor = tag === 'Cross Technology' ? CROSS_TECH_COLOR : '#FBBF24';
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTagFilter('merge', tag)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold cursor-pointer transition-all duration-200 border hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                          backgroundColor: isActive ? tagColor : tagColor + '12',
                          color: isActive ? '#FFFFFF' : tagColor,
                          borderColor: isActive ? tagColor : tagColor + '30',
                          boxShadow: isActive ? `0 2px 8px ${tagColor}30` : 'none',
                        }}
                      >
                        <span>{tag}</span>
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold tabular-nums"
                          style={{
                            backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : tagColor + '18',
                            color: isActive ? '#FFFFFF' : tagColor,
                          }}
                        >
                          {count}
                        </span>
                        {isActive && <X size={10} />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Decommission Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.09, duration: 0.3 }}
                className="rounded-xl border p-4 theme-transition flex flex-col justify-between min-h-[96px] gap-2.5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trash2 size={16} className="shrink-0" style={{ color: '#EF4444' }} />
                    <h3 className="text-[13px] font-bold" style={{ color: '#EF4444' }}>Decommission</h3>
                  </div>
                  <span className="text-2xl font-bold tabular-nums tracking-tight text-red-400">
                    {retireRecs.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {decommissionTags.map((tag) => {
                    const count = decommissionTagCounts[tag] ?? 0;
                    const isActive = activeTagFilter?.column === 'decommission' && activeTagFilter?.tag === tag;
                    const tagColorMap: Record<string, string> = {
                      'Inactive': '#F43F5E',
                      'Subset': '#F97316',
                      'Cross Technology': CROSS_TECH_COLOR,
                      'Orphan Cascade': '#EC4899',
                      'Zombie ETLs': '#3B82F6',
                    };
                    const tagColor = tagColorMap[tag] || '#EF4444';
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTagFilter('decommission', tag)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold cursor-pointer transition-all duration-200 border hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                          backgroundColor: isActive ? tagColor : tagColor + '12',
                          color: isActive ? '#FFFFFF' : tagColor,
                          borderColor: isActive ? tagColor : tagColor + '30',
                          boxShadow: isActive ? `0 2px 8px ${tagColor}30` : 'none',
                        }}
                      >
                        <span>{tag}</span>
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold tabular-nums"
                          style={{
                            backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : tagColor + '18',
                            color: isActive ? '#FFFFFF' : tagColor,
                          }}
                        >
                          {count}
                        </span>
                        {isActive && <X size={10} />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Keep Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.13, duration: 0.3 }}
                className="rounded-xl border p-4 theme-transition flex flex-col justify-between min-h-[96px] gap-2.5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="shrink-0" style={{ color: '#22C55E' }} />
                    <h3 className="text-[13px] font-bold" style={{ color: '#22C55E' }}>Keep & Certify</h3>
                  </div>
                  <span className="text-2xl font-bold tabular-nums tracking-tight text-emerald-400">
                    {keepRecs.length}
                  </span>
                </div>
                <div />
              </motion.div>
            </div>
          </div>

          {/* Active Cross-Technology Filter Banner */}
          <AnimatePresence>
            {crossTechFilterColumn && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold overflow-hidden"
                style={{
                  backgroundColor: CROSS_TECH_COLOR + '12',
                  borderColor: CROSS_TECH_COLOR + '35',
                  color: CROSS_TECH_COLOR,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CROSS_TECH_COLOR }} />
                  <span>
                    Filtering by Cross-Technology:{' '}
                    <strong>
                      {crossTechFilterColumn === 'merge'
                        ? 'Consolidate & Merge only'
                        : crossTechFilterColumn === 'decommission'
                        ? 'Decommission only'
                        : 'All Columns'}
                    </strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCrossTechFilterColumn(null)}
                  className="px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer hover:opacity-80 transition-colors border"
                  style={{
                    backgroundColor: CROSS_TECH_COLOR,
                    borderColor: CROSS_TECH_COLOR,
                    color: '#FFFFFF',
                  }}
                >
                  Show All Recommendations ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Three-Column Grid with ETL Candidate Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`etl-${activeTab}-${search}-${activeTagFilter?.tag || ''}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`grid gap-6 ${activeTab === 'all' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}
            >
              {/* CONSOLIDATE & MERGE COLUMN */}
              {(activeTab === 'all' || activeTab === 'merge') && (
                <div className="space-y-4 flex flex-col">
                  {displayedMergeRecs.map((cand) => (
                    <EtlCandidateCard
                      key={cand.id}
                      cand={cand}
                      onReview={() => setEtlModalRec(cand)}
                      onInspect={(idOrName) => handleInspectWorkflow(idOrName)}
                    />
                  ))}
                  {displayedMergeRecs.length === 0 && (
                    <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                      {activeTagFilter?.column === 'merge' ? `No ${activeTagFilter.tag.toLowerCase()} merge recommendations.` : 'No merge recommendations.'}
                    </div>
                  )}
                </div>
              )}

              {/* DECOMMISSION COLUMN */}
              {(activeTab === 'all' || activeTab === 'decommission') && (
                <div className="space-y-4 flex flex-col">
                  {displayedRetireRecs.map((cand) => (
                    <EtlCandidateCard
                      key={cand.id}
                      cand={cand}
                      onReview={() => setEtlModalRec(cand)}
                      onInspect={(idOrName) => handleInspectWorkflow(idOrName)}
                    />
                  ))}
                  {displayedRetireRecs.length === 0 && (
                    <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                      {activeTagFilter?.column === 'decommission' ? `No ${activeTagFilter.tag.toLowerCase()} decommission recommendations.` : 'No decommission recommendations.'}
                    </div>
                  )}
                </div>
              )}

              {/* KEEP & CERTIFY COLUMN */}
              {(activeTab === 'all' || activeTab === 'keep') && (
                <div className="space-y-4 flex flex-col">
                  {keepRecs.map((k) => (
                    <EtlKeepCard
                      key={k.id}
                      cand={k}
                      onInspect={(idOrName) => handleInspectWorkflow(idOrName)}
                    />
                  ))}
                  {keepRecs.length === 0 && (
                    <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                      No keep recommendations.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        /* ════════════════════════════════════════════════════
         *  BI RATIONALISATION VIEW (UNCHANGED)
         * ════════════════════════════════════════════════════ */
        <>
          {/* CARD 1: KEY OBSERVATIONS */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="rounded-2xl border p-6 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-engine-border)',
              boxShadow: '0 2px 12px var(--color-card-shadow)',
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                  Key Observations
                </h2>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Overlap analysis and cross-technology dependency insights
                </p>
              </div>
            </div>

            {/* Overlap metrics row — uniform grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {metrics.map((m, i) => {
                const isCrossTech = m.id === 'cross-tech';
                return (
                  <MetricPill
                    key={`${activeSection}-${m.id}`}
                    metric={m}
                    index={i}
                    onClick={isCrossTech ? () => toggleCrossTechFilter('all') : undefined}
                    isActive={isCrossTech && crossTechFilterColumn === 'all'}
                  />
                );
              })}
            </div>
          </motion.div>

          {/* KEY RECOMMENDATIONS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                  Key Recommendations
                </h2>
                <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  Actionable consolidation, merge, decommission, and retention recommendations
                </p>
              </div>
              {activeTagFilter && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveTagFilter(null);
                    setCrossTechFilterColumn(null);
                  }}
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-md border cursor-pointer hover:opacity-80 transition-all flex items-center gap-1.5"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  <span>Reset Filter</span>
                  <X size={12} />
                </button>
              )}
            </div>

            {/* 3 Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Consolidate & Merge Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.3 }}
                className="rounded-xl border p-4 theme-transition flex flex-col justify-between min-h-[96px] gap-2.5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GitMerge size={16} className="shrink-0" style={{ color: 'var(--color-text-secondary)' }} />
                    <h3 className="text-[13px] font-bold" style={{ color: '#F59E0B' }}>Consolidate & Merge</h3>
                  </div>
                  <span className="text-2xl font-bold tabular-nums tracking-tight" style={{ color: '#F59E0B' }}>
                    {mergeRecs.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {mergeTags.map((tag) => {
                    const count = mergeTagCounts[tag] ?? 0;
                    const isActive = activeTagFilter?.column === 'merge' && activeTagFilter?.tag === tag;
                    const tagColor = tag === 'Cross Technology' ? CROSS_TECH_COLOR : '#F59E0B';
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTagFilter('merge', tag)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold cursor-pointer transition-all duration-200 border hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                          backgroundColor: isActive ? tagColor : tagColor + '12',
                          color: isActive ? '#FFFFFF' : tagColor,
                          borderColor: isActive ? tagColor : tagColor + '30',
                          boxShadow: isActive ? `0 2px 8px ${tagColor}30` : 'none',
                        }}
                      >
                        <span>{tag}</span>
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold tabular-nums"
                          style={{
                            backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : tagColor + '18',
                            color: isActive ? '#FFFFFF' : tagColor,
                          }}
                        >
                          {count}
                        </span>
                        {isActive && <X size={10} />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Decommission Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.09, duration: 0.3 }}
                className="rounded-xl border p-4 theme-transition flex flex-col justify-between min-h-[96px] gap-2.5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trash2 size={16} className="shrink-0" style={{ color: 'var(--color-text-secondary)' }} />
                    <h3 className="text-[13px] font-bold" style={{ color: '#EF4444' }}>Decommission</h3>
                  </div>
                  <span className="text-2xl font-bold tabular-nums tracking-tight" style={{ color: '#EF4444' }}>
                    {retireRecs.length}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {decommissionTags.map((tag) => {
                    const count = decommissionTagCounts[tag] ?? 0;
                    const isActive = activeTagFilter?.column === 'decommission' && activeTagFilter?.tag === tag;
                    const tagColorMap: Record<string, string> = {
                      'Inactive': '#F43F5E',
                      'Subset': '#F97316',
                      'Cross Technology': CROSS_TECH_COLOR,
                      'Orphan Cascade': '#EC4899',
                      'Zombie ETLs': '#3B82F6',
                    };
                    const tagColor = tagColorMap[tag] || '#EF4444';
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTagFilter('decommission', tag)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold cursor-pointer transition-all duration-200 border hover:scale-[1.03] active:scale-[0.97]"
                        style={{
                          backgroundColor: isActive ? tagColor : tagColor + '12',
                          color: isActive ? '#FFFFFF' : tagColor,
                          borderColor: isActive ? tagColor : tagColor + '30',
                          boxShadow: isActive ? `0 2px 8px ${tagColor}30` : 'none',
                        }}
                      >
                        <span>{tag}</span>
                        <span
                          className="px-1.5 py-0.5 rounded text-[9px] font-bold tabular-nums"
                          style={{
                            backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : tagColor + '18',
                            color: isActive ? '#FFFFFF' : tagColor,
                          }}
                        >
                          {count}
                        </span>
                        {isActive && <X size={10} />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Keep Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.13, duration: 0.3 }}
                className="rounded-xl border p-4 theme-transition flex flex-col justify-between min-h-[96px] gap-2.5"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="shrink-0" style={{ color: 'var(--color-text-secondary)' }} />
                    <h3 className="text-[13px] font-bold" style={{ color: '#22C55E' }}>Keep & Certify</h3>
                  </div>
                  <span className="text-2xl font-bold tabular-nums tracking-tight" style={{ color: '#22C55E' }}>
                    {keepRecs.length}
                  </span>
                </div>
                <div />
              </motion.div>
            </div>
          </div>

          {/* Active Cross-Technology Filter Banner */}
          <AnimatePresence>
            {crossTechFilterColumn && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs font-semibold overflow-hidden"
                style={{
                  backgroundColor: CROSS_TECH_COLOR + '12',
                  borderColor: CROSS_TECH_COLOR + '35',
                  color: CROSS_TECH_COLOR,
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CROSS_TECH_COLOR }} />
                  <span>
                    Filtering by Cross-Technology:{' '}
                    <strong>
                      {crossTechFilterColumn === 'merge'
                        ? 'Consolidate & Merge only'
                        : crossTechFilterColumn === 'decommission'
                        ? 'Decommission only'
                        : 'All Columns'}
                    </strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setCrossTechFilterColumn(null)}
                  className="px-2 py-1 rounded-md text-[11px] font-bold cursor-pointer hover:opacity-80 transition-colors border"
                  style={{
                    backgroundColor: CROSS_TECH_COLOR,
                    borderColor: CROSS_TECH_COLOR,
                    color: '#FFFFFF',
                  }}
                >
                  Show All Recommendations ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Three-Column Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeSection}-${activeTab}-${search}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`grid gap-6 ${activeTab === 'all' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}
            >
              {/* CONSOLIDATE & MERGE COLUMN */}
              {(activeTab === 'all' || activeTab === 'merge') && (
                <div className="space-y-4 flex flex-col">
                  {displayedMergeRecs.map((r) => (
                    <RecCard
                      key={r.id}
                      rec={r}
                      accentColor="#F59E0B"
                      bulletIcon="!"
                      onCrossTechClick={() => toggleCrossTechFilter('merge')}
                      crossTechActive={crossTechFilterColumn === 'merge' || crossTechFilterColumn === 'all'}
                      onReview={() => handleReviewRec(r, 'merge')}
                    />
                  ))}
                  {displayedMergeRecs.length === 0 && (
                    <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                      {activeTagFilter?.column === 'merge' ? `No ${activeTagFilter.tag.toLowerCase()} merge recommendations.` : 'No merge recommendations.'}
                    </div>
                  )}
                </div>
              )}

              {/* DECOMMISSION COLUMN */}
              {(activeTab === 'all' || activeTab === 'decommission') && (
                <div className="space-y-4 flex flex-col">
                  {displayedRetireRecs.map((r) => (
                    <RecCard
                      key={r.id}
                      rec={r}
                      accentColor="#EF4444"
                      bulletIcon="▲"
                      onCrossTechClick={() => toggleCrossTechFilter('decommission')}
                      crossTechActive={crossTechFilterColumn === 'decommission' || crossTechFilterColumn === 'all'}
                      onReview={() => handleReviewRec(r, 'decommission')}
                    />
                  ))}
                  {displayedRetireRecs.length === 0 && (
                    <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                      {activeTagFilter?.column === 'decommission' ? `No ${activeTagFilter.tag.toLowerCase()} decommission recommendations.` : 'No decommission recommendations.'}
                    </div>
                  )}
                </div>
              )}

              {/* KEEP & CERTIFY COLUMN */}
              {(activeTab === 'all' || activeTab === 'keep') && (
                <div className="space-y-4 flex flex-col">
                  {keepRecs.map((r) => (
                    <RecCard key={r.id} rec={r} accentColor="#22C55E" bulletIcon="✓" />
                  ))}
                  {keepRecs.length === 0 && (
                    <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                      No keep recommendations.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {/* ═══ Review Modals ═══ */}
      <AnimatePresence>
        {etlModalRec && (
          <EtlRationalisationReviewModal
            rec={etlModalRec}
            onClose={() => setEtlModalRec(null)}
            onToast={(msg) => setToastMessage(msg)}
            onAssetDetail={onAssetDetail}
          />
        )}
        {mergeModalRec && (
          <MergeReviewModal
            rec={mergeModalRec}
            onClose={() => setMergeModalRec(null)}
            onToast={(msg) => setToastMessage(msg)}
          />
        )}
        {decommissionModalRec && (
          <DecommissionReviewModal
            rec={decommissionModalRec}
            onClose={() => setDecommissionModalRec(null)}
            onToast={(msg) => setToastMessage(msg)}
          />
        )}
      </AnimatePresence>

      {/* ═══ Toast Notification ═══ */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-accent)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--color-accent-subtle)' }}
            >
              <CheckCircle size={18} style={{ color: 'var(--color-accent)' }} />
            </div>
            <div>
              <p className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Action Recorded
              </p>
              <p className="text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                {toastMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="ml-2 p-1 rounded-md text-xs cursor-pointer hover:opacity-80"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
