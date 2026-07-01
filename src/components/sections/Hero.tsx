'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featuredArtworks as defaultFeatured } from '@/data/artworks';
import { pageContent as defaultPageContent } from '@/data/site';
import { useMagneticCursor } from '@/components/effects/Cursor';
import { useEffect, useState } from 'react';
import { useLivePreview } from '@/hooks/useLivePreview';

export function Hero() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [featured, setFeatured] = useState(defaultFeatured[0]);
  const [pageContent, setPageContent] = useState(defaultPageContent);
  const magnetic = useMagneticCursor();
  const [mounted, setMounted] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(1000);
  const [imageLoaded, setImageLoaded] = useState(false);

  useLivePreview<any>('PORTFOLIO_PREVIEW_UPDATE', (data) => {
    if (data) setPageContent(data);
  });

  useEffect(() => {
    setMounted(true);
    setViewportHeight(typeof window !== 'undefined' ? window.innerHeight : 1000);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    // Fetch live page content
    fetch('/api/content')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setPageContent(data);
      })
      .catch(err => console.warn(err));

    // Fetch live artworks to find the featured one
    fetch('/api/artworks')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        const feat = data.find((a: any) => a.featured) || data[0];
        if (feat) setFeatured(feat);
      })
      .catch(err => console.warn(err));

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const y = useTransform(scrollY, [0, viewportHeight], [0, 150]);
  const opacity = useTransform(scrollY, [0, viewportHeight * 0.5], [1, 0]);
  const scale = useTransform(scrollY, [0, viewportHeight], [1, 1.05]);
  const blur = useTransform(scrollY, [0, viewportHeight], [0, 20]);

  const words = (pageContent?.hero?.headline || '').split(' ');

  if (!mounted) {
    return (
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={featured.imageUrl}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,122,92,0.15)_0%,transparent_70%)]" />
        </div>
        <div className="container-custom relative z-20 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[56rem] mx-auto flex flex-col items-center">
            <div className="section-header">
              <span className="section-label">{pageContent.hero.subheadline}</span>
              <h1 id="hero-title" className="font-display font-light text-[clamp(3.5rem,8vw,8rem)] text-[var(--color-text)] leading-tight mb-6 hero-title-stroke flex flex-wrap justify-center gap-[0.25em]" style={{ textTransform: 'none' }}>
                {words.map((word, idx) => (
                  <span key={idx} className="inline-block overflow-hidden py-1">
                    <span className="inline-block">{word}</span>
                  </span>
                ))}
              </h1>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#gallery" className="btn-primary group gap-3" {...magnetic}>
                View Gallery
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <Link href="#about" className="btn-secondary">About the Artist</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
      {...magnetic}
    >
      {/* Background artwork with parallax */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y, scale, filter: `blur(${blur}px)` }}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Image
          src={featured.imageUrl}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={95}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,122,92,0.15)_0%,transparent_70%)]" />
      </motion.div>

      {/* Floating geometric accents */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute top-1/4 left-10 w-2 h-2 bg-[var(--color-primary)]/30 rounded-full"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-1 h-1 bg-[var(--color-primary)]/20 rounded-full"
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-[var(--color-primary)]/15 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="container-custom relative z-20 pt-20 pb-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.8 }}
      >
        <div className="max-w-[56rem] mx-auto flex flex-col items-center">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={imageLoaded ? { opacity: 1, scale: 1.03 } : { opacity: 0, scale: 0.98 }}
            transition={{
              opacity: { duration: prefersReduced ? 0 : 0.8 },
              scale: { duration: prefersReduced ? 0 : 3.8, ease: 'easeOut' }
            }}
          >
            <span className="section-label">{pageContent.hero.subheadline}</span>
            <h1 id="hero-title" className="font-display font-light text-[clamp(3.5rem,8vw,8rem)] text-[var(--color-text)] leading-tight mb-6 hero-title-stroke flex flex-wrap justify-center gap-[0.25em]" style={{ textTransform: 'none' }}>
              {words.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden py-1">
                  <motion.span
                    initial={{ y: '100%', opacity: 0 }}
                    animate={imageLoaded ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                    transition={{
                      duration: prefersReduced ? 0 : 0.65,
                      ease: [0.16, 1, 0.3, 1],
                      delay: prefersReduced ? 0 : 0.2 + idx * 0.15,
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={imageLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: prefersReduced ? 0 : 0.8, 
              delay: prefersReduced ? 0 : 0.8 + (words.length * 0.15),
              ease: [0.16, 1, 0.3, 1] 
            }}
          >
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="#gallery" className="btn-primary group gap-3" {...magnetic}>
                View Gallery
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </Link>
              <Link href="#about" className="btn-secondary">About the Artist</Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)] scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-[var(--color-text)] to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}