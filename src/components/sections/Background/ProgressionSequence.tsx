import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const ProgressionSequence: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const stages = [
    {
      num: '01',
      title: 'FIRST BUILDS',
      tech: 'React → Frontend Fundamentals',
      project: 'EDUSITY',
      desc: 'Building component structures, understanding DOM state & responsive layouts.',
    },
    {
      num: '02',
      title: 'FULL-STACK DEVELOPMENT',
      tech: 'Node.js → Express → MongoDB → PostgreSQL → Auth & RBAC',
      project: 'BATHROOM TALK → SHOPNEST → OPSFLOW',
      desc: 'Constructing REST APIs, database schemas, JWT auth, payments, & operational portals.',
    },
    {
      num: '03',
      title: 'NOW',
      tech: 'Web Engineering & System Architecture',
      project: 'FULL-STACK / SYSTEM ARCHITECTURES',
      desc: 'Designing scalable web applications, modular APIs, and interactive web experiences.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
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
    <div className="w-full py-8 my-4 border-b border-[var(--color-border-subtle)] space-y-6">
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="text-[var(--color-accent)] font-bold">02 // PROGRESSION</span>
        <Label variant="subtle" size="micro">DEVELOPMENT EVOLUTION</Label>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="space-y-4"
      >
        {stages.map((stage, idx) => (
          <motion.div
            key={stage.num}
            variants={itemVariants}
            className="p-5 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] space-y-3 transition-all duration-200"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-accent)] font-bold">{stage.num}</span>
                <span className="text-[var(--color-fg)] font-bold uppercase tracking-wider">{stage.title}</span>
              </div>
              <span className="text-[var(--color-fg-subtle)] text-[10px] uppercase">{stage.project}</span>
            </div>

            <div className="font-mono text-xs text-[var(--color-accent)]">
              {stage.tech}
            </div>

            <p className="font-sans text-xs text-[var(--color-fg-muted)] leading-relaxed">
              {stage.desc}
            </p>

            {idx < stages.length - 1 && (
              <div className="pt-1 flex justify-center text-[var(--color-fg-subtle)] text-xs">
                ↓
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
