import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  Users,
  Database,
  HardDrive,
  Activity,
  ArrowRight,
  Cpu,
  CalendarClock,
  BellRing,
  LifeBuoy,
  HardDriveDownload,
  Boxes,
  Terminal,
  Zap,
  CheckCheck,
  Play,
  Layers,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const OverviewDashboard: React.FC = () => {
  const {
    students,
    departments,
    attendance,
    exams,
    placements,
    faculty,
    serverConfig,
    systemHealth,
    scheduledJobs,
    backups,
    events,
    indexes,
    testResults,
  } = useSimulation();

  const totalRecords =
    students.length +
    departments.length +
    attendance.length +
    exams.length +
    placements.length +
    faculty.length;

  const failedTests = testResults.filter((t) => t.status === 'FAIL').length;

  const systemManagers = [
    {
      num: 1,
      name: 'System Configuration Manager',
      path: '/config',
      icon: Cpu,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Manages hardware resources: CPU cores, RAM buffer pool, and storage limits.',
      currentStatus: `${serverConfig.ramAllocatedGb} GB RAM • ${serverConfig.storageAllocatedGb} GB Disk`,
    },
    {
      num: 2,
      name: 'System Scheduling Manager',
      path: '/scheduling',
      icon: CalendarClock,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      description: 'Runs periodic batch jobs (like midnight attendance) automatically without user lockups.',
      currentStatus: `${scheduledJobs.filter((j) => j.enabled).length} Active batch jobs scheduled`,
    },
    {
      num: 3,
      name: 'System Event Manager',
      path: '/events',
      icon: BellRing,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Monitors operational alerts, detects pipeline crashes, and notifies administrators.',
      currentStatus: `${events.length} Operational events logged`,
    },
    {
      num: 4,
      name: 'System Database Manager',
      path: '/database',
      icon: Database,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Maintains table structures, metadata catalogs, and user permissions (RBAC).',
      currentStatus: '6 Core Tables (Dim & Fact) • Active RBAC',
    },
    {
      num: 5,
      name: 'System Backup Recovery Manager',
      path: '/backup',
      icon: LifeBuoy,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      description: 'Saves snapshot recovery points and restores data if the server crashes.',
      currentStatus: `${backups.length} Recovery snapshot(s) cataloged`,
    },
  ];

  const processManagers = [
    {
      num: 6,
      name: 'Load Manager (ETL)',
      path: '/load',
      icon: HardDriveDownload,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      description: 'Extracts raw departmental files, removes duplicates, normalizes names, and loads data.',
      currentStatus: 'ETL Pipeline Ready (Extract → Transform → Load)',
    },
    {
      num: 7,
      name: 'Warehouse Manager',
      path: '/warehouse',
      icon: Boxes,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      description: 'Organizes data into a Star Schema and partitions history by Academic Year.',
      currentStatus: 'Star Schema Active • 4 Year Partitions',
    },
    {
      num: 8,
      name: 'Query Manager',
      path: '/query',
      icon: Terminal,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
      description: 'Accepts analytical SQL queries and returns instant statistics for college deans.',
      currentStatus: 'In-Browser SQL Engine Active',
    },
    {
      num: 9,
      name: 'Tuning Manager',
      path: '/tuning',
      icon: Zap,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      description: 'Builds B-Tree and Bitmap indexes to speed up slow table-scanning queries.',
      currentStatus: `${indexes.length} Active indexes (~4x speedup)`,
    },
    {
      num: 10,
      name: 'Testing Manager',
      path: '/testing',
      icon: CheckCheck,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      description: 'Checks for missing rows, duplicate IDs, null values, and grading range violations.',
      currentStatus: failedTests > 0 ? `${failedTests} Discrepancies detected` : 'Data 100% Verified',
    },
  ];

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Friendly Ideology Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-sm border border-slate-800 space-y-3">
        <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
          Anna University R2021 Syllabus • PSG iTech College Data Warehouse
        </div>
        <h1 className="text-xl sm:text-2xl font-black tracking-tight">
          Data Warehouse Management Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          In Data Warehousing, <strong>10 specialized managers</strong> run the entire warehouse.
          They are divided into two clear responsibilities: <strong>System Management</strong> (hardware, scheduling, logging, security, backups) and <strong>Process Management</strong> (ETL loading, star schema dimensional modeling, querying, indexing, and quality testing).
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <Link
            to="/workflow"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run 10-Manager End-to-End Workflow</span>
          </Link>
          <Link
            to="/scenarios"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-200 rounded-lg font-semibold transition"
          >
            5 Guided Scenarios &rarr;
          </Link>
        </div>
      </div>

      {/* 4 Core State Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Students</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">{students.length} Students</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across CSE, ECE, EEE, IT, MECH</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Records</span>
            <Database className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">{totalRecords} Records</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Facts, Dimensions & Scores</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Storage Status</span>
            <HardDrive className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">
            {serverConfig.storageUsedGb} / {serverConfig.storageAllocatedGb} GB
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {Math.round((serverConfig.storageUsedGb / serverConfig.storageAllocatedGb) * 100)}% Disk Capacity
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">System State</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-xl font-black text-slate-900">
            {systemHealth === 'NORMAL' ? 'Optimal' : systemHealth.replace('_', ' ')}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Cluster Operations Online</div>
        </div>
      </div>

      {/* The 10 Managers Overview (2 Clean Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: System Management */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              System Management (Managers 1 – 5)
            </h2>
            <span className="text-[11px] text-slate-500">Hardware, Schedule, Security, Backups</span>
          </div>

          <div className="space-y-2.5">
            {systemManagers.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.num}
                  to={m.path}
                  className="block bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg border ${m.color} shrink-0 mt-0.5`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center gap-1.5">
                          <span>{m.num}. {m.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{m.description}</p>
                        <div className="text-[11px] text-slate-700 font-medium font-mono pt-1">
                          Live: {m.currentStatus}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column: Process Management */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Process Management (Managers 6 – 10)
            </h2>
            <span className="text-[11px] text-slate-500">ETL, Modeling, SQL, Indexing, Testing</span>
          </div>

          <div className="space-y-2.5">
            {processManagers.map((m) => {
              const Icon = m.icon;
              return (
                <Link
                  key={m.num}
                  to={m.path}
                  className="block bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg border ${m.color} shrink-0 mt-0.5`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition flex items-center gap-1.5">
                          <span>{m.num}. {m.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{m.description}</p>
                        <div className="text-[11px] text-slate-700 font-medium font-mono pt-1">
                          Live: {m.currentStatus}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 shrink-0 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Ticker */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Recent System Activity Log
          </h3>
          <Link to="/events" className="text-xs text-blue-600 hover:underline font-semibold">
            View All ({events.length}) &rarr;
          </Link>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {events.slice(0, 4).map((evt) => (
            <div key={evt.id} className="py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 truncate">
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    evt.category === 'critical'
                      ? 'bg-red-500'
                      : evt.category === 'error'
                      ? 'bg-rose-500'
                      : evt.category === 'warning'
                      ? 'bg-amber-500'
                      : 'bg-blue-500'
                  }`}
                ></span>
                <span className="font-semibold text-slate-800 truncate">{evt.message}</span>
              </div>
              <div className="text-slate-400 font-mono text-[11px] shrink-0">
                {evt.sourceManager.replace('System ', '').replace(' Manager', '')} • {evt.timestamp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
