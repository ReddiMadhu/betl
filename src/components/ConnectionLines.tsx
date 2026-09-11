import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useAnimations';
import { technologies } from '../data/config';

interface LineData {
  id: string;
  path: string;
  pathId: string;
}

interface ConnectionLinesProps {
  ingestionState?: 'idle' | 'ingesting' | 'complete';
}

export default function ConnectionLines({
  ingestionState = 'idle',
}: ConnectionLinesProps) {
  const [lines, setLines] = useState<LineData[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const isGreen = ingestionState === 'complete';
  const isIngesting = ingestionState === 'ingesting';
  // Moving particle animation only runs during ingestion; when green, lines are static and dots do not move
  const showParticles = isIngesting;

  const compute = useCallback(() => {
    if (window.innerWidth < 1280) {
      setVisible(false);
      return;
    }
    setVisible(true);

    const container = document.getElementById('main-layout');
    const engine = document.getElementById('modernization-engine');
    const agentsArea = document.getElementById('engine-agents');
    const orgContainer = document.getElementById('org-workspace-container');
    if (!container || !engine || !agentsArea) return;

    const cRect = container.getBoundingClientRect();
    const eRect = engine.getBoundingClientRect();
    const aRect = agentsArea.getBoundingClientRect();
    const orgRect = orgContainer ? orgContainer.getBoundingClientRect() : null;

    setDims({ w: cRect.width, h: cRect.height });

    const techIds = technologies.map((t) => `tech-${t.id}`);

    // Converge at the center-left of the agent cards area
    const endX = eRect.left - cRect.left - 2;
    const endY = aRect.top + aRect.height / 2 - cRect.top;

    const newLines: LineData[] = [];

    techIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;

      const r = el.getBoundingClientRect();
      const startX = orgRect ? orgRect.right - cRect.left + 2 : r.right - cRect.left + 2;
      const startY = r.top + r.height / 2 - cRect.top;

      const dx = endX - startX;
      const cp1x = startX + dx * 0.45;
      const cp2x = startX + dx * 0.65;

      const path = `M ${startX} ${startY} C ${cp1x} ${startY}, ${cp2x} ${endY}, ${endX} ${endY}`;
      newLines.push({ id, path, pathId: `conn-path-${i}` });
    });

    setLines(newLines);
  }, []);

  useEffect(() => {
    const t = setTimeout(compute, 200);
    const ro = new ResizeObserver(() => requestAnimationFrame(compute));
    const el = document.getElementById('main-layout');
    if (el) ro.observe(el);
    window.addEventListener('resize', compute);
    return () => {
      clearTimeout(t);
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, [compute]);

  if (!visible || lines.length === 0) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={dims.w}
      height={dims.h}
      style={{ zIndex: 1, overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        {/* Orange initial/ingesting gradient */}
        <linearGradient id="conn-grad-orange" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-connection-path)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-connection-active)" stopOpacity="0.55" />
        </linearGradient>

        {/* Green converted gradient */}
        <linearGradient id="conn-grad-green" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.95" />
        </linearGradient>

        {/* Green glow filter */}
        <filter id="green-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {lines.map((line, i) => (
        <g key={line.id}>
          {/* The path */}
          <motion.path
            id={line.pathId}
            d={line.path}
            stroke={isGreen ? 'url(#conn-grad-green)' : 'url(#conn-grad-orange)'}
            strokeWidth={isGreen ? 1.8 : 1.2}
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.09, duration: 1, ease: 'easeOut' }}
          />

          {/* Origin anchor dot on container border */}
          <motion.circle
            cx={parseFloat(line.path.split(' ')[1]) || 0}
            cy={parseFloat(line.path.split(' ')[2]) || 0}
            r={isGreen ? 3 : 2.5}
            fill={isGreen ? '#22c55e' : 'var(--color-border-secondary)'}
            filter={isGreen ? 'url(#green-glow)' : undefined}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
          />

          {/* Single convergence dot (only on first line since all converge) */}
          {i === 0 && (
            <motion.circle
              cx={parseFloat(line.path.split(' ').slice(-2, -1)[0]) || 0}
              cy={parseFloat(line.path.split(' ').pop() || '0')}
              r={isGreen ? 4 : 3}
              fill={isGreen ? '#22c55e' : 'var(--color-accent)'}
              filter={isGreen ? 'url(#green-glow)' : undefined}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            />
          )}

          {/* Animated particle along path — starts on click, converts to green */}
          {!reduced && showParticles && (
            <circle
              r={isGreen ? 3 : 2.5}
              fill={isGreen ? '#22c55e' : 'var(--color-accent)'}
              filter={isGreen ? 'url(#green-glow)' : undefined}
            >
              <animateMotion
                dur={`${isGreen ? 2.2 + i * 0.2 : 2.0 + i * 0.2}s`}
                repeatCount="indefinite"
                begin={`${i * 0.12}s`}
                path={line.path}
              />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}
