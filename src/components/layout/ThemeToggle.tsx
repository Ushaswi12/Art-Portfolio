'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useMagneticCursor } from '@/components/effects/Cursor';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const magneticCursor = useMagneticCursor();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="btn-icon w-10 h-10"
        aria-label="Loading theme toggle"
      >
        <Sun size={20} className="text-[var(--color-text-muted)]" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="btn-icon w-10 h-10 relative overflow-hidden"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      {...magneticCursor}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          initial={false}
          animate={{
            rotate: resolvedTheme === 'dark' ? 0 : 180,
            scale: [1, 0.8, 1],
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {resolvedTheme === 'dark' ? (
            <Sun size={20} className="text-[var(--color-text)]" aria-hidden="true" />
          ) : (
            <Moon size={20} className="text-[var(--color-text)]" aria-hidden="true" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}