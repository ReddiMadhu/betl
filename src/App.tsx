import { useState } from 'react';
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

type ViewState = 'home' | 'assessment' | 'results' | 'rationalization' | 'rationalization-results';

export default function App() {
  const [view, setView] = useState<ViewState>('home');

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <Header />

      {view === 'home' && (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">

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
            <LaunchAssessmentButton onClick={() => setView('assessment')} />
          </div>
        </main>
      )}

      {view === 'assessment' && (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <AssessmentDiscovery onShowResults={() => setView('results')} />
        </main>
      )}

      {view === 'results' && (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <AssessmentResults onStartRationalization={() => setView('rationalization')} />
        </main>
      )}

      {view === 'rationalization' && (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <RationalizationLoading onShowResults={() => setView('rationalization-results')} />
        </main>
      )}

      {view === 'rationalization-results' && (
        <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-12">
          <RationalizationResults onStartMigration={() => {/* next phase */}} />
        </main>
      )}

      {/* Footer */}
      <footer className="border-t theme-transition" style={{ borderColor: 'var(--color-border-subtle)' }}>
        <div className="max-w-[1600px] mx-auto px-6 lg:px-10 py-6 flex items-center justify-between">
          <span
            className="text-[11px]"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            © 2026 SympAI. All rights reserved.
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
