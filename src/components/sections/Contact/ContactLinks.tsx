import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/siteConfig';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export const ContactLinks: React.FC = () => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING.expoOut, delay: 0.1 },
    },
  };

  const githubUrl = siteConfig.social.find(s => s.platform.toLowerCase().includes('github'))?.url || 'https://github.com/Chandrashekhar-jha';
  const linkedinUrl = siteConfig.social.find(s => s.platform.toLowerCase().includes('linkedin'))?.url || 'https://linkedin.com';
  const emailUrl = `mailto:${siteConfig.contact.email}`;

  const commands = [
    {
      num: '[01]',
      label: 'GITHUB',
      sublabel: 'SOURCE CODE & LAB',
      href: githubUrl,
      external: true,
      cursorText: 'GITHUB',
    },
    {
      num: '[02]',
      label: 'LINKEDIN',
      sublabel: 'PROFESSIONAL PROFILE',
      href: linkedinUrl,
      external: true,
      cursorText: 'LINKEDIN',
    },
    {
      num: '[03]',
      label: 'EMAIL',
      sublabel: siteConfig.contact.email,
      href: emailUrl,
      external: false,
      cursorText: 'SEND EMAIL',
    },
    {
      num: '[04]',
      label: 'RESUME',
      sublabel: 'TECHNICAL PROFILE OVERVIEW',
      href: emailUrl,
      external: false,
      cursorText: 'GET RESUME',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="w-full space-y-4 pt-4"
    >
      <div className="font-mono text-xs text-[var(--color-fg-muted)] tracking-wider uppercase">
        // COMMAND CHANNELS
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {commands.map((cmd) => (
          <a
            key={cmd.num}
            href={cmd.href}
            target={cmd.external ? '_blank' : undefined}
            rel={cmd.external ? 'noopener noreferrer' : undefined}
            onMouseEnter={() => setCursorVariant('pointer', cmd.cursorText)}
            onMouseLeave={resetCursor}
            className="group flex flex-col justify-between p-5 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-accent)] rounded-[var(--radius-sm)] transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
          >
            <div className="flex items-center justify-between font-mono text-xs text-[var(--color-fg-muted)] group-hover:text-[var(--color-accent)] transition-colors">
              <span>{cmd.num}</span>
              <span>{cmd.external ? '↗' : '↓'}</span>
            </div>

            <div className="py-4">
              <div className="font-mono text-sm font-bold tracking-wider text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
                {cmd.label}
              </div>
              <div className="font-mono text-[10px] text-[var(--color-fg-muted)] tracking-tight truncate mt-1">
                {cmd.sublabel}
              </div>
            </div>

            <div className="font-mono text-[10px] text-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <span>EXECUTE COMMAND</span>
              <span>→</span>
            </div>
          </a>
        ))}
      </div>
    </motion.div>
  );
};
