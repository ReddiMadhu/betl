import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';

/* ─────────────────────────────────────────────────────────
 * AssessmentDiscovery — the screen shown after "Launch Assessment"
 *
 * Two side-by-side sections:
 *   1. BI & ETL Discovery  — scans connected platforms
 *   2. BI & ETL Intelligence — analyses patterns & scores assets
 *
 * Each section has a Drive pixel-grid loader next to the heading,
 * descriptive text, and an animated ThinkingTrace. After both
 * settle, a "Show Results" button appears at the bottom-right.
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

/* ── Trace step definitions ── */
const DISCOVERY_STEPS: TraceStep[] = [
  { label: 'Scanning Power BI workspaces', detail: '10 dashboards' },
  { label: 'Mapping Tableau data sources', detail: '2 workbooks' },
  { label: 'Cataloging MicroStrategy objects', detail: '5 reports' },
  { label: 'Analyzing Alteryx workflows', detail: '8 pipelines' },
];

const INTELLIGENCE_STEPS: TraceStep[] = [
  { label: 'Analyzing cross-platform usage patterns' },
  { label: 'Detecting redundant & overlapping reports' },
  { label: 'Evaluating data lineage & dependencies' },
  { label: 'Scoring modernization readiness' },
];

export default function AssessmentDiscovery({ onShowResults }: { onShowResults?: () => void }) {
  const [discoveryDone, setDiscoveryDone] = useState(false);
  const [intelligenceDone, setIntelligenceDone] = useState(false);
  const showResults = discoveryDone && intelligenceDone;

  const onDiscoverySettled = useCallback(() => setDiscoveryDone(true), []);
  const onIntelligenceSettled = useCallback(() => setIntelligenceDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ─── Two side-by-side sections ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* ── Section 1: BI & ETL Discovery ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
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
              <LoaderGrid active={!discoveryDone} />
            </div>
            <div className="min-w-0">
              <h2
                className="text-lg font-bold tracking-tight mb-1"
                style={{ color: 'var(--color-text-primary)' }}
              >
                BI & ETL Discovery
              </h2>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Our Discovery agent is actively scanning your connected BI and ETL platforms —
                crawling workspaces, extracting metadata, mapping data lineage, and cataloging
                every dashboard, report, dataset, and pipeline across your enterprise landscape.
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
            activeLabel="Discovering assets…"
            doneLabel="Discovery complete — 25 assets cataloged"
            steps={DISCOVERY_STEPS}
            onSettled={onDiscoverySettled}
            delayMs={500}
          />
        </motion.section>

        {/* ── Section 2: BI & ETL Intelligence ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
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
              style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)' }}
            >
              <LoaderGrid active={!intelligenceDone} />
            </div>
            <div className="min-w-0">
              <h2
                className="text-lg font-bold tracking-tight mb-1"
                style={{ color: 'var(--color-text-primary)' }}
              >
                BI & ETL Intelligence
              </h2>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                The Intelligence agent is analyzing discovered assets to uncover usage patterns,
                identify redundancies, evaluate data quality, and score each asset's modernization
                potential — building a comprehensive intelligence layer for your transformation roadmap.
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

          {/* Thinking trace — starts after Discovery with a delay */}
          <ThinkingTrace
            activeLabel="Analyzing intelligence…"
            doneLabel="Intelligence complete — readiness scored"
            steps={INTELLIGENCE_STEPS}
            onSettled={onIntelligenceSettled}
            delayMs={3000}
          />
        </motion.section>
      </div>

      {/* ─── Show Results button — bottom right ─── */}
      <AnimatePresence>
        {showResults && (
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
              aria-label="Show Results"
              onClick={onShowResults}
            >
              Show Results
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
