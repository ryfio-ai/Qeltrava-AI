"use client";

import React from 'react';

export interface ScoreItem {
  label: string;
  score: number; // 0 - 100
  color?: string;
}

export interface BuilderScoreProps {
  score: number; // Overall 0 - 100
  title?: string;
  label?: string;
  description?: string;
  breakdown?: ScoreItem[];
}

export function BuilderScore({ score, title = "AI Opportunity Score", label, description, breakdown = [] }: BuilderScoreProps) {
  const getScoreColor = (val: number) => {
    if (val >= 75) return 'text-emerald-700 border-emerald-300 bg-emerald-50';
    if (val >= 50) return 'text-blue-700 border-blue-300 bg-blue-50';
    return 'text-amber-700 border-amber-300 bg-amber-50';
  };

  const displayTitle = label || title;

  return (
    <div className="bg-[#F7F9FC] border border-[#E5E7EB] rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E7EB] pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#6B7280] uppercase tracking-widest">
            DETERMINISTIC EVALUATION
          </span>
          <h4 className="text-base font-bold text-[#080B12] mt-0.5">{displayTitle}</h4>
          {description && (
            <p className="text-xs text-[#4B5563] mt-1 max-w-xl">{description}</p>
          )}
        </div>
        
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${getScoreColor(score)} font-mono shrink-0`}>
          <span className="text-3xl font-extrabold">{score}</span>
          <span className="text-xs text-[#6B7280] font-bold">/ 100</span>
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10px] font-mono font-bold text-[#6B7280] uppercase tracking-wider">
            CAPABILITY BREAKDOWN
          </div>
          {breakdown.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#080B12] font-semibold">{item.label}</span>
                <span className="text-[#080B12] font-bold">{item.score} / 100</span>
              </div>
              <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${item.color || 'bg-[#2E75B6]'}`} 
                  style={{ width: `${Math.min(100, Math.max(0, item.score))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
