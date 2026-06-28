'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Palette, Brush, Layers, Award, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const stats = [
  { value: '100+', label: 'Artworks Created', icon: Palette },
  { value: '5+', label: 'Years Creating', icon: Award },
  { value: '8', label: 'Mediums Explored', icon: Layers },
];

const mediums = [
  { name: 'Acrylic Painting', description: 'Vibrant, fast-drying colors perfect for expressive landscapes and florals.', icon: Brush },
  { name: 'Watercolor', description: 'Delicate transparent washes and wet-on-wet techniques for ethereal effects.', icon: Layers },
  { name: 'Graphite & Charcoal', description: 'Traditional drawing fundamentals—value, form, and expressive mark-making.', icon: Palette },
  { name: 'DIY Crafts', description: 'Macramé, pressed flowers, polymer clay—hands-on making with everyday materials.', icon: Sparkles },
  { name: 'Mini Crafts', description: 'Tiny sculptures and dioramas packed with microscopic detail.', icon: Award },
  { name: 'Handmade Decor', description: 'Functional art for the home—woven baskets, ceramic vessels, resin pieces.', icon: Brush },
];

export default function About() {
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
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (!mounted) {
    return (
      <section id="about" className="section bg-background" aria-hidden="true">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="sticky top-24">
                <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-6">
                  About the Artist
                </span>
                <h2 className="section-title mb-6">Where Vision Meets Canvas</h2>
                <div className="prose prose-lg prose-invert max-w-none text-text-muted leading-relaxed mb-8">
                  <p className="mb-6 text-lg">
                    Art has been my constant companion since childhood—sketching in the margins of notebooks, 
                    experimenting with colors from my first watercolor set, and never quite outgrowing the wonder 
                    of making something from nothing.
                  </p>
                  <p className="mb-6">
                    My practice spans traditional painting (acrylic, watercolor, oil), detailed graphite and charcoal 
                    portraiture, and a world of handmade crafts—macramé wall hangings, miniature polymer clay 
                    sculptures, pressed flower art, and functional ceramic pieces. Each medium teaches me something 
                    different about patience, material, and the joy of tactile creation.
                  </p>
                  <p className="mb-6">
                    I'm deeply drawn to traditional techniques but love experimenting—mixing gold leaf with acrylic, 
                    embedding dried flowers in resin, or combining digital sketching with hand-rendered finals. 
                    The boundaries between "fine art" and "craft" feel arbitrary to me; both require vision, 
                    skill, and heart.
                  </p>
                  <p className="font-medium text-text">
                    Every piece I make carries a story—sometimes whispered, sometimes shouted. 
                    I create to remember, to process, and to share moments of beauty found in ordinary things.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/20 via-transparent to-secondary-accent/20" aria-hidden="true" />
                <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="max-w-md text-center">
                    <blockquote className="text-xl lg:text-2xl font-light text-text leading-relaxed mb-8 relative">
                      <span className="text-4xl text-primary-accent/50 font-heading" aria-hidden="true">"</span>
                      Art is not what you see, but what you make others see. 
                      The canvas is a mirror, and every viewer brings their own reflection.
                      <span className="text-4xl text-primary-accent/50 font-heading" aria-hidden="true">"</span>
                    </blockquote>
                    <cite className="text-text-muted">— Ushaswi, Studio Journal 2024</cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="section bg-background" suppressHydrationWarning>
      <div className="container-custom">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.div
              variants={itemVariants}
              className="sticky top-24"
            >
              <span className="inline-block px-4 py-1.5 bg-primary-accent/15 border border-primary-accent/30 rounded-full text-sm font-nav text-primary-accent mb-6">
                About the Artist
              </span>
              <h2 className="section-title mb-6">Where Vision Meets Canvas</h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.6 }}
                className="prose prose-lg prose-invert max-w-none text-text-muted leading-relaxed mb-8"
              >
                <p className="mb-6 text-lg">
                  Art has been my constant companion since childhood—sketching in the margins of notebooks, 
                  experimenting with colors from my first watercolor set, and never quite outgrowing the wonder 
                  of making something from nothing.
                </p>
                <p className="mb-6">
                  My practice spans traditional painting (acrylic, watercolor, oil), detailed graphite and charcoal 
                  portraiture, and a world of handmade crafts—macramé wall hangings, miniature polymer clay 
                  sculptures, pressed flower art, and functional ceramic pieces. Each medium teaches me something 
                  different about patience, material, and the joy of tactile creation.
                </p>
                <p className="mb-6">
                  I'm deeply drawn to traditional techniques but love experimenting—mixing gold leaf with acrylic, 
                  embedding dried flowers in resin, or combining digital sketching with hand-rendered finals. 
                  The boundaries between "fine art" and "craft" feel arbitrary to me; both require vision, 
                  skill, and heart.
                </p>
                <p className="font-medium text-text">
                  Every piece I make carries a story—sometimes whispered, sometimes shouted. 
                  I create to remember, to process, and to share moments of beauty found in ordinary things.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReduced ? 0 : 0.4, duration: 0.6 }}
                className="grid grid-cols-2 gap-4 mb-10"
              >
                {mediums.map((medium, index) => (
                  <motion.div
                    key={medium.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReduced ? 0 : 0.4 + index * 0.1, duration: 0.5 }}
                    className="p-5 glass-card rounded-xl group hover:border-primary-accent/30 transition-all duration-fast"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-accent/15 flex items-center justify-center mb-3 group-hover:bg-primary-accent/30 transition-colors">
                      <medium.icon size={22} className="text-primary-accent" aria-hidden="true" />
                    </div>
                    <h4 className="font-heading text-lg text-text mb-2">{medium.name}</h4>
                    <p className="text-sm text-text-muted">{medium.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={statVariants}
                    custom={index}
                    className="text-center p-6 glass-card rounded-xl"
                  >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary-accent/15 flex items-center justify-center">
                      <stat.icon size={24} className="text-primary-accent" aria-hidden="true" />
                    </div>
                    <div className="font-heading text-3xl lg:text-4xl font-bold text-text mb-1">{stat.value}</div>
                    <div className="text-sm text-text-muted">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/20 via-transparent to-secondary-accent/20" aria-hidden="true" />
              <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true" />
              
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="max-w-md text-center">
                  <blockquote className="text-xl lg:text-2xl font-light text-text leading-relaxed mb-8 relative">
                    <span className="text-4xl text-primary-accent/50 font-heading" aria-hidden="true">"</span>
                    Art is not what you see, but what you make others see. 
                    The canvas is a mirror, and every viewer brings their own reflection.
                    <span className="text-4xl text-primary-accent/50 font-heading" aria-hidden="true">"</span>
                  </blockquote>
                  <cite className="text-text-muted">— Ushaswi, Studio Journal 2024</cite>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 justify-center">
                {['Acrylic', 'Watercolor', 'GraphiteGraphite', 'Charcoal', 'Macramé', 'Polymer Clay', 'Resin', 'Ceramics'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-nav bg-surface/50 backdrop-blur-sm border border-border-light rounded-full text-text-muted hover:text-text hover:border-border transition-all duration-fast"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: prefersReduced ? 0 : 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-48 h-48 lg:w-64 lg:h-64 rounded-2xl overflow-hidden glass-card shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-accent/30 to-secondary-accent/30" aria-hidden="true" />
              <div className="relative h-full flex items-end p-6">
                <div>
                  <p className="text-caption text-text-muted uppercase tracking-wider mb-1">Current Focus</p>
                  <p className="font-heading text-lg text-text">Pressed Flower & Resin</p>
                  <p className="text-sm text-text-muted mt-1">Preserving ephemeral beauty in permanent form</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}