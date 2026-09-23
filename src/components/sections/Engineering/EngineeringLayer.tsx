import React from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/typography/Label';
import { useCursor } from '@/hooks/useCursor';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EASING } from '@/lib/motion';

export interface TechNode {
  name: string;
  projects?: string[];
}

export interface LayerData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  concepts: string[];
  nodes: TechNode[];
  flowDiagram?: string;
  keyProjectStory?: string;
}

export interface EngineeringLayerProps {
  layer: LayerData;
  activeTech: string | null;
  onHoverTech: (techName: string | null) => void;
}

export const EngineeringLayer: React.FC<EngineeringLayerProps> = ({
  layer,
  activeTech,
  onHoverTech,
}) => {
  const { setCursorVariant, resetCursor } = useCursor();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASING.expoOut },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="p-6 bg-[var(--color-bg-subtle)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border)] rounded-[var(--radius-sm)] space-y-4 transition-all duration-200"
    >
      {/* Layer Metadata Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-border-subtle)] pb-3">
        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[var(--color-accent)] font-bold">{layer.number}</span>
          <span className="text-[var(--color-fg)] font-bold uppercase tracking-wider">{layer.title}</span>
        </div>
        <Label size="micro" variant="subtle">{layer.subtitle}</Label>
      </div>

      {/* Technology Nodes & Project Tags */}
      <div className="flex flex-wrap items-center gap-3">
        {layer.nodes.map((node) => {
          const isHighlighted = activeTech === node.name;
          const isDimmed = activeTech !== null && activeTech !== node.name;

          return (
            <div
              key={node.name}
              onMouseEnter={() => {
                onHoverTech(node.name);
                setCursorVariant('pointer', node.name.toUpperCase());
              }}
              onMouseLeave={() => {
                onHoverTech(null);
                resetCursor();
              }}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-sm)] border font-mono text-xs transition-all duration-200 cursor-pointer ${
                isHighlighted
                  ? 'bg-[var(--color-accent-subtle)] border-[var(--color-accent)] text-[var(--color-accent)] shadow-sm'
                  : isDimmed
                  ? 'opacity-30 border-[var(--color-border-subtle)] text-[var(--color-fg-subtle)]'
                  : 'bg-[var(--color-card)] border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-accent)]'
              }`}
            >
              <span className="font-semibold">{node.name}</span>
              {node.projects && node.projects.length > 0 && (
                <div className="flex items-center gap-1 pl-1 border-l border-[var(--color-border-subtle)]">
                  {node.projects.map((p) => (
                    <span key={p} className="text-[9px] text-[var(--color-fg-subtle)] group-hover:text-[var(--color-accent)]">
                      →{p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Layer Flow Diagram if applicable */}
      {layer.flowDiagram && (
        <div className="p-3 bg-[var(--color-card)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] font-mono text-xs text-[var(--color-fg-muted)]">
          <span className="text-[var(--color-accent)] font-bold mr-2">FLOW //</span>
          {layer.flowDiagram}
        </div>
      )}

      {/* Supporting Concepts */}
      <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-[var(--color-fg-subtle)]">
        <span className="text-[var(--color-fg-muted)] uppercase">CONCEPTS:</span>
        {layer.concepts.map((concept) => (
          <span key={concept} className="before:content-['•'] before:mr-1.5 before:text-[var(--color-accent)]">
            {concept}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
