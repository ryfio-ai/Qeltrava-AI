"use client";

import React from 'react';
import { motion } from 'framer-motion';

type ArchitectureDiagramProps = {
  className?: string;
  variant?: 'operating-model' | 'service-pipeline';
};

export const ArchitectureDiagram = ({ className = '', variant = 'operating-model' }: ArchitectureDiagramProps) => {
  if (variant === 'operating-model') {
    return (
      <div className={`w-full overflow-x-auto py-8 ${className}`}>
        <div className="min-w-[800px] h-[300px] relative font-mono text-sm">
          <svg width="100%" height="100%" viewBox="0 0 800 300" className="absolute inset-0">
            {/* Connection Lines */}
            <motion.path 
              d="M 180 150 L 260 150 M 380 150 L 460 150 M 580 150 L 660 150" 
              stroke="var(--color-border-soft)" 
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Arrows */}
            <polygon points="255,145 265,150 255,155" fill="var(--color-border-soft)" />
            <polygon points="455,145 465,150 455,155" fill="var(--color-border-soft)" />
            <polygon points="655,145 665,150 655,155" fill="var(--color-border-soft)" />
          </svg>

          {/* Nodes */}
          <div className="absolute top-1/2 left-[100px] -translate-x-1/2 -translate-y-1/2 w-40 p-4 bg-white border border-[var(--color-border-soft)] rounded-lg shadow-sm text-center z-10">
            <div className="text-[var(--color-accent)] font-bold mb-1">01</div>
            <div className="font-semibold text-[var(--color-primary-dark)]">Diagnose</div>
            <div className="text-[10px] text-[var(--color-text-main)] mt-2">Audit & Architecture</div>
          </div>

          <div className="absolute top-1/2 left-[320px] -translate-x-1/2 -translate-y-1/2 w-40 p-4 bg-white border border-[var(--color-border-soft)] rounded-lg shadow-sm text-center z-10">
            <div className="text-[var(--color-accent)] font-bold mb-1">02</div>
            <div className="font-semibold text-[var(--color-primary-dark)]">Build</div>
            <div className="text-[10px] text-[var(--color-text-main)] mt-2">Agile Engineering Pods</div>
          </div>

          <div className="absolute top-1/2 left-[540px] -translate-x-1/2 -translate-y-1/2 w-40 p-4 bg-white border border-[var(--color-border-soft)] rounded-lg shadow-sm text-center z-10">
            <div className="text-[var(--color-accent)] font-bold mb-1">03</div>
            <div className="font-semibold text-[var(--color-primary-dark)]">Deploy</div>
            <div className="text-[10px] text-[var(--color-text-main)] mt-2">Cloud & Security Setup</div>
          </div>

          <div className="absolute top-1/2 left-[760px] -translate-x-1/2 -translate-y-1/2 w-40 p-4 bg-[var(--color-bg-light)] border border-[var(--color-accent)] rounded-lg shadow-sm text-center z-10">
            <div className="text-[var(--color-accent)] font-bold mb-1">04</div>
            <div className="font-semibold text-[var(--color-primary-dark)]">Optimize</div>
            <div className="text-[10px] text-[var(--color-text-main)] mt-2">Long-term Retainer</div>
          </div>
        </div>
      </div>
    );
  }

  // Generic Pipeline Variant
  return (
    <div className={`w-full overflow-x-auto py-8 ${className}`}>
      <div className="min-w-[600px] h-[250px] relative font-mono text-sm">
        <svg width="100%" height="100%" viewBox="0 0 600 250" className="absolute inset-0">
          <motion.path 
            d="M 150 125 L 250 125 M 350 125 L 450 125" 
            stroke="var(--color-accent)" 
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <polygon points="245,120 255,125 245,130" fill="var(--color-accent)" />
          <polygon points="445,120 455,125 445,130" fill="var(--color-accent)" />
        </svg>

        <div className="absolute top-1/2 left-[100px] -translate-x-1/2 -translate-y-1/2 p-4 bg-white border border-[var(--color-border-soft)] rounded text-center z-10">
          <div className="font-semibold text-[var(--color-text-main)]">Raw Data Input</div>
        </div>

        <div className="absolute top-1/2 left-[300px] -translate-x-1/2 -translate-y-1/2 p-6 bg-[var(--color-primary-dark)] text-white rounded shadow-lg text-center z-10">
          <div className="font-bold">AI Processing Engine</div>
          <div className="text-[10px] text-white/70 mt-1">LLM / Vector DB</div>
        </div>

        <div className="absolute top-1/2 left-[500px] -translate-x-1/2 -translate-y-1/2 p-4 bg-[var(--color-bg-light)] border border-[var(--color-accent)] rounded text-center z-10">
          <div className="font-semibold text-[var(--color-primary-dark)]">Structured Output</div>
        </div>
      </div>
    </div>
  );
};
