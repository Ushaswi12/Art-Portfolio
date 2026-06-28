'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { featuredArtworks } from '@/data/artworks';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FeaturedCollection() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.1,
        delayChildren: prefersReduced ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="featured" className="section bg-surface" aria-hidden="true">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
              Featured Collection
            </span>
            <h2 className="section-title mb-4">Curated Masterpieces</h2>
            <p className="section-subtitle">
              Hand-selected works that define the artistic journey. Each piece tells a story of exploration, technique, and vision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" role="list" aria-label="Featured artworks">
            {featuredArtworks.map((art) => (
              <article key={art.id} className="glass-card-hover rounded-2xl overflow-hidden" role="listitem">
                <Link href={`#gallery-${art.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={art.imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-card-title text-text mb-2">{art.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-caption text-text-muted">
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
    <section id="featured" className="section bg-surface" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
            Featured Collection
          </span>
          <h2 className="section-title mb-4">Curated Masterpieces</h2>
          <p className="section-subtitle">
            Hand-selected works that define the artistic journey. Each piece tells a story of exploration, technique, and vision.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          role="list"
          aria-label="Featured artworks"
        >
          {featuredArtworks.map((art, index) => (
            <motion.article
              key={art.id}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="group glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
              role="listitem"
            >
              <Link
                href={`#gallery-${art.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.hash = `gallery-${art.id}`;
                  }
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={art.imageUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-expo">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-primary-accent/90 backdrop-blur-sm rounded-full text-xs font-nav text-text uppercase tracking-wider">
                        {art.category}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors"
                        aria-label={`View ${art.title} details`}
                      >
                        <ArrowRight size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-card-title text-text mb-2 group-hover:text-primary-accent transition-colors duration-fast">
                    {art.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-caption text-text-muted">
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

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="#gallery" className="btn-secondary inline-flex">
            View All Works
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}