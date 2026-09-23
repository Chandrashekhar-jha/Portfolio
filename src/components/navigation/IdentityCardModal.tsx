import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/siteConfig';
import { useCursor } from '@/hooks/useCursor';

interface IdentityCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IdentityCardModal: React.FC<IdentityCardModalProps> = ({ isOpen, onClose }) => {
  const { setCursorVariant, resetCursor } = useCursor();

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const githubUrl = siteConfig.social.find(s => s.platform.toLowerCase().includes('github'))?.url || 'https://github.com/Chandrashekhar-jha';
  const linkedinUrl = 'https://www.linkedin.com/in/chandrashekhar-jha-b95240285/?isSelfProfile=true';
  const resumeUrl = 'https://drive.google.com/file/d/1LlBLd3cdeU9sK--YxkOwURyArVCtfBk8/view?usp=drive_link';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          aria-hidden="true"
        />

        {/* Compact Identity / Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-sm bg-[#0C0C0F] border border-[var(--color-border)] rounded-[var(--radius-md)] p-6 shadow-2xl space-y-6 font-mono z-10 overflow-hidden select-none"
        >
          {/* Subtle Accent Glow Bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-accent)] via-white/20 to-transparent" />

          {/* Card Header: Control Badge & Close Button */}
          <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span className="text-xs font-bold tracking-widest text-[var(--color-fg)]">
                C.JHA // IDENTITY CARD
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              onMouseEnter={() => setCursorVariant('pointer', 'CLOSE')}
              onMouseLeave={resetCursor}
              aria-label="Close identity card"
              className="p-1 rounded text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Name & Primary Role */}
          <div className="space-y-1.5">
            <h2 className="font-display text-xl font-bold text-[var(--color-fg)] uppercase tracking-tight">
              {siteConfig.personal.name}
            </h2>
            <div className="text-xs text-[var(--color-accent)] font-semibold tracking-wider uppercase">
              WEB DEVELOPER / FULL-STACK DEVELOPER
            </div>
          </div>

          {/* Location & Academic Background */}
          <div className="space-y-2 py-3 border-y border-[var(--color-border-subtle)] text-xs text-[var(--color-fg-muted)]">
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-fg-subtle)]">LOCATION</span>
              <span className="text-[var(--color-fg)]">Pune, India</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-fg-subtle)]">DEGREE</span>
              <span className="text-[var(--color-fg)]">B.Tech AI & Machine Learning</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-fg-subtle)]">UNIVERSITY</span>
              <span className="text-[var(--color-fg)]">JSPM University (2023–2027)</span>
            </div>
          </div>

          {/* Direct Verification Links */}
          <div className="pt-1">
            <div className="text-[10px] text-[var(--color-fg-subtle)] uppercase tracking-widest mb-2">
              VERIFIED CHANNELS
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('pointer', 'GITHUB')}
                onMouseLeave={resetCursor}
                className="flex items-center justify-center gap-1 py-2 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('pointer', 'LINKEDIN')}
                onMouseLeave={resetCursor}
                className="flex items-center justify-center gap-1 py-2 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant('pointer', 'RESUME')}
                onMouseLeave={resetCursor}
                className="flex items-center justify-center gap-1 py-2 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              >
                <span>Resume</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
