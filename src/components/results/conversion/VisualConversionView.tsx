import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  FileCode,
  Layers,
} from 'lucide-react';
import { visualConversions } from '../../../data/migrationData';
import { TECHNOLOGY_LOGOS } from '../../../data/discoveryData';

export default function VisualConversionView() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set(['viz1', 'viz2']));
  const [specExpandedId, setSpecExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ── Visual Conversion Intro & Header ── */}
      <div className="p-4 rounded-xl border bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-3" style={{ borderColor: 'var(--color-border-primary)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center p-2 border shrink-0"
            style={{
              backgroundColor: 'var(--color-accent-subtle)',
              borderColor: 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))',
              color: 'var(--color-accent)',
            }}
          >
            <LayoutDashboard size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Visual Inventory & Canvas Shelf Mapping
            </h3>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              Automated worksheet mark-to-visual encoding translation ({visualConversions.length} worksheets converted)
            </p>
          </div>
        </div>
      </div>

      {/* ── Worksheet Cards ── */}
      <div className="space-y-4">
        {visualConversions.map((viz) => {
          const isExpanded = expandedIds.has(viz.id);
          const isSpecOpen = specExpandedId === viz.id;

          return (
            <motion.div
              key={viz.id}
              layout
              className="rounded-xl border overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-primary)',
                boxShadow: '0 1px 4px var(--color-card-shadow)',
              }}
            >
              {/* Header Bar */}
              <div
                onClick={() => toggleCard(viz.id)}
                className="px-5 py-4 cursor-pointer flex flex-wrap items-center justify-between gap-3 border-b"
                style={{
                  borderColor: isExpanded ? 'var(--color-border-subtle)' : 'transparent',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 text-[var(--color-accent)]"
                    style={{
                      backgroundColor: 'var(--color-accent-subtle)',
                      borderColor: 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))',
                    }}
                  >
                    <Layers size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
                      {viz.worksheetName}
                    </h4>
                    <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                      Asset: <strong className="text-[var(--color-text-secondary)]">{viz.assetName}</strong> · {viz.sourceTechnology} → {viz.targetTechnology}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSpecExpandedId(isSpecOpen ? null : viz.id);
                      setExpandedIds((prev) => new Set(prev).add(viz.id));
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer transition-colors"
                    style={{
                      background:
                        isSpecOpen
                          ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                          : 'var(--color-bg-tertiary)',
                      borderColor:
                        isSpecOpen
                          ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                          : 'var(--color-border-primary)',
                      color: isSpecOpen ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      boxShadow: isSpecOpen ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                    }}
                  >
                    <FileCode size={12} />
                    <span>XML / Spec</span>
                  </button>
                  <button
                    type="button"
                    className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>
              </div>

              {/* Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 space-y-4"
                  >
                    {/* Shelf Mapping Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Left: Source Visual Encodings */}
                      <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--color-bg-tertiary)', borderColor: 'var(--color-border-primary)' }}>
                        <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                          <img src={TECHNOLOGY_LOGOS[viz.sourceTechnology]} alt={viz.sourceTechnology} className="w-3.5 h-3.5 object-contain" />
                          <h5 className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                            Source Visual Definition ({viz.sourceTechnology})
                          </h5>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase block mb-1">
                              Rows / Dimension Shelf
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {viz.sourceVisual.rows.map((r, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-[var(--color-surface)] border text-[var(--color-text-primary)] font-mono text-[11px]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase block mb-1">
                              Columns / Metric Shelf
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {viz.sourceVisual.columns.map((c, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-[var(--color-surface)] border text-[var(--color-text-primary)] font-mono text-[11px]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-xs pt-1">
                          <span className="text-[10px] font-semibold text-[var(--color-text-tertiary)] uppercase block mb-1">
                            Filters & Context
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {viz.sourceVisual.filters.map((f, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-[var(--color-surface)] border text-[var(--color-text-secondary)] text-[11px]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Target Visual Encodings */}
                      <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--color-accent-subtle)', borderColor: 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))' }}>
                        <div className="flex items-center gap-2 pb-2 border-b" style={{ borderColor: 'color-mix(in srgb, var(--color-accent) 20%, var(--color-border-subtle))' }}>
                          <img src={TECHNOLOGY_LOGOS[viz.targetTechnology]} alt={viz.targetTechnology} className="w-3.5 h-3.5 object-contain" />
                          <h5 className="text-xs font-bold" style={{ color: 'var(--color-accent)' }}>
                            Target Visual Encodings ({viz.targetTechnology})
                          </h5>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] font-semibold text-[var(--color-accent)] uppercase block mb-1">
                              Target Rows / Category
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {viz.targetVisual.rowsShelf.map((r, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-[var(--color-surface)] border font-mono text-[11px] text-[var(--color-text-primary)]" style={{ borderColor: 'var(--color-accent)' }}>
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-semibold text-[var(--color-accent)] uppercase block mb-1">
                              Target Columns / Values
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {viz.targetVisual.columnsShelf.map((c, i) => (
                                <span key={i} className="px-2 py-0.5 rounded bg-[var(--color-surface)] border font-mono text-[11px] text-[var(--color-text-primary)]" style={{ borderColor: 'var(--color-accent)' }}>
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-xs pt-1">
                          <span className="text-[10px] font-semibold text-[var(--color-accent)] uppercase block mb-1">
                            Slicers & Cross-Filtering
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {viz.targetVisual.slicers.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-[var(--color-surface)] border text-[var(--color-text-secondary)] text-[11px]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spec Drawer if opened */}
                    <AnimatePresence>
                      {isSpecOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="rounded-xl border p-4 bg-[var(--color-bg-tertiary)] space-y-2"
                          style={{ borderColor: 'var(--color-border-primary)' }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold" style={{ color: 'var(--color-text-primary)' }}>
                              Synthesized Visual XML / JSON Specification
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopy(viz.targetVisual.xmlSpec, viz.id)}
                              className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)] hover:underline cursor-pointer"
                            >
                              {copiedId === viz.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                              <span>{copiedId === viz.id ? 'Copied' : 'Copy Spec'}</span>
                            </button>
                          </div>
                          <pre className="font-mono text-xs p-3 rounded-lg bg-[var(--color-surface)] border overflow-x-auto text-[var(--color-text-primary)] leading-relaxed" style={{ borderColor: 'var(--color-border-subtle)' }}>
                            <code>{viz.targetVisual.xmlSpec}</code>
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
