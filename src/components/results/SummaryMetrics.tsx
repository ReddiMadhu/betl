import { motion } from 'framer-motion';
import { BarChart3, GitBranch, Database, Target, TrendingUp, FileSpreadsheet, Calculator } from 'lucide-react';
import { useCountUp } from '../../hooks/useAnimations';
import type { SummaryMetric } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * SummaryMetrics — compact metric cards
 *
 * Large number (count-up) + small label + subtle icon.
 * Includes separate cards for Worksheets and Calculated Fields.
 * ───────────────────────────────────────────────────────── */

const ICON_MAP: Record<string, typeof BarChart3> = {
  dashboard: BarChart3,
  etl: GitBranch,
  source: Database,
  target: Target,
  kpi: TrendingUp,
  worksheet: FileSpreadsheet,
  calculated: Calculator,
};

function MetricCard({ metric, index }: { metric: SummaryMetric; index: number }) {
  const count = useCountUp(metric.value, 1200, 300 + index * 150);
  const Icon = ICON_MAP[metric.icon] ?? BarChart3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.08, duration: 0.4, ease: 'easeOut' }}
      className="rounded-xl border p-4 theme-transition flex-1 min-w-[140px]"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 3px var(--color-card-shadow)',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className="text-2xl font-bold tabular-nums"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {count}
        </span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: 'var(--color-accent-subtle)' }}
        >
          <Icon size={14} style={{ color: 'var(--color-accent)' }} />
        </div>
      </div>
      <span
        className="text-[11px] font-medium leading-tight block"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {metric.label}
      </span>
    </motion.div>
  );
}

export default function SummaryMetrics({ metrics }: { metrics: SummaryMetric[] }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {metrics.map((m, i) => (
        <MetricCard key={m.icon} metric={m} index={i} />
      ))}
    </div>
  );
}
