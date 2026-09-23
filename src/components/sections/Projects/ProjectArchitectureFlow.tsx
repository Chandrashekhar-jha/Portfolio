import React from 'react';

export interface ProjectArchitectureFlowProps {
  flowString: string;
  label?: string;
  demoNotice?: string;
}

export const ProjectArchitectureFlow: React.FC<ProjectArchitectureFlowProps> = ({
  flowString,
  label = 'ENGINEERING PIPELINE //',
  demoNotice,
}) => {
  const steps = flowString.split('→').map((s) => s.trim());

  return (
    <div className="w-full my-6 p-4 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] space-y-3">
      <div className="flex items-center justify-between font-mono text-[10px] tracking-wider text-[var(--color-accent)] uppercase">
        <span>{label}</span>
        {demoNotice && <span className="text-amber-400 font-bold">{demoNotice}</span>}
      </div>

      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[var(--color-fg)]">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <span className="px-2 py-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-[var(--radius-sm)] text-[var(--color-fg)]">
              {step}
            </span>
            {idx < steps.length - 1 && (
              <span className="text-[var(--color-fg-subtle)]">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
