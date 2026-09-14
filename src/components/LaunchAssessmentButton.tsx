import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function LaunchAssessmentButton({ onClick }: { onClick?: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl
                 text-sm font-semibold text-white cursor-pointer shadow-lg
                 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        backgroundColor: 'var(--color-accent)',
        boxShadow: '0 4px 16px var(--color-accent-glow), 0 2px 8px rgba(0,0,0,0.2)',
        outlineColor: 'var(--color-accent)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 24px var(--color-accent-glow), 0 4px 12px rgba(0,0,0,0.3)';
        e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 16px var(--color-accent-glow), 0 2px 8px rgba(0,0,0,0.2)';
        e.currentTarget.style.backgroundColor = 'var(--color-accent)';
      }}
      aria-label="Launch Assessment"
      onClick={onClick}
    >
      Launch Assessment
      <ArrowRight
        size={16}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </motion.button>
  );
}
