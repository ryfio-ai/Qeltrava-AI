import { UniversalCalculationResult } from './types';

export interface TaktTimeInput {
  availableProductionMinutes: number;
  customerDemandUnits: number;
}

export function calculateTaktTime(input: TaktTimeInput): UniversalCalculationResult<number> {
  const availMins = input.availableProductionMinutes;
  const demand = input.customerDemandUnits;

  if (availMins <= 0) {
    return {
      state: 'UNDEFINED',
      value: null,
      unit: 'seconds / unit',
      formula: 'Takt Time = Available Operating Time (sec) / Customer Demand (units)',
      steps: ['Available production operating time must be > 0 minutes.'],
      message: 'Operating shift duration must be greater than zero.',
      decision: {
        primaryIssue: 'No available shift time defined.',
        recommendedAction: 'Specify total operating minutes available per shift.',
        priority: 'N/A',
        nextStep: 'Enter operating shift minutes.',
      },
    };
  }

  if (demand <= 0) {
    return {
      state: 'NO_DATA',
      value: null,
      unit: 'seconds / unit',
      formula: 'Takt Time = Available Operating Time (sec) / Customer Demand (units)',
      steps: [
        `Available Operating Time = ${availMins} mins = ${availMins * 60} seconds`,
        'Customer Demand = 0 units (No demand recorded for period)',
      ],
      message: 'No customer demand specified for this shift period.',
      decision: {
        primaryIssue: 'Customer demand rate is zero.',
        recommendedAction: 'Log target order demand quantity for the planned shift.',
        priority: 'N/A',
        nextStep: 'Enter required production demand units.',
      },
    };
  }

  const availSeconds = availMins * 60;
  const taktTimeSec = Number((availSeconds / demand).toFixed(1));
  const hourlyRate = Number((demand / (availMins / 60)).toFixed(0));

  const priority = taktTimeSec < 10 ? 'HIGH' : taktTimeSec < 20 ? 'MEDIUM' : 'LOW';

  return {
    state: 'VALID',
    value: taktTimeSec,
    unit: 'seconds / unit',
    formula: 'Takt Time = Available Production Time (seconds) ÷ Customer Demand (units)',
    steps: [
      `Step 1: Convert Operating Time = ${availMins} minutes × 60 = ${availSeconds} seconds`,
      `Step 2: Calculate Takt Time = ${availSeconds} seconds ÷ ${demand} units = ${taktTimeSec} seconds / unit`,
      `Step 3: Equivalent Hourly Target = ${demand} units ÷ ${(availMins / 60).toFixed(1)} hrs = ${hourlyRate} units / hour`,
    ],
    decision: {
      primaryIssue: taktTimeSec < 12 ? 'Aggressive production pace required.' : 'Balanced production pace.',
      recommendedAction: taktTimeSec < 12 ? 'Balance assembly workstations to eliminate bottleneck friction.' : 'Maintain current production line speed.',
      priority,
      nextStep: 'Compare measured workstation Cycle Time against Takt Time target.',
    },
  };
}
