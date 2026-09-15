import { motion, AnimatePresence } from 'framer-motion';
import { Play, Loader2, CheckCircle2 } from 'lucide-react';
import { agents, totalAssets } from '../data/config';
import AgentCard from './AgentCard';
import AgentFlow from './AgentFlow';
import { useCountUp } from '../hooks/useAnimations';
import { AwsLogo, AzureLogo } from './icons/CloudLogos';

interface ModernizationEngineProps {
  ingestionState?: 'idle' | 'ingesting' | 'complete';
  onStartIngestion?: () => void;
}

function IngestionStatsBar() {
  const totalCount = useCountUp(totalAssets, 1100, 100);
  const biCount = useCountUp(23, 1000, 150);
  const etlCount = useCountUp(8, 1000, 200);
  const pbiCount = useCountUp(12, 900, 250);
  const mstrCount = useCountUp(1, 900, 300);
  const altCount = useCountUp(7, 900, 350);
  const tabCount = useCountUp(10, 900, 400);
  const pyCount = useCountUp(1, 900, 450);



  return (
    <div
      className="mt-6 pt-4 border-t theme-transition"
      style={{ borderColor: 'var(--color-border-primary)' }}
      aria-label="Ingestion and platform counts"
    >
      <div className="flex flex-col gap-3">
        {/* ── Row 1: Total Assets ── */}
        <div className="flex items-center justify-center">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-lg border theme-transition text-xs font-semibold shrink-0 whitespace-nowrap"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 3px var(--color-card-shadow)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <span>Total Assets:</span>
            <span
              className="font-bold tabular-nums text-sm"
              style={{ color: 'var(--color-accent)' }}
            >
              {totalCount}
            </span>
          </div>
        </div>

        {/* ── Row 2: Total BI (left box) & Total ETL (right box) ── */}
        <div className="grid grid-cols-2 gap-3">
          {/* ── Left Box: Total BI ── */}
          <div
            className="rounded-lg border p-3 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 3px var(--color-card-shadow)',
            }}
          >
            {/* Total BI header — centered */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span
                className="text-xs font-bold tracking-tight"
                style={{ color: 'var(--color-accent)' }}
              >
                Total BI:
              </span>
              <span
                className="text-sm font-extrabold tabular-nums"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {biCount}
              </span>
            </div>

            {/* BI tech breakdown — horizontal */}
            <div className="flex items-center justify-evenly flex-wrap gap-2">
              {[
                { label: 'Power BI', count: pbiCount },
                { label: 'Tableau', count: tabCount },
                { label: 'MicroStrategy', count: mstrCount },
              ].map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border theme-transition text-[11px] font-medium shrink-0"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-accent)',
                  }}
                >
                  <span>{item.label}:</span>
                  <span
                    className="font-bold tabular-nums"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right Box: Total ETL ── */}
          <div
            className="rounded-lg border p-3 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 3px var(--color-card-shadow)',
            }}
          >
            {/* Total ETL header — centered */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <span
                className="text-xs font-bold tracking-tight"
                style={{ color: 'var(--color-accent)' }}
              >
                Total ETL:
              </span>
              <span
                className="text-sm font-extrabold tabular-nums"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {etlCount}
              </span>
            </div>

            {/* ETL tech breakdown — horizontal */}
            <div className="flex items-center justify-evenly flex-wrap gap-2">
              {[
                { label: 'Alteryx', count: altCount },
                { label: 'Python', count: pyCount },
              ].map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border theme-transition text-[11px] font-medium shrink-0"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-accent)',
                  }}
                >
                  <span>{item.label}:</span>
                  <span
                    className="font-bold tabular-nums"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
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

      {/* Top Left Cloud Badges — Azure & AWS */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 3px var(--color-card-shadow)',
            }}
            title="Runs on Microsoft Azure"
          >
            <AzureLogo className="w-3.5 h-3.5 shrink-0" />
            <span
              className="text-[11px] md:text-xs font-semibold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Azure
            </span>
          </div>

          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 3px var(--color-card-shadow)',
            }}
            title="Runs on Amazon Web Services (AWS)"
          >
            <AwsLogo className="w-4.5 h-3.5 shrink-0 text-[#232F3E] dark:text-white" />
            <span
              className="text-[11px] md:text-xs font-semibold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              AWS
            </span>
          </div>
        </div>
      </div>

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
        <h2
          className="text-lg md:text-xl font-bold tracking-tight mb-1"
          style={{ color: 'var(--color-text-primary)' }}
        >
          BI and ETL Modernization
        </h2>
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
