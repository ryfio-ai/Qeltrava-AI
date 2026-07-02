import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Enterprise Data Foundation | ' + siteConfig.companyName,
  description: 'Design and build secure, scalable data warehouses, ETL pipelines, and structured analytics bases for business operations.',
};

export default function DataFoundationPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24 select-none">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <span className="text-xs font-mono font-bold uppercase text-[var(--color-accent)] tracking-widest block mb-2">Outcome Solution</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Enterprise Data Foundation</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              Consolidate disconnected internal APIs, database shards, and unstructured server logs into a clean, query-optimized analytics engine.
            </p>
          </div>
        </FadeIn>

        <section className="mb-20">
          <FadeIn direction="up">
            <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] mb-6 border-b border-[var(--color-border-soft)] pb-4">Key Capabilities</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Automated ETL Pipelines</p>
                <p className="text-xs text-[var(--color-text-main)]">Write robust pipelines using dbt, Airflow, and Kafka for live synchronization.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Data Warehouse Setup</p>
                <p className="text-xs text-[var(--color-text-main)]">Configure query-optimized warehouses on Snowflake, BigQuery, or Amazon Redshift.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-6 bg-white border border-[var(--color-border-soft)] rounded-xl shadow-sm h-full">
                <p className="text-sm font-semibold text-[var(--color-primary-dark)] mb-2">Data Governance Grids</p>
                <p className="text-xs text-[var(--color-text-main)]">Enforce security controls, database cataloging schemas, and compliance audits.</p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="p-8 bg-[var(--color-bg-light)] rounded-2xl text-center">
          <h3 className="text-xl font-bold text-[var(--color-primary-dark)] mb-4">Design your enterprise database foundation with our architects</h3>
          <Button href="/book-consultation" variant="primary">
            Schedule a Scoping Call
          </Button>
        </section>
      </div>
    </main>
  );
}
