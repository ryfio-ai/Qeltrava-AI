import { NextResponse } from 'next/server';
import { db } from '@/platform/shared/database/db';
import { 
  calculateTaskRubricScore, 
  calculateInterviewScore, 
  calculateFinalScore, 
  checkNoGoConditions 
} from '@/lib/talent-evaluator';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;
    const candidateId = searchParams.get('id') || undefined;

    const workspaceId = 'ws-qeltrava-ai';

    if (candidateId) {
      const candidate = await db.talentCandidates.get(workspaceId, candidateId);
      if (!candidate) {
        return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
      }
      const history = await db.talentCandidates.listHistory(workspaceId, candidate.id);
      return NextResponse.json({ success: true, candidate, history });
    }

    const candidates = await db.talentCandidates.list(workspaceId, { status, search });
    return NextResponse.json({ success: true, candidates, count: candidates.length });
  } catch (err: any) {
    console.error('Admin talent fetch error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, candidateId, reviewerEmail = 'reviewer@qeltrava.ai' } = body;

    const workspaceId = 'ws-qeltrava-ai';
    const candidate = await db.talentCandidates.get(workspaceId, candidateId);
    if (!candidate) {
      return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
    }

    // Action 1: Update Status
    if (action === 'update_status') {
      const { newStatus, reason } = body;
      const oldStatus = candidate.current_status;

      const updated = await db.talentCandidates.update(workspaceId, candidate.id, {
        current_status: newStatus,
        reviewer_notes: body.reviewerNotes || candidate.reviewer_notes,
        reviewer_email: reviewerEmail
      });

      await db.talentCandidates.logStatus(
        workspaceId,
        candidate.id,
        newStatus,
        reviewerEmail,
        oldStatus,
        reason || `Status updated to ${newStatus}`
      );

      return NextResponse.json({ success: true, candidate: updated });
    }

    // Action 2: Assign Task
    if (action === 'assign_task') {
      const { taskSlug } = body;
      const oldStatus = candidate.current_status;

      const updated = await db.talentCandidates.update(workspaceId, candidate.id, {
        assigned_task_slug: taskSlug,
        current_status: 'TASK_ASSIGNED',
        reviewer_email: reviewerEmail
      });

      await db.talentCandidates.logStatus(
        workspaceId,
        candidate.id,
        'TASK_ASSIGNED',
        reviewerEmail,
        oldStatus,
        `Assigned technical task: ${taskSlug}`
      );

      return NextResponse.json({ success: true, candidate: updated });
    }

    // Action 3: Evaluate Task Submission via Rubric (45 Points Max)
    if (action === 'evaluate_task') {
      const { rubric, feedback, backgroundScore = 15 } = body;
      const taskScore45 = calculateTaskRubricScore(rubric);
      const oldStatus = candidate.current_status;

      const updated = await db.talentCandidates.update(workspaceId, candidate.id, {
        background_score: backgroundScore,
        task_score: taskScore45,
        task_evaluation_feedback: feedback,
        current_status: 'TASK_EVALUATED',
        reviewer_email: reviewerEmail
      });

      await db.talentCandidates.logStatus(
        workspaceId,
        candidate.id,
        'TASK_EVALUATED',
        reviewerEmail,
        oldStatus,
        `Evaluated task submission: ${taskScore45}/45 pts`
      );

      return NextResponse.json({ success: true, candidate: updated, taskScore45 });
    }

    // Action 4: Evaluate Interview (35 Points Max) & Calculate Final Score (100 Points Max)
    if (action === 'evaluate_interview') {
      const { technicalUnderstandingScore, communicationScore, reliabilityOwnershipScore, interviewNotes } = body;
      
      const interviewScore35 = calculateInterviewScore({
        candidateId: candidate.id,
        technicalUnderstandingScore,
        communicationScore,
        reliabilityOwnershipScore,
        interviewNotes
      });

      const bgScore = candidate.background_score || 15;
      const taskScore = candidate.task_score || 0;
      const finalScore = calculateFinalScore(bgScore, taskScore, interviewScore35);

      const oldStatus = candidate.current_status;

      const updated = await db.talentCandidates.update(workspaceId, candidate.id, {
        interview_score: interviewScore35,
        final_score: finalScore,
        interview_notes: interviewNotes,
        current_status: 'INTERVIEW_COMPLETED',
        reviewer_email: reviewerEmail
      });

      await db.talentCandidates.logStatus(
        workspaceId,
        candidate.id,
        'INTERVIEW_COMPLETED',
        reviewerEmail,
        oldStatus,
        `Completed interview: ${interviewScore35}/35 pts. Final score: ${finalScore}/100.`
      );

      return NextResponse.json({ success: true, candidate: updated, interviewScore35, finalScore });
    }

    // Action 5: Evaluate No-Go Gates for Project Ready transition
    if (action === 'evaluate_no_go') {
      const { 
        technicalUnderstandingScore = 15, 
        hasSecurityIssues = false, 
        hasPlagiarism = false, 
        reviewerApproved = true,
        targetStatus = 'PROJECT_READY' // PROJECT_READY or TALENT_POOL
      } = body;

      const noGoCheck = checkNoGoConditions({
        taskScoreOut45: candidate.task_score || 0,
        technicalUnderstandingScoreOut20: technicalUnderstandingScore,
        hasSecurityIssues,
        hasPlagiarism,
        interviewCompleted: candidate.current_status === 'INTERVIEW_COMPLETED' || candidate.interview_score !== undefined,
        reviewerApproved
      });

      if (!noGoCheck.passed && targetStatus === 'PROJECT_READY') {
        return NextResponse.json({ 
          success: false, 
          error: 'Candidate did not pass all No-Go Gate conditions for PROJECT_READY selection.', 
          reasons: noGoCheck.reasons 
        }, { status: 400 });
      }

      const oldStatus = candidate.current_status;

      const updated = await db.talentCandidates.update(workspaceId, candidate.id, {
        current_status: targetStatus,
        reviewer_email: reviewerEmail
      });

      await db.talentCandidates.logStatus(
        workspaceId,
        candidate.id,
        targetStatus,
        reviewerEmail,
        oldStatus,
        `Passed evaluation gates and transitioned to ${targetStatus}`
      );

      return NextResponse.json({ success: true, candidate: updated, noGoCheck });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });

  } catch (err: any) {
    console.error('Admin talent POST error:', err);
    return NextResponse.json({ success: false, error: err.message || 'Server error' }, { status: 500 });
  }
}
