import { ArchitectureInput } from '../validation/schemas';

export interface ComponentRecommendation {
  layer: string;
  technology: string;
  why: string;
  alternative: string;
}

export interface ArchitectureResult {
  overview: string;
  diagram: string[];
  recommendations: ComponentRecommendation[];
  scalabilityNote: string;
  securityControls: string[];
  estimatedInfrastructureCost: string;
}

export function generateArchitecture(input: ArchitectureInput): ArchitectureResult {
  const isHighScale = input.scale.toLowerCase().includes('high') || input.scale.toLowerCase().includes('100k');
  const needsRAG = input.aiRequirements.toLowerCase().includes('rag') || input.aiRequirements.toLowerCase().includes('vector');
  
  return {
    overview: `Target architecture for ${input.productType} operating at ${input.scale} with ${input.dataRequirements} data demands and ${input.aiRequirements}.`,
    diagram: [
      "[ Client Layer ]  -->  Next.js 15 (Edge SSR / React 19)",
      "        │",
      "        ▼",
      "[ API Gateway ]  -->  Next.js Server Actions / REST (Zod validated)",
      "        │",
      "        ├──> [ App Database ]     --> PostgreSQL (Supabase / Neon)",
      needsRAG ? "        ├──> [ Vector Database ]  --> pgvector / Qdrant" : "        ├──> [ Cache / Queue ]    --> Redis / Upstash",
      needsRAG ? "        ├──> [ AI Reasoning ]     --> Claude 3.5 / OpenAI + LangChain/LlamaIndex" : "        ├──> [ Business Logic ]   --> Deterministic Rule Engine",
      "        └──> [ Telemetry & Logs ] --> OpenTelemetry + PostHog"
    ],
    recommendations: [
      {
        layer: "Frontend Interface",
        technology: "Next.js 15 (App Router) + Tailwind CSS + Radix UI",
        why: "Provides server-side rendering for speed and SEO, with client-side reactive components for high-interactivity user workflows.",
        alternative: "Vite + React SPA (chosen against due to slower initial page load and SEO limitations)."
      },
      {
        layer: "Backend & API Routing",
        technology: "TypeScript Node.js runtime / Next.js Server Routes + Zod",
        why: "Type-safe end-to-end data contracts prevent API runtime mismatches. Single language codebase lowers developer context-switching costs.",
        alternative: "Python FastAPI (recommended if deep ML training pipelines are hosted in-house)."
      },
      {
        layer: "Database & Storage",
        technology: needsRAG ? "PostgreSQL + pgvector" : "PostgreSQL (Relational)",
        why: "Relational database guarantees ACID compliance for transactional data. pgvector allows unified SQL queries across both structured data and semantic embeddings.",
        alternative: "Pinecone / MongoDB (chosen against to avoid dual-database synchronization overhead)."
      },
      {
        layer: "AI & Model Gateway",
        technology: needsRAG ? "Hybrid Inference API (Anthropic Claude 3.5 / OpenAI GPT-4o-mini)" : "Rule-Based Deterministic Engine",
        why: needsRAG ? "Combines low-latency structured output generation with fallback reliability and cached prompt embeddings." : "Eliminates non-deterministic LLM hallucination risk for pure transactional rules.",
        alternative: "Self-hosted Llama 3 (requires higher upfront GPU infrastructure costs)."
      },
      {
        layer: "Deployment & Infrastructure",
        technology: isHighScale ? "AWS ECS / CloudFront + Edge Workers" : "Vercel Enterprise Platform",
        why: "Global edge caching, zero-cold-start serverless execution, and automated deployment pipelines.",
        alternative: "Bare metal Kubernetes (adds unnecessary DevOps maintenance load for early scale)."
      }
    ],
    scalabilityNote: isHighScale
      ? "Designed for multi-region read replicas and decoupled asynchronous worker queues (Upstash/Redis) for high concurrency."
      : "Optimized for speed-to-market and low initial operational overhead while maintaining straightforward horizontal database expansion paths.",
    securityControls: [
      "Strict TLS 1.3 in transit & AES-256 encryption at rest",
      "Role-Based Access Control (RBAC) & Workspace Isolation",
      "API Rate Limiting & Web Application Firewall (WAF)",
      "Automated Audit Logging for compliance tracking"
    ],
    estimatedInfrastructureCost: isHighScale ? "$150 - $400 / month" : "$25 - $80 / month"
  };
}
