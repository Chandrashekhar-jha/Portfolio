import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const ScrollProgress: React.FC = () => {
  const { progress } = useScrollProgress();
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  const percentage = Math.round(progress * 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Subtle Progress Bar */}
      <div
        className="h-[2px] bg-[var(--color-accent)] transition-all duration-100 ease-out opacity-80"
        style={{ width: `${progress * 100}%` }}
      />
      {/* Floating Monospace Readout */}
      <div className="absolute top-4 right-4 sm:right-[var(--page-padding)] font-mono text-[10px] tracking-widest text-[var(--color-fg-subtle)] uppercase bg-[var(--color-bg)]/80 px-2 py-0.5 rounded-[var(--radius-sm)] border border-[var(--color-border-subtle)] backdrop-blur-sm">
        SYS.SCR // {percentage < 10 ? `00${percentage}` : percentage < 100 ? `0${percentage}` : percentage}%
      </div>
    </div>
  );
};
