import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { Link } from '@/src/routing';
import { siteConfig } from '@/lib/site-config';
import { VisualDigitalTransformation } from '@/components/ui/VisualDigitalTransformation';

export const metadata: Metadata = {
  title: 'Solutions | ' + siteConfig.companyName,
  description: 'Outcome-bundled solutions combining multiple engineering services.',
};

export default function SolutionsPage() {
  const solutions = [
    {
      title: 'AI Customer Service Transformation',
      href: '/solutions/ai-customer-service-transformation',
      problem: 'For organizations that face high support ticket volume, slow customer response times, and rising call-center staff overhead.',
      services: ['AI Automation', 'SaaS Development', 'Cybersecurity'],
      outcome: 'Automate up to 70% of standard customer inquiries safely and securely.',
      desc: 'Deploy intelligent, HIPAA/GDPR-compliant conversational agents that hook directly into your customer databases.'
    },
    {
      title: 'AI Operations Automation',
      href: '/solutions/ai-operations-automation',
      problem: 'For organizations that want to eliminate manual document indexing, optimize back-office schedules, or automate invoice approvals.',
      services: ['AI Automation', 'Data Analytics', 'Product Engineering'],
      outcome: 'Reduce back-office workflow execution time by up to 80%.',
      desc: 'Inject custom LLM pipelines, Retrieval-Augmented Generation (RAG), and automation triggers into your operations.'
    },
    {
      title: 'Legacy Modernization',
      href: '/solutions/legacy-modernization',
      problem: 'For organizations that are held back by monolithic codebase bottlenecks, security compliance issues, or high cloud server bills.',
      services: ['Cloud & DevOps', 'Product Engineering', 'Cybersecurity'],
      outcome: 'Strangler-fig migration to auto-scaling container microservices with zero downtime.',
      desc: 'Systematically decompose monolithic structures into secure, testable, and cloud-native microservices.'
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        <FadeIn>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Outcome Solutions</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We package our engineering capabilities into outcome-driven solutions that solve specific business challenges.
            </p>
          </div>
        </FadeIn>

        <section>
          <VisualDigitalTransformation />
        </section>

        <section className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((sol, i) => (
              <FadeIn key={sol.href} delay={i * 0.1}>
                <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3 leading-snug">{sol.title}</h3>
                    
                    <p className="text-xs font-semibold text-[var(--color-accent)] mb-3 leading-relaxed">
                      {sol.problem}
                    </p>
                    
                    <p className="text-sm text-[var(--color-text-main)] mb-4 leading-relaxed">
                      {sol.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {sol.services.map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-[10px] font-mono font-medium bg-[var(--color-bg-light)] text-[var(--color-primary-dark)] border border-[var(--color-border-soft)] rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                    
                    <div className="border-t border-[var(--color-border-soft)] pt-3 mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">Expected Outcome:</span>
                      <p className="text-xs font-semibold text-emerald-600 leading-relaxed">
                        {sol.outcome}
                      </p>
                    </div>
                  </div>
                  
                  <Button href={sol.href} variant="outline" className="w-full">
                    Explore Solution
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
