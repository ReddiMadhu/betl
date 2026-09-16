import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Database,
  HardDrive,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from 'lucide-react';
import { AzureLogo } from './icons/CloudLogos';

/* ─────────────────────────────────────────────────────────
 * Env defaults — auto-fill from VITE_* env variables
 * ───────────────────────────────────────────────────────── */
const ENV_DEFAULTS = {
  storageAccountName: import.meta.env.VITE_AZURE_STORAGE_ACCOUNT ?? '',
  connectionString: import.meta.env.VITE_AZURE_STORAGE_CONNECTION_STRING ?? '',
  containerName: import.meta.env.VITE_AZURE_STORAGE_CONTAINER ?? '',
};

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (config: {
    storageAccountName: string;
    connectionString: string;
    containerName: string;
  }) => void;
}

type ConnectionStatus = 'idle' | 'connecting' | 'success' | 'error';

/* ─────────────────────────────────────────────────────────
 * Floating particle effect for backdrop
 * ───────────────────────────────────────────────────────── */
function FloatingParticle({ delay, size, x, y }: { delay: number; size: number; x: string; y: string }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
        opacity: 0,
      }}
      animate={{
        opacity: [0, 0.3, 0],
        scale: [0.8, 1.2, 0.8],
        y: [0, -20, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────
 * Main Modal Component
 * ───────────────────────────────────────────────────────── */
export default function IngestionModal({ isOpen, onClose, onConnect }: IngestionModalProps) {
  const [storageAccountName, setStorageAccountName] = useState(ENV_DEFAULTS.storageAccountName);
  const [connectionString, setConnectionString] = useState(ENV_DEFAULTS.connectionString);
  const [containerName, setContainerName] = useState(ENV_DEFAULTS.containerName);
  const [showConnectionString, setShowConnectionString] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);


  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStorageAccountName(ENV_DEFAULTS.storageAccountName);
      setConnectionString(ENV_DEFAULTS.connectionString);
      setContainerName(ENV_DEFAULTS.containerName);
      setConnectionStatus('idle');
      setErrorMessage('');
      setShowConnectionString(false);
      // Focus first input after animation
      setTimeout(() => firstInputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isFormValid = storageAccountName.trim() && connectionString.trim() && containerName.trim();

  const handleConnect = useCallback(() => {
    if (!isFormValid) return;
    setConnectionStatus('connecting');
    setErrorMessage('');

    // Simulate connection validation (replace with actual API call)
    setTimeout(() => {
      // Simulated success
      setConnectionStatus('success');
      setTimeout(() => {
        onConnect({
          storageAccountName: storageAccountName.trim(),
          connectionString: connectionString.trim(),
          containerName: containerName.trim(),
        });
      }, 800);
    }, 1800);
  }, [isFormValid, storageAccountName, connectionString, containerName, onConnect]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-label="Azure Storage Connection"
        >
          {/* ── Backdrop ── */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* ── Floating particles on backdrop ── */}
          <FloatingParticle delay={0} size={6} x="20%" y="30%" />
          <FloatingParticle delay={0.5} size={4} x="75%" y="20%" />
          <FloatingParticle delay={1} size={5} x="60%" y="70%" />
          <FloatingParticle delay={1.5} size={3} x="35%" y="80%" />
          <FloatingParticle delay={2} size={4} x="85%" y="50%" />

          {/* ── Modal Card ── */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[520px] rounded-2xl border overflow-hidden theme-transition"
            style={{
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)',
              boxShadow:
                '0 24px 80px rgba(0,0,0,0.25), 0 8px 32px var(--color-engine-shadow), 0 0 0 1px var(--color-border-subtle)',
            }}
          >
            {/* ── Top accent gradient line ── */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent 5%, var(--color-accent) 30%, #FF6B35 50%, var(--color-accent) 70%, transparent 95%)',
              }}
            />

            {/* ── Subtle radial glow behind header ── */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[120px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center top, var(--color-accent-glow) 0%, transparent 70%)',
                opacity: 0.5,
              }}
            />

            {/* ── Header ── */}
            <div className="relative px-6 pt-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {/* Azure icon container */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: 'rgba(0, 120, 212, 0.08)',
                      borderColor: 'rgba(0, 120, 212, 0.22)',
                      boxShadow: '0 0 20px rgba(0, 120, 212, 0.15)',
                    }}
                  >
                    <AzureLogo className="w-6 h-6" />
                  </div>
                  <div>
                    <h2
                      className="text-base font-bold tracking-tight"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      Azure Storage Connection
                    </h2>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: 'var(--color-text-tertiary)' }}
                    >
                      Connect your storage account to begin ingestion
                    </p>
                  </div>
                </div>

                {/* Close button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-tertiary)',
                  }}
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Divider ── */}
            <div
              className="h-px mx-6"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--color-border-primary), transparent)',
              }}
            />

            {/* ── Form Body ── */}
            <div className="px-6 py-5 flex flex-col gap-4">
              {/* Storage Account Name */}
              <div>
                <label
                  htmlFor="storage-account-name"
                  className="flex items-center gap-1.5 text-xs font-semibold mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <HardDrive size={13} style={{ color: 'var(--color-accent)' }} />
                  Storage Account Name
                </label>
                <div className="relative">
                  <input
                    ref={firstInputRef}
                    id="storage-account-name"
                    type="text"
                    value={storageAccountName}
                    onChange={(e) => setStorageAccountName(e.target.value)}
                    onFocus={() => setFocusedField('account')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g., mystorageaccount"
                    disabled={connectionStatus === 'connecting' || connectionStatus === 'success'}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none theme-transition"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor:
                        focusedField === 'account'
                          ? 'var(--color-accent)'
                          : 'var(--color-border-primary)',
                      color: 'var(--color-text-primary)',
                      boxShadow:
                        focusedField === 'account'
                          ? '0 0 0 3px var(--color-accent-glow)'
                          : 'none',
                    }}
                  />
                  {storageAccountName && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle2
                        size={14}
                        style={{ color: '#16a34a' }}
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Connection String */}
              <div>
                <label
                  htmlFor="connection-string"
                  className="flex items-center gap-1.5 text-xs font-semibold mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Lock size={13} style={{ color: 'var(--color-accent)' }} />
                  Connection String
                </label>
                <div className="relative">
                  <input
                    id="connection-string"
                    type={showConnectionString ? 'text' : 'password'}
                    value={connectionString}
                    onChange={(e) => setConnectionString(e.target.value)}
                    onFocus={() => setFocusedField('connection')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="DefaultEndpointsProtocol=https;AccountName=..."
                    disabled={connectionStatus === 'connecting' || connectionStatus === 'success'}
                    className="w-full px-3.5 py-2.5 pr-10 rounded-xl border text-sm font-medium transition-all duration-200 outline-none theme-transition"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor:
                        focusedField === 'connection'
                          ? 'var(--color-accent)'
                          : 'var(--color-border-primary)',
                      color: 'var(--color-text-primary)',
                      boxShadow:
                        focusedField === 'connection'
                          ? '0 0 0 3px var(--color-accent-glow)'
                          : 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConnectionString((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-200"
                    style={{ color: 'var(--color-text-tertiary)' }}
                    aria-label={showConnectionString ? 'Hide connection string' : 'Show connection string'}
                    tabIndex={-1}
                  >
                    {showConnectionString ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Container Name */}
              <div>
                <label
                  htmlFor="container-name"
                  className="flex items-center gap-1.5 text-xs font-semibold mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <Database size={13} style={{ color: 'var(--color-accent)' }} />
                  Container Name
                </label>
                <div className="relative">
                  <input
                    id="container-name"
                    type="text"
                    value={containerName}
                    onChange={(e) => setContainerName(e.target.value)}
                    onFocus={() => setFocusedField('container')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="e.g., bi-assets"
                    disabled={connectionStatus === 'connecting' || connectionStatus === 'success'}
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none theme-transition"
                    style={{
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderColor:
                        focusedField === 'container'
                          ? 'var(--color-accent)'
                          : 'var(--color-border-primary)',
                      color: 'var(--color-text-primary)',
                      boxShadow:
                        focusedField === 'container'
                          ? '0 0 0 3px var(--color-accent-glow)'
                          : 'none',
                    }}
                  />
                  {containerName && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle2
                        size={14}
                        style={{ color: '#16a34a' }}
                      />
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Error message */}
              <AnimatePresence>
                {connectionStatus === 'error' && errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="flex items-start gap-2 px-3.5 py-2.5 rounded-xl border"
                    style={{
                      backgroundColor: 'rgba(239, 68, 68, 0.08)',
                      borderColor: 'rgba(239, 68, 68, 0.25)',
                      color: '#ef4444',
                    }}
                  >
                    <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    <span className="text-xs font-medium">{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success message */}
              <AnimatePresence>
                {connectionStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -4, height: 0 }}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border"
                    style={{
                      backgroundColor: 'rgba(34, 197, 94, 0.08)',
                      borderColor: 'rgba(34, 197, 94, 0.25)',
                      color: '#16a34a',
                    }}
                  >
                    <CheckCircle2 size={14} className="shrink-0" />
                    <span className="text-xs font-semibold">
                      Connected successfully! Starting ingestion…
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Divider ── */}
            <div
              className="h-px mx-6"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--color-border-primary), transparent)',
              }}
            />

            {/* ── Footer ── */}
            <div className="px-6 py-4 flex items-center justify-end">
              {/* Action buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={connectionStatus === 'connecting'}
                  className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer border"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleConnect}
                  disabled={
                    !isFormValid ||
                    connectionStatus === 'connecting' ||
                    connectionStatus === 'success'
                  }
                  className="relative inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{
                    backgroundColor:
                      connectionStatus === 'success'
                        ? '#16a34a'
                        : !isFormValid
                        ? 'var(--color-border-secondary)'
                        : 'var(--color-accent)',
                    color:
                      !isFormValid
                        ? 'var(--color-text-tertiary)'
                        : '#FFFFFF',
                    boxShadow:
                      connectionStatus === 'success'
                        ? '0 0 20px rgba(34, 197, 94, 0.4)'
                        : isFormValid
                        ? '0 2px 12px var(--color-accent-glow)'
                        : 'none',
                    opacity:
                      connectionStatus === 'connecting' ? 0.85 : 1,
                  }}
                >
                  {/* Shimmer effect on connect button */}
                  {isFormValid && connectionStatus === 'idle' && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{ backgroundPosition: ['100% 0', '-100% 0'] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                  )}

                  {connectionStatus === 'idle' && (
                    <>
                      <span>Connect & Ingest</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                  {connectionStatus === 'connecting' && (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Connecting…</span>
                    </>
                  )}
                  {connectionStatus === 'success' && (
                    <>
                      <CheckCircle2 size={13} />
                      <span>Connected!</span>
                    </>
                  )}
                  {connectionStatus === 'error' && (
                    <>
                      <span>Retry Connection</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ── Bottom accent line ── */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--color-border-primary), transparent)',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
