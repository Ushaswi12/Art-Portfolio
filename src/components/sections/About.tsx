'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Palette, Brush, Layers, Award, Sparkles, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { artistInfo, pageContent } from '@/data/site';

const stats = [
  { value: '100+', label: 'Artworks Created', icon: Palette },
  { value: '5+', label: 'Years Creating', icon: Award },
  { value: '8', label: 'Mediums Explored', icon: Layers },
  { value: '3', label: 'Exhibitions', icon: MapPin },
];

const mediums = [
  { name: 'Acrylic Painting', description: 'Vibrant, fast-drying colors perfect for expressive landscapes and florals.', icon: Brush },
  { name: 'Watercolor', description: 'Delicate transparent washes and wet-on-wet techniques for ethereal effects.', icon: Layers },
  { name: 'Graphite & Charcoal', description: 'Traditional drawing fundamentals - value, form, and expressive mark-making.', icon: Palette },
  { name: 'DIY Crafts', description: 'Macrame, pressed flowers, polymer clay - hands-on making with everyday materials.', icon: Sparkles },
  { name: 'Mini Crafts', description: 'Tiny sculptures and dioramas packed with microscopic detail.', icon: Award },
  { name: 'Handmade Decor', description: 'Functional art for the home - woven baskets, ceramic vessels, resin pieces.', icon: Brush },
];

function AboutSkeleton() {
  return (
    <section id="about" className="section bg-background" aria-hidden="true">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="sticky top-24">
              <span className="section-label">About the Artist</span>
              <h2 className="section-title mb-6">Where Vision Meets Canvas</h2>
              <div className="prose prose-lg max-w-none text-text-muted leading-relaxed mb-8">
                <p className="mb-6 text-lg">Ushaswi Potlapally is a multidisciplinary artist based in Bangalore, India, whose practice spans painting, sketching, and experimental crafts. With a deep reverence for traditional techniques and a curiosity for contemporary processes, Ushaswi creates work that bridges the gap between heritage and innovation.</p>
                <p className="mb-6">Her journey began with graphite and charcoal, mastering the fundamentals of value, form, and composition. This foundation later informed her transition into acrylic painting, where she explores vibrant color relationships and expressive brushwork on canvas.</p>
                <p className="mb-6">In recent years, Ushaswi has expanded her practice to include DIY crafts and miniature sculptures - handmade decor, macrame, pressed flower arrangements, and polymer clay miniatures. Each medium offers a new language for storytelling, allowing her to explore texture, dimension, and the tactile joy of making.</p>
                <p className="font-medium text-text">Whether working large-scale on canvas or crafting miniature worlds in resin, Ushaswi's work is unified by a commitment to process, materiality, and the quiet meditation found in repetitive handwork.</p>
              </div>
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" aria-hidden="true" />
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="max-w-[28rem] text-center">
                <blockquote className="text-xl lg:text-h4 font-light text-text leading-relaxed mb-8 relative">
                  <span className="text-4xl text-primary/50 font-display" aria-hidden="true">"</span> Art is not what you see, but what you make others see. <span className="text-4xl text-primary/50 font-display" aria-hidden="true">"</span>
                </blockquote>
                <cite className="text-text-muted">- Ushaswi Potlapally, Studio Journal 2024</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReduced ? 0 : 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const } } };
  const statVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const } } };

  if (!mounted) return <AboutSkeleton />;

  return (
    <section id="about" className="section bg-background">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <div className="container-custom">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <motion.div variants={itemVariants}>
                  <div className="sticky top-24">
                    <span className="section-label">About the Artist</span>
                    <h2 className="section-title mb-6">Where Vision Meets Canvas</h2>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.5 }}>
                      <div className="prose prose-lg max-w-none text-text-muted leading-relaxed mb-8">
                        <p className="mb-6 text-lg">{artistInfo.bio.split('\n\n')[0]}</p>
                        <p className="mb-6">{artistInfo.bio.split('\n\n')[1]}</p>
                        <p className="mb-6">{artistInfo.bio.split('\n\n')[2]}</p>
                        <p className="font-medium text-text">{artistInfo.bio.split('\n\n')[3]}</p>
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.4, duration: 0.5 }}>
                      <div className="grid grid-cols-2 gap-4 mb-10">
                        {mediums.map((medium, index) => (
                          <motion.div key={medium.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.4 + index * 0.08, duration: 0.4 }}>
                            <div className="p-5 glass-card rounded-xl group hover:border-primary/30 transition-all duration-20200">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                <medium.icon size={22} className="text-primary" aria-hidden="true" />
                              </div>
                              <h4 className="font-display font-semibold text-h4 text-text mb-2">{medium.name}</h4>
                              <p className="text-sm text-text-muted">{medium.description}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                      <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                          <motion.div key={stat.label} variants={statVariants} custom={index}>
                            <div className="text-center p-6 glass-card rounded-xl">
                              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                                <stat.icon size={24} className="text-primary" aria-hidden="true" />
                              </div>
                              <div className="font-display text-3xl lg:text-4xl font-bold text-text mb-1">{stat.value}</div>
                              <div className="text-sm text-text-muted">{stat.label}</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <div className="relative">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" aria-hidden="true" />
                    <div className="relative h-full flex items-center justify-center p-8">
                      <div className="max-w-[28rem] text-center">
                        <blockquote className="text-xl lg:text-h4 font-light text-text leading-relaxed mb-8 relative">
                          <span className="text-4xl text-primary/50 font-display" aria-hidden="true">"</span> {artistInfo.statement} <span className="text-4xl text-primary/50 font-display" aria-hidden="true">"</span>
                        </blockquote>
                        <cite className="text-text-muted">- Ushaswi Potlapally, Studio Journal 2024</cite>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3 justify-center">
                      {['Acrylic', 'Watercolor', 'Graphite', 'Charcoal', 'Macrame', 'Polymer Clay', 'Resin', 'Ceramics'].map((tag) => (
                        <span key={tag} className="px-3 py-1.5 text-xs font-medium bg-surface/50 backdrop-blur-sm border border-border rounded-full text-text-muted hover:text-text hover:border-border-strong transition-all duration200">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.8, duration: 0.5 }}>
                    <div className="absolute -bottom-8 -right-8 lg:-bottom-10 lg:-right-10 w-52 h-52 lg:w-72 lg:h-72 rounded-2xl overflow-hidden glass-card shadow-floating">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/5" aria-hidden="true" />
                      <div className="relative h-full flex items-end p-6">
                        <div>
                          <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Current Focus</p>
                          <p className="font-display font-semibold text-h4 text-text">Pressed Flower & Resin</p>
                          <p className="text-sm text-text-muted mt-1">Preserving ephemeral beauty in permanent form</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}