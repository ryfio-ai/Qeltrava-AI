// app/robots.ts
// Robots configuration for Next.js SEO index permissions

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qeltrava.ai';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/portal/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
