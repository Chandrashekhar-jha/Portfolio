import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface CinematicIntroProps {
  onComplete: () => void;
}

// Target timings in seconds
const TIMINGS = {
  SILENCE: 0.2,        // 0.2s: C.JHA / 2026 tag
  THINK: 0.4,          // 0.4s: THINK
  CODE: 0.65,          // 0.65s: CODE
  BUILD: 0.9,          // 0.9s: BUILD
  DEBUG: 1.15,         // 1.15s: DEBUG
  IDENTITY: 1.45,      // 1.45s: CHANDRASHEKHAR JHA
  STATEMENT: 2.1,      // 2.10s: I BUILD FOR THE WEB.
  TRANSITION: 2.7,     // 2.70s: Intro layer lifts
  COMPLETE: 3.3,       // 3.30s: Portfolio active & scroll unlocked
};

const WORDS = [
  { id: 'think', text: 'THINK', top: '25%', left: '10%', exitDir: { x: '-20vw', y: '-10vh' } },
  { id: 'code', text: 'CODE', top: '38%', right: '12%', exitDir: { x: '20vw', y: '-10vh' } },
  { id: 'build', text: 'BUILD', top: '52%', left: '18%', exitDir: { x: '-15vw', y: '15vh' } },
  { id: 'debug', text: 'DEBUG', top: '65%', right: '15%', exitDir: { x: '25vw', y: '10vh' } },
];

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<
    'silence' | 'words' | 'identity' | 'statement' | 'transition' | 'complete'
  >('silence');

  // Track active words during Phase 2
  const [activeWords, setActiveWords] = useState<string[]>([]);
  const [isSkipped, setIsSkipped] = useState(false);

  // Lock scroll while intro is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleFinish = () => {
    document.body.style.overflow = '';
    onComplete();
  };

  const handleSkip = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    setPhase('transition');
    setTimeout(() => {
      setPhase('complete');
      handleFinish();
    }, 400);
  };

  // Reduced motion shortcut
  useEffect(() => {
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        handleFinish();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || isSkipped) return;

    // Sequence timer management using window.setTimeout type
    const timers: number[] = [];

    // 1. Silence -> Words sequence
    timers.push(
      window.setTimeout(() => {
        setPhase('words');
      }, TIMINGS.SILENCE * 1000)
    );

    // Stagger word appearances
    timers.push(
      window.setTimeout(() => setActiveWords((prev) => [...prev, 'think']), TIMINGS.THINK * 1000)
    );
    timers.push(
      window.setTimeout(() => setActiveWords((prev) => [...prev, 'code']), TIMINGS.CODE * 1000)
    );
    timers.push(
      window.setTimeout(() => setActiveWords((prev) => [...prev, 'build']), TIMINGS.BUILD * 1000)
    );
    timers.push(
      window.setTimeout(() => setActiveWords((prev) => [...prev, 'debug']), TIMINGS.DEBUG * 1000)
    );

    // 2. Words -> Identity reveal
    timers.push(
      window.setTimeout(() => {
        setPhase('identity');
      }, TIMINGS.IDENTITY * 1000)
    );

    // 3. Identity -> Statement
    timers.push(
      window.setTimeout(() => {
        setPhase('statement');
      }, TIMINGS.STATEMENT * 1000)
    );

    // 4. Statement -> Transition
    timers.push(
      window.setTimeout(() => {
        setPhase('transition');
      }, TIMINGS.TRANSITION * 1000)
    );

    // 5. Complete
    timers.push(
      window.setTimeout(() => {
        setPhase('complete');
        handleFinish();
      }, TIMINGS.COMPLETE * 1000)
    );

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [prefersReducedMotion, isSkipped]);

  // Handle keyboard ESC or Enter for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (phase === 'complete') return null;

  // Reduced motion layout fallback
  if (prefersReducedMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] bg-[#070708] flex flex-col justify-center items-center p-6 text-center text-[#F3F3F4]"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="font-mono text-xs text-[#38BDF8] tracking-widest mb-4">C.JHA / 2026</div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight mb-2">
          CHANDRASHEKHAR JHA
        </h1>
        <p className="font-sans text-xs sm:text-sm text-[#94A3B8] tracking-wider uppercase mb-6">
          WEB DEVELOPER / FULL-STACK DEVELOPER
        </p>
        <button
          onClick={handleSkip}
          className="font-mono text-xs text-[#F3F3F4] border border-[#27272A] px-4 py-2 hover:border-[#38BDF8] transition-colors cursor-pointer"
        >
          ENTER PORTFOLIO →
        </button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro-layer"
        className="fixed inset-0 z-[9999] bg-[#070708] overflow-hidden select-none pointer-events-auto flex flex-col justify-between p-6 sm:p-12"
        initial={{ opacity: 1, y: '0%' }}
        animate={phase === 'transition' ? { y: '-100%', opacity: 0.95 } : { opacity: 1, y: '0%' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Top Bar: Technical Timestamp & Brand Mark */}
        <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#71717A] uppercase">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center space-x-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
            <span>C.JHA // 2026</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="hidden sm:block text-[10px] text-[#52525B]"
          >
            INITIALIZING PORTFOLIO
          </motion.div>
        </div>

        {/* Main Kinetic Typography Stage */}
        <div className="relative w-full h-full my-auto flex items-center justify-center">
          {/* PHASE 2: MOVING KINETIC WORDS */}
          {phase === 'words' && (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {WORDS.map((w) => {
                const isActive = activeWords.includes(w.id);
                if (!isActive) return null;

                return (
                  <motion.div
                    key={w.id}
                    className="absolute font-display font-extrabold tracking-tighter text-[#F3F3F4] text-[clamp(2.5rem,8vw,7.5rem)] leading-none"
                    style={{
                      top: w.top,
                      left: w.left,
                      right: w.right,
                    }}
                    initial={{ opacity: 0, scale: 0.85, y: 30 }}
                    animate={{ opacity: 0.9, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      x: w.exitDir.x,
                      y: w.exitDir.y,
                      scale: 1.1,
                      transition: { duration: 0.35, ease: 'easeIn' },
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {w.text}
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* PHASE 3: IDENTITY REVEAL */}
          {phase === 'identity' && (
            <motion.div
              key="identity-stage"
              className="flex flex-col items-center justify-center text-center max-w-4xl px-4 z-10"
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="inline-block px-3 py-1 mb-3 text-[10px] sm:text-xs font-mono tracking-widest text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 uppercase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                FULL-STACK SYSTEMS & ARCHITECTURE
              </motion.div>

              <h1 className="font-display text-[clamp(2rem,6vw,5.5rem)] font-extrabold tracking-tight text-[#F3F3F4] leading-[0.95] uppercase break-words">
                CHANDRASHEKHAR JHA
              </h1>

              <motion.p
                className="mt-4 font-sans text-xs sm:text-base font-medium tracking-wider text-[#94A3B8] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                WEB DEVELOPER <span className="text-[#38BDF8] mx-2">/</span> FULL-STACK DEVELOPER
              </motion.p>
            </motion.div>
          )}

          {/* PHASE 4: FINAL STATEMENT */}
          {phase === 'statement' && (
            <motion.div
              key="statement-stage"
              className="flex flex-col items-center justify-center text-center px-4 z-10"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.35 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase mb-4">
                CORE PURPOSE
              </div>
              <h2 className="font-display text-[clamp(2.2rem,6.5vw,6rem)] font-extrabold tracking-tight text-[#F3F3F4] leading-none uppercase">
                I BUILD FOR THE WEB.
              </h2>
            </motion.div>
          )}
        </div>

        {/* Bottom Bar: Skip Controller */}
        <div className="flex justify-between items-end">
          <div className="text-[10px] font-mono text-[#52525B] hidden sm:block">
            PUNE, INDIA // JSPM UNIVERSITY
          </div>

          {/* Skip Button (Appears after silence phase) */}
          <motion.button
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="ml-auto flex items-center space-x-2 font-mono text-xs text-[#A1A1AA] hover:text-[#38BDF8] focus:text-[#38BDF8] focus:outline-none transition-colors group cursor-pointer border border-[#27272A] hover:border-[#38BDF8]/40 px-3 py-1.5 bg-[#09090B]/60"
            aria-label="Skip intro animation"
          >
            <span className="tracking-widest text-[11px]">SKIP INTRO</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicIntro;
