import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Case Studies | ' + siteConfig.companyName,
  description: 'Explore how we have engineered scalable software systems and automated complex workflows for enterprise clients.',
};

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      id: "fintech-core-modernization",
      client: "Global Fintech Provider (Anonymized)",
      industry: "Financial Services",
      title: "Migrating a legacy monolithic core to a scalable microservices architecture with zero downtime.",
      problem: "A high-growth fintech provider was experiencing critical system bottlenecks during peak trading hours. Their legacy monolithic architecture, built 8 years prior, could not scale dynamically, resulting in high infrastructure costs and unacceptably high latency during market volatility.",
      approach: "Qeltrava AI deployed a specialized squad of Cloud and DevOps architects. We designed a transition roadmap to a Kubernetes-orchestrated microservices architecture. Using our Qeltrava Delivery OS, we implemented Infrastructure as Code (IaC) and established a parallel blue-green deployment strategy to ensure zero downtime during the migration.",
      result: "The migration reduced core transaction latency by 45% and reduced overall cloud compute costs by 30% through dynamic auto-scaling. The client can now deploy feature updates multiple times a day instead of once a month."
    },
    {
      id: "healthcare-ai-triage",
      client: "National Healthcare Network (Anonymized)",
      industry: "Healthcare",
      title: "Automating patient intake and initial triage using strict HIPAA-compliant conversational AI.",
      problem: "The healthcare network's patient support center was overwhelmed with routine scheduling, intake, and non-emergency medical inquiries, leading to 45-minute average hold times and a severe drop in patient satisfaction.",
      approach: "We engineered a secure, HIPAA-compliant conversational AI agent integrated directly into their EHR (Electronic Health Record) system. The agent uses strict fallback mechanisms, immediately routing to human operators if uncertainty thresholds are crossed or if emergency intent is detected.",
      result: "The AI agent now successfully resolves 68% of all incoming patient queries without human intervention. Average hold times dropped to under 2 minutes, and operational overhead at the call center was reduced by $1.2M annually."
    },
    {
      id: "logistics-predictive-maintenance",
      client: "Enterprise Supply Chain Operator",
      industry: "Logistics",
      title: "Implementing predictive maintenance models to reduce fleet downtime.",
      problem: "A major logistics operator was losing millions annually to unplanned fleet vehicle breakdowns and inefficient scheduled maintenance that pulled healthy vehicles off the road unnecessarily.",
      approach: "Our Data Analytics team aggregated raw telemetry data from over 4,000 vehicles. We engineered a machine learning pipeline that predicts mechanical failures based on engine temperature patterns, vibration telemetry, and historical maintenance logs.",
      result: "Unplanned downtime was reduced by 38%. The predictive model correctly identifies failure risks 14 days in advance with 92% accuracy, allowing maintenance to be scheduled precisely when needed."
    }
  ];

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">Case Studies</h1>
            <p className="text-xl text-[var(--color-text-main)] leading-relaxed max-w-3xl">
              We don't build software; we engineer business outcomes. Review our recent engagements demonstrating how AI-native architecture solves complex enterprise challenges.
            </p>
          </div>
        </FadeIn>

        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <FadeIn key={study.id} delay={index * 0.1}>
              <div className="bg-white border border-[var(--color-border-soft)] rounded-2xl p-8 lg:p-12 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  
                  {/* Left Column: Metadata */}
                  <div className="lg:w-1/3">
                    <div className="inline-block px-3 py-1 bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold rounded-full mb-4">
                      {study.industry}
                    </div>
                    <h3 className="text-sm font-bold text-[var(--color-text-main)] uppercase tracking-wider mb-2">Client</h3>
                    <p className="font-medium text-[var(--color-primary-dark)] mb-6">{study.client}</p>
                    <h2 className="text-2xl font-bold text-[var(--color-primary-dark)] leading-snug">{study.title}</h2>
                  </div>

                  {/* Right Column: Content */}
                  <div className="lg:w-2/3 space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-[var(--color-primary-dark)] mb-2">The Problem</h4>
                      <p className="text-[var(--color-text-main)] leading-relaxed">{study.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[var(--color-primary-dark)] mb-2">Our Approach</h4>
                      <p className="text-[var(--color-text-main)] leading-relaxed">{study.approach}</p>
                    </div>
                    <div className="p-6 bg-[var(--color-primary-dark)] rounded-xl">
                      <h4 className="text-lg font-bold text-white mb-2">The Result</h4>
                      <p className="text-white/90 leading-relaxed">{study.result}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </main>
  );
}
