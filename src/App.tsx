import React, { useState } from 'react';
import { CursorProvider } from '@/hooks/useCursor';
import { CursorInteraction } from '@/components/motion/CursorInteraction';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Navigation } from '@/components/navigation/Navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { Opening, Identity, Projects, Engineering, Background, Contact } from '@/components/sections';
import { CinematicIntro } from '@/components/intro/CinematicIntro';

export const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <CursorProvider>
      {/* Cinematic Intro Overlay */}
      {!introFinished && (
        <CinematicIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Global Architectural Features */}
      <CursorInteraction />
      <ScrollProgress />
      <Navigation />

      {/* Main Portfolio Container */}
      <PageContainer showGridLines>
        {/* 01 — HOME */}
        <Opening />

        {/* 02 — ABOUT */}
        <Identity />

        {/* 03 — PROJECTS */}
        <Projects />

        {/* 04 — SKILLS */}
        <Engineering />

        {/* 05 — BACKGROUND */}
        <Background />

        {/* 06 — CONTACT */}
        <Contact />
      </PageContainer>
    </CursorProvider>
  );
};

export default App;
