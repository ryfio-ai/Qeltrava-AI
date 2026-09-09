import { AI_CONFIG } from './config';
import { AIRequestPayload } from './groq';

export async function queryGemini(payload: AIRequestPayload): Promise<string | null> {
  const apiKey = AI_CONFIG.gemini.apiKey;
  if (!apiKey) return null;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.gemini.timeoutMs);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${AI_CONFIG.gemini.model}:generateContent`;
    const promptText = `${payload.systemPrompt ? payload.systemPrompt + '\n\n' : ''}${payload.prompt}\n\nIMPORTANT: Respond strictly with valid JSON. Do not include markdown codeblocks or plain text.`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          temperature: payload.temperature ?? AI_CONFIG.gemini.temperature,
          maxOutputTokens: payload.maxTokens || AI_CONFIG.gemini.maxTokens,
          responseMimeType: 'application/json'
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Gemini API returned HTTP ${response.status}`);
      return null;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn(`Gemini API error or timeout:`, err?.name === 'AbortError' ? 'Timeout' : err?.message);
    return null;
  }
}
