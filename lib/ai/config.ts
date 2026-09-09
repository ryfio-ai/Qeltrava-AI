/**
 * Central AI Provider Configuration for Qeltrava AI Platform & Builder Lab.
 * Environment variables dictate model selection; safe server-side defaults are provided.
 */

export const AI_CONFIG = {
  groq: {
    apiKey: process.env.GROQ_API_KEY || '',
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    timeoutMs: 8000, // 8s fast timeout
    maxTokens: 1200,
    temperature: 0.3,
  },
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY || '',
    model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
    timeoutMs: 12000, // 12s timeout for deeper reasoning
    maxTokens: 1500,
    temperature: 0.3,
  },
  retryLimit: 1,
};
