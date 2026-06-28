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
        staggerChildren: prefersReduced ? 0 : 0.08,
        delayChildren: prefersReduced ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="featured" className="section bg-surface" aria-hidden="true">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label">Featured Collection</span>
            <h2 className="section-title mb-4">Curated Masterpieces</h2>
            <p className="section-subtitle">
              Hand-selected works that define the artistic journey. Each piece tells a story of exploration, technique, and vision.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" role="list" aria-label="Featured artworks">
            {featuredArtworks.map((art) => (
              <article key={art.id} className="brutal-card-hover rounded-none overflow-hidden" role="listitem">
                <Link href={`#gallery-${art.id}`} className="block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={art.imageUrl}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-card-title text-text mb-3">{art.title}</h3>
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Featured Collection</span>
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
              className="group brutal-card-hover rounded-none overflow-hidden cursor-pointer"
              role="listitem"
            >
              <Link
                href={`#gallery-${art.id}`}
                className="block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
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
                    className="object-cover transition-transform duration-500 ease-spring group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-spring">
                    <div className="flex items-center justify-between">
                      <span className="category-badge">
                        {art.category}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-surface border-brutal border-border shadow-brutal text-text-muted hover:text-text hover:shadow-brutal-hover hover:-translate-x-1 hover:-translate-y-1 transition-all duration-fast ease-spring"
                        aria-label={`View ${art.title} details`}
                      >
                        <ArrowRight size={20} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-card-title text-text mb-3 group-hover:text-primary-accent transition-colors duration-fast">
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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="#gallery" className="btn-secondary inline-flex">
            View All Works
            <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}