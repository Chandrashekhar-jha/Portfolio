import React from 'react';
import { Section } from '@/components/layout/Section';
import { siteConfig } from '@/config/siteConfig';
import { ProjectsHeader } from './ProjectsHeader';
import { ProjectPrimaryEntry } from './ProjectPrimaryEntry';
import { ProjectEarlierEntry } from './ProjectEarlierEntry';

export const Projects: React.FC = () => {
  const primaryProjects = siteConfig.projects.slice(0, 4);
  const earlierProjects = siteConfig.projects.slice(4);

  return (
    <Section id="work" spacing="xl" bordered className="relative overflow-hidden">
      {/* Section Metadata Header */}
      <ProjectsHeader />

      {/* Tier 1: Primary Work (01 - 04) */}
      <div className="space-y-4">
        {primaryProjects.map((project, idx) => (
          <ProjectPrimaryEntry
            key={project.id}
            project={project}
            index={`0${idx + 1}`}
          />
        ))}
      </div>

      {/* Tier 2: Earlier Builds & Experiments (05 - 06) */}
      <div className="mt-20 pt-10 border-t border-[var(--color-border-subtle)]">
        <div className="flex items-center justify-between mb-8">
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--color-fg-subtle)] flex items-center gap-3">
            <span>EARLIER BUILDS // ARCHIVE</span>
            <span className="text-[var(--color-accent)] font-bold">05 — 06</span>
          </div>
          <span className="font-mono text-[10px] text-[var(--color-fg-subtle)] uppercase">
            LEARNING PROGRESSION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {earlierProjects.map((project, idx) => (
            <ProjectEarlierEntry
              key={project.id}
              project={project}
              index={`0${idx + 5}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};
