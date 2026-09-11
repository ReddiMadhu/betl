import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { agents } from '../data/config';
import AgentCard from './AgentCard';
import AgentFlow from './AgentFlow';

export default function ModernizationEngine() {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
      id="modernization-engine"
      className="relative rounded-2xl border p-6 md:p-8 theme-transition"
      style={{
        backgroundColor: 'var(--color-bg-engine)',
        borderColor: 'var(--color-engine-border)',
        boxShadow: '0 4px 24px var(--color-engine-shadow), 0 1px 4px var(--color-card-shadow)',
      }}
      aria-label="AI Modernization Engine"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
        style={{
          width: '80px',
          background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
        }}
      />

      {/* Header */}
      <div className="text-center mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-accent-subtle)' }}
          >
            <Brain size={16} style={{ color: 'var(--color-accent)' }} />
          </div>
          <h2
            className="text-lg md:text-xl font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            AI Modernization Engine
          </h2>
        </div>
        <p
          className="text-xs font-medium tracking-wide"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Discover · Rationalize · Migrate
        </p>
      </div>

      {/* Agents — horizontal on md+, vertical on mobile */}
      <div id="engine-agents" className="flex flex-col md:flex-row items-stretch gap-0">
        {agents.map((agent, i) => (
          <div
            key={agent.id}
            className={`flex items-stretch ${
              i < agents.length - 1
                ? 'flex-col md:flex-row'
                : ''
            } ${i < agents.length - 1 ? 'flex-1' : 'flex-1'}`}
          >
            <div className="flex-1 min-w-0">
              <AgentCard agent={agent} index={i} />
            </div>
            {i < agents.length - 1 && (
              <>
                {/* Desktop/tablet: horizontal connector */}
                <div className="hidden md:flex items-center">
                  <AgentFlow direction="horizontal" />
                </div>
                {/* Mobile: vertical connector */}
                <div className="flex md:hidden justify-center">
                  <AgentFlow direction="vertical" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Bottom subtle pattern */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--color-border-primary), transparent)',
        }}
      />
    </motion.section>
  );
}
