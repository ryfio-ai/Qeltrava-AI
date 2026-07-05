// platform/modules/forms/FormRenderer.tsx
// Dynamic Form Engine: Renders interactive forms from JSON schemas and handles validations

'use client';

import React, { useState } from 'react';
import { Button, Input, Textarea, Select, Alert } from '@/design-system';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface FormFieldSchema {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'file';
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select field type
  validationPattern?: string; // Regex match helper
  validationErrorMsg?: string;
}

interface FormRendererProps {
  fields: FormFieldSchema[];
  onSubmit: (formData: Record<string, any>) => Promise<{ success: boolean; message?: string }>;
  submitButtonText?: string;
  successMessage?: string;
}

export function DynamicFormRenderer({
  fields,
  onSubmit,
  submitButtonText = 'Submit Form',
  successMessage = 'Your submission was logged successfully.'
}: FormRendererProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState(false);

  // Field validation logic
  const validateField = (field: FormFieldSchema, value: any): string => {
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.label} is required.`;
    }
    
    if (value) {
      if (field.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address.';
        }
      }
      
      if (field.type === 'tel') {
        const telRegex = /^\+?[0-9\s-]{10,15}$/;
        if (!telRegex.test(value)) {
          return 'Please enter a valid phone number.';
        }
      }

      if (field.validationPattern) {
        const regex = new RegExp(field.validationPattern);
        if (!regex.test(value)) {
          return field.validationErrorMsg || `Invalid format for ${field.label}.`;
        }
      }
    }
    
    return '';
  };

  const handleInputChange = (name: string, value: any) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    setServerSuccess(false);

    // Validate all fields
    const validationErrors: Record<string, string> = {};
    fields.forEach(field => {
      const val = formValues[field.name];
      const err = validateField(field, val);
      if (err) {
        validationErrors[field.name] = err;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await onSubmit(formValues);
      if (response.success) {
        setServerSuccess(true);
        setFormValues({}); // Clear values
      } else {
        setServerError(response.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setServerError('A network error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {serverError && (
        <Alert variant="danger" className="bg-red-950/20 border-red-900/40 text-red-200">
          <AlertCircle className="w-4 h-4 mr-2" />
          {serverError}
        </Alert>
      )}

      {serverSuccess && (
        <Alert variant="success" className="bg-emerald-950/20 border-emerald-900/40 text-emerald-200">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          {successMessage}
        </Alert>
      )}

      <div className="space-y-4 text-xs">
        {fields.map(field => {
          const hasError = !!errors[field.name];
          
          return (
            <div key={field.name} className="space-y-1.5">
              <label className="block font-semibold text-[var(--color-primary-dark)] opacity-90 uppercase tracking-wider">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <Textarea
                  placeholder={field.placeholder}
                  value={formValues[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className={`border-slate-200 text-xs text-slate-800 focus:border-[var(--color-accent)] ${
                    hasError ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                />
              ) : field.type === 'select' ? (
                <Select
                  value={formValues[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className={`border-slate-200 text-xs text-slate-800 focus:border-[var(--color-accent)] ${
                    hasError ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                >
                  <option value="">Select an option</option>
                  {(field.options || []).map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </Select>
              ) : field.type === 'file' ? (
                <div className="relative">
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        // In real dynamic forms, convert to base64 or upload to server,
                        // for state storage we save standard metadata.
                        handleInputChange(field.name, {
                          name: file.name,
                          size: file.size,
                          type: file.type,
                          fileObj: file
                        });
                      }
                    }}
                    className={`border-slate-200 text-xs text-slate-800 focus:border-[var(--color-accent)] ${
                      hasError ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                  />
                </div>
              ) : (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formValues[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className={`border-slate-200 text-xs text-slate-800 focus:border-[var(--color-accent)] ${
                    hasError ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                />
              )}

              {hasError && (
                <p className="text-[10px] font-semibold text-red-500">{errors[field.name]}</p>
              )}
            </div>
          );
        })}
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        className="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white rounded-full text-xs font-semibold h-10 mt-6"
      >
        {submitButtonText}
      </Button>
    </form>
  );
}
