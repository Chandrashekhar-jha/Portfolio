import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const BackgroundHeader: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING.expoOut },
    },
  };

  return (
    <div className="w-full space-y-4 pb-6 mb-12 border-b border-[var(--color-border-subtle)]">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Label badge variant="accent" size="micro">06 / 08</Label>
          <Label variant="subtle" size="micro">BACKGROUND // PROOF</Label>
        </div>
        <span className="font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
          EVIDENCE & PROGRESSION
        </span>
      </motion.div>
    </div>
  );
};
