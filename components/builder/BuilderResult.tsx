"use client";

import React from 'react';

interface BuilderResultProps {
  title: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export function BuilderResult({ title, badge = "PRELIMINARY BRIEF", children, className = "" }: BuilderResultProps) {
  return (
    <div className={`w-full bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6 ${className}`}>
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <h4 className="text-lg font-extrabold text-white tracking-tight">{title}</h4>
        <span className="px-2.5 py-1 rounded bg-[#2E75B6]/20 border border-[#2E75B6]/30 text-[#2E75B6] text-[10px] font-mono font-bold uppercase tracking-wider">
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}
