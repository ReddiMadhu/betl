import { useState, useEffect } from 'react';
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
  FileInput,
  FileOutput,
  Info,
  Layers,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';
import type { AlteryxDetailData } from '../../data/alteryxDetailData';
import { ALTERYX_DETAIL_DATA, getWorkflowBusinessSummary } from '../../data/alteryxDetailData';
import { getComplexityCriticalityColor } from '../../data/rationalizationData';
import { AlteryxWorkflowOverview } from './AlteryxWorkflowOverview';

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

/* ── Stat Card ── */
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  valueColor,
}: {
  icon: typeof Workflow | typeof Settings | typeof Layers | typeof AlertTriangle;
  label: string;
  value: string | number;
  color: string;
  valueColor?: string;
}) {
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
          <p
            className="text-2xl font-bold mt-0.5"
            style={{ color: valueColor || 'var(--color-text-primary)' }}
          >
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
  const workflowId = asset.canonicalId ?? asset.id;
  const detailData: AlteryxDetailData = ALTERYX_DETAIL_DATA[workflowId] ?? ALTERYX_DETAIL_DATA[asset.id] ?? {
    tools: [],
    connections: [],
    pipelineStages: [],
    schedule: '',
    lastRunStatus: '',
    avgRuntime: '-',
  };
  const { tools, connections } = detailData;
  const summary = getWorkflowBusinessSummary(workflowId, detailData, asset.description);
  const [expandedTool, setExpandedTool] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'tools' | 'connections'>('pipeline');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const logo = TECHNOLOGY_LOGOS[asset.technology];
  const inputConns = connections.filter((c) => c.direction === 'input');
  const outputConns = connections.filter((c) => c.direction === 'output');

  const complexity = detailData.complexity ?? asset.complexity;
  const criticality = detailData.criticality ?? asset.criticality;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* ── Toast Notification ── */}
      {toastMessage && (
        <div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium"
          style={{
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-primary)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Info size={16} style={{ color: 'var(--color-accent)' }} className="shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

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
              {detailData.schedule && (
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  Schedule: {detailData.schedule}
                </span>
              )}
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

        {detailData.lastRunStatus && (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl shrink-0"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#22C55E', fontWeight: 700, fontSize: '0.875rem' }}
          >
            <Play size={14} />
            <span>Last Run: {detailData.lastRunStatus}</span>
          </div>
        )}
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6"
      >
        <StatCard icon={Settings} label="Tool Count" value={tools.length} color="#8B5CF6" />
        <StatCard icon={FileInput} label="Input Sources" value={summary.sourceInputs.length || asset.sourceCount || inputConns.length} color="#3B82F6" />
        <StatCard icon={FileOutput} label="Output Targets" value={summary.businessOutputs.length || asset.targetCount || outputConns.length} color="#22C55E" />
        <StatCard
          icon={Layers}
          label="Complexity"
          value={complexity || '-'}
          color={complexity ? getComplexityCriticalityColor(complexity) : '#6B7280'}
          valueColor={complexity ? getComplexityCriticalityColor(complexity) : undefined}
        />
        <StatCard
          icon={AlertTriangle}
          label="Criticality"
          value={criticality || '-'}
          color={criticality ? getComplexityCriticalityColor(criticality) : '#6B7280'}
          valueColor={criticality ? getComplexityCriticalityColor(criticality) : undefined}
        />
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
            { key: 'pipeline', label: 'Workflow Overview', icon: Workflow },
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

        {/* ── Pipeline Flow Tab (Alteryx Workflow Overview) ── */}
        {activeTab === 'pipeline' && (
          <div
            className="rounded-xl border p-6 theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 1px 4px var(--color-card-shadow)',
            }}
          >
            <AlteryxWorkflowOverview
              asset={asset}
              detailData={detailData}
              onSelectTool={(toolId) => {
                setActiveTab('tools');
                setExpandedTool(toolId);
              }}
              onShowToast={(msg) => setToastMessage(msg)}
            />
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
