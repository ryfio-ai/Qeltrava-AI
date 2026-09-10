export interface OEEMetrics {
  plannedProductionMinutes: number;
  downtimeMinutes: number;
  idealCycleTimeSeconds: number;
  totalUnitsProduced: number;
  goodUnitsProduced: number;
}

export interface OEECalculationResult {
  availability: number; // percentage (0-100)
  performance: number; // percentage (0-100)
  quality: number; // percentage (0-100)
  oee: number; // percentage (0-100)
  scrapUnits: number;
  operatingMinutes: number;
  statusCategory: 'World Class' | 'Acceptable' | 'Needs Improvement' | 'Critical';
  recommendations: string[];
}

export function calculateOEE(metrics: OEEMetrics): OEECalculationResult {
  const operatingMinutes = Math.max(0, metrics.plannedProductionMinutes - metrics.downtimeMinutes);
  
  // Availability = Operating Time / Planned Production Time
  const availability = metrics.plannedProductionMinutes > 0
    ? (operatingMinutes / metrics.plannedProductionMinutes) * 100
    : 0;

  // Performance = (Ideal Cycle Time × Total Units) / Operating Time in seconds
  const operatingSeconds = operatingMinutes * 60;
  const performance = operatingSeconds > 0
    ? Math.min(100, ((metrics.idealCycleTimeSeconds * metrics.totalUnitsProduced) / operatingSeconds) * 100)
    : 0;

  // Quality = Good Units / Total Units
  const quality = metrics.totalUnitsProduced > 0
    ? (metrics.goodUnitsProduced / metrics.totalUnitsProduced) * 100
    : 0;

  const oee = (availability / 100) * (performance / 100) * (quality / 100) * 100;
  const scrapUnits = Math.max(0, metrics.totalUnitsProduced - metrics.goodUnitsProduced);

  let statusCategory: OEECalculationResult['statusCategory'] = 'Critical';
  if (oee >= 85) statusCategory = 'World Class';
  else if (oee >= 75) statusCategory = 'Acceptable';
  else if (oee >= 60) statusCategory = 'Needs Improvement';

  const recommendations: string[] = [];
  if (availability < 90) {
    recommendations.push('Implement predictive maintenance on high-downtime machine components to raise availability above 90%.');
  }
  if (performance < 95) {
    recommendations.push('Optimize feeder speed and reduce micro-stoppages to improve operational performance rate.');
  }
  if (quality < 99) {
    recommendations.push('Deploy automated computer vision surface defect inspection to eliminate defect leakage and boost quality rate.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Maintain current operating procedures. Benchmark secondary production lines for process standardization.');
  }

  return {
    availability: Number(availability.toFixed(1)),
    performance: Number(performance.toFixed(1)),
    quality: Number(quality.toFixed(1)),
    oee: Number(oee.toFixed(1)),
    scrapUnits,
    operatingMinutes,
    statusCategory,
    recommendations,
  };
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
  machineId: string = 'CNC-CNC-04',
  samplesCount: number = 20
): TelemetrySample[] {
  const results: TelemetrySample[] = [];
  const now = new Date();

  for (let i = samplesCount - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 1000);
    const isAnomaly = Math.random() < 0.15;
    const isWarning = !isAnomaly && Math.random() < 0.25;

    const baseTemp = 65;
    const tempNoise = (Math.random() - 0.5) * 4;
    const temperatureC = Number((isAnomaly ? 88 + Math.random() * 8 : isWarning ? 76 + Math.random() * 5 : baseTemp + tempNoise).toFixed(1));

    const baseVib = 2.1;
    const vibNoise = (Math.random() - 0.5) * 0.4;
    const vibrationMmS = Number((isAnomaly ? 6.2 + Math.random() * 2 : isWarning ? 4.1 + Math.random() * 1 : baseVib + vibNoise).toFixed(2));

    const pressureBar = Number((isAnomaly ? 4.2 + Math.random() * 0.8 : 5.5 + (Math.random() - 0.5) * 0.3).toFixed(2));
    const cycleTimeSec = Number((12.5 + (Math.random() - 0.5) * 1.2).toFixed(1));
    const defectsDetected = isAnomaly ? Math.floor(Math.random() * 3) + 1 : 0;

    results.push({
      timestamp: time.toISOString().substring(11, 19),
      machineId,
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

export function convertTelemetryToCSV(samples: TelemetrySample[]): string {
  const header = 'timestamp,machine_id,temperature_c,vibration_mms,pressure_bar,cycle_time_sec,status,defects_detected\n';
  const rows = samples.map(
    (s) => `${s.timestamp},${s.machineId},${s.temperatureC},${s.vibrationMmS},${s.pressureBar},${s.cycleTimeSec},${s.status},${s.defectsDetected}`
  ).join('\n');
  return header + rows;
}
