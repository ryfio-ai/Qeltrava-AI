"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ArchNode {
  id: string; label: string; sub: string;
  x: number; y: number; w: number; h: number;
  color: string; desc: string;
}

const W = 460; const H = 520;

const nodes: ArchNode[] = [
  { id: 'browser', label: 'Browser / Web', sub: 'Client', x: 60, y: 10, w: 120, h: 34, color: '#1e293b', desc: 'Next.js Server-Side Rendering delivers pre-rendered HTML. Hydration enables React interactivity. Core Web Vitals optimised.' },
  { id: 'mobile', label: 'Mobile App', sub: 'iOS · Android', x: 280, y: 10, w: 120, h: 34, color: '#7c3aed', desc: 'React Native with Expo managed workflow. Shares TypeScript business logic with the web frontend via shared packages.' },
  { id: 'cdn', label: 'CDN / Edge Network', sub: 'CloudFront · Vercel Edge', x: 130, y: 85, w: 200, h: 34, color: '#0284c7', desc: 'Static assets cached at 200+ global Points of Presence. p95 TTFB < 60ms worldwide. Image optimisation at the edge.' },
  { id: 'frontend', label: 'Next.js 15 Frontend', sub: 'App Router · RSC · SSR', x: 130, y: 158, w: 200, h: 34, color: '#1d4ed8', desc: 'React Server Components, Server Actions, streaming. TypeScript strict mode. Framer Motion animations. next-intl i18n.' },
  { id: 'gateway', label: 'API Gateway', sub: 'FastAPI · Rate Limiting · Auth Middleware', x: 100, y: 232, w: 260, h: 34, color: '#0369a1', desc: 'FastAPI with OpenAPI 3.1 auto-docs. JWT validation, RBAC middleware, rate limiting via Redis, structured logging.' },
  { id: 'ai', label: 'AI Engine', sub: 'LangChain · GPT-4o', x: 10, y: 310, w: 120, h: 34, color: '#4f46e5', desc: 'LangChain agents with tool-use, persistent memory, and RAG over pgvector. Streaming responses via SSE.' },
  { id: 'auth', label: 'Auth Service', sub: 'JWT · SAML · MFA', x: 170, y: 310, w: 120, h: 34, color: '#b91c1c', desc: 'NextAuth.js with JWT, SAML 2.0 SSO, OAuth2 PKCE, TOTP 2FA. HashiCorp Vault for secrets. RLS in PostgreSQL.' },
  { id: 'logic', label: 'Business Logic', sub: 'Domain Services', x: 330, y: 310, w: 120, h: 34, color: '#047857', desc: 'Stateless domain services with event-driven architecture via Redis pub/sub. Bull queues for async jobs.' },
  { id: 'pgvec', label: 'pgvector', sub: 'Vector DB', x: 10, y: 395, w: 110, h: 34, color: '#6d28d9', desc: 'OpenAI text-embedding-3-small embeddings stored in PostgreSQL. Hybrid BM25 + cosine similarity search enabled.' },
  { id: 'postgres', label: 'PostgreSQL 16', sub: 'Primary · RLS · PITR', x: 140, y: 395, w: 120, h: 34, color: '#1e40af', desc: 'Multi-tenant row-level security. Point-in-time recovery with 30-day retention. Read replicas for analytics workloads.' },
  { id: 'redis', label: 'Redis', sub: 'Cache · Queues · Pub/Sub', x: 280, y: 395, w: 140, h: 34, color: '#b91c1c', desc: 'Session cache, Bull job queues, real-time pub/sub events. Clustered setup with 99.99% SLA. AOF persistence.' },
  { id: 'analytics', label: 'Analytics', sub: 'Grafana · TimescaleDB', x: 40, y: 475, w: 150, h: 34, color: '#b45309', desc: 'Real-time Grafana dashboards. TimescaleDB for time-series. 90-day retention. Prometheus metrics pipeline.' },
  { id: 'admin', label: 'Admin Panel', sub: 'RBAC · Audit Log', x: 270, y: 475, w: 150, h: 34, color: '#475569', desc: 'Role-based admin interface with full audit log, data export, user management, and feature flag controls.' },
];

const edges: [string, string][] = [
  ['browser', 'cdn'], ['mobile', 'cdn'], ['cdn', 'frontend'],
  ['frontend', 'gateway'], ['gateway', 'ai'], ['gateway', 'auth'], ['gateway', 'logic'],
  ['ai', 'pgvec'], ['auth', 'postgres'], ['logic', 'redis'],
  ['postgres', 'analytics'], ['redis', 'admin'],
];

function cx(n: ArchNode) { return n.x + n.w / 2; }
function cy(n: ArchNode) { return n.y + n.h / 2; }

export function LiveArchitectureVisualizer() {
  const [hovered, setHovered] = useState<string | null>(null);
  const map = Object.fromEntries(nodes.map(n => [n.id, n]));
  const detail = hovered ? map[hovered] : null;

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
      {/* Diagram */}
      <div className="relative bg-[var(--color-primary-dark)] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.8) 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Production Architecture · Qeltrava AI</span>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
          </span>
        </div>
        <div className="p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 520 }}>
            <defs>
              <marker id="arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                <polygon points="0 0,7 2.5,0 5" fill="rgba(255,255,255,0.25)" />
              </marker>
              <style>{`@keyframes flow{from{stroke-dashoffset:14}to{stroke-dashoffset:0}}`}</style>
            </defs>

            {/* Edges */}
            {edges.map(([a, b], i) => {
              const from = map[a]; const to = map[b];
              if (!from || !to) return null;
              const hi = hovered === a || hovered === b;
              return (
                <line key={`${a}-${b}`}
                  x1={cx(from)} y1={from.y + from.h}
                  x2={cx(to)} y2={to.y}
                  stroke={hi ? '#818cf8' : 'rgba(255,255,255,0.12)'}
                  strokeWidth={hi ? 1.5 : 1}
                  strokeDasharray="4 3"
                  markerEnd="url(#arr)"
                  style={{ animation: `flow 2s linear infinite`, animationDelay: `${i * 0.18}s` }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map(n => {
              const hi = hovered === n.id;
              return (
                <g key={n.id} style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={7}
                    fill={hi ? n.color : n.color + 'cc'}
                    stroke={hi ? 'rgba(255,255,255,0.6)' : 'transparent'} strokeWidth={1.5}
                  />
                  <text x={cx(n)} y={n.y + 13} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize={8.5} fontWeight={700} fontFamily="ui-monospace,monospace">
                    {n.label}
                  </text>
                  <text x={cx(n)} y={n.y + 24} textAnchor="middle" dominantBaseline="middle"
                    fill="rgba(255,255,255,0.5)" fontSize={6.5} fontFamily="ui-sans-serif,sans-serif">
                    {n.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Detail Panel */}
      <div className="space-y-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-3">
            {detail ? 'Node Detail' : 'Hover a node →'}
          </p>
          {detail ? (
            <motion.div key={detail.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl border-2 bg-white"
              style={{ borderColor: detail.color }}
            >
              <span className="inline-block px-2 py-0.5 rounded-md text-white text-[10px] font-bold mb-3"
                style={{ backgroundColor: detail.color }}>
                {detail.sub}
              </span>
              <h3 className="text-sm font-bold text-[var(--color-primary-dark)] mb-2">{detail.label}</h3>
              <p className="text-xs text-[var(--color-text-main)] leading-relaxed">{detail.desc}</p>
            </motion.div>
          ) : (
            <div className="p-5 rounded-2xl border border-dashed border-gray-200 text-center text-sm text-gray-400">
              Hover any node to see technical implementation details
            </div>
          )}
        </div>

        {/* Legend */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono mb-3">Architecture Layers</p>
          <div className="space-y-2">
            {[
              ['#1e293b', 'Client (Web / Mobile)'],
              ['#0284c7', 'CDN / Edge Network'],
              ['#1d4ed8', 'Frontend (SSR)'],
              ['#0369a1', 'API Gateway'],
              ['#4f46e5', 'AI & Inference'],
              ['#b91c1c', 'Auth & Caching'],
              ['#1e40af', 'Database Layer'],
              ['#b45309', 'Observability'],
            ].map(([color, label]) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: color }} />
                <span className="text-xs text-[var(--color-text-main)]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
