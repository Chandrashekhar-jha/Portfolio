import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '@/config/siteConfig';
import { DisplayText } from '@/components/typography/DisplayText';
import { Label } from '@/components/typography/Label';
import { InteractiveLink } from '@/components/ui/InteractiveLink';
import { ProjectArchitectureFlow } from './ProjectArchitectureFlow';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export interface ProjectPrimaryEntryProps {
  project: Project;
  index: string;
}

export const ProjectPrimaryEntry: React.FC<ProjectPrimaryEntryProps> = ({ project, index }) => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const isDesktopApp = project.id === 'valyrian-web';

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASING.expoOut },
    },
  };

  const stackString = project.technologies.map((t) => t.name.toUpperCase()).join(' / ');

  return (
    <motion.article
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="w-full py-10 sm:py-16 border-b border-[var(--color-border-subtle)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Index, Title, Type Tag, Role */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[var(--color-accent)] font-bold">{index}</span>
            <span className="text-[var(--color-fg-subtle)]">// {project.category.toUpperCase()}</span>
            {project.metadata.impact && (
              <Label size="micro" variant="accent" badge className="text-[9px]">
                {project.metadata.impact}
              </Label>
            )}
          </div>

          <div
            onMouseEnter={() => setCursorVariant('pointer', isDesktopApp ? 'SOURCE' : 'EXPLORE')}
            onMouseLeave={resetCursor}
          >
            <DisplayText size="h1" className="tracking-tight hover:text-[var(--color-accent)] transition-colors">
              {project.title}
            </DisplayText>
            <p className="font-mono text-xs text-[var(--color-accent)] mt-1 uppercase">
              {project.tagline}
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-1 font-mono text-xs text-[var(--color-fg-subtle)]">
            <div>
              <span className="text-[var(--color-fg-muted)]">ROLE: </span>
              <span className="text-[var(--color-fg)]">{project.metadata.role}</span>
            </div>
            <div>
              <span className="text-[var(--color-fg-muted)]">TYPE: </span>
              <span className="text-[var(--color-fg)]">{project.metadata.duration}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Description, Architecture Pipeline, Tech Stack & Action Links */}
        <div className="lg:col-span-7 space-y-6">
          <p className="font-sans text-base sm:text-lg text-[var(--color-fg-muted)] leading-relaxed font-normal">
            {project.description}
          </p>

          {/* Visual Engineering Flow Diagram */}
          {project.metadata.architectureType && (
            <ProjectArchitectureFlow
              flowString={project.metadata.architectureType}
              demoNotice={project.metadata.impact?.includes('DEMO DATA') ? project.metadata.impact : undefined}
            />
          )}

          {/* Editorial Technology Stack Metadata */}
          <div className="space-y-1 font-mono text-xs">
            <span className="text-[var(--color-fg-subtle)] block uppercase tracking-wider">
              STACK // METADATA
            </span>
            <p className="text-[var(--color-fg)] leading-relaxed">
              {stackString}
            </p>
          </div>

          {/* Action Links */}
          <div className="pt-4 flex flex-wrap items-center gap-6">
            {project.links.live && !isDesktopApp && (
              <InteractiveLink
                href={project.links.live}
                external
                showArrow
                cursorText="VIEW LIVE"
                variant="default"
                className="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)] font-semibold"
              >
                VIEW LIVE ↗
              </InteractiveLink>
            )}

            {project.links.github && (
              <InteractiveLink
                href={project.links.github}
                external
                showArrow
                cursorText="SOURCE"
                variant="subtle"
                className="font-mono text-xs uppercase tracking-wider text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              >
                VIEW SOURCE ↗
              </InteractiveLink>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};
