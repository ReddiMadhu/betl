import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Layers,
  Database,
  Code,
  ShieldCheck,
  GitBranch,
  User,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import { TECHNOLOGY_LOGOS } from '../../data/discoveryData';

/* ─────────────────────────────────────────────────────────
 * MicroStrategyDetail — full-page detail view for MSTR
 *
 * Inspired by ms-tb reference (ObjectDetail, LogicExplorer).
 * Shows: metadata → expression translation → dependencies
 *        → attribute/metric catalog
 * ───────────────────────────────────────────────────────── */

interface Props {
  asset: Asset;
  onBack: () => void;
}

interface MSTRObject {
  id: string;
  name: string;
  typeName: string;
  mstrId: string;
  mstrPath: string;
  expressionText: string;
  targetCalc: string;
  confidence: number;
  translationMethod: string;
  status: 'mapped' | 'review' | 'unmapped';
}

interface Dependency {
  name: string;
  type: string;
}

/* ── Mock data ── */
function getMockData() {
  const objects: MSTRObject[] = [
    { id: 'o1', name: 'Total Earned Premium', typeName: 'Metric', mstrId: 'A4F2E8C1-3B97-4D21-8A5E-9C2F1E7B3D4A', mstrPath: '/Public Objects/Metrics/', expressionText: 'Sum(fact_premium.earned_premium){~+}', targetCalc: 'SUM([Earned Premium])', confidence: 0.96, translationMethod: 'Direct Aggregate Mapping', status: 'mapped' },
    { id: 'o2', name: 'Loss Ratio', typeName: 'Metric', mstrId: 'B7D3F1A5-6C89-4E12-9F3B-2A8E5D7C1F6B', mstrPath: '/Public Objects/Metrics/', expressionText: 'Sum(fact_claims.incurred_amount){~+} / Sum(fact_premium.earned_premium){~+}', targetCalc: 'SUM([Incurred Amount]) / SUM([Earned Premium])', confidence: 0.92, translationMethod: 'Compound Expression Decomposition', status: 'mapped' },
    { id: 'o3', name: 'Policy Count', typeName: 'Metric', mstrId: 'C1E5A9D3-2F47-4B8A-8C6E-3D9F2A1B7E5C', mstrPath: '/Public Objects/Metrics/', expressionText: 'Count(dim_policy.policy_id){~+}', targetCalc: 'COUNTD([Policy ID])', confidence: 0.98, translationMethod: 'Direct Aggregate Mapping', status: 'mapped' },
    { id: 'o4', name: 'Average Claim Duration', typeName: 'Metric', mstrId: 'D8F2B6A4-1E59-4C73-AB2D-5F8E3C9D1A7B', mstrPath: '/Public Objects/Metrics/', expressionText: 'Avg(DateDiff(fact_claims.open_date, fact_claims.close_date)){~+}', targetCalc: 'AVG(DATEDIFF([Close Date], [Open Date], DAY))', confidence: 0.78, translationMethod: 'Function Signature Remapping', status: 'review' },
    { id: 'o5', name: 'Region', typeName: 'Attribute', mstrId: 'E3A7C1D5-8B62-4F94-9E1A-6D2B8F5C3E7A', mstrPath: '/Schema Objects/Attributes/', expressionText: 'dim_geography.region_name', targetCalc: '[Region Name]', confidence: 0.99, translationMethod: 'Direct Column Reference', status: 'mapped' },
    { id: 'o6', name: 'Claim Severity Tier', typeName: 'Attribute Form', mstrId: 'F6B4D2E8-9C31-4A57-8D3F-1E7A5B9C2D6E', mstrPath: '/Schema Objects/Attributes/', expressionText: 'ApplySimple("CASE WHEN #0 > 100000 THEN \'High\' WHEN #0 > 25000 THEN \'Medium\' ELSE \'Low\' END", fact_claims.claim_amount)', targetCalc: 'IF [Claim Amount] > 100000 THEN "High"\nELSEIF [Claim Amount] > 25000 THEN "Medium"\nELSE "Low"\nEND', confidence: 0.85, translationMethod: 'ApplySimple Decomposition', status: 'review' },
  ];

  const upstreamDeps: Dependency[] = [
    { name: 'fact_premium', type: 'Fact Table' },
    { name: 'fact_claims', type: 'Fact Table' },
    { name: 'dim_policy', type: 'Dimension' },
    { name: 'dim_geography', type: 'Dimension' },
    { name: 'dim_agent', type: 'Dimension' },
  ];

  const downstreamDeps: Dependency[] = [
    { name: 'Claims Executive Dossier', type: 'Dossier' },
    { name: 'Underwriting Summary Report', type: 'Report' },
    { name: 'Monthly Financial Package', type: 'Document' },
  ];

  return { objects, upstreamDeps, downstreamDeps };
}

/* ── Confidence bar ── */
function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 90 ? '#22C55E' : pct >= 75 ? '#F59E0B' : '#EF4444';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-[11px] font-bold font-mono" style={{ color }}>{pct}%</span>
    </div>
  );
}

/* ── Status badge ── */
function StatusBadge({ status }: { status: 'mapped' | 'review' | 'unmapped' }) {
  const config = {
    mapped: { bg: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', icon: CheckCircle2, label: 'Mapped' },
    review: { bg: 'rgba(245, 158, 11, 0.1)', color: '#F59E0B', icon: AlertTriangle, label: 'Review' },
    unmapped: { bg: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', icon: AlertTriangle, label: 'Unmapped' },
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

export default function MicroStrategyDetail({ asset, onBack }: Props) {
  const { objects, upstreamDeps, downstreamDeps } = getMockData();
  const [expandedObj, setExpandedObj] = useState<string | null>(null);

  const logo = TECHNOLOGY_LOGOS[asset.technology];
  const mapped = objects.filter((o) => o.status === 'mapped').length;
  const review = objects.filter((o) => o.status === 'review').length;

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
            <img src={logo} alt="MicroStrategy" className="w-full h-full object-contain" />
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
                Cataloged
              </span>
              {asset.assetType && (
                <span
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                >
                  {asset.assetType}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]" style={{ color: 'var(--color-text-tertiary)' }}>
              <span>Path: /Public Objects/{asset.businessArea}/</span>
              <span>•</span>
              <span className="font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                MSTR Project: Insurance_Analytics
              </span>
              {asset.owner && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <User size={11} />
                    {asset.owner}
                  </span>
                </>
              )}
            </div>
            {asset.description && (
              <p className="text-[13px] mt-2 max-w-2xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {asset.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl"
            style={{ backgroundColor: 'rgba(34, 197, 94, 0.08)', color: '#22C55E', fontWeight: 700, fontSize: '0.875rem' }}
          >
            <ShieldCheck size={16} />
            <span>{mapped}/{objects.length} Objects Mapped</span>
          </div>
          {review > 0 && (
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px]"
              style={{ backgroundColor: 'rgba(245, 158, 11, 0.08)', color: '#F59E0B', fontWeight: 600 }}
            >
              <AlertTriangle size={14} />
              <span>{review} need manual review</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* ── Upstream & Downstream Dependencies ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6"
      >
        {/* Upstream */}
        <div
          className="rounded-xl border p-5 theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 4px var(--color-card-shadow)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <GitBranch size={16} style={{ color: 'var(--color-accent)' }} />
            <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Upstream Inputs & Dependencies
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {upstreamDeps.map((dep, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
              >
                <div className="flex items-center gap-2">
                  <Database size={12} style={{ color: '#8B5CF6' }} />
                  <span className="text-[12px] font-medium font-mono" style={{ color: 'var(--color-text-primary)' }}>
                    {dep.name}
                  </span>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(139, 92, 246, 0.08)', color: '#8B5CF6' }}>
                  {dep.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Downstream */}
        <div
          className="rounded-xl border p-5 theme-transition"
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 4px var(--color-card-shadow)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers size={16} style={{ color: '#3B82F6' }} />
            <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Downstream Dependents
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {downstreamDeps.map((dep, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg"
                style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet size={12} style={{ color: '#3B82F6' }} />
                  <span className="text-[12px] font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {dep.name}
                  </span>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.08)', color: '#3B82F6' }}>
                  {dep.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Object Catalog with Expression Translation ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="rounded-xl border overflow-hidden theme-transition"
        style={{
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border-primary)',
          boxShadow: '0 1px 4px var(--color-card-shadow)',
        }}
      >
        <div className="p-4 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
          <div className="flex items-center gap-2">
            <Code size={16} style={{ color: 'var(--color-accent)' }} />
            <h3 className="text-[14px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Object Catalog & Expression Translations
            </h3>
          </div>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
            {objects.length} objects discovered · {mapped} mapped · {review} require review
          </p>
        </div>

        <div className="flex flex-col">
          {objects.map((obj, i) => (
            <div key={obj.id}>
              {i > 0 && <div className="h-px" style={{ backgroundColor: 'var(--color-border-subtle)' }} />}
              <button
                type="button"
                onClick={() => setExpandedObj(expandedObj === obj.id ? null : obj.id)}
                className="w-full flex items-center justify-between p-4 text-left transition-colors duration-150"
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {expandedObj === obj.id ? (
                    <ChevronDown size={14} style={{ color: 'var(--color-accent)' }} />
                  ) : (
                    <ChevronRight size={14} style={{ color: 'var(--color-text-tertiary)' }} />
                  )}
                  <span className="text-[13px] font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>
                    {obj.name}
                  </span>
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md shrink-0"
                    style={{ backgroundColor: 'var(--color-bg-tertiary)', color: 'var(--color-text-secondary)' }}
                  >
                    {obj.typeName}
                  </span>
                  <StatusBadge status={obj.status} />
                </div>
                <ConfidenceBar value={obj.confidence} />
              </button>

              {expandedObj === obj.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border-t"
                  style={{ borderColor: 'var(--color-border-subtle)' }}
                >
                  <div className="p-4">
                    {/* MSTR Path & GUID */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
                      <span>Path: {obj.mstrPath}</span>
                      <span className="font-mono">GUID: {obj.mstrId}</span>
                      <span>Method: {obj.translationMethod}</span>
                    </div>

                    {/* Side-by-side expression diff */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                          >
                            <span className="text-[10px] font-bold" style={{ color: '#EF4444' }}>M</span>
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                            MicroStrategy Expression
                          </span>
                        </div>
                        <pre
                          className="text-[12px] font-mono p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre-wrap"
                          style={{ backgroundColor: 'rgba(239, 68, 68, 0.04)', color: 'var(--color-text-primary)', border: '1px solid rgba(239, 68, 68, 0.15)' }}
                        >
                          {obj.expressionText}
                        </pre>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className="w-5 h-5 rounded flex items-center justify-center"
                            style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)' }}
                          >
                            <ArrowRight size={10} style={{ color: '#22C55E' }} />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
                            Target Calculation
                          </span>
                        </div>
                        <pre
                          className="text-[12px] font-mono p-3 rounded-lg overflow-x-auto leading-relaxed whitespace-pre-wrap"
                          style={{ backgroundColor: 'rgba(34, 197, 94, 0.04)', color: 'var(--color-text-primary)', border: '1px solid rgba(34, 197, 94, 0.15)' }}
                        >
                          {obj.targetCalc}
                        </pre>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
