"use client";

import React from 'react';
import { Cpu, AlertCircle, Sparkles } from 'lucide-react';

export function BuilderLoading({ message = "Analyzing product parameters & running deterministic engine..." }: { message?: string }) {
  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-8 text-center space-y-4">
      <div className="relative inline-flex items-center justify-center">
        <Cpu className="w-8 h-8 text-[#2E75B6] animate-pulse" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
      </div>
      <div className="space-y-1">
        <h5 className="text-sm font-bold font-mono text-white">ENGINEERING PROCESSING</h5>
        <p className="text-xs text-slate-400 font-mono">{message}</p>
      </div>
      <div className="w-48 bg-slate-900 h-1.5 rounded-full mx-auto overflow-hidden">
        <div className="bg-[#2E75B6] h-full animate-pulse w-3/4" />
      </div>
    </div>
  );
}

export function BuilderError({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <div className="w-full bg-red-950/30 border border-red-900/40 rounded-xl p-6 text-center space-y-3">
      <AlertCircle className="w-6 h-6 text-red-400 mx-auto" />
      <div className="space-y-1">
        <h5 className="text-xs font-mono font-bold uppercase text-red-300">ANALYSIS EXCEPTION</h5>
        <p className="text-xs text-slate-400 font-mono">{error}</p>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="px-4 py-1.5 rounded bg-red-900/40 hover:bg-red-900/60 text-red-200 text-xs font-mono font-bold border border-red-800 transition-all cursor-pointer"
        >
          Retry Engine
        </button>
      )}
    </div>
  );
}

export function BuilderEmptyState({ title = "Ready for Input", description = "Enter your product concept or workflow parameters above to generate a preliminary engineering blueprint." }: { title?: string; description?: string }) {
  return (
    <div className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl p-8 text-center space-y-2 select-none">
      <Sparkles className="w-6 h-6 text-slate-600 mx-auto" />
      <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">{title}</h5>
      <p className="text-xs text-slate-500 max-w-md mx-auto font-sans">{description}</p>
    </div>
  );
}
