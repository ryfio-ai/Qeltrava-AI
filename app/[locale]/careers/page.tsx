import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { Briefcase, Award, Zap, Shield } from 'lucide-react';

import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers & Talent Community | ' + siteConfig.companyName,
  description: 'Join the Qeltrava AI Talent & Engineering Community. Submit your technical background, skills, and availability for project opportunities.',
};

export default async function CareersPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Qeltrava AI Community
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)]">Build the Foundation</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed">
              We are looking for builders, systems thinkers, and engineers who care deeply about code quality, mathematical precision, and absolute user value.
            </p>
          </div>
        </FadeIn>

        {/* Culture & Values */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4 text-center">Engineering Culture</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="text-center p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="w-12 h-12 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--color-primary-dark)] mb-2">Zero Hype</h3>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                  We don't chase trendy buzzwords. We build robust, reliable systems backed by mathematical proofs and solid software architecture.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="text-center p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--color-primary-dark)] mb-2">Rigorous Standards</h3>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                  Our codebase is peer-reviewed, heavily tested, and documented. We believe engineering rigor is the only way to scale systems.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="text-center p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[var(--color-primary-dark)] mb-2">Security-First</h3>
                <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                  Compliance and role-based access are core properties of our design system, not final checklists.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Talent & Engineering Community Banner */}
        <FadeIn direction="up">
          <div className="p-8 md:p-12 bg-[var(--color-primary-dark)] text-white rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto text-[var(--color-accent)] shadow-inner">
              <Briefcase className="w-7 h-7" />
            </div>
            <div className="space-y-3 max-w-xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold">Qeltrava AI — Talent & Engineering Profile</h2>
              <p className="text-white/80 text-sm leading-relaxed">
                Join our talent community to share your technical background, skills, experience, availability, and area of interest for role-specific assessments, product development, internships, freelance opportunities, and AI/software projects.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/careers/apply"
                className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white font-bold text-sm px-8 py-3.5 rounded-full hover:bg-[var(--color-accent)]/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                Complete Engineering Profile →
              </Link>
            </div>
            <p className="text-white/40 text-[11px] font-mono">
              Direct form application • No external redirects
            </p>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}

