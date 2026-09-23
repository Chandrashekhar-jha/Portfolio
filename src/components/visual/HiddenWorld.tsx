import React, { useState, useEffect } from 'react';
import { WorldScene } from './WorldScene';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export const HiddenWorld: React.FC = () => {
  const { isTouch } = useBreakpoint();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);

  // Track normalized mouse coordinates [-1, 1]
  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouch]);

  // Handle secret Easter Egg activation (4-second duration)
  const handleTriggerEasterEgg = () => {
    if (easterEggActive) return;
    setEasterEggActive(true);
    setTimeout(() => {
      setEasterEggActive(false);
    }, 4000);
  };

  // Catch WebGL context errors gracefully
  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setHasWebGLError(true);
    };
    window.addEventListener('webglcontextlost', handleContextLost);
    return () => window.removeEventListener('webglcontextlost', handleContextLost);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 md:opacity-45 transition-opacity duration-700">
      {!hasWebGLError ? (
        <div className="w-full h-full pointer-events-auto">
          <WorldScene
            mousePosition={mousePosition}
            onTriggerEasterEgg={handleTriggerEasterEgg}
            easterEggActive={easterEggActive}
          />
        </div>
      ) : (
        /* CSS Architectural Grid Fallback if WebGL is unavailable */
        <div className="w-full h-full system-grid-bg opacity-30 flex items-center justify-center">
          <div className="font-mono text-[10px] text-[var(--color-fg-subtle)] uppercase tracking-widest">
            // ARCHITECTURAL MATRIX // CSS FALLBACK
          </div>
        </div>
      )}
    </div>
  );
};
