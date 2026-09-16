import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { getFilteredBusinessAreas, getFilteredSummaryMetrics } from '../../data/discoveryData';
import type { Asset, CategoryFilter } from '../../data/discoveryData';
import SummaryMetrics from './SummaryMetrics';
import BusinessAreaCard from './BusinessAreaCard';
import DownloadDocumentationButton from './DownloadDocumentationButton';

/* ─────────────────────────────────────────────────────────
 * AssessmentResults — Assessment results page
 *
 * Progress indicator → Header → Metrics → Business area grid
 * → Full-page asset detail → Start Rationalization CTA
 * ───────────────────────────────────────────────────────── */

interface Props {
  onStartRationalization?: () => void;
  onAssetDetail?: (asset: Asset) => void;
}

export default function AssessmentResults({ onStartRationalization, onAssetDetail }: Props) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('ALL');

  const metrics = useMemo(() => getFilteredSummaryMetrics(categoryFilter), [categoryFilter]);
  const filteredAreas = useMemo(() => getFilteredBusinessAreas(categoryFilter), [categoryFilter]);

  // Dynamic column detection for grid layout (matches Tailwind xl: 3, md: 2, default: 1)
  const [columns, setColumns] = useState<number>(3);
  const [naturalBiHeights, setNaturalBiHeights] = useState<Record<number, number>>({});

  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w >= 1280) setColumns(3);
      else if (w >= 768) setColumns(2);
      else setColumns(1);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const handleBiHeightMeasured = useCallback((cardIndex: number, height: number) => {
    setNaturalBiHeights((prev) => {
      if (prev[cardIndex] === height) return prev;
      return { ...prev, [cardIndex]: height };
    });
  }, []);

  // Compute maximum BI height per row so ETL lines start at the exact same horizontal level
  const rowMaxBiHeights = useMemo(() => {
    const rowMaxes: Record<number, number> = {};
    filteredAreas.forEach((_, idx) => {
      const row = Math.floor(idx / columns);
      const h = naturalBiHeights[idx] || 0;
      rowMaxes[row] = Math.max(rowMaxes[row] || 0, h);
    });
    return rowMaxes;
  }, [filteredAreas, columns, naturalBiHeights]);

  const handleAssetClick = (asset: Asset) => {
    if (onAssetDetail) {
      onAssetDetail(asset);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ── Page header ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: 'easeOut' }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-1">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1
                className="text-xl md:text-2xl font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Assessment - Discovery &amp; Intelligence Agents
              </h1>
            </div>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              A structured view of the BI and ETL landscape discovered across your insurance business.
            </p>
          </div>

          {/* Right Controls: Category Dropdown + Download Documentation Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Category Dropdown */}
            <div
              className="relative inline-flex items-center"
              style={{ minWidth: '140px' }}
            >
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as CategoryFilter)}
                className="appearance-none w-full pl-3.5 pr-9 py-2 rounded-lg border text-[13px] font-semibold cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  color: 'var(--color-text-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-accent-glow)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-primary)';
                  e.currentTarget.style.boxShadow = '0 1px 3px var(--color-card-shadow)';
                }}
                aria-label="Filter by category"
              >
                <option value="ALL">ALL</option>
                <option value="BI">BI</option>
                <option value="ETL">ETL</option>
              </select>
              {/* Custom chevron icon */}
              <ChevronDown
                size={14}
                className="absolute right-2.5 pointer-events-none"
                style={{ color: 'var(--color-text-tertiary)' }}
              />
            </div>

            {/* Download Documentation Button */}
            <DownloadDocumentationButton type="assessment" />
          </div>
        </div>
      </motion.div>

      {/* ── Summary metrics ── */}
      <SummaryMetrics metrics={metrics} />

      {/* ── Business area grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {filteredAreas.map((area, i) => {
          const row = Math.floor(i / columns);
          const biMinHeight = rowMaxBiHeights[row] || 0;
          return (
            <BusinessAreaCard
              key={area.id}
              area={area}
              index={i}
              categoryFilter={categoryFilter}
              onAssetClick={handleAssetClick}
              biMinHeight={biMinHeight}
              onBiHeightMeasured={handleBiHeightMeasured}
            />
          );
        })}
      </div>

      {/* Empty state */}
      {filteredAreas.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p
            className="text-[14px] font-medium"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            No assets found for the selected category.
          </p>
        </motion.div>
      )}

      {/* ── Start Rationalization CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4, ease: 'easeOut' }}
        className="flex justify-end pb-4"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartRationalization}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                     text-sm font-semibold text-white cursor-pointer
                     transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
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
          aria-label="Start Rationalization"
        >
          Start Rationalization
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </motion.button>
      </motion.div>

      {/* ── Asset detail drawer ── */}
    </motion.div>
  );
}
