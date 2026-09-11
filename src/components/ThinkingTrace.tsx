import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
 * ThinkingTrace — expandable agent trace with animated steps
 *
 * Shows a shimmer "working" label that resolves into a muted
 * "done" label. Steps appear progressively with check marks.
 * Calls onSettled when the animation sequence completes.
 * ───────────────────────────────────────────────────────── */

export interface TraceStep {
  label: string;
  detail?: string;
}

interface Props {
  activeLabel: string;
  doneLabel: string;
  steps: TraceStep[];
  /** called once when all steps have resolved */
  onSettled?: () => void;
  /** stagger delay before this trace begins (ms) */
  delayMs?: number;
}

// Phase durations (ms) — controls the overall pacing
const PHASE_OPEN = 600;       // initial pause before expanding
const PHASE_PER_STEP = 900;   // time each step is the "active" one
const PHASE_SETTLE = 500;     // pause after last step before settling

export default function ThinkingTrace({
  activeLabel,
  doneLabel,
  steps,
  onSettled,
  delayMs = 0,
}: Props) {
  const [started, setStarted] = useState(delayMs === 0);
  const [stage, setStage] = useState(0); // 0 = closed, 1 = expanding, 2..2+n-1 = steps, last = settled
  const [manualExpanded, setManualExpanded] = useState<boolean | null>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const settledRef = useRef(false);

  const totalStages = steps.length + 2; // open + each step + settle
  const working = stage < totalStages - 1;
  const visibleSteps = stage <= 1 ? 0 : Math.min(stage - 1, steps.length);
  const autoExpanded = stage >= 1 && working;
  const expanded = manualExpanded ?? autoExpanded;

  // Start delay
  useEffect(() => {
    if (delayMs === 0) return;
    const t = setTimeout(() => setStarted(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);

  // Advance stages
  useEffect(() => {
    if (!started) return;
    if (stage >= totalStages - 1) return;
    const dur = stage === 0 ? PHASE_OPEN : stage < totalStages - 1 ? PHASE_PER_STEP : PHASE_SETTLE;
    const t = setTimeout(() => setStage((s) => s + 1), dur);
    return () => clearTimeout(t);
  }, [started, stage, totalStages]);

  // Measure line height for the vertical connector
  useLayoutEffect(() => {
    if (traceRef.current) setLineHeight(traceRef.current.offsetHeight);
  }, [visibleSteps, expanded, stage]);

  // Fire onSettled once
  useEffect(() => {
    if (working || settledRef.current) return;
    settledRef.current = true;
    onSettled?.();
  }, [working, onSettled]);

  if (!started) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex w-full flex-col"
    >
      {/* Header toggle */}
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => setManualExpanded((c) => !(c ?? autoExpanded))}
        className="flex w-fit items-center gap-2 rounded-lg px-2 py-1.5 transition-colors duration-100"
        style={{
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {/* Sparkle icon */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={working ? 'var(--color-accent)' : 'var(--color-text-tertiary)'}
          style={{ transition: 'fill 0.3s ease' }}
        >
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
        </svg>

        {/* Label */}
        <span role="status">
          {working ? (
            <span
              className="text-[13px] font-semibold whitespace-nowrap"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, var(--color-text-tertiary) 35%, var(--color-text-primary) 50%, var(--color-text-tertiary) 65%)',
                backgroundSize: '200% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                animation: 'shimmer-text 1.4s linear infinite',
              }}
            >
              {activeLabel}
            </span>
          ) : (
            <span
              className="text-[13px] font-semibold whitespace-nowrap"
              style={{
                color: 'var(--color-text-secondary)',
                animation: 'fade-in 350ms ease-out both',
              }}
            >
              {doneLabel}
            </span>
          )}
        </span>

        {/* Chevron */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-text-tertiary)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: 'transform 0.3s ease',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Expandable trace body */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: expanded ? '1fr' : '0fr',
          opacity: expanded ? 1 : 0,
          transition: 'grid-template-rows 400ms cubic-bezier(0.23,1,0.32,1), opacity 400ms cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative', marginTop: '4px', marginLeft: '7px', paddingLeft: '16px' }}>
            {/* Vertical connector line */}
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: '3px',
                top: '-8px',
                width: '1px',
                height: lineHeight ? lineHeight - 2 : 0,
                backgroundColor: 'var(--color-border-primary)',
                transition: 'height 500ms cubic-bezier(0.23,1,0.32,1)',
              }}
            />

            <div ref={traceRef} className="flex flex-col gap-1.5" style={{ padding: '4px 0' }}>
              {steps.slice(0, visibleSteps).map((step, i) => {
                const isLast = i === visibleSteps - 1;
                const isActive = isLast && working;

                return (
                  <div
                    key={step.label}
                    className="flex items-center gap-2.5 rounded-md px-2 py-1"
                    style={{
                      minHeight: '28px',
                      animation: `fade-up 320ms cubic-bezier(0.23,1,0.32,1) ${i * 120}ms both`,
                    }}
                  >
                    {/* Check or spinner */}
                    {isActive ? (
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          border: '1.5px solid var(--color-border-secondary)',
                          borderTopColor: 'var(--color-accent)',
                          animation: 'spin 700ms linear infinite',
                          flexShrink: 0,
                        }}
                      />
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--color-text-tertiary)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ flexShrink: 0 }}
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}

                    {/* Step label */}
                    <span
                      className="text-[12.5px] font-medium"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {step.label}
                    </span>

                    {/* Step detail */}
                    {step.detail && (
                      <span
                        className="text-[11px]"
                        style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }}
                      >
                        {step.detail}
                      </span>
                    )}
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
