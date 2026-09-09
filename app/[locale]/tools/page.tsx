import React from 'react';
import { Metadata } from 'next';
import { BuilderToolsSection } from '@/components/builder-tools/BuilderToolsSection';
import { Reveal } from '@/components/motion/Reveal';

export const metadata: Metadata = {
  title: 'Qeltrava Builder Lab | Free Engineering Intelligence & Product Tools',
  description: 'Free interactive engineering tools for founders and developers: Idea to Blueprint, AI Readiness Scorecard, MVP Classifier, and Architecture Generator.',
  keywords: ["AI Builder Tools", "Software Architecture Generator", "MVP Scope Planner", "AI Readiness Assessment", "Engineering Blueprint"],
  openGraph: {
    title: 'Qeltrava Builder Lab | Free Engineering Intelligence',
    description: 'Build smarter before you build bigger with interactive AI & software architecture tools.',
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
              <span>ENGINEERING INTELLIGENCE FOR BUILDERS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
              Qeltrava <span className="font-serif italic font-normal text-[#2196F3]">Builder Lab</span>
            </h1>
            <p className="text-lg text-[#475569] font-sans">
              Build smarter before you build bigger. Interactive engineering intelligence tools to evaluate AI readiness, plan MVP scope, and generate production architecture briefs.
            </p>
          </div>
        </Reveal>

        {/* Builder Tools Hub */}
        <Reveal delay={0.1} direction="up">
          <BuilderToolsSection />
        </Reveal>
      </div>
    </main>
  );
}
