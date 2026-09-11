import { UniversalCalculationResult } from './types';

export interface OEEMetricsInput {
  plannedProductionMinutes: number;
  downtimeMinutes: number;
  idealCycleTimeSeconds: number;
  totalUnitsProduced: number;
  goodUnitsProduced: number;
}

export interface DetailedOEEResult extends UniversalCalculationResult<number> {
  availability: number | null;
  performance: number | null;
  quality: number | null;
  scrapUnits: number;
  operatingMinutes: number;
  category: 'World Class' | 'Acceptable' | 'Needs Improvement' | 'Critical' | 'N/A';
}

export function calculateOEE(metrics: OEEMetricsInput): DetailedOEEResult {
  const plannedMins = metrics.plannedProductionMinutes;
  const downtimeMins = metrics.downtimeMinutes;
  const totalUnits = metrics.totalUnitsProduced;
  const goodUnits = metrics.goodUnitsProduced;
  const idealCycleSec = metrics.idealCycleTimeSeconds;

  // 1. UNDEFINED Check
  if (plannedMins <= 0) {
    return {
      state: 'UNDEFINED',
      value: null,
      unit: '%',
      formula: 'OEE = Availability × Performance × Quality',
      steps: ['Planned production time must be > 0 minutes to evaluate OEE.'],
      message: 'Insufficient planned production time specified.',
      availability: null,
      performance: null,
      quality: null,
      scrapUnits: 0,
      operatingMinutes: 0,
      category: 'N/A',
      decision: {
        primaryIssue: 'No planned production shift duration set.',
        recommendedAction: 'Specify valid operating shift minutes (e.g. 480 mins for an 8-hour shift).',
        priority: 'N/A',
        nextStep: 'Enter planned production shift time in minutes.',
      },
    };
  }

  // 2. INVALID Check (Downtime)
  if (downtimeMins < 0 || downtimeMins > plannedMins) {
    return {
      state: 'INVALID',
      value: null,
      unit: '%',
      formula: 'OEE = Availability × Performance × Quality',
      steps: [`Downtime (${downtimeMins} mins) cannot be negative or exceed planned shift time (${plannedMins} mins).`],
      message: 'Invalid downtime input value.',
      availability: null,
      performance: null,
      quality: null,
      scrapUnits: 0,
      operatingMinutes: 0,
      category: 'N/A',
      decision: {
        primaryIssue: 'Downtime exceeds total planned shift time.',
        recommendedAction: 'Correct downtime logging duration to be within shift boundaries.',
        priority: 'HIGH',
        nextStep: 'Adjust downtime slider to a value less than planned shift minutes.',
      },
    };
  }

  // 3. INVALID Check (Good vs Total Units)
  if (goodUnits > totalUnits) {
    return {
      state: 'INVALID',
      value: null,
      unit: '%',
      formula: 'Quality = Good Units / Total Units',
      steps: [`Good non-defective units (${goodUnits}) cannot exceed total units produced (${totalUnits}).`],
      message: 'Invalid production count ratio.',
      availability: null,
      performance: null,
      quality: null,
      scrapUnits: 0,
      operatingMinutes: Math.max(0, plannedMins - downtimeMins),
      category: 'N/A',
      decision: {
        primaryIssue: 'Non-defective count exceeds total production output count.',
        recommendedAction: 'Audit manual entry or PLC counter sensors for unit miscounting.',
        priority: 'HIGH',
        nextStep: 'Adjust good unit count to be less than or equal to total units produced.',
      },
    };
  }

  const operatingMinutes = Math.max(0, plannedMins - downtimeMins);
  const operatingSeconds = operatingMinutes * 60;

  const availability = (operatingMinutes / plannedMins) * 100;

  // 4. NO_DATA Checks
  let performance: number | null = null;
  let performanceStep = 'Performance: N/A (Operating time is 0)';
  if (operatingSeconds > 0) {
    const rawPerf = ((idealCycleSec * totalUnits) / operatingSeconds) * 100;
    if (rawPerf > 100) {
      return {
        state: 'INVALID',
        value: null,
        unit: '%',
        formula: 'Performance = (Ideal Cycle Time × Total Units) / Operating Time',
        steps: [`Calculated performance (${rawPerf.toFixed(1)}%) exceeds 100%. Verify ideal cycle time and unit count inputs.`],
        message: 'Calculated performance rate exceeds 100% maximum capacity.',
        availability: Number(availability.toFixed(1)),
        performance: null,
        quality: null,
        scrapUnits: Math.max(0, totalUnits - goodUnits),
        operatingMinutes,
        category: 'N/A',
        decision: {
          primaryIssue: 'Calculated performance rate exceeds 100% capacity.',
          recommendedAction: 'Verify if ideal cycle time target is set too high or if total units produced was mis-entered.',
          priority: 'HIGH',
          nextStep: 'Check ideal cycle time setting per machine specifications.',
        },
      };
    }
    performance = rawPerf;
    performanceStep = `Performance = ((${idealCycleSec}s × ${totalUnits} units) / ${operatingSeconds}s) × 100 = ${performance.toFixed(1)}%`;
  }

  let quality: number | null = null;
  let qualityStep = 'Quality: N/A (Total units produced is 0)';
  if (totalUnits > 0) {
    quality = (goodUnits / totalUnits) * 100;
    qualityStep = `Quality = (${goodUnits} Good / ${totalUnits} Total) × 100 = ${quality.toFixed(1)}%`;
  }

  if (performance === null || quality === null) {
    return {
      state: 'NO_DATA',
      value: null,
      unit: '%',
      formula: 'OEE = Availability × Performance × Quality',
      steps: [
        `Availability = ${operatingMinutes} mins / ${plannedMins} mins = ${availability.toFixed(1)}%`,
        performanceStep,
        qualityStep,
      ],
      message: totalUnits === 0 ? 'No production units recorded for this shift.' : 'Operating time is zero.',
      availability: Number(availability.toFixed(1)),
      performance,
      quality,
      scrapUnits: 0,
      operatingMinutes,
      category: 'N/A',
      decision: {
        primaryIssue: 'Missing production or operating time data to complete OEE calculation.',
        recommendedAction: 'Log machine operating minutes and production output counts.',
        priority: 'MEDIUM',
        nextStep: 'Enter non-zero production counts or downtime values.',
      },
    };
  }

  // 5. VALID Calculation
  const oee = (availability / 100) * (performance / 100) * (quality / 100) * 100;
  const scrapUnits = Math.max(0, totalUnits - goodUnits);

  let category: DetailedOEEResult['category'] = 'Critical';
  if (oee >= 85) category = 'World Class';
  else if (oee >= 75) category = 'Acceptable';
  else if (oee >= 60) category = 'Needs Improvement';

  const recommendations: string[] = [];
  if (availability < 90) {
    recommendations.push(`Availability is ${availability.toFixed(1)}% (Target: ≥90%). Address ${downtimeMins} mins downtime.`);
  }
  if (performance < 95) {
    recommendations.push(`Performance is ${performance.toFixed(1)}% (Target: ≥95%). Reduce micro-stoppages.`);
  }
  if (quality < 99) {
    recommendations.push(`Quality rate is ${quality.toFixed(1)}% (Target: ≥99%). Inspect ${scrapUnits} defect units.`);
  }
  if (recommendations.length === 0) {
    recommendations.push('Operating at World Class OEE. Standardize line preventative maintenance.');
  }

  return {
    state: 'VALID',
    value: Number(oee.toFixed(1)),
    unit: '%',
    formula: 'OEE = Availability × Performance × Quality',
    steps: [
      `Step 1: Availability = ${operatingMinutes} mins / ${plannedMins} mins = ${availability.toFixed(1)}%`,
      `Step 2: ${performanceStep}`,
      `Step 3: ${qualityStep}`,
      `Step 4: OEE = ${availability.toFixed(1)}% × ${performance.toFixed(1)}% × ${quality.toFixed(1)}% = ${oee.toFixed(1)}%`,
    ],
    availability: Number(availability.toFixed(1)),
    performance: Number(performance.toFixed(1)),
    quality: Number(quality.toFixed(1)),
    scrapUnits,
    operatingMinutes,
    category,
    decision: {
      primaryIssue: availability < 90 ? 'Availability Loss' : performance < 95 ? 'Performance Loss' : quality < 99 ? 'Quality Defect Loss' : 'None',
      recommendedAction: recommendations[0],
      priority: oee < 60 ? 'HIGH' : oee < 75 ? 'MEDIUM' : 'LOW',
      nextStep: 'Compare line performance metrics against weekly benchmark target.',
    },
  };
}
