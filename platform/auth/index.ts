// platform/auth/index.ts
// Secure Multi-Tenant Authentication & Role-Based Access Control (RBAC)

import crypto from 'crypto';
import { db } from '../shared/database/db';

// 1. Password Hashing Utilities (Web Crypto / Node native)
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// 2. Session Cookies Helpers
export const ADMIN_COOKIE_NAME = 'qeltrava_admin_session';

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  workspaceId: string;
  createdAt: number;
}

export function encryptSession(payload: SessionPayload): string {
  // Simple tamper-proof session serialization using a signature
  const raw = JSON.stringify(payload);
  const signature = crypto
    .createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'qeltrava-default-secret-2026')
    .update(raw)
    .digest('hex');
  return `${Buffer.from(raw).toString('base64')}.${signature}`;
}

export function decryptSession(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const raw = Buffer.from(parts[0], 'base64').toString('utf-8');
    const signature = parts[1];

    const expectedSignature = crypto
      .createHmac('sha256', process.env.ADMIN_SESSION_SECRET || 'qeltrava-default-secret-2026')
      .update(raw)
      .digest('hex');

    if (signature !== expectedSignature) return null;
    return JSON.parse(raw) as SessionPayload;
  } catch (err) {
    return null;
  }
}

// 3. RBAC Matrix Configurations
export type PlatformRole = 
  | 'Super Admin'
  | 'Admin'
  | 'HR'
  | 'Recruiter'
  | 'Developer'
  | 'Marketing'
  | 'Content Editor'
  | 'Sales'
  | 'Support'
  | 'Finance'
  | 'Viewer';

export type Resource = 
  | 'jobs'
  | 'applicants'
  | 'blogs'
  | 'caseStudies'
  | 'products'
  | 'media'
  | 'analytics'
  | 'settings'
  | 'crm'
  | 'clients';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'all';

// RBAC Permissions Mapping
// Record<PlatformRole, Record<Resource, Action[]>>
export const rbacMatrix: Record<PlatformRole, Record<Resource, Action[]>> = {
  'Super Admin': {
    jobs: ['create', 'read', 'update', 'delete', 'all'],
    applicants: ['create', 'read', 'update', 'delete', 'all'],
    blogs: ['create', 'read', 'update', 'delete', 'all'],
    caseStudies: ['create', 'read', 'update', 'delete', 'all'],
    products: ['create', 'read', 'update', 'delete', 'all'],
    media: ['create', 'read', 'update', 'delete', 'all'],
    analytics: ['create', 'read', 'update', 'delete', 'all'],
    settings: ['create', 'read', 'update', 'delete', 'all'],
    crm: ['create', 'read', 'update', 'delete', 'all'],
    clients: ['create', 'read', 'update', 'delete', 'all'],
  },
  'Admin': {
    jobs: ['create', 'read', 'update', 'delete', 'all'],
    applicants: ['create', 'read', 'update', 'delete', 'all'],
    blogs: ['create', 'read', 'update', 'delete', 'all'],
    caseStudies: ['create', 'read', 'update', 'delete', 'all'],
    products: ['create', 'read', 'update', 'delete', 'all'],
    media: ['create', 'read', 'update', 'delete', 'all'],
    analytics: ['create', 'read', 'update', 'delete', 'all'],
    settings: ['read', 'update'], // limited core settings updates
    crm: ['create', 'read', 'update', 'all'],
    clients: ['create', 'read', 'update', 'all'],
  },
  'HR': {
    jobs: ['create', 'read', 'update', 'delete'],
    applicants: ['create', 'read', 'update', 'delete'],
    blogs: ['read'],
    caseStudies: ['read'],
    products: ['read'],
    media: ['create', 'read', 'delete'],
    analytics: ['read'],
    settings: ['read'],
    crm: [],
    clients: [],
  },
  'Recruiter': {
    jobs: ['read'],
    applicants: ['create', 'read', 'update'],
    blogs: ['read'],
    caseStudies: ['read'],
    products: ['read'],
    media: ['create', 'read'],
    analytics: ['read'],
    settings: ['read'],
    crm: [],
    clients: [],
  },
  'Developer': {
    jobs: ['read'],
    applicants: ['read'],
    blogs: ['read'],
    caseStudies: ['read'],
    products: ['read'],
    media: ['read'],
    analytics: ['read'],
    settings: ['create', 'read', 'update', 'delete', 'all'], // Developers edit API keys
    crm: ['read'],
    clients: ['read'],
  },
  'Marketing': {
    jobs: ['read'],
    applicants: [],
    blogs: ['create', 'read', 'update', 'delete'],
    caseStudies: ['create', 'read', 'update', 'delete'],
    products: ['create', 'read', 'update', 'delete'],
    media: ['create', 'read', 'update', 'delete'],
    analytics: ['read'],
    settings: ['read'],
    crm: ['read'],
    clients: [],
  },
  'Content Editor': {
    jobs: ['read'],
    applicants: [],
    blogs: ['create', 'read', 'update'],
    caseStudies: ['create', 'read', 'update'],
    products: ['read', 'update'],
    media: ['create', 'read'],
    analytics: ['read'],
    settings: ['read'],
    crm: [],
    clients: [],
  },
  'Sales': {
    jobs: ['read'],
    applicants: [],
    blogs: ['read'],
    caseStudies: ['read'],
    products: ['read'],
    media: ['read'],
    analytics: ['read'],
    settings: [],
    crm: ['create', 'read', 'update', 'delete', 'all'],
    clients: ['create', 'read', 'update'],
  },
  'Support': {
    jobs: ['read'],
    applicants: [],
    blogs: ['read'],
    caseStudies: ['read'],
    products: ['read'],
    media: ['read'],
    analytics: ['read'],
    settings: [],
    crm: ['read'],
    clients: ['create', 'read', 'update'], // helps clients with tickets
  },
  'Finance': {
    jobs: [],
    applicants: [],
    blogs: [],
    caseStudies: [],
    products: ['read'],
    media: [],
    analytics: ['read'],
    settings: [],
    crm: ['read'],
    clients: ['read', 'update'], // handles payments/invoices
  },
  'Viewer': {
    jobs: ['read'],
    applicants: ['read'],
    blogs: ['read'],
    caseStudies: ['read'],
    products: ['read'],
    media: ['read'],
    analytics: ['read'],
    settings: ['read'],
    crm: ['read'],
    clients: ['read'],
  }
};

export function checkPermission(
  role: string,
  resource: Resource,
  action: Action
): boolean {
  const allowedActions = rbacMatrix[role as PlatformRole]?.[resource];
  if (!allowedActions) return false;
  return allowedActions.includes('all') || allowedActions.includes(action);
}

// 4. Rate Limiting Protection (Login endpoints protector)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes lockout

export function verifyRateLimit(ipAddress: string): { allowed: boolean; remainingLockout?: number } {
  const record = loginAttempts.get(ipAddress);
  const now = Date.now();
  if (record) {
    if (record.count >= MAX_ATTEMPTS) {
      const diff = now - record.lastAttempt;
      if (diff < LOCKOUT_TIME) {
        return { allowed: false, remainingLockout: LOCKOUT_TIME - diff };
      } else {
        // Reset after lockout
        loginAttempts.delete(ipAddress);
      }
    }
  }
  return { allowed: true };
}

export function logFailedAttempt(ipAddress: string) {
  const record = loginAttempts.get(ipAddress) || { count: 0, lastAttempt: 0 };
  record.count += 1;
  record.lastAttempt = Date.now();
  loginAttempts.set(ipAddress, record);
}

export function logSuccessfulAttempt(ipAddress: string) {
  loginAttempts.delete(ipAddress);
}
