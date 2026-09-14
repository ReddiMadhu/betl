import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';

/* ─────────────────────────────────────────────────────────
 * MigrationLoading — shown after "Start Migration"
 *
 * Supports 3 modes:
 *   - 'bi'   : Shows only BI Migration loading
 *   - 'etl'  : Shows only ETL Migration loading
 *   - 'all'  : Shows both BI & ETL Migration loading
 *
 * Once completed, "Show Migration Results" button appears.
 * ───────────────────────────────────────────────────────── */

/* ── BI Migration Steps ── */
const BI_MIGRATION_STEPS: TraceStep[] = [
  { label: 'Assessing source dashboards' },
  { label: 'Rebuilding semantic models' },
  { label: 'Converting visual and calculation logic' },
  { label: 'Validating conversions' },
];

/* ── ETL Migration Steps ── */
const ETL_MIGRATION_STEPS: TraceStep[] = [
  { label: 'Assessing source workflows' },
  { label: 'Converting transformation logic' },
  { label: 'Validating conversions' },
];

export type MigrationMode = 'bi' | 'etl' | 'all';

interface Props {
  mode?: MigrationMode;
  onShowResults?: () => void;
}

export default function MigrationLoading({ mode = 'all', onShowResults }: Props) {
  const [biDone, setBiDone] = useState(false);
  const [etlDone, setEtlDone] = useState(false);

  const showBi = mode === 'bi' || mode === 'all';
  const showEtl = mode === 'etl' || mode === 'all';

  const isComplete =
    mode === 'bi' ? biDone : mode === 'etl' ? etlDone : biDone && etlDone;

  const onBiSettled = useCallback(() => setBiDone(true), []);
  const onEtlSettled = useCallback(() => setEtlDone(true), []);

  const resultLabel =
    mode === 'bi'
      ? 'Show BI Migration Results'
      : mode === 'etl'
      ? 'Show ETL Migration Results'
      : 'Show Migration Results';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mx-auto ${mode === 'all' ? 'max-w-[1240px]' : 'max-w-[800px]'}`}
    >
      {/* ─── Top Row: BI Migration / ETL Migration ─── */}
      <div
        className={`grid gap-6 mb-8 ${
          mode === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {/* ── Box 1: BI Migration ── */}
        {showBi && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-engine-border)',
              boxShadow: '0 2px 12px var(--color-card-shadow)',
            }}
            aria-label="BI Migration"
          >
            {/* Header */}
            <div className="mb-4">
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                BI Migration
              </h2>
            </div>

            {/* Divider */}
            <div
              className="h-px mb-5"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-border-primary), transparent)',
              }}
            />

            {/* Thinking trace */}
            <ThinkingTrace
              activeLabel="Converting BI dashboards & semantic models…"
              doneLabel="BI Migration complete — visual & calculation logic converted"
              steps={BI_MIGRATION_STEPS}
              onSettled={onBiSettled}
              delayMs={300}
            />
          </motion.section>
        )}

        {/* ── Box 2: ETL Migration ── */}
        {showEtl && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-engine-border)',
              boxShadow: '0 2px 12px var(--color-card-shadow)',
            }}
            aria-label="ETL Migration"
          >
            {/* Header */}
            <div className="mb-4">
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                ETL Migration
              </h2>
            </div>

            {/* Divider */}
            <div
              className="h-px mb-5"
              style={{
                background:
                  'linear-gradient(90deg, var(--color-border-primary), transparent)',
              }}
            />

            {/* Thinking trace */}
            <ThinkingTrace
              activeLabel="Converting ETL workflows & transformation logic…"
              doneLabel="ETL Migration complete — transformation scripts validated"
              steps={ETL_MIGRATION_STEPS}
              onSettled={onEtlSettled}
              delayMs={400}
            />
          </motion.section>
        )}
      </div>

      {/* ─── Show Results button — bottom right ─── */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex justify-end mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                         text-sm font-bold cursor-pointer
                         transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 border"
              style={{
                background:
                  'linear-gradient(135deg, rgba(251, 78, 11, 0.20) 0%, rgba(251, 78, 11, 0.08) 100%)',
                borderColor:
                  'color-mix(in srgb, var(--color-accent) 45%, var(--color-border-primary))',
                color: 'var(--color-accent)',
                boxShadow: '0 4px 16px rgba(251, 78, 11, 0.15)',
                outlineColor: 'var(--color-accent)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, rgba(251, 78, 11, 0.32) 0%, rgba(251, 78, 11, 0.14) 100%)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.boxShadow =
                  '0 6px 26px rgba(251, 78, 11, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, rgba(251, 78, 11, 0.20) 0%, rgba(251, 78, 11, 0.08) 100%)';
                e.currentTarget.style.borderColor =
                  'color-mix(in srgb, var(--color-accent) 45%, var(--color-border-primary))';
                e.currentTarget.style.boxShadow =
                  '0 4px 16px rgba(251, 78, 11, 0.15)';
              }}
              aria-label={resultLabel}
              onClick={onShowResults}
            >
              {resultLabel}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
