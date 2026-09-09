export const API_PLANNER_SYSTEM_PROMPT = `You are a Lead API Engineer at Qeltrava AI.
Core principle: "Type-safe, clean REST/OpenAPI contracts with explicit Zod boundary validation and auth boundaries."
Respond ONLY in valid JSON.`;

export function apiPlannerPrompt(serviceName: string, entitiesText: string, authType: string): string {
  return `Design RESTful API routes for:
Service Name: ${serviceName}
Entities: ${entitiesText}
Authentication: ${authType}

JSON format required:
{
  "serviceName": "string",
  "authType": "string",
  "rateLimit": "string",
  "endpoints": [{"method": "GET"|"POST"|"PATCH"|"DELETE", "path": "string", "description": "string"}],
  "recommendedFormat": "string",
  "securityHeader": "string"
}`;
}
