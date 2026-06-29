import React from 'react';
import { Button } from '@/components/Button';

export default function AIAutomationPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <div className="mb-16">
          <div className="inline-block px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold text-sm rounded-full mb-4">
            Core Solution
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">AI Automation Sprints</h1>
          <p className="text-xl text-[var(--color-text-main)] leading-relaxed">
            Build a working AI automation prototype or MVP for a high-value business workflow in 4 to 8 weeks.
          </p>
        </div>

        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-4">Who this is for</h2>
            <p className="text-[var(--color-text-main)] mb-4">
              Businesses with repetitive support, operations, finance, HR, document processing, or reporting workflows that are currently slow, manual, or expensive.
            </p>
            <ul className="space-y-2 text-[var(--color-text-main)]">
              <li>• Operations-heavy SMEs</li>
              <li>• Funded startups scaling rapidly</li>
              <li>• Enterprise innovation teams</li>
            </ul>
          </div>
          <div className="bg-[var(--color-bg-light)] p-8 rounded-xl border border-[var(--color-border-soft)]">
            <h3 className="font-bold text-[var(--color-primary-dark)] mb-4">Sprint Deliverables</h3>
            <ul className="space-y-3 text-sm text-[var(--color-text-main)]">
              <li className="flex gap-2">✓ Workflow automation design</li>
              <li className="flex gap-2">✓ AI assistant/agent prototype</li>
              <li className="flex gap-2">✓ Integration with existing business tools</li>
              <li className="flex gap-2">✓ Dashboard or admin interface</li>
              <li className="flex gap-2">✓ Human-in-the-loop approval flow</li>
              <li className="flex gap-2">✓ Deployment and testing plan</li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6">Example Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 border border-[var(--color-border-soft)] rounded-xl bg-white">
              <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Customer Support AI Agent</h4>
              <p className="text-sm text-[var(--color-text-main)]">Automate tier-1 support queries using RAG architecture connected to your internal knowledge base.</p>
            </div>
            <div className="p-6 border border-[var(--color-border-soft)] rounded-xl bg-white">
              <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Invoice / Document Processing</h4>
              <p className="text-sm text-[var(--color-text-main)]">Extract structured data from unstructured PDFs and automate ERP/accounting system entry.</p>
            </div>
            <div className="p-6 border border-[var(--color-border-soft)] rounded-xl bg-white">
              <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Compliance Evidence Collection</h4>
              <p className="text-sm text-[var(--color-text-main)]">Automate the gathering and formatting of security/compliance logs for audit readiness.</p>
            </div>
            <div className="p-6 border border-[var(--color-border-soft)] rounded-xl bg-white">
              <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Internal Knowledge Assistant</h4>
              <p className="text-sm text-[var(--color-text-main)]">Help employees find HR policies, operational procedures, or technical documentation instantly.</p>
            </div>
          </div>
        </section>

        <div className="p-8 bg-[var(--color-primary-dark)] text-white rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-4">Not sure where to start?</h3>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">Before investing in automation, start with our AI Opportunity Audit to diagnose exactly where AI will create measurable ROI.</p>
          <div className="flex justify-center gap-4">
            <Button href="/contact" variant="primary" className="bg-[var(--color-accent)] hover:bg-blue-600 border-transparent">
              Request an Audit
            </Button>
          </div>
        </div>

      </div>
    </main>
  );
}
