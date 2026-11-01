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
  HelpCircle,
  Presentation,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { events, scheduledJobs, backups, testResults, systemHealth } = useSimulation();

  const unackEvents = events.filter((e) => !e.acknowledged).length;
  const activeJobs = scheduledJobs.filter((j) => j.enabled).length;
  const failedTests = testResults.filter((t) => t.status === 'FAIL').length;

  const navGroups = [
    {
      groupTitle: 'Core Overview',
      items: [
        { name: 'Overview Dashboard', path: '/', icon: LayoutDashboard },
      ],
    },
    {
      groupTitle: 'System Management (5)',
      items: [
        {
          name: '1. Configuration Manager',
          path: '/config',
          icon: Cpu,
        },
        {
          name: '2. Scheduling Manager',
          path: '/scheduling',
          icon: CalendarClock,
          badge: `${activeJobs} Active`,
        },
        {
          name: '3. Event Manager',
          path: '/events',
          icon: BellRing,
          badge: unackEvents > 0 ? `${unackEvents}` : undefined,
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        },
        {
          name: '4. Database Manager',
          path: '/database',
          icon: Database,
        },
        {
          name: '5. Backup Recovery Manager',
          path: '/backup',
          icon: LifeBuoy,
          badge: `${backups.length} snaps`,
          alert: systemHealth === 'CRITICAL_CRASHED',
        },
      ],
    },
    {
      groupTitle: 'Process Management (5)',
      items: [
        {
          name: '6. Load Manager (ETL)',
          path: '/load',
          icon: HardDriveDownload,
        },
        {
          name: '7. Warehouse Manager',
          path: '/warehouse',
          icon: Boxes,
        },
        {
          name: '8. Query Manager',
          path: '/query',
          icon: Terminal,
        },
        {
          name: '9. Tuning Manager',
          path: '/tuning',
          icon: Zap,
        },
        {
          name: '10. Testing Manager',
          path: '/testing',
          icon: CheckCheck,
          badge: failedTests > 0 ? `${failedTests} Fail` : undefined,
          badgeColor: 'bg-red-500/20 text-red-300 border-red-500/30',
        },
      ],
    },
    {
      groupTitle: 'Integration & Live Demo',
      items: [
        {
          name: 'Cross-Manager Workflow',
          path: '/workflow',
          icon: GitBranch,
        },
        {
          name: 'Simulation Scenarios',
          path: '/scenarios',
          icon: PlayCircle,
        },
        {
          name: 'Presentation Mode',
          path: '/presentation',
          icon: Presentation,
        },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0 select-none text-slate-300">
      {/* Upper Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            <h2 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {group.groupTitle}
            </h2>
            <div className="space-y-0.5 mt-1.5">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors duration-150 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                      } ${item.alert ? 'ring-2 ring-red-500 animate-pulse' : ''}`
                    }
                  >
                    <div className="flex items-center space-x-2.5 truncate">
                      <IconComponent className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-white" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full border font-mono font-medium shrink-0 ${
                          item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer info & Anna University credit */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
        <div className="px-2 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-[11px]">
          <div className="flex items-center justify-between text-slate-400 font-medium">
            <span>Anna Univ R2021</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
              Live Sim
            </span>
          </div>
          <div className="text-slate-300 font-semibold mt-1">
            Data Warehousing Simulator
          </div>
        </div>
      </div>
    </aside>
  );
};
