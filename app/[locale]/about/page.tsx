import React from 'react';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { VisualMindOfDeveloper } from '@/components/ui/VisualMindOfDeveloper';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <FadeIn>
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">About Qeltrava AI</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed">
              We are an AI-first software engineering partner. We design, engineer, and deploy intelligent software systems for organizations that demand precision, security, and measurable ROI.
            </p>
          </div>
        </FadeIn>

        <section className="mb-24">
          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Our Philosophy</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn direction="up" delay={0.2}>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3">Minimalism & Mathematics</h3>
                <p className="text-[var(--color-text-main)] leading-relaxed">
                  We believe that the best software is not decorated; it is engineered. We strip away complexity to build systems that are robust, clear, and focused on business utility.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.3}>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3">Outcome-Driven Engineering</h3>
                <p className="text-[var(--color-text-main)] leading-relaxed">
                  We do not sell hours. We sell capabilities. Every architecture decision is measured against its ability to reduce costs, increase revenue, or mitigate risk.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="mb-24">
          <VisualMindOfDeveloper />
        </section>

        <section className="mb-24">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Mission & Vision</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="bg-[var(--color-primary-dark)] text-white p-10 rounded-2xl">
              <h3 className="text-lg text-[var(--color-accent)] font-semibold mb-2">The Mission</h3>
              <p className="text-2xl font-medium leading-relaxed mb-8">
                To turn business complexity into intelligent software systems.
              </p>
              
              <h3 className="text-lg text-[var(--color-accent)] font-semibold mb-2">The Vision</h3>
              <p className="text-xl text-white/80 leading-relaxed">
                To be the foundational engineering layer for the next generation of AI-led enterprises.
              </p>
            </div>
          </FadeIn>
        </section>

        <section className="mb-24">
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Core Values</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="p-6 border border-[var(--color-border-soft)] rounded-xl">
                <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Quiet Confidence</h4>
                <p className="text-sm text-[var(--color-text-main)]">We let our architecture, security, and outcomes speak for us. No hype. No buzzwords.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-6 border border-[var(--color-border-soft)] rounded-xl">
                <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Enterprise Precision</h4>
                <p className="text-sm text-[var(--color-text-main)]">Every system is built with compliance, role-based access, and deep security integrations from day one.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-6 border border-[var(--color-border-soft)] rounded-xl">
                <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Human Accountable</h4>
                <p className="text-sm text-[var(--color-text-main)]">While AI powers our operating system, human stewards remain strictly responsible for trust, security, and final delivery.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="p-6 border border-[var(--color-border-soft)] rounded-xl">
                <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Radical Transparency</h4>
                <p className="text-sm text-[var(--color-text-main)]">Clear milestones, fixed scopes, and honest technical assessments. We say no when AI is not the right solution.</p>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </main>
  );
}
