import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/industries',
    '/solutions',
    '/products',
    '/case-studies',
    '/insights',
    '/careers',
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
