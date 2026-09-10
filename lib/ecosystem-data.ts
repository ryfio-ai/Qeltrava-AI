export interface EngineeringGuide {
  id: string;
  title: string;
  category: 'ai' | 'manufacturing' | 'software' | 'building';
  readTime: string;
  summary: string;
  steps: {
    title: string;
    description: string;
    codeSnippet?: string;
  }[];
}

export const ENGINEERING_GUIDES: EngineeringGuide[] = [
  {
    id: 'build-ai-telemetry-api',
    title: 'Building a High-Frequency AI Telemetry API with FastAPI & Redis',
    category: 'manufacturing',
    readTime: '15 min',
    summary: 'Learn how to architect an asynchronous Python API that ingests 1,000+ machine sensor readings per second and runs real-time anomaly detection.',
    steps: [
      {
        title: '1. Concept & Ingestion Pipeline',
        description: 'Machine telemetry requires non-blocking async input buffers to prevent dropping sensor frames during peak plant loads.',
        codeSnippet: `from fastapi import FastAPI, BackgroundTasks
import aioredis

app = FastAPI(title="Qeltrava Machine Telemetry Ingestion API")

@app.post("/api/v1/telemetry")
async def ingest_telemetry(payload: dict, background_tasks: BackgroundTasks):
    # Buffer raw sensor telemetry to Redis queue
    background_tasks.add_task(process_anomaly_detection, payload)
    return {"status": "QUEUED", "timestamp": payload.get("timestamp")}`,
      },
      {
        title: '2. Real-Time Anomaly Scoring',
        description: 'Evaluate sensor vibration and temperature against pre-calibrated baseline thresholds.',
        codeSnippet: `async def process_anomaly_detection(telemetry: dict):
    vib = telemetry.get("vibration_mms", 0)
    temp = telemetry.get("temperature_c", 0)
    if vib > 5.0 or temp > 85.0:
        await dispatch_operator_alert(telemetry, alert_level="CRITICAL")`,
      },
    ],
  },
  {
    id: 'build-rag-manufacturing-docs',
    title: 'Building a RAG Assistant for Indian Standards & Factory Manuals',
    category: 'ai',
    readTime: '25 min',
    summary: 'Architect a RAG retrieval system to parse technical machinery manuals and Indian Standards (IS) compliance requirements using pgvector and Gemini.',
    steps: [
      {
        title: '1. Document Chunking & Embedding',
        description: 'Split dense machinery manuals into 500-token chunks with overlapping context for optimal vector search retrieval.',
        codeSnippet: `from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = text_splitter.split_text(is_compliance_doc_text)`,
      },
      {
        title: '2. Grounded Answer Synthesis',
        description: 'Synthesize exact technical answers while citing source manual section numbers to ensure zero hallucinations.',
      },
    ],
  },
];

export interface ManufacturingCalculatorDef {
  id: string;
  name: string;
  description: string;
  inputs: { key: string; label: string; min: number; max: number; step: number; default: number; unit?: string }[];
  calculate: (values: Record<string, number>) => {
    primaryValue: number;
    primaryUnit: string;
    primaryLabel: string;
    secondaryValue?: string;
    decision: {
      primaryIssue: string;
      recommendedAction: string;
      priority: 'HIGH' | 'MEDIUM' | 'LOW';
      nextStep: string;
    };
  };
}

export const MANUFACTURING_CALCULATORS: ManufacturingCalculatorDef[] = [
  {
    id: 'takt-time',
    name: 'Takt Time Calculator',
    description: 'Calculate the required pace of production to meet customer demand rate.',
    inputs: [
      { key: 'availableMinutes', label: 'Available Operating Time per Shift', min: 60, max: 720, step: 30, default: 480, unit: 'mins' },
      { key: 'customerDemandUnits', label: 'Customer Demand per Shift', min: 100, max: 5000, step: 50, default: 2400, unit: 'units' },
    ],
    calculate: (v) => {
      const availableSeconds = v.availableMinutes * 60;
      const taktTimeSec = Number((availableSeconds / Math.max(1, v.customerDemandUnits)).toFixed(1));
      const priority = taktTimeSec < 10 ? 'HIGH' : taktTimeSec < 20 ? 'MEDIUM' : 'LOW';
      return {
        primaryValue: taktTimeSec,
        primaryUnit: 'seconds / unit',
        primaryLabel: 'Required Takt Time',
        secondaryValue: `${(v.customerDemandUnits / (v.availableMinutes / 60)).toFixed(0)} units / hr required`,
        decision: {
          primaryIssue: taktTimeSec < 12 ? 'Aggressive production pace required.' : 'Balanced production pace.',
          recommendedAction: taktTimeSec < 12 ? 'Balance assembly line workstations to eliminate bottleneck friction.' : 'Maintain current line balancing.',
          priority,
          nextStep: 'Compare measured Cycle Time against Takt Time target.',
        },
      };
    },
  },
  {
    id: 'mtbf-mttr',
    name: 'MTBF & MTTR Reliability Calculator',
    description: 'Calculate Mean Time Between Failures (MTBF) and Mean Time To Repair (MTTR).',
    inputs: [
      { key: 'operatingHours', label: 'Total Operating Hours', min: 100, max: 2000, step: 50, default: 720, unit: 'hrs' },
      { key: 'breakdownCount', label: 'Number of Breakdown Incidents', min: 1, max: 50, step: 1, default: 6 },
      { key: 'totalDowntimeHours', label: 'Total Repair Downtime Hours', min: 1, max: 100, step: 1, default: 18, unit: 'hrs' },
    ],
    calculate: (v) => {
      const uptime = Math.max(0, v.operatingHours - v.totalDowntimeHours);
      const mtbf = Number((uptime / v.breakdownCount).toFixed(1));
      const mttr = Number((v.totalDowntimeHours / v.breakdownCount).toFixed(1));
      const priority = mttr > 4 || mtbf < 100 ? 'HIGH' : 'MEDIUM';
      return {
        primaryValue: mtbf,
        primaryUnit: 'hours (MTBF)',
        primaryLabel: 'Mean Time Between Failures',
        secondaryValue: `MTTR: ${mttr} hours per repair`,
        decision: {
          primaryIssue: mttr > 4 ? 'Excessive repair duration per incident.' : mtbf < 100 ? 'High breakdown frequency.' : 'Acceptable machine reliability.',
          recommendedAction: mttr > 4 ? 'Standardize maintenance spare parts staging near critical machines.' : 'Implement vibration telemetry monitoring.',
          priority,
          nextStep: 'Audit root-cause downtime logs for top 2 repeat breakdown components.',
        },
      };
    },
  },
];
