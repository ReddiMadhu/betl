import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { getBusinessAreas, getSummaryMetrics } from '../../data/discoveryData';
import type { Asset } from '../../data/discoveryData';
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
  const allAreas = useMemo(() => getBusinessAreas(), []);
  const metrics = useMemo(() => getSummaryMetrics(), []);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAreas = useMemo(() => {
    if (!searchQuery.trim()) return allAreas;
    const q = searchQuery.toLowerCase();
    return allAreas
      .map((area) => ({
        ...area,
        assets: area.assets.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.technology.toLowerCase().includes(q) ||
            a.businessArea.toLowerCase().includes(q) ||
            (a.assetType?.toLowerCase().includes(q) ?? false),
        ),
      }))
      .filter((area) => area.assets.length > 0 || area.name.toLowerCase().includes(q));
  }, [allAreas, searchQuery]);

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

          {/* Right Controls: Search + Download Documentation Button */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Search */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg border w-full sm:w-60"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              <Search size={14} style={{ color: 'var(--color-text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-[13px]"
                style={{ color: 'var(--color-text-primary)' }}
                aria-label="Search assets"
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
        {filteredAreas.map((area, i) => (
          <BusinessAreaCard
            key={area.id}
            area={area}
            index={i}
            onAssetClick={handleAssetClick}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredAreas.length === 0 && searchQuery.trim() && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p
            className="text-[14px] font-medium"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            No assets matching "{searchQuery}"
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
