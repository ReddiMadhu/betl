import { motion } from 'framer-motion';
import { Database, GitBranch } from 'lucide-react';
import { technologies } from '../data/config';
import TechnologyCard from './TechnologyCard';

export default function TechnologySources() {
  const biTech = technologies.filter((t) => t.category === 'BI');
  const etlTech = technologies.filter((t) => t.category === 'ETL');

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full"
      aria-label="Organizational workspace"
    >
      {/* Heading above container */}
      <div className="mb-2.5 px-1">
        <h2
          className="text-sm font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Organizational workspace
        </h2>
      </div>

      {/* Container wrapping BI & ETL */}
      <div
        id="org-workspace-container"
        className="w-full relative rounded-2xl border p-4 sm:p-5 theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-engine)',
          borderColor: 'var(--color-engine-border)',
          boxShadow: '0 4px 24px var(--color-engine-shadow), 0 1px 4px var(--color-card-shadow)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
          style={{
            width: '60px',
            background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
          }}
        />

        {/* BI Section */}
        <section className="mb-4">
          <div className="flex items-center gap-2 mb-2 px-1">
            <Database size={13} style={{ color: 'var(--color-text-tertiary)' }} />
            <h3
              className="text-[10.5px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              BI Technologies
            </h3>
          </div>
          <div className="flex flex-col gap-1.5" role="list">
            {biTech.map((tech, i) => (
              <TechnologyCard key={tech.id} tech={tech} index={i} />
            ))}
          </div>
        </section>

        {/* ETL Section */}
        <section>
          <div className="flex items-center gap-2 mb-2 px-1">
            <GitBranch size={13} style={{ color: 'var(--color-text-tertiary)' }} />
            <h3
              className="text-[10.5px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              ETL Technologies
            </h3>
          </div>
          <div className="flex flex-col gap-1.5" role="list">
            {etlTech.map((tech, i) => (
              <TechnologyCard key={tech.id} tech={tech} index={biTech.length + i} />
            ))}
          </div>
        </section>
      </div>
    </motion.aside>
  );
}
