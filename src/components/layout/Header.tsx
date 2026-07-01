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
  { href: '/#hero', label: 'Main', targetId: 'hero' },
  { href: '/#about', label: 'About', targetId: 'about' },
  { href: '/#featured', label: 'Featured', targetId: 'featured' },
  { href: '/#behind-scenes', label: 'Process', targetId: 'behind-scenes' },
  { href: '/#gallery', label: 'Gallery', targetId: 'gallery' },
  { href: '/#contact', label: 'Contact', targetId: 'contact' },
];

function HeaderInner({ pathname, artistName }: { pathname: string; artistName: string }) {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ScrollSpy via IntersectionObserver
  useEffect(() => {
    if (pathname !== '/') return;

    const sections = ['hero', 'about', 'featured', 'behind-scenes', 'gallery', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // detects when section is around middle of viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, [pathname]);

  // Handle hash scroll on mount
  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
        setActiveSection(targetId);
      }
    }
  };

  const opacity = useTransform(scrollY, [0, 50], [1, 0.95]);
  const height = useTransform(scrollY, [0, 100], [80, 68]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex flex-col justify-center transition-all duration-300 glass glass-border-b"
      style={{ opacity, height }}
    >
      <nav className="container-custom flex items-center justify-between h-full px-4 sm:px-6 lg:px-8" role="banner" aria-label="Main navigation">
        <Link 
          href="/" 
          onClick={(e) => handleNavLinkClick(e, 'hero')}
          className="font-display font-semibold text-xl tracking-tight logo-drop-shadow hover:scale-102 transition-transform duration-200 flex items-center h-10 leading-none pt-1 text-[var(--color-text)]"
          aria-label={`${artistName} Home`}
        >
          {artistName}
        </Link>

        {/* Center: simple flex container directly on the header bar */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <MagneticLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={(pathname === '/' && activeSection === link.targetId) || (pathname !== '/' && pathname === link.href)}
              onClick={(e) => handleNavLinkClick(e, link.targetId)}
              isTransparent={false}
            />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 h-10 justify-center">
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
                onClick={(e) => {
                  setMobileOpen(false);
                  handleNavLinkClick(e, link.targetId);
                }}
                className={`block px-4 py-3 text-[var(--text-lg)] font-medium rounded-lg transition-colors duration-200 ${
                  pathname === '/' && activeSection === link.targetId
                    ? 'text-[var(--color-primary)] bg-[var(--color-primary-light)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)]'
                }`}
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

function MagneticLink({ 
  href, 
  label, 
  isActive, 
  onClick,
  isTransparent
}: { 
  href: string; 
  label: string; 
  isActive: boolean; 
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; 
  isTransparent: boolean;
}) {
  const { onMouseEnter, onMouseLeave, onMouseDown, onMouseUp } = useMagneticCursor();

  return (
    <Link
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onClick={onClick}
      className="relative px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 inline-block"
    >
      <motion.span
        className={`inline-block ${
          isActive
            ? 'text-[var(--color-primary)] font-semibold'
            : isTransparent
              ? 'text-white/80 hover:text-white font-medium'
              : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {label}
      </motion.span>
      {isActive && (
        <motion.div
          layoutId="active-link"
          className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-[var(--color-primary)]"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}