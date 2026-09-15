import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Header from './components/Header';
import TechnologySources from './components/TechnologySources';
import ModernizationEngine from './components/ModernizationEngine';
import ConnectionLines from './components/ConnectionLines';
import LaunchAssessmentButton from './components/LaunchAssessmentButton';
import AssessmentDiscovery from './components/AssessmentDiscovery';
import AssessmentResults from './components/results/AssessmentResults';
import RationalizationLoading from './components/RationalizationLoading';
import RationalizationResults from './components/results/RationalizationResults';
import MigrationSelection from './components/MigrationSelection';
import MigrationLoading from './components/MigrationLoading';
import MigrationResults from './components/results/MigrationResults';
import TableauPowerBIWorkspace from './components/migration/TableauPowerBIWorkspace';
import MstrTableauWorkspace from './components/migration/MstrTableauWorkspace';
import AlteryxPythonWorkspace from './components/migration/AlteryxPythonWorkspace';
import TakeAGlance from './components/TakeAGlance';
import Sidebar from './components/navigation/Sidebar';
import TableauDetail from './components/details/TableauDetail';
import PowerBIDetail from './components/details/PowerBIDetail';
import MicroStrategyDetail from './components/details/MicroStrategyDetail';
import AlteryxDetail from './components/details/AlteryxDetail';
import PythonDetail from './components/details/PythonDetail';
import type { ViewState } from './components/navigation/workflowStages';
import type { Asset } from './data/discoveryData';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [visitedViews, setVisitedViews] = useState<Set<ViewState>>(() => new Set(['home']));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedMigrationAssetIds, setSelectedMigrationAssetIds] = useState<string[]>([]);
  const [migrationMode, setMigrationMode] = useState<'bi' | 'etl' | 'all'>('all');
  const [migrationPath, setMigrationPath] = useState<'tb-pbi' | 'mstr-tb' | 'alt-py' | null>(null);

  // Navigation handler tracking visited stages
  const navigateTo = useCallback((nextView: ViewState) => {
    setView(nextView);
    setVisitedViews((prev) => {
      if (prev.has(nextView)) return prev;
      const updated = new Set(prev);
      updated.add(nextView);
      return updated;
    });
  }, []);

  // Navigate to a technology detail page for a specific asset
  const navigateToAssetDetail = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
    navigateTo('asset-detail');
  }, [navigateTo]);

  // Back from asset detail to results
  const handleBackFromDetail = useCallback(() => {
    setSelectedAsset(null);
    setView('results');
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const [ingestionState, setIngestionState] = useState<'idle' | 'ingesting' | 'complete'>('idle');

  const handleStartIngestion = useCallback(() => {
    if (ingestionState === 'ingesting') return;
    setIngestionState('ingesting');
    setTimeout(() => {
      setIngestionState('complete');
    }, 4000);
  }, [ingestionState]);

  /* ─────────────────────────────────────────────────────────
   * 1. LANDING PAGE — No sidebar, full-width presentation
   * ───────────────────────────────────────────────────────── */
  if (view === 'home') {
    return (
      <div
        className="min-h-screen xl:h-screen flex flex-col justify-between overflow-x-hidden"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <Header />

        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col justify-center py-2 relative">
          {/* ─── Desktop layout: Centered Combined Workspace + Modernization Engine in the middle ─── */}
          <div
            id="main-layout"
            className="relative flex flex-col xl:flex-row items-start xl:items-center justify-center max-w-[1260px] mx-auto w-full my-auto"
          >
            {/* SVG connection lines (desktop only) */}
            <ConnectionLines ingestionState={ingestionState} />

            {/* Left — Technology Sources / Organizational Workspace */}
            <div className="w-full xl:w-[320px] shrink-0 order-1 relative z-10 mb-6 xl:mb-0">
              <TechnologySources />
            </div>

            {/* Center — BI and ETL Modernization (820px, with ~110px connector gap) */}
            <div className="w-full xl:w-[820px] xl:ml-[110px] shrink-0 order-2 flex flex-col items-stretch relative z-10 mb-6 xl:mb-0">
              <ModernizationEngine
                ingestionState={ingestionState}
                onStartIngestion={handleStartIngestion}
              />
            </div>
          </div>
        </main>

        {/* Floating Launch Assessment Button — appears only after Ingestion completion */}
        <AnimatePresence>
          {ingestionState === 'complete' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="fixed bottom-5 right-6 sm:bottom-6 sm:right-8 lg:bottom-7 lg:right-10 z-40"
            >
              <LaunchAssessmentButton onClick={() => navigateTo('assessment')} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Landing Footer */}
        <footer
          className="mt-auto border-t theme-transition"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
            <span
              className="text-[11px]"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              © 2026 AI on BI and ETL. All rights reserved.
            </span>
            <span
              className="text-[11px] pr-52 hidden sm:inline"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Enterprise BI & ETL Modernization Platform
            </span>
          </div>
        </footer>
      </div>
    );
  }

  /* ─────────────────────────────────────────────────────────
   * 2. WORKFLOW PAGES — Clean layout with Collapsible Sidebar
   *    3 Core Stages:
   *      1. Assessment
   *      2. Rationalization
   *      3. Migration
   * ───────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* ── Collapsible Left Sidebar (3 Stages only + Theme toggle at bottom) ── */}
      <Sidebar
        currentView={view}
        onNavigate={navigateTo}
        visitedViews={visitedViews}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        isMobileOpen={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* ── Mobile Floating Menu Button (hidden on desktop) ── */}
      <button
        type="button"
        onClick={() => setIsMobileNavOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 w-9 h-9 rounded-xl flex items-center justify-center shadow-md border cursor-pointer theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border-primary)',
          color: 'var(--color-text-primary)',
        }}
        aria-label="Open navigation menu"
      >
        <Menu size={16} />
      </button>

      {/* ── Main Content Area (No top bar) ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Stage 1: Assessment */}
          {view === 'assessment' && (
            <AssessmentDiscovery onShowResults={() => navigateTo('results')} />
          )}

          {view === 'results' && (
            <AssessmentResults
              onStartRationalization={() => navigateTo('rationalization')}
              onAssetDetail={navigateToAssetDetail}
            />
          )}

          {view === 'asset-detail' && selectedAsset && (
            <>
              {selectedAsset.technology === 'Tableau' && (
                <TableauDetail asset={selectedAsset} onBack={handleBackFromDetail} />
              )}
              {selectedAsset.technology === 'Power BI' && (
                <PowerBIDetail asset={selectedAsset} onBack={handleBackFromDetail} />
              )}
              {selectedAsset.technology === 'MicroStrategy' && (
                <MicroStrategyDetail asset={selectedAsset} onBack={handleBackFromDetail} />
              )}
              {selectedAsset.technology === 'Alteryx' && (
                <AlteryxDetail asset={selectedAsset} onBack={handleBackFromDetail} />
              )}
              {selectedAsset.technology === 'Python' && (
                <PythonDetail asset={selectedAsset} onBack={handleBackFromDetail} />
              )}
            </>
          )}

          {/* Stage 2: Rationalization */}
          {view === 'rationalization' && (
            <RationalizationLoading onShowResults={() => navigateTo('rationalization-results')} />
          )}

          {view === 'rationalization-results' && (
            <RationalizationResults onStartMigration={() => navigateTo('migration')} />
          )}

          {/* Stage 3: Migration */}
          {view === 'migration' && (
            <MigrationSelection
              onStartMigration={(selectedIds, mode = 'all', path) => {
                if (selectedIds) {
                  setSelectedMigrationAssetIds(selectedIds);
                }
                setMigrationMode(mode);
                setMigrationPath(path ?? null);
                navigateTo('migration-loading');
              }}
            />
          )}

          {view === 'migration-loading' && (
            <MigrationLoading
              mode={migrationMode}
              selectedAssetIds={selectedMigrationAssetIds}
              migrationPath={migrationPath}
              onShowResults={() => {
                // Navigate to the correct workspace based on migrationPath
                if (migrationPath === 'tb-pbi') navigateTo('migration-tb-pbi');
                else if (migrationPath === 'mstr-tb') navigateTo('migration-mstr-tb');
                else if (migrationPath === 'alt-py') navigateTo('migration-alt-py');
                else navigateTo('migration-results');
              }}
            />
          )}

          {view === 'migration-results' && (
            <MigrationResults
              selectedAssetIds={selectedMigrationAssetIds}
              onComplete={() => navigateTo('take-a-glance')}
              onBackToSelection={() => navigateTo('migration')}
            />
          )}

          {/* Migration Workspaces */}
          {view === 'migration-tb-pbi' && (
            <TableauPowerBIWorkspace
              onBack={() => navigateTo('migration')}
              onFinish={() => navigateTo('take-a-glance')}
            />
          )}

          {view === 'migration-mstr-tb' && (
            <MstrTableauWorkspace
              onBack={() => navigateTo('migration')}
              onFinish={() => navigateTo('take-a-glance')}
            />
          )}

          {view === 'migration-alt-py' && (
            <AlteryxPythonWorkspace
              onBack={() => navigateTo('migration')}
              onFinish={() => navigateTo('take-a-glance')}
            />
          )}

          {/* Stage 4: Take a Glance */}
          {view === 'take-a-glance' && (
            <TakeAGlance onNavigate={navigateTo} />
          )}
        </main>

        {/* Clean Workflow Footer */}
        <footer
          className="mt-auto border-t theme-transition py-4 px-6 sm:px-8"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="max-w-[1600px] mx-auto flex items-center justify-between text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            <span>AI on BI and ETL Modernization Platform</span>
            <span>Enterprise Cloud Edition</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
