import { motion } from 'framer-motion';
import type { Technology } from '../data/config';

interface Props {
  tech: Technology;
  index: number;
}

export default function TechnologyCard({ tech, index }: Props) {
  const isConnected = tech.status === 'connected';

  return (
    <motion.div
      id={`tech-${tech.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative flex items-center gap-3 px-3 py-2 rounded-xl border cursor-default
                 theme-transition"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: isConnected ? 'color-mix(in srgb, var(--color-accent) 30%, var(--color-border-primary))' : 'var(--color-border-primary)',
        boxShadow: `0 1px 3px var(--color-card-shadow)`,
      }}
      role="listitem"
      aria-label={`${tech.name} — ${tech.status}`}
    >
      {/* Logo */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 overflow-hidden p-1 theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
        }}
      >
        <img
          src={tech.logo}
          alt={`${tech.name} logo`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0">
        <span
          className="text-sm font-medium leading-tight truncate"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {tech.name}
        </span>
        <span
          className="text-[11px] leading-tight mt-0.5"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {isConnected ? 'Connected' : 'Available'}
        </span>
      </div>

      {/* Status dot */}
      <div className="ml-auto shrink-0">
        <div
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: isConnected ? '#22c55e' : 'var(--color-text-tertiary)',
          }}
        />
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 0 1px color-mix(in srgb, var(--color-accent) 20%, transparent)`,
        }}
      />
    </motion.div>
  );
}
