import React from 'react';
import { Metadata } from 'next';
import { LearnHub } from '@/components/learn/LearnHub';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Engineering Learn Hub | Tactical Software Guides | Qeltrava AI',
  description: 'Tactical 15-minute engineering tutorials: AI telemetry API design, RAG implementation, and manufacturing system architecture.',
  keywords: ["AI Engineering Tutorials", "FastAPI Telemetry Guide", "RAG Implementation Guide", "Manufacturing AI Code"],
  openGraph: {
    title: 'Engineering Learn Hub | Qeltrava AI',
    description: 'Learn by building real systems with step-by-step engineering guides.',
    type: 'website',
  },
};

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <Reveal direction="up">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
              <span>TACTICAL ENGINEERING GUIDES</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              Learn by <span className="font-serif italic font-normal text-[#2196F3]">Building Real Systems</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Practical software engineering tutorials detailing system architecture, API endpoints, telemetry buffers, and AI orchestration.
            </p>
          </div>
        </Reveal>

        {/* Learn Hub */}
        <Reveal delay={0.1} direction="up">
          <LearnHub />
        </Reveal>
      </div>
    </main>
  );
}
