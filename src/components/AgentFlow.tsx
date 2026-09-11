import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useAnimations';

interface Props {
  direction: 'horizontal' | 'vertical';
}

export default function AgentFlow({ direction }: Props) {
  const reduced = useReducedMotion();
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={`flex items-center justify-center shrink-0 ${
        isHorizontal ? 'w-8 flex-col' : 'h-8 flex-row'
      }`}
      aria-hidden="true"
    >
      <svg
        width={isHorizontal ? 32 : 48}
        height={isHorizontal ? 48 : 32}
        viewBox={isHorizontal ? '0 0 32 48' : '0 0 48 32'}
        fill="none"
        className="overflow-visible"
      >
        {isHorizontal ? (
          <>
            {/* Horizontal connector line */}
            <line
              x1="4"
              y1="24"
              x2="28"
              y2="24"
              stroke="var(--color-connection-path)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Arrow head */}
            <path
              d="M22 19 L28 24 L22 29"
              stroke="var(--color-connection-active)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Animated particle */}
            {!reduced && (
              <motion.circle
                cx="4"
                cy="24"
                r="2.5"
                fill="var(--color-accent)"
                initial={{ cx: 4, opacity: 0 }}
                animate={{
                  cx: [4, 28, 4],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 1,
                }}
              />
            )}
          </>
        ) : (
          <>
            {/* Vertical connector line */}
            <line
              x1="24"
              y1="4"
              x2="24"
              y2="28"
              stroke="var(--color-connection-path)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Arrow head */}
            <path
              d="M19 22 L24 28 L29 22"
              stroke="var(--color-connection-active)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Animated particle */}
            {!reduced && (
              <motion.circle
                cx="24"
                cy="4"
                r="2.5"
                fill="var(--color-accent)"
                initial={{ cy: 4, opacity: 0 }}
                animate={{
                  cy: [4, 28, 4],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  repeatDelay: 1,
                }}
              />
            )}
          </>
        )}
      </svg>
    </div>
  );
}
