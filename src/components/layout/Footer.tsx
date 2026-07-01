'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Mail, Heart, Twitter, Facebook } from 'lucide-react';
import { useEffect, useState } from 'react';
import { artistInfo as defaultArtistInfo } from '@/data/site';
import { useLivePreview } from '@/hooks/useLivePreview';

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const currentYear = new Date().getFullYear();
  const [artistInfo, setArtistInfo] = useState(defaultArtistInfo);

  useEffect(() => {
    setMounted(true);
    fetch('/api/artist-info')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setArtistInfo(data); })
      .catch(err => console.warn(err));
  }, []);

  useLivePreview<any>('ARTIST_INFO_PREVIEW_UPDATE', (data) => {
    if (data) setArtistInfo(data);
  });

  const footerLinks = {
    explore: [
      { label: 'Featured Works', href: '/gallery?collection=featured' },
      { label: 'Full Gallery', href: '/gallery' },
      { label: 'About the Artist', href: '/about' },
      { label: 'Commissions', href: '/contact' },
    ],
    connect: artistInfo.socialLinks.map(link => ({
      label: link.label,
      href: link.url,
      external: true
    })),
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialIcons = {
    Instagram: Instagram,
    Email: Mail,
    Twitter: Twitter,
    Facebook: Facebook,
  };

  if (!mounted) {
    return (
      <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border-default)]" role="contentinfo" aria-hidden="true">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="font-display text-2xl font-semibold text-[var(--color-text)] mb-4">{artistInfo.name}</div>
              <p className="text-[var(--color-text-muted)] max-w-[20rem] mb-6 leading-relaxed">
                Artist | DIY Crafts | Sketch | Handmade Art | Mini Crafts | India
              </p>
              <div className="flex gap-4">
                {artistInfo.socialLinks.map((link) => {
                  const Icon = socialIcons[link.label as keyof typeof socialIcons] || Mail;
                  return (
                    <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200" aria-label={`Follow on ${link.label}`}>
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">Explore</h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">Connect</h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noopener noreferrer' : undefined} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-[var(--color-border-default)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[var(--text-xs)] text-[var(--color-text-subtle)]">
              &copy; {currentYear} {artistInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[var(--text-xs)] text-[var(--color-text-subtle)]">
              <span>Crafted with</span>
              <Heart className="text-[var(--color-primary)]" size={14} aria-hidden="true" />
              <span>and attention to detail</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border-default)]" role="contentinfo" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, staggerChildren: prefersReduced ? 0 : 0.08 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 py-12 lg:py-16">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="lg:col-span-2">
                <Link href="/" className="font-display text-2xl font-semibold text-[var(--color-text)] mb-4 block" aria-label={`${artistInfo.name} Home`}>
                  {artistInfo.name}
                </Link>
                <p className="text-[var(--color-text-muted)] max-w-[20rem] mb-6 leading-relaxed">
                  Artist | DIY Crafts | Sketch | Handmade Art | Mini Crafts | India
                </p>
                <div className="flex gap-4">
                  {artistInfo.socialLinks.map((link) => {
                    const Icon = socialIcons[link.label as keyof typeof socialIcons] || Mail;
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border-default)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-200"
                        aria-label={`Follow on ${link.label}`}
                      >
                        <Icon size={18} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h4 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">Explore</h4>
              <nav aria-label="Explore links">
                <ul className="space-y-3">
                  {footerLinks.explore.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h4 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">Connect</h4>
              <nav aria-label="Social links">
                <ul className="space-y-3">
                  {footerLinks.connect.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h4 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">Legal</h4>
              <nav aria-label="Legal links">
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.3 }}
        >
          <div className="pt-8 border-t border-[var(--color-border-default)] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[var(--text-xs)] text-[var(--color-text-subtle)]">
              &copy; {currentYear} {artistInfo.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[var(--text-xs)] text-[var(--color-text-subtle)]">
              <span>Crafted with</span>
              <Heart className="text-[var(--color-primary)]" size={14} aria-hidden="true" />
              <span>and attention to detail</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}