import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export const CursorInteraction: React.FC = () => {
  const { variant, cursorText } = useCursor();
  const { isTouch } = useBreakpoint();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouch, isVisible]);

  if (isTouch || !isVisible || variant === 'hidden') return null;

  const variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      width: 8,
      height: 8,
      backgroundColor: 'var(--color-fg)',
      borderRadius: '50%',
    },
    pointer: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid var(--color-accent)',
      borderRadius: '50%',
    },
    text: {
      x: mousePosition.x - 1,
      y: mousePosition.y - 12,
      width: 2,
      height: 24,
      backgroundColor: 'var(--color-accent)',
      borderRadius: '0px',
    },
    project: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: 'var(--color-fg)',
      color: 'var(--color-bg)',
      borderRadius: '50%',
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center mix-blend-difference"
      animate={variant}
      variants={variants}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 28,
        mass: 0.1,
      }}
    >
      {cursorText && (
        <span
          className={`font-mono text-[9px] font-bold uppercase tracking-wider ${
            variant === 'project' ? 'text-[var(--color-bg)]' : 'text-[var(--color-accent)]'
          }`}
        >
          {cursorText}
        </span>
      )}
    </motion.div>
  );
};
