import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, Database } from 'lucide-react';
import type { Recommendation } from '../../data/rationalizationData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';
import EmailNotificationModal from './EmailNotificationModal';

/* ─────────────────────────────────────────────────────────
 * DecommissionReviewModal — detailed decommission review
 *
 * Two columns:
 * Left  — Asset details (tech, owner, KPIs, tables, dependencies)
 * Right — Governance rationale (reasons, impact alert, tags, action)
 * Footer — Cancel + Apply Decommission → email modal
 * ───────────────────────────────────────────────────────── */

interface Props {
  rec: Recommendation;
  onClose: () => void;
  onToast: (message: string) => void;
}

export default function DecommissionReviewModal({ rec, onClose, onToast }: Props) {
  const [showEmail, setShowEmail] = useState(false);

  const asset = rec.assets[0];
  const kpis = rec.kpis || [];
  const tables = rec.tables || [];
  const userGroups = rec.userGroups || [];

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="rounded-2xl border w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden my-4"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b shrink-0"
            style={{ borderColor: 'var(--color-border-primary)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{
                  backgroundColor: 'var(--color-accent-subtle)',
                  borderColor: 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))',
                }}
              >
                <Trash2 size={18} style={{ color: 'var(--color-accent)' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                  Decommission Governance Review
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  Review user groups, referenced tables, KPIs, and dependencies before decommissioning this view.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg cursor-pointer transition-colors"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* ── Content ── */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Left — Asset Details */}
              <div
                className="rounded-2xl border p-6 space-y-5 flex flex-col"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="pb-3 flex justify-between items-start gap-2" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                      style={{
                        color: 'var(--color-accent)',
                        backgroundColor: 'var(--color-accent-subtle)',
                        borderColor: 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))',
                      }}
                    >
                      Decommission Candidate
                    </span>
                    <h4 className="text-lg font-bold mt-2 break-words" style={{ color: 'var(--color-text-primary)' }}>
                      {asset?.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {asset && (
                        <img src={TECHNOLOGY_LOGOS[asset.technology]} alt={asset.technology} className="w-4 h-4" />
                      )}
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>{asset?.technology}</span>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-semibold shrink-0 px-2.5 py-0.5 rounded-md border"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border-primary)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {rec.lastViewed || 'N/A'}
                  </span>
                </div>

                {/* Owner */}
                {rec.owner && (
                  <div className="space-y-1.5">
                    <h5 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Owner</h5>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{rec.owner}</p>
                  </div>
                )}

                {/* Audience */}
                <div className="space-y-1.5">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Audience Groups</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {userGroups.length > 0 ? userGroups.map((g) => (
                      <span
                        key={g}
                        className="text-xs px-2.5 py-1 rounded-lg border"
                        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
                      >
                        {g}
                      </span>
                    )) : (
                      <span className="text-xs italic" style={{ color: 'var(--color-text-tertiary)' }}>No audience assigned</span>
                    )}
                  </div>
                </div>

                {/* Tables */}
                <div className="space-y-1.5">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                    <Database size={10} className="inline mr-1" />Referenced Tables
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {tables.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-lg border"
                        style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text-tertiary)', borderColor: 'var(--color-border-subtle)' }}
                      >
                        {t}
                      </span>
                    ))}
                    {tables.length === 0 && <span className="text-xs italic" style={{ color: 'var(--color-text-tertiary)' }}>No tables resolved</span>}
                  </div>
                </div>

                {/* KPIs */}
                <div className="space-y-1.5">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Extracted KPIs</h5>
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                    {kpis.map((k) => (
                      <div
                        key={k}
                        className="p-2.5 rounded-lg text-xs border"
                        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
                      >
                        {k}
                      </div>
                    ))}
                    {kpis.length === 0 && <span className="text-xs italic" style={{ color: 'var(--color-text-tertiary)' }}>No KPIs resolved</span>}
                  </div>
                </div>

                {/* Dependent asset (cascade) */}
                {rec.dependentAsset && (
                  <div className="space-y-1.5">
                    <h5 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Cascade Dependency</h5>
                    <div
                      className="flex items-center gap-2 p-2.5 rounded-lg border text-xs"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <img src={TECHNOLOGY_LOGOS[rec.dependentAsset.technology]} alt={rec.dependentAsset.technology} className="w-4 h-4" />
                      <span className="font-semibold">{rec.dependentAsset.name}</span>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>({rec.dependentAsset.technology})</span>
                      <span
                        className="ml-auto text-[9px] font-bold uppercase px-1.5 py-0.5 rounded border"
                        style={{
                          backgroundColor: 'var(--color-accent-subtle)',
                          borderColor: 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))',
                          color: 'var(--color-accent)',
                        }}
                      >
                        CASCADE
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right — Governance Rationale */}
              <div
                className="rounded-2xl border p-6 space-y-5 flex flex-col justify-between"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="space-y-5">
                  <div className="pb-3" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                      style={{
                        color: 'var(--color-accent)',
                        backgroundColor: 'var(--color-accent-subtle)',
                        borderColor: 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))',
                      }}
                    >
                      Governance Rationale
                    </span>
                    <h4 className="text-sm font-semibold mt-2" style={{ color: 'var(--color-text-secondary)' }}>Why Decommission?</h4>
                  </div>

                  {/* Summary */}
                  {rec.summary && (
                    <div
                      className="rounded-xl p-4 border space-y-1.5"
                      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}
                    >
                      <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>AI Summary</p>
                      <p className="text-xs leading-relaxed italic" style={{ color: 'var(--color-text-secondary)' }}>"{rec.summary}"</p>
                    </div>
                  )}

                  {/* Rationale as violations list */}
                  <div
                    className="rounded-xl p-4 border"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Platform Cleanliness Violations</p>
                    <div className="space-y-2">
                      <div className="text-xs flex items-start gap-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                        <span className="shrink-0 font-bold" style={{ color: 'var(--color-accent)' }}>▲</span>
                        <span>{rec.rationale}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div
                    className="rounded-xl p-4 border"
                    style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Recommended Action</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{rec.action}</p>
                  </div>

                  {/* Tags */}
                  {rec.tags && rec.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {rec.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: 'var(--color-bg-elevated)', color: 'var(--color-text-tertiary)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Impact Alert */}
                  <div
                    className="rounded-xl p-4 border text-xs leading-relaxed"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border-primary)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    <strong style={{ color: 'var(--color-text-primary)' }}>Governance Impact Alert:</strong> This action will notify all active subscribers, disconnect the datasource connections, and archive the metadata in the repository index.
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ── Footer ── */}
          <div
            className="flex items-center justify-between px-6 py-4 border-t shrink-0"
            style={{ borderColor: 'var(--color-border-primary)', backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
              Archiving this view frees database execution threads and server space
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors border"
                style={{ borderColor: 'var(--color-border-primary)', color: 'var(--color-text-secondary)' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowEmail(true)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold cursor-pointer transition-shadow text-white flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  boxShadow: '0 4px 14px var(--color-accent-glow)',
                  border: 'none',
                }}
              >
                Apply Decommission <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Email modal layer */}
      <AnimatePresence>
        {showEmail && (
          <EmailNotificationModal
            rec={rec}
            type="decommission"
            onClose={() => setShowEmail(false)}
            onSend={(msg) => {
              setShowEmail(false);
              onClose();
              onToast(msg);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
