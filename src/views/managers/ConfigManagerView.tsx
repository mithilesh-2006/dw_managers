import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Cpu,
  HardDrive,
  Layers,
  Settings,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  History,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const ConfigManagerView: React.FC = () => {
  const { serverConfig, updateServerConfig, events } = useSimulation();

  // Local form state for before-after adjustments
  const [cpuCores, setCpuCores] = useState(serverConfig.cpuCores);
  const [ramAllocatedGb, setRamAllocatedGb] = useState(serverConfig.ramAllocatedGb);
  const [storageAllocatedGb, setStorageAllocatedGb] = useState(serverConfig.storageAllocatedGb);
  const [bufferPoolMb, setBufferPoolMb] = useState(serverConfig.ramBufferPoolMb);
  const [maxConnections, setMaxConnections] = useState(serverConfig.maxConnections);
  const [walMode, setWalMode] = useState(serverConfig.walMode);
  const [compressionEnabled, setCompressionEnabled] = useState(serverConfig.compressionEnabled);

  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);
  const [showEduModal, setShowEduModal] = useState(false);

  // Validation
  const isStorageInvalid = storageAllocatedGb < serverConfig.storageUsedGb;
  const isBufferPoolExceeded = bufferPoolMb > ramAllocatedGb * 1024 * 0.8;

  const handleApplyChanges = () => {
    if (isStorageInvalid) {
      alert(`Cannot set storage to ${storageAllocatedGb} GB! Currently used is ${serverConfig.storageUsedGb} GB.`);
      return;
    }

    updateServerConfig({
      cpuCores,
      ramAllocatedGb,
      storageAllocatedGb,
      ramBufferPoolMb: bufferPoolMb,
      maxConnections,
      walMode,
      compressionEnabled,
    });

    setAppliedNotification('Configuration applied to PSG iTech DW cluster successfully!');
    setTimeout(() => setAppliedNotification(null), 4000);
  };

  const handleResetToCurrent = () => {
    setCpuCores(serverConfig.cpuCores);
    setRamAllocatedGb(serverConfig.ramAllocatedGb);
    setStorageAllocatedGb(serverConfig.storageAllocatedGb);
    setBufferPoolMb(serverConfig.ramBufferPoolMb);
    setMaxConnections(serverConfig.maxConnections);
    setWalMode(serverConfig.walMode);
    setCompressionEnabled(serverConfig.compressionEnabled);
  };

  // Config-related history events
  const configEvents = events.filter((e) => e.sourceManager.includes('Configuration'));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Educational Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <span>System Management Module 1</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Cpu className="w-7 h-7 text-blue-600" />
            System Configuration Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Controls hardware provisioning, memory buffer pooling, storage volume limits, and database concurrency parameters.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start md:self-center"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Syllabus Notes & Quiz</span>
        </button>
      </div>

      {/* Problem Scenario Callout */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Academic Year Expansion & Storage Exhaustion</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            PSG iTech is enrolling a new batch of 600 students across 5 engineering departments. If storage allocation remains static at current usage ({serverConfig.storageUsedGb} GB), subsequent semester attendance and mark ETL pipelines will fail due to physical disk saturation.
          </p>
        </div>
      </div>

      {appliedNotification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3.5 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{appliedNotification}</span>
        </div>
      )}

      {/* Grid: Current Hardware Specifications vs Configuration Tuner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Current Active Server Telemetry */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-slate-500" />
              Live Server Hardware Telemetry
            </h2>
            <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
              {serverConfig.serverName}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-slate-400 font-medium">Operating System</div>
              <div className="font-bold text-slate-800 mt-0.5">{serverConfig.os}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-slate-400 font-medium">CPU Cores (Threads)</div>
              <div className="font-bold text-slate-800 mt-0.5">{serverConfig.cpuCores} Virtual Cores</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Utilization: {serverConfig.cpuUtilization}%</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-slate-400 font-medium">RAM Allocation</div>
              <div className="font-bold text-slate-800 mt-0.5">
                {serverConfig.ramAllocatedGb} GB <span className="text-[10px] font-normal text-slate-400">/ {serverConfig.ramTotalGb} GB Total</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Buffer: {serverConfig.ramBufferPoolMb} MB</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-slate-400 font-medium">Storage Volume</div>
              <div className="font-bold text-slate-800 mt-0.5">
                {serverConfig.storageAllocatedGb} GB <span className="text-[10px] font-normal text-slate-400">/ {serverConfig.storageTotalGb} GB Array</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Used: {serverConfig.storageUsedGb} GB</div>
            </div>
          </div>

          {/* Storage Capacity Gauge */}
          <div className="space-y-1.5 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Storage Capacity Utilization</span>
              <span className={serverConfig.storageUsedGb / serverConfig.storageAllocatedGb > 0.9 ? 'text-red-600' : 'text-blue-600'}>
                {Math.round((serverConfig.storageUsedGb / serverConfig.storageAllocatedGb) * 100)}% Used
              </span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  serverConfig.storageUsedGb / serverConfig.storageAllocatedGb > 0.9 ? 'bg-red-500' : 'bg-blue-600'
                }`}
                style={{
                  width: `${Math.min(100, Math.round((serverConfig.storageUsedGb / serverConfig.storageAllocatedGb) * 100))}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>{serverConfig.storageUsedGb} GB Utilized</span>
              <span>Available: {Math.round((serverConfig.storageAllocatedGb - serverConfig.storageUsedGb) * 10) / 10} GB</span>
            </div>
          </div>

          {/* WAL & Connections */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Write-Ahead Log</span>
                <span className="font-bold text-slate-800">{serverConfig.walMode}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-semibold">ACID</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Max Connections</span>
                <span className="font-bold text-slate-800">{serverConfig.maxConnections} Clients</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold">Pool</span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Configuration Modification Studio */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              Adjust System Configuration Parameters
            </h2>
            <button
              onClick={handleResetToCurrent}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
            >
              Reset Inputs
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Storage Allocation Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <label className="text-slate-700">Storage Volume Allocation (GB)</label>
                <span className="font-mono text-blue-600 font-bold">{storageAllocatedGb} GB</span>
              </div>
              <input
                type="range"
                min="500"
                max="2048"
                step="64"
                value={storageAllocatedGb}
                onChange={(e) => setStorageAllocatedGb(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Min: 500 GB</span>
                <span>Current Used: {serverConfig.storageUsedGb} GB</span>
                <span>Max SAN: 2048 GB</span>
              </div>
              {isStorageInvalid && (
                <div className="text-red-600 text-[11px] font-semibold flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Cannot allocate less storage than current data usage ({serverConfig.storageUsedGb} GB)!
                </div>
              )}
            </div>

            {/* RAM Allocation Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <label className="text-slate-700">RAM Dedicated to DW Instance (GB)</label>
                <span className="font-mono text-indigo-600 font-bold">{ramAllocatedGb} GB</span>
              </div>
              <input
                type="range"
                min="16"
                max="64"
                step="4"
                value={ramAllocatedGb}
                onChange={(e) => setRamAllocatedGb(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Min: 16 GB</span>
                <span>Max Physical RAM: 64 GB</span>
              </div>
            </div>

            {/* RAM Buffer Pool Size (MB) */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <label className="text-slate-700">In-Memory Buffer Pool (MB)</label>
                <span className="font-mono text-purple-600 font-bold">{bufferPoolMb} MB</span>
              </div>
              <input
                type="range"
                min="4096"
                max="32768"
                step="2048"
                value={bufferPoolMb}
                onChange={(e) => setBufferPoolMb(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Min: 4 GB (4096 MB)</span>
                <span>Max: 32 GB (32768 MB)</span>
              </div>
              {isBufferPoolExceeded && (
                <div className="text-amber-600 text-[11px] font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Buffer pool consumes &gt;80% of allocated RAM. May cause OS page swapping!
                </div>
              )}
            </div>

            {/* CPU Cores & Connections */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">CPU Cores</label>
                <select
                  value={cpuCores}
                  onChange={(e) => setCpuCores(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                >
                  <option value={8}>8 Virtual Cores</option>
                  <option value={16}>16 Virtual Cores</option>
                  <option value={32}>32 Virtual Cores</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Max Connections</label>
                <select
                  value={maxConnections}
                  onChange={(e) => setMaxConnections(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                >
                  <option value={100}>100 Clients</option>
                  <option value={250}>250 Clients</option>
                  <option value={500}>500 Clients</option>
                </select>
              </div>
            </div>

            {/* WAL Mode & Compression */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">WAL Logging Mode</label>
                <select
                  value={walMode}
                  onChange={(e) => setWalMode(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                >
                  <option value="NORMAL">NORMAL (Recommended)</option>
                  <option value="AGGRESSIVE">AGGRESSIVE (Fast, High I/O)</option>
                  <option value="OFF">OFF (Volatile - Testing only)</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="compressCheck"
                  checked={compressionEnabled}
                  onChange={(e) => setCompressionEnabled(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="compressCheck" className="font-semibold text-slate-700 cursor-pointer">
                  Enable Columnar Compression
                </label>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Updates propagate immediately to shared simulation state.</span>
            <button
              onClick={handleApplyChanges}
              disabled={isStorageInvalid}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
            >
              <span>Apply Configuration Changes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Before and After Configuration Comparison Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <History className="w-4 h-4 text-slate-500" />
          Before and After Configuration Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-2.5 px-4">Parameter</th>
                <th className="py-2.5 px-4">Active Production State</th>
                <th className="py-2.5 px-4">Pending Stage Value</th>
                <th className="py-2.5 px-4">Status / Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 px-4 font-semibold">Storage Allocation</td>
                <td className="py-2.5 px-4 font-mono">{serverConfig.storageAllocatedGb} GB</td>
                <td className="py-2.5 px-4 font-mono font-bold text-blue-600">{storageAllocatedGb} GB</td>
                <td className="py-2.5 px-4">
                  {storageAllocatedGb !== serverConfig.storageAllocatedGb ? (
                    <span className="text-amber-600 font-semibold">Modified ({storageAllocatedGb - serverConfig.storageAllocatedGb > 0 ? `+${storageAllocatedGb - serverConfig.storageAllocatedGb} GB` : `${storageAllocatedGb - serverConfig.storageAllocatedGb} GB`})</span>
                  ) : (
                    <span className="text-slate-400">Unchanged</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">RAM Allocation</td>
                <td className="py-2.5 px-4 font-mono">{serverConfig.ramAllocatedGb} GB</td>
                <td className="py-2.5 px-4 font-mono font-bold text-indigo-600">{ramAllocatedGb} GB</td>
                <td className="py-2.5 px-4">
                  {ramAllocatedGb !== serverConfig.ramAllocatedGb ? (
                    <span className="text-amber-600 font-semibold">Modified ({ramAllocatedGb - serverConfig.ramAllocatedGb} GB)</span>
                  ) : (
                    <span className="text-slate-400">Unchanged</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">Buffer Pool Size</td>
                <td className="py-2.5 px-4 font-mono">{serverConfig.ramBufferPoolMb} MB</td>
                <td className="py-2.5 px-4 font-mono font-bold text-purple-600">{bufferPoolMb} MB</td>
                <td className="py-2.5 px-4">
                  {bufferPoolMb !== serverConfig.ramBufferPoolMb ? (
                    <span className="text-amber-600 font-semibold">Modified</span>
                  ) : (
                    <span className="text-slate-400">Unchanged</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold">CPU Cores</td>
                <td className="py-2.5 px-4 font-mono">{serverConfig.cpuCores} Threads</td>
                <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{cpuCores} Threads</td>
                <td className="py-2.5 px-4">
                  {cpuCores !== serverConfig.cpuCores ? (
                    <span className="text-amber-600 font-semibold">Modified</span>
                  ) : (
                    <span className="text-slate-400">Unchanged</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Operational History */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Configuration Event Audit Trail</h2>
        <div className="space-y-2">
          {configEvents.slice(0, 5).map((evt) => (
            <div key={evt.id} className="p-3 bg-slate-50 rounded-xl text-xs flex items-start justify-between gap-3">
              <div>
                <span className="font-semibold text-slate-800">{evt.message}</span>
                {evt.details && <div className="text-slate-500 text-[11px] mt-0.5">{evt.details}</div>}
              </div>
              <span className="text-slate-400 font-mono text-[11px] shrink-0">{evt.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      <EduInfoModal managerId="config" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
