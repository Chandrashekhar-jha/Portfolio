import React from 'react';
import { Section } from '@/components/layout/Section';
import { BackgroundHeader } from './BackgroundHeader';
import { EducationEntry } from './EducationEntry';
import { ProgressionSequence } from './ProgressionSequence';
import { ProofLinks } from './ProofLinks';

export const Background: React.FC = () => {
  return (
    <Section id="proof" spacing="xl" bordered className="relative overflow-hidden">
      {/* Header Metadata */}
      <BackgroundHeader />

      {/* 01 — EDUCATION */}
      <EducationEntry />

      {/* 02 — PROGRESSION */}
      <ProgressionSequence />

      {/* 03 — PROOF LINKS */}
      <ProofLinks />
    </Section>
  );
};
