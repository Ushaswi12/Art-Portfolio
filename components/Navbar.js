'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  const [shrink, setShrink] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      if (window.scrollY > 50) setShrink(true);
      else setShrink(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#featured', label: 'Featured' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.4 } },
  };

  const mobileVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: prefersReduced ? 0 : 0.3 } },
  };

  if (!mounted) {
    return (
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-normal bg-transparent py-4"
        aria-hidden="true"
      >
        <div className="container-custom flex items-center justify-between">
          <Link href="#hero" className="font-heading text-2xl font-semibold text-text" aria-label="Ushaswi Home">
            Ushaswi
          </Link>
          <div className="hidden md:flex items-center gap-8" />
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-normal ${
        shrink
          ? 'bg-background/80 backdrop-blur-glass border-b border-border-light py-3'
          : 'bg-transparent py-4'
      }`}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 px-4 py-2 bg-surface text-text rounded-lg">
        Skip to main content
      </a>
      <div className="container-custom flex items-center justify-between">
        <Link href="#hero" className="font-heading text-2xl font-semibold text-text" aria-label="Ushaswi Home">
          Ushaswi
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link nav-link-active"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg bg-surface-elevated border border-border-light text-text-muted hover:text-text hover:border-border transition-all duration-fast"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <motion.div
        id="mobile-menu"
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-glass border-b border-border-light"
        variants={mobileVariants}
        initial="hidden"
        animate={mobileOpen ? 'visible' : 'hidden'}
      >
        <ul className="py-6 flex flex-col gap-2" role="navigation" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-lg font-nav text-text-muted hover:text-text hover:bg-surface-elevated rounded-xl transition-colors duration-fast"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
}