import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { RoiCalculator } from '@/components/ui/RoiCalculator';

export const metadata: Metadata = {
  title: 'ROI Automation Calculator | ' + siteConfig.companyName,
  description: 'Estimate your manual operational process costs and calculate potential annual cost savings from Qeltrava AI automation.',
  openGraph: {
    title: 'Calculate Your Process Automation ROI | Qeltrava AI',
    description: 'Use the interactive ROI Calculator to analyze manual workload costs and potential savings from intelligent automation.',
  }
};

export default function RoiCalculatorPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24 select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
              Business Case Builder
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">
              Process Automation ROI Calculator
            </h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed">
              Determine the financial overhead of your organization's manual processes and identify how much budget can be recaptured through automation.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.1}>
          <RoiCalculator />
        </FadeIn>
      </div>
    </main>
  );
}
