// lib/talent-evaluator.ts
// Core evaluation, scoring, triage prioritization, and project matching engine for Qeltrava AI

import { TalentProfileFormValues, TaskEvaluationRubricValues, InterviewEvaluationValues } from './validators';

export interface TriageResult {
  score: number; // 0 - 100 triage prioritization score
  recommendedTrack: string;
  recommendedTaskSlug: string;
}

export interface NoGoResult {
  passed: boolean;
  reasons: string[];
}

export interface ProjectMatchResult {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  isAvailable: boolean;
}

/**
 * Calculates initial Triage Score (0-100) strictly for reviewer prioritization.
 * Note: Triage Score is NEVER used for automatic hiring decisions or rejections.
 */
export function calculateTriageScore(data: TalentProfileFormValues): TriageResult {
  let score = 0;

  // 1. Technical Level (Max 25 pts)
  if (data.technicalLevel === 'Advanced') score += 25;
  else if (data.technicalLevel === 'Intermediate → Advanced') score += 20;
  else if (data.technicalLevel === 'Intermediate') score += 15;
  else if (data.technicalLevel === 'Beginner → Intermediate') score += 10;
  else score += 5;

  // 2. Practical Experience (Max 20 pts)
  if (data.yearsExperience === '2+ years') score += 20;
  else if (data.yearsExperience === '1–2 years') score += 15;
  else if (data.yearsExperience === '6–12 months') score += 10;
  else if (data.yearsExperience === 'Less than 6 months') score += 5;

  // 3. Deployed Production Experience & Real Client Work (Max 20 pts)
  if (data.builtProductionProject === 'Yes') score += 10;
  if (data.workedRealClient === 'Yes') score += 10;

  // 4. AI-Assisted Workflow Maturity (Max 15 pts)
  if (data.useAiTools === 'Yes') {
    score += 5;
    const aiTools = data.aiToolsList || [];
    if (aiTools.includes('Cursor') || aiTools.includes('Windsurf') || aiTools.includes('Antigravity') || aiTools.includes('GitHub Copilot')) {
      score += 5; // Modern AI IDE usage
    }
    if (data.aiWorkflowDesc && data.aiWorkflowDesc.length > 50) {
      score += 5; // Detailed workflow description
    }
  }

  // 5. Weekly Contribution Commitment (Max 15 pts)
  if (data.weeklyHours === '30+ hours') score += 15;
  else if (data.weeklyHours === '20–30 hours') score += 12;
  else if (data.weeklyHours === '10–20 hours') score += 9;
  else if (data.weeklyHours === '5–10 hours') score += 5;
  else score += 2;

  // 6. Project & Problem Description Depth (Max 5 pts)
  if (data.bestProjects && data.bestProjects.length > 60) score += 3;
  if (data.difficultProblemDesc && data.difficultProblemDesc.length > 60) score += 2;

  score = Math.min(100, Math.max(0, score));

  // Determine recommended task track based on Primary Interest
  let recommendedTrack = 'Full-Stack Development';
  let recommendedTaskSlug = 'fullstack-nextjs-supabase-task';

  const interest = data.primaryInterest.toLowerCase();
  if (interest.includes('ai') || interest.includes('machine learning') || interest.includes('data science')) {
    recommendedTrack = 'AI / ML & Agents';
    recommendedTaskSlug = 'ai-agent-rag-pipeline-task';
  } else if (interest.includes('frontend') || interest.includes('ui/ux')) {
    recommendedTrack = 'Frontend & Product UI';
    recommendedTaskSlug = 'frontend-react-tailwind-task';
  } else if (interest.includes('backend') || interest.includes('python') || interest.includes('devops')) {
    recommendedTrack = 'Backend Infrastructure';
    recommendedTaskSlug = 'backend-fastapi-postgres-task';
  } else if (interest.includes('data engineering') || interest.includes('analytics')) {
    recommendedTrack = 'Data Engineering';
    recommendedTaskSlug = 'data-pipeline-etl-task';
  }

  return {
    score,
    recommendedTrack,
    recommendedTaskSlug
  };
}

/**
 * Calculates Task Rubric Score scaled to 45 max points.
 * Rubric Inputs: Functional Correctness (25%), Code Quality (15%), Architecture (15%),
 * Problem Solving (15%), UI/UX (10%), Testing (10%), Documentation (5%), AI Understanding (5%).
 */
export function calculateTaskRubricScore(rubric: TaskEvaluationRubricValues): number {
  // Input raw percentages / values
  const funcPct = (rubric.functionalScore / 25) * 100;
  const qualityPct = (rubric.codeQualityScore / 15) * 100;
  const archPct = (rubric.architectureScore / 15) * 100;
  const problemPct = (rubric.problemSolvingScore / 15) * 100;
  const uiPct = (rubric.uiUxScore / 10) * 100;
  const testPct = (rubric.testingScore / 10) * 100;
  const docPct = (rubric.documentationScore / 5) * 100;
  const aiPct = (rubric.aiUnderstandingScore / 5) * 100;

  // Standardized 100% composite
  const compositePct = 
    (funcPct * 0.25) +
    (qualityPct * 0.15) +
    (archPct * 0.15) +
    (problemPct * 0.15) +
    (uiPct * 0.10) +
    (testPct * 0.10) +
    (docPct * 0.05) +
    (aiPct * 0.05);

  // Scaled to 45 points max
  const taskScore45 = (compositePct / 100) * 45;
  return Math.round(taskScore45 * 100) / 100;
}

/**
 * Calculates One-on-One Interview Score out of 35 max points.
 * Technical Understanding (20 pts), Communication (10 pts), Reliability & Ownership (5 pts).
 */
export function calculateInterviewScore(interview: InterviewEvaluationValues): number {
  const score = interview.technicalUnderstandingScore + interview.communicationScore + interview.reliabilityOwnershipScore;
  return Math.min(35, Math.max(0, score));
}

/**
 * Calculates Final Overall Composite Score out of 100 points:
 * Final Score = Background (20 pts) + Task Rubric (45 pts) + Interview (35 pts)
 */
export function calculateFinalScore(backgroundScore: number, taskScore: number, interviewScore: number): number {
  const bg = Math.min(20, Math.max(0, backgroundScore));
  const task = Math.min(45, Math.max(0, taskScore));
  const interview = Math.min(35, Math.max(0, interviewScore));
  return Math.round((bg + task + interview) * 100) / 100;
}

/**
 * Evaluates mandatory "No-Go" hard gate conditions for PROJECT_READY selection.
 */
export function checkNoGoConditions(params: {
  taskScoreOut45: number;
  technicalUnderstandingScoreOut20: number;
  hasSecurityIssues: boolean;
  hasPlagiarism: boolean;
  interviewCompleted: boolean;
  reviewerApproved: boolean;
}): NoGoResult {
  const reasons: string[] = [];

  // Gate 1: Technical Task Score ≥ 60% (≥ 27 out of 45)
  if (params.taskScoreOut45 < 27) {
    reasons.push(`Technical Task score (${params.taskScoreOut45}/45) is below minimum threshold of 27 (60%).`);
  }

  // Gate 2: Technical Understanding Score ≥ 60% (≥ 12 out of 20)
  if (params.technicalUnderstandingScoreOut20 < 12) {
    reasons.push(`Interview Technical Understanding score (${params.technicalUnderstandingScoreOut20}/20) is below minimum threshold of 12 (60%).`);
  }

  // Gate 3: No major security vulnerabilities
  if (params.hasSecurityIssues) {
    reasons.push("Major security vulnerability or payload flaw detected in candidate submission.");
  }

  // Gate 4: No plagiarism or fraud
  if (params.hasPlagiarism) {
    reasons.push("Plagiarism or fraudulent code submission detected.");
  }

  // Gate 5: Interview Completed
  if (!params.interviewCompleted) {
    reasons.push("One-on-One Technical Interview has not been completed.");
  }

  // Gate 6: Explicit Reviewer Approval
  if (!params.reviewerApproved) {
    reasons.push("Explicit reviewer approval has not been granted.");
  }

  return {
    passed: reasons.length === 0,
    reasons
  };
}

/**
 * Calculates Project Match Score (%) between candidate profile & project requirements.
 */
export function calculateProjectMatch(
  candidateSkills: string[],
  weeklyHours: string,
  projectRequiredSkills: string[],
  minHoursPerWeek: number = 10
): ProjectMatchResult {
  if (!projectRequiredSkills || projectRequiredSkills.length === 0) {
    return { matchPercentage: 100, matchingSkills: [], missingSkills: [], isAvailable: true };
  }

  const normalizedCandidateSkills = candidateSkills.map(s => s.toLowerCase().trim());
  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];

  for (const reqSkill of projectRequiredSkills) {
    const reqLower = reqSkill.toLowerCase().trim();
    const hasSkill = normalizedCandidateSkills.some(cs => cs.includes(reqLower) || reqLower.includes(cs));
    if (hasSkill) {
      matchingSkills.push(reqSkill);
    } else {
      missingSkills.push(reqSkill);
    }
  }

  const matchPercentage = Math.round((matchingSkills.length / projectRequiredSkills.length) * 100);

  // Check hours availability
  let candidateHours = 10;
  if (weeklyHours.includes('30+')) candidateHours = 35;
  else if (weeklyHours.includes('20–30')) candidateHours = 25;
  else if (weeklyHours.includes('10–20')) candidateHours = 15;
  else if (weeklyHours.includes('5–10')) candidateHours = 7;
  else candidateHours = 3;

  const isAvailable = candidateHours >= minHoursPerWeek;

  return {
    matchPercentage,
    matchingSkills,
    missingSkills,
    isAvailable
  };
}
