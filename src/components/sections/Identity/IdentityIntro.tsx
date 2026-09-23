import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const IdentityIntro: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING.expoOut, delay: 0.15 },
    },
  };

  const techList = ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'TypeScript'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-8 sm:my-12"
    >
      {/* Editorial Sub-Heading Column */}
      <div className="lg:col-span-4 space-y-3">
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)] font-semibold">
          // ACADEMIC BACKGROUND
        </div>
        <p className="font-sans text-sm text-[var(--color-fg-muted)] leading-relaxed">
          B.Tech in Artificial Intelligence & Machine Learning at JSPM University, Wagholi, Pune (2023–2027).
        </p>
      </div>

      {/* Main Narrative Introduction Column */}
      <div className="lg:col-span-8 space-y-6">
        <p className="font-sans text-lg sm:text-xl text-[var(--color-fg)] leading-relaxed font-normal">
          I'm a web developer focused on building full-stack applications, practical interfaces, and systems that solve real problems. I started with frontend development and gradually moved toward building complete applications across the frontend, backend, and database layers.
        </p>

        {/* Integrated Technology Reference Inline System */}
        <div className="pt-4 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[var(--color-fg-subtle)]">
          <span className="uppercase tracking-wider text-[var(--color-fg-muted)]">PRACTICAL TECH //</span>
          {techList.map((tech, index) => (
            <span key={tech} className="inline-flex items-center gap-2 text-[var(--color-fg)]">
              <span className="text-[var(--color-accent)] font-bold">0{index + 1}</span>
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
