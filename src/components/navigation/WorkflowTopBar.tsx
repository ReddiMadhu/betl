import { Menu, ChevronRight, Home, Zap, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import type { ViewState } from './workflowStages';
import { WORKFLOW_STAGES } from './workflowStages';

interface WorkflowTopBarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
}

export default function WorkflowTopBar({
  currentView,
  onNavigate,
  collapsed,
  onToggleCollapse,
  onOpenMobile,
}: WorkflowTopBarProps) {
  // Find current stage & sub-item
  const currentStage = WORKFLOW_STAGES.find((s) => s.views.includes(currentView));
  const currentSubItem = currentStage?.subItems.find((sub) => sub.id === currentView);

  return (
    <header
      className="sticky top-0 z-30 h-16 border-b backdrop-blur-md theme-transition px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-bg-primary) 85%, transparent)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      {/* ── Left: Controls & Breadcrumb ── */}
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={onOpenMobile}
          className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border transition-colors"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-secondary)',
          }}
          aria-label="Open navigation menu"
        >
          <Menu size={16} />
        </button>

        {/* Desktop collapse toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden lg:flex w-8 h-8 rounded-lg items-center justify-center cursor-pointer border transition-colors hover:border-amber-500/30"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-secondary)',
          }}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>

        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs truncate" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 text-[12px] font-medium bg-transparent border-none cursor-pointer p-0 transition-colors hover:underline truncate"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            <Home size={13} className="shrink-0" />
            <span className="hidden sm:inline">Overview</span>
          </button>

          {currentStage && (
            <>
              <ChevronRight size={12} className="shrink-0 text-stone-400" />
              <button
                type="button"
                onClick={() => onNavigate(currentStage.views[0])}
                className="font-semibold text-[12px] bg-transparent border-none cursor-pointer p-0 transition-colors hover:underline truncate"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Stage {currentStage.stageNumber}: {currentStage.shortTitle}
              </button>
            </>
          )}

          {currentSubItem && (
            <>
              <ChevronRight size={12} className="shrink-0 text-stone-400" />
              <span
                className="font-bold text-[12px] truncate"
                style={{ color: 'var(--color-accent)' }}
              >
                {currentSubItem.label}
              </span>
            </>
          )}
        </nav>
      </div>

      {/* ── Right: Stage Badge & Theme ── */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Stage counter pill */}
        {currentStage && (
          <div
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border"
            style={{
              backgroundColor: 'var(--color-accent-subtle)',
              borderColor: 'color-mix(in srgb, var(--color-accent) 25%, transparent)',
              color: 'var(--color-accent)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            <span>STAGE {currentStage.stageNumber} OF 3</span>
          </div>
        )}

        {/* AI Engine active indicator */}
        <div
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] border"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border-subtle)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Zap size={12} style={{ color: 'var(--color-accent)' }} />
          <span>AI Copilot Active</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Exit back to Home button */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border transition-colors hover:opacity-90"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-primary)',
          }}
        >
          <span>Exit Workflow</span>
        </button>
      </div>
    </header>
  );
}
