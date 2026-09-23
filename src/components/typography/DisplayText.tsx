import React from 'react';
import { cn } from '@/lib/utils';

export interface DisplayTextProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  size?: 'display' | 'h1' | 'h2' | 'h3';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'span';
  mono?: boolean;
  editorial?: boolean;
  clipped?: boolean;
  className?: string;
}

export const DisplayText: React.FC<DisplayTextProps> = ({
  children,
  size = 'h1',
  as: Component = 'h1',
  mono = false,
  editorial = false,
  clipped = false,
  className,
  ...props
}) => {
  const sizeClasses = {
    display: 'text-[length:var(--text-display)] leading-[0.95] tracking-[-0.03em]',
    h1: 'text-[length:var(--text-h1)] leading-[1.05] tracking-[-0.02em]',
    h2: 'text-[length:var(--text-h2)] leading-[1.1] tracking-[-0.015em]',
    h3: 'text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.01em]',
  };

  return (
    <Component
      className={cn(
        'font-bold font-display text-[var(--color-fg)] uppercase',
        mono && 'font-mono uppercase tracking-widest',
        editorial && 'font-normal tracking-tight lowercase italic',
        clipped && 'overflow-hidden whitespace-nowrap text-ellipsis',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
