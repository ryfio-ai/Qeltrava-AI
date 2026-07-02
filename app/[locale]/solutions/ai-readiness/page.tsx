import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment | ' + siteConfig.companyName,
  description: 'Evaluate your data pipeline maturity, cloud infrastructure capabilities, and workflow bottlenecks for LLM integration.',
};

export default function AiReadinessPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24 select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <span className="text-xs font-mono font-bold uppercase text-[var(--color-accent)] tracking-widest block mb-2">Outcome Solution</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">AI Readiness Assessment</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              An engineering-led diagnostic to evaluate data pipeline cleanliness, map tech stack limitations, and outline a structured roadmap for secure AI execution.
            </p>
          </div>
        </FadeIn>

        <section className="mb-20">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Assessment Domains</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Data Infrastructure Audit</p>
                <p className="text-xs text-[var(--color-text-main)]">Evaluate database performance, unstructured log formatting, and schema compatibility with vector spaces.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Security Gaps Review</p>
                <p className="text-xs text-[var(--color-text-main)]">Identify model access controls, data boundaries, and encryption policies for LLM RAG pipelines.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Feasibility Mapping</p>
                <p className="text-xs text-[var(--color-text-main)]">Define exact token budgets, latency parameters, and custom model requirements for target workflows.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="p-8 bg-[var(--color-bg-light)] rounded-2xl text-center">
          <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-4">Book your AI Readiness scoping sprint</h3>
          <Button href="/book-consultation" variant="primary">
            Schedule a Scoping Call
          </Button>
        </section>
      </div>
    </main>
  );
}
