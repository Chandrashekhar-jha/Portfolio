import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { Label } from '@/components/typography/Label';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const IdentityMeta: React.FC = () => {
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
    <div className="w-full flex flex-wrap items-center justify-between gap-y-4 pb-6 mb-8 border-b border-[var(--color-border-subtle)]">
      {/* Index & Section Label */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex items-center gap-3"
      >
        <Label badge variant="accent" size="micro">02 / 06</Label>
        <Label variant="subtle" size="micro">ABOUT // CONTEXT</Label>
      </motion.div>

      {/* Role & Base Metadata */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex flex-wrap items-center gap-6 font-mono text-xs text-[var(--color-fg-subtle)] uppercase"
      >
        <div>
          <span className="text-[var(--color-fg-muted)]">ROLE: </span>
          <span className="text-[var(--color-fg)] font-medium">WEB DEVELOPER</span>
        </div>
        <div>
          <span className="text-[var(--color-fg-muted)]">BASED: </span>
          <span className="text-[var(--color-fg)] font-medium">{siteConfig.personal.location}</span>
        </div>
      </motion.div>
    </div>
  );
};
