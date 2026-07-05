import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { TechStackBadgeRow } from '@/components/ui/TechStackBadgeRow';
import { caseStudiesData } from '@/lib/case-studies-data';
import { getCaseStudies } from '@/platform/modules/cms/module';

export const metadata: Metadata = {
  title: 'Case Studies | ' + siteConfig.companyName,
  description: 'Explore how we have engineered scalable software systems and automated complex workflows for enterprise clients.',
};

export default async function CaseStudiesPage() {
  const dbStudies = await getCaseStudies();
  const studiesList = dbStudies.length > 0 ? dbStudies.map(study => ({
    id: study.id,
    client: study.client,
    industry: study.industry,
    title: study.title,
    problem: study.problem,
    technologies: study.tech_stack || []
  })) : caseStudiesData;

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        <FadeIn>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Case Studies</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We don't build software; we engineer business outcomes. Review our recent engagements demonstrating how AI-native architecture solves complex enterprise challenges.
            </p>
          </div>
        </FadeIn>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {studiesList.map((study, idx) => (
            <FadeIn key={study.id} delay={idx * 0.1}>
              <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-full uppercase tracking-wider">
                      {study.industry}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-main)] opacity-70">
                      Anonymized Data
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3 leading-snug">
                    {study.title}
                  </h3>
                  <div className="text-xs text-[var(--color-text-main)] font-semibold mb-4">
                    Client: <span className="text-[var(--color-primary-dark)]">{study.client}</span>
                  </div>
                  <p className="text-sm text-[var(--color-text-main)] mb-6 leading-relaxed">
                    {study.problem.substring(0, 180)}...
                  </p>
                  
                  <div className="mb-6">
                    <TechStackBadgeRow technologies={study.technologies.slice(0, 3)} />
                  </div>
                </div>

                <Button href={`/case-studies/${study.id}`} variant="outline" className="w-full mt-auto">
                  Read Case Study →
                </Button>
              </div>
            </FadeIn>
          ))}
        </section>
      </div>
    </main>
  );
}
