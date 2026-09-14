import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, ArrowRight, ArrowLeft, Download, CheckCircle, AlertTriangle,
  Table2, GitBranch, Code2, FileDown, ChevronDown, ChevronRight, Search,
  FileSpreadsheet, Layers, BarChart3, Eye, Copy, X
} from 'lucide-react';
import {
  tbPbiSummary, tbPbiWorksheets, tbPbiCalculatedFields,
  tbPbiDataTables, tbPbiRelationships, tbPbiDaxConversions, tbPbiExportArtifacts,
} from '../../data/tableauPowerBIData';

/* ─────────────────────────────────────────────────────────
 * TableauPowerBIWorkspace — 4-Step Migration Wizard
 *   1. Data Understanding
 *   2. Model Intelligence
 *   3. DAX Conversion
 *   4. Download
 * ───────────────────────────────────────────────────────── */

const STEPS = [
  { id: 1, label: 'Data Understanding', icon: Database, description: 'Tables, columns & relationships' },
  { id: 2, label: 'Model Intelligence', icon: Layers, description: 'Worksheets & calculated fields' },
  { id: 3, label: 'DAX Conversion', icon: Code2, description: 'Formula translation results' },
  { id: 4, label: 'Download', icon: FileDown, description: 'Export migration artifacts' },
];

interface Props {
  onBack?: () => void;
}

export default function TableauPowerBIWorkspace({ onBack }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [expandedDax, setExpandedDax] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const canGoNext = currentStep < 4;
  const canGoPrev = currentStep > 1;

  /* ── DAX filter by category ── */
  const daxCategories = useMemo(() => {
    const cats = new Set(tbPbiDaxConversions.map(d => d.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredDax = useMemo(() => {
    let list = tbPbiDaxConversions;
    if (selectedCategory !== 'All') list = list.filter(d => d.category === selectedCategory);
    if (searchTerm) list = list.filter(d => d.fieldName.toLowerCase().includes(searchTerm.toLowerCase()));
    return list;
  }, [selectedCategory, searchTerm]);

  const daxStats = useMemo(() => ({
    total: tbPbiDaxConversions.length,
    valid: tbPbiDaxConversions.filter(d => d.status === 'valid').length,
    warning: tbPbiDaxConversions.filter(d => d.status === 'warning').length,
    error: tbPbiDaxConversions.filter(d => d.status === 'error').length,
    avgConfidence: Math.round(tbPbiDaxConversions.reduce((a, d) => a + d.confidence, 0) / tbPbiDaxConversions.length),
  }), []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5 pb-12"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-lg border hover:opacity-80 cursor-pointer theme-transition"
              style={{ borderColor: 'var(--color-border-primary)', color: 'var(--color-text-secondary)', backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Tableau → Power BI Migration
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
              {tbPbiSummary.totalDashboards} Dashboards · {tbPbiSummary.totalWorksheets} Worksheets · {tbPbiSummary.totalCalculatedFields} Calculated Fields
            </p>
          </div>
        </div>
      </div>

      {/* ── Step Progress ── */}
      <div
        className="rounded-xl border p-4 theme-transition"
        style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
      >
        <div className="flex items-center gap-2">
          {STEPS.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(step.id)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer theme-transition w-full"
                style={{
                  backgroundColor: currentStep === step.id ? 'var(--color-accent-muted)' : 'transparent',
                  color: currentStep === step.id ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                  border: currentStep === step.id ? '1px solid var(--color-accent)' : '1px solid transparent',
                }}
              >
                <step.icon size={16} />
                <div className="text-left hidden md:block">
                  <div className="text-xs font-semibold">{step.label}</div>
                  <div className="text-[10px] opacity-70">{step.description}</div>
                </div>
              </button>
              {i < STEPS.length - 1 && (
                <ArrowRight size={14} className="mx-1 shrink-0" style={{ color: 'var(--color-text-quaternary)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Step Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {/* ═══ STEP 1: Data Understanding ═══ */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Tables', value: tbPbiDataTables.length, icon: Table2, color: '#3b82f6' },
                  { label: 'Total Rows', value: tbPbiDataTables.reduce((a, t) => a + t.rowCount, 0).toLocaleString(), icon: Database, color: '#8b5cf6' },
                  { label: 'Relationships', value: tbPbiRelationships.length, icon: GitBranch, color: '#10b981' },
                  { label: 'Columns', value: tbPbiDataTables.reduce((a, t) => a + t.columnDetails.length, 0), icon: BarChart3, color: '#f59e0b' },
                ].map(card => (
                  <div
                    key={card.label}
                    className="rounded-xl border p-4 theme-transition"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}20` }}>
                        <card.icon size={16} style={{ color: card.color }} />
                      </div>
                    </div>
                    <div className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>{card.value}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Tables List */}
              <div
                className="rounded-xl border theme-transition"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Data Tables</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
                    {tbPbiDataTables.length} tables
                  </span>
                </div>
                <div className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  {tbPbiDataTables.map(table => (
                    <div key={table.displayName}>
                      <button
                        onClick={() => setExpandedTable(expandedTable === table.displayName ? null : table.displayName)}
                        className="w-full px-5 py-3 flex items-center justify-between hover:opacity-80 cursor-pointer"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        <div className="flex items-center gap-3">
                          <Table2 size={14} style={{ color: 'var(--color-accent)' }} />
                          <span className="font-medium text-sm">{table.displayName}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }}>
                            {table.rowCount.toLocaleString()} rows
                          </span>
                        </div>
                        {expandedTable === table.displayName ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </button>
                      <AnimatePresence>
                        {expandedTable === table.displayName && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr style={{ color: 'var(--color-text-tertiary)' }}>
                                    <th className="text-left py-1.5 font-medium">Column</th>
                                    <th className="text-left py-1.5 font-medium">Type</th>
                                    <th className="text-left py-1.5 font-medium">Sample Values</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {table.columnDetails.map(col => (
                                    <tr key={col.name} className="border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                      <td className="py-1.5 font-mono text-[11px]" style={{ color: 'var(--color-text-primary)' }}>{col.name}</td>
                                      <td className="py-1.5">
                                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
                                          {col.dataType}
                                        </span>
                                      </td>
                                      <td className="py-1.5" style={{ color: 'var(--color-text-tertiary)' }}>{col.sampleValues.join(', ')}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Relationships */}
              <div
                className="rounded-xl border theme-transition"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Table Relationships</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ color: 'var(--color-text-tertiary)' }}>
                        <th className="text-left px-5 py-2 font-medium">From Table</th>
                        <th className="text-left px-5 py-2 font-medium">Column</th>
                        <th className="text-center px-5 py-2 font-medium">→</th>
                        <th className="text-left px-5 py-2 font-medium">To Table</th>
                        <th className="text-left px-5 py-2 font-medium">Column</th>
                        <th className="text-left px-5 py-2 font-medium">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tbPbiRelationships.map((rel, i) => (
                        <tr key={i} className="border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                          <td className="px-5 py-2 font-mono text-[11px]" style={{ color: 'var(--color-accent)' }}>{rel.fromTable}</td>
                          <td className="px-5 py-2 font-mono text-[11px]" style={{ color: 'var(--color-text-primary)' }}>{rel.fromColumn}</td>
                          <td className="px-5 py-2 text-center"><GitBranch size={12} style={{ color: 'var(--color-text-quaternary)' }} /></td>
                          <td className="px-5 py-2 font-mono text-[11px]" style={{ color: 'var(--color-accent)' }}>{rel.toTable}</td>
                          <td className="px-5 py-2 font-mono text-[11px]" style={{ color: 'var(--color-text-primary)' }}>{rel.toColumn}</td>
                          <td className="px-5 py-2">
                            <span className="px-1.5 py-0.5 rounded text-[10px]" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
                              {rel.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══ STEP 2: Model Intelligence ═══ */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {/* Worksheet Cards */}
              <div
                className="rounded-xl border theme-transition"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="px-5 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Worksheets ({tbPbiWorksheets.length})</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                  {tbPbiWorksheets.map(ws => (
                    <div
                      key={ws.name}
                      className="rounded-lg border p-3 theme-transition"
                      style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-subtle)' }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 size={14} style={{ color: 'var(--color-accent)' }} />
                        <span className="font-medium text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>{ws.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
                          {ws.chartType}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: '#8b5cf620', color: '#8b5cf6' }}>
                          {ws.datasource}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        <div style={{ color: 'var(--color-text-tertiary)' }}>
                          <span className="font-medium">Dims:</span> {ws.dimensions.join(', ')}
                        </div>
                        <div style={{ color: 'var(--color-text-tertiary)' }}>
                          <span className="font-medium">Measures:</span> {ws.measures.join(', ')}
                        </div>
                        <div style={{ color: 'var(--color-text-tertiary)' }}>
                          <span className="font-medium">Filters:</span> {ws.filters.join(', ')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculated Fields */}
              <div
                className="rounded-xl border theme-transition"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="px-5 py-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <h3 className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>Calculated Fields ({tbPbiCalculatedFields.length})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr style={{ color: 'var(--color-text-tertiary)' }}>
                        <th className="text-left px-5 py-2 font-medium">Field Name</th>
                        <th className="text-left px-5 py-2 font-medium">Role</th>
                        <th className="text-left px-5 py-2 font-medium">Type</th>
                        <th className="text-left px-5 py-2 font-medium">Formula</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tbPbiCalculatedFields.map(cf => (
                        <tr key={cf.name} className="border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                          <td className="px-5 py-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>{cf.caption}</td>
                          <td className="px-5 py-2">
                            <span className="px-1.5 py-0.5 rounded text-[10px]" style={{
                              backgroundColor: cf.role === 'measure' ? '#3b82f620' : '#10b98120',
                              color: cf.role === 'measure' ? '#3b82f6' : '#10b981',
                            }}>{cf.role}</span>
                          </td>
                          <td className="px-5 py-2 font-mono text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>{cf.datatype}</td>
                          <td className="px-5 py-2 font-mono text-[10px] max-w-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>{cf.formula}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ═══ STEP 3: DAX Conversion ═══ */}
          {currentStep === 3 && (
            <div className="space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                  { label: 'Total', value: daxStats.total, color: '#6366f1' },
                  { label: 'Valid', value: daxStats.valid, color: '#10b981' },
                  { label: 'Warning', value: daxStats.warning, color: '#f59e0b' },
                  { label: 'Error', value: daxStats.error, color: '#ef4444' },
                  { label: 'Avg Confidence', value: `${daxStats.avgConfidence}%`, color: '#3b82f6' },
                ].map(s => (
                  <div
                    key={s.label}
                    className="rounded-xl border p-3 text-center theme-transition"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
                  >
                    <div className="text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Filter + Search */}
              <div className="flex flex-wrap items-center gap-2">
                {daxCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer theme-transition"
                    style={{
                      backgroundColor: selectedCategory === cat ? 'var(--color-accent-muted)' : 'var(--color-bg-secondary)',
                      color: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                      border: selectedCategory === cat ? '1px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                    }}
                  >
                    {cat}
                  </button>
                ))}
                <div className="relative ml-auto">
                  <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-quaternary)' }} />
                  <input
                    type="text"
                    placeholder="Search fields..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 rounded-lg border text-xs w-48 theme-transition"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border-primary)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>
              </div>

              {/* DAX Conversion Cards */}
              <div className="space-y-2">
                {filteredDax.map(dax => (
                  <div
                    key={dax.id}
                    className="rounded-xl border theme-transition overflow-hidden"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
                  >
                    <button
                      onClick={() => setExpandedDax(expandedDax === dax.id ? null : dax.id)}
                      className="w-full px-4 py-3 flex items-center justify-between cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {dax.status === 'valid' ? (
                          <CheckCircle size={16} style={{ color: '#10b981' }} />
                        ) : dax.status === 'warning' ? (
                          <AlertTriangle size={16} style={{ color: '#f59e0b' }} />
                        ) : (
                          <X size={16} style={{ color: '#ef4444' }} />
                        )}
                        <span className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{dax.fieldName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-tertiary)' }}>
                          {dax.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono" style={{ color: dax.confidence >= 90 ? '#10b981' : dax.confidence >= 80 ? '#f59e0b' : '#ef4444' }}>
                          {dax.confidence}%
                        </span>
                        {expandedDax === dax.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </div>
                    </button>
                    <AnimatePresence>
                      {expandedDax === dax.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 space-y-3">
                            {/* Source Formula */}
                            <div>
                              <div className="text-[10px] font-semibold mb-1" style={{ color: 'var(--color-text-tertiary)' }}>TABLEAU SOURCE</div>
                              <div className="relative">
                                <pre className="text-[11px] font-mono p-3 rounded-lg overflow-x-auto" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
                                  {dax.sourceFormula}
                                </pre>
                              </div>
                            </div>
                            {/* DAX Formula */}
                            <div>
                              <div className="text-[10px] font-semibold mb-1 flex items-center justify-between" style={{ color: 'var(--color-text-tertiary)' }}>
                                <span>POWER BI DAX</span>
                                <button
                                  onClick={() => handleCopy(dax.daxFormula, dax.id)}
                                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] hover:opacity-80 cursor-pointer"
                                  style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-accent)' }}
                                >
                                  <Copy size={10} />
                                  {copiedId === dax.id ? 'Copied!' : 'Copy'}
                                </button>
                              </div>
                              <pre className="text-[11px] font-mono p-3 rounded-lg overflow-x-auto whitespace-pre-wrap" style={{ backgroundColor: '#10b98110', color: '#10b981', border: '1px solid #10b98130' }}>
                                {dax.daxFormula}
                              </pre>
                            </div>
                            {/* Warnings */}
                            {dax.warnings.length > 0 && (
                              <div className="flex items-start gap-2 p-2 rounded-lg" style={{ backgroundColor: '#f59e0b10', border: '1px solid #f59e0b30' }}>
                                <AlertTriangle size={12} className="shrink-0 mt-0.5" style={{ color: '#f59e0b' }} />
                                <div className="text-[11px] space-y-0.5" style={{ color: '#f59e0b' }}>
                                  {dax.warnings.map((w, i) => <div key={i}>{w}</div>)}
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══ STEP 4: Download ═══ */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div
                className="rounded-xl border p-6 text-center theme-transition"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#10b98120' }}>
                  <CheckCircle size={32} style={{ color: '#10b981' }} />
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Migration Complete</h2>
                <p className="text-sm mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                  {daxStats.valid} of {daxStats.total} DAX conversions validated successfully
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                  Average confidence: {daxStats.avgConfidence}%
                </p>
              </div>

              {/* Artifact Download Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tbPbiExportArtifacts.map(art => (
                  <div
                    key={art.id}
                    className="rounded-xl border p-4 flex items-center justify-between theme-transition"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                        backgroundColor: art.type === 'excel' ? '#10b98120' : art.type === 'bim' ? '#3b82f620' : art.type === 'data' ? '#8b5cf620' : '#f59e0b20',
                      }}>
                        {art.type === 'excel' ? <FileSpreadsheet size={18} style={{ color: '#10b981' }} /> :
                         art.type === 'bim' ? <Code2 size={18} style={{ color: '#3b82f6' }} /> :
                         art.type === 'data' ? <Database size={18} style={{ color: '#8b5cf6' }} /> :
                         <Eye size={18} style={{ color: '#f59e0b' }} />}
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{art.fileName}</div>
                        <div className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>{art.description}</div>
                        <div className="text-[10px] mt-0.5" style={{ color: 'var(--color-text-quaternary)' }}>{art.size}</div>
                      </div>
                    </div>
                    <button
                      className="p-2 rounded-lg border hover:opacity-80 cursor-pointer theme-transition"
                      style={{ borderColor: 'var(--color-border-primary)', color: 'var(--color-accent)', backgroundColor: 'var(--color-bg-secondary)' }}
                    >
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Navigation Buttons ── */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={() => canGoPrev && setCurrentStep(currentStep - 1)}
          disabled={!canGoPrev}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer theme-transition"
          style={{
            borderColor: 'var(--color-border-primary)',
            color: canGoPrev ? 'var(--color-text-primary)' : 'var(--color-text-quaternary)',
            backgroundColor: 'var(--color-bg-secondary)',
            opacity: canGoPrev ? 1 : 0.4,
          }}
        >
          <ArrowLeft size={14} /> Previous
        </button>
        {canGoNext ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer"
            style={{ backgroundColor: 'var(--color-accent)', color: '#fff' }}
          >
            Next <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer"
            style={{ backgroundColor: '#10b981', color: '#fff' }}
          >
            <CheckCircle size={14} /> Complete Migration
          </button>
        )}
      </div>
    </motion.div>
  );
}
