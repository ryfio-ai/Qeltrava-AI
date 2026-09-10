import React from 'react';
import { Metadata } from 'next';
import { FounderToolkit } from '@/components/founders/FounderToolkit';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Tech Stack Advisor & Architecture Rationale Tool | Qeltrava AI',
  description: 'Select the optimal software engineering stack for your startup or enterprise application based on scale, AI requirements, and developer velocity.',
  keywords: ["Tech Stack Advisor", "Architecture Match", "FastAPI vs Node", "Next.js Architecture", "Software Stack Selector"],
  openGraph: {
    title: 'Tech Stack Advisor | Qeltrava AI',
    description: 'Receive recommended frontend, backend, database, and AI stacks with technical rationale.',
    type: 'website',
  },
};

export default function TechStackAdvisorPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
              <span>INTERACTIVE TECH STACK ADVISOR</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              Tech Stack <span className="font-serif italic font-normal text-[#2196F3]">Advisor</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Choose the right tech stack for your product scale and AI needs before building.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up">
          <FounderToolkit />
        </Reveal>
      </div>
    </main>
  );
}
