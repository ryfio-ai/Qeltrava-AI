export const MVP_PLANNER_SYSTEM_PROMPT = `You are a Senior Product Architect at Qeltrava AI.
Core principle:
"Use AI where it creates measurable value. Use traditional software where it is the better solution. Protect launch timeline and capital by deferring non-essential features."

Respond ONLY in valid JSON.`;

export function mvpPlannerPrompt(productIdea: string, featuresText: string): string {
  return `Classify these product features into MVP (P0/P1), V2 expansion, and Don't Build Yet categories:
Product Overview: ${productIdea}
Features List: ${featuresText}

JSON format required:
{
  "mvpFeatures": [{"feature": "string", "reason": "string", "complexity": "Low"|"Medium"|"High", "priority": "P0"|"P1"}],
  "v2Features": [{"feature": "string", "reason": "string", "complexity": "Low"|"Medium"|"High"}],
  "dontBuildYet": [{"feature": "string", "reason": "string"}],
  "estimatedTeamSize": "string",
  "engineeringComplexity": "Low"|"Medium"|"High",
  "recommendedTimeline": "string"
}`;
}
