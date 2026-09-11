import { ChevronRight } from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * AssetRow — single asset row within a business-area card
 *
 * [Logo] Tech Name · asset_name · Type badge      →
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onClick: (asset: Asset) => void;
}

export default function AssetRow({ asset, onClick }: Props) {
  const logo = TECHNOLOGY_LOGOS[asset.technology];

  return (
    <button
      type="button"
      onClick={() => onClick(asset)}
      className="group flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left transition-colors duration-150"
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
      {/* Technology logo */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 p-1.5"
        style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
      >
        <img
          src={logo}
          alt={`${asset.technology} logo`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Asset info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-medium"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {asset.technology}
          </span>
          {asset.assetType && (
            <span
              className="text-[10px] font-medium px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              {asset.assetType}
            </span>
          )}
        </div>
        <span
          className="text-[13px] font-medium truncate block"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {asset.name}
        </span>
      </div>

      {/* Arrow */}
      <ChevronRight
        size={16}
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ color: 'var(--color-text-tertiary)' }}
      />
    </button>
  );
}
