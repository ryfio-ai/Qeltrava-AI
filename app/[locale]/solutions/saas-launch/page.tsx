import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'SaaS Launch Program | ' + siteConfig.companyName,
  description: 'Accelerated engineering service to build and deploy robust, multi-tenant SaaS applications ready for enterprise buyers.',
};

export default function SaasLaunchPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24 select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <span className="text-xs font-mono font-bold uppercase text-[var(--color-accent)] tracking-widest block mb-2">Outcome Solution</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">SaaS Launch Program</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              An end-to-end engineering solution designed to turn product requirements into a fully-functional, multi-tenant SaaS platform in an accelerated timeline.
            </p>
          </div>
        </FadeIn>

        <section className="mb-20">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Scope & Outcomes</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Multi-Tenant Database</p>
                <p className="text-xs text-[var(--color-text-main)]">Tenancy isolation patterns and secure data segmentation configured from day one.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Billing & Subscription</p>
                <p className="text-xs text-[var(--color-text-main)]">Fully integrated Stripe billing pipelines, usage-based metrics tracking, and receipt templates.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Auth & RBAC Console</p>
                <p className="text-xs text-[var(--color-text-main)]">Secure authentication portals, invitation tokens, and role-based permissions management.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="p-8 bg-[var(--color-bg-light)] rounded-2xl text-center">
          <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-4">Let's scope your SaaS architecture together</h3>
          <Button href="/book-consultation" variant="primary">
            Schedule a Scoping Call
          </Button>
        </section>
      </div>
    </main>
  );
}
