'use client';

import { useEffect, useState, createContext, useContext, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, MotionValue, useReducedMotion, AnimatePresence } from 'framer-motion';

interface CursorContextValue {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isVisible: boolean;
  setVisible: (v: boolean) => void;
  isHovering: boolean;
  setHovering: (v: boolean) => void;
  isClicking: boolean;
  setClicking: (v: boolean) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

/* ── Heart particle shape ───────────────────────────────────────────────── */
const HEART_SVG = (
  <svg viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 17.5s-8-5.25-8-10.5a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 5.25-8 10.5-8 10.5z" />
  </svg>
);

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  driftX: number;
  driftY: number;
}

const SPARKLE_COLORS = [
  '#FF85A1', // hot pink
  '#FFB3C6', // baby pink
  '#FF69B4', // deep pink
  '#FFC0CB', // classic pink
  '#FF4D7D', // rose pink
  '#FFADC5', // soft pink blush
];

let sparkleId = 0;

/* ── Main Provider ───────────────────────────────────────────────────────── */
export function CursorProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setVisible] = useState(true);
  const [isHovering, setHovering] = useState(false);
  const [isClicking, setClicking] = useState(false);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 400, damping: 35 });
  const smoothY = useSpring(y, { stiffness: 400, damping: 35 });

  // Track last sparkle spawn time to throttle
  const lastSpawn = useRef(0);

  const spawnSparkle = useCallback((cx: number, cy: number) => {
    const now = Date.now();
    if (now - lastSpawn.current < 45) return; // ~22fps throttle
    if (cy < 80) return; // skip spawning near top of viewport
    lastSpawn.current = now;

    const size = 8 + Math.random() * 10;
    const sparkle: Sparkle = {
      id: sparkleId++,
      x: cx + (Math.random() - 0.5) * 20,
      y: cy + (Math.random() - 0.5) * 20,
      size,
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
      rotation: Math.random() * 360,
      driftX: (Math.random() - 0.5) * 60,
      driftY: -30 - Math.random() * 40,
    };

    setSparkles((prev) => [...prev.slice(-14), sparkle]); // keep at most 15

    // Auto-remove after animation completes
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== sparkle.id));
    }, 700);
  }, []);

  // Detect mobile/touch-only devices (coarse pointers have no hover states)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
      const smallScreen = window.innerWidth < 1024;
      setIsMobile(coarsePointer || smallScreen);
    }
  }, []);

  useEffect(() => {
    if (!mounted || prefersReduced || isMobile || typeof window === 'undefined') return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      spawnSparkle(e.clientX, e.clientY);
    };
    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [x, y, prefersReduced, mounted, spawnSparkle, isMobile]);

  useEffect(() => {
    if (!mounted || prefersReduced || isMobile || typeof window === 'undefined') return;

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [prefersReduced, mounted, isMobile]);

  if (!mounted) {
    return (
      <CursorContext.Provider value={{ x, y, isVisible: false, setVisible: () => {}, isHovering: false, setHovering: () => {}, isClicking: false, setClicking: () => {} }}>
        {children}
      </CursorContext.Provider>
    );
  }

  // Mobile/tablet viewers get standard pointer controls with no custom cursor elements (prevents tap lag)
  if (isMobile) {
    return (
      <CursorContext.Provider value={{ x, y, isVisible: false, setVisible: () => {}, isHovering: false, setHovering: () => {}, isClicking: false, setClicking: () => {} }}>
        {children}
      </CursorContext.Provider>
    );
  }

  return (
    <CursorContext.Provider
      value={{
        x: smoothX,
        y: smoothY,
        isVisible,
        setVisible,
        isHovering,
        setHovering,
        isClicking,
        setClicking,
      }}
    >
      {children}

      {/* ── Sparkle star trail ─────────────────────────────────────────── */}
      {!prefersReduced && (
        <div className="pointer-events-none fixed inset-0 z-[9998]" aria-hidden="true">
          <AnimatePresence>
            {sparkles.map((s) => (
              <motion.span
                key={s.id}
                initial={{ opacity: 1, scale: 1, x: s.x, y: s.y, rotate: s.rotation }}
                animate={{
                  opacity: 0,
                  scale: 0.2,
                  x: s.x + s.driftX,
                  y: s.y + s.driftY,
                  rotate: s.rotation + (Math.random() > 0.5 ? 90 : -90),
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  width: s.size,
                  height: s.size,
                  color: s.color,
                  filter: `drop-shadow(0 0 3px ${s.color})`,
                  top: 0,
                  left: 0,
                  pointerEvents: 'none',
                }}
              >
                {HEART_SVG}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Core cursor ring ───────────────────────────────────────────── */}
      {!prefersReduced && isVisible && (
        <CustomCursor
          x={smoothX}
          y={smoothY}
          isHovering={isHovering}
          isClicking={isClicking}
        />
      )}
    </CursorContext.Provider>
  );
}

/* ── Cursor pointer dot ── */
function CustomCursor({
  x,
  y,
  isHovering,
  isClicking,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  isHovering: boolean;
  isClicking: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ x, y }}
      animate={{
        scale: isHovering ? 1.5 : isClicking ? 0.6 : 1,
        opacity: isHovering ? 0.85 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      {/* Solid pointer dot with radial gradient glow */}
      <div
        className="absolute rounded-full"
        style={{
          width: '8px',
          height: '8px',
          top: '-4px',
          left: '-4px',
          backgroundColor: 'var(--color-primary)',
          boxShadow: '0 0 10px 4px var(--color-primary), 0 0 20px 8px var(--color-primary-light)',
          transition: 'background-color 200ms, box-shadow 200ms',
        }}
      />
    </motion.div>
  );
}

/* ── Hook exports ────────────────────────────────────────────────────────── */
export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) throw new Error('useCursor must be used within CursorProvider');
  return context;
}

export function useMagneticCursor() {
  const { setHovering, setVisible, setClicking } = useCursor();

  return {
    onMouseEnter: () => {
      setHovering(true);
      setVisible(true);
    },
    onMouseLeave: () => {
      setHovering(false);
    },
    onMouseDown: () => {
      setClicking(true);
    },
    onMouseUp: () => {
      setClicking(false);
    },
  };
}