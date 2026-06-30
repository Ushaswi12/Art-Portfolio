'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const journeyMilestones = [
  { year: '2019', title: 'First Sketchbook', description: 'Picked up a sketchbook again after years. Daily drawing practice began—one page a day, no pressure, just play.', category: 'Sketches' },
  { year: '2020', title: 'Discovering Watercolor', description: 'First watercolor set. The unpredictability of pigment and water became an obsession. Hundreds of studies later, still learning.', category: 'Traditional Art' },
  { year: '2021', title: 'Acrylic & Canvas', description: 'Scaled up to canvas. Oil-like richness with acrylic speed. First large floral pieces and abstract landscapes emerged.', category: 'Paintings' },
  { year: '2022', title: 'Craft Renaissance', description: 'Macramé, polymer clay, pressed flowers—hands needed more than brushes. Functional art entered the practice.', category: 'DIY Crafts' },
  { year: '2023', title: 'Portraiture & People', description: 'Returned to drawing faces. Graphite and charcoal portraits of loved ones. Capturing essence became the new challenge.', category: 'Portraits' },
  { year: '2024', title: 'Resin & Mixed Media', description: 'Preserving real flowers in resin. Combining painting with dimensional elements. The practice expands in unexpected directions.', category: 'Handmade Decor' },
];

export function CreativeJourney() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => { setMounted(true); }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReduced ? 0 : 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const } } };

  if (!mounted) {
    return (
      <section id="creative-journey" className="section bg-[var(--color-surface)]" aria-hidden="true">
        <div className="container-custom">
          <div className="section-header">
            <span className="section-label">Creative Journey</span>
            <h2 className="section-title">The Path So Far</h2>
            <p className="section-subtitle">A visual timeline of artistic growth—from tentative first lines to confident multi-medium practice.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border-default)] -translate-x-1/2" aria-hidden="true" />
            <div className="space-y-12">{journeyMilestones.map((m) => (
              <div key={m.year} className="relative flex items-start gap-8">
                <div className="flex-1 max-w-[28rem] p-6 glass-card rounded-xl"><span className="category-badge mb-3 inline-block">{m.category}</span><h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-2">{m.title}</h3><p className="text-[var(--color-text-muted)] leading-relaxed">{m.description}</p></div>
                <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center z-10 border-4 border-[var(--color-surface)] shadow-[var(--shadow-glow)]"><span className="font-display text-lg text-[var(--color-surface)]">{m.year}</span></div>
              </div>
            ))}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="creative-journey" className="section bg-[var(--color-surface)]" suppressHydrationWarning>
      <div className="container-custom">
        <div className="section-header">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReduced ? 0 : 0.5 }}>
            <span className="section-label">Creative Journey</span>
            <h2 className="section-title">The Path So Far</h2>
            <p className="section-subtitle">A visual timeline of artistic growth—from tentative first lines to confident multi-medium practice.</p>
          </motion.div>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-border-default)] -translate-x-1/2" aria-hidden="true" />
          <div className="space-y-12">
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              {journeyMilestones.map((m, i) => (
                <div key={m.year} className="relative flex items-start gap-8">
                  <motion.div variants={itemVariants} custom={i} initial="hidden" animate="visible">
                    <div className="flex-1 max-w-[28rem] p-6 glass-card rounded-xl"><span className="category-badge mb-3 inline-block">{m.category}</span><h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-2">{m.title}</h3><p className="text-[var(--color-text-muted)] leading-relaxed">{m.description}</p></div>
                  </motion.div>
                  <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center z-10 border-4 border-[var(--color-surface)] shadow-[var(--shadow-glow)]">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}>
                      <span className="font-display text-lg text-[var(--color-surface)]">{m.year}</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}