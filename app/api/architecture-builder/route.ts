import { NextResponse } from 'next/server';
import { architectureInputSchema, architectureResponseSchema } from '@/lib/builder-lab/validation/schemas';
import { generateArchitecture } from '@/lib/builder-lab/architecture/architecture-engine';
import { generateStructuredAI } from '@/lib/ai/provider';
import { ARCHITECTURE_SYSTEM_PROMPT, architecturePrompt } from '@/lib/ai/prompts/architecture';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = architectureInputSchema.parse(body);

    const result = await generateStructuredAI({
      task: 'architecture',
      prompt: architecturePrompt(validatedData.productType, validatedData.scale, validatedData.aiRequirements),
      systemPrompt: ARCHITECTURE_SYSTEM_PROMPT,
      schema: architectureResponseSchema,
      fallback: () => generateArchitecture(validatedData)
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error processing Architecture Builder.' }, { status: 500 });
  }
}
