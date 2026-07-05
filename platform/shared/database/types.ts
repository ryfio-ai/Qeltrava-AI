// platform/shared/database/types.ts
// Strict type-safety models for Qeltrava OS v4.0

export interface Organization {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Workspace {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  domain?: string;
  settings: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  workspace_id: string;
  user_id?: string;
  email: string;
  role: string; // Super Admin, Admin, HR, Recruiter, Developer, Marketing, Content Editor, Sales, Support, Finance, Viewer
  status: 'active' | 'suspended' | 'pending';
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  workspace_id: string;
  title: string;
  slug: string;
  department: string;
  experience: string;
  employment_type: string; // Full-Time, Internship, Part-Time, Contract, etc.
  location: string;
  salary?: string;
  posted_date: string;
  open_positions: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  hiring_process: string[];
  working_model: 'Remote' | 'Hybrid' | 'On-site';
  team_info?: string;
  about_company?: string;
  tech_stack: string[];
  status: 'Draft' | 'Published' | 'Archived' | 'Scheduled';
  is_featured: boolean;
  publish_at?: string;
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
}

export interface RecruiterNote {
  id: string;
  author: string;
  author_email: string;
  role: string;
  text: string;
  created_at: string;
}

export interface TimelineLog {
  id: string;
  actor: string;
  actor_email: string;
  action: string; // e.g. "Applied", "Status changed to Interview", "Added rating 4/5"
  created_at: string;
}

export interface Applicant {
  id: string;
  workspace_id: string;
  job_id?: string;
  full_name: string;
  email: string;
  phone?: string;
  college?: string;
  degree?: string;
  year?: string;
  skills: string[];
  linkedin?: string;
  github?: string;
  portfolio?: string;
  resume_url: string;
  cover_letter?: string;
  availability?: string;
  preferred_location?: string;
  expected_stipend?: string;
  experience?: string;
  status: 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Offer' | 'Rejected' | 'Hired';
  rating?: number; // 0 to 5
  notes: RecruiterNote[];
  timeline: TimelineLog[];
  created_at: string;
  updated_at: string;
}

export interface BlogVersion {
  version_id: string;
  title: string;
  summary?: string;
  content: string;
  updated_by: string;
  created_at: string;
}

export interface Blog {
  id: string;
  workspace_id: string;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  read_time?: string;
  featured_image?: string;
  published: boolean;
  published_at?: string;
  versions: BlogVersion[];
  created_at: string;
  updated_at: string;
}

export interface CaseStudyMetric {
  label: string;
  before: number;
  after: number;
}

export interface CaseStudy {
  id: string;
  workspace_id: string;
  title: string;
  slug: string;
  client: string;
  industry: string;
  problem: string;
  solution: string;
  architecture?: string;
  tech_stack: string[];
  timeline?: string;
  results: string[];
  metrics: CaseStudyMetric[];
  diagram_variant?: 'operating-model' | 'service-pipeline';
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ProductFeature {
  name: string;
  description: string;
}

export interface ProductChangelog {
  version: string;
  date: string;
  notes: string[];
}

export interface ProductRoadmap {
  quarter: string;
  goals: string[];
  status: 'completed' | 'in-progress' | 'planned';
}

export interface Product {
  id: string;
  workspace_id: string;
  name: string;
  slug: string;
  logo?: string;
  status: 'Coming Soon' | 'Beta' | 'Live';
  overview: string;
  features: ProductFeature[];
  screenshots: string[];
  documentation_url?: string;
  website_url?: string;
  pricing: Record<string, any>;
  roadmap: ProductRoadmap[];
  changelog?: ProductChangelog[];
  cta_text?: string;
  cta_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  workspace_id: string;
  filename: string;
  url: string;
  file_type: string;
  file_size: number;
  folder: string; // e.g. "/" or "/blogs" or "/resumes"
  tags: string[];
  alt_text?: string;
  caption?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  workspace_id: string;
  user_id?: string;
  user_email: string;
  role: string;
  action: string;
  details?: string;
  changes?: Record<string, any>; // old vs new values
  ip_address?: string;
  user_agent?: string;
  device_info?: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  workspace_id: string;
  email: string;
  subscribed_at: string;
}

export interface ContactMessageReply {
  id: string;
  author: string;
  author_email: string;
  message: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  workspace_id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'spam';
  spam_score?: number;
  replies: ContactMessageReply[];
  created_at: string;
  updated_at: string;
}

export interface SystemSettings {
  id: string;
  workspace_id: string;
  company_name: string;
  logo_url?: string;
  contact_email?: string;
  contact_phone?: string;
  social_links: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
  };
  navigation_header: Array<{ label: string; href: string; roles?: string[]; children?: any[] }>;
  navigation_footer: Array<{ label: string; href: string }>;
  feature_flags: Record<string, boolean>; // e.g. careers: true, products: true
  api_keys: Record<string, string>; // e.g. Resend, OpenAI, Gemini (Hashed/masked)
  smtp_config: Record<string, any>;
  dashboard_widgets: Array<{ id: string; colSpan: number; rowSpan: number; index: number; title: string }>;
  created_at: string;
  updated_at: string;
}

export interface CRMLead {
  id: string;
  workspace_id: string;
  company_name?: string;
  contact_name: string;
  email: string;
  phone?: string;
  source?: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost' | 'Won';
  deal_value: number;
  pipeline_stage: string;
  tasks: Array<{ id: string; text: string; done: boolean; dueDate?: string }>;
  meetings: Array<{ id: string; title: string; date: string; time: string; link?: string }>;
  notes: Array<{ id: string; author: string; text: string; created_at: string }>;
  activity_timeline: Array<{ id: string; text: string; created_at: string }>;
  created_at: string;
  updated_at: string;
}

export interface ClientProjectMilestone {
  name: string;
  status: 'completed' | 'in-progress' | 'planned';
  dueDate: string;
}

export interface ClientPortalAccount {
  id: string;
  workspace_id: string;
  company_name: string;
  primary_email: string;
  projects: Array<{
    id: string;
    name: string;
    status: string;
    progress: number;
    milestones: ClientProjectMilestone[];
    tasks: Array<{ name: string; status: 'todo' | 'in-progress' | 'done' }>;
  }>;
  invoices: Array<{ id: string; number: string; amount: number; status: 'paid' | 'unpaid' | 'overdue'; dueDate: string; url?: string }>;
  deliverables: Array<{ id: string; name: string; file_type: string; url: string; upload_date: string }>;
  tickets: Array<{ id: string; subject: string; status: 'open' | 'in-progress' | 'closed'; priority: 'low' | 'medium' | 'high'; created_at: string }>;
  created_at: string;
  updated_at: string;
}

export interface DBClient {
  jobs: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<Job[]>;
    get: (workspaceId: string, idOrSlug: string) => Promise<Job | null>;
    create: (workspaceId: string, data: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => Promise<Job>;
    update: (workspaceId: string, id: string, data: Partial<Job>) => Promise<Job>;
    delete: (workspaceId: string, id: string) => Promise<boolean>;
  };
  applicants: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<Applicant[]>;
    get: (workspaceId: string, id: string) => Promise<Applicant | null>;
    create: (workspaceId: string, data: Omit<Applicant, 'id' | 'created_at' | 'updated_at' | 'notes' | 'timeline'>) => Promise<Applicant>;
    update: (workspaceId: string, id: string, data: Partial<Applicant>) => Promise<Applicant>;
  };
  blogs: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<Blog[]>;
    get: (workspaceId: string, idOrSlug: string) => Promise<Blog | null>;
    create: (workspaceId: string, data: Omit<Blog, 'id' | 'created_at' | 'updated_at' | 'versions'>) => Promise<Blog>;
    update: (workspaceId: string, id: string, data: Partial<Blog> & { updated_by?: string }) => Promise<Blog>;
    delete: (workspaceId: string, id: string) => Promise<boolean>;
  };
  caseStudies: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<CaseStudy[]>;
    get: (workspaceId: string, idOrSlug: string) => Promise<CaseStudy | null>;
    create: (workspaceId: string, data: Omit<CaseStudy, 'id' | 'created_at' | 'updated_at'>) => Promise<CaseStudy>;
    update: (workspaceId: string, id: string, data: Partial<CaseStudy>) => Promise<CaseStudy>;
    delete: (workspaceId: string, id: string) => Promise<boolean>;
  };
  products: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<Product[]>;
    get: (workspaceId: string, idOrSlug: string) => Promise<Product | null>;
    create: (workspaceId: string, data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => Promise<Product>;
    update: (workspaceId: string, id: string, data: Partial<Product>) => Promise<Product>;
    delete: (workspaceId: string, id: string) => Promise<boolean>;
  };
  media: {
    list: (workspaceId: string, folder?: string) => Promise<MediaAsset[]>;
    get: (workspaceId: string, id: string) => Promise<MediaAsset | null>;
    create: (workspaceId: string, data: Omit<MediaAsset, 'id' | 'created_at' | 'updated_at'>) => Promise<MediaAsset>;
    delete: (workspaceId: string, id: string) => Promise<boolean>;
  };
  auditLogs: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<AuditLog[]>;
    create: (workspaceId: string, data: Omit<AuditLog, 'id' | 'created_at'>) => Promise<AuditLog>;
  };
  subscribers: {
    list: (workspaceId: string) => Promise<NewsletterSubscriber[]>;
    create: (workspaceId: string, email: string) => Promise<NewsletterSubscriber>;
    delete: (workspaceId: string, email: string) => Promise<boolean>;
  };
  contactMessages: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<ContactMessage[]>;
    get: (workspaceId: string, id: string) => Promise<ContactMessage | null>;
    create: (workspaceId: string, data: Omit<ContactMessage, 'id' | 'created_at' | 'updated_at' | 'replies'>) => Promise<ContactMessage>;
    update: (workspaceId: string, id: string, data: Partial<ContactMessage>) => Promise<ContactMessage>;
  };
  settings: {
    get: (workspaceId: string) => Promise<SystemSettings>;
    update: (workspaceId: string, data: Partial<SystemSettings>) => Promise<SystemSettings>;
  };
  crmLeads: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<CRMLead[]>;
    get: (workspaceId: string, id: string) => Promise<CRMLead | null>;
    create: (workspaceId: string, data: Omit<CRMLead, 'id' | 'created_at' | 'updated_at' | 'tasks' | 'meetings' | 'notes' | 'activity_timeline'>) => Promise<CRMLead>;
    update: (workspaceId: string, id: string, data: Partial<CRMLead>) => Promise<CRMLead>;
  };
  clientPortal: {
    list: (workspaceId: string, filters?: Record<string, any>) => Promise<ClientPortalAccount[]>;
    get: (workspaceId: string, idOrEmail: string) => Promise<ClientPortalAccount | null>;
    create: (workspaceId: string, data: Omit<ClientPortalAccount, 'id' | 'created_at' | 'updated_at' | 'projects' | 'invoices' | 'deliverables' | 'tickets'>) => Promise<ClientPortalAccount>;
    update: (workspaceId: string, id: string, data: Partial<ClientPortalAccount>) => Promise<ClientPortalAccount>;
  };
}
