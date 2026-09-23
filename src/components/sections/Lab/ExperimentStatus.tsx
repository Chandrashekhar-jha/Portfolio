import React from 'react';

export type ExperimentStatusType =
  | 'EXPERIMENT'
  | 'PROTOTYPE'
  | 'TESTING'
  | 'UNFINISHED'
  | 'ARCHIVE'
  | 'CONCEPT';

export interface ExperimentStatusProps {
  status: ExperimentStatusType;
}

export const ExperimentStatus: React.FC<ExperimentStatusProps> = ({ status }) => {
  const styles: Record<ExperimentStatusType, string> = {
    EXPERIMENT: 'bg-[var(--color-accent-subtle)] text-[var(--color-accent)] border-[var(--color-accent)]',
    PROTOTYPE: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/40',
    TESTING: 'bg-indigo-950/40 text-indigo-400 border-indigo-500/40',
    UNFINISHED: 'bg-amber-950/40 text-amber-400 border-amber-500/40',
    ARCHIVE: 'bg-slate-900/60 text-slate-400 border-slate-700',
    CONCEPT: 'bg-purple-950/40 text-purple-400 border-purple-500/40',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider border rounded-[var(--radius-sm)] ${styles[status]}`}
    >
      <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  );
};
