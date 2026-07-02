import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'AI & Software Engineering Glossary | ' + siteConfig.companyName,
  description: 'Clear definitions of the AI and software engineering terms we use in our work. From Agent to Zero Trust Architecture.',
};

interface Term {
  letter: string;
  term: string;
  definition: string;
  related?: string[];
}

const terms: Term[] = [
  { letter: 'A', term: 'Agent (AI)', definition: 'An AI system that perceives its environment, makes decisions, and takes actions to achieve a goal without requiring step-by-step human instruction. AI agents often use tools, memory, and planning capabilities to complete multi-step tasks autonomously.', related: ['LangChain', 'RAG'] },
  { letter: 'A', term: 'API (Application Programming Interface)', definition: 'A defined set of rules that allows two software systems to communicate with each other. APIs define the format of requests, responses, and the operations that can be performed, enabling modular software development.' },
  { letter: 'A', term: 'Architecture (Software)', definition: 'The high-level structure of a software system, defining components, their relationships, and the principles governing their design and evolution. Good architecture balances performance, scalability, security, and maintainability.' },
  { letter: 'B', term: 'Blue-Green Deployment', definition: 'A release strategy using two identical production environments (blue and green), allowing traffic to switch instantly between versions for zero-downtime updates and instant rollback if issues arise after deployment.' },
  { letter: 'C', term: 'CI/CD', definition: 'Continuous Integration and Continuous Delivery/Deployment. Automated pipelines that test, build, and release software changes rapidly and reliably, reducing manual deployment effort and improving code quality through automated checks.', related: ['GitOps', 'DevOps'] },
  { letter: 'C', term: 'Compliance (Software)', definition: 'Adherence to regulatory, legal, or organizational standards governing how software handles data, security, and operations. Common frameworks include HIPAA (healthcare), PCI-DSS (payments), SOC 2 (SaaS), and GDPR (data privacy).' },
  { letter: 'D', term: 'Data Pipeline', definition: 'An automated sequence of processes that moves and transforms data from source systems to destination systems. Modern data pipelines handle extraction, transformation, validation, and loading (ETL/ELT) at scale, often in real time.', related: ['DevOps', 'Infrastructure as Code'] },
  { letter: 'D', term: 'DevOps', definition: 'A set of practices combining software development and IT operations, emphasizing automation, monitoring, and collaboration throughout the software delivery lifecycle. DevOps teams own both code delivery and production reliability.', related: ['CI/CD', 'GitOps'] },
  { letter: 'G', term: 'GitOps', definition: 'An operational framework where Git repositories serve as the single source of truth for infrastructure and application deployment, with changes deployed automatically via pull request workflows. Popular tools include ArgoCD and Flux.', related: ['CI/CD', 'Infrastructure as Code'] },
  { letter: 'I', term: 'Infrastructure as Code (IaC)', definition: 'Managing and provisioning infrastructure through machine-readable configuration files rather than manual processes. Tools like Terraform and Pulumi allow teams to version, review, and apply infrastructure changes the same way they manage application code.', related: ['GitOps', 'DevOps'] },
  { letter: 'K', term: 'Kubernetes', definition: 'An open-source container orchestration system for automating deployment, scaling, and management of containerized applications. Kubernetes handles service discovery, load balancing, rollout management, and self-healing of failed containers.' },
  { letter: 'L', term: 'LLM (Large Language Model)', definition: 'A deep learning model trained on large text datasets, capable of generating, summarizing, translating, and reasoning about text. Examples include GPT-4, Claude, and Gemini. LLMs form the reasoning core of most modern AI applications.', related: ['Agent (AI)', 'RAG'] },
  { letter: 'L', term: 'LangChain', definition: 'An open-source framework for building applications powered by large language models, providing tools for chaining prompts, tools, and memory. LangChain and LangGraph enable building multi-step AI agents and complex reasoning pipelines.', related: ['Agent (AI)', 'LLM'] },
  { letter: 'M', term: 'Microservices', definition: 'An architectural pattern where an application is built as a collection of small, independently deployable services, each responsible for a specific business function. Microservices communicate via APIs and can be scaled, updated, and replaced independently.', related: ['API', 'Kubernetes'] },
  { letter: 'M', term: 'Multi-tenant Architecture', definition: 'A software architecture where a single instance of an application serves multiple customers (tenants), with strict data isolation between them. Multi-tenancy is the standard model for SaaS products and enables cost-efficient scaling.' },
  { letter: 'R', term: 'RAG (Retrieval-Augmented Generation)', definition: 'An AI technique that enhances LLM responses by retrieving relevant information from a knowledge base before generating an answer. RAG reduces hallucination by grounding the model in current, domain-specific documents at inference time.', related: ['LLM', 'Vector Database', 'Agent (AI)'] },
  { letter: 'R', term: 'RBAC (Role-Based Access Control)', definition: 'A security approach that restricts system access based on the roles assigned to users within an organization. RBAC ensures that users can only access the data and functions they need, reducing the risk of unauthorized access.', related: ['Zero Trust Architecture', 'SOC 2'] },
  { letter: 'S', term: 'SaaS (Software as a Service)', definition: 'A software distribution model where applications are hosted by a vendor and accessed by users over the internet. SaaS eliminates the need for on-premises installation and enables subscription-based revenue models with multi-tenant architectures.', related: ['Multi-tenant Architecture'] },
  { letter: 'S', term: 'SOC 2', definition: 'A compliance framework developed by the AICPA that evaluates an organization\'s controls for security, availability, processing integrity, confidentiality, and privacy. SOC 2 Type II certification is increasingly required by enterprise buyers of cloud software.', related: ['RBAC', 'Compliance'] },
  { letter: 'V', term: 'Vector Database', definition: 'A database optimized for storing and querying high-dimensional vector embeddings, used in AI applications for semantic search and retrieval. Vector databases like Pinecone and pgvector power RAG systems by finding semantically similar content at scale.', related: ['RAG', 'LLM'] },
  { letter: 'Z', term: 'Zero Trust Architecture', definition: 'A security model that requires strict identity verification for every user and device attempting to access resources, regardless of whether they are inside or outside the network perimeter. The principle: "never trust, always verify."', related: ['RBAC', 'Compliance'] },
];

const letters = [...new Set(terms.map(t => t.letter))];

export default function GlossaryPage() {
  // JSON-LD for DefinedTermSet
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'AI & Software Engineering Glossary — Qeltrava AI',
    description: 'Definitions of the technical terms used by the Qeltrava AI engineering team.',
    hasDefinedTerm: terms.map(term => ({
      '@type': 'DefinedTerm',
      name: term.term,
      description: term.definition,
      inDefinedTermSet: 'https://qeltravaai.vercel.app/en/glossary',
    })),
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-3 block font-mono">Glossary</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">
            AI & Software Engineering Glossary
          </h1>
          <p className="text-xl text-[var(--color-text-main)] max-w-2xl">
            Clear definitions of the technical terms we use in our work.
          </p>
        </div>

        {/* A-Z anchor nav */}
        <div className="flex flex-wrap gap-2 mb-12 pb-6 border-b border-[var(--color-border-soft)] sticky top-20 bg-white pt-4 z-30">
          {letters.map(letter => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--color-border-soft)] text-sm font-bold text-[var(--color-primary-dark)] hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] transition-all"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Terms grouped by letter */}
        <div className="space-y-12">
          {letters.map(letter => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-extrabold text-[var(--color-accent)] font-mono leading-none">{letter}</span>
                <div className="h-px flex-grow bg-[var(--color-border-soft)]" />
              </div>
              <div className="space-y-6">
                {terms.filter(t => t.letter === letter).map(term => (
                  <div key={term.term} className="bg-[var(--color-bg-light)] rounded-2xl p-6 border border-[var(--color-border-soft)]">
                    <h3 className="text-lg font-bold text-[var(--color-primary-dark)] mb-2" id={term.term.replace(/\s+/g, '-').toLowerCase()}>
                      {term.term}
                    </h3>
                    <p className="text-sm text-[var(--color-text-main)] leading-relaxed mb-3">{term.definition}</p>
                    {term.related && term.related.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-main)]/40 font-mono">Related:</span>
                        {term.related.map(rel => {
                          const relTerm = terms.find(t => t.term === rel);
                          return relTerm ? (
                            <a
                              key={rel}
                              href={`#${rel.replace(/\s+/g, '-').toLowerCase()}`}
                              className="text-xs font-semibold text-[var(--color-accent)] hover:underline"
                            >
                              {rel}
                            </a>
                          ) : null;
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
