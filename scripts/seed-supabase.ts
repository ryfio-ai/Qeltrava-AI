// scripts/seed-supabase.ts
// Database seeding tool to populate live Supabase instance with mock data

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// 1. Deterministic UUID Generator from mock text IDs
function toUUID(str: string): string {
  if (!str) return '';
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(str)) return str;

  const hash = crypto.createHash('md5').update(str).digest('hex');
  return [
    hash.substring(0, 8),
    hash.substring(8, 12),
    hash.substring(12, 16),
    hash.substring(16, 20),
    hash.substring(20, 32)
  ].join('-');
}

// 2. Manually parse .env.local to load environment variables
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const parts = line.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      if (key) process.env[key] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const dbFilePath = path.join(process.cwd(), 'platform/shared/database/db-local.json');

async function seed() {
  console.log('Reading local JSON database from:', dbFilePath);
  if (!fs.existsSync(dbFilePath)) {
    console.error('Error: platform/shared/database/db-local.json does not exist. Run the dev server or local check to generate it.');
    process.exit(1);
  }

  const dbData = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
  console.log('Successfully loaded local JSON database. Beginning Supabase seed...');

  // Seeding Organizations
  if (dbData.organizations && dbData.organizations.length > 0) {
    console.log(`Seeding ${dbData.organizations.length} organizations...`);
    const mapped = dbData.organizations.map((org: any) => ({
      ...org,
      id: toUUID(org.id)
    }));
    const { error } = await supabase.from('organizations').upsert(mapped);
    if (error) console.error('Error seeding organizations:', error.message);
  }

  // Seeding Workspaces
  if (dbData.workspaces && dbData.workspaces.length > 0) {
    console.log(`Seeding ${dbData.workspaces.length} workspaces...`);
    const mapped = dbData.workspaces.map((ws: any) => ({
      ...ws,
      id: toUUID(ws.id),
      organization_id: toUUID(ws.organization_id)
    }));
    const { error } = await supabase.from('workspaces').upsert(mapped);
    if (error) console.error('Error seeding workspaces:', error.message);
  }

  // Seeding Members
  if (dbData.members && dbData.members.length > 0) {
    console.log(`Seeding ${dbData.members.length} members...`);
    const mapped = dbData.members.map((mem: any) => ({
      ...mem,
      id: toUUID(mem.id),
      workspace_id: toUUID(mem.workspace_id)
    }));
    const { error } = await supabase.from('members').upsert(mapped);
    if (error) console.error('Error seeding members:', error.message);
  }

  // Seeding Jobs
  if (dbData.jobs && dbData.jobs.length > 0) {
    console.log(`Seeding ${dbData.jobs.length} jobs...`);
    const mapped = dbData.jobs.map((job: any) => ({
      ...job,
      id: toUUID(job.id),
      workspace_id: toUUID(job.workspace_id)
    }));
    const { error } = await supabase.from('jobs').upsert(mapped);
    if (error) console.error('Error seeding jobs:', error.message);
  }

  // Seeding Applicants
  if (dbData.applicants && dbData.applicants.length > 0) {
    console.log(`Seeding ${dbData.applicants.length} applicants...`);
    const mapped = dbData.applicants.map((app: any) => ({
      ...app,
      id: toUUID(app.id),
      workspace_id: toUUID(app.workspace_id),
      job_id: app.job_id ? toUUID(app.job_id) : null
    }));
    const { error } = await supabase.from('applicants').upsert(mapped);
    if (error) console.error('Error seeding applicants:', error.message);
  }

  // Seeding Blogs
  if (dbData.blogs && dbData.blogs.length > 0) {
    console.log(`Seeding ${dbData.blogs.length} blogs...`);
    const mapped = dbData.blogs.map((blog: any) => ({
      ...blog,
      id: toUUID(blog.id),
      workspace_id: toUUID(blog.workspace_id)
    }));
    const { error } = await supabase.from('blogs').upsert(mapped);
    if (error) console.error('Error seeding blogs:', error.message);
  }

  // Seeding Case Studies
  if (dbData.caseStudies && dbData.caseStudies.length > 0) {
    console.log(`Seeding ${dbData.caseStudies.length} case studies...`);
    const mapped = dbData.caseStudies.map((cs: any) => ({
      ...cs,
      id: toUUID(cs.id),
      workspace_id: toUUID(cs.workspace_id)
    }));
    const { error } = await supabase.from('case_studies').upsert(mapped);
    if (error) console.error('Error seeding case studies:', error.message);
  }

  // Seeding Products
  if (dbData.products && dbData.products.length > 0) {
    console.log(`Seeding ${dbData.products.length} products...`);
    const mapped = dbData.products.map((prod: any) => ({
      ...prod,
      id: toUUID(prod.id),
      workspace_id: toUUID(prod.workspace_id)
    }));
    const { error } = await supabase.from('products').upsert(mapped);
    if (error) console.error('Error seeding products:', error.message);
  }

  // Seeding Media
  if (dbData.media && dbData.media.length > 0) {
    console.log(`Seeding ${dbData.media.length} media assets...`);
    const mapped = dbData.media.map((med: any) => ({
      ...med,
      id: toUUID(med.id),
      workspace_id: toUUID(med.workspace_id)
    }));
    const { error } = await supabase.from('media').upsert(mapped);
    if (error) console.error('Error seeding media assets:', error.message);
  }

  // Seeding Newsletter Subscribers
  if (dbData.subscribers && dbData.subscribers.length > 0) {
    console.log(`Seeding ${dbData.subscribers.length} subscribers...`);
    const mapped = dbData.subscribers.map((sub: any) => ({
      ...sub,
      id: toUUID(sub.id),
      workspace_id: toUUID(sub.workspace_id)
    }));
    const { error } = await supabase.from('newsletter_subscribers').upsert(mapped);
    if (error) console.error('Error seeding subscribers:', error.message);
  }

  // Seeding Contact Messages
  if (dbData.contactMessages && dbData.contactMessages.length > 0) {
    console.log(`Seeding ${dbData.contactMessages.length} contact messages...`);
    const mapped = dbData.contactMessages.map((msg: any) => ({
      ...msg,
      id: toUUID(msg.id),
      workspace_id: toUUID(msg.workspace_id)
    }));
    const { error } = await supabase.from('contact_messages').upsert(mapped);
    if (error) console.error('Error seeding contact messages:', error.message);
  }

  // Seeding System Settings
  if (dbData.settings && dbData.settings.length > 0) {
    console.log(`Seeding ${dbData.settings.length} system settings...`);
    const mapped = dbData.settings.map((sett: any) => ({
      ...sett,
      id: toUUID(sett.id),
      workspace_id: toUUID(sett.workspace_id)
    }));
    const { error } = await supabase.from('system_settings').upsert(mapped);
    if (error) console.error('Error seeding system settings:', error.message);
  }

  // Seeding CRM Leads
  if (dbData.crmLeads && dbData.crmLeads.length > 0) {
    console.log(`Seeding ${dbData.crmLeads.length} CRM leads...`);
    const mapped = dbData.crmLeads.map((lead: any) => ({
      ...lead,
      id: toUUID(lead.id),
      workspace_id: toUUID(lead.workspace_id)
    }));
    const { error } = await supabase.from('crm_leads').upsert(mapped);
    if (error) console.error('Error seeding CRM leads:', error.message);
  }

  // Seeding Client Portal Accounts
  if (dbData.clientPortal && dbData.clientPortal.length > 0) {
    console.log(`Seeding ${dbData.clientPortal.length} client portal accounts...`);
    const mapped = dbData.clientPortal.map((client: any) => ({
      ...client,
      id: toUUID(client.id),
      workspace_id: toUUID(client.workspace_id)
    }));
    const { error } = await supabase.from('client_portal').upsert(mapped);
    if (error) console.error('Error seeding client portal accounts:', error.message);
  }

  console.log('🎉 Seeding successfully completed!');
}

seed().catch(err => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
