"use client";

import React from 'react';

interface BuilderSectionProps {
  number?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function BuilderSection({ number, title, children, className = "" }: BuilderSectionProps) {
  return (
    <div className={`bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-3 ${className}`}>
      <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2">
        {number && (
          <span className="text-xs font-mono font-bold text-[#2E75B6]">{number}</span>
        )}
        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
          {title}
        </h5>
      </div>
      <div className="text-xs text-slate-300 leading-relaxed font-sans">
        {children}
      </div>
    </div>
  );
}
