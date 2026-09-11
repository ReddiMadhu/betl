import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Recommendation } from '../../data/rationalizationData';
import { categories } from '../../data/rationalizationData';

/* ─────────────────────────────────────────────────────────
 * RecommendationList — filtered list of recommendation cards
 *
 * Each card shows: category badge, title, affected assets
 * with technology logos, overlap %, rationale (expandable),
 * business area tag, and action text.
 * ───────────────────────────────────────────────────────── */

function getCategoryColor(catId: string): string {
  return categories.find((c) => c.id === catId)?.color ?? 'var(--color-text-tertiary)';
}

function getCategoryLabel(catId: string): string {
  return categories.find((c) => c.id === catId)?.label ?? catId;
}

function RecommendationCard({ rec, index }: { rec: Recommendation; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const color = getCategoryColor(rec.category);
  const label = getCategoryLabel(rec.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
      className="rounded-xl border theme-transition overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 3px var(--color-card-shadow)',
      }}
    >
      {/* Card header — clickable to expand */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-start gap-3 p-4 text-left cursor-pointer transition-colors duration-150"
        style={{ background: 'transparent', border: 'none' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        aria-expanded={expanded}
      >
        {/* Left accent bar */}
        <div
          className="w-1 self-stretch rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />

        <div className="flex-1 min-w-0">
          {/* Top row: badge + title + business area */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{
                backgroundColor: `${color}15`,
                color: color,
              }}
            >
              {label}
            </span>
            {rec.overlapPct && (
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded tabular-nums"
                style={{
                  backgroundColor: rec.overlapPct >= 60 ? 'var(--color-accent-subtle)' : 'var(--color-bg-tertiary)',
                  color: rec.overlapPct >= 60 ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                }}
              >
                {rec.overlapPct}% overlap
              </span>
            )}
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              {rec.businessArea}
            </span>
          </div>

          {/* Title */}
          <h4
            className="text-[14px] font-semibold tracking-tight mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {rec.title}
          </h4>

          {/* Affected assets */}
          <div className="flex flex-wrap items-center gap-2">
            {rec.assets.map((a, ai) => (
              <div key={a.name} className="flex items-center gap-1.5">
                {ai > 0 && (
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    +
                  </span>
                )}
                <div
                  className="w-5 h-5 rounded flex items-center justify-center p-0.5 shrink-0"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                >
                  <img
                    src={a.logo}
                    alt={`${a.technology} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span
                  className="text-[12px] font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {a.name}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          {rec.tags && rec.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {rec.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Expand chevron */}
        {expanded ? (
          <ChevronDown size={16} className="shrink-0 mt-1" style={{ color: 'var(--color-text-tertiary)' }} />
        ) : (
          <ChevronRight size={16} className="shrink-0 mt-1" style={{ color: 'var(--color-text-tertiary)' }} />
        )}
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-0 ml-4 border-t"
              style={{ borderColor: 'var(--color-border-subtle)' }}
            >
              {/* Rationale */}
              <div className="mt-3 mb-3">
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest block mb-1"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  AI Rationale
                </span>
                <p
                  className="text-[13px] leading-relaxed"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {rec.rationale}
                </p>
              </div>

              {/* Overlap bar (for merge recs) */}
              {rec.overlapPct && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-[10px] font-semibold uppercase tracking-widest"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      Overlap
                    </span>
                    <span
                      className="text-[11px] font-bold tabular-nums"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      {rec.overlapPct}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--color-stat-bar-bg)' }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${rec.overlapPct}%`,
                        backgroundColor: rec.overlapPct >= 60 ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Suggested action */}
              <div>
                <span
                  className="text-[10px] font-semibold uppercase tracking-widest block mb-1"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Suggested Action
                </span>
                <p
                  className="text-[13px] font-medium leading-relaxed"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {rec.action}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function RecommendationList({ recommendations: recs }: { recommendations: Recommendation[] }) {
  if (recs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[13px]" style={{ color: 'var(--color-text-tertiary)' }}>
          Select a category above to view recommendations
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {recs.map((rec, i) => (
          <RecommendationCard key={rec.id} rec={rec} index={i} />
        ))}
      </AnimatePresence>
    </div>
  );
}
