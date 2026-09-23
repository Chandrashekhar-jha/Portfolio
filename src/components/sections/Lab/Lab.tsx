import React from 'react';
import { Section } from '@/components/layout/Section';
import { siteConfig } from '@/config/siteConfig';
import { LabHeader } from './LabHeader';
import { ExperimentEntry } from './ExperimentEntry';
import { ExperimentInteraction } from './ExperimentInteraction';
import { LabNotes } from './LabNotes';

export const Lab: React.FC = () => {
  const alignments: Array<'left' | 'right' | 'center'> = ['left', 'right', 'left', 'center', 'right', 'left'];

  return (
    <Section id="experiments" spacing="xl" bordered className="relative overflow-hidden">
      {/* Header Metadata */}
      <LabHeader />

      {/* Spatially Independent Vertical Experimental Archive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-4">
        {siteConfig.experiments.map((exp, idx) => (
          <ExperimentEntry
            key={exp.id}
            experiment={exp}
            alignment={alignments[idx % alignments.length]}
          />
        ))}
      </div>

      {/* Interactive Workbench ("BREAK THE SYSTEM") */}
      <ExperimentInteraction />

      {/* Editorial Lab Note & Section 06 Transition Marker */}
      <LabNotes />
    </Section>
  );
};
