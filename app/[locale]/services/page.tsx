import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { ServiceExplorer } from '@/components/ui/ServiceExplorer';
import { VisualWhatSoftwareCompanyDoes } from '@/components/ui/VisualWhatSoftwareCompanyDoes';

export const metadata: Metadata = {
  title: 'Engineering Services | ' + siteConfig.companyName,
  description: 'Explore our AI-native engineering services, from SaaS development to AI automation.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Header */}
        <FadeIn>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Engineering Services</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We design, engineer, and deploy intelligent software systems for organizations that demand precision, security, and measurable ROI.
            </p>
          </div>
        </FadeIn>

        {/* Services Directory */}
        <section className="mt-4">
          <ServiceExplorer />
        </section>

        {/* Core Capabilities Wheel */}
        <section className="mt-8 border-t border-[var(--color-border-soft)] pt-16">
          <FadeIn direction="up">
            <div className="mb-10 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Core Disciplines Wheel</h2>
              <p className="text-sm text-[var(--color-text-main)]">
                Our 11 engineering disciplines are integrated into our main services. Click on any segment to see details.
              </p>
            </div>
            <VisualWhatSoftwareCompanyDoes />
          </FadeIn>
        </section>

      </div>
    </main>
  );
}
