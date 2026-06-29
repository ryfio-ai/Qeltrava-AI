# Deployment Guide

This document outlines the deployment and configuration steps for the Qeltrava AI platform.

## Prerequisites

1. Node.js 18+ and npm
2. A Supabase account (or compatible PostgreSQL database)
3. A Resend account (for email notifications, optional)
4. Vercel account (recommended for deployment)

## Environment Setup

Create a `.env.local` file based on `.env.example`:

```bash
NEXT_PUBLIC_SITE_URL=https://qeltrava.ai
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
RESEND_API_KEY=your_resend_api_key
LEAD_NOTIFY_EMAIL=hello@qeltrava.ai
NEXT_PUBLIC_BOOKING_URL=your_booking_url
```

> **Security Note:** Do not expose the `SUPABASE_SERVICE_ROLE_KEY` to the client. It is used strictly in the `/api/leads` and `/api/newsletter` backend routes.

## Supabase Database Schema

To set up the leads table in Supabase, execute the following SQL:

```sql
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    source TEXT,
    full_name TEXT,
    email TEXT,
    company TEXT,
    role TEXT,
    website TEXT,
    project_type TEXT,
    budget_range TEXT,
    timeline TEXT,
    industry TEXT,
    company_size TEXT,
    message TEXT,
    metadata JSONB,
    consent BOOLEAN
);

-- Enable Row Level Security (RLS) and restrict access to the service role
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service Role Full Access"
ON public.leads FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment to Vercel

1. Push your code to a GitHub repository.
2. Go to Vercel and import the repository.
3. Configure the Environment Variables in the Vercel dashboard matching your `.env.local`.
4. Click **Deploy**.

Vercel will automatically detect the Next.js framework, run `npm run build`, and deploy the application.

## Post-Deployment Checklist

- Verify that all environment variables are correctly set.
- Test the contact and consultation forms to ensure data is reaching Supabase.
- Verify DNS settings and custom domain configurations.
- Run Lighthouse audits to confirm performance and accessibility.
