import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeftRight,
  GitMerge,
  Trash2,
  ShieldCheck,
  Search,
  X,
  CheckCircle,
} from 'lucide-react';
import {
  recommendations,
  getOverlapMetrics,
  isCrossTechRecommendation,
  getCrossTechCounts,
} from '../../data/rationalizationData';
import type { Recommendation, TechnologyName } from '../../data/rationalizationData';
import { useCountUp } from '../../hooks/useAnimations';
import type { OverlapMetric } from '../../data/rationalizationData';
import MergeReviewModal from './MergeReviewModal';
import DecommissionReviewModal from './DecommissionReviewModal';

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

  const biTechs: TechnologyName[] = ['Tableau', 'Power BI', 'MicroStrategy'];
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

/* ── Column header ── */
function ColumnHeader({
  icon: Icon,
  label,
  count,
  countLabel,
  color,
  crossTechCount,
  crossTechActive,
  onToggleCrossTech,
  onClearCrossTech,
}: {
  icon: typeof GitMerge;
  label: string;
  count: number;
  countLabel: string;
  color: string;
  crossTechCount?: number;
  crossTechActive?: boolean;
  onToggleCrossTech?: () => void;
  onClearCrossTech?: () => void;
}) {
  return (
    <div className="flex items-center justify-between pb-2 mb-1">
      <h3 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2" style={{ color }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <Icon size={13} />
        {label}
      </h3>
      <div className="flex items-center gap-1.5">
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
          style={{ color, backgroundColor: color + '10', borderColor: color + '20' }}
        >
          {count} {countLabel}
        </span>
        {crossTechCount !== undefined && crossTechCount > 0 && (
          <button
            type="button"
            onClick={onToggleCrossTech}
            title={crossTechActive ? 'Click to show all recommendations' : `Click to filter ${crossTechCount} cross-technology recommendations`}
            className="text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 cursor-pointer transition-all hover:scale-105 active:scale-95"
            style={{
              color: crossTechActive ? '#FFFFFF' : CROSS_TECH_COLOR,
              backgroundColor: crossTechActive ? CROSS_TECH_COLOR : CROSS_TECH_COLOR + '15',
              borderColor: crossTechActive ? CROSS_TECH_COLOR : CROSS_TECH_COLOR + '30',
              boxShadow: crossTechActive ? `0 2px 8px ${CROSS_TECH_COLOR}40` : 'none',
            }}
          >
            <span>{crossTechCount} Cross-Technology</span>
            {crossTechActive && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onClearCrossTech ? onClearCrossTech() : onToggleCrossTech?.();
                }}
                className="ml-0.5 hover:opacity-80 p-0.5 inline-flex items-center"
                title="Clear filter"
              >
                <X size={10} />
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
 *  MAIN
 * ═══════════════════════════════════════════════════════════ */

interface Props {
  onStartMigration?: () => void;
}

export default function RationalizationResults({ onStartMigration }: Props) {
  const [activeSection, setActiveSection] = useState<'bi' | 'etl'>('bi');
  const [activeTab, setActiveTab] = useState<'all' | 'merge' | 'decommission' | 'keep'>('all');
  const [search, setSearch] = useState('');
  const [crossTechFilterColumn, setCrossTechFilterColumn] = useState<'merge' | 'decommission' | 'all' | null>(null);
  const [mergeModalRec, setMergeModalRec] = useState<Recommendation | null>(null);
  const [decommissionModalRec, setDecommissionModalRec] = useState<Recommendation | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const totalCount = mergeRecs.length + retireRecs.length + keepRecs.length;

  // Cross-technology counts
  const crossTechCounts = useMemo(
    () => getCrossTechCounts(sectionRecs, activeSection),
    [sectionRecs, activeSection],
  );

  // Filtered lists accounting for cross-tech filter
  const displayedMergeRecs = useMemo(
    () => (crossTechFilterColumn === 'merge' || crossTechFilterColumn === 'all')
      ? mergeRecs.filter(isCrossTechRecommendation)
      : mergeRecs,
    [mergeRecs, crossTechFilterColumn],
  );
  const displayedRetireRecs = useMemo(
    () => (crossTechFilterColumn === 'decommission' || crossTechFilterColumn === 'all')
      ? retireRecs.filter(isCrossTechRecommendation)
      : retireRecs,
    [retireRecs, crossTechFilterColumn],
  );

  // Toggle cross-tech filter per column or globally
  const toggleCrossTechFilter = useCallback((column: 'merge' | 'decommission' | 'all') => {
    setCrossTechFilterColumn((prev) => (prev === column ? null : column));
  }, []);

  const tabPills: { id: typeof activeTab; label: string; count: number; color: string; dot: string }[] = [
    { id: 'all', label: 'All Recommendations', count: totalCount, color: 'var(--color-text-primary)', dot: '' },
    { id: 'merge', label: 'Consolidate', count: mergeRecs.length, color: '#F59E0B', dot: '#F59E0B' },
    { id: 'decommission', label: 'Decommission', count: retireRecs.length, color: '#EF4444', dot: '#EF4444' },
    { id: 'keep', label: 'Keep', count: keepRecs.length, color: '#22C55E', dot: '#22C55E' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* ════════════════════════════════════════════════════
       *  HEADER + KEY OBSERVATIONS + BI/ETL TABS + START MIGRATION
       * ════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border p-6 theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-engine-border)',
          boxShadow: '0 2px 12px var(--color-card-shadow)',
        }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Rationalization Results
            </h1>
            <p className="text-xs font-semibold tracking-wider uppercase mt-1" style={{ color: 'var(--color-accent)' }}>
              Key Observations
            </p>
          </div>

          {/* Right Controls: BI/ETL Toggle + Start Migration CTA */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto shrink-0">
            {/* BI / ETL toggle */}
            <div
              className="flex items-center gap-1 p-1 rounded-lg border inline-flex"
              style={{
                borderColor: 'var(--color-border-primary)',
                backgroundColor: 'var(--color-bg-tertiary)',
              }}
            >
              {(['bi', 'etl'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => { setActiveSection(s); setActiveTab('all'); setSearch(''); setCrossTechFilterColumn(null); }}
                  className="px-3.5 py-1.5 rounded-md text-[12px] font-semibold uppercase tracking-wider cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: activeSection === s ? 'var(--color-accent)' : 'transparent',
                    color: activeSection === s ? '#FFFFFF' : 'var(--color-text-secondary)',
                    border: 'none',
                  }}
                >
                  {s === 'bi' ? 'BI Rationalization' : 'ETL Rationalization'}
                </button>
              ))}
            </div>

            {/* Start Migration button moved to top right */}
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

      {/* ════════════════════════════════════════════════════
       *  KEY RECOMMENDATIONS SECTION SUB-HEADING
       * ════════════════════════════════════════════════════ */}
      <div className="pt-2">
        <h2 className="text-lg md:text-xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
          Key Recommendations
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
          Actionable consolidation, merge, decommission, and retention recommendations
        </p>
      </div>

      {/* ════════════════════════════════════════════════════
       *  FILTER TOOLBAR
       * ════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border p-3 theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        {/* Search */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg border flex-1 w-full sm:max-w-sm"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}
        >
          <Search size={14} style={{ color: 'var(--color-text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search dashboard, asset, or business area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[12px]"
            style={{ color: 'var(--color-text-primary)' }}
          />
        </div>

        {/* Tab pills */}
        <div
          className="flex items-center gap-1 p-1 rounded-lg border"
          style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
        >
          {tabPills.map((pill) => {
            const isActive = activeTab === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setActiveTab(pill.id)}
                className="px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer"
                style={{
                  backgroundColor: isActive
                    ? pill.id === 'all'
                      ? 'var(--color-surface)'
                      : pill.color + '15'
                    : 'transparent',
                  color: isActive
                    ? pill.id === 'all'
                      ? 'var(--color-text-primary)'
                      : pill.color
                    : 'var(--color-text-tertiary)',
                  border: isActive && pill.id !== 'all'
                    ? `1px solid ${pill.color}25`
                    : '1px solid transparent',
                }}
              >
                {pill.dot && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pill.dot }} />}
                {pill.label} ({pill.count})
              </button>
            );
          })}
        </div>
      </motion.div>

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

      {/* ════════════════════════════════════════════════════
       *  THREE-COLUMN GRID (or single column when filtered)
       * ════════════════════════════════════════════════════ */}
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
              <ColumnHeader
                icon={GitMerge}
                label="Consolidate & Merge"
                count={mergeRecs.length}
                countLabel="Recommendations"
                color="#F59E0B"
                crossTechCount={crossTechCounts.mergeCount}
                crossTechActive={crossTechFilterColumn === 'merge' || crossTechFilterColumn === 'all'}
                onToggleCrossTech={() => toggleCrossTechFilter('merge')}
                onClearCrossTech={() => setCrossTechFilterColumn(null)}
              />
              {displayedMergeRecs.map((r) => (
                <RecCard
                  key={r.id}
                  rec={r}
                  accentColor="#F59E0B"
                  bulletIcon="!"
                  onCrossTechClick={() => toggleCrossTechFilter('merge')}
                  crossTechActive={crossTechFilterColumn === 'merge' || crossTechFilterColumn === 'all'}
                  onReview={() => setMergeModalRec(r)}
                />
              ))}
              {displayedMergeRecs.length === 0 && (
                <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                  {crossTechFilterColumn === 'merge' ? 'No cross-technology merge recommendations.' : 'No merge recommendations.'}
                </div>
              )}
            </div>
          )}

          {/* DECOMMISSION COLUMN */}
          {(activeTab === 'all' || activeTab === 'decommission') && (
            <div className="space-y-4 flex flex-col">
              <ColumnHeader
                icon={Trash2}
                label="Decommission"
                count={retireRecs.length}
                countLabel="Recommendations"
                color="#EF4444"
                crossTechCount={crossTechCounts.retireCount}
                crossTechActive={crossTechFilterColumn === 'decommission' || crossTechFilterColumn === 'all'}
                onToggleCrossTech={() => toggleCrossTechFilter('decommission')}
                onClearCrossTech={() => setCrossTechFilterColumn(null)}
              />
              {displayedRetireRecs.map((r) => (
                <RecCard
                  key={r.id}
                  rec={r}
                  accentColor="#EF4444"
                  bulletIcon="▲"
                  onCrossTechClick={() => toggleCrossTechFilter('decommission')}
                  crossTechActive={crossTechFilterColumn === 'decommission' || crossTechFilterColumn === 'all'}
                  onReview={() => setDecommissionModalRec(r)}
                />
              ))}
              {displayedRetireRecs.length === 0 && (
                <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                  {crossTechFilterColumn === 'decommission' ? 'No cross-technology decommission recommendations.' : 'No decommission recommendations.'}
                </div>
              )}
            </div>
          )}

          {/* KEEP & CERTIFY COLUMN */}
          {(activeTab === 'all' || activeTab === 'keep') && (
            <div className="space-y-4 flex flex-col">
              <ColumnHeader icon={ShieldCheck} label="Keep & Certify" count={keepRecs.length} countLabel="Recommendations" color="#22C55E" />
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

      {/* ═══ Review Modals ═══ */}
      <AnimatePresence>
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
