import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Briefcase, Award, Zap, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers & Open Roles | ' + siteConfig.companyName,
  description: 'Join Qeltrava AI to design, build, and scale the next generation of intelligent software systems.',
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-20">
        
        {/* Header */}
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Build the Foundation</h1>
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
              <div className="text-center p-6">
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
              <div className="text-center p-6">
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
              <div className="text-center p-6">
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

        {/* Speculative Roles */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Active Openings</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-8 text-center">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] mb-3">No Active Openings</h3>
              <p className="text-sm text-[var(--color-text-main)] max-w-lg mx-auto leading-relaxed">
                We do not have any open positions at this time. However, we are always eager to meet talented developers and systems architects. If you are interested in future opportunities, please submit a speculative application below.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Speculative CTA */}
        <FadeIn direction="up">
          <div className="p-8 md:p-12 bg-[var(--color-primary-dark)] text-white rounded-2xl text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Submit a Speculative Application</h3>
            <p className="text-white/80 mb-8 max-w-lg mx-auto leading-relaxed">
              We constantly hire senior specialists for modular consulting contracts and long-term project support. Get in touch with our team.
            </p>
            <Button href="mailto:hello@qeltrava.ai?subject=Speculative%20Application%20-%20General" className="bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 border-transparent">
              Submit Speculative Application
            </Button>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
