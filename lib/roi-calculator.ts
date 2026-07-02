export type ProcessType = 'document-processing' | 'customer-support' | 'data-entry' | 'approval-workflows' | 'other';

export interface RoiResults {
  annualCost: number;
  savingsMin: number;
  savingsMax: number;
  implCostMin: number;
  implCostMax: number;
  paybackMin: number; // in months
  paybackMax: number; // in months
}

export function calculateAnnualCost(people: number, rate: number, hours: number): number {
  return people * rate * hours * 52;
}

export function getSavingsPercentages(process: ProcessType): { minPct: number; maxPct: number } {
  switch (process) {
    case 'document-processing':
      return { minPct: 0.50, maxPct: 0.70 };
    case 'customer-support':
      return { minPct: 0.40, maxPct: 0.60 };
    case 'data-entry':
      return { minPct: 0.55, maxPct: 0.75 };
    case 'approval-workflows':
      return { minPct: 0.45, maxPct: 0.65 };
    case 'other':
    default:
      return { minPct: 0.40, maxPct: 0.60 };
  }
}

export function getImplementationCosts(process: ProcessType): { min: number; max: number } {
  switch (process) {
    case 'document-processing':
      return { min: 15000, max: 30000 };
    case 'customer-support':
      return { min: 20000, max: 40000 };
    case 'data-entry':
      return { min: 10000, max: 25000 };
    case 'approval-workflows':
      return { min: 12000, max: 28000 };
    case 'other':
    default:
      return { min: 15000, max: 35000 };
  }
}

export function calculateRoi(people: number, rate: number, hours: number, process: ProcessType): RoiResults {
  const annualCost = calculateAnnualCost(people, rate, hours);
  const { minPct, maxPct } = getSavingsPercentages(process);
  
  const savingsMin = Math.round(annualCost * minPct);
  const savingsMax = Math.round(annualCost * maxPct);
  
  const { min: implCostMin, max: implCostMax } = getImplementationCosts(process);
  
  // Calculate payback period: (Implementation Cost / Monthly Savings)
  // We compute the range of payback:
  // - Fastest payback: lowest impl cost / highest monthly savings
  // - Slowest payback: highest impl cost / lowest monthly savings
  const monthlySavingsMin = savingsMin / 12;
  const monthlySavingsMax = savingsMax / 12;
  
  let paybackMin = 0;
  let paybackMax = 0;
  
  if (monthlySavingsMax > 0) {
    paybackMin = parseFloat((implCostMin / monthlySavingsMax).toFixed(1));
  }
  if (monthlySavingsMin > 0) {
    paybackMax = parseFloat((implCostMax / monthlySavingsMin).toFixed(1));
  }
  
  return {
    annualCost,
    savingsMin,
    savingsMax,
    implCostMin,
    implCostMax,
    paybackMin: isNaN(paybackMin) ? 0 : paybackMin,
    paybackMax: isNaN(paybackMax) ? 0 : paybackMax
  };
}
