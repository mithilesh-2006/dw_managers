import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Cpu,
  HardDrive,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const ConfigManagerView: React.FC = () => {
  const { serverConfig, updateServerConfig } = useSimulation();

  const [ramGb, setRamGb] = useState(serverConfig.ramAllocatedGb);
  const [storageGb, setStorageGb] = useState(serverConfig.storageAllocatedGb);
  const [notification, setNotification] = useState<string | null>(null);
  const [showEduModal, setShowEduModal] = useState(false);

  const isStorageInvalid = storageGb < serverConfig.storageUsedGb;

  const handleApply = () => {
    if (isStorageInvalid) {
      alert(`Cannot set storage to ${storageGb} GB! The warehouse is already using ${serverConfig.storageUsedGb} GB.`);
      return;
    }
    updateServerConfig({
      ramAllocatedGb: ramGb,
      storageAllocatedGb: storageGb,
    });
    setNotification(`Successfully updated: RAM set to ${ramGb} GB, Storage expanded to ${storageGb} GB.`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Manager 1 of 10 • System Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600" />
            System Configuration Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Allocates hardware capacity (RAM buffer and Storage disk) to ensure large data loads never run out of memory or disk space.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Syllabus Notes</span>
        </button>
      </div>

      {/* The Problem in Plain English */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900 font-bold block">The Problem it Solves:</strong>
          <span>
            If the college enrols new students and current disk allocation is too low, batch loading stalls and crashes with a "Disk Full" exception. The Configuration Manager allows the administrator to safely expand storage and memory pools before loading starts.
          </span>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Simple Interactive Simulation Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          Interactive Simulation: Adjust Hardware Capacity
        </h2>

        {/* Storage Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <label className="text-slate-700">Storage Allocation</label>
            <span className="font-mono text-blue-600 font-bold text-sm">{storageGb} GB</span>
          </div>
          <input
            type="range"
            min="600"
            max="2048"
            step="64"
            value={storageGb}
            onChange={(e) => setStorageGb(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Min: 600 GB</span>
            <span>Currently Used: {serverConfig.storageUsedGb} GB</span>
            <span>Max Array: 2048 GB</span>
          </div>
        </div>

        {/* RAM Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <label className="text-slate-700">RAM Dedicated to Warehouse</label>
            <span className="font-mono text-indigo-600 font-bold text-sm">{ramGb} GB</span>
          </div>
          <input
            type="range"
            min="16"
            max="64"
            step="4"
            value={ramGb}
            onChange={(e) => setRamGb(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Min: 16 GB</span>
            <span>Max Physical: 64 GB</span>
          </div>
        </div>

        {/* Apply Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleApply}
            disabled={isStorageInvalid}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-xs"
          >
            <span>Apply Configuration Change</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live Impact on Warehouse */}
      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs space-y-3">
        <h3 className="font-bold text-slate-900">Current Warehouse Capacity Status:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Disk Allocated</span>
            <span className="font-bold text-slate-800 text-sm">{serverConfig.storageAllocatedGb} GB</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Disk Used</span>
            <span className="font-bold text-blue-600 text-sm">{serverConfig.storageUsedGb} GB</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">RAM Allocated</span>
            <span className="font-bold text-indigo-600 text-sm">{serverConfig.ramAllocatedGb} GB</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex justify-between text-[11px] text-slate-500 font-semibold">
            <span>Storage Utilization</span>
            <span>{Math.round((serverConfig.storageUsedGb / serverConfig.storageAllocatedGb) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{
                width: `${Math.min(100, Math.round((serverConfig.storageUsedGb / serverConfig.storageAllocatedGb) * 100))}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <EduInfoModal managerId="config" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
