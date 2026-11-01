import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  Users,
  Database,
  HardDrive,
  CalendarCheck,
  LifeBuoy,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  Play,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from 'recharts';
import { Link } from 'react-router-dom';
import { EduInfoModal } from '../components/common/EduInfoModal';

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
    etlHistory,
    testResults,
  } = useSimulation();

  const [activeEduModal, setActiveEduModal] = useState<string | null>(null);

  const totalWarehouseRecords =
    students.length +
    departments.length +
    attendance.length +
    exams.length +
    placements.length +
    faculty.length;

  const failedJobsCount = scheduledJobs.filter((j) => j.status === 'FAILED').length;
  const activeJobsCount = scheduledJobs.filter((j) => j.enabled).length;
  const lastBackupObj = backups[0];

  // Data for Department-wise Student Chart
  const deptData = departments.map((d) => {
    const count = students.filter((s) => s.department_id === d.department_id).length;
    return {
      department: d.department_id,
      name: d.department_name,
      students: count,
    };
  });

  // Storage breakdown chart
  const storageData = [
    { name: 'Fact Tables', value: Math.round(serverConfig.storageUsedGb * 0.65 * 10) / 10, color: '#3b82f6' },
    { name: 'Dimension Tables', value: Math.round(serverConfig.storageUsedGb * 0.20 * 10) / 10, color: '#10b981' },
    { name: 'Indexes & Catalog', value: Math.round(serverConfig.storageUsedGb * 0.15 * 10) / 10, color: '#f59e0b' },
  ];

  // Loading trend chart
  const loadingTrend = [
    { time: '09:00', records: 45 },
    { time: '12:00', records: 75 },
    { time: '15:00', records: 60 },
    { time: '18:00', records: 95 },
    { time: '21:00', records: 120 },
    { time: 'Now', records: totalWarehouseRecords },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-800">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Anna University R2021 Syllabus Simulation Center</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            PSG iTech College Data Warehouse Control Room
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Centralized educational operations center orchestrating all 10 Data Warehouse System and Process Managers. Every button modifies real shared warehouse state.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/workflow"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Run 10-Manager Workflow</span>
          </Link>
          <Link
            to="/scenarios"
            className="px-4 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
          >
            <span>Guided Scenarios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 8 System Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Health */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">System Health</span>
            <div
              className={`p-2 rounded-lg ${
                systemHealth === 'NORMAL' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
              }`}
            >
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900 capitalize">
            {systemHealth === 'NORMAL' ? 'Optimal (Healthy)' : systemHealth.replace('_', ' ')}
          </div>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${systemHealth === 'NORMAL' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
            {serverConfig.os}
          </p>
        </div>

        {/* 2. Total Students */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Students</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900">{students.length} Students</div>
          <p className="text-xs text-slate-500 mt-1">Across 5 Engineering Branches</p>
        </div>

        {/* 3. Total Records */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Warehouse Records</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900">{totalWarehouseRecords} Rows</div>
          <p className="text-xs text-slate-500 mt-1">Facts, Dimensions & Aggregations</p>
        </div>

        {/* 4. Storage Utilization */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Storage Used</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900">
            {serverConfig.storageUsedGb} GB{' '}
            <span className="text-xs font-normal text-slate-500">/ {serverConfig.storageAllocatedGb} GB</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className={`h-full ${
                serverConfig.storageUsedGb / serverConfig.storageAllocatedGb > 0.9 ? 'bg-red-500' : 'bg-blue-600'
              }`}
              style={{
                width: `${Math.min(100, Math.round((serverConfig.storageUsedGb / serverConfig.storageAllocatedGb) * 100))}%`,
              }}
            ></div>
          </div>
        </div>

        {/* 5. Scheduled Jobs */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Scheduled Jobs</span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900">{activeJobsCount} Active</div>
          <p className="text-xs text-slate-500 mt-1">Total {scheduledJobs.length} Registered Tasks</p>
        </div>

        {/* 6. Failed Jobs */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Failed Jobs</span>
            <div className={`p-2 rounded-lg ${failedJobsCount > 0 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900">{failedJobsCount} Failed</div>
          <p className="text-xs text-slate-500 mt-1">{failedJobsCount === 0 ? 'All jobs clean' : 'Requires intervention'}</p>
        </div>

        {/* 7. Last Backup */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Snapshot</span>
            <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
              <LifeBuoy className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900 truncate">
            {lastBackupObj ? lastBackupObj.id : 'None'}
          </div>
          <p className="text-xs text-slate-500 mt-1 truncate">
            {lastBackupObj ? lastBackupObj.timestamp : 'No backups created'}
          </p>
        </div>

        {/* 8. Data Loading Status */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Data Loading Status</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-xl font-bold text-slate-900">
            {etlHistory.length > 0 ? `${etlHistory[0].loadedCount} Rows Loaded` : 'Ready to Load'}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {etlHistory.length > 0 ? `Last Batch: ${etlHistory[0].targetTable}` : 'No ETL runs in session'}
          </p>
        </div>
      </div>

      {/* Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart 1: Department Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Department Student Distribution</h2>
              <p className="text-xs text-slate-500">Live counts from Dim_Student</p>
            </div>
            <Link to="/warehouse" className="text-xs text-blue-600 hover:underline font-semibold flex items-center">
              Warehouse <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="department" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any) => [`${val} Students`, 'Count']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Storage Allocation Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Storage Volume Breakdown</h2>
              <p className="text-xs text-slate-500">Physical disk space usage</p>
            </div>
            <Link to="/config" className="text-xs text-blue-600 hover:underline font-semibold flex items-center">
              Config <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={storageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {storageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any) => [`${val} GB`, 'Disk Space']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs">
            {storageData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-slate-600">{item.name} ({item.value} GB)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Record Growth Trend */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Warehouse Growth Trend</h2>
              <p className="text-xs text-slate-500">Cumulative record loading curve</p>
            </div>
            <Link to="/load" className="text-xs text-blue-600 hover:underline font-semibold flex items-center">
              ETL Pipeline <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </Link>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={loadingTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="records" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Ticker & Manager Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live System Event Log */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Live Central Event Activity Feed</h2>
            </div>
            <Link to="/events" className="text-xs font-semibold text-blue-600 hover:underline">
              View All ({events.length})
            </Link>
          </div>
          <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
            {events.slice(0, 6).map((evt) => (
              <div key={evt.id} className="p-3.5 hover:bg-slate-50/80 transition flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                      evt.category === 'critical'
                        ? 'bg-red-100 text-red-800 border border-red-200'
                        : evt.category === 'error'
                        ? 'bg-rose-100 text-rose-800'
                        : evt.category === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {evt.category}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-800">{evt.message}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-2">
                      <span className="font-medium text-slate-600">{evt.sourceManager}</span>
                      <span>•</span>
                      <span>{evt.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Quick Educational Concept Navigator */}
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">10 Managers Syllabus Reference</h2>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
              Anna Univ R2021
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Click any manager to inspect its problem statement, responsibilities, and 2-question knowledge test.
          </p>

          <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
            {[
              { id: 'config', name: '1. Configuration Manager' },
              { id: 'scheduling', name: '2. Scheduling Manager' },
              { id: 'event', name: '3. Event Manager' },
              { id: 'database', name: '4. Database Manager' },
              { id: 'backup', name: '5. Backup Recovery Manager' },
              { id: 'load', name: '6. Load Manager (ETL)' },
              { id: 'warehouse', name: '7. Warehouse Manager' },
              { id: 'query', name: '8. Query Manager' },
              { id: 'tuning', name: '9. Tuning Manager' },
              { id: 'testing', name: '10. Testing Manager' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveEduModal(m.id)}
                className="w-full text-left px-3 py-2 rounded-lg border border-slate-100 hover:border-blue-300 hover:bg-blue-50/50 text-xs font-medium text-slate-700 flex items-center justify-between transition group"
              >
                <span>{m.name}</span>
                <span className="text-[10px] font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition">
                  Explain & Quiz →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Educational Modal */}
      {activeEduModal && (
        <EduInfoModal
          managerId={activeEduModal}
          isOpen={!!activeEduModal}
          onClose={() => setActiveEduModal(null)}
        />
      )}
    </div>
  );
};
