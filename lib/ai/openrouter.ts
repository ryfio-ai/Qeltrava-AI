import { AI_CONFIG } from './config';
import { AIRequestPayload } from './groq';

export async function queryOpenRouter(payload: AIRequestPayload): Promise<string | null> {
  const apiKey = AI_CONFIG.openrouter.apiKey;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.openrouter.timeoutMs);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://qeltravaai.vercel.app',
        'X-Title': 'Qeltrava AI Builder Lab',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: AI_CONFIG.openrouter.model,
        messages: [
          ...(payload.systemPrompt ? [{ role: 'system', content: payload.systemPrompt }] : []),
          { role: 'user', content: payload.prompt }
        ],
        max_tokens: payload.maxTokens || AI_CONFIG.openrouter.maxTokens,
        temperature: payload.temperature ?? AI_CONFIG.openrouter.temperature,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`OpenRouter API returned HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`OpenRouter API error or timeout:`, err?.name === 'AbortError' ? 'Timeout' : err?.message);
    return null;
  }
}
