"use client";

import React from 'react';
import { motion } from 'framer-motion';

type ResultsChartProps = {
  data: { label: string; before: number; after: number }[];
  isIllustrative?: boolean;
  className?: string;
};

export const ResultsChart = ({ data, isIllustrative = false, className = '' }: ResultsChartProps) => {
  const maxVal = Math.max(...data.map(d => Math.max(d.before, d.after)));

  return (
    <div className={`w-full ${className}`}>
      {isIllustrative && (
        <div className="text-[10px] uppercase tracking-wider text-[var(--color-text-main)] mb-4 bg-[var(--color-bg-light)] inline-block px-2 py-1 rounded">
          Illustrative Data
        </div>
      )}
      <div className="flex gap-8 items-end h-[200px] border-b border-[var(--color-border-soft)] pb-2 relative">
        {/* Y-Axis lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none border-t border-[var(--color-border-soft)] border-dashed opacity-50" />
        <div className="absolute inset-0 top-1/2 border-t border-[var(--color-border-soft)] border-dashed opacity-50 pointer-events-none" />

        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group z-10">
            <div className="flex items-end gap-2 w-full justify-center h-[180px]">
              {/* Before Bar */}
              <div className="w-12 flex flex-col items-center justify-end h-full">
                <span className="text-xs font-mono text-[var(--color-text-main)] mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{item.before}</span>
                <motion.div 
                  className="w-full bg-[var(--color-border-soft)] rounded-t-sm"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(item.before / maxVal) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                />
              </div>
              {/* After Bar */}
              <div className="w-12 flex flex-col items-center justify-end h-full">
                <span className="text-xs font-mono text-[var(--color-primary-dark)] font-bold mb-1 opacity-0 group-hover:opacity-100 transition-opacity">{item.after}</span>
                <motion.div 
                  className="w-full bg-[var(--color-accent)] rounded-t-sm"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(item.after / maxVal) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 + 0.2 }}
                />
              </div>
            </div>
            <div className="text-sm font-medium text-[var(--color-text-main)] text-center mt-2 border-t border-transparent pt-2">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-main)]">
          <div className="w-3 h-3 bg-[var(--color-border-soft)] rounded-sm"></div> Before Qeltrava
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-primary-dark)]">
          <div className="w-3 h-3 bg-[var(--color-accent)] rounded-sm"></div> After Implementation
        </div>
      </div>
    </div>
  );
};
