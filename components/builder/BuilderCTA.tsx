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
    <div className="bg-[#F3F6FA] border border-[#E5E7EB] p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
      <div>
        <h5 className="text-base font-extrabold text-[#080B12] tracking-tight">{title}</h5>
        <p className="text-xs text-[#4B5563] font-sans mt-0.5">{displaySubtitle}</p>
      </div>
      <Button href={href} variant="primary" className="bg-[#2E75B6] hover:bg-[#256096] text-white px-5 py-2.5 text-xs font-bold font-mono rounded-lg whitespace-nowrap shadow-sm">
        {buttonText}
      </Button>
    </div>
  );
}
