import { queryGroq } from './groq';
import { queryOpenRouter } from './openrouter';
import { z } from 'zod';

export type TaskType = 
  | 'build-lab' 
  | 'ai-readiness' 
  | 'mvp-planner' 
  | 'architecture' 
  | 'api-planner' 
  | 'database-planner';

export interface GenerateOptions<T> {
  task: TaskType;
  prompt: string;
  systemPrompt: string;
  schema: z.ZodSchema<T>;
  fallback: () => T;
}

export interface AIResponse<T> {
  success: boolean;
  data: T;
  provider: 'groq' | 'openrouter' | 'deterministic';
  fallbackUsed: boolean;
  generatedAt: string;
}

export async function generateStructuredAI<T>(options: GenerateOptions<T>): Promise<AIResponse<T>> {
  const { task, prompt, systemPrompt, schema, fallback } = options;

  // Determine provider routing order
  const isDeepReasoningTask = task === 'architecture';
  const primaryProvider = isDeepReasoningTask ? 'openrouter' : 'groq';
  const secondaryProvider = isDeepReasoningTask ? 'groq' : 'openrouter';

  // 1. Try Primary Provider
  let rawJson = primaryProvider === 'groq' 
    ? await queryGroq({ prompt, systemPrompt })
    : await queryOpenRouter({ prompt, systemPrompt });

  let parsed = parseAndValidate(rawJson, schema);

  if (parsed.success && parsed.data !== undefined) {
    return {
      success: true,
      data: parsed.data,
      provider: primaryProvider,
      fallbackUsed: false,
      generatedAt: new Date().toISOString()
    };
  }

  // Retry once if JSON was malformed
  if (rawJson && !parsed.success) {
    const retryPrompt = `${prompt}\n\nIMPORTANT: Your previous output failed schema validation. Return strictly valid JSON.`;
    rawJson = primaryProvider === 'groq' 
      ? await queryGroq({ prompt: retryPrompt, systemPrompt })
      : await queryOpenRouter({ prompt: retryPrompt, systemPrompt });
    
    parsed = parseAndValidate(rawJson, schema);
    if (parsed.success && parsed.data !== undefined) {
      return {
        success: true,
        data: parsed.data,
        provider: primaryProvider,
        fallbackUsed: false,
        generatedAt: new Date().toISOString()
      };
    }
  }

  // 2. Try Secondary Provider
  console.warn(`Primary provider (${primaryProvider}) failed for task [${task}]. Falling back to ${secondaryProvider}...`);
  rawJson = secondaryProvider === 'groq'
    ? await queryGroq({ prompt, systemPrompt })
    : await queryOpenRouter({ prompt, systemPrompt });

  parsed = parseAndValidate(rawJson, schema);

  if (parsed.success && parsed.data !== undefined) {
    return {
      success: true,
      data: parsed.data,
      provider: secondaryProvider,
      fallbackUsed: true,
      generatedAt: new Date().toISOString()
    };
  }

  // 3. Final Deterministic Fallback Engine
  console.warn(`Both AI providers failed for task [${task}]. Executing deterministic fallback engine...`);
  return {
    success: true,
    data: fallback(),
    provider: 'deterministic',
    fallbackUsed: true,
    generatedAt: new Date().toISOString()
  };
}

function parseAndValidate<T>(rawJson: string | null, schema: z.ZodSchema<T>): { success: boolean; data?: T } {
  if (!rawJson) return { success: false };
  try {
    const cleaned = rawJson.replace(/```json/g, '').replace(/```/g, '').trim();
    const object = JSON.parse(cleaned);
    const result = schema.safeParse(object);
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      console.warn('Zod Schema Validation Failure:', result.error.issues);
    }
  } catch (err) {
    console.warn('JSON Parse Error:', err);
  }
  return { success: false };
}
