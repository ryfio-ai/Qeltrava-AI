"use client";

import React from 'react';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { ClientLogos } from '@/components/ClientLogos';
import { ProductHuntHeroBanner } from '@/components/ui/ProductHuntEmbeds';
import { QeltravaIntelligenceVisual } from '@/components/ui/QeltravaIntelligenceVisual';
import { IndustrialDataFlow } from '@/components/ui/IndustrialDataFlow';
import { BuilderToolsSection } from '@/components/builder-tools/BuilderToolsSection';
import { ArrowRight, Cpu, Zap, Layers, Factory, CheckCircle2, Shield } from 'lucide-react';

export default function HomePage() {
  const differenceSteps = [
    {
      number: "01",
      title: "Understand the operation",
      desc: "We map your workflows, data, constraints and business objectives before deciding what technology belongs in the solution. No code written until the problem is fully understood.",
      deliverables: ["Workflow analysis report", "Data landscape map", "ROI hypothesis matrix"]
    },
    {
      number: "02",
      title: "Build the intelligence",
      desc: "AI models, agents, automation, APIs, software platforms and data systems engineered around the actual business problem in 2-week validation cycles.",
      deliverables: ["Modular software architecture", "AI Agent & RAG pipelines", "Automated test suites"]
    },
    {
      number: "03",
      title: "Measure the outcome",
      desc: "We don't stop at deployment. Systems are monitored, evaluated and continuously improved around measurable business outcomes and operational throughput.",
      deliverables: ["Post-launch telemetry", "Hypercare support", "Continuous model evaluation"]
    }
  ];

  const pillars = [
    {
      title: "AI ENGINEERING",
      subtitle: "AI systems that reason over your business data.",
      icon: Cpu,
      items: [
        "AI Agents",
        "LLM Applications",
        "RAG Systems",
        "Machine Learning",
        "Computer Vision",
        "AI Decision Systems"
      ],
      color: "border-[#CBD5E1] bg-[#FFFFFF]"
    },
    {
      title: "INTELLIGENT AUTOMATION",
      subtitle: "Turn repetitive operations into intelligent workflows.",
      icon: Zap,
      items: [
        "Workflow Automation",
        "Document Intelligence",
        "Process Automation",
        "AI Assistants",
        "Business Automation",
        "API Integrations"
      ],
      color: "border-[#CBD5E1] bg-[#FFFFFF]"
    },
    {
      title: "PRODUCT ENGINEERING",
      subtitle: "From idea to production software.",
      icon: Layers,
      items: [
        "SaaS Platforms",
        "Enterprise Applications",
        "Internal Systems",
        "Web Applications",
        "Mobile Applications",
        "Custom ERP / CRM"
      ],
      color: "border-[#CBD5E1] bg-[#FFFFFF]"
    },
    {
      title: "INDUSTRIAL INTELLIGENCE",
      subtitle: "AI engineered for the physical world.",
      icon: Factory,
      items: [
        "Manufacturing AI",
        "Process Optimization",
        "Quality Intelligence",
        "Predictive Analytics",
        "Production Systems",
        "Industrial Data Platforms"
      ],
      color: "border-[#CBD5E1] bg-[#FFFFFF]"
    }
  ];

  const workflowStages = [
    { number: "01", name: "Understand", desc: "Map current operational and technical landscape, constraints, and business goals." },
    { number: "02", name: "Architect", desc: "Design AI pipelines, data models, security boundaries, and software architecture." },
    { number: "03", name: "Build", desc: "Iterative 2-week engineering sprints ending in production-ready working software." },
    { number: "04", name: "Validate", desc: "Automated test suites, security checks, and real-world data validation." },
    { number: "05", name: "Deploy", desc: "Staged deployment, infrastructure-as-code, and 30-day hypercare support." },
    { number: "06", name: "Improve", desc: "Continuous monitoring, latency tuning, and model accuracy optimization." }
  ];

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans selection:bg-[#E3F2FD] selection:text-[#0D47A1]">
      
      {/* ─── 1. HERO SECTION (#FFFFFF) ────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mb-12">
            
            {/* Product Hunt Announcement Pill */}
            <FadeIn delay={0.02} amount={0}>
              <div className="mb-6 inline-block">
                <ProductHuntHeroBanner postSlug="modliqer" />
              </div>
            </FadeIn>

            {/* Eyebrow */}
            <FadeIn delay={0.06} amount={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest mb-6">
                <span>AI ENGINEERING · SOFTWARE · AUTOMATION</span>
              </div>
            </FadeIn>

            {/* Main Headline with Editorial Serif Emphasis */}
            <FadeIn delay={0.1} amount={0}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0F172A] tracking-tight leading-[1.08] mb-6 font-anek">
                Engineering <span className="font-serif italic font-normal text-[#2196F3]">Intelligence</span> for Real-World Operations.
              </h1>
            </FadeIn>

            {/* Subheadline */}
            <FadeIn delay={0.16} amount={0}>
              <p className="text-lg sm:text-xl md:text-2xl text-[#475569] mb-8 leading-relaxed max-w-3xl font-normal font-anek">
                From AI-powered automation to complete digital platforms, Qeltrava AI builds intelligent systems that understand your operations, work with your data, and create measurable business outcomes.
              </p>
            </FadeIn>

            {/* Action Buttons */}
            <FadeIn delay={0.22} amount={0}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
                <Button href="/book-consultation" variant="primary" className="text-base sm:text-lg px-8 py-4 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl">
                  Build With Qeltrava →
                </Button>
                <Button href="/tools" variant="outline" className="text-base sm:text-lg px-8 py-4 border-[#CBD5E1] text-[#0D47A1] hover:bg-[#E3F2FD] font-semibold rounded-xl">
                  Try Builder Lab
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#0D47A1] hover:text-[#2196F3] hover:underline transition-all"
                >
                  <span>Not sure what you need? → Talk to an AI Engineer</span>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Signature Visual Canvas Component */}
          <FadeIn delay={0.28} amount={0}>
            <QeltravaIntelligenceVisual />
          </FadeIn>
        </div>
      </section>

      {/* ─── 2. PROOF STRIP & LOCATION (#F8FAFC) ──────────────────────────────── */}
      <section className="py-8 bg-[#F8FAFC] border-b border-[#E2E8F0] relative select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono font-semibold text-[#475569]">
            <span className="text-[#0D47A1]">AI ENGINEERING</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>AUTOMATION</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#0D47A1]">PRODUCT DEVELOPMENT</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>DATA SYSTEMS</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#0D47A1]">CLOUD</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>MANUFACTURING</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full whitespace-nowrap font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Built from Coimbatore · Working globally</span>
          </div>
        </div>
        
        <div className="mt-6 border-t border-[#E2E8F0] pt-6">
          <ClientLogos />
        </div>
      </section>

      {/* ─── 3. QELTRAVA BUILDER LAB (#E3F2FD) ────────────── */}
      <section className="py-24 bg-[#E3F2FD] border-b border-[#90CAF9]/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
                <span>QELTRAVA BUILDER LAB</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#0D47A1] tracking-tight font-anek">
                Build <span className="font-serif italic font-normal text-[#2196F3]">Smarter</span> Before You Build Bigger.
              </h2>
              <p className="text-base sm:text-lg text-[#475569] font-sans">
                Free engineering intelligence tools for founders, developers, and product teams. Evaluate AI readiness, plan MVP scope, and generate production architecture briefs.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} direction="up">
            <BuilderToolsSection />
          </FadeIn>
        </div>
      </section>

      {/* ─── 4. THE QELTRAVA DIFFERENCE (#F8FAFC) ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn direction="up">
            <div className="max-w-3xl mb-16">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1] mb-3">
                THE QELTRAVA DIFFERENCE
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight mb-4 font-anek">
                Software is easy to build. <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#2196F3]">Systems that create value are not.</span>
              </h2>
              <p className="text-lg text-[#475569] font-normal">
                We don't start with technology. We start with the problem.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differenceSteps.map((step, idx) => (
              <FadeIn key={step.number} delay={idx * 0.1} direction="up">
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] p-8 rounded-2xl h-full flex flex-col justify-between hover:border-[#2196F3] shadow-xs transition-all duration-300">
                  <div>
                    <div className="text-2xl font-mono font-bold text-[#2196F3] mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-[#0D47A1] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                      {step.desc}
                    </p>
                  </div>
                  
                  <div className="border-t border-[#E2E8F0] pt-4">
                    <div className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider mb-2">
                      Key Deliverables
                    </div>
                    <ul className="space-y-1.5">
                      {step.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2 text-xs text-[#0F172A] font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. CAPABILITIES (4 PILLARS) (#FFFFFF) ────────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1] mb-3">
                ENGINEERING PILLARS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0D47A1] tracking-tight mb-4 font-anek">
                Four Pillars of Qeltrava Engineering
              </h2>
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                Structured capabilities engineered around the exact operational needs of your business.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <FadeIn key={pillar.title} delay={idx * 0.1} direction="up">
                  <div className={`border p-8 rounded-2xl h-full flex flex-col justify-between ${pillar.color} shadow-xs hover:border-[#2196F3] transition-all duration-300`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-mono font-bold text-[#2196F3] uppercase tracking-wider">
                          PILLAR 0{idx + 1}
                        </span>
                        <Icon className="w-6 h-6 text-[#2196F3]" />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-[#0D47A1] mb-2 tracking-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed mb-6 font-medium">
                        {pillar.subtitle}
                      </p>

                      <div className="grid grid-cols-2 gap-2.5 mb-6">
                        {pillar.items.map((item, iIdx) => (
                          <div key={iIdx} className="bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-lg text-xs font-mono text-[#0F172A] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2196F3]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Link 
                      href="/solutions" 
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline tracking-wider uppercase font-mono mt-2"
                    >
                      <span>Explore Pillar Capabilities</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 6. BUILT BY QELTRAVA (PROPRIETARY PRODUCTS) (#F8FAFC) ─────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn direction="up">
            <div className="max-w-3xl mb-16">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1] mb-3">
                BUILT BY QELTRAVA
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight mb-4 font-anek">
                We don't only build for clients. <br />
                <span className="font-serif italic font-normal text-[#2196F3]">We build systems of our own.</span>
              </h2>
              <p className="text-base text-[#475569]">
                Proprietary platforms engineered in-house to solve operational friction at scale.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Product 1: MODLIQ */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-8 flex flex-col justify-between hover:border-[#2196F3] shadow-xs transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    FLAGSHIP PRODUCT · LIVE
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">MODLIQER</span>
                </div>

                <h3 className="text-3xl font-bold text-[#0D47A1] mb-2 tracking-tight">MODLIQ</h3>
                <h4 className="text-base font-semibold text-orange-800 mb-4">AI Process Optimization Copilot</h4>
                <p className="text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                  Turn process data into better operating decisions. Modular ML workflows designed for manufacturing analytics, quality intelligence, and throughput optimization.
                </p>

                {/* Data flow pipeline visual */}
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-[10px] font-mono text-[#0F172A] space-y-2 mb-6">
                  <div className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-1">DATA PROCESSING LOOP</div>
                  <div className="flex flex-wrap items-center gap-2 font-bold">
                    <span className="px-2 py-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded">DATA</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="px-2 py-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded">UNDERSTAND</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="px-2 py-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded">MODEL</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="px-2 py-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded">OPTIMIZE</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="px-2 py-1 bg-orange-50 text-orange-800 rounded border border-orange-200">RECOMMEND</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">ACTION</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/products/modliq" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline font-mono"
              >
                <span>Explore Modliq →</span>
              </Link>
            </div>

            {/* Product 2: STAYSEAT */}
            <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-8 flex flex-col justify-between hover:border-[#2196F3] shadow-xs transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    PROPTECH PLATFORM
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">STAYSEAT</span>
                </div>

                <h3 className="text-3xl font-bold text-[#0D47A1] mb-2 tracking-tight">STAYSEAT</h3>
                <h4 className="text-base font-semibold text-teal-800 mb-4">Accommodation Intelligence</h4>
                <p className="text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                  Discovery, availability and booking — reimagined for modern accommodation. Smart spatial allocation algorithms and verified property workflows.
                </p>

                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] space-y-2 text-xs font-mono text-[#475569] mb-6">
                  <div className="flex justify-between items-center text-[#0F172A] font-bold">
                    <span>Spatial Allocation</span>
                    <span className="text-teal-700">Optimized</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Booking Engine</span>
                    <span>Real-time Sync</span>
                  </div>
                </div>
              </div>

              <Link 
                href="/products/stayseat" 
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline font-mono"
              >
                <span>Explore StaySeat →</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 7. REAL-WORLD ENGINEERING (PROOF / CASE STUDIES) (#FFFFFF) ────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn direction="up">
            <div className="max-w-3xl mb-16">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1] mb-3">
                OPERATIONAL PROOF
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0D47A1] tracking-tight mb-4 font-anek">
                Built for real operations.
              </h2>
              <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
                From EV infrastructure to education platforms and digital systems, we engineer software that operates beyond the demo.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Proof 1: eDrift */}
            <FadeIn delay={0.1} direction="up">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl h-full flex flex-col justify-between hover:border-[#2196F3] transition-all duration-300 shadow-xs">
                <div>
                  <div className="text-xs font-mono font-bold text-[#2196F3] uppercase tracking-wider mb-2">
                    ELECTRIC MOBILITY
                  </div>
                  <h3 className="text-2xl font-bold text-[#0D47A1] mb-2">eDrift Electric</h3>
                  <h4 className="text-xs font-mono text-[#64748B] mb-4">EV Intelligence & Digital Systems</h4>
                  <p className="text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                    Engineering software systems for electric mobility operations, telemetry management, and charging network integration.
                  </p>
                </div>

                <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline">
                  <span>View Case Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </FadeIn>

            {/* Proof 2: ThiranOli */}
            <FadeIn delay={0.2} direction="up">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl h-full flex flex-col justify-between hover:border-[#2196F3] transition-all duration-300 shadow-xs">
                <div>
                  <div className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider mb-2">
                    EDTECH PLATFORM
                  </div>
                  <h3 className="text-2xl font-bold text-[#0D47A1] mb-2">ThiranOli</h3>
                  <h4 className="text-xs font-mono text-[#64748B] mb-4">Education Infrastructure</h4>
                  <p className="text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                    Building connected digital infrastructure and scalable web platforms for regional education delivery and student tracking.
                  </p>
                </div>

                <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline">
                  <span>View Case Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </FadeIn>

            {/* Proof 3: Tamizh Tech */}
            <FadeIn delay={0.3} direction="up">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-8 rounded-2xl h-full flex flex-col justify-between hover:border-[#2196F3] transition-all duration-300 shadow-xs">
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-700 uppercase tracking-wider mb-2">
                    ROBOTICS & MEDIA
                  </div>
                  <h3 className="text-2xl font-bold text-[#0D47A1] mb-2">Tamizh Tech</h3>
                  <h4 className="text-xs font-mono text-[#64748B] mb-4">Operational Systems</h4>
                  <p className="text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                    Engineering content and operational systems for a leading robotics and technology media organization.
                  </p>
                </div>

                <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline">
                  <span>View Case Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ─── 8. INDUSTRIAL INTELLIGENCE / MANUFACTURING (#F8FAFC) ──────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn direction="up">
            <div className="max-w-3xl mb-12">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1] mb-3">
                STRATEGIC FOCUS · INDUSTRIAL AI
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight leading-tight mb-6 font-anek">
                The factory is becoming <span className="font-serif italic font-normal text-[#2196F3]">intelligent.</span>
              </h2>
              <p className="text-lg text-[#475569] leading-relaxed mb-6 font-normal">
                Every production line generates data — machine data, quality data, production data, maintenance data, operator data. The opportunity isn't collecting more data. <strong className="text-[#0F172A]">It's turning that data into better decisions.</strong>
              </p>
            </div>
          </FadeIn>

          {/* Interactive Industrial Pipeline Visual */}
          <FadeIn delay={0.15} direction="up">
            <div className="mb-8">
              <IndustrialDataFlow />
            </div>
          </FadeIn>

          <FadeIn delay={0.25} direction="up">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#FFFFFF] border border-[#E2E8F0] p-6 rounded-2xl shadow-xs">
              <div>
                <h4 className="text-base font-bold text-[#0D47A1]">Qeltrava Industrial Intelligence Solutions</h4>
                <p className="text-xs text-[#475569]">Custom ML, OEE optimization, and sensor data pipelines for manufacturing leaders.</p>
              </div>
              <Button href="/industries/manufacturing" variant="primary" className="bg-[#2196F3] hover:bg-[#1976D2] text-white px-6 py-3 text-xs font-bold font-mono rounded-xl">
                Explore Manufacturing AI →
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 9. PHILOSOPHY: AI-LED. HUMAN-ACCOUNTABLE. (#FFFFFF) ──────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn direction="up">
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1] mb-4">
              BRAND PHILOSOPHY
            </div>
            
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.1] mb-8 max-w-4xl font-anek">
              AI-Led. <br />
              <span className="font-serif italic font-normal text-[#2196F3]">
                Human-Accountable.
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start border-t border-[#E2E8F0] pt-8">
              <div className="space-y-3 font-mono text-sm sm:text-base font-bold text-[#475569]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#2196F3]" />
                  <span>AI can generate.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  <span>AI can predict.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  <span>AI can automate.</span>
                </div>
                <div className="flex items-center gap-3 text-[#0D47A1] text-lg pt-2 border-t border-[#E2E8F0]">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <span>But humans remain accountable.</span>
                </div>
              </div>

              <div className="text-base text-[#475569] leading-relaxed font-sans space-y-4">
                <p>
                  Every intelligent system we build has explicit human oversight, measurable evaluation criteria, strict security boundaries, and clear operational ownership.
                </p>
                <p className="text-xs font-mono text-[#64748B]">
                  // Quiet Confidence · Enterprise Precision · Radical Transparency
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── 10. HOW WE WORK (METHODOLOGY) (#F8FAFC) ─────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <FadeIn direction="up">
            <div className="max-w-3xl mb-16">
              <div className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1] mb-3">
                ENGINEERING METHODOLOGY
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0D47A1] tracking-tight mb-4 font-anek">
                How We Work
              </h2>
              <p className="text-base text-[#475569]">
                Six disciplined steps from operational diagnosis to continuous evaluation.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {workflowStages.map((stage, idx) => (
              <FadeIn key={stage.number} delay={idx * 0.08} direction="up">
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] p-5 rounded-xl h-full flex flex-col justify-between hover:border-[#2196F3] transition-all shadow-xs">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#2196F3] mb-2">{stage.number}</div>
                    <h4 className="text-sm font-bold text-[#0D47A1] mb-2">{stage.name}</h4>
                    <p className="text-[11px] text-[#475569] leading-normal font-sans">{stage.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. FINAL HIGH-CONVERTING CTA (#E3F2FD) ──────────────────────────── */}
      <section className="py-24 bg-[#E3F2FD] border-b border-[#90CAF9]/40 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest mb-6 shadow-xs">
              <span>START YOUR SYSTEM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight mb-6 font-anek">
              YOUR NEXT SYSTEM SHOULD DO MORE THAN WORK. <br />
              <span className="font-serif italic font-normal text-[#2196F3]">
                IT SHOULD THINK.
              </span>
            </h2>

            <p className="text-lg text-[#475569] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Ready to engineer intelligence into your business operations? Book a discovery call with a senior Qeltrava engineer.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/book-consultation" variant="primary" className="text-lg px-9 py-4 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl w-full sm:w-auto">
                Talk to Qeltrava →
              </Button>
              <Button href="/solutions" variant="outline" className="text-lg px-8 py-4 border-[#CBD5E1] text-[#0D47A1] bg-[#FFFFFF] hover:bg-[#F8FAFC] font-semibold rounded-xl w-full sm:w-auto">
                View Solutions
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
