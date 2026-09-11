import { motion } from 'framer-motion';
import type { CategoryInfo, RecommendationCategory } from '../../data/rationalizationData';

/* ─────────────────────────────────────────────────────────
 * RecommendationCategoryCards — clickable filter pills
 *
 * Row of category cards with count badges. Active state
 * shows selected category. Clicking filters the list below.
 * ───────────────────────────────────────────────────────── */

interface Props {
  categories: CategoryInfo[];
  selected: RecommendationCategory | null;
  onSelect: (cat: RecommendationCategory | null) => void;
}

export default function RecommendationCategoryCards({ categories: cats, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {cats.map((cat, i) => {
        const isActive = selected === cat.id;
        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05, duration: 0.3, ease: 'easeOut' }}
            type="button"
            onClick={() => onSelect(isActive ? null : cat.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200 cursor-pointer"
            style={{
              backgroundColor: isActive ? cat.color : 'var(--color-surface)',
              color: isActive ? '#FFFFFF' : 'var(--color-text-primary)',
              border: `1.5px solid ${isActive ? cat.color : 'var(--color-border-primary)'}`,
              boxShadow: isActive
                ? `0 2px 8px ${cat.color}33`
                : '0 1px 2px var(--color-card-shadow)',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = cat.color;
                e.currentTarget.style.backgroundColor = `${cat.color}0D`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.borderColor = 'var(--color-border-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface)';
              }
            }}
            aria-pressed={isActive}
          >
            {/* Color dot */}
            {!isActive && (
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: cat.color }}
              />
            )}
            <span>{cat.label}</span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-bold tabular-nums"
              style={{
                backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : `${cat.color}15`,
                color: isActive ? '#FFFFFF' : cat.color,
              }}
            >
              {cat.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
