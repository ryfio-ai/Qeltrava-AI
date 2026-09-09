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
    <div className={`w-full bg-[#FFFFFF] border border-[#E5E7EB] rounded-2xl p-6 md:p-10 shadow-sm text-[#080B12] relative overflow-hidden ${className}`}>
      {/* Background Subtle Light Technical Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(to right, #E5E7EB 1px, transparent 1px), linear-gradient(to bottom, #E5E7EB 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Header */}
      <div className="relative z-10 border-b border-[#E5E7EB] pb-6 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F6FA] border border-[#D1D5DB] text-[#2E75B6] text-xs font-mono font-bold uppercase tracking-widest mb-3">
          <span>{badge}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#080B12] tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#4B5563] font-sans max-w-3xl">
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
