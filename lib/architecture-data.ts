export type ComponentId =
  | 'ai-assistant' | 'dashboard' | 'mobile-app' | 'admin-panel'
  | 'payments' | 'analytics' | 'crm' | 'notifications'
  | 'auth' | 'file-storage' | 'email-automation' | 'webhooks';

export interface SolutionComponent {
  id: ComponentId;
  label: string;
  emoji: string;
  description: string;
  techStack: string[];
  timelineWeeks: [number, number];
  teamRoles: Record<string, number>;
  costRange: [number, number];
  layer: 'service' | 'integration' | 'infrastructure';
  color: string;
  archLayer: number; // 0=client, 1=frontend, 2=api, 3=services, 4=data
}

export const solutionComponents: SolutionComponent[] = [
  {
    id: 'ai-assistant',
    label: 'AI Assistant',
    emoji: '🤖',
    description: 'Conversational AI with RAG, memory, and tool use',
    techStack: ['LangChain', 'OpenAI GPT-4o', 'pgvector', 'FastAPI', 'LangGraph'],
    timelineWeeks: [4, 8],
    teamRoles: { 'AI Engineer': 1, 'Backend Engineer': 1 },
    costRange: [18000, 35000],
    layer: 'service',
    color: '#6366f1',
    archLayer: 3,
  },
  {
    id: 'dashboard',
    label: 'Dashboard',
    emoji: '📊',
    description: 'Real-time analytics dashboard with charts and KPIs',
    techStack: ['Next.js 15', 'Recharts', 'PostgreSQL', 'Redis'],
    timelineWeeks: [3, 6],
    teamRoles: { 'Frontend Engineer': 1, 'Backend Engineer': 1 },
    costRange: [12000, 22000],
    layer: 'service',
    color: '#3b82f6',
    archLayer: 3,
  },
  {
    id: 'mobile-app',
    label: 'Mobile App',
    emoji: '📱',
    description: 'Cross-platform iOS & Android application',
    techStack: ['React Native', 'Expo', 'TypeScript', 'Fastlane'],
    timelineWeeks: [6, 12],
    teamRoles: { 'Mobile Engineer': 1, 'Backend Engineer': 1 },
    costRange: [25000, 50000],
    layer: 'service',
    color: '#8b5cf6',
    archLayer: 0,
  },
  {
    id: 'admin-panel',
    label: 'Admin Panel',
    emoji: '⚙️',
    description: 'Role-based admin interface with full audit logs',
    techStack: ['Next.js 15', 'RBAC', 'PostgreSQL', 'React Hook Form'],
    timelineWeeks: [2, 4],
    teamRoles: { 'Frontend Engineer': 1 },
    costRange: [8000, 15000],
    layer: 'service',
    color: '#64748b',
    archLayer: 3,
  },
  {
    id: 'payments',
    label: 'Payments',
    emoji: '💳',
    description: 'Stripe billing, subscriptions, and invoicing',
    techStack: ['Stripe', 'Webhooks', 'PostgreSQL', 'Next.js'],
    timelineWeeks: [2, 4],
    teamRoles: { 'Backend Engineer': 1 },
    costRange: [10000, 20000],
    layer: 'integration',
    color: '#10b981',
    archLayer: 3,
  },
  {
    id: 'analytics',
    label: 'Analytics Engine',
    emoji: '📈',
    description: 'Event tracking, funnels, and BI-grade reporting',
    techStack: ['Grafana', 'TimescaleDB', 'dbt', 'Apache Kafka'],
    timelineWeeks: [3, 6],
    teamRoles: { 'Data Engineer': 1, 'Backend Engineer': 1 },
    costRange: [15000, 28000],
    layer: 'service',
    color: '#f59e0b',
    archLayer: 3,
  },
  {
    id: 'crm',
    label: 'CRM Integration',
    emoji: '🤝',
    description: 'HubSpot / Salesforce sync and lead automation',
    techStack: ['HubSpot API', 'Salesforce SDK', 'n8n', 'PostgreSQL'],
    timelineWeeks: [2, 4],
    teamRoles: { 'Backend Engineer': 1 },
    costRange: [8000, 16000],
    layer: 'integration',
    color: '#ef4444',
    archLayer: 3,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    emoji: '🔔',
    description: 'Push, email, SMS, and in-app notification system',
    techStack: ['Firebase FCM', 'SendGrid', 'Twilio', 'Redis Queues'],
    timelineWeeks: [1, 3],
    teamRoles: { 'Backend Engineer': 1 },
    costRange: [5000, 10000],
    layer: 'integration',
    color: '#f97316',
    archLayer: 3,
  },
  {
    id: 'auth',
    label: 'Auth & SSO',
    emoji: '🔐',
    description: 'JWT auth, OAuth2, SAML SSO, MFA, and RBAC',
    techStack: ['NextAuth.js', 'JWT', 'OAuth2', 'SAML', 'HashiCorp Vault'],
    timelineWeeks: [1, 3],
    teamRoles: { 'Backend Engineer': 1 },
    costRange: [5000, 12000],
    layer: 'infrastructure',
    color: '#dc2626',
    archLayer: 2,
  },
  {
    id: 'file-storage',
    label: 'File Storage',
    emoji: '📁',
    description: 'Secure file upload, processing, and CDN delivery',
    techStack: ['AWS S3', 'CloudFront', 'Sharp', 'Supabase Storage'],
    timelineWeeks: [1, 2],
    teamRoles: { 'Backend Engineer': 1 },
    costRange: [4000, 8000],
    layer: 'infrastructure',
    color: '#0ea5e9',
    archLayer: 4,
  },
  {
    id: 'email-automation',
    label: 'Email Automation',
    emoji: '✉️',
    description: 'Transactional and marketing email with templates',
    techStack: ['SendGrid', 'React Email', 'Bull Queue', 'Postmark'],
    timelineWeeks: [1, 2],
    teamRoles: { 'Backend Engineer': 1 },
    costRange: [4000, 8000],
    layer: 'integration',
    color: '#8b5cf6',
    archLayer: 3,
  },
  {
    id: 'webhooks',
    label: 'APIs & Webhooks',
    emoji: '🔗',
    description: 'REST / GraphQL APIs and inbound/outbound webhooks',
    techStack: ['FastAPI', 'GraphQL', 'OpenAPI 3.1', 'Zod'],
    timelineWeeks: [2, 4],
    teamRoles: { 'Backend Engineer': 1 },
    costRange: [6000, 14000],
    layer: 'service',
    color: '#14b8a6',
    archLayer: 2,
  },
];

export interface SolutionMetrics {
  timelineMin: number;
  timelineMax: number;
  costMin: number;
  costMax: number;
  teamRoles: Record<string, number>;
  techStack: string[];
  complexity: 'Simple' | 'Moderate' | 'Complex' | 'Enterprise';
}

export function calculateSolutionMetrics(selected: ComponentId[]): SolutionMetrics {
  const components = solutionComponents.filter(c => selected.includes(c.id));

  if (components.length === 0) {
    return { timelineMin: 0, timelineMax: 0, costMin: 0, costMax: 0, teamRoles: {}, techStack: [], complexity: 'Simple' };
  }

  const timelineMin = Math.max(...components.map(c => c.timelineWeeks[0])) + Math.max(1, Math.floor(components.length / 4));
  const timelineMax = Math.max(...components.map(c => c.timelineWeeks[1])) + Math.max(1, Math.floor(components.length / 2));

  const baseCostMin = components.reduce((s, c) => s + c.costRange[0], 0);
  const baseCostMax = components.reduce((s, c) => s + c.costRange[1], 0);
  // Integration overhead: 15% for bundled work
  const costMin = Math.round(baseCostMin * 0.85);
  const costMax = Math.round(baseCostMax * 1.1);

  const teamRoles: Record<string, number> = {};
  components.forEach(c => {
    Object.entries(c.teamRoles).forEach(([role, count]) => {
      teamRoles[role] = Math.max(teamRoles[role] || 0, count);
    });
  });

  const techStack = [...new Set(components.flatMap(c => c.techStack))];

  const n = components.length;
  const complexity: SolutionMetrics['complexity'] =
    n <= 2 ? 'Simple' : n <= 4 ? 'Moderate' : n <= 7 ? 'Complex' : 'Enterprise';

  return { timelineMin, timelineMax, costMin, costMax, teamRoles, techStack, complexity };
}

export function formatCost(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${Math.round(value / 1000)}K`;
  return `$${value}`;
}
