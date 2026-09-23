import { useState, useEffect } from 'react';

export interface ScrollState {
  scrollY: number;
  progress: number; // 0 to 1
  direction: 'up' | 'down' | 'idle';
  isScrolled: boolean;
}

/**
 * Custom hook tracking scroll distance, progress ratio, and scroll direction
 */
export function useScrollProgress(): ScrollState {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    progress: 0,
    direction: 'idle',
    isScrolled: false,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(currentScrollY / maxScroll, 0), 1) : 0;
      
      const direction = currentScrollY > lastScrollY ? 'down' : currentScrollY < lastScrollY ? 'up' : 'idle';
      
      setScrollState({
        scrollY: currentScrollY,
        progress,
        direction,
        isScrolled: currentScrollY > 40,
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollState;
}
