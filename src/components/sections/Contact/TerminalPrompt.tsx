import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DisplayText } from '@/components/typography/DisplayText';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const TerminalPrompt: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();
  const [isTerminalActive, setIsTerminalActive] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING.expoOut },
    },
  };

  const handleTerminalClick = () => {
    setIsTerminalActive((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleTerminalClick();
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="w-full space-y-10"
    >
      {/* Large Editorial Statement */}
      <div className="space-y-2">
        <DisplayText size="h1" className="font-bold tracking-tight uppercase leading-[1.05]">
          IF YOU WANT TO BUILD SOMETHING,
          <br />
          <span className="text-[var(--color-fg-subtle)]">LET'S TALK.</span>
        </DisplayText>
      </div>

      {/* Terminal Display Block */}
      <div className="p-6 md:p-8 bg-[#09090b] border border-[var(--color-border-subtle)] rounded-[var(--radius-md)] space-y-6 font-mono text-xs md:text-sm text-[var(--color-fg-subtle)] relative overflow-hidden">
        {/* Subtle accent bar on top of terminal */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-transparent to-transparent opacity-60" />

        {/* Command string */}
        <div className="flex items-center gap-2 text-[var(--color-accent)] font-semibold">
          <span className="text-[var(--color-fg-muted)]">$</span>
          <span>connect --with chandrashekhar</span>
        </div>

        {/* Status key-value block */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
            <span className="text-[var(--color-fg-muted)]">STATUS:</span>
            <span className="text-[var(--color-fg)] font-medium">AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
            <span className="text-[var(--color-fg-muted)]">LOCATION:</span>
            <span className="text-[var(--color-fg)] font-medium">INDIA</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
            <span className="text-[var(--color-fg-muted)]">FOCUS:</span>
            <span className="text-[var(--color-fg)] font-medium">WEB DEVELOPMENT / FULL-STACK</span>
          </div>
        </div>

        {/* Small Interactive Terminal Element */}
        <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleTerminalClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setCursorVariant('pointer', isTerminalActive ? 'DISCONNECT' : 'EXECUTE')}
            onMouseLeave={resetCursor}
            aria-label="Toggle terminal connection status prompt"
            className="flex items-center gap-3 text-left w-full group focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] py-1 px-2 -mx-2 rounded transition-colors duration-150 hover:bg-white/5"
          >
            <span className="text-[var(--color-accent)] font-bold">{'>'}</span>
            <span className="text-[var(--color-fg-muted)] group-hover:text-[var(--color-fg)] transition-colors">
              {isTerminalActive ? 'click to reset prompt' : 'click prompt to test interface'}
            </span>
            <span
              className={`inline-block w-2 h-4 bg-[var(--color-accent)] ${
                isTerminalActive ? 'opacity-100' : 'animate-pulse'
              }`}
            />
          </button>

          <AnimatePresence>
            {isTerminalActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1 pt-2 font-mono text-xs text-[var(--color-accent)] bg-white/5 p-3 rounded border border-[var(--color-accent)]/20"
              >
                <div>SYSTEM READY.</div>
                <div>CONNECTION OPEN.</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
