export interface OEEMetrics {
  plannedProductionMinutes: number;
  downtimeMinutes: number;
  idealCycleTimeSeconds: number;
  totalUnitsProduced: number;
  goodUnitsProduced: number;
}

export type CalculationStatus = 'VALID' | 'INVALID' | 'NO_DATA' | 'UNDEFINED';

export interface OEECalculationResult {
  status: CalculationStatus;
  statusMessage?: string;
  availability: number | null; // percentage or null if UNDEFINED
  performance: number | null; // percentage or null if NO_DATA
  quality: number | null; // percentage or null if NO_DATA
  oee: number | null; // percentage or null if invalid/undefined
  scrapUnits: number;
  operatingMinutes: number;
  category: 'World Class' | 'Acceptable' | 'Needs Improvement' | 'Critical' | 'N/A';
  recommendations: string[];
  formulaBreakdown: {
    availabilityFormula: string;
    performanceFormula: string;
    qualityFormula: string;
    oeeFormula: string;
  };
}

export function calculateOEE(metrics: OEEMetrics): OEECalculationResult {
  const plannedMins = metrics.plannedProductionMinutes;
  const downtimeMins = metrics.downtimeMinutes;
  const totalUnits = metrics.totalUnitsProduced;
  const goodUnits = metrics.goodUnitsProduced;
  const idealCycleSec = metrics.idealCycleTimeSeconds;

  // Validation Checks
  if (plannedMins <= 0) {
    return {
      status: 'UNDEFINED',
      statusMessage: 'Planned production time must be greater than 0 minutes.',
      availability: null,
      performance: null,
      quality: null,
      oee: null,
      scrapUnits: 0,
      operatingMinutes: 0,
      category: 'N/A',
      recommendations: ['Specify valid planned shift production minutes.'],
      formulaBreakdown: {
        availabilityFormula: 'Availability = Operating Time / Planned Time (Planned Time is 0 → UNDEFINED)',
        performanceFormula: 'Performance = N/A',
        qualityFormula: 'Quality = N/A',
        oeeFormula: 'OEE = UNDEFINED',
      },
    };
  }

  if (downtimeMins < 0 || downtimeMins > plannedMins) {
    return {
      status: 'INVALID',
      statusMessage: `Downtime (${downtimeMins} mins) cannot be negative or exceed planned production time (${plannedMins} mins).`,
      availability: null,
      performance: null,
      quality: null,
      oee: null,
      scrapUnits: 0,
      operatingMinutes: 0,
      category: 'N/A',
      recommendations: ['Correct downtime inputs to be within planned shift duration.'],
      formulaBreakdown: {
        availabilityFormula: 'Availability = INVALID (Downtime exceeds planned time)',
        performanceFormula: 'Performance = N/A',
        qualityFormula: 'Quality = N/A',
        oeeFormula: 'OEE = INVALID',
      },
    };
  }

  if (goodUnits > totalUnits) {
    return {
      status: 'INVALID',
      statusMessage: `Good units (${goodUnits}) cannot exceed total units produced (${totalUnits}).`,
      availability: null,
      performance: null,
      quality: null,
      oee: null,
      scrapUnits: 0,
      operatingMinutes: Math.max(0, plannedMins - downtimeMins),
      category: 'N/A',
      recommendations: ['Verify non-defective count does not exceed total production count.'],
      formulaBreakdown: {
        availabilityFormula: 'Availability = Calculated',
        performanceFormula: 'Performance = Calculated',
        qualityFormula: 'Quality = INVALID (Good units > Total units)',
        oeeFormula: 'OEE = INVALID',
      },
    };
  }

  const operatingMinutes = Math.max(0, plannedMins - downtimeMins);
  const operatingSeconds = operatingMinutes * 60;

  // 1. Availability
  const availability = (operatingMinutes / plannedMins) * 100;

  // 2. Performance
  let performance: number | null = null;
  let performanceStr = 'NO_DATA (Operating time is 0)';
  if (operatingSeconds > 0) {
    performance = Math.min(100, ((idealCycleSec * totalUnits) / operatingSeconds) * 100);
    performanceStr = `(${idealCycleSec}s × ${totalUnits} units) / ${operatingSeconds}s = ${performance.toFixed(1)}%`;
  }

  // 3. Quality
  let quality: number | null = null;
  let qualityStr = 'NO_DATA (Total units produced is 0)';
  if (totalUnits > 0) {
    quality = (goodUnits / totalUnits) * 100;
    qualityStr = `${goodUnits} Good / ${totalUnits} Total = ${quality.toFixed(1)}%`;
  }

  // Check if we have NO_DATA state for OEE
  if (performance === null || quality === null) {
    return {
      status: 'NO_DATA',
      statusMessage: totalUnits === 0 ? 'No production units recorded for this period.' : 'Machine operating time is zero.',
      availability: Number(availability.toFixed(1)),
      performance,
      quality,
      oee: null,
      scrapUnits: 0,
      operatingMinutes,
      category: 'N/A',
      recommendations: ['Log production output or operating hours to compute OEE.'],
      formulaBreakdown: {
        availabilityFormula: `Availability = ${operatingMinutes} mins / ${plannedMins} mins = ${availability.toFixed(1)}%`,
        performanceFormula: `Performance = ${performanceStr}`,
        qualityFormula: `Quality = ${qualityStr}`,
        oeeFormula: 'OEE = N/A (Requires both Performance and Quality metrics)',
      },
    };
  }

  // 4. Overall OEE
  const oee = (availability / 100) * (performance / 100) * (quality / 100) * 100;
  const scrapUnits = Math.max(0, totalUnits - goodUnits);

  let category: OEECalculationResult['category'] = 'Critical';
  if (oee >= 85) category = 'World Class';
  else if (oee >= 75) category = 'Acceptable';
  else if (oee >= 60) category = 'Needs Improvement';

  const recommendations: string[] = [];
  if (availability < 90) {
    recommendations.push(`Availability is ${availability.toFixed(1)}% (Target: ≥90%). Investigate ${downtimeMins} mins downtime.`);
  }
  if (performance < 95) {
    recommendations.push(`Performance is ${performance.toFixed(1)}% (Target: ≥95%). Reduce micro-stoppages.`);
  }
  if (quality < 99) {
    recommendations.push(`Quality is ${quality.toFixed(1)}% (Target: ≥99%). Inspect ${scrapUnits} defect units.`);
  }
  if (recommendations.length === 0) {
    recommendations.push('Operating at World Class OEE. Standardize line procedures.');
  }

  return {
    status: 'VALID',
    availability: Number(availability.toFixed(1)),
    performance: Number(performance.toFixed(1)),
    quality: Number(quality.toFixed(1)),
    oee: Number(oee.toFixed(1)),
    scrapUnits,
    operatingMinutes,
    category,
    recommendations,
    formulaBreakdown: {
      availabilityFormula: `Availability = ${operatingMinutes} mins Operating / ${plannedMins} mins Planned = ${availability.toFixed(1)}%`,
      performanceFormula: `Performance = ${performanceStr}`,
      qualityFormula: `Quality = ${qualityStr}`,
      oeeFormula: `OEE = ${availability.toFixed(1)}% × ${performance.toFixed(1)}% × ${quality.toFixed(1)}% = ${oee.toFixed(1)}%`,
    },
  };
}

// Simple Deterministic PRNG for Seeded Telemetry
function pseudoRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export interface TelemetrySample {
  timestamp: string;
  machineId: string;
  temperatureC: number;
  vibrationMmS: number;
  pressureBar: number;
  cycleTimeSec: number;
  status: 'OPERATIONAL' | 'WARNING' | 'ANOMALY';
  defectsDetected: number;
}

export function generateSyntheticTelemetry(
  machineId: string = 'CNC-LINE-01',
  samplesCount: number = 15,
  seed?: number
): TelemetrySample[] {
  const count = Math.max(1, Math.min(100, samplesCount));
  const results: TelemetrySample[] = [];
  const now = new Date(1773187200000); // Fixed base date if seeded
  let currentSeed = seed ?? Math.floor(Math.random() * 100000);

  const getRandom = () => (seed !== undefined ? pseudoRandom(currentSeed++) : Math.random());

  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 1000);
    const rVal = getRandom();
    const isAnomaly = rVal < 0.15;
    const isWarning = !isAnomaly && rVal < 0.4;

    const baseTemp = 65;
    const tempNoise = (getRandom() - 0.5) * 4;
    const temperatureC = Number(
      (isAnomaly ? 88 + getRandom() * 8 : isWarning ? 76 + getRandom() * 5 : baseTemp + tempNoise).toFixed(1)
    );

    const baseVib = 2.1;
    const vibNoise = (getRandom() - 0.5) * 0.4;
    const vibrationMmS = Number(
      (isAnomaly ? 6.2 + getRandom() * 2 : isWarning ? 4.1 + getRandom() * 1 : baseVib + vibNoise).toFixed(2)
    );

    const pressureBar = Number((isAnomaly ? 4.2 + getRandom() * 0.8 : 5.5 + (getRandom() - 0.5) * 0.3).toFixed(2));
    const cycleTimeSec = Number((12.5 + (getRandom() - 0.5) * 1.2).toFixed(1));
    const defectsDetected = isAnomaly ? Math.floor(getRandom() * 3) + 1 : 0;

    results.push({
      timestamp: time.toISOString().substring(11, 19),
      machineId: machineId.trim() || 'MACHINE-01',
      temperatureC,
      vibrationMmS,
      pressureBar,
      cycleTimeSec,
      status: isAnomaly ? 'ANOMALY' : isWarning ? 'WARNING' : 'OPERATIONAL',
      defectsDetected,
    });
  }

  return results;
}

export function convertTelemetryToCSV(samples: TelemetrySample[], seed?: number): string {
  const metadata = `# dataset_type: synthetic\n# generator_version: 1.0\n# seed: ${seed ?? 'random'}\n# machine_id: ${samples[0]?.machineId || 'MACHINE-01'}\n`;
  const header = 'timestamp,machine_id,temperature_c,vibration_mms,pressure_bar,cycle_time_sec,status,defects_detected\n';
  const rows = samples
    .map(
      (s) =>
        `${s.timestamp},${s.machineId},${s.temperatureC},${s.vibrationMmS},${s.pressureBar},${s.cycleTimeSec},${s.status},${s.defectsDetected}`
    )
    .join('\n');
  return metadata + header + rows;
}
