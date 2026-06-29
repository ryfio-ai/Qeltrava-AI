import { NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validators';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate payload
    const parsed = leadFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data", details: parsed.error.format() }, { status: 400 });
    }

    // Spam honeypot check
    if (parsed.data.honeypot) {
      return NextResponse.json({ error: "Spam detected" }, { status: 400 });
    }

    // Check if database/email is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Lead storage is not configured on the server." }, { status: 500 });
    }

    // Simulate saving if we had the actual client (without importing supabase-js to save dependencies unless requested)
    // Normally: const supabase = createClient(supabaseUrl, supabaseKey);
    // await supabase.from('leads').insert({...});
    
    // In this production-ready setup, we verify env vars are present as requested:
    // "If no DB configured, return clear server error saying lead storage is not configured"
    // "Do not fake successful submission"
    
    // We will assume that if they are configured, the insertion would happen here.
    // For this build, we mock the success ONLY IF env vars are present, or we can use fetch to REST API:
    
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        source: 'contact_form',
        full_name: parsed.data.fullName,
        email: parsed.data.email,
        company: parsed.data.company,
        role: parsed.data.role,
        website: parsed.data.website,
        project_type: parsed.data.projectType,
        budget_range: parsed.data.budgetRange,
        timeline: parsed.data.timeline,
        message: parsed.data.message,
        consent: parsed.data.consent,
      })
    });

    if (!response.ok) {
      console.error("Supabase insert error", await response.text());
      return NextResponse.json({ error: "Failed to save lead to database." }, { status: 500 });
    }

    // (Optional) Resend email integration would go here

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error("API Error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
