export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  technologies: string[];
  diagramVariant: 'operating-model' | 'service-pipeline';
  metrics: { label: string; before: number; after: number }[];
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "fintech-core-modernization",
    client: "Global Fintech Provider (Anonymized)",
    industry: "Financial Services",
    title: "Migrating a legacy monolithic core to a scalable microservices architecture with zero downtime.",
    problem: "A high-growth fintech provider was experiencing critical system bottlenecks during peak trading hours. Their legacy monolithic architecture, built 8 years prior, could not scale dynamically, resulting in high infrastructure costs and unacceptably high latency during market volatility.",
    approach: "Qeltrava AI deployed a specialized squad of Cloud and DevOps architects. We designed a transition roadmap to a Kubernetes-orchestrated microservices architecture. Using our Qeltrava Delivery OS, we implemented Infrastructure as Code (IaC) and established a parallel blue-green deployment strategy to ensure zero downtime during the migration.",
    result: "The migration reduced core transaction latency by 45% and reduced overall cloud compute costs by 30% through dynamic auto-scaling. The client can now deploy feature updates multiple times a day instead of once a month.",
    technologies: ['Kubernetes', 'Go Microservices', 'Terraform', 'PostgreSQL'],
    diagramVariant: 'operating-model',
    metrics: [
      { label: 'Latency (ms)', before: 450, after: 240 },
      { label: 'Monthly Compute ($K)', before: 120, after: 84 }
    ]
  },
  {
    id: "healthcare-ai-triage",
    client: "National Healthcare Network (Anonymized)",
    industry: "Healthcare",
    title: "Automating patient intake and initial triage using strict HIPAA-compliant conversational AI.",
    problem: "The healthcare network's patient support center was overwhelmed with routine scheduling, intake, and non-emergency medical inquiries, leading to 45-minute average hold times and a severe drop in patient satisfaction.",
    approach: "We engineered a secure, HIPAA-compliant conversational AI agent integrated directly into their EHR (Electronic Health Record) system. The agent uses strict fallback mechanisms, immediately routing to human operators if uncertainty thresholds are crossed or if emergency intent is detected.",
    result: "The AI agent now successfully resolves 68% of all incoming patient queries without human intervention. Average hold times dropped to under 2 minutes, and operational overhead at the call center was reduced by $1.2M annually.",
    technologies: ['LLM Routing', 'Vector DB', 'HIPAA API Gateway', 'React'],
    diagramVariant: 'service-pipeline',
    metrics: [
      { label: 'Avg Hold Time (min)', before: 45, after: 2 },
      { label: 'Automated Resolution (%)', before: 0, after: 68 }
    ]
  },
  {
    id: "logistics-predictive-maintenance",
    client: "Enterprise Supply Chain Operator",
    industry: "Logistics",
    title: "Implementing predictive maintenance models to reduce fleet downtime.",
    problem: "A major logistics operator was losing millions annually to unplanned fleet vehicle breakdowns and inefficient scheduled maintenance that pulled healthy vehicles off the road unnecessarily.",
    approach: "Our Data Analytics team aggregated raw telemetry data from over 4,000 vehicles. We engineered a machine learning pipeline that predicts mechanical failures based on engine temperature patterns, vibration telemetry, and historical maintenance logs.",
    result: "Unplanned downtime was reduced by 38%. The predictive model correctly identifies failure risks 14 days in advance with 92% accuracy, allowing maintenance to be scheduled precisely when needed.",
    technologies: ['TensorFlow', 'IoT Telemetry Pipeline', 'Kafka', 'AWS MLOps'],
    diagramVariant: 'service-pipeline',
    metrics: [
      { label: 'Unplanned Downtime (%)', before: 18, after: 6 },
      { label: 'Maintenance Cost ($M)', before: 12, after: 8 }
    ]
  }
];
