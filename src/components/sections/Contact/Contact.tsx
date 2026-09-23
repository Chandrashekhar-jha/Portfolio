import React from 'react';
import { Section } from '@/components/layout/Section';
import { ContactHeader } from './ContactHeader';
import { TerminalPrompt } from './TerminalPrompt';
import { ContactLinks } from './ContactLinks';
import { Footer } from './Footer';

export const Contact: React.FC = () => {
  return (
    <Section id="contact" spacing="xl" bordered={false} className="relative overflow-hidden">
      {/* Header Metadata */}
      <ContactHeader />

      {/* Main Terminal Prompt & Statement */}
      <div className="space-y-12">
        <TerminalPrompt />
        <ContactLinks />
      </div>

      {/* Final System Footer */}
      <Footer />
    </Section>
  );
};
