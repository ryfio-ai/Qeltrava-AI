import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { insightsArticles } from '@/lib/insights-data';
import { getBlogPost } from '@/platform/modules/cms/module';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  // Since we have multiple locales, we need to generate static params for all of them
  const locales = ['en', 'es', 'de', 'fr', 'pt-BR', 'ar'];
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    for (const article of insightsArticles) {
      params.push({ locale, slug: article.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbBlog = await getBlogPost(slug);
  let article;
  if (dbBlog) {
    article = dbBlog;
  } else {
    article = insightsArticles.find(a => a.slug === slug);
  }
  if (!article) return {};

  return {
    title: `${article.title} | ${siteConfig.companyName}`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  
  const dbBlog = await getBlogPost(slug);
  let article;
  
  if (dbBlog) {
    article = {
      slug: dbBlog.slug,
      title: dbBlog.title,
      summary: dbBlog.summary || '',
      category: dbBlog.category,
      date: dbBlog.published_at 
        ? new Date(dbBlog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : new Date(dbBlog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: dbBlog.read_time || '5 min read',
      author: dbBlog.author,
      content: typeof dbBlog.content === 'string' ? dbBlog.content.split('\n\n') : dbBlog.content
    };
  } else {
    article = insightsArticles.find(a => a.slug === slug);
  }

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8 flex flex-col gap-8">
        
        {/* Breadcrumbs */}
        <nav className="text-xs text-[var(--color-text-main)] opacity-70 flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--color-accent)] hover:underline">
            Home
          </Link>
          <span>→</span>
          <Link href="/insights" className="hover:text-[var(--color-accent)] hover:underline">
            Insights
          </Link>
          <span>→</span>
          <span className="text-[var(--color-primary-dark)] font-semibold truncate max-w-[200px] md:max-w-xs">
            {article.title}
          </span>
        </nav>

        {/* Article Meta */}
        <FadeIn>
          <header className="border-b border-[var(--color-border-soft)] pb-8">
            <div className="flex items-center gap-4 mb-4 text-xs font-semibold text-[var(--color-accent)]">
              <span className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-[var(--color-text-main)] opacity-75">
                {article.date} • {article.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary-dark)] tracking-tight leading-tight mb-6">
              {article.title}
            </h1>
            <div className="text-sm text-[var(--color-text-main)] font-medium">
              By <span className="text-[var(--color-primary-dark)] font-semibold">{article.author}</span>
            </div>
          </header>
        </FadeIn>

        {/* Article Body */}
        <FadeIn delay={0.1}>
          <article className="prose max-w-none text-[var(--color-text-main)] leading-relaxed space-y-6">
            
            {/* Highlighted Summary */}
            <div className="p-6 bg-[var(--color-bg-light)] border-l-4 border-[var(--color-accent)] rounded-r-xl mb-8">
              <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Executive Summary</p>
              <p className="text-sm leading-relaxed text-[var(--color-text-main)] font-medium">
                {article.summary}
              </p>
            </div>

            {article.content.map((paragraph, index) => {
              // Format headings dynamically
              if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ') || paragraph.startsWith('5. ')) {
                const parts = paragraph.split(': ');
                return (
                  <div key={index} className="pt-4">
                    <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2">{parts[0]}</h3>
                    <p className="text-base text-[var(--color-text-main)]">{parts.slice(1).join(': ')}</p>
                  </div>
                );
              }
              if (paragraph.startsWith('Signal ') || paragraph.startsWith('Dimension ')) {
                const parts = paragraph.split('. ');
                return (
                  <div key={index} className="pt-4">
                    <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-2">{parts[0]}</h3>
                    <p className="text-base text-[var(--color-text-main)]">{parts.slice(1).join('. ')}</p>
                  </div>
                );
              }
              return (
                <p key={index} className="text-base text-[var(--color-text-main)]">
                  {paragraph}
                </p>
              );
            })}
          </article>
        </FadeIn>

        {/* Back Link */}
        <div className="border-t border-[var(--color-border-soft)] pt-8 mt-4 flex items-center justify-between">
          <Link href="/insights" className="text-sm font-bold text-[var(--color-accent)] hover:underline flex items-center gap-1.5">
            <span>←</span> Back to Insights
          </Link>
        </div>

        {/* Bottom CTA */}
        <FadeIn direction="up" delay={0.2}>
          <div className="p-10 bg-[var(--color-primary-dark)] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-bold mb-2">Have questions about your architecture?</h3>
              <p className="text-white/80">Speak directly with our senior engineering partners.</p>
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
