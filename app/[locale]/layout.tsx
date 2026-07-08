import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/src/routing';
import { ConsentProvider } from '@/components/ConsentProvider';
import { CookieBanner } from '@/components/CookieBanner';
import { AnnouncementBar } from '@/components/ui/AnnouncementBar';
import { SocialProofTicker } from '@/components/ui/SocialProofTicker';
import { MobileStickyBar } from '@/components/ui/MobileStickyBar';
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.companyName} | Custom AI Software Development & Engineering`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI software development company",
    "Enterprise SaaS engineering",
    "Custom AI integrations",
    "AI automation services",
    "Cloud DevOps",
    "Custom Software Development",
  ],
  openGraph: {
    title: `${siteConfig.companyName} | Custom AI Software Development & Engineering`,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    siteName: siteConfig.companyName,
    images: [
      {
        url: "/logo-bg.png",
        width: 1200,
        height: 630,
        alt: siteConfig.companyName,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} | Custom AI Software Development`,
    description: siteConfig.description,
    images: ["/logo-bg.png"],
  },
  icons: {
    icon: "/logo-bg.png",
    shortcut: "/logo-bg.png",
    apple: "/logo-bg.png",
  },
  alternates: {
    languages: {
      'en-US': '/en',
      'ta-IN': '/ta',
      'ml-IN': '/ml'
    }
  }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-[var(--color-primary-dark)]">
              Skip to main content
            </a>
            <ScrollProgress />
            <JsonLd />
            <div className="sticky top-0 z-50 w-full flex flex-col">
              <AnnouncementBar />
              <Header />
            </div>
            <main id="main-content" className="flex-grow">{children}</main>
            <SocialProofTicker />
            <Footer />
            <CookieBanner />
            <MobileStickyBar />
          </ConsentProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
