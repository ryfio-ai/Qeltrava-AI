import { NextResponse } from 'next/server';
import { databasePlannerInputSchema, databasePlannerResponseSchema } from '@/lib/builder-lab/validation/schemas';
import { generateStructuredAI } from '@/lib/ai/provider';
import { DATABASE_PLANNER_SYSTEM_PROMPT, databasePlannerPrompt } from '@/lib/ai/prompts/database-planner';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = databasePlannerInputSchema.parse(body);

    const fallbackFn = () => {
      const entities = input.entitiesText.split(/[\n,;]+/).map(e => e.trim()).filter(Boolean);
      const tables = entities.map(entity => {
        const tableName = entity.toLowerCase().replace(/\s+/g, '_') + 's';
        return {
          tableName,
          columns: [
            { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()' },
            { name: 'tenant_id', type: 'UUID', constraints: 'NOT NULL REFERENCES tenants(id)' },
            { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL' },
            { name: 'created_at', type: 'TIMESTAMPTZ', constraints: 'DEFAULT now()' }
          ],
          indexes: [`CREATE INDEX idx_${tableName}_tenant ON ${tableName}(tenant_id);`]
        };
      });
      return {
        domainName: input.domainName,
        engine: 'PostgreSQL 16 (Relational)',
        tables: [
          {
            tableName: 'tenants',
            columns: [
              { name: 'id', type: 'UUID', constraints: 'PRIMARY KEY DEFAULT gen_random_uuid()' },
              { name: 'name', type: 'VARCHAR(255)', constraints: 'NOT NULL' }
            ],
            indexes: []
          },
          ...tables
        ],
        partitionStrategy: 'Indexed tenant isolation',
        complianceControls: ['Row Level Security (RLS)', 'Encrypted at rest with AES-256']
      };
    };

    const result = await generateStructuredAI({
      task: 'database-planner',
      prompt: databasePlannerPrompt(input.domainName, input.entitiesText, input.expectedGrowth),
      systemPrompt: DATABASE_PLANNER_SYSTEM_PROMPT,
      schema: databasePlannerResponseSchema,
      fallback: fallbackFn
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error processing Database Planner.' }, { status: 500 });
  }
}
