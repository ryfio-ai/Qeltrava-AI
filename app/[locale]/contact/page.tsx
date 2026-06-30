import React from 'react';
import { LeadForm } from '@/components/LeadForm';
import { siteConfig } from '@/lib/site-config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.companyName}`,
  description: "Get in touch with Qeltrava AI to discuss your software engineering, AI automation, or infrastructure needs.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-light)] pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">Start a Conversation</h1>
          <p className="text-lg text-[var(--color-text-main)]/80 max-w-2xl mx-auto">
            Have a process, platform, or product that needs AI-native engineering? Fill out the form below and we will review your requirements.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border-soft)] p-6 md:p-10">
          <LeadForm />
        </div>

      </div>
    </main>
  );
}
