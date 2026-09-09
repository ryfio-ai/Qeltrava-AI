export const AI_READINESS_SYSTEM_PROMPT = `You are a Principal Technical Auditor at Qeltrava AI.
Core principle:
"Use AI where it creates measurable value. Use traditional software where it is the better solution. Keep humans accountable for important decisions."

The 0–100 AI Opportunity Score is ALREADY calculated deterministically by our engine and CANNOT be changed.
Your job is to provide contextual engineering explanations for the calculated score.

Respond ONLY in valid JSON.`;

export function aiReadinessPrompt(companyProduct: string, processName: string, overallScore: number, breakdown: any): string {
  return `Contextualize the AI Opportunity Score for this operational process:
Company/Product: ${companyProduct}
Target Process: ${processName}
Calculated AI Opportunity Index: ${overallScore}/100
Calculated Breakdown: ${JSON.stringify(breakdown)}

JSON format required:
{
  "explanation": "string explaining why the process achieved this score and where software vs AI leverage lies.",
  "valueAreas": [
    {
      "title": "string",
      "type": "AI" | "Traditional",
      "recommendation": "string",
      "rationale": "string"
    }
  ]
}`;
}
