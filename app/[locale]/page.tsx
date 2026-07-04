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
import { RoiCalculator } from '@/components/ui/RoiCalculator';
import { TechTicker } from '@/components/ui/TechTicker';
import { IndustryShowcase } from '@/components/ui/IndustryShowcase';
import { PartnerStrip } from '@/components/ui/PartnerStrip';
import { AISolutionArchitect } from '@/components/ui/AISolutionArchitect';
import { CapabilityMatrix } from '@/components/ui/CapabilityMatrix';
import { TransformationStories } from '@/components/ui/TransformationStories';
import { EngineeringWorkflow } from '@/components/ui/EngineeringWorkflow';
import { LiveArchitectureVisualizer } from '@/components/ui/LiveArchitectureVisualizer';
import { SystemHealthDashboard } from '@/components/ui/SystemHealthDashboard';
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
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-primary-dark">
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
              <div className="mt-6 flex justify-start">
                <Link 
                  href="/quiz" 
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline"
                >
                  <span>Not sure where to start? → Take the 2-minute assessment</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Tech Stack Ticker */}
      <TechTicker />

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

      {/* ── AI Solution Architect ───────────────────────────── */}
      <section className="py-24 bg-white border-b border-[var(--color-border-soft)] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 10% 50%, rgba(99,102,241,0.04) 0%, transparent 50%), radial-gradient(circle at 90% 20%, rgba(16,185,129,0.04) 0%, transparent 40%)' }} />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full text-[var(--color-accent)] text-xs font-bold font-mono uppercase tracking-wider mb-4">
                ⚡ Interactive Tool · New
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
                Design Your AI Solution
              </h2>
              <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto leading-relaxed">
                Select the components your product needs. Your architecture diagram, tech stack, team, and cost estimate generate instantly.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up">
            <AISolutionArchitect />
          </FadeIn>
          <div className="text-center mt-8">
            <Link href="/ai-solution-architect" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">
              Open full-screen architect →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Brand Promise */}
      <section className="py-20 bg-primary-dark text-white">
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

      {/* ── Engineering Capability Matrix ────────────────────── */}
      <section className="py-24 bg-[var(--color-bg-light)] border-t border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              Engineering Excellence
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Our Engineering Capability Matrix
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              28 technologies. 8 domains. Hover any row to see how we apply each capability in production.
            </p>
          </div>
          <FadeIn direction="up">
            <CapabilityMatrix />
          </FadeIn>
        </div>
      </section>

      {/* Industry Showcase — Tabbed per vertical */}
      <IndustryShowcase />

      {/* Partner / Recognition Strip */}
      <PartnerStrip />

      {/* Delivery OS / Process */}
      <section className="py-24 bg-primary-dark text-white" data-theme="dark">
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-4">Key Deliverables</h4>
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

      {/* ROI Calculator Section */}
      <section className="py-24 bg-[var(--color-bg-light)] border-t border-[var(--color-border-soft)] relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block">
            ROI Projection
          </span>
          <h2 className="text-4xl font-bold text-[var(--color-primary-dark)]">
            Estimate Your Process Automation Savings
          </h2>
          <p className="text-lg text-[var(--color-text-main)] max-w-2xl mx-auto mt-4 leading-relaxed">
            See how much operational overhead can be recaptured by deploying intelligent software and automated task pipelines.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn direction="up">
            <RoiCalculator />
          </FadeIn>
        </div>
      </section>

      {/* ── Transformation Stories ───────────────────────────── */}
      <section className="py-24 bg-white border-t border-[var(--color-border-soft)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              Before / After
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Transformation Stories
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              Flip each card to see the exact before-and-after across three real engagements.
            </p>
          </div>
          <FadeIn direction="up">
            <TransformationStories />
          </FadeIn>
        </div>
      </section>

      {/* ── Engineering Workflow ─────────────────────────────── */}
      <section className="py-24 bg-[var(--color-bg-light)] border-t border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Engineering Workflow
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              From discovery to hypercare — every step of our delivery process, fully transparent and documented.
            </p>
          </div>
          <FadeIn direction="up">
            <EngineeringWorkflow />
          </FadeIn>
        </div>
      </section>

      {/* ── Live Architecture Visualizer ─────────────────────── */}
      <section className="py-24 bg-white border-t border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              System Design
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Live Architecture Visualizer
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              Hover any node to explore our production-grade, AI-native reference architecture.
            </p>
          </div>
          <FadeIn direction="up">
            <LiveArchitectureVisualizer />
          </FadeIn>
        </div>
      </section>

      {/* ── System Health Dashboard ──────────────────────────── */}
      <section className="py-24 bg-[var(--color-bg-light)] border-t border-[var(--color-border-soft)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
              Reliability
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              System Health Dashboard
            </h2>
            <p className="text-lg text-[var(--color-text-main)] mt-4 leading-relaxed">
              Real-time visibility into every layer of our infrastructure. Always operational.
            </p>
          </div>
          <FadeIn direction="up">
            <SystemHealthDashboard />
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
