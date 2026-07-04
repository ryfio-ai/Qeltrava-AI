"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Global Uptime', value: '99.99%', icon: '🟢', trend: '+0.01%' },
  { label: 'API p95 Latency', value: '42ms', icon: '⚡', trend: '-3ms' },
  { label: 'Deployments Today', value: '7', icon: '🚀', trend: '+2' },
  { label: 'AI Requests / 24h', value: '124K', icon: '🤖', trend: '+18K' },
  { label: 'Security Score', value: '100/100', icon: '🔐', trend: 'Perfect' },
  { label: 'Active Monitors', value: '48', icon: '📡', trend: 'All green' },
  { label: 'Incidents (30d)', value: '0', icon: '✅', trend: 'None' },
  { label: 'Mean Deploy Time', value: '4.2 min', icon: '⏱', trend: '-0.8min' },
];

const services = [
  { name: 'Production API', status: 'Operational', latency: '38ms' },
  { name: 'AI Inference', status: 'Operational', latency: '210ms' },
  { name: 'Authentication', status: 'Operational', latency: '12ms' },
  { name: 'Database Cluster', status: 'Operational', latency: '4ms' },
  { name: 'CDN / Edge', status: 'Operational', latency: '8ms' },
  { name: 'File Storage', status: 'Operational', latency: '62ms' },
];

export function SystemHealthDashboard() {
  const [secondsAgo, setSecondsAgo] = useState(2);

  useEffect(() => {
    const id = setInterval(() => setSecondsAgo(p => (p >= 29 ? 1 : p + 1)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-5">
      {/* Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <span className="text-sm font-bold text-emerald-700">All Systems Operational</span>
          <span className="text-xs text-emerald-500 hidden sm:inline">· Production · Staging · CDN · AI Services · Auth</span>
        </div>
        <span className="text-xs text-gray-400 font-mono">Live data · Updated {secondsAgo}s ago</span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-white border border-[var(--color-border-soft)] rounded-2xl p-5 relative overflow-hidden group hover:shadow-md hover:border-emerald-200 transition-all"
          >
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-emerald-500/5 rounded-full group-hover:bg-emerald-500/10 transition-colors" />
            <div className="text-lg mb-2 relative z-10">{m.icon}</div>
            <div className="text-xl font-black text-[var(--color-primary-dark)] font-mono tracking-tight relative z-10">
              {m.value}
            </div>
            <div className="text-xs text-[var(--color-text-main)] mt-0.5 relative z-10">{m.label}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1.5 relative z-10">{m.trend}</div>
          </motion.div>
        ))}
      </div>

      {/* Service Status Table */}
      <div className="bg-white border border-[var(--color-border-soft)] rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--color-border-soft)] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[var(--color-primary-dark)]">Service Status</h3>
          <span className="text-xs text-gray-400 font-mono">Real-time</span>
        </div>
        <div className="divide-y divide-[var(--color-border-soft)]">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between px-6 py-3.5"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium text-[var(--color-primary-dark)]">{s.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-xs text-gray-400 font-mono hidden sm:block">{s.latency}</span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                  {s.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
