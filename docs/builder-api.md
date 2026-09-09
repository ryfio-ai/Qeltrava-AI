# Qeltrava Builder API & Security Architecture

## API Security Pipeline
```text
Browser Client
   ↓
Next.js API Route (Server-Side)
   ↓
Zod Input Validation (Size, Bounds, Schema)
   ↓
Rate Limiting & Abuse Check
   ↓
Deterministic Scoring Engine + Fallback Logic
   ↓
Zod Output Validation (Ensures strict structured JSON schema)
   ↓
Sanitized Response → Browser Client
```

## Endpoints
1. `POST /api/build-lab` — Generates 10-point technical product blueprint.
2. `POST /api/ai-readiness` — Calculates deterministic AI Opportunity Score (0-100) & capability matrix.
3. `POST /api/mvp-planner` — Classifies features into MVP, V2, and Don't Build Yet.
4. `POST /api/architecture-builder` — Generates diagrammatic system architecture with "WHY" rationales.
5. `POST /api/api-planner` — Generates API resource structure.
6. `POST /api/database-planner` — Generates relational data model.

## Deterministic & Fallback Guarantee
If external AI services are unavailable or timeout, the server-side engines execute local deterministic rules to return 100% complete, high-quality, structured results without exposing raw API provider errors to the user.
