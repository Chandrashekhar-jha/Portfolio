import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useCursor } from '@/hooks/useCursor';
import { Label } from '@/components/typography/Label';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { isScrolled } = useScrollProgress();
  const { setCursorVariant, resetCursor } = useCursor();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('overview');

  // Keyboard navigation toggle (Escape to close, M to toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleLinkClick = (id: string) => {
    setActiveItem(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Header Bar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 px-[var(--page-padding)] py-4 flex items-center justify-between pointer-events-none',
          isScrolled ? 'bg-[rgba(7,7,8,0.85)] backdrop-blur-md border-b border-[var(--color-border-subtle)] py-3' : 'bg-transparent'
        )}
      >
        {/* Monogram / System Status */}
        <div className="pointer-events-auto flex items-center gap-3">
          <a
            href="#overview"
            onMouseEnter={() => setCursorVariant('pointer', 'HOME')}
            onMouseLeave={resetCursor}
            className="font-mono text-sm font-bold tracking-widest text-[var(--color-fg)] uppercase hover:text-[var(--color-accent)] transition-colors"
          >
            {siteConfig.personal.shortName} <span className="text-[var(--color-fg-subtle)]">// SYS</span>
          </a>
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-[var(--color-border-subtle)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <Label size="micro" variant="subtle">{siteConfig.personal.location}</Label>
          </div>
        </div>

        {/* Inline Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 pointer-events-auto pr-24">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.id}
              href={item.path}
              onClick={() => handleLinkClick(item.id)}
              onMouseEnter={() => setCursorVariant('pointer')}
              onMouseLeave={resetCursor}
              className={cn(
                'group flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors py-1',
                activeItem === item.id
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]'
              )}
            >
              <span className="text-[var(--color-fg-subtle)] text-[10px]">{item.number}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[9px] px-1 bg-[var(--color-accent-subtle)] text-[var(--color-accent)] rounded-[var(--radius-sm)]">
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Mobile / Compact Menu Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setCursorVariant('pointer', isOpen ? 'CLOSE' : 'MENU')}
          onMouseLeave={resetCursor}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          className="pointer-events-auto lg:hidden flex items-center gap-2 font-mono text-xs uppercase text-[var(--color-fg)] bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-3 py-1.5 rounded-[var(--radius-sm)] hover:border-[var(--color-accent)] transition-colors"
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{isOpen ? 'Close' : 'Nav'}</span>
        </button>
      </header>

      {/* Expanded Menu Overlay (Mobile/Tablet & Overlay state) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[var(--color-bg)]/95 backdrop-blur-xl flex flex-col justify-center px-[var(--page-padding)] py-12"
          >
            <div className="max-w-2xl mx-auto w-full flex flex-col gap-6">
              <Label size="caption" variant="accent" className="mb-2">
                SYSTEM INDEX // NAVIGATION ARCHITECTURE
              </Label>
              {siteConfig.navigation.map((item, idx) => (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={() => handleLinkClick(item.id)}
                  className="group flex items-baseline justify-between border-b border-[var(--color-border-subtle)] pb-4 text-2xl font-display uppercase tracking-tight text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-sm text-[var(--color-fg-subtle)]">0{idx + 1}</span>
                    <span>{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="font-mono text-xs text-[var(--color-accent)]">{item.badge}</span>
                  )}
                </a>
              ))}

              <div className="pt-8 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[var(--color-fg-subtle)]">
                <span>COORD: {siteConfig.personal.coordinates}</span>
                <span>STATUS: {siteConfig.personal.status}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
