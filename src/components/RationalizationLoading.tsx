import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, Workflow, GitMerge, Clock, CheckCircle2 } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';

/* ─────────────────────────────────────────────────────────
 * RationalizationLoading — shown after "Start Rationalization"
 *
 * 3-Stage Intelligent Rationalization:
 *   1. BI Rationalization  — analyzes reports, dashboards & calculations
 *   2. ETL Rationalization — analyzes data pipelines, scripts & jobs
 *   3. Detecting BI & ETL Interdependence — cross-impact evaluation:
 *      - Assessing impact of ETL decommission recommendations on BI assets
 *      - Assessing impact of BI decommission recommendations on ETL assets
 *
 * Once all 3 complete, "Show Rationalization Results" button appears.
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

/* ── BI Rationalization Steps ── */
const BI_RATIONALIZATION_STEPS: TraceStep[] = [
  { label: 'Comparing dashboard definitions across BI platforms', detail: '17 BI assets' },
  { label: 'Detecting overlapping KPIs, charts & calculated fields', detail: '8 overlaps found' },
  { label: 'Identifying low-utilization reports for merge or decommission', detail: '3 candidates' },
  { label: 'Generating BI modernization & consolidation scores', detail: 'Complete' },
];

/* ── ETL Rationalization Steps ── */
const ETL_RATIONALIZATION_STEPS: TraceStep[] = [
  { label: 'Analyzing data transformation pipelines & workflows', detail: '8 ETL assets' },
  { label: 'Identifying duplicate data prep logic & redundant scripts', detail: '4 duplicates found' },
  { label: 'Flagging legacy workflows for retirement or refactoring', detail: '2 candidates' },
  { label: 'Generating pipeline consolidation & migration scores', detail: 'Complete' },
];

/* ── Interdependence Steps ── */
const INTERDEPENDENCE_STEPS: TraceStep[] = [
  { label: 'Tracing cross-platform lineage between ETL pipelines and BI reports', detail: '25 dependencies mapped' },
  { label: 'Assessing impact of ETL decommission recommendations on BI assets', detail: '3 dashboards verified & protected' },
  { label: 'Assessing impact of BI decommission recommendations on ETL assets', detail: '2 pipelines verified for safe retirement' },
  { label: 'Validating end-to-end dependency integrity across modernization roadmap', detail: 'Integrity verified' },
];

interface Props {
  onShowResults?: () => void;
}

export default function RationalizationLoading({ onShowResults }: Props) {
  const [biDone, setBiDone] = useState(false);
  const [etlDone, setEtlDone] = useState(false);
  const [interdependenceDone, setInterdependenceDone] = useState(false);

  const canStartInterdependence = biDone && etlDone;
  const allDone = biDone && etlDone && interdependenceDone;

  const onBiSettled = useCallback(() => setBiDone(true), []);
  const onEtlSettled = useCallback(() => setEtlDone(true), []);
  const onInterdependenceSettled = useCallback(() => setInterdependenceDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-[1240px] mx-auto"
    >
      {/* ─── Top Row: BI Rationalization & ETL Rationalization ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* ── Box 1: BI Rationalization ── */}
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
          aria-label="BI Rationalization"
        >
          {/* Header */}
          <div className="flex items-start gap-3.5 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: 'var(--color-accent-subtle)' }}
            >
              <LoaderGrid active={!biDone} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <BarChart3 size={17} style={{ color: 'var(--color-accent)' }} />
                <h2
                  className="text-lg font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  BI Rationalization
                </h2>
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Cross-referencing dashboards and reports — detecting overlapping visual logic,
                identifying low-utilization reports, and evaluating decommission opportunities.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
            }}
          />

          {/* Thinking trace */}
          <ThinkingTrace
            activeLabel="Evaluating BI assets…"
            doneLabel="BI Rationalization complete — overlap & merge scored"
            steps={BI_RATIONALIZATION_STEPS}
            onSettled={onBiSettled}
            delayMs={300}
          />
        </motion.section>

        {/* ── Box 2: ETL Rationalization ── */}
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
          aria-label="ETL Rationalization"
        >
          {/* Header */}
          <div className="flex items-start gap-3.5 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)' }}
            >
              <LoaderGrid active={!etlDone} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Workflow size={17} className="text-emerald-500" />
                <h2
                  className="text-lg font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  ETL Rationalization
                </h2>
              </div>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Evaluating data pipelines and transformation workflows — detecting redundant
                prep logic, duplicated processing jobs, and legacy workflow retirement candidates.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
            }}
          />

          {/* Thinking trace */}
          <ThinkingTrace
            activeLabel="Evaluating ETL workflows…"
            doneLabel="ETL Rationalization complete — redundancy & pipeline scores ready"
            steps={ETL_RATIONALIZATION_STEPS}
            onSettled={onEtlSettled}
            delayMs={400}
          />
        </motion.section>
      </div>

      {/* ─── Box 3: Detecting BI and ETL Interdependence ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        className="rounded-2xl border p-6 md:p-8 mb-8 theme-transition flex flex-col"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: canStartInterdependence
            ? 'var(--color-border-secondary)'
            : 'var(--color-engine-border)',
          boxShadow: '0 2px 12px var(--color-card-shadow)',
        }}
        aria-label="Detecting BI and ETL Interdependence"
      >
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{
              backgroundColor: canStartInterdependence
                ? 'var(--color-accent-subtle)'
                : 'var(--color-bg-tertiary)',
            }}
          >
            <LoaderGrid active={canStartInterdependence && !interdependenceDone} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <GitMerge
                size={17}
                style={{
                  color: canStartInterdependence
                    ? 'var(--color-accent)'
                    : 'var(--color-text-tertiary)',
                }}
              />
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Detecting BI and ETL Interdependence
              </h2>
              {interdependenceDone && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 ml-auto">
                  <CheckCircle2 size={13} />
                  Complete
                </span>
              )}
            </div>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Evaluating cross-impact dependencies between BI dashboards and ETL pipelines to ensure decommission
              recommendations on one layer do not disrupt downstream consumers or upstream data flow.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-5"
          style={{
            background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
          }}
        />

        {/* Thinking trace or Queued State */}
        {canStartInterdependence ? (
          <ThinkingTrace
            activeLabel="Analyzing BI & ETL cross-impact interdependence…"
            doneLabel="Interdependence analysis complete — cross-impact verified & safe"
            steps={INTERDEPENDENCE_STEPS}
            onSettled={onInterdependenceSettled}
            delayMs={200}
          />
        ) : (
          <div
            className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-xs font-medium theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              borderColor: 'var(--color-border-subtle)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            <Clock size={15} />
            <span>
              Queued · Automatically begins detecting cross-dependencies once BI and ETL rationalization complete
            </span>
          </div>
        )}
      </motion.section>

      {/* ─── Show Results button — bottom right ─── */}
      <AnimatePresence>
        {allDone && (
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
