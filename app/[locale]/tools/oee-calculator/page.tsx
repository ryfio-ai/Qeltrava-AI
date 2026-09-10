import React from 'react';
import { Metadata } from 'next';
import { ManufacturingLab } from '@/components/manufacturing/ManufacturingLab';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'OEE Calculator & Operational Equipment Effectiveness Tool | Qeltrava AI',
  description: 'Free interactive OEE calculator (Availability × Performance × Quality) with engineering action recommendations and downtime analysis.',
  keywords: ["OEE Calculator", "Overall Equipment Effectiveness", "Availability Performance Quality", "Manufacturing Intelligence"],
  openGraph: {
    title: 'OEE Calculator | Qeltrava AI',
    description: 'Calculate OEE metrics and receive instant engineering action recommendations.',
    type: 'website',
  },
};

export default function OEECalculatorPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
              <span>INTERACTIVE OEE CALCULATOR</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              Overall Equipment <span className="font-serif italic font-normal text-[#2196F3]">Effectiveness</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Evaluate machine Availability, Performance, and Quality metrics to identify plant bottlenecks and scrap reduction actions.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up">
          <ManufacturingLab />
        </Reveal>
      </div>
    </main>
  );
}
