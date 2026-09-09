import { AIReadinessInput } from '../validation/schemas';

export interface AIReadinessResult {
  overallScore: number; // 0 - 100
  criteriaScores: {
    manualEffort: number;
    dataAvailability: number;
    decisionComplexity: number;
    repetitiveWorkflow: number;
    predictionOpportunity: number;
    documentVolume: number;
    humanDependency: number;
    automationPotential: number;
  };
  breakdown: {
    prediction: number;
    automation: number;
    documentAI: number;
    generativeAI: number;
    traditionalSoftware: number;
  };
  valueAreas: {
    title: string;
    type: 'AI' | 'Traditional';
    recommendation: string;
    rationale: string;
  }[];
  explanation: string;
}

export function calculateAIReadiness(input: AIReadinessInput): AIReadinessResult {
  // Deterministic scoring matrix
  let manualVal = input.manualEffort?.toLowerCase().includes('high') ? 90 : 60;
  let dataVal = input.dataVolume?.toLowerCase().includes('high') || input.dataVolume?.toLowerCase().includes('large') ? 85 : 65;
  let freqVal = input.frequency?.toLowerCase().includes('daily') || input.frequency?.toLowerCase().includes('realtime') ? 88 : 70;
  let isDoc = input.dataType?.toLowerCase().includes('document') || input.dataType?.toLowerCase().includes('text');

  const criteriaScores = {
    manualEffort: manualVal,
    dataAvailability: dataVal,
    decisionComplexity: 75,
    repetitiveWorkflow: freqVal,
    predictionOpportunity: Math.round((manualVal + dataVal) / 2),
    documentVolume: isDoc ? 85 : 45,
    humanDependency: 70,
    automationPotential: Math.round((manualVal + freqVal) / 2)
  };

  const overallScore = Math.round(
    (criteriaScores.manualEffort * 0.2) +
    (criteriaScores.dataAvailability * 0.2) +
    (criteriaScores.repetitiveWorkflow * 0.2) +
    (criteriaScores.automationPotential * 0.2) +
    (criteriaScores.decisionComplexity * 0.2)
  );

  const breakdown = {
    prediction: Math.min(95, criteriaScores.predictionOpportunity + 5),
    automation: Math.min(98, criteriaScores.automationPotential + 8),
    documentAI: isDoc ? 88 : 42,
    generativeAI: isDoc ? 82 : 55,
    traditionalSoftware: Math.max(30, 100 - overallScore + 20)
  };

  const valueAreas = [
    {
      title: "Intelligent Process Automation",
      type: "AI" as const,
      recommendation: "High Potential for Agentic Workflow",
      rationale: `The process "${input.processName}" exhibits high repetition (${criteriaScores.repetitiveWorkflow}/100) and manual overhead. An AI agent layer can handle triage and initial routing automatically.`
    },
    {
      title: "Core Data & Transaction Ingestion",
      type: "Traditional" as const,
      recommendation: "Use Relational Software (Next.js + PostgreSQL)",
      rationale: "Database storage, user authentication, and transaction logging do not require AI. Traditional software guarantees 100% deterministic ACID compliance."
    },
    {
      title: "Decision Support & Predictive Analytics",
      type: "AI" as const,
      recommendation: "Deploy Fine-tuned Model or RAG Pipeline",
      rationale: "Data volume and decision complexity indicate strong leverage for automated recommendation pipelines with human sign-off."
    }
  ];

  const explanation = `Based on a deterministic evaluation of ${input.companyProduct}'s operational inputs, your process achieves an AI Opportunity Score of ${overallScore}/100. High potential lies in automating repetitive task execution and operational decision support. Traditional software is recommended for audit logs and core database storage to preserve 100% reliability.`;

  return {
    overallScore,
    criteriaScores,
    breakdown,
    valueAreas,
    explanation
  };
}
