import { AI_CONFIG } from './config';
import { AIRequestPayload } from './groq';

export async function queryAIMLAPI(payload: AIRequestPayload): Promise<string | null> {
  const apiKey = AI_CONFIG.aimlapi.apiKey;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.aimlapi.timeoutMs);

  try {
    const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: AI_CONFIG.aimlapi.model,
        messages: [
          ...(payload.systemPrompt ? [{ role: 'system', content: payload.systemPrompt }] : []),
          { role: 'user', content: payload.prompt }
        ],
        max_tokens: payload.maxTokens || AI_CONFIG.aimlapi.maxTokens,
        temperature: payload.temperature ?? AI_CONFIG.aimlapi.temperature,
        response_format: { type: 'json_object' }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`AIML API returned HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`AIML API error or timeout:`, err?.name === 'AbortError' ? 'Timeout' : err?.message);
    return null;
  }
}
