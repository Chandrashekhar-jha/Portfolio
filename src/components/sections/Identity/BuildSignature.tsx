import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const BuildSignature: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { code: '01', label: 'BUILD', desc: 'Construct functional prototypes' },
    { code: '02', label: 'BREAK', desc: 'Stress test limits & edge cases' },
    { code: '03', label: 'UNDERSTAND', desc: 'Analyze underlying mechanics' },
    { code: '04', label: 'IMPROVE', desc: 'Refine architecture & performance' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
    <div className="w-full pt-8 mt-12 border-t border-[var(--color-border-subtle)]">
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-subtle)]">
          // DEVELOPMENT METHODOLOGY & CYCLE
        </span>
        <span className="font-mono text-[10px] text-[var(--color-accent)] uppercase">
          ITERATIVE PARADIGM
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {steps.map((step) => (
          <motion.div
            key={step.code}
            variants={itemVariants}
            onMouseEnter={() => setCursorVariant('pointer', step.label)}
            onMouseLeave={resetCursor}
            className="group p-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] transition-all duration-200"
          >
            <div className="flex items-center justify-between font-mono text-xs mb-2">
              <span className="text-[var(--color-fg-subtle)]">{step.code}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-subtle)] group-hover:bg-[var(--color-accent)] transition-colors" />
            </div>
            <div className="font-display text-lg font-bold uppercase text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
              {step.label}
            </div>
            <p className="font-sans text-xs text-[var(--color-fg-muted)] mt-1">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
