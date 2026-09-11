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
      aria-label="BI and ETL Technology Sources"
    >
      {/* BI Section */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3 px-1">
          <Database size={14} style={{ color: 'var(--color-text-tertiary)' }} />
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            BI Technologies
          </h3>
        </div>
        <div className="flex flex-col gap-2" role="list">
          {biTech.map((tech, i) => (
            <TechnologyCard key={tech.id} tech={tech} index={i} />
          ))}
        </div>
      </section>

      {/* ETL Section */}
      <section>
        <div className="flex items-center gap-2 mb-3 px-1">
          <GitBranch size={14} style={{ color: 'var(--color-text-tertiary)' }} />
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            ETL Technologies
          </h3>
        </div>
        <div className="flex flex-col gap-2" role="list">
          {etlTech.map((tech, i) => (
            <TechnologyCard key={tech.id} tech={tech} index={biTech.length + i} />
          ))}
        </div>
      </section>
    </motion.aside>
  );
}
