// app/api/v1/jobs/route.ts
// Headless public REST API gateway: retrieve published open careers

import { NextResponse } from 'next/server';
import { getJobs } from '@/platform/shared/actions';

export async function GET() {
  try {
    const jobs = await getJobs();
    const published = jobs.filter(j => j.status === 'Published');
    
    return NextResponse.json({
      success: true,
      count: published.length,
      data: published.map(j => ({
        id: j.id,
        title: j.title,
        slug: j.slug,
        department: j.department,
        location: j.location,
        employment_type: j.employment_type,
        salary: j.salary || null,
        description: j.description,
        tech_stack: j.tech_stack,
        responsibilities: j.responsibilities,
        requirements: j.requirements,
        posted_date: j.created_at
      }))
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: 'Failed to retrieve jobs.' }, { status: 500 });
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
