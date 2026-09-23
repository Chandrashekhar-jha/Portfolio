import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { DisplayText } from '@/components/typography/DisplayText';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const LabHeader: React.FC = () => {
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
      {/* Section Index & Label */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Label badge variant="accent" size="micro">05 / 08</Label>
          <Label variant="subtle" size="micro">LAB // EXPERIMENTS</Label>
        </div>
        <span className="font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
          DIGITAL WORKBENCH
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="max-w-3xl"
      >
        <DisplayText size="h2" className="tracking-tight text-[var(--color-fg)]">
          SOME THINGS ARE BUILT TO SHIP. SOME ARE BUILT TO UNDERSTAND.
        </DisplayText>
      </motion.div>
    </div>
  );
};
