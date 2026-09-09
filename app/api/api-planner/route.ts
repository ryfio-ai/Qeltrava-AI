import { NextResponse } from 'next/server';
import { apiPlannerInputSchema, apiPlannerResponseSchema } from '@/lib/builder-lab/validation/schemas';
import { generateStructuredAI } from '@/lib/ai/provider';
import { API_PLANNER_SYSTEM_PROMPT, apiPlannerPrompt } from '@/lib/ai/prompts/api-planner';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = apiPlannerInputSchema.parse(body);

    const fallbackFn = () => {
      const entities = input.entitiesText.split(/[\n,;]+/).map(e => e.trim()).filter(Boolean);
      const endpoints = entities.flatMap(entity => {
        const slug = entity.toLowerCase().replace(/\s+/g, '-');
        return [
          { method: 'GET' as const, path: `/api/v1/${slug}s`, description: `List and search ${entity} records.` },
          { method: 'POST' as const, path: `/api/v1/${slug}s`, description: `Create new ${entity} entity.` },
          { method: 'GET' as const, path: `/api/v1/${slug}s/:id`, description: `Fetch single ${entity} record by UUID.` },
          { method: 'PATCH' as const, path: `/api/v1/${slug}s/:id`, description: `Update ${entity} parameters.` },
          { method: 'DELETE' as const, path: `/api/v1/${slug}s/:id`, description: `Soft-delete ${entity} record.` }
        ];
      });
      return {
        serviceName: input.serviceName,
        authType: input.authType,
        rateLimit: '100 requests / minute per tenant',
        endpoints,
        recommendedFormat: 'JSON over HTTPS (RESTful) + OpenAPI 3.0 specification',
        securityHeader: `Authorization: Bearer <${input.authType.toLowerCase().includes('jwt') ? 'JWT_TOKEN' : 'API_KEY'}>`
      };
    };

    const result = await generateStructuredAI({
      task: 'api-planner',
      prompt: apiPlannerPrompt(input.serviceName, input.entitiesText, input.authType),
      systemPrompt: API_PLANNER_SYSTEM_PROMPT,
      schema: apiPlannerResponseSchema,
      fallback: fallbackFn
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error processing API Planner.' }, { status: 500 });
  }
}
