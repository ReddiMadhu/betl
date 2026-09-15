import { useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { Asset, BusinessArea, CategoryFilter, TechnologyName } from '../../data/discoveryData';
import { isEtlAsset, TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * BusinessAreaCard — card per insurance business area
 *
 * Header: name, description, asset count, tech summary
 * Body: assets grouped by technology — one icon per tech
 *       with file names listed below using arrow indicators
 * ───────────────────────────────────────────────────────── */

// Strict ordering of technologies in BI and ETL sections
const BI_TECH_ORDER: TechnologyName[] = ['Tableau', 'Power BI', 'MicroStrategy', 'ThoughtSpot'];
const ETL_TECH_ORDER: TechnologyName[] = ['Alteryx', 'Python'];

interface TechGroup {
  technology: TechnologyName;
  logo: string;
  assets: Asset[];
}

interface Props {
  area: BusinessArea;
  index: number;
  categoryFilter: CategoryFilter;
  onAssetClick: (asset: Asset) => void;
  biMinHeight?: number;
  onBiHeightMeasured?: (index: number, height: number) => void;
}

export default function BusinessAreaCard({
  area,
  index,
  categoryFilter,
  onAssetClick,
  biMinHeight,
  onBiHeightMeasured,
}: Props) {
  const biContentRef = useRef<HTMLDivElement>(null);

  const { biGroups, etlGroups } = useMemo(() => {
    const biMap = new Map<TechnologyName, Asset[]>();
    const etlMap = new Map<TechnologyName, Asset[]>();

    for (const asset of area.assets) {
      if (isEtlAsset(asset)) {
        const list = etlMap.get(asset.technology) ?? [];
        list.push(asset);
        etlMap.set(asset.technology, list);
      } else {
        const list = biMap.get(asset.technology) ?? [];
        list.push(asset);
        biMap.set(asset.technology, list);
      }
    }

    const toGroups = (map: Map<TechnologyName, Asset[]>): TechGroup[] =>
      Array.from(map.entries()).map(([tech, assets]) => ({
        technology: tech,
        logo: TECHNOLOGY_LOGOS[tech],
        assets,
      }));

    // Sort BI technologies: Tableau -> Power BI -> MicroStrategy -> ThoughtSpot
    const sortedBi = toGroups(biMap).sort((a, b) => {
      const idxA = BI_TECH_ORDER.indexOf(a.technology);
      const idxB = BI_TECH_ORDER.indexOf(b.technology);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });

    // Sort ETL technologies: Alteryx -> Python
    const sortedEtl = toGroups(etlMap).sort((a, b) => {
      const idxA = ETL_TECH_ORDER.indexOf(a.technology);
      const idxB = ETL_TECH_ORDER.indexOf(b.technology);
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
    });

    return { biGroups: sortedBi, etlGroups: sortedEtl };
  }, [area.assets]);

  // Measure natural unconstrained height of BI section and report to parent
  useEffect(() => {
    if (!biContentRef.current || !onBiHeightMeasured) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
        if (height > 0) {
          onBiHeightMeasured(index, Math.round(height));
        }
      }
    });
    observer.observe(biContentRef.current);
    return () => observer.disconnect();
  }, [index, onBiHeightMeasured, biGroups]);

  const showBI = categoryFilter === 'ALL' || categoryFilter === 'BI';
  const showETL = categoryFilter === 'ALL' || categoryFilter === 'ETL';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.07, duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group rounded-2xl border theme-transition flex flex-col overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 4px var(--color-card-shadow)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-secondary)';
        e.currentTarget.style.boxShadow = '0 4px 16px var(--color-card-shadow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-primary)';
        e.currentTarget.style.boxShadow = '0 1px 4px var(--color-card-shadow)';
      }}
      aria-label={`${area.name} — ${area.assets.length} assets`}
    >
      {/* ── Card header with uniform minimum height ── */}
      <div className="p-5 pb-3 min-h-[82px] flex flex-col justify-start">
        {/* Title + asset count */}
        <div className="flex items-start justify-between mb-1">
          <h3
            className="text-[15px] font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {area.name}
          </h3>
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2"
            style={{
              backgroundColor: 'var(--color-accent-subtle)',
              color: 'var(--color-accent)',
            }}
          >
            {area.assets.length} assets
          </span>
        </div>

        {/* Description */}
        {area.description && (
          <p
            className="text-[12px] leading-relaxed line-clamp-2"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {area.description}
          </p>
        )}
      </div>

      {/* ── Asset list grouped by technology ── */}
      <div className="px-3 pb-4 flex flex-col gap-1 flex-1" role="list">
        {/* BI Section — Outer wrapper has equalized minHeight so ETL lines align */}
        {showBI && biGroups.length > 0 && (
          <div
            className="flex flex-col"
            style={{
              minHeight: biMinHeight && biMinHeight > 0 ? `${biMinHeight}px` : undefined,
            }}
          >
            {/* Inner div with natural unconstrained height for accurate measurement */}
            <div ref={biContentRef} className="flex flex-col">
              <SectionDivider label="BI" />
              {biGroups.map((group) => (
                <TechGroupBlock
                  key={group.technology}
                  group={group}
                  onAssetClick={onAssetClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* ETL Section */}
        {showETL && etlGroups.length > 0 && (
          <div className="flex flex-col">
            <SectionDivider label="ETL" />
            {etlGroups.map((group) => (
              <TechGroupBlock
                key={group.technology}
                group={group}
                onAssetClick={onAssetClick}
              />
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ── Section divider (BI / ETL) ── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="mb-1 px-1 flex items-center gap-2.5" role="separator" aria-label={`${label} Assets`}>
      <div
        className="h-px flex-1"
        style={{ backgroundColor: 'var(--color-border-primary)' }}
      />
      <span
        className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border"
        style={{
          backgroundColor: 'rgba(30, 41, 59, 0.85)',
          borderColor: 'var(--color-border-secondary)',
          color: '#FFFFFF',
        }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{ backgroundColor: 'var(--color-border-primary)' }}
      />
    </div>
  );
}

/* ── Technology group: logo + name header, then file list ── */
function TechGroupBlock({
  group,
  onAssetClick,
}: {
  group: TechGroup;
  onAssetClick: (asset: Asset) => void;
}) {
  return (
    <div className="mb-2 last:mb-0">
      {/* Technology header — icon + name shown once */}
      <div className="flex items-center gap-2.5 px-2 py-1.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 p-1"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          <img
            src={group.logo}
            alt={`${group.technology} logo`}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        <span
          className="text-[13px] font-semibold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {group.technology}
        </span>
        <span
          className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          {group.assets.length}
        </span>
      </div>

      {/* File name list with arrow indicators */}
      <div className="ml-4 pl-5 border-l" style={{ borderColor: 'var(--color-border-primary)' }}>
        {group.assets.map((asset) => (
          <button
            key={asset.id}
            type="button"
            onClick={() => onAssetClick(asset)}
            className="group/row flex items-center gap-2 w-full rounded-md px-2.5 py-1.5 text-left transition-colors duration-150"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            aria-label={`View details for ${asset.name}`}
          >
            {/* File name */}
            <span
              className="text-[13px] font-medium truncate flex-1"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {asset.name}
            </span>
            {/* Chevron — always visible */}
            <ChevronRight
              size={13}
              className="shrink-0 transition-transform duration-200 group-hover/row:translate-x-0.5"
              style={{ color: 'var(--color-text-tertiary)' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
