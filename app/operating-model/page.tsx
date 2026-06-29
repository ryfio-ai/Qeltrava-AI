import React from 'react';
import { siteConfig } from '@/lib/site-config';
import { Button } from '@/components/Button';

export default function OperatingModelPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Quantra Delivery OS</h1>
        <p className="text-xl text-[var(--color-text-main)] mb-12 leading-relaxed">
          The internal and external system we use to ensure flawless project delivery, transparent communication, and measurable business outcomes.
        </p>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">Delivery Phases</h2>
          <div className="space-y-6">
            <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm">
              <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">1. Diagnose & Design</h3>
              <p className="text-[var(--color-text-main)]">We begin with an AI Opportunity Audit or Discovery Sprint to map your current workflow, estimate ROI, and create a 90-day implementation roadmap.</p>
            </div>
            <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm">
              <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">2. Architect & Build</h3>
              <p className="text-[var(--color-text-main)]">Engineering pods build multi-tenant, secure, and scalable prototypes and MVPs without accumulating technical debt from day one.</p>
            </div>
            <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm">
              <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">3. Validate & Deploy</h3>
              <p className="text-[var(--color-text-main)]">Every project undergoes strict QA, security reviews, automated testing, and performance checks before production deployment.</p>
            </div>
            <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm">
              <h3 className="font-bold text-lg text-[var(--color-primary-dark)] mb-2">4. Optimize (Retainers)</h3>
              <p className="text-[var(--color-text-main)]">Post-launch, we provide dedicated engineering pods or support retainers to monitor AI agents, manage cloud infrastructure, and continuously iterate the product.</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">Pricing Philosophy</h2>
          <p className="text-[var(--color-text-main)] mb-6">
            We do not compete on low price. We price based on business value, urgency, risk, and complexity. 
            We sell measurable ROI and fixed-scope outcomes, not hourly coding capacity.
          </p>
          <ul className="list-disc pl-6 text-[var(--color-text-main)] space-y-2 mb-8">
            <li>Always charge for discovery when the problem is complex.</li>
            <li>Use milestone payments for project work (e.g., 40% upfront, 40% mid-project, 20% launch).</li>
            <li>Convert projects into dedicated engineering pods or support retainers.</li>
            <li>Protect margin by strictly controlling scope and handling change requests transparently.</li>
          </ul>
        </section>

        <div className="p-8 bg-[var(--color-primary-dark)] text-white rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to build?</h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">Start with an AI Opportunity Audit to diagnose your business bottlenecks and map out a precise ROI plan.</p>
          <Button href="/book-consultation" variant="primary" className="bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 border-transparent">
            Schedule a Strategy Call
          </Button>
        </div>

      </div>
    </main>
  );
}
