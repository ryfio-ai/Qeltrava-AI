// app/[locale]/apply/[slug]/page.tsx
// Public Applicant submission portal: Connected to dynamic form builder engine

import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/src/routing';
import { siteConfig } from '@/lib/site-config';
import { FadeIn } from '@/components/animations/FadeIn';
import { DynamicFormRenderer, FormFieldSchema } from '@/platform/modules/forms/FormRenderer';
import { getJobs, submitApplication } from '@/platform/shared/actions';
import { Card, CardHeader, CardBody } from '@/design-system';
import { FileText, ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const jobs = await getJobs();
  const job = jobs.find(j => j.slug === slug);
  if (!job) return {};

  return {
    title: `Apply: ${job.title} | ${siteConfig.companyName}`,
    description: `Submit your application for the ${job.title} opening at ${siteConfig.companyName}.`,
  };
}

export default async function ApplyPage({ params }: PageProps) {
  const { slug } = await params;
  const jobs = await getJobs();
  const job = jobs.find(j => j.slug === slug && j.status === 'Published');

  if (!job) {
    notFound();
  }

  // 1. Fields Template for Recruitment application intake
  const applyFormFields: FormFieldSchema[] = [
    {
      name: 'full_name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      required: true
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john.doe@example.com',
      required: true
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+91 98765 43210',
      required: true
    },
    {
      name: 'college',
      label: 'College / University',
      type: 'text',
      placeholder: 'PSG College of Technology',
      required: true
    },
    {
      name: 'degree',
      label: 'Degree Course',
      type: 'text',
      placeholder: 'B.E. Computer Science',
      required: true
    },
    {
      name: 'year',
      label: 'Graduation Year',
      type: 'text',
      placeholder: '2026',
      required: true
    },
    {
      name: 'portfolio',
      label: 'Portfolio Website Link',
      type: 'text',
      placeholder: 'https://johndoe.dev'
    },
    {
      name: 'linkedin',
      label: 'LinkedIn Profile Link',
      type: 'text',
      placeholder: 'https://linkedin.com/in/johndoe'
    },
    {
      name: 'resume_url',
      label: 'Resume Document URL (Google Drive / Dropbox)',
      type: 'text',
      placeholder: 'https://drive.google.com/file/...',
      required: true
    },
    {
      name: 'cover_letter',
      label: 'Cover Letter / Notes (Optional)',
      type: 'textarea',
      placeholder: 'Tell us why you are a fit...'
    }
  ];

  // 2. Submit Handler routing to Server Actions
  const handleFormSubmission = async (formData: Record<string, any>) => {
    'use server';
    
    try {
      await submitApplication({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        college: formData.college,
        degree: formData.degree,
        year: formData.year,
        portfolio: formData.portfolio || '',
        linkedin: formData.linkedin || '',
        resume_url: formData.resume_url,
        cover_letter: formData.cover_letter || '',
        status: 'Applied', // Intake funnel stage
        skills: ['React', 'TypeScript'], // Default matching tags
        rating: 0,
        notes: [],
        timeline: []
      });
      return { success: true };
    } catch (err) {
      return { success: false, message: 'Submission failed. Please check fields.' };
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] pt-32 pb-24 text-slate-800">
      <div className="max-w-xl mx-auto px-6">
        
        {/* Back Link */}
        <Link href={`/careers/${job.slug}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[var(--color-accent)] transition-colors mb-6 font-mono">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Role Details
        </Link>

        {/* Application Header Card */}
        <FadeIn>
          <Card className="bg-white border-[var(--color-border-soft)] shadow-md p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-[var(--color-accent)] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[var(--color-primary-dark)] tracking-tight">Candidate Intake Form</h1>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">Role: {job.title} ({job.department})</p>
              </div>
            </div>

            {/* Dynamic Form Engine */}
            <DynamicFormRenderer
              fields={applyFormFields}
              onSubmit={handleFormSubmission}
              submitButtonText="Submit Job Application"
              successMessage="Application logged! Our recruitment team will review your profile and trigger the next step shortly."
            />
          </Card>
        </FadeIn>

      </div>
    </main>
  );
}
