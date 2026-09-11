import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────
 * AssessmentProgress — horizontal 3-step progress indicator
 *
 * Discovery ● ──→ Rationalization ○ ──→ Migration ○
 * ───────────────────────────────────────────────────────── */

const steps = [
  { label: 'Discovery', status: 'complete' as const },
  { label: 'Rationalization', status: 'next' as const },
  { label: 'Migration', status: 'future' as const },
];

export default function AssessmentProgress() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      aria-label="Assessment progress"
      className="flex items-center gap-1 mb-8"
    >
      {steps.map((step, i) => (
        <div key={step.label} className="flex items-center gap-1">
          {/* Step pill */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase"
            style={{
              backgroundColor:
                step.status === 'complete'
                  ? 'var(--color-accent-subtle)'
                  : 'var(--color-bg-tertiary)',
              color:
                step.status === 'complete'
                  ? 'var(--color-accent)'
                  : step.status === 'next'
                    ? 'var(--color-text-secondary)'
                    : 'var(--color-text-tertiary)',
              border: step.status === 'next' ? '1px solid var(--color-border-primary)' : '1px solid transparent',
            }}
          >
            {/* Indicator dot */}
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  step.status === 'complete'
                    ? 'var(--color-accent)'
                    : step.status === 'next'
                      ? 'var(--color-text-secondary)'
                      : 'var(--color-text-tertiary)',
                opacity: step.status === 'future' ? 0.4 : 1,
              }}
            />
            <span>{step.label}</span>
            {step.status === 'complete' && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            )}
          </div>

          {/* Connector arrow */}
          {i < steps.length - 1 && (
            <svg
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              className="mx-0.5"
            >
              <path
                d="M0 6h16M13 2l4 4-4 4"
                stroke={
                  step.status === 'complete'
                    ? 'var(--color-accent)'
                    : 'var(--color-border-secondary)'
                }
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={step.status === 'complete' ? 0.6 : 0.3}
              />
            </svg>
          )}
        </div>
      ))}
    </motion.nav>
  );
}
