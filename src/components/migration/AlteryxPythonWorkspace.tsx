import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Download, CheckCircle, AlertTriangle,
  Search, ChevronDown, ChevronRight, Copy,
  Code2, FileDown, Database, Layers, GitBranch,
  FileText, Settings, Workflow, Terminal
} from 'lucide-react';
import {
  altPySummary, altPyWorkflows, altPyToolConversions,
  altPyCodeBlocks, altPyExportArtifacts,
} from '../../data/alteryxPythonData';

/* ─────────────────────────────────────────────────────────
 * AlteryxPythonWorkspace — 3-Tab Workspace
 *   Tab 1: Workflow Analysis — browse workflows + tool mappings
 *   Tab 2: Code Conversion — view generated Python code
 *   Tab 3: Export — download scripts + packages
 * ───────────────────────────────────────────────────────── */

const TABS = [
  { id: 'analysis', label: 'Workflow Analysis', icon: Workflow },
  { id: 'code', label: 'Code Conversion', icon: Code2 },
  { id: 'export', label: 'Export', icon: FileDown },
] as const;

type TabId = typeof TABS[number]['id'];

interface Props {
  onBack?: () => void;
}

export default function AlteryxPythonWorkspace({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('analysis');
  const [expandedWf, setExpandedWf] = useState<string | null>(null);
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredWorkflows = useMemo(() => {
    if (!searchTerm) return altPyWorkflows;
    return altPyWorkflows.filter(wf => wf.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const complexityColor = (c: string) =>
    c === 'Low' ? '#10b981' : c === 'Medium' ? '#f59e0b' : '#ef4444';

  const statusIcon = (s: string) =>
    s === 'converted' ? <CheckCircle size={14} style={{ color: '#10b981' }} /> :
    s === 'review' ? <AlertTriangle size={14} style={{ color: '#f59e0b' }} /> :
    <Settings size={14} style={{ color: '#ef4444' }} />;

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
              Alteryx → Python Migration
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
              {altPySummary.totalWorkflows} Workflows · {altPySummary.totalTools} Tools · {altPySummary.avgConfidence}% Avg Confidence
            </p>
          </div>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Converted Tools', value: altPySummary.convertedTools, total: altPySummary.totalTools, color: '#10b981' },
          { label: 'Manual Review', value: altPySummary.manualReviewTools, total: altPySummary.totalTools, color: '#f59e0b' },
          { label: 'Failed', value: altPySummary.failedTools, total: altPySummary.totalTools, color: '#ef4444' },
          { label: 'Output Scripts', value: altPySummary.totalOutputScripts, total: altPySummary.totalWorkflows, color: '#3b82f6' },
        ].map(s => (
          <div
            key={s.label}
            className="rounded-xl border p-4 theme-transition"
            style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
          >
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{s.label}</div>
            <div className="w-full h-1.5 rounded-full mt-2" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
              <div className="h-full rounded-full" style={{ width: `${(s.value / s.total) * 100}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* ── Tab Bar ── */}
      <div className="flex items-center gap-1 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium cursor-pointer theme-transition border-b-2"
            style={{
              borderColor: activeTab === tab.id ? 'var(--color-accent)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
            }}
          >
            <tab.icon size={15} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* ═══ TAB 1: Workflow Analysis ═══ */}
          {activeTab === 'analysis' && (
            <div className="space-y-3">
              {/* Search */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-quaternary)' }} />
                  <input
                    type="text"
                    placeholder="Search workflows..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm theme-transition"
                    style={{
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderColor: 'var(--color-border-primary)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>
              </div>

              {/* Workflow Cards */}
              {filteredWorkflows.map(wf => (
                <div
                  key={wf.id}
                  className="rounded-xl border theme-transition overflow-hidden"
                  style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
                >
                  <button
                    onClick={() => setExpandedWf(expandedWf === wf.id ? null : wf.id)}
                    className="w-full px-4 py-3.5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {statusIcon(wf.status)}
                      <div className="text-left">
                        <div className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{wf.name}</div>
                        <div className="text-[11px] flex items-center gap-2 mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                          <span>{wf.toolCount} tools</span>
                          <span>·</span>
                          <span style={{ color: complexityColor(wf.complexity) }}>{wf.complexity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono" style={{ color: wf.conversionConfidence >= 90 ? '#10b981' : wf.conversionConfidence >= 80 ? '#f59e0b' : '#ef4444' }}>
                        {wf.conversionConfidence}%
                      </span>
                      {expandedWf === wf.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {expandedWf === wf.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-3">
                          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{wf.description}</p>

                          {/* I/O Connections */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                              <div className="text-[10px] font-semibold mb-1" style={{ color: 'var(--color-text-tertiary)' }}>INPUT CONNECTIONS</div>
                              {wf.inputConnections.map(ic => (
                                <div key={ic} className="text-[11px] flex items-center gap-1.5" style={{ color: 'var(--color-text-primary)' }}>
                                  <Database size={10} style={{ color: '#3b82f6' }} /> {ic}
                                </div>
                              ))}
                            </div>
                            <div className="p-2 rounded-lg" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
                              <div className="text-[10px] font-semibold mb-1" style={{ color: 'var(--color-text-tertiary)' }}>OUTPUT CONNECTIONS</div>
                              {wf.outputConnections.map(oc => (
                                <div key={oc} className="text-[11px] flex items-center gap-1.5" style={{ color: 'var(--color-text-primary)' }}>
                                  <FileText size={10} style={{ color: '#10b981' }} /> {oc}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tool Mappings for this workflow */}
                          <div>
                            <div className="text-[10px] font-semibold mb-1" style={{ color: 'var(--color-text-tertiary)' }}>TOOL CONVERSIONS</div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-xs">
                                <thead>
                                  <tr style={{ color: 'var(--color-text-tertiary)' }}>
                                    <th className="text-left py-1 font-medium">Alteryx Tool</th>
                                    <th className="text-center py-1 font-medium">→</th>
                                    <th className="text-left py-1 font-medium">Python Equivalent</th>
                                    <th className="text-left py-1 font-medium">Notes</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {altPyToolConversions.filter(tc => tc.workflowId === wf.id).map(tc => (
                                    <tr key={tc.id} className="border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
                                      <td className="py-1.5 font-medium" style={{ color: '#ef4444' }}>{tc.alteryxTool}</td>
                                      <td className="py-1.5 text-center"><GitBranch size={10} style={{ color: 'var(--color-text-quaternary)' }} /></td>
                                      <td className="py-1.5 font-mono text-[10px]" style={{ color: '#10b981' }}>{tc.pythonEquivalent}</td>
                                      <td className="py-1.5 text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>{tc.notes}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* ═══ TAB 2: Code Conversion ═══ */}
          {activeTab === 'code' && (
            <div className="space-y-3">
              {altPyCodeBlocks.map(cb => (
                <div
                  key={cb.id}
                  className="rounded-xl border theme-transition overflow-hidden"
                  style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
                >
                  <button
                    onClick={() => setExpandedCode(expandedCode === cb.id ? null : cb.id)}
                    className="w-full px-4 py-3 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Terminal size={14} style={{ color: '#10b981' }} />
                      <div className="text-left">
                        <div className="font-medium text-sm" style={{ color: 'var(--color-text-primary)' }}>{cb.fileName}</div>
                        <div className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                          {cb.workflowName} · {cb.lineCount} lines
                        </div>
                      </div>
                    </div>
                    {expandedCode === cb.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  <AnimatePresence>
                    {expandedCode === cb.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2">
                          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{cb.description}</p>
                          <div className="relative">
                            <div className="absolute top-2 right-2 z-10">
                              <button
                                onClick={() => handleCopy(cb.code, cb.id)}
                                className="flex items-center gap-1 px-2 py-1 rounded text-[10px] hover:opacity-80 cursor-pointer"
                                style={{ backgroundColor: 'var(--color-bg-primary)', color: 'var(--color-accent)', border: '1px solid var(--color-border-subtle)' }}
                              >
                                <Copy size={10} />
                                {copiedId === cb.id ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                            <pre
                              className="text-[11px] font-mono p-4 rounded-lg overflow-x-auto max-h-[400px] overflow-y-auto"
                              style={{
                                backgroundColor: '#0d1117',
                                color: '#c9d1d9',
                                border: '1px solid #30363d',
                              }}
                            >
                              {cb.code}
                            </pre>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}

          {/* ═══ TAB 3: Export ═══ */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div
                className="rounded-xl border p-6 text-center theme-transition"
                style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
              >
                <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#10b98120' }}>
                  <CheckCircle size={32} style={{ color: '#10b981' }} />
                </div>
                <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>Python Scripts Ready</h2>
                <p className="text-sm" style={{ color: 'var(--color-text-tertiary)' }}>
                  {altPySummary.totalOutputScripts} scripts generated · {altPySummary.estimatedSavingsHrs}hrs estimated savings
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {altPyExportArtifacts.map(art => (
                  <div
                    key={art.id}
                    className="rounded-xl border p-4 flex items-center justify-between theme-transition"
                    style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border-primary)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                        backgroundColor: art.type === 'python' ? '#10b98120' : art.type === 'notebook' ? '#f59e0b20' : art.type === 'requirements' ? '#3b82f620' : '#8b5cf620',
                      }}>
                        {art.type === 'python' ? <Terminal size={18} style={{ color: '#10b981' }} /> :
                         art.type === 'notebook' ? <Code2 size={18} style={{ color: '#f59e0b' }} /> :
                         art.type === 'requirements' ? <Layers size={18} style={{ color: '#3b82f6' }} /> :
                         <FileText size={18} style={{ color: '#8b5cf6' }} />}
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

              <div className="flex justify-end pt-2">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold cursor-pointer"
                  style={{ backgroundColor: '#10b981', color: '#fff' }}
                >
                  <CheckCircle size={14} /> Complete Migration
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
