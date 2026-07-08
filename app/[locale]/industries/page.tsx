import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Industry-Specific AI & Software Engineering | Qeltrava AI',
  description: 'Explore the industries we serve with our AI-native engineering capabilities. We build secure systems for Fintech, Healthcare, Logistics, SaaS, and more.',
  keywords: ["Fintech software development", "Healthcare IT solutions", "Logistics AI automation", "SaaS infrastructure", "Industry specific AI"],
  openGraph: {
    title: 'Industry-Specific AI & Software Engineering',
    description: 'Explore the industries we serve with our AI-native engineering capabilities. We build secure systems for Fintech, Healthcare, Logistics, SaaS, and more.',
    type: 'website',
  },
};

export default function IndustriesPage() {
  const industries = [
    { title: 'Fintech', href: '/industries/fintech', desc: 'Secure, compliant, and highly performant financial systems.' },
    { title: 'Healthcare', href: '/industries/healthcare', desc: 'HIPAA compliant architectures and patient data systems.' },
    { title: 'Logistics', href: '/industries/logistics', desc: 'Supply chain automation and predictive modeling.' },
    { title: 'SaaS', href: '/industries/saas', desc: 'Scalable infrastructure for growing software products.' },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Industries We Serve</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We provide the foundational engineering layer for modernizing organizations across strict regulatory verticals.
            </p>
          </div>
        </FadeIn>

        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((ind, i) => (
              <FadeIn key={ind.href} delay={i * 0.1}>
                <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">{ind.title}</h3>
                  <p className="text-[var(--color-text-main)] mb-6 flex-grow">{ind.desc}</p>
                  <Button href={ind.href} variant="outline" className="w-full">
                    Explore Industry
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
