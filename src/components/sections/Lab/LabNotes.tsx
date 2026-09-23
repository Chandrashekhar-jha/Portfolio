import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const LabNotes: React.FC = () => {
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
    <div className="w-full pt-12 mt-16 border-t border-[var(--color-border-subtle)] space-y-8">
      {/* Editorial Philosophy Note */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="max-w-2xl p-4 bg-[var(--color-bg-subtle)] border-l-2 border-[var(--color-accent)] font-sans text-sm text-[var(--color-fg-muted)] italic"
      >
        "Not everything here needs to become a product."
      </motion.div>

      {/* Visual Marker Transition to Section 06 */}
      <div className="pt-6 flex items-center justify-between font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
        <div className="flex items-center gap-3">
          <Label badge variant="accent" size="micro">05 COMPLETE</Label>
          <span className="text-[var(--color-accent)]">TRANSITION →</span>
          <span>06 / 08 BACKGROUND // PROOF</span>
        </div>
        <span className="text-[10px] hidden sm:inline-block">LAB LOG END</span>
      </div>
    </div>
  );
};
