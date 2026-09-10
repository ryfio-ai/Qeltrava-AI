import React from 'react';
import { Metadata } from 'next';
import { EngineeringToolsHub } from '@/components/tools/EngineeringToolsHub';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Engineering Tools Hub | Build, Decide, Ship | Qeltrava AI',
  description: 'Interactive engineering intelligence tools: Architecture Builder, MVP Scope Planner, Tech Stack Advisor, Cloud Cost Estimator, and GitHub Issue Generator.',
  keywords: ["Engineering Tools", "Software Architecture Generator", "Tech Stack Advisor", "MVP Scope Planner", "GitHub Issue Generator"],
  openGraph: {
    title: 'Engineering Tools Hub | Qeltrava AI',
    description: 'Turn ideas into production engineering plans with free interactive tools.',
    type: 'website',
  },
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
              <span>ENGINEERING TOOLS HUB</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              Build → Decide → <span className="font-serif italic font-normal text-[#2196F3]">Ship</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Interactive tools for founders, developers, and engineers to scope MVPs, select technical stacks, design architectures, and generate GitHub issues.
            </p>
          </div>
        </Reveal>

        {/* Engineering Tools Hub */}
        <Reveal delay={0.1} direction="up">
          <EngineeringToolsHub />
        </Reveal>
      </div>
    </main>
  );
}
