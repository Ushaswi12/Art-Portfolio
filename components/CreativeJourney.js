'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { artworks } from '@/data/artworks';
import { useEffect, useState } from 'react';

const journeyMilestones = [
  {
    year: '2019',
    title: 'First Sketchbook',
    description: 'Picked up a sketchbook again after years. Daily drawing practice began—one page a day, no pressure, just play.',
    category: 'Sketches',
    image: '/images/journey-1.jpg',
  },
  {
    year: '2020',
    title: 'Discovering Watercolor',
    description: 'First watercolor set. The unpredictability of pigment and water became an obsession. Hundreds of studies later, still learning.',
    category: 'Traditional Art',
    image: '/images/journey-2.jpg',
  },
  {
    year: '2021',
    title: 'Acrylic & Canvas',
    description: 'Scaled up to canvas. Oil-like richness with acrylic speed. First large floral pieces and abstract landscapes emerged.',
    category: 'Paintings',
    image: '/images/journey-3.jpg',
  },
  {
    year: '2022',
    title: 'Craft Renaissance',
    description: 'Macramé, polymer clay, pressed flowers—hands needed more than brushes. Functional art entered the practice.',
    category: 'DIY Crafts',
    image: '/images/journey-4.jpg',
  },
  {
    year: '2023',
    title: 'Portraiture & People',
    description: 'Returned to drawing faces. Graphite and charcoal portraits of loved ones. Capturing essence became the new challenge.',
    category: 'Portraits',
    image: '/images/journey-5.jpg',
  },
  {
    year: '2024',
    title: 'Resin & Mixed Media',
    description: 'Preserving real flowers in resin. Combining painting with dimensional elements. The practice expands in unexpected directions.',
    category: 'Handmade Decor',
    image: '/images/journey-6.jpg',
  },
];

export default function CreativeJourney() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="creative-journey" className="section bg-surface" aria-hidden="true">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
              Creative Journey
            </span>
            <h2 className="section-title mb-4">The Path So Far</h2>
            <p className="section-subtitle">
              A visual timeline of artistic growth—from tentative first lines to confident multi-medium practice.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border-light -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-16">
              {journeyMilestones.map((milestone, index) => (
<div
                    key={milestone.year}
                    className="relative flex items-start gap-8"
                  >
                  <div className="flex-1 max-w-md p-6 glass-card rounded-2xl">
                    <span className className="inline-block px-3 py-1 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-xs font-nav text-primary-accent mb-3">
                      {milestone.category}
                    </span>
                    <h3 className="font-heading text-xl text-text mb-2">{milestone.title}</h3>
                    <p className="text-text-muted leading-relaxed">{milestone.description}</p>
                  </div>
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center z-10 border-4 border-surface">
                    <span className="font-heading text-lg text-text">{milestone.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="creative-journey" className="section bg-surface" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
            Creative Journey
          </span>
          <h2 className="section-title mb-4">The Path So Far</h2>
          <p className="section-subtitle">
            A visual timeline of artistic growth—from tentative first lines to confident multi-medium practice.
          </p>
        </motion.div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border-light -translate-x-1/2" aria-hidden="true" />
          <div className="space-y-16">
            {journeyMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                custom={index}
                className="relative flex items-start gap-8"
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 max-w-md p-6 glass-card rounded-2xl"
                >
                  <span className="inline-block px-3 py-1 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-xs font-nav text-primary-accent mb-3">
                    {milestone.category}
                  </span>
                  <h3 className="font-heading text-xl text-text mb-2">{milestone.title}</h3>
                  <p className="text-text-muted leading-relaxed">{milestone.description}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: prefersReduced ? 0 : 0.3, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center z-10 border-4 border-surface"
                >
                  <span className="font-heading text-lg text-text">{milestone.year}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}