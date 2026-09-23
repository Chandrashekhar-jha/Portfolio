import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const ContactHeader: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING.expoOut },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="w-full pb-8 mb-8 border-b border-[var(--color-border-subtle)] space-y-3"
    >
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-[var(--color-accent)] font-bold uppercase">
            06 / 06 — CONTACT
          </span>
          <span className="text-[var(--color-border-subtle)]">•</span>
          <Label variant="subtle" size="micro" className="uppercase">
            DIRECT CHANNELS
          </Label>
        </div>

        <div className="font-mono text-[10px] text-[var(--color-fg-muted)] tracking-wider uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          CONNECTION READY
        </div>
      </div>
    </motion.div>
  );
};
