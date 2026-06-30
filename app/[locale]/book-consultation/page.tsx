import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { LeadForm } from '@/components/LeadForm';
import { VisualBenefitsOfConsulting } from '@/components/ui/VisualBenefitsOfConsulting';

export const metadata: Metadata = {
  title: 'Book a Consultation | ' + siteConfig.companyName,
  description: 'Schedule an AI strategy call with our engineering partners.',
};

export default function BookConsultationPage() {
  // NEXT_PUBLIC_BOOKING_URL should be set to your Cal.com or Calendly URL in Vercel.
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || 'https://calendly.com/ryfioai/enquiry-qeltrava-ai';

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
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm min-h-[600px] flex flex-col">
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">2. Select a Time</h2>
              <div className="flex-grow w-full rounded-xl overflow-hidden border border-[var(--color-border-soft)]">
                <iframe 
                  src={bookingUrl}
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  title="Schedule a consultation"
                  className="min-h-[500px]"
                ></iframe>
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
