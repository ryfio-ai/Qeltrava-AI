"use client";

import React, { useState } from 'react';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';

interface Metric {
  value: string;
  label: string;
}

interface IndustryData {
  id: string;
  label: string;
  headline: string;
  para1: string;
  para2: string;
  metrics: Metric[];
  ctaLabel: string;
  ctaHref: string;
  archDiagram: React.ReactNode;
}

const DiagramFintech = () => (
  <div className="relative bg-[var(--color-primary-dark)] rounded-2xl p-6 h-full min-h-[280px] flex flex-col gap-3 font-mono text-xs overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
    {[
      { label: 'Core Banking API', color: 'bg-[var(--color-accent)]' },
      { label: 'ML Risk Engine', color: 'bg-[var(--color-success)]' },
      { label: 'Audit Log Stream (Kafka)', color: 'bg-purple-500/80' },
      { label: 'Regulatory Report → SFTP', color: 'bg-white/30' },
    ].map((row, i) => (
      <div key={i} className="flex items-center gap-3 relative z-10">
        <div className={`w-2 h-2 rounded-full ${row.color} flex-shrink-0`} />
        <div className={`text-white/80 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex-grow truncate`}>{row.label}</div>
      </div>
    ))}
    <div className="text-[10px] text-white/30 relative z-10 mt-auto italic">Architecture — Illustrative</div>
  </div>
);

const DiagramHealthcare = () => (
  <div className="relative bg-[var(--color-primary-dark)] rounded-2xl p-6 h-full min-h-[280px] flex flex-col gap-3 font-mono text-xs overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
    {[
      { label: 'EHR Integration (FHIR R4)', color: 'bg-[var(--color-accent)]' },
      { label: 'AI Triage Model → Admission', color: 'bg-[var(--color-success)]' },
      { label: 'HIPAA Vault + Encryption', color: 'bg-amber-500/80' },
      { label: 'Outcome Dashboard → BI', color: 'bg-white/30' },
    ].map((row, i) => (
      <div key={i} className="flex items-center gap-3 relative z-10">
        <div className={`w-2 h-2 rounded-full ${row.color} flex-shrink-0`} />
        <div className={`text-white/80 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex-grow truncate`}>{row.label}</div>
      </div>
    ))}
    <div className="text-[10px] text-white/30 relative z-10 mt-auto italic">Architecture — Illustrative</div>
  </div>
);

const DiagramLogistics = () => (
  <div className="relative bg-[var(--color-primary-dark)] rounded-2xl p-6 h-full min-h-[280px] flex flex-col gap-3 font-mono text-xs overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
    {[
      { label: 'IoT Sensor Fleet (MQTT)', color: 'bg-[var(--color-accent)]' },
      { label: 'Predictive Maintenance ML', color: 'bg-[var(--color-success)]' },
      { label: 'Route Optimizer Engine', color: 'bg-cyan-500/80' },
      { label: 'Inventory Sync → ERP', color: 'bg-white/30' },
    ].map((row, i) => (
      <div key={i} className="flex items-center gap-3 relative z-10">
        <div className={`w-2 h-2 rounded-full ${row.color} flex-shrink-0`} />
        <div className={`text-white/80 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex-grow truncate`}>{row.label}</div>
      </div>
    ))}
    <div className="text-[10px] text-white/30 relative z-10 mt-auto italic">Architecture — Illustrative</div>
  </div>
);

const DiagramGovernment = () => (
  <div className="relative bg-[var(--color-primary-dark)] rounded-2xl p-6 h-full min-h-[280px] flex flex-col gap-3 font-mono text-xs overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
    {[
      { label: 'Air-gapped LLM Deploy', color: 'bg-[var(--color-accent)]' },
      { label: 'Semantic Doc Search (RAG)', color: 'bg-[var(--color-success)]' },
      { label: 'Zero-Trust Auth (SAML)', color: 'bg-red-500/80' },
      { label: 'Audit Trail → SIEM', color: 'bg-white/30' },
    ].map((row, i) => (
      <div key={i} className="flex items-center gap-3 relative z-10">
        <div className={`w-2 h-2 rounded-full ${row.color} flex-shrink-0`} />
        <div className={`text-white/80 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex-grow truncate`}>{row.label}</div>
      </div>
    ))}
    <div className="text-[10px] text-white/30 relative z-10 mt-auto italic">Architecture — Illustrative</div>
  </div>
);

const DiagramManufacturing = () => (
  <div className="relative bg-[var(--color-primary-dark)] rounded-2xl p-6 h-full min-h-[280px] flex flex-col gap-3 font-mono text-xs overflow-hidden">
    <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
    {[
      { label: 'PLC Sensor Telemetry', color: 'bg-[var(--color-accent)]' },
      { label: 'Defect Detection (CV Model)', color: 'bg-[var(--color-success)]' },
      { label: 'Downtime Predictor (XGBoost)', color: 'bg-orange-500/80' },
      { label: 'Supply Chain Optimizer', color: 'bg-white/30' },
    ].map((row, i) => (
      <div key={i} className="flex items-center gap-3 relative z-10">
        <div className={`w-2 h-2 rounded-full ${row.color} flex-shrink-0`} />
        <div className={`text-white/80 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex-grow truncate`}>{row.label}</div>
      </div>
    ))}
    <div className="text-[10px] text-white/30 relative z-10 mt-auto italic">Architecture — Illustrative</div>
  </div>
);

const industries: IndustryData[] = [
  {
    id: 'fintech',
    label: 'Fintech',
    headline: 'AI-Native Banking Infrastructure That Passes Regulatory Scrutiny',
    para1: 'Legacy core banking systems are a liability when regulators demand real-time audit trails and ML-driven risk scoring. We rebuild the foundational data layer — from transaction schema to API gateway — so modern AI can run on top without disrupting live operations.',
    para2: 'Our team has engineered PCI-DSS-compliant payment pipelines, ML-powered credit decisioning modules, and core banking migration projects with zero-downtime cutover strategies.',
    metrics: [
      { value: '47%', label: 'Latency reduction in transaction scoring' },
      { value: 'Zero', label: 'Downtime on core migration' },
      { value: 'PCI-DSS', label: 'Compliance configured from day one' },
    ],
    ctaLabel: 'Explore Fintech Solutions',
    ctaHref: '/industries/fintech',
    archDiagram: <DiagramFintech />,
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    headline: 'Clinical AI Built on HIPAA-Compliant Data Architecture',
    para1: 'Healthcare data is the hardest data to get right — fragmented, regulated, and high-stakes. We architect EHR integration layers using FHIR R4, deploy AI triage engines that comply with HIPAA from day one, and build audit trails that satisfy privacy officers.',
    para2: 'From patient admission prediction models to intelligent clinical documentation assistants, we handle the full stack — including the security perimeter that keeps PHI safe.',
    metrics: [
      { value: 'HIPAA', label: 'Compliant from day one' },
      { value: '38%', label: 'Reduction in manual clinical documentation' },
      { value: 'FHIR R4', label: 'EHR integration standard' },
    ],
    ctaLabel: 'Explore Healthcare Solutions',
    ctaHref: '/industries/healthcare',
    archDiagram: <DiagramHealthcare />,
  },
  {
    id: 'logistics',
    label: 'Logistics',
    headline: 'Predictive Intelligence Across the Entire Supply Chain',
    para1: 'Logistics failures are expensive and visible. We deploy IoT telemetry pipelines, predictive maintenance ML models, and dynamic routing optimization engines to reduce downtime, cut fuel waste, and improve on-time delivery rates.',
    para2: 'Our logistics engineering stack includes MQTT sensor ingestion, real-time fleet dashboards, and vendor API integrations — built to scale across thousands of assets simultaneously.',
    metrics: [
      { value: '92%', label: 'Predictive accuracy on ML maintenance pipeline' },
      { value: '31%', label: 'Reduction in unplanned fleet downtime' },
      { value: '24/7', label: 'Real-time telemetry monitoring' },
    ],
    ctaLabel: 'Explore Logistics Solutions',
    ctaHref: '/industries/logistics',
    archDiagram: <DiagramLogistics />,
  },
  {
    id: 'government',
    label: 'Government',
    headline: 'Secure AI Systems for Public Sector Mandates',
    para1: 'Government agencies require air-gapped infrastructure, strict access control, and compliant document handling before any AI can be deployed. We build on-premises LLM pipelines, zero-trust authentication grids, and semantic document search vaults that pass government security reviews.',
    para2: 'Whether it is a SAML-integrated citizen portal or a vector search system for public records, we architect every layer to meet sovereign data requirements.',
    metrics: [
      { value: 'Zero-Trust', label: 'Security architecture baseline' },
      { value: 'On-prem', label: 'Air-gapped LLM deployment options' },
      { value: 'SAML/SSO', label: 'Federated identity integration' },
    ],
    ctaLabel: 'Explore Government Solutions',
    ctaHref: '/government',
    archDiagram: <DiagramGovernment />,
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    headline: 'Factory-Floor Intelligence From Sensor to Decision',
    para1: 'Manufacturing plants generate enormous volumes of sensor data that most organizations cannot act on in real time. We build PLC telemetry pipelines, computer vision quality control models, and predictive maintenance engines that reduce line downtime and improve output consistency.',
    para2: 'Our manufacturing AI stack integrates directly with existing ERP systems, providing real-time visibility into production bottlenecks and automated alerting on equipment anomalies.',
    metrics: [
      { value: '28%', label: 'Reduction in unplanned machine downtime' },
      { value: '99.4%', label: 'Defect detection accuracy (CV model)' },
      { value: 'Real-time', label: 'Telemetry-to-action latency target' },
    ],
    ctaLabel: 'Explore Manufacturing Solutions',
    ctaHref: '/industries/manufacturing',
    archDiagram: <DiagramManufacturing />,
  },
];

export const IndustryShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const industry = industries[activeTab];

  return (
    <section className="py-24 bg-white border-t border-[var(--color-border-soft)] select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Heading */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">
            Industry Specialization
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] max-w-3xl leading-tight">
            Built for the industries where software actually matters.
          </h2>
          <p className="text-lg text-[var(--color-text-main)] mt-4 max-w-2xl">
            Deep specialization. Real compliance knowledge. Vertical delivery.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex overflow-x-auto gap-1 pb-1 mb-10 border-b border-[var(--color-border-soft)]">
          {industries.map((ind, i) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(i)}
              className={`text-sm font-semibold px-5 py-2.5 whitespace-nowrap border-b-2 transition-all focus:outline-none ${
                activeTab === i
                  ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
                  : 'border-transparent text-[var(--color-text-main)] hover:text-[var(--color-accent)] hover:border-[var(--color-border-soft)]'
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Tab panel */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left (3/5) */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] leading-snug mb-5">
              {industry.headline}
            </h3>
            <p className="text-[var(--color-text-main)] leading-relaxed mb-4">{industry.para1}</p>
            <p className="text-[var(--color-text-main)] leading-relaxed mb-8">{industry.para2}</p>

            {/* Metric pills */}
            <div className="flex flex-wrap gap-3 mb-3">
              {industry.metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] rounded-xl px-4 py-2"
                >
                  <span className="text-lg font-extrabold text-[var(--color-accent)] font-mono leading-none">{m.value}</span>
                  <span className="text-xs font-semibold text-[var(--color-text-main)] max-w-[140px] leading-snug">{m.label}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] italic text-gray-400 mb-6">Illustrative Data — benchmarks based on comparable project outcomes.</p>

            <Button href={industry.ctaHref as any} variant="primary">
              {industry.ctaLabel} →
            </Button>
          </div>

          {/* Right (2/5) — architecture diagram */}
          <div className="lg:col-span-2">
            {industry.archDiagram}
          </div>
        </div>
      </div>
    </section>
  );
};
