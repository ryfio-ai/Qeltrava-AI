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
