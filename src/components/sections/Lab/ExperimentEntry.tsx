import React from 'react';
import { motion } from 'framer-motion';
import type { Experiment } from '@/config/siteConfig';
import { DisplayText } from '@/components/typography/DisplayText';
import { ExperimentStatus } from './ExperimentStatus';
import { InteractiveLink } from '@/components/ui/InteractiveLink';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export interface ExperimentEntryProps {
  experiment: Experiment;
  alignment?: 'left' | 'right' | 'center';
}

export const ExperimentEntry: React.FC<ExperimentEntryProps> = ({
  experiment,
  alignment = 'left',
}) => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING.expoOut },
    },
  };

  const alignStyles = {
    left: 'lg:col-span-7 lg:col-start-1',
    right: 'lg:col-span-7 lg:col-start-6',
    center: 'lg:col-span-8 lg:col-start-3',
  };

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={`w-full py-8 my-4 ${alignStyles[alignment]}`}
    >
      <div className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] space-y-4 transition-all duration-200">
        {/* Experiment Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] pb-3">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[var(--color-accent)] font-bold">{experiment.number}</span>
            <span className="text-[var(--color-fg-subtle)] uppercase">// {experiment.category}</span>
          </div>
          <ExperimentStatus status={experiment.status} />
        </div>

        {/* Experiment Title */}
        <div
          onMouseEnter={() => setCursorVariant('pointer', 'EXPERIMENT')}
          onMouseLeave={resetCursor}
        >
          <DisplayText size="h3" className="hover:text-[var(--color-accent)] transition-colors">
            {experiment.title}
          </DisplayText>
        </div>

        {/* Experiment Narrative Description */}
        <p className="font-sans text-sm text-[var(--color-fg-muted)] leading-relaxed">
          {experiment.description}
        </p>

        {/* Custom Visual Sub-component per Experiment Type */}
        {experiment.id === 'exp-01' && experiment.escapedProjectRef && (
          <div className="p-3 bg-[var(--color-card)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--color-fg-subtle)]">FROM THE LAB → {experiment.escapedProjectRef.name}</span>
            <InteractiveLink
              href={experiment.escapedProjectRef.link}
              external
              showArrow
              cursorText="SOURCE"
              variant="mono"
            >
              SOURCE ↗
            </InteractiveLink>
          </div>
        )}

        {experiment.id === 'exp-05' && (
          <div className="p-4 bg-[var(--color-card)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] font-mono text-xs space-y-2">
            <div className="text-[var(--color-accent)]">SYSTEM GRAPH // UNRESOLVED NODE</div>
            <div className="flex flex-wrap items-center gap-2 text-[var(--color-fg-subtle)]">
              <span>NODE: PARSER</span>
              <span>→</span>
              <span>NODE: VECTOR STORE</span>
              <span>→</span>
              <span className="px-2 py-0.5 bg-amber-950/40 text-amber-400 border border-amber-500/40 font-bold rounded">
                UNKNOWN [UNRESOLVED]
              </span>
            </div>
          </div>
        )}

        {experiment.id === 'exp-06' && experiment.notes && (
          <div className="space-y-2 pt-2 border-t border-[var(--color-border-subtle)] font-mono text-xs">
            <span className="text-[var(--color-fg-subtle)] uppercase block">DISCARDED LAB NOTES //</span>
            <div className="space-y-1.5">
              {experiment.notes.map((note, idx) => (
                <div key={idx} className="text-[var(--color-fg-muted)] flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>"{note}"</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags Metadata */}
        {experiment.tags && (
          <div className="pt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] text-[var(--color-fg-subtle)]">
            {experiment.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-[var(--color-card)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)]">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
};
