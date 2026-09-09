import { z } from 'zod';

export const buildLabInputSchema = z.object({
  idea: z.string().min(5, "Please describe your product idea in at least 5 characters.").max(1000),
  users: z.string().max(300).optional(),
  industry: z.string().max(200).optional(),
  teamSize: z.string().max(100).optional(),
  budget: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
});

export const aiReadinessInputSchema = z.object({
  companyProduct: z.string().min(3).max(500),
  processName: z.string().min(3).max(500),
  dataVolume: z.string().default("Medium"),
  dataType: z.string().default("Structured & Text"),
  frequency: z.string().default("Daily"),
  manualEffort: z.string().default("High"),
  targetOutcome: z.string().max(500).optional(),
});

export const mvpPlannerInputSchema = z.object({
  productIdea: z.string().min(5).max(1000),
  featuresText: z.string().min(5, "List at least 1 feature").max(2000),
  targetAudience: z.string().max(300).optional(),
});

export const architectureInputSchema = z.object({
  productType: z.string().min(3).max(300),
  scale: z.string().default("Medium (10k-100k users)"),
  dataRequirements: z.string().default("Relational & Real-time"),
  aiRequirements: z.string().default("RAG & LLM Agents"),
  securityRequirements: z.string().default("Standard Enterprise (SOC2 Target)"),
});

export const apiPlannerInputSchema = z.object({
  serviceName: z.string().min(3).max(300),
  entitiesText: z.string().min(3).max(1000),
  authType: z.string().default("JWT / OAuth2"),
  clientTypes: z.string().default("Web & Mobile App"),
});

export const databasePlannerInputSchema = z.object({
  domainName: z.string().min(3).max(300),
  entitiesText: z.string().min(3).max(1000),
  expectedGrowth: z.string().default("Medium (1M rows/mo)"),
  compliance: z.string().default("Standard (GDPR Ready)"),
});

// Output Validation Schemas
export const buildBlueprintResponseSchema = z.object({
  problemDefinition: z.string(),
  targetUsers: z.string(),
  coreWorkflow: z.array(z.object({ step: z.string(), detail: z.string() })),
  mvpScope: z.array(z.string()),
  systemArchitecture: z.string(),
  aiLayer: z.object({
    usefulWhere: z.array(z.string()),
    unnecessaryWhere: z.array(z.string()),
    modelCategory: z.string(),
    humanValidationReq: z.string()
  }),
  dataArchitecture: z.string(),
  backendApi: z.string(),
  security: z.string(),
  infrastructure: z.string(),
  engineeringRisk: z.enum(["LOW", "MEDIUM", "HIGH"]),
  riskRationale: z.string(),
  roadmap: z.object({
    phase1: z.string(),
    phase2: z.string(),
    phase3: z.string()
  })
});

export const aiReadinessResponseSchema = z.object({
  explanation: z.string(),
  valueAreas: z.array(z.object({
    title: z.string(),
    type: z.enum(["AI", "Traditional"]),
    recommendation: z.string(),
    rationale: z.string()
  }))
});

export const mvpClassifierResponseSchema = z.object({
  mvpFeatures: z.array(z.object({
    feature: z.string(),
    reason: z.string(),
    complexity: z.enum(["Low", "Medium", "High"]),
    priority: z.enum(["P0", "P1"])
  })),
  v2Features: z.array(z.object({
    feature: z.string(),
    reason: z.string(),
    complexity: z.enum(["Low", "Medium", "High"])
  })),
  dontBuildYet: z.array(z.object({
    feature: z.string(),
    reason: z.string()
  })),
  estimatedTeamSize: z.string(),
  engineeringComplexity: z.enum(["Low", "Medium", "High"]),
  recommendedTimeline: z.string()
});

export const architectureResponseSchema = z.object({
  overview: z.string(),
  diagram: z.array(z.string()),
  recommendations: z.array(z.object({
    layer: z.string(),
    technology: z.string(),
    why: z.string(),
    alternative: z.string()
  })),
  scalabilityNote: z.string(),
  securityControls: z.array(z.string()),
  estimatedInfrastructureCost: z.string()
});

export const apiPlannerResponseSchema = z.object({
  serviceName: z.string(),
  authType: z.string(),
  rateLimit: z.string(),
  endpoints: z.array(z.object({
    method: z.enum(["GET", "POST", "PATCH", "DELETE"]),
    path: z.string(),
    description: z.string()
  })),
  recommendedFormat: z.string(),
  securityHeader: z.string()
});

export const databasePlannerResponseSchema = z.object({
  domainName: z.string(),
  engine: z.string(),
  tables: z.array(z.object({
    tableName: z.string(),
    columns: z.array(z.object({
      name: z.string(),
      type: z.string(),
      constraints: z.string()
    })),
    indexes: z.array(z.string())
  })),
  partitionStrategy: z.string(),
  complianceControls: z.array(z.string())
});

export type BuildLabInput = z.infer<typeof buildLabInputSchema>;
export type AIReadinessInput = z.infer<typeof aiReadinessInputSchema>;
export type MVPPlannerInput = z.infer<typeof mvpPlannerInputSchema>;
export type ArchitectureInput = z.infer<typeof architectureInputSchema>;
export type APIPlannerInput = z.infer<typeof apiPlannerInputSchema>;
export type DatabasePlannerInput = z.infer<typeof databasePlannerInputSchema>;
