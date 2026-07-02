import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { InsightsClient } from '@/components/InsightsClient';

export const metadata: Metadata = {
  title: 'Insights & Engineering Research | ' + siteConfig.companyName,
  description: 'Engineering intelligence, technical deep-dives, and original research from the Qeltrava AI team.',
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <InsightsClient />
    </main>
  );
}
