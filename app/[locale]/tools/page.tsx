import React from 'react';
import { Metadata } from 'next';
import { BuilderToolsSection } from '@/components/builder-tools/BuilderToolsSection';
import { FadeIn } from '@/components/animations/FadeIn';

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
    <main className="min-h-screen bg-[#F7F9FC] text-[#080B12] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3F6FA] border border-[#D1D5DB] text-[#2E75B6] text-xs font-mono font-bold uppercase tracking-widest">
              <span>ENGINEERING INTELLIGENCE FOR BUILDERS</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#080B12] tracking-tight">
              Qeltrava Builder Lab
            </h1>
            <p className="text-lg text-[#4B5563] font-sans">
              Build smarter before you build bigger. Interactive engineering intelligence tools to evaluate AI readiness, plan MVP scope, and generate production architecture briefs.
            </p>
          </div>
        </FadeIn>

        {/* Builder Tools Hub */}
        <FadeIn delay={0.1}>
          <BuilderToolsSection />
        </FadeIn>
      </div>
    </main>
  );
}
