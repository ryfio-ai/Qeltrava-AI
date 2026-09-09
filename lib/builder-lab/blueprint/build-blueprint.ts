import { BuildLabInput } from '../validation/schemas';

export interface BuildBlueprintResult {
  problemDefinition: string;
  targetUsers: string;
  coreWorkflow: { step: string; detail: string }[];
  mvpScope: string[];
  systemArchitecture: string;
  aiLayer: {
    usefulWhere: string[];
    unnecessaryWhere: string[];
    modelCategory: string;
    humanValidationReq: string;
  };
  dataArchitecture: string;
  backendApi: string;
  security: string;
  infrastructure: string;
  engineeringRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  riskRationale: string;
  roadmap: {
    phase1: string;
    phase2: string;
    phase3: string;
  };
}

export function generateBuildBlueprint(input: BuildLabInput): BuildBlueprintResult {
  const ideaLower = input.idea.toLowerCase();
  const isAI = ideaLower.includes('ai') || ideaLower.includes('ml') || ideaLower.includes('predict') || ideaLower.includes('agent');
  
  return {
    problemDefinition: `Addressing operational friction in ${input.industry || 'the target business sector'} by automating data handling and engineering structured software for: ${input.idea}`,
    targetUsers: input.users || "Operations leads, engineering managers, and business administrators.",
    coreWorkflow: [
      { step: "User Input / Trigger", detail: "User submits operational parameters via web or API webhook." },
      { step: "Validation & Sanitization", detail: "Zod & middleware validate requests before database entry." },
      { step: "Business Logic Engine", detail: "Core application logic processes business rules deterministically." },
      { step: "AI / Inference Layer", detail: isAI ? "Model or Agent reasons over contextual data RAG pipeline." : "Deterministic rule engine computes optimal output." },
      { step: "Output & Action", detail: "Formatted results presented to dashboard or dispatched to external APIs." }
    ],
    mvpScope: [
      "Secure User Authentication & Workspace Isolation",
      "Core Data Input & File Processing Engine",
      "Interactive Dashboard & Status Telemetry",
      "API Webhook Dispatch & Export (JSON / CSV / MD)"
    ],
    systemArchitecture: "Frontend: Next.js (App Router + Tailwind) | API: Next.js Server Routes | DB: PostgreSQL | Queue: Redis/Upstash",
    aiLayer: {
      usefulWhere: [
        "Unstructured data extraction & document parsing",
        "Predictive parameter optimization & anomaly detection",
        "Natural language workflow triggers & summaries"
      ],
      unnecessaryWhere: [
        "User authentication & session token management",
        "ACID database storage & historical audit logging",
        "Static UI layout rendering & permission checks"
      ],
      modelCategory: isAI ? "Hybrid RAG + Fast Inference LLM (Claude 3.5 / GPT-4o-mini)" : "Rule-Based Deterministic Engine",
      humanValidationReq: "Human-in-the-loop sign-off required before executing high-impact operational parameter changes."
    },
    dataArchitecture: "Relational PostgreSQL database for transactional integrity; S3 object storage for raw file assets.",
    backendApi: "RESTful API routes with OpenAPI documentation, JWT/Session auth, and Zod request bounds.",
    security: "TLS 1.3 encryption in transit, AES-256 at rest, SOC 2 compliance readiness, rate-limited public endpoints.",
    infrastructure: "Vercel / AWS CloudFront edge deployment with automated CI/CD pipeline.",
    engineeringRisk: isAI ? "MEDIUM" : "LOW",
    riskRationale: isAI ? "Model latency & API rate limits require robust fallback engines and async background processing." : "Standard full-stack web architecture with established patterns.",
    roadmap: {
      phase1: "MVP Launch (Weeks 1-4): Core dashboard, data ingestion, and essential workflows.",
      phase2: "Intelligence Integration (Weeks 5-8): AI/ML RAG pipelines, telemetry, and automated recommendations.",
      phase3: "Scale & Expansion (Weeks 9-12): Custom enterprise integrations, RBAC permissions, and continuous optimization."
    }
  };
}
