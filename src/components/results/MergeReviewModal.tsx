import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitMerge, TrendingUp, ArrowRight, Calendar, Users, Database } from 'lucide-react';
import type { Recommendation } from '../../data/rationalizationData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';
import EmailNotificationModal from './EmailNotificationModal';

/* ─────────────────────────────────────────────────────────
 * MergeReviewModal — side-by-side consolidation comparison
 *
 * Adapted from the reference BI Compass merger modal:
 * - Two columns: Source View ↔ Target View
 * - KPIs with shared highlighting
 * - Tables with shared highlighting
 * - Owner / metadata / audience display
 * - AI Rationale section
 * - Footer: Cancel + Apply Merger → email modal
 * ───────────────────────────────────────────────────────── */

interface Props {
  rec: Recommendation;
  onClose: () => void;
  onToast: (message: string) => void;
}

export default function MergeReviewModal({ rec, onClose, onToast }: Props) {
  const [showEmail, setShowEmail] = useState(false);

  const source = rec.assets[0];
  const target = rec.assets[1];
  const kpis = rec.kpis || [];
  const tables = rec.tables || [];
  const commonKpis = new Set(rec.commonKpis || []);
  const commonTables = new Set(rec.commonTables || []);
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
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#F59E0B15' }}
              >
                <GitMerge size={20} style={{ color: '#F59E0B' }} />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>
                  Consolidation Merger Review
                </h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  Compare metrics, data sources, and target audiences side-by-side to review consolidating these views.
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
            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Source Column */}
              <div
                className="rounded-2xl border p-6 space-y-5 flex flex-col"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="pb-3 flex justify-between items-start gap-2" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#F59E0B' }}>Source View</span>
                    <h4 className="text-lg font-bold mt-1" style={{ color: 'var(--color-text-primary)' }}>
                      {source?.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {source && (
                        <img src={TECHNOLOGY_LOGOS[source.technology]} alt={source.technology} className="w-4 h-4" />
                      )}
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>{source?.technology}</span>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-semibold shrink-0 px-2.5 py-0.5 rounded-md border"
                    style={{ color: '#F59E0B', backgroundColor: '#F59E0B15', borderColor: '#F59E0B30' }}
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
                    {tables.map((t) => {
                      const isCommon = commonTables.has(t);
                      return (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-lg border transition-all font-medium"
                          style={{
                            backgroundColor: isCommon ? '#F59E0B15' : 'var(--color-surface)',
                            color: isCommon ? '#F59E0B' : 'var(--color-text-tertiary)',
                            borderColor: isCommon ? '#F59E0B30' : 'var(--color-border-subtle)',
                          }}
                        >
                          {t}
                        </span>
                      );
                    })}
                    {tables.length === 0 && <span className="text-xs italic" style={{ color: 'var(--color-text-tertiary)' }}>No tables resolved</span>}
                  </div>
                </div>

                {/* KPIs */}
                <div className="space-y-1.5">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>Extracted KPIs</h5>
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                    {[...kpis].sort((a, b) => (commonKpis.has(a) ? 1 : 0) - (commonKpis.has(b) ? 1 : 0)).map((k) => {
                      const isCommon = commonKpis.has(k);
                      return (
                        <div
                          key={k}
                          className="p-2.5 rounded-lg flex items-center justify-between text-xs transition-all border"
                          style={{
                            backgroundColor: isCommon ? '#F59E0B10' : 'var(--color-surface)',
                            color: isCommon ? '#F59E0B' : 'var(--color-text-secondary)',
                            borderColor: isCommon ? '#F59E0B30' : 'var(--color-border-subtle)',
                            fontWeight: isCommon ? 500 : 400,
                          }}
                        >
                          <span>{k}</span>
                          {isCommon && (
                            <span
                              className="text-[9px] font-bold px-2 py-0.5 rounded shrink-0 border"
                              style={{ color: '#F59E0B', backgroundColor: '#F59E0B10', borderColor: '#F59E0B20' }}
                            >
                              SHARED
                            </span>
                          )}
                        </div>
                      );
                    })}
                    {kpis.length === 0 && <span className="text-xs italic" style={{ color: 'var(--color-text-tertiary)' }}>No KPIs resolved</span>}
                  </div>
                </div>
              </div>

              {/* Target Column */}
              <div
                className="rounded-2xl border p-6 space-y-5 flex flex-col"
                style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="pb-3 flex justify-between items-start gap-2" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#22C55E' }}>Target Consolidate View</span>
                    <h4 className="text-lg font-bold mt-1" style={{ color: 'var(--color-text-primary)' }}>
                      {rec.mergeTarget || target?.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {target && (
                        <img src={TECHNOLOGY_LOGOS[target.technology]} alt={target.technology} className="w-4 h-4" />
                      )}
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>{target?.technology}</span>
                    </div>
                  </div>
                  <span
                    className="text-[10px] font-semibold shrink-0 px-2.5 py-0.5 rounded-md border"
                    style={{ color: '#22C55E', backgroundColor: '#22C55E15', borderColor: '#22C55E30' }}
                  >
                    Active Target
                  </span>
                </div>

                {/* Summary box for the rationale */}
                <div
                  className="rounded-xl p-4 border"
                  style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border-subtle)' }}
                >
                  <p className="text-[9px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>Why Consolidate Here</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    This is the recommended consolidation target. All shared KPIs and tables (highlighted in amber) will be unified under this view.
                  </p>
                </div>

                {/* Overlap badge */}
                {rec.overlapPct !== undefined && (
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: 'var(--color-border-subtle)' }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${rec.overlapPct}%`, backgroundColor: '#F59E0B' }}
                      />
                    </div>
                    <span className="text-xs font-bold" style={{ color: '#F59E0B' }}>
                      {rec.overlapPct}% overlap
                    </span>
                  </div>
                )}

                {/* Shared KPIs summary */}
                <div className="space-y-1.5">
                  <h5 className="text-[9px] font-bold uppercase tracking-wider flex items-center gap-1" style={{ color: 'var(--color-text-tertiary)' }}>
                    <TrendingUp size={10} /> Common Connections
                  </h5>
                  {(rec.commonKpis?.length || rec.commonTables?.length) ? (
                    <div
                      className="rounded-xl p-3 space-y-1.5 border"
                      style={{ backgroundColor: '#F59E0B08', borderColor: '#F59E0B15' }}
                    >
                      {rec.commonKpis && rec.commonKpis.length > 0 && (
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          <strong style={{ color: '#F59E0B' }}>Common KPIs:</strong> {rec.commonKpis.join(', ')}
                        </p>
                      )}
                      {rec.commonTables && rec.commonTables.length > 0 && (
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          <strong style={{ color: '#F59E0B' }}>Common Datasources:</strong> {rec.commonTables.join(', ')}
                        </p>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs italic" style={{ color: 'var(--color-text-tertiary)' }}>No common connections detected</span>
                  )}
                </div>

                {/* Action summary */}
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
              </div>
            </div>

            {/* AI Rationale section */}
            <div
              className="rounded-2xl border p-5"
              style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}
            >
              <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 mb-3" style={{ color: 'var(--color-text-primary)' }}>
                <TrendingUp size={16} style={{ color: '#F59E0B' }} /> AI Governance Rationale
              </h4>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{rec.rationale}</p>
            </div>
          </div>

          {/* ── Footer ── */}
          <div
            className="flex items-center justify-between px-6 py-4 border-t shrink-0"
            style={{ borderColor: 'var(--color-border-primary)', backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#F59E0B' }}>
              <TrendingUp size={16} style={{ color: '#F59E0B' }} />
              <span>Consolidating saves 1 redundant server extract refresh schedule</span>
            </div>
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
                className="px-4 py-2 rounded-lg text-sm font-bold cursor-pointer transition-colors text-white flex items-center gap-1.5"
                style={{ backgroundColor: '#F59E0B', boxShadow: '0 4px 12px rgba(245,158,11,0.3)', border: 'none', color: '#0F172A' }}
              >
                Apply Merger <ArrowRight size={14} />
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
            type="merge"
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
