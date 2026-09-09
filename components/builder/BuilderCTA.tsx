"use client";

import React from 'react';
import { Button } from '@/components/Button';

export interface BuilderCTAProps {
  title?: string;
  subtitle?: string;
  text?: string;
  buttonText?: string;
  href?: string;
}

export function BuilderCTA({ 
  title = "Want Qeltrava to engineer this?", 
  subtitle,
  text,
  buttonText = "Talk to an Engineer →",
  href = "/book-consultation"
}: BuilderCTAProps) {
  const displaySubtitle = text || subtitle || "Discuss this architecture with a senior Qeltrava AI engineer.";

  return (
    <div className="bg-[#E3F2FD] border border-[#90CAF9] p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
      <div>
        <h5 className="text-base font-bold text-[#0D47A1] tracking-tight font-anek">{title}</h5>
        <p className="text-xs text-[#475569] font-sans mt-0.5">{displaySubtitle}</p>
      </div>
      <Button href={href} variant="primary" className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-5 py-2.5 text-xs font-semibold font-mono rounded-lg whitespace-nowrap shadow-xs">
        {buttonText}
      </Button>
    </div>
  );
}
