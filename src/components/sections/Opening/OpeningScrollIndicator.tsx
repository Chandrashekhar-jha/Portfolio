import React from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useCursor } from '@/hooks/useCursor';
import { ArrowDown } from 'lucide-react';

export const OpeningScrollIndicator: React.FC = () => {
  const { progress } = useScrollProgress();
  const { setCursorVariant, resetCursor } = useCursor();

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1 - progress * 2.5, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="w-full flex items-center justify-between pt-4 sm:pt-8 font-mono text-xs uppercase tracking-wider text-[var(--color-fg-subtle)]"
    >
      <div className="flex items-center gap-3">
        <span className="text-[var(--color-accent)]">01</span>
        <span className="text-[var(--color-fg-muted)]">SYSTEM INITIALIZED</span>
      </div>

      <button
        onClick={handleScrollClick}
        onMouseEnter={() => setCursorVariant('pointer', 'SCROLL')}
        onMouseLeave={resetCursor}
        className="group flex items-center gap-2 text-[var(--color-fg-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer py-2 focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
      >
        <span>CONTINUE</span>
        <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1" />
      </button>
    </motion.div>
  );
};
