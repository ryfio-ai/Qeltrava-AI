import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BIS / ISI Certification & Product Compliance Consultancy | Qeltrava AI',
  description: 'Engineering-led product compliance support for Indian Standards (IS), compulsory BIS/ISI registration, technical gap assessment, lab testing preparation, quality documentation, and factory readiness audit.',
  keywords: [
    'BIS ISI Certification Consultancy',
    'BIS Certification for Manufacturing',
    'Indian Standards IS Compliance',
    'BIS Gap Assessment Audit',
    'BIS Technical Documentation',
    'BIS Testing Laboratory Preparation',
    'Factory Readiness Audit BIS',
    'Compulsory Registration Scheme CRS India',
  ],
  openGraph: {
    title: 'BIS / ISI Product Compliance & Certification Support | Qeltrava AI',
    description: 'Engineering-led support helping manufacturers navigate Indian Standards (IS), gap assessment, testing preparation, technical documentation, and factory readiness.',
    url: 'https://qeltrava.ai/services/bis-isi-compliance',
    siteName: 'Qeltrava AI',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'BIS ISI Compliance Qeltrava AI' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIS / ISI Certification Consultancy | Qeltrava AI',
    description: 'Product Compliance & Certification Support for Indian Standards (IS) and BIS/ISI readiness.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://qeltrava.ai/services/bis-isi-compliance',
  },
};

export default function BisIsiComplianceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
