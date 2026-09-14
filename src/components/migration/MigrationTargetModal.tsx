import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';
import type { TechnologyName } from '../../data/discoveryData';
import type { MigrationAsset } from '../../data/migrationData';

/* ─────────────────────────────────────────────────────────
 * MigrationTargetModal — lets the user pick the target
 * technology for any retained BI dashboard or ETL workflow
 * ───────────────────────────────────────────────────────── */

interface TargetOption {
  id: TechnologyName;
  name: string;
  tagline: string;
  compatibilityScore: string;
  recommended?: boolean;
  features: string[];
}

const BI_TARGET_OPTIONS: TargetOption[] = [
  {
    id: 'Power BI',
    name: 'Power BI / Microsoft Fabric',
    tagline: 'Enterprise semantic model with DAX measures and Fabric Direct Lake mode',
    compatibilityScore: '100% Parity',
    recommended: true,
    features: [
      'Automated DAX measure generation with 0-division protection',
      'Tableau LOD & MicroStrategy dimensional metrics translation',
      'Exportable Tabular Model BIM and Power BI report package',
    ],
  },
  {
    id: 'Tableau',
    name: 'Tableau Cloud',
    tagline: 'Modern cloud workbook with published hyper extracts and Level of Detail',
    compatibilityScore: '98% Parity',
    features: [
      'Direct XML schema workbook transpilation',
      'Preserved calculation syntax and custom parameter actions',
      'Cloud extract scheduling and multi-tenant security filters',
    ],
  },
  {
    id: 'ThoughtSpot',
    name: 'ThoughtSpot Analytics',
    tagline: 'Search & AI-driven liveboards powered by ThoughtSpot Modeling Language (TML)',
    compatibilityScore: '95% Parity',
    features: [
      'Search-first liveboards with natural language querying',
      'Automated TML YAML schema generation',
      'Direct-to-cloud-warehouse pushdown queries',
    ],
  },
];

const ETL_TARGET_OPTIONS: TargetOption[] = [
  {
    id: 'Python',
    name: 'Python / PySpark Pipeline',
    tagline: 'Modern vectorized Python scripts with Pandas, SQLAlchemy, and Airflow orchestration',
    compatibilityScore: '100% Vectorized',
    recommended: true,
    features: [
      'Transpiles Alteryx tools into vectorized Pandas / NumPy operations (3-5x faster)',
      'Automated PyTest assertions for 100% regression testing',
      'Airflow DAG and containerized Docker execution templates',
    ],
  },
  {
    id: 'Alteryx',
    name: 'Alteryx Server / Cloud',
    tagline: 'Cloud-native Alteryx Designer workflows and Server analytic apps',
    compatibilityScore: '97% Parity',
    features: [
      'Standardized Alteryx XML workflow package (.yxzp)',
      'Macro modularization and credential vault integration',
      'Automated workflow scheduling and email alerting triggers',
    ],
  },
];

interface Props {
  asset: MigrationAsset;
  onClose: () => void;
  onSelectTarget: (assetId: string, newTarget: TechnologyName | null) => void;
}

export default function MigrationTargetModal({ asset, onClose, onSelectTarget }: Props) {
  const isBi = asset.type === 'bi';
  const targetOptions = isBi ? BI_TARGET_OPTIONS : ETL_TARGET_OPTIONS;

  // Default to current target or the first option
  const initialTarget = asset.targetTechnology || (targetOptions[0].id as TechnologyName);
  const [selectedTarget, setSelectedTarget] = useState<TechnologyName>(initialTarget);

  const handleConfirm = () => {
    onSelectTarget(asset.id, selectedTarget);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden z-10 theme-transition my-8"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-engine-border)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="px-6 py-5 border-b flex items-center justify-between"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center p-2 border"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'var(--color-border-primary)',
                }}
              >
                <img
                  src={TECHNOLOGY_LOGOS[asset.technology]}
                  alt={asset.technology}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Configure Target Migration Platform
                </h3>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  Asset: <span className="font-semibold text-[var(--color-text-primary)]">{asset.name}</span> ({asset.businessArea})
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors border"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
                e.currentTarget.style.backgroundColor = 'var(--color-surface)';
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Options List */}
          <div className="p-6 space-y-3 max-h-[420px] overflow-y-auto">
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
              Available Destination Architectures
            </p>

            {targetOptions.map((option) => {
              const isSelected = selectedTarget === option.id;
              const isSourceTech = asset.technology === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedTarget(option.id)}
                  className="rounded-xl border p-4 cursor-pointer transition-all duration-200 relative"
                  style={{
                    backgroundColor: isSelected
                      ? 'var(--color-accent-subtle)'
                      : 'var(--color-surface)',
                    borderColor: isSelected
                      ? 'var(--color-accent)'
                      : 'var(--color-border-primary)',
                    boxShadow: isSelected
                      ? '0 0 0 2px var(--color-accent-glow)'
                      : '0 1px 3px var(--color-card-shadow)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-accent)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--color-border-primary)';
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center p-1.5 border shrink-0"
                        style={{
                          backgroundColor: 'var(--color-bg-tertiary)',
                          borderColor: 'var(--color-border-primary)',
                        }}
                      >
                        <img
                          src={TECHNOLOGY_LOGOS[option.id]}
                          alt={option.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            {option.name}
                          </h4>
                          {option.recommended && (
                            <span
                              className="text-[9px] font-bold px-2 py-0.5 rounded-full border text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                            >
                              Recommended
                            </span>
                          )}
                          {isSourceTech && (
                            <span
                              className="text-[9px] font-bold px-2 py-0.5 rounded-full border"
                              style={{
                                color: 'var(--color-text-tertiary)',
                                backgroundColor: 'var(--color-bg-tertiary)',
                                borderColor: 'var(--color-border-primary)',
                              }}
                            >
                              Current Source
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          {option.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Radio circle */}
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        borderColor: isSelected ? 'var(--color-accent)' : 'var(--color-border-secondary)',
                        backgroundColor: isSelected ? 'var(--color-accent)' : 'transparent',
                      }}
                    >
                      {isSelected && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
                    </div>
                  </div>

                  {/* Compatibility Pill & Features */}
                  <div className="mt-3 pt-3 border-t flex flex-col gap-1.5" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="flex items-center gap-2 mb-1">
                      <ShieldCheck size={13} className="text-emerald-500" />
                      <span className="text-[11px] font-semibold text-emerald-500">
                        {option.compatibilityScore} Architectural Compatibility
                      </span>
                    </div>
                    {option.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--color-text-secondary)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div
            className="px-6 py-4 border-t flex items-center justify-between gap-3 bg-[var(--color-surface)]"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer border transition-colors"
              style={{
                backgroundColor: 'transparent',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all border"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 78, 11, 0.20) 0%, rgba(251, 78, 11, 0.08) 100%)',
                borderColor: 'color-mix(in srgb, var(--color-accent) 45%, var(--color-border-primary))',
                color: 'var(--color-accent)',
                boxShadow: '0 2px 12px rgba(251, 78, 11, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(251, 78, 11, 0.32) 0%, rgba(251, 78, 11, 0.14) 100%)';
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(251, 78, 11, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(251, 78, 11, 0.20) 0%, rgba(251, 78, 11, 0.08) 100%)';
                e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-accent) 45%, var(--color-border-primary))';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(251, 78, 11, 0.15)';
              }}
            >
              Confirm Target: {selectedTarget}
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
