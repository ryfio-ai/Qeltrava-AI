import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'AI for Education & EdTech | ' + siteConfig.companyName,
  description: 'Deploy adaptive learning paths, educational platform modernizations, and secure LMS integrations.',
};

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24 select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">AI for Education & EdTech</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We design and build secure, compliant learning management layers (LMS), digital content delivery networks, and adaptive learning algorithms.
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
                <p className="text-sm font-semibold text-[var(--color-primary-dark)]">Adaptive Curriculum Logic</p>
                <p className="text-xs text-[var(--color-text-main)] mt-2">Personalize material difficulty and timelines to student comprehension.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <div className="w-8 h-8 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg flex items-center justify-center mb-4 font-bold">02</div>
                <p className="text-sm font-semibold text-[var(--color-primary-dark)]">Scalable Content Delivery</p>
                <p className="text-xs text-[var(--color-text-main)] mt-2">Low-latency video streaming and document parsing across global edge domains.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <div className="w-8 h-8 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg flex items-center justify-center mb-4 font-bold">03</div>
                <p className="text-sm font-semibold text-[var(--color-primary-dark)]">GDPR & FERPA Security Compliance</p>
                <p className="text-xs text-[var(--color-text-main)] mt-2">Secure student data vaults, isolated role-based access configurations.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="p-8 bg-[var(--color-bg-light)] rounded-2xl text-center">
          <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-4">Discuss your EdTech roadmap with our engineers</h3>
          <Button href="/book-consultation" variant="primary">
            Schedule a Scoping Call
          </Button>
        </section>
      </div>
    </main>
  );
}
