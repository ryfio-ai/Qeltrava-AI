/**
 * Central AI Provider Configuration for Qeltrava AI Platform & Builder Lab.
 * Environment variables dictate model selection; safe server-side defaults are provided.
 */

export const AI_CONFIG = {
  groq: {
    apiKey: process.env.GROQ_API_KEY || '',
    model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
    timeoutMs: 8000,
    maxTokens: 1200,
    temperature: 0.3,
  },
  openrouter: {
    apiKey: process.env.OPENROUTER_API_KEY || '',
    model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
    timeoutMs: 12000,
    maxTokens: 1500,
    temperature: 0.3,
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_STUDIO_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    timeoutMs: 8000,
    maxTokens: 1200,
    temperature: 0.3,
  },
  aimlapi: {
    apiKey: process.env.AIMLAPI_API_KEY || '',
    model: process.env.AIMLAPI_MODEL || 'openai/gpt-4o-mini',
    timeoutMs: 12000,
    maxTokens: 1500,
    temperature: 0.3,
  },
  cerebras: {
    apiKey: process.env.CEREBRAS_API_KEY || '',
    model: process.env.CEREBRAS_MODEL || 'llama3.1-70b',
    timeoutMs: 6000, // Ultra-fast hardware inference
    maxTokens: 1200,
    temperature: 0.3,
  },
  retryLimit: 1,
};
