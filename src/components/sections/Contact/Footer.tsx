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

  const githubUrl = 'https://github.com/Chandrashekhar-jha';
  const linkedinUrl = 'https://www.linkedin.com/in/chandrashekhar-jha-b95240285/?isSelfProfile=true';
  const resumeUrl = 'https://drive.google.com/file/d/1LlBLd3cdeU9sK--YxkOwURyArVCtfBk8/view?usp=drive_link';

  return (
    <footer className="w-full pt-16 pb-8 border-t border-[var(--color-border-subtle)] mt-16 space-y-6 font-mono text-xs text-[var(--color-fg-muted)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left identity & role */}
        <div className="space-y-1">
          <div className="font-bold text-[var(--color-fg)] tracking-wider uppercase">
            CHANDRASHEKHAR JHA
          </div>
          <div className="text-[11px] text-[var(--color-accent)] tracking-wider uppercase">
            WEB DEVELOPER / FULL-STACK DEVELOPER
          </div>
        </div>

        {/* Center Quick Social Channels */}
        <div className="flex items-center gap-4 text-xs text-[var(--color-fg-muted)]">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('pointer', 'GITHUB')}
            onMouseLeave={resetCursor}
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('pointer', 'LINKEDIN')}
            onMouseLeave={resetCursor}
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursorVariant('pointer', 'RESUME')}
            onMouseLeave={resetCursor}
            className="hover:text-[var(--color-fg)] transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Right Back To Top Action */}
        <div className="self-start md:self-auto">
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

      {/* Copyright Line */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-[var(--color-fg-subtle)] tracking-widest uppercase">
        <span>© 2026 CHANDRASHEKHAR JHA</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
};
