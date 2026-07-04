"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
  emoji: string;
  placeholder: string;
  defaultInput: string;
  output: string;
}

const tabs: Tab[] = [
  {
    id: 'user-story',
    label: 'User Story',
    emoji: '📝',
    placeholder: 'Describe a feature (e.g. "Users need to upload and process PDF invoices")',
    defaultInput: 'Users need to upload and process PDF invoices automatically',
    output: `As a finance team member,
I want to upload PDF invoices to the system,
So that the AI can automatically extract and validate invoice data.

**Acceptance Criteria**

✓ User can upload PDF files up to 50MB via drag-and-drop or file picker
✓ System accepts batch uploads (up to 20 files per request)
✓ AI extracts: vendor name, invoice number, date, line items, subtotal, tax, total
✓ Extracted data is displayed for human review before confirmation
✓ Confidence score (%) shown per extracted field
✓ Fields with confidence < 85% are highlighted for manual review
✓ Processing completes within 30 seconds per document
✓ User receives email notification when batch processing is complete
✓ Failed extractions trigger a toast notification with retry option
✓ All processed invoices stored with original PDF and extracted JSON

**Definition of Done**
□ Unit tests cover all extraction edge cases
□ E2E test validates the upload-to-review flow
□ Accessibility audit passes (WCAG 2.1 AA)
□ Performance: < 2s page load on 3G`,
  },
  {
    id: 'api-contract',
    label: 'API Contract',
    emoji: '🔌',
    placeholder: 'Describe an API endpoint (e.g. "User authentication with JWT and refresh tokens")',
    defaultInput: 'User authentication with JWT access and refresh tokens',
    output: `openapi: '3.1.0'
info:
  title: Auth API
  version: '1.0.0'

paths:
  /auth/login:
    post:
      summary: Authenticate user credentials
      tags: [Authentication]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [email, password]
              properties:
                email:
                  type: string
                  format: email
                  example: user@company.com
                password:
                  type: string
                  minLength: 8
                  example: SecurePass123!
      responses:
        '200':
          description: Authentication successful
          content:
            application/json:
              schema:
                properties:
                  access_token:  { type: string, description: JWT, expires in 1h }
                  refresh_token: { type: string, description: Rotated refresh token }
                  expires_in:    { type: integer, example: 3600 }
                  user:
                    properties:
                      id:    { type: string, format: uuid }
                      email: { type: string }
                      role:  { type: string, enum: [admin, member, viewer] }
        '401':
          description: Invalid credentials
        '429':
          description: Rate limited — max 5 failed attempts per 15min

  /auth/refresh:
    post:
      summary: Rotate access token using refresh token
      security: [{ BearerAuth: [] }]
      responses:
        '200':
          description: New access + refresh token pair
        '401':
          description: Refresh token expired or revoked`,
  },
  {
    id: 'sql-schema',
    label: 'SQL Schema',
    emoji: '🗄️',
    placeholder: 'Describe a data model (e.g. "Multi-tenant SaaS with teams, projects, and billing")',
    defaultInput: 'Multi-tenant SaaS with teams, projects, and Stripe billing',
    output: `-- ============================================
-- Multi-Tenant SaaS Schema
-- PostgreSQL 16 · Row-Level Security enabled
-- ============================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Organizations (tenants)
CREATE TABLE organizations (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  plan        TEXT NOT NULL DEFAULT 'free'
                CHECK (plan IN ('free','starter','pro','enterprise')),
  stripe_id   TEXT UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Users
CREATE TABLE users (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id       UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email        TEXT UNIQUE NOT NULL,
  role         TEXT NOT NULL DEFAULT 'member'
                 CHECK (role IN ('owner','admin','member','viewer')),
  invited_by   UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_users_org ON users(org_id);

-- Projects
CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id      UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'active'
                CHECK (status IN ('active','archived','deleted')),
  created_by  UUID NOT NULL REFERENCES users(id),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Row-Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY org_isolation ON projects
  USING (org_id = current_setting('app.org_id')::UUID);`,
  },
  {
    id: 'test-cases',
    label: 'Test Cases',
    emoji: '🧪',
    placeholder: 'Describe what to test (e.g. "Login with rate limiting and error states")',
    defaultInput: 'User login with validation, error states, and rate limiting',
    output: `import { test, expect } from '@playwright/test';

test.describe('Authentication — Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('✓ logs in with valid credentials', async ({ page }) => {
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'SecurePass123!');
    await page.click('[data-testid="login-btn"]');

    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByTestId('user-avatar')).toBeVisible();
    await expect(page.getByTestId('welcome-banner')).toContainText('Welcome');
  });

  test('✓ shows error for wrong password', async ({ page }) => {
    await page.fill('[data-testid="email"]', 'user@example.com');
    await page.fill('[data-testid="password"]', 'wrongpassword');
    await page.click('[data-testid="login-btn"]');

    await expect(page.getByRole('alert')).toContainText('Invalid email or password');
    await expect(page).toHaveURL('/login');
    await expect(page.getByTestId('password')).toBeFocused();
  });

  test('✓ validates email format client-side', async ({ page }) => {
    await page.fill('[data-testid="email"]', 'notanemail');
    await page.click('[data-testid="login-btn"]');

    await expect(page.getByText('Please enter a valid email')).toBeVisible();
  });

  test('✓ rate limits after 5 failed attempts', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.fill('[data-testid="email"]', 'user@example.com');
      await page.fill('[data-testid="password"]', 'wrong');
      await page.click('[data-testid="login-btn"]');
      await page.waitForTimeout(200);
    }
    await expect(page.getByText(/too many attempts/i)).toBeVisible();
    await expect(page.getByTestId('login-btn')).toBeDisabled();
  });

  test('✓ redirects authenticated users away from /login', async ({ page, context }) => {
    await context.addCookies([{ name: 'auth_token', value: 'valid_token', domain: 'localhost' }]);
    await page.goto('/login');
    await expect(page).toHaveURL('/dashboard');
  });
});`,
  },
  {
    id: 'workflow',
    label: 'CI/CD Workflow',
    emoji: '⚙️',
    placeholder: 'Describe the deployment target (e.g. "Deploy Next.js to Vercel on push to main")',
    defaultInput: 'Deploy Next.js to Vercel on push to main with quality gate',
    output: `name: CI/CD — Production Deployment

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'

jobs:
  quality-gate:
    name: Quality Gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: \${{ env.NODE_VERSION }}
          cache: npm

      - name: Install dependencies
        run: npm ci --prefer-offline

      - name: TypeScript check
        run: npx tsc --noEmit

      - name: ESLint
        run: npm run lint

      - name: Install Playwright
        run: npx playwright install --with-deps chromium

      - name: Run E2E tests
        run: npx playwright test
        env:
          BASE_URL: http://localhost:3000

      - name: Build check
        run: npm run build
        env:
          NEXT_TELEMETRY_DISABLED: 1

  deploy:
    name: Deploy to Production
    needs: quality-gate
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: \${{ steps.deploy.outputs.url }}

    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      - name: Comment deployment URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.repos.createCommitStatus({
              ...context.repo, sha: context.sha,
              state: 'success',
              target_url: '\${{ steps.deploy.outputs.url }}',
              description: 'Deployed to production'
            })`,
  },
];

function TypewriterOutput({ text, speed = 12 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    idxRef.current = 0;
    const id = setInterval(() => {
      if (idxRef.current < text.length) {
        setDisplayed(text.slice(0, idxRef.current + 1));
        idxRef.current++;
      } else {
        clearInterval(id);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed">
      {displayed}
      {!done && <span className="animate-pulse">▌</span>}
    </pre>
  );
}

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [inputs, setInputs] = useState<Record<string, string>>(Object.fromEntries(tabs.map(t => [t.id, t.defaultInput])));
  const [running, setRunning] = useState<Record<string, boolean>>({});
  const [results, setResults] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const tab = tabs.find(t => t.id === activeTab)!;
  const result = results[activeTab];
  const isRunning = running[activeTab];

  const run = () => {
    setRunning(p => ({ ...p, [activeTab]: true }));
    setResults(p => ({ ...p, [activeTab]: '' }));
    setTimeout(() => {
      setResults(p => ({ ...p, [activeTab]: tab.output }));
      setRunning(p => ({ ...p, [activeTab]: false }));
    }, 600);
  };

  const copy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)]">
      {/* Hero */}
      <section className="pt-20 pb-14 bg-[var(--color-primary-dark)] relative overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(16,185,129,0.1) 0%, transparent 50%)' }} />
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold font-mono uppercase tracking-wider mb-6">
            🧪 AI Prompt Playground
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">See AI in Action</h1>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Type a description. Watch production-grade AI output generate in real time. No API key required.
          </p>
        </div>
      </section>

      {/* Playground */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Tab bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${activeTab === t.id
                  ? 'bg-[var(--color-primary-dark)] text-white border-[var(--color-primary-dark)] shadow-lg'
                  : 'bg-white text-[var(--color-text-main)] border-[var(--color-border-soft)] hover:border-gray-300'
                  }`}>
                <span>{t.emoji}</span>
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--color-border-soft)] rounded-2xl overflow-hidden shadow-xl">
            {/* Input */}
            <div className="bg-[var(--color-bg-light)] p-7 border-r border-[var(--color-border-soft)]">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 font-mono">Input</div>
              <textarea
                value={inputs[activeTab]}
                onChange={e => setInputs(p => ({ ...p, [activeTab]: e.target.value }))}
                placeholder={tab.placeholder}
                rows={6}
                className="w-full px-4 py-3 bg-white border border-[var(--color-border-soft)] rounded-xl text-sm text-[var(--color-primary-dark)] placeholder-gray-400 resize-none focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 transition-all font-mono"
              />
              <button onClick={run} disabled={isRunning || !inputs[activeTab].trim()}
                className="mt-4 w-full py-3 bg-[var(--color-accent)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {isRunning ? (
                  <><span className="animate-spin">⟳</span> Generating...</>
                ) : (
                  <>Generate {tab.emoji} →</>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                Simulated output — swap with real API calls anytime
              </p>
            </div>

            {/* Output */}
            <div className="bg-[var(--color-primary-dark)] p-7 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold uppercase tracking-wider text-white/40 font-mono">Output</div>
                {result && (
                  <button onClick={copy} className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                    {copied ? '✓ Copied' : 'Copy →'}
                  </button>
                )}
              </div>
              <div className="flex-1 min-h-[280px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {isRunning ? (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-emerald-400 text-sm font-mono">
                      <span className="animate-spin">⟳</span>
                      <span>Generating…</span>
                    </motion.div>
                  ) : result ? (
                    <motion.div key={activeTab + result.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <TypewriterOutput text={result} speed={8} />
                    </motion.div>
                  ) : (
                    <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-white/20 text-sm font-mono italic">
                      Your generated output will appear here…
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--color-text-main)] mb-4">
              Ready to use real AI in your product?
            </p>
            <a href="/book-consultation"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--color-accent)] text-white font-bold rounded-full hover:opacity-90 transition-opacity">
              Book an Architecture Workshop →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
