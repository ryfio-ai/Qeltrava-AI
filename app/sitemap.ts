import { MetadataRoute } from 'next';
import { db } from '@/platform/shared/database/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qeltrava.ai';

  let jobs: any[] = [];
  let blogs: any[] = [];
  
  try {
    jobs = await db.jobs.list('ws-qeltrava-ai');
    blogs = await db.blogs.list('ws-qeltrava-ai');
  } catch (e) {
    console.error('Sitemap fetch failed, using fallbacks', e);
  }

  const jobUrls: MetadataRoute.Sitemap = jobs
    .filter(j => j.status === 'Published')
    .map(job => ({
      url: `${baseUrl}/careers/${job.slug}`,
      lastModified: new Date(job.updated_at || job.created_at),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

  const blogUrls: MetadataRoute.Sitemap = blogs.map(blog => ({
    url: `${baseUrl}/insights/${blog.slug}`,
    lastModified: new Date(blog.published_at || blog.created_at),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

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
    { path: '/trust', priority: 0.6 },
  ];

  const subRoutes = [
    '/solutions/ai-operations-automation',
    '/solutions/legacy-modernization',
    '/solutions/ai-customer-service-transformation',
    '/solutions/data-foundation',
    '/solutions/security-hardening',
    '/solutions/saas-launch',
    '/solutions/ai-readiness',
    '/services/product-engineering',
    '/services/saas-development',
    '/services/data-analytics',
    '/services/cloud-devops',
    '/services/cybersecurity',
    '/industries/fintech',
    '/industries/healthcare',
    '/industries/logistics',
    '/industries/manufacturing',
    '/industries/retail',
    '/industries/saas',
    '/industries/education',
    '/industries/government',
    '/products/modliq',
  ];

  const staticCoreUrls: MetadataRoute.Sitemap = coreRoutes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route.priority,
  }));

  const staticSubUrls: MetadataRoute.Sitemap = subRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticCoreUrls, ...staticSubUrls, ...jobUrls, ...blogUrls];
}
