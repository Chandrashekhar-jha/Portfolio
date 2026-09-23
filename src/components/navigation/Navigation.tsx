import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useCursor } from '@/hooks/useCursor';
import { Label } from '@/components/typography/Label';
import { IdentityCardModal } from './IdentityCardModal';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { isScrolled } = useScrollProgress();
  const { setCursorVariant, resetCursor } = useCursor();
  const [isOpen, setIsOpen] = useState(false);
  const [isIdentityCardOpen, setIsIdentityCardOpen] = useState(false);
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
      <IdentityCardModal
        isOpen={isIdentityCardOpen}
        onClose={() => setIsIdentityCardOpen(false)}
      />

      {/* Fixed Header Bar */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 px-[var(--page-padding)] py-4 flex items-center justify-between pointer-events-none',
          isScrolled ? 'bg-[rgba(7,7,8,0.85)] backdrop-blur-md border-b border-[var(--color-border-subtle)] py-3' : 'bg-transparent'
        )}
      >
        {/* Monogram / Brandmark Identity Card Control */}
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsIdentityCardOpen(true)}
            onMouseEnter={() => setCursorVariant('pointer', 'PROFILE')}
            onMouseLeave={resetCursor}
            title="Click to view Chandrashekhar Jha Identity Card"
            className="group flex items-center gap-2.5 transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] rounded p-1 -m-1"
          >
            {/* Custom Architectural Brand Mark */}
            <div className="relative w-8 h-8 rounded-[var(--radius-sm)] bg-[#0F0F12] border border-[var(--color-border)] group-hover:border-[var(--color-accent)] flex items-center justify-center transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="bevel" className="text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
                <path d="M4 6h8M8 6v12M8 18h-4" />
                <path d="M14 6v8a4 4 0 0 1-4 4" />
              </svg>
              <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[var(--color-accent)] animate-pulse" />
            </div>

            <div className="flex flex-col text-left min-w-0">
              <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider text-[var(--color-fg)] uppercase group-hover:text-[var(--color-accent)] transition-colors leading-none truncate max-w-[130px] xs:max-w-[170px] sm:max-w-none">
                C.JHA
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] text-[var(--color-fg-subtle)] tracking-wider uppercase mt-1 truncate">
                IDENTITY CARD
              </span>
            </div>
          </button>

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
