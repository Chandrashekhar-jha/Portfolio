import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/config/siteConfig';
import { DisplayText } from '@/components/typography/DisplayText';
import { InteractiveLink } from '@/components/ui/InteractiveLink';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export interface ProjectEarlierEntryProps {
  project: Project;
  index: string;
}

export const ProjectEarlierEntry: React.FC<ProjectEarlierEntryProps> = ({ project, index }) => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASING.expoOut },
    },
  };

  const stackString = project.technologies.map((t) => t.name.toUpperCase()).join(' / ');

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] flex flex-col justify-between gap-4 transition-all duration-200"
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-[var(--color-fg-subtle)]">{index}</span>
          <span className="text-[var(--color-fg-subtle)] uppercase text-[10px]">
            {project.metadata.role}
          </span>
        </div>

        <div
          onMouseEnter={() => setCursorVariant('pointer', 'VIEW')}
          onMouseLeave={resetCursor}
        >
          <DisplayText size="h3" className="hover:text-[var(--color-accent)] transition-colors">
            {project.title}
          </DisplayText>
        </div>

        <p className="font-sans text-xs text-[var(--color-fg-muted)] leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="pt-3 border-t border-[var(--color-border-subtle)] space-y-3">
        <div className="font-mono text-[10px] text-[var(--color-fg-subtle)] uppercase truncate">
          {stackString}
        </div>

        {project.links.live && (
          <InteractiveLink
            href={project.links.live}
            external
            showArrow
            cursorText="VIEW LIVE"
            variant="mono"
          >
            VIEW LIVE ↗
          </InteractiveLink>
        )}
      </div>
    </motion.article>
  );
};
