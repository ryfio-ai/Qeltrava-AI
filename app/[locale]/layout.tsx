import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.companyName} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  icons: {
    icon: "/logo-bg.png",
    shortcut: "/logo-bg.png",
    apple: "/logo-bg.png",
  },
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-20">
        <NextIntlClientProvider messages={messages}>
          <ConsentProvider>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-[var(--color-primary-dark)]">
              Skip to main content
            </a>
            <ScrollProgress />
            <JsonLd />
            <Header />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer />
            <CookieBanner />
          </ConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
