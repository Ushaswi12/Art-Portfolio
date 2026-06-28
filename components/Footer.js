'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Instagram, Mail, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setMounted(true);
  }, []);

  const footerLinks = {
    explore: [
      { label: 'Featured Works', href: '#featured' },
      { label: 'Full Gallery', href: '#gallery' },
      { label: 'About the Artist', href: '#about' },
      { label: 'Commissions', href: '#contact' },
    ],
    connect: [
      { label: 'Instagram', href: 'https://instagram.com/ushaswi_014', external: true },
      { label: 'Email', href: 'mailto:hello@ushaswi.art', external: true },
    ],
    legal: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Use', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Accessibility', href: '#' },
    ],
  };

  const socialIcons = {
    Instagram,
    Mail,
  };

  if (!mounted) {
    return (
      <footer className="bg-surface border-t border-border" role="contentinfo" aria-hidden="true">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 py-12 lg:py-16">
            <div className="lg:col-span-2">
              <Link href="#hero" className="font-heading text-2xl font-bold text-text mb-4 block" aria-label="Ushaswi Potlapally Home">
                Ushaswi Potlapally
              </Link>
              <p className="text-text-muted max-w-xs mb-6 leading-relaxed">
                Artist | DIY Crafts | Sketch | Handmade Art | Mini Crafts | India
              </p>
              <div className="flex gap-4">
                {Object.entries(socialIcons).map(([name, Icon]) => (
                  <a
                    key={name}
                    href={footerLinks.connect.find(l => l.label === name)?.href || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-none bg-surface-elevated border-brutal border-border flex items-center justify-center text-text-muted hover:text-primary-accent hover:border-primary-accent hover:shadow-brutal-primary transition-all duration-fast"
                    aria-label={`Follow on ${name}`}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4">Explore</h4>
              <nav aria-label="Explore links">
                <ul className="space-y-3">
                  {footerLinks.explore.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-text transition-colors duration-fast"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4">Connect</h4>
              <nav aria-label="Social links">
                <ul className="space-y-3">
                  {footerLinks.connect.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-text-muted hover:text-text transition-colors duration-fast"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4">Legal</h4>
              <nav aria-label="Legal links">
                <ul className="space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-muted hover:text-text transition-colors duration-fast"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-caption text-text-subtle">
              &copy; {currentYear} Ushaswi Potlapally. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4 text-caption text-text-subtle">
              <span>Crafted with</span>
              <Heart className="text-primary-accent" size={14} aria-hidden="true" />
              <span>and attention to detail</span>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface border-t border-border" role="contentinfo" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 py-12 lg:py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, staggerChildren: prefersReduced ? 0 : 0.08 }}
        >
          <motion.div className="lg:col-span-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="#hero" className="font-heading text-2xl font-bold text-text mb-4 block" aria-label="Ushaswi Potlapally Home">
              Ushaswi Potlapally
            </Link>
            <p className="text-text-muted max-w-xs mb-6 leading-relaxed">
              Artist | DIY Crafts | Sketch | Handmade Art | Mini Crafts | India
            </p>
            <div className="flex gap-4">
              {Object.entries(socialIcons).map(([name, Icon]) => (
                <a
                  key={name}
                  href={footerLinks.connect.find(l => l.label === name)?.href || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-none bg-surface-elevated border-brutal border-border flex items-center justify-center text-text-muted hover:text-primary-accent hover:border-primary-accent hover:shadow-brutal-primary transition-all duration-fast"
                  aria-label={`Follow on ${name}`}
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h4 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4">Explore</h4>
            <nav aria-label="Explore links">
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text transition-colors duration-fast"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h4 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4">Connect</h4>
            <nav aria-label="Social links">
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-text-muted hover:text-text transition-colors duration-fast"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h4 className="font-heading text-sm font-semibold text-text uppercase tracking-wider mb-4">Legal</h4>
            <nav aria-label="Legal links">
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text transition-colors duration-fast"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

        </motion.div>

        <motion.div
          className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.3 }}
        >
          <p className="text-caption text-text-subtle">
            &copy; {currentYear} Ushaswi Potlapally. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-caption text-text-subtle">
            <span>Crafted with</span>
            <Heart className="text-primary-accent" size={14} aria-hidden="true" />
            <span>and attention to detail</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}