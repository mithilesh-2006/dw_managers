import React from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Server,
  AlertTriangle,
  RotateCcw,
  Presentation,
  ShieldCheck,
  UserCheck,
  HardDrive,
  Cpu,
  Layers,
  Bell,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const {
    systemHealth,
    serverConfig,
    currentUser,
    users,
    switchUser,
    resetSimulation,
    events,
  } = useSimulation();

  const navigate = useNavigate();

  const unackErrors = events.filter((e) => (e.category === 'error' || e.category === 'critical') && !e.acknowledged).length;

  const handleReset = () => {
    if (window.confirm('Reset all 10 managers to initial golden PSG iTech simulation dataset?')) {
      resetSimulation();
      navigate('/');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Organization & Title */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
          <Server className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-extrabold text-slate-900 text-base tracking-tight">
              DW Control Center
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 tracking-wide">
              AU R2021
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            PSG iTech College Data Warehouse Simulation
          </p>
        </div>
      </div>

      {/* Middle: System Health & Key Telemetry */}
      <div className="hidden lg:flex items-center space-x-5 text-xs font-medium text-slate-600">
        {/* Health Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
          <span className="relative flex h-2.5 w-2.5">
            {systemHealth === 'NORMAL' && (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </>
            )}
            {systemHealth === 'CRITICAL_CRASHED' && (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </>
            )}
            {systemHealth === 'STORAGE_FULL' && (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </>
            )}
          </span>
          <span className="font-semibold text-slate-800">
            {systemHealth === 'NORMAL' && 'System Online (Healthy)'}
            {systemHealth === 'CRITICAL_CRASHED' && 'CRITICAL CRASH DETECTED'}
            {systemHealth === 'STORAGE_FULL' && 'STORAGE FULL WARNING'}
          </span>
        </div>

        {/* CPU */}
        <div className="flex items-center space-x-1.5 text-slate-500">
          <Cpu className="w-3.5 h-3.5 text-slate-400" />
          <span>CPU:</span>
          <span className="font-mono font-semibold text-slate-700">{serverConfig.cpuUtilization}%</span>
        </div>

        {/* Storage */}
        <div className="flex items-center space-x-1.5 text-slate-500">
          <HardDrive className="w-3.5 h-3.5 text-slate-400" />
          <span>Disk:</span>
          <span className="font-mono font-semibold text-slate-700">
            {serverConfig.storageUsedGb} / {serverConfig.storageAllocatedGb} GB
          </span>
          <span className="text-[10px] text-slate-400">
            ({Math.round((serverConfig.storageUsedGb / serverConfig.storageAllocatedGb) * 100)}%)
          </span>
        </div>

        {/* Buffer Pool */}
        <div className="flex items-center space-x-1.5 text-slate-500">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>Buffer:</span>
          <span className="font-mono font-semibold text-slate-700">{serverConfig.ramBufferPoolMb} MB</span>
        </div>
      </div>

      {/* Right: Active Role Selector & Quick Actions */}
      <div className="flex items-center space-x-3">
        {/* User Role Switcher */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <UserCheck className="w-3.5 h-3.5 text-slate-500 ml-1.5" />
          <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">Role:</span>
          <select
            value={currentUser.id}
            onChange={(e) => switchUser(e.target.value)}
            className="text-xs font-semibold bg-transparent border-0 text-slate-800 focus:ring-0 cursor-pointer py-0.5 pl-1 pr-6"
          >
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.username} ({u.role})
              </option>
            ))}
          </select>
        </div>

        {/* Event Alerts Button */}
        <Link
          to="/events"
          className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          title="System Event Manager"
        >
          <Bell className="w-4 h-4" />
          {unackErrors > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
              {unackErrors}
            </span>
          )}
        </Link>

        {/* Presentation Mode Button */}
        <Link
          to="/presentation"
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
          title="Projector / Seminar Presentation Mode"
        >
          <Presentation className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Presentation Mode</span>
        </Link>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="flex items-center space-x-1 px-2.5 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg text-xs font-medium transition"
          title="Reset simulation to initial state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Reset</span>
        </button>
      </div>
    </header>
  );
};
