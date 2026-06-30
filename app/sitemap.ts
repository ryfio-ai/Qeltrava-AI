import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { routing } from '@/src/routing'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = [
    '',
    '/about',
    '/services',
    '/services/ai-automation',
    '/services/cloud-devops',
    '/services/cybersecurity',
    '/services/data-analytics',
    '/services/product-engineering',
    '/services/saas-development',
    '/industries',
    '/industries/fintech',
    '/industries/healthcare',
    '/industries/logistics',
    '/industries/saas',
    '/solutions',
    '/solutions/ai-customer-service-transformation',
    '/solutions/ai-operations-automation',
    '/solutions/legacy-modernization',
    '/products',
    '/case-studies',
    '/insights',
    '/contact',
    '/book-consultation',
    '/security',
    '/accessibility',
    '/cookie-policy',
    '/government'
  ];

  const routes: MetadataRoute.Sitemap = [];

  routing.locales.forEach((locale) => {
    baseRoutes.forEach((route) => {
      routes.push({
        url: `${siteConfig.baseUrl}/${locale}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
      });
    });
  });

  return routes;
}
