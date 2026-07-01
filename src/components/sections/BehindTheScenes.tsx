'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Play, Video } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLivePreview } from '@/hooks/useLivePreview';

const fallbackReels = [
  { 
    id: 'bts-1', 
    title: 'Morning Sketch Routine', 
    description: '30 minutes of graphite before coffee. No reference, just muscle memory and whatever\'s on my mind.', 
    duration: '1:24', 
    thumbnail: '/images/sunset-meadow.jpg', 
    category: 'Process',
    instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
  },
  { 
    id: 'bts-2', 
    title: 'Watercolor Wet-on-Wet', 
    description: 'Letting pigment flow and bloom. The paper does half the work—you just guide the water.', 
    duration: '2:10', 
    thumbnail: '/images/pencil-portrait-study.jpg', 
    category: 'Technique',
    instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
  },
  { 
    id: 'bts-3', 
    title: 'Macramé Knot by Knot', 
    description: 'Hours of repetitive knotting become meditation. Square knots, spiral knots, gathering knots—rhythm in rope.', 
    duration: '3:45', 
    thumbnail: '/images/watercolor-dreamscape.jpg', 
    category: 'Craft',
    instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
  },
  { 
    id: 'bts-4', 
    title: 'Miniature Sculpting', 
    description: 'Tiny tools, infinite patience. A mushroom cap no bigger than a fingernail, gills carved one by one.', 
    duration: '2:30', 
    thumbnail: '/images/diy-macrame-wall.jpg', 
    category: 'Detail',
    instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
  },
  { 
    id: 'bts-5', 
    title: 'Pressed Flower Process', 
    description: 'Weeks of pressing, careful arrangement, resin mixing. Preserving a moment of spring forever.', 
    duration: '1:55', 
    thumbnail: '/images/mini-clay-collection.jpg', 
    category: 'Nature',
    instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
  },
  { 
    id: 'bts-6', 
    title: 'Canvas Layering Time-lapse', 
    description: 'From stained underpainting to final highlights. Six hours compressed—color building, form emerging.', 
    duration: '0:45', 
    thumbnail: '/images/handmade-ceramic-vase.jpg', 
    category: 'Painting',
    instagramUrl: 'https://www.instagram.com/ushaswi_014/reels/'
  },
];

function BehindTheScenesSkeleton() {
  return (
    <section id="behind-scenes" className="section bg-background" aria-hidden="true">
      <div className="container-custom">
        <div className="section-header">
          <span className="section-label">Behind the Scenes</span>
          <h2 className="section-title">Process in Motion</h2>
          <p className="section-subtitle">Real-time and time-lapse glimpses into the studio—messy, meditative, and magical moments.</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {fallbackReels.map((item) => (
            <div key={item.id} className="relative flex-none w-[200px] md:w-[240px] aspect-[9/16] bg-[var(--color-bg-muted)] rounded-2xl overflow-hidden animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function BehindTheScenes() {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();
  const [pageContent, setPageContent] = useState<any>(null);
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setMounted(true); 
    fetch('/api/content')
      .then(res => res.ok ? res.json() : null)
      .then(data => { if (data) setPageContent(data); })
      .catch(err => console.warn(err));

    // Fetch live reels from API
    fetch('/api/instagram')
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data) && data.length > 0) {
          setReels(data);
        }
      })
      .catch(err => {
        console.warn('Instagram API error, using static fallback:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useLivePreview<any>('PORTFOLIO_PREVIEW_UPDATE', (data) => {
    if (data) setPageContent(data);
  });

  const containerVariants = { 
    hidden: { opacity: 0 }, 
    visible: { opacity: 1, transition: { staggerChildren: prefersReduced ? 0 : 0.08 } } 
  };
  
  const itemVariants = { 
    hidden: { opacity: 0, y: 30 }, 
    visible: { opacity: 1, y: 0, transition: { duration: prefersReduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as const } }, 
    hover: { y: -8, transition: { duration: 0.25, ease: 'easeOut' as const } } 
  };

  if (!mounted || loading) return <BehindTheScenesSkeleton />;

  const btsContent = pageContent?.behindTheScenes || {
    title: 'Process in Motion',
    subtitle: 'Real-time and time-lapse glimpses into the studio—messy, meditative, and magical moments.',
    instagramUrl: 'https://instagram.com/ushaswi_014/reels'
  };

  const displayReels = reels.length > 0 ? reels : fallbackReels;

  return (
    <section id="behind-scenes" className="section bg-background">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <div className="container-custom">
          <div className="section-header">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReduced ? 0 : 0.5 }}>
              <span className="section-label">Behind the Scenes</span>
              <h2 className="section-title">{btsContent.title}</h2>
              <p className="section-subtitle">{btsContent.subtitle}</p>
            </motion.div>
          </div>

          {/* Instagram Reels Style Portrait Horizontal Scrolling Track */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin snap-x snap-mandatory scroll-smooth" role="list" aria-label="Instagram Reels videos">
            {displayReels.map((item: any) => (
              <motion.a 
                key={item.id} 
                href={item.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                whileHover="hover"
                className="group relative flex-none w-[200px] md:w-[240px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-lg cursor-pointer snap-start"
                role="listitem"
              >
                {/* Thumbnail Image */}
                <Image 
                  src={item.thumbnail} 
                  alt={item.title} 
                  fill 
                  className="object-cover opacity-90 transition-transform duration-500 ease-out group-hover:scale-105" 
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw" 
                  quality={80} 
                  loading="lazy" 
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20 opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

                {/* Category & Duration Tags */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-[var(--color-primary)] text-white shadow-sm">
                    {item.category}
                  </span>
                  <span className="text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded font-medium backdrop-blur-xs">
                    {item.duration}
                  </span>
                </div>

                {/* Hover Play Button (Centered) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white border border-white/40 shadow-md">
                    <Play size={20} fill="white" className="ml-0.5" />
                  </div>
                </div>

                {/* Content Block (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white pointer-events-none">
                  <h3 className="font-display font-semibold text-sm leading-tight mb-1 group-hover:text-[var(--color-accent-dark)] transition-colors duration-200 truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-gray-300 line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: prefersReduced ? 0 : 0.6, duration: 0.5 }}>
            <div className="text-center mt-12">
              <a href={btsContent.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
                View All Reels on Instagram
                <Video size={20} className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}