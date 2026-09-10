# Qeltrava AI — Complete Technical SEO & Indexability Audit Report

## 1. Executive Summary
This report presents the complete technical SEO, AEO (Answer Engine Optimization), entity consistency, structured data, performance, and indexability audit for **Qeltrava AI** ([https://qeltrava.ai](https://qeltrava.ai)).

### Core Brand Entity Definition
- **Company Name:** Qeltrava AI
- **Primary Positioning:** AI Engineering for Manufacturing
- **Secondary Positioning:** Manufacturing Intelligence, Intelligent Automation, Digital Manufacturing Software, Industrial AI
- **Geography:** Coimbatore / Tamil Nadu / India
- **Founding Team:** Four engineering alumni from PSG College of Technology, Coimbatore
- **Factual Governance:** Zero fabricated metrics, zero unverified incorporation claims (`CIN: XXXXXXXXXXXX` and placeholder badges removed).

---

## 2. Technical Infrastructure Audit

### A. Next.js App Router Architecture
- **Framework Version:** Next.js `16.2.9` with React 19 and Turbopack compiler.
- **Routing Paradigm:** App Router with internationalized route prefixing (`/[locale]/...`).
- **Pre-rendering:** 100% SSG (Static Site Generation) across 460+ localized route paths.

### B. Sitemap Implementation (`app/sitemap.ts`)
- **Status:** PASS
- **URL Count:** Includes all indexable core pages, sub-routes (services, solutions, products, industries), dynamic career openings, and insight articles across `en`, `ta`, and `ml` locales.
- **Canonical Domain:** `https://qeltrava.ai`
- **Exclusions:** Excludes `/admin/`, `/portal/`, `/api/*`, and draft/unpublished entries.

### C. Crawl & Indexing Control (`app/robots.ts`)
- **Status:** PASS
- **Permissions:** Full access enabled for standard web crawlers and major AI crawlers (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `SearchGPT`, `Bytespider`, `CCBot`).
- **Disallowed Directories:** Disallows `/admin/`, `/api/`, `/portal/`.
- **Sitemap Link:** Points directly to `https://qeltrava.ai/sitemap.xml`.

### D. Canonical Tag Audit
- **Status:** PASS
- **Implementation:** Self-referencing absolute canonical URLs on all indexable pages. Trailing slashes and query parameter variations cleanly mapped.

---

## 3. Structured Data / JSON-LD Knowledge Graph

### Implemented Schemas (`components/seo/JsonLd.tsx`)
1. **`Organization`**:
   - `name`: "Qeltrava AI"
   - `legalName`: "Qeltrava AI"
   - `url`: "https://qeltrava.ai"
   - `address`: Locality: "Coimbatore", Region: "Tamil Nadu", Country: "IN"
   - `knowsAbout`: Manufacturing AI, Quality Intelligence, SPC, BIS/ISI Compliance Support, Industrial Automation.
   - `founders`: Engineering Team (PSG College of Technology alumni).
2. **`WebSite`**:
   - Includes `SearchAction` for Google sitelink search box eligibility.
3. **`Service`**:
   - Explicitly defines engineering services (AI Automation, Independent BIS/ISI Compliance Consultancy, Manufacturing Analytics).
4. **`SoftwareApplication`**:
   - Detailed schema for Modliqer No-Code Manufacturing AI platform.
5. **`FAQPage`**:
   - Factual Q&A schema embedded directly on homepage and key landing pages.

---

## 4. Open Graph & Social Entity Alignment

- **OG Image:** Standardized 1200x630 branded asset (`/logo.png`).
- **LinkedIn Profile Sync:** Aligned tagline (*"Engineering AI for Manufacturing"*), location (*Coimbatore, Tamil Nadu, India*), and website URL (*https://qeltrava.ai/en*).

---

## 5. Manual Google Search Console Action Plan

When deploying to production, execute the following steps in Google Search Console:
1. **Domain Verification:** Verify `qeltrava.ai` via DNS TXT record.
2. **Sitemap Submission:** Submit `https://qeltrava.ai/sitemap.xml`.
3. **URL Inspection:** Request indexing for homepage `https://qeltrava.ai/en`, `/en/industries/manufacturing`, `/en/products/modliq`, `/en/services/bis-isi-compliance`, and `/en/ai-readiness`.
4. **Rich Result Verification:** Validate JSON-LD syntax using Google's Rich Results Test tool.
