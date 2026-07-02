import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { Link } from '@/src/routing';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Resources | ' + siteConfig.companyName,
  description: 'Engineering intelligence from the Qeltrava AI team. Case studies, insights, guides, and tools to help you build AI-native systems.',
};

type Category = 'All' | 'Insights' | 'Case Studies' | 'Guides' | 'Tools';

const resources: {
  category: Exclude<Category, 'All'>;
  title: string;
  desc: string;
  readTime: string;
  href: string;
  featured?: boolean;
}[] = [
  {
    category: 'Insights',
    title: 'Why AI-Native Architecture Is an Architecture Decision, Not a Feature Toggle',
    desc: 'The real cost of bolting AI onto a system not designed for it — and the right way to architect from day one.',
    readTime: '7 min read',
    href: '/insights/ai-native-architecture-decision',
    featured: true,
  },
  {
    category: 'Insights',
    title: 'The Four Signals That Tell You a Legacy System Is AI-Ready',
    desc: 'Not all legacy systems need full rewrites. Here is how to evaluate what is worth modernizing first.',
    readTime: '6 min read',
    href: '/insights/legacy-system-modernization-signals',
  },
  {
    category: 'Insights',
    title: 'What Enterprise Buyers Actually Check Before Signing an AI Engineering Contract',
    desc: 'A due-diligence checklist from the buyer side — and how to prepare your vendor for it.',
    readTime: '8 min read',
    href: '/insights/enterprise-buyer-due-diligence',
  },
  {
    category: 'Case Studies',
    title: 'Fintech Core Modernization',
    desc: 'How we migrated a 12-year-old core banking system to a modern event-driven architecture with zero downtime.',
    readTime: 'Case Study',
    href: '/case-studies/fintech-core-modernization',
  },
  {
    category: 'Case Studies',
    title: 'Healthcare AI Triage System',
    desc: 'Deploying a HIPAA-compliant AI triage engine that reduced admission wait times by 38%.',
    readTime: 'Case Study',
    href: '/case-studies/healthcare-ai-triage',
  },
  {
    category: 'Case Studies',
    title: 'Logistics Predictive Maintenance',
    desc: 'Building an IoT pipeline and ML maintenance model for a 500+ vehicle fleet with 92% predictive accuracy.',
    readTime: 'Case Study',
    href: '/case-studies/logistics-predictive-maintenance',
  },
  {
    category: 'Guides',
    title: 'AI Readiness Guide — Is Your Organization Ready for AI?',
    desc: 'A structured diagnostic framework to evaluate data maturity, infrastructure readiness, and workflow automation potential.',
    readTime: 'Guide · PDF',
    href: '/book-consultation',
  },
  {
    category: 'Tools',
    title: 'AI Strategy Quiz',
    desc: 'A 2-minute qualification tool that identifies which Qeltrava AI solution fits your current stage.',
    readTime: '2 min',
    href: '/quiz',
  },
  {
    category: 'Tools',
    title: 'ROI Calculator',
    desc: 'Estimate how much operational overhead your organization can recapture through intelligent automation.',
    readTime: 'Interactive',
    href: '/roi-calculator',
  },
];

const CATEGORY_COLORS: Record<Exclude<Category, 'All'>, string> = {
  Insights: 'bg-blue-100 text-blue-700',
  'Case Studies': 'bg-emerald-100 text-emerald-700',
  Guides: 'bg-amber-100 text-amber-700',
  Tools: 'bg-purple-100 text-purple-700',
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <FadeIn>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
            Resource Hub
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">Resources</h1>
          <p className="text-xl text-[var(--color-text-main)] max-w-2xl">
            Engineering intelligence from the Qeltrava AI team.
          </p>
        </FadeIn>
      </div>

      {/* Filter tabs — static for SSG (filter via URL params could be added later) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <div className="flex overflow-x-auto gap-2 pb-1">
          {(['All', 'Insights', 'Case Studies', 'Guides', 'Tools'] as Category[]).map((cat) => (
            <div
              key={cat}
              className={`text-sm font-semibold px-5 py-2 rounded-full whitespace-nowrap border cursor-default ${
                cat === 'All'
                  ? 'bg-[var(--color-primary-dark)] text-white border-transparent'
                  : 'bg-white border-[var(--color-border-soft)] text-[var(--color-text-main)]'
              }`}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((item) => (
            <FadeIn key={item.href} direction="up">
              <Link
                href={item.href as any}
                className={`flex flex-col h-full rounded-2xl border bg-white hover:shadow-lg hover:border-[var(--color-accent)]/30 transition-all p-6 group ${
                  item.featured ? 'border-[var(--color-accent)]/40 ring-1 ring-[var(--color-accent)]/20' : 'border-[var(--color-border-soft)]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_COLORS[item.category]}`}>
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-[var(--color-primary-dark)] mb-2 group-hover:text-[var(--color-accent)] transition-colors leading-snug flex-grow">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border-soft)]">
                  <span className="text-xs font-mono text-[var(--color-text-main)]/50">{item.readTime}</span>
                  <span className="text-xs font-bold text-[var(--color-accent)] group-hover:underline">Read →</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </main>
  );
}
