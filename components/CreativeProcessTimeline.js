'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Palette, Brush, Zap, Eye, Sparkles, Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const processStages = [
  {
    id: 'inspiration',
    title: 'Inspiration Sparks',
    description: 'A color combo in nature, a memory, a dream, or a challenge. The initial "what if" moment that won\'t leave.',
    icon: Zap,
    duration: 'Hours to weeks',
    details: [
      'Collecting reference photos',
      'Color palette experiments',
      'Thumbnail sketches (5-20 mins each)',
      'Letting ideas marinate',
    ],
  },
  {
    id: 'planning',
    title: 'Planning & Prep',
    description: 'Deciding medium, size, surface, and approach. Gathering materials. The practical foundation before play.',
    icon: Eye,
    duration: '1-2 days',
    details: [
      'Selecting canvas/paper/surface',
      'Choosing medium & color palette',
      'Preparing surface (gesso, stretching, etc.)',
      'Setting up workspace & lighting',
    ],
  },
  {
    id: 'foundation',
    title: 'Foundation Layer',
    description: 'Blocking in big shapes, values, and composition. Loose, fast, fearless. The skeleton of the piece.',
    icon: Brush,
    duration: '1-3 sessions',
    details: [
      'Toning the surface',
      'Large shape placement',
      'Value mapping (light/dark)',
      'Composition adjustments',
    ],
  },
  {
    id: 'development',
    title: 'Building & Refining',
    description: 'Layers of color, texture, and detail. The longest phase—where patience meets intuition. Back and forth until it feels right.',
    icon: Palette,
    duration: 'Days to weeks',
    details: [
      'Color layering & glazing',
      'Edge control (soft/hard/lost)',
      'Texture & brushwork variety',
      'Stepping back constantly',
    ],
  },
  {
    id: 'resolution',
    title: 'Resolution & Polish',
    description: 'Final details, highlights, signing. Knowing when to stop. The "one more stroke" danger zone.',
    icon: Sparkles,
    duration: '1-2 sessions',
    details: [
      'Focal point refinement',
      'Highlight placement',
      'Color harmony check',
      'Signing & dating',
    ],
  },
  {
    id: 'documentation',
    title: 'Document & Share',
    description: 'Photographing in natural light. Writing the story. Preparing for the world. The piece is complete when it leaves the studio.',
    icon: Check,
    duration: 'Half day',
    details: [
      'Professional photography',
      'Writing artist\'s note',
      'Social media prep',
      'Inventory & archiving',
    ],
  },
];

export default function CreativeProcessTimeline() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const [expandedStage, setExpandedStage] = useState(null);

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
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: prefersReduced ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="creative-timeline" className="section bg-surface" aria-hidden="true">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
              Creative Timeline
            </span>
            <h2 className="section-title mb-4">From Spark to Finish</h2>
            <p className="section-subtitle">
              The six stages every piece travels through—messy middle included.
            </p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border-light" aria-hidden="true" />
            <div className="space-y-12">
              {processStages.map((stage, index) => (
                <div key={stage.id} className="relative flex gap-8">
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center z-10 border-4 border-surface">
                    <stage.icon size={24} className="text-text" aria-hidden="true" />
                  </div>
                  <div className="flex-1 p-6 glass-card rounded-2xl">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-accent/15 flex items-center justify-center">
                        <stage.icon size={20} className="text-primary-accent" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl text-text mb-1">{stage.title}</h3>
                        <p className="text-text-muted mb-3">{stage.description}</p>
                        <div className="flex items-center gap-2 text-sm text-text-subtle">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-accent" aria-hidden="true" />
                          <span>Typical duration: {stage.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-light">
                      <h4 className="font-nav text-xs uppercase tracking-wider text-text-subtle mb-2">What happens:</h4>
                      <ul className="space-y-1 text-sm text-text-muted">
                        {stage.details.map((detail, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-border-light" aria-hidden="true" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-text-muted mb-6 max-w-xl mx-auto">
              Every piece follows this rhythm, but the timing shifts. Some paintings resolve in days; others simmer for months. 
              The process is the practice.
            </p>
            <a href="#gallery" className="btn-secondary inline-flex">
              See Finished Works
              <Sparkles size={20} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="creative-timeline" className="section bg-surface" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-4">
            Creative Timeline
          </span>
          <h2 className="section-title mb-4">From Spark to Finish</h2>
          <p className="section-subtitle">
            The six stages every piece travels through—messy middle included.
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border-light" aria-hidden="true" />
          <div className="space-y-12">
            {processStages.map((stage, index) => (
              <motion.div
                key={stage.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="relative flex gap-8"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center z-10 border-4 border-surface"
                >
                  <stage.icon size={24} className="text-text" aria-hidden="true" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.5 }}
                  className="flex-1 p-6 glass-card rounded-2xl"
                  onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-accent/15 flex items-center justify-center">
                      <stage.icon size={20} className="text-primary-accent" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl text-text mb-1">{stage.title}</h3>
                      <p className="text-text-muted mb-3">{stage.description}</p>
                      <div className="flex items-center gap-2 text-sm text-text-subtle">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-accent" aria-hidden="true" />
                        <span>Typical duration: {stage.duration}</span>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: expandedStage === stage.id ? 'auto' : 0, opacity: expandedStage === stage.id ? 1 : 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4 border-t border-border-light">
                      <h4 className="font-nav text-xs uppercase tracking-wider text-text-subtle mb-2">What happens:</h4>
                      <ul className="space-y-1 text-sm text-text-muted">
                        {stage.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: prefersReduced ? 0 : 0.05 * i, duration: 0.3 }}
                            className="flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-border-light" aria-hidden="true" />
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReduced ? 0 : 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-text-muted mb-6 max-w-xl mx-auto">
            Every piece follows this rhythm, but the timing shifts. Some paintings resolve in days; others simmer for months. 
            The process is the practice.
          </p>
          <a href="#gallery" className="btn-secondary inline-flex">
            See Finished Works
            <Sparkles size={20} className="group-hover:translate-x-1 transition-transform duration-fast" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}