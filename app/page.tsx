import React from 'react';
import Link from 'next/link';
import { NetworkBackground } from '@/components/backgrounds/NetworkBackground';
import { Button } from '@/components/Button';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[var(--color-primary-dark)]">
        <NetworkBackground />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                AI-Native Software Engineering for Real Business Outcomes.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-2xl">
                {siteConfig.companyName} helps startups, enterprises, and public-sector organizations design, build, and scale intelligent software systems — from AI automation and SaaS platforms to cloud infrastructure, data systems, and secure enterprise integrations.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/book-consultation" variant="primary" className="text-lg px-8 py-4">
                  Book an AI Strategy Call
                </Button>
                <Button href="/solutions" variant="outline" className="text-lg px-8 py-4">
                  View Solutions
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Trust / Brand Promise */}
      <section className="py-20 bg-[var(--color-primary-dark)] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">We turn business complexity into intelligent software systems.</h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              We are not a generic web development agency. We are an AI-first engineering partner.
              We build secure, scalable platforms that automate operations, modernize legacy architectures, and create measurable ROI.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Core Offers */}
      <section className="py-24 bg-[var(--color-bg-light)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn>
            <div className="mb-16">
              <h2 className="text-4xl font-bold text-[var(--color-primary-dark)] mb-4">Core Engineering Solutions</h2>
              <p className="text-lg text-[var(--color-text-main)] max-w-2xl">From low-risk discovery to dedicated engineering pods, we provide a clear path to scalable intelligence.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">AI Opportunity Audit</h3>
                <p className="text-[var(--color-text-main)] mb-6 h-20">A diagnostic sprint that identifies where AI can reduce cost, save time, or improve operational efficiency.</p>
                <ul className="space-y-2 mb-8 text-sm text-[var(--color-text-main)] font-medium">
                  <li className="flex gap-2">✓ Workflow analysis</li>
                  <li className="flex gap-2">✓ Automation ROI estimate</li>
                  <li className="flex gap-2">✓ 90-day implementation roadmap</li>
                </ul>
                <Button href="/services/ai-automation" variant="outline" className="w-full">Explore Audits</Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">AI Automation Sprint</h3>
                <p className="text-[var(--color-text-main)] mb-6 h-20">Build a working AI automation prototype or MVP for a high-value business workflow in 4-8 weeks.</p>
                <ul className="space-y-2 mb-8 text-sm text-[var(--color-text-main)] font-medium">
                  <li className="flex gap-2">✓ Support AI agents</li>
                  <li className="flex gap-2">✓ Document processing</li>
                  <li className="flex gap-2">✓ Internal knowledge assistants</li>
                </ul>
                <Button href="/services/ai-automation" variant="outline" className="w-full">Explore Sprints</Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">SaaS Launch Sprint</h3>
                <p className="text-[var(--color-text-main)] mb-6 h-20">Help founders and companies launch a production-grade SaaS MVP without technical debt.</p>
                <ul className="space-y-2 mb-8 text-sm text-[var(--color-text-main)] font-medium">
                  <li className="flex gap-2">✓ Multi-tenant architecture</li>
                  <li className="flex gap-2">✓ Enterprise security</li>
                  <li className="flex gap-2">✓ Scalable cloud deployments</li>
                </ul>
                <Button href="/services/saas-development" variant="outline" className="w-full">Explore SaaS</Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-white border-t border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--color-primary-dark)] mb-6">Why Quantra AI?</h2>
              <p className="text-lg text-[var(--color-text-main)] mb-8">
                We are strategic partners, not coding vendors. We price based on business value, protect margin through fixed scopes, and engineer platforms that scale securely.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">AI-Native Architecture</h4>
                  <p className="text-sm text-[var(--color-text-main)]">Built from day one to support modern LLMs, agents, and vector databases.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Outcome-Based Delivery</h4>
                  <p className="text-sm text-[var(--color-text-main)]">We sell measurable ROI and business capabilities, not hourly coding capacity.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Enterprise Security</h4>
                  <p className="text-sm text-[var(--color-text-main)]">Compliance, RBAC, and secure integrations are standard, not afterthoughts.</p>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Long-Term Retainers</h4>
                  <p className="text-sm text-[var(--color-text-main)]">Dedicated engineering pods for continuous product iteration and support.</p>
                </div>
              </div>
            </div>
            <div className="bg-[var(--color-bg-light)] p-12 rounded-3xl flex flex-col justify-center items-center relative overflow-hidden">
               {/* Abstract visual representation of integration */}
               <div className="w-full max-w-sm aspect-square relative flex items-center justify-center">
                 <div className="absolute inset-0 border border-[var(--color-accent)]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                 <div className="absolute inset-4 border border-[var(--color-accent)]/40 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                 <div className="absolute inset-8 border border-[var(--color-accent)]/60 rounded-full animate-[spin_20s_linear_infinite]"></div>
                 <div className="w-24 h-24 bg-[var(--color-primary-dark)] rounded-full flex items-center justify-center shadow-xl z-10">
                   <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery OS / Process */}
      <section className="py-24 bg-[var(--color-primary-dark)] text-white">
         <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Quantra Delivery OS</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">Our internal and external system for flawless project delivery.</p>
         </div>
         <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-[var(--color-success)] mb-2">01</div>
                <h4 className="font-semibold">Diagnose & Architect</h4>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-[var(--color-success)] mb-2">02</div>
                <h4 className="font-semibold">Build & Validate</h4>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-[var(--color-success)] mb-2">03</div>
                <h4 className="font-semibold">Deploy</h4>
              </div>
              <div className="p-6 border border-white/10 rounded-xl bg-white/5">
                <div className="text-3xl font-bold text-[var(--color-success)] mb-2">04</div>
                <h4 className="font-semibold">Optimize (Retainer)</h4>
              </div>
            </div>
         </div>
      </section>

    </main>
  );
}
