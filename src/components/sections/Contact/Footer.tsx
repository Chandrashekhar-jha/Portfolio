import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';


export const Footer: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="w-full pt-16 pb-8 border-t border-[var(--color-border-subtle)] mt-16 space-y-8 font-mono text-xs text-[var(--color-fg-muted)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        {/* Left identity & role */}
        <div className="space-y-1">
          <div className="font-bold text-[var(--color-fg)] tracking-wider uppercase">
            CHANDRASHEKHAR JHA
          </div>
          <div className="text-[11px] text-[var(--color-fg-muted)] tracking-wider uppercase">
            WEB DEVELOPER / FULL-STACK
          </div>
        </div>

        {/* Center built info */}
        <div className="space-y-1 text-left md:text-center">
          <div className="text-[11px] tracking-wider uppercase">
            BUILT WITH REACT & TYPESCRIPT
          </div>
          <div className="text-[10px] text-[var(--color-fg-muted)]">
            © 2026 CHANDRASHEKHAR JHA
          </div>
        </div>

        {/* Right Back To Top Action */}
        <div className="self-start md:self-end">
          <button
            type="button"
            onClick={handleBackToTop}
            onMouseEnter={() => setCursorVariant('pointer', 'TOP')}
            onMouseLeave={resetCursor}
            className="group flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] hover:text-[var(--color-fg)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] py-1 px-2 rounded -mx-2"
          >
            <span className="font-bold">BACK TO TOP</span>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="inline-block"
            >
              ↑
            </motion.span>
          </button>
        </div>
      </div>

      {/* System state concluding line */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-[var(--color-fg-muted)] tracking-widest uppercase">
        <span>SYSTEM TERMINAL STATUS: READY</span>
        <span>THE NEXT MOVE IS YOURS.</span>
      </div>
    </footer>
  );
};
