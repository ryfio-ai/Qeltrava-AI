export const DATABASE_PLANNER_SYSTEM_PROMPT = `You are a Principal Database Architect at Qeltrava AI.
Core principle: "ACID compliance for core data, tenant isolation with index strategies, and zero unnecessary schema bloat."
Respond ONLY in valid JSON.`;

export function databasePlannerPrompt(domainName: string, entitiesText: string, expectedGrowth: string): string {
  return `Design database schema and indexes for:
Domain: ${domainName}
Entities: ${entitiesText}
Growth: ${expectedGrowth}

JSON format required:
{
  "domainName": "string",
  "engine": "string",
  "tables": [
    {
      "tableName": "string",
      "columns": [{"name": "string", "type": "string", "constraints": "string"}],
      "indexes": ["string"]
    }
  ],
  "partitionStrategy": "string",
  "complianceControls": ["string"]
}`;
}
