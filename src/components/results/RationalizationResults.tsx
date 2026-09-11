import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  GitMerge,
  Trash2,
  ShieldCheck,
  Search,
} from 'lucide-react';
import {
  recommendations,
  getOverlapMetrics,
} from '../../data/rationalizationData';
import type { Recommendation } from '../../data/rationalizationData';
import { useCountUp } from '../../hooks/useAnimations';
import type { OverlapMetric } from '../../data/rationalizationData';

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
function MetricPill({ metric, index }: { metric: OverlapMetric; index: number }) {
  const count = useCountUp(metric.value, 900, 150 + index * 70);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.04, duration: 0.3 }}
      className="rounded-xl border p-4 theme-transition flex flex-col justify-between h-full min-h-[90px]"
      style={{
        backgroundColor: metric.highlight ? 'var(--color-accent-subtle)' : 'var(--color-surface)',
        borderColor: metric.highlight
          ? 'color-mix(in srgb, var(--color-accent) 30%, var(--color-border-primary))'
          : 'var(--color-border-primary)',
        boxShadow: '0 1px 3px var(--color-card-shadow)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-2xl font-bold tabular-nums tracking-tight"
          style={{ color: metric.highlight ? 'var(--color-accent)' : 'var(--color-text-primary)' }}
        >
          {count}
        </span>
        {metric.highlight && (
          <span
            className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border"
            style={{
              backgroundColor: 'var(--color-accent)',
              borderColor: 'var(--color-accent)',
              color: '#FFFFFF',
            }}
          >
            Overlap
          </span>
        )}
      </div>
      <span className="text-[11px] font-medium leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
        {metric.label}
      </span>
    </motion.div>
  );
}

/* ── Recommendation card — matches BI Compass card pattern ── */
function RecCard({
  rec,
  accentColor,
  bulletIcon,
}: {
  rec: Recommendation;
  accentColor: string;
  bulletIcon: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5 theme-transition flex flex-col gap-3 transition-all duration-200"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 4px var(--color-card-shadow)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = accentColor + '40';
        e.currentTarget.style.boxShadow = `0 4px 20px ${accentColor}12`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-primary)';
        e.currentTarget.style.boxShadow = '0 1px 4px var(--color-card-shadow)';
      }}
    >
      {/* Top: title + uniqueness badge */}
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
      </div>

      {/* Affected assets with logos */}
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

      {/* Tags */}
      {rec.tags && rec.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {rec.tags.map((t) => (
            <span
              key={t}
              className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-tertiary)' }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer: action */}
      <div
        className="flex items-center justify-between pt-2 border-t"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <p className="text-[11px] leading-snug flex-1" style={{ color: 'var(--color-text-tertiary)' }}>
          {rec.action}
        </p>
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
}: {
  icon: typeof GitMerge;
  label: string;
  count: number;
  countLabel: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between pb-2 mb-1">
      <h3 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2" style={{ color }}>
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <Icon size={13} />
        {label}
      </h3>
      <span
        className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
        style={{ color, backgroundColor: color + '10', borderColor: color + '20' }}
      >
        {count} {countLabel}
      </span>
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
  const metrics = useMemo(() => getOverlapMetrics(activeSection), [activeSection]);

  // Filter recs by section, tab, and search
  const sectionRecs = useMemo(() => {
    const biCats = ['merge-bi', 'bi-retire', 'bi-keep', 'bi-etl-connections'];
    const etlCats = ['etl-merge', 'etl-retire'];
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
    () => filterBySearch(sectionRecs.filter((r) => r.category === 'bi-keep')),
    [sectionRecs, search],
  );

  const totalCount = mergeRecs.length + retireRecs.length + keepRecs.length;

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
       *  HEADER + BI/ETL TABS + ACTIVE RULES
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Rationalization Results
          </h1>

          {/* BI / ETL toggle to the right */}
          <div
            className="flex items-center gap-1 p-1 rounded-lg border inline-flex self-start sm:self-auto shrink-0"
            style={{
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-tertiary)',
            }}
          >
            {(['bi', 'etl'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => { setActiveSection(s); setActiveTab('all'); setSearch(''); }}
                className="px-4 py-1.5 rounded-md text-[12px] font-semibold uppercase tracking-wider cursor-pointer transition-all duration-200"
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
        </div>

        {/* Overlap metrics row — uniform grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {metrics.map((m, i) => (
            <MetricPill key={`${activeSection}-${m.id}`} metric={m} index={i} />
          ))}
        </div>
      </motion.div>

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
              <ColumnHeader icon={GitMerge} label="Consolidate & Merge" count={mergeRecs.length} countLabel="Redundant" color="#F59E0B" />
              {mergeRecs.map((r) => (
                <RecCard key={r.id} rec={r} accentColor="#F59E0B" bulletIcon="!" />
              ))}
              {mergeRecs.length === 0 && (
                <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                  No merge recommendations.
                </div>
              )}
            </div>
          )}

          {/* DECOMMISSION COLUMN */}
          {(activeTab === 'all' || activeTab === 'decommission') && (
            <div className="space-y-4 flex flex-col">
              <ColumnHeader icon={Trash2} label="Decommission" count={retireRecs.length} countLabel="Inactive" color="#EF4444" />
              {retireRecs.map((r) => (
                <RecCard key={r.id} rec={r} accentColor="#EF4444" bulletIcon="▲" />
              ))}
              {retireRecs.length === 0 && (
                <div className="text-center py-10 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-tertiary)' }}>
                  No decommission recommendations.
                </div>
              )}
            </div>
          )}

          {/* KEEP & CERTIFY COLUMN */}
          {(activeTab === 'all' || activeTab === 'keep') && activeSection === 'bi' && (
            <div className="space-y-4 flex flex-col">
              <ColumnHeader icon={ShieldCheck} label="Keep & Certify" count={keepRecs.length} countLabel="Active" color="#22C55E" />
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

      {/* ═══ Start Migration CTA ═══ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex justify-end pb-4"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartMigration}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            backgroundColor: 'var(--color-accent)',
            boxShadow: '0 2px 8px var(--color-accent-glow)',
            outlineColor: 'var(--color-accent)',
            border: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 20px var(--color-accent-glow)';
            e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px var(--color-accent-glow)';
            e.currentTarget.style.backgroundColor = 'var(--color-accent)';
          }}
        >
          Start Migration
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
