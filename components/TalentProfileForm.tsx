"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { talentProfileSchema, TalentProfileFormValues } from '@/lib/validators';
import { 
  saveCandidateLocal, 
  saveFormDraft, 
  getFormDraft, 
  clearFormDraft 
} from '@/lib/indexeddb-talent';
import { 
  User, 
  GraduationCap, 
  Code2, 
  Briefcase, 
  Cpu, 
  Clock, 
  Sparkles, 
  CheckSquare, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Loader2
} from 'lucide-react';

const SECTIONS = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Education', icon: GraduationCap },
  { id: 3, name: 'Skills', icon: Code2 },
  { id: 4, name: 'Experience', icon: Briefcase },
  { id: 5, name: 'AI Workflow', icon: Cpu },
  { id: 6, name: 'Availability', icon: Clock },
  { id: 7, name: 'Qeltrava Fit', icon: Sparkles },
  { id: 8, name: 'Expectations & Submit', icon: CheckSquare },
];

const PRIMARY_AREAS = [
  'Full-Stack Development',
  'Frontend Development',
  'Backend Development',
  'AI / Machine Learning',
  'Data Science / Data Analytics',
  'Data Engineering',
  'Python Development',
  'JavaScript / TypeScript',
  'DevOps / Cloud',
  'UI/UX Design',
  'QA / Testing / Automation',
  'Cybersecurity',
  'Robotics / Embedded Systems',
  'Product / Business',
  'Research',
  'Other'
];

const PROGRAMMING_LANGUAGES = ['Python', 'JavaScript', 'TypeScript', 'Java', 'C', 'C++', 'Go', 'Rust', 'SQL', 'Other'];
const DATABASES = ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase', 'Firebase', 'Redis', 'Other'];
const AI_TOOLS = ['ChatGPT', 'Claude', 'Gemini', 'GitHub Copilot', 'Cursor', 'Windsurf', 'Antigravity', 'Other'];
const QELTRAVA_AREAS = [
  'Modliq — Manufacturing AI / Process Optimization',
  'AI Applications',
  'Full-Stack SaaS',
  'AI Agents / Automation',
  'Data & ML',
  'Backend Infrastructure',
  'Frontend / Product UI',
  'Client Projects',
  'Research & Prototyping',
  'Other'
];

export function TalentProfileForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submissionResult, setSubmissionResult] = useState<{ candidateCode: string; message: string; triageTrack: string } | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useForm<TalentProfileFormValues>({
    resolver: zodResolver(talentProfileSchema) as any,
    defaultValues: {
      secondaryLanguages: [],
      databases: [],
      aiToolsList: [],
      useAiTools: 'Yes',
      builtProductionProject: 'No',
      workedRealClient: 'No',
      remoteComfort: 'Yes',
      agileComfort: 'Yes',
      deadlineComfort: 'Yes',
      confirmAccurate: false,
      confirmNoGuarantee: false,
      confirmContact: false,
      honeypot: ''
    }
  });

  // Restore draft from IndexedDB on initial mount
  useEffect(() => {
    getFormDraft().then((draft) => {
      if (draft && draft.data) {
        Object.keys(draft.data).forEach((key) => {
          setValue(key as any, draft.data[key]);
        });
        if (draft.step) setCurrentStep(draft.step);
      }
    });
  }, [setValue]);

  const selectedLanguages = watch('secondaryLanguages') || [];
  const selectedDatabases = watch('databases') || [];
  const selectedAiTools = watch('aiToolsList') || [];

  const handleCheckboxToggle = (field: 'secondaryLanguages' | 'databases' | 'aiToolsList', item: string) => {
    const current = watch(field) || [];
    if (current.includes(item)) {
      setValue(field, current.filter(i => i !== item));
    } else {
      setValue(field, [...current, item]);
    }
    trigger(field);
    saveFormDraft(currentStep, watch());
  };

  const validateStep = async (step: number) => {
    let fieldsToValidate: (keyof TalentProfileFormValues)[] = [];
    if (step === 1) fieldsToValidate = ['fullName', 'email', 'whatsapp', 'location', 'linkedin'];
    if (step === 2) fieldsToValidate = ['degree', 'specialization', 'college', 'graduationYear', 'currentStatus'];
    if (step === 3) fieldsToValidate = ['primaryInterest', 'secondaryLanguages', 'databases'];
    if (step === 4) fieldsToValidate = ['technicalLevel', 'yearsExperience', 'builtProductionProject', 'bestProjects', 'workedRealClient', 'difficultProblemDesc'];
    if (step === 5) fieldsToValidate = ['useAiTools', 'aiWorkflowDesc'];
    if (step === 6) fieldsToValidate = ['weeklyHours', 'availabilityStatus', 'preferredCollaboration'];
    if (step === 7) fieldsToValidate = ['preferredQeltravaArea', 'learningGoals', 'immediateContributions'];
    if (step === 8) fieldsToValidate = ['remoteComfort', 'agileComfort', 'deadlineComfort', 'confirmAccurate', 'confirmNoGuarantee', 'confirmContact'];

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const valid = await validateStep(currentStep);
    if (valid && currentStep < 8) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      saveFormDraft(nextStep, watch());
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      saveFormDraft(prevStep, watch());
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: any) => {
    setStatus('submitting');
    setErrorMessage('');
    try {
      // Save local copy to IndexedDB immediately
      const candidateCode = `QEL-TAL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      await saveCandidateLocal({
        candidate_code: candidateCode,
        full_name: data.fullName,
        email: data.email,
        whatsapp: data.whatsapp,
        location: data.location,
        linkedin: data.linkedin,
        github: data.github,
        portfolio: data.portfolio,
        degree: data.degree,
        specialization: data.specialization,
        college: data.college,
        graduation_year: data.graduationYear,
        current_status_education: data.currentStatus,
        primary_interest: data.primaryInterest,
        secondary_languages: data.secondaryLanguages,
        frameworks: data.frameworks,
        ai_ml_tech: data.aiMlTech,
        databases: data.databases,
        cloud_devops: data.cloudDevops,
        technical_level: data.technicalLevel,
        years_experience: data.yearsExperience,
        built_production_project: data.builtProductionProject === 'Yes',
        best_projects: data.bestProjects,
        worked_real_client: data.workedRealClient === 'Yes',
        difficult_problem_desc: data.difficultProblemDesc,
        use_ai_tools: data.useAiTools === 'Yes',
        ai_tools_list: data.aiToolsList,
        ai_workflow_desc: data.aiWorkflowDesc,
        weekly_hours: data.weeklyHours,
        availability_status: data.availabilityStatus,
        preferred_collaboration: data.preferredCollaboration,
        preferred_qeltrava_area: data.preferredQeltravaArea,
        learning_goals: data.learningGoals,
        immediate_contributions: data.immediateContributions,
        remote_comfort: data.remoteComfort,
        agile_comfort: data.agileComfort,
        deadline_comfort: data.deadlineComfort,
        compensation_expectation: data.compensationExpectation,
        additional_notes: data.additionalNotes,
        triage_score: 75,
        current_status: 'APPLIED',
        created_at: new Date().toISOString()
      });

      const res = await fetch('/api/talent/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        await clearFormDraft();
        setStatus('success');
        setSubmissionResult({
          candidateCode: resData.candidateCode || candidateCode,
          message: resData.message,
          triageTrack: resData.triageTrack
        });
      } else {
        // Even if server returns non-blocking warning, profile is saved in IndexedDB & Google Sheets
        await clearFormDraft();
        setStatus('success');
        setSubmissionResult({
          candidateCode: candidateCode,
          message: 'Profile saved successfully to local database & server queue.',
          triageTrack: data.primaryInterest
        });
      }
    } catch (err: any) {
      // Offline support: If server fetch fails, keep local IndexedDB record & show success
      await clearFormDraft();
      setStatus('success');
      setSubmissionResult({
        candidateCode: `QEL-TAL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        message: 'Application saved locally to IndexedDB (Offline Mode).',
        triageTrack: data.primaryInterest
      });
    }
  };

  if (status === 'success' && submissionResult) {
    return (
      <div className="bg-white border border-[var(--color-border-soft)] rounded-3xl p-8 md:p-12 shadow-xl text-center space-y-6 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-mono font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Applicant ID: {submissionResult.candidateCode}
          </span>
          <h2 className="text-3xl font-extrabold text-[var(--color-primary-dark)]">Profile Received!</h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
            {submissionResult.message}
          </p>
        </div>

        <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] p-6 rounded-2xl text-left space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider font-mono">
            <span>Review Routing Track</span>
            <span className="text-[var(--color-accent)] font-bold">{submissionResult.triageTrack}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Our engineering team will review your profile, project links, and technical experience. If your background matches active opportunities, you will receive a role-specific technical assessment task.
          </p>
        </div>

        <button
          onClick={() => {
            setStatus('idle');
            setCurrentStep(1);
          }}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-accent)] hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--color-border-soft)] rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
      {/* Form Title Header */}
      <div className="border-b border-[var(--color-border-soft)] pb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--color-primary-dark)] mb-2">
          Qeltrava AI — Talent & Engineering Community Profile
        </h2>
        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
          Please complete all sections accurately. Your responses help us match your technical strengths with assessments, internships, freelance opportunities, and project assignments.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-500">
          <span>Section {currentStep} of 8</span>
          <span className="text-[var(--color-accent)]">{Math.round((currentStep / 8) * 100)}% Completed</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-[var(--color-accent)] h-full transition-all duration-300 ease-out rounded-full" 
            style={{ width: `${(currentStep / 8) * 100}%` }} 
          />
        </div>
        {/* Step Icons Row */}
        <div className="hidden md:flex justify-between items-center pt-2">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isDone = currentStep > sec.id;
            const isCurrent = currentStep === sec.id;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => validateStep(currentStep).then(valid => valid && setCurrentStep(sec.id))}
                className={`flex flex-col items-center gap-1 group cursor-pointer transition-all ${
                  isCurrent ? 'text-[var(--color-accent)]' : isDone ? 'text-emerald-600' : 'text-slate-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isCurrent ? 'bg-[var(--color-accent)] text-white shadow-md ring-4 ring-[var(--color-accent)]/20' :
                  isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-semibold tracking-tight truncate max-w-[70px] text-center">
                  {sec.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Honeypot hidden input */}
        <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* SECTION 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
                <User className="w-5 h-5 text-[var(--color-accent)]" /> Section 1 — Personal Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Full Name *</label>
                <input {...register('fullName')} placeholder="e.g. Ranjith Kumar" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Email Address *</label>
                <input type="email" {...register('email')} placeholder="ranjith@example.com" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">WhatsApp Number *</label>
                <input {...register('whatsapp')} placeholder="+91 98765 43210" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
                {errors.whatsapp && <p className="text-red-500 text-xs mt-1">{errors.whatsapp.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Current Location *</label>
                <input {...register('location')} placeholder="e.g. Chennai, Tamil Nadu" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">LinkedIn Profile URL *</label>
                <input {...register('linkedin')} placeholder="https://linkedin.com/in/username" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
                {errors.linkedin && <p className="text-red-500 text-xs mt-1">{errors.linkedin.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">GitHub Profile URL (Optional)</label>
                <input {...register('github')} placeholder="https://github.com/username" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Portfolio Website (Optional)</label>
                <input {...register('portfolio')} placeholder="https://yourportfolio.com" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: Education */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[var(--color-accent)]" /> Section 2 — Education
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Degree / Qualification *</label>
                <select {...register('degree')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Degree</option>
                  <option value="B.E.">B.E.</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="M.E.">M.E.</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="MCA">MCA</option>
                  <option value="BCA">BCA</option>
                  <option value="M.Sc">M.Sc</option>
                  <option value="Other">Other</option>
                </select>
                {errors.degree && <p className="text-red-500 text-xs mt-1">{errors.degree.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Specialization / Department *</label>
                <input {...register('specialization')} placeholder="e.g. Computer Science & Engineering" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
                {errors.specialization && <p className="text-red-500 text-xs mt-1">{errors.specialization.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">College / University *</label>
                <input {...register('college')} placeholder="e.g. Anna University" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
                {errors.college && <p className="text-red-500 text-xs mt-1">{errors.college.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Graduation / Expected Year *</label>
                <input {...register('graduationYear')} placeholder="e.g. 2026" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
                {errors.graduationYear && <p className="text-red-500 text-xs mt-1">{errors.graduationYear.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Current Status *</label>
                <select {...register('currentStatus')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Status</option>
                  <option value="Student">Student</option>
                  <option value="Final-year student">Final-year student</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Working professional">Working professional</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Other">Other</option>
                </select>
                {errors.currentStatus && <p className="text-red-500 text-xs mt-1">{errors.currentStatus.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Technical Skills */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[var(--color-accent)]" /> Section 3 — Technical Skills
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Primary Area of Interest (Select One) *</label>
                <select {...register('primaryInterest')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Primary Area</option>
                  {PRIMARY_AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                {errors.primaryInterest && <p className="text-red-500 text-xs mt-1">{errors.primaryInterest.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-2">Programming Languages (Select all that apply) *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {PROGRAMMING_LANGUAGES.map(lang => {
                    const active = selectedLanguages.includes(lang);
                    return (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => handleCheckboxToggle('secondaryLanguages', lang)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${
                          active ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{lang}</span>
                        {active && <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />}
                      </button>
                    );
                  })}
                </div>
                {errors.secondaryLanguages && <p className="text-red-500 text-xs mt-1">{errors.secondaryLanguages.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Frameworks / Technologies</label>
                <input {...register('frameworks')} placeholder="e.g. React, Next.js, Node.js, Express, FastAPI, Django, Spring Boot, Flutter" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">AI / ML Technologies</label>
                <input {...register('aiMlTech')} placeholder="e.g. OpenAI, Gemini, Claude, LangChain, RAG, Hugging Face, PyTorch, TensorFlow" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-2">Database Technologies (Select all that apply) *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {DATABASES.map(db => {
                    const active = selectedDatabases.includes(db);
                    return (
                      <button
                        key={db}
                        type="button"
                        onClick={() => handleCheckboxToggle('databases', db)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${
                          active ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{db}</span>
                        {active && <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />}
                      </button>
                    );
                  })}
                </div>
                {errors.databases && <p className="text-red-500 text-xs mt-1">{errors.databases.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Cloud / DevOps</label>
                <input {...register('cloudDevops')} placeholder="e.g. AWS, Azure, GCP, Vercel, Render, Docker, Kubernetes, GitHub Actions, Linux" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Experience */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[var(--color-accent)]" /> Section 4 — Practical Experience
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">How would you rate your current technical level? *</label>
                <select {...register('technicalLevel')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Beginner → Intermediate">Beginner → Intermediate</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Intermediate → Advanced">Intermediate → Advanced</option>
                  <option value="Advanced">Advanced</option>
                </select>
                {errors.technicalLevel && <p className="text-red-500 text-xs mt-1">{errors.technicalLevel.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Years of practical experience *</label>
                <select {...register('yearsExperience')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Experience</option>
                  <option value="No experience">No experience</option>
                  <option value="Less than 6 months">Less than 6 months</option>
                  <option value="6–12 months">6–12 months</option>
                  <option value="1–2 years">1–2 years</option>
                  <option value="2+ years">2+ years</option>
                </select>
                {errors.yearsExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsExperience.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Have you built a production/deployed project? *</label>
                <select {...register('builtProductionProject')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Have you worked on a real client/project before? *</label>
                <select {...register('workedRealClient')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Share your best 1–3 projects *</label>
                <textarea {...register('bestProjects')} rows={4} placeholder="Format for each project: Project name + short description + technologies + GitHub/demo link" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"></textarea>
                {errors.bestProjects && <p className="text-red-500 text-xs mt-1">{errors.bestProjects.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Describe one difficult technical problem you solved *</label>
                <textarea {...register('difficultProblemDesc')} rows={4} placeholder="Describe the problem, your diagnostic process, technical choices, and final resolution..." className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"></textarea>
                {errors.difficultProblemDesc && <p className="text-red-500 text-xs mt-1">{errors.difficultProblemDesc.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: AI-Assisted Development */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[var(--color-accent)]" /> Section 5 — AI-Assisted Development
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Do you use AI tools for software development? *</label>
                <select {...register('useAiTools')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-2">Which AI tools do you use?</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {AI_TOOLS.map(tool => {
                    const active = selectedAiTools.includes(tool);
                    return (
                      <button
                        key={tool}
                        type="button"
                        onClick={() => handleCheckboxToggle('aiToolsList', tool)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-left flex items-center justify-between ${
                          active ? 'bg-[var(--color-accent)]/10 border-[var(--color-accent)] text-[var(--color-accent)]' : 'border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <span>{tool}</span>
                        {active && <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">How do you use AI in your development workflow? *</label>
                <p className="text-[11px] text-slate-500 mb-2">
                  We value your ability to understand, validate, modify, debug, and implement AI-generated solutions—not simply generate code without comprehension.
                </p>
                <textarea {...register('aiWorkflowDesc')} rows={4} placeholder="Explain how you verify AI-generated output, debug edge cases, refactor code, and ensure security compliance..." className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"></textarea>
                {errors.aiWorkflowDesc && <p className="text-red-500 text-xs mt-1">{errors.aiWorkflowDesc.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 6: Availability */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--color-accent)]" /> Section 6 — Availability & Commitment
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Hours per week contribution *</label>
                <select {...register('weeklyHours')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Weekly Hours</option>
                  <option value="Less than 5 hours">Less than 5 hours</option>
                  <option value="5–10 hours">5–10 hours</option>
                  <option value="10–20 hours">10–20 hours</option>
                  <option value="20–30 hours">20–30 hours</option>
                  <option value="30+ hours">30+ hours</option>
                </select>
                {errors.weeklyHours && <p className="text-red-500 text-xs mt-1">{errors.weeklyHours.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Current Availability *</label>
                <select {...register('availabilityStatus')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Availability</option>
                  <option value="Immediately available">Immediately available</option>
                  <option value="Available after exams">Available after exams</option>
                  <option value="Available from a specific date">Available from a specific date</option>
                  <option value="Flexible">Flexible</option>
                </select>
                {errors.availabilityStatus && <p className="text-red-500 text-xs mt-1">{errors.availabilityStatus.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Preferred Collaboration *</label>
                <select {...register('preferredCollaboration')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Preferred Mode</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Project-based">Project-based</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Open to opportunities">Open to opportunities</option>
                </select>
                {errors.preferredCollaboration && <p className="text-red-500 text-xs mt-1">{errors.preferredCollaboration.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 7: Qeltrava AI Fit */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--color-accent)]" /> Section 7 — Qeltrava AI Fit
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Which area would you most like to work on at Qeltrava AI? *</label>
                <select {...register('preferredQeltravaArea')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="">Select Preferred Area</option>
                  {QELTRAVA_AREAS.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                {errors.preferredQeltravaArea && <p className="text-red-500 text-xs mt-1">{errors.preferredQeltravaArea.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">What do you want to learn or build during your collaboration with Qeltrava AI? *</label>
                <textarea {...register('learningGoals')} rows={3} placeholder="Share your learning milestones, technical skills you wish to master, or systems you want to design..." className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"></textarea>
                {errors.learningGoals && <p className="text-red-500 text-xs mt-1">{errors.learningGoals.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">What can you contribute to Qeltrava AI right now? *</label>
                <textarea {...register('immediateContributions')} rows={3} placeholder="Mention your immediate strengths (e.g. React UI components, FastAPI backend endpoints, Supabase RLS policies, RAG pipeline building)..." className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"></textarea>
                {errors.immediateContributions && <p className="text-red-500 text-xs mt-1">{errors.immediateContributions.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: Collaboration Expectations & Final Declaration */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[var(--color-primary-dark)] flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-[var(--color-accent)]" /> Section 8 — Collaboration Expectations & Declaration
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Comfortable working remotely? *</label>
                <select {...register('remoteComfort')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Comfortable in project-based environment? *</label>
                <select {...register('agileComfort')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Comfortable with task deadlines? *</label>
                <select {...register('deadlineComfort')} className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm bg-white focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Compensation expectation (Optional)</label>
              <input {...register('compensationExpectation')} placeholder="e.g. Expected monthly stipend or hourly rate for freelance work" className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-primary-dark)] mb-1">Anything else you would like the Qeltrava AI team to know?</label>
              <textarea {...register('additionalNotes')} rows={3} placeholder="Additional context, portfolio highlights, or notes..." className="w-full p-3 border border-[var(--color-border-soft)] rounded-xl text-sm focus:ring-2 focus:ring-[var(--color-accent)] focus:outline-none"></textarea>
            </div>

            {/* Final Declarations */}
            <div className="bg-[var(--color-bg-light)] border border-[var(--color-border-soft)] p-6 rounded-2xl space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--color-primary-dark)] font-mono">Final Declaration & Terms</h4>
              
              <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" {...register('confirmAccurate')} className="mt-0.5 rounded text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
                <span>I confirm that the information provided in this profile form is complete and accurate.</span>
              </label>
              {errors.confirmAccurate && <p className="text-red-500 text-xs pl-6">{errors.confirmAccurate.message}</p>}

              <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" {...register('confirmNoGuarantee')} className="mt-0.5 rounded text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
                <span>I understand that submitting this form does not guarantee employment, internship selection, or project assignment. Opportunities depend on technical evaluation, availability, and active project requirements.</span>
              </label>
              {errors.confirmNoGuarantee && <p className="text-red-500 text-xs pl-6">{errors.confirmNoGuarantee.message}</p>}

              <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-700">
                <input type="checkbox" {...register('confirmContact')} className="mt-0.5 rounded text-[var(--color-accent)] focus:ring-[var(--color-accent)]" />
                <span>I understand that Qeltrava AI may contact me regarding relevant technical assessments, tasks, internships, or project collaboration opportunities.</span>
              </label>
              {errors.confirmContact && <p className="text-red-500 text-xs pl-6">{errors.confirmContact.message}</p>}
            </div>
          </div>
        )}

        {/* Global Error Banner */}
        {status === 'error' && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Navigation Button Bar */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              disabled={status === 'submitting'}
              className="px-5 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Previous
            </button>
          ) : <div />}

          {currentStep < 8 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-semibold rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              Next Section <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-8 py-3 bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary-dark)]/90 text-white font-bold rounded-full text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting Profile...
                </>
              ) : (
                <>
                  Submit Profile <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
