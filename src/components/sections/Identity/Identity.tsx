import React from 'react';
import { Section } from '@/components/layout/Section';
import { IdentityMeta } from './IdentityMeta';
import { IdentityStatement } from './IdentityStatement';
import { IdentityIntro } from './IdentityIntro';

export const Identity: React.FC = () => {
  return (
    <Section id="identity" spacing="xl" bordered className="relative overflow-hidden">
      <IdentityMeta />
      <IdentityStatement />
      <IdentityIntro />
    </Section>
  );
};
