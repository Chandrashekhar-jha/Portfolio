import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const EngineeringPhilosophy: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { num: '01', title: 'UNDERSTAND', desc: 'What business problem needs to exist?' },
    { num: '02', title: 'STRUCTURE', desc: 'How should API, auth & data layers be divided?' },
    { num: '03', title: 'BUILD', desc: 'Implement smallest working full-stack path.' },
    { num: '04', title: 'TEST', desc: 'Find where data assumptions & edge cases break.' },
    { num: '05', title: 'IMPROVE', desc: 'Refactor architecture & optimize throughput.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING.expoOut },
    },
  };

  return (
    <div className="w-full pt-12 mt-16 border-t border-[var(--color-border-subtle)] space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
        <span className="text-[var(--color-fg-subtle)] uppercase tracking-widest">
          // HOW I APPROACH A BUILD
        </span>
        <span className="text-[var(--color-accent)] font-bold uppercase">
          ENGINEERING METHODOLOGY
        </span>
      </div>

      {/* 5-Step Process Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {steps.map((step) => (
          <motion.div
            key={step.num}
            variants={itemVariants}
            onMouseEnter={() => setCursorVariant('pointer', step.title)}
            onMouseLeave={resetCursor}
            className="group p-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] space-y-2 transition-all duration-200"
          >
            <div className="flex items-center justify-between font-mono text-xs">
              <span className="text-[var(--color-accent)] font-bold">{step.num}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-border)] group-hover:bg-[var(--color-accent)] transition-colors" />
            </div>
            <div className="font-display font-bold text-sm uppercase text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
              {step.title}
            </div>
            <p className="font-sans text-xs text-[var(--color-fg-muted)] leading-relaxed">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle Visual Transition to Next Chapter (Section 05) */}
      <div className="pt-8 flex items-center justify-between font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-accent)]">NEXT LAYER →</span>
          <span>05 / 08 LAB & EXPERIMENTS</span>
        </div>
        <span className="text-[10px]">CONTINUOUS INTEGRATION</span>
      </div>
    </div>
  );
};
