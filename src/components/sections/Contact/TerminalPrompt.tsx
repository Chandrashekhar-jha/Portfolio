import React from 'react';
import { motion } from 'framer-motion';
import { DisplayText } from '@/components/typography/DisplayText';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const TerminalPrompt: React.FC = () => {
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
      className="w-full space-y-8"
    >
      {/* Large Editorial Contact Statement */}
      <div className="space-y-3">
        <DisplayText size="h1" className="font-bold tracking-tight uppercase leading-[1.05]">
          LET'S BUILD SOMETHING.
        </DisplayText>
        <p className="font-sans text-base sm:text-lg text-[var(--color-fg-muted)] leading-relaxed max-w-2xl font-normal">
          I'm open to web development, full-stack, and software engineering opportunities.
        </p>
      </div>

      {/* Clean Status & Availability Information Box */}
      <div className="p-6 md:p-8 bg-[#09090b] border border-[var(--color-border-subtle)] rounded-[var(--radius-md)] space-y-4 font-mono text-xs md:text-sm text-[var(--color-fg-subtle)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-white/5 pb-3">
          <span className="text-[var(--color-fg-muted)] uppercase">STATUS //</span>
          <span className="text-[var(--color-accent)] font-semibold">AVAILABLE FOR OPPORTUNITIES</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-white/5 pb-3">
          <span className="text-[var(--color-fg-muted)] uppercase">LOCATION //</span>
          <span className="text-[var(--color-fg)] font-medium">PUNE, INDIA</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
          <span className="text-[var(--color-fg-muted)] uppercase">PRIMARY FOCUS //</span>
          <span className="text-[var(--color-fg)] font-medium">WEB DEVELOPMENT / FULL-STACK</span>
        </div>
      </div>
    </motion.div>
  );
};
