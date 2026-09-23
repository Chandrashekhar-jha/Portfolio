import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { siteConfig } from '@/config/siteConfig';
import { EASING } from '@/lib/motion';

export const OpeningTitle: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const titleVariants = {
    hidden: { y: shouldReduceMotion ? 0 : '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.8,
        ease: EASING.expoOut,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.9, ease: EASING.expoOut, delay: 0.3 },
    },
  };

  return (
    <div className="relative w-full flex flex-col justify-center select-none py-4 sm:py-8">
      {/* Fragmented Top Line */}
      <div className="overflow-hidden pb-1">
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          onMouseEnter={() => setCursorVariant('pointer', 'IDENTITY')}
          onMouseLeave={resetCursor}
          className="inline-block font-display font-extrabold uppercase text-[clamp(1.65rem,7.5vw,6.5rem)] tracking-tighter leading-[0.9] text-[var(--color-fg)] break-all sm:break-normal max-w-full"
        >
          CHANDRASHEKHAR
        </motion.div>
      </div>

      {/* Middle Grid Row: Surname + Structural Sub-statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline my-2 sm:my-4">
        {/* Surname */}
        <div className="lg:col-span-6 overflow-hidden">
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
            onMouseEnter={() => setCursorVariant('pointer', 'ARCHITECT')}
            onMouseLeave={resetCursor}
            className="inline-block font-display font-extrabold uppercase text-[clamp(1.65rem,7.5vw,6.5rem)] tracking-tighter leading-[0.9] text-[var(--color-fg)]"
          >
            JHA
            <span className="inline-block w-3 h-3 sm:w-5 sm:h-5 ml-2 bg-[var(--color-accent)] rounded-full align-baseline" />
          </motion.div>
        </div>

        {/* Structural Sub-statement */}
        <div className="lg:col-span-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASING.expoOut }}
            className="flex flex-col gap-2 max-w-xl"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
              // WEB ENGINEERING & FULL-STACK ARCHITECTURE
            </div>
            <p className="font-sans text-base sm:text-lg text-[var(--color-fg-muted)] leading-relaxed font-normal">
              {siteConfig.personal.focusArea}. Designing interfaces that prioritize experience, performance, and technical clarity.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Architectural Rule Divider */}
      <motion.div
        variants={lineVariants}
        initial="hidden"
        animate="visible"
        className="h-[1px] w-full bg-[var(--color-border)] my-6 sm:my-10"
      />
    </div>
  );
};
