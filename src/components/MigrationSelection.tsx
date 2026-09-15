import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { BiLogo, EtlLogo } from './icons/CategoryLogos';
import {
  migrationAssets as defaultMigrationAssets,
} from '../data/migrationData';
import { TECHNOLOGY_LOGOS } from '../data/discoveryData';
import type { TechnologyName } from '../data/discoveryData';
import type { MigrationAsset } from '../data/migrationData';
import MigrationTargetModal from './migration/MigrationTargetModal';

/* ─────────────────────────────────────────────────────────
 * MigrationSelection — Migration Planning (Migration Agent)
 * ───────────────────────────────────────────────────────── */

interface Props {
  onStartMigration?: (selectedIds?: string[], mode?: 'bi' | 'etl' | 'all', migrationPath?: 'tb-pbi' | 'mstr-tb' | 'alt-py') => void;
}

export default function MigrationSelection({ onStartMigration }: Props) {
  // Local state for all assets to allow in-memory target adjustments
  const [assets, setAssets] = useState<MigrationAsset[]>(() => defaultMigrationAssets);

  // Active target selection modal asset
  const [editingAsset, setEditingAsset] = useState<MigrationAsset | null>(null);

  // Filter tabs inside BI & ETL cards
  const [biFilter, setBiFilter] = useState<'ALL' | 'Tableau' | 'Power BI' | 'MicroStrategy'>('ALL');
  const [etlFilter, setEtlFilter] = useState<'ALL' | 'Alteryx' | 'Python'>('ALL');

  // Grouped assets
  const biAssets = useMemo(() => assets.filter((a) => a.type === 'bi'), [assets]);
  const etlAssets = useMemo(() => assets.filter((a) => a.type === 'etl'), [assets]);

  // Filtered lists
  const filteredBiAssets = useMemo(() => {
    if (biFilter === 'ALL') return biAssets;
    return biAssets.filter((a) => a.technology === biFilter);
  }, [biAssets, biFilter]);

  const filteredEtlAssets = useMemo(() => {
    if (etlFilter === 'ALL') return etlAssets;
    return etlAssets.filter((a) => a.technology === etlFilter);
  }, [etlAssets, etlFilter]);

  // Counts for BI technologies
  const tableauCount = useMemo(() => biAssets.filter((a) => a.technology === 'Tableau').length, [biAssets]);
  const powerBiCount = useMemo(() => biAssets.filter((a) => a.technology === 'Power BI').length, [biAssets]);
  const mstrCount = useMemo(() => biAssets.filter((a) => a.technology === 'MicroStrategy').length, [biAssets]);

  // Counts for ETL technologies
  const alteryxCount = useMemo(() => etlAssets.filter((a) => a.technology === 'Alteryx').length, [etlAssets]);
  const pythonCount = useMemo(() => etlAssets.filter((a) => a.technology === 'Python').length, [etlAssets]);

  // Handle target change from modal and start migration loading screen
  const handleUpdateTarget = useCallback(
    (assetId: string, newTarget: TechnologyName | null) => {
      const asset = assets.find((a) => a.id === assetId);
      const mode = asset?.type === 'bi' ? 'bi' : 'etl';

      // Determine migration path from source → target
      let migrationPath: 'tb-pbi' | 'mstr-tb' | 'alt-py' = 'tb-pbi';
      if (asset?.technology === 'Tableau' && newTarget === 'Power BI') migrationPath = 'tb-pbi';
      else if (asset?.technology === 'MicroStrategy' && newTarget === 'Tableau') migrationPath = 'mstr-tb';
      else if (asset?.technology === 'MicroStrategy' && newTarget === 'Power BI') migrationPath = 'tb-pbi';
      else if (asset?.technology === 'Alteryx' && newTarget === 'Python') migrationPath = 'alt-py';
      else if (mode === 'etl') migrationPath = 'alt-py';

      setAssets((prev) =>
        prev.map((a) => {
          if (a.id === assetId) {
            return {
              ...a,
              targetTechnology: newTarget,
            };
          }
          return a;
        }),
      );
      setEditingAsset(null);
      // Immediately navigate to migration loading screen for that specific domain
      onStartMigration?.([assetId], mode, migrationPath);
    },
    [assets, onStartMigration],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="space-y-6 pb-12"
    >
      {/* ── Heading: Select Assets to Migrate ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1"
      >
        <h1
          className="text-2xl lg:text-3xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Select Assets to Migrate
        </h1>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://bt.etl.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:opacity-90"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-text-primary)',
              boxShadow: '0 1px 3px var(--color-card-shadow)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)';
              e.currentTarget.style.boxShadow = '0 2px 8px var(--color-accent-glow)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border-primary)';
              e.currentTarget.style.boxShadow = '0 1px 3px var(--color-card-shadow)';
            }}
            title="biagents (bt.etl.com)"
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span>biagents</span>
            <ExternalLink size={13} style={{ color: 'var(--color-text-tertiary)' }} />
          </a>
        </div>
      </motion.div>

      {/* ═════════════════════════════════════════════════════════
          TWO PRIMARY CARDS:
          CARD 1: BI Retained Dashboards (Tableau, Power BI, MicroStrategy)
          CARD 2: ETL Retained Workflows (Alteryx, Python)
          ═════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ── CARD 1: BI RETAINED DASHBOARDS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="rounded-2xl border flex flex-col overflow-hidden theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 2px 10px var(--color-card-shadow)',
          }}
        >
          {/* BI Card Header */}
          <div
            className="p-5 border-b"
            style={{
              borderColor: 'var(--color-border-primary)',
              background: 'linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center p-1.5 border shadow-sm shrink-0"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  borderColor: 'rgba(59, 130, 246, 0.22)',
                }}
              >
                <BiLogo className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  BI Retained Dashboards
                </h2>
                <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  Tableau · Power BI · MicroStrategy
                </p>
              </div>
            </div>

            {/* Sub-filter tabs inside BI: All | Tableau | Power BI | MicroStrategy */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <button
                type="button"
                onClick={() => setBiFilter('ALL')}
                className="px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all border"
                style={{
                  background:
                    biFilter === 'ALL'
                      ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                      : 'var(--color-surface)',
                  color: biFilter === 'ALL' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderColor:
                    biFilter === 'ALL'
                      ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                      : 'var(--color-border-primary)',
                  boxShadow: biFilter === 'ALL' ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                }}
              >
                All BI ({biAssets.length})
              </button>
              <button
                type="button"
                onClick={() => setBiFilter('Tableau')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all border"
                style={{
                  background:
                    biFilter === 'Tableau'
                      ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                      : 'var(--color-surface)',
                  color: biFilter === 'Tableau' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderColor:
                    biFilter === 'Tableau'
                      ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                      : 'var(--color-border-primary)',
                  boxShadow: biFilter === 'Tableau' ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                }}
              >
                <img src={TECHNOLOGY_LOGOS['Tableau']} alt="Tableau" className="w-3.5 h-3.5 object-contain" />
                Tableau ({tableauCount})
              </button>
              <button
                type="button"
                onClick={() => setBiFilter('Power BI')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all border"
                style={{
                  background:
                    biFilter === 'Power BI'
                      ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                      : 'var(--color-surface)',
                  color: biFilter === 'Power BI' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderColor:
                    biFilter === 'Power BI'
                      ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                      : 'var(--color-border-primary)',
                  boxShadow: biFilter === 'Power BI' ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                }}
              >
                <img src={TECHNOLOGY_LOGOS['Power BI']} alt="Power BI" className="w-3.5 h-3.5 object-contain" />
                Power BI ({powerBiCount})
              </button>
              <button
                type="button"
                onClick={() => setBiFilter('MicroStrategy')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all border"
                style={{
                  background:
                    biFilter === 'MicroStrategy'
                      ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                      : 'var(--color-surface)',
                  color: biFilter === 'MicroStrategy' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderColor:
                    biFilter === 'MicroStrategy'
                      ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                      : 'var(--color-border-primary)',
                  boxShadow: biFilter === 'MicroStrategy' ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                }}
              >
                <img src={TECHNOLOGY_LOGOS['MicroStrategy']} alt="MicroStrategy" className="w-3.5 h-3.5 object-contain" />
                MicroStrategy ({mstrCount})
              </button>
            </div>
          </div>

          {/* BI Asset List */}
          <div className="p-4 space-y-2.5 overflow-y-auto max-h-[640px] flex-1">
            {filteredBiAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setEditingAsset(asset)}
                className="rounded-xl border px-4 py-3.5 transition-all duration-200 cursor-pointer relative group flex items-center justify-between gap-3"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                  e.currentTarget.style.transform = 'none';
                }}
                title="Click to configure destination target technology"
              >
                {/* Tech Logo & Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center p-1 border shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
                  >
                    <img
                      src={TECHNOLOGY_LOGOS[asset.technology]}
                      alt={asset.technology}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3
                    className="text-xs sm:text-sm font-bold truncate group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {asset.name}
                  </h3>
                </div>

                {/* Arrow indicating click to configure */}
                <div className="flex items-center gap-1.5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors shrink-0">
                  <span className="text-[11px] font-medium hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                    Configure
                  </span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CARD 2: ETL RETAINED WORKFLOWS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="rounded-2xl border flex flex-col overflow-hidden theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 2px 10px var(--color-card-shadow)',
          }}
        >
          {/* ETL Card Header */}
          <div
            className="p-5 border-b"
            style={{
              borderColor: 'var(--color-border-primary)',
              background: 'linear-gradient(180deg, var(--color-surface) 0%, transparent 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center p-1.5 border shadow-sm shrink-0"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  borderColor: 'rgba(16, 185, 129, 0.22)',
                }}
              >
                <EtlLogo className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  ETL Retained Workflows
                </h2>
                <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                  Alteryx · Python / PySpark
                </p>
              </div>
            </div>

            {/* Sub-filter tabs inside ETL: All | Alteryx | Python */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <button
                type="button"
                onClick={() => setEtlFilter('ALL')}
                className="px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all border"
                style={{
                  background:
                    etlFilter === 'ALL'
                      ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                      : 'var(--color-surface)',
                  color: etlFilter === 'ALL' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderColor:
                    etlFilter === 'ALL'
                      ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                      : 'var(--color-border-primary)',
                  boxShadow: etlFilter === 'ALL' ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                }}
              >
                All ETL ({etlAssets.length})
              </button>
              <button
                type="button"
                onClick={() => setEtlFilter('Alteryx')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all border"
                style={{
                  background:
                    etlFilter === 'Alteryx'
                      ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                      : 'var(--color-surface)',
                  color: etlFilter === 'Alteryx' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderColor:
                    etlFilter === 'Alteryx'
                      ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                      : 'var(--color-border-primary)',
                  boxShadow: etlFilter === 'Alteryx' ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                }}
              >
                <img src={TECHNOLOGY_LOGOS['Alteryx']} alt="Alteryx" className="w-3.5 h-3.5 object-contain" />
                Alteryx ({alteryxCount})
              </button>
              <button
                type="button"
                onClick={() => setEtlFilter('Python')}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all border"
                style={{
                  background:
                    etlFilter === 'Python'
                      ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                      : 'var(--color-surface)',
                  color: etlFilter === 'Python' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  borderColor:
                    etlFilter === 'Python'
                      ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                      : 'var(--color-border-primary)',
                  boxShadow: etlFilter === 'Python' ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                }}
              >
                <img src={TECHNOLOGY_LOGOS['Python']} alt="Python" className="w-3.5 h-3.5 object-contain" />
                Python ({pythonCount})
              </button>
            </div>
          </div>

          {/* ETL Asset List */}
          <div className="p-4 space-y-2.5 overflow-y-auto max-h-[640px] flex-1">
            {filteredEtlAssets.map((asset) => (
              <div
                key={asset.id}
                onClick={() => setEditingAsset(asset)}
                className="rounded-xl border px-4 py-3.5 transition-all duration-200 cursor-pointer relative group flex items-center justify-between gap-3"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border-primary)',
                  boxShadow: '0 1px 3px var(--color-card-shadow)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-accent)';
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-subtle)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-primary)';
                  e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                  e.currentTarget.style.transform = 'none';
                }}
                title="Click to configure destination target technology"
              >
                {/* Tech Logo & Name */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center p-1 border shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
                  >
                    <img
                      src={TECHNOLOGY_LOGOS[asset.technology]}
                      alt={asset.technology}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3
                    className="text-xs sm:text-sm font-bold truncate group-hover:text-[var(--color-accent)] transition-colors"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {asset.name}
                  </h3>
                </div>

                {/* Arrow indicating click to configure */}
                <div className="flex items-center gap-1.5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors shrink-0">
                  <span className="text-[11px] font-medium hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity">
                    Configure
                  </span>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Modal for selecting target technology ── */}
      <AnimatePresence>
        {editingAsset && (
          <MigrationTargetModal
            asset={editingAsset}
            onClose={() => setEditingAsset(null)}
            onSelectTarget={handleUpdateTarget}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
