'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Palette, Brush, Zap, Eye, Sparkles, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

const processStages = [
  { id: 'inspiration', title: 'Inspiration Sparks', description: 'A color combo in nature, a memory, a dream, or a challenge. The initial "what if" moment that won\'t leave.', icon: Zap, duration: 'Hours to weeks', details: ['Collecting reference photos', 'Color palette experiments', 'Thumbnail sketches (5-20 mins each)', 'Letting ideas marinate'] },
  { id: 'planning', title: 'Planning & Prep', description: 'Deciding medium, size, surface, and approach. Gathering materials. The practical foundation before play.', icon: Palette, duration: '1-2 days', details: ['Selecting canvas/paper/surface', 'Choosing medium & color palette', 'Preparing surface (gesso, stretching, etc.)', 'Setting up workspace & lighting'] },
  { id: 'foundation', title: 'Foundation Layer', description: 'Blocking in big shapes, values, and composition. Loose, fast, fearless. The skeleton of the piece.', icon: Brush, duration: '1-3 sessions', details: ['Toning the surface', 'Large shape placement', 'Value mapping (light/dark)', 'Composition adjustments'] },
  { id: 'development', title: 'Building & Refining', description: 'Layers of color, texture, and detail. The longest phase—where patience meets intuition. Back and forth until it feels right.', icon: Palette, duration: 'Days to weeks', details: ['Color layering & glazing', 'Edge control (soft/hard/lost)', 'Texture & brushwork variety', 'Stepping back constantly'] },
  { id: 'resolution', title: 'Resolution & Polish', description: 'Final details, highlights, signing. Knowing when to stop. The "one more stroke" danger zone.', icon: Check, duration: '1-2 sessions', details: ['Focal point refinement', 'Highlight placement', 'Color harmony check', 'Signing & dating'] },
  { id: 'documentation', title: 'Document & Share', description: 'Photographing in natural light. Writing the story. Preparing for the world. The piece is complete when it leaves the studio.', icon: Sparkles, duration: 'Half day', details: ['Professional photography', "Writing artist's note", 'Social media prep', 'Inventory & archiving'] },
];

function CreativeProcessTimelineSkeleton() {
  return (
    <div id="creative-timeline" className="section bg-[var(--color-surface)]" aria-hidden="true" role="region">
      <div className="container-custom">
        <div className="section-header"><span className="section-label">Creative Timeline</span><h2 className="section-title">From Spark to Finish</h2><p className="section-subtitle">The six stages every piece travels through—messy middle included.</p></div>
        <div className="relative max-w-[48rem] mx-auto mx-auto">
          <div className="absolute left-12 top-0 bottom-0 w-px bg-[var(--color-border-default)]" aria-hidden="true" />
          <div className="space-y-10">{processStages.map((s, i) => (
            <div key={s.id} className="relative flex gap-6">
              <div className="relative flex-shrink-0 w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center z-10 border-4 border-[var(--color-surface)] shadow-[var(--shadow-glow)]"><s.icon size={24} className="text-[var(--color-surface)]" aria-hidden="true" /></div>
              <div className="flex-1 p-6 glass-card rounded-xl"><div className="flex items-start gap-3"><div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center"><s.icon size={20} className="text-[var(--color-primary)]" aria-hidden="true" /></div><div><h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-1">{s.title}</h3><p className="text-[var(--color-text-muted)] mb-3">{s.description}</p><div className="flex items-center gap-2 text-[var(--text-sm)] text-[var(--color-text-subtle)]"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" /><span>Typical duration: {s.duration}</span></div></div></div><div className="mt-4 pt-4 border-t border-[var(--color-border-default)]"><h4 className="font-medium text-[var(--text-xs)] uppercase tracking-wider text-[var(--color-text-subtle)] mb-2">What happens:</h4><ul className="space-y-1 text-[var(--text-sm)] text-[var(--color-text-muted)]">{s.details.map((d, j) => (<li key={j} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-default)]" aria-hidden="true" />{d}</li>))}</ul></div></div>
            </div>
          ))}</div>
        </div>
        <div className="text-center mt-16"><p className="text-[var(--color-text-muted)] mb-6 max-w-[36rem] mx-auto">Every piece follows this rhythm, but the timing shifts. Some paintings resolve in days; others simmer for months. The process is the practice.</p><a href="/gallery" className="btn-secondary inline-flex">See Finished Works<Sparkles size={20} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" /></a></div>
      </div>
    </div>
  );
}

export function CreativeProcessTimeline() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReduced ? 0 : 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const } } };

  if (!mounted) return <CreativeProcessTimelineSkeleton />;

  return (
    <>
      <section id="creative-timeline" className="section bg-[var(--color-surface)]" suppressHydrationWarning>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container-custom">
            <div className="section-header">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReduced ? 0 : 0.5 }}>
                <span className="section-label">Creative Timeline</span>
                <h2 className="section-title">From Spark to Finish</h2>
                <p className="section-subtitle">The six stages every piece travels through—messy middle included.</p>
              </motion.div>
            </div>

            <div className="relative max-w-[48rem] mx-auto">
              <div className="absolute left-12 top-0 bottom-0 w-px bg-[var(--color-border-default)]" aria-hidden="true" />
              <div className="space-y-10">
                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                  {processStages.map((s, i) => (
                    <div key={s.id} className="relative flex gap-6">
                      <motion.div variants={itemVariants} custom={i} initial="hidden" animate="visible">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: prefersReduced ? 0 : 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }} className="relative flex-shrink-0 w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center z-10 border-4 border-[var(--color-surface)] shadow-[var(--shadow-glow)]"><s.icon size={24} className="text-[var(--color-surface)]" aria-hidden="true" /></motion.div>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: prefersReduced ? 0 : 0.15, duration: 0.4 }} className="flex-1 p-6 glass-card rounded-xl" onClick={() => setExpandedStage(expandedStage === s.id ? null : s.id)} style={{ cursor: 'pointer' }}>
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 flex items-center justify-center"><s.icon size={20} className="text-[var(--color-primary)]" aria-hidden="true" /></div>
                            <div className="flex-1">
                              <h3 className="font-display font-semibold text-[var(--text-h4)] text-[var(--color-text)] mb-1">{s.title}</h3>
                              <p className="text-[var(--color-text-muted)] mb-3">{s.description}</p>
                              <div className="flex items-center gap-2 text-[var(--text-sm)] text-[var(--color-text-subtle)]"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" aria-hidden="true" /><span>Typical duration: {s.duration}</span></div>
                            </div>
                          </div>
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: expandedStage === s.id ? 'auto' : 0, opacity: expandedStage === s.id ? 1 : 0 }} transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] as const }} className="overflow-hidden">
                            <div className="mt-4 pt-4 border-t border-[var(--color-border-default)]">
                              <h4 className="font-medium text-[var(--text-xs)] uppercase tracking-wider text-[var(--color-text-subtle)] mb-2">What happens:</h4>
                              <ul className="space-y-1 text-[var(--text-sm)] text-[var(--color-text-muted)]">{s.details.map((d, j) => (<motion.li key={j} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: prefersReduced ? 0 : .05 * j, duration: .3 }} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border-default)]" aria-hidden="true" />{d}</motion.li>))}</ul>
                            </div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}