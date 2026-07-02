import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { ServiceExplorer } from '@/components/ui/ServiceExplorer';

export const metadata: Metadata = {
  title: 'Engineering Services | ' + siteConfig.companyName,
  description: 'Explore our AI-native engineering services, from SaaS development to AI automation.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        <FadeIn>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Engineering Services</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We design, engineer, and deploy intelligent software systems for organizations that demand precision, security, and measurable ROI.
            </p>
          </div>
        </FadeIn>

        <section className="mt-4">
          <ServiceExplorer />
        </section>
      </div>
    </main>
  );
}
