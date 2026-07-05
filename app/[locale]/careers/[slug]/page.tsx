// app/[locale]/careers/[slug]/page.tsx
// Public Job detail page (Dynamic Careers Portal)

import React from 'react';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { Link } from '@/src/routing';
import { Button } from '@/components/Button';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { MapPin, Clock, Calendar, ShieldCheck, Edit, Plus, Trash } from 'lucide-react';
import { db } from '@/platform/shared/database/db';
import { cookies } from 'next/headers';
import { decryptSession, ADMIN_COOKIE_NAME } from '@/platform/auth';
import { deleteJob } from '@/platform/shared/actions';
import { ShareButtons } from '@/components/ShareButtons';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const jobs = await db.jobs.list('ws-qeltrava-ai');
  const locales = ['en', 'es', 'de', 'fr', 'pt-BR', 'ar'];
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    for (const job of jobs) {
      if (job.status === 'Published') {
        params.push({ locale, slug: job.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await db.jobs.get('ws-qeltrava-ai', slug);
  if (!job) return {};

  return {
    title: `${job.title} | Careers | ${siteConfig.companyName}`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const job = await db.jobs.get('ws-qeltrava-ai', slug);

  if (!job || job.status !== 'Published') {
    notFound();
  }

  const jobId = job.id;
  const jobTitle = job.title;
  const jobSlug = job.slug;

  const shareUrl = `https://qeltrava.ai/${locale}/careers/${job.slug}`;

  // Formatted share text for WhatsApp, Email, copy-to-clipboard, etc.
  const responsibilitiesText = job.responsibilities?.map((r: string) => `• ${r}`).join('\n') || '';
  const requirementsText = job.requirements?.map((req: string) => `• ${req}`).join('\n') || '';
  
  const fullShareText = `📢 *New Job Opening at Qeltrava AI* 📢

*Role:* ${job.title}
*Department:* ${job.department}
*Location:* ${job.location}
*Type:* ${job.employment_type}
*Salary/Stipend:* ${job.salary || 'NA'}

*Core Responsibilities:*
${responsibilitiesText}

*Requirements:*
${requirementsText}

*Apply here:* ${shareUrl}`;

  // Short version for Twitter/X character limits
  const twitterShareText = `We are hiring a ${job.title} (${job.department}) at Qeltrava AI! Location: ${job.location}. Apply here:`;

  // Admin status check
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const session = sessionToken ? decryptSession(sessionToken) : null;
  const isAdmin = session?.role === 'Super Admin' || session?.role === 'Recruiter Admin';
  const adminEmail = session?.email || '';
  const adminRole = session?.role || '';

  async function deleteJobAction() {
    'use server';
    await deleteJob(jobId);
    redirect(`/${locale}/careers`);
  }
  return (
    <>
      {isAdmin && (
        <div className="bg-slate-900 border-b border-slate-800 text-white w-full py-3.5 px-6 md:px-8 flex justify-between items-center text-xs font-mono select-none fixed top-0 left-0 right-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="font-bold uppercase tracking-wider text-slate-300">Qeltrava OS Admin Control</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Authenticated: {adminEmail} ({adminRole})</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/admin/jobs?action=create`} className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 shadow-sm">
              <Plus className="w-3.5 h-3.5" /> Add Job
            </Link>
            <Link href={`/${locale}/admin/jobs?edit=${job.id}`} className="bg-slate-800 hover:bg-slate-750 text-white px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 border border-slate-700">
              <Edit className="w-3.5 h-3.5 text-blue-400" /> Edit Job
            </Link>
            <form action={deleteJobAction} className="inline">
              <button type="submit" className="bg-red-950/40 hover:bg-red-900/60 text-red-200 border border-red-900/40 px-3.5 py-1.5 rounded-full font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                <Trash className="w-3.5 h-3.5 text-red-400" /> Delete Job
              </button>
            </form>
          </div>
        </div>
      )}
      <main className={`min-h-screen bg-[var(--color-bg-white)] pb-24 text-slate-800 ${isAdmin ? 'pt-44' : 'pt-32'}`}>
      <div className="max-w-4xl mx-auto px-6 md:px-8 flex flex-col gap-10">
        
        {/* Breadcrumb path */}
        <nav className="text-xs text-slate-400 flex items-center gap-2">
          <Link href="/" className="hover:text-[var(--color-accent)] hover:underline">Home</Link>
          <span>→</span>
          <Link href="/careers" className="hover:text-[var(--color-accent)] hover:underline">Careers</Link>
          <span>→</span>
          <span className="text-[var(--color-primary-dark)] font-semibold truncate max-w-xs">{job.title}</span>
        </nav>

        {/* Hero header block */}
        <FadeIn>
          <header className="border-b border-[var(--color-border-soft)] pb-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-3 py-1 rounded-full uppercase tracking-wider text-[9px] font-bold text-[var(--color-accent)]">
                {job.department}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-primary-dark)]">
              {job.title}
            </h1>
            <div className="flex flex-wrap gap-5 text-xs text-slate-500 font-medium pt-2">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {job.employment_type}</span>
              {job.salary && <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {job.salary}</span>}
            </div>
          </header>
        </FadeIn>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Description */}
          <div className="lg:col-span-8 space-y-8 text-sm leading-relaxed text-slate-600">
            <FadeIn delay={0.1}>
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-[var(--color-primary-dark)]">About the Role</h2>
                <p className="whitespace-pre-line">{job.description}</p>
              </div>
            </FadeIn>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-[var(--color-primary-dark)]">Core Responsibilities</h2>
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    {job.responsibilities.map((r: string, idx: number) => (
                      <li key={idx} className="marker:text-[var(--color-accent)]">{r}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <FadeIn delay={0.3}>
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-[var(--color-primary-dark)]">Requirements & Qualifications</h2>
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    {job.requirements.map((req: string, idx: number) => (
                      <li key={idx} className="marker:text-[var(--color-accent)]">{req}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            {job.benefits && job.benefits.length > 0 && (
              <FadeIn delay={0.4}>
                <div className="space-y-3">
                  <h2 className="text-lg font-bold text-[var(--color-primary-dark)]">Benefits & Compensation</h2>
                  <ul className="list-disc list-inside space-y-2 pl-2">
                    {job.benefits.map((b: string, idx: number) => (
                      <li key={idx} className="marker:text-[var(--color-accent)]">{b}</li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Sidebar stack and process */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack */}
            {job.tech_stack && job.tech_stack.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-dark)] mb-3 font-mono border-b border-slate-200/50 pb-2">Technologies Stack</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tech_stack.map((stack: string, idx: number) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-md text-[10px] font-semibold">{stack}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Hiring Process */}
            <FadeIn delay={0.3}>
              <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-dark)] mb-4 font-mono border-b border-slate-200/50 pb-2">Hiring Process</h3>
                <div className="relative border-l border-slate-200 pl-4 space-y-5 ml-1">
                  {(job.hiring_process || [
                    '1. Application Review',
                    '2. Architecture Assignment',
                    '3. final Found Sync'
                  ]).map((step: string, idx: number) => (
                    <div key={idx} className="relative text-[11px] font-medium text-slate-650">
                      <span className="absolute -left-[21px] top-1 w-2 h-2 bg-[var(--color-accent)] rounded-full border border-white" />
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Share Buttons */}
            <ShareButtons 
              jobTitle={jobTitle} 
              slug={jobSlug} 
              shareUrl={shareUrl}
              fullShareText={fullShareText}
              twitterShareText={twitterShareText}
            />

            {/* Sticky Apply Button */}
            <FadeIn delay={0.4}>
              <div className="border border-indigo-100 bg-indigo-50/50 p-6 rounded-2xl space-y-4">
                <div className="flex items-start gap-2 text-indigo-800">
                  <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <p className="font-bold">Security & Compliance</p>
                    <p className="opacity-80">All applications are encrypted and partitioned within workspace access matrices.</p>
                  </div>
                </div>
                <Button href={`/apply/${job.slug}`} className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-10 flex items-center justify-center gap-1.5 shadow-sm">
                  Apply for this role
                </Button>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </main>
    </>
  );
}
