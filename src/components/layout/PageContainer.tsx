import React from 'react';
import { cn } from '@/lib/utils';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  showGridLines?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  as: Component = 'main',
  showGridLines = false,
  ...props
}) => {
  const Tag = Component as any;
  return (
    <Tag
      className={cn(
        'relative min-h-screen w-full max-w-[var(--max-width)] mx-auto px-[var(--page-padding)] transition-all duration-300',
        showGridLines && 'system-grid-bg',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};
