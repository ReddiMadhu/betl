import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useAnimations';
import type { OverlapMetric } from '../../data/rationalizationData';

/* ─────────────────────────────────────────────────────────
 * OverlapMetrics — row of compact overlap metric cards
 *
 * Orange-highlighted when overlap is flagged as significant.
 * Count-up animation on mount.
 * ───────────────────────────────────────────────────────── */

function MetricCard({ metric, index }: { metric: OverlapMetric; index: number }) {
  const count = useCountUp(metric.value, 1000, 200 + index * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.06, duration: 0.35, ease: 'easeOut' }}
      className="rounded-xl border p-4 theme-transition flex-1 min-w-[130px]"
      style={{
        backgroundColor: metric.highlight
          ? 'var(--color-accent-subtle)'
          : 'var(--color-surface)',
        borderColor: metric.highlight
          ? 'color-mix(in srgb, var(--color-accent) 30%, var(--color-border-primary))'
          : 'var(--color-border-primary)',
        boxShadow: '0 1px 3px var(--color-card-shadow)',
      }}
    >
      <span
        className="text-2xl font-bold tabular-nums block"
        style={{
          color: metric.highlight
            ? 'var(--color-accent)'
            : 'var(--color-text-primary)',
        }}
      >
        {count}
      </span>
      <span
        className="text-[11px] font-medium leading-tight block mt-1"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {metric.label}
      </span>
    </motion.div>
  );
}

export default function OverlapMetrics({ metrics }: { metrics: OverlapMetric[] }) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {metrics.map((m, i) => (
        <MetricCard key={m.id} metric={m} index={i} />
      ))}
    </div>
  );
}
