import { useState, useCallback } from 'react';
import { Menu } from 'lucide-react';
import Header from './components/Header';
import TechnologySources from './components/TechnologySources';
import ModernizationEngine from './components/ModernizationEngine';
import IngestionStats from './components/IngestionStats';
import ConnectionLines from './components/ConnectionLines';
import LaunchAssessmentButton from './components/LaunchAssessmentButton';
import AssessmentDiscovery from './components/AssessmentDiscovery';
import AssessmentResults from './components/results/AssessmentResults';
import RationalizationLoading from './components/RationalizationLoading';
import RationalizationResults from './components/results/RationalizationResults';
import MigrationSelection from './components/MigrationSelection';
import MigrationLoading from './components/MigrationLoading';
import MigrationResults from './components/results/MigrationResults';
import Sidebar from './components/navigation/Sidebar';
import type { ViewState } from './components/navigation/workflowStages';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [visitedViews, setVisitedViews] = useState<Set<ViewState>>(() => new Set(['home']));
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  /* ─────────────────────────────────────────────────────────
   * 1. LANDING PAGE — No sidebar, full-width presentation
   * ───────────────────────────────────────────────────────── */
  if (view === 'home') {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <Header />

        <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          {/* ─── Desktop layout: 20% | 10% gap | 52.5% | 2.5% gap | 15% ─── */}
          <div
            id="main-layout"
            className="relative flex flex-col xl:flex-row items-start xl:items-center"
          >
            {/* SVG connection lines (desktop only) */}
            <ConnectionLines />

            {/* Left — Technology Sources (20%) */}
            <div className="w-full xl:w-[20%] shrink-0 order-1 relative z-10 mb-6 xl:mb-0">
              <TechnologySources />
            </div>

            {/* Center — AI Modernization Engine (52.5%) */}
            <div className="w-full xl:w-[52.5%] xl:ml-[10%] shrink-0 order-2 flex flex-col items-stretch relative z-10 mb-6 xl:mb-0">
              <ModernizationEngine />
            </div>

            {/* Right — Ingestion Stats (15%) */}
            <div className="w-full xl:w-[15%] xl:ml-auto shrink-0 order-3 relative z-10">
              <IngestionStats />
            </div>
          </div>

          {/* CTA — bottom right */}
          <div className="flex justify-end mt-8">
            <LaunchAssessmentButton onClick={() => navigateTo('assessment')} />
          </div>
        </main>

        {/* Landing Footer */}
        <footer className="mt-auto border-t theme-transition" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
            <span
              className="text-[11px]"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              © 2026 BI.ETL.AI. All rights reserved.
            </span>
            <span
              className="text-[11px]"
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
   *      1. Discovery & Intelligence
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
          {/* Stage 1: Discovery & Intelligence */}
          {view === 'assessment' && (
            <AssessmentDiscovery onShowResults={() => navigateTo('results')} />
          )}

          {view === 'results' && (
            <AssessmentResults onStartRationalization={() => navigateTo('rationalization')} />
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
            <MigrationSelection onStartMigration={() => navigateTo('migration-loading')} />
          )}

          {view === 'migration-loading' && (
            <MigrationLoading onShowResults={() => navigateTo('migration-results')} />
          )}

          {view === 'migration-results' && (
            <MigrationResults onComplete={() => navigateTo('home')} />
          )}
        </main>

        {/* Clean Workflow Footer */}
        <footer
          className="mt-auto border-t theme-transition py-4 px-6 sm:px-8"
          style={{ borderColor: 'var(--color-border-subtle)' }}
        >
          <div className="max-w-[1600px] mx-auto flex items-center justify-between text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
            <span>BI.ETL.AI Modernization Platform</span>
            <span>Enterprise Cloud Edition</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
