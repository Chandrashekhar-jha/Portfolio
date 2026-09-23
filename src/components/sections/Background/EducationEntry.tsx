import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { DisplayText } from '@/components/typography/DisplayText';
import { Label } from '@/components/typography/Label';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const EducationEntry: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const edu = siteConfig.personal.education;

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
      viewport={{ once: true, margin: '-50px' }}
      className="w-full py-8 my-4 border-b border-[var(--color-border-subtle)] space-y-4"
    >
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="text-[var(--color-accent)] font-bold">01 // EDUCATION</span>
        <Label variant="subtle" size="micro">ACADEMIC BACKGROUND</Label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-baseline">
        <div className="lg:col-span-6 space-y-2">
          <DisplayText size="h3" className="text-[var(--color-fg)]">
            {edu.degree} — {edu.field}
          </DisplayText>
          <div className="font-mono text-xs text-[var(--color-accent)] uppercase">
            {edu.institution}, {edu.location}
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col justify-end">
          <div className="p-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--color-fg-muted)]">STATUS:</span>
            <span className="text-[var(--color-fg)] font-medium">{edu.status}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
