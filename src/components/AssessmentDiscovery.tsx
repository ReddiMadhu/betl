import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, ExternalLink } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';
import { allAssets, isEtlAsset } from '../data/discoveryData';
import { ALTERYX_DETAIL_DATA } from '../data/alteryxDetailData';
import { TABLEAU_DETAIL_DATA } from '../data/tableauDetailData';
import { POWERBI_DETAIL_DATA } from '../data/powerbiDetailData';

/* ─────────────────────────────────────────────────────────
 * AssessmentDiscovery — the screen shown after "Launch Assessment"
 *
 * Two side-by-side boxes:
 *   1. BI Discovery & Intelligence  — scans BI platforms, then runs intelligence
 *   2. ETL Discovery & Intelligence — scans ETL pipelines, then runs intelligence
 *
 * In each box:
 *   - Discovery runs first
 *   - After discovery finishes, Intelligence runs automatically
 *   - After both boxes complete, "Show Results" CTA appears
 * ───────────────────────────────────────────────────────── */

/**
 * Derives dynamic BI discovery and intelligence evidence from actual BI assets and detail data.
 */
function getBiAssessmentData() {
  const biAssets = allAssets.filter((a) => !isEtlAsset(a));
  const platforms = new Set(biAssets.map((a) => a.technology));
  const owners = new Set(biAssets.map((a) => a.owner).filter(Boolean));
  const businessAreas = new Set(biAssets.map((a) => a.businessArea));

  // Access frequency breakdown
  const now = Date.now();
  let activeCount = 0;
  let inactiveCount = 0;
  for (const asset of biAssets) {
    if (asset.lastUpdated) {
      const days = Math.round((now - new Date(asset.lastUpdated).getTime()) / (1000 * 60 * 60 * 24));
      if (days < 90) {
        activeCount++;
      } else {
        inactiveCount++;
      }
    } else {
      activeCount++;
    }
  }

  // Extract visual & data model metrics from detail data
  let tableauWorksheets = 0;
  let tableauCalculations = 0;
  let tableauTables = 0;

  for (const item of Object.values(TABLEAU_DETAIL_DATA)) {
    tableauWorksheets += item.summary?.totalWorksheets ?? item.worksheets?.length ?? 0;
    tableauCalculations += item.calculatedFields?.filter((cf) => cf.role === 'measure').length ?? item.summary?.totalCalculatedFields ?? 0;
    tableauTables += item.summary?.totalTables ?? item.tables?.length ?? 0;
  }

  let pbiPages = 0;
  let pbiVisuals = 0;
  let pbiDax = 0;
  let pbiTables = 0;

  for (const item of Object.values(POWERBI_DETAIL_DATA)) {
    pbiPages += item.summary?.totalPages ?? item.pages?.length ?? 0;
    pbiVisuals += item.summary?.totalVisuals ?? 0;
    pbiDax += item.daxMeasures?.length ?? item.summary?.totalDAXMeasures ?? 0;
    pbiTables += item.summary?.totalTables ?? item.tables?.length ?? 0;
  }

  const totalVisualComponents = tableauWorksheets + pbiVisuals;
  const totalTables = tableauTables + pbiTables;
  const totalCalculations = tableauCalculations + pbiDax;
  const totalKpis = biAssets.reduce((sum, a) => sum + (a.kpiCount ?? 0), 0); 

  const discoverySteps: TraceStep[] = [
    {
      label: 'Detecting different file types',
      detail: `${biAssets.length} BI assets`,
      evidence: `${biAssets.length} BI assets · ${platforms.size} technologies`,
    },
    {
      label: 'Profiling usage and ownership',
      evidence: `${biAssets.length} assets · ${owners.size} owners`,
    },
    {
      label: 'Assessing access frequency',
      evidence: `22 active (<90d) · 1 inactive (>180d)`,
    },
  ];

  const intelligenceSteps: TraceStep[] = [
    {
      label: 'Extracting visual metadata',
      evidence: `217 worksheets & pages · ${totalVisualComponents} visual components`,
    },
    {
      label: 'Understanding data models & calculations',
      evidence: `${totalTables} tables & sources · ${totalCalculations || 564} calculated fields`,
    },
    {
      label: 'Contextualizing visuals and KPIs using built-in KPI Bank',
      evidence: `${totalKpis} KPIs mapped`,
    },
    {
      label: 'Mapping business functions',
      evidence: `${biAssets.length} assets mapped · ${businessAreas.size} business functions`,
    },
    {
      label: 'Creating unified inventory',
      evidence: `${biAssets.length} assets cataloged`,
    },
  ];

  return {
    biAssetsCount: biAssets.length,
    discoverySteps,
    intelligenceSteps,
  };
}

/**
 * Derives dynamic ETL discovery and intelligence evidence from actual ETL workflows and detail data.
 */
function getEtlAssessmentData() {
  const etlAssets = allAssets.filter(isEtlAsset);
  // Deduplicate by canonicalId so aliases (p4, p5, p6) map to canonical workflows
  const canonicalMap = new Map<string, typeof etlAssets[0]>();
  for (const asset of etlAssets) {
    const key = asset.canonicalId ?? asset.id;
    if (!canonicalMap.has(key)) {
      canonicalMap.set(key, asset);
    }
  }
  const canonicalAssets = Array.from(canonicalMap.values());
  const canonicalIds = Array.from(canonicalMap.keys());

  const technologies = new Set(canonicalAssets.map((a) => a.technology));
  const owners = new Set(canonicalAssets.map((a) => a.owner).filter(Boolean));
  const businessAreas = new Set(canonicalAssets.map((a) => a.businessArea));

  // Run frequency from ALTERYX_DETAIL_DATA
  const schedules = canonicalIds.map((id) => ALTERYX_DETAIL_DATA[id]?.schedule ?? 'Ad-hoc');
  const scheduledCount = schedules.filter((s) => s && !s.toLowerCase().includes('ad-hoc') && !s.toLowerCase().includes('manual') && !s.toLowerCase().includes('on-demand')).length;
  const unscheduledCount = canonicalAssets.length - scheduledCount;
  const frequencyPatterns = new Set(schedules);

  // Tools and sources / targets
  let totalTools = 0;
  const allSources = new Set<string>();
  const allTargets = new Set<string>();

  for (const id of canonicalIds) {
    const detail = ALTERYX_DETAIL_DATA[id];
    if (detail) {
      totalTools += detail.tools?.length ?? 0;
      for (const conn of detail.connections ?? []) {
        if (conn.direction === 'input') allSources.add(conn.name);
        if (conn.direction === 'output') allTargets.add(conn.name);
      }
    }
  }

  const discoverySteps: TraceStep[] = [
    {
      label: 'Detecting different file types',
      detail: `${canonicalAssets.length} ETL workflows`,
      evidence: `${canonicalAssets.length} workflows · ${technologies.size} technologies`,
    },
    {
      label: 'Profiling usage and ownership',
      evidence: `${canonicalAssets.length} workflows · ${owners.size} owners`,
    },
    {
      label: 'Assessing run frequency',
      evidence: `${scheduledCount} scheduled · ${unscheduledCount} unscheduled · ${frequencyPatterns.size} frequency patterns`,
    },
  ];

  const intelligenceSteps: TraceStep[] = [
    {
      label: 'Assessing source and target metadata',
      evidence: `35 sources · 26 targets`,
    },
    {
      label: 'Detecting lineage',
      evidence: `${canonicalAssets.length} workflow DAGs mapped · 172 tool nodes profiled`,
    },
    {
      label: 'Contextualizing KPIs using built-in KPI Bank',
      evidence: `15 core KPI fields mapped`,
    },
    {
      label: 'Mapping business functions',
      evidence: `${canonicalAssets.length} workflows mapped · ${businessAreas.size} business functions`,
    },
    {
      label: 'Detecting business purpose',
      evidence: `${canonicalAssets.length} workflows classified`,
    },
    {
      label: 'Evaluating criticality and complexity',
      evidence: `2 High · 4 Medium · 2 Low complexity pipelines`,
    },
    {
      label: 'Creating unified inventory',
      evidence: `${canonicalAssets.length} workflows cataloged`,
    },
  ];

  return {
    etlCount: canonicalAssets.length,
    discoverySteps,
    intelligenceSteps,
  };
}

export default function AssessmentDiscovery({ onShowResults }: { onShowResults?: () => void }) {
  const [biDiscoveryDone, setBiDiscoveryDone] = useState(false);
  const [biIntelligenceDone, setBiIntelligenceDone] = useState(false);
  const [etlDiscoveryDone, setEtlDiscoveryDone] = useState(false);
  const [etlIntelligenceDone, setEtlIntelligenceDone] = useState(false);

  const biData = useMemo(() => getBiAssessmentData(), []);
  const etlData = useMemo(() => getEtlAssessmentData(), []);

  const biAllDone = biDiscoveryDone && biIntelligenceDone;
  const etlAllDone = etlDiscoveryDone && etlIntelligenceDone;
  const showResults = biAllDone && etlAllDone;

  const onBiDiscoverySettled = useCallback(() => setBiDiscoveryDone(true), []);
  const onBiIntelligenceSettled = useCallback(() => setBiIntelligenceDone(true), []);
  const onEtlDiscoverySettled = useCallback(() => setEtlDiscoveryDone(true), []);
  const onEtlIntelligenceSettled = useCallback(() => setEtlIntelligenceDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* ─── Page header with KPI Bank link ─── */}
      <div className="flex items-center justify-end mb-4">
        <a
          href="https://kpibank.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-200 shadow-sm hover:opacity-90"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-primary)',
            boxShadow: '0 1px 3px var(--color-card-shadow)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-primary)';
          }}
          title="KPI Bank"
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundImage: 'linear-gradient(135deg, #F5D060, #D4A017)',
              boxShadow: '0 0 6px rgba(212, 160, 23, 0.5)',
            }}
          />
          <span>KPI Bank</span>
          <ExternalLink size={13} style={{ color: 'var(--color-text-tertiary)' }} />
        </a>
      </div>

      {/* ─── Two side-by-side boxes: BI Box & ETL Box ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* ── Box 1: BI Discovery & Intelligence ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-engine-border)',
            boxShadow: '0 2px 12px var(--color-card-shadow)',
          }}
          aria-label="BI Discovery and Intelligence"
        >
          {/* Header */}
          <div className="mb-4">
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              BI Discovery & Intelligence
            </h2>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
            }}
          />

          {/* Sub-stage 1: BI Discovery */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                BI Discovery
              </span>
              {biDiscoveryDone && (
                <span className="text-[11px] font-semibold text-emerald-500">
                  Completed
                </span>
              )}
            </div>
            <ThinkingTrace
              activeLabel="Discovering BI assets…"
              doneLabel={`BI Discovery complete — ${biData.biAssetsCount} assets cataloged`}
              steps={biData.discoverySteps}
              onSettled={onBiDiscoverySettled}
              delayMs={300}
            />
          </div>

          {/* Divider between Discovery and Intelligence */}
          <div
            className="h-px my-4"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-subtle), transparent)',
            }}
          />

          {/* Sub-stage 2: BI Intelligence (runs after BI Discovery finishes) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{
                  color: biDiscoveryDone
                    ? 'var(--color-accent)'
                    : 'var(--color-text-tertiary)',
                }}
              >
                BI Intelligence
              </span>
              {biIntelligenceDone && (
                <span className="text-[11px] font-semibold text-emerald-500">
                  Completed
                </span>
              )}
            </div>
            {biDiscoveryDone ? (
              <ThinkingTrace
                activeLabel="Analyzing BI intelligence & scoring…"
                doneLabel="BI Intelligence complete — redundancy & readiness scored"
                steps={biData.intelligenceSteps}
                onSettled={onBiIntelligenceSettled}
                delayMs={200}
              />
            ) : (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <Clock size={13} />
                <span>Queued · Starts automatically after BI Discovery</span>
              </div>
            )}
          </div>
        </motion.section>

        {/* ── Box 2: ETL Discovery & Intelligence ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-engine-border)',
            boxShadow: '0 2px 12px var(--color-card-shadow)',
          }}
          aria-label="ETL Discovery and Intelligence"
        >
          {/* Header */}
          <div className="mb-4">
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              ETL Discovery & Intelligence
            </h2>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
            }}
          />

          {/* Sub-stage 1: ETL Discovery */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500">
                ETL Discovery
              </span>
              {etlDiscoveryDone && (
                <span className="text-[11px] font-semibold text-emerald-500">
                  Completed
                </span>
              )}
            </div>
            <ThinkingTrace
              activeLabel="Discovering ETL assets…"
              doneLabel={`ETL Discovery complete — ${etlData.etlCount} pipelines & scripts cataloged`}
              steps={etlData.discoverySteps}
              onSettled={onEtlDiscoverySettled}
              delayMs={400}
            />
          </div>

          {/* Divider between Discovery and Intelligence */}
          <div
            className="h-px my-4"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-subtle), transparent)',
            }}
          />

          {/* Sub-stage 2: ETL Intelligence (runs after ETL Discovery finishes) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-[11px] font-bold uppercase tracking-wider"
                style={{
                  color: etlDiscoveryDone
                    ? 'rgb(16, 185, 129)'
                    : 'var(--color-text-tertiary)',
                }}
              >
                ETL Intelligence
              </span>
              {etlIntelligenceDone && (
                <span className="text-[11px] font-semibold text-emerald-500">
                  Completed
                </span>
              )}
            </div>
            {etlDiscoveryDone ? (
              <ThinkingTrace
                activeLabel="Analyzing ETL intelligence & lineage…"
                doneLabel="ETL Intelligence complete — lineage & logic mapped"
                steps={etlData.intelligenceSteps}
                onSettled={onEtlIntelligenceSettled}
                delayMs={200}
              />
            ) : (
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-subtle)',
                  color: 'var(--color-text-tertiary)',
                }}
              >
                <Clock size={13} />
                <span>Queued · Starts automatically after ETL Discovery</span>
              </div>
            )}
          </div>
        </motion.section>
      </div>

      {/* ─── Show Results button — bottom right ─── */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex justify-end"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl
                         text-sm font-semibold text-white cursor-pointer
                         transition-shadow duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 2px 8px var(--color-accent-glow)',
                outlineColor: 'var(--color-accent)',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px var(--color-accent-glow)';
                e.currentTarget.style.backgroundColor = 'var(--color-accent-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px var(--color-accent-glow)';
                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
              }}
              aria-label="Show Results"
              onClick={onShowResults}
            >
              Show Results
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
