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
    if (val >= 75) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (val >= 50) return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
    return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
  };

  const displayTitle = label || title;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            DETERMINISTIC EVALUATION
          </span>
          <h4 className="text-base font-bold text-white mt-0.5">{displayTitle}</h4>
          {description && (
            <p className="text-xs text-slate-400 mt-1 max-w-xl">{description}</p>
          )}
        </div>
        
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${getScoreColor(score)} font-mono shrink-0`}>
          <span className="text-3xl font-extrabold">{score}</span>
          <span className="text-xs text-slate-400 font-bold">/ 100</span>
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="space-y-3">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
            CAPABILITY BREAKDOWN
          </div>
          {breakdown.map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300 font-semibold">{item.label}</span>
                <span className="text-white font-bold">{item.score} / 100</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/60">
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
