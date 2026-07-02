import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { Link } from '@/src/routing';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Our Clients | ' + siteConfig.companyName,
  description: 'Organizations building with Qeltrava AI. Real client engagements, measurable outcomes, and trusted delivery.',
};

const clients = [
  {
    name: 'eDrift',
    initials: 'eDr',
    desc: 'AI-powered fleet management and logistics optimization platform.',
    what: 'Predictive maintenance ML pipeline + IoT sensor data warehouse.',
  },
  {
    name: 'Thiranoli',
    initials: 'TN',
    desc: 'Tamil cultural content platform and digital media network.',
    what: 'Modern content delivery infrastructure + multi-language search layer.',
  },
  {
    name: 'Tamizh Tech TTRC',
    initials: 'TT',
    desc: 'Tamil technology research and innovation center.',
    what: 'AI research tools + data pipeline infrastructure.',
  },
];

const metrics = [
  { value: '150+', label: 'Systems Deployed', context: 'Software systems designed, built, and shipped across our client portfolio.' },
  { value: '320%', label: 'ROI Improvement', context: 'Average return on investment across automation projects versus manual processes.' },
  { value: '99.99%', label: 'Uptime SLA', context: 'Service level commitment on production systems under our operational support.' },
  { value: '45+', label: 'Global Clients', context: 'Organizations across 10+ countries that have worked with our engineering team.' },
];

const caseStudies = [
  { slug: 'fintech-core-modernization', title: 'Fintech Core Modernization', category: 'Financial Services', excerpt: 'Zero-downtime migration of a 12-year-old core banking system to an event-driven microservices architecture.' },
  { slug: 'healthcare-ai-triage', title: 'Healthcare AI Triage System', category: 'Healthcare', excerpt: 'HIPAA-compliant AI triage engine that reduced patient admission wait times by 38%.' },
  { slug: 'logistics-predictive-maintenance', title: 'Logistics Predictive Maintenance', category: 'Logistics', excerpt: 'IoT pipeline and ML maintenance model for a 500+ vehicle fleet — 92% predictive accuracy.' },
];

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <FadeIn>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">Clients</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">Our Clients</h1>
          <p className="text-xl text-[var(--color-text-main)] max-w-2xl">Organizations building with Qeltrava AI.</p>
        </FadeIn>
      </div>

      {/* Section 1 — Client logos / cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">Featured Clients</h2>
        <p className="text-sm text-[var(--color-text-main)]/60 mb-8 italic">Each engagement referenced with permission.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clients.map((c, i) => (
            <FadeIn key={c.name} delay={i * 0.1} direction="up">
              <div className="bg-white border border-[var(--color-border-soft)] rounded-2xl p-7 h-full hover:shadow-md hover:border-[var(--color-accent)]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-light)] flex items-center justify-center font-bold text-[var(--color-primary-dark)] text-lg mb-4 font-mono">
                  {c.initials}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-primary-dark)] mb-1">{c.name}</h3>
                <p className="text-sm text-[var(--color-text-main)] mb-4">{c.desc}</p>
                <div className="border-t border-[var(--color-border-soft)] pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-accent)] mb-1 font-mono">What We Built</p>
                  <p className="text-sm text-[var(--color-text-main)]">{c.what}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Section 2 — Metrics */}
      <section className="bg-[var(--color-primary-dark)] text-white py-16 mb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {metrics.map((m, i) => (
              <FadeIn key={m.value} delay={i * 0.1}>
                <div>
                  <div className="text-4xl font-extrabold text-[var(--color-success)] font-mono mb-1">{m.value}</div>
                  <div className="text-sm font-bold text-white mb-2">{m.label}</div>
                  <p className="text-xs text-white/50 leading-relaxed">{m.context}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3 — Testimonials placeholder */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-8">Client Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* {{TESTIMONIAL_PLACEHOLDER — request from eDrift}} */}
          <div className="bg-[var(--color-bg-light)] p-8 rounded-2xl border border-dashed border-[var(--color-border-soft)] flex items-center justify-center min-h-[160px]">
            <p className="text-sm text-[var(--color-text-main)]/40 italic text-center">Testimonial pending — eDrift review in progress.</p>
          </div>
          {/* {{TESTIMONIAL_PLACEHOLDER — request from Thiranoli}} */}
          <div className="bg-[var(--color-bg-light)] p-8 rounded-2xl border border-dashed border-[var(--color-border-soft)] flex items-center justify-center min-h-[160px]">
            <p className="text-sm text-[var(--color-text-main)]/40 italic text-center">Testimonial pending — Thiranoli review in progress.</p>
          </div>
        </div>
      </section>

      {/* Section 4 — Case study previews */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-8">Case Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((cs, i) => (
            <FadeIn key={cs.slug} delay={i * 0.1} direction="up">
              <Link href={`/case-studies/${cs.slug}` as any} className="flex flex-col h-full bg-white border border-[var(--color-border-soft)] rounded-2xl p-6 hover:shadow-md hover:border-[var(--color-accent)]/30 transition-all group">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] font-mono mb-3">{cs.category}</span>
                <h3 className="text-base font-bold text-[var(--color-primary-dark)] mb-3 leading-snug group-hover:text-[var(--color-accent)] transition-colors">{cs.title}</h3>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed flex-grow">{cs.excerpt}</p>
                <div className="mt-4 pt-3 border-t border-[var(--color-border-soft)] text-xs font-bold text-[var(--color-accent)] group-hover:underline">Read case study →</div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
