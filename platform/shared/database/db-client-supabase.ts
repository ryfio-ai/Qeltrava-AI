// platform/shared/database/db-client-supabase.ts
// Supabase SDK implementation of DBClient for production

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import { DBClient, Job, Applicant, Blog, CaseStudy, Product, MediaAsset, AuditLog, NewsletterSubscriber, ContactMessage, SystemSettings, CRMLead, ClientPortalAccount } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key-for-build-resolution';

// Initialize client using service role key to bypass RLS policies for administrative actions.
export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ─── UUID Translation Helpers ──────────────────────────────────────────────
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

function resolveIdOrSlug(val: string): { isUuid: boolean; value: string } {
  if (!val) return { isUuid: false, value: '' };
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(val)) {
    return { isUuid: true, value: val };
  }
  // Check if it's a mock ID
  const mockPrefixes = ['job-', 'blog-', 'client-', 'prod-', 'settings-', 'ticket-', 'inv-', 'cs-', 'case-study-', 'member-', 'org-', 'ws-'];
  if (mockPrefixes.some(prefix => val.startsWith(prefix))) {
    return { isUuid: true, value: toUUID(val) };
  }
  return { isUuid: false, value: val };
}

export const supabaseDBClient: DBClient = {
  jobs: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('jobs').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            if (key === 'tech_stack') {
              query = query.contains('tech_stack', [val]);
            } else if (typeof val === 'string') {
              query = query.ilike(key, `%${val}%`);
            } else {
              query = query.eq(key, val);
            }
          }
        });
      }
      const { data, error } = await query.order('posted_date', { ascending: false });
      if (error) throw error;
      return (data || []) as Job[];
    },
    get: async (workspaceId, idOrSlug) => {
      const resolved = resolveIdOrSlug(idOrSlug);
      let query = supabase.from('jobs').select('*').eq('workspace_id', toUUID(workspaceId));
      if (resolved.isUuid) {
        query = query.eq('id', resolved.value);
      } else {
        query = query.eq('slug', resolved.value);
      }
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data as Job | null;
    },
    create: async (workspaceId, data) => {
      const { data: job, error } = await supabase
        .from('jobs')
        .insert([{ ...data, id: (data as any).id ? toUUID((data as any).id) : undefined, workspace_id: toUUID(workspaceId) }])
        .select()
        .single();
      if (error) throw error;
      return job as Job;
    },
    update: async (workspaceId, id, data) => {
      const { data: job, error } = await supabase
        .from('jobs')
        .update(data)
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .select()
        .single();
      if (error) throw error;
      return job as Job;
    },
    delete: async (workspaceId, id) => {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id));
      return !error;
    }
  },

  applicants: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('applicants').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            if (key === 'skills') {
              query = query.contains('skills', [val]);
            } else if (typeof val === 'string') {
              query = query.ilike(key, `%${val}%`);
            } else {
              query = query.eq(key, val);
            }
          }
        });
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as Applicant[];
    },
    get: async (workspaceId, id) => {
      const { data, error } = await supabase
        .from('applicants')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .maybeSingle();
      if (error) throw error;
      return data as Applicant | null;
    },
    create: async (workspaceId, data) => {
      const { data: app, error } = await supabase
        .from('applicants')
        .insert([{
          ...data,
          id: (data as any).id ? toUUID((data as any).id) : undefined,
          workspace_id: toUUID(workspaceId),
          job_id: data.job_id ? toUUID(data.job_id) : null,
          notes: [],
          timeline: [{
            id: `log-${Date.now()}`,
            actor: 'System',
            actor_email: 'system@qeltrava.ai',
            action: 'Application submitted online.',
            created_at: new Date().toISOString()
          }]
        }])
        .select()
        .single();
      if (error) throw error;
      return app as Applicant;
    },
    update: async (workspaceId, id, data) => {
      // First fetch current record to construct timeline log
      const { data: current, error: getErr } = await supabase
        .from('applicants')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .single();
      
      if (getErr) throw getErr;

      const oldStatus = current.status;
      const newStatus = data.status;
      const timelineLogs = [...(current.timeline || [])];

      if (newStatus && newStatus !== oldStatus) {
        timelineLogs.push({
          id: `log-${Date.now()}`,
          actor: 'Recruiter Admin',
          actor_email: 'admin@qeltrava.ai',
          action: `Status changed from ${oldStatus} to ${newStatus}.`,
          created_at: new Date().toISOString()
        });
      }

      const { data: app, error } = await supabase
        .from('applicants')
        .update({ ...data, timeline: timelineLogs })
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .select()
        .single();
      if (error) throw error;
      return app as Applicant;
    }
  },

  blogs: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('blogs').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            if (key === 'tags') {
              query = query.contains('tags', [val]);
            } else if (typeof val === 'string') {
              query = query.ilike(key, `%${val}%`);
            } else {
              query = query.eq(key, val);
            }
          }
        });
      }
      const { data, error } = await query.order('published_at', { ascending: false });
      if (error) throw error;
      return (data || []) as Blog[];
    },
    get: async (workspaceId, idOrSlug) => {
      const resolved = resolveIdOrSlug(idOrSlug);
      let query = supabase.from('blogs').select('*').eq('workspace_id', toUUID(workspaceId));
      if (resolved.isUuid) {
        query = query.eq('id', resolved.value);
      } else {
        query = query.eq('slug', resolved.value);
      }
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data as Blog | null;
    },
    create: async (workspaceId, data) => {
      const { data: blog, error } = await supabase
        .from('blogs')
        .insert([{ ...data, id: (data as any).id ? toUUID((data as any).id) : undefined, workspace_id: toUUID(workspaceId), versions: [] }])
        .select()
        .single();
      if (error) throw error;
      return blog as Blog;
    },
    update: async (workspaceId, id, data) => {
      // Fetch current for versioning
      const { data: current, error: getErr } = await supabase
        .from('blogs')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .single();
      
      if (getErr) throw getErr;

      const versions = [...(current.versions || [])];
      
      if (data.content && data.content !== current.content) {
        versions.unshift({
          version_id: `ver-${Date.now()}`,
          title: current.title,
          summary: current.summary,
          content: current.content,
          updated_by: data.updated_by || 'admin@qeltrava.ai',
          created_at: current.updated_at || current.created_at
        });
      }

      // Remove updated_by since it's not a direct column
      const updateData = { ...data };
      delete updateData.updated_by;

      const { data: blog, error } = await supabase
        .from('blogs')
        .update({ ...updateData, versions })
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .select()
        .single();
      if (error) throw error;
      return blog as Blog;
    },
    delete: async (workspaceId, id) => {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id));
      return !error;
    }
  },

  caseStudies: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('case_studies').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            if (key === 'tech_stack') {
              query = query.contains('tech_stack', [val]);
            } else if (typeof val === 'string') {
              query = query.ilike(key, `%${val}%`);
            } else {
              query = query.eq(key, val);
            }
          }
        });
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as CaseStudy[];
    },
    get: async (workspaceId, idOrSlug) => {
      const resolved = resolveIdOrSlug(idOrSlug);
      let query = supabase.from('case_studies').select('*').eq('workspace_id', toUUID(workspaceId));
      if (resolved.isUuid) {
        query = query.eq('id', resolved.value);
      } else {
        query = query.eq('slug', resolved.value);
      }
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data as CaseStudy | null;
    },
    create: async (workspaceId, data) => {
      const { data: cs, error } = await supabase
        .from('case_studies')
        .insert([{ ...data, id: (data as any).id ? toUUID((data as any).id) : undefined, workspace_id: toUUID(workspaceId) }])
        .select()
        .single();
      if (error) throw error;
      return cs as CaseStudy;
    },
    update: async (workspaceId, id, data) => {
      const { data: cs, error } = await supabase
        .from('case_studies')
        .update(data)
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .select()
        .single();
      if (error) throw error;
      return cs as CaseStudy;
    },
    delete: async (workspaceId, id) => {
      const { error } = await supabase
        .from('case_studies')
        .delete()
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id));
      return !error;
    }
  },

  products: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('products').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            if (typeof val === 'string') {
              query = query.ilike(key, `%${val}%`);
            } else {
              query = query.eq(key, val);
            }
          }
        });
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as Product[];
    },
    get: async (workspaceId, idOrSlug) => {
      const resolved = resolveIdOrSlug(idOrSlug);
      let query = supabase.from('products').select('*').eq('workspace_id', toUUID(workspaceId));
      if (resolved.isUuid) {
        query = query.eq('id', resolved.value);
      } else {
        query = query.eq('slug', resolved.value);
      }
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data as Product | null;
    },
    create: async (workspaceId, data) => {
      const { data: prod, error } = await supabase
        .from('products')
        .insert([{ ...data, id: (data as any).id ? toUUID((data as any).id) : undefined, workspace_id: toUUID(workspaceId) }])
        .select()
        .single();
      if (error) throw error;
      return prod as Product;
    },
    update: async (workspaceId, id, data) => {
      const { data: prod, error } = await supabase
        .from('products')
        .update(data)
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .select()
        .single();
      if (error) throw error;
      return prod as Product;
    },
    delete: async (workspaceId, id) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id));
      return !error;
    }
  },

  media: {
    list: async (workspaceId, folder = '/') => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId))
        .eq('folder', folder);
      if (error) throw error;
      return (data || []) as MediaAsset[];
    },
    get: async (workspaceId, id) => {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .maybeSingle();
      if (error) throw error;
      return data as MediaAsset | null;
    },
    create: async (workspaceId, data) => {
      const { data: asset, error } = await supabase
        .from('media')
        .insert([{ ...data, id: (data as any).id ? toUUID((data as any).id) : undefined, workspace_id: toUUID(workspaceId) }])
        .select()
        .single();
      if (error) throw error;
      return asset as MediaAsset;
    },
    delete: async (workspaceId, id) => {
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id));
      return !error;
    }
  },

  auditLogs: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('audit_logs').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            query = query.eq(key, val);
          }
        });
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as AuditLog[];
    },
    create: async (workspaceId, data) => {
      const { data: log, error } = await supabase
        .from('audit_logs')
        .insert([{ ...data, id: (data as any).id ? toUUID((data as any).id) : undefined, workspace_id: toUUID(workspaceId) }])
        .select()
        .single();
      if (error) throw error;
      return log as AuditLog;
    }
  },

  subscribers: {
    list: async (workspaceId) => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId));
      if (error) throw error;
      return (data || []) as NewsletterSubscriber[];
    },
    create: async (workspaceId, email) => {
      const { data: sub, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ workspace_id: toUUID(workspaceId), email }])
        .select()
        .single();
      if (error) throw error;
      return sub as NewsletterSubscriber;
    },
    delete: async (workspaceId, email) => {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('workspace_id', toUUID(workspaceId))
        .eq('email', email);
      return !error;
    }
  },

  contactMessages: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('contact_messages').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            query = query.eq(key, val);
          }
        });
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ContactMessage[];
    },
    get: async (workspaceId, id) => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .maybeSingle();
      if (error) throw error;
      return data as ContactMessage | null;
    },
    create: async (workspaceId, data) => {
      const { data: msg, error } = await supabase
        .from('contact_messages')
        .insert([{ ...data, id: (data as any).id ? toUUID((data as any).id) : undefined, workspace_id: toUUID(workspaceId), replies: [] }])
        .select()
        .single();
      if (error) throw error;
      return msg as ContactMessage;
    },
    update: async (workspaceId, id, data) => {
      const { data: msg, error } = await supabase
        .from('contact_messages')
        .update(data)
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .select()
        .single();
      if (error) throw error;
      return msg as ContactMessage;
    }
  },

  settings: {
    get: async (workspaceId) => {
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId))
        .maybeSingle();
      
      if (error) throw error;
      
      if (!data) {
        // Create baseline settings if missing
        const { data: newSettings, error: createErr } = await supabase
          .from('system_settings')
          .insert([{
            workspace_id: toUUID(workspaceId),
            company_name: 'Qeltrava AI',
            social_links: {},
            navigation_header: [],
            navigation_footer: [],
            feature_flags: { careers: true, blogs: true },
            api_keys: {},
            smtp_config: {},
            dashboard_widgets: []
          }])
          .select()
          .single();
        if (createErr) throw createErr;
        return newSettings as SystemSettings;
      }
      return data as SystemSettings;
    },
    update: async (workspaceId, data) => {
      const { data: settings, error } = await supabase
        .from('system_settings')
        .update(data)
        .eq('workspace_id', toUUID(workspaceId))
        .select()
        .single();
      if (error) throw error;
      return settings as SystemSettings;
    }
  },

  crmLeads: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('crm_leads').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            if (typeof val === 'string') {
              query = query.ilike(key, `%${val}%`);
            } else {
              query = query.eq(key, val);
            }
          }
        });
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as CRMLead[];
    },
    get: async (workspaceId, id) => {
      const { data, error } = await supabase
        .from('crm_leads')
        .select('*')
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .maybeSingle();
      if (error) throw error;
      return data as CRMLead | null;
    },
    create: async (workspaceId, data) => {
      const { data: lead, error } = await supabase
        .from('crm_leads')
        .insert([{
          ...data,
          id: (data as any).id ? toUUID((data as any).id) : undefined,
          workspace_id: toUUID(workspaceId),
          tasks: [],
          meetings: [],
          notes: [],
          activity_timeline: [{
            id: `act-${Date.now()}`,
            text: 'Lead created in pipeline.',
            created_at: new Date().toISOString()
          }]
        }])
        .select()
        .single();
      if (error) throw error;
      return lead as CRMLead;
    },
    update: async (workspaceId, id, data) => {
      const { data: lead, error } = await supabase
        .from('crm_leads')
        .update(data)
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .select()
        .single();
      if (error) throw error;
      return lead as CRMLead;
    }
  },

  clientPortal: {
    list: async (workspaceId, filters) => {
      let query = supabase.from('client_portal').select('*').eq('workspace_id', toUUID(workspaceId));
      if (filters) {
        Object.keys(filters).forEach(key => {
          const val = filters[key];
          if (val !== undefined && val !== '') {
            query = query.eq(key, val);
          }
        });
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return (data || []) as ClientPortalAccount[];
    },
    get: async (workspaceId, idOrEmail) => {
      const isEmail = idOrEmail.includes('@');
      let query = supabase.from('client_portal').select('*').eq('workspace_id', toUUID(workspaceId));
      if (isEmail) {
        query = query.eq('primary_email', idOrEmail.toLowerCase());
      } else {
        query = query.eq('id', toUUID(idOrEmail));
      }
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data as ClientPortalAccount | null;
    },
    create: async (workspaceId, data) => {
      const { data: client, error } = await supabase
        .from('client_portal')
        .insert([{
          ...data,
          id: (data as any).id ? toUUID((data as any).id) : undefined,
          workspace_id: toUUID(workspaceId),
          projects: (data as any).projects || [],
          invoices: (data as any).invoices || [],
          deliverables: (data as any).deliverables || [],
          tickets: (data as any).tickets || []
        }])
        .select()
        .single();
      if (error) throw error;
      return client as ClientPortalAccount;
    },
    update: async (workspaceId, id, data) => {
      const { data: client, error } = await supabase
        .from('client_portal')
        .update(data)
        .eq('workspace_id', toUUID(workspaceId))
        .eq('id', toUUID(id))
        .select()
        .single();
      if (error) throw error;
      return client as ClientPortalAccount;
    }
  }
};
