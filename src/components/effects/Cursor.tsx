'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { motion, useMotionValue, useSpring, MotionValue, useReducedMotion } from 'framer-motion';

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

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setVisible] = useState(true);
  const [isHovering, setHovering] = useState(false);
  const [isClicking, setClicking] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 400, damping: 35 });
  const smoothY = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReduced || typeof window === 'undefined') return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
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
  }, [x, y, prefersReduced, mounted]);

  useEffect(() => {
    if (!mounted || prefersReduced || typeof window === 'undefined') return;

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [prefersReduced, mounted]);

  if (!mounted) {
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
      style={{ x, y }}
      animate={{
        scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
        opacity: isHovering ? 0.8 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      <div className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference">
        <div className="absolute -top-1/2 -left-1/2 w-8 h-8 rounded-full border-2 border-[var(--color-text)] transition-all duration-200" />
        <div
          className="absolute -top-1/2 -left-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-text)] transition-all duration-150"
          style={{
            scale: isHovering ? 0 : isClicking ? 1.5 : 1,
            opacity: isHovering ? 0 : 1,
          }}
        />
      </div>
    </motion.div>
  );
}

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