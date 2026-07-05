// app/sitemap.ts
// Dynamic Sitemap generator for Next.js SEO compliance

import { MetadataRoute } from 'next';
import { getJobs, getBlogs } from '@/platform/shared/actions';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qeltrava.ai';

  let jobs: any[] = [];
  let blogs: any[] = [];
  
  try {
    jobs = await getJobs();
    blogs = await getBlogs();
  } catch (e) {
    console.error('Sitemap fetch failed, using fallbacks', e);
  }

  const jobUrls = jobs
    .filter(j => j.status === 'Published')
    .map(job => ({
      url: `${baseUrl}/careers/${job.slug}`,
      lastModified: new Date(job.updated_at || job.created_at),
    }));

  const blogUrls = blogs.map(blog => ({
    url: `${baseUrl}/insights/${blog.slug}`,
    lastModified: new Date(blog.published_at || blog.created_at),
  }));

  const staticRoutes = [
    '',
    '/careers',
    '/insights',
    '/case-studies',
    '/products/modliq',
    '/portal',
    '/trust',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...jobUrls, ...blogUrls];
}
