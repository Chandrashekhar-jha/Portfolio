import React from 'react';
import { Section } from '@/components/layout/Section';
import { IdentityMeta } from './IdentityMeta';
import { IdentityStatement } from './IdentityStatement';
import { IdentityIntro } from './IdentityIntro';
import { BuildSignature } from './BuildSignature';

export const Identity: React.FC = () => {
  return (
    <Section id="identity" spacing="xl" bordered className="relative overflow-hidden">
      <IdentityMeta />
      <IdentityStatement />
      <IdentityIntro />
      <BuildSignature />
    </Section>
  );
};
