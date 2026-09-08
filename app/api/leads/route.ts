import { NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validators';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = leadFormSchema.parse(body);

    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.CRM_WEBHOOK_URL;
    
    if (webhookUrl) {
      // Production path: send lead directly to Google Sheets / CRM webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...validatedData,
          submitted_at: new Date().toISOString(),
          source: 'Qeltrava AI Website'
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook dispatch failed: ${response.statusText}`);
      }
    } else {
      console.warn('Neither GOOGLE_SHEETS_WEBHOOK_URL nor CRM_WEBHOOK_URL is configured. Lead logged locally.');
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
