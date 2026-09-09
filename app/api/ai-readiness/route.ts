import { NextResponse } from 'next/server';
import { aiReadinessInputSchema, aiReadinessResponseSchema } from '@/lib/builder-lab/validation/schemas';
import { calculateAIReadiness } from '@/lib/builder-lab/scoring/ai-readiness';
import { generateStructuredAI } from '@/lib/ai/provider';
import { AI_READINESS_SYSTEM_PROMPT, aiReadinessPrompt } from '@/lib/ai/prompts/ai-readiness';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = aiReadinessInputSchema.parse(body);

    // 1. Calculate score 100% deterministically
    const deterministicResult = calculateAIReadiness(validatedData);

    // 2. Enrich explanation using AI provider
    const aiEnrichment = await generateStructuredAI({
      task: 'ai-readiness',
      prompt: aiReadinessPrompt(
        validatedData.companyProduct, 
        validatedData.processName, 
        deterministicResult.overallScore, 
        deterministicResult.breakdown
      ),
      systemPrompt: AI_READINESS_SYSTEM_PROMPT,
      schema: aiReadinessResponseSchema,
      fallback: () => ({
        explanation: deterministicResult.explanation,
        valueAreas: deterministicResult.valueAreas
      })
    });

    // 3. Combine score (100% deterministic) with explanation
    const finalResult = {
      ...deterministicResult,
      explanation: aiEnrichment.data.explanation,
      valueAreas: aiEnrichment.data.valueAreas
    };

    return NextResponse.json({
      success: true,
      data: finalResult,
      provider: aiEnrichment.provider,
      fallbackUsed: aiEnrichment.fallbackUsed,
      generatedAt: aiEnrichment.generatedAt
    }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error processing AI Readiness.' }, { status: 500 });
  }
}
