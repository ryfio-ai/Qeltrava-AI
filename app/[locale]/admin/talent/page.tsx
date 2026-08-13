"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  FileCode2, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  AlertTriangle,
  History,
  X,
  Award,
  BookOpen
} from 'lucide-react';
import { Candidate, CandidateStatusHistory } from '@/platform/shared/database/types';
import { 
  getCandidatesLocal, 
  saveCandidateLocal, 
  bulkSaveCandidatesLocal 
} from '@/lib/indexeddb-talent';

export default function AdminTalentPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active selected candidate modal state
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(null);
  const [history, setHistory] = useState<CandidateStatusHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'task' | 'interview' | 'nogo' | 'history'>('profile');
  const [actionLoading, setActionLoading] = useState(false);

  // Form input states for modals
  const [reviewerNotes, setReviewerNotes] = useState('');
  const [taskSlug, setTaskSlug] = useState('fullstack-nextjs-supabase-task');
  
  // Rubric state (45 pts max)
  const [funcScore, setFuncScore] = useState(20);
  const [qualityScore, setQualityScore] = useState(12);
  const [archScore, setArchScore] = useState(12);
  const [probScore, setProbScore] = useState(12);
  const [uiScore, setUiScore] = useState(8);
  const [testScore, setTestScore] = useState(7);
  const [docScore, setDocScore] = useState(4);
  const [aiScore, setAiScore] = useState(4);
  const [taskFeedback, setTaskFeedback] = useState('');

  // Interview state (35 pts max)
  const [interviewTech, setInterviewTech] = useState(16);
  const [interviewComm, setInterviewComm] = useState(8);
  const [interviewReliability, setInterviewReliability] = useState(4);
  const [interviewNotes, setInterviewNotes] = useState('');

  // No-Go Gate params
  const [hasSecurityIssues, setHasSecurityIssues] = useState(false);
  const [hasPlagiarism, setHasPlagiarism] = useState(false);
  const [reviewerApproved, setReviewerApproved] = useState(true);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      // 1. Load local IndexedDB candidates first for zero-latency UI
      const localItems = await getCandidatesLocal();
      let combined: Candidate[] = [...localItems];

      // 2. Fetch server API candidates
      try {
        let url = '/api/admin/talent?';
        if (selectedStatus !== 'ALL') url += `status=${selectedStatus}&`;
        if (searchQuery) url += `search=${encodeURIComponent(searchQuery)}&`;

        const res = await fetch(url);
        const data = await res.json();
        if (res.ok && data.success && Array.isArray(data.candidates) && data.candidates.length > 0) {
          // Sync server items to IndexedDB
          await bulkSaveCandidatesLocal(data.candidates);
          // Merge deduplicated by candidate_code or id
          const map = new Map<string, Candidate>();
          for (const item of [...data.candidates, ...localItems]) {
            const key = item.candidate_code || item.id;
            if (key && !map.has(key)) {
              map.set(key, item);
            }
          }
          combined = Array.from(map.values());
        }
      } catch (apiErr) {
        console.warn('Server API offline/warning, presenting IndexedDB local data:', apiErr);
      }

      // Filter local combined list by status & search query
      if (selectedStatus !== 'ALL') {
        combined = combined.filter(c => c.current_status === selectedStatus);
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        combined = combined.filter(c => 
          (c.full_name && c.full_name.toLowerCase().includes(q)) ||
          (c.email && c.email.toLowerCase().includes(q)) ||
          (c.candidate_code && c.candidate_code.toLowerCase().includes(q)) ||
          (c.primary_interest && c.primary_interest.toLowerCase().includes(q))
        );
      }

      setCandidates(combined);
    } catch (err) {
      console.error('Failed to load candidate list:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [selectedStatus, searchQuery]);

  const openCandidateModal = async (cand: Candidate) => {
    setActiveCandidate(cand);
    setReviewerNotes(cand.reviewer_notes || '');
    setTaskFeedback(cand.task_evaluation_feedback || '');
    setInterviewNotes(cand.interview_notes || '');
    setActiveTab('profile');

    try {
      const res = await fetch(`/api/admin/talent?id=${cand.id}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Failed to fetch candidate history:', err);
    }
  };

  const handleAction = async (action: string, payload: any = {}) => {
    if (!activeCandidate) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/talent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          candidateId: activeCandidate.id,
          reviewerEmail: 'admin@qeltrava.ai',
          ...payload
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.candidate) {
          await saveCandidateLocal(data.candidate);
          setActiveCandidate(data.candidate);
        }
        await fetchCandidates();
        // Refresh history
        const histRes = await fetch(`/api/admin/talent?id=${activeCandidate.id}`);
        const histData = await histRes.json();
        if (histRes.ok) setHistory(histData.history || []);
      } else {
        alert(data.error || 'Action failed');
      }
    } catch (err: any) {
      alert(err.message || 'Server error');
    } finally {
      setActionLoading(false);
    }
  };

  // Metrics calculation
  const totalCount = candidates.length;
  const appliedCount = candidates.filter(c => c.current_status === 'APPLIED').length;
  const underReviewCount = candidates.filter(c => c.current_status === 'PROFILE_REVIEW').length;
  const taskAssignedCount = candidates.filter(c => c.current_status === 'TASK_ASSIGNED').length;
  const taskSubmittedCount = candidates.filter(c => c.current_status === 'TASK_SUBMITTED').length;
  const interviewCount = candidates.filter(c => c.current_status === 'INTERVIEW_SCHEDULED' || c.current_status === 'INTERVIEW_COMPLETED').length;
  const projectReadyCount = candidates.filter(c => c.current_status === 'PROJECT_READY' || c.current_status === 'PROJECT_ASSIGNED' || c.current_status === 'ACTIVE_COLLABORATOR').length;
  const talentPoolCount = candidates.filter(c => c.current_status === 'TALENT_POOL').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">Qeltrava OS Talent Core</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Talent & Engineering Operating System</h1>
            <p className="text-xs text-slate-400 mt-1">
              End-to-end candidate lifecycle management: Discover → Evaluate → Verify → Interview → Allocate
            </p>
          </div>

          <button
            onClick={fetchCandidates}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono rounded-xl border border-slate-700 transition-all self-start md:self-auto cursor-pointer"
          >
            ↻ Refresh Pipeline
          </button>
        </div>

        {/* Executive Summary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Total</span>
            <span className="text-xl font-bold text-white mt-1 block">{totalCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider block">Applied</span>
            <span className="text-xl font-bold text-blue-400 mt-1 block">{appliedCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block">Review</span>
            <span className="text-xl font-bold text-amber-400 mt-1 block">{underReviewCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">Assigned</span>
            <span className="text-xl font-bold text-purple-400 mt-1 block">{taskAssignedCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider block">Submitted</span>
            <span className="text-xl font-bold text-indigo-400 mt-1 block">{taskSubmittedCount}</span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">Interview</span>
            <span className="text-xl font-bold text-cyan-400 mt-1 block">{interviewCount}</span>
          </div>

          <div className="bg-slate-900 border border-emerald-900/50 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">Ready</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">{projectReadyCount}</span>
          </div>

          <div className="bg-slate-900 border border-teal-900/50 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-teal-300 uppercase tracking-wider block">Pool</span>
            <span className="text-xl font-bold text-teal-300 mt-1 block">{talentPoolCount}</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {['ALL', 'APPLIED', 'PROFILE_REVIEW', 'TASK_ASSIGNED', 'TASK_SUBMITTED', 'TASK_EVALUATED', 'INTERVIEW_SCHEDULED', 'INTERVIEW_COMPLETED', 'PROJECT_READY', 'TALENT_POOL', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedStatus === st ? 'bg-[var(--color-accent)] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search candidate, code, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-white pl-9 pr-3 py-2 rounded-xl text-xs focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
            />
          </div>
        </div>

        {/* Candidate Cards Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs font-mono">
            Loading candidate records...
          </div>
        ) : candidates.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-slate-800 rounded-3xl space-y-3">
            <Users className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-400">No candidates match current status filter</p>
            <p className="text-xs text-slate-600">Candidate submissions via /en/careers/apply will automatically render here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((cand) => (
              <div 
                key={cand.id} 
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 shadow-lg"
              >
                <div className="space-y-4">
                  {/* Code ID & Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-2.5 py-1 rounded-full">
                      {cand.candidate_code}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase ${
                      cand.current_status === 'PROJECT_READY' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      cand.current_status === 'TALENT_POOL' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' :
                      cand.current_status === 'REJECTED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      ● {cand.current_status}
                    </span>
                  </div>

                  {/* Candidate Name & Track */}
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight">{cand.full_name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{cand.primary_interest} • {cand.degree} ({cand.specialization})</p>
                    <p className="text-[11px] text-slate-500">{cand.location} • {cand.years_experience} Exp</p>
                  </div>

                  {/* Triage & Evaluated Scores Grid */}
                  <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 text-center font-mono">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Triage</span>
                      <span className="text-xs font-bold text-amber-400">{cand.triage_score}/100</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Task (45)</span>
                      <span className="text-xs font-bold text-purple-400">{cand.task_score || 0}</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Interview</span>
                      <span className="text-xs font-bold text-cyan-400">{cand.interview_score || 0}</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Final</span>
                      <span className="text-xs font-bold text-emerald-400">{cand.final_score || 0}</span>
                    </div>
                  </div>

                  {/* Capabilities & Availability Badges */}
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-semibold">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">⚡ {cand.weekly_hours}</span>
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">💼 {cand.preferred_collaboration}</span>
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">🎯 {cand.preferred_qeltrava_area}</span>
                  </div>
                </div>

                {/* Inspect Action Button */}
                <button
                  onClick={() => openCandidateModal(cand)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-[var(--color-accent)] text-white text-xs font-bold rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-4"
                >
                  Manage Candidate Lifecycle <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Candidate Inspection & Action Modal */}
      {activeCandidate && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="font-mono text-xs text-[var(--color-accent)] font-bold bg-[var(--color-accent)]/10 px-3 py-1 rounded-full">
                  {activeCandidate.candidate_code}
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">{activeCandidate.full_name}</h2>
                <p className="text-xs text-slate-400">{activeCandidate.email} • {activeCandidate.whatsapp} • {activeCandidate.location}</p>
              </div>
              <button
                onClick={() => setActiveCandidate(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto font-mono text-xs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-[var(--color-accent)] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Profile & Review
              </button>

              <button
                onClick={() => setActiveTab('task')}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'task' ? 'bg-[var(--color-accent)] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Task Rubric (45 pts)
              </button>

              <button
                onClick={() => setActiveTab('interview')}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'interview' ? 'bg-[var(--color-accent)] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Interview (35 pts)
              </button>

              <button
                onClick={() => setActiveTab('nogo')}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'nogo' ? 'bg-[var(--color-accent)] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                No-Go & Allocation
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-xl transition-all ${activeTab === 'history' ? 'bg-[var(--color-accent)] text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Audit History ({history.length})
              </button>
            </div>

            {/* TAB 1: Profile & Review */}
            {activeTab === 'profile' && (
              <div className="space-y-6 text-xs text-slate-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-slate-500 font-mono block mb-1">Education</span>
                    <p className="font-semibold text-white">{activeCandidate.degree} in {activeCandidate.specialization}</p>
                    <p className="text-slate-400">{activeCandidate.college} ({activeCandidate.graduation_year})</p>
                  </div>

                  <div>
                    <span className="text-slate-500 font-mono block mb-1">Links & Portfolio</span>
                    <p>LinkedIn: <a href={activeCandidate.linkedin} target="_blank" rel="noreferrer" className="text-[var(--color-accent)] hover:underline">{activeCandidate.linkedin}</a></p>
                    {activeCandidate.github && <p>GitHub: <a href={activeCandidate.github} target="_blank" rel="noreferrer" className="text-[var(--color-accent)] hover:underline">{activeCandidate.github}</a></p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-bold block">1–3 Best Projects Submitted</span>
                  <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 whitespace-pre-line text-slate-300 font-mono text-[11px]">{activeCandidate.best_projects || 'None listed'}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-bold block">Difficult Problem Solved</span>
                  <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 whitespace-pre-line text-slate-300 text-[11px]">{activeCandidate.difficult_problem_desc || 'None listed'}</p>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-bold block">AI Workflow Maturity</span>
                  <p className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-slate-300 text-[11px]">{activeCandidate.ai_workflow_desc || 'None listed'}</p>
                </div>

                {/* Review Action Controls */}
                <div className="border-t border-slate-800 pt-4 space-y-3">
                  <label className="block font-bold text-white">Reviewer Notes</label>
                  <textarea 
                    value={reviewerNotes} 
                    onChange={(e) => setReviewerNotes(e.target.value)} 
                    rows={2} 
                    className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white text-xs focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"
                    placeholder="Enter engineering notes..."
                  />

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={() => handleAction('update_status', { newStatus: 'PROFILE_REVIEW', reviewerNotes })}
                      disabled={actionLoading}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Move to PROFILE_REVIEW
                    </button>

                    <button
                      onClick={() => handleAction('update_status', { newStatus: 'SHORTLISTED', reviewerNotes })}
                      disabled={actionLoading}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Shortlist Candidate
                    </button>

                    <button
                      onClick={() => handleAction('update_status', { newStatus: 'REJECTED', reviewerNotes, reason: 'Declined during profile review' })}
                      disabled={actionLoading}
                      className="px-4 py-2 bg-red-950/60 text-red-300 border border-red-800 font-bold rounded-xl text-xs cursor-pointer"
                    >
                      Reject Candidate
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Task Rubric (45 Points Max) */}
            {activeTab === 'task' && (
              <div className="space-y-6 text-xs">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 font-mono text-[10px] uppercase">Assigned Task</span>
                    <h4 className="font-bold text-white">{activeCandidate.assigned_task_slug || 'fullstack-nextjs-supabase-task'}</h4>
                  </div>
                  <button
                    onClick={() => handleAction('assign_task', { taskSlug })}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Assign Task
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-white uppercase font-mono text-[11px]">Task Evaluation Rubric (100% Normalized → 45 pts Max)</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-400 mb-1">Functional Correctness (25% max)</label>
                      <input type="number" min="0" max="25" value={funcScore} onChange={(e) => setFuncScore(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Code Quality (15% max)</label>
                      <input type="number" min="0" max="15" value={qualityScore} onChange={(e) => setQualityScore(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Architecture (15% max)</label>
                      <input type="number" min="0" max="15" value={archScore} onChange={(e) => setArchScore(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Problem Solving (15% max)</label>
                      <input type="number" min="0" max="15" value={probScore} onChange={(e) => setProbScore(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">UI/UX (10% max)</label>
                      <input type="number" min="0" max="10" value={uiScore} onChange={(e) => setUiScore(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1">Testing (10% max)</label>
                      <input type="number" min="0" max="10" value={testScore} onChange={(e) => setTestScore(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Evaluator Feedback</label>
                    <textarea value={taskFeedback} onChange={(e) => setTaskFeedback(e.target.value)} rows={3} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white text-xs" placeholder="Detailed rubric notes..." />
                  </div>

                  <button
                    onClick={() => handleAction('evaluate_task', {
                      rubric: {
                        candidateId: activeCandidate.id,
                        submissionId: 'sub-1',
                        functionalScore: funcScore,
                        codeQualityScore: qualityScore,
                        architectureScore: archScore,
                        problemSolvingScore: probScore,
                        uiUxScore: uiScore,
                        testingScore: testScore,
                        documentationScore: docScore,
                        aiUnderstandingScore: aiScore,
                        evaluatorFeedback: taskFeedback || 'Task evaluated'
                      },
                      feedback: taskFeedback
                    })}
                    disabled={actionLoading}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Submit Task Rubric Evaluation (45 Pts)
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: Interview (35 Points Max) */}
            {activeTab === 'interview' && (
              <div className="space-y-6 text-xs">
                <h4 className="font-bold text-white font-mono uppercase text-[11px]">One-on-One Technical Interview Rubric (35 Points Max)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-slate-400 mb-1">Technical Understanding (20 pts)</label>
                    <input type="number" min="0" max="20" value={interviewTech} onChange={(e) => setInterviewTech(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Communication (10 pts)</label>
                    <input type="number" min="0" max="10" value={interviewComm} onChange={(e) => setInterviewComm(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">Reliability & Ownership (5 pts)</label>
                    <input type="number" min="0" max="5" value={interviewReliability} onChange={(e) => setInterviewReliability(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Interview Notes & Live Code Defense</label>
                  <textarea value={interviewNotes} onChange={(e) => setInterviewNotes(e.target.value)} rows={3} className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl text-white text-xs" placeholder="Notes on code defense, architecture explanation, and reliability..." />
                </div>

                <button
                  onClick={() => handleAction('evaluate_interview', {
                    technicalUnderstandingScore: interviewTech,
                    communicationScore: interviewComm,
                    reliabilityOwnershipScore: interviewReliability,
                    interviewNotes: interviewNotes || 'Interview completed'
                  })}
                  disabled={actionLoading}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs cursor-pointer"
                >
                  Save Interview Evaluation (35 Pts) & Compute Final Score
                </button>
              </div>
            )}

            {/* TAB 4: No-Go Gates & Allocation */}
            {activeTab === 'nogo' && (
              <div className="space-y-6 text-xs">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-white font-mono uppercase text-[11px]">Mandatory "No-Go" Hard Gate Checkers</h4>
                  
                  <label className="flex items-center gap-3 cursor-pointer text-slate-300">
                    <input type="checkbox" checked={hasSecurityIssues} onChange={(e) => setHasSecurityIssues(e.target.checked)} className="rounded text-red-500" />
                    <span className="text-red-400 font-semibold">Flag Major Security Vulnerability or Payload Flaw</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer text-slate-300">
                    <input type="checkbox" checked={hasPlagiarism} onChange={(e) => setHasPlagiarism(e.target.checked)} className="rounded text-red-500" />
                    <span className="text-red-400 font-semibold">Flag Plagiarism or Fraudulent Submission</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer text-slate-300">
                    <input type="checkbox" checked={reviewerApproved} onChange={(e) => setReviewerApproved(e.target.checked)} className="rounded text-emerald-500" />
                    <span className="text-emerald-400 font-semibold">Explicit Engineering Reviewer Approval Granted</span>
                  </label>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => handleAction('evaluate_no_go', {
                      technicalUnderstandingScore: interviewTech,
                      hasSecurityIssues,
                      hasPlagiarism,
                      reviewerApproved,
                      targetStatus: 'PROJECT_READY'
                    })}
                    disabled={actionLoading}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs cursor-pointer shadow-lg"
                  >
                    Allocate as PROJECT_READY
                  </button>

                  <button
                    onClick={() => handleAction('evaluate_no_go', {
                      technicalUnderstandingScore: interviewTech,
                      hasSecurityIssues,
                      hasPlagiarism,
                      reviewerApproved,
                      targetStatus: 'TALENT_POOL'
                    })}
                    disabled={actionLoading}
                    className="px-6 py-3 bg-teal-700 hover:bg-teal-600 text-white font-bold rounded-2xl text-xs cursor-pointer"
                  >
                    Save as Verified TALENT_POOL Asset
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: Audit History */}
            {activeTab === 'history' && (
              <div className="space-y-4 text-xs font-mono">
                <h4 className="font-bold text-white uppercase text-[11px]">Audit History Log</h4>
                <div className="space-y-3">
                  {history.map((hist) => (
                    <div key={hist.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-[var(--color-accent)] font-bold">{hist.old_status || 'INIT'} → {hist.new_status}</span>
                        <span className="text-slate-500">{new Date(hist.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-400 text-[10px]">Actor: {hist.changed_by}</p>
                      {hist.reason && <p className="text-slate-300 text-[11px] font-sans pt-1">{hist.reason}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
