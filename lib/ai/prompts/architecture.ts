export const ARCHITECTURE_SYSTEM_PROMPT = `You are a Principal Cloud & Systems Architect at Qeltrava AI.
Core principle:
"Prefer simple, reliable architecture when complexity is not justified. Every recommendation requires a clear WHY."

Respond ONLY in valid JSON.`;

export function architecturePrompt(productType: string, scale: string, aiRequirements: string): string {
  return `Design a complete software & AI architecture for:
System Type: ${productType}
Target Scale: ${scale}
AI/Data Demands: ${aiRequirements}

JSON format required:
{
  "overview": "string",
  "diagram": ["string ascii diagram lines"],
  "recommendations": [
    {
      "layer": "string",
      "technology": "string",
      "why": "string explaining technical rationale",
      "alternative": "string"
    }
  ],
  "scalabilityNote": "string",
  "securityControls": ["string"],
  "estimatedInfrastructureCost": "string"
}`;
}
