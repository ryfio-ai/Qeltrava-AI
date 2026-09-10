"use client";

import React, { useState } from 'react';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { Magnetic } from '@/components/motion/Magnetic';
import { submitContactForm } from '@/platform/shared/actions';
import { 
  ShieldCheck, 
  FileCheck, 
  Search, 
  Factory, 
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet, 
  AlertTriangle,
  HelpCircle,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export default function BisIsiCompliancePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productName: '',
    isStandard: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: 'BIS/ISI Compliance Support',
        message: `Product: ${formData.productName} | IS Standard: ${formData.isStandard} | Notes: ${formData.message}`
      });
      setSubmitted(true);
    } catch (err) {
      alert('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceJourney = [
    { step: '01', title: 'PRODUCT', desc: 'Define physical product specifications, materials, & target market scope.' },
    { step: '02', title: 'IS STANDARD', desc: 'Identify compulsory BIS / ISI Indian Standards applicable to your product.' },
    { step: '03', title: 'GAP ASSESSMENT', desc: 'Audit current manufacturing quality systems against target standard requirements.' },
    { step: '04', title: 'TESTING', desc: 'Coordinate sample preparation & pre-testing with accredited NABL testing labs.' },
    { step: '05', title: 'DOCUMENTATION', desc: 'Prepare technical files, test reports, quality manual, and STI STI documents.' },
    { step: '06', title: 'FACTORY READINESS', desc: 'Setup in-house testing equipment, calibration logs, and quality control procedures.' },
    { step: '07', title: 'CERTIFICATION SUPPORT', desc: 'Guide through online portal application, officer audit prep, & defect resolution.' }
  ];

  const serviceCategories = [
    {
      num: '01',
      title: 'Product & IS Standard Identification',
      desc: 'Accurately map your product specifications, raw materials, and components to the correct compulsory or voluntary Indian Standards (IS Code).',
      deliverables: ['IS Standard Identification Report', 'Mandatory vs Voluntary Certification Matrix', 'Applicable Scheme Assessment']
    },
    {
      num: '02',
      title: 'BIS / ISI Certification Guidance',
      desc: 'End-to-end procedural advisory across Scheme-I (ISI Mark) and Scheme-II (CRS - Compulsory Registration Scheme) for domestic and foreign manufacturers.',
      deliverables: ['Step-by-step Compliance Roadmap', 'Fee Schedule & Application Timeline', 'Portal Submission Checklist']
    },
    {
      num: '03',
      title: 'Technical Documentation & STI',
      desc: 'Draft comprehensive Technical Files, Scheme of Inspection & Testing (STI), Quality Manuals, and raw material verification records required by BIS auditors.',
      deliverables: ['Custom Quality Assurance Manual', 'Scheme of Testing & Inspection (STI)', 'Raw Material & Batch Control Records']
    },
    {
      num: '04',
      title: 'Product Testing & Pre-Evaluation',
      desc: 'Review test parameters, facilitate sample preparation, and coordinate pre-compliance testing with NABL-accredited laboratory partners.',
      deliverables: ['Pre-Testing Parameter Checklist', 'NABL Lab Coordination & Test Review', 'Test Failure Root-Cause Rectification']
    },
    {
      num: '05',
      title: 'Factory & Quality-System Readiness',
      desc: 'Verify in-house testing laboratory equipment, calibration schedules, quality control procedures, and manufacturing plant readiness before the official inspector visit.',
      deliverables: ['In-House Lab Setup Specifications', 'Equipment Calibration Audit Trail', 'Plant Inspector Audit Prep Guide']
    },
    {
      num: '06',
      title: 'Pre-Certification Compliance Audit',
      desc: 'Conduct simulated mock factory inspections to identify non-conformities, verify batch sampling protocols, and ensure zero audit surprises during official visits.',
      deliverables: ['Simulated Inspector Mock Audit Report', 'Non-Conformity (NC) Closure Guidance', 'Officer Verification Readiness Sheet']
    }
  ];

  const faqs = [
    {
      q: 'Does Qeltrava AI issue BIS Certificates or ISI Marks?',
      a: 'No. Qeltrava AI provides independent compliance consultancy, technical documentation, and factory audit preparation support. Official BIS licenses and ISI Marks are granted exclusively by the Bureau of Indian Standards (BIS) after statutory audit and testing.'
    },
    {
      q: 'How does Qeltrava AI differ from traditional regulatory agents?',
      a: 'We combine regulatory expertise with modern industrial software and quality engineering tools like Modliqer. We don\'t just handle paperwork; we audit your physical factory processes, help setup statistical process control (Cp/Cpk), and make your manufacturing operations compliance-ready.'
    },
    {
      q: 'What products require mandatory BIS / ISI certification in India?',
      a: 'Over 600+ product categories fall under mandatory BIS certification, including electrical appliances, steel products, chemicals, cement, toys, automotive components, electronics (CRS scheme), and medical devices. We help identify whether your product requires mandatory certification.'
    },
    {
      q: 'Can overseas manufacturers apply for BIS certification?',
      a: 'Yes. Overseas manufacturers can apply under the Foreign Manufacturers Certification Scheme (FMCS) to use the ISI Mark, appointing an Authorized Indian Representative (AIR). We provide full compliance preparation support for FMCS applicants.'
    }
  ];

  return (
    <main className="min-h-screen bg-[#FFFFFF] text-[#0F172A] font-sans selection:bg-[#E3F2FD] selection:text-[#0D47A1]">
      
      {/* ─── HERO SECTION (#FFFFFF) ────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-[#FFFFFF] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl space-y-6">
            
            <FadeIn delay={0.02} amount={0}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-mono font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2196F3]" />
                <span>PRODUCT COMPLIANCE & CERTIFICATION</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.08} amount={0}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] tracking-tight leading-[1.08] font-anek">
                BIS / ISI Compliance & Certification <span className="font-serif italic font-normal text-[#2196F3]">Support</span> for Manufacturing.
              </h1>
            </FadeIn>

            <FadeIn delay={0.14} amount={0}>
              <p className="text-base sm:text-xl text-[#475569] leading-relaxed font-normal font-anek max-w-3xl">
                We help manufacturers and product developers understand applicable Indian Standards, identify compliance requirements, prepare technical documentation, assess testing and factory readiness, and navigate the BIS/ISI certification process.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} amount={0}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Magnetic strength={6}>
                  <Button href="#consultation" variant="primary" className="text-base px-8 py-4 bg-[#2196F3] hover:bg-[#1976D2] text-white shadow-xs font-semibold rounded-xl">
                    Request Compliance Assessment →
                  </Button>
                </Magnetic>
                <Button href="#journey" variant="outline" className="text-base px-8 py-4 border-[#CBD5E1] text-[#0D47A1] hover:bg-[#E3F2FD] font-semibold rounded-xl">
                  Explore Service Journey
                </Button>
              </div>

              {/* Differentiator Statement */}
              <div className="pt-6 border-t border-[#E2E8F0] mt-6 flex items-center gap-3 text-xs font-mono font-bold text-[#0D47A1]">
                <span className="bg-[#E3F2FD] px-2.5 py-1 rounded border border-[#90CAF9]">DIFFERENTIATOR</span>
                <span>We make your product and manufacturing process compliance-ready.</span>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ─── SERVICE JOURNEY (#F8FAFC) ───────────────────────────────────────── */}
      <section id="journey" className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          
          <FadeIn direction="up">
            <div className="max-w-3xl space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                7-STEP COMPLIANCE JOURNEY
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
                Product → Indian Standard → Factory Readiness → Support
              </h2>
              <p className="text-sm text-[#475569] font-sans">
                A structured engineering-led process designed to ensure zero non-conformity surprises during official inspections.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceJourney.map((step, idx) => (
              <FadeIn key={step.step} delay={idx * 0.05} direction="up">
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2196F3] p-5 rounded-2xl shadow-xs h-full flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#2196F3] block mb-1">STEP {step.step}</span>
                    <h3 className="text-sm font-bold text-[#0D47A1] font-anek mb-2">{step.title}</h3>
                    <p className="text-xs text-[#475569] leading-relaxed font-sans">{step.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-[#E2E8F0] text-[9px] font-mono text-[#64748B] font-bold">
                    MILESTONE {step.step}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ─── 6 KEY SERVICE CATEGORIES (#FFFFFF) ───────────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-16">
          
          <FadeIn direction="up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
                  SERVICE OFFERINGS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek mt-2">
                  Six Core Pillars of Compliance Support
                </h2>
              </div>
              <p className="text-sm text-[#475569] max-w-md font-sans">
                Engineering, documentation, and quality-system preparation tailored to Indian Standards.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategories.map((cat, idx) => (
              <FadeIn key={cat.num} delay={idx * 0.08} direction="up">
                <div className="bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#2196F3] p-8 rounded-2xl shadow-xs transition-all duration-300 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-mono font-bold text-[#2196F3]">{cat.num}</span>
                      <span className="text-xs font-mono text-[#64748B] font-bold uppercase">SERVICE PILLAR</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0D47A1] font-anek mb-3">{cat.title}</h3>
                    <p className="text-sm text-[#475569] leading-relaxed font-sans font-medium mb-6">
                      {cat.desc}
                    </p>

                    <div className="border-t border-[#E2E8F0] pt-4">
                      <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider mb-2 block">
                        KEY DELIVERABLES
                      </span>
                      <ul className="space-y-1.5">
                        {cat.deliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2 text-xs font-sans font-bold text-[#0F172A]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ─── MODLIQER INTEGRATION FOR QUALITY PASSPORTS (#F8FAFC) ─────────────── */}
      <section className="py-20 bg-[#F8FAFC] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="bg-[#E3F2FD] border border-[#90CAF9] rounded-2xl p-8 md:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#90CAF9] text-[#0D47A1] text-[10px] font-mono font-bold uppercase tracking-wider">
                SOFTWARE-POWERED COMPLIANCE EVIDENCE
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold text-[#0D47A1] font-anek">
                Quality Passports & Cp/Cpk Math via Modliqer
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed font-sans font-medium">
                Our proprietary platform Modliqer generates computational Statistical Process Control (SPC) math, capability indices (Cp/Cpk), and buyer-accepted Quality Passports to provide traceable audit evidence for regulatory officers and OEM buyers.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link 
                href="/products/modliq" 
                className="w-full text-center px-6 py-3.5 rounded-xl bg-[#2196F3] hover:bg-[#1976D2] text-white font-bold text-sm transition-all shadow-xs"
              >
                Explore Modliqer →
              </Link>
              <a 
                href="https://modliq-io.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full text-center px-6 py-3.5 rounded-xl bg-[#FFFFFF] border border-[#90CAF9] text-[#0D47A1] font-bold text-sm hover:bg-[#E3F2FD] transition-all"
              >
                Launch Modliqer App ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FREQUENTLY ASKED QUESTIONS (#FFFFFF) ───────────────────────────── */}
      <section className="py-24 bg-[#FFFFFF] border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight font-anek">
              Understanding BIS / ISI Compliance Support
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#E2E8F0] rounded-2xl p-6 bg-[#F8FAFC]">
                <h3 className="text-base font-bold text-[#0D47A1] mb-2 font-anek">{faq.q}</h3>
                <p className="text-xs text-[#475569] leading-relaxed font-sans font-medium">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Legal Disclaimer Box */}
          <div className="p-6 bg-[#FFFFFF] border border-[#CBD5E1] rounded-2xl text-xs text-[#475569] leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-[#0D47A1] font-bold">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Independent Compliance & Advisory Disclaimer</span>
            </div>
            <p>
              Qeltrava AI provides independent BIS/ISI compliance consultancy, technical documentation preparation, quality-system auditing, and factory process readiness support. We do not represent ourselves as the Bureau of Indian Standards (BIS) and do not issue official BIS certificates, license numbers, or ISI Marks. Final statutory certification and license authorization are granted exclusively by the competent BIS authorities under the applicable statutory certification scheme.
            </p>
          </div>

        </div>
      </section>

      {/* ─── CONSULTATION FORM SECTION (#E3F2FD) ────────────────────────────── */}
      <section id="consultation" className="py-24 bg-[#E3F2FD] border-b border-[#90CAF9]/40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 space-y-8">
          
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0D47A1]">
              REQUEST COMPLIANCE ASSESSMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0D47A1] font-anek">
              Prepare Your Manufacturing Operations for Certification
            </h2>
            <p className="text-sm text-[#475569] max-w-xl mx-auto">
              Share your product details and target Indian Standard. Our engineering compliance team will review your specifications and provide a preliminary gap analysis.
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl p-8 shadow-xs">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold">Compliance Assessment Request Received</h3>
                <p className="text-xs text-slate-600">Our engineering compliance specialists will review your product information and contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-1">Your Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name} 
                      onChange={e => setFormData({ ...formData, name: e.target.value })} 
                      placeholder="e.g. Rajesh Kumar" 
                      className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#2196F3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-1">Work Email *</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email} 
                      onChange={e => setFormData({ ...formData, email: e.target.value })} 
                      placeholder="rajesh@company.com" 
                      className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#2196F3]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-1">Phone / WhatsApp</label>
                    <input 
                      type="tel" 
                      value={formData.phone} 
                      onChange={e => setFormData({ ...formData, phone: e.target.value })} 
                      placeholder="+91 98765 43210" 
                      className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#2196F3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-1">Company / Plant Name</label>
                    <input 
                      type="text" 
                      value={formData.company} 
                      onChange={e => setFormData({ ...formData, company: e.target.value })} 
                      placeholder="Apex Manufacturing Ltd." 
                      className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#2196F3]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-1">Product Name / Category *</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.productName} 
                      onChange={e => setFormData({ ...formData, productName: e.target.value })} 
                      placeholder="e.g. Industrial Cables / Solar Panels / PVC Pipes" 
                      className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#2196F3]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-1">IS Standard Code (if known)</label>
                    <input 
                      type="text" 
                      value={formData.isStandard} 
                      onChange={e => setFormData({ ...formData, isStandard: e.target.value })} 
                      placeholder="e.g. IS 694 / IS 14286" 
                      className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#2196F3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-[#0D47A1] uppercase mb-1">Current Readiness & Notes</label>
                  <textarea 
                    rows={3} 
                    value={formData.message} 
                    onChange={e => setFormData({ ...formData, message: e.target.value })} 
                    placeholder="Describe current factory setup, testing lab equipment, or timeline..." 
                    className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] text-xs focus:outline-none focus:border-[#2196F3]"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full py-4 rounded-xl bg-[#2196F3] hover:bg-[#1976D2] text-white font-bold text-sm transition-all shadow-xs cursor-pointer"
                >
                  {isSubmitting ? 'Submitting Request...' : 'Submit Compliance Assessment Request →'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </main>
  );
}
