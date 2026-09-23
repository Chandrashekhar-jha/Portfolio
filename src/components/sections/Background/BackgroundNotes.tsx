import React from 'react';
import { Label } from '@/components/typography/Label';

export const BackgroundNotes: React.FC = () => {
  return (
    <div className="w-full pt-12 mt-16 border-t border-[var(--color-border-subtle)]">
      <div className="flex items-center justify-between font-mono text-xs text-[var(--color-fg-subtle)] uppercase">
        <div className="flex items-center gap-3">
          <Label badge variant="accent" size="micro">06 COMPLETE</Label>
          <span className="text-[var(--color-accent)]">TRANSITION →</span>
          <span>07 / 08 TERMINAL // CONTACT</span>
        </div>
        <span className="text-[10px] hidden sm:inline-block">PROOF VERIFIED</span>
      </div>
    </div>
  );
};
