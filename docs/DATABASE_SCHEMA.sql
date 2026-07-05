-- Qeltrava OS v4.0 Database Schema
-- Production Target: Supabase / PostgreSQL 15+

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Organizations
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Workspaces (Tenant partitions)
CREATE TABLE IF NOT EXISTS workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    domain VARCHAR(255),
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_workspaces_org ON workspaces(organization_id);

-- 3. Members & Roles (RBAC mapping)
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID, -- Links to supabase auth.users
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'Viewer', -- Super Admin, Admin, HR, Developer, Marketing, etc.
    status VARCHAR(50) NOT NULL DEFAULT 'active', -- active, suspended, pending
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(workspace_id, email)
);
CREATE INDEX IF NOT EXISTS idx_members_workspace ON members(workspace_id);
CREATE INDEX IF NOT EXISTS idx_members_user ON members(user_id);

-- 4. Jobs & Careers
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    employment_type VARCHAR(100) NOT NULL, -- Full-Time, Internship, Contract, etc.
    location VARCHAR(255) NOT NULL,
    salary VARCHAR(100),
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    open_positions INTEGER DEFAULT 1,
    description TEXT NOT NULL,
    responsibilities TEXT[] DEFAULT '{}',
    requirements TEXT[] DEFAULT '{}',
    benefits TEXT[] DEFAULT '{}',
    hiring_process TEXT[] DEFAULT '{}',
    working_model VARCHAR(50) NOT NULL DEFAULT 'Remote', -- Remote, Hybrid, On-site
    team_info TEXT,
    about_company TEXT,
    tech_stack VARCHAR(100)[] DEFAULT '{}',
    status VARCHAR(50) NOT NULL DEFAULT 'Draft', -- Draft, Published, Archived, Scheduled
    is_featured BOOLEAN DEFAULT FALSE,
    publish_at TIMESTAMP WITH TIME ZONE,
    created_by UUID,
    updated_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(workspace_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_jobs_workspace_slug ON jobs(workspace_id, slug);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

-- 5. Applicants (ATS Pipeline)
CREATE TABLE IF NOT EXISTS applicants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    college VARCHAR(255),
    degree VARCHAR(255),
    year VARCHAR(10),
    skills VARCHAR(100)[] DEFAULT '{}',
    linkedin VARCHAR(255),
    github VARCHAR(255),
    portfolio VARCHAR(255),
    resume_url TEXT NOT NULL,
    cover_letter TEXT,
    availability VARCHAR(255),
    preferred_location VARCHAR(255),
    expected_stipend VARCHAR(100),
    experience VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'Applied', -- Applied, Screening, Shortlisted, Interview, Offer, Rejected, Hired
    rating INTEGER CHECK (rating >= 0 AND rating <= 5),
    notes JSONB DEFAULT '[]'::jsonb, -- Timestamped recruiter notes
    timeline JSONB DEFAULT '[]'::jsonb, -- History logs of pipeline events
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_applicants_workspace ON applicants(workspace_id);
CREATE INDEX IF NOT EXISTS idx_applicants_job ON applicants(job_id);
CREATE INDEX IF NOT EXISTS idx_applicants_status ON applicants(status);

-- 6. Website CMS Articles & Pages
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    summary TEXT,
    content TEXT NOT NULL, -- Markdown/HTML content
    category VARCHAR(100) NOT NULL,
    tags VARCHAR(100)[] DEFAULT '{}',
    author VARCHAR(100) NOT NULL,
    read_time VARCHAR(50),
    featured_image TEXT,
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    versions JSONB DEFAULT '[]'::jsonb, -- Version revision histories
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(workspace_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_blogs_workspace_slug ON blogs(workspace_id, slug);
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);

-- 7. Case Studies
CREATE TABLE IF NOT EXISTS case_studies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    client VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    problem TEXT NOT NULL,
    solution TEXT NOT NULL,
    architecture TEXT,
    tech_stack VARCHAR(100)[] DEFAULT '{}',
    timeline VARCHAR(100),
    results TEXT[] DEFAULT '{}',
    metrics JSONB DEFAULT '[]'::jsonb,
    diagram_variant VARCHAR(50) DEFAULT 'operating-model',
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(workspace_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_case_studies_workspace_slug ON case_studies(workspace_id, slug);

-- 8. Products (Modliq)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    logo TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'Beta', -- Coming Soon, Beta, Live
    overview TEXT NOT NULL,
    features JSONB DEFAULT '[]'::jsonb,
    screenshots TEXT[] DEFAULT '{}',
    documentation_url VARCHAR(255),
    website_url VARCHAR(255),
    pricing JSONB DEFAULT '{}'::jsonb,
    roadmap JSONB DEFAULT '[]'::jsonb,
    cta_text VARCHAR(100),
    cta_url VARCHAR(255),
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(workspace_id, slug)
);
CREATE INDEX IF NOT EXISTS idx_products_workspace_slug ON products(workspace_id, slug);

-- 9. Media Assets Library
CREATE TABLE IF NOT EXISTS media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size INTEGER NOT NULL,
    folder VARCHAR(255) DEFAULT '/',
    tags VARCHAR(100)[] DEFAULT '{}',
    alt_text VARCHAR(255),
    caption VARCHAR(255),
    versions JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_media_workspace ON media(workspace_id);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media(workspace_id, folder);

-- 10. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    user_id UUID,
    user_email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    action VARCHAR(255) NOT NULL, -- Created Job, Updated Blog, etc.
    details TEXT,
    changes JSONB, -- stores { old_value: ..., new_value: ... }
    ip_address VARCHAR(45),
    user_agent TEXT,
    device_info VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_workspace ON audit_logs(workspace_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

-- 11. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(workspace_id, email)
);

-- 12. Contact Messages & Submissions
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unread', -- unread, read, replied, spam
    spam_score NUMERIC(5,2) DEFAULT 0.0,
    replies JSONB DEFAULT '[]'::jsonb, -- records admin response details
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_contact_messages_workspace ON contact_messages(workspace_id);

-- 13. System Settings & Configuration (Unified module settings)
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE UNIQUE,
    company_name VARCHAR(255) DEFAULT 'Qeltrava AI',
    logo_url TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    social_links JSONB DEFAULT '{}'::jsonb, -- linkedin, github, twitter, etc.
    navigation_header JSONB DEFAULT '[]'::jsonb,
    navigation_footer JSONB DEFAULT '[]'::jsonb,
    feature_flags JSONB DEFAULT '{}'::jsonb, -- careers: true, blogs: true, etc.
    api_keys JSONB DEFAULT '{}'::jsonb, -- Resend, OpenAI keys (Encrypted)
    smtp_config JSONB DEFAULT '{}'::jsonb,
    dashboard_widgets JSONB DEFAULT '[]'::jsonb, -- Widget arrangements configuration
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. CRM Leads (HubSpot-grade pipeline)
CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    company_name VARCHAR(255),
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    source VARCHAR(100), -- contact_form, consulting_call, manual
    status VARCHAR(50) NOT NULL DEFAULT 'New', -- New, Contacted, Qualified, Lost, Won
    deal_value NUMERIC(12,2) DEFAULT 0.00,
    pipeline_stage VARCHAR(100) NOT NULL DEFAULT 'Lead Intake',
    tasks JSONB DEFAULT '[]'::jsonb,
    meetings JSONB DEFAULT '[]'::jsonb,
    notes JSONB DEFAULT '[]'::jsonb,
    activity_timeline JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_crm_leads_workspace ON crm_leads(workspace_id);

-- 15. Clients (Client Portal Dashboard)
CREATE TABLE IF NOT EXISTS client_portal (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    primary_email VARCHAR(255) NOT NULL UNIQUE,
    projects JSONB DEFAULT '[]'::jsonb, -- Active project milestones, tasks, logs
    invoices JSONB DEFAULT '[]'::jsonb, -- Billing invoice links
    deliverables JSONB DEFAULT '[]'::jsonb, -- File asset links
    tickets JSONB DEFAULT '[]'::jsonb, -- Client support tickets list
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_client_portal_workspace ON client_portal(workspace_id);

-- Trigger to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update trigger to relevant tables
CREATE TRIGGER update_organizations_modtime BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workspaces_modtime BEFORE UPDATE ON workspaces FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_modtime BEFORE UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_modtime BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_applicants_modtime BEFORE UPDATE ON applicants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_modtime BEFORE UPDATE ON blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_case_studies_modtime BEFORE UPDATE ON case_studies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_modtime BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_modtime BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_system_settings_modtime BEFORE UPDATE ON system_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_crm_leads_modtime BEFORE UPDATE ON crm_leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_portal_modtime BEFORE UPDATE ON client_portal FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
