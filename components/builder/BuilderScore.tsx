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
  const displayTitle = label || title;

  return (
    <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#90CAF9]/40 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-[#0D47A1] uppercase tracking-widest">
            DETERMINISTIC EVALUATION
          </span>
          <h4 className="text-base font-bold text-[#0D47A1] mt-0.5 font-anek">{displayTitle}</h4>
          {description && (
            <p className="text-xs text-[#475569] mt-1 max-w-xl font-sans">{description}</p>
          )}
        </div>
        
        <div className="px-5 py-2.5 rounded-xl border border-[#90CAF9] bg-[#FFFFFF] flex items-center gap-2 font-mono shrink-0 shadow-xs">
          <span className="text-3xl font-extrabold text-[#0D47A1]">{score}</span>
          <span className="text-xs text-[#475569] font-bold">/ 100</span>
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10px] font-mono font-bold text-[#0D47A1] uppercase tracking-wider">
            CAPABILITY BREAKDOWN
          </div>
          {breakdown.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#0F172A] font-semibold">{item.label}</span>
                <span className="text-[#0D47A1] font-bold">{item.score} / 100</span>
              </div>
              <div className="w-full bg-[#FFFFFF] h-2.5 rounded-full overflow-hidden border border-[#90CAF9]/40">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${item.color || 'bg-[#2196F3]'}`} 
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
