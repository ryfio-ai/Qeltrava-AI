import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Modliqer - No-Code AutoML & Quality Capability Platform | Qeltrava AI',
  description: 'Modliqer is a no-code AutoML and manufacturing analytics platform built by Qeltrava AI. Clean telemetry data, train computer vision & tabular ML models, compute Cp/Cpk quality capability math, and export ONNX models.',
  keywords: [
    'Modliqer AutoML',
    'No-code AutoML platform',
    'Manufacturing analytics software',
    'Quality capability Cp Cpk calculator',
    'Statistical Process Control software',
    'ONNX model export tool',
    'Computer vision inspection platform',
  ],
  openGraph: {
    title: 'Modliqer - No-Code AutoML & Manufacturing Analytics Platform',
    description: 'No-code ML platform engineered for factories, researchers, and quality engineers to build predictive AI models.',
    url: 'https://qeltrava.ai/products/modliq',
    siteName: 'Qeltrava AI',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'Modliqer Qeltrava AI' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modliqer - No-Code AutoML Platform | Qeltrava AI',
    description: 'No-code ML & manufacturing analytics platform for quality engineering and AI model deployment.',
    images: ['/logo.png'],
  },
  alternates: {
    canonical: 'https://qeltrava.ai/products/modliq',
  },
};

export default function ModliqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
