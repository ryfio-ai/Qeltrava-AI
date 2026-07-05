// platform/shared/database/db-client-local.ts
// Local JSON file-based implementation of DBClient for development/CI

import fs from 'fs';
import path from 'path';
import { DBClient, Job, Applicant, Blog, CaseStudy, Product, MediaAsset, AuditLog, NewsletterSubscriber, ContactMessage, SystemSettings, CRMLead, ClientPortalAccount } from './types';

const DB_FILE_PATH = path.join(process.cwd(), 'platform/shared/database/db-local.json');

// Interface for the JSON DB structure
interface LocalDBStructure {
  organizations: any[];
  workspaces: any[];
  members: any[];
  jobs: Job[];
  applicants: Applicant[];
  blogs: Blog[];
  caseStudies: CaseStudy[];
  products: Product[];
  media: MediaAsset[];
  auditLogs: AuditLog[];
  subscribers: NewsletterSubscriber[];
  contactMessages: ContactMessage[];
  settings: SystemSettings[];
  crmLeads: CRMLead[];
  clientPortal: ClientPortalAccount[];
}

function readDB(): LocalDBStructure {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      initializeDB();
    }
    const data = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON DB, initializing empty:', err);
    return initializeDB();
  }
}

function writeDB(db: LocalDBStructure) {
  try {
    const dir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing JSON DB:', err);
  }
}

function initializeDB(): LocalDBStructure {
  console.log('Seeding Qeltrava OS local JSON database...');
  
  const defaultOrgId = 'org-qeltrava-group';
  const workspaceAIId = 'ws-qeltrava-ai';
  const workspaceModliqId = 'ws-modliq';

  const seededDB: LocalDBStructure = {
    organizations: [
      { id: defaultOrgId, name: 'Qeltrava Group', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    ],
    workspaces: [
      { id: workspaceAIId, organization_id: defaultOrgId, name: 'Qeltrava AI Website', slug: 'qeltrava-ai', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: workspaceModliqId, organization_id: defaultOrgId, name: 'Modliq Workspace', slug: 'modliq', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    ],
    members: [
      { id: 'mem-admin', workspace_id: workspaceAIId, email: 'admin@qeltrava.ai', role: 'Super Admin', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 'mem-recruiter', workspace_id: workspaceAIId, email: 'recruiter@qeltrava.ai', role: 'HR', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      { id: 'mem-marketer', workspace_id: workspaceAIId, email: 'marketing@qeltrava.ai', role: 'Marketing', status: 'active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
    ],
    jobs: [],
    applicants: [],
    blogs: [],
    caseStudies: [],
    products: [],
    media: [],
    auditLogs: [],
    subscribers: [],
    contactMessages: [],
    settings: [],
    crmLeads: [],
    clientPortal: [
      {
        id: 'client-modliq-1',
        workspace_id: workspaceAIId,
        company_name: 'Modliq Industries',
        primary_email: 'client@modliq.com',
        projects: [
          {
            id: 'proj-1',
            name: 'Modliq OS Platform Ingestion & Deployment Portal',
            status: 'In-Progress',
            progress: 75,
            milestones: [
              { name: 'Phase 1: Architecture Blueprint & Requirements Sync', status: 'completed', dueDate: '2026-07-10' },
              { name: 'Phase 2: Database Schema & Authentication Layer Deployment', status: 'completed', dueDate: '2026-07-20' },
              { name: 'Phase 3: Core Workspace Admin Panels & CMS Release', status: 'in-progress', dueDate: '2026-08-05' },
              { name: 'Phase 4: Client Portal Milestones & CRM Integration Checks', status: 'planned', dueDate: '2026-08-20' }
            ],
            tasks: [
              { name: 'Setup database schema drivers', status: 'done' },
              { name: 'Verify Next.js session validation API controllers', status: 'done' },
              { name: 'Deploy client workspace portal dashboard', status: 'in-progress' },
              { name: 'Configure continuous integration build testing pipelines', status: 'todo' }
            ]
          }
        ],
        invoices: [
          { id: 'inv-1', number: 'INV-2026-001', amount: 2500, status: 'paid', dueDate: '2026-07-01' },
          { id: 'inv-2', number: 'INV-2026-002', amount: 5000, status: 'paid', dueDate: '2026-07-15' }
        ],
        deliverables: [],
        tickets: [
          {
            id: 'ticket-1',
            subject: 'Milestone query: Is the CMS draft version control active?',
            status: 'closed',
            priority: 'medium',
            created_at: new Date().toISOString()
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  };

  // Seed 10 Career openings
  const jobsData = [
    {
      roleTitle: "Frontend Developer Intern",
      slug: "frontend-developer-intern",
      department: "Engineering",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Join Qeltrava AI as a Frontend Developer Intern and build modern, responsive web applications using the latest frontend technologies. Work closely with our engineering team to deliver intuitive user experiences for AI-powered products.",
      responsibilities: [
        "Build responsive UI components using React and Next.js.",
        "Collaborate with designers and backend developers.",
        "Optimize application performance and accessibility.",
        "Participate in code reviews and daily engineering discussions."
      ],
      requirements: [
        "Pursuing or recently completed an Engineering or Computer Science degree.",
        "Knowledge of HTML, CSS, JavaScript, and React.",
        "Basic understanding of Git and responsive design."
      ],
      benefits: [
        "Hands-on experience with real-world products.",
        "Mentorship from experienced engineers.",
        "Flexible remote work environment.",
        "Performance-based full-time opportunity."
      ],
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Git"]
    },
    {
      roleTitle: "Backend Developer Intern",
      slug: "backend-developer-intern",
      department: "Engineering",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Work on scalable backend systems, APIs, databases, and cloud integrations powering AI and SaaS products at Qeltrava AI.",
      responsibilities: [
        "Develop REST APIs and backend services.",
        "Design database schemas and optimize queries.",
        "Write reusable and maintainable backend code.",
        "Collaborate with frontend developers."
      ],
      requirements: [
        "Knowledge of Node.js or Python.",
        "Understanding of REST APIs and databases.",
        "Basic Git knowledge."
      ],
      benefits: [
        "Real production experience.",
        "Mentorship from engineering leaders.",
        "Flexible remote internship.",
        "Performance-based PPO."
      ],
      techStack: ["Node.js", "Express", "Python", "PostgreSQL", "Supabase"]
    },
    {
      roleTitle: "Full Stack Developer Intern",
      slug: "full-stack-developer-intern",
      department: "Engineering",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Build complete web applications from frontend to backend while working on live AI products in our engineering workspace.",
      responsibilities: [
        "Develop frontend and backend features.",
        "Integrate APIs and databases.",
        "Test and deploy applications.",
        "Collaborate across engineering teams."
      ],
      requirements: [
        "Knowledge of React and Node.js.",
        "Understanding of databases.",
        "Strong willingness to learn."
      ],
      benefits: [
        "Exposure to end-to-end product development.",
        "Remote-first culture.",
        "Mentorship and career growth.",
        "Performance-based PPO."
      ],
      techStack: ["Next.js", "Node.js", "TypeScript", "PostgreSQL", "Supabase"]
    },
    {
      roleTitle: "AI & Machine Learning Intern",
      slug: "ai-machine-learning-intern",
      department: "Artificial Intelligence",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Work on AI automation, LLM applications, machine learning workflows, and intelligent software solutions.",
      responsibilities: [
        "Build AI-powered applications.",
        "Train and evaluate ML models.",
        "Work with LLMs and vector databases.",
        "Research emerging AI technologies."
      ],
      requirements: [
        "Basic Python programming.",
        "Knowledge of Machine Learning concepts.",
        "Interest in Generative AI."
      ],
      benefits: [
        "Work on cutting-edge AI products.",
        "Research and experimentation opportunities.",
        "Remote work flexibility.",
        "Performance-based PPO."
      ],
      techStack: ["Python", "OpenAI", "LangChain", "TensorFlow", "PyTorch"]
    },
    {
      roleTitle: "UI/UX Design Intern",
      slug: "ui-ux-design-intern",
      department: "Design",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Design modern digital experiences for enterprise AI products and SaaS platforms.",
      responsibilities: [
        "Create wireframes and prototypes.",
        "Design responsive user interfaces.",
        "Collaborate with developers.",
        "Conduct usability improvements."
      ],
      requirements: [
        "Knowledge of Figma.",
        "Basic UX principles.",
        "Strong creativity."
      ],
      benefits: [
        "Build production-ready designs.",
        "Portfolio-worthy projects.",
        "Flexible remote internship.",
        "Performance-based PPO."
      ],
      techStack: ["Figma", "Adobe XD", "FigJam", "Illustrator"]
    },
    {
      roleTitle: "QA & Testing Intern",
      slug: "qa-testing-intern",
      department: "Quality Assurance",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Ensure product quality through manual and automated testing for AI-driven applications.",
      responsibilities: [
        "Execute test cases.",
        "Report and track bugs.",
        "Perform regression testing.",
        "Assist with automation testing."
      ],
      requirements: [
        "Attention to detail.",
        "Basic software testing knowledge.",
        "Strong analytical thinking."
      ],
      benefits: [
        "Experience with enterprise QA workflows.",
        "Remote work.",
        "Mentorship.",
        "Performance-based PPO."
      ],
      techStack: ["Playwright", "Cypress", "Postman", "Jira"]
    },
    {
      roleTitle: "DevOps & Cloud Intern",
      slug: "devops-cloud-intern",
      department: "Cloud Engineering",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Learn cloud infrastructure, CI/CD pipelines, and deployment automation for scalable products.",
      responsibilities: [
        "Maintain deployment pipelines.",
        "Monitor cloud infrastructure.",
        "Support DevOps automation.",
        "Improve application reliability."
      ],
      requirements: [
        "Basic Linux knowledge.",
        "Interest in Cloud technologies.",
        "Understanding of Git."
      ],
      benefits: [
        "Exposure to production infrastructure.",
        "Hands-on DevOps learning.",
        "Remote internship.",
        "Performance-based PPO."
      ],
      techStack: ["Docker", "GitHub Actions", "AWS", "Vercel", "Kubernetes"]
    },
    {
      roleTitle: "Data Analytics Intern",
      slug: "data-analytics-intern",
      department: "Data",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Analyze datasets, generate dashboards, and provide business insights for AI-powered solutions.",
      responsibilities: [
        "Analyze business data.",
        "Prepare reports and dashboards.",
        "Clean and transform datasets.",
        "Support decision-making."
      ],
      requirements: [
        "Basic SQL knowledge.",
        "Understanding of Excel or Python.",
        "Analytical mindset."
      ],
      benefits: [
        "Real business analytics experience.",
        "Remote work flexibility.",
        "Mentorship.",
        "Performance-based PPO."
      ],
      techStack: ["Python", "SQL", "Power BI", "Excel", "PostgreSQL"]
    },
    {
      roleTitle: "Cybersecurity Intern",
      slug: "cybersecurity-intern",
      department: "Security",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Help improve the security posture of AI and SaaS platforms through security assessments and best practices.",
      responsibilities: [
        "Assist with vulnerability assessments.",
        "Review security configurations.",
        "Support penetration testing.",
        "Document security findings."
      ],
      requirements: [
        "Interest in cybersecurity.",
        "Basic networking knowledge.",
        "Problem-solving skills."
      ],
      benefits: [
        "Work with secure enterprise systems.",
        "Mentorship.",
        "Remote work.",
        "Performance-based PPO."
      ],
      techStack: ["OWASP", "Burp Suite", "Snyk", "Linux", "Git"]
    },
    {
      roleTitle: "Technical Content & Developer Relations Intern",
      slug: "technical-content-developer-relations-intern",
      department: "Developer Relations",
      experience: "0-1 years (Internship)",
      employmentType: "Internship",
      location: "Remote",
      salaryRange: "NA",
      status: "Published",
      description: "Create technical documentation, engineering blogs, tutorials, and product content to support developers and customers.",
      responsibilities: [
        "Write technical blogs and documentation.",
        "Prepare product tutorials.",
        "Collaborate with engineering teams.",
        "Maintain developer resources."
      ],
      requirements: [
        "Excellent written communication.",
        "Basic software development knowledge.",
        "Strong research skills."
      ],
      benefits: [
        "Develop a technical writing portfolio.",
        "Work with engineering teams.",
        "Flexible remote work.",
        "Performance-based PPO."
      ],
      techStack: ["Markdown", "Git", "Notion", "Next.js", "SEO"]
    }
  ];

  jobsData.forEach((item, idx) => {
    const job: Job = {
      id: `job-${idx + 1}`,
      workspace_id: workspaceAIId,
      title: item.roleTitle,
      slug: item.slug,
      department: item.department,
      experience: item.experience,
      employment_type: item.employmentType,
      location: item.location,
      salary: item.salaryRange,
      posted_date: new Date(Date.now() - idx * 24 * 60 * 60 * 1000).toISOString(),
      open_positions: 1,
      description: item.description,
      responsibilities: item.responsibilities,
      requirements: item.requirements,
      benefits: item.benefits,
      hiring_process: [
        '1. Application',
        '2. Technical Task',
        '3. One-on-One Interview',
        '4. Offer'
      ],
      working_model: 'Remote',
      team_info: 'Our team is composed of PSG College of Technology alumni (Class of 2026) building scalable enterprise architectures.',
      about_company: 'Qeltrava AI is the AI-Led Software Engineering company building high-performance intelligence boundaries for enterprise platforms.',
      tech_stack: item.techStack,
      status: 'Published',
      is_featured: idx < 3,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    seededDB.jobs.push(job);
  });

  // Seed 3 Blogs
  seededDB.blogs = [
    {
      id: 'blog-1',
      workspace_id: workspaceAIId,
      title: 'Why AI-Native Architecture Is an Architecture Decision, Not a Feature Toggle',
      slug: 'ai-native-architecture-decision',
      summary: 'AI-native architecture means designing system boundaries, data flows, and deployment patterns specifically to support LLM inference and agent orchestration — not adding an API call to an existing monolith.',
      content: 'As organizations scramble to integrate Artificial Intelligence into their operations, a common engineering anti-pattern has emerged: treating AI as a simple feature toggle. Many development teams assume that adding cognitive capabilities to a platform is as simple as invoking an external LLM API from an existing monolith. This approach is not only short-sighted; it introduces massive architectural bottlenecks, security vulnerabilities, and runaway operational costs that inevitably lead to project failure at production scale.\n\nTrue AI-native architecture requires a fundamental redesign of system boundaries, database schemas, and data pipelines. It is an architecture-level decision that must be addressed from day one. When a system is engineered to be AI-native, it acknowledges the unique characteristics of non-deterministic model outputs, the latency budgets of LLM calls, and the complex orchestration required for multi-agent workflows.\n\nHere are three clear signs that a system is merely "AI-bolted-on" rather than truly AI-native:\n\n1. Synchronous LLM Calls in Core Web Threads: If your user-facing request-response cycle blocks while waiting 5 to 15 seconds for a third-party LLM API to return a response, your system will experience severe thread starvation and timeout failures under load. AI-native designs utilize asynchronous task queues, event brokers, and Server-Sent Events (SSE) or WebSockets to handle long-running model operations gracefully.\n\n2. Lack of Vector Database and Embedding Pipelines: Storing raw text prompts and sending them repeatedly to an LLM is highly inefficient. AI-native architectures implement robust data ingestion pipelines that automatically parse, chunk, and embed documents into a dedicated vector database (like pgvector or Qdrant), implementing Retrieval-Augmented Generation (RAG) to inject relevant context dynamically and accurately.\n\n3. Missing Guardrails and Observability: Bolt-on designs lack tracking for token consumption, prompt latency, or model accuracy. In contrast, an AI-native system incorporates semantic caching to prevent redundant LLM calls, robust prompt versioning, and real-time observability dashboards to monitor agent decisions, hallucination rates, and compliance guardrails.\n\nTo build an AI-native system from sprint one, engineers must decouple prompt engineering and agent execution into microservices. Data flows must be structured to feed vector spaces continuously, and the front-end must support streaming-first interfaces. By making these core architectural adjustments early, enterprise platforms can scale to millions of monthly agent executions securely, reliably, and cost-effectively.',
      category: 'AI Engineering',
      tags: ['AI-Native', 'Software Architecture', 'RAG'],
      author: 'Qeltrava AI Engineering Team',
      read_time: '5 min read',
      featured_image: '',
      published: true,
      published_at: '2026-07-01T00:00:00Z',
      versions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'blog-2',
      workspace_id: workspaceAIId,
      title: 'The Four Signals That Tell You a Legacy System Is Ready for Modernization',
      slug: 'legacy-system-modernization-signals',
      summary: 'Legacy systems should be modernized when they meet one or more of four observable criteria: deployment frequency has stagnated, a single engineer departure would cause modules failure, costs scale poorly, or audits show structural vulnerabilities.',
      content: 'Maintaining a legacy system is a delicate balancing act. Business leaders often delay modernization projects out of fear of operational disruption, high costs, and transition failures. However, postponing modernization past a critical tipping point leads to a state of technical debt where maintenance costs swallow your entire engineering budget, leaving zero room for product innovation.\n\nModernization does not always require a high-risk, multi-year greenfield rewrite. Often, the most successful path is a phased strangler-fig migration, where core legacy modules are systematically replaced by modern microservices over time. The key is knowing exactly when to start. We have identified four key diagnostic signals that tell you a system is ready for modernization:\n\nSignal 1: Stagnant Deployment Frequency. If your engineering team is only able to ship code once a month, or if deployment day requires a multi-hour "war room" with manual validation checklists, your delivery pipeline is broken. Modern systems utilize automated testing, containerization, and progressive rollouts to deploy changes multiple times a day with high confidence.\n\nSignal 2: The Single-Point-of-Failure Developer. If a single senior engineer’s departure or vacation would halt updates to a core business module, your system has a massive stability risk. Legacy platforms with undocumented codebases and specialized, outdated languages create severe knowledge silos that threaten operations.\n\nSignal 3: Disproportionate Cost Scaling. If your monthly cloud infrastructure or hardware hosting bills are growing faster than your transaction volume, it indicates that your software architecture cannot scale efficiently. Monolithic legacy systems cannot auto-scale individual high-load pathways, forcing you to pay to over-provision the entire application.\n\nSignal 4: Architectural Compliance Roadblocks. If your security and compliance audits show structural vulnerabilities (like SQL injection risks baked into database frameworks, lack of role-based access control, or inability to encrypt data at rest) that require rewriting core database schemas rather than updating simple configurations, you have crossed from procedural issues into architectural legacy debt.\n\nBy monitoring these four diagnostic signals, technical teams can compile a data-backed case for modernization. A phased roadmap that targets the highest-friction modules first ensures that system stability and business agility are recovered without the extreme risks of a greenfield rebuild.',
      category: 'Enterprise Architecture',
      tags: ['Modernization', 'Technical Debt', 'Microservices'],
      author: 'Qeltrava AI Engineering Team',
      read_time: '4 min read',
      featured_image: '',
      published: true,
      published_at: '2026-06-24T00:00:00Z',
      versions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'blog-3',
      workspace_id: workspaceAIId,
      title: 'What Enterprise Buyers Actually Check During Software Partner Due Diligence',
      slug: 'enterprise-buyer-due-diligence',
      summary: 'Enterprise procurement teams evaluate software engineering partners across five dimensions: security posture, case studies, delivery methodology, team stability, and legal clauses.',
      content: 'For mid-market software agencies and engineering teams, winning six and seven-figure enterprise contracts is rarely about having the most complex algorithms or the trendiest technology stack. Enterprise buyers—guided by strict procurement, security, and legal departments—focus heavily on minimizing operational risk. When evaluating a potential software partner, their due diligence goes far beyond coding ability.\n\nProcess maturity, robust documentation, and structural safety are the primary filters in enterprise selection. To help engineering firms prepare for enterprise evaluations, we have outlined the five key dimensions procurement teams check during due diligence:\n\nDimension 1: Security Posture and Compliance. Enterprise buyers will scrutinize your security practices. They will verify whether you have formal certifications (like SOC 2 Type II or ISO 27001), how you encrypt customer data, and how you manage vulnerabilities. Having documented secure coding standards (such as OWASP top 10 compliance) and regular pen-test reports is non-negotiable.\n\nDimension 2: Reference-ability and Anonymized Proof. Buyers look for proof that you have solved similar problems at scale. While non-disclosure agreements (NDAs) often prevent publishing exact client names, having highly structured, anonymized case studies that detail the exact problem, approach, and quantitative metrics (e.g. latency reductions, cost savings) is crucial for validating credibility.\n\nDimension 3: Delivery Methodology Documentation. Enterprises need to know how you work. They check your project management rigor, ticket handling, and sprint cadences. A partner that can provide a documented "Delivery OS" showing how scope is controlled, how code is reviewed, and how QA is automated will always beat an agency that relies on informal developer updates.\n\nDimension 4: Team Stability and Continuity. Procurement evaluates your team\'s retention rates and onboarding speed. If your developers churn frequently, the buyer knows their project will suffer from lost context and delays. They want to see that you have stable engineering pods, standard handoff processes, and a clear talent pipeline.\n\nDimension 5: Legal and Contractual Protections. The final hurdle is always legal. Buyers look at your intellectual property (IP) assignment clauses, liability caps, data processing agreements (GDPR/CCPA alignment), and SLA guarantees. Having enterprise-ready contracts with clear IP transfer on milestones prevents friction and builds massive trust.\n\nTechnical competence is simply the entry ticket. The software partners that consistently secure enterprise contracts are those that treat delivery rigor, legal readiness, and security as first-class citizens in their business operations.',
      category: 'Product & Delivery',
      tags: ['Enterprise Sales', 'Process Maturity', 'SOC2'],
      author: 'Qeltrava AI Engineering Team',
      read_time: '4 min read',
      featured_image: '',
      published: true,
      published_at: '2026-06-18T00:00:00Z',
      versions: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Seed 3 Case Studies
  seededDB.caseStudies = [
    {
      id: 'fintech-core-modernization',
      workspace_id: workspaceAIId,
      title: 'Migrating a legacy monolithic core to a scalable microservices architecture with zero downtime.',
      slug: 'fintech-core-modernization',
      client: 'Global Fintech Provider (Anonymized)',
      industry: 'Financial Services',
      problem: 'A high-growth fintech provider was experiencing critical system bottlenecks during peak trading hours. Their legacy monolithic architecture, built 8 years prior, could not scale dynamically, resulting in high infrastructure costs and unacceptably high latency during market volatility.',
      solution: 'Qeltrava AI deployed a specialized squad of Cloud and DevOps architects. We designed a transition roadmap to a Kubernetes-orchestrated microservices architecture. Using our Qeltrava Delivery OS, we implemented Infrastructure as Code (IaC) and established a parallel blue-green deployment strategy to ensure zero downtime during the migration.',
      architecture: 'Kubernetes Cluster with Go API Microservices, pgvector RAG Cache, and RDS PostgreSQL replication.',
      tech_stack: ['Kubernetes', 'Go Microservices', 'Terraform', 'PostgreSQL'],
      timeline: '12 weeks',
      results: [
        'Reduced core transaction latency by 45%',
        'Saved 30% in monthly compute costs',
        'Enabled multi-deployments daily with zero downtime'
      ],
      metrics: [
        { label: 'Latency (ms)', before: 450, after: 240 },
        { label: 'Monthly Compute ($K)', before: 120, after: 84 }
      ],
      diagram_variant: 'operating-model',
      published: true,
      published_at: '2026-05-10T00:00:00Z',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'healthcare-ai-triage',
      workspace_id: workspaceAIId,
      title: 'Automating patient intake and initial triage using strict HIPAA-compliant conversational AI.',
      slug: 'healthcare-ai-triage',
      client: 'National Healthcare Network (Anonymized)',
      industry: 'Healthcare',
      problem: "The healthcare network's patient support center was overwhelmed with routine scheduling, intake, and non-emergency medical inquiries, leading to 45-minute average hold times and a severe drop in patient satisfaction.",
      solution: 'We engineered a secure, HIPAA-compliant conversational AI agent integrated directly into their EHR (Electronic Health Record) system. The agent uses strict fallback mechanisms, immediately routing to human operators if uncertainty thresholds are crossed or if emergency intent is detected.',
      architecture: 'LLM orchestrator route gateway with LangChain, Pinecone vector embeddings index, EHR sync middleware.',
      tech_stack: ['LLM Routing', 'Vector DB', 'HIPAA API Gateway', 'React'],
      timeline: '16 weeks',
      results: [
        'Resolved 68% of support requests automatically',
        'Reduced wait times from 45 min to under 2 min',
        'Saved $1.2M annually in triage operations overhead'
      ],
      metrics: [
        { label: 'Avg Hold Time (min)', before: 45, after: 2 },
        { label: 'Automated Resolution (%)', before: 0, after: 68 }
      ],
      diagram_variant: 'service-pipeline',
      published: true,
      published_at: '2026-04-15T00:00:00Z',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Seed Modliq Product
  seededDB.products = [
    {
      id: 'prod-modliq',
      workspace_id: workspaceAIId,
      name: 'Modliq',
      slug: 'modliq',
      logo: '⚡',
      status: 'Live',
      overview: 'Modliq is Qeltrava Group\'s flag SaaS model-driven dashboard builder, allowing organizations to visualize operational data, monitor LLM execution tokens, and deploy custom user facing charts in minutes.',
      features: [
        { name: 'Drag-and-Drop Builders', description: 'Reorder stats blocks, analytics graphs, and feeds instantly without re-deploying.' },
        { name: 'Model Observability', description: 'Real-time counters for OpenAI, Gemini, and Anthropic token budgets.' },
        { name: 'Fine-Tuned Embeddings RAG', description: 'Load document directories and run local query models immediately.' }
      ],
      screenshots: [],
      documentation_url: '/docs/modliq',
      website_url: 'https://modliq.ai',
      pricing: {
        tiers: [
          { name: 'Starter', price: '$29/mo', features: ['1 Workspace', '10,000 queries', 'Basic analytics'] },
          { name: 'Team', price: '$99/mo', features: ['5 Workspaces', '100,000 queries', 'Role permissions'] },
          { name: 'Enterprise', price: 'Custom', features: ['Unlimited workspaces', 'Self-hosted R2 storage', 'SLA support'] }
        ]
      },
      roadmap: [
        { quarter: 'Q3 2026', goals: ['Stripe billing hooks integration', 'FuseJS global search'], status: 'completed' },
        { quarter: 'Q4 2026', goals: ['Dynamic forms webhook routing', 'WhatsApp support integrations'], status: 'in-progress' }
      ],
      published: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Seed default System Settings
  seededDB.settings = [
    {
      id: 'settings-1',
      workspace_id: workspaceAIId,
      company_name: 'Qeltrava AI',
      logo_url: '/logo-bg.png',
      contact_email: 'hello@qeltrava.ai',
      contact_phone: '',
      social_links: {
        linkedin: 'https://www.linkedin.com/company/qeltravai/',
        github: 'https://github.com/qeltrava',
        twitter: 'https://twitter.com/qeltrava'
      },
      navigation_header: [
        { label: 'Services', href: '/services' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Industries', href: '/industries' },
        { label: 'Operating Model', href: '/operating-model' },
        { label: 'Insights', href: '/insights' },
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' }
      ],
      navigation_footer: [
        { label: 'Solutions', href: '/solutions' },
        { label: 'Industries', href: '/industries' },
        { label: 'Careers', href: '/careers' },
        { label: 'Insights', href: '/insights' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' }
      ],
      feature_flags: {
        careers: true,
        products: true,
        blogs: true,
        clientPortal: true,
        crm: true,
        automation: false
      },
      api_keys: {
        resend: '',
        openai: '',
        gemini: ''
      },
      smtp_config: {},
      dashboard_widgets: [
        { id: 'widget-applicants', colSpan: 1, rowSpan: 1, index: 0, title: 'Today\'s Candidates' },
        { id: 'widget-crm', colSpan: 1, rowSpan: 1, index: 1, title: 'Open Sales Leads' },
        { id: 'widget-blogs', colSpan: 1, rowSpan: 1, index: 2, title: 'Published Blog Count' },
        { id: 'widget-analytics', colSpan: 2, rowSpan: 2, index: 3, title: 'Weekly Visitors Funnel' }
      ],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  writeDB(seededDB);
  return seededDB;
}

// Helper to filter array by record fields
const filterList = (list: any[], workspaceId: string, filters?: Record<string, any>) => {
  let result = list.filter(item => item.workspace_id === workspaceId);
  if (filters) {
    Object.keys(filters).forEach(key => {
      const val = filters[key];
      if (val !== undefined && val !== '') {
        result = result.filter(item => {
          if (Array.isArray(item[key])) {
            return item[key].includes(val);
          }
          if (typeof item[key] === 'string') {
            return item[key].toLowerCase().includes(String(val).toLowerCase());
          }
          return item[key] === val;
        });
      }
    });
  }
  return result;
};

// Implement DBClient
export const localDBClient: DBClient = {
  jobs: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.jobs, workspaceId, filters) as Job[];
    },
    get: async (workspaceId, idOrSlug) => {
      const db = readDB();
      const job = db.jobs.find(
        j => j.workspace_id === workspaceId && (j.id === idOrSlug || j.slug === idOrSlug)
      );
      return job || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const job: Job = {
        ...data,
        id: `job-${Date.now()}`,
        workspace_id: workspaceId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.jobs.push(job);
      writeDB(db);
      return job;
    },
    update: async (workspaceId, id, data) => {
      const db = readDB();
      const idx = db.jobs.findIndex(j => j.workspace_id === workspaceId && j.id === id);
      if (idx === -1) throw new Error(`Job not found: ${id}`);
      db.jobs[idx] = {
        ...db.jobs[idx],
        ...data,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.jobs[idx];
    },
    delete: async (workspaceId, id) => {
      const db = readDB();
      const initialLength = db.jobs.length;
      db.jobs = db.jobs.filter(j => !(j.workspace_id === workspaceId && j.id === id));
      writeDB(db);
      return db.jobs.length < initialLength;
    }
  },

  applicants: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.applicants, workspaceId, filters) as Applicant[];
    },
    get: async (workspaceId, id) => {
      const db = readDB();
      const app = db.applicants.find(a => a.workspace_id === workspaceId && a.id === id);
      return app || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const applicant: Applicant = {
        ...data,
        id: `app-${Date.now()}`,
        workspace_id: workspaceId,
        notes: [],
        timeline: [
          {
            id: `log-${Date.now()}`,
            actor: 'System',
            actor_email: 'system@qeltrava.ai',
            action: 'Application submitted online.',
            created_at: new Date().toISOString()
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.applicants.push(applicant);
      writeDB(db);
      return applicant;
    },
    update: async (workspaceId, id, data) => {
      const db = readDB();
      const idx = db.applicants.findIndex(a => a.workspace_id === workspaceId && a.id === id);
      if (idx === -1) throw new Error(`Applicant not found: ${id}`);
      
      const oldStatus = db.applicants[idx].status;
      const newStatus = data.status;
      const timelineLogs = [...db.applicants[idx].timeline];
      
      if (newStatus && newStatus !== oldStatus) {
        timelineLogs.push({
          id: `log-${Date.now()}`,
          actor: 'Recruiter Admin',
          actor_email: 'admin@qeltrava.ai',
          action: `Status changed from ${oldStatus} to ${newStatus}.`,
          created_at: new Date().toISOString()
        });
      }

      db.applicants[idx] = {
        ...db.applicants[idx],
        ...data,
        timeline: timelineLogs,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.applicants[idx];
    }
  },

  blogs: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.blogs, workspaceId, filters) as Blog[];
    },
    get: async (workspaceId, idOrSlug) => {
      const db = readDB();
      return db.blogs.find(b => b.workspace_id === workspaceId && (b.id === idOrSlug || b.slug === idOrSlug)) || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const blog: Blog = {
        ...data,
        id: `blog-${Date.now()}`,
        workspace_id: workspaceId,
        versions: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.blogs.push(blog);
      writeDB(db);
      return blog;
    },
    update: async (workspaceId, id, data) => {
      const db = readDB();
      const idx = db.blogs.findIndex(b => b.workspace_id === workspaceId && b.id === id);
      if (idx === -1) throw new Error(`Blog not found: ${id}`);
      
      const oldBlog = db.blogs[idx];
      const versions = [...oldBlog.versions];
      
      // Save version revision before updating
      if (data.content && data.content !== oldBlog.content) {
        versions.unshift({
          version_id: `ver-${Date.now()}`,
          title: oldBlog.title,
          summary: oldBlog.summary,
          content: oldBlog.content,
          updated_by: data.updated_by || 'admin@qeltrava.ai',
          created_at: oldBlog.updated_at
        });
      }

      db.blogs[idx] = {
        ...oldBlog,
        ...data,
        versions,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.blogs[idx];
    },
    delete: async (workspaceId, id) => {
      const db = readDB();
      const initialLength = db.blogs.length;
      db.blogs = db.blogs.filter(b => !(b.workspace_id === workspaceId && b.id === id));
      writeDB(db);
      return db.blogs.length < initialLength;
    }
  },

  caseStudies: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.caseStudies, workspaceId, filters) as CaseStudy[];
    },
    get: async (workspaceId, idOrSlug) => {
      const db = readDB();
      return db.caseStudies.find(c => c.workspace_id === workspaceId && (c.id === idOrSlug || c.slug === idOrSlug)) || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const cs: CaseStudy = {
        ...data,
        id: `cs-${Date.now()}`,
        workspace_id: workspaceId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.caseStudies.push(cs);
      writeDB(db);
      return cs;
    },
    update: async (workspaceId, id, data) => {
      const db = readDB();
      const idx = db.caseStudies.findIndex(c => c.workspace_id === workspaceId && c.id === id);
      if (idx === -1) throw new Error(`Case study not found: ${id}`);
      db.caseStudies[idx] = {
        ...db.caseStudies[idx],
        ...data,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.caseStudies[idx];
    },
    delete: async (workspaceId, id) => {
      const db = readDB();
      const initialLength = db.caseStudies.length;
      db.caseStudies = db.caseStudies.filter(c => !(c.workspace_id === workspaceId && c.id === id));
      writeDB(db);
      return db.caseStudies.length < initialLength;
    }
  },

  products: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.products, workspaceId, filters) as Product[];
    },
    get: async (workspaceId, idOrSlug) => {
      const db = readDB();
      return db.products.find(p => p.workspace_id === workspaceId && (p.id === idOrSlug || p.slug === idOrSlug)) || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const prod: Product = {
        ...data,
        id: `prod-${Date.now()}`,
        workspace_id: workspaceId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.products.push(prod);
      writeDB(db);
      return prod;
    },
    update: async (workspaceId, id, data) => {
      const db = readDB();
      const idx = db.products.findIndex(p => p.workspace_id === workspaceId && p.id === id);
      if (idx === -1) throw new Error(`Product not found: ${id}`);
      db.products[idx] = {
        ...db.products[idx],
        ...data,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.products[idx];
    },
    delete: async (workspaceId, id) => {
      const db = readDB();
      const initialLength = db.products.length;
      db.products = db.products.filter(p => !(p.workspace_id === workspaceId && p.id === id));
      writeDB(db);
      return db.products.length < initialLength;
    }
  },

  media: {
    list: async (workspaceId, folder = '/') => {
      const db = readDB();
      return db.media.filter(m => m.workspace_id === workspaceId && m.folder === folder);
    },
    get: async (workspaceId, id) => {
      const db = readDB();
      return db.media.find(m => m.workspace_id === workspaceId && m.id === id) || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const asset: MediaAsset = {
        ...data,
        id: `media-${Date.now()}`,
        workspace_id: workspaceId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.media.push(asset);
      writeDB(db);
      return asset;
    },
    delete: async (workspaceId, id) => {
      const db = readDB();
      const initialLength = db.media.length;
      db.media = db.media.filter(m => !(m.workspace_id === workspaceId && m.id === id));
      writeDB(db);
      return db.media.length < initialLength;
    }
  },

  auditLogs: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.auditLogs, workspaceId, filters) as AuditLog[];
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const log: AuditLog = {
        ...data,
        id: `audit-${Date.now()}`,
        workspace_id: workspaceId,
        created_at: new Date().toISOString()
      };
      db.auditLogs.unshift(log); // newest first
      writeDB(db);
      return log;
    }
  },

  subscribers: {
    list: async (workspaceId) => {
      const db = readDB();
      return db.subscribers.filter(s => s.workspace_id === workspaceId);
    },
    create: async (workspaceId, email) => {
      const db = readDB();
      const existing = db.subscribers.find(s => s.workspace_id === workspaceId && s.email.toLowerCase() === email.toLowerCase());
      if (existing) return existing;
      const sub: NewsletterSubscriber = {
        id: `sub-${Date.now()}`,
        workspace_id: workspaceId,
        email,
        subscribed_at: new Date().toISOString()
      };
      db.subscribers.push(sub);
      writeDB(db);
      return sub;
    },
    delete: async (workspaceId, email) => {
      const db = readDB();
      const initialLength = db.subscribers.length;
      db.subscribers = db.subscribers.filter(s => !(s.workspace_id === workspaceId && s.email.toLowerCase() === email.toLowerCase()));
      writeDB(db);
      return db.subscribers.length < initialLength;
    }
  },

  contactMessages: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.contactMessages, workspaceId, filters) as ContactMessage[];
    },
    get: async (workspaceId, id) => {
      const db = readDB();
      return db.contactMessages.find(c => c.workspace_id === workspaceId && c.id === id) || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const msg: ContactMessage = {
        ...data,
        id: `msg-${Date.now()}`,
        workspace_id: workspaceId,
        replies: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.contactMessages.push(msg);
      writeDB(db);
      return msg;
    },
    update: async (workspaceId, id, data) => {
      const db = readDB();
      const idx = db.contactMessages.findIndex(c => c.workspace_id === workspaceId && c.id === id);
      if (idx === -1) throw new Error(`Message not found: ${id}`);
      db.contactMessages[idx] = {
        ...db.contactMessages[idx],
        ...data,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.contactMessages[idx];
    }
  },

  settings: {
    get: async (workspaceId) => {
      const db = readDB();
      let settings = db.settings.find(s => s.workspace_id === workspaceId);
      if (!settings) {
        // Fallback or dynamic create
        settings = {
          id: `settings-${Date.now()}`,
          workspace_id: workspaceId,
          company_name: 'Qeltrava AI',
          social_links: {},
          navigation_header: [],
          navigation_footer: [],
          feature_flags: {},
          api_keys: {},
          smtp_config: {},
          dashboard_widgets: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        db.settings.push(settings);
        writeDB(db);
      }
      return settings;
    },
    update: async (workspaceId, data) => {
      const db = readDB();
      const idx = db.settings.findIndex(s => s.workspace_id === workspaceId);
      if (idx === -1) {
        const settings: SystemSettings = {
          id: `settings-${Date.now()}`,
          workspace_id: workspaceId,
          company_name: data.company_name || 'Qeltrava AI',
          logo_url: data.logo_url,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone,
          social_links: data.social_links || {},
          navigation_header: data.navigation_header || [],
          navigation_footer: data.navigation_footer || [],
          feature_flags: data.feature_flags || {},
          api_keys: data.api_keys || {},
          smtp_config: data.smtp_config || {},
          dashboard_widgets: data.dashboard_widgets || [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        db.settings.push(settings);
        writeDB(db);
        return settings;
      }
      db.settings[idx] = {
        ...db.settings[idx],
        ...data,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.settings[idx];
    }
  },

  crmLeads: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.crmLeads, workspaceId, filters) as CRMLead[];
    },
    get: async (workspaceId, id) => {
      const db = readDB();
      return db.crmLeads.find(l => l.workspace_id === workspaceId && l.id === id) || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const lead: CRMLead = {
        ...data,
        id: `lead-${Date.now()}`,
        workspace_id: workspaceId,
        tasks: [],
        meetings: [],
        notes: [],
        activity_timeline: [
          {
            id: `act-${Date.now()}`,
            text: 'Lead created in pipeline.',
            created_at: new Date().toISOString()
          }
        ],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.crmLeads.push(lead);
      writeDB(db);
      return lead;
    },
    update: async (workspaceId, id, data) => {
      const db = readDB();
      const idx = db.crmLeads.findIndex(l => l.workspace_id === workspaceId && l.id === id);
      if (idx === -1) throw new Error(`Lead not found: ${id}`);
      db.crmLeads[idx] = {
        ...db.crmLeads[idx],
        ...data,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.crmLeads[idx];
    }
  },

  clientPortal: {
    list: async (workspaceId, filters) => {
      const db = readDB();
      return filterList(db.clientPortal, workspaceId, filters) as ClientPortalAccount[];
    },
    get: async (workspaceId, idOrEmail) => {
      const db = readDB();
      return db.clientPortal.find(
        c => c.workspace_id === workspaceId && (c.id === idOrEmail || c.primary_email.toLowerCase() === idOrEmail.toLowerCase())
      ) || null;
    },
    create: async (workspaceId, data) => {
      const db = readDB();
      const client: ClientPortalAccount = {
        ...data,
        id: `cli-${Date.now()}`,
        workspace_id: workspaceId,
        projects: [],
        invoices: [],
        deliverables: [],
        tickets: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      db.clientPortal.push(client);
      writeDB(db);
      return client;
    },
    update: async (workspaceId, id, data) => {
      const db = readDB();
      const idx = db.clientPortal.findIndex(c => c.workspace_id === workspaceId && c.id === id);
      if (idx === -1) throw new Error(`Client account not found: ${id}`);
      db.clientPortal[idx] = {
        ...db.clientPortal[idx],
        ...data,
        updated_at: new Date().toISOString()
      };
      writeDB(db);
      return db.clientPortal[idx];
    }
  }
};
