import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';

/* ─────────────────────────────────────────────────────────
 * MigrationLoading — shown after "Start Migration"
 *
 * Single centered section with a Drive pixel-grid loader,
 * descriptive text, and animated ThinkingTrace covering
 * the migration conversion steps.
 * ───────────────────────────────────────────────────────── */

/* ── Trace steps ── */
const MIGRATION_STEPS: TraceStep[] = [
  { label: 'Analyzing source asset definitions & schemas', detail: '8 assets' },
  { label: 'Mapping Tableau workbooks to Power BI datasets', detail: '2 workbooks' },
  { label: 'Converting ThoughtSpot liveboards to Power BI reports', detail: '2 liveboards' },
  { label: 'Transforming MicroStrategy reports to Tableau workbooks' },
  { label: 'Transpiling Alteryx workflows to Python scripts', detail: '4 workflows' },
  { label: 'Validating data model compatibility & KPI parity' },
  { label: 'Generating migration packages & validation reports' },
];

interface Props {
  onShowResults?: () => void;
}

export default function MigrationLoading({ onShowResults }: Props) {
  const [done, setDone] = useState(false);
  const onSettled = useCallback(() => setDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-[720px] mx-auto"
    >
      {/* ── Single migration section ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="rounded-2xl border p-6 md:p-8 mb-8 theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-engine-border)',
          boxShadow: '0 2px 12px var(--color-card-shadow)',
        }}
      >
        {/* Header */}
        <div className="mb-4">
          <h2
            className="text-lg font-bold tracking-tight mb-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Migration
          </h2>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            The Migration agent is converting asset definitions, transpiling ETL workflows,
            mapping data models, and generating validated migration packages for all
            selected platform transitions.
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-4"
          style={{
            background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
          }}
        />

        {/* Thinking trace */}
        <ThinkingTrace
          activeLabel="Migrating assets…"
          doneLabel="Migration complete — packages ready"
          steps={MIGRATION_STEPS}
          onSettled={onSettled}
          delayMs={500}
        />
      </motion.section>

      {/* ─── Show Results button — bottom right ─── */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
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
              aria-label="Show Migration Results"
              onClick={onShowResults}
            >
              Show Migration Results
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
