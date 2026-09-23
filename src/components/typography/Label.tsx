import React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'default' | 'muted' | 'subtle' | 'accent';
  mono?: boolean;
  size?: 'micro' | 'caption' | 'body';
  badge?: boolean;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  variant = 'muted',
  mono = true,
  size = 'caption',
  badge = false,
  className,
  ...props
}) => {
  const variantClasses = {
    default: 'text-[var(--color-fg)]',
    muted: 'text-[var(--color-fg-muted)]',
    subtle: 'text-[var(--color-fg-subtle)]',
    accent: 'text-[var(--color-accent)]',
  };

  const sizeClasses = {
    micro: 'text-[length:var(--text-micro)] tracking-wider',
    caption: 'text-[length:var(--text-caption)] tracking-wide',
    body: 'text-[length:var(--text-body)] tracking-normal',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 uppercase transition-colors',
        mono && 'font-mono',
        badge && 'px-2 py-0.5 border border-[var(--color-border)] bg-[var(--color-bg-subtle)] rounded-[var(--radius-sm)]',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
