export interface OpenSourceResource {
  id: string;
  title: string;
  category: 'developer' | 'ai' | 'founder' | 'manufacturing';
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  docsUrl?: string;
  stars?: number;
  forks?: number;
  snippet?: string;
  useCommand?: string;
}

export const OPEN_SOURCE_RESOURCES: OpenSourceResource[] = [
  // Developer
  {
    id: 'nextjs-ai-starter',
    title: 'Next.js 16 + AI Agent Starter',
    category: 'developer',
    description: 'Production-ready Next.js 16 App Router starter with Turbopack, Tailwind CSS v4, i18n localization, and LLM orchestration layer.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'AI Agent'],
    githubUrl: 'https://github.com/QeltravaAI/nextjs-ai-starter',
    demoUrl: 'https://qeltrava.ai/playground',
    snippet: 'npx create-next-app@latest my-ai-app -e https://github.com/QeltravaAI/nextjs-ai-starter',
    useCommand: 'npx create-next-app@latest --example https://github.com/QeltravaAI/nextjs-ai-starter',
  },
  {
    id: 'fastapi-microservice-starter',
    title: 'FastAPI High-Performance Async Microservice',
    category: 'developer',
    description: 'Clean architecture FastAPI template with Pydantic v2 validation, Async SQLAlchemy, PostgreSQL, Redis caching, and Docker Compose setup.',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/QeltravaAI/fastapi-microservice-starter',
    useCommand: 'git clone https://github.com/QeltravaAI/fastapi-microservice-starter.git',
  },
  {
    id: 'saas-auth-rbac-boilerplate',
    title: 'Enterprise RBAC & Auth Core',
    category: 'developer',
    description: 'Multi-tenant role-based access control (RBAC) middleware with session management, JWT verification, and audit logging.',
    tags: ['TypeScript', 'Auth', 'RBAC', 'Security'],
    githubUrl: 'https://github.com/QeltravaAI/saas-auth-rbac-boilerplate',
    useCommand: 'npm install @qeltrava/rbac-core',
  },

  // AI & LLM Tools
  {
    id: 'rag-eval-pipeline',
    title: 'RAG Pipeline & Structured Output Evaluator',
    category: 'ai',
    description: 'Lightweight evaluation suite for RAG vector retrieval, prompt grounding verification, and JSON schema validation.',
    tags: ['AI Evaluation', 'RAG', 'Vector Search', 'Python'],
    githubUrl: 'https://github.com/QeltravaAI/rag-eval-pipeline',
    useCommand: 'pip install qeltrava-rag-eval',
  },
  {
    id: 'ai-cost-token-calculator',
    title: 'LLM Token & API Cost Calculator',
    category: 'ai',
    description: 'Real-time token counter and cost comparison library across OpenAI, Claude, Gemini, Groq, and DeepSeek model providers.',
    tags: ['Token Counter', 'LLM Costs', 'AI Engineering'],
    githubUrl: 'https://github.com/QeltravaAI/ai-cost-calculator',
    demoUrl: 'https://qeltrava.ai/playground',
    useCommand: 'npm install @qeltrava/ai-cost-calc',
  },
  {
    id: 'agentic-workflow-templates',
    title: 'Multi-Agent Autonomous Workflow Blueprints',
    category: 'ai',
    description: 'Reusable multi-agent execution templates with fallback routing, human-in-the-loop approvals, and structured state persistence.',
    tags: ['AI Agents', 'LangChain', 'Workflow Automation'],
    githubUrl: 'https://github.com/QeltravaAI/agentic-workflow-templates',
    useCommand: 'git clone https://github.com/QeltravaAI/agentic-workflow-templates.git',
  },

  // Manufacturing AI & Telemetry
  {
    id: 'manufacturing-telemetry-simulator',
    title: 'Industrial Sensor Telemetry Data Simulator',
    category: 'manufacturing',
    description: 'Synthetic machine telemetry generator producing multi-sensor time-series logs (vibration, temperature, pressure, defects, cycle time) for ML training.',
    tags: ['Manufacturing AI', 'Telemetry', 'Sensor Simulator', 'IoT'],
    githubUrl: 'https://github.com/QeltravaAI/manufacturing-telemetry-simulator',
    demoUrl: 'https://qeltrava.ai/manufacturing',
    useCommand: 'pip install qeltrava-sensor-sim',
  },
  {
    id: 'oee-analytics-starter',
    title: 'OEE & Machine Downtime Analytics Engine',
    category: 'manufacturing',
    description: 'Statistical engine calculating Overall Equipment Effectiveness (Availability × Performance × Quality) and Pareto downtime distribution.',
    tags: ['OEE', 'SPC', 'Quality Intelligence', 'Manufacturing'],
    githubUrl: 'https://github.com/QeltravaAI/oee-analytics-starter',
    demoUrl: 'https://qeltrava.ai/manufacturing',
    useCommand: 'npm install @qeltrava/oee-engine',
  },

  // Founder & Architecture Tools
  {
    id: 'mvp-prd-github-issue-generator',
    title: 'PRD to GitHub Issues & Architecture Exporter',
    category: 'founder',
    description: 'Transforms high-level product requirement documents (PRD) into structured GitHub Epics, User Stories, Tasks, and Mermaid architecture diagrams.',
    tags: ['PRD', 'GitHub Issues', 'Product Management'],
    githubUrl: 'https://github.com/QeltravaAI/prd-github-issue-generator',
    demoUrl: 'https://qeltrava.ai/founders',
    useCommand: 'npx @qeltrava/prd-to-issues',
  },
];
