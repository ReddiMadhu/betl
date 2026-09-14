import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  GitMerge,
  ArrowRightLeft,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Zap,
  X,
} from 'lucide-react';
import type { ViewState } from './workflowStages';
import ThemeToggle from '../ThemeToggle';

export interface NavItem {
  id: 'discovery' | 'rationalization' | 'migration' | 'take-a-glance';
  title: string;
  icon: typeof Compass;
  views: ViewState[];
  targetView: (visited: Set<ViewState>) => ViewState;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'discovery',
    title: 'Assessment',
    icon: Compass,
    views: ['assessment', 'results', 'asset-detail'],
    targetView: (visited) => (visited.has('results') ? 'results' : 'assessment'),
  },
  {
    id: 'rationalization',
    title: 'Rationalization',
    icon: GitMerge,
    views: ['rationalization', 'rationalization-results'],
    targetView: (visited) =>
      visited.has('rationalization-results') ? 'rationalization-results' : 'rationalization',
  },
  {
    id: 'migration',
    title: 'Migration',
    icon: ArrowRightLeft,
    views: ['migration', 'migration-loading', 'migration-results', 'migration-tb-pbi', 'migration-mstr-tb', 'migration-alt-py'],
    targetView: (visited) => {
      if (visited.has('migration-results')) return 'migration-results';
      if (visited.has('migration-loading')) return 'migration-loading';
      return 'migration';
    },
  },
  {
    id: 'take-a-glance',
    title: 'Take a Glance',
    icon: LayoutDashboard,
    views: ['take-a-glance'],
    targetView: () => 'take-a-glance',
  },
];

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  visitedViews: Set<ViewState>;
  collapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export default function Sidebar({
  currentView,
  onNavigate,
  visitedViews,
  collapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const handleItemClick = (item: NavItem) => {
    onNavigate(item.targetView(visitedViews));
    onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full select-none">
      {/* ── Brand / Header ── */}
      <div
        className="h-16 flex items-center border-b shrink-0 px-3"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        {collapsed ? (
          /* Collapsed mode: Centered Logo only */
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-transparent border-none cursor-pointer transition-opacity hover:opacity-85"
              title="AI on BI and ETL Home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <Zap size={16} color="#fff" strokeWidth={2.5} />
              </div>
            </button>
          </div>
        ) : (
          /* Expanded mode: Logo on left, collapse button on right */
          <div className="w-full flex items-center justify-between min-w-0">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                onCloseMobile();
              }}
              className="flex items-center gap-2.5 min-w-0 text-left bg-transparent border-none cursor-pointer p-1 rounded-lg transition-opacity hover:opacity-85"
              title="AI on BI and ETL Home"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                <Zap size={16} color="#fff" strokeWidth={2.5} />
              </div>
              <div className="min-w-0 flex flex-col">
                <span
                  className="text-[15px] font-bold tracking-tight truncate leading-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <span style={{ color: 'var(--color-accent)' }}>AI</span> on BI and ETL
                </span>
                <span
                  className="text-[10px] tracking-wide uppercase font-medium truncate"
                  style={{ color: 'var(--color-text-tertiary)' }}
                >
                  Modernization
                </span>
              </div>
            </button>

            {/* Desktop Collapse button */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden lg:flex w-7 h-7 rounded-lg items-center justify-center cursor-pointer transition-colors border shrink-0"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'var(--color-border-primary)',
                color: 'var(--color-text-secondary)',
              }}
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft size={15} />
            </button>
          </div>
        )}

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden flex w-8 h-8 rounded-lg items-center justify-center cursor-pointer transition-colors border ml-auto"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border-primary)',
            color: 'var(--color-text-secondary)',
          }}
          aria-label="Close menu"
        >
          <X size={16} />
        </button>
      </div>

      {/* ── Collapsed mode: Expand toggle button below header ── */}
      {collapsed && (
        <div className="pt-3 pb-1 flex justify-center">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-10 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors border"
            style={{
              backgroundColor: 'var(--color-bg-tertiary)',
              borderColor: 'var(--color-border-primary)',
              color: 'var(--color-text-secondary)',
            }}
            title="Expand sidebar"
            aria-label="Expand sidebar"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {/* ── Workflow Navigation Items ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5" aria-label="Workflow Stages">
        {NAV_ITEMS.map((item) => {
          const isActive = item.views.includes(currentView);
          const ItemIcon = item.icon;

          if (collapsed) {
            // Collapsed rail button with gradient on active
            return (
              <div key={item.id} className="relative group flex justify-center">
                <button
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer border relative"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(251, 78, 11, 0.18) 0%, rgba(251, 78, 11, 0.05) 100%)'
                      : 'transparent',
                    borderColor: isActive
                      ? 'rgba(251, 78, 11, 0.35)'
                      : 'transparent',
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    boxShadow: isActive ? '0 2px 10px rgba(251, 78, 11, 0.1)' : 'none',
                  }}
                  aria-label={item.title}
                >
                  <ItemIcon size={18} />
                </button>

                {/* Floating Tooltip */}
                <div
                  className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 pointer-events-none hidden group-hover:flex py-1.5 px-3 rounded-lg text-xs font-semibold whitespace-nowrap shadow-xl border theme-transition"
                  style={{
                    backgroundColor: 'var(--color-bg-elevated)',
                    borderColor: 'var(--color-border-primary)',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {item.title}
                </div>
              </div>
            );
          }

          // Expanded item with sleek gradient style
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] transition-all duration-200 cursor-pointer group text-left border overflow-hidden"
              style={{
                background: isActive
                  ? 'linear-gradient(90deg, rgba(251, 78, 11, 0.14) 0%, rgba(251, 78, 11, 0.03) 100%)'
                  : 'transparent',
                borderColor: isActive
                  ? 'rgba(251, 78, 11, 0.28)'
                  : 'transparent',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 600 : 500,
                boxShadow: isActive ? '0 2px 12px rgba(251, 78, 11, 0.06)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }
              }}
            >
              <ItemIcon
                size={18}
                className="shrink-0 transition-transform group-hover:scale-105"
                style={{ color: isActive ? 'var(--color-accent)' : 'inherit' }}
              />
              <span className="truncate">{item.title}</span>
            </button>
          );
        })}
      </nav>

      {/* ── Bottom Section: Theme Toggle ── */}
      <div
        className="p-3 border-t shrink-0 mt-auto"
        style={{ borderColor: 'var(--color-border-subtle)' }}
      >
        {!collapsed ? (
          <div className="flex items-center justify-between px-1">
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Theme Mode
            </span>
            <ThemeToggle />
          </div>
        ) : (
          <div className="flex justify-center">
            <ThemeToggle />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 h-screen sticky top-0 z-40 border-r theme-transition transition-all duration-300 ease-in-out ${
          collapsed ? 'w-[72px]' : 'w-[250px]'
        }`}
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border-primary)',
        }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseMobile}
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-xs"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[260px] max-w-[85vw] border-r shadow-2xl flex flex-col"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                borderColor: 'var(--color-border-primary)',
              }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
