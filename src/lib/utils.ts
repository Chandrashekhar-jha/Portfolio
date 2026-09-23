import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind CSS classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as a padded index string (e.g., 1 -> "01")
 */
export function formatIndex(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

/**
 * Technical timestamp formatting helper (ISO / UTC format for technical UI)
 */
export function getSystemTimestamp(): string {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}
