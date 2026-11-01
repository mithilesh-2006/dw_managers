import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  LifeBuoy,
  ShieldAlert,
  RotateCcw,
  Plus,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  HardDrive,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
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
    recoverSystem,
    students,
    attendance,
    exams,
    placements,
  } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);
  const [backupDescription, setBackupDescription] = useState('');
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const totalCurrentRows = students.length + attendance.length + exams.length + placements.length;

  const handleCreateSnapshot = () => {
    const desc = backupDescription.trim() || `Manual Snapshot (${new Date().toLocaleTimeString()})`;
    const snap = createBackup(desc);
    setBackupDescription('');
    setNotification(`Snapshot "${snap.id}" created successfully! (${snap.recordCount} rows captured)`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleTriggerCrash = () => {
    simulateCrash(
      'Primary SAN controller catastrophic power spike. Disk cluster read-write heads parked. Buffer corrupt.'
    );
  };

  const handleConfirmRestore = () => {
    if (!selectedBackupId) return;
    const ok = restoreBackup(selectedBackupId);
    setShowRestoreModal(false);
    if (ok) {
      setNotification(`System successfully recovered from snapshot ${selectedBackupId}! Operational state: NORMAL.`);
      setTimeout(() => setNotification(null), 5000);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
            <span>System Management Module 5</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <LifeBuoy className="w-7 h-7 text-teal-600" />
            System Backup Recovery Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Schedules automated snapshots, maintains catalog of recovery points, simulates disaster failures, and executes point-in-time state restoration.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-4 py-2 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start md:self-center"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Syllabus Notes & Quiz</span>
        </button>
      </div>

      {/* Problem Scenario */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Server Disaster & Irreversible Data Loss</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            A sudden power outage or disk hardware crash occurs right before Anna University accreditation audit. Without validated snapshot points and tested recovery routines, months of institutional records are permanently lost.
          </p>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Crash Status Banner if crashed */}
      {systemHealth === 'CRITICAL_CRASHED' && (
        <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-5 text-red-950 space-y-3 shadow-md animate-pulse">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-7 h-7 text-red-600 shrink-0" />
            <div>
              <h2 className="text-base font-black text-red-900">DISASTER SIMULATION ACTIVE: WAREHOUSE IS OFFLINE</h2>
              <p className="text-xs text-red-800 mt-0.5">{crashedReason}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
            <span className="font-semibold text-red-900">To recover warehouse operations:</span>
            <button
              onClick={() => {
                if (backups.length > 0) {
                  setSelectedBackupId(backups[0].id);
                  setShowRestoreModal(true);
                }
              }}
              className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-xs transition"
            >
              Restore from Latest Snapshot ({backups[0]?.id})
            </button>
            <button
              onClick={recoverSystem}
              className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition"
            >
              Perform Emergency Reboot (Bypass)
            </button>
          </div>
        </div>
      )}

      {/* Snapshot Creation Studio & Crash Trigger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Backup */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-teal-600" />
              Generate Immediate Snapshot Backup
            </h2>
            <span className="text-[11px] font-mono text-slate-400">
              Live State: {totalCurrentRows} active rows
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Creates an immutable point-in-time serialized freeze of all 6 warehouse tables, configurations, and catalogs.
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Snapshot Description / Reason</label>
              <input
                type="text"
                placeholder="e.g. Pre-Fall Semester Marks ETL Freeze"
                value={backupDescription}
                onChange={(e) => setBackupDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
              />
            </div>
            <button
              onClick={handleCreateSnapshot}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-1.5"
            >
              <LifeBuoy className="w-4 h-4" />
              <span>Capture Point-in-Time Snapshot</span>
            </button>
          </div>
        </div>

        {/* Disaster Crash Simulation Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              Disaster Resilience Testing
            </h2>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
              High Impact Simulation
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Demonstrates how the warehouse handles unrecoverable hardware crashes. Simulates storage failure, takes services offline, and disables query execution until a snapshot is restored.
          </p>

          <div className="pt-2">
            <button
              onClick={handleTriggerCrash}
              disabled={systemHealth === 'CRITICAL_CRASHED'}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-1.5"
            >
              <AlertOctagon className="w-4 h-4" />
              <span>Simulate Unexpected System Crash</span>
            </button>
          </div>
        </div>
      </div>

      {/* Snapshots Catalog */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-600" />
              Available Recovery Points Catalog ({backups.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select any snapshot to roll back warehouse state to that point in time.
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Persistent Local Catalog</span>
        </div>

        <div className="divide-y divide-slate-100">
          {backups.map((bak, idx) => (
            <div
              key={bak.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs hover:bg-slate-50 px-2 rounded-xl transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 font-mono text-sm">{bak.id}</span>
                  {idx === 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      LATEST
                    </span>
                  )}
                  <span className="text-slate-500 font-medium">({bak.timestamp})</span>
                </div>
                <div className="text-slate-600">{bak.description}</div>
                <div className="text-[11px] text-slate-400 flex items-center gap-3">
                  <span>Record Count: <strong className="text-slate-700 font-mono">{bak.recordCount} rows</strong></span>
                  <span>•</span>
                  <span>Estimated Size: <strong className="text-slate-700 font-mono">{bak.sizeMb} MB</strong></span>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => {
                    setSelectedBackupId(bak.id);
                    setShowRestoreModal(true);
                  }}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Snapshot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal Before Restoration */}
      {showRestoreModal && selectedBackupId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-slate-900">Confirm Warehouse State Restoration</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Restoring snapshot <strong className="font-mono text-slate-900">{selectedBackupId}</strong> will overwrite current warehouse tables with the historical state captured at that time. Any records loaded after that snapshot will be reverted.
            </p>

            <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-950 border border-amber-200">
              <strong>Expected Outcome:</strong> Warehouse state, student counts, attendance facts, and configurations will be restored to the snapshot's frozen state.
            </div>

            <div className="pt-2 flex justify-end space-x-2 text-xs">
              <button
                onClick={() => setShowRestoreModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRestore}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-md"
              >
                Yes, Restore Warehouse State
              </button>
            </div>
          </div>
        </div>
      )}

      <EduInfoModal managerId="backup" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
