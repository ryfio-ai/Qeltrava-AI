import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'About Our Engineering Team | ' + siteConfig.companyName,
  description: 'Meet the founding engineering team behind Qeltrava AI’s mathematical, AI-native software architecture.',
};

export default function AboutPage() {
  const foundingEngineers = [
    {
      role: "Founding Partner — AI Architecture",
      desc: "Directs LLM fine-tuning pipelines, agent routing topologies, and semantic retrieval systems."
    },
    {
      role: "Founding Partner — Infrastructure Systems",
      desc: "Builds automated CI/CD pipelines, auto-scaling Kubernetes nodes, and VPC networks."
    },
    {
      role: "Founding Partner — Full-Stack & SaaS Platform",
      desc: "Responsible for high-performance React UI components, backend state synchronization, and billing APIs."
    },
    {
      role: "Founding Partner — Data Pipelines & Analytics",
      desc: "Ingests unstructured event logs, builds ETL systems, and engineers analytics dashboards."
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-20">
        
        {/* Header */}
        <FadeIn>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">About Qeltrava AI</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed">
              We are an AI-first software engineering partner. We design, engineer, and deploy intelligent software systems for organizations that demand precision, security, and measurable ROI.
            </p>
          </div>
        </FadeIn>

        {/* Philosophy */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Our Philosophy</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FadeIn direction="up" delay={0.1}>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3">Minimalism & Mathematics</h3>
                <p className="text-[var(--color-text-main)] leading-relaxed">
                  We believe that the best software is not decorated; it is engineered. We strip away unnecessary complexities to build systems that are robust, clear, and mathematically optimized.
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" delay={0.2}>
              <div>
                <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3">Outcome-Driven Engineering</h3>
                <p className="text-[var(--color-text-main)] leading-relaxed">
                  We do not sell hours. We sell capabilities. Every architecture decision is measured against its ability to reduce costs, increase revenue, or mitigate risk.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Founding Story */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Founding Story</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="prose max-w-none text-[var(--color-text-main)] leading-relaxed space-y-6">
              <p>
                Qeltrava AI emerged from a shared engineering thesis at the <strong>PSG College of Technology (Class of 2026)</strong>. 
                Recognizing that modern enterprises were consistently struggling with the integration of AI models into deterministic codebases, our team began researching patterns for scalable agent orchestration, vector database indexing, and low-latency API layers.
              </p>
              <p>
                By blending advanced academic systems research with hands-on client applications for early partners in electric mobility and educational systems, we validated the foundation of what is now the Qeltrava Delivery OS. 
                Today, Qeltrava AI operates at the intersection of absolute mathematical logic and enterprise reliability, ensuring that every intelligent system we deploy is secure, modular, and optimized for real business ROI.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Founding Engineers (Class of 2026 PSG Tech) */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Founding Engineers</h2>
            <p className="text-sm text-[var(--color-text-main)] mb-8 max-w-2xl">
              Our core engineering team consists of PSG College of Technology co-founders (Class of 2026), bringing academic system boundaries mapping and execution rigor to commercial development.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {foundingEngineers.map((eng, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="p-6 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-xl h-full">
                  <h4 className="font-bold text-[var(--color-primary-dark)] text-base mb-2">
                    {eng.role}
                  </h4>
                  <p className="text-xs text-[var(--color-text-main)] leading-relaxed">
                    {eng.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section>
          <FadeIn direction="up">
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

        {/* Core Values */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Core Values</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="p-6 border border-[var(--color-border-soft)] rounded-xl h-full">
                <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Quiet Confidence</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">We let our architecture, security, and outcomes speak for us. No hype. No buzzwords.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-6 border border-[var(--color-border-soft)] rounded-xl h-full">
                <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Enterprise Precision</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">Every system is built with compliance, role-based access, and deep security integrations from day one.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-6 border border-[var(--color-border-soft)] rounded-xl h-full">
                <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Human Accountable</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">While AI powers our operating system, human stewards remain strictly responsible for trust, security, and final delivery.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="p-6 border border-[var(--color-border-soft)] rounded-xl h-full">
                <h4 className="font-bold text-[var(--color-primary-dark)] mb-2">Radical Transparency</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">Clear milestones, fixed scopes, and honest technical assessments. We say no when AI is not the right solution.</p>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </main>
  );
}
