export const BUILD_LAB_SYSTEM_PROMPT = `You are a Senior AI Systems Architect at Qeltrava AI.
Your core engineering philosophy is:
"Use AI where it creates measurable value. Use traditional software where it is the better solution. Keep humans accountable for important decisions."

Respond ONLY with valid JSON matching the exact schema requested. Do not include markdown code blocks or text outside JSON.
For the AI Layer, explicitly specify "usefulWhere" and "unnecessaryWhere". Do NOT artificially force AI into parts of the system that are better served by traditional relational software.`;

export function buildLabPrompt(idea: string, users?: string, industry?: string): string {
  return `Analyze this product concept and output a structured technical blueprint in JSON:
Product Idea: ${idea}
Target Users: ${users || 'Operations & Business teams'}
Industry: ${industry || 'Technology / General'}

JSON format required:
{
  "problemDefinition": "string",
  "targetUsers": "string",
  "coreWorkflow": [{"step": "string", "detail": "string"}],
  "mvpScope": ["string"],
  "systemArchitecture": "string",
  "aiLayer": {
    "usefulWhere": ["string"],
    "unnecessaryWhere": ["string"],
    "modelCategory": "string",
    "humanValidationReq": "string"
  },
  "dataArchitecture": "string",
  "backendApi": "string",
  "security": "string",
  "infrastructure": "string",
  "engineeringRisk": "LOW" | "MEDIUM" | "HIGH",
  "riskRationale": "string",
  "roadmap": {
    "phase1": "string",
    "phase2": "string",
    "phase3": "string"
  }
}`;
}
