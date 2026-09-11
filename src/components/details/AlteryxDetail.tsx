import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Workflow,
  Database,
  Clock,
  Settings,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  ArrowRight,
  FileInput,
  FileOutput,
  Cpu,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * AlteryxDetail — full-page detail view for Alteryx ETL
 *
 * ETL workflow perspective: pipeline visualization,
 * tool inventory, input/output connections
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

interface AlteryxTool {
  id: string;
  name: string;
  category: 'Input' | 'Preparation' | 'Join' | 'Parse' | 'Transform' | 'Output';
  description: string;
  configuration: string;
  status: 'valid' | 'warning' | 'error';
}

interface ConnectionInfo {
  id: string;
  name: string;
  type: string;
  details: string;
  direction: 'input' | 'output';
}

interface PipelineStage {
  id: string;
  label: string;
  tools: number;
  icon: typeof FileInput;
  color: string;
}

/* ── Mock data ── */
function getMockData() {
  const tools: AlteryxTool[] = [
    { id: 't1', name: 'Input Data', category: 'Input', description: 'Read from SQL Server claims table', configuration: 'Server: PROD-DB01\\INS · Database: ClaimsDB · Table: dbo.fact_claims', status: 'valid' },
    { id: 't2', name: 'Input Data', category: 'Input', description: 'Read from policy dimension table', configuration: 'Server: PROD-DB01\\INS · Database: PolicyDB · Table: dbo.dim_policy', status: 'valid' },
    { id: 't3', name: 'Select', category: 'Preparation', description: 'Filter columns and rename fields', configuration: 'Selected: 18 of 42 columns · Renamed: 5 fields', status: 'valid' },
    { id: 't4', name: 'Filter', category: 'Preparation', description: 'Active policies only', configuration: 'Expression: [Status] = "Active" AND [Effective_Date] >= "2024-01-01"', status: 'valid' },
    { id: 't5', name: 'Join', category: 'Join', description: 'Join claims to policies', configuration: 'Join on: Claims.policy_id = Policy.policy_id · Type: Left Outer', status: 'valid' },
    { id: 't6', name: 'Multi-Row Formula', category: 'Transform', description: 'Calculate running loss ratio', configuration: 'GroupBy: [Region], [LOB] · Expression: RunningSum([Claim_Amount]) / RunningSum([Premium])', status: 'warning' },
    { id: 't7', name: 'Summarize', category: 'Transform', description: 'Aggregate by business area', configuration: 'GroupBy: Region, LOB, Month · Sum: Claim_Amount, Premium · Count: Claim_ID', status: 'valid' },
    { id: 't8', name: 'RegEx', category: 'Parse', description: 'Extract policy type code', configuration: 'Field: Policy_Number · Expression: ([A-Z]{3})\\d+ · Output: Policy_Type_Code', status: 'valid' },
    { id: 't9', name: 'Output Data', category: 'Output', description: 'Write to Claims Data Mart', configuration: 'Server: ANALYTICS-DW · Database: Insurance_DW · Table: dbo.claims_mart', status: 'valid' },
    { id: 't10', name: 'Output Data', category: 'Output', description: 'Write summary to Tableau extract', configuration: 'File: \\\\share\\tableau\\claims_summary.hyper · Mode: Create/Replace', status: 'valid' },
  ];

  const connections: ConnectionInfo[] = [
    { id: 'c1', name: 'Claims Source Database', type: 'SQL Server', details: 'PROD-DB01\\INS · ClaimsDB · 890K rows', direction: 'input' },
    { id: 'c2', name: 'Policy Dimension', type: 'SQL Server', details: 'PROD-DB01\\INS · PolicyDB · 2.4M rows', direction: 'input' },
    { id: 'c3', name: 'Agent Reference File', type: 'Excel', details: '\\\\share\\reference\\agents.xlsx · 1.2K rows', direction: 'input' },
    { id: 'c4', name: 'Claims Data Mart', type: 'SQL Server', details: 'ANALYTICS-DW · Insurance_DW · Truncate & Load', direction: 'output' },
    { id: 'c5', name: 'Tableau Extract', type: 'Hyper File', details: '\\\\share\\tableau\\claims_summary.hyper', direction: 'output' },
    { id: 'c6', name: 'Audit Log', type: 'CSV', details: '\\\\share\\logs\\etl_claims_{YYYY-MM-DD}.csv', direction: 'output' },
  ];

  const pipelineStages: PipelineStage[] = [
    { id: 's1', label: 'Extract', tools: 3, icon: FileInput, color: '#3B82F6' },
    { id: 's2', label: 'Transform', tools: 4, icon: Cpu, color: '#F59E0B' },
    { id: 's3', label: 'Load', tools: 3, icon: FileOutput, color: '#22C55E' },
  ];

  return { tools, connections, pipelineStages };
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, value, color }: { icon: typeof Workflow; label: string; value: string | number; color: string }) {
  return (
    <div
      className="rounded-xl border p-5 theme-transition"
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)',
        boxShadow: '0 1px 4px var(--color-card-shadow)',
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
            {label}
          </p>
          <p className="text-2xl font-bold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Category badge ── */
function CategoryBadge({ category }: { category: string }) {
  const colors: Record<string, string> = {
    Input: '#3B82F6',
    Preparation: '#8B5CF6',
    Join: '#EC4899',
    Parse: '#06B6D4',
    Transform: '#F59E0B',
    Output: '#22C55E',
  };
  const c = colors[category] || '#6B7280';
  return (
    <span
      className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
      style={{ backgroundColor: `${c}15`, color: c }}
    >
      {category}
    </span>
  );
}

/* ── Status badge ── */
function StatusBadge({ status }: { status: 'valid' | 'warning' | 'error' }) {
  const config = {
    valid: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', icon: CheckCircle2, label: 'OK' },
    warning: { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', icon: AlertTriangle, label: 'Warning' },
    error: { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', icon: AlertTriangle, label: 'Error' },
  }[status];
  const Icon = config.icon;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <Icon size={10} />
      {config.label}
    </span>
  );
}

export default function AlteryxDetail({ asset, onBack }: Props) {
  const { tools, connections, pipelineStages } = getMockData();
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'tools' | 'connections'>('pipeline');

  const logo = TECHNOLOGY_LOGOS[asset.technology];
  const inputConns = connections.filter((c) => c.direction === 'input');
  const outputConns = connections.filter((c) => c.direction === 'output');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* ── Back button ── */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[13px] font-medium mb-5 px-2 py-1 rounded-lg transition-colors duration-150"
        style={{ color: 'var(--color-text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <ArrowLeft size={14} />
        Back to Results
      </button>

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 p-2.5"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <img src={logo} alt="Alteryx" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1
                className="text-xl md:text-2xl font-bold tracking-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {asset.name}
              </h1>
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: 'rgb(34, 197, 94)' }}
              >
                Active
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
              {asset.assetType && (
                <span className="font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
                  {asset.assetType}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Clock size={11} />
                Schedule: Daily 5:30 AM EST
              </span>
              {asset.owner && (
                <span className="flex items-center gap-1">
                  <User size={11} />
                  {asset.owner}
                </span>
              )}
              {asset.lastUpdated && (
                <span className="flex items-center gap-1">
                  <Calendar size={11} />
                  {asset.lastUpdated}
                </span>
              )}
            </div>
            {asset.description && (
              <p className="text-[13px] mt-2 max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {asset.description}
              </p>
            )}
          </div>
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl shrink-0"
          style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#22C55E', fontWeight: 700, fontSize: '0.875rem' }}
        >
          <Play size={14} />
          <span>Last Run: Success</span>
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <StatCard icon={Settings} label="Tool Count" value={tools.length} color="#8B5CF6" />
        <StatCard icon={FileInput} label="Input Sources" value={asset.sourceCount ?? inputConns.length} color="#3B82F6" />
        <StatCard icon={FileOutput} label="Output Targets" value={asset.targetCount ?? outputConns.length} color="#22C55E" />
        <StatCard icon={Clock} label="Avg Runtime" value="4m 32s" color="#F59E0B" />
      </motion.div>

      {/* ── Tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="mb-6"
      >
        <div
          className="flex gap-1 p-1 rounded-xl mb-5"
          style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
        >
          {([
            { key: 'pipeline', label: 'Pipeline Flow', icon: Workflow },
            { key: 'tools', label: 'Tool Inventory', icon: Settings },
            { key: 'connections', label: 'Connections', icon: Database },
          ] as const).map(({ key, label, icon: TabIcon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-[12px] font-semibold transition-all duration-200"
              style={{
                backgroundColor: activeTab === key ? 'var(--color-bg-elevated)' : 'transparent',
                color: activeTab === key ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: activeTab === key ? '0 1px 4px var(--color-card-shadow)' : 'none',
              }}
            >
              <TabIcon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Pipeline Flow Tab ── */}
        {activeTab === 'pipeline' && (
          <div
            className="rounded-xl border p-6 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 4px var(--color-card-shadow)',
            }}
          >
            <h3 className="text-[14px] font-bold mb-5" style={{ color: 'var(--color-text-primary)' }}>
              ETL Pipeline Stages
            </h3>

            <div className="flex items-center justify-between gap-4 overflow-x-auto py-4">
              {pipelineStages.map((stage, i) => (
                <div key={stage.id} className="flex items-center gap-4 flex-1 min-w-[140px]">
                  <div className="flex-1">
                    <div
                      className="rounded-xl border p-4 text-center"
                      style={{
                        borderColor: stage.color,
                        backgroundColor: `${stage.color}08`,
                      }}
                    >
                      <stage.icon size={28} style={{ color: stage.color, margin: '0 auto 8px' }} />
                      <h4 className="text-[13px] font-bold mb-0.5" style={{ color: 'var(--color-text-primary)' }}>
                        {stage.label}
                      </h4>
                      <p className="text-[11px]" style={{ color: 'var(--color-text-tertiary)' }}>
                        {stage.tools} tools
                      </p>
                    </div>
                  </div>
                  {i < pipelineStages.length - 1 && (
                    <ArrowRight size={20} className="shrink-0" style={{ color: 'var(--color-border-secondary)' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Mini input/output summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t" style={{ borderColor: 'var(--color-border-subtle)' }}>
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                  Data Sources ({inputConns.length})
                </h4>
                <div className="flex flex-col gap-1.5">
                  {inputConns.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 text-[11px]">
                      <FileInput size={10} style={{ color: '#3B82F6' }} />
                      <span style={{ color: 'var(--color-text-primary)' }}>{c.name}</span>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>· {c.type}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
                  Targets ({outputConns.length})
                </h4>
                <div className="flex flex-col gap-1.5">
                  {outputConns.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 text-[11px]">
                      <FileOutput size={10} style={{ color: '#22C55E' }} />
                      <span style={{ color: 'var(--color-text-primary)' }}>{c.name}</span>
                      <span style={{ color: 'var(--color-text-tertiary)' }}>· {c.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Tool Inventory Tab ── */}
        {activeTab === 'tools' && (
          <div className="flex flex-col gap-3">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-xl border theme-transition overflow-hidden"
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  borderColor: expandedTool === tool.id ? 'var(--color-accent)' : 'var(--color-border-primary)',
                  boxShadow: '0 1px 4px var(--color-card-shadow)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedTool(expandedTool === tool.id ? null : tool.id)}
                  className="w-full flex items-center justify-between p-4 text-left transition-colors duration-150"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {expandedTool === tool.id ? (
                      <ChevronDown size={14} style={{ color: 'var(--color-accent)' }} />
                    ) : (
                      <ChevronRight size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                    )}
                    <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {tool.name}
                    </span>
                    <CategoryBadge category={tool.category} />
                    <span className="text-[11px] truncate hidden sm:inline" style={{ color: 'var(--color-text-tertiary)' }}>
                      {tool.description}
                    </span>
                  </div>
                  <StatusBadge status={tool.status} />
                </button>

                {expandedTool === tool.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="border-t"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    <div className="p-4">
                      <div className="mb-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-tertiary)' }}>
                          Description
                        </span>
                        <p className="text-[12px]" style={{ color: 'var(--color-text-primary)' }}>{tool.description}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider block mb-1.5" style={{ color: 'var(--color-text-tertiary)' }}>
                          Configuration
                        </span>
                        <pre
                          className="text-[12px] font-mono p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre-wrap"
                          style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-primary)' }}
                        >
                          {tool.configuration}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Connections Tab ── */}
        {activeTab === 'connections' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Input Connections */}
            <div
              className="rounded-xl border p-5 theme-transition"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                borderColor: 'var(--color-border-primary)',
                boxShadow: '0 1px 4px var(--color-card-shadow)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileInput size={16} style={{ color: '#3B82F6' }} />
                <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Input Sources
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {inputConns.map((c) => (
                  <div
                    key={c.id}
                    className="px-3 py-3 rounded-lg"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {c.name}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6' }}>
                        {c.type}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                      {c.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Output Connections */}
            <div
              className="rounded-xl border p-5 theme-transition"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                borderColor: 'var(--color-border-primary)',
                boxShadow: '0 1px 4px var(--color-card-shadow)',
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <FileOutput size={16} style={{ color: '#22C55E' }} />
                <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  Output Targets
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {outputConns.map((c) => (
                  <div
                    key={c.id}
                    className="px-3 py-3 rounded-lg"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[12px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                        {c.name}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#22C55E' }}>
                        {c.type}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                      {c.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
