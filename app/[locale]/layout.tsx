import type { Metadata } from "next";
import { Anek_Tamil, Instrument_Serif, JetBrains_Mono } from "next/font/google";
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

const anekTamil = Anek_Tamil({
  variable: "--font-anek-tamil",
  subsets: ["latin", "tamil"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
    default: `${siteConfig.companyName} | Custom AI & Software Engineering`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.description,
  keywords: [
    "AI software development company",
    "Custom SaaS development India",
    "Custom AI integrations",
    "AI automation services",
    "Cloud DevOps",
    "MVP development agency",
  ],
  openGraph: {
    title: `${siteConfig.companyName} | Custom AI & Software Engineering`,
    description: siteConfig.description,
    url: siteConfig.baseUrl,
    siteName: siteConfig.companyName,
    images: [
      {
        url: "/logo.png",
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
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      className={`${anekTamil.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
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
