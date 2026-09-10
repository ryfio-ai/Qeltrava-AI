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
import { ArrowRight, Cpu, Zap, Layers, Factory, CheckCircle2, Shield, Activity, Database, Wrench } from 'lucide-react';

export default function HomePage() {
  const coreSolutions = [
    {
      number: "01",
      idTag: "QELTRAVA / AI-01",
      title: "AI SOLUTIONS",
      subtitle: "Machine learning, computer vision, and decision models built for operational workflows.",
      icon: Cpu,
      items: [
        "Predictive Analytics & Forecasting",
        "Machine Learning Optimization",
        "Computer Vision & Quality Inspection",
        "AI Copilots & Operational Assistants",
        "Decision Intelligence Engines"
      ]
    },
    {
      number: "02",
      idTag: "QELTRAVA / MFG-02",
      title: "MANUFACTURING INTELLIGENCE",
      subtitle: "Turn machine sensor telemetry and production logs into process setpoints and capability math.",
      icon: Factory,
      items: [
        "Process Setpoint Optimization",
        "Quality Intelligence & Cp/Cpk Math",
        "Production Analytics & Bottleneck Parsing",
        "Root-Cause Analysis & Defect Reduction",
        "Predictive Maintenance & Health Scores"
      ]
    },
    {
      number: "03",
      idTag: "QELTRAVA / AUTO-03",
      title: "INTELLIGENT AUTOMATION",
      subtitle: "Automate complex, repetitive operational workflows with verified AI agents.",
      icon: Zap,
      items: [
        "Workflow Automation Engines",
        "Autonomous AI Agents",
        "Document Intelligence & Data Extraction",
        "Industrial & Enterprise System Integration",
        "Operational Action Automation"
      ]
    },
    {
      number: "04",
      idTag: "QELTRAVA / SOFT-04",
      title: "DIGITAL MANUFACTURING SOFTWARE",
      subtitle: "Custom digital platforms, internal tools, and SaaS engineered for industrial scale.",
      icon: Layers,
      items: [
        "Custom Software & Enterprise Platforms",
        "Industrial SaaS & Operational Tooling",
        "Production Data Systems & Storage",
        "Legacy System Modernization",
        "Custom Engineering Applications"
      ]
    }
  ];

  const howAiHelps = [
    {
      domain: "QUALITY",
      verbs: "Detect → Understand → Improve",
      desc: "Identify defects early, analyze root causes, and calculate deterministic Cp/Cpk capability math."
    },
    {
      domain: "PROCESS",
      verbs: "Analyze → Optimize → Validate",
      desc: "Evaluate machine sensor parameters, discover optimal operating setpoints, and validate trial SOPs."
    },
    {
      domain: "PRODUCTION",
      verbs: "Monitor → Predict → Act",
      desc: "Track line throughput, predict production bottlenecks, and automate operational scheduling."
    },
    {
      domain: "MAINTENANCE",
      verbs: "Detect → Predict → Prevent",
      desc: "Monitor equipment vibration, temperature, and wear telemetry to prevent unplanned downtime."
    },
    {
      domain: "OPERATIONS",
      verbs: "Connect → Automate → Decide",
      desc: "Link fragmented factory databases, automate document parsing, and give managers instant decision support."
    }
  ];

  const caseStudies = [
    { name: "Modliqer AI Platform", tag: "NO-CODE MANUFACTURING ML", desc: "No-code AutoML & quality capability platform engineered for factories, teachers, and researchers." },
    { name: "eDrift Energy Intelligence", tag: "INDUSTRIAL ENERGY OPTIMIZATION", desc: "Real-time energy consumption telemetry & peak-load prediction engine for heavy industrial plants." },
    { name: "Tamizh Tech Systems", tag: "AUTOMATED QUALITY INSPECTION", desc: "Computer vision quality inspection pipeline detecting surface micro-defects at production speed." },
    { name: "ThiranOli Operations", tag: "WORKFLOW AUTOMATION", desc: "Intelligent document parsing and ERP integration pipeline automating supplier compliance records." }
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
      
      {/* ─── 01. HERO SECTION (#FFFFFF) ────────────────────────────────────────── */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (55% / 7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Product Hunt Announcement Bar */}
              <FadeIn delay={0.02} amount={0}>
                <div className="mb-4 inline-block">
                  <ProductHuntHeroBanner postSlug="modliqer" />
                </div>
              </FadeIn>

              {/* Eyebrow */}
              <FadeIn delay={0.06} amount={0}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest mb-5 self-start">
                  <span>FROM AI TO INDUSTRIAL IMPACT</span>
                </div>
              </FadeIn>

              {/* Main Headline */}
              <FadeIn delay={0.1} amount={0}>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-[#0F172A] tracking-tight leading-[1.06] mb-5 font-anek">
                  Engineering <span className="font-serif italic font-normal text-[#2196F3]">AI</span> for Manufacturing.
                </h1>
              </FadeIn>

              {/* Direct Supporting Copy */}
              <FadeIn delay={0.16} amount={0}>
                <p className="text-base sm:text-lg text-[#475569] mb-7 leading-relaxed font-normal font-anek max-w-2xl">
                  We build intelligent software and AI solutions that help manufacturers improve quality, optimize processes, automate operations, and make better decisions.
                </p>
              </FadeIn>

              {/* Action Buttons */}
              <FadeIn delay={0.22} amount={0}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-5">
                  <Magnetic strength={6}>
                    <Button href="/book-consultation" variant="primary" className="w-full sm:w-auto text-base px-7 py-3.5 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl">
                      Talk to an AI Engineer →
                    </Button>
                  </Magnetic>
                  <Button href="/solutions" variant="outline" className="text-base px-7 py-3.5 border-[#CBD5E1] text-[#0D47A1] hover:bg-[#E3F2FD] font-semibold rounded-xl">
                    Explore Manufacturing Solutions →
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-6">
                  <Link 
                    href="/solutions/ai-readiness" 
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#0D47A1] hover:text-[#2196F3] hover:underline transition-all"
                  >
                    <span>Not sure where AI fits? → Start with our AI Readiness Assessment</span>
                  </Link>
                </div>

                {/* Supporting Micro-Positioning Banner */}
                <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-3 text-xs font-mono font-semibold text-[#64748B]">
                  <span className="text-[#0D47A1]">AI-Led</span>
                  <span>·</span>
                  <span className="text-[#0D47A1]">Manufacturing-Focused</span>
                  <span>·</span>
                  <span className="text-[#0D47A1]">Human-Accountable</span>
                  <span>·</span>
                  <span className="text-[#0D47A1]">Outcome-Driven</span>
                </div>
              </FadeIn>
            </div>

            {/* Right Column (45% / 5 cols) - Single Manufacturing Visual */}
            <div className="lg:col-span-5 w-full">
              <FadeIn delay={0.28} amount={0}>
                <QeltravaIntelligenceVisual />
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ─── BELOW HERO CAPABILITY STRIP (#F8FAFC) ──────────────────────────── */}
      <section className="py-6 bg-[#F8FAFC] border-b border-[#E2E8F0] relative select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono font-semibold text-[#475569]">
            <span className="text-[#0D47A1]">AI SOLUTIONS</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>PROCESS OPTIMIZATION</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#0D47A1]">QUALITY INTELLIGENCE</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>PRODUCTION ANALYTICS</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#0D47A1]">INTELLIGENT AUTOMATION</span>
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

      {/* ─── 02. THE PROBLEM & EDITORIAL STATEMENT (#FFFFFF) ─────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-6">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-widest">
              THE MANUFACTURING CHALLENGE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight font-anek mt-2">
              Manufacturing already has the data. <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#2196F3]">The challenge is turning it into better decisions.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#475569] font-sans max-w-3xl mx-auto pt-4">
              Production data · Quality logs · Machine sensors · Process limits · Operational logs
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-mono text-[#0D47A1] font-bold bg-[#E3F2FD] px-4 py-2 rounded-full border border-[#90CAF9] mt-2">
              <span>Production Data → AI → Insight · Decision · Action</span>
            </div>
            <p className="text-xs font-mono font-semibold text-[#64748B] pt-4">
              Engineering Intelligence for Real-World Operations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── 03. CORE QELTRAVA OFFERINGS (4 SOLUTION AREAS) (#FFFFFF) ─────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                  CORE SOLUTIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek mt-2">
                  Four Primary Areas of Manufacturing AI
                </h2>
              </div>
              <p className="text-sm text-[#475569] max-w-md font-sans">
                We build software where software is enough, and apply AI where intelligence creates measurable operational value.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-12">
            {coreSolutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <FadeIn key={sol.number} delay={idx * 0.08} direction="up">
                  <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2196F3] p-8 md:p-10 rounded-2xl shadow-xs transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-mono font-bold text-[#2196F3]">{sol.number}</span>
                        <span className="text-xs font-mono font-bold text-[#64748B] uppercase tracking-wider">{sol.idTag}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#0D47A1] font-anek flex items-center gap-3">
                        <Icon className="w-6 h-6 text-[#2196F3]" />
                        <span>{sol.title}</span>
                      </h3>
                      <p className="text-sm text-[#475569] leading-relaxed font-sans font-medium">
                        {sol.subtitle}
                      </p>
                    </div>

                    <div className="lg:col-span-7 bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl">
                      <div className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider mb-3">
                        KEY CAPABILITIES & SCOPE
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans font-bold text-[#0F172A]">
                        {sol.items.map((item, itemIdx) => (
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

      {/* ─── 04. HOW AI HELPS MANUFACTURING (#F8FAFC) ─────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                DOMAIN IMPACT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                Where AI Creates Measurable Value in Manufacturing
              </h2>
              <p className="text-base text-[#475569] font-sans">
                Clear operational workflows designed to eliminate plant friction and improve decision accuracy.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {howAiHelps.map((item, idx) => (
              <FadeIn key={item.domain} delay={idx * 0.06} direction="up">
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2196F3] p-6 rounded-2xl shadow-xs h-full flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#2196F3] block mb-1">{item.domain}</span>
                    <div className="text-[11px] font-mono font-bold text-[#0D47A1] mb-3">{item.verbs}</div>
                    <p className="text-xs text-[#475569] leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[9px] font-mono text-[#64748B] uppercase font-bold">
                    DOMAIN IMPACT 0{idx + 1}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 05. FLAGSHIP PRODUCT: MODLIQER (#FFFFFF) ─────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                PROPRIETARY MANUFACTURING PRODUCT
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                Turn manufacturing data into <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#2196F3]">better engineering decisions.</span>
              </h2>
              <p className="text-base text-[#475569]">
                Modliqer is our no-code manufacturing intelligence and AutoML platform built specifically for plant engineers, quality managers, teachers, and researchers.
              </p>
            </div>
          </FadeIn>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 md:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                  FLAGSHIP PRODUCT · LIVE
                </span>
                <span className="text-xs font-mono text-[#64748B]">MODLIQER</span>
              </div>

              <h3 className="text-3xl font-bold text-[#0D47A1] font-anek">MODLIQER</h3>
              <p className="text-sm text-[#475569] leading-relaxed font-sans font-medium">
                Upload CSV/Excel production logs, run visual EDA, train AutoML models, calculate SPC math (Cp/Cpk), and export buyer-ready Quality Passports without writing code.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono font-bold text-[#0F172A]">
                <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E2E8F0] text-center">ANALYZE</div>
                <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E2E8F0] text-center">OPTIMIZE</div>
                <div className="bg-[#FFFFFF] p-3 rounded-lg border border-[#E2E8F0] text-center">IMPROVE</div>
                <div className="bg-[#E3F2FD] p-3 rounded-lg border border-[#90CAF9] text-center text-[#0D47A1]">DECIDE</div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link 
                  href="/products/modliq" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline font-mono"
                >
                  <span>Explore Modliqer Product Page →</span>
                </Link>
                <a
                  href="https://modliq-io.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2196F3] hover:text-[#0D47A1] hover:underline font-mono bg-[#FFFFFF] px-4 py-2 rounded-lg border border-[#90CAF9] shadow-xs"
                >
                  <span>Launch Platform (modliq-io.vercel.app) ↗</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#CBD5E1] p-6 rounded-xl space-y-4">
              <div className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-wider">
                PRODUCT CAPABILITIES
              </div>
              <ul className="space-y-2 text-xs font-sans font-bold text-[#0F172A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>No-Code AutoML & Regression Leaderboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>SPC Math Engine (Cp, Cpk, Pp, Ppk, Control Limits)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Buyer-Ready Quality Passport & PPAP Documents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Interactive Classroom & Research Learning Mode</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06. ENGINEERING & TECHNICAL CREDIBILITY (#F8FAFC) ────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                TECHNICAL CREDIBILITY & METHODOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                Engineering Discipline Behind Our Systems
              </h2>
              <p className="text-base text-[#475569] font-sans">
                Predictable 2-week sprint cadence with clear technical deliverables at every stage.
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
        </div>
      </section>

      {/* ─── 07. VERIFIED CASE STUDIES (#FFFFFF) ────────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                  VERIFIED INITIATIVES & CASE STUDIES
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek mt-2">
                  Proven Systems & Product Engineering
                </h2>
              </div>
              <Link 
                href="/case-studies" 
                className="text-xs font-mono font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline"
              >
                <span>View All Case Studies →</span>
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs, idx) => (
              <FadeIn key={cs.name} delay={idx * 0.08} direction="up">
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#2196F3] p-8 rounded-2xl shadow-xs transition-all duration-300 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#2196F3] uppercase tracking-wider block mb-2">{cs.tag}</span>
                    <h3 className="text-xl font-bold text-[#0D47A1] font-anek mb-2">{cs.name}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed font-sans">{cs.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#0D47A1] font-bold">
                    <span>VERIFIED IMPLEMENTATION</span>
                    <ArrowRight className="w-4 h-4 text-[#2196F3]" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 08. FINAL CALL TO ACTION (#E3F2FD) ─────────────────────────────── */}
      <section className="py-24 bg-[#E3F2FD] border-b border-[#90CAF9]/40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center space-y-6">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
              START A CONVERSATION
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#0D47A1] font-anek">
              Have a manufacturing problem worth solving with AI?
            </h2>
            <p className="text-base sm:text-lg text-[#475569] font-sans max-w-xl mx-auto">
              Talk directly with an AI engineer. No sales pitch — just a practical evaluation of your manufacturing data and operations.
            </p>
            <div className="pt-4">
              <Magnetic strength={6}>
                <Button href="/book-consultation" variant="primary" className="text-base px-8 py-4 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl inline-flex items-center gap-2">
                  <span>Talk to an AI Engineer →</span>
                </Button>
              </Magnetic>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
