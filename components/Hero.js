'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { featuredArtworks } from '@/data/artworks';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const featured = featuredArtworks[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: prefersReduced ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: prefersReduced ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" aria-hidden="true" />
        <div className="container-custom relative z-20 pt-20 pb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface/50 backdrop-blur-glass border border-border-light rounded-full text-caption font-nav text-text-muted">
              <span className="w-2 h-2 rounded-full bg-primary-accent animate-pulse" aria-hidden="true" />
              Featured Collection
            </span>
            <h1 className="font-heading text-hero text-text mb-6 leading-tight">
              {featured?.title || 'Loading...'}
            </h1>
            <p className="text-hero-sub text-text-muted mb-10 max-w-2xl leading-relaxed">
              {featured?.desc || 'Loading...'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" suppressHydrationWarning>
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" aria-hidden="true" />
      
      {featured && (
        <motion.div
          className="absolute inset-0 -z-10 flex items-center justify-center"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full max-w-6xl h-[70vh] max-h-[600px]">
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent z-10 pointer-events-none" />
            <Image
              src={featured.imageUrl}
              alt={featured.title}
              fill
              priority
              className="object-cover rounded-none"
              sizes="100vw"
              quality={90}
            />
          </div>
        </motion.div>
      )}

      <motion.div
        className="container-custom relative z-20 pt-20 pb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-3xl">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-surface/50 backdrop-blur-glass border border-border-light rounded-full text-caption font-nav text-text-muted">
              <span className="w-2 h-2 rounded-full bg-primary-accent animate-pulse" aria-hidden="true" />
              Featured Collection
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="font-heading text-hero text-text mb-6 leading-tight">
            {featured?.title || 'Golden Hour'}
          </motion.h1>

          <motion.p variants={itemVariants} className="text-hero-sub text-text-muted mb-10 max-w-2xl leading-relaxed">
            {featured?.desc || 'Oil on canvas capturing the warm glow of sunset over rolling hills. This piece explores the fleeting nature of light and the eternal dance between shadow and illumination.'}
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <a
              href="#gallery"
              className="btn-primary group"
            >
              Explore Gallery
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
            </a>
            <a
              href="#featured"
              className="btn-secondary"
            >
              View Featured
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-16 flex flex-wrap items-center gap-8 text-caption text-text-subtle">
            <div className="flex items-center gap-2">
              <span className="w-12 h-px bg-gradient-primary" aria-hidden="true" />
              <span>{featured?.medium || 'Oil on Canvas'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 h-px bg-gradient-primary" aria-hidden="true" />
              <span>{featured?.dimensions || '40 x 30 in'}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 h-px bg-gradient-primary" aria-hidden="true" />
              <span>{featured?.year || '2023'}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: prefersReduced ? 0 : 1.5, duration: 0.5 }}
      >
        <span className="text-caption text-text-subtle">Scroll to explore</span>
        <motion.div
          className="w-px h-8 bg-border-light"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}