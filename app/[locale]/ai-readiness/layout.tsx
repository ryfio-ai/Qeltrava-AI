import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Readiness Assessment & Manufacturing AI Audit | Qeltrava AI',
  description: 'Evaluate your factory data foundation, machine telemetry, PLC logs, and operational readiness for AI automation in 10 questions. Instant AI readiness score and engineering recommendations.',
  keywords: [
    'AI readiness assessment manufacturing',
    'Factory AI audit tool',
    'Data foundation assessment',
    'Manufacturing AI readiness score',
    'Predictive maintenance readiness',
  ],
  openGraph: {
    title: 'AI Readiness Assessment | Qeltrava AI',
    description: '10-question engineering assessment evaluating factory data readiness for AI deployment.',
    url: 'https://qeltrava.ai/ai-readiness',
    siteName: 'Qeltrava AI',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'AI Readiness Assessment Qeltrava AI' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Readiness Assessment | Qeltrava AI',
    description: 'Audit your manufacturing AI readiness and operational data foundation.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://qeltrava.ai/ai-readiness',
  },
};

export default function AiReadinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
