"use client";

import React from 'react';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Magnetic } from '@/components/motion/Magnetic';
import { ClientLogos } from '@/components/ClientLogos';
import { ProductHuntHeroBanner } from '@/components/ui/ProductHuntEmbeds';
import { QeltravaIntelligenceVisual } from '@/components/ui/QeltravaIntelligenceVisual';
import { QeltravaManufacturingSignal } from '@/components/ui/QeltravaManufacturingSignal';
import { BuilderToolsSection } from '@/components/builder-tools/BuilderToolsSection';
import { ArrowRight, Cpu, Zap, Layers, Factory, CheckCircle2, Shield, Activity, Database } from 'lucide-react';

export default function HomePage() {
  const capabilities = [
    {
      number: "01",
      idTag: "QELTRAVA / AI-01",
      title: "AI ENGINEERING",
      subtitle: "AI systems that reason over your business data.",
      icon: Cpu,
      items: [
        "AI Agents & Autonomous Pipelines",
        "LLM Applications & Domain Models",
        "RAG Systems & Vector Search",
        "Machine Learning Optimization",
        "Computer Vision & Inspection",
        "AI Decision Support Systems"
      ]
    },
    {
      number: "02",
      idTag: "QELTRAVA / AUTO-02",
      title: "INTELLIGENT AUTOMATION",
      subtitle: "Turn repetitive operations into executable workflows.",
      icon: Zap,
      items: [
        "Workflow Automation Engines",
        "Document Intelligence & Parsing",
        "Process Automation & Verification",
        "AI Operational Assistants",
        "Business Automation Systems",
        "Enterprise API Integrations"
      ]
    },
    {
      number: "03",
      idTag: "QELTRAVA / PROD-03",
      title: "PRODUCT ENGINEERING",
      subtitle: "From idea to production software.",
      icon: Layers,
      items: [
        "SaaS Platforms & Web Applications",
        "Enterprise Core Modernization",
        "Internal Systems & Tooling",
        "Mobile Applications",
        "Custom ERP / CRM Infrastructure",
        "Cloud Architecture & DevOps"
      ]
    },
    {
      number: "04",
      idTag: "QELTRAVA / IND-04",
      title: "INDUSTRIAL INTELLIGENCE",
      subtitle: "AI engineered for the physical world.",
      icon: Factory,
      items: [
        "Manufacturing AI & AutoML",
        "Process Setpoint Optimization",
        "Quality & SPC Math (Cp/Cpk)",
        "Predictive Maintenance Systems",
        "Factory Production Control",
        "Industrial Data Platforms"
      ]
    }
  ];

  const workflowStages = [
    { number: "01", name: "Understand", desc: "Map current operational landscape, constraints, and business goals before writing code." },
    { number: "02", name: "Architect", desc: "Design AI pipelines, data models, security boundaries, and modular software architecture." },
    { number: "03", name: "Build", desc: "Iterative 2-week engineering sprints ending in production-ready working software." },
    { number: "04", name: "Validate", desc: "Automated test suites, mathematical proof checks, and real-world data validation." },
    { number: "05", name: "Deploy", desc: "Staged deployment, infrastructure-as-code, and 30-day hypercare support." },
    { number: "06", name: "Improve", desc: "Continuous telemetry monitoring, latency tuning, and model accuracy optimization." }
  ];

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans selection:bg-[#E3F2FD] selection:text-[#0D47A1]">
      
      {/* ─── 1. HERO SECTION (#FFFFFF) ────────────────────────────────────────── */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (Content - 48% / 6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Product Hunt Announcement Pill */}
              <FadeIn delay={0.02} amount={0}>
                <div className="mb-5 inline-block">
                  <ProductHuntHeroBanner postSlug="modliqer" />
                </div>
              </FadeIn>

              {/* Eyebrow */}
              <FadeIn delay={0.06} amount={0}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest mb-5 self-start">
                  <span>FROM INTELLIGENCE TO EXECUTION</span>
                </div>
              </FadeIn>

              {/* Main Headline with Editorial Serif Emphasis */}
              <FadeIn delay={0.1} amount={0}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.08] mb-5 font-anek">
                  Engineering <span className="font-serif italic font-normal text-[#2196F3]">Intelligence.</span> <br className="hidden sm:inline" />
                  for Real-World Operations.
                </h1>
              </FadeIn>

              {/* Concise Supporting Copy */}
              <FadeIn delay={0.16} amount={0}>
                <p className="text-base sm:text-lg text-[#475569] mb-7 leading-relaxed font-normal font-anek max-w-xl">
                  We engineer AI-powered software, automation and intelligent systems for real-world operations.
                </p>
              </FadeIn>

              {/* Action Buttons */}
              <FadeIn delay={0.22} amount={0}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-5">
                  <Magnetic strength={6}>
                    <Button href="/book-consultation" variant="primary" className="w-full sm:w-auto text-base px-7 py-3.5 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl">
                      Start a Project →
                    </Button>
                  </Magnetic>
                  <Button href="/tools" variant="outline" className="text-base px-7 py-3.5 border-[#CBD5E1] text-[#0D47A1] hover:bg-[#E3F2FD] font-semibold rounded-xl">
                    Explore Our Engineering →
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#0D47A1] hover:text-[#2196F3] hover:underline transition-all"
                  >
                    <span>Not sure what to build? → Talk to an AI Engineer</span>
                  </Link>
                </div>

                {/* Engineering Accountability Banner */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-3 text-xs font-mono font-semibold text-[#64748B]">
                  <span className="text-[#0D47A1]">AI-Led</span>
                  <span>·</span>
                  <span className="text-[#0D47A1]">Human-Accountable</span>
                  <span>·</span>
                  <span className="text-[#0D47A1]">Outcome-Driven</span>
                </div>
              </FadeIn>
            </div>

            {/* Right Column (Qeltrava Intelligence Field Visual - 52% / 6 cols) */}
            <div className="lg:col-span-6 w-full">
              <FadeIn delay={0.28} amount={0}>
                <QeltravaIntelligenceVisual />
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. PROOF STRIP & LOCATION (#F8FAFC) ──────────────────────────────── */}
      <section className="py-7 bg-[#F8FAFC] border-b border-[#E2E8F0] relative select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono font-semibold text-[#475569]">
            <span className="text-[#0D47A1]">AI ENGINEERING</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>INTELLIGENT AUTOMATION</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#0D47A1]">PRODUCT ENGINEERING</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>INDUSTRIAL INTELLIGENCE</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#0D47A1]">MANUFACTURING SOFTWARE</span>
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

      {/* ─── 3. EDITORIAL BRAND TRANSITION STATEMENT (#FFFFFF) ────────────────── */}
      <section className="py-20 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-4">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-widest">
              QELTRAVA PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight font-anek mt-2">
              Software can digitize a process. <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#2196F3]">Intelligence can change how the process works.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#475569] font-sans max-w-2xl mx-auto pt-4">
              We don't add AI because it is fashionable. We engineer intelligence where it creates measurable operational throughput and real business value.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── 4. NUMBERED CAPABILITIES SYSTEM (#FFFFFF) ───────────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                  SYSTEM CAPABILITIES
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek mt-2">
                  Four Pillars of Qeltrava Engineering
                </h2>
              </div>
              <p className="text-sm text-[#475569] max-w-md font-sans">
                Structured capabilities engineered around the exact operational needs of your business.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-12">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <FadeIn key={cap.number} delay={idx * 0.08} direction="up">
                  <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2196F3] p-8 md:p-10 rounded-2xl shadow-xs transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-mono font-bold text-[#2196F3]">{cap.number}</span>
                        <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">{cap.idTag}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0D47A1] font-anek flex items-center gap-3">
                        <Icon className="w-6 h-6 text-[#2196F3]" />
                        <span>{cap.title}</span>
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed font-sans font-medium">
                        {cap.subtitle}
                      </p>
                    </div>

                    <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl">
                      <div className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider mb-3">
                        CORE DELIVERABLES & TECHNICAL SCOPE
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans font-bold text-[#0F172A]">
                        {cap.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-2 bg-[#FFFFFF] p-3 rounded-lg border border-[#E2E8F0]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. SIGNATURE INDUSTRIAL MANUFACTURING PIPELINE (#F8FAFC) ────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                05 / INDUSTRIAL MANUFACTURING PIPELINE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                From Machine Sensor Telemetry to Buyer-Ready Quality Passports.
              </h2>
              <p className="text-base text-[#475569] font-sans">
                Our signature industrial signal engine converts factory logs, machine sensor databases, and quality inspection records into optimization setpoints and statistical proof.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.12} direction="up">
            <QeltravaManufacturingSignal />
          </FadeIn>
        </div>
      </section>

      {/* ─── 6. QELTRAVA BUILDER LAB WORKSTATION (#E3F2FD) ───────────────────── */}
      <section className="py-24 bg-[#E3F2FD] border-b border-[#90CAF9]/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
                <span>QELTRAVA BUILDER LAB WORKSTATION</span>
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

      {/* ─── 7. PROPRIETARY PRODUCT SUITE (#FFFFFF) ─────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                PROPRIETARY PRODUCT SUITE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                We don't only build for clients. <br />
                <span className="font-serif italic font-normal text-[#2196F3]">We build platforms of our own.</span>
              </h2>
              <p className="text-base text-[#475569]">
                In-house software engineered to eliminate operational friction at scale.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Product 1: MODLIQER */}
            <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-8 flex flex-col justify-between hover:border-[#2196F3] shadow-xs transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    01 / FLAGSHIP PRODUCT · LIVE
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">MODLIQER</span>
                </div>

                <h3 className="text-3xl font-bold text-[#0D47A1] mb-2 tracking-tight">MODLIQER</h3>
                <h4 className="text-base font-semibold text-orange-800 mb-4">No-Code Manufacturing Intelligence & ML Platform</h4>
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

              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/products/modliq" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline font-mono"
                >
                  <span>Explore Modliqer →</span>
                </Link>
                <a
                  href="https://modliq-io.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2196F3] hover:text-[#0D47A1] hover:underline font-mono bg-[#E3F2FD] px-3 py-1.5 rounded-lg border border-[#90CAF9]"
                >
                  <span>Launch Platform ↗</span>
                </a>
              </div>
            </div>

            {/* Product 2: STAYSEAT */}
            <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-8 flex flex-col justify-between hover:border-[#2196F3] shadow-xs transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    02 / PROPTECH PLATFORM
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">STAYSEAT</span>
                </div>

                <h3 className="text-3xl font-bold text-[#0D47A1] mb-2 tracking-tight">STAYSEAT</h3>
                <h4 className="text-base font-semibold text-teal-800 mb-4">Accommodation Intelligence</h4>
                <p className="text-sm text-[#475569] leading-relaxed mb-6 font-sans">
                  Discovery, availability and booking — reimagined for modern accommodation. Smart spatial allocation algorithms and verified property workflows.
                </p>

                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-[10px] font-mono text-[#0F172A] space-y-2 mb-6">
                  <div className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-1">PLATFORM ENGINE</div>
                  <div className="flex flex-wrap items-center gap-2 font-bold">
                    <span className="px-2 py-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded">SEARCH</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="px-2 py-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded">ALLOCATE</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="px-2 py-1 bg-[#FFFFFF] border border-[#E2E8F0] rounded">VERIFY</span>
                    <span className="text-[#94A3B8]">→</span>
                    <span className="px-2 py-1 bg-teal-50 text-teal-800 rounded border border-teal-200">BOOK</span>
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

      {/* ─── 8. 7-STAGE ENGINEERING METHODOLOGY (#F8FAFC) ───────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                7-STAGE METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                How We Engineer Systems
              </h2>
              <p className="text-base text-[#475569] font-sans">
                Predictable, 2-week sprint cadence with clear technical deliverables at every stage.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowStages.map((stage, idx) => (
              <FadeIn key={stage.number} delay={idx * 0.06} direction="up">
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2196F3] p-6 rounded-2xl shadow-xs transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#2196F3]">{stage.number}</span>
                    <h3 className="text-lg font-bold text-[#0D47A1] mt-1 mb-2 font-anek">{stage.name}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed font-sans">{stage.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-[#E2E8F0] mt-4 text-[10px] font-mono text-[#64748B] font-semibold">
                    STAGE {stage.number} DELIVERABLE
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Final Call to Action Box */}
          <FadeIn delay={0.2} direction="up">
            <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto space-y-6 shadow-xs">
              <h3 className="text-2xl sm:text-4xl font-bold text-[#0D47A1] font-anek">
                Ready to engineer intelligence for your operations?
              </h3>
              <p className="text-base text-[#475569] font-sans max-w-xl mx-auto">
                Talk directly with an AI engineer. No sales pitch, just practical discussion about your technical landscape.
              </p>
              <div className="pt-2">
                <Magnetic strength={6}>
                  <Button href="/book-consultation" variant="primary" className="text-base px-8 py-4 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl inline-flex items-center gap-2">
                    <span>Start a Project →</span>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

    </main>
  );
}
