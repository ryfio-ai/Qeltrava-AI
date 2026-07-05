import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { ArchitectureDiagram } from '@/components/ui/ArchitectureDiagram';
import { ResultsChart } from '@/components/ui/ResultsChart';
import { TechStackBadgeRow } from '@/components/ui/TechStackBadgeRow';
import { caseStudiesData } from '@/lib/case-studies-data';
import { getCaseStudy } from '@/platform/modules/cms/module';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const locales = ['en', 'es', 'de', 'fr', 'pt-BR', 'ar'];
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    for (const study of caseStudiesData) {
      params.push({ locale, slug: study.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbStudy = await getCaseStudy(slug);
  let study;
  if (dbStudy) {
    study = dbStudy;
  } else {
    study = caseStudiesData.find(s => s.id === slug);
  }
  if (!study) return {};

  return {
    title: `${study.client} Case Study | ${siteConfig.companyName}`,
    description: study.problem,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  const dbStudy = await getCaseStudy(slug);
  let study;
  
  if (dbStudy) {
    study = {
      id: dbStudy.id,
      client: dbStudy.client,
      industry: dbStudy.industry,
      title: dbStudy.title,
      problem: dbStudy.problem,
      approach: dbStudy.solution, // map solution as approach
      result: dbStudy.results ? dbStudy.results.join(' ') : '', 
      technologies: dbStudy.tech_stack || [],
      diagramVariant: dbStudy.diagram_variant || 'operating-model',
      metrics: dbStudy.metrics || []
    };
  } else {
    study = caseStudiesData.find(s => s.id === slug);
  }

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-8 flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-[var(--color-text-main)] opacity-70 flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--color-accent)] hover:underline">
            Home
          </Link>
          <span>→</span>
          <Link href="/case-studies" className="hover:text-[var(--color-accent)] hover:underline">
            Case Studies
          </Link>
          <span>→</span>
          <span className="text-[var(--color-primary-dark)] font-semibold truncate max-w-[200px] md:max-w-xs">
            {study.client}
          </span>
        </nav>

        {/* Header */}
        <FadeIn>
          <header className="border-b border-[var(--color-border-soft)] pb-8">
            <div className="flex items-center gap-4 mb-4 text-xs font-semibold text-[var(--color-accent)]">
              <span className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                {study.industry}
              </span>
              <span className="text-[var(--color-text-main)] opacity-75">
                Illustrative Client Case
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] tracking-tight leading-tight mb-6">
              {study.title}
            </h1>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-[var(--color-text-main)]">
                Client: <span className="text-[var(--color-primary-dark)] font-bold">{study.client}</span>
              </div>
              <TechStackBadgeRow technologies={study.technologies} className="mt-2" />
            </div>
          </header>
        </FadeIn>

        {/* Content body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main sections */}
          <div className="lg:col-span-8 space-y-8 text-[var(--color-text-main)] leading-relaxed">
            
            <FadeIn delay={0.1}>
              <div>
                <h2 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3">The Challenge</h2>
                <p className="text-base">{study.problem}</p>
              </div>
            </FadeIn>

            {/* Architecture diagram if applicable */}
            <FadeIn delay={0.2}>
              <div className="py-6 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-2xl p-6">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 block mb-4">
                  System Architecture Diagram (Illustrative)
                </span>
                <ArchitectureDiagram variant={study.diagramVariant} />
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div>
                <h2 className="text-xl font-bold text-[var(--color-primary-dark)] mb-3">Our Engineering Approach</h2>
                <p className="text-base">{study.approach}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="p-6 bg-[var(--color-primary-dark)] text-white rounded-2xl">
                <h2 className="text-lg font-bold text-white mb-2">The Measurable Outcome</h2>
                <p className="text-sm text-white/90 leading-relaxed">{study.result}</p>
              </div>
            </FadeIn>

          </div>

          {/* Sidebar metrics */}
          <div className="lg:col-span-4 space-y-6">
            <FadeIn delay={0.2}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary-dark)] mb-4 border-b pb-2">
                  Impact Metrics
                </h3>
                <ResultsChart isIllustrative={true} data={study.metrics} />
                <span className="block mt-4 text-[9px] font-medium text-gray-400 italic leading-snug">
                  * Metrics represent illustrative outcomes observed under typical scale.
                </span>
              </div>
            </FadeIn>
          </div>

        </div>

        {/* Back Link */}
        <div className="border-t border-[var(--color-border-soft)] pt-8 mt-4">
          <Link href="/case-studies" className="text-sm font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1.5">
            <span>←</span> Back to Case Studies
          </Link>
        </div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.2}>
          <div className="p-10 bg-[var(--color-primary-dark)] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to achieve similar results?</h3>
              <p className="text-white/80">Speak directly with our senior engineering team.</p>
            </div>
            <Button href="/book-consultation" className="bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 border-transparent whitespace-nowrap">
              Book an AI Strategy Call
            </Button>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
