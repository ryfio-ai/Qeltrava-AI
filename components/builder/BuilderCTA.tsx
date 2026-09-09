"use client";

import React from 'react';
import { Button } from '@/components/Button';
import { ArrowRight } from 'lucide-react';

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
    <div className="bg-gradient-to-r from-slate-900 via-[#1B2A4A]/40 to-slate-900 border border-[#2E75B6]/40 p-6 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
      <div>
        <h5 className="text-base font-extrabold text-white tracking-tight">{title}</h5>
        <p className="text-xs text-slate-300 font-sans mt-0.5">{displaySubtitle}</p>
      </div>
      <Button href={href} variant="primary" className="bg-[#2E75B6] hover:bg-[#256096] text-white px-5 py-2.5 text-xs font-bold font-mono rounded-lg whitespace-nowrap shadow-lg shadow-[#2E75B6]/20">
        {buttonText}
      </Button>
    </div>
  );
}
