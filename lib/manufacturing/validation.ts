export interface FieldValidationError {
  field: string;
  message: string;
  rule: string;
}

export interface ValidationSummary {
  isValid: boolean;
  errors: FieldValidationError[];
}

export function validatePositiveNumber(val: number, fieldName: string, max?: number): FieldValidationError | null {
  if (isNaN(val) || val === null || val === undefined) {
    return { field: fieldName, message: `${fieldName} must be a valid numeric value.`, rule: 'REQUIRED_NUMERIC' };
  }
  if (val < 0) {
    return { field: fieldName, message: `${fieldName} cannot be negative.`, rule: 'NON_NEGATIVE' };
  }
  if (max !== undefined && val > max) {
    return { field: fieldName, message: `${fieldName} (${val}) cannot exceed maximum limit (${max}).`, rule: 'MAX_BOUND' };
  }
  return null;
}

export function validateRange(val: number, fieldName: string, min: number, max: number): FieldValidationError | null {
  if (isNaN(val) || val === null || val === undefined) {
    return { field: fieldName, message: `${fieldName} must be a valid numeric value.`, rule: 'REQUIRED_NUMERIC' };
  }
  if (val < min || val > max) {
    return { field: fieldName, message: `${fieldName} must be between ${min} and ${max}.`, rule: 'OUT_OF_RANGE' };
  }
  return null;
}
