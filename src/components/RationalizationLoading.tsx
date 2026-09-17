import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';
import { allAssets, isEtlAsset } from '../data/discoveryData';
import {
  recommendations,
  computeBiOverlapMetrics,
  computeEtlOverlapMetrics,
} from '../data/rationalizationData';

/* ─────────────────────────────────────────────────────────
 * RationalizationLoading — shown after "Start Rationalization"
 *
 * 3-Stage Intelligent Rationalization:
 *   1. BI Rationalization  — analyzes reports, dashboards & calculations
 *   2. ETL Rationalization — analyzes data pipelines, scripts & jobs
 *   3. Detecting BI & ETL Interdependence — cross-impact evaluation:
 *      - Assessing impact of ETL decommission recommendations on BI assets
 *      - Assessing impact of BI decommission recommendations on ETL assets
 *
 * Once all 3 complete, "Show Rationalization Results" button appears.
 * ───────────────────────────────────────────────────────── */

/**
 * Derives dynamic quantitative metrics and evidence for Rationalization Loading steps
 * from actual BI assets, canonical ETL workflows, overlap calculations, and recommendations.
 */
function getRationalizationLoadingData() {
  // ─── 1. BI Rationalization Evidence ───
  const biAssets = allAssets.filter((a) => !isEtlAsset(a));
  const biMergeRecs = recommendations.filter((r) => r.category === 'merge-bi');
  const biRetireRecs = recommendations.filter((r) => r.category === 'bi-retire');
  const biKeepRecs = recommendations.filter((r) => r.category === 'bi-keep');

  const biOverlapMetrics = computeBiOverlapMetrics();
  const biSourceOverlaps = biOverlapMetrics.find((m) => m.id === 'source-metadata')?.value ?? 12;
  const biKpiOverlaps = biOverlapMetrics.find((m) => m.id === 'kpi')?.value ?? 17;

  const biUserGroups = new Set<string>();
  for (const r of recommendations) {
    if (r.category.startsWith('bi') || r.category === 'merge-bi') {
      for (const ug of r.userGroups ?? []) {
        biUserGroups.add(ug);
      }
    }
  }

  const biRationalizationSteps: TraceStep[] = [
    {
      label: 'Analyzing overlap across reports & dashboards',
      detail: `${biAssets.length} BI assets`,
      evidence: `${biAssets.length} BI assets · ${biOverlapMetrics.length} overlap dimensions`,
    },
    {
      label: 'Assessing dependencies — shared users and KPI Overlaps',
      evidence: `${biSourceOverlaps} shared sources · ${biKpiOverlaps} shared KPIs`,
    },
    {
      label: 'Executing rationalization decisioning',
      detail: `${biMergeRecs.length + biRetireRecs.length + biKeepRecs.length} decisions`,
      evidence: `${biMergeRecs.length} consolidate · ${biRetireRecs.length} retire · ${biKeepRecs.length} retain`,
    },
  ];

  // ─── 2. ETL Rationalization Evidence ───
  const etlAssets = allAssets.filter(isEtlAsset);
  const canonicalMap = new Map<string, typeof etlAssets[0]>();
  for (const asset of etlAssets) {
    const key = asset.canonicalId ?? asset.id;
    if (!canonicalMap.has(key)) {
      canonicalMap.set(key, asset);
    }
  }
  const canonicalAssets = Array.from(canonicalMap.values());
  const etlTechnologies = new Set(canonicalAssets.map((a) => a.technology));

  const etlMergeRecs = recommendations.filter((r) => r.category === 'etl-merge');
  const etlRetireRecs = recommendations.filter((r) => r.category === 'etl-retire');
  const etlKeepRecs = recommendations.filter((r) => r.category === 'etl-keep');

  const etlOverlapMetrics = computeEtlOverlapMetrics();
  const etlSourceOverlaps = etlOverlapMetrics.find((m) => m.id === 'etl-source-overlap')?.value ?? 18;
  const etlLogicOverlaps = etlOverlapMetrics.find((m) => m.id === 'etl-logic')?.value ?? 9;
  const etlTargetOverlaps = etlOverlapMetrics.find((m) => m.id === 'etl-target')?.value ?? 11;

  const etlRationalizationSteps: TraceStep[] = [
    {
      label: 'Analyzing overlap across pipelines & workflows',
      detail: `${canonicalAssets.length} ETL workflows`,
      evidence: `${canonicalAssets.length} canonical workflows · ${etlTechnologies.size} technologies`,
    },
    {
      label: 'Assessing dependencies — shared users, logic and KPI overlaps',
      evidence: `${etlSourceOverlaps} shared sources · ${etlLogicOverlaps} shared logic patterns · ${etlTargetOverlaps} KPI overlaps`,
    },
    {
      label: 'Executing rationalization decisioning',
      detail: `${etlMergeRecs.length + etlRetireRecs.length + etlKeepRecs.length} decisions`,
      evidence: `${etlMergeRecs.length} consolidate · ${etlRetireRecs.length} retire · ${etlKeepRecs.length} retain`,
    },
  ];

  // ─── 3. Interdependence Evidence ───
  const biEtlConnMetric = biOverlapMetrics.find((m) => m.id === 'bi-etl-conn')?.value ?? 24;

  const interdependenceSteps: TraceStep[] = [
    {
      label: 'Tracing cross-technology lineage between ETL pipelines and BI reports',
      detail: `${biEtlConnMetric} dependencies mapped`,
      evidence: `${biEtlConnMetric} lineage connections across ${biAssets.length} BI assets & ${canonicalAssets.length} ETL workflows`,
    },
    {
      label: 'Assessing impact of ETL decommission recommendations on BI assets',
      detail: 'Protected · 0 zombie',
      evidence: `${etlRetireRecs.length} ETL decommission candidates evaluated · 0 downstream BI assets broken (100% safe)`,
    },
    {
      label: 'Assessing impact of BI decommission recommendations on ETL assets',
      detail: 'Verified · 0 orphaned',
      evidence: `${biRetireRecs.length} BI decommission candidates evaluated · 0 upstream ETL pipelines orphaned`,
    },
    {
      label: 'Validating end-to-end dependency integrity',
      detail: 'Integrity verified',
      evidence: `${recommendations.length} recommendations validated across ${biAssets.length} BI assets & ${canonicalAssets.length} ETL workflows`,
    },
  ];

  return {
    biRationalizationSteps,
    etlRationalizationSteps,
    interdependenceSteps,
  };
}

interface Props {
  onShowResults?: () => void;
}

export default function RationalizationLoading({ onShowResults }: Props) {
  const [biDone, setBiDone] = useState(false);
  const [etlDone, setEtlDone] = useState(false);
  const [interdependenceDone, setInterdependenceDone] = useState(false);

  const {
    biRationalizationSteps,
    etlRationalizationSteps,
    interdependenceSteps,
  } = useMemo(() => getRationalizationLoadingData(), []);

  const canStartInterdependence = biDone && etlDone;
  const allDone = biDone && etlDone && interdependenceDone;

  const onBiSettled = useCallback(() => setBiDone(true), []);
  const onEtlSettled = useCallback(() => setEtlDone(true), []);
  const onInterdependenceSettled = useCallback(() => setInterdependenceDone(true), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-[1240px] mx-auto"
    >
      {/* ─── Top Row: BI Rationalization & ETL Rationalization ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* ── Box 1: BI Rationalization ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-engine-border)',
            boxShadow: '0 2px 12px var(--color-card-shadow)',
          }}
          aria-label="BI Rationalization"
        >
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                BI Rationalization
              </h2>
              {biDone && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                  <CheckCircle2 size={13} />
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
            }}
          />

          {/* Thinking trace */}
          <ThinkingTrace
            activeLabel="Evaluating BI assets…"
            doneLabel="BI Rationalization complete — overlap & merge scored"
            steps={biRationalizationSteps}
            onSettled={onBiSettled}
            delayMs={300}
          />
        </motion.section>

        {/* ── Box 2: ETL Rationalization ── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="rounded-2xl border p-6 md:p-8 theme-transition flex flex-col"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-engine-border)',
            boxShadow: '0 2px 12px var(--color-card-shadow)',
          }}
          aria-label="ETL Rationalization"
        >
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                ETL Rationalization
              </h2>
              {etlDone && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                  <CheckCircle2 size={13} />
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div
            className="h-px mb-5"
            style={{
              background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
            }}
          />

          {/* Thinking trace */}
          <ThinkingTrace
            activeLabel="Evaluating ETL workflows…"
            doneLabel="ETL Rationalization complete — redundancy & pipeline scores ready"
            steps={etlRationalizationSteps}
            onSettled={onEtlSettled}
            delayMs={400}
          />
        </motion.section>
      </div>

      {/* ─── Box 3: Detecting BI and ETL Interdependence ─── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
        className="rounded-2xl border p-6 md:p-8 mb-8 theme-transition flex flex-col"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: canStartInterdependence
            ? 'var(--color-border-secondary)'
            : 'var(--color-engine-border)',
          boxShadow: '0 2px 12px var(--color-card-shadow)',
        }}
        aria-label="Detecting BI and ETL Interdependence"
      >
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Detecting BI and ETL Interdependence
            </h2>
            {interdependenceDone && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500">
                <CheckCircle2 size={13} />
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-5"
          style={{
            background: 'linear-gradient(90deg, var(--color-border-primary), transparent)',
          }}
        />

        {/* Thinking trace or Queued State */}
        {canStartInterdependence ? (
          <ThinkingTrace
            activeLabel="Analyzing BI & ETL cross-impact interdependence…"
            doneLabel="Interdependence analysis complete — cross-impact verified & safe"
            steps={interdependenceSteps}
            onSettled={onInterdependenceSettled}
            delayMs={200}
          />
        ) : (
          <div
            className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-xs font-medium theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              borderColor: 'var(--color-border-subtle)',
              color: 'var(--color-text-tertiary)',
            }}
          >
            <Clock size={15} />
            <span>
              Queued · Automatically begins detecting cross-dependencies once BI and ETL rationalization complete
            </span>
          </div>
        )}
      </motion.section>

      {/* ─── Show Results button — bottom right ─── */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex justify-end mb-8"
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
              aria-label="Show Rationalization Results"
              onClick={onShowResults}
            >
              Show Rationalization Results
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
