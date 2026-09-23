import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface LineProps {
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  animated?: boolean;
  accent?: boolean;
}

export const Line: React.FC<LineProps> = ({
  className,
  orientation = 'horizontal',
  animated = true,
  accent = false,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'w-[1px] h-full bg-[var(--color-border)]',
          accent && 'bg-[var(--color-accent)]',
          className
        )}
      />
    );
  }

  if (animated && !shouldReduceMotion) {
    return (
      <motion.div
        className={cn(
          'h-[1px] w-full bg-[var(--color-border)] origin-left',
          accent && 'bg-[var(--color-accent)]',
          className
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
    );
  }

  return (
    <div
      className={cn(
        'h-[1px] w-full bg-[var(--color-border)]',
        accent && 'bg-[var(--color-accent)]',
        className
      )}
    />
  );
};
