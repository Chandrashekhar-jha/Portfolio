import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  mode?: 'words' | 'characters' | 'line';
  delay?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  as: Component = 'span',
  mode = 'words',
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const Tag = Component as any;

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  if (mode === 'words') {
    const words = text.split(' ');
    return (
      <Tag className={cn('inline-block overflow-hidden', className)}>
        {words.map((word, index) => (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: delay + index * 0.04,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  // Character reveal
  const characters = text.split('');
  return (
    <Tag className={cn('inline-block overflow-hidden', className)}>
      {characters.map((char, index) => (
        <span key={index} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + index * 0.02,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};
