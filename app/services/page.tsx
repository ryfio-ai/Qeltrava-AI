import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Services Hub | ' + siteConfig.companyName,
  description: 'Explore our AI-native engineering services, from SaaS development to AI automation.',
};

export default function ServicesHubPage() {
  const services = [
    { title: 'AI Automation', href: '/services/ai-automation', desc: 'Automate high-value workflows with custom agents.' },
    { title: 'Cloud DevOps', href: '/services/cloud-devops', desc: 'Enterprise-grade scalable infrastructure.' },
    { title: 'Cybersecurity', href: '/services/cybersecurity', desc: 'Secure by design systems and compliance.' },
    { title: 'Data Analytics', href: '/services/data-analytics', desc: 'Actionable intelligence from unstructured data.' },
    { title: 'Product Engineering', href: '/services/product-engineering', desc: 'End-to-end software architecture.' },
    { title: 'SaaS Development', href: '/services/saas-development', desc: 'Launch multi-tenant scalable applications.' },
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Engineering Services</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We design, engineer, and deploy intelligent software systems for organizations that demand precision, security, and measurable ROI.
            </p>
          </div>
        </FadeIn>

        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <FadeIn key={service.href} delay={i * 0.1}>
                <div className="p-8 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-3">{service.title}</h3>
                  <p className="text-[var(--color-text-main)] mb-6 flex-grow">{service.desc}</p>
                  <Button href={service.href} variant="outline" className="w-full">
                    Explore Service
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
