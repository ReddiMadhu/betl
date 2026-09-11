import { motion } from 'framer-motion';
import { ingestionStats, totalAssets } from '../data/config';
import { useCountUp } from '../hooks/useAnimations';

function StatRow({
  stat,
  delay,
}: {
  stat: (typeof ingestionStats)[0];
  delay: number;
}) {
  const count = useCountUp(stat.count, 1200, delay);
  const pct = (stat.count / totalAssets) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: delay / 1000, duration: 0.4, ease: 'easeOut' }}
      className="flex items-center gap-3"
    >
      {/* Logo */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden p-1.5"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        {stat.logo && (
          <img
            src={stat.logo}
            alt={`${stat.name} logo`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        )}
      </div>

      {/* Info + bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span
            className="text-xs font-medium truncate"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {stat.name}
          </span>
          <span
            className="text-xs font-bold tabular-nums ml-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {count}
          </span>
        </div>

        {/* Progress bar */}
        <div
          className="h-1.5 rounded-full overflow-hidden"
          style={{ backgroundColor: 'var(--color-stat-bar-bg)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: 'var(--color-accent)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: delay / 1000 + 0.2, duration: 1, ease: 'easeOut' }}
          />
        </div>

        <span
          className="text-[10px] mt-0.5 block"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {stat.suffix}
        </span>
      </div>
    </motion.div>
  );
}

export default function IngestionStats() {
  const totalCount = useCountUp(totalAssets, 1400, 600);

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
      className="w-full"
      aria-label="Ingestion Statistics"
    >

      {/* Total assets */}
      <div
        className="rounded-xl border p-4 mb-4 theme-transition"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border-primary)',
          boxShadow: '0 1px 3px var(--color-card-shadow)',
        }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-widest block mb-1"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Total Assets Ingested
        </span>
        <span
          className="text-3xl font-bold tabular-nums"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {totalCount}
        </span>
      </div>

      {/* Per-platform breakdown */}
      <div
        className="rounded-xl border p-4 theme-transition"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border-primary)',
          boxShadow: '0 1px 3px var(--color-card-shadow)',
        }}
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-widest block mb-3"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Platform Breakdown
        </span>
        <div className="flex flex-col gap-4">
          {ingestionStats.map((stat, i) => (
            <StatRow key={stat.id} stat={stat} delay={700 + i * 200} />
          ))}
        </div>
      </div>
    </motion.aside>
  );
}
