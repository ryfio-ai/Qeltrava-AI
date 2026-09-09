# Qeltrava AI 2.0 — Component Map & Architecture

## Component Map

```text
components/
├── builder/                       # Shared Builder UI Primitives
│   ├── BuilderShell.tsx           # Container layout with dark theme
│   ├── BuilderInput.tsx           # Input fields & textareas
│   ├── BuilderProgress.tsx        # Step indicators
│   ├── BuilderResult.tsx          # Formatted output container
│   ├── BuilderScore.tsx           # 0-100 Gauge & breakdown graph
│   ├── BuilderSection.tsx         # Structured section cards
│   ├── BuilderExport.tsx          # Copy + JSON + Markdown export buttons
│   ├── BuilderCTA.tsx             # Conversion CTA ("Want Qeltrava to engineer this?")
│   ├── BuilderDisclaimer.tsx      # Standard engineer disclaimer notice
│   ├── BuilderLoading.tsx         # Animated loading state
│   ├── BuilderError.tsx           # Error alert & retry trigger
│   └── BuilderEmptyState.tsx      # Initial state placeholder
│
├── builder-lab/                   # 01 - Build Lab Tool
│   ├── QeltravaBuildLab.tsx
│   ├── BuildLabForm.tsx
│   ├── BlueprintResult.tsx
│   └── BlueprintExport.tsx
│
├── builder-tools/                 # Homepage Builder Lab Section & Cards
│   ├── BuilderToolsSection.tsx    # Primary 3-tool homepage container
│   ├── ToolCard.tsx
│   └── ToolCategory.tsx
│
├── ai-readiness/                  # 02 - AI Readiness Assessment
│   ├── AIReadinessAssessment.tsx
│   ├── AssessmentForm.tsx
│   └── AssessmentResult.tsx
│
├── mvp-planner/                   # 03 - MVP Scope Planner
│   ├── MVPPlanner.tsx
│   └── MVPResult.tsx
│
├── architecture-builder/          # 04 - Architecture Builder
│   ├── ArchitectureBuilder.tsx
│   └── ArchitectureResult.tsx
│
├── hero/                          # Hero Section
│   └── HeroSection.tsx
│
├── intelligence-system/           # Signature Hero Visual Canvas
│   └── IntelligenceSystemCanvas.tsx
│
├── trust/                         # Trust Proof & Logos
│   └── TrustProofSection.tsx
│
├── brand/                         # Editorial Brand Statement
│   └── BrandStatement.tsx
│
├── capabilities/                  # Difference & 4 Pillars
│   ├── QeltravaDifference.tsx
│   └── CoreCapabilities.tsx
│
├── products/                      # Proprietary Products (Modliq & StaySeat)
│   └── BuiltByQeltrava.tsx
│
├── manufacturing/                 # Industrial Intelligence
│   └── ManufacturingSection.tsx
│
├── philosophy/                    # Human Accountability Section
│   └── HumanAccountability.tsx
│
├── process/                       # 6-Stage Engineering Lifecycle
│   └── EngineeringLifecycle.tsx
│
├── technology/                    # Layered Technology Stack
│   └── LayeredTechnology.tsx
│
└── cta/                           # Final Closing CTA Section
    └── FinalCTASection.tsx
```
