'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Palette, Brush, Layers, Award, Sparkles, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { artistInfo as defaultArtistInfo, pageContent as defaultPageContent } from '@/data/site';
import { useLivePreview } from '@/hooks/useLivePreview';

const defaultStats = [
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
  const artistInfo = defaultArtistInfo; // Use default for skeleton loading
  return (
    <section id="about" className="section bg-background" aria-hidden="true">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="space-y-6">
              <span className="section-label">About the Artist</span>
              <h2 className="section-title mb-6">Where Vision Meets Canvas</h2>
              <div className="prose prose-lg max-w-none text-text-muted leading-relaxed mb-8">
                {artistInfo.bio.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card">
            <Image
              src={artistInfo.portrait || '/images/artist-portrait.jpg'}
              alt={artistInfo.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={85}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-16 left-0 right-0 p-6 sm:p-8">
              <blockquote className="text-lg font-light text-white leading-relaxed mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                <span className="text-3xl text-primary font-display" aria-hidden="true">"</span> {artistInfo.statement} <span className="text-3xl text-primary font-display" aria-hidden="true">"</span>
              </blockquote>
              <cite className="text-sm text-white/80 not-italic block font-medium">- {artistInfo.name}, Studio Journal</cite>
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
  const [artistInfo, setArtistInfo] = useState(defaultArtistInfo);
  const [pageContent, setPageContent] = useState(defaultPageContent);

  useEffect(() => { 
    setMounted(true); 
    fetch('/api/artist-info')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setArtistInfo(data); })
      .catch(err => console.warn(err));

    fetch('/api/content')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setPageContent(data); })
      .catch(err => console.warn(err));
  }, []);

  useLivePreview<any>('ARTIST_INFO_PREVIEW_UPDATE', (data) => {
    if (data) setArtistInfo(data);
  });

  useLivePreview<any>('PORTFOLIO_PREVIEW_UPDATE', (data) => {
    if (data) setPageContent(data);
  });

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: prefersReduced ? 0 : 0.12 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const } } };
  const statVariants = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] as const } } };

  if (!mounted) return <AboutSkeleton />;

  // Map icon strings to Lucide components dynamically
  const displayStats = pageContent?.about?.stats?.length > 0
    ? pageContent.about.stats.map(s => {
        const iconMap: Record<string, any> = {
          palette: Palette,
          award: Award,
          layers: Layers,
          gallery: MapPin,
          map: MapPin,
        };
        const iconKey = (s.icon || '').toLowerCase();
        return {
          value: s.value,
          label: s.label,
          icon: iconMap[iconKey] || Palette,
        };
      })
    : defaultStats;

  return (
    <section id="about" className="section bg-background">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <div className="container-custom">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <motion.div variants={itemVariants}>
                  <div className="space-y-6">
                    <span className="section-label">About the Artist</span>
                    <h2 className="section-title mb-6">Where Vision Meets Canvas</h2>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.2, duration: 0.5 }}>
                      <div className="prose prose-lg max-w-none text-text-muted leading-relaxed mb-8">
                        {artistInfo.bio.split('\n\n').map((paragraph, index, arr) => (
                          <p 
                            key={index} 
                            className={`mb-6 ${index === 0 ? 'text-lg' : ''} ${index === arr.length - 1 ? 'font-medium text-text' : ''}`}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.4, duration: 0.5 }}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                        {mediums.map((medium, index) => (
                          <motion.div key={medium.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.4 + index * 0.08, duration: 0.4 }}>
                            <div className="p-5 glass-card rounded-xl group hover:border-primary/30 transition-all duration-200 h-full flex flex-col justify-between">
                              <div>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                                  <medium.icon size={22} className="text-primary" aria-hidden="true" />
                                </div>
                                <h4 className="font-display font-semibold text-h4 text-text mb-2">{medium.name}</h4>
                                <p className="text-sm text-text-muted leading-relaxed">{medium.description}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" animate="visible">
                      <div className="grid grid-cols-2 gap-6">
                        {displayStats.map((stat, index) => (
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

              <motion.div variants={itemVariants} className="lg:sticky lg:top-32 lg:self-start">
                <div className="relative">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card">
                    <Image
                      src={artistInfo.portrait || '/images/artist-portrait.jpg'}
                      alt={artistInfo.name}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
                    
                    {/* Floating quote card overlay inside the photo */}
                    <div className="absolute bottom-16 left-0 right-0 p-6 sm:p-8">
                       <div className="max-w-[28rem] text-left">
                        <blockquote className="text-lg lg:text-xl font-light text-white leading-relaxed mb-4 relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                          <span className="text-3xl text-primary font-display" aria-hidden="true">"</span> {artistInfo.statement} <span className="text-3xl text-primary font-display" aria-hidden="true">"</span>
                        </blockquote>
                        <cite className="text-sm text-white/80 not-italic block font-medium">- {artistInfo.name}, Studio Journal</cite>
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 justify-center">
                      {['Acrylic', 'Watercolor', 'Graphite', 'Charcoal', 'Macrame', 'Polymer Clay', 'Resin', 'Ceramics'].map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-[10px] font-medium bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-white/85 hover:text-white hover:border-white/30 transition-all duration-200">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>


          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}