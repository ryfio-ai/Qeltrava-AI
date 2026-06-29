import { NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validators';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = leadFormSchema.parse(body);

    const webhookUrl = process.env.CRM_WEBHOOK_URL;
    
    if (webhookUrl) {
      // Production path: send to external CRM
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error(`CRM webhook failed: ${response.statusText}`);
      }
    } else {
      // Development path: log to console if no webhook configured
      console.log('CRM_WEBHOOK_URL not configured. Lead data:', validatedData);
    }

    return NextResponse.json({ success: true, message: 'Consultation request received.' }, { status: 200 });
  } catch (error) {
    console.error('Lead submission error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
