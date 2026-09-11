import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Play, Loader2, CheckCircle2 } from 'lucide-react';
import { agents, totalAssets } from '../data/config';
import AgentCard from './AgentCard';
import AgentFlow from './AgentFlow';
import { useCountUp } from '../hooks/useAnimations';
import powerbiLogo from '../assets/logos/powerbi.svg';
import tableauLogo from '../assets/logos/tableau.svg';
import microstrategyLogo from '../assets/logos/microstrategy.svg';
import alterteryxLogo from '../assets/logos/alteryx.svg';
import pythonLogo from '../assets/logos/python.svg';

interface ModernizationEngineProps {
  ingestionState?: 'idle' | 'ingesting' | 'complete';
  onStartIngestion?: () => void;
}

function IngestionStatsBar() {
  const totalCount = useCountUp(totalAssets, 1100, 100);
  const biCount = useCountUp(17, 1000, 150);
  const etlCount = useCountUp(8, 1000, 200);
  const pbiCount = useCountUp(10, 900, 250);
  const mstrCount = useCountUp(5, 900, 300);
  const altCount = useCountUp(5, 900, 350);
  const tabCount = useCountUp(2, 900, 400);
  const pyCount = useCountUp(3, 900, 450);

  return (
    <div
      className="mt-6 pt-4 border-t flex flex-wrap items-center justify-center gap-3 md:gap-4"
      style={{ borderColor: 'var(--color-border-primary)' }}
      aria-label="Ingestion and platform counts"
    >
      {/* Overview Metrics: Total Assets, Total BI, Total ETL (text + count) */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
        {/* Total Assets */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border theme-transition text-xs font-medium"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'rgba(34, 197, 94, 0.4)',
            boxShadow: '0 0 10px rgba(34, 197, 94, 0.15)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span>Total Assets:</span>
          <span className="font-bold tabular-nums" style={{ color: '#22c55e' }}>
            {totalCount}
          </span>
        </div>

        {/* Total BI */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border theme-transition text-xs font-medium"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 3px var(--color-card-shadow)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span>Total BI:</span>
          <span
            className="font-bold tabular-nums"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {biCount}
          </span>
        </div>

        {/* Total ETL */}
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border theme-transition text-xs font-medium"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 3px var(--color-card-shadow)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span>Total ETL:</span>
          <span
            className="font-bold tabular-nums"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {etlCount}
          </span>
        </div>
      </div>

      {/* Subtle divider */}
      <div
        className="hidden xl:block h-5 w-[1px]"
        style={{ backgroundColor: 'var(--color-border-primary)' }}
      />

      {/* Platform Logos + Counts */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
        {/* Power BI */}
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 3px var(--color-card-shadow)',
          }}
          title="Power BI: 10"
        >
          <img src={powerbiLogo} alt="Power BI" className="w-4 h-4 object-contain" />
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {pbiCount}
          </span>
        </div>

        {/* Tableau */}
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 3px var(--color-card-shadow)',
          }}
          title="Tableau: 2"
        >
          <img src={tableauLogo} alt="Tableau" className="w-4 h-4 object-contain" />
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {tabCount}
          </span>
        </div>

        {/* MicroStrategy */}
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 3px var(--color-card-shadow)',
          }}
          title="MicroStrategy: 5"
        >
          <img src={microstrategyLogo} alt="MicroStrategy" className="w-4 h-4 object-contain" />
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {mstrCount}
          </span>
        </div>

        {/* Alteryx */}
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 3px var(--color-card-shadow)',
          }}
          title="Alteryx: 5"
        >
          <img src={alterteryxLogo} alt="Alteryx" className="w-4 h-4 object-contain" />
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {altCount}
          </span>
        </div>

        {/* Python */}
        <div
          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 3px var(--color-card-shadow)',
          }}
          title="Python: 3"
        >
          <img src={pythonLogo} alt="Python" className="w-4 h-4 object-contain" />
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {pyCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ModernizationEngine({
  ingestionState = 'idle',
  onStartIngestion,
}: ModernizationEngineProps) {
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
      aria-label="BI and ETL Modernization"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
        style={{
          width: '80px',
          background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
        }}
      />

      {/* Top Right Ingestion Button */}
      {onStartIngestion && (
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
          <button
            type="button"
            onClick={onStartIngestion}
            disabled={ingestionState === 'ingesting'}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all duration-300 shadow-sm cursor-pointer"
            style={{
              backgroundColor:
                ingestionState === 'complete'
                  ? '#16a34a'
                  : 'var(--color-accent)',
              color: '#FFFFFF',
              boxShadow:
                ingestionState === 'complete'
                  ? '0 0 16px rgba(34, 197, 94, 0.45)'
                  : ingestionState === 'ingesting'
                  ? '0 0 16px rgba(251, 78, 11, 0.45)'
                  : '0 2px 8px var(--color-card-shadow)',
            }}
          >
            {ingestionState === 'idle' && (
              <>
                <Play size={12} fill="currentColor" />
                <span>Start Ingestion</span>
              </>
            )}
            {ingestionState === 'ingesting' && (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span>Ingesting...</span>
              </>
            )}
            {ingestionState === 'complete' && (
              <>
                <CheckCircle2 size={13} />
                <span>Ingestion Complete</span>
              </>
            )}
          </button>
        </div>
      )}

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
            BI and ETL Modernization
          </h2>
        </div>
        <p
          className="text-xs font-medium tracking-wide"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Assessment · Rationalize · Migrate
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

      {/* Bottom Stats Row — hidden initially, smoothly comes up after ingestion completes */}
      <AnimatePresence>
        {ingestionState === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 16, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: 10, height: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <IngestionStatsBar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom subtle pattern */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, var(--color-border-primary), transparent)',
        }}
      />
    </motion.section>
  );
}
