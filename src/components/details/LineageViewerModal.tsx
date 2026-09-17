import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2, ExternalLink, Download } from 'lucide-react';
import { downloadSvgFile, openSvgInNewTab } from '../../utils/lineageViewer';

interface LineageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  svgContent: string;
  workflowTitle?: string;
  toolCount?: number;
  connectionCount?: number;
}

export default function LineageViewerModal({
  isOpen,
  onClose,
  svgContent,
  workflowTitle = 'End-to-End Lineage',
  toolCount = 39,
  connectionCount = 41,
}: LineageViewerModalProps) {
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const viewportRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan on open
  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setPanPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Handle keyboard shortcuts (Escape to close, +/- for zoom)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-' || e.key === '_') handleZoomOut();
      if (e.key === '0') handleReset();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleZoomIn = () => setZoom((prev) => Math.min(2.5, prev + 0.15));
  const handleZoomOut = () => setZoom((prev) => Math.max(0.4, prev - 0.15));
  const handleReset = () => {
    setZoom(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleFitWidth = () => {
    if (viewportRef.current) {
      const containerWidth = viewportRef.current.clientWidth - 64;
      const targetZoom = Math.max(0.4, Math.min(1.4, containerWidth / 1500));
      setZoom(targetZoom);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only allow pan on left click
    if (e.button !== 0) return;
    setIsPanning(true);
    setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleOpenInNewTab = () => {
    openSvgInNewTab(svgContent, workflowTitle);
  };

  const handleDownload = () => {
    downloadSvgFile(svgContent, `${workflowTitle}_Lineage.svg`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-[96vw] h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--color-bg-elevated, #0d1326)',
              borderColor: 'var(--color-engine-border, #1e293b)',
              color: 'var(--color-text-primary, #f8fafc)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b shrink-0"
              style={{
                backgroundColor: 'rgba(13, 19, 38, 0.95)',
                borderColor: 'var(--color-border-primary, #1e293b)',
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className="px-2.5 py-1 rounded-md text-[10.5px] font-bold uppercase tracking-wider shrink-0"
                  style={{
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.25)',
                  }}
                >
                  Lineage DAG
                </span>
                <div className="truncate">
                  <h2 className="text-sm sm:text-base font-bold truncate">
                    {workflowTitle}
                  </h2>
                  <p className="text-[11px] text-gray-400">
                    {toolCount} tools · {connectionCount} connections · Interactive Vector SVG
                  </p>
                </div>
              </div>

              {/* Toolbar Controls */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Zoom Controls */}
                <div
                  className="hidden sm:flex items-center rounded-lg border p-0.5"
                  style={{
                    backgroundColor: 'var(--color-surface, #131d36)',
                    borderColor: 'var(--color-border-subtle, #273552)',
                  }}
                >
                  <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="text-xs font-semibold px-2 min-w-[46px] text-center tabular-nums text-gray-300">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <button
                    onClick={handleReset}
                    title="Reset to 100%"
                    className="p-1.5 rounded hover:bg-white/10 transition-colors text-gray-300"
                  >
                    <RotateCcw size={13} />
                  </button>
                  <button
                    onClick={handleFitWidth}
                    title="Fit Width"
                    className="p-1.5 rounded hover:bg-white/10 transition-colors text-gray-300"
                  >
                    <Maximize2 size={13} />
                  </button>
                </div>

                {/* Open in New Tab Button (Client Blob URL, 100% Azure Compatible) */}
                <button
                  onClick={handleOpenInNewTab}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold hover:bg-white/10 transition-colors"
                  style={{
                    backgroundColor: 'var(--color-surface, #131d36)',
                    borderColor: 'var(--color-border-subtle, #273552)',
                  }}
                  title="Open full interactive SVG in a new tab"
                >
                  <ExternalLink size={13} />
                  <span className="hidden md:inline">Open in New Tab</span>
                </button>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: 'var(--color-accent, #38bdf8)',
                    color: '#04101e',
                  }}
                  title="Download SVG file"
                >
                  <Download size={13} />
                  <span className="hidden md:inline">Download SVG</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Hint bar */}
            <div
              className="px-5 py-1.5 text-[11px] flex items-center justify-between border-b shrink-0 text-gray-400"
              style={{
                backgroundColor: 'rgba(9, 14, 26, 0.8)',
                borderColor: 'var(--color-border-subtle, #1e293b)',
              }}
            >
              <span>Click and drag to pan around · Scroll or use +/- to zoom</span>
              <span className="hidden sm:inline">Press Esc to exit</span>
            </div>

            {/* Canvas Viewport */}
            <div
              ref={viewportRef}
              className={`flex-1 overflow-hidden relative select-none ${
                isPanning ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{ backgroundColor: '#070b14' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div
                className="absolute origin-top-left transition-transform duration-75"
                style={{
                  transform: `translate(${panPosition.x + 32}px, ${panPosition.y + 32}px) scale(${zoom})`,
                  minWidth: '1500px',
                }}
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
