import { motion } from 'framer-motion';
import { Link, Workflow } from 'lucide-react';

export default function WorkspaceIngestion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      className="rounded-xl border p-5 theme-transition relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 3px var(--color-card-shadow)',
      }}
      aria-label="Workspace Ingestion"
    >
      {/* Top glow bar */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] rounded-full"
        style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }}
      />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: 'var(--color-accent-subtle)',
          }}
        >
          <Link size={18} style={{ color: 'var(--color-accent)' }} />
        </div>

        {/* Text */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className="text-sm font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Workspace Ingestion
            </h3>
            <span
              className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: 'var(--color-badge-bg)',
                color: 'var(--color-badge-text)',
              }}
            >
              Active
            </span>
          </div>
          <p
            className="text-xs leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Connect and ingest assets directly from your existing BI and ETL environments.
          </p>
        </div>

        {/* Connector indicator */}
        <div className="ml-auto shrink-0 flex items-center gap-1.5 mt-1">
          <Workflow size={14} style={{ color: 'var(--color-text-tertiary)' }} />
          <span
            className="text-[11px] font-medium"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            6 connectors
          </span>
        </div>
      </div>

      {/* Animated ingestion bar */}
      <div className="mt-4 relative h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-stat-bar-bg)' }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: 'var(--color-accent)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.6, duration: 2, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
