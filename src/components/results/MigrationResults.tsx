import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  LayoutDashboard,
  FolderTree,
} from 'lucide-react';
import CalculationConversionView from './conversion/CalculationConversionView';
import VisualConversionView from './conversion/VisualConversionView';
import ExportCenterView from './conversion/ExportCenterView';
import {
  calculationConversions,
  visualConversions,
  exportArtifacts,
} from '../../data/migrationData';

interface Props {
  selectedAssetIds?: string[];
  onComplete?: () => void;
  onBackToSelection?: () => void;
}

type TabType = 'calculation' | 'visual' | 'export';

export default function MigrationResults({ onComplete: _onComplete, onBackToSelection: _onBackToSelection }: Props) {
  const [activeTab, setActiveTab] = useState<TabType>('calculation');

  return (
    <div className="space-y-6">
      {/* ── Heading: Migration & Conversion Workspace ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between gap-4 pt-1"
      >
        <h1
          className="text-2xl lg:text-3xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Migration & Conversion Workspace
        </h1>
      </motion.div>

      {/* ── Segmented Navigation Tabs for the 3 Pages ── */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl border bg-[var(--color-bg-elevated)]" style={{ borderColor: 'var(--color-border-primary)' }}>
        <button
          type="button"
          onClick={() => setActiveTab('calculation')}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all border"
          style={{
            background:
              activeTab === 'calculation'
                ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                : 'transparent',
            borderColor:
              activeTab === 'calculation'
                ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                : 'transparent',
            color: activeTab === 'calculation' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            boxShadow:
              activeTab === 'calculation'
                ? '0 2px 10px rgba(251, 78, 11, 0.12)'
                : 'none',
          }}
        >
          <Code2 size={16} />
          <span>1. Calculation Conversion</span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-bold"
            style={{
              backgroundColor:
                activeTab === 'calculation'
                  ? 'rgba(251, 78, 11, 0.16)'
                  : 'var(--color-bg-tertiary)',
              color:
                activeTab === 'calculation'
                  ? 'var(--color-accent)'
                  : 'var(--color-text-tertiary)',
            }}
          >
            {calculationConversions.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('visual')}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all border"
          style={{
            background:
              activeTab === 'visual'
                ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                : 'transparent',
            borderColor:
              activeTab === 'visual'
                ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                : 'transparent',
            color: activeTab === 'visual' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            boxShadow:
              activeTab === 'visual'
                ? '0 2px 10px rgba(251, 78, 11, 0.12)'
                : 'none',
          }}
        >
          <LayoutDashboard size={16} />
          <span>2. Visual Conversion</span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-bold"
            style={{
              backgroundColor:
                activeTab === 'visual'
                  ? 'rgba(251, 78, 11, 0.16)'
                  : 'var(--color-bg-tertiary)',
              color:
                activeTab === 'visual'
                  ? 'var(--color-accent)'
                  : 'var(--color-text-tertiary)',
            }}
          >
            {visualConversions.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('export')}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all border"
          style={{
            background:
              activeTab === 'export'
                ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                : 'transparent',
            borderColor:
              activeTab === 'export'
                ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                : 'transparent',
            color: activeTab === 'export' ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            boxShadow:
              activeTab === 'export'
                ? '0 2px 10px rgba(251, 78, 11, 0.12)'
                : 'none',
          }}
        >
          <FolderTree size={16} />
          <span>3. Final Export</span>
          <span
            className="text-[10px] px-2 py-0.5 rounded-full font-bold"
            style={{
              backgroundColor:
                activeTab === 'export'
                  ? 'rgba(251, 78, 11, 0.16)'
                  : 'var(--color-bg-tertiary)',
              color:
                activeTab === 'export'
                  ? 'var(--color-accent)'
                  : 'var(--color-text-tertiary)',
            }}
          >
            {exportArtifacts.length}
          </span>
        </button>
      </div>

      {/* ── Active Tab Page Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'calculation' && <CalculationConversionView />}
          {activeTab === 'visual' && <VisualConversionView />}
          {activeTab === 'export' && <ExportCenterView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
