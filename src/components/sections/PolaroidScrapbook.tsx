'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

/* ── Polaroid data ───────────────────────────────────────────────────────── */
const polaroids = [
  {
    id: 'pol-1',
    src: '/images/bts-sketch.jpg',
    caption: 'Morning sketches ✦',
    rotate: '-4deg',
    translateY: '8px',
    translateX: '-12px',
    accent: '#F7CAC9',
    delay: 0,
  },
  {
    id: 'pol-2',
    src: '/images/bts-watercolor.jpg',
    caption: 'Wet-on-wet magic 🌸',
    rotate: '3deg',
    translateY: '-4px',
    translateX: '0px',
    accent: '#D4A8C7',
    delay: 0.08,
  },
  {
    id: 'pol-3',
    src: '/images/bts-macrame.jpg',
    caption: 'Knot by knot 🌿',
    rotate: '-2deg',
    translateY: '12px',
    translateX: '10px',
    accent: '#E8D8C4',
    delay: 0.16,
  },
  {
    id: 'pol-4',
    src: '/images/bts-mini.jpg',
    caption: 'Tiny details 🍄',
    rotate: '5deg',
    translateY: '-8px',
    translateX: '-4px',
    accent: '#FFD6D6',
    delay: 0.24,
  },
  {
    id: 'pol-5',
    src: '/images/bts-pressed.jpg',
    caption: 'Pressed & preserved 🌼',
    rotate: '-3.5deg',
    translateY: '6px',
    translateX: '16px',
    accent: '#F2C4CE',
    delay: 0.32,
  },
  {
    id: 'pol-6',
    src: '/images/bts-canvas.jpg',
    caption: 'Six hours in 🎨',
    rotate: '2.5deg',
    translateY: '-6px',
    translateX: '-8px',
    accent: '#B5838D',
    delay: 0.4,
  },
];

/* ── Single Polaroid card ────────────────────────────────────────────────── */
function PolaroidCard({
  src,
  caption,
  rotate,
  translateY,
  translateX,
  accent,
  delay,
  prefersReduced,
}: (typeof polaroids)[0] & { prefersReduced: boolean | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: prefersReduced ? 0 : 0.55, delay: prefersReduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.04,
        rotate: '0deg',
        zIndex: 20,
        transition: { duration: 0.2 },
      }}
      className="polaroid-card group cursor-pointer"
      style={{
        transform: `rotate(${rotate}) translateY(${translateY}) translateX(${translateX})`,
        zIndex: 1,
      }}
    >
      {/* Photo area */}
      <div className="relative w-full aspect-square overflow-hidden bg-[#f0ebe5] rounded-sm">
        <Image
          src={src}
          alt={caption}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 220px"
          loading="lazy"
          quality={80}
        />
        {/* Soft vignette for Polaroid feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Caption strip */}
      <div
        className="py-3 px-2 text-center"
        style={{ background: 'linear-gradient(to bottom, #fff9f5, #fff3ef)' }}
      >
        <p
          className="font-display text-sm leading-tight"
          style={{ color: '#5a3d2b', fontStyle: 'italic', letterSpacing: '0.01em' }}
        >
          {caption}
        </p>
      </div>

      {/* Washi-tape accent strip at top */}
      <div
        className="polaroid-tape"
        style={{ background: `${accent}cc` }}
        aria-hidden="true"
      />
    </motion.div>
  );
}

/* ── Scrapbook section ───────────────────────────────────────────────────── */
export function PolaroidScrapbook() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section id="scrapbook" className="section bg-[var(--color-surface)]" aria-hidden="true">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-label">Studio Diary</span>
            <h2 className="section-title">From the Scrapbook</h2>
            <p className="section-subtitle">Polaroid snapshots from the creative process — raw, real, and beautiful.</p>
          </div>
          <div className="polaroid-grid">
            {polaroids.map((p) => (
              <div key={p.id} className="polaroid-card-skeleton rounded" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="scrapbook" className="section" style={{ background: 'linear-gradient(160deg, #FFF8F4 0%, #F9EFF7 50%, #FFF3EC 100%)' }}>
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5 }}
        >
          <span className="section-label">Studio Diary</span>
          <h2 className="section-title">From the Scrapbook</h2>
          <p className="section-subtitle">
            Polaroid snapshots from the creative process — raw, real, and beautiful.
          </p>
        </motion.div>

        {/* Polaroid grid — staggered overlap layout */}
        <div className="polaroid-grid">
          {polaroids.map((p) => (
            <PolaroidCard key={p.id} {...p} prefersReduced={prefersReduced} />
          ))}
        </div>

        {/* Decorative twinkle stars background */}
        <div className="sparkle-bg" aria-hidden="true">
          {['✦', '✧', '✦', '✧', '✦'].map((s, i) => (
            <span key={i} className={`sparkle-star sparkle-star-${i}`}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
