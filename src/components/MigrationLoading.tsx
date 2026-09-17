import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ThinkingTrace from './ThinkingTrace';
import type { TraceStep } from './ThinkingTrace';
import { tbPbiSummary, tbPbiExportArtifacts } from '../data/tableauPowerBIData';
import { TABLEAU_DETAIL_DATA } from '../data/tableauDetailData';
import { POWERBI_DETAIL_DATA } from '../data/powerbiDetailData';
import { mstrJobSummary, mstrObjects } from '../data/mstrTableauData';
import { altPySummary } from '../data/alteryxPythonData';

/* ─────────────────────────────────────────────────────────
 * MigrationLoading — shown after "Start Migration"
 *
 * Supports 3 modes:
 *   - 'bi'   : Shows only BI Migration loading
 *   - 'etl'  : Shows only ETL Migration loading
 *   - 'all'  : Shows both BI & ETL Migration loading
 *
 * Once completed, "Show Migration Results" button appears.
 * ───────────────────────────────────────────────────────── */

// Canonical ID map for assets that might have alternate IDs
const ASSET_CANONICAL_MAP: Record<string, string> = {
  'p1': 'p1',
  'p2': 'p2',
  'p3': 'p3',
  'p4': 'p4',
  'p5': 'p5',
  'p6': 'p6',
  'p7': 'p7',
  'p8': 'p8',
  'p9': 'p9',
  'p10': 'p10',
  'd1': 'd1',
  'd2': 'd2',
  'd3': 'd3',
  'd4': 'd4',
  'd5': 'd5',
  'd6': 'd6',
  'd7': 'd7',
  'd8': 'd8',
  'd9': 'd9',
  'd10': 'd10',
  'd11': 'd11',
};

function getBiMigrationSteps(
  selectedAssetIds?: string[],
  migrationPath?: 'tb-pbi' | 'mstr-tb' | 'alt-py' | null,
): TraceStep[] {
  // If MSTR to Tableau path is explicitly active
  if (
    migrationPath === 'mstr-tb' ||
    (selectedAssetIds && selectedAssetIds.some((id) => id.startsWith('mstr') || id === 'd1'))
  ) {
    const dossiers = mstrObjects.filter((o) => o.type_name === 'dossier').length || 1;
    const cubes = mstrObjects.filter((o) => o.type_name === 'cube').length || 1;
    const attributes = mstrObjects.filter((o) => o.type_name === 'attribute').length || 12;
    const semanticEntities = cubes + attributes;
    const metrics = mstrObjects.filter((o) => o.type_name === 'metric').length || 34;
    const validatedObjects = mstrJobSummary.objectsSucceeded || 45;

    return [
      {
        label: 'Assessing source dashboards',
        detail: `${dossiers} dossier`,
        evidence: `${dossiers} source workbook · 5 chapters assessed`,
      },
      {
        label: 'Rebuilding semantic models',
        detail: `${semanticEntities} semantic entities`,
        evidence: `${cubes} semantic cube · ${attributes} dimensional attributes reconstructed`,
      },
      {
        label: 'Converting visual and calculation logic',
        detail: `${metrics} metrics & visuals`,
        evidence: `${metrics} metrics converted · multi-chapter dossier layout mapped`,
      },
      {
        label: 'Validating conversions',
        detail: `${validatedObjects} validated objects`,
        evidence: `5 exports · 100% parity verified`,
      },
    ];
  }

  // If a single specific asset is selected (and exists in TABLEAU_DETAIL_DATA or POWERBI_DETAIL_DATA)
  if (selectedAssetIds && selectedAssetIds.length === 1) {
    const rawId = selectedAssetIds[0];
    const canonicalId = ASSET_CANONICAL_MAP[rawId] ?? rawId;

    // If it's d7 or tb-pbi default workspace dataset
    if (canonicalId === 'd7' || migrationPath === 'tb-pbi' || !TABLEAU_DETAIL_DATA[canonicalId]) {
      const dashboards = tbPbiSummary.totalDashboards;
      const tables = tbPbiSummary.totalTables;
      const relationships = tbPbiSummary.totalRelationships;
      const worksheets = tbPbiSummary.totalWorksheets;
      const calcs = tbPbiSummary.totalCalculatedFields;
      const totalConversions = worksheets + calcs;
      const exportsCount = tbPbiExportArtifacts.length;

      return [
        {
          label: 'Assessing source dashboards',
          detail: `${dashboards} dashboard`,
          evidence: `${dashboards} source workbook · ${worksheets} worksheets assessed`,
        },
        {
          label: 'Rebuilding semantic models',
          detail: `${tables} tables`,
          evidence: `${tables} model tables · ${relationships} relationships reconstructed`,
        },
        {
          label: 'Converting visual and calculation logic',
          detail: `${totalConversions} conversions`,
          evidence: `${worksheets} visuals · ${calcs} DAX measures converted`,
        },
        {
          label: 'Validating conversions',
          detail: `${tables} validation checks`,
          evidence: `${exportsCount} exports · 100% parity verified`,
        },
      ];
    }

    // Specific Tableau Asset
    const tbDetail = TABLEAU_DETAIL_DATA[canonicalId];
    if (tbDetail) {
      const dashboards = tbDetail.summary.totalDashboards;
      const tables = tbDetail.summary.totalTables;
      const worksheets = tbDetail.summary.totalWorksheets;
      const calcs = tbDetail.summary.totalCalculatedFields;
      const totalConversions = worksheets + calcs;
      const exportsCount = tbPbiExportArtifacts.length;

      return [
        {
          label: 'Assessing source dashboards',
          detail: `${dashboards} dashboard`,
          evidence: `${dashboards} source workbook · ${worksheets} worksheets assessed`,
        },
        {
          label: 'Rebuilding semantic models',
          detail: `${tables} tables`,
          evidence: `${tables} model tables · tabular schema reconstructed`,
        },
        {
          label: 'Converting visual and calculation logic',
          detail: `${totalConversions} conversions`,
          evidence: `${worksheets} visuals · 564 calculated fields converted`,
        },
        {
          label: 'Validating conversions',
          detail: `${tables} validation checks`,
          evidence: `${exportsCount} exports · 100% parity verified`,
        },
      ];
    }

    // Specific Power BI Asset
    const pbiDetail = POWERBI_DETAIL_DATA[canonicalId];
    if (pbiDetail) {
      const dashboards = pbiDetail.summary.totalPages || 1;
      const tables = pbiDetail.summary.totalTables || 1;
      const visuals = pbiDetail.summary.totalVisuals || 0;
      const measures = pbiDetail.summary.totalDAXMeasures || 0;
      const totalConversions = visuals + measures;
      const exportsCount = tbPbiExportArtifacts.length;

      return [
        {
          label: 'Assessing source dashboards',
          detail: `${dashboards} dashboard`,
          evidence: `${dashboards} source workbook · ${visuals} worksheets assessed`,
        },
        {
          label: 'Rebuilding semantic models',
          detail: `${tables} tables`,
          evidence: `${tables} semantic tables · model schema verified`,
        },
        {
          label: 'Converting visual and calculation logic',
          detail: `${totalConversions} conversions`,
          evidence: `${visuals} visuals · ${measures} DAX measures converted`,
        },
        {
          label: 'Validating conversions',
          detail: `${tables} validation checks`,
          evidence: `${exportsCount} exports · 100% parity verified`,
        },
      ];
    }
  }

  // Multiple Assets / Default BI Migration
  const dashboards = tbPbiSummary.totalDashboards;
  const tables = tbPbiSummary.totalTables;
  const relationships = tbPbiSummary.totalRelationships;
  const worksheets = tbPbiSummary.totalWorksheets;
  const calcs = tbPbiSummary.totalCalculatedFields;
  const totalConversions = worksheets + calcs;
  const exportsCount = tbPbiExportArtifacts.length;

  return [
    {
      label: 'Assessing source dashboards',
      detail: `${dashboards} dashboard`,
      evidence: `${dashboards} source workbook · ${worksheets} worksheets assessed`,
    },
    {
      label: 'Rebuilding semantic models',
      detail: `${tables} tables`,
      evidence: `${tables} model tables · ${relationships} relationships reconstructed`,
    },
    {
      label: 'Converting visual and calculation logic',
      detail: `${totalConversions} conversions`,
      evidence: `${worksheets} visuals · ${calcs} DAX measures converted`,
    },
    {
      label: 'Validating conversions',
      detail: `${tables} validation checks`,
      evidence: `${exportsCount} exports · 100% parity verified`,
    },
  ];
}

function getEtlMigrationSteps(
  _selectedAssetIds?: string[],
): TraceStep[] {
  // const totalWorkflows = altPySummary.totalWorkflows;
  const totalWorkflows = 4;
  const convertedTools = altPySummary.convertedTools;
  const outputScripts = altPySummary.totalOutputScripts;

  return [
    {
      label: 'Assessing source workflows',
      detail: `${totalWorkflows} workflows`,
      evidence: `${totalWorkflows} Alteryx workflows`,
    },
    {
      label: 'Converting transformation logic',
      detail: `${convertedTools} converted tools`,
      evidence: `${convertedTools} tools converted`,
    },
    {
      label: 'Validating conversions',
      detail: `${outputScripts} output scripts`,
      evidence: `· ${outputScripts} output scripts · 100% AST parity `,
    },
  ];
}

export type MigrationMode = 'bi' | 'etl' | 'all';

interface Props {
  mode?: MigrationMode;
  selectedAssetIds?: string[];
  migrationPath?: 'tb-pbi' | 'mstr-tb' | 'alt-py' | null;
  onShowResults?: () => void;
}

export default function MigrationLoading({
  mode = 'all',
  selectedAssetIds,
  migrationPath,
  onShowResults,
}: Props) {
  const [biDone, setBiDone] = useState(false);
  const [etlDone, setEtlDone] = useState(false);

  const biSteps = useMemo(
    () => getBiMigrationSteps(selectedAssetIds, migrationPath),
    [selectedAssetIds, migrationPath],
  );

  const etlSteps = useMemo(
    () => getEtlMigrationSteps(selectedAssetIds),
    [selectedAssetIds],
  );

  const showBi = mode === 'bi' || mode === 'all';
  const showEtl = mode === 'etl' || mode === 'all';

  const isComplete =
    mode === 'bi' ? biDone : mode === 'etl' ? etlDone : biDone && etlDone;

  const onBiSettled = useCallback(() => setBiDone(true), []);
  const onEtlSettled = useCallback(() => setEtlDone(true), []);

  const resultLabel =
    mode === 'bi'
      ? 'Show BI Migration Results'
      : mode === 'etl'
      ? 'Show ETL Migration Results'
      : 'Show Migration Results';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mx-auto ${mode === 'all' ? 'max-w-[1240px]' : 'max-w-[800px]'}`}
    >
      {/* ─── Top Row: BI Migration / ETL Migration ─── */}
      <div
        className={`grid gap-6 mb-8 ${
          mode === 'all' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {/* ── Box 1: BI Migration ── */}
        {showBi && (
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
            aria-label="BI Migration"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2
                  className="text-lg font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  BI Migration
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
                background:
                  'linear-gradient(90deg, var(--color-border-primary), transparent)',
              }}
            />

            {/* Thinking trace */}
            <ThinkingTrace
              activeLabel="Converting BI dashboards & semantic models…"
              doneLabel="BI Migration complete — visual & calculation logic converted"
              steps={biSteps}
              onSettled={onBiSettled}
              delayMs={300}
            />
          </motion.section>
        )}

        {/* ── Box 2: ETL Migration ── */}
        {showEtl && (
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
            aria-label="ETL Migration"
          >
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2
                  className="text-lg font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  ETL Migration
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
                background:
                  'linear-gradient(90deg, var(--color-border-primary), transparent)',
              }}
            />

            {/* Thinking trace */}
            <ThinkingTrace
              activeLabel="Converting ETL workflows & transformation logic…"
              doneLabel="ETL Migration complete — transformation scripts validated"
              steps={etlSteps}
              onSettled={onEtlSettled}
              delayMs={400}
            />
          </motion.section>
        )}
      </div>

      {/* ─── Show Results button — bottom right ─── */}
      <AnimatePresence>
        {isComplete && (
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
                         text-sm font-bold cursor-pointer
                         transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 border"
              style={{
                background:
                  'linear-gradient(135deg, rgba(251, 78, 11, 0.20) 0%, rgba(251, 78, 11, 0.08) 100%)',
                borderColor:
                  'color-mix(in srgb, var(--color-accent) 45%, var(--color-border-primary))',
                color: 'var(--color-accent)',
                boxShadow: '0 4px 16px rgba(251, 78, 11, 0.15)',
                outlineColor: 'var(--color-accent)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, rgba(251, 78, 11, 0.32) 0%, rgba(251, 78, 11, 0.14) 100%)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.boxShadow =
                  '0 6px 26px rgba(251, 78, 11, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  'linear-gradient(135deg, rgba(251, 78, 11, 0.20) 0%, rgba(251, 78, 11, 0.08) 100%)';
                e.currentTarget.style.borderColor =
                  'color-mix(in srgb, var(--color-accent) 45%, var(--color-border-primary))';
                e.currentTarget.style.boxShadow =
                  '0 4px 16px rgba(251, 78, 11, 0.15)';
              }}
              aria-label={resultLabel}
              onClick={onShowResults}
            >
              {resultLabel}
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
