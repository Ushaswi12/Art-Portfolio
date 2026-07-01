'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

/**
 * Detect scroll direction (up = true, down = false) with no layout thrashing.
 */
function useScrollDirection() {
  const [goingUp, setGoingUp] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setGoingUp(y < lastY.current);
          lastY.current = y;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return goingUp;
}

/**
 * HeaderMobile – two behavioural variants:
 *   hideOnScroll = false → sticky glass bar (Option A)
 *   hideOnScroll = true  → auto‑hide on scroll (Option B)
 */
export const HeaderMobile = ({ hideOnScroll = false }: { hideOnScroll?: boolean }) => {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const showing = hideOnScroll ? useScrollDirection() : true;

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 md:px-6 lg:px-8 h-14 glass glass-border-b`}
      animate={{
        y: showing ? 0 : '-100%',
        transition: prefersReduced ? { duration: 0 } : { ease: 'easeOut', duration: 0.25 },
      }}
    >
      {/* Branding */}
      <Link href="/" className="font-display text-xl font-semibold text-[var(--color-text)]" aria-label="Home – Ushaswi Potlapally">
        Ushaswi Potlapally
      </Link>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle colour theme"
          className="p-2 rounded-full hover:bg-[var(--color-bg-muted)] transition-colors"
        >
          {mounted && resolvedTheme === 'dark' ? (
            <Sun size={20} className="text-[var(--color-text)]" />
          ) : (
            <Moon size={20} className="text-[var(--color-text)]" />
          )}
        </button>

        {/* Hamburger / close */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="p-2 rounded-full hover:bg-[var(--color-bg-muted)] transition-colors"
        >
          {menuOpen ? <X size={24} className="text-[var(--color-text)]" /> : <Menu size={24} className="text-[var(--color-text)]" />}
        </button>
      </div>

      {/* Mobile slide‑in navigation panel */}
      {menuOpen && (
        <motion.nav
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          className="absolute inset-x-0 top-full bg-[var(--color-background)] glass border-t border-[var(--color-border)]"
        >
          <ul className="flex flex-col gap-2 p-4 text-[var(--color-text)]">
            <li>
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/gallery" onClick={() => setMenuOpen(false)}>
                Gallery
              </Link>
            </li>
            {/* Add more navigation links as needed */}
          </ul>
        </motion.nav>
      )}
    </motion.header>
  );
};
