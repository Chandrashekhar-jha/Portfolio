import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { Label } from '@/components/typography/Label';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const OpeningMeta: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-wrap items-center justify-between gap-y-3 font-mono text-[11px] text-[var(--color-fg-subtle)] border-b border-[var(--color-border-subtle)] pb-4 mb-8 sm:mb-12"
    >
      {/* Index & Coordinates */}
      <motion.div variants={itemVariants} className="flex items-center gap-3">
        <Label badge variant="accent" size="micro">01 / 08</Label>
        <span className="hidden sm:inline-block text-[var(--color-fg-muted)]">
          LOC: {siteConfig.personal.coordinates}
        </span>
      </motion.div>

      {/* Primary Role & Focus */}
      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
        <span className="text-[var(--color-fg)] font-medium uppercase tracking-wider">
          {siteConfig.personal.role}
        </span>
      </motion.div>

      {/* System Mode Indicator */}
      <motion.div variants={itemVariants} className="hidden md:flex items-center gap-4">
        <span>BUILD // EXPERIMENT // REPEAT</span>
        <span className="text-[var(--color-fg-muted)]">VER 2026.1</span>
      </motion.div>
    </motion.div>
  );
};
