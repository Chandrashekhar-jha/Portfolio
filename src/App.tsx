import React from 'react';
import { CursorProvider } from '@/hooks/useCursor';
import { CursorInteraction } from '@/components/motion/CursorInteraction';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Navigation } from '@/components/navigation/Navigation';
import { PageContainer } from '@/components/layout/PageContainer';
import { HiddenWorld } from '@/components/visual/HiddenWorld';
import { Opening, Identity, Projects, Engineering, Lab, Background, Contact } from '@/components/sections';

export const App: React.FC = () => {
  return (
    <CursorProvider>
      {/* PHASE 9.5 — DEVELOPER WORLD // INTERACTIVE 3D SYSTEM LAYER */}
      <HiddenWorld />

      {/* Global Architectural Features */}
      <CursorInteraction />
      <ScrollProgress />
      <Navigation />

      {/* Main Portfolio Container */}
      <PageContainer showGridLines>
        {/* PHASE 2 — OPENING / LANDING EXPERIENCE */}
        <Opening />

        {/* PHASE 3 — IDENTITY / INTRODUCTION EXPERIENCE */}
        <Identity />

        {/* PHASE 4 — SELECTED WORK / PROJECT ARCHIVE */}
        <Projects />

        {/* PHASE 5 — ENGINEERING / STACK ARCHITECTURE */}
        <Engineering />

        {/* PHASE 6 — LAB / EXPERIMENTS */}
        <Lab />

        {/* PHASE 7 — BACKGROUND / PROOF */}
        <Background />

        {/* PHASE 8 — TERMINAL // CONTACT */}
        <Contact />
      </PageContainer>
    </CursorProvider>
  );
};

export default App;
