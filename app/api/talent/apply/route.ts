import { NextResponse } from 'next/server';
import { talentProfileSchema } from '@/lib/validators';
import { calculateTriageScore } from '@/lib/talent-evaluator';
import { db } from '@/platform/shared/database/db';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Server-side Zod validation
    const validated = talentProfileSchema.parse(body);

    // 2. Calculate initial Triage Score (for reviewer prioritization only)
    const triageResult = calculateTriageScore(validated);

    // 3. Generate Candidate Reference Code (QEL-TAL-2026-XXXX)
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const candidateCode = `QEL-TAL-2026-${randomNum}`;

    // 4. Save Candidate to Database (Supabase PostgreSQL / JSON Local Fallback)
    const workspaceId = 'ws-qeltrava-ai';
    const candidate = await db.talentCandidates.create(workspaceId, {
      candidate_code: candidateCode,
      full_name: validated.fullName,
      email: validated.email,
      whatsapp: validated.whatsapp,
      location: validated.location,
      linkedin: validated.linkedin,
      github: validated.github || '',
      portfolio: validated.portfolio || '',
      degree: validated.degree,
      specialization: validated.specialization,
      college: validated.college,
      graduation_year: validated.graduationYear,
      current_status_education: validated.currentStatus,
      primary_interest: validated.primaryInterest,
      secondary_languages: validated.secondaryLanguages,
      frameworks: validated.frameworks || '',
      ai_ml_tech: validated.aiMlTech || '',
      databases: validated.databases,
      cloud_devops: validated.cloudDevops || '',
      technical_level: validated.technicalLevel,
      years_experience: validated.yearsExperience,
      built_production_project: validated.builtProductionProject === 'Yes',
      best_projects: validated.bestProjects,
      worked_real_client: validated.workedRealClient === 'Yes',
      difficult_problem_desc: validated.difficultProblemDesc,
      use_ai_tools: validated.useAiTools === 'Yes',
      ai_tools_list: validated.aiToolsList || [],
      ai_workflow_desc: validated.aiWorkflowDesc,
      weekly_hours: validated.weeklyHours,
      availability_status: validated.availabilityStatus,
      preferred_collaboration: validated.preferredCollaboration,
      preferred_qeltrava_area: validated.preferredQeltravaArea,
      learning_goals: validated.learningGoals,
      immediate_contributions: validated.immediateContributions,
      remote_comfort: validated.remoteComfort === 'Yes',
      agile_comfort: validated.agileComfort === 'Yes',
      deadline_comfort: validated.deadlineComfort === 'Yes',
      compensation_expectation: validated.compensationExpectation,
      additional_notes: validated.additionalNotes,

      // Initial Governance & Triage
      triage_score: triageResult.score,
      current_status: 'APPLIED',
      background_score: 0,
      task_score: 0,
      interview_score: 0,
      final_score: 0,
      assigned_task_slug: triageResult.recommendedTaskSlug
    });

    // 5. Server-side Webhook dispatch to Google Sheets (Hidden from browser)
    const sheetsWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.CRM_WEBHOOK_URL;
    if (sheetsWebhookUrl) {
      try {
        await fetch(sheetsWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            candidate_code: candidateCode,
            submitted_at: new Date().toISOString(),
            full_name: validated.fullName,
            email: validated.email,
            whatsapp: validated.whatsapp,
            location: validated.location,
            linkedin: validated.linkedin,
            github: validated.github || '',
            portfolio: validated.portfolio || '',
            degree: validated.degree,
            specialization: validated.specialization,
            college: validated.college,
            graduation_year: validated.graduationYear,
            current_status_education: validated.currentStatus,
            primary_interest: validated.primaryInterest,
            secondary_languages: validated.secondaryLanguages.join(', '),
            frameworks: validated.frameworks,
            ai_ml_tech: validated.aiMlTech,
            databases: validated.databases.join(', '),
            cloud_devops: validated.cloudDevops,
            technical_level: validated.technicalLevel,
            years_experience: validated.yearsExperience,
            built_production: validated.builtProductionProject,
            worked_real_client: validated.workedRealClient,
            use_ai_tools: validated.useAiTools,
            ai_tools: (validated.aiToolsList || []).join(', '),
            weekly_hours: validated.weeklyHours,
            availability: validated.availabilityStatus,
            collaboration: validated.preferredCollaboration,
            qeltrava_area: validated.preferredQeltravaArea,
            triage_score: triageResult.score,
            recommended_track: triageResult.recommendedTrack,
            canonical_status: 'APPLIED'
          })
        });
      } catch (sheetErr) {
        console.error('Google Sheets server webhook dispatch warning:', sheetErr);
        // Non-blocking for candidate response
      }
    }

    return NextResponse.json({
      success: true,
      candidateCode: candidateCode,
      message: 'Application received successfully. Thank you for applying to the Qeltrava AI Talent & Engineering Community.',
      triageTrack: triageResult.recommendedTrack
    }, { status: 200 });

  } catch (error) {
    console.error('Talent application error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error while processing application.' }, { status: 500 });
  }
}
