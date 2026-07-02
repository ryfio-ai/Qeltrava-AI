import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { Link } from '@/src/routing';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Our Team | ' + siteConfig.companyName,
  description: 'Meet the founding engineering team behind Qeltrava AI. PSG College of Technology, Class of 2026. Building the firm we would have wanted to hire.',
};

const roles = [
  {
    initials: 'AO',
    title: 'AI Orchestration Engineer',
    tags: ['LangChain', 'Vector Databases', 'Agent Design'],
    bio: 'Designs and deploys multi-agent LLM pipelines, vector retrieval systems, and LLM fallback chains. Specializes in RAG architecture and agent evaluation frameworks.',
  },
  {
    initials: 'SA',
    title: 'Systems Architect',
    tags: ['Distributed Systems', 'Kafka', 'Kubernetes'],
    bio: 'Leads infrastructure design for high-throughput data pipelines, event-driven architectures, and cloud-native deployments. Owns technical scoping and milestone structure.',
  },
  {
    initials: 'FS',
    title: 'Full-Stack Engineer',
    tags: ['Next.js', 'FastAPI', 'PostgreSQL'],
    bio: 'Builds the product interfaces and API layers that connect AI backends to user-facing experiences. Specialized in data schema design and end-to-end feature delivery.',
  },
  {
    initials: 'SE',
    title: 'Security Engineer',
    tags: ['Zero-Trust', 'RBAC', 'SOC 2'],
    bio: 'Implements security perimeters, secrets management, RBAC policies, and compliance frameworks. Reviews all external-facing code for vulnerabilities before production deployment.',
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <FadeIn>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
            The Team
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">The Engineering Team</h1>
          <p className="text-xl text-[var(--color-text-main)] max-w-2xl leading-relaxed">
            PSG College of Technology, Class of 2026.<br />
            Building the firm we would have wanted to hire.
          </p>
        </FadeIn>
      </div>

      {/* Team grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, i) => (
            <FadeIn key={role.title} delay={i * 0.1} direction="up">
              <div className="bg-white border border-[var(--color-border-soft)] rounded-2xl overflow-hidden hover:shadow-md hover:border-[var(--color-accent)]/30 transition-all h-full flex flex-col">
                {/* Photo placeholder */}
                <div className="h-32 bg-[var(--color-bg-light)] flex items-center justify-center">
                  <span className="text-3xl font-extrabold text-[var(--color-accent)] font-mono select-none">
                    {role.initials}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-[var(--color-primary-dark)] mb-3 leading-snug">{role.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {role.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-[var(--color-text-main)] leading-relaxed flex-grow">{role.bio}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* We're Hiring CTA */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <div className="bg-[var(--color-primary-dark)] text-white rounded-3xl px-8 py-12">
          <h2 className="text-2xl font-bold mb-3">We're hiring</h2>
          <p className="text-white/70 leading-relaxed mb-6 max-w-xl mx-auto">
            Building AI-native engineering capacity for global clients. We hire engineers who care about architecture, not just shipping.
          </p>
          <Button href="/careers" variant="outline">
            View Open Roles →
          </Button>
        </div>
      </div>
    </main>
  );
}
