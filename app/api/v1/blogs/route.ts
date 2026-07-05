// app/api/v1/blogs/route.ts
// Headless public REST API gateway: retrieve published blogs

import { NextResponse } from 'next/server';
import { getBlogs } from '@/platform/shared/actions';

export async function GET() {
  try {
    const blogs = await getBlogs();
    
    return NextResponse.json({
      success: true,
      count: blogs.length,
      data: blogs.map(b => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        summary: b.summary || null,
        category: b.category,
        author: b.author,
        read_time: b.read_time || null,
        published_date: b.published_at || b.created_at
      }))
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to retrieve blogs.' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
