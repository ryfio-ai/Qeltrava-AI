import { MVPPlannerInput } from '../validation/schemas';

export interface MVPClassifierResult {
  mvpFeatures: { feature: string; reason: string; complexity: 'Low' | 'Medium' | 'High'; priority: 'P0' | 'P1' }[];
  v2Features: { feature: string; reason: string; complexity: 'Low' | 'Medium' | 'High' }[];
  dontBuildYet: { feature: string; reason: string }[];
  estimatedTeamSize: string;
  engineeringComplexity: 'Low' | 'Medium' | 'High';
  recommendedTimeline: string;
}

export function classifyMVP(input: MVPPlannerInput): MVPClassifierResult {
  const rawFeatures = input.featuresText
    .split(/[\n,;]+/)
    .map(f => f.trim())
    .filter(f => f.length > 2);

  const mvpFeatures = [
    { feature: "User Auth & Tenant Workspace", reason: "Mandatory for data isolation and security.", complexity: "Low" as const, priority: "P0" as const },
    { feature: rawFeatures[0] || "Core Product Workflow", reason: "Primary value proposition for initial users.", complexity: "Medium" as const, priority: "P0" as const },
    ...(rawFeatures.slice(1, 3).map(f => ({
      feature: f,
      reason: "Essential for core MVP usability.",
      complexity: "Medium" as const,
      priority: "P1" as const
    })))
  ];

  const v2Features = [
    ...(rawFeatures.slice(3, 6).map(f => ({
      feature: f,
      reason: "Adds leverage after initial user validation.",
      complexity: "Medium" as const
    }))),
    { feature: "Advanced Analytics & Custom Reports", reason: "Secondary value; build after user traffic stabilizes.", complexity: "High" as const }
  ];

  const dontBuildYet = [
    { feature: "Native Mobile Apps (iOS/Android)", reason: "Responsive Web App is sufficient for initial validation. Saves $30k+ in mobile build costs." },
    { feature: "Multi-Region Cloud Redundancy", reason: "Premature optimization before reaching high concurrent scale." },
    { feature: "Autonomous Unsupervised AI Agents", reason: "High risk & complexity; use Human-in-the-Loop workflows first." }
  ];

  return {
    mvpFeatures,
    v2Features,
    dontBuildYet,
    estimatedTeamSize: "2 - 3 Engineers (1 Full-stack, 1 AI/Backend, 1 Design/Frontend)",
    engineeringComplexity: rawFeatures.length > 5 ? "Medium" : "Low",
    recommendedTimeline: "4 to 8 Weeks for MVP Launch"
  };
}
