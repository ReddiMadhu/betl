import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Loader2, CheckCircle2, AlertCircle, FolderArchive } from 'lucide-react';
import { downloadDocumentationZip } from '../../utils/documentationDownloader';
import type { DownloadProgress } from '../../utils/documentationDownloader';

interface Props {
  type: 'assessment' | 'rationalization';
  className?: string;
  variant?: 'primary' | 'secondary' | 'compact';
}

export default function DownloadDocumentationButton({
  type,
  className = '',
  variant = 'secondary',
}: Props) {
  const [downloadState, setDownloadState] = useState<DownloadProgress>({
    status: 'idle',
    progress: 0,
  });

  const isWorking =
    downloadState.status === 'fetching' ||
    downloadState.status === 'zipping' ||
    downloadState.status === 'downloading';
  const isSuccess = downloadState.status === 'completed';
  const isError = downloadState.status === 'error';

  const handleDownload = async () => {
    if (isWorking) return;

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

  return (
    <div className="relative inline-flex items-center">
      <motion.button
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleDownload}
        disabled={isWorking}
        title="Download complete documentation folder (Portfolio -> BI & ETL -> Technologies -> Assets with Excel Workbooks & Markdown Specs)"
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
