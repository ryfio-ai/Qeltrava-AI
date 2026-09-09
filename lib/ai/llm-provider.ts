/**
 * LLM Provider for Qeltrava AI Platform & Builder Lab.
 * Supports OpenRouter and Groq APIs with fast deterministic fallbacks.
 */

export interface LLMRequestOptions {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  provider?: 'openrouter' | 'groq' | 'auto';
}

export async function callLLM(options: LLMRequestOptions): Promise<string | null> {
  const { prompt, systemPrompt, maxTokens = 1000, temperature = 0.3, provider = 'auto' } = options;

  const openrouterKey = process.env.OPENROUTER_API_KEY;
  const groqKey = process.env.GROQ_API_KEY;

  // Try Groq if selected or auto
  if ((provider === 'groq' || provider === 'auto') && groqKey) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${groqKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
            { role: 'user', content: prompt }
          ],
          max_tokens: maxTokens,
          temperature
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || null;
      }
    } catch (err) {
      console.warn('Groq API call failed, falling back...', err);
    }
  }

  // Try OpenRouter if selected or auto
  if ((provider === 'openrouter' || provider === 'auto') && openrouterKey) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterKey}`,
          'HTTP-Referer': 'https://qeltravaai.vercel.app',
          'X-Title': 'Qeltrava AI Platform',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o-mini',
          messages: [
            ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
            { role: 'user', content: prompt }
          ],
          max_tokens: maxTokens,
          temperature
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content || null;
      }
    } catch (err) {
      console.warn('OpenRouter API call failed, falling back...', err);
    }
  }

  return null;
}
