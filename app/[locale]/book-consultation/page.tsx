import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { LeadForm } from '@/components/LeadForm';
import { VisualBenefitsOfConsulting } from '@/components/ui/VisualBenefitsOfConsulting';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Book an AI Strategy Call | ' + siteConfig.companyName,
  description: 'Schedule an AI strategy call with our engineering partners.',
};

export default function BookConsultationPage() {
  const bookingUrl = 'https://calendly.com/ryfioai/enquiry-qeltrava-ai';

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Book an AI Strategy Call</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed">
              Speak directly with our senior engineering partners about your business challenges, legacy architecture, and automation opportunities.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <FadeIn direction="right" delay={0.1}>
            <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm">
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">1. Tell us about your organization</h2>
              <LeadForm />
              <p className="mt-4 text-[11px] text-[var(--color-text-main)] opacity-70 leading-relaxed">
                Note: Initial scoping discussions and subsequent estimations are illustrative benchmarks based on standard engineering complexity, and do not constitute binding contract offers. Official pricing is subject to architectural review and final contract agreements.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm min-h-[600px] flex flex-col">
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">2. Select a Time</h2>
              <div className="mb-6 bg-[var(--color-bg-light)] p-4 rounded-xl border border-[var(--color-border-soft)] text-sm text-[var(--color-text-main)]">
                <span className="font-semibold text-[var(--color-primary-dark)] block mb-2">What to expect:</span>
                <ul className="space-y-1.5 list-disc pl-5">
                  <li>30-minute call</li>
                  <li>Senior engineer on the call, not a sales rep</li>
                  <li>Written summary of recommendations within 48 hours</li>
                </ul>
              </div>
              <div className="flex-grow w-full rounded-xl overflow-hidden min-h-[650px] relative">
                <div 
                  className="calendly-inline-widget w-full h-full" 
                  data-url={bookingUrl}
                  style={{ minWidth: '320px', height: '650px' }}
                />
                <Script 
                  src="https://assets.calendly.com/assets/external/widget.js" 
                  strategy="afterInteractive"
                />
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn direction="up" delay={0.3}>
          <section className="mt-20 border-t border-[var(--color-border-soft)] pt-16">
            <VisualBenefitsOfConsulting />
          </section>
        </FadeIn>
      </div>
    </main>
  );
}
