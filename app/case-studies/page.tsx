import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Case Studies | ' + siteConfig.companyName,
  description: 'Discover how Quantra AI approaches case studies to deliver measurable business outcomes and architectural precision.',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Case Studies</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              Discover how Quantra AI approaches case studies to deliver measurable business outcomes and architectural precision.
            </p>
          </div>
        </FadeIn>

        <section className="mb-20">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Business Outcomes</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <FadeIn delay={0.1}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <div className="w-8 h-8 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg flex items-center justify-center mb-4 font-bold">01</div>
                <p className="text-sm font-medium text-[var(--color-primary-dark)]">Scalable architecture</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <div className="w-8 h-8 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg flex items-center justify-center mb-4 font-bold">02</div>
                <p className="text-sm font-medium text-[var(--color-primary-dark)]">Transparent delivery process</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <div className="w-8 h-8 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg flex items-center justify-center mb-4 font-bold">03</div>
                <p className="text-sm font-medium text-[var(--color-primary-dark)]">Long-term support retainers</p>
              </div>
            </FadeIn>
            
          </div>
        </section>

        <section className="mb-20">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Our Engineering Approach</h2>
            <p className="text-[var(--color-text-main)] mb-6">
              We do not sell hours. We sell capabilities. Every architecture decision in our Case Studies solutions is measured against its ability to reduce costs, increase revenue, or mitigate risk. We build secure, scalable platforms using our Quantra Delivery OS.
            </p>
          </FadeIn>
        </section>

        <FadeIn direction="up">
          <div className="p-10 bg-[var(--color-primary-dark)] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to transform your workflow?</h3>
              <p className="text-white/80">Schedule an AI Opportunity Audit to diagnose your business bottlenecks.</p>
            </div>
            <Button href="/book-consultation" className="bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 border-transparent whitespace-nowrap">
              Book a Strategy Call
            </Button>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
