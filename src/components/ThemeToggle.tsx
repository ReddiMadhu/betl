import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="relative w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer
                 border theme-transition hover:scale-105 active:scale-95 transition-transform"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border-primary)',
      }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0, scale: [0.8, 1] }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {isDark ? (
          <Moon size={18} style={{ color: 'var(--color-text-secondary)' }} />
        ) : (
          <Sun size={18} style={{ color: 'var(--color-text-secondary)' }} />
        )}
      </motion.div>
    </button>
  );
}
