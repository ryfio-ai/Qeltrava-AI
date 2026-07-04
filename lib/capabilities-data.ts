export type ExpertiseLevel = 'Expert' | 'Advanced' | 'Proficient';
export type TechCategory = 'AI & LLM' | 'Cloud' | 'Frontend' | 'Backend' | 'Data' | 'Security' | 'DevOps' | 'Mobile';

export interface TechCapability {
  name: string;
  category: TechCategory;
  expertise: ExpertiseLevel;
  expertiseScore: number; // 0-100
  services: string[];
  since: string;
  description: string;
}

export const capabilities: TechCapability[] = [
  // AI & LLM
  { name: 'OpenAI GPT-4o', category: 'AI & LLM', expertise: 'Expert', expertiseScore: 95, services: ['AI Automation'], since: '2023', description: 'Prompt engineering, fine-tuning, function calling, vision' },
  { name: 'LangChain / LangGraph', category: 'AI & LLM', expertise: 'Expert', expertiseScore: 92, services: ['AI Automation'], since: '2023', description: 'Multi-agent orchestration, tool-use, memory systems' },
  { name: 'pgvector / RAG', category: 'AI & LLM', expertise: 'Advanced', expertiseScore: 87, services: ['AI Automation', 'Data'], since: '2023', description: 'Semantic search, retrieval-augmented generation, vector indexing' },
  { name: 'Qdrant', category: 'AI & LLM', expertise: 'Advanced', expertiseScore: 80, services: ['AI Automation'], since: '2024', description: 'High-performance vector database for production AI workloads' },
  { name: 'Anthropic Claude', category: 'AI & LLM', expertise: 'Advanced', expertiseScore: 82, services: ['AI Automation'], since: '2024', description: 'Claude 3.5 Sonnet for enterprise document intelligence' },
  // Frontend
  { name: 'Next.js 15', category: 'Frontend', expertise: 'Expert', expertiseScore: 97, services: ['SaaS', 'Product Eng', 'AI Automation'], since: '2022', description: 'App Router, Server Components, ISR, edge rendering' },
  { name: 'React 19', category: 'Frontend', expertise: 'Expert', expertiseScore: 98, services: ['SaaS', 'Product Eng'], since: '2021', description: 'Concurrent features, Server Actions, Suspense boundaries' },
  { name: 'TypeScript', category: 'Frontend', expertise: 'Expert', expertiseScore: 96, services: ['All'], since: '2021', description: 'Strict mode, generics, discriminated unions, zod validation' },
  { name: 'Framer Motion', category: 'Frontend', expertise: 'Advanced', expertiseScore: 88, services: ['SaaS', 'Product Eng'], since: '2022', description: 'Layout animations, gesture recognition, SVG animation' },
  // Backend
  { name: 'FastAPI', category: 'Backend', expertise: 'Expert', expertiseScore: 93, services: ['AI Automation', 'SaaS'], since: '2022', description: 'Async Python APIs, OpenAPI generation, background tasks' },
  { name: 'PostgreSQL', category: 'Backend', expertise: 'Expert', expertiseScore: 96, services: ['All'], since: '2021', description: 'Advanced indexing, JSONB, full-text search, row-level security' },
  { name: 'Redis', category: 'Backend', expertise: 'Advanced', expertiseScore: 88, services: ['SaaS', 'Cloud'], since: '2022', description: 'Caching, pub/sub, job queues, session management' },
  { name: 'GraphQL', category: 'Backend', expertise: 'Advanced', expertiseScore: 85, services: ['SaaS', 'Product Eng'], since: '2022', description: 'Apollo Server, schema-first design, dataloaders, subscriptions' },
  // Cloud
  { name: 'AWS', category: 'Cloud', expertise: 'Expert', expertiseScore: 94, services: ['Cloud & DevOps'], since: '2021', description: 'ECS, Lambda, RDS, CloudFront, S3, VPC architecture' },
  { name: 'GCP', category: 'Cloud', expertise: 'Advanced', expertiseScore: 82, services: ['Cloud & DevOps', 'AI Automation'], since: '2023', description: 'Cloud Run, Vertex AI, BigQuery, Cloud SQL' },
  { name: 'Terraform', category: 'Cloud', expertise: 'Advanced', expertiseScore: 86, services: ['Cloud & DevOps'], since: '2022', description: 'Infrastructure-as-code, modules, state management, Atlantis CI' },
  { name: 'Kubernetes', category: 'Cloud', expertise: 'Advanced', expertiseScore: 84, services: ['Cloud & DevOps'], since: '2022', description: 'EKS, GKE, Helm charts, HPA autoscaling, service mesh' },
  { name: 'Docker', category: 'Cloud', expertise: 'Expert', expertiseScore: 95, services: ['All'], since: '2021', description: 'Multi-stage builds, Docker Compose, container security scanning' },
  // Data
  { name: 'dbt', category: 'Data', expertise: 'Advanced', expertiseScore: 83, services: ['Data & Analytics'], since: '2023', description: 'Data modeling, testing, documentation, orchestration' },
  { name: 'Apache Kafka', category: 'Data', expertise: 'Proficient', expertiseScore: 72, services: ['Data & Analytics', 'Cloud'], since: '2023', description: 'Event streaming, CQRS, real-time data pipelines' },
  { name: 'Grafana', category: 'Data', expertise: 'Advanced', expertiseScore: 85, services: ['Data & Analytics', 'Cloud'], since: '2022', description: 'Dashboards, alerting, Prometheus integration, Loki logs' },
  // Security
  { name: 'HashiCorp Vault', category: 'Security', expertise: 'Advanced', expertiseScore: 82, services: ['Cybersecurity', 'Cloud'], since: '2022', description: 'Secrets management, dynamic credentials, PKI certificates' },
  { name: 'Snyk', category: 'Security', expertise: 'Advanced', expertiseScore: 80, services: ['Cybersecurity'], since: '2023', description: 'Dependency scanning, container security, SAST integration' },
  { name: 'OAuth2 / SAML / OIDC', category: 'Security', expertise: 'Expert', expertiseScore: 91, services: ['All'], since: '2021', description: 'Enterprise SSO, PKCE flows, token lifecycle management' },
  // Mobile
  { name: 'React Native', category: 'Mobile', expertise: 'Advanced', expertiseScore: 86, services: ['Product Eng', 'SaaS'], since: '2022', description: 'Expo managed workflow, native modules, OTA updates' },
  { name: 'Expo', category: 'Mobile', expertise: 'Advanced', expertiseScore: 84, services: ['Product Eng'], since: '2022', description: 'EAS Build, push notifications, in-app purchases' },
  // DevOps
  { name: 'GitHub Actions', category: 'DevOps', expertise: 'Expert', expertiseScore: 93, services: ['All'], since: '2021', description: 'CI/CD pipelines, matrix builds, reusable workflows, OIDC' },
  { name: 'Playwright', category: 'DevOps', expertise: 'Advanced', expertiseScore: 87, services: ['All'], since: '2022', description: 'E2E testing, visual regression, API mocking, parallel runs' },
];

export const categoryColors: Record<TechCategory, string> = {
  'AI & LLM': '#6366f1',
  'Cloud': '#0ea5e9',
  'Frontend': '#8b5cf6',
  'Backend': '#3b82f6',
  'Data': '#f59e0b',
  'Security': '#ef4444',
  'DevOps': '#10b981',
  'Mobile': '#ec4899',
};

export const expertiseConfig: Record<ExpertiseLevel, { color: string; bgColor: string; barColor: string }> = {
  Expert:    { color: '#065f46', bgColor: '#d1fae5', barColor: '#10b981' },
  Advanced:  { color: '#1e40af', bgColor: '#dbeafe', barColor: '#3b82f6' },
  Proficient:{ color: '#92400e', bgColor: '#fef3c7', barColor: '#f59e0b' },
};
