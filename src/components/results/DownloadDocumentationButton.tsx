import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderArchive,
  BarChart3,
  GitBranch,
  FileSpreadsheet,
} from 'lucide-react';
import { downloadDocumentationZip } from '../../utils/documentationDownloader';
import type { DownloadProgress } from '../../utils/documentationDownloader';

interface Props {
  type: 'assessment' | 'rationalization';
  className?: string;
  variant?: 'primary' | 'secondary' | 'compact';
}

interface TooltipColumn {
  heading: string;
  subheading: string;
  badge: string;
  badgeColor: string;
  accentColor: string;
  icon: typeof BarChart3;
  points: string[];
}

interface TooltipConfig {
  title: string;
  bi: TooltipColumn;
  etl: TooltipColumn;
}

const TOOLTIP_DATA: Record<'assessment' | 'rationalization', TooltipConfig> = {
  assessment: {
    title: 'Assessment Documentation Package',
    bi: {
      heading: 'BI',
      subheading: 'Business Intelligence',
      badge: 'BI Specs',
      badgeColor: 'rgba(59, 130, 246, 0.12)',
      accentColor: '#3B82F6',
      icon: BarChart3,
      points: [
        'Dashboard Inventory',
        'Individual Documentation Specification',
      ],
    },
    etl: {
      heading: 'ETL',
      subheading: 'Data Pipelines',
      badge: 'ETL Specs',
      badgeColor: 'rgba(16, 185, 129, 0.12)',
      accentColor: '#10B981',
      icon: GitBranch,
      points: [
        'Workflow Inventory',
        'Individual Documentation Specification',
        'Source-to-Target Mapping',
      ],
    },
  },
  rationalization: {
    title: 'Rationalization Documentation Package',
    bi: {
      heading: 'BI',
      subheading: 'Business Intelligence',
      badge: 'BI Strategy',
      badgeColor: 'rgba(59, 130, 246, 0.12)',
      accentColor: '#3B82F6',
      icon: BarChart3,
      points: [
        'Rationalization Recommendations with Rationale — BI',
      ],
    },
    etl: {
      heading: 'ETL',
      subheading: 'Data Pipelines',
      badge: 'ETL Strategy',
      badgeColor: 'rgba(16, 185, 129, 0.12)',
      accentColor: '#10B981',
      icon: GitBranch,
      points: [
        'Rationalization Recommendations with Rationale — ETL',
      ],
    },
  },
};

export default function DownloadDocumentationButton({
  type,
  className = '',
  variant = 'secondary',
}: Props) {
  const [downloadState, setDownloadState] = useState<DownloadProgress>({
    status: 'idle',
    progress: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const isWorking =
    downloadState.status === 'fetching' ||
    downloadState.status === 'zipping' ||
    downloadState.status === 'downloading';
  const isSuccess = downloadState.status === 'completed';
  const isError = downloadState.status === 'error';

  const handleDownload = async () => {
    if (isWorking) return;
    setIsHovered(false);

    try {
      await downloadDocumentationZip(type, (progress) => {
        setDownloadState(progress);
        if (progress.status === 'completed') {
          setTimeout(() => {
            setDownloadState({ status: 'idle', progress: 0 });
          }, 3500);
        }
      });
    } catch (err) {
      console.error('Documentation download error:', err);
      setTimeout(() => {
        setDownloadState({ status: 'idle', progress: 0 });
      }, 4000);
    }
  };

  const label =
    type === 'assessment'
      ? 'Download Assessment Docs'
      : 'Download Rationalization Docs';

  const tooltipConfig = TOOLTIP_DATA[type];

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDownload}
        disabled={isWorking}
        className={`group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-semibold cursor-pointer transition-all duration-300 select-none ${className}`}
        style={{
          backgroundColor:
            variant === 'primary'
              ? 'var(--color-accent)'
              : 'var(--color-surface)',
          borderColor:
            variant === 'primary'
              ? 'transparent'
              : 'var(--color-border-primary)',
          borderWidth: '1px',
          borderStyle: 'solid',
          color:
            variant === 'primary'
              ? '#FFFFFF'
              : 'var(--color-text-primary)',
          boxShadow:
            variant === 'primary'
              ? '0 2px 8px var(--color-accent-glow)'
              : '0 1px 3px var(--color-card-shadow)',
        }}
        onMouseEnter={(e) => {
          if (variant === 'secondary') {
            e.currentTarget.style.borderColor = 'var(--color-accent)';
            e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'secondary') {
            e.currentTarget.style.borderColor = 'var(--color-border-primary)';
            e.currentTarget.style.backgroundColor = 'var(--color-surface)';
          }
        }}
      >
        {/* State icon */}
        {isWorking ? (
          <Loader2 size={15} className="animate-spin text-accent shrink-0" />
        ) : isSuccess ? (
          <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
        ) : isError ? (
          <AlertCircle size={15} className="text-red-500 shrink-0" />
        ) : (
          <FolderArchive size={15} className="shrink-0 group-hover:text-accent transition-colors" />
        )}

        {/* Text */}
        <span className="truncate">
          {isWorking
            ? `Packaging ${downloadState.progress}%...`
            : isSuccess
            ? 'Downloaded ZIP!'
            : isError
            ? 'Download Failed'
            : label}
        </span>

        <Download
          size={13}
          className={`shrink-0 transition-transform duration-300 opacity-60 group-hover:opacity-100 ${
            isWorking ? 'hidden' : 'group-hover:translate-y-0.5'
          }`}
        />
      </motion.button>

      {/* ── Effective 2-Column Custom Tooltip ── */}
      <AnimatePresence>
        {isHovered && !isWorking && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2.5 z-50 pointer-events-none w-[440px] sm:w-[480px] max-w-[calc(100vw-2rem)] rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden origin-top-right"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.25), 0 0 0 1px var(--color-border-subtle)',
            }}
          >
            {/* Top Pointer Arrow */}
            <div
              className="absolute -top-1.5 right-6 w-3 h-3 rotate-45 border-t border-l"
              style={{
                backgroundColor: 'var(--color-bg-elevated)',
                borderColor: 'var(--color-border-primary)',
              }}
            />

            {/* Header Ribbon */}
            <div
              className="relative px-4 py-2.5 flex items-center justify-between border-b"
              style={{
                borderColor: 'var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-tertiary)',
              }}
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={14} className="text-accent shrink-0" />
                <span
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {tooltipConfig.title}
                </span>
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                style={{
                  backgroundColor: 'var(--color-accent-subtle)',
                  color: 'var(--color-accent)',
                }}
              >
                ZIP Package
              </span>
            </div>

            {/* 2-Column Content Layout (BI on Left, ETL on Right) */}
            <div className="grid grid-cols-2 divide-x divide-[var(--color-border-subtle)] p-3.5 gap-3">
              {/* Left Column: BI */}
              <div className="flex flex-col pr-1">
                {/* BI Heading */}
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-dashed" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: tooltipConfig.bi.badgeColor }}
                    >
                      <tooltipConfig.bi.icon
                        size={12}
                        style={{ color: tooltipConfig.bi.accentColor }}
                      />
                    </div>
                    <span
                      className="text-xs font-bold tracking-tight"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {tooltipConfig.bi.heading}
                    </span>
                  </div>
                  <span
                    className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: tooltipConfig.bi.badgeColor,
                      color: tooltipConfig.bi.accentColor,
                    }}
                  >
                    {tooltipConfig.bi.badge}
                  </span>
                </div>

                {/* BI Points */}
                <div className="space-y-2 mt-0.5">
                  {tooltipConfig.bi.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{
                          backgroundColor: tooltipConfig.bi.accentColor,
                          boxShadow: `0 0 0 2px ${tooltipConfig.bi.badgeColor}`,
                        }}
                      />
                      <span
                        className="text-[11.5px] leading-snug font-medium"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: ETL */}
              <div className="flex flex-col pl-2">
                {/* ETL Heading */}
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-dashed" style={{ borderColor: 'var(--color-border-subtle)' }}>
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ backgroundColor: tooltipConfig.etl.badgeColor }}
                    >
                      <tooltipConfig.etl.icon
                        size={12}
                        style={{ color: tooltipConfig.etl.accentColor }}
                      />
                    </div>
                    <span
                      className="text-xs font-bold tracking-tight"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {tooltipConfig.etl.heading}
                    </span>
                  </div>
                  <span
                    className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: tooltipConfig.etl.badgeColor,
                      color: tooltipConfig.etl.accentColor,
                    }}
                  >
                    {tooltipConfig.etl.badge}
                  </span>
                </div>

                {/* ETL Points */}
                <div className="space-y-2 mt-0.5">
                  {tooltipConfig.etl.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{
                          backgroundColor: tooltipConfig.etl.accentColor,
                          boxShadow: `0 0 0 2px ${tooltipConfig.etl.badgeColor}`,
                        }}
                      />
                      <span
                        className="text-[11.5px] leading-snug font-medium"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div
              className="px-4 py-2 border-t flex items-center justify-between text-[10.5px]"
              style={{
                borderColor: 'var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-tertiary)',
              }}
            >
              <span style={{ color: 'var(--color-text-tertiary)' }}>
                Includes comprehensive spreadsheets & technical specifications
              </span>
              <span className="font-semibold text-accent flex items-center gap-1 shrink-0">
                Click to export
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating status tooltip during packaging */}
      <AnimatePresence>
        {isWorking && downloadState.currentFile && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 z-50 px-3 py-2 rounded-lg border shadow-xl text-[11px] backdrop-blur-md w-72"
            style={{
              backgroundColor: 'var(--color-bg-elevated)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-text-secondary)',
            }}
          >
            <div className="flex items-center justify-between mb-1.5 font-medium">
              <span style={{ color: 'var(--color-text-primary)' }}>
                {downloadState.status === 'zipping'
                  ? 'Compressing ZIP'
                  : 'Bundling Documentation'}
              </span>
              <span className="font-mono text-accent">
                {downloadState.progress}%
              </span>
            </div>

            {/* Progress bar */}
            <div
              className="h-1.5 w-full rounded-full overflow-hidden mb-1.5"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <div
                className="h-full transition-all duration-200 rounded-full"
                style={{
                  width: `${downloadState.progress}%`,
                  backgroundColor: 'var(--color-accent)',
                }}
              />
            </div>

            <p className="truncate font-mono text-[10px] opacity-75">
              {downloadState.currentFile}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

