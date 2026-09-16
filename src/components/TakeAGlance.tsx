import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  GitMerge,
  CheckCircle,
  ExternalLink,
  BarChart3,
  GitBranch,
  Database,
  Target,
  TrendingUp,
  FileSpreadsheet,
  Calculator,
  FileText,
  FileCheck2,
  Rocket,
} from 'lucide-react';
import type { ViewState } from './navigation/workflowStages';
import { getSummaryMetrics, TECHNOLOGY_LOGOS } from '../data/discoveryData';
import { biOverlapMetrics } from '../data/rationalizationData';
import { useCountUp } from '../hooks/useAnimations';
import { getDocumentCounts } from '../utils/documentationDownloader';

/* ─────────────────────────────────────────────────────────
 * TakeAGlance — Program Modernization Executive Overview
 * ───────────────────────────────────────────────────────── */

interface Props {
  onNavigate: (view: ViewState) => void;
}

// Icon mapping for Assessment summary metrics
const ASSESSMENT_ICON_MAP: Record<string, typeof BarChart3> = {
  dashboard: BarChart3,
  etl: GitBranch,
  source: Database,
  target: Target,
  kpi: TrendingUp,
  worksheet: FileSpreadsheet,
  calculated: Calculator,
};

// Animated Stat Card
function StatCard({
  value,
  label,
  icon: Icon,
  sublabel,
  accentColor = 'var(--color-accent)',
  delay = 0,
}: {
  value: number | string;
  label: string;
  icon: typeof BarChart3;
  sublabel?: string;
  accentColor?: string;
  delay?: number;
}) {
  const numericValue = typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const animatedCount = useCountUp(numericValue, 1000, delay * 1000);
  const displayValue = typeof value === 'string' && value.includes('$')
    ? `$${animatedCount.toLocaleString()}`
    : typeof value === 'string' && value.includes('%')
    ? `${animatedCount}%`
    : typeof value === 'number'
    ? animatedCount
    : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="rounded-xl border p-4 theme-transition flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 3px var(--color-card-shadow)',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className="text-2xl font-bold tabular-nums tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {displayValue}
        </span>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          <Icon size={16} style={{ color: accentColor }} />
        </div>
      </div>
      <div>
        <span
          className="text-[12px] font-semibold leading-tight block"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
        </span>
        {sublabel && (
          <span
            className="text-[10px] leading-tight block mt-0.5"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ── Document Count Card (for Section 3) ── */
function DocCountCard({
  count,
  label,
  sublabel,
  description,
  icon: Icon,
  accentColor,
  delay = 0,
}: {
  count: number;
  label: string;
  sublabel: string;
  description: string;
  icon: typeof BarChart3;
  accentColor: string;
  delay?: number;
}) {
  const animatedCount = useCountUp(count, 1000, delay * 1000);
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      className="rounded-2xl border p-5 theme-transition flex flex-col justify-between"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 3px var(--color-card-shadow)',
      }}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${accentColor}18` }}
          >
            <Icon size={16} style={{ color: accentColor }} />
          </div>
          <span
            className="text-2xl font-black tabular-nums tracking-tight"
            style={{ color: accentColor }}
          >
            {animatedCount}
          </span>
        </div>
        <h4
          className="text-[13px] font-bold mb-1 leading-snug"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {label}
        </h4>
        <p
          className="text-[10px] leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {description}
        </p>
      </div>
      <div
        className="mt-3 pt-2.5 border-t flex items-center justify-between"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
          style={{
            backgroundColor: `${accentColor}12`,
            color: accentColor,
            borderColor: `${accentColor}30`,
          }}
        >
          {sublabel}
        </span>
        <span
          className="text-[10px] font-semibold"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          Excel + MD
        </span>
      </div>
    </motion.div>
  );
}

export default function TakeAGlance({ onNavigate }: Props) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Document counts from manifest
  const [docCounts, setDocCounts] = useState({
    biAssessmentCount: 27,
    etlAssessmentCount: 8,
    sourceToTargetCount: 8,
    biRationalizationCount: 7,
    etlRationalizationCount: 3,
  });

  useEffect(() => {
    getDocumentCounts().then(setDocCounts).catch(() => {});
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Assessment metrics
  const assessmentMetrics = useMemo(() => getSummaryMetrics(), []);

  // Platform breakdown counts
  const platformBreakdown = useMemo(
    () => [
      { name: 'Tableau', count: 8, percentage: 32, tech: 'Tableau' as const },
      { name: 'Power BI', count: 7, percentage: 28, tech: 'Power BI' as const },
      { name: 'MicroStrategy', count: 5, percentage: 20, tech: 'MicroStrategy' as const },
      { name: 'Alteryx', count: 3, percentage: 12, tech: 'Alteryx' as const },
      { name: 'Python', count: 2, percentage: 8, tech: 'Python' as const },
    ],
    [],
  );

  // Business domain distribution
  const domainBreakdown = useMemo(
    () => [
      { name: 'Claims Management', assets: 8, count: '32%' },
      { name: 'Policy Administration', assets: 6, count: '24%' },
      { name: 'Sales & Distribution', assets: 4, count: '16%' },
      { name: 'Finance & Actuarial', assets: 4, count: '16%' },
      { name: 'Underwriting Ops', assets: 3, count: '12%' },
    ],
    [],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-16"
    >
      {/* ── Toast Notification ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-8 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl border text-xs font-semibold"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-accent)',
              color: 'var(--color-text-primary)',
            }}
          >
            <CheckCircle size={16} style={{ color: 'var(--color-accent)' }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="pt-1"
      >
        <h1
          className="text-xl md:text-2xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Impact at a glance
        </h1>
      </motion.div>

      {/* ════════════════════════════════════════════════════
       *  SECTION 1: ASSESSMENT DISCOVERY & INVENTORY CARDS
       * ════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.12)' }}
            >
              <Compass size={17} style={{ color: '#3B82F6' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                1. Assessment - Discovery and Intelligence Successfully Completed
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Deep catalog of ingested reports, workflows, schemas, and calculated metadata
              </p>
            </div>
          </div>
        </div>

        {/* ── All 7 Assessment Summary Metric Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {assessmentMetrics.map((metric, i) => {
            const IconComponent = ASSESSMENT_ICON_MAP[metric.icon] ?? BarChart3;
            return (
              <StatCard
                key={metric.icon}
                value={metric.value}
                label={metric.label}
                icon={IconComponent}
                delay={0.05 * i}
              />
            );
          })}
        </div>

        {/* ── Platform Footprint & Business Domain Breakdown Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
          {/* Platform Footprint Card */}
          <div
            className="rounded-2xl border p-5 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
                Platform Footprint Breakdown
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded border" style={{ color: 'var(--color-text-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                25 Assets
              </span>
            </div>

            <div className="space-y-3">
              {platformBreakdown.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded flex items-center justify-center p-0.5 bg-[var(--color-bg-tertiary)]">
                        <img src={TECHNOLOGY_LOGOS[item.tech]} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{item.name}</span>
                    </div>
                    <span className="font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.count} assets ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-[var(--color-bg-tertiary)]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: 'var(--color-accent)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Domain Distribution Card */}
          <div
            className="rounded-2xl border p-5 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-primary)' }}>
                Business Domain Distribution
              </h3>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded border" style={{ color: 'var(--color-text-tertiary)', borderColor: 'var(--color-border-subtle)' }}>
                5 Core Units
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {domainBreakdown.map((domain) => (
                <div
                  key={domain.name}
                  className="p-3 rounded-xl border flex items-center justify-between bg-[var(--color-bg-tertiary)]"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-bold truncate" style={{ color: 'var(--color-text-primary)' }}>
                      {domain.name}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                      {domain.assets} Assets
                    </div>
                  </div>
                  <span
                    className="text-[11px] font-bold px-2 py-1 rounded-md"
                    style={{
                      backgroundColor: 'rgba(251, 78, 11, 0.1)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {domain.count}
                  </span>
                </div>
              ))}
              <div
                className="p-3 rounded-xl border flex items-center justify-between bg-[var(--color-bg-tertiary)]"
                style={{ borderColor: 'var(--color-border-subtle)' }}
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Enterprise Compliance
                  </div>
                  <div className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                    Audited Lineage
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2 py-1 rounded-md text-emerald-500 bg-emerald-500/10">
                  100% Passed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
       *  SECTION 2: RATIONALIZATION & OVERLAP GOVERNANCE CARDS
       * ════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{ backgroundColor: 'rgba(245, 158, 11, 0.12)' }}
            >
              <GitMerge size={17} style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                2. Rationalization - Decisions Recommended Successfully
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Automated similarity detection, redundancy elimination, and portfolio consolidation rules
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('rationalization-results')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border cursor-pointer hover:opacity-85 transition-opacity"
            style={{
              borderColor: 'var(--color-border-primary)',
              backgroundColor: 'var(--color-bg-elevated)',
              color: 'var(--color-text-primary)',
            }}
          >
            <span>View All Recommendations</span>
            <ExternalLink size={12} />
          </button>
        </div>

        {/* ── The 6 Overlap Metrics Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {biOverlapMetrics.map((m, i) => (
            <StatCard
              key={m.id}
              value={m.value}
              label={m.label}
              icon={GitMerge}
              accentColor="#F59E0B"
              delay={0.06 * i}
            />
          ))}
        </div>

        {/* ── 3 Strategic Rationalization Outcome Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Consolidate & Merge */}
          <div
            className="rounded-2xl border p-5 theme-transition flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'rgba(245, 158, 11, 0.3)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: 'rgba(245, 158, 11, 0.15)',
                    color: '#F59E0B',
                    borderColor: 'rgba(245, 158, 11, 0.3)',
                  }}
                >
                  Merge Candidate
                </span>
                <span className="text-2xl font-black text-amber-500">9 Recs</span>
              </div>
              <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                Consolidate &amp; Merge
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                5 BI dashboard merges + 4 ETL workflow unifications combining overlapping KPIs and calculations into master reporting layers.
              </p>
            </div>
          </div>

          {/* Decommission & Retire */}
          <div
            className="rounded-2xl border p-5 theme-transition flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'rgba(239, 68, 68, 0.3)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: '#EF4444',
                    borderColor: 'rgba(239, 68, 68, 0.3)',
                  }}
                >
                  Decommission
                </span>
                <span className="text-2xl font-black text-red-500">7 Assets</span>
              </div>
              <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                Retire Legacy Assets
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                7 redundant, obsolete, or shadow reports flagged for scheduled shutdown with zero business disruption or downstream orphan queries.
              </p>
            </div>
          </div>

          {/* Retain Core */}
          <div
            className="rounded-2xl border p-5 theme-transition flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'rgba(16, 185, 129, 0.3)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    borderColor: 'rgba(16, 185, 129, 0.3)',
                  }}
                >
                  Retain Core
                </span>
                <span className="text-2xl font-black text-emerald-500">15 Assets</span>
              </div>
              <h4 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                Keep Mission-Critical
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                15 high-fidelity core production assets preserved and directly targeted for accelerated automated migration to modern target platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
       *  SECTION 3: DOCUMENTATION COMPLETED SUCCESSFULLY
       * ════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
              style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)' }}
            >
              <FileCheck2 size={17} style={{ color: '#6366F1' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
                3. Documentation Completed Successfully
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                Automated technical blueprints, specification documents, and rationalization reports generated
              </p>
            </div>
          </div>
        </div>

        {/* ── 5 Document Count Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Card 1: Dashboard Specification Documents (BI) */}
          <DocCountCard
            count={docCounts.biAssessmentCount}
            label="Dashboard Specification Documents"
            sublabel="BI Assessment"
            description="Individual dashboard inventory and technical specification workbooks for each BI asset."
            icon={BarChart3}
            accentColor="#3B82F6"
            delay={0.05}
          />

          {/* Card 2: ETL Technical Specification Documents */}
          <DocCountCard
            count={docCounts.etlAssessmentCount}
            label="ETL Technical Specification Documents"
            sublabel="ETL Assessment"
            description="Workflow inventory and individual documentation specification for each ETL pipeline."
            icon={GitBranch}
            accentColor="#8B5CF6"
            delay={0.1}
          />

          {/* Card 3: Source-to-Target Mapping Documents */}
          <DocCountCard
            count={docCounts.sourceToTargetCount}
            label="Source-to-Target Mapping Documents"
            sublabel="ETL Lineage"
            description="Detailed source-to-target data mapping specifications for each ETL workflow."
            icon={Database}
            accentColor="#06B6D4"
            delay={0.15}
          />

          {/* Card 4: Rationalization Documents — BI */}
          <DocCountCard
            count={docCounts.biRationalizationCount}
            label="Rationalization Documents — BI"
            sublabel="BI Rationalization"
            description="Rationalization recommendations with rationale for BI dashboard consolidation and decommission."
            icon={FileCheck2}
            accentColor="#F59E0B"
            delay={0.2}
          />

          {/* Card 5: Rationalization Documents — ETL */}
          <DocCountCard
            count={docCounts.etlRationalizationCount}
            label="Rationalization Documents — ETL"
            sublabel="ETL Rationalization"
            description="Rationalization recommendations with rationale for ETL workflow optimization and retirement."
            icon={FileText}
            accentColor="#EF4444"
            delay={0.25}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
       *  SECTION 4: READY OF ACCELERATED MIGRATION FOR KEEP ASSETS
       * ════════════════════════════════════════════════════ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'rgba(16, 185, 129, 0.12)' }}
          >
            <Rocket size={17} style={{ color: '#10B981' }} />
          </div>
          <h2 className="text-lg font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Ready of Accelerated Migration for Keep Assets
          </h2>
        </div>
      </section>
    </motion.div>
  );
}
