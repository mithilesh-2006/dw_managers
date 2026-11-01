import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Server,
  RotateCcw,
  Presentation,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const {
    systemHealth,
    serverConfig,
    resetSimulation,
  } = useSimulation();

  const navigate = useNavigate();

  const handleReset = () => {
    if (window.confirm('Reset the simulation back to initial sample state?')) {
      resetSimulation();
      navigate('/');
    }
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Organization & Title */}
      <Link to="/" className="flex items-center space-x-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
          <Server className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition">
              DW Control Center
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Anna Univ R2021
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            PSG iTech College Data Warehouse Simulator
          </p>
        </div>
      </Link>

      {/* Middle: System Health Pill */}
      <div className="flex items-center space-x-2">
        <div
          className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            systemHealth === 'NORMAL'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : systemHealth === 'STORAGE_FULL'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-red-50 text-red-700 border-red-300 animate-pulse'
          }`}
        >
          {systemHealth === 'NORMAL' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Warehouse Online (Healthy)</span>
            </>
          ) : systemHealth === 'STORAGE_FULL' ? (
            <>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Storage High ({serverConfig.storageUsedGb} GB)</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>System Crashed (Offline)</span>
            </>
          )}
        </div>
      </div>

      {/* Right: Quick Actions */}
      <div className="flex items-center space-x-2">
        {/* Presentation Mode Button */}
        <Link
          to="/presentation"
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          title="Open Classroom Presentation Mode"
        >
          <Presentation className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Presentation Mode</span>
        </Link>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center space-x-1 px-2.5 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 rounded-lg text-xs font-medium transition"
          title="Reset to default initial data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </header>
  );
};
