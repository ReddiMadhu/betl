import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  FileCode,
  FileSpreadsheet,
  FolderTree,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { exportArtifacts } from '../../../data/migrationData';
import { TECHNOLOGY_LOGOS } from '../../../data/discoveryData';
import type { ExportArtifactItem } from '../../../data/migrationData';

export default function ExportCenterView() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());
  const [copiedShaId, setCopiedShaId] = useState<string | null>(null);
  const [expandedCodeId, setExpandedCodeId] = useState<string | null>(null);

  const handleDownload = (artifact: ExportArtifactItem) => {
    setDownloadingId(artifact.id);

    // Create a real browser simulated download
    setTimeout(() => {
      const blob = new Blob([artifact.codeSnippet], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = artifact.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadingId(null);
      setDownloadedIds((prev) => new Set(prev).add(artifact.id));
    }, 800);
  };

  const handleDownloadAll = () => {
    setDownloadingId('all');
    setTimeout(() => {
      const combined = exportArtifacts.map((a) => `// File: ${a.fileName}\n${a.codeSnippet}\n\n`).join('\n');
      const blob = new Blob([combined], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'modernized_migration_bundle.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadingId(null);
      setDownloadedIds(new Set(exportArtifacts.map((a) => a.id)));
    }, 1200);
  };

  const handleCopySha = (sha: string, id: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedShaId(id);
    setTimeout(() => setCopiedShaId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ── Header / Actions bar ── */}
      <div className="p-4 rounded-xl border bg-[var(--color-surface)] flex flex-wrap items-center justify-between gap-4" style={{ borderColor: 'var(--color-border-primary)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center p-2 border shrink-0 text-[var(--color-accent)]"
            style={{
              backgroundColor: 'var(--color-accent-subtle)',
              borderColor: 'color-mix(in srgb, var(--color-accent) 25%, var(--color-border-primary))',
            }}
          >
            <FolderTree size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--color-text-primary)' }}>
              Production Artifact Explorer
            </h3>
            <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {exportArtifacts.length} deployable assets generated with cryptographic verification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleDownloadAll}
            disabled={downloadingId === 'all'}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all border"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.06) 100%)',
              borderColor: 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))',
              color: 'var(--color-accent)',
              boxShadow: '0 2px 10px rgba(251, 78, 11, 0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(251, 78, 11, 0.28) 0%, rgba(251, 78, 11, 0.12) 100%)';
              e.currentTarget.style.borderColor = 'var(--color-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.06) 100%)';
              e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))';
            }}
          >
            <Download size={14} className={downloadingId === 'all' ? 'animate-bounce' : ''} />
            <span>{downloadingId === 'all' ? 'Packaging Bundle…' : 'Download Complete Package (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* ── Artifact Cards ── */}
      <div className="space-y-3">
        {exportArtifacts.map((art) => {
          const isDownloading = downloadingId === art.id;
          const isDownloaded = downloadedIds.has(art.id);
          const isCodeOpen = expandedCodeId === art.id;

          return (
            <div
              key={art.id}
              className="rounded-xl border p-4 transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border-primary)',
                boxShadow: '0 1px 3px var(--color-card-shadow)',
              }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* File info */}
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center p-2 border shrink-0 mt-0.5"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor: 'var(--color-border-primary)',
                    }}
                  >
                    {art.fileName.endsWith('.xlsx') ? (
                      <FileSpreadsheet size={20} className="text-emerald-500" />
                    ) : art.fileName.endsWith('.py') ? (
                      <FileCode size={20} className="text-blue-500" />
                    ) : art.fileName.endsWith('.json') ? (
                      <ShieldCheck size={20} className="text-amber-500" />
                    ) : (
                      <img
                        src={TECHNOLOGY_LOGOS[art.targetTechnology]}
                        alt={art.targetTechnology}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h4 className="text-sm font-bold font-mono truncate" style={{ color: 'var(--color-text-primary)' }}>
                        {art.fileName}
                      </h4>
                      <span className="text-xs font-mono text-[var(--color-text-tertiary)]">
                        ({art.fileSize})
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {art.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => setExpandedCodeId(isCodeOpen ? null : art.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-colors"
                    style={{
                      background:
                        isCodeOpen
                          ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                          : 'var(--color-bg-tertiary)',
                      borderColor:
                        isCodeOpen
                          ? 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border-primary))'
                          : 'var(--color-border-primary)',
                      color: isCodeOpen ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                      boxShadow: isCodeOpen ? '0 2px 8px rgba(251, 78, 11, 0.12)' : 'none',
                    }}
                  >
                    <Code2 size={13} className="inline mr-1" />
                    <span>Preview</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(art)}
                    disabled={isDownloading}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-all"
                    style={{
                      backgroundColor: isDownloaded ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-bg-tertiary)',
                      borderColor: isDownloaded ? 'rgba(16, 185, 129, 0.3)' : 'var(--color-border-primary)',
                      color: isDownloaded ? '#10B981' : 'var(--color-text-primary)',
                    }}
                  >
                    {isDownloading ? (
                      <Download size={13} className="animate-bounce text-[var(--color-accent)]" />
                    ) : isDownloaded ? (
                      <CheckCircle2 size={13} className="text-emerald-500" />
                    ) : (
                      <Download size={13} />
                    )}
                    <span>{isDownloading ? 'Downloading…' : isDownloaded ? 'Downloaded' : 'Download'}</span>
                  </button>
                </div>
              </div>

              {/* SHA-256 verification hash banner */}
              <div className="mt-3 pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-[11px]" style={{ borderColor: 'var(--color-border-subtle)' }}>
                <span className="font-mono text-[var(--color-text-tertiary)] truncate max-w-md">
                  SHA-256: {art.sha256}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopySha(art.sha256, art.id)}
                  className="text-[var(--color-accent)] hover:underline cursor-pointer flex items-center gap-1 font-semibold"
                >
                  {copiedShaId === art.id ? <Check size={11} className="text-emerald-500" /> : <Copy size={11} />}
                  <span>{copiedShaId === art.id ? 'Hash Copied' : 'Copy Hash'}</span>
                </button>
              </div>

              {/* Code Preview Drawer */}
              <AnimatePresence>
                {isCodeOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t space-y-2"
                    style={{ borderColor: 'var(--color-border-subtle)' }}
                  >
                    <pre className="font-mono text-xs p-3 rounded-lg bg-[var(--color-bg-tertiary)] border overflow-x-auto text-[var(--color-text-primary)] leading-relaxed" style={{ borderColor: 'var(--color-border-primary)' }}>
                      <code>{art.codeSnippet}</code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
