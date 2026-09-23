import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { RefreshCw, Zap } from 'lucide-react';

export const ExperimentInteraction: React.FC = () => {
  const [isBroken, setIsBroken] = useState(false);
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const handleToggle = () => {
    setIsBroken(!isBroken);
  };

  return (
    <div className="w-full my-12 p-6 sm:p-8 bg-[var(--color-bg-subtle)] border border-[var(--color-border)] rounded-[var(--radius-sm)] space-y-6">
      {/* Workbench Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] pb-4">
        <div className="flex items-center gap-3">
          <Label badge variant="accent" size="micro">TRY SOMETHING</Label>
          <span className="font-mono text-xs uppercase text-[var(--color-fg-subtle)]">
            INTERACTIVE WORKBENCH
          </span>
        </div>

        <div className="font-mono text-xs flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isBroken ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
          <span className={isBroken ? 'text-amber-400 font-bold' : 'text-[var(--color-fg-muted)]'}>
            {isBroken ? 'SYSTEM ALTERED // EXPERIMENTAL STATE' : 'SYSTEM NORMAL'}
          </span>
        </div>
      </div>

      {/* Interactive Visual Canvas Area */}
      <div className="relative min-h-[140px] p-6 bg-[var(--color-card)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] flex flex-col justify-between overflow-hidden">
        {/* Animated Lines reacting to state */}
        <motion.div
          animate={{
            rotate: isBroken && !shouldReduceMotion ? 4 : 0,
            scaleX: isBroken ? 0.95 : 1,
            x: isBroken && !shouldReduceMotion ? 12 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between font-mono text-xs text-[var(--color-fg)]">
            <span>NODE_ALPHA // {isBroken ? 'POSITION_SHIFT' : 'STABLE'}</span>
            <span className="text-[var(--color-accent)]">{isBroken ? 'ERR_0x44' : '0x00'}</span>
          </div>
          <div className={`h-[1px] w-full transition-colors duration-300 ${isBroken ? 'bg-amber-400' : 'bg-[var(--color-accent)]'}`} />
          <p className="font-mono text-xs text-[var(--color-fg-muted)]">
            {isBroken
              ? 'Experimental visual state activated. Lines shifted, telemetry displaced.'
              : 'Standard system baseline. Click the control below to alter state.'}
          </p>
        </motion.div>

        {/* Action Controls */}
        <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-[var(--color-border-subtle)] mt-4">
          <button
            onClick={handleToggle}
            onMouseEnter={() => setCursorVariant('pointer', isBroken ? 'RESET' : 'BREAK')}
            onMouseLeave={resetCursor}
            className={`group inline-flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-[var(--radius-sm)] border transition-all duration-200 cursor-pointer focus-visible:ring-1 focus-visible:ring-[var(--color-accent)] ${
              isBroken
                ? 'bg-amber-950/40 text-amber-300 border-amber-500/50 hover:bg-amber-900/50'
                : 'bg-[var(--color-bg-subtle)] text-[var(--color-fg)] border-[var(--color-border)] hover:border-[var(--color-accent)]'
            }`}
          >
            {isBroken ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
            <span>{isBroken ? 'RESET SYSTEM' : 'BREAK THE SYSTEM'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
