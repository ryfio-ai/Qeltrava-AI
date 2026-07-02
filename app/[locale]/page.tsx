"use client";

import React, { useState } from 'react';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { CountUpMetric } from '@/components/ui/CountUpMetric';
import { MiniSparkline } from '@/components/ui/MiniSparkline';
import { TerminalWindow } from '@/components/ui/TerminalWindow';
import { ClientLogos } from '@/components/ClientLogos';
import dynamic from 'next/dynamic';

const NetworkBackground = dynamic(() => import('@/components/backgrounds/NetworkBackground').then(mod => mod.NetworkBackground), { ssr: false });

export default function HomePage() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      number: "01",
      name: "Diagnose & Architect",
      desc: "We map your current operational and technical landscape, identify where AI and modern architecture create measurable ROI, and produce a 90-day implementation roadmap. No code written until the problem is fully understood.",
      deliverables: [
        "Workflow analysis report",
        "ROI hypothesis matrix",
        "Architecture recommendation"
      ],
      timeline: "1–2 weeks"
    },
    {
      number: "02",
      name: "Build & Validate",
      desc: "Engineering pods build in 2-week sprints — modular, tested, and documented from day one. Every sprint ends with a working demo, not a status update.",
      deliverables: [
        "Sprint-by-sprint working software",
        "Automated test suite",
        "Security review checklist"
      ],
      timeline: "4–16 weeks"
    },
    {
      number: "03",
      name: "Deploy",
      desc: "Staged rollout (blue-green where applicable), infrastructure-as-code, runbook documentation, and a 30-day hypercare window with the build team.",
      deliverables: [
        "Production deployment",
        "Runbook",
        "Post-launch monitoring setup"
      ],
      timeline: "1–2 weeks"
    },
    {
      number: "04",
      name: "Optimize (Retainer)",
      desc: "Dedicated pods for continuous iteration, model monitoring, cloud cost optimization, and security patching — month-to-month or annual contracts.",
      deliverables: [
        "Monthly health reports",
        "Feature velocity",
        "Proactive issue detection"
      ],
      timeline: "Ongoing"
    }
  ];

  return (
    <main className="min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-[var(--color-primary-dark)]">
        <NetworkBackground />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <FadeIn delay={0.1}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
                AI-Native Software Engineering for Real Business Outcomes.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-white/80 mb-4 leading-relaxed max-w-2xl">
                {siteConfig.companyName} helps startups, enterprises, and public-sector organizations design, build, and scale intelligent software systems — from AI automation and SaaS platforms to cloud infrastructure, data systems, and secure enterprise integrations.
              </p>
              <p className="text-sm font-medium text-[var(--color-accent)] tracking-wider mb-10 opacity-90">
                Trusted by teams building eDrift, Thiranoli, and Tamizh Tech
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
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(99, 102, 241, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.03) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            opacity: 0.8
          }} 
        />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-[var(--color-border-soft)]">
            <FadeIn delay={0.1}>
              <div className="text-sm font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider mb-2">Systems Deployed</div>
              <div className="text-4xl font-bold text-[var(--color-primary-dark)] flex items-center justify-center gap-4">
                <CountUpMetric value={150} suffix="+" duration={2.5} />
                <MiniSparkline width={40} height={20} data={[2, 4, 8, 15, 25, 40, 70, 150]} />
              </div>
              <p className="text-xs text-[var(--color-text-main)] mt-2 max-w-[200px] mx-auto opacity-80">
                150+ custom applications and integrations launched globally.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-sm font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider mb-2">ROI Realized</div>
              <div className="text-4xl font-bold text-[var(--color-primary-dark)] flex items-center justify-center gap-4">
                <CountUpMetric value={320} suffix="%" duration={2.5} />
                <MiniSparkline width={40} height={20} data={[0, 50, 100, 150, 200, 250, 280, 320]} />
              </div>
              <p className="text-xs text-[var(--color-text-main)] mt-2 max-w-[200px] mx-auto opacity-80">
                320% average client ROI realized within 12 months.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-sm font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider mb-2">Uptime Target</div>
              <div className="text-4xl font-bold text-[var(--color-primary-dark)]">
                <CountUpMetric value={99.99} suffix="%" duration={2.5} />
              </div>
              <p className="text-xs text-[var(--color-text-main)] mt-2 max-w-[200px] mx-auto opacity-80">
                99.99% operational uptime maintained across production nodes.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="text-sm font-semibold text-[var(--color-primary-dark)] uppercase tracking-wider mb-2">Global Clients</div>
              <div className="text-4xl font-bold text-[var(--color-primary-dark)]">
                <CountUpMetric value={45} suffix="+" duration={2.5} />
              </div>
              <p className="text-xs text-[var(--color-text-main)] mt-2 max-w-[200px] mx-auto opacity-80">
                45+ active enterprise partners scaling with our technology.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <ClientLogos />

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

      {/* Services Hub Link Section */}
      <section className="py-24 bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(circle at center, var(--color-text-main) 1px, transparent 1px)', backgroundSize: '24px 24px', opacity: 0.02 }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <FadeIn direction="up">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-4 text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] hover:text-[var(--color-accent)] transition-colors group"
            >
              <span>Six engineering practices. One delivery system.</span>
              <span className="transform group-hover:translate-x-2 transition-transform">→</span>
            </Link>
          </FadeIn>
        </div>
      </section>

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
                  <div className="text-gray-400">Endpoint: https://api.qeltrava.example/v1/agents/sls-902</div>
                  <div className="mt-4 animate-pulse">_</div>
               </TerminalWindow>
               <p className="mt-3 text-xs text-[var(--color-text-main)] opacity-70 italic text-center">
                 Illustrative example: Deploying an AI sales agent via the CLI tool.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery OS / Process */}
      <section className="py-24 bg-[var(--color-primary-dark)] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
          <h2 className="text-4xl font-bold mb-4">Qeltrava Delivery OS</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Our systematic, human-accountable delivery model designed for engineering success.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto px-6">
          {/* Interactive tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {stages.map((stage, idx) => (
              <button
                key={stage.number}
                onClick={() => setActiveStage(idx)}
                className={`px-5 py-3 rounded-full text-sm font-semibold border transition-all ${
                  activeStage === idx
                    ? 'bg-white text-[var(--color-primary-dark)] border-white shadow-lg'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                }`}
              >
                {stage.number} {stage.name}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-xs font-bold font-mono text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-3 py-1 rounded-full">
                  Stage {stages[activeStage].number}
                </span>
                <span className="text-sm font-medium text-white/50">
                  Timeline: {stages[activeStage].timeline}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {stages[activeStage].name}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed max-w-3xl mb-8">
                {stages[activeStage].desc}
              </p>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Key Deliverables</h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stages[activeStage].deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-white/80 font-medium">
                    <span className="text-[var(--color-accent)] text-lg leading-none">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white border-t border-[var(--color-border-soft)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-[var(--color-primary-dark)]">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* {{TESTIMONIAL_PENDING — request from eDrift}} */}
            <div className="bg-[var(--color-bg-light)] p-8 rounded-2xl border border-[var(--color-border-soft)] relative">
              <div className="text-gray-400 text-6xl absolute top-4 right-6 font-serif select-none pointer-events-none">“</div>
              <p className="text-lg text-[var(--color-text-main)] italic mb-6 relative z-10">
                "The engineering velocity and architectural precision delivered by their team was outstanding. They modernized our core platforms without disrupting daily operations."
              </p>
              <div>
                <h4 className="font-bold text-[var(--color-primary-dark)]">Engineering Director</h4>
                <p className="text-sm text-[var(--color-text-main)]">Smart EV & Fleet Management Platform</p>
              </div>
            </div>
            {/* {{TESTIMONIAL_PENDING — request from Thiranoli}} */}
            <div className="bg-[var(--color-bg-light)] p-8 rounded-2xl border border-[var(--color-border-soft)] relative">
              <div className="text-gray-400 text-6xl absolute top-4 right-6 font-serif select-none pointer-events-none">“</div>
              <p className="text-lg text-[var(--color-text-main)] italic mb-6 relative z-10">
                "Building our educational LMS and delivery network with Qeltrava was the best technical decision we made. Flawless code quality and robust scalability."
              </p>
              <div>
                <h4 className="font-bold text-[var(--color-primary-dark)]">Product Architect</h4>
                <p className="text-sm text-[var(--color-text-main)]">EdTech & Digital Academy Network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
