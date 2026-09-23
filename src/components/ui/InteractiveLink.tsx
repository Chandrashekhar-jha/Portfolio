import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCursor } from '@/hooks/useCursor';

export interface InteractiveLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  href: string;
  external?: boolean;
  showArrow?: boolean;
  cursorText?: string;
  variant?: 'default' | 'subtle' | 'editorial' | 'mono';
  className?: string;
}

export const InteractiveLink: React.FC<InteractiveLinkProps> = ({
  children,
  href,
  external = false,
  showArrow = false,
  cursorText = '',
  variant = 'default',
  className,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const { setCursorVariant, resetCursor } = useCursor();

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setCursorVariant('pointer', cursorText);
    if (onMouseEnter) onMouseEnter(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    resetCursor();
    if (onMouseLeave) onMouseLeave(e);
  };

  const variantStyles = {
    default: 'text-[var(--color-fg)] hover:text-[var(--color-accent)] underline-offset-4 hover:underline',
    subtle: 'text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]',
    editorial: 'text-[var(--color-fg)] font-display tracking-tight hover:opacity-75 transition-opacity',
    mono: 'font-mono text-xs uppercase tracking-wider text-[var(--color-fg-muted)] hover:text-[var(--color-accent)]',
  };

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group inline-flex items-center gap-1 transition-colors duration-200 cursor-pointer focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <span className="relative">
        {children}
      </span>
      {showArrow && (
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </a>
  );
};
