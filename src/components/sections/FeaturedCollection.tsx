'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { featuredArtworks as defaultFeatured } from '@/data/artworks';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function FeaturedCollection() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const [featuredArtworks, setFeaturedArtworks] = useState(defaultFeatured);

  useEffect(() => {
    setMounted(true);
    fetch('/api/artworks')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        const feat = data.filter((a: any) => a.featured === true);
        if (feat.length > 0) {
          setFeaturedArtworks(feat);
        } else if (data.length > 0) {
          setFeaturedArtworks(data.slice(0, 3));
        }
      })
      .catch(err => console.warn(err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const } },
    hover: { y: -8, transition: { duration: 0.2 } },
  };

  if (!mounted) {
    return (
      <section id="featured" className="section bg-[var(--color-surface)]" aria-hidden="true">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-label">Featured Collection</span>
            <h2 className="section-title">Curated Masterpieces</h2>
            <p className="section-subtitle">
              Hand-selected works that define the artistic journey. Each piece tells a story of exploration, technique, and vision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center" role="list" aria-label="Featured artworks">
            {featuredArtworks.map((art, index) => (
              <article key={art.id} className="glass-card-hover rounded-2xl overflow-hidden" role="listitem">
                <Link href={`/gallery#${art.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                      src={art.imageUrl} 
                      alt="" 
                      fill 
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                      quality={85} 
                      priority={index < 3}
                      loading={index < 3 ? undefined : "lazy"}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-2">{art.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-[var(--text-sm)] text-[var(--color-text-muted)]">
                      <span>{art.medium}</span>
                      <span aria-hidden="true">·</span>
                      <span>{art.dimensions}</span>
                      <span aria-hidden="true">·</span>
                      <time>{art.year}</time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="featured" className="section bg-[var(--color-surface)]" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReduced ? 0 : 0.5 }}>
          <span className="section-label">Featured Collection</span>
          <h2 className="section-title">Curated Masterpieces</h2>
          <p className="section-subtitle">
            Hand-selected works that define the artistic journey. Each piece tells a story of exploration, technique, and vision.
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-items-center" variants={containerVariants} initial="hidden" animate="visible" role="list" aria-label="Featured artworks">
          {featuredArtworks.map((art, index) => (
            <motion.article key={art.id} custom={index} variants={itemVariants} initial="hidden" animate="visible" whileHover="hover" className="group glass-card-hover rounded-2xl overflow-hidden cursor-pointer" role="listitem">
              <Link href={`/gallery#${art.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]" onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); window.location.hash = art.id; } }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={art.imageUrl} 
                    alt="" 
                    fill 
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" 
                    quality={85} 
                    priority={index < 3}
                    loading={index < 3 ? undefined : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out">
                    <div className="flex items-center justify-between">
                      <span className="category-badge">{art.category}</span>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" aria-label={`View ${art.title} details`}>
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">{art.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-[var(--text-sm)] text-[var(--color-text-muted)]">
                    <span>{art.medium}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.dimensions}</span>
                    <span aria-hidden="true">·</span>
                    <time>{art.year}</time>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <motion.div className="text-center mt-12" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.6, duration: 0.5 }}>
          <Link href="/gallery" className="btn-secondary inline-flex">
            View All Works
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}