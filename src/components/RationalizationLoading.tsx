import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';

/* ─────────────────────────────────────────────────────────
 * RationalizationLoading — shown after "Start Rationalization"
 *
 * Single centered section with a Drive pixel-grid loader,
 * descriptive text, and animated ThinkingTrace covering
 * redundancy analysis + modernization scoring steps.
 * ───────────────────────────────────────────────────────── */

/* ── Drive loader grid ── */
const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3), c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

function LoaderGrid({ active = true }: { active?: boolean }) {
  return (
    <span
      aria-hidden
      className="grid shrink-0"
      style={{
        gridTemplateColumns: 'repeat(3, 5px)',
        gap: '2px',
      }}
    >
      {chevron.map((delay, index) => (
        <span
          key={index}
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '1px',
            backgroundColor: 'var(--color-accent)',
            opacity: active ? 0.15 : 0.35,
            animation: active
              ? `pixel-on 650ms ease-in-out ${delay}ms infinite`
              : 'none',
          }}
        />
      ))}
    </span>
  );
}

/* ── Trace steps ── */
const RATIONALIZATION_STEPS: TraceStep[] = [
  { label: 'Comparing dashboard definitions across platforms', detail: '25 dashboards' },
  { label: 'Detecting overlapping KPIs & calculated fields', detail: '14 overlaps' },
  { label: 'Identifying duplicate ETL logic', detail: '6 duplicates' },
  { label: 'Mapping cross-platform data redundancies', detail: '9 sources' },
  { label: 'Scoring migration readiness per business area', detail: '7 areas' },
  { label: 'Calculating effort estimates & prioritization' },
  { label: 'Building rationalization roadmap' },
];

interface Props {
  onShowResults?: () => void;
}

export default function RationalizationLoading({ onShowResults }: Props) {
  const [done, setDone] = useState(false);
  const onSettled = useCallback(() => setDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-[720px] mx-auto"
    >
      {/* ── Single rationalization section ── */}
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
        {/* Header with Drive loader */}
        <div className="flex items-start gap-3.5 mb-4">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ backgroundColor: 'var(--color-accent-subtle)' }}
          >
            <LoaderGrid active={!done} />
          </div>
          <div className="min-w-0">
            <h2
              className="text-lg font-bold tracking-tight mb-1"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Rationalization
            </h2>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              The Rationalization agent is cross-referencing all discovered assets — detecting
              redundancies, scoring migration readiness, estimating effort, and building a
              prioritized modernization roadmap across your insurance business areas.
            </p>
          </div>
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
          activeLabel="Rationalizing assets…"
          doneLabel="Rationalization complete — roadmap ready"
          steps={RATIONALIZATION_STEPS}
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
              aria-label="Show Rationalization Results"
              onClick={onShowResults}
            >
              Show Rationalization Results
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
