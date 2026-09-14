import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { Asset, BusinessArea } from '../../data/discoveryData';
import { isEtlAsset } from '../../data/discoveryData';
import AssetRow from './AssetRow';

/* ─────────────────────────────────────────────────────────
 * BusinessAreaCard — card per insurance business area
 *
 * Header: name, description, asset count, tech summary
 * Body: list of AssetRows with line separating BI and ETL
 * ───────────────────────────────────────────────────────── */

interface Props {
  area: BusinessArea;
  index: number;
  onAssetClick: (asset: Asset) => void;
}

export default function BusinessAreaCard({ area, index, onAssetClick }: Props) {
  const { biAssets, etlAssets } = useMemo(() => {
    const bi: Asset[] = [];
    const etl: Asset[] = [];
    for (const asset of area.assets) {
      if (isEtlAsset(asset)) {
        etl.push(asset);
      } else {
        bi.push(asset);
      }
    }
    return { biAssets: bi, etlAssets: etl };
  }, [area.assets]);

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
      {/* ── Card header ── */}
      <div className="p-5 pb-3">
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
            className="text-[12px] leading-relaxed mb-3"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {area.description}
          </p>
        )}
      </div>

      {/* ── Asset list with line between BI & ETL ── */}
      <div className="p-2 flex flex-col" role="list">
        {/* Line for BI assets at top */}
        {biAssets.length > 0 && (
          <div className="mb-2 px-2 flex items-center gap-2.5" role="separator" aria-label="BI Assets">
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
              BI
            </span>
            <div
              className="h-px flex-1"
              style={{ backgroundColor: 'var(--color-border-primary)' }}
            />
          </div>
        )}

        {/* BI Assets */}
        {biAssets.map((asset) => (
          <AssetRow key={asset.id} asset={asset} onClick={onAssetClick} />
        ))}

        {/* Line separating BI and ETL assets */}
        {etlAssets.length > 0 && (
          <div className="my-2 px-2 flex items-center gap-2.5" role="separator" aria-label="ETL Assets">
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
              ETL
            </span>
            <div
              className="h-px flex-1"
              style={{ backgroundColor: 'var(--color-border-primary)' }}
            />
          </div>
        )}

        {/* ETL Assets */}
        {etlAssets.map((asset) => (
          <AssetRow key={asset.id} asset={asset} onClick={onAssetClick} />
        ))}
      </div>
    </motion.article>
  );
}
