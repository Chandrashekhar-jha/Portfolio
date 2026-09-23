import type { Variants } from 'framer-motion';

/**
 * MOTION SYSTEM CONSTANTS & EASING CURVES
 * Centralized motion design token mappings
 */

export const EASING = {
  expoOut: [0.16, 1, 0.3, 1] as const,
  cubicInOut: [0.65, 0, 0.35, 1] as const,
  smooth: [0.25, 0.1, 0.25, 1] as const,
  cinematic: [0.77, 0, 0.175, 1] as const,
};

export const DURATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.6,
  cinematic: 1.0,
};

/**
 * REUSABLE VARIANT SYSTEM
 */

// Fade reveal
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASING.expoOut },
  },
};

// Slide reveal with direction
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASING.expoOut },
  },
};

// Staggered Container for child elements
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Text Character Reveal
export const letterReveal: Variants = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASING.expoOut },
  },
};

// Technical Divider Line Expansion
export const lineExpand: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: DURATION.slow, ease: EASING.expoOut },
  },
};
