import React from 'react';
import { Metadata } from 'next';
import { FounderToolkit } from '@/components/founders/FounderToolkit';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Founder Toolkit & Architecture Advisor | Qeltrava AI',
  description: 'Interactive founder tools: Tech Stack Advisor, Cloud Infrastructure Cost Estimator, and PRD to GitHub Issue Generator.',
  keywords: ["Founder Toolkit", "Tech Stack Advisor", "Cloud Cost Estimator", "GitHub Issue Generator", "MVP Architecture"],
  openGraph: {
    title: 'Founder Toolkit & Architecture Advisor | Qeltrava AI',
    description: 'Validate, scope, and plan your product architecture before writing your first line of production code.',
    type: 'website',
  },
};

export default function FoundersPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
              <span>FOUNDER MODE & ENGINEERING HANDOFF TOOLKIT</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              Validate → Architecture → <span className="font-serif italic font-normal text-[#2196F3]">GitHub Issues</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Choose your tech stack, estimate cloud infrastructure costs, and export PRD goals directly into copyable GitHub Epics and Tasks.
            </p>
          </div>
        </Reveal>

        {/* Founder Toolkit Interactive Suite */}
        <Reveal delay={0.1} direction="up">
          <FounderToolkit />
        </Reveal>
      </div>
    </main>
  );
}
