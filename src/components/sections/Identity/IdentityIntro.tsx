import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
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
        <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-accent)]">
          // ACADEMIC & STACK CONTEXT
        </div>
        <p className="font-sans text-sm text-[var(--color-fg-muted)] leading-relaxed">
          {siteConfig.personal.degree}. Focused on hands-on software construction and full-stack web development.
        </p>
      </div>

      {/* Main Narrative Introduction Column */}
      <div className="lg:col-span-8 space-y-6">
        <p className="font-sans text-lg sm:text-xl text-[var(--color-fg)] leading-relaxed font-normal">
          I am a web developer specializing in full-stack engineering. My work focuses on building clean, performant user interfaces backed by scalable server architectures. I explore complex web challenges by writing modular code and testing functional ideas in real applications.
        </p>

        {/* Integrated Technology Reference Inline System */}
        <div className="pt-4 border-t border-[var(--color-border-subtle)] flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[var(--color-fg-subtle)]">
          <span className="uppercase tracking-wider text-[var(--color-fg-muted)]">CORE TOOLCHAIN //</span>
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
