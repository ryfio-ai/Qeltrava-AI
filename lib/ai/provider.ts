import { queryGroq } from './groq';
import { queryOpenRouter } from './openrouter';
import { queryGemini } from './gemini';
import { queryAIMLAPI } from './aimlapi';
import { queryCerebras } from './cerebras';
import { z } from 'zod';

export type TaskType = 
  | 'build-lab' 
  | 'ai-readiness' 
  | 'mvp-planner' 
  | 'architecture' 
  | 'api-planner' 
  | 'database-planner';

export type ProviderName = 'cerebras' | 'groq' | 'gemini' | 'aimlapi' | 'openrouter' | 'deterministic';

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
  provider: ProviderName;
  fallbackUsed: boolean;
  generatedAt: string;
}

export async function generateStructuredAI<T>(options: GenerateOptions<T>): Promise<AIResponse<T>> {
  const { task, prompt, systemPrompt, schema, fallback } = options;

  // Determine priority chain based on task type
  const isDeepReasoningTask = task === 'architecture';
  const providerChain: ProviderName[] = isDeepReasoningTask
    ? ['openrouter', 'aimlapi', 'gemini', 'cerebras', 'groq']
    : ['cerebras', 'groq', 'gemini', 'openrouter', 'aimlapi'];

  // Iterate through provider chain
  for (let i = 0; i < providerChain.length; i++) {
    const provider = providerChain[i];
    const rawJson = await fetchFromProvider(provider, prompt, systemPrompt);

    if (rawJson) {
      let parsed = parseAndValidate(rawJson, schema);

      // Retry once with schema correction if JSON was malformed
      if (!parsed.success) {
        const retryPrompt = `${prompt}\n\nIMPORTANT: Your previous output failed JSON schema validation. Return strictly valid JSON matching the schema.`;
        const retryRaw = await fetchFromProvider(provider, retryPrompt, systemPrompt);
        parsed = parseAndValidate(retryRaw, schema);
      }

      if (parsed.success && parsed.data !== undefined) {
        return {
          success: true,
          data: parsed.data,
          provider,
          fallbackUsed: i > 0,
          generatedAt: new Date().toISOString()
        };
      }
    }
  }

  // Final Deterministic Fallback Engine if all AI providers fail or are unavailable
  console.warn(`All AI providers in chain failed for task [${task}]. Executing deterministic fallback engine...`);
  return {
    success: true,
    data: fallback(),
    provider: 'deterministic',
    fallbackUsed: true,
    generatedAt: new Date().toISOString()
  };
}

async function fetchFromProvider(provider: ProviderName, prompt: string, systemPrompt: string): Promise<string | null> {
  const payload = { prompt, systemPrompt };
  switch (provider) {
    case 'cerebras':
      return await queryCerebras(payload);
    case 'groq':
      return await queryGroq(payload);
    case 'gemini':
      return await queryGemini(payload);
    case 'aimlapi':
      return await queryAIMLAPI(payload);
    case 'openrouter':
      return await queryOpenRouter(payload);
    default:
      return null;
  }
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
