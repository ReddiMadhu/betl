import React, { useState, useMemo } from 'react';
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
} from 'lucide-react';
import type { Asset } from '../../data/discoveryData';
import type { AlteryxDetailData } from '../../data/alteryxDetailData';
import {
  WORKFLOW_SVG_PATHS,
  getWorkflowBusinessSummary,
} from '../../data/alteryxDetailData';
import type { BusinessStage } from '../../data/alteryxDetailData';

/* ─────────────────────────────────────────────────────────
 * AlteryxWorkflowOverview — Exact adaptation of the
 * Alteryx OverviewPage.tsx implementation.
 * ───────────────────────────────────────────────────────── */

interface AlteryxWorkflowOverviewProps {
  asset: Asset;
  detailData: AlteryxDetailData;
  onSelectTool?: (toolId: string) => void;
  onShowToast?: (message: string) => void;
}

export const AlteryxWorkflowOverview: React.FC<AlteryxWorkflowOverviewProps> = ({
  asset,
  detailData,
  onSelectTool,
  onShowToast,
}) => {
  const workflowId = asset.canonicalId ?? asset.id;
  const summary = useMemo(
    () => getWorkflowBusinessSummary(workflowId, detailData, asset.description),
    [workflowId, detailData, asset.description],
  );

  const [expandedStage, setExpandedStage] = useState<number | null>(null);

  // Map tool ID to direct Alteryx tool name and details
  const toolMap = useMemo(() => {
    const map = new Map<string, { name: string; category: string; description: string }>();
    detailData.tools.forEach((t) => {
      map.set(t.id, {
        name: t.name,
        category: t.category,
        description: t.description,
      });
    });
    return map;
  }, [detailData.tools]);

  const toggleStage = (stageNum: number) => {
    setExpandedStage((prev) => (prev === stageNum ? null : stageNum));
  };

  const handleViewEndToEndLineage = () => {
    const svgPath = WORKFLOW_SVG_PATHS[workflowId] || WORKFLOW_SVG_PATHS[asset.id];
    if (svgPath && svgPath.trim() !== '') {
      window.open(svgPath, '_blank');
    } else {
      const msg = 'End-to-end lineage SVG is not configured for this workflow.';
      if (onShowToast) {
        onShowToast(msg);
      } else {
        console.warn(`[Lineage] ${msg} (Workflow ID: ${workflowId})`);
      }
    }
  };

  const totalTools = detailData.tools.length;
  const totalConnections = detailData.connectionCount ?? detailData.connections.length;
  const totalInputs = summary.sourceInputs.length;
  const totalOutputs = summary.businessOutputs.length;
  const oneLinePurpose = summary.oneLinePurpose || asset.description || 'Data preparation and reporting workflow';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', width: '100%' }}>
      {/* 1. Header & Compact Metrics Strip */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <div
            style={{
              fontSize: '11px',
              fontWeight: '700',
              letterSpacing: '1px',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}
          >
            ETL Intelligence
          </div>
          <h1
            style={{
              fontSize: '24px',
              fontWeight: '800',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.4px',
              margin: 0,
            }}
          >
            Workflow Overview
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: '4px 0 0 0' }}>
            {oneLinePurpose}
          </p>
        </div>

        {/* Compact Metrics Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            background: 'var(--color-bg-tertiary)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md, 8px)',
            border: '1px solid var(--color-border-primary)',
            fontSize: '13px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{totalTools}</span>
            <span style={{ color: 'var(--color-text-tertiary)' }}>Tools</span>
          </div>
          <span style={{ color: 'var(--color-border-secondary)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{totalConnections}</span>
            <span style={{ color: 'var(--color-text-tertiary)' }}>Connections</span>
          </div>
          <span style={{ color: 'var(--color-border-secondary)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{totalInputs}</span>
            <span style={{ color: 'var(--color-text-tertiary)' }}>Inputs</span>
          </div>
          <span style={{ color: 'var(--color-border-secondary)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{totalOutputs}</span>
            <span style={{ color: 'var(--color-text-tertiary)' }}>Outputs</span>
          </div>
        </div>
      </div>

      {/* 2. Business Purpose Card */}
      {summary.businessPurpose && (
        <div
          className="rounded-xl border theme-transition"
          style={{
            padding: '16px 20px',
            borderLeft: '3px solid var(--color-accent)',
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 4px var(--color-card-shadow)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '6px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Business Purpose
            </span>
            <span
              style={{
                fontSize: '9.5px',
                fontWeight: '600',
                padding: '1px 6px',
                borderRadius: 'var(--radius-sm, 4px)',
                background: 'var(--color-accent-subtle)',
                color: 'var(--color-accent)',
                border: '1px solid rgba(251, 78, 11, 0.25)',
                letterSpacing: '0.3px',
                textTransform: 'none',
                lineHeight: '1.4',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              AI Generated
            </span>
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--color-text-primary)',
              lineHeight: '1.5',
              margin: 0,
              fontWeight: '500',
            }}
          >
            {summary.businessPurpose}
          </p>
        </div>
      )}

      {/* 3. High Level Lineage Flow: SOURCES ──► PROCESS ──► DELIVERABLES */}
      {summary && (
        <div
          className="rounded-xl border theme-transition"
          style={{
            padding: '18px 20px',
            backgroundColor: 'var(--color-bg-elevated)',
            borderColor: 'var(--color-border-primary)',
            boxShadow: '0 1px 4px var(--color-card-shadow)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div
              style={{
                fontSize: '11.5px',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              High Level Lineage
            </div>
            <button
              type="button"
              onClick={handleViewEndToEndLineage}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'none',
                border: 'none',
                color: 'var(--color-accent)',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                padding: '2px 6px',
              }}
            >
              <span>View End-To-End Lineage</span>
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(180px, 1fr) auto minmax(180px, 1.2fr) auto minmax(180px, 1fr)',
              gap: '12px',
              alignItems: 'center',
              background: 'var(--color-bg-tertiary)',
              padding: '16px',
              borderRadius: 'var(--radius-sm, 6px)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            {/* Inputs Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: 'var(--color-text-tertiary)',
                  textTransform: 'uppercase',
                }}
              >
                Sources ({summary.sourceInputs.length})
              </div>
              {summary.sourceInputs.map((inp, idx) => (
                <div
                  key={idx}
                  title={inp.name}
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    background: 'var(--color-bg-elevated)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm, 4px)',
                    border: '1px solid var(--color-border-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {inp.sourceFilename || inp.name}
                </div>
              ))}
            </div>

            {/* Arrow 1 */}
            <div style={{ color: 'var(--color-accent)', display: 'flex', justifyContent: 'center' }}>
              <ArrowRight size={18} />
            </div>

            {/* Process Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: 'var(--color-text-tertiary)',
                  textTransform: 'uppercase',
                }}
              >
                Process Stages ({summary.processingStages.length})
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-primary)',
                  background: 'var(--color-bg-elevated)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm, 4px)',
                  border: '1px solid var(--color-border-primary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontWeight: '700', color: 'var(--color-accent)' }}>Multi-Stage Processing</span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>
                  {summary.processingStages.map((s) => s.name).slice(0, 3).join(' · ') || 'Multi-step data pipeline'}
                </span>
              </div>
            </div>

            {/* Arrow 2 */}
            <div style={{ color: 'var(--color-accent)', display: 'flex', justifyContent: 'center' }}>
              <ArrowRight size={18} />
            </div>

            {/* Outputs Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  fontSize: '10.5px',
                  fontWeight: '700',
                  color: 'var(--color-text-tertiary)',
                  textTransform: 'uppercase',
                }}
              >
                Deliverables ({summary.businessOutputs.length})
              </div>
              {summary.businessOutputs.map((out, idx) => (
                <div
                  key={idx}
                  title={out.name}
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-text-primary)',
                    background: 'var(--color-bg-elevated)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm, 4px)',
                    border: '1px solid var(--color-border-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {out.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. Process Stages (Showing Direct Alteryx Tool Names) */}
      {summary && summary.processingStages && summary.processingStages.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3
              style={{
                fontSize: '12.5px',
                fontWeight: '700',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                margin: 0,
              }}
            >
              Process Stages ({summary.processingStages.length})
            </h3>
            <span style={{ fontSize: '11px', color: 'var(--color-text-tertiary)' }}>
              Click any stage to inspect underlying tools and transformations
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '10px',
            }}
          >
            {summary.processingStages.map((stage: BusinessStage) => {
              const isExpanded = expandedStage === stage.stageNumber;

              return (
                <div
                  key={stage.stageNumber}
                  className="rounded-xl border theme-transition"
                  style={{
                    padding: '14px 16px',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s ease, background-color 0.15s ease',
                    border: isExpanded ? '1px solid var(--color-accent)' : '1px solid var(--color-border-primary)',
                    backgroundColor: isExpanded ? 'var(--color-surface-hover)' : 'var(--color-bg-elevated)',
                    boxShadow: '0 1px 4px var(--color-card-shadow)',
                  }}
                  onClick={() => toggleStage(stage.stageNumber)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      <span
                        style={{
                          fontSize: '10.5px',
                          fontFamily: 'monospace',
                          fontWeight: '700',
                          color: 'var(--color-accent)',
                          display: 'block',
                          marginBottom: '2px',
                        }}
                      >
                        {stage.shortTitle || `STAGE ${String(stage.stageNumber).padStart(2, '0')}`}
                      </span>
                      <h4
                        style={{
                          fontSize: '13.5px',
                          fontWeight: '700',
                          color: 'var(--color-text-primary)',
                          margin: '0 0 4px 0',
                        }}
                      >
                        {stage.name}
                      </h4>
                    </div>
                    {isExpanded ? (
                      <ChevronUp size={16} color="var(--color-accent)" />
                    ) : (
                      <ChevronDown size={16} color="var(--color-text-tertiary)" />
                    )}
                  </div>

                  <p
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-text-secondary)',
                      margin: '0 0 8px 0',
                      lineHeight: '1.4',
                    }}
                  >
                    {stage.summary || stage.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '11px',
                      color: 'var(--color-text-tertiary)',
                    }}
                  >
                    <span>{stage.toolCount} steps</span>
                  </div>

                  {/* Progressive Disclosure Details */}
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '12px',
                        paddingTop: '12px',
                        borderTop: '1px solid var(--color-border-subtle)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        fontSize: '11.5px',
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {stage.businessPurpose && (
                        <div>
                          <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>Purpose: </span>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{stage.businessPurpose}</span>
                        </div>
                      )}

                      {stage.majorTransformation && (
                        <div>
                          <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>
                            Transformation:{' '}
                          </span>
                          <span style={{ color: 'var(--color-text-secondary)' }}>{stage.majorTransformation}</span>
                        </div>
                      )}

                      {stage.annotations && stage.annotations.length > 0 && (
                        <div>
                          <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>Key Actions:</span>
                          <ul
                            style={{
                              margin: '4px 0 0 0',
                              paddingLeft: '16px',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            {stage.annotations.map((ann, aIdx) => (
                              <li key={aIdx}>{ann}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Direct Alteryx Tool Name Chips */}
                      <div style={{ marginTop: '4px' }}>
                        <span
                          style={{
                            fontWeight: '700',
                            color: 'var(--color-text-primary)',
                            display: 'block',
                            marginBottom: '4px',
                          }}
                        >
                          Tools:
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                          {stage.toolIds.map((tid, idx) => {
                            const toolInfo = toolMap.get(String(tid));
                            const toolDisplayName = toolInfo ? toolInfo.name : `Tool ${tid}`;

                            return (
                              <span
                                key={`${tid}-${idx}`}
                                onClick={() => onSelectTool && onSelectTool(String(tid))}
                                title={onSelectTool ? `Click to inspect ${toolDisplayName}` : undefined}
                                style={{
                                  fontSize: '11px',
                                  fontWeight: '600',
                                  color: 'var(--color-text-primary)',
                                  background: 'var(--color-bg-tertiary)',
                                  border: '1px solid var(--color-border-primary)',
                                  padding: '2px 8px',
                                  borderRadius: 'var(--radius-sm, 4px)',
                                  cursor: onSelectTool ? 'pointer' : 'default',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  transition: 'border-color 0.15s ease, background-color 0.15s ease',
                                }}
                                onMouseEnter={(e) => {
                                  if (onSelectTool) {
                                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                                    e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (onSelectTool) {
                                    e.currentTarget.style.borderColor = 'var(--color-border-primary)';
                                    e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                                  }
                                }}
                              >
                                {toolDisplayName}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
