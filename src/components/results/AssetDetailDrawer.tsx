import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Calendar, Database, Target, TrendingUp, Link2, FileText } from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * AssetDetailDrawer — right-side slide-in panel
 *
 * Shows full asset metadata. Gracefully hides missing fields.
 * Close via X button, Escape key, or click-outside.
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset | null;
  onClose: () => void;
}

function DetailField({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User;
  label: string;
  value: string | number | undefined;
}) {
  if (value === undefined || value === null) return null;
  return (
    <div className="flex items-start gap-3 py-2.5">
      <Icon
        size={14}
        className="shrink-0 mt-0.5"
        style={{ color: 'var(--color-text-tertiary)' }}
      />
      <div className="min-w-0">
        <span
          className="text-[10px] font-semibold uppercase tracking-widest block mb-0.5"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {label}
        </span>
        <span
          className="text-[13px] font-medium block"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

function ListField({
  icon: Icon,
  label,
  items,
}: {
  icon: typeof Link2;
  label: string;
  items: string[] | undefined;
}) {
  if (!items?.length) return null;
  return (
    <div className="flex items-start gap-3 py-2.5">
      <Icon
        size={14}
        className="shrink-0 mt-0.5"
        style={{ color: 'var(--color-text-tertiary)' }}
      />
      <div className="min-w-0">
        <span
          className="text-[10px] font-semibold uppercase tracking-widest block mb-1"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {label}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span
              key={item}
              className="text-[12px] font-medium px-2 py-0.5 rounded-md"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AssetDetailDrawer({ asset, onClose }: Props) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!asset) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [asset, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!asset) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    // Delay listener so the click that opened the drawer doesn't immediately close it
    const t = setTimeout(() => document.addEventListener('mousedown', handler), 100);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', handler);
    };
  }, [asset, onClose]);

  return (
    <AnimatePresence>
      {asset && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
          />

          {/* Drawer */}
          <motion.aside
            ref={drawerRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-[420px] border-l overflow-y-auto theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.12)',
            }}
            role="dialog"
            aria-label={`${asset.name} details`}
          >
            {/* Header */}
            <div
              className="sticky top-0 z-10 flex items-start justify-between p-5 border-b theme-transition"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-subtle)',
              }}
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Technology logo */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 p-2"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                >
                  <img
                    src={TECHNOLOGY_LOGOS[asset.technology]}
                    alt={`${asset.technology} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <span
                    className="text-[11px] font-semibold uppercase tracking-widest block mb-0.5"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {asset.technology}
                  </span>
                  <h3
                    className="text-base font-bold tracking-tight break-all"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {asset.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-tertiary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Close drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {/* Description */}
              {asset.description && (
                <p
                  className="text-[13px] leading-relaxed mb-5 pb-5 border-b"
                  style={{
                    color: 'var(--color-text-secondary)',
                    borderColor: 'var(--color-border-subtle)',
                  }}
                >
                  {asset.description}
                </p>
              )}

              {/* Metadata grid */}
              <div
                className="flex flex-col divide-y"
                style={{
                  // @ts-expect-error CSS custom property for divide color
                  '--tw-divide-opacity': 1,
                }}
              >
                <DetailField icon={FileText} label="Asset Type" value={asset.assetType} />
                <DetailField icon={Database} label="Business Area" value={asset.businessArea} />
                <DetailField icon={User} label="Owner" value={asset.owner ?? 'Owner not identified'} />
                <DetailField icon={Calendar} label="Last Updated" value={asset.lastUpdated} />
                <DetailField icon={Database} label="Data Sources" value={asset.sourceCount} />
                <DetailField icon={Target} label="Data Targets" value={asset.targetCount} />
                <DetailField icon={TrendingUp} label="KPIs Tracked" value={asset.kpiCount} />
                <ListField icon={Link2} label="Dependencies" items={asset.dependencies} />
                <ListField icon={Link2} label="Related Assets" items={asset.relatedAssets} />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
