import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { TalentProfileForm } from '@/components/TalentProfileForm';
import { FadeIn } from '@/components/animations/FadeIn';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Cpu, Code2, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Apply — Talent & Engineering Community Profile | ' + siteConfig.companyName,
  description: 'Join the Qeltrava AI Talent & Engineering Community. Submit your technical background, skills, and availability for project opportunities.',
};

export default function TalentApplyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-28 pb-24 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500">
          <Link href="/careers" className="hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Careers
          </Link>
          <span>/</span>
          <span className="text-[var(--color-primary-dark)] font-bold">Community Profile Application</span>
        </nav>

        {/* Hero Banner Header */}
        <FadeIn>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] font-mono font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                Engineering Community Portal
              </span>
              <span className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> Talent Pool & Projects
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-primary-dark)]">
              Build With Qeltrava AI
            </h1>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-3xl">
              We match software engineers, AI developers, and technical talent with product development initiatives (including our flagship Modliq AI platform), client projects, and freelance assignments.
            </p>
          </header>
        </FadeIn>

        {/* Value Props Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 bg-white text-[var(--color-accent)] rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[var(--color-primary-dark)] mb-0.5">Real AI & SaaS Systems</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">Contribute to production LLM, RAG, and full-stack software architectures.</p>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 bg-white text-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[var(--color-primary-dark)] mb-0.5">Role-Specific Tasks</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">Showcase your skills through targeted technical assessments, not generic resumes.</p>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl flex items-start gap-3">
            <div className="w-9 h-9 bg-white text-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-[var(--color-primary-dark)] mb-0.5">Flexible Allocation</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">Work on internships, freelance projects, or part-time technical collaborations.</p>
            </div>
          </div>
        </div>

        {/* Main Application Form Container */}
        <FadeIn delay={0.1}>
          <TalentProfileForm />
        </FadeIn>

      </div>
    </main>
  );
}
