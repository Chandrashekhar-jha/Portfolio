import React from 'react';
import { cn } from '@/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 6 | 8 | 12;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Grid: React.FC<GridProps> = ({
  children,
  cols = 12,
  gap = 'md',
  className,
  ...props
}) => {
  const gapStyles = {
    sm: 'gap-[var(--space-sm)]',
    md: 'gap-[var(--space-md)]',
    lg: 'gap-[var(--space-lg)]',
    xl: 'gap-[var(--space-xl)]',
  };

  const colsStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    8: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8',
    12: 'grid-cols-4 sm:grid-cols-8 lg:grid-cols-12',
  };

  return (
    <div
      className={cn(
        'grid w-full',
        colsStyles[cols],
        gapStyles[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
