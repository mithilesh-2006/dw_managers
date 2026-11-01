import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSimulation } from '../../context/SimulationContext';
import {
  LayoutDashboard,
  Cpu,
  CalendarClock,
  BellRing,
  Database,
  LifeBuoy,
  HardDriveDownload,
  Boxes,
  Terminal,
  Zap,
  CheckCheck,
  GitBranch,
  PlayCircle,
  Presentation,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { systemHealth } = useSimulation();

  const systemManagers = [
    { num: '1', name: 'Configuration Manager', path: '/config', icon: Cpu },
    { num: '2', name: 'Scheduling Manager', path: '/scheduling', icon: CalendarClock },
    { num: '3', name: 'Event Manager', path: '/events', icon: BellRing },
    { num: '4', name: 'Database Manager', path: '/database', icon: Database },
    { num: '5', name: 'Backup Recovery Manager', path: '/backup', icon: LifeBuoy, alert: systemHealth === 'CRITICAL_CRASHED' },
  ];

  const processManagers = [
    { num: '6', name: 'Load Manager (ETL)', path: '/load', icon: HardDriveDownload },
    { num: '7', name: 'Warehouse Manager', path: '/warehouse', icon: Boxes },
    { num: '8', name: 'Query Manager', path: '/query', icon: Terminal },
    { num: '9', name: 'Tuning Manager', path: '/tuning', icon: Zap },
    { num: '10', name: 'Testing Manager', path: '/testing', icon: CheckCheck },
  ];

  return (
    <aside className="w-60 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none text-slate-300">
      <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {/* Main Dashboard Link */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-bold transition ${
              isActive
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`
          }
        >
          <LayoutDashboard className="w-4 h-4 text-slate-400 group-hover:text-white" />
          <span>Overview Dashboard</span>
        </NavLink>

        {/* System Management (Managers 1-5) */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            System Management
          </div>
          <div className="space-y-0.5">
            {systemManagers.map((m) => {
              const Icon = m.icon;
              return (
                <NavLink
                  key={m.path}
                  to={m.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    } ${m.alert ? 'bg-red-950 text-red-200 border border-red-500 animate-pulse' : ''}`
                  }
                >
                  <span className="text-[10px] font-mono text-slate-400 w-3">{m.num}</span>
                  <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{m.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Process Management (Managers 6-10) */}
        <div className="space-y-1">
          <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Process Management
          </div>
          <div className="space-y-0.5">
            {processManagers.map((m) => {
              const Icon = m.icon;
              return (
                <NavLink
                  key={m.path}
                  to={m.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                    }`
                  }
                >
                  <span className="text-[10px] font-mono text-slate-400 w-4">{m.num}</span>
                  <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{m.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Guided Demos & Workflow */}
        <div className="space-y-1 pt-2 border-t border-slate-800">
          <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            Seminar Demos
          </div>
          <div className="space-y-0.5">
            <NavLink
              to="/workflow"
              className={({ isActive }) =>
                `flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`
              }
            >
              <GitBranch className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>10-Manager Workflow</span>
            </NavLink>
            <NavLink
              to="/scenarios"
              className={({ isActive }) =>
                `flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`
              }
            >
              <PlayCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>5 Guided Scenarios</span>
            </NavLink>
            <NavLink
              to="/presentation"
              className={({ isActive }) =>
                `flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isActive ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`
              }
            >
              <Presentation className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="text-indigo-300">Presentation Mode</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 text-center">
        PSG iTech • Anna Univ R2021
      </div>
    </aside>
  );
};
