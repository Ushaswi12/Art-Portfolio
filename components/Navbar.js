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
    visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.3 } },
  };

  const mobileVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: prefersReduced ? 0 : 0.2 } },
  };

  if (!mounted) {
    return (
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out header-initial"
        aria-hidden="true"
      >
        <div className="container-custom flex items-center justify-between">
          <Link href="#hero" className="font-heading text-2xl font-bold text-text tracking-tight" aria-label="Ushaswi Potlapally Home">
            Ushaswi Potlapally
          </Link>
          <div className="hidden md:flex items-center gap-8" />
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-out ${
        shrink ? 'header-shrink' : 'header-initial'
      }`}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <a href="#main-content" className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 px-4 py-2 bg-surface text-text border-brutal border-border">
        Skip to main content
      </a>
      <div className="container-custom flex items-center justify-between">
        <Link href="#hero" className="font-heading text-2xl font-extrabold text-text tracking-tight transition-all duration-300 ease-out shrink:text-xl" aria-label="Ushaswi Potlapally Home">
          Ushaswi Potlapally
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-4" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link nav-link-active transition-all duration-200 shrink:text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-3 bg-surface border-brutal border-border shadow-brutal text-text-muted hover:text-text hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-brutal transition-all duration-200 ease-spring shrink:p-2"
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
        className="md:hidden overflow-hidden bg-background border-b border-border"
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
                className="block px-4 py-4 text-lg font-nav text-text-muted hover:text-text hover:bg-surface-elevated transition-colors duration-fast"
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