'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { artworks, categories, getArtworksByCategory } from '@/data/artworks';
import { Search, X, ChevronLeft, ChevronRight, Expand, Download } from 'lucide-react';

export default function Gallery() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const prefersReduced = useReducedMotion();
  const galleryRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredArtworks = artworks.filter((art) => {
    const matchesCategory = filter === 'All' || art.category === filter;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.medium.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleKeyDown = useCallback((e) => {
    if (!selected) return;
    const currentIndex = filteredArtworks.findIndex(a => a.id === selected.id);
    if (e.key === 'Escape') setSelected(null);
    else if (e.key === 'ArrowLeft' && currentIndex > 0) setSelected(filteredArtworks[currentIndex - 1]);
    else if (e.key === 'ArrowRight' && currentIndex < filteredArtworks.length - 1) setSelected(filteredArtworks[currentIndex + 1]);
  }, [selected, filteredArtworks]);

  useEffect(() => {
    if (selected) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selected, handleKeyDown]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="gallery" className="section bg-surface" aria-hidden="true">
        <div className="container-custom">
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
                  Gallery
                </span>
                <h2 className="section-title">Complete Collection</h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle size-5" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Search artworks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-12 pr-4"
                    aria-label="Search artworks"
                  />
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-nav transition-all duration-fast ${
                        filter === cat
                          ? 'bg-primary-accent text-text shadow-glow-primary'
                          : 'bg-surface-elevated text-text-muted hover:text-text hover:bg-surface border border-border-light'
                      }`}
                      aria-pressed={filter === cat}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-caption text-text-muted" aria-live="polite">
              Showing {filteredArtworks.length} of {artworks.length} artworks
            </p>
          </div>

          <div
            ref={galleryRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            role="list"
            aria-label="Artwork gallery"
          >
            {filteredArtworks.map((art) => (
              <article
                key={art.id}
                className="group glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
                role="listitem"
                onClick={() => setSelected(art)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(art); } }}
                tabIndex={0}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={art.imageUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    quality={85}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  
                  <div className="absolute inset-0 flex items-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-expo">
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-primary-accent/90 backdrop-blur-sm rounded-full text-xs font-nav text-text uppercase tracking-wider">
                          {art.category}
                        </span>
                        <div className="flex gap-2">
                          <button
                            className="p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors"
                            aria-label={`View ${art.title} in fullscreen`}
                            onClick={(e) => { e.stopPropagation(); setSelected(art); }}
                          >
                            <Expand size={18} />
                          </button>
                          <button
                            className="p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors"
                            aria-label={`Download ${art.title}`}
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-heading text-card-title text-text mb-1">{art.title}</h3>
                      <p className="text-caption text-text-muted">{art.medium} · {art.year}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArtworks.length === 0 && (
            <div className="text-center py-20">
              <Search className="mx-auto text-text-subtle mb-4 size-12" aria-hidden="true" />
              <h3 className="font-heading text-xl text-text mb-2">No artworks found</h3>
              <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        <AnimatePresence>
          {selected && (
            <Lightbox
              art={selected}
              onClose={() => setSelected(null)}
              onPrev={() => {
                const currentIndex = filteredArtworks.findIndex(a => a.id === selected.id);
                if (currentIndex > 0) setSelected(filteredArtworks[currentIndex - 1]);
              }}
              onNext={() => {
                const currentIndex = filteredArtworks.findIndex(a => a.id === selected.id);
                if (currentIndex < filteredArtworks.length - 1) setSelected(filteredArtworks[currentIndex + 1]);
              }}
              prefersReduced={prefersReduced}
            />
          )}
        </AnimatePresence>
      </section>
    );
  }

  return (
    <section id="gallery" className="section bg-surface" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
                Gallery
              </span>
              <h2 className="section-title">Complete Collection</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle size-5" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search artworks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12 pr-4"
                  aria-label="Search artworks"
                />
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-nav transition-all duration-fast ${
                      filter === cat
                        ? 'bg-primary-accent text-text shadow-glow-primary'
                        : 'bg-surface-elevated text-text-muted hover:text-text hover:bg-surface border border-border-light'
                    }`}
                    aria-pressed={filter === cat}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-caption text-text-muted" aria-live="polite">
            Showing {filteredArtworks.length} of {artworks.length} artworks
          </p>
        </motion.div>

        <motion.div
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          role="list"
          aria-label="Artwork gallery"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredArtworks.map((art, index) => (
            <motion.article
              key={art.id}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="group glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
              role="listitem"
              onClick={() => setSelected(art)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(art); } }}
              tabIndex={0}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={art.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  quality={85}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                
                <div className="absolute inset-0 flex items-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out-expo">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-primary-accent/90 backdrop-blur-sm rounded-full text-xs font-nav text-text uppercase tracking-wider">
                        {art.category}
                      </span>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors"
                          aria-label={`View ${art.title} in fullscreen`}
                          onClick={(e) => { e.stopPropagation(); setSelected(art); }}
                        >
                          <Expand size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors"
                          aria-label={`Download ${art.title}`}
                        >
                          <Download size={18} />
                        </motion.button>
                      </div>
                    </div>
                    <h3 className="font-heading text-card-title text-text mb-1">{art.title}</h3>
                    <p className="text-caption text-text-muted">{art.medium} · {art.year}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredArtworks.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Search className="mx-auto text-text-subtle mb-4 size-12" aria-hidden="true" />
            <h3 className="font-heading text-xl text-text mb-2">No artworks found</h3>
            <p className="text-text-muted">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <Lightbox
            art={selected}
            onClose={() => setSelected(null)}
            onPrev={() => {
              const currentIndex = filteredArtworks.findIndex(a => a.id === selected.id);
              if (currentIndex > 0) setSelected(filteredArtworks[currentIndex - 1]);
            }}
            onNext={() => {
              const currentIndex = filteredArtworks.findIndex(a => a.id === selected.id);
              if (currentIndex < filteredArtworks.length - 1) setSelected(filteredArtworks[currentIndex + 1]);
            }}
            prefersReduced={prefersReduced}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({ art, onClose, onPrev, onNext, prefersReduced }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft' && onPrev) onPrev();
      else if (e.key === 'ArrowRight' && onNext) onNext();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 backdrop-blur-glass flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${art.title} - Fullscreen view`}
    >
      <motion.div
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute -top-14 right-0 z-10 p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>

        <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-xl">
          {onPrev && (
            <motion.button
              onClick={onPrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-4 z-10 p-3 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors hidden md:flex"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={28} />
            </motion.button>
          )}
          
          <Image
            src={art.imageUrl}
            alt={art.title}
            width={1200}
            height={900}
            className="max-w-full max-h-[75vh] object-contain"
            priority
            quality={95}
          />
          
          {onNext && (
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-4 z-10 p-3 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors hidden md:flex"
              aria-label="Next artwork"
            >
              <ChevronRight size={28} />
            </motion.button>
          )}
        </div>

        <div className="mt-6 p-4 bg-surface/50 backdrop-blur-sm rounded-xl border border-border-light">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-heading text-2xl text-text mb-1">{art.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-caption text-text-muted">
                <span className="px-3 py-1 bg-primary-accent/15 border border-primary-accent/30 rounded-full font-nav uppercase tracking-wider">{art.category}</span>
                <span>{art.medium}</span>
                <span aria-hidden="true">·</span>
                <time>{art.year}</time>
                <span aria-hidden="true">·</span>
                <span>{art.dimensions}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary"
                onClick={onClose}
              >
                Close
              </motion.button>
            </div>
          </div>
          
          {art.desc && (
            <motion.p
              className="mt-6 pt-6 border-t border-border-light text-text-muted leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {art.desc}
            </motion.p>
          )}
          
          {art.artistsNote && (
            <motion.p
              className="mt-4 pt-4 border-t border-border-light text-sm text-text-muted italic"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              "{art.artistsNote}"
            </motion.p>
          )}
        </div>
      </motion.div>

      {onPrev && (
        <motion.button
          onClick={onPrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors md:hidden"
          aria-label="Previous artwork"
        >
          <ChevronLeft size={28} />
        </motion.button>
      )}
      {onNext && (
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-surface/80 backdrop-blur-sm rounded-full text-text-muted hover:text-text transition-colors md:hidden"
          aria-label="Next artwork"
        >
          <ChevronRight size={28} />
        </motion.button>
      )}
    </motion.div>
  );
}