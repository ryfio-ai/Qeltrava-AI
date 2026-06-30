import React from 'react';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { CountUpMetric } from '@/components/ui/CountUpMetric';
import { MiniSparkline } from '@/components/ui/MiniSparkline';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import { DotGrid } from '@/components/backgrounds/DotGrid';
import dynamic from 'next/dynamic';

const NetworkBackground = dynamic(() => import('@/components/backgrounds/NetworkBackground').then(mod => mod.NetworkBackground));
const CoreOffers = dynamic(() => import('@/components/CoreOffers').then(mod => mod.CoreOffers));

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

      {/* Metrics Band */}
      <section className="py-12 bg-white border-b border-[var(--color-border-soft)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 49%, var(--color-accent) 50%, transparent 51%)', backgroundSize: '100% 20px', opacity: 0.05 }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--color-border-soft)]">
            <FadeIn delay={0.1}>
              <div className="text-sm font-medium text-[var(--color-text-main)] uppercase tracking-wider mb-2">Systems Deployed</div>
              <div className="text-4xl font-bold text-[var(--color-primary-dark)] flex items-center justify-center gap-4">
                <CountUpMetric value={150} suffix="+" duration={2.5} />
                <MiniSparkline width={40} height={20} data={[2, 4, 8, 15, 25, 40, 70, 150]} />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-sm font-medium text-[var(--color-text-main)] uppercase tracking-wider mb-2">ROI Realized</div>
              <div className="text-4xl font-bold text-[var(--color-primary-dark)] flex items-center justify-center gap-4">
                <CountUpMetric value={320} suffix="%" duration={2.5} />
                <MiniSparkline width={40} height={20} data={[0, 50, 100, 150, 200, 250, 280, 320]} />
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-sm font-medium text-[var(--color-text-main)] uppercase tracking-wider mb-2">Uptime Target</div>
              <div className="text-4xl font-bold text-[var(--color-primary-dark)]">
                <CountUpMetric value={99.99} suffix="%" duration={2.5} />
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="text-sm font-medium text-[var(--color-text-main)] uppercase tracking-wider mb-2">Global Clients</div>
              <div className="text-4xl font-bold text-[var(--color-primary-dark)]">
                <CountUpMetric value={45} suffix="+" duration={2.5} />
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
      <div className="relative">
        <DotGrid opacity={2} />
        <CoreOffers />
      </div>

      {/* Differentiators */}
      <section className="py-24 bg-white border-t border-[var(--color-border-soft)] relative overflow-hidden">
        <NetworkBackground density="dense" className="opacity-50" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[var(--color-primary-dark)] mb-6">Why Qeltrava AI?</h2>
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
            <div className="bg-[var(--color-bg-light)] p-8 md:p-12 rounded-3xl flex flex-col justify-center items-center relative overflow-hidden">
               <TerminalWindow className="w-full text-left">
                  <div><span className="text-[var(--color-accent)]">➜</span> <span className="text-[#27c93f]">~/qeltrava-os</span> git:(main) ✗ ./deploy-agent --target=sales-workflow</div>
                  <div className="mt-2 text-gray-400">[info] Initializing Vector DB connection...</div>
                  <div className="text-gray-400">[info] Loading context: 1,450 documents...</div>
                  <div className="text-[#ffbd2e] mt-2">[warn] Skipping malformed schema in chunk 12...</div>
                  <div className="text-[#27c93f] mt-2 font-bold">✔ Agent deployed successfully.</div>
                  <div className="text-gray-400">Endpoint: https://api.qeltrava.ai/v1/agents/sls-902</div>
                  <div className="mt-4 animate-pulse">_</div>
               </TerminalWindow>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery OS / Process */}
      <section className="py-24 bg-[var(--color-primary-dark)] text-white">
         <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Qeltrava Delivery OS</h2>
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
