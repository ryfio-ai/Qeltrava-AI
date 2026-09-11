import React from 'react';
import { Metadata } from 'next';
import { EngineeringToolsHub } from '@/components/tools/EngineeringToolsHub';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'AI Architecture Builder & System Topology Generator | Qeltrava AI',
  description: 'Interactive AI architecture generator: Select frontend, backend, database, and LLM providers to generate visual topology briefs.',
  keywords: ["AI Architecture Builder", "System Topology Generator", "Software Architecture Tool", "FastAPI Next.js Stack"],
  openGraph: {
    title: 'AI Architecture Builder | Qeltrava AI',
    description: 'Generate software architecture topology diagrams and system specifications.',
    type: 'website',
  },
};

export default function AIArchitectureBuilderPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
              <span>INTERACTIVE ARCHITECTURE BUILDER</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              AI Architecture <span className="font-serif italic font-normal text-[#2196F3]">Builder</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Design production system topologies with frontend, backend microservice, database, and model provider integrations.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up">
          <EngineeringToolsHub />
        </Reveal>
      </div>
    </main>
  );
}
