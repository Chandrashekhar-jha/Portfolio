import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { InteractiveLink } from '@/components/ui/InteractiveLink';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const ProofLinks: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
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
      className="w-full py-8 my-4 space-y-6"
    >
      <div className="flex items-center gap-3 font-mono text-xs">
        <span className="text-[var(--color-accent)] font-bold">03 // PROOF</span>
        <Label variant="subtle" size="micro">EXTERNAL VERIFICATION</Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* GitHub */}
        <div
          onMouseEnter={() => setCursorVariant('pointer', 'GITHUB')}
          onMouseLeave={resetCursor}
          className="p-5 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] space-y-3 transition-all duration-200"
        >
          <div className="font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
            SOURCE CODE & LAB
          </div>
          <div className="font-display text-lg font-bold uppercase text-[var(--color-fg)]">
            GITHUB
          </div>
          <InteractiveLink
            href="https://github.com/Chandrashekhar-jha"
            external
            showArrow
            cursorText="GITHUB"
            variant="mono"
            className="text-[var(--color-accent)]"
          >
            @CHANDRASHEKHAR-JHA ↗
          </InteractiveLink>
        </div>

        {/* LinkedIn */}
        <div
          onMouseEnter={() => setCursorVariant('pointer', 'LINKEDIN')}
          onMouseLeave={resetCursor}
          className="p-5 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] space-y-3 transition-all duration-200"
        >
          <div className="font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
            PROFESSIONAL NETWORK
          </div>
          <div className="font-display text-lg font-bold uppercase text-[var(--color-fg)]">
            LINKEDIN
          </div>
          <InteractiveLink
            href="https://www.linkedin.com/in/chandrashekhar-jha-b95240285/?isSelfProfile=true"
            external
            showArrow
            cursorText="LINKEDIN"
            variant="mono"
            className="text-[var(--color-accent)]"
          >
            CHANDRASHEKHAR JHA ↗
          </InteractiveLink>
        </div>

        {/* Resume */}
        <div
          onMouseEnter={() => setCursorVariant('pointer', 'RESUME')}
          onMouseLeave={resetCursor}
          className="p-5 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] space-y-3 transition-all duration-200"
        >
          <div className="font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
            TECHNICAL RESUME
          </div>
          <div className="font-display text-lg font-bold uppercase text-[var(--color-fg)]">
            RESUME
          </div>
          <InteractiveLink
            href="https://drive.google.com/file/d/1LlBLd3cdeU9sK--YxkOwURyArVCtfBk8/view?usp=drive_link"
            external
            showArrow
            cursorText="RESUME"
            variant="mono"
            className="text-[var(--color-accent)]"
          >
            VIEW RESUME OVERVIEW ↗
          </InteractiveLink>
        </div>
      </div>
    </motion.div>
  );
};
