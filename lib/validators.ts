import { z } from 'zod';

export const leadFormSchema = z.object({
  path: z.enum(['general', 'sales', 'security', 'partnerships']),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  website: z.string().optional(),
  projectType: z.string().optional(),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  vulnerabilityDesc: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
  honeypot: z.string().max(0, "Spam detected").optional()
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const consultFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company is required"),
  companySize: z.string().min(1, "Please select company size"),
  industry: z.string().min(1, "Please select industry"),
  goal: z.string().min(10, "Please describe your goal"),
  problem: z.string().min(10, "Please describe your current problem"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  systems: z.string().min(2, "Please list involved systems"),
  consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
  honeypot: z.string().max(0, "Spam detected").optional()
});

export type ConsultFormValues = z.infer<typeof consultFormSchema>;

export const talentProfileSchema = z.object({
  // Section 1 — Personal Information
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().min(8, "Valid WhatsApp number is required"),
  location: z.string().min(2, "Current location is required"),
  linkedin: z.string().url("Valid LinkedIn URL is required"),
  github: z.string().optional(),
  portfolio: z.string().optional(),

  // Section 2 — Education
  degree: z.string().min(1, "Degree / Qualification is required"),
  specialization: z.string().min(2, "Specialization / Department is required"),
  college: z.string().min(2, "College / University is required"),
  graduationYear: z.string().min(4, "Graduation year is required"),
  currentStatus: z.string().min(1, "Current status is required"),

  // Section 3 — Technical Skills
  primaryInterest: z.string().min(1, "Primary area of interest is required"),
  secondaryLanguages: z.array(z.string()).min(1, "Select at least one programming language"),
  frameworks: z.string().optional(),
  aiMlTech: z.string().optional(),
  databases: z.array(z.string()).min(1, "Select at least one database technology"),
  cloudDevops: z.string().optional(),

  // Section 4 — Experience
  technicalLevel: z.string().min(1, "Current technical level is required"),
  yearsExperience: z.string().min(1, "Years of practical experience is required"),
  builtProductionProject: z.string().min(1, "Please select whether you built a production project"),
  bestProjects: z.string().min(10, "Please share 1-3 best projects (Name + description + tech + link)"),
  workedRealClient: z.string().min(1, "Please select whether you worked on a real client project"),
  difficultProblemDesc: z.string().min(10, "Please describe a difficult technical problem you solved"),

  // Section 5 — AI-Assisted Development
  useAiTools: z.string().min(1, "Please indicate if you use AI tools"),
  aiToolsList: z.array(z.string()).default([]),
  aiWorkflowDesc: z.string().min(10, "Please describe how you use AI in your development workflow"),

  // Section 6 — Availability
  weeklyHours: z.string().min(1, "Realistic weekly contribution hours required"),
  availabilityStatus: z.string().min(1, "Current availability is required"),
  preferredCollaboration: z.string().min(1, "Preferred collaboration mode is required"),

  // Section 7 — Qeltrava AI
  preferredQeltravaArea: z.string().min(1, "Preferred Qeltrava area is required"),
  learningGoals: z.string().min(5, "Please state what you want to learn or build"),
  immediateContributions: z.string().min(5, "Please state what you can contribute right now"),

  // Section 8 — Collaboration Expectations
  remoteComfort: z.string().min(1, "Remote work comfort response required"),
  agileComfort: z.string().min(1, "Changing requirements response required"),
  deadlineComfort: z.string().min(1, "Deadline response required"),
  compensationExpectation: z.string().optional(),
  additionalNotes: z.string().optional(),

  // Final Declaration Checkboxes
  confirmAccurate: z.boolean().refine(val => val === true, "You must confirm accuracy"),
  confirmNoGuarantee: z.boolean().refine(val => val === true, "You must acknowledge opportunity terms"),
  confirmContact: z.boolean().refine(val => val === true, "You must agree to be contacted"),

  honeypot: z.string().max(0, "Spam detected").optional()
});

export type TalentProfileFormValues = z.infer<typeof talentProfileSchema>;

export const taskEvaluationRubricSchema = z.object({
  candidateId: z.string().min(1),
  submissionId: z.string().min(1),
  functionalScore: z.number().min(0).max(25),      // 25% (11.25 pts max)
  codeQualityScore: z.number().min(0).max(15),     // 15% (6.75 pts max)
  architectureScore: z.number().min(0).max(15),    // 15% (6.75 pts max)
  problemSolvingScore: z.number().min(0).max(15),  // 15% (6.75 pts max)
  uiUxScore: z.number().min(0).max(10),            // 10% (4.50 pts max)
  testingScore: z.number().min(0).max(10),         // 10% (4.50 pts max)
  documentationScore: z.number().min(0).max(5),     // 5% (2.25 pts max)
  aiUnderstandingScore: z.number().min(0).max(5),  // 5% (2.25 pts max)
  evaluatorFeedback: z.string().min(5, "Feedback is required")
});

export type TaskEvaluationRubricValues = z.infer<typeof taskEvaluationRubricSchema>;

export const interviewEvaluationSchema = z.object({
  candidateId: z.string().min(1),
  technicalUnderstandingScore: z.number().min(0).max(20), // 20 pts max
  communicationScore: z.number().min(0).max(10),          // 10 pts max
  reliabilityOwnershipScore: z.number().min(0).max(5),      // 5 pts max
  interviewNotes: z.string().min(5, "Interview notes required")
});

export type InterviewEvaluationValues = z.infer<typeof interviewEvaluationSchema>;

