export type CalculationState = 'VALID' | 'INVALID' | 'NO_DATA' | 'UNDEFINED';

export interface DecisionEngineOutput {
  primaryIssue: string;
  recommendedAction: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW' | 'N/A';
  nextStep: string;
}

export interface UniversalCalculationResult<T = number> {
  state: CalculationState;
  value: T | null;
  unit: string;
  formula: string;
  steps: string[];
  message?: string;
  decision: DecisionEngineOutput;
}

export interface ToolHandoffSnapshot<TData = Record<string, unknown>> {
  sourceToolId: string;
  targetToolId: string;
  timestamp: string;
  payload: TData;
  version: '1.0';
}

