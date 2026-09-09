"use client";

import React from 'react';

interface BuilderShellProps {
  title: string;
  subtitle: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export function BuilderShell({ title, subtitle, badge = "QELTRAVA BUILDER LAB", children, className = "" }: BuilderShellProps) {
  return (
    <div className={`w-full bg-[#FFFFFF] border border-[#90CAF9]/50 rounded-2xl p-6 md:p-10 shadow-xs text-[#0F172A] relative overflow-hidden ${className}`}>
      {/* Background Subtle Light Blue Technical Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, #90CAF9 1px, transparent 1px), linear-gradient(to bottom, #90CAF9 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Header */}
      <div className="relative z-10 border-b border-[#E2E8F0] pb-6 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest mb-3">
          <span>{badge}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0D47A1] tracking-tight mb-2 font-anek">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#475569] font-sans max-w-3xl">
          {subtitle}
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
