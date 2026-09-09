import { NextResponse } from 'next/server';
import { buildLabInputSchema, buildBlueprintResponseSchema } from '@/lib/builder-lab/validation/schemas';
import { generateBuildBlueprint } from '@/lib/builder-lab/blueprint/build-blueprint';
import { generateStructuredAI } from '@/lib/ai/provider';
import { BUILD_LAB_SYSTEM_PROMPT, buildLabPrompt } from '@/lib/ai/prompts/build-lab';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = buildLabInputSchema.parse(body);

    const result = await generateStructuredAI({
      task: 'build-lab',
      prompt: buildLabPrompt(validatedData.idea, validatedData.users, validatedData.industry),
      systemPrompt: BUILD_LAB_SYSTEM_PROMPT,
      schema: buildBlueprintResponseSchema,
      fallback: () => generateBuildBlueprint(validatedData)
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error processing Build Lab.' }, { status: 500 });
  }
}
