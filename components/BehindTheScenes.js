'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Play, Video, Image as ImageIcon, Zap, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const behindTheScenes = [
  {
    id: 'bts-1',
    title: 'Morning Sketch Routine',
    description: '30 minutes of graphite before coffee. No reference, just muscle memory and whatever\'s on my mind.',
    type: 'video',
    duration: '1:24',
    thumbnail: '/images/bts-sketch.jpg',
    category: 'Process',
  },
  {
    id: 'bts-2',
    title: 'Watercolor Wet-on-Wet',
    description: 'Letting pigment flow and bloom. The paper does half the work—you just guide the water.',
    type: 'video',
    duration: '2:10',
    thumbnail: '/images/bts-watercolor.jpg',
    category: 'Technique',
  },
  {
    id: 'bts-3',
    title: 'Macramé Knot by Knot',
    description: 'Hours of repetitive knotting become meditation. Square knots, spiral knots, gathering knots—rhythm in rope.',
    type: 'video',
    duration: '3:45',
    thumbnail: '/images/bts-macrame.jpg',
    category: 'Craft',
  },
  {
    id: 'bts-4',
    title: 'Miniature Sculpting',
    description: 'Tiny tools, infinite patience. A mushroom cap no bigger than a fingernail, gills carved one by one.',
    type: 'video',
    duration: '2:30',
    thumbnail: '/images/bts-mini.jpg',
    category: 'Detail',
  },
  {
    id: 'bts-5',
    title: 'Pressed Flower Process',
    description: 'Weeks of pressing, careful arrangement, resin mixing. Preserving a moment of spring forever.',
    type: 'video',
    duration: '1:55',
    thumbnail: '/images/bts-pressed.jpg',
    category: 'Nature',
  },
  {
    id: 'bts-6',
    title: 'Canvas Layering Time-lapse',
    description: 'From stained underpainting to final highlights. Six hours compressed—color building, form emerging.',
    type: 'video',
    duration: '0:45',
    thumbnail: '/images/bts-canvas.jpg',
    category: 'Painting',
  },
];

export default function BehindTheScenes() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      <section id="behind-scenes" className="section bg-background" aria-hidden="true">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
              Behind the Scenes
            </span>
            <h2 className="section-title mb-4">Process in Motion</h2>
            <p className="section-subtitle">
              Real-time and time-lapse glimpses into the studio—messy, meditative, and magical moments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Behind the scenes videos">
            {behindTheScenes.map((item) => (
              <article key={item.id} className="group glass-card-hover rounded-2xl overflow-hidden" role="listitem">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 rounded-full bg-primary-accent flex items-center justify-center text-text"
                      aria-label={`Watch ${item.title}`}
                    >
                      <Play size={28} className="ml-1" aria-hidden="true" />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 text-text text-xs px-2 py-1 rounded font-nav">
                    {item.duration}
                  </div>
                  <div className="absolute top-3 left-3 bg-primary-accent/90 text-text text-xs px-2 py-1 rounded font-nav">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg text-text mb-2 group-hover:text-primary-accent transition-colors">{item.title}</h3>
                  <p className="text-sm text-text-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="https://instagram.com/ushaswi_014/reels" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
              View All Reels on Instagram
              <Video size={20} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="behind-scenes" className="section bg-background" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
            Behind the Scenes
          </span>
          <h2 className="section-title mb-4">Process in Motion</h2>
          <p className="section-subtitle">
            Real-time and time-lapse glimpses into the studio—messy, meditative, and magical moments.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Behind the scenes videos"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {behindTheScenes.map((item, index) => (
            <motion.article
              key={item.id}
              custom={index}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="group glass-card-hover rounded-2xl overflow-hidden cursor-pointer"
              role="listitem"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-16 h-16 rounded-full bg-primary-accent flex items-center justify-center text-text"
                    aria-label={`Watch ${item.title}`}
                  >
                    <Play size={28} className="ml-1" aria-hidden="true" />
                  </motion.button>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/80 text-text text-xs px-2 py-1 rounded font-nav">
                  {item.duration}
                </div>
                <div className="absolute top-3 left-3 bg-primary-accent/90 text-text text-xs px-2 py-1 rounded font-nav">
                  {item.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg text-text mb-2 group-hover:text-primary-accent transition-colors">{item.title}</h3>
                <p className="text-sm text-text-muted">{item.description}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="https://instagram.com/ushaswi_014/reels" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
            View All Reels on Instagram
            <Video size={20} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}