import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';

/* ─────────────────────────────────────────────────────────
 * AssessmentDiscovery — the screen shown after "Launch Assessment"
 *
 * Two side-by-side boxes:
 *   1. BI Discovery & Intelligence  — scans BI platforms, then runs intelligence
 *   2. ETL Discovery & Intelligence — scans ETL pipelines, then runs intelligence
 *
 * In each box:
 *   - Discovery runs first
 *   - After discovery finishes, Intelligence runs automatically
 *   - After both boxes complete, "Show Results" CTA appears
 * ───────────────────────────────────────────────────────── */

/* ── BI Step Definitions ── */
const BI_DISCOVERY_STEPS: TraceStep[] = [
  { label: 'Detecting different file types', detail: '24 BI assets' },
  { label: 'Profiling usage and ownership' },
  { label: 'Assessing access frequency' },
];

const BI_INTELLIGENCE_STEPS: TraceStep[] = [
  { label: 'Extracting visual metadata' },
  { label: 'Understanding data models' },
  { label: 'Contextualizing visuals and KPIs using built-in KPI Bank' },
  { label: 'Mapping business functions' },
  { label: 'Creating unified inventory' },
];

/* ── ETL Step Definitions ── */
const ETL_DISCOVERY_STEPS: TraceStep[] = [
  { label: 'Detecting different file types', detail: '8 ETL workflows' },
  { label: 'Profiling usage and ownership' },
  { label: 'Assessing run frequency' },
];

const ETL_INTELLIGENCE_STEPS: TraceStep[] = [
  { label: 'Assessing source and target metadata' },
  { label: 'Detecting lineage' },
  { label: 'Contextualizing KPIs using built-in KPI Bank' },
  { label: 'Mapping business functions' },
  { label: 'Detecting business purpose' },
  { label: 'Evaluating criticality and complexity' },
  { label: 'Creating unified inventory' },
];

export default function AssessmentDiscovery({ onShowResults }: { onShowResults?: () => void }) {
  const [biDiscoveryDone, setBiDiscoveryDone] = useState(false);
  const [biIntelligenceDone, setBiIntelligenceDone] = useState(false);
  const [etlDiscoveryDone, setEtlDiscoveryDone] = useState(false);
  const [etlIntelligenceDone, setEtlIntelligenceDone] = useState(false);

  const biAllDone = biDiscoveryDone && biIntelligenceDone;
  const etlAllDone = etlDiscoveryDone && etlIntelligenceDone;
  const showResults = biAllDone && etlAllDone;

  const onBiDiscoverySettled = useCallback(() => setBiDiscoveryDone(true), []);
  const onBiIntelligenceSettled = useCallback(() => setBiIntelligenceDone(true), []);
  const onEtlDiscoverySettled = useCallback(() => setEtlDiscoveryDone(true), []);
  const onEtlIntelligenceSettled = useCallback(() => setEtlIntelligenceDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ─── Two side-by-side boxes: BI Box & ETL Box ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* ── Box 1: BI Discovery & Intelligence ── */}
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
          aria-label="BI Discovery and Intelligence"
        >
          {/* Header */}
          <div className="mb-4">
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              BI Discovery & Intelligence
            </h2>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
            }}
          />

          {/* Sub-stage 1: BI Discovery */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                BI Discovery
              </span>
              {biDiscoveryDone && (
                <span className="text-[11px] font-semibold text-emerald-500">
                  Completed
                </span>
              )}
            </div>
            <ThinkingTrace
              activeLabel="Discovering BI assets…"
              doneLabel="BI Discovery complete — 24 assets cataloged"
              steps={BI_DISCOVERY_STEPS}
              onSettled={onBiDiscoverySettled}
              delayMs={300}
            />
          </div>

          {/* Divider between Discovery and Intelligence */}
          <div
            className="h-px my-4"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-subtle), transparent)',
            }}
          />

          {/* Sub-stage 2: BI Intelligence (runs after BI Discovery finishes) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{
                  color: biDiscoveryDone
                    ? 'var(--color-accent)'
                    : 'var(--color-text-tertiary)',
                }}
              >
                BI Intelligence
              </span>
              {biIntelligenceDone && (
                <span className="text-[11px] font-semibold text-emerald-500">
                  Completed
                </span>
              )}
            </div>
            {biDiscoveryDone ? (
              <ThinkingTrace
                activeLabel="Analyzing BI intelligence & scoring…"
                doneLabel="BI Intelligence complete — redundancy & readiness scored"
                steps={BI_INTELLIGENCE_STEPS}
                onSettled={onBiIntelligenceSettled}
                delayMs={200}
              />
            ) : (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <Clock size={13} />
                <span>Queued · Starts automatically after BI Discovery</span>
              </div>
            )}
          </div>
        </motion.section>

        {/* ── Box 2: ETL Discovery & Intelligence ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-engine-border)',
            boxShadow: '0 2px 12px var(--color-card-shadow)',
          }}
          aria-label="ETL Discovery and Intelligence"
        >
          {/* Header */}
          <div className="mb-4">
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              ETL Discovery & Intelligence
            </h2>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
            }}
          />

          {/* Sub-stage 1: ETL Discovery */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">
                ETL Discovery
              </span>
              {etlDiscoveryDone && (
                <span className="text-[11px] font-semibold text-emerald-500">
                  Completed
                </span>
              )}
            </div>
            <ThinkingTrace
              activeLabel="Discovering ETL assets…"
              doneLabel="ETL Discovery complete — 8 pipelines & scripts cataloged"
              steps={ETL_DISCOVERY_STEPS}
              onSettled={onEtlDiscoverySettled}
              delayMs={400}
            />
          </div>

          {/* Divider between Discovery and Intelligence */}
          <div
            className="h-px my-4"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-subtle), transparent)',
            }}
          />

          {/* Sub-stage 2: ETL Intelligence (runs after ETL Discovery finishes) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{
                  color: etlDiscoveryDone
                    ? 'rgb(16, 185, 129)'
                    : 'var(--color-text-tertiary)',
                }}
              >
                ETL Intelligence
              </span>
              {etlIntelligenceDone && (
                <span className="text-[11px] font-semibold text-emerald-500">
                  Completed
                </span>
              )}
            </div>
            {etlDiscoveryDone ? (
              <ThinkingTrace
                activeLabel="Analyzing ETL intelligence & lineage…"
                doneLabel="ETL Intelligence complete — lineage & logic mapped"
                steps={ETL_INTELLIGENCE_STEPS}
                onSettled={onEtlIntelligenceSettled}
                delayMs={200}
              />
            ) : (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <Clock size={13} />
                <span>Queued · Starts automatically after ETL Discovery</span>
              </div>
            )}
          </div>
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
