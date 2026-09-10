import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://qeltrava.ai';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/portal/'],
      },
      // Explicit AI Crawlers & Search Engines (SearchGPT, Perplexity, Claude, ChatGPT, Gemini, Copilot)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'Google-Extended',
          'SearchGPT',
          'Amazonbot',
          'Bytespider',
          'FacebookBot',
          'Applebot-Extended',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/admin/', '/api/', '/portal/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
