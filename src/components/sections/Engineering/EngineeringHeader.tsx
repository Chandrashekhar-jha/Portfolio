import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { DisplayText } from '@/components/typography/DisplayText';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const EngineeringHeader: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING.expoOut },
    },
  };

  return (
    <div className="w-full space-y-6 pb-6 mb-12 border-b border-[var(--color-border-subtle)]">
      {/* Section Metadata Header */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Label badge variant="accent" size="micro">04 / 08</Label>
          <Label variant="subtle" size="micro">ENGINEERING // SYSTEM LAYERS</Label>
        </div>
        <span className="font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
          HOW I BUILD
        </span>
      </motion.div>

      {/* Primary Editorial Opening Statement */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="max-w-4xl"
      >
        <DisplayText size="h2" className="tracking-tight text-[var(--color-fg)]">
          "I DON'T THINK ABOUT A STACK AS A LIST OF TOOLS. I THINK ABOUT HOW THE LAYERS CONNECT."
        </DisplayText>
        <p className="font-mono text-xs text-[var(--color-accent)] mt-3 uppercase tracking-wider">
          REACT → SERVER → AUTH → DATA → INTEGRATIONS → DEPLOYMENT
        </p>
      </motion.div>
    </div>
  );
};
