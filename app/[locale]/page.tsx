"use client";

import React from 'react';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Magnetic } from '@/components/motion/Magnetic';
import { ClientLogos } from '@/components/ClientLogos';
import { ManufacturingAIMap } from '@/components/home/ManufacturingAIMap';
import { ArrowRight, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function HomePage() {
  // 03 WHAT WE DO — 5 Editorial Solution Rows
  const editorialSolutions = [
    {
      number: "01",
      title: "AI SOLUTIONS",
      desc: "Machine learning, computer vision, and decision intelligence models built directly into manufacturing workflows.",
      tags: ["Predictive Analytics", "Computer Vision", "Machine Learning", "AI Copilots", "Decision Intelligence"]
    },
    {
      number: "02",
      title: "MANUFACTURING INTELLIGENCE",
      desc: "Turn machine sensor telemetry and production logs into process setpoints, capability math, and defect reduction.",
      tags: ["Quality Intelligence", "Process Optimization", "Production Analytics", "Root-Cause Analysis", "Predictive Maintenance"]
    },
    {
      number: "03",
      title: "INTELLIGENT AUTOMATION",
      desc: "Automate complex, repetitive operational workflows with verified autonomous AI agents and enterprise integrations.",
      tags: ["Workflow Automation", "AI Agents", "Document Intelligence", "System Integration", "Operational Automation"]
    },
    {
      number: "04",
      title: "DIGITAL MANUFACTURING SOFTWARE",
      desc: "Custom digital platforms, internal operational tooling, and enterprise industrial SaaS built for scale.",
      tags: ["Industrial SaaS", "Data Platforms", "Custom Software", "Legacy Modernization", "Engineering Apps"]
    },
    {
      number: "05",
      title: "PRODUCT COMPLIANCE",
      desc: "BIS / ISI Compliance & Certification Support: Helping manufacturers identify applicable Indian Standards, assess gaps, prepare technical documentation, and become certification-ready.",
      tags: ["Indian Standard ID", "Testing Requirements", "Technical Documentation", "Factory Readiness", "Pre-Certification Audit"],
      href: "/services/bis-isi-compliance",
      ctaText: "Explore Compliance Services →"
    }
  ];

  // 04 WHERE AI CREATES VALUE — Domain Impact Matrix
  const domainImpact = [
    { domain: "QUALITY", verbs: "Detect → Understand → Improve", desc: "Identify defects early, analyze root causes, and calculate deterministic Cp/Cpk capability math." },
    { domain: "PROCESS", verbs: "Analyze → Optimize → Validate", desc: "Evaluate machine sensor parameters, discover optimal operating setpoints, and validate trial SOPs." },
    { domain: "PRODUCTION", verbs: "Monitor → Predict → Act", desc: "Track line throughput, predict production bottlenecks, and automate operational scheduling." },
    { domain: "MAINTENANCE", verbs: "Detect → Predict → Prevent", desc: "Monitor equipment vibration, temperature, and wear telemetry to prevent unplanned downtime." },
    { domain: "OPERATIONS", verbs: "Connect → Automate → Decide", desc: "Link fragmented factory databases, automate document parsing, and give managers instant decision support." }
  ];

  // 06 SELECTED ENGINEERING WORK — Editorial List
  const selectedWork = [
    {
      number: "01",
      name: "eDrift",
      category: "Electric Mobility & Energy Intelligence",
      desc: "Real-time energy consumption telemetry & peak-load prediction engine for industrial fleets."
    },
    {
      number: "02",
      name: "Tamizh Tech",
      category: "Automated Quality Inspection & Vision",
      desc: "Computer vision quality inspection pipeline detecting surface micro-defects at production speed."
    },
    {
      number: "03",
      name: "ThiranOli",
      category: "Operations & Workflow Automation",
      desc: "Intelligent document parsing and ERP integration pipeline automating supplier compliance records."
    },
    {
      number: "04",
      name: "Modliqer",
      category: "Manufacturing Intelligence & AutoML",
      desc: "No-code AutoML & quality capability platform engineered for factories, teachers, and researchers.",
      isProduct: true,
      productLink: "https://modliq-io.vercel.app/"
    }
  ];

  // 07 HOW WE ENGINEER — Method Stages
  const methodology = [
    { number: "01", name: "Discover", desc: "Map current operational landscape, constraints, and business goals." },
    { number: "02", name: "Architect", desc: "Design AI pipelines, data models, security boundaries, and modular software." },
    { number: "03", name: "Build", desc: "Iterative 2-week engineering sprints ending in production-ready software." },
    { number: "04", name: "Validate", desc: "Automated test suites, mathematical proof checks, and real-world validation." },
    { number: "05", name: "Deploy", desc: "Staged deployment, infrastructure-as-code, and 30-day hypercare support." },
    { number: "06", name: "Improve", desc: "Continuous telemetry monitoring, latency tuning, and accuracy optimization." }
  ];

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans selection:bg-[#E3F2FD] selection:text-[#0D47A1]">
      
      {/* ─── 01. HERO SECTION (#FFFFFF) — SINGLE VIEW NON-SCROLLABLE FIT ───────── */}
      <section className="relative pt-2 pb-6 lg:pt-4 lg:pb-8 overflow-hidden bg-[#FFFFFF] border-b border-[#E2E8F0] min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Column — 50% Content (6/12 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Eyebrow */}
              <FadeIn delay={0.04} amount={0}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest mb-4 self-start">
                  <span>AI ENGINEERING · MANUFACTURING</span>
                </div>
              </FadeIn>

              {/* Main Headline */}
              <FadeIn delay={0.08} amount={0}>
                <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-bold text-[#0F172A] tracking-tight leading-[1.04] mb-4 font-anek">
                  Engineering <span className="font-serif italic font-normal text-[#2196F3]">AI</span> for Manufacturing.
                </h1>
              </FadeIn>

              {/* Direct Supporting Copy */}
              <FadeIn delay={0.12} amount={0}>
                <p className="text-base sm:text-lg text-[#475569] mb-6 leading-relaxed font-normal font-anek max-w-2xl">
                  We build intelligent software and AI solutions that help manufacturers improve quality, optimize processes, automate operations, and make better decisions.
                </p>
              </FadeIn>

              {/* Action CTAs */}
              <FadeIn delay={0.16} amount={0}>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-4">
                  <Magnetic strength={6}>
                    <Button 
                      suppressHydrationWarning
                      href="/book-consultation" 
                      variant="primary" 
                      className="w-full sm:w-auto text-base px-7 py-3 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl"
                    >
                      Talk to an AI Engineer →
                    </Button>
                  </Magnetic>
                  <Button 
                    suppressHydrationWarning
                    href="/solutions" 
                    variant="outline" 
                    className="text-base px-7 py-3 border-[#CBD5E1] text-[#0D47A1] hover:bg-[#E3F2FD] font-semibold rounded-xl"
                  >
                    Explore Manufacturing Solutions →
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Link 
                    href="/solutions/ai-readiness" 
                    className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#0D47A1] hover:text-[#2196F3] hover:underline transition-all"
                  >
                    <span>Not sure where AI fits? → Start with our AI Readiness Assessment</span>
                  </Link>
                </div>

                {/* Supporting Micro-Positioning Banner */}
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center gap-3 text-xs font-mono font-semibold text-[#64748B]">
                  <span className="text-[#0D47A1]">AI-Led</span>
                  <span>·</span>
                  <span className="text-[#0D47A1]">Manufacturing-Focused</span>
                  <span>·</span>
                  <span className="text-[#0D47A1]">Human-Accountable</span>
                </div>
              </FadeIn>
            </div>

            {/* Right Column — 50% Visual (6/12 cols) — Large Manufacturing AI Capability Map */}
            <div className="lg:col-span-6 w-full flex justify-center items-center">
              <FadeIn delay={0.2} amount={0}>
                <ManufacturingAIMap />
              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 02. THE MANUFACTURING CHALLENGE (#F8FAFC) ───────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 space-y-8">
          <FadeIn direction="up">
            <span className="text-xs font-mono font-bold text-[#0D47A1] uppercase tracking-widest">
              THE MANUFACTURING CHALLENGE
            </span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#0F172A] tracking-tight leading-tight font-anek mt-3">
              Manufacturing already has the data. <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#2196F3]">The challenge is turning it into better decisions.</span>
            </h2>

            {/* Horizontal 5-Column Text List (No cards, no icons, no diagrams) */}
            <div className="pt-8 border-t border-[#E2E8F0] flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-mono font-bold text-[#0D47A1] tracking-wider uppercase">
              <span>QUALITY</span>
              <span className="text-[#CBD5E1]">·</span>
              <span>PROCESS</span>
              <span className="text-[#CBD5E1]">·</span>
              <span>PRODUCTION</span>
              <span className="text-[#CBD5E1]">·</span>
              <span>MAINTENANCE</span>
              <span className="text-[#CBD5E1]">·</span>
              <span>OPERATIONS</span>
            </div>

            <p className="text-base text-[#475569] font-sans max-w-2xl mx-auto pt-4 leading-relaxed font-normal">
              Qeltrava combines AI engineering, software engineering, and industrial understanding to build systems that create measurable operational value.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── 03. WHAT WE DO (5 EDITORIAL SOLUTION ROWS) (#FFFFFF) ─────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                  WHAT WE DO
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek mt-2">
                  Engineering Capabilities for Industrial Systems
                </h2>
              </div>
              <p className="text-sm text-[#475569] max-w-md font-sans">
                We apply software engineering where software is sufficient, and deploy AI where intelligence directly improves decisions.
              </p>
            </div>
          </FadeIn>

          {/* Editorial Solution Rows */}
          <div className="space-y-0 divide-y divide-[#E2E8F0]">
            {editorialSolutions.map((sol, idx) => (
              <FadeIn key={sol.number} delay={idx * 0.06} direction="up">
                <div className="py-10 group transition-colors hover:bg-[#F8FAFC]/50 px-2 sm:px-4 rounded-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* Number & Title */}
                    <div className="lg:col-span-5 flex items-start gap-4">
                      <span className="text-3xl font-mono font-bold text-[#2196F3] group-hover:translate-x-1 transition-transform">{sol.number}</span>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0F172A] group-hover:text-[#0D47A1] transition-colors font-anek">
                          {sol.title}
                        </h3>
                        <p className="text-sm text-[#475569] mt-2 leading-relaxed font-sans font-normal max-w-md">
                          {sol.desc}
                        </p>
                        {sol.href && (
                          <div className="mt-4">
                            <Link
                              href={sol.href}
                              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0D47A1] hover:text-[#2196F3] hover:underline"
                            >
                              <span>{sol.ctaText}</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Editorial Tag List */}
                    <div className="lg:col-span-7 flex flex-wrap gap-2 pt-1">
                      {sol.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx} 
                          className="px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-mono font-medium text-[#0F172A] group-hover:border-[#90CAF9] transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 04. WHERE AI CREATES VALUE (#F8FAFC) ─────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                WHERE AI CREATES VALUE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                Measurable Impact Across Manufacturing Operations
              </h2>
              <p className="text-base text-[#475569] font-sans">
                Clear operational workflows engineered to eliminate friction and elevate decision accuracy.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {domainImpact.map((item, idx) => (
              <FadeIn key={item.domain} delay={idx * 0.06} direction="up">
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2196F3] p-6 rounded-2xl shadow-xs h-full flex flex-col justify-between space-y-4 transition-all duration-300">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#2196F3] block mb-1">{item.domain}</span>
                    <div className="text-[11px] font-mono font-bold text-[#0D47A1] mb-3">{item.verbs}</div>
                    <p className="text-xs text-[#475569] leading-relaxed font-sans">{item.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-[#E2E8F0] text-[9px] font-mono text-[#64748B] uppercase font-bold">
                    DOMAIN 0{idx + 1}
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
              <ul className="space-y-2.5 text-xs font-sans font-bold text-[#0F172A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>No-Code AutoML & Regression Leaderboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>SPC Math Engine (Cp, Cpk, Control Limits)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Buyer-Ready Quality Passport & PPAP Documents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Classroom & Research AutoML Learning Mode</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 06. SELECTED ENGINEERING WORK (EDITORIAL LIST) (#F8FAFC) ─────────── */}
      <section className="py-24 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                  SELECTED ENGINEERING WORK
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek mt-2">
                  Verified Engineering Initiatives
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

          {/* Editorial Work List */}
          <div className="space-y-0 divide-y divide-[#E2E8F0] bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-xs">
            {selectedWork.map((work, idx) => (
              <FadeIn key={work.number} delay={idx * 0.06} direction="up">
                <div className="p-6 md:p-8 group hover:bg-[#E3F2FD]/40 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 group-hover:translate-x-1.5 transition-transform duration-300">
                    <div className="flex items-start md:items-center gap-6">
                      <span className="text-2xl font-mono font-bold text-[#2196F3]">{work.number}</span>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-[#0F172A] group-hover:text-[#0D47A1] font-anek transition-colors">
                            {work.name}
                          </h3>
                          {work.isProduct && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#2196F3] text-white">
                              PRODUCT
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono font-semibold text-[#64748B] mt-0.5">
                          {work.category}
                        </p>
                        <p className="text-xs text-[#475569] mt-2 max-w-xl font-sans">
                          {work.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      {work.isProduct && work.productLink ? (
                        <a
                          href={work.productLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#2196F3] hover:text-[#0D47A1]"
                        >
                          <span>modliq-io.vercel.app</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="text-xs font-mono font-bold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors flex items-center gap-1">
                          <span>View Details</span>
                          <ArrowRight size={14} />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 07. HOW WE ENGINEER (METHODOLOGY) (#FFFFFF) ───────────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                HOW WE ENGINEER
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                Engineering Method & Delivery Cadence
              </h2>
              <p className="text-base text-[#475569] font-sans">
                Structured 6-stage delivery process from initial problem analysis to continuous operational improvement.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 pt-4 border-t border-[#E2E8F0]">
            {methodology.map((m) => (
              <div key={m.number} className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#2196F3] block">{m.number}</span>
                <h3 className="text-lg font-bold text-[#0F172A] font-anek uppercase tracking-wider">{m.name}</h3>
                <p className="text-xs text-[#475569] leading-relaxed font-sans">{m.desc}</p>
              </div>
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
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic strength={6}>
                <Button 
                  suppressHydrationWarning
                  href="/book-consultation" 
                  variant="primary" 
                  className="text-base px-8 py-4 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl inline-flex items-center gap-2"
                >
                  <span>Talk to an AI Engineer →</span>
                </Button>
              </Magnetic>
              <Button 
                suppressHydrationWarning
                href="/case-studies" 
                variant="outline" 
                className="text-base px-8 py-4 border-[#CBD5E1] text-[#0D47A1] bg-[#FFFFFF] hover:bg-[#F8FAFC] font-semibold rounded-xl"
              >
                <span>Explore Our Work →</span>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
