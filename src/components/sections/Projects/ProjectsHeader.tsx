import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const ProjectsHeader: React.FC = () => {
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
    <div className="w-full flex flex-wrap items-center justify-between gap-y-4 pb-6 mb-12 border-b border-[var(--color-border-subtle)]">
      {/* Section Index Badge */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex items-center gap-3"
      >
        <Label badge variant="accent" size="micro">03 / 08</Label>
        <Label variant="subtle" size="micro">SELECTED WORK // ARCHIVE</Label>
      </motion.div>

      {/* System Action Status */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex items-center gap-4 font-mono text-xs text-[var(--color-fg-subtle)] uppercase"
      >
        <span>BUILT // SHIPPED // EXPERIMENTED</span>
        <span className="hidden sm:inline-block text-[var(--color-fg-muted)]">6 ARTIFACTS</span>
      </motion.div>
    </div>
  );
};
