import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const pointIdRef = useRef(0);

  // Framer Motion values for high performance cursor tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for the floating outer ring
  const springConfig = { stiffness: 180, damping: 24, mass: 0.6 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      const x = e.clientX;
      const y = e.clientY;

      cursorX.set(x);
      cursorY.set(y);

      // Add a trail point with a limit to keep it ultra-performant
      setTrail((prev) => {
        const newTrail = [...prev, { id: pointIdRef.current++, x, y }];
        if (newTrail.length > 8) {
          newTrail.shift();
        }
        return newTrail;
      });

      // Detect if user is hovering over interactive luxury elements
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') !== null || 
        target.closest('button') !== null || 
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');

      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setTrail([]); // Clear trail on leave to prevent jumpy segments and duplicate keys on re-enter
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on mobile touch devices to ensure elegant mobile responsiveness
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
    return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* 1. Faint Green Glowing Trail Nodes */}
      {trail.map((point, index) => {
        // Opacity decays as the index goes from newest to oldest
        const opacity = (index + 1) / trail.length * 0.25;
        // Size gets smaller for older points
        const scale = (index + 1) / trail.length;
        
        return (
          <motion.div
            key={point.id}
            className="absolute rounded-full bg-luxury-green-glowing blur-[2px]"
            style={{
              x: point.x - 4,
              y: point.y - 4,
              width: 8,
              height: 8,
              opacity,
              scale,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity }}
            transition={{ duration: 0.1 }}
          />
        );
      })}

      {/* 2. Primary core interactive dot (Instantly snaps to coordinates) */}
      <motion.div
        className="absolute rounded-full bg-luxury-green-glowing shadow-[0_0_10px_rgba(74,222,128,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovering ? 6 : 8,
          height: isHovering ? 6 : 8,
          marginLeft: isHovering ? -3 : -4,
          marginTop: isHovering ? -3 : -4,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? '#ffffff' : '#4ade80',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />

      {/* 3. Outer floating luxury ring (spring delayed) */}
      <motion.div
        className="absolute rounded-full border border-luxury-green-glowing/40 bg-luxury-green-glowing/5"
        style={{
          x: ringX,
          y: ringY,
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          marginLeft: isHovering ? -24 : -16,
          marginTop: isHovering ? -24 : -16,
        }}
        animate={{
          borderColor: isHovering ? 'rgba(252, 253, 253, 0.8)' : 'rgba(74, 222, 128, 0.4)',
          borderWidth: isHovering ? '2px' : '1px',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </div>
  );
}
