import { MetadataRoute } from 'next';
import { db } from '@/platform/shared/database/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qeltrava.ai';
  const locales = ['en', 'ta', 'ml'];

  let jobs: any[] = [];
  let blogs: any[] = [];

  try {
    jobs = await db.jobs.list('ws-qeltrava-ai');
    blogs = await db.blogs.list('ws-qeltrava-ai');
  } catch (e) {
    console.error('Sitemap fetch failed, using fallbacks', e);
  }

  const coreRoutes = [
    { path: '', priority: 1.0 },
    { path: '/about', priority: 0.9 },
    { path: '/contact', priority: 0.9 },
    { path: '/book-consultation', priority: 0.9 },
    { path: '/solutions', priority: 0.9 },
    { path: '/services', priority: 0.9 },
    { path: '/industries', priority: 0.8 },
    { path: '/case-studies', priority: 0.8 },
    { path: '/customers', priority: 0.8 },
    { path: '/insights', priority: 0.8 },
    { path: '/careers', priority: 0.7 },
    { path: '/team', priority: 0.7 },
    { path: '/ai-readiness', priority: 0.9 },
    { path: '/open-source', priority: 0.9 },
    { path: '/manufacturing', priority: 0.9 },
    { path: '/founders', priority: 0.9 },
    { path: '/learn', priority: 0.8 },
    { path: '/tools', priority: 0.9 },
    { path: '/roi-calculator', priority: 0.8 },
    { path: '/playground', priority: 0.8 },
    { path: '/proposal', priority: 0.8 },
    { path: '/glossary', priority: 0.7 },
    { path: '/quiz', priority: 0.7 },
    { path: '/security', priority: 0.7 },
  ];

  const subRoutes = [
    // Services
    '/services/bis-isi-compliance',
    '/services/product-engineering',
    '/services/saas-development',
    '/services/data-analytics',
    '/services/cloud-devops',
    '/services/cybersecurity',
    '/services/ai-automation',

    // Solutions
    '/solutions/ai-operations-automation',
    '/solutions/legacy-modernization',
    '/solutions/ai-customer-service-transformation',
    '/solutions/data-foundation',
    '/solutions/security-hardening',
    '/solutions/saas-launch',
    '/solutions/ai-readiness',

    // Industries
    '/industries/manufacturing',
    '/industries/fintech',
    '/industries/healthcare',
    '/industries/logistics',
    '/industries/retail',
    '/industries/saas',
    '/industries/education',
    '/industries/government',

    // Products
    '/products/modliq',
    '/products/stayseat',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Core & Sub Routes for each Locale
  locales.forEach((locale) => {
    const langPrefix = locale === 'en' ? '' : `/${locale}`;

    coreRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}${route.path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route.priority,
      });
    });

    subRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  });

  // Dynamic Jobs
  jobs
    .filter((j) => j.status === 'Published')
    .forEach((job) => {
      locales.forEach((locale) => {
        const langPrefix = locale === 'en' ? '' : `/${locale}`;
        sitemapEntries.push({
          url: `${baseUrl}${langPrefix}/careers/${job.slug}`,
          lastModified: new Date(job.updated_at || job.created_at),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    });

  // Dynamic Blogs
  blogs.forEach((blog) => {
    locales.forEach((locale) => {
      const langPrefix = locale === 'en' ? '' : `/${locale}`;
      sitemapEntries.push({
        url: `${baseUrl}${langPrefix}/insights/${blog.slug}`,
        lastModified: new Date(blog.published_at || blog.created_at),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  return sitemapEntries;
}
