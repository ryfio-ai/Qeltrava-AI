import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Compliance & Security Hardening | ' + siteConfig.companyName,
  description: 'Design secure, compliant software systems, perform database encryption configurations, and set up API gateways for enterprise security.',
};

export default function SecurityHardeningPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24 select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <span className="text-xs font-mono font-bold uppercase text-[var(--color-accent)] tracking-widest block mb-2">Outcome Solution</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Compliance & Security Hardening</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We secure your database records, establish multi-tenant security gates, encrypt critical endpoints, and lock configurations ahead of target compliance audits.
            </p>
          </div>
        </FadeIn>

        <section className="mb-20">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Security Domains</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Encryption & Secrets</p>
                <p className="text-xs text-[var(--color-text-main)]">Deploy automatic data encryption at rest and in transit. Set up secure vault systems for credentials.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">API Gateway & Auth</p>
                <p className="text-xs text-[var(--color-text-main)]">Configure reverse-proxy protection, API rate limiting, IP whitelist grids, and OAuth verification locks.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Audit-Ready Controls</p>
                <p className="text-xs text-[var(--color-text-main)]">Document secure pipelines and user-role access constraints required to pass SOC 2 or HIPAA reviews.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="p-8 bg-[var(--color-bg-light)] rounded-2xl text-center">
          <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-4">Secure your product footprint with our security architects</h3>
          <Button href="/book-consultation" variant="primary">
            Schedule a Scoping Call
          </Button>
        </section>
      </div>
    </main>
  );
}
