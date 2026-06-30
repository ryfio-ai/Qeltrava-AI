import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
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
    '/book-consultation'
  ].map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return [...routes]
}
