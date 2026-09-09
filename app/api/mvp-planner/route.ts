import { NextResponse } from 'next/server';
import { mvpPlannerInputSchema, mvpClassifierResponseSchema } from '@/lib/builder-lab/validation/schemas';
import { classifyMVP } from '@/lib/builder-lab/mvp/mvp-classifier';
import { generateStructuredAI } from '@/lib/ai/provider';
import { MVP_PLANNER_SYSTEM_PROMPT, mvpPlannerPrompt } from '@/lib/ai/prompts/mvp-planner';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = mvpPlannerInputSchema.parse(body);

    const result = await generateStructuredAI({
      task: 'mvp-planner',
      prompt: mvpPlannerPrompt(validatedData.productIdea, validatedData.featuresText),
      systemPrompt: MVP_PLANNER_SYSTEM_PROMPT,
      schema: mvpClassifierResponseSchema,
      fallback: () => classifyMVP(validatedData)
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error processing MVP Planner.' }, { status: 500 });
  }
}
