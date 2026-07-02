import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { VisualHowSoftwareCompaniesWork } from '@/components/ui/VisualHowSoftwareCompaniesWork';
import { VisualAIAdoptionStrategy } from '@/components/ui/VisualAIAdoptionStrategy';

export const metadata: Metadata = {
  title: 'Operating Model & Delivery System | ' + siteConfig.companyName,
  description: 'Learn about Qeltrava Delivery OS, our systematic engagement phases, and transparent pricing structures.',
};

export default function OperatingModelPage() {
  const pricingModels = [
    {
      model: "Fixed-scope project",
      whatItIs: "Defined deliverables, milestone payments (40% upfront / 40% mid-project / 20% launch) based on approved architectural specifications.",
      whenWeUseIt: "Well-scoped builds with clear technical requirements and defined feature boundaries."
    },
    {
      model: "Time & materials",
      whatItIs: "Weekly or monthly billing with strict scope controls, regular velocity updates, and agile backlog prioritization.",
      whenWeUseIt: "Evolving products and continuous iteration where requirements adapt to live user feedback."
    },
    {
      model: "Outcome retainer",
      whatItIs: "Monthly engineering pod fee with defined KPIs, dedicated developers, priority support SLAs, and continuous system monitoring.",
      whenWeUseIt: "Long-term engineering partnerships, agent fine-tuning, and cloud infrastructure operations."
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-16">
        
        {/* Header */}
        <FadeIn>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Qeltrava Delivery OS</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              Our systematic framework to ensure flawless software architecture, transparent sprint progress, and clear business outcomes.
            </p>
          </div>
        </FadeIn>

        {/* Delivery Phases */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Delivery Phases</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">1. Diagnose & Design</h3>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">We map your operational landscape, identify where AI and modern architecture create ROI, and compile a 90-day execution roadmap before writing code.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">2. Architect & Build</h3>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">Dedicated engineering pods build in 2-week iterations — modular, tested, and documented. Every milestone ends with a working demo, not a static presentation.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">3. Validate & Deploy</h3>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">Every rollout undergoes automated test suite sweeps, HIPAA/SOC 2 compliance checks, performance profiling, and an incremental deployment window.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">4. Optimize (Retainer)</h3>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">Post-release, we provide dedicated support pods for cloud cost optimization, agent telemetry monitoring, server maintenance, and product features velocity.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Development Pipeline Workflow */}
        <section>
          <FadeIn direction="up">
            <VisualHowSoftwareCompaniesWork />
          </FadeIn>
        </section>

        {/* Pricing Philosophy Table */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Pricing Models</h2>
            <p className="text-[var(--color-text-main)] mb-8 max-w-3xl">
              We price based on business value, technical complexity, and risk boundaries. We charge for diagnostic sprints and align project deliverables with clear payment milestones.
            </p>
            
            {/* 3-Column Table */}
            <div className="overflow-x-auto border border-[var(--color-border-soft)] rounded-xl shadow-sm bg-white">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[var(--color-bg-light)] border-b border-[var(--color-border-soft)] text-[var(--color-primary-dark)] font-semibold">
                    <th className="p-4 md:p-6 w-1/4">Model</th>
                    <th className="p-4 md:p-6 w-1/2">What it is</th>
                    <th className="p-4 md:p-6 w-1/4">When we use it</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border-soft)] text-[var(--color-text-main)]">
                  {pricingModels.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[var(--color-bg-light)]/40 transition-colors">
                      <td className="p-4 md:p-6 font-bold text-[var(--color-primary-dark)]">{item.model}</td>
                      <td className="p-4 md:p-6 leading-relaxed">{item.whatItIs}</td>
                      <td className="p-4 md:p-6 leading-relaxed">{item.whenWeUseIt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </section>

        {/* AI Adoption Strategy Timeline */}
        <section>
          <FadeIn direction="up">
            <VisualAIAdoptionStrategy />
          </FadeIn>
        </section>

        {/* CTA */}
        <FadeIn direction="up">
          <div className="p-8 md:p-12 bg-[var(--color-primary-dark)] text-white rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to build?</h3>
            <p className="text-white/80 mb-8 max-w-lg mx-auto leading-relaxed">
              Start with an AI Opportunity Audit to diagnose technical bottlenecks and outline a structured ROI plan.
            </p>
            <Button href="/book-consultation" className="bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 border-transparent">
              Book an AI Strategy Call
            </Button>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
