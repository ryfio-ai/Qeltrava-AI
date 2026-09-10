"use client";

import React, { useState } from 'react';
import {
  calculateOEE,
  generateSyntheticTelemetry,
  convertTelemetryToCSV,
  OEEMetrics,
  TelemetrySample,
} from '@/lib/manufacturing-sim';
import { Factory, Activity, Download, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

export function ManufacturingLab() {
  const [activeTab, setActiveTab] = useState<'oee' | 'simulator' | 'datasets'>('oee');

  // OEE State
  const [oeeInput, setOEEInput] = useState<OEEMetrics>({
    plannedProductionMinutes: 480,
    downtimeMinutes: 45,
    idealCycleTimeSeconds: 12,
    totalUnitsProduced: 2100,
    goodUnitsProduced: 2016,
  });

  const oeeResult = calculateOEE(oeeInput);

  // Simulator State
  const [machineId, setMachineId] = useState('CNC-LINE-01');
  const [sampleCount, setSampleCount] = useState(15);
  const [telemetry, setTelemetry] = useState<TelemetrySample[]>(() =>
    generateSyntheticTelemetry('CNC-LINE-01', 15)
  );

  const handleGenerateTelemetry = () => {
    setTelemetry(generateSyntheticTelemetry(machineId, sampleCount));
  };

  const handleDownloadCSV = () => {
    const csvContent = convertTelemetryToCSV(telemetry);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${machineId.toLowerCase()}_synthetic_telemetry.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-8">
      {/* Sub Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl max-w-3xl mx-auto shadow-xs">
        <button
          onClick={() => setActiveTab('oee')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'oee'
              ? 'bg-[#2196F3] text-white shadow-xs'
              : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>OEE Calculator</span>
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'simulator'
              ? 'bg-[#2196F3] text-white shadow-xs'
              : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Telemetry Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab('datasets')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'datasets'
              ? 'bg-[#2196F3] text-white shadow-xs'
              : 'text-[#475569] hover:text-[#0D47A1] hover:bg-[#E3F2FD]'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Open Datasets</span>
        </button>
      </div>

      {/* Tab 1: OEE Calculator */}
      {activeTab === 'oee' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl space-y-5">
            <h3 className="text-lg font-bold text-[#0D47A1] font-anek">Line Operating Metrics</h3>
            <div className="space-y-4 font-sans text-xs">
              <div>
                <label className="block font-semibold text-[#334155] mb-1">
                  Planned Shift Time (Minutes): {oeeInput.plannedProductionMinutes}
                </label>
                <input
                  type="range"
                  min={120}
                  max={720}
                  step={30}
                  value={oeeInput.plannedProductionMinutes}
                  onChange={(e) =>
                    setOEEInput({ ...oeeInput, plannedProductionMinutes: Number(e.target.value) })
                  }
                  className="w-full accent-[#2196F3]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] mb-1">
                  Downtime & Stoppages (Minutes): {oeeInput.downtimeMinutes}
                </label>
                <input
                  type="range"
                  min={0}
                  max={180}
                  step={5}
                  value={oeeInput.downtimeMinutes}
                  onChange={(e) =>
                    setOEEInput({ ...oeeInput, downtimeMinutes: Number(e.target.value) })
                  }
                  className="w-full accent-[#2196F3]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] mb-1">
                  Total Units Produced: {oeeInput.totalUnitsProduced}
                </label>
                <input
                  type="range"
                  min={500}
                  max={5000}
                  step={50}
                  value={oeeInput.totalUnitsProduced}
                  onChange={(e) =>
                    setOEEInput({
                      ...oeeInput,
                      totalUnitsProduced: Number(e.target.value),
                      goodUnitsProduced: Math.min(oeeInput.goodUnitsProduced, Number(e.target.value)),
                    })
                  }
                  className="w-full accent-[#2196F3]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#334155] mb-1">
                  Good (Non-Defective) Units: {oeeInput.goodUnitsProduced}
                </label>
                <input
                  type="range"
                  min={100}
                  max={oeeInput.totalUnitsProduced}
                  step={10}
                  value={oeeInput.goodUnitsProduced}
                  onChange={(e) =>
                    setOEEInput({ ...oeeInput, goodUnitsProduced: Number(e.target.value) })
                  }
                  className="w-full accent-[#2196F3]"
                />
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="p-6 bg-[#FFFFFF] border border-[#90CAF9] rounded-2xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0D47A1]">
                  Calculated Overall Equipment Effectiveness
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E3F2FD] text-[#0D47A1] text-xs font-bold font-mono">
                  {oeeResult.statusCategory}
                </span>
              </div>

              <div className="text-5xl font-extrabold text-[#0D47A1] font-anek mb-6">
                {oeeResult.oee}% <span className="text-sm font-normal text-[#64748B]">OEE</span>
              </div>

              {/* 3 Metric Factors */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center">
                  <div className="text-lg font-bold text-[#0D47A1]">{oeeResult.availability}%</div>
                  <div className="text-[10px] text-[#64748B] font-mono">Availability</div>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center">
                  <div className="text-lg font-bold text-[#0D47A1]">{oeeResult.performance}%</div>
                  <div className="text-[10px] text-[#64748B] font-mono">Performance</div>
                </div>
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-center">
                  <div className="text-lg font-bold text-[#0D47A1]">{oeeResult.quality}%</div>
                  <div className="text-[10px] text-[#64748B] font-mono">Quality</div>
                </div>
              </div>
            </div>

            {/* Engineering Decision Box */}
            <div className="p-4 bg-[#E3F2FD] border border-[#90CAF9] rounded-xl space-y-2">
              <div className="text-xs font-mono font-bold uppercase text-[#0D47A1] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#2196F3]" />
                <span>Recommended Engineering Actions</span>
              </div>
              <ul className="space-y-1 text-xs text-[#334155]">
                {oeeResult.recommendations.map((rec, i) => (
                  <li key={i}>• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Telemetry Simulator */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">Machine Identifier</label>
                <input
                  type="text"
                  value={machineId}
                  onChange={(e) => setMachineId(e.target.value)}
                  className="px-3 py-1.5 border border-[#CBD5E1] rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#475569] mb-1">Sample Rows</label>
                <input
                  type="number"
                  min={5}
                  max={50}
                  value={sampleCount}
                  onChange={(e) => setSampleCount(Number(e.target.value))}
                  className="w-20 px-3 py-1.5 border border-[#CBD5E1] rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleGenerateTelemetry}
                className="flex items-center gap-2 px-4 py-2 bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-bold rounded-xl hover:bg-[#BBDEFB] transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate Telemetry</span>
              </button>
              <button
                onClick={handleDownloadCSV}
                className="flex items-center gap-2 px-4 py-2 bg-[#2196F3] text-white text-xs font-bold rounded-xl hover:bg-[#1976D2] transition-all cursor-pointer shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Synthetic CSV</span>
              </button>
            </div>
          </div>

          {/* Telemetry Data Table */}
          <div className="overflow-x-auto bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl shadow-xs">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#0D47A1]">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Machine</th>
                  <th className="p-3">Temp (°C)</th>
                  <th className="p-3">Vibration (mm/s)</th>
                  <th className="p-3">Pressure (bar)</th>
                  <th className="p-3">Cycle (s)</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {telemetry.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8FAFC]">
                    <td className="p-3 text-[#475569]">{row.timestamp}</td>
                    <td className="p-3 font-bold text-[#0F172A]">{row.machineId}</td>
                    <td className="p-3">{row.temperatureC}</td>
                    <td className="p-3">{row.vibrationMmS}</td>
                    <td className="p-3">{row.pressureBar}</td>
                    <td className="p-3">{row.cycleTimeSec}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.status === 'ANOMALY'
                            ? 'bg-rose-100 text-rose-800'
                            : row.status === 'WARNING'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Open Datasets Hub */}
      {activeTab === 'datasets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'CNC Precision Lathe Vibration & Thermal Telemetry',
              size: '1.2 MB · CSV',
              desc: 'High-frequency 5-axis CNC sensor telemetry containing timestamped bearing vibration and spindle thermal logs for predictive maintenance models.',
              tags: ['Predictive Maintenance', 'IoT', 'Synthetic'],
            },
            {
              title: 'Stamping Press Surface Defect Visual Callset',
              size: '4.8 MB · CSV + Metadata',
              desc: 'Annotated defect inspection dataset containing scratch, dent, and mis-alignment labels for automated visual quality inspection AI training.',
              tags: ['Quality Inspection', 'Computer Vision', 'Defects'],
            },
          ].map((ds, i) => (
            <div key={i} className="p-6 bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono font-bold text-[#0D47A1] uppercase bg-[#E3F2FD] px-2 py-0.5 rounded">
                    {ds.size}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Synthetic Open License
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#0D47A1] mb-2 font-anek">{ds.title}</h4>
                <p className="text-xs text-[#475569] leading-relaxed mb-4">{ds.desc}</p>
              </div>

              <button
                onClick={handleDownloadCSV}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#E3F2FD] border border-[#90CAF9] text-[#0D47A1] text-xs font-bold rounded-xl hover:bg-[#2196F3] hover:text-white transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Dataset Sample</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
