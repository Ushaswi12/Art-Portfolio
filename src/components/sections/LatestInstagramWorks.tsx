'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Instagram, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const latestWorks = [
  { id: 'latest-1', title: 'Morning Light Study', category: 'Watercolor', image: '/images/latest-1.jpg', likes: 1240, comments: 89, date: '2 days ago' },
  { id: 'latest-2', title: 'Tiny Mushroom Village', category: 'Mini Crafts', image: '/images/latest-2.jpg', likes: 2100, comments: 156, date: '5 days ago' },
  { id: 'latest-3', title: 'Peony Progress Shots', category: 'Canvas Paintings', image: '/images/latest-3.jpg', likes: 980, comments: 67, date: '1 week ago' },
  { id: 'latest-4', title: 'Macramé Wall Hanging', category: 'DIY Crafts', image: '/images/latest-4.jpg', likes: 1650, comments: 112, date: '1 week ago' },
  { id: 'latest-5', title: 'Charcoal Portrait WIP', category: 'Sketches', image: '/images/latest-5.jpg', likes: 870, comments: 45, date: '2 weeks ago' },
  { id: 'latest-6', title: 'Resin Flower Coasters', category: 'Handmade Decor', image: '/images/latest-6.jpg', likes: 1320, comments: 78, date: '2 weeks ago' },
];

export function LatestInstagramWorks() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReduced ? 0 : 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const } }, hover: { y: -8, transition: { duration: 0.2 } } };

  if (!mounted) {
    return (
      <section id="latest-works" className="section bg-[var(--color-surface)]" aria-hidden="true">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div><span className="section-label">Latest Works</span><h2 className="section-title">Fresh from Instagram</h2></div>
            <a href="https://instagram.com/ushaswi_014" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex self-end md:self-auto">Follow @ushaswi_014<Instagram size={20} aria-hidden="true" /></a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Latest Instagram works">
            {latestWorks.map((work) => (
              <article key={work.id} className="group glass-card-hover rounded-xl overflow-hidden" role="listitem">
                <div className="relative aspect-square overflow-hidden">
                  <Image src={work.image} alt={work.title} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={85} loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                    <div className="flex items-center justify-between">
                      <span className="category-badge">{work.category}</span>
                      <a href="https://instagram.com/ushaswi_014" target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-surface)] transition-colors" aria-label={`View ${work.title} on Instagram`}><ExternalLink size={16} /></a>
                    </div>
                  </div>
                </div>
                <div className="p-5"><h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-200">{work.title}</h3><div className="flex items-center gap-4 text-[var(--text-sm)] text-[var(--color-text-muted)]"><span className="flex items-center gap-1"><span aria-hidden="true">♥</span>{work.likes.toLocaleString()}</span><span className="flex items-center gap-1"><span aria-hidden="true">💬</span>{work.comments}</span><span className="ml-auto">{work.date}</span></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="latest-works" className="section bg-[var(--color-surface)]" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReduced ? 0 : 0.5 }}>
          <div><span className="section-label">Latest Works</span><h2 className="section-title">Fresh from Instagram</h2></div>
          <a href="https://instagram.com/ushaswi_014" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex self-end md:self-auto">Follow @ushaswi_014<Instagram size={20} aria-hidden="true" /></a>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Latest Instagram works" variants={containerVariants} initial="hidden" animate="visible">
          {latestWorks.map((work, index) => (
            <motion.article key={work.id} custom={index} variants={itemVariants} initial="hidden" animate="visible" whileHover="hover" className="group glass-card-hover rounded-xl overflow-hidden" role="listitem">
              <div className="relative aspect-square overflow-hidden">
                <Image src={work.image} alt={work.title} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={85} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  <div className="flex items-center justify-between">
                    <span className="category-badge">{work.category}</span>
                    <a href="https://instagram.com/ushaswi_014" target="_blank" rel="noopener noreferrer" className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-surface)] transition-colors" aria-label={`View ${work.title} on Instagram`}><ExternalLink size={16} /></a>
                  </div>
                </div>
              </div>
              <div className="p-5"><h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-3 group-hover:text-[var(--color-primary)] transition-colors duration-200">{work.title}</h3><div className="flex items-center gap-4 text-[var(--text-sm)] text-[var(--color-text-muted)]"><span className="flex items-center gap-1"><span aria-hidden="true">♥</span>{work.likes.toLocaleString()}</span><span className="flex items-center gap-1"><span aria-hidden="true">💬</span>{work.comments}</span><span className="ml-auto">{work.date}</span></div></div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}