import { motion } from 'framer-motion';
import type { Agent } from '../data/config';

interface Props {
  agent: Agent;
  index: number;
}

export default function AgentCard({ agent, index }: Props) {
  const isActive = agent.status === 'active';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.12, duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative flex-1 min-w-0 rounded-xl border p-5 theme-transition flex flex-col"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: isActive
          ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
          : 'var(--color-border-primary)',
        boxShadow: isActive
          ? '0 2px 12px var(--color-accent-glow), 0 1px 3px var(--color-card-shadow)'
          : '0 1px 3px var(--color-card-shadow)',
      }}
      aria-label={`${agent.name} Agent`}
    >
      {/* Title */}
      <h4
        className="text-sm font-semibold mb-2 leading-snug"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {agent.name}
        <br />
        <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
          Agent
        </span>
      </h4>

      {/* Description */}
      <p
        className="text-xs leading-relaxed mb-4 flex-1"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {agent.description}
      </p>

      {/* Label */}
      <div
        className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest mt-auto"
        style={{
          color: isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: isActive ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
          }}
        />
        {agent.label}
      </div>

      {/* Active glow */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top, var(--color-accent-glow) 0%, transparent 70%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
      )}
    </motion.article>
  );
}
