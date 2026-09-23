import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/layout/Section';
import { OpeningMeta } from './OpeningMeta';
import { OpeningTitle } from './OpeningTitle';
import { OpeningScrollIndicator } from './OpeningScrollIndicator';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const Opening: React.FC = () => {
  const { progress } = useScrollProgress();
  const shouldReduceMotion = useReducedMotion();

  // Scroll exit transformation factors
  const opacity = shouldReduceMotion ? 1 : Math.max(1 - progress * 2.2, 0);
  const translateY = shouldReduceMotion ? 0 : progress * -80;

  return (
    <Section id="overview" spacing="none" className="min-h-[92vh] flex flex-col justify-between pt-24 pb-12 overflow-hidden">
      <motion.div
        style={{ opacity, y: translateY }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex-1 flex flex-col justify-between"
      >
        {/* Technical Header Metadata */}
        <OpeningMeta />

        {/* Hero Typographic Statement */}
        <div className="my-auto">
          <OpeningTitle />
        </div>

        {/* Minimal Scroll Indicator */}
        <OpeningScrollIndicator />
      </motion.div>
    </Section>
  );
};
