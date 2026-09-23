import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
  className?: string;
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  bordered?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  children,
  className,
  spacing = 'lg',
  bordered = false,
  ...props
}) => {
  const spacingStyles = {
    none: 'py-0',
    sm: 'py-[var(--space-md)]',
    md: 'py-[var(--space-xl)]',
    lg: 'py-[var(--space-2xl)]',
    xl: 'py-[var(--space-3xl)]',
  };

  return (
    <section
      id={id}
      className={cn(
        'relative w-full',
        spacingStyles[spacing],
        bordered && 'border-b border-[var(--color-border-subtle)]',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};
