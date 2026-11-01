import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { AlertOctagon, LifeBuoy, ArrowRight, HardDrive } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SystemCrashBanner: React.FC = () => {
  const { systemHealth, crashedReason, recoverSystem, backups, restoreBackup } = useSimulation();

  if (systemHealth === 'NORMAL') return null;

  if (systemHealth === 'STORAGE_FULL') {
    return (
      <div className="bg-amber-500 text-slate-950 px-6 py-2.5 flex items-center justify-between text-xs font-semibold shadow-md animate-in slide-in-from-top">
        <div className="flex items-center space-x-2">
          <HardDrive className="w-4 h-4 text-slate-950 animate-bounce" />
          <span>
            <strong>STORAGE ALLOCATION EXCEEDED:</strong> Warehouse disk space is constrained. Writes & ETL batches are restricted!
          </span>
        </div>
        <Link
          to="/config"
          className="px-3 py-1 bg-slate-950 text-white rounded-md hover:bg-slate-800 transition flex items-center space-x-1"
        >
          <span>Expand Storage in Configuration Manager</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-lg animate-in slide-in-from-top">
      <div className="flex items-center space-x-3">
        <div className="p-1.5 bg-white/20 rounded-lg">
          <AlertOctagon className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <div className="font-bold text-sm tracking-wide">
            SIMULATED SYSTEM CRITICAL CRASH IN EFFECT
          </div>
          <div className="text-xs text-red-100">
            {crashedReason || 'Server is offline. SQL queries and ETL jobs are disabled.'}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {backups.length > 0 && (
          <button
            onClick={() => restoreBackup(backups[0].id)}
            className="px-3 py-1.5 bg-white text-red-700 font-bold rounded-lg text-xs hover:bg-red-50 shadow-sm transition flex items-center space-x-1.5"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Restore Latest Snapshot ({backups[0].id})</span>
          </button>
        )}
        <Link
          to="/backup"
          className="px-3 py-1.5 bg-red-950/60 hover:bg-red-950 text-white border border-red-400/40 font-semibold rounded-lg text-xs transition flex items-center space-x-1"
        >
          <span>Open Backup Recovery Manager</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
