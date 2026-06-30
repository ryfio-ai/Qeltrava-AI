import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { VisualDigitalTransformation } from '@/components/ui/VisualDigitalTransformation';

export const metadata: Metadata = {
  title: 'Solutions Hub | ' + siteConfig.companyName,
  description: 'Outcome-bundled solutions combining multiple engineering services.',
};

export default function SolutionsHubPage() {
  const solutions = [
    { title: 'AI Customer Service Transformation', href: '/solutions/ai-customer-service-transformation', desc: 'Deploy intelligent agents to resolve customer queries automatically.' },
    { title: 'AI Operations Automation', href: '/solutions/ai-operations-automation', desc: 'Streamline internal workflows and reduce operational overhead.' },
    { title: 'Legacy Modernization', href: '/solutions/legacy-modernization', desc: 'Upgrade outdated systems with modern, cloud-native architectures.' },
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol, i) => (
              <FadeIn key={sol.href} delay={i * 0.1}>
                <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">{sol.title}</h3>
                  <p className="text-[var(--color-text-main)] mb-6 flex-grow">{sol.desc}</p>
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
