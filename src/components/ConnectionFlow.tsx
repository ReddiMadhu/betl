import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useAnimations';

/**
 * Animated SVG connection flow between technology sources and the workspace/engine.
 * Renders a vertical animated arrow with a moving data particle.
 */
export default function ConnectionFlow() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="flex justify-center py-2"
      aria-hidden="true"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="overflow-visible">
        {/* Main line */}
        <line
          x1="20"
          y1="4"
          x2="20"
          y2="32"
          stroke="var(--color-connection-path)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Arrow */}
        <path
          d="M15 27 L20 33 L25 27"
          stroke="var(--color-connection-active)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Particle */}
        {!reduced && (
          <motion.circle
            cx="20"
            r="2.5"
            fill="var(--color-accent)"
            initial={{ cy: 4, opacity: 0 }}
            animate={{
              cy: [4, 33, 4],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 1.5,
            }}
          />
        )}
      </svg>
    </motion.div>
  );
}
