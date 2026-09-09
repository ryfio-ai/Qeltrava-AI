import { AI_CONFIG } from './config';

export interface AIRequestPayload {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

export async function queryGroq(payload: AIRequestPayload): Promise<string | null> {
  const apiKey = AI_CONFIG.groq.apiKey;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.groq.timeoutMs);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: AI_CONFIG.groq.model,
        messages: [
          ...(payload.systemPrompt ? [{ role: 'system', content: payload.systemPrompt }] : []),
          { role: 'user', content: payload.prompt }
        ],
        max_tokens: payload.maxTokens || AI_CONFIG.groq.maxTokens,
        temperature: payload.temperature ?? AI_CONFIG.groq.temperature,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Groq API returned HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`Groq API error or timeout:`, err?.name === 'AbortError' ? 'Timeout' : err?.message);
    return null;
  }
}
