import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';

export const CoreOffers = () => {
  return (
    <section className="py-24 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-[var(--color-primary-dark)] mb-4">Core Engineering Solutions</h2>
            <p className="text-lg text-[var(--color-text-main)] max-w-2xl">From low-risk discovery to dedicated engineering pods, we provide a clear path to scalable intelligence.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FadeIn delay={0.1}>
            <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">AI Opportunity Audit</h3>
              <p className="text-[var(--color-text-main)] mb-6 h-20">A diagnostic sprint that identifies where AI can reduce cost, save time, or improve operational efficiency.</p>
              <ul className="space-y-2 mb-8 text-sm text-[var(--color-text-main)] font-medium">
                <li className="flex gap-2">✓ Workflow analysis</li>
                <li className="flex gap-2">✓ Automation ROI estimate</li>
                <li className="flex gap-2">✓ 90-day implementation roadmap</li>
              </ul>
              <Button href="/services/ai-automation" variant="outline" className="w-full">Explore Audits</Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">AI Automation Sprint</h3>
              <p className="text-[var(--color-text-main)] mb-6 h-20">Build a working AI automation prototype or MVP for a high-value business workflow in 4-8 weeks.</p>
              <ul className="space-y-2 mb-8 text-sm text-[var(--color-text-main)] font-medium">
                <li className="flex gap-2">✓ Support AI agents</li>
                <li className="flex gap-2">✓ Document processing</li>
                <li className="flex gap-2">✓ Internal knowledge assistants</li>
              </ul>
              <Button href="/services/ai-automation" variant="outline" className="w-full">Explore Sprints</Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="bg-white p-8 rounded-2xl border border-[var(--color-border-soft)] shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">SaaS Launch Sprint</h3>
              <p className="text-[var(--color-text-main)] mb-6 h-20">Help founders and companies launch a production-grade SaaS MVP without technical debt.</p>
              <ul className="space-y-2 mb-8 text-sm text-[var(--color-text-main)] font-medium">
                <li className="flex gap-2">✓ Multi-tenant architecture</li>
                <li className="flex gap-2">✓ Enterprise security</li>
                <li className="flex gap-2">✓ Scalable cloud deployments</li>
              </ul>
              <Button href="/services/saas-development" variant="outline" className="w-full">Explore SaaS</Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
