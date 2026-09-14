import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch, Hash, Calendar, FileText, Table2, ZoomIn, ZoomOut,
  RotateCcw, Sparkles, ChevronRight, Layers, LayoutGrid, Maximize2
} from 'lucide-react';
import { tbPbiDataTables, tbPbiRelationships } from '../../data/tableauPowerBIData';
import type { TbPbiRelationship } from '../../data/tableauPowerBIData';

/* ─────────────────────────────────────────────────────────
 * ModelRelationshipGraph — Interactive Data Model Topology
 *
 * Modeled directly after tb-bi/frntnd (Page2ModelIntelligence & GraphCanvas):
 * - Central Fact Table (Brokage) connected to Dimension Tables
 * - FileNode-inspired table cards with row/col count badges & schema lists
 * - Live SVG cubic bezier connector lines with cardinality badges (*:1)
 * - Interactive hover & selection: highlights joined keys and paths
 * - Zoom, reset & toggle between Graph Canvas and Table Grid view
 * ───────────────────────────────────────────────────────── */

interface Props {
  className?: string;
}

interface PortPosition {
  x: number;
  y: number;
}

export default function ModelRelationshipGraph({ className = '' }: Props) {
  const [zoom, setZoom] = useState(1);
  const [selectedRel, setSelectedRel] = useState<TbPbiRelationship | null>(null);
  const [hoveredRel, setHoveredRel] = useState<TbPbiRelationship | null>(null);
  const [viewMode, setViewMode] = useState<'graph' | 'table'>('graph');

  const canvasRef = useRef<HTMLDivElement>(null);
  const scaledContentRef = useRef<HTMLDivElement>(null);
  const portRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const [lines, setLines] = useState<Array<{
    rel: TbPbiRelationship;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    mx: number;
    my: number;
  }>>([]);

  // Find Brokage (Fact) and others (Dimensions)
  const factTable = useMemo(() =>
    tbPbiDataTables.find(t => t.rawName.toLowerCase().includes('brokage')) || tbPbiDataTables[0],
    []
  );

  const dimTables = useMemo(() =>
    tbPbiDataTables.filter(t => t.rawName !== factTable.rawName),
    [factTable]
  );

  const leftDimTables = useMemo(() => dimTables.slice(0, 2), [dimTables]);
  const rightDimTables = useMemo(() => dimTables.slice(2), [dimTables]);

  const getColIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('int') || t.includes('double') || t.includes('number')) {
      return <Hash size={11} className="shrink-0 text-emerald-500" />;
    }
    if (t.includes('date') || t.includes('time')) {
      return <Calendar size={11} className="shrink-0 text-purple-400" />;
    }
    return <FileText size={11} className="shrink-0 text-blue-400" />;
  };

  const handleZoomIn = () => setZoom(prev => Math.min(Number((prev + 0.1).toFixed(2)), 1.4));
  const handleZoomOut = () => setZoom(prev => Math.max(Number((prev - 0.1).toFixed(2)), 0.65));
  const handleResetZoom = () => setZoom(1);

  // Compute SVG connector coordinates
  const updateLines = useCallback(() => {
    if (!scaledContentRef.current) return;
    const contentRect = scaledContentRef.current.getBoundingClientRect();
    const currentScale = zoom;

    const newLines: Array<{
      rel: TbPbiRelationship;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      mx: number;
      my: number;
    }> = [];

    tbPbiRelationships.forEach(rel => {
      const dimPort = portRefs.current[`dim-${rel.toTable}`];
      // Determine if dimension is on left or right
      const isLeft = leftDimTables.some(t => t.displayName.toLowerCase() === rel.toTable.toLowerCase() || t.rawName.toLowerCase() === rel.toTable.toLowerCase());
      const factPortKey = isLeft ? `fact-left-${rel.fromColumn}` : `fact-right-${rel.fromColumn}`;
      const factPort = portRefs.current[factPortKey] || portRefs.current[isLeft ? 'fact-left-default' : 'fact-right-default'];

      if (dimPort && factPort) {
        const dimRect = dimPort.getBoundingClientRect();
        const factRect = factPort.getBoundingClientRect();

        const x1 = (dimRect.left + dimRect.width / 2 - contentRect.left) / currentScale;
        const y1 = (dimRect.top + dimRect.height / 2 - contentRect.top) / currentScale;
        const x2 = (factRect.left + factRect.width / 2 - contentRect.left) / currentScale;
        const y2 = (factRect.top + factRect.height / 2 - contentRect.top) / currentScale;

        newLines.push({
          rel,
          x1: isLeft ? x1 : x2,
          y1: isLeft ? y1 : y2,
          x2: isLeft ? x2 : x1,
          y2: isLeft ? y2 : y1,
          mx: (x1 + x2) / 2,
          my: (y1 + y2) / 2,
        });
      }
    });

    setLines(newLines);
  }, [leftDimTables, zoom]);

  useEffect(() => {
    updateLines();
    const timeout = setTimeout(updateLines, 100);
    const handleResize = () => updateLines();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateLines, zoom, viewMode]);

  return (
    <div
      className={`rounded-xl border theme-transition overflow-hidden flex flex-col ${className}`}
      style={{
        backgroundColor: 'var(--color-bg-elevated)',
        borderColor: 'var(--color-border-primary)'
      }}
    >
      {/* ── Toolbar Header ── */}
      <div
        className="px-5 py-3.5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
            style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
          >
            <GitBranch size={16} />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Data Model Relationships (Star Schema)
            </h3>
            <p className="text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
              Primary Fact: <strong style={{ color: 'var(--color-accent)' }}>{factTable.displayName}</strong> ({factTable.rowCount.toLocaleString()} rows) · {tbPbiRelationships.length} Dimension Joins
            </p>
          </div>
        </div>

        {/* View mode toggle & zoom controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Toggle View */}
          <div
            className="p-0.5 rounded-lg border flex items-center gap-0.5"
            style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-subtle)' }}
          >
            <button
              onClick={() => setViewMode('graph')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all"
              style={{
                backgroundColor: viewMode === 'graph' ? 'var(--color-bg-elevated)' : 'transparent',
                color: viewMode === 'graph' ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                boxShadow: viewMode === 'graph' ? '0 1px 3px rgba(0,0,0,0.12)' : 'none'
              }}
              title="Interactive Graph Topology"
            >
              <Layers size={13} /> Graph
            </button>
            <button
              onClick={() => setViewMode('table')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all"
              style={{
                backgroundColor: viewMode === 'table' ? 'var(--color-bg-elevated)' : 'transparent',
                color: viewMode === 'table' ? 'var(--color-accent)' : 'var(--color-text-tertiary)',
                boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.12)' : 'none'
              }}
              title="Relationship Table Grid"
            >
              <LayoutGrid size={13} /> Table
            </button>
          </div>

          {/* Zoom Controls (Graph mode only) */}
          {viewMode === 'graph' && (
            <div
              className="flex items-center border rounded-lg overflow-hidden text-xs"
              style={{ borderColor: 'var(--color-border-subtle)', backgroundColor: 'var(--color-bg-secondary)' }}
            >
              <button
                onClick={handleZoomOut}
                className="p-2 hover:opacity-80 cursor-pointer"
                title="Zoom Out"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <ZoomOut size={13} />
              </button>
              <span className="px-2 font-mono text-[11px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:opacity-80 cursor-pointer"
                title="Zoom In"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <ZoomIn size={13} />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-2 border-l hover:opacity-80 cursor-pointer"
                title="Reset Zoom (100%)"
                style={{ borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-secondary)' }}
              >
                <RotateCcw size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Active Relationship Inspector Strip ── */}
      <div
        className="px-5 py-2.5 border-b flex items-center justify-between text-xs font-mono transition-colors"
        style={{
          backgroundColor: (hoveredRel || selectedRel) ? 'var(--color-accent-muted)' : 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border-subtle)'
        }}
      >
        {(hoveredRel || selectedRel) ? (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold" style={{ color: 'var(--color-accent)' }}>
              {(hoveredRel || selectedRel)?.fromTable}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[11px] font-bold border" style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}>
              [{(hoveredRel || selectedRel)?.fromColumn}]
            </span>
            <span style={{ color: 'var(--color-accent)' }}>════▶</span>
            <span className="font-bold text-blue-500">
              {(hoveredRel || selectedRel)?.toTable}
            </span>
            <span className="px-1.5 py-0.5 rounded text-[11px] font-bold border border-blue-400" style={{ backgroundColor: 'var(--color-bg-elevated)', color: '#3b82f6' }}>
              [{(hoveredRel || selectedRel)?.toColumn}]
            </span>
            <span className="text-[10px] text-gray-400 font-sans ml-1">
              (Active Star Schema Join)
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-sans" style={{ color: 'var(--color-text-tertiary)' }}>
            <Sparkles size={13} style={{ color: 'var(--color-accent)' }} />
            <span>Hover or click any node or connector line to inspect join keys and cardinality</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          {(hoveredRel || selectedRel) && (
            <button
              onClick={() => { setSelectedRel(null); setHoveredRel(null); }}
              className="text-[10px] underline cursor-pointer font-sans"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Clear selection
            </button>
          )}
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded font-mono shadow-xs"
            style={{
              backgroundColor: (hoveredRel || selectedRel) ? 'var(--color-accent)' : 'var(--color-bg-elevated)',
              color: (hoveredRel || selectedRel) ? '#ffffff' : 'var(--color-text-secondary)',
              border: '1px solid var(--color-border-subtle)'
            }}
          >
            {(hoveredRel || selectedRel)?.type || 'Many-to-One (*:1)'}
          </span>
        </div>
      </div>

      {/* ── VIEW 1: INTERACTIVE GRAPH CANVAS ── */}
      {viewMode === 'graph' ? (
        <div
          ref={canvasRef}
          className="relative w-full overflow-x-auto overflow-y-hidden p-8 select-none"
          style={{
            backgroundColor: 'var(--color-bg-primary)',
            minHeight: '520px',
            backgroundImage: `radial-gradient(var(--color-border-subtle) 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        >
          <div
            ref={scaledContentRef}
            className="relative transition-transform duration-150 origin-top-left"
            style={{
              transform: `scale(${zoom})`,
              minWidth: '1020px',
              maxWidth: '1200px',
              margin: '0 auto'
            }}
          >
            {/* ── Live SVG Connector Lines Layer ── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="var(--color-accent)" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="var(--color-accent)" floodOpacity="0.6" />
                </filter>
              </defs>

              {lines.map(({ rel, x1, y1, x2, y2, mx, my }) => {
                const isHovered = hoveredRel === rel || selectedRel === rel;
                const strokeColor = isHovered ? 'var(--color-accent)' : '#94a3b8';
                const strokeWidth = isHovered ? 3 : 1.75;
                const pathD = `M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}`;

                return (
                  <g key={`${rel.fromTable}-${rel.toTable}`}>
                    {/* Background glow when active */}
                    {isHovered && (
                      <path
                        d={pathD}
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth={7}
                        strokeOpacity={0.25}
                      />
                    )}
                    {/* Main connector curve */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeDasharray={isHovered ? 'none' : '5 4'}
                      style={{ transition: 'stroke 0.2s, stroke-width 0.2s' }}
                    />
                    {/* Cardinality Badge in the middle of the curve */}
                    <g
                      transform={`translate(${mx}, ${my})`}
                      className="cursor-pointer pointer-events-auto"
                      onMouseEnter={() => setHoveredRel(rel)}
                      onMouseLeave={() => setHoveredRel(null)}
                      onClick={() => setSelectedRel(selectedRel === rel ? null : rel)}
                    >
                      <rect
                        x="-20"
                        y="-10"
                        width="40"
                        height="20"
                        rx="10"
                        fill={isHovered ? 'var(--color-accent)' : 'var(--color-bg-elevated)'}
                        stroke={isHovered ? 'var(--color-accent)' : '#94a3b8'}
                        strokeWidth="1.5"
                        filter={isHovered ? 'url(#glow)' : undefined}
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        fontFamily="monospace"
                        fill={isHovered ? '#ffffff' : 'var(--color-text-primary)'}
                      >
                        *:1
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* ── 3-Column Node Layout (Left Dims | Central Fact | Right Dims) ── */}
            <div className="grid grid-cols-12 gap-8 items-center relative z-20">
              {/* ── Left Column: 2 Dimension Nodes ── */}
              <div className="col-span-4 space-y-6">
                {leftDimTables.map(table => {
                  const rel = tbPbiRelationships.find(r => r.toTable.toLowerCase() === table.displayName.toLowerCase() || r.toTable.toLowerCase() === table.rawName.toLowerCase());
                  const isHighlighted = (hoveredRel && (hoveredRel.toTable === table.displayName || hoveredRel.toTable === table.rawName)) ||
                                        (selectedRel && (selectedRel.toTable === table.displayName || selectedRel.toTable === table.rawName));

                  return (
                    <motion.div
                      key={table.rawName}
                      whileHover={{ scale: 1.02 }}
                      onMouseEnter={() => rel && setHoveredRel(rel)}
                      onMouseLeave={() => setHoveredRel(null)}
                      onClick={() => rel && setSelectedRel(selectedRel?.toTable === table.displayName ? null : rel)}
                      className="rounded-xl border p-4 shadow-sm transition-all duration-200 cursor-pointer relative"
                      style={{
                        backgroundColor: 'var(--color-bg-elevated)',
                        borderColor: isHighlighted ? 'var(--color-accent)' : 'var(--color-border-primary)',
                        boxShadow: isHighlighted ? '0 0 18px rgba(251, 78, 11, 0.25)' : '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      {/* Node Header (matching tb-bi FileNode) */}
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                            <Table2 size={16} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-xs truncate" style={{ color: 'var(--color-text-primary)' }}>{table.displayName}</div>
                            <div className="text-[10px] text-gray-400 truncate">Dimension Table</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
                            {table.rowCount.toLocaleString()} rows
                          </span>
                        </div>
                      </div>

                      {/* Columns List with Join Key highlighted */}
                      <div className="space-y-1 text-[11px] font-mono">
                        {table.columnDetails.slice(0, 4).map(col => {
                          const isJoinKey = rel && (rel.toColumn === col.name);
                          return (
                            <div
                              key={col.name}
                              className="flex items-center justify-between px-2.5 py-1 rounded transition-colors"
                              style={{
                                backgroundColor: isJoinKey ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                                color: isJoinKey ? '#3b82f6' : 'var(--color-text-secondary)',
                                fontWeight: isJoinKey ? 700 : 400
                              }}
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                {getColIcon(col.dataType)}
                                <span className="truncate">{col.name}</span>
                              </div>
                              {isJoinKey && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500 text-white font-bold shrink-0 shadow-xs">
                                  KEY
                                </span>
                              )}
                            </div>
                          );
                        })}
                        {table.columnDetails.length > 4 && (
                          <div className="text-[10px] text-center pt-1" style={{ color: 'var(--color-text-quaternary)' }}>
                            + {table.columnDetails.length - 4} more columns
                          </div>
                        )}
                      </div>

                      {/* Right Connector Anchor Port */}
                      <div
                        ref={el => { portRefs.current[`dim-${table.displayName}`] = el; }}
                        className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-150"
                        style={{
                          backgroundColor: isHighlighted ? 'var(--color-accent)' : '#3b82f6',
                          borderColor: 'var(--color-bg-elevated)',
                          transform: isHighlighted ? 'translateY(-50%) scale(1.3)' : 'translateY(-50%) scale(1)'
                        }}
                      />
                    </motion.div>
                  );
                })}
              </div>

              {/* ── Center Column: Primary Fact Hub (Brokage) ── */}
              <div className="col-span-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="rounded-2xl border-2 p-5 shadow-lg relative"
                  style={{
                    backgroundColor: 'var(--color-bg-elevated)',
                    borderColor: 'var(--color-accent)',
                    boxShadow: '0 8px 30px rgba(251, 78, 11, 0.18)'
                  }}
                >
                  {/* Left anchor ports for Fact */}
                  <div
                    ref={el => { portRefs.current['fact-left-default'] = el; }}
                    className="absolute left-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2"
                    style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-bg-elevated)' }}
                  />
                  {/* Right anchor ports for Fact */}
                  <div
                    ref={el => { portRefs.current['fact-right-default'] = el; }}
                    className="absolute right-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2"
                    style={{ backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-bg-elevated)' }}
                  />

                  {/* Fact Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}>
                        <Table2 size={17} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{factTable.displayName}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded uppercase" style={{ backgroundColor: 'var(--color-accent-muted)', color: 'var(--color-accent)' }}>
                            PRIMARY FACT
                          </span>
                        </div>
                        <span className="text-[11px] font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
                          Central Star Hub · {factTable.rowCount.toLocaleString()} rows · {factTable.columnDetails.length} cols
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Fact Columns Scroll Area */}
                  <div className="space-y-1 text-[11px] font-mono max-h-[300px] overflow-y-auto pr-1">
                    {factTable.columnDetails.map(col => {
                      const matchingRels = tbPbiRelationships.filter(r => r.fromColumn === col.name);
                      const isJoinKey = matchingRels.length > 0;
                      const isHighlighted = (hoveredRel && hoveredRel.fromColumn === col.name) || (selectedRel && selectedRel.fromColumn === col.name);

                      return (
                        <div
                          key={col.name}
                          ref={el => {
                            if (isJoinKey) {
                              portRefs.current[`fact-left-${col.name}`] = el;
                              portRefs.current[`fact-right-${col.name}`] = el;
                            }
                          }}
                          onMouseEnter={() => matchingRels[0] && setHoveredRel(matchingRels[0])}
                          onMouseLeave={() => setHoveredRel(null)}
                          onClick={() => matchingRels[0] && setSelectedRel(selectedRel === matchingRels[0] ? null : matchingRels[0])}
                          className="flex items-center justify-between px-2.5 py-1.5 rounded transition-all cursor-pointer"
                          style={{
                            backgroundColor: isHighlighted ? 'var(--color-accent-muted)' : isJoinKey ? 'rgba(251, 78, 11, 0.08)' : 'transparent',
                            color: isHighlighted ? 'var(--color-accent)' : isJoinKey ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                            fontWeight: isJoinKey ? 700 : 400,
                            border: isHighlighted ? '1px solid var(--color-accent)' : '1px solid transparent'
                          }}
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            {getColIcon(col.dataType)}
                            <span className="truncate">{col.name}</span>
                          </div>
                          {isJoinKey && (
                            <span
                              className="text-[9px] px-1.5 py-0.2 rounded font-bold shrink-0 shadow-xs"
                              style={{ backgroundColor: 'var(--color-accent)', color: '#ffffff' }}
                            >
                              FK ({matchingRels.length})
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* ── Right Column: 3 Dimension Nodes ── */}
              <div className="col-span-4 space-y-4">
                {rightDimTables.map(table => {
                  const rel = tbPbiRelationships.find(r => r.toTable.toLowerCase() === table.displayName.toLowerCase() || r.toTable.toLowerCase() === table.rawName.toLowerCase());
                  const isHighlighted = (hoveredRel && (hoveredRel.toTable === table.displayName || hoveredRel.toTable === table.rawName)) ||
                                        (selectedRel && (selectedRel.toTable === table.displayName || selectedRel.toTable === table.rawName));

                  return (
                    <motion.div
                      key={table.rawName}
                      whileHover={{ scale: 1.02 }}
                      onMouseEnter={() => rel && setHoveredRel(rel)}
                      onMouseLeave={() => setHoveredRel(null)}
                      onClick={() => rel && setSelectedRel(selectedRel?.toTable === table.displayName ? null : rel)}
                      className="rounded-xl border p-3.5 shadow-sm transition-all duration-200 cursor-pointer relative"
                      style={{
                        backgroundColor: 'var(--color-bg-elevated)',
                        borderColor: isHighlighted ? 'var(--color-accent)' : 'var(--color-border-primary)',
                        boxShadow: isHighlighted ? '0 0 18px rgba(251, 78, 11, 0.25)' : '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      {/* Left Connector Anchor Port */}
                      <div
                        ref={el => { portRefs.current[`dim-${table.displayName}`] = el; }}
                        className="absolute left-[-7px] top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 transition-transform duration-150"
                        style={{
                          backgroundColor: isHighlighted ? 'var(--color-accent)' : '#3b82f6',
                          borderColor: 'var(--color-bg-elevated)',
                          transform: isHighlighted ? 'translateY(-50%) scale(1.3)' : 'translateY(-50%) scale(1)'
                        }}
                      />

                      {/* Node Header */}
                      <div className="flex items-center justify-between pb-2 mb-2 border-b" style={{ borderColor: 'var(--color-border-subtle)' }}>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                            <Table2 size={14} />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-xs truncate" style={{ color: 'var(--color-text-primary)' }}>{table.displayName}</div>
                            <div className="text-[10px] text-gray-400 truncate">Dimension Table</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold shrink-0" style={{ backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-secondary)' }}>
                          {table.rowCount.toLocaleString()} rows
                        </span>
                      </div>

                      {/* Columns List */}
                      <div className="space-y-1 text-[11px] font-mono">
                        {table.columnDetails.slice(0, 3).map(col => {
                          const isJoinKey = rel && (rel.toColumn === col.name);
                          return (
                            <div
                              key={col.name}
                              className="flex items-center justify-between px-2 py-0.5 rounded transition-colors"
                              style={{
                                backgroundColor: isJoinKey ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                                color: isJoinKey ? '#3b82f6' : 'var(--color-text-secondary)',
                                fontWeight: isJoinKey ? 700 : 400
                              }}
                            >
                              <div className="flex items-center gap-1.5 truncate">
                                {getColIcon(col.dataType)}
                                <span className="truncate">{col.name}</span>
                              </div>
                              {isJoinKey && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500 text-white font-bold shrink-0 shadow-xs">
                                  KEY
                                </span>
                              )}
                            </div>
                          );
                        })}
                        {table.columnDetails.length > 3 && (
                          <div className="text-[10px] text-center pt-0.5" style={{ color: 'var(--color-text-quaternary)' }}>
                            + {table.columnDetails.length - 3} more columns
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── VIEW 2: STANDARD RELATIONSHIP TABLE GRID ── */
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                <th className="text-left px-5 py-3 font-semibold">From Table (Fact)</th>
                <th className="text-left px-5 py-3 font-semibold">Source Key</th>
                <th className="text-center px-5 py-3 font-semibold">Join</th>
                <th className="text-left px-5 py-3 font-semibold">To Table (Dimension)</th>
                <th className="text-left px-5 py-3 font-semibold">Target Key</th>
                <th className="text-left px-5 py-3 font-semibold">Cardinality</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--color-border-subtle)' }}>
              {tbPbiRelationships.map((rel, i) => (
                <tr
                  key={i}
                  onMouseEnter={() => setHoveredRel(rel)}
                  onMouseLeave={() => setHoveredRel(null)}
                  onClick={() => setSelectedRel(selectedRel === rel ? null : rel)}
                  className="cursor-pointer transition-colors"
                  style={{
                    backgroundColor: (hoveredRel === rel || selectedRel === rel) ? 'var(--color-accent-muted)' : 'transparent'
                  }}
                >
                  <td className="px-5 py-3 font-mono text-[11px] font-bold" style={{ color: 'var(--color-accent)' }}>{rel.fromTable}</td>
                  <td className="px-5 py-3 font-mono text-[11px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>[{rel.fromColumn}]</td>
                  <td className="px-5 py-3 text-center">
                    <span className="font-mono text-xs font-bold" style={{ color: 'var(--color-accent)' }}>═▶</span>
                  </td>
                  <td className="px-5 py-3 font-mono text-[11px] font-bold text-blue-500">{rel.toTable}</td>
                  <td className="px-5 py-3 font-mono text-[11px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>[{rel.toColumn}]</td>
                  <td className="px-5 py-3">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold border" style={{ backgroundColor: 'var(--color-bg-secondary)', borderColor: 'var(--color-border-subtle)', color: 'var(--color-text-primary)' }}>
                      {rel.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
