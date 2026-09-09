"use client";

import React from 'react';

export type StepItem = string | { id: string; name: string };

export interface BuilderProgressProps {
  steps: StepItem[];
  currentStep: number;
}

export function BuilderProgress({ steps, currentStep }: BuilderProgressProps) {
  const normalizedSteps = steps.map((s, idx) => typeof s === 'string' ? { id: `step-${idx}`, name: s } : s);

  return (
    <div className="w-full flex items-center justify-between gap-2 border-b border-[#E5E7EB] pb-4 mb-6">
      {normalizedSteps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isPassed = idx < currentStep;
        return (
          <div key={step.id} className="flex items-center gap-2 flex-1">
            <div className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center border transition-all ${
              isActive 
                ? 'bg-[#2E75B6] text-white border-[#2E75B6]' 
                : isPassed 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                  : 'bg-[#F7F9FC] text-[#6B7280] border-[#E5E7EB]'
            }`}>
              {idx + 1}
            </div>
            <span className={`text-xs font-mono hidden sm:inline ${isActive ? 'text-[#080B12] font-bold' : 'text-[#4B5563]'}`}>
              {step.name}
            </span>
            {idx < normalizedSteps.length - 1 && (
              <div className={`h-0.5 flex-1 rounded ${isPassed ? 'bg-emerald-400' : 'bg-[#E5E7EB]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
