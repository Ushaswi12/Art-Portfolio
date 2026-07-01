'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { useMagneticCursor } from '@/components/effects/Cursor';
import { Menu, X } from 'lucide-react';
import { useLivePreview } from '@/hooks/useLivePreview';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function HeaderInner({ pathname, artistName }: { pathname: string; artistName: string }) {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);


  const opacity = useTransform(scrollY, [0, 50], [1, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [8, 18]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0.5, 0.85]);
  const height = useTransform(scrollY, [0, 100], [80, 68]);

  return (
    <motion.header
      style={{

        opacity,
        height,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(var(--color-background-rgb), ${bgOpacity})`,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 300ms ease-out',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <nav className="container-custom flex items-center justify-between h-full px-4 sm:px-6 lg:px-8" role="banner" aria-label="Main navigation">
        <Link href="/" className="font-display font-semibold text-xl tracking-tight text-[var(--color-text)]" aria-label={`${artistName} Home`}>
          {artistName}
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <MagneticLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
            />
          ))}
          <ThemeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn-icon w-10 h-10"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={mobileOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <div id="mobile-menu" className="md:hidden overflow-hidden bg-[var(--color-background)] border-b border-[var(--color-border)]" role="navigation" aria-label="Mobile navigation">
        <ul className="px-4 py-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-[var(--text-lg)] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] rounded-lg transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
        </div>
      </motion.div>
    </motion.header>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [artistName, setArtistName] = useState('Ushaswi Potlapally');

  useEffect(() => {
    setMounted(true);
    fetch('/api/artist-info')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.name) setArtistName(data.name);
      })
      .catch(err => console.warn(err));
  }, []);

  useLivePreview<{ name: string }>('ARTIST_INFO_PREVIEW_UPDATE', (data) => {
    if (data?.name) setArtistName(data.name);
  });

  if (!mounted) return <header className="h-20" />;

  return <HeaderInner pathname={pathname} artistName={artistName} />;
}

function MagneticLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp } = useMagneticCursor();

  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'text-[var(--color-primary)]'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="active-link"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}