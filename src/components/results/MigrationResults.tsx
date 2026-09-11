import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Shield } from 'lucide-react';
import {
  MIGRATION_PATHS,
  migrationResults,
  getMigrationSummaryMetrics,
  getResultsByPath,
} from '../../data/migrationData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';
import { useCountUp } from '../../hooks/useAnimations';
import type { MigrationSummaryMetric, MigrationResult } from '../../data/migrationData';

/* ─────────────────────────────────────────────────────────
 * MigrationResults — post-migration outcomes
 *
 * 1. Header with title
 * 2. Uniform summary metric cards
 * 3. Migration path result sections with asset cards
 * ───────────────────────────────────────────────────────── */

/* ── Uniform metric card ── */
function MetricCard({ metric, index }: { metric: MigrationSummaryMetric; index: number }) {
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
          {count}{metric.suffix ?? ''}
        </span>
      </div>
      <span className="text-[11px] font-medium leading-snug" style={{ color: 'var(--color-text-secondary)' }}>
        {metric.label}
      </span>
    </motion.div>
  );
}

/* ── Status icon helper ── */
function StatusBadge({ status }: { status: MigrationResult['status'] }) {
  const config = {
    Migrated: { icon: ArrowRight, color: '#6366F1', bg: '#6366F110', border: '#6366F120', label: 'Migrated' },
    Validated: { icon: CheckCircle2, color: '#22C55E', bg: '#22C55E10', border: '#22C55E20', label: 'Validated' },
    Optimized: { icon: Zap, color: '#F59E0B', bg: '#F59E0B10', border: '#F59E0B20', label: 'Optimized' },
  }[status];

  const Icon = config.icon;

  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border shrink-0"
      style={{
        color: config.color,
        backgroundColor: config.bg,
        borderColor: config.border,
      }}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}

/* ── Result card ── */
function ResultCard({
  result,
  accentColor,
  index,
}: {
  result: MigrationResult;
  accentColor: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.35 }}
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
      {/* Top: name + status */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h4
            className="text-[14px] font-bold leading-snug mb-0.5"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {result.assetName}
          </h4>
          <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            {result.businessArea}
          </p>
        </div>
        <StatusBadge status={result.status} />
      </div>

      {/* Source → Target */}
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded flex items-center justify-center p-0.5 shrink-0"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <img src={TECHNOLOGY_LOGOS[result.sourceTechnology]} alt={result.sourceTechnology} className="w-full h-full object-contain" />
        </div>
        <ArrowRight size={12} style={{ color: accentColor }} />
        <div
          className="w-6 h-6 rounded flex items-center justify-center p-0.5 shrink-0"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <img src={TECHNOLOGY_LOGOS[result.targetTechnology]} alt={result.targetTechnology} className="w-full h-full object-contain" />
        </div>
        <span className="text-[11px] font-medium ml-1" style={{ color: 'var(--color-text-secondary)' }}>
          {result.sourceTechnology} → {result.targetTechnology}
        </span>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-md border ml-auto shrink-0"
          style={{
            backgroundColor:
              result.complexity === 'High' ? '#EF444410' :
              result.complexity === 'Medium' ? '#F59E0B10' : '#22C55E10',
            color:
              result.complexity === 'High' ? '#EF4444' :
              result.complexity === 'Medium' ? '#F59E0B' : '#22C55E',
            borderColor:
              result.complexity === 'High' ? '#EF444420' :
              result.complexity === 'Medium' ? '#F59E0B20' : '#22C55E20',
          }}
        >
          {result.complexity}
        </span>
      </div>

      {/* Migration notes box */}
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
          Migration Notes
        </p>
        <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
          {result.migrationNotes}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main component ── */
export default function MigrationResults() {
  const metrics = useMemo(() => getMigrationSummaryMetrics(), []);
  const activePaths = useMemo(
    () => MIGRATION_PATHS.filter((p) => getResultsByPath(p.id).length > 0),
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* ════ Header + Metrics ════ */}
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
          <h1
            className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Migration Results
          </h1>
        </div>

        {/* Summary metric cards — uniform grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.map((m, i) => (
            <MetricCard key={m.id} metric={m} index={i} />
          ))}
        </div>
      </motion.div>

      {/* ════ Results grouped by migration path ════ */}
      {activePaths.map((path, pathIdx) => {
        const results = getResultsByPath(path.id);
        const accentColor = path.type === 'bi' ? '#6366F1' : '#0EA5E9';

        return (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + pathIdx * 0.1, duration: 0.4 }}
            className="space-y-3"
          >
            {/* Path section header */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center p-1 border"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor: 'var(--color-border-primary)',
                    }}
                  >
                    <img
                      src={TECHNOLOGY_LOGOS[path.source]}
                      alt={path.source}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <ArrowRight size={14} style={{ color: accentColor }} />
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center p-1 border"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor: 'var(--color-border-primary)',
                    }}
                  >
                    <img
                      src={TECHNOLOGY_LOGOS[path.target]}
                      alt={path.target}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <h2
                  className="text-[14px] font-bold uppercase tracking-wider"
                  style={{ color: accentColor }}
                >
                  {path.label}
                </h2>
              </div>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-md border"
                style={{
                  color: accentColor,
                  backgroundColor: accentColor + '10',
                  borderColor: accentColor + '20',
                }}
              >
                {results.length} {path.type === 'bi' ? 'Dashboard' : 'Pipeline'}{results.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Result cards grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {results.map((result, i) => (
                <ResultCard
                  key={result.id}
                  result={result}
                  accentColor={accentColor}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
