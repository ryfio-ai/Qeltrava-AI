import React from 'react';
import { Metadata } from 'next';
import { OpenSourceHub } from '@/components/open-source/OpenSourceHub';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Open Engineering & Open Source Starters | Qeltrava AI',
  description: 'Free open-source starters, developer templates, AI agent blueprints, and manufacturing telemetry tools built by Qeltrava AI.',
  keywords: ["Open Source AI", "Next.js AI Starter", "FastAPI Microservice", "Manufacturing Telemetry Data", "OEE Calculator"],
  openGraph: {
    title: 'Open Engineering Hub | Qeltrava AI',
    description: 'Open engineering resources built to be used. Explore starters, AI templates, and industrial software tools.',
    type: 'website',
  },
};

export default function OpenSourcePage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
              <span>OPEN ENGINEERING RESOURCE LAB</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              Open Engineering. <span className="font-serif italic font-normal text-[#2196F3]">Built to be used.</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Free tools, starter kits, templates, and industrial software resources from Qeltrava AI.
            </p>
          </div>
        </Reveal>

        {/* Open Source Hub Component */}
        <Reveal delay={0.1} direction="up">
          <OpenSourceHub />
        </Reveal>
      </div>
    </main>
  );
}
