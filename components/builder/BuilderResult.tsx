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
    <div className={`w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl p-6 space-y-6 shadow-sm text-[#080B12] ${className}`}>
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <h4 className="text-lg font-extrabold text-[#080B12] tracking-tight">{title}</h4>
        <span className="px-2.5 py-1 rounded bg-[#F3F6FA] border border-[#D1D5DB] text-[#2E75B6] text-[10px] font-mono font-bold uppercase tracking-wider">
          {badge}
        </span>
      </div>
      {children}
    </div>
  );
}
