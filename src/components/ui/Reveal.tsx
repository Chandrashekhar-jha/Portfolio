import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { fadeIn, slideUp } from '@/lib/motion';

export interface RevealProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide' | 'custom';
  customVariants?: Variants;
  delay?: number;
  duration?: number;
  className?: string;
  width?: 'fit' | 'full';
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'slide',
  customVariants,
  delay = 0,
  className,
  width = 'full',
  once = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(width === 'full' ? 'w-full' : 'inline-block', className)}>{children}</div>;
  }

  const selectedVariants = customVariants || (variant === 'fade' ? fadeIn : slideUp);

  return (
    <motion.div
      className={cn(width === 'full' ? 'w-full' : 'inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={selectedVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};
