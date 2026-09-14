import { Zap } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md border-b theme-transition"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-bg-primary) 85%, transparent)',
        borderColor: 'var(--color-border-subtle)',
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-accent)' }}
          >
            <Zap size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            <span style={{ color: 'var(--color-accent)' }}>AI</span> on BI and ETL
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
