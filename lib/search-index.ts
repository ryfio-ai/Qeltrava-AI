export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: 'Service' | 'Industry' | 'Solution' | 'Case Study' | 'Insight' | 'Page';
  categoryLabel: string;
  href: string;
}

export const searchIndex: SearchItem[] = [
  // Pages
  {
    id: 'page-home',
    title: 'Qeltrava AI Homepage',
    description: 'AI-native software engineering for electric mobility, fintech, healthcare, and logistics. Operational outcomes and enterprise reliability.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/'
  },
  {
    id: 'page-about',
    title: 'About Our Engineering Team',
    description: 'Learn about our engineering philosophy, founding story at PSG College of Technology, and co-founders disciplines.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/about'
  },
  {
    id: 'page-services',
    title: 'Engineering Services Directory',
    description: 'Browse our core software capabilities, including AI automation, SaaS development, cloud infrastructure, and cybersecurity.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/services'
  },
  {
    id: 'page-operating-model',
    title: 'Operating Model & Delivery OS',
    description: 'Explore the Qeltrava Delivery OS phases: Diagnose, Architect, Validate, and Optimize. Discover our fixed-scope pricing models.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/operating-model'
  },
  {
    id: 'page-insights',
    title: 'Insights & Technical Research',
    description: 'Original software engineering research, vector DB tutorials, prompt versioning systems, and architecture design logs.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/insights'
  },
  {
    id: 'page-careers',
    title: 'Careers & speculative applications',
    description: 'View active engineering openings, technical requirements, and speculative developer application channels.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/careers'
  },
  {
    id: 'page-contact',
    title: 'Contact Engineering Partners',
    description: 'Submit an enterprise inquiry, security disclosure, or general operational request to our partners.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/contact'
  },
  {
    id: 'page-book-consultation',
    title: 'Book an AI Strategy Call',
    description: 'Schedule a free 30-minute diagnostic session directly with our senior engineering partners.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/book-consultation'
  },
  {
    id: 'page-quiz',
    title: 'AI Strategy Assessment Quiz',
    description: 'Take the 2-minute questionnaire to map your challenges and budgets to the correct engineering starting point.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/quiz'
  },
  {
    id: 'page-roi-calculator',
    title: 'ROI Automation Cost Calculator',
    description: 'Estimate your current manual workflow overhead and calculate potential automated savings.',
    category: 'Page',
    categoryLabel: 'Page',
    href: '/roi-calculator'
  },

  // Services
  {
    id: 'service-ai-automation',
    title: 'AI Automation',
    description: 'Automate high-value workflows with custom agents. Ingest documents with vector databases, build RAG pipelines, and ticket routers.',
    category: 'Service',
    categoryLabel: 'Service',
    href: '/services/ai-automation'
  },
  {
    id: 'service-cloud-devops',
    title: 'Cloud & DevOps Infrastructure',
    description: 'Scale systems dynamically. Setup Infrastructure as Code (IaC) with Terraform, CI/CD pipelines, Kubernetes, and blue-green releases.',
    category: 'Service',
    categoryLabel: 'Service',
    href: '/services/cloud-devops'
  },
  {
    id: 'service-cybersecurity',
    title: 'Cybersecurity & Compliance',
    description: 'Secure by design platforms. Prepare for HIPAA, SOC 2, and GDPR audits. Restrict APIs with OAuth and Role-Based Access Control (RBAC).',
    category: 'Service',
    categoryLabel: 'Service',
    href: '/services/cybersecurity'
  },
  {
    id: 'service-data-analytics',
    title: 'Data & Analytics Pipelines',
    description: 'Consolidate unstructured operational data into real-time business intelligence dashboards, ML forecasting, and ETL warehouses.',
    category: 'Service',
    categoryLabel: 'Service',
    href: '/services/data-analytics'
  },
  {
    id: 'service-product-engineering',
    title: 'Product Engineering & Architecture',
    description: 'Design modular software systems, define clear API interfaces, build scalable full-stack web and backend services.',
    category: 'Service',
    categoryLabel: 'Service',
    href: '/services/product-engineering'
  },
  {
    id: 'service-saas-development',
    title: 'SaaS Platform Development',
    description: 'Build multi-tenant SaaS applications ready for enterprise scale. Integrate Stripe billing, multi-tenant schemas, and admin consoles.',
    category: 'Service',
    categoryLabel: 'Service',
    href: '/services/saas-development'
  },

  // Industries
  {
    id: 'industry-fintech',
    title: 'Fintech Solutions',
    description: 'Secure, low-latency, compliant financial systems. Ledger replication, transaction audit logs, and scalable APIs.',
    category: 'Industry',
    categoryLabel: 'Industry',
    href: '/industries/fintech'
  },
  {
    id: 'industry-healthcare',
    title: 'Healthcare HIPAA Compliance',
    description: 'Build secure EHR integrations, patient scheduling systems, and messaging apps with strict data encryption.',
    category: 'Industry',
    categoryLabel: 'Industry',
    href: '/industries/healthcare'
  },
  {
    id: 'industry-logistics',
    title: 'Logistics & Supply Chain',
    description: 'Fleet vehicle diagnostics, route optimization models, predictive maintenance, and IoT telemetry pipelines.',
    category: 'Industry',
    categoryLabel: 'Industry',
    href: '/industries/logistics'
  },
  {
    id: 'industry-saas',
    title: 'SaaS Scaling Architecture',
    description: 'Infrastructure strategies, tenancy isolation patterns, and database shards for rapidly scaling B2B apps.',
    category: 'Industry',
    categoryLabel: 'Industry',
    href: '/industries/saas'
  },

  // Solutions
  {
    id: 'solution-customer-service',
    title: 'AI Customer Service Transformation',
    description: 'Automate up to 70% of routine customer support tickets securely. Deploy vector DB context lookup agents.',
    category: 'Solution',
    categoryLabel: 'Solution',
    href: '/solutions/ai-customer-service-transformation'
  },
  {
    id: 'solution-operations',
    title: 'AI Operations Automation',
    description: 'Streamline administrative flows, automate invoice indexing, approval triggers, and back-office scheduling.',
    category: 'Solution',
    categoryLabel: 'Solution',
    href: '/solutions/ai-operations-automation'
  },
  {
    id: 'solution-legacy-modernization',
    title: 'Legacy Monolith Modernization',
    description: 'Decompose outdated monolith software into auto-scaling Kubernetes microservices with strangler-fig migration patterns.',
    category: 'Solution',
    categoryLabel: 'Solution',
    href: '/solutions/legacy-modernization'
  },

  // Case Studies
  {
    id: 'case-fintech',
    title: 'Case Study: Fintech Core Banking Migration',
    description: 'Strangler-fig migration of a monolithic transaction platform to Kubernetes microservices, cutting latency by 45%.',
    category: 'Case Study',
    categoryLabel: 'Case Study',
    href: '/case-studies/fintech-core-modernization'
  },
  {
    id: 'case-healthcare',
    title: 'Case Study: Healthcare AI Patient Intake',
    description: 'HIPAA-compliant conversational EHR agent resolving 68% of triage inquiries, saving $1.2M annually.',
    category: 'Case Study',
    categoryLabel: 'Case Study',
    href: '/case-studies/healthcare-ai-triage'
  },
  {
    id: 'case-logistics',
    title: 'Case Study: Logistics Predictive Fleet Maintenance',
    description: 'Machine learning fail-prediction models utilizing engine sensors, reducing unplanned downtime by 38%.',
    category: 'Case Study',
    categoryLabel: 'Case Study',
    href: '/case-studies/logistics-predictive-maintenance'
  },

  // Insights
  {
    id: 'insight-native-arch',
    title: 'Why AI-Native Architecture Is an Architecture Decision, Not a Feature Toggle',
    description: 'Designing system boundaries, vector databases, prompt microservices, semantic caching, and streaming-first interfaces.',
    category: 'Insight',
    categoryLabel: 'Insight',
    href: '/insights/ai-native-architecture-decision'
  },
  {
    id: 'insight-modernization-signals',
    title: 'The Four Signals That Tell You a Legacy System Is Ready for Modernization',
    description: 'Tracking slow deployments, developer knowledge silos, disproportionate infrastructure costs, and audit roadblocks.',
    category: 'Insight',
    categoryLabel: 'Insight',
    href: '/insights/legacy-system-modernization-signals'
  },
  {
    id: 'insight-due-diligence',
    title: 'What Enterprise Buyers Actually Check During Software Partner Due Diligence',
    description: 'Evaluating SOC 2 Type II, secure coding rules (OWASP Top 10), reference checks, IP transfers, and liability covers.',
    category: 'Insight',
    categoryLabel: 'Insight',
    href: '/insights/enterprise-buyer-due-diligence'
  }
];

export function searchSite(query: string): SearchItem[] {
  if (!query) return [];
  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/).filter(Boolean);

  return searchIndex.filter(item => {
    const searchString = `${item.title} ${item.description} ${item.categoryLabel}`.toLowerCase();
    return words.every(word => searchString.includes(word));
  });
}
