import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { InsightsClient } from '@/components/InsightsClient';
import { getBlogPosts } from '@/platform/modules/cms/module';

export const metadata: Metadata = {
  title: 'Insights & Engineering Research | ' + siteConfig.companyName,
  description: 'Engineering intelligence, technical deep-dives, and original research from the Qeltrava AI team.',
};

export default async function InsightsPage() {
  // Fetch CMS blog posts and format them
  const cmsBlogs = await getBlogPosts({ published: true });
  const formattedArticles = cmsBlogs.map(blog => ({
    slug: blog.slug,
    title: blog.title,
    summary: blog.summary || '',
    category: blog.category,
    date: blog.published_at 
      ? new Date(blog.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    readTime: blog.read_time || '5 min read',
    author: blog.author,
    content: typeof blog.content === 'string' ? blog.content.split('\n\n') : blog.content
  }));

  return (
    <main className="min-h-screen bg-[var(--color-bg-white)] pt-32 pb-24">
      <InsightsClient initialArticles={formattedArticles} />
    </main>
  );
}
