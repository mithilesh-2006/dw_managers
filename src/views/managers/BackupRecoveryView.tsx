import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  LifeBuoy,
  AlertOctagon,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  HardDrive,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const BackupRecoveryView: React.FC = () => {
  const {
    backups,
    createBackup,
    simulateCrash,
    restoreBackup,
    systemHealth,
    crashedReason,
    students,
    attendance,
  } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const handleCaptureBackup = () => {
    const snap = createBackup('Manual Snapshot Freeze');
    setNotification(`Backup snapshot "${snap.id}" captured successfully with ${snap.recordCount} rows!`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSimulateCrash = () => {
    simulateCrash('Storage hardware failure: SAN disk array went offline.');
  };

  const handleRestore = (id: string) => {
    restoreBackup(id);
    setNotification(`System successfully recovered from snapshot ${id}. Operational health: NORMAL.`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Manager 5 of 10 • System Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-teal-600" />
            System Backup Recovery Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Creates point-in-time snapshot freezes of all warehouse tables and restores data after unexpected hardware crashes.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
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
            If the physical college server burns out or storage corrupts right before the semester audit, months of academic records could be permanently lost. The Backup Recovery Manager guarantees disaster resilience by restoring the system to a clean snapshot.
          </span>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Crash Alert Banner */}
      {systemHealth === 'CRITICAL_CRASHED' && (
        <div className="p-5 bg-red-50 border-2 border-red-500 rounded-2xl text-red-950 space-y-3 shadow-md animate-pulse">
          <div className="flex items-center gap-2 font-bold text-red-900 text-sm">
            <AlertOctagon className="w-5 h-5 text-red-600 shrink-0" />
            <span>DISASTER ACTIVE: Data Warehouse is Currently Crashed & Offline!</span>
          </div>
          <p className="text-xs text-red-800">{crashedReason}</p>
          <div className="pt-1">
            <button
              onClick={() => handleRestore(backups[0]?.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
            >
              Restore from Latest Snapshot ({backups[0]?.id})
            </button>
          </div>
        </div>
      )}

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Create Backup */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-sm">1. Create Snapshot Backup</h3>
            <p className="text-xs text-slate-500">
              Saves a frozen copy of all {students.length + attendance.length} current student & fact rows into the catalog.
            </p>
          </div>
          <button
            onClick={handleCaptureBackup}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Capture New Backup Snapshot</span>
          </button>
        </div>

        {/* Simulate Crash */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 text-sm">2. Disaster Resilience Test</h3>
            <p className="text-xs text-slate-500">
              Simulates a hardware failure to demonstrate that queries are blocked until a backup is restored.
            </p>
          </div>
          <button
            onClick={handleSimulateCrash}
            disabled={systemHealth === 'CRITICAL_CRASHED'}
            className="w-full py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Simulate Unexpected Server Crash</span>
          </button>
        </div>
      </div>

      {/* Available Snapshots Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Available Recovery Snapshots ({backups.length})
        </h3>
        <div className="divide-y divide-slate-100 text-xs">
          {backups.map((b, idx) => (
            <div key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">{b.id}</span>
                  {idx === 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      LATEST
                    </span>
                  )}
                  <span className="text-slate-400 font-mono">({b.timestamp})</span>
                </div>
                <div className="text-slate-600">{b.description}</div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {b.recordCount} Total Rows Saved • {b.sizeMb} MB
                </div>
              </div>

              <button
                onClick={() => handleRestore(b.id)}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 self-start sm:self-center transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Snapshot</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      <EduInfoModal managerId="backup" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
