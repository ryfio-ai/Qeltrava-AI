import { DecisionEngineOutput, CalculationState } from './types';

export function deriveDecision(
  state: CalculationState,
  options: {
    primaryIssue?: string;
    recommendedAction?: string;
    priority?: DecisionEngineOutput['priority'];
    nextStep?: string;
  }
): DecisionEngineOutput {
  if (state === 'UNDEFINED') {
    return {
      primaryIssue: options.primaryIssue || 'Undefined input parameters.',
      recommendedAction: options.recommendedAction || 'Provide required shift operating duration.',
      priority: 'N/A',
      nextStep: options.nextStep || 'Enter valid operating parameters.',
    };
  }

  if (state === 'INVALID') {
    return {
      primaryIssue: options.primaryIssue || 'Input boundary violation.',
      recommendedAction: options.recommendedAction || 'Correct input values to maintain mathematical integrity.',
      priority: 'HIGH',
      nextStep: options.nextStep || 'Adjust parameters within allowable boundaries.',
    };
  }

  if (state === 'NO_DATA') {
    return {
      primaryIssue: options.primaryIssue || 'Insufficient telemetry or production data.',
      recommendedAction: options.recommendedAction || 'Log production output counts and operating metrics.',
      priority: 'MEDIUM',
      nextStep: options.nextStep || 'Record shift production outputs.',
    };
  }

  return {
    primaryIssue: options.primaryIssue || 'No critical issues detected.',
    recommendedAction: options.recommendedAction || 'Maintain standard operating procedures.',
    priority: options.priority || 'LOW',
    nextStep: options.nextStep || 'Continue monitoring real-time line metrics.',
  };
}
