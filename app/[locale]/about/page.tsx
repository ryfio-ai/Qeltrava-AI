import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';

export const metadata: Metadata = {
  title: 'About Qeltrava AI | Our Story, Mission & Engineering Team',
  description: 'Four engineers from PSG College of Technology, Coimbatore, building AI-native software systems for startups, enterprises, and manufacturers worldwide.',
  keywords: ["AI engineering team", "Software development company", "PSG College of Technology alumni", "AI startup Coimbatore", "Custom enterprise software"],
  openGraph: {
    title: 'About Qeltrava AI | Our Story & Mission',
    description: 'We are an AI-first software engineering partner building secure and scalable solutions.',
    type: 'website',
  },
};

export default function AboutPage() {
  const foundingEngineers = [
    {
      role: "AI Orchestration Engineer",
      tags: ["LangChain", "Agent Design", "LLM Systems"],
      desc: "Designs and implements agentic AI systems, RAG pipelines, and LLM orchestration layers for production deployments. Specializes in making AI systems reliable, not just impressive.",
      initials: "AO"
    },
    {
      role: "Systems Architect",
      tags: ["Distributed Systems", "Cloud Architecture", "PostgreSQL"],
      desc: "Owns the architectural decisions that determine whether a system scales to 100 users or 100,000. Focused on building systems that are boring to operate — because boring means reliable.",
      initials: "SA"
    },
    {
      role: "Full-Stack Engineer",
      tags: ["Next.js", "FastAPI", "TypeScript"],
      desc: "Bridges the gap between what a system needs to do and what users need to experience. Builds the interfaces and APIs that make complex systems feel simple.",
      initials: "FS"
    },
    {
      role: "Security Engineer",
      tags: ["Zero Trust", "Compliance", "Penetration Testing"],
      desc: "Ensures that everything we build is something we'd trust with our own data. Integrates security into architecture decisions, not post-launch audits.",
      initials: "SE"
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

        {/* Registered & Recognized */}
        <section className="py-8 border-t border-b border-[var(--color-border-soft)]">
          <FadeIn direction="up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-2">Registered & Recognized</h2>
              <p className="text-sm text-[var(--color-text-main)]">Verified by India's startup ecosystem.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "DPIIT Recognised Startup",
                "Udyam Registered MSME",
                "StartupTN Recognized",
                "AWS Activate",
                "Microsoft for Startups",
                "NASSCOM Member",
                "Qeltrava Technologies Private Limited · CIN: XXXXXXXXXXXX"
              ].map((badge, i) => (
                <div key={i} className="px-4 py-2 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-lg flex items-center justify-center text-center">
                  <span className="text-sm font-semibold text-[var(--color-primary-dark)]">{badge}</span>
                  <span className="ml-2 text-[10px] italic text-[var(--color-text-main)] opacity-60">In Progress</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Founding Story */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Founding Story</h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <div className="prose max-w-none text-[var(--color-text-main)] leading-relaxed space-y-6">
              <p>
                Qeltrava AI was founded in 2026 by four engineering students from PSG College of Technology, Coimbatore — one of India's most respected engineering institutions. We started with a simple observation: most software development firms were treating AI as a feature to add, not a foundation to build on. We decided to build differently.
              </p>
              <p>
                Our first projects were for companies building real products in electric vehicles, education technology, and digital media. We learned faster working on live production systems than any curriculum could teach. By the time we formally incorporated, we had already shipped software used by real customers.
              </p>
              <p>
                We are building Qeltrava AI to be the engineering firm we would have wanted to hire — one that takes architecture seriously, charges for outcomes not hours, and treats every client's codebase as if we will maintain it for the next decade. We are based in Coimbatore and we work globally.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Founding Team */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Founding Team</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {foundingEngineers.map((eng, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-2xl h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[var(--color-bg-light)] rounded-xl flex items-center justify-center text-[var(--color-accent)] font-bold text-xl">
                      {eng.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-[var(--color-primary-dark)] text-lg">
                        {eng.role}
                      </h4>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {eng.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-semibold rounded-full border border-[var(--color-accent)]/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-4">
                    {eng.desc}
                  </p>
                  <p className="text-xs text-[var(--color-text-main)] opacity-70 font-medium">
                    PSG College of Technology, Class of 2026
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section>
          <FadeIn direction="up">
            <h2 className="text-3xl font-bold text-[var(--color-primary-dark)] mb-10 border-b border-[var(--color-border-soft)] pb-4">Core Values</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-2xl h-full shadow-sm">
                <div className="mb-4 text-[var(--color-accent)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <h4 className="font-bold text-[var(--color-primary-dark)] text-xl mb-3">Quiet Confidence</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">We let our architecture, security, and outcomes speak for us. No hype. No buzzwords.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-2xl h-full shadow-sm">
                <div className="mb-4 text-[var(--color-accent)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h4 className="font-bold text-[var(--color-primary-dark)] text-xl mb-3">Enterprise Precision</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">Every system is built with compliance, role-based access, and deep security integrations from day one.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-2xl h-full shadow-sm">
                <div className="mb-4 text-[var(--color-accent)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <h4 className="font-bold text-[var(--color-primary-dark)] text-xl mb-3">Human Accountable</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">While AI powers our operating system, human stewards remain strictly responsible for trust, security, and final delivery.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-2xl h-full shadow-sm">
                <div className="mb-4 text-[var(--color-accent)]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <h4 className="font-bold text-[var(--color-primary-dark)] text-xl mb-3">Radical Transparency</h4>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed">Clear milestones, fixed scopes, and honest technical assessments. We say no when AI is not the right solution.</p>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </main>
  );
}
