import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useAnimations';

interface LineData {
  id: string;
  path: string;
  pathId: string;
}

export default function ConnectionLines() {
  const [lines, setLines] = useState<LineData[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  const compute = useCallback(() => {
    if (window.innerWidth < 1280) {
      setVisible(false);
      return;
    }
    setVisible(true);

    const container = document.getElementById('main-layout');
    const engine = document.getElementById('modernization-engine');
    const agentsArea = document.getElementById('engine-agents');
    if (!container || !engine || !agentsArea) return;

    const cRect = container.getBoundingClientRect();
    const eRect = engine.getBoundingClientRect();
    const aRect = agentsArea.getBoundingClientRect();

    setDims({ w: cRect.width, h: cRect.height });

    const techIds = [
      'tech-thoughtspot',
      'tech-powerbi',
      'tech-tableau',
      'tech-microstrategy',
      'tech-alteryx',
      'tech-python',
    ];

    // Converge at the center-left of the agent cards area
    const endX = eRect.left - cRect.left - 2;
    const endY = aRect.top + aRect.height / 2 - cRect.top;

    const newLines: LineData[] = [];

    techIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;

      const r = el.getBoundingClientRect();
      const startX = r.right - cRect.left + 2;
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
        <linearGradient id="conn-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-connection-path)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-connection-active)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {lines.map((line, i) => (
        <g key={line.id}>
          {/* The path */}
          <motion.path
            id={line.pathId}
            d={line.path}
            stroke="url(#conn-grad)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.09, duration: 1, ease: 'easeOut' }}
          />

          {/* Single convergence dot (only on first line since all converge) */}
          {i === 0 && (
            <motion.circle
              cx={parseFloat(line.path.split(' ').slice(-2, -1)[0]) || 0}
              cy={parseFloat(line.path.split(' ').pop() || '0')}
              r="3"
              fill="var(--color-accent)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            />
          )}

          {/* Animated particle along path */}
          {!reduced && (
            <circle r="2.5" fill="var(--color-accent)" opacity="0">
              <animateMotion
                dur={`${2.8 + i * 0.25}s`}
                repeatCount="indefinite"
                begin={`${0.5 + i * 0.4}s`}
                calcMode="spline"
                keySplines="0.42 0 0.58 1"
                keyTimes="0;1"
              >
                <mpath href={`#${line.pathId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.7;0.7;0"
                keyTimes="0;0.1;0.85;1"
                dur={`${2.8 + i * 0.25}s`}
                repeatCount="indefinite"
                begin={`${0.5 + i * 0.4}s`}
              />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}
