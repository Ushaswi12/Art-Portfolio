'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { artworks as defaultArtworks, categories as defaultCategories } from '@/data/artworks';
import { Search, X, ChevronLeft, ChevronRight, Expand, Download, Filter, ExternalLink } from 'lucide-react';
import { useMagneticCursor } from '@/components/effects/Cursor';
import type { Artwork } from '@/types';

export function Gallery() {
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [artworks, setArtworks] = useState(defaultArtworks);
  const [categories, setCategories] = useState(defaultCategories);
  const prefersReduced = useReducedMotion();
  const galleryRef = useRef<HTMLDivElement>(null);
  const magnetic = useMagneticCursor();

  useEffect(() => { 
    setMounted(true); 
    fetch('/api/artworks')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (data && data.length > 0) {
          setArtworks(data);
          const activeCats = Array.from(new Set(data.map((a: any) => a.category)));
          const updatedCats = [
            { id: 'all', name: 'All Works', slug: 'all', order: 0 },
            ...activeCats.map((c: any, index) => ({
              id: c.toLowerCase().replace(/\s+/g, '-'),
              name: c,
              slug: c.toLowerCase().replace(/\s+/g, '-'),
              order: index + 1
            }))
          ];
          setCategories(updatedCats);
        }
      })
      .catch(err => console.warn(err));
  }, []);

  const filteredArtworks = artworks.filter((art) => {
    const matchesCategory = filter === 'all' || art.category.toLowerCase().replace(/\s+/g, '-') === filter;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.medium.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selected) return;
    const currentIndex = filteredArtworks.findIndex(a => a.id === selected);
    if (e.key === 'Escape') setSelected(null);
    else if (e.key === 'ArrowLeft' && currentIndex > 0) setSelected(filteredArtworks[currentIndex - 1].id);
    else if (e.key === 'ArrowRight' && currentIndex < filteredArtworks.length - 1) setSelected(filteredArtworks[currentIndex + 1].id);
  }, [selected, filteredArtworks]);

  useEffect(() => {
    if (selected) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = ''; };
  }, [selected, handleKeyDown]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReduced ? 0 : 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] as const } } };

  if (!mounted) {
    return (
      <section id="gallery" className="section bg-[var(--color-surface)]" aria-hidden="true">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-label">Gallery</span>
            <h2 className="section-title">Complete Collection</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label="Artwork gallery">
            {filteredArtworks.map((art) => (
              <article key={art.id} className="glass-card-hover rounded-xl overflow-hidden cursor-pointer" role="listitem">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={art.imageUrl} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" quality={85} loading="lazy" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="section bg-[var(--color-surface)]" suppressHydrationWarning>
      <div className="container-custom" {...magnetic}>
        <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReduced ? 0 : 0.5 }}>
          <span className="section-label">Gallery</span>
          <h2 className="section-title">Complete Collection</h2>
        </motion.div>

        <motion.div className="mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReduced ? 0 : 0.5 }}>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <span className="section-label">Gallery</span>
              <h2 className="section-title">Complete Collection</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="relative flex-1 max-w-[20rem]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-subtle)] size-5" aria-hidden="true" />
                <input type="search" placeholder="Search artworks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-12 pr-4" aria-label="Search artworks" />
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                {categories.filter(c => c.id !== 'all').map((cat) => (
                  <button key={cat.id} onClick={() => setFilter(cat.slug)} className={`px-4 py-2 rounded-full text-[var(--text-sm)] font-medium transition-all duration-200 ${
                    filter === cat.slug ? 'bg-[var(--color-primary)] text-[var(--color-surface)] shadow-[var(--shadow-glow)]' : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-muted)] border border-[var(--color-border-default)]'
                  }`} aria-pressed={filter === cat.slug}>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[var(--text-xs)] text-[var(--color-text-subtle)]" aria-live="polite">Showing {filteredArtworks.length} of {artworks.length} artworks</p>
        </motion.div>

        <motion.div ref={galleryRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list" aria-label="Artwork gallery" variants={containerVariants} initial="hidden" animate="visible">
          {filteredArtworks.map((art, index) => (
            <motion.article key={art.id} custom={index} variants={itemVariants} initial="hidden" animate="visible" className="group glass-card-hover rounded-xl overflow-hidden cursor-pointer gpu-accelerated" role="listitem" onClick={() => setSelected(art.id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelected(art.id); } }} tabIndex={0}>
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* Floating category tag in top-left (visible on hover) */}
                <span className="category-badge absolute top-3.5 left-3.5 z-20 shadow-[0_4px_12px_rgba(0,0,0,0.06)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">{art.category}</span>

                <Image 
                  src={art.imageUrl} 
                  alt="" 
                  fill 
                  className="artwork-image" 
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw" 
                  quality={85} 
                  priority={index < 4}
                  loading={index < 4 ? undefined : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                <div className="absolute inset-0 flex items-end p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <div className="w-full">
                    <div className="flex items-center justify-end mb-3">
                      <div className="flex gap-2">
                        {art.instagramUrl && (
                          <motion.a href={art.instagramUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" aria-label={`View ${art.title} on Instagram`} onClick={(e) => e.stopPropagation()}><ExternalLink size={18} /></motion.a>
                        )}
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" aria-label={`View ${art.title} in fullscreen`} onClick={(e) => { e.stopPropagation(); setSelected(art.id); }}><Expand size={18} /></motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="p-2 bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors" aria-label={`Download ${art.title}`}><Download size={18} /></motion.button>
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-1">{art.title}</h3>
                    <p className="text-[var(--text-sm)] text-[var(--color-text-muted)]">{art.medium} · {art.year}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {filteredArtworks.length === 0 && (
          <motion.div className="text-center py-20" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <Search className="mx-auto text-[var(--color-text-subtle)] mb-4 size-12" aria-hidden="true" />
            <h3 className="font-display text-[var(--text-h4)] text-[var(--color-text)] mb-2">No artworks found</h3>
            <p className="text-[var(--color-text-muted)]">Try adjusting your search or filter criteria.</p>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <Lightbox
            artId={selected}
            artworks={artworks}
            onClose={() => setSelected(null)}
            onPrev={() => { const i = filteredArtworks.findIndex(a => a.id === selected!); if (i > 0) setSelected(filteredArtworks[i - 1].id); }}
            onNext={() => { const i = filteredArtworks.findIndex(a => a.id === selected!); if (i < filteredArtworks.length - 1) setSelected(filteredArtworks[i + 1].id); }}
            prefersReduced={prefersReduced ?? false}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function Lightbox({ artId, artworks, onClose, onPrev, onNext, prefersReduced }: { artId: string; artworks: Artwork[]; onClose: () => void; onPrev: () => void; onNext: () => void; prefersReduced: boolean }) {
  const art = artworks.find(a => a.id === artId);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { closeBtnRef.current?.focus(); const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); else if (e.key === 'ArrowLeft' && onPrev) onPrev(); else if (e.key === 'ArrowRight' && onNext) onNext(); }; document.addEventListener('keydown', handleKey); return () => document.removeEventListener('keydown', handleKey); }, [onClose, onPrev, onNext]);

  if (!art) return null;

  return (
    <motion.div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-[1000] p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label={`${art.title} - Fullscreen view`}>
      {/* Floating close button icon in the top-right corner */}
      <button 
        ref={closeBtnRef} 
        onClick={onClose} 
        className="fixed top-6 right-6 z-[1010] p-3 bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/10 rounded-full text-white transition-all shadow-xl hover:scale-105 active:scale-95" 
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      <motion.div className="relative max-w-[72rem] w-full max-h-[90vh] flex flex-col" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()} transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }}>
        
        <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-xl">
          {onPrev && (
            <motion.button onClick={onPrev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="absolute left-4 z-10 p-3 bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors hidden md:flex" aria-label="Previous artwork"><ChevronLeft size={28} /></motion.button>
          )}
          <Image src={art.imageUrl} alt={art.title} width={1200} height={900} className="max-w-full max-h-[75vh] object-contain" priority quality={95} />
          {onNext && (
            <motion.button onClick={onNext} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="absolute right-4 z-10 p-3 bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors hidden md:flex" aria-label="Next artwork"><ChevronRight size={28} /></motion.button>
          )}
        </div>

        <div className="mt-6 p-5 bg-[var(--color-surface)]/50 backdrop-blur-sm rounded-xl border border-[var(--color-border-default)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-1">{art.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-[var(--text-sm)] text-[var(--color-text-muted)]">
                <span className="category-badge">{art.category}</span>
                <span>{art.medium}</span><span aria-hidden="true">·</span><time>{art.year}</time><span aria-hidden="true">·</span><span>{art.dimensions}</span>
              </div>
            </div>
            {art.instagramUrl && (
              <motion.a 
                href={art.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                className="btn-secondary self-start md:self-auto gap-2 flex items-center text-sm px-4 py-2 border border-[var(--color-border-default)] bg-[var(--color-surface)] hover:bg-[var(--color-bg-muted)] text-[var(--color-text)] rounded-xl transition-all cursor-pointer"
              >
                <ExternalLink size={16} />
                <span>View on Instagram</span>
              </motion.a>
            )}
          </div>
          {art.desc && <motion.p className="mt-6 pt-6 border-t border-[var(--color-border-default)] text-[var(--color-text-muted)] leading-relaxed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>{art.desc}</motion.p>}
          {art.artistsNote && art.artistsNote !== art.desc && <motion.p className="mt-4 pt-4 border-t border-[var(--color-border-default)] text-[var(--text-sm)] text-[var(--color-text-muted)] italic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>"{art.artistsNote}"</motion.p>}
        </div>

        {onPrev && <motion.button onClick={onPrev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors md:hidden" aria-label="Previous artwork"><ChevronLeft size={28} /></motion.button>}
        {onNext && <motion.button onClick={onNext} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[var(--color-surface)]/80 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors md:hidden" aria-label="Next artwork"><ChevronRight size={28} /></motion.button>}
      </motion.div>
    </motion.div>
  );
}