import React from 'react';
import { motion } from 'framer-motion';
import { DisplayText } from '@/components/typography/DisplayText';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const IdentityStatement: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const revealVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASING.expoOut },
    },
  };

  return (
    <div className="w-full select-none my-6 sm:my-10">
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        onMouseEnter={() => setCursorVariant('pointer', 'PERSPECTIVE')}
        onMouseLeave={resetCursor}
        className="group relative"
      >
        <DisplayText size="h1" className="tracking-tight text-[var(--color-fg)] leading-[1.02]">
          WHO IS CHANDRASHEKHAR?
        </DisplayText>
        <DisplayText size="h2" editorial className="text-[var(--color-fg-muted)] mt-2 font-normal">
          web developer focused on full-stack applications & practical systems.
        </DisplayText>
      </motion.div>
    </div>
  );
};
