'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
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
      transition: { staggerChildren: prefersReduced ? 0 : 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="creative-journey" className="section bg-surface" aria-hidden="true">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label">Creative Journey</span>
            <h2 className="section-title mb-4">The Path So Far</h2>
            <p className="section-subtitle">
              A visual timeline of artistic growth—from tentative first lines to confident multi-medium practice.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-12">
              {journeyMilestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className="relative flex items-start gap-8"
                >
                  <div className="flex-1 max-w-md p-6 brutal-card rounded-none">
                    <span className="category-badge mb-3 inline-block">
                      {milestone.category}
                    </span>
                    <h3 className="font-heading text-xl text-text mb-2">{milestone.title}</h3>
                    <p className="text-text-muted leading-relaxed">{milestone.description}</p>
                  </div>
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-none bg-primary-accent flex items-center justify-center z-10 border-4 border-surface shadow-brutal-primary">
                    <span className="font-heading text-lg text-surface">{milestone.year}</span>
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
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Creative Journey</span>
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
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2" aria-hidden="true" />
          <div className="space-y-12">
            {journeyMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                custom={index}
                className="relative flex items-start gap-8"
              >
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -32 : 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 max-w-md p-6 brutal-card rounded-none"
                >
                  <span className="category-badge mb-3 inline-block">
                    {milestone.category}
                  </span>
                  <h3 className="font-heading text-xl text-text mb-2">{milestone.title}</h3>
                  <p className="text-text-muted leading-relaxed">{milestone.description}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative flex-shrink-0 w-16 h-16 rounded-none bg-primary-accent flex items-center justify-center z-10 border-4 border-surface shadow-brutal-primary"
                >
                  <span className="font-heading text-lg text-surface">{milestone.year}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}