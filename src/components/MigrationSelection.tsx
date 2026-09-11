import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ArrowRightLeft, Check } from 'lucide-react';
import {
  MIGRATION_PATHS,
  getAssetsNeedingMigration,
  getAssetsNoMigration,
  getAssetsByPath,
} from '../data/migrationData';
import { TECHNOLOGY_LOGOS } from '../data/discoveryData';
import type { MigrationPath } from '../data/migrationData';

/* ─────────────────────────────────────────────────────────
 * MigrationSelection — choose which keep assets to migrate
 *
 * Users can check / uncheck individual assets or toggle
 * all assets within a migration path. The header pill and
 * CTA update dynamically based on selected assets.
 * ───────────────────────────────────────────────────────── */

/* ── Custom checkbox ── */
function Checkbox({
  checked,
  onChange,
  accentColor,
}: {
  checked: boolean;
  onChange: () => void;
  accentColor: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className="w-[18px] h-[18px] rounded-md border-2 flex items-center justify-center shrink-0 cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: checked ? accentColor : 'transparent',
        borderColor: checked ? accentColor : 'var(--color-border-secondary)',
        boxShadow: checked ? `0 0 0 2px ${accentColor}20` : 'none',
      }}
    >
      {checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
    </button>
  );
}

/* ── Path card with selectable asset list ── */
function PathCard({
  path,
  index,
  selectedIds,
  onToggle,
  onToggleAll,
}: {
  path: MigrationPath;
  index: number;
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (pathId: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const assets = useMemo(() => getAssetsByPath(path.id), [path.id]);

  if (assets.length === 0) return null;

  const selectedCount = assets.filter((a) => selectedIds.has(a.id)).length;
  const allSelected = selectedCount === assets.length;
  const someSelected = selectedCount > 0 && !allSelected;

  const accentColor = path.type === 'bi' ? '#6366F1' : '#0EA5E9';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.08, duration: 0.4, ease: 'easeOut' }}
      className="rounded-2xl border theme-transition overflow-hidden"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 4px var(--color-card-shadow)',
      }}
    >
      {/* Card header */}
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between gap-4 p-5 cursor-pointer transition-colors duration-150"
        style={{ border: 'none', background: 'transparent' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <div className="flex items-center gap-4">
          {/* Source → Target logos */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 border"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
            >
              <img src={TECHNOLOGY_LOGOS[path.source]} alt={path.source} className="w-full h-full object-contain" />
            </div>
            <ArrowRight size={16} style={{ color: accentColor, flexShrink: 0 }} />
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center p-1.5 border"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
            >
              <img src={TECHNOLOGY_LOGOS[path.target]} alt={path.target} className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Path label + meta */}
          <div className="text-left">
            <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {path.label}
            </h3>
            <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
              {selectedCount}/{assets.length} selected
            </p>
          </div>
        </div>

        {/* Right side: badge + chevron */}
        <div className="flex items-center gap-3">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border"
            style={{
              color: accentColor,
              backgroundColor: accentColor + '10',
              borderColor: accentColor + '20',
            }}
          >
            {path.type === 'bi' ? 'BI' : 'ETL'}
          </span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="var(--color-text-tertiary)" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: 'transform 0.3s ease', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Expandable asset list */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 400ms cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
            {/* Select All toggle */}
            <div className="flex items-center justify-between pt-4 pb-2.5">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleAll(path.id); }}
                className="flex items-center gap-2 text-[11px] font-semibold cursor-pointer transition-colors duration-150 px-2 py-1 rounded-md"
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: allSelected ? accentColor : 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <Checkbox checked={allSelected} onChange={() => onToggleAll(path.id)} accentColor={accentColor} />
                {allSelected ? 'Deselect All' : someSelected ? `Select All (${assets.length - selectedCount} remaining)` : 'Select All'}
              </button>
              <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                {selectedCount} of {assets.length}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {assets.map((asset) => {
                const isSelected = selectedIds.has(asset.id);
                return (
                  <div
                    key={asset.id}
                    onClick={() => onToggle(asset.id)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 cursor-pointer"
                    style={{
                      backgroundColor: isSelected ? accentColor + '06' : 'var(--color-surface)',
                      borderColor: isSelected ? accentColor + '30' : 'var(--color-border-primary)',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = accentColor + '40';
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border-primary)';
                    }}
                  >
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onToggle(asset.id)}
                      accentColor={accentColor}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[13px] font-semibold truncate"
                          style={{ color: 'var(--color-text-primary)' }}
                        >
                          {asset.name}
                        </span>
                        <span
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md border shrink-0"
                          style={{
                            backgroundColor:
                              asset.complexity === 'High' ? '#EF444410' :
                              asset.complexity === 'Medium' ? '#F59E0B10' : '#22C55E10',
                            color:
                              asset.complexity === 'High' ? '#EF4444' :
                              asset.complexity === 'Medium' ? '#F59E0B' : '#22C55E',
                            borderColor:
                              asset.complexity === 'High' ? '#EF444420' :
                              asset.complexity === 'Medium' ? '#F59E0B20' : '#22C55E20',
                          }}
                        >
                          {asset.complexity}
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed line-clamp-1" style={{ color: 'var(--color-text-tertiary)' }}>
                        {asset.businessArea} · {asset.description}
                      </p>
                    </div>
                    <ArrowRightLeft size={14} style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ── */
interface Props {
  onStartMigration?: () => void;
}

export default function MigrationSelection({ onStartMigration }: Props) {
  const needsMigration = useMemo(() => getAssetsNeedingMigration(), []);
  const noMigration = useMemo(() => getAssetsNoMigration(), []);
  const activePaths = useMemo(
    () => MIGRATION_PATHS.filter((p) => getAssetsByPath(p.id).length > 0),
    [],
  );

  // Selection state — all needing-migration assets selected by default
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(needsMigration.map((a) => a.id)),
  );

  const toggleAsset = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAllForPath = useCallback((pathId: string) => {
    const pathAssets = getAssetsByPath(pathId);
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allSelected = pathAssets.every((a) => next.has(a.id));
      if (allSelected) {
        pathAssets.forEach((a) => next.delete(a.id));
      } else {
        pathAssets.forEach((a) => next.add(a.id));
      }
      return next;
    });
  }, []);

  const selectedAssets = needsMigration.filter((a) => selectedIds.has(a.id));
  const totalSelected = selectedAssets.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-5"
    >
      {/* ════ Header ════ */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border p-6 theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-engine-border)',
          boxShadow: '0 2px 12px var(--color-card-shadow)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h1
            className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Migration Planning
          </h1>
          <div className="flex items-center gap-3">
            <span
              className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border"
              style={{
                backgroundColor: totalSelected > 0 ? 'var(--color-accent-subtle)' : 'var(--color-surface)',
                borderColor: totalSelected > 0
                  ? 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))'
                  : 'var(--color-border-primary)',
                color: totalSelected > 0 ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              }}
            >
              {totalSelected} of {needsMigration.length} assets selected
            </span>
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={onStartMigration}
              className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
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
              aria-label="Start Migration"
            >
              Start Migration
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </div>

        {/* Summary metric pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {activePaths.map((path, i) => {
            const assets = getAssetsByPath(path.id);
            const selectedInPath = assets.filter((a) => selectedIds.has(a.id));
            const accentColor = path.type === 'bi' ? '#6366F1' : '#0EA5E9';
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                className="rounded-xl border p-4 theme-transition"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center p-0.5"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                  >
                    <img src={TECHNOLOGY_LOGOS[path.source]} alt={path.source} className="w-full h-full object-contain" />
                  </div>
                  <ArrowRight size={12} style={{ color: accentColor }} />
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center p-0.5"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                  >
                    <img src={TECHNOLOGY_LOGOS[path.target]} alt={path.target} className="w-full h-full object-contain" />
                  </div>
                </div>
                <span className="text-lg font-bold tabular-nums" style={{ color: accentColor }}>
                  {selectedInPath.length}
                  <span className="text-[11px] font-normal" style={{ color: 'var(--color-text-tertiary)' }}>
                    /{assets.length}
                  </span>
                </span>
                <span className="text-[10px] font-medium block" style={{ color: 'var(--color-text-tertiary)' }}>
                  {path.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ════ Migration path cards ════ */}
      {activePaths.map((path, i) => (
        <PathCard
          key={path.id}
          path={path}
          index={i}
          selectedIds={selectedIds}
          onToggle={toggleAsset}
          onToggleAll={toggleAllForPath}
        />
      ))}

      {/* ════ No migration needed section ════ */}
      {noMigration.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="rounded-2xl border p-5 theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 4px var(--color-card-shadow)',
          }}
        >
          <div className="flex items-center gap-2.5 mb-4">
            <CheckCircle2 size={16} style={{ color: '#22C55E' }} />
            <h2 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              No Migration Required
            </h2>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-md border"
              style={{ color: '#22C55E', backgroundColor: '#22C55E10', borderColor: '#22C55E20' }}
            >
              {noMigration.length} assets
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {noMigration.map((asset) => (
              <div
                key={asset.id}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-primary)' }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center p-1 shrink-0"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                >
                  <img src={TECHNOLOGY_LOGOS[asset.technology]} alt={asset.technology} className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <span className="text-[12px] font-semibold truncate block" style={{ color: 'var(--color-text-primary)' }}>
                    {asset.name}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    {asset.businessArea} · {asset.technology}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ════ Start Migration CTA ════ */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex justify-end pb-4"
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartMigration}
          className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white cursor-pointer transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
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
          aria-label="Start Migration"
        >
          Start Migration
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
