const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'app');

const formatName = (slug) => {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getCopyForType = (type, name) => {
  if (type === 'services') {
    return {
      title: `${name} Engineering`,
      description: `We design and deploy enterprise-grade ${name.toLowerCase()} systems that automate complex workflows, reduce operational overhead, and ensure absolute compliance.`,
      benefits: ['Reduced manual intervention by up to 80%', 'Enterprise-grade security and RBAC', 'Seamless integration with existing architectures']
    };
  } else if (type === 'industries') {
    return {
      title: `AI for ${name}`,
      description: `Quantra AI provides the foundational engineering layer for ${name.toLowerCase()} organizations. We modernize legacy infrastructure and deploy intelligent systems tailored to strict regulatory requirements.`,
      benefits: ['Regulatory compliance out-of-the-box', 'Modernized legacy systems without downtime', 'Predictive analytics and data modeling']
    };
  }
  return {
    title: name,
    description: `Discover how Quantra AI approaches ${name.toLowerCase()} to deliver measurable business outcomes and architectural precision.`,
    benefits: ['Scalable architecture', 'Transparent delivery process', 'Long-term support retainers']
  };
};

const generatePageContent = (route, type) => {
  const parts = route.split(/\\|\//);
  const slug = parts[parts.length - 1];
  const name = formatName(slug);
  const copy = getCopyForType(type, name);

  return `import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: '${copy.title} | ' + siteConfig.companyName,
  description: '${copy.description}',
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">${copy.title}</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              ${copy.description}
            </p>
          </div>
        </FadeIn>

        <section className="mb-20">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Business Outcomes</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            ${copy.benefits.map((b, i) => `
            <FadeIn delay={0.${i + 1}}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <div className="w-8 h-8 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg flex items-center justify-center mb-4 font-bold">0${i+1}</div>
                <p className="text-sm font-medium text-[var(--color-primary-dark)]">${b}</p>
              </div>
            </FadeIn>
            `).join('')}
          </div>
        </section>

        <section className="mb-20">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Our Engineering Approach</h2>
            <p className="text-[var(--color-text-main)] mb-6">
              We do not sell hours. We sell capabilities. Every architecture decision in our ${copy.title} solutions is measured against its ability to reduce costs, increase revenue, or mitigate risk. We build secure, scalable platforms using our Quantra Delivery OS.
            </p>
          </FadeIn>
        </section>

        <FadeIn direction="up">
          <div className="p-10 bg-[var(--color-primary-dark)] text-white rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to transform your workflow?</h3>
              <p className="text-white/80">Schedule an AI Opportunity Audit to diagnose your business bottlenecks.</p>
            </div>
            <Button href="/book-consultation" className="bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 border-transparent whitespace-nowrap">
              Book a Strategy Call
            </Button>
          </div>
        </FadeIn>
      </div>
    </main>
  );
}
`;
};

const processDirectory = (dirPath, type) => {
  if (!fs.existsSync(dirPath)) return;
  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isDirectory()) {
      const fullPath = path.join(dirPath, item.name);
      const pagePath = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        // Overwrite existing placeholder pages
        const content = fs.readFileSync(pagePath, 'utf8');
        if (content.includes('under development') || content.includes('under construction')) {
          fs.writeFileSync(pagePath, generatePageContent(fullPath, type));
          console.log("Updated " + pagePath);
        }
      }
    }
  }
};

// Process main folders
processDirectory(path.join(baseDir, 'services'), 'services');
processDirectory(path.join(baseDir, 'industries'), 'industries');
processDirectory(path.join(baseDir, 'solutions'), 'solutions');

// Handle standalone pages
['products', 'case-studies', 'insights', 'privacy', 'terms'].forEach(slug => {
  const pagePath = path.join(baseDir, slug, 'page.tsx');
  if (fs.existsSync(pagePath)) {
     const content = fs.readFileSync(pagePath, 'utf8');
     if (content.includes('under development') || content.includes('under construction')) {
       fs.writeFileSync(pagePath, generatePageContent(path.join(baseDir, slug), 'page'));
       console.log("Updated " + pagePath);
     }
  }
});
