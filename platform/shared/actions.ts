// platform/shared/actions.ts
// Server Actions for Qeltrava OS v4.0

'use server';

import { cookies, headers } from 'next/headers';
import { db } from './database/db';
import { decryptSession, ADMIN_COOKIE_NAME, checkPermission, Resource, Action } from '@/platform/auth';
import { Job, Applicant, Blog, CaseStudy, Product, MediaAsset, AuditLog, NewsletterSubscriber, ContactMessage, SystemSettings, CRMLead, ClientPortalAccount } from './database/types';
import fs from 'fs';
import path from 'path';

// Helper to get active session
async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;
  return decryptSession(sessionCookie);
}

// Helper to check user permission and log actions
async function checkAuth(resource: Resource, action: Action, actionDesc: string) {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized session.');
  }
  
  const hasAccess = checkPermission(session.role, resource, action);
  if (!hasAccess) {
    throw new Error(`Forbidden: ${session.role} cannot perform ${action} on ${resource}.`);
  }

  // Log action in audit trails
  const headersList = await headers();
  const ipAddress = headersList.get('x-forwarded-for') || '127.0.0.1';
  const userAgent = headersList.get('user-agent') || 'Unknown Browser';

  await db.auditLogs.create(session.workspaceId, {
    workspace_id: session.workspaceId,
    user_id: session.userId,
    user_email: session.email,
    role: session.role,
    action: actionDesc,
    ip_address: ipAddress,
    user_agent: userAgent,
    device_info: userAgent.substring(0, 100)
  });

  return session;
}

// ─── Jobs Module Actions ──────────────────────────────────────────────────
export async function getJobs(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.jobs.list(wsId, filters);
}

export async function createJob(data: Omit<Job, 'id' | 'created_at' | 'updated_at'>) {
  const session = await checkAuth('jobs', 'create', `Created Job: ${data.title}`);
  return db.jobs.create(session.workspaceId, data);
}

export async function updateJob(id: string, data: Partial<Job>) {
  const session = await checkAuth('jobs', 'update', `Updated Job ID: ${id}`);
  return db.jobs.update(session.workspaceId, id, data);
}

export async function deleteJob(id: string) {
  const session = await checkAuth('jobs', 'delete', `Deleted Job ID: ${id}`);
  return db.jobs.delete(session.workspaceId, id);
}

// ─── Applicants & ATS Actions ──────────────────────────────────────────────
export async function getApplicants(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.applicants.list(wsId, filters);
}

export async function submitApplication(data: any) {
  // Public action - no session required
  const wsId = 'ws-qeltrava-ai';
  return db.applicants.create(wsId, data);
}

export async function updateApplicant(id: string, data: Partial<Applicant>) {
  const session = await checkAuth('applicants', 'update', `Updated Applicant status/notes for: ${id}`);
  return db.applicants.update(session.workspaceId, id, data);
}

// ─── Blogs CMS Actions ────────────────────────────────────────────────────
export async function getBlogs(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.blogs.list(wsId, filters);
}

export async function createBlog(data: Omit<Blog, 'id' | 'created_at' | 'updated_at' | 'versions'>) {
  const session = await checkAuth('blogs', 'create', `Created Blog Post: ${data.title}`);
  return db.blogs.create(session.workspaceId, data);
}

export async function updateBlog(id: string, data: Partial<Blog>) {
  const session = await checkAuth('blogs', 'update', `Updated Blog Post ID: ${id}`);
  return db.blogs.update(session.workspaceId, id, {
    ...data,
    updated_by: session.email
  });
}

export async function deleteBlog(id: string) {
  const session = await checkAuth('blogs', 'delete', `Deleted Blog Post ID: ${id}`);
  return db.blogs.delete(session.workspaceId, id);
}

// ─── Case Studies Actions ──────────────────────────────────────────────────
export async function getCaseStudies(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.caseStudies.list(wsId, filters);
}

export async function createCaseStudy(data: Omit<CaseStudy, 'id' | 'created_at' | 'updated_at'>) {
  const session = await checkAuth('caseStudies', 'create', `Created Case Study: ${data.title}`);
  return db.caseStudies.create(session.workspaceId, data);
}

export async function updateCaseStudy(id: string, data: Partial<CaseStudy>) {
  const session = await checkAuth('caseStudies', 'update', `Updated Case Study ID: ${id}`);
  return db.caseStudies.update(session.workspaceId, id, data);
}

export async function deleteCaseStudy(id: string) {
  const session = await checkAuth('caseStudies', 'delete', `Deleted Case Study ID: ${id}`);
  return db.caseStudies.delete(session.workspaceId, id);
}

// ─── Products (Modliq) Actions ─────────────────────────────────────────────
export async function getProducts(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.products.list(wsId, filters);
}

export async function createProduct(data: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
  const session = await checkAuth('products', 'create', `Created Product Specs: ${data.name}`);
  return db.products.create(session.workspaceId, data);
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const session = await checkAuth('products', 'update', `Updated Product Specs ID: ${id}`);
  return db.products.update(session.workspaceId, id, data);
}

export async function deleteProduct(id: string) {
  const session = await checkAuth('products', 'delete', `Deleted Product Specs ID: ${id}`);
  return db.products.delete(session.workspaceId, id);
}

// ─── Media Library & Upload Actions ──────────────────────────────────────────
export async function getMediaFiles(folder?: string) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.media.list(wsId, folder);
}

export async function deleteMediaFile(id: string) {
  const session = await checkAuth('media', 'delete', `Deleted Media File ID: ${id}`);
  return db.media.delete(session.workspaceId, id);
}

export async function uploadMediaServer(fileName: string, mimeType: string, fileSize: number, base64Data: string, folder = '/') {
  const session = await checkAuth('media', 'create', `Uploaded File: ${fileName}`);
  
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const fileExt = path.extname(fileName);
  const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9]/g, '_')}${fileExt}`;
  const filePath = path.join(uploadDir, safeName);
  const buffer = Buffer.from(base64Data, 'base64');
  
  fs.writeFileSync(filePath, buffer);
  const publicUrl = `/uploads/${safeName}`;

  return db.media.create(session.workspaceId, {
    workspace_id: session.workspaceId,
    filename: fileName,
    url: publicUrl,
    file_type: mimeType,
    file_size: fileSize,
    folder: folder,
    tags: []
  });
}

// ─── System Settings Actions ───────────────────────────────────────────────
export async function getSystemSettings() {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.settings.get(wsId);
}

export async function updateSystemSettings(data: Partial<SystemSettings>) {
  const session = await checkAuth('settings', 'update', 'Updated Site & System Settings');
  return db.settings.update(session.workspaceId, data);
}

// ─── Audit Trails & Logs Actions ─────────────────────────────────────────────
export async function getAuditLogs(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.auditLogs.list(wsId, filters);
}

// ─── CRM Leads Actions ─────────────────────────────────────────────────────
export async function getCrmLeads(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.crmLeads.list(wsId, filters);
}

export async function createCrmLead(data: Omit<CRMLead, 'id' | 'created_at' | 'updated_at' | 'tasks' | 'meetings' | 'notes' | 'activity_timeline'>) {
  const session = await checkAuth('crm', 'create', `Created Sales Lead: ${data.contact_name}`);
  return db.crmLeads.create(session.workspaceId, data);
}

export async function updateCrmLead(id: string, data: Partial<CRMLead>) {
  const session = await checkAuth('crm', 'update', `Updated CRM Lead ID: ${id}`);
  return db.crmLeads.update(session.workspaceId, id, data);
}

// ─── Client Portal Actions ──────────────────────────────────────────────────
export async function getClientPortalAccounts(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.clientPortal.list(wsId, filters);
}

export async function createClientPortalAccount(data: Omit<ClientPortalAccount, 'id' | 'created_at' | 'updated_at' | 'projects' | 'invoices' | 'deliverables' | 'tickets'>) {
  const session = await checkAuth('clients', 'create', `Created Client Account: ${data.company_name}`);
  return db.clientPortal.create(session.workspaceId, data);
}

export async function updateClientPortalAccount(id: string, data: Partial<ClientPortalAccount>) {
  const session = await checkAuth('clients', 'update', `Updated Client Account ID: ${id}`);
  return db.clientPortal.update(session.workspaceId, id, data);
}

// ─── Contact Messages Actions ──────────────────────────────────────────────
export async function getContactMessages(filters?: Record<string, any>) {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.contactMessages.list(wsId, filters);
}

export async function submitContactForm(data: any) {
  // Public form submission
  const wsId = 'ws-qeltrava-ai';
  return db.contactMessages.create(wsId, data);
}

export async function updateContactMessage(id: string, data: Partial<ContactMessage>) {
  const session = await checkAuth('settings', 'update', `Updated Contact message ID: ${id}`);
  return db.contactMessages.update(session.workspaceId, id, data);
}

// ─── Newsletter Subscribers Actions ──────────────────────────────────────────
export async function getNewsletterSubscribers() {
  const session = await getSession();
  const wsId = session?.workspaceId || 'ws-qeltrava-ai';
  return db.subscribers.list(wsId);
}

export async function submitNewsletter(email: string) {
  // Public form submission
  const wsId = 'ws-qeltrava-ai';
  return db.subscribers.create(wsId, email);
}

// ─── Backup & Restore ZIP/JSON Actions ───────────────────────────────────────
export async function getBackupExport() {
  const session = await checkAuth('settings', 'all', 'Exported full database backup');
  const wsId = session.workspaceId;

  // Compile JSON data package
  const data = {
    jobs: await db.jobs.list(wsId),
    applicants: await db.applicants.list(wsId),
    blogs: await db.blogs.list(wsId),
    caseStudies: await db.caseStudies.list(wsId),
    products: await db.products.list(wsId),
    media: await db.media.list(wsId),
    auditLogs: await db.auditLogs.list(wsId),
    subscribers: await db.subscribers.list(wsId),
    contactMessages: await db.contactMessages.list(wsId),
    crmLeads: await db.crmLeads.list(wsId),
    clientPortal: await db.clientPortal.list(wsId)
  };

  return JSON.stringify(data, null, 2);
}

export async function restoreBackupImport(jsonString: string) {
  const session = await checkAuth('settings', 'all', 'Imported database restore backup');
  const wsId = session.workspaceId;
  
  try {
    const data = JSON.parse(jsonString);
    // Overwrite database fields for local if applicable (we write directly to db file)
    // For local JSON fallback, this is easy.
    const isLocal = !process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (isLocal) {
      const dbFile = path.join(process.cwd(), 'platform/shared/database/db-local.json');
      if (fs.existsSync(dbFile)) {
        const currentData = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
        // Merge or replace
        const merged = {
          ...currentData,
          jobs: [...(data.jobs || []), ...currentData.jobs.filter((j: any) => j.workspace_id !== wsId)],
          applicants: [...(data.applicants || []), ...currentData.applicants.filter((j: any) => j.workspace_id !== wsId)],
          blogs: [...(data.blogs || []), ...currentData.blogs.filter((j: any) => j.workspace_id !== wsId)],
          caseStudies: [...(data.caseStudies || []), ...currentData.caseStudies.filter((j: any) => j.workspace_id !== wsId)],
          products: [...(data.products || []), ...currentData.products.filter((j: any) => j.workspace_id !== wsId)],
          media: [...(data.media || []), ...currentData.media.filter((j: any) => j.workspace_id !== wsId)],
          subscribers: [...(data.subscribers || []), ...currentData.subscribers.filter((j: any) => j.workspace_id !== wsId)],
          contactMessages: [...(data.contactMessages || []), ...currentData.contactMessages.filter((j: any) => j.workspace_id !== wsId)],
          crmLeads: [...(data.crmLeads || []), ...currentData.crmLeads.filter((j: any) => j.workspace_id !== wsId)],
          clientPortal: [...(data.clientPortal || []), ...currentData.clientPortal.filter((j: any) => j.workspace_id !== wsId)]
        };
        fs.writeFileSync(dbFile, JSON.stringify(merged, null, 2), 'utf-8');
        return { success: true };
      }
    }
    
    // Supabase restore would require looping insert actions
    return { success: false, message: 'Restore from actions currently supported only for local DB. For Supabase, use pg_restore.' };
  } catch (err) {
    throw new Error('Invalid JSON upload.');
  }
}
