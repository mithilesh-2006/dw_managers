import React from 'react';
import {
  CheckCircle2,
  HardDrive,
  Clock,
  ShieldCheck,
  LifeBuoy,
  Zap,
  Boxes,
  Terminal,
  CheckCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

interface VisualOutcomeProps {
  managerId: string;
}

export const VisualOutcomeCard: React.FC<VisualOutcomeProps> = ({ managerId }) => {
  switch (managerId) {
    // -------------------------------------------------------------
    // Manager 1: System Configuration Manager
    // -------------------------------------------------------------
    case 'config': {
      const storageChart = [
        { name: 'Before (Old Space)', freeGb: 716, fill: '#f59e0b' },
        { name: 'After (Expanded Space)', freeGb: 1228, fill: '#10b981' },
      ];

      return (
        <div className="bg-slate-950 border border-blue-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW (Before -> Manager -> After) */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  600 new students are enrolling. Warehouse hard drive has only <strong>716 GB free</strong>.
                </p>
              </div>
              <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-500/40 space-y-1">
                <span className="text-blue-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Expands hard drive storage from <strong>1536 GB to 2048 GB</strong> and increases RAM.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  Storage now has <strong>1228 GB free space</strong>. Future student uploads won't crash!
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-blue-400" />
                Available Free Storage Comparison Chart (Gigabytes)
              </span>
              <span className="text-emerald-400">+512 GB Added</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={storageChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit=" GB" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val} GB Free Space`, 'Capacity']}
                  />
                  <Bar dataKey="freeGb" radius={[6, 6, 0, 0]}>
                    {storageChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 2: System Scheduling Manager
    // -------------------------------------------------------------
    case 'scheduling': {
      const scheduleChart = [
        { time: 'Daytime (9 AM - 6 PM)', batchLoad: 0, userQueries: 100 },
        { time: 'Midnight Window (11:30 PM)', batchLoad: 100, userQueries: 5 },
      ];

      return (
        <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  Campus biometric scanners record attendance all day. Loading them during the day slows down college staff.
                </p>
              </div>
              <div className="p-3 bg-purple-950/60 rounded-xl border border-purple-500/40 space-y-1">
                <span className="text-purple-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Holds data in queue and sets an automatic clock trigger to run at <strong>23:30 Midnight</strong>.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  <strong>60 attendance records</strong> load overnight with <strong>0% daytime system slowdown</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-400" />
                Workload Schedule Chart: Daytime vs Midnight Batch Loading (%)
              </span>
              <span className="text-purple-300">Zero Lock Contention</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scheduleChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="batchLoad" name="Batch Data Loading" fill="#a855f7" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="userQueries" name="Staff Daily Reports" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 3: System Event Manager
    // -------------------------------------------------------------
    case 'event': {
      const eventChart = [
        { category: 'Informational (Normal)', count: 18, fill: '#3b82f6' },
        { category: 'Warnings (High Storage)', count: 4, fill: '#f59e0b' },
        { category: 'Errors (Bad Data)', count: 2, fill: '#ef4444' },
      ];

      return (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  A loading job fails or hard drive space reaches 90%. Raw error signal occurs inside the system.
                </p>
              </div>
              <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-500/40 space-y-1">
                <span className="text-amber-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Catches the error, labels the severity (Warning or Error), and prescribes the exact fix.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  The administrator receives an instant notification with steps to resolve the issue. Zero silent failures.
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Live College Event Severity Breakdown Chart
              </span>
              <span className="text-amber-400">100% Tracked</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={eventChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  />
                  <Bar dataKey="count" name="Logged Events" radius={[6, 6, 0, 0]}>
                    {eventChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 4: System Database Manager
    // -------------------------------------------------------------
    case 'database': {
      const tableSizesChart = [
        { table: 'Dim_Student', rows: 60, fill: '#3b82f6' },
        { table: 'Fact_Attendance', rows: 60, fill: '#10b981' },
        { table: 'Fact_Examination', rows: 60, fill: '#a855f7' },
        { table: 'Fact_Placement', rows: 18, fill: '#f59e0b' },
      ];

      return (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  Unstructured student data arrives. Anyone could try to edit student examination grades.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Organizes columns, primary keys, and checks user security roles (Admin vs Guest).
                </p>
              </div>
              <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-500/40 space-y-1">
                <span className="text-blue-300 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  Admins can update marks, but guest users are strictly blocked from tampering with records.
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Active Database Table Record Counts Chart
              </span>
              <span className="text-emerald-400">Strict RBAC Enforced</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tableSizesChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="table" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val} Records`, 'Table Rows']}
                  />
                  <Bar dataKey="rows" radius={[6, 6, 0, 0]}>
                    {tableSizesChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 5: System Backup Recovery Manager
    // -------------------------------------------------------------
    case 'backup': {
      const recoveryChart = [
        { state: '1. Before Crash', dataAvailablePct: 100, fill: '#10b981' },
        { state: '2. During Crash', dataAvailablePct: 0, fill: '#ef4444' },
        { state: '3. Restored State', dataAvailablePct: 100, fill: '#38bdf8' },
      ];

      return (
        <div className="bg-slate-950 border border-teal-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  All college student marks and attendance are live in the working database.
                </p>
              </div>
              <div className="p-3 bg-teal-950/60 rounded-xl border border-teal-500/40 space-y-1">
                <span className="text-teal-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Freezes a safety backup copy (snapshot). If the server crashes, reloads that saved snapshot.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  Even after a server crash, <strong>100% of student records are restored</strong> in under 2 seconds.
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <LifeBuoy className="w-4 h-4 text-teal-400" />
                Disaster Recovery Timeline Chart: Data Availability (%)
              </span>
              <span className="text-teal-300">0 Minutes Lost</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={recoveryChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="state" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val}% Data Accessible`, 'Status']}
                  />
                  <Bar dataKey="dataAvailablePct" radius={[6, 6, 0, 0]}>
                    {recoveryChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 6: Load Manager (ETL)
    // -------------------------------------------------------------
    case 'load': {
      const etlChart = [
        { stage: '1. Raw Read In', records: 7, fill: '#38bdf8' },
        { stage: '2. Clean Loaded', records: 6, fill: '#10b981' },
        { stage: '3. Duplicate Rejected', records: 1, fill: '#ef4444' },
      ];

      return (
        <div className="bg-slate-950 border border-blue-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  Raw CSV file arrives from department with typos ("cse" in lowercase) and a duplicate student scan.
                </p>
              </div>
              <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-500/40 space-y-1">
                <span className="text-blue-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Normalizes names to "CSE", catches the duplicate ID, and filters it into an error quarantine box.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  Only 100% clean rows enter <strong>Fact_Attendance</strong>. Garbage data is rejected.
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ETL Data Cleaning Pipeline Chart (Records In vs Clean Loaded)
              </span>
              <span className="text-emerald-400">Pristine Warehouse</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={etlChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val} Records`, 'Count']}
                  />
                  <Bar dataKey="records" radius={[6, 6, 0, 0]}>
                    {etlChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 7: Warehouse Manager
    // -------------------------------------------------------------
    case 'warehouse': {
      const partitionChart = [
        { method: 'Without Partitions (Whole History)', diskScannedPct: 100, fill: '#ef4444' },
        { method: 'With Year Partitions (Only 2024)', diskScannedPct: 25, fill: '#10b981' },
      ];

      return (
        <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  Unorganized flat attendance records from 4 different academic years all mixed together.
                </p>
              </div>
              <div className="p-3 bg-indigo-950/60 rounded-xl border border-indigo-500/40 space-y-1">
                <span className="text-indigo-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Connects tables into a <strong>Star Schema</strong> and divides data into <strong>Academic Year partitions</strong>.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  When searching for 2024 records, the system skips 2021, 2022, and 2023 partitions completely!
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <Boxes className="w-4 h-4 text-indigo-400" />
                Partition Pruning Chart: Physical Disk Scanned (%)
              </span>
              <span className="text-emerald-400">75% Disk Work Saved</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={partitionChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="method" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val}% Physical Disk Scanned`, 'Disk I/O']}
                  />
                  <Bar dataKey="diskScannedPct" radius={[6, 6, 0, 0]}>
                    {partitionChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 8: Query Manager
    // -------------------------------------------------------------
    case 'query': {
      const placementChart = [
        { dept: 'CSE', avgSalaryLpa: 13.5, offers: 11, fill: '#3b82f6' },
        { dept: 'IT', avgSalaryLpa: 16.5, offers: 2, fill: '#a855f7' },
        { dept: 'ECE', avgSalaryLpa: 11.9, offers: 4, fill: '#10b981' },
        { dept: 'MECH', avgSalaryLpa: 7.0, offers: 1, fill: '#f59e0b' },
      ];

      return (
        <div className="bg-slate-950 border border-sky-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  College Principal asks: <em>"Which engineering branch has the highest placement package?"</em>
                </p>
              </div>
              <div className="p-3 bg-sky-950/60 rounded-xl border border-sky-500/40 space-y-1">
                <span className="text-sky-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Parses the SQL statement, scans <strong>Fact_Placement</strong>, and calculates average packages.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  Generates the complete summary chart in <strong>14.2 milliseconds</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-sky-400" />
                Query Results Chart: Average Placement Package by Department (LPA)
              </span>
              <span className="text-sky-300">Fast 14 ms</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={placementChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="dept" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit=" LPA" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val} Lakhs / Year`, 'Avg Salary']}
                  />
                  <Bar dataKey="avgSalaryLpa" radius={[6, 6, 0, 0]}>
                    {placementChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 9: Tuning Manager
    // -------------------------------------------------------------
    case 'tuning': {
      const speedChart = [
        { type: 'Without Index (Full Table Scan)', timeMs: 48.5, fill: '#ef4444' },
        { type: 'With Bitmap Index (Index Scan)', timeMs: 12.2, fill: '#10b981' },
      ];

      return (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  Filtering by department checks every single student row from beginning to end (Full Table Scan).
                </p>
              </div>
              <div className="p-3 bg-amber-950/60 rounded-xl border border-amber-500/40 space-y-1">
                <span className="text-amber-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Builds a <strong>Bitmap Index</strong> (like an index at the back of a textbook).
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-400 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  The query jumps directly to the matching CSE rows. <strong>4.0x faster search speed</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Query Speed Comparison Chart: Execution Time (Milliseconds)
              </span>
              <span className="text-emerald-400">74.8% Faster</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={speedChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="type" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit=" ms" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val} ms`, 'Search Time']}
                  />
                  <Bar dataKey="timeMs" radius={[6, 6, 0, 0]}>
                    {speedChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------------------------
    // Manager 10: Testing Manager
    // -------------------------------------------------------------
    case 'testing': {
      const testScoreChart = [
        { testName: '1. Count Match', scorePct: 100, fill: '#10b981' },
        { testName: '2. 0 Duplicates', scorePct: 100, fill: '#10b981' },
        { testName: '3. 0 Null Fields', scorePct: 100, fill: '#10b981' },
        { testName: '4. Valid Students', scorePct: 100, fill: '#10b981' },
        { testName: '5. CGPA In Range', scorePct: 100, fill: '#10b981' },
      ];

      return (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-5 animate-in fade-in">
          {/* 1. DATA FLOW */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block font-mono">
              🔄 Data Flow: How Information Moves Through This Manager
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">1. Before Manager (Input)</span>
                <p className="text-slate-300 text-[11px]">
                  Data has been loaded into warehouse tables. We must confirm zero records were lost or corrupted.
                </p>
              </div>
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 space-y-1">
                <span className="text-emerald-300 font-bold block">2. Manager Action</span>
                <p className="text-slate-200 text-[11px]">
                  Runs 5 automated quality checks: compares source count, checks duplicate IDs, and verifies CGPAs.
                </p>
              </div>
              <div className="p-3 bg-blue-950/60 rounded-xl border border-blue-500/40 space-y-1">
                <span className="text-blue-300 font-bold block">3. After Manager (Output)</span>
                <p className="text-slate-200 text-[11px]">
                  <strong>100% Quality Certificate verified</strong>: Management reports are guaranteed accurate.
                </p>
              </div>
            </div>
          </div>

          {/* 2. VISUAL CHART */}
          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-slate-200 flex items-center gap-1.5">
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                Data Quality Test Pass Rate Chart (5 of 5 Tests Passed)
              </span>
              <span className="text-emerald-400">100% Verified</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={testScoreChart} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="testName" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                    formatter={(val: any) => [`${val}% Pass Score`, 'Result']}
                  />
                  <Bar dataKey="scorePct" radius={[6, 6, 0, 0]}>
                    {testScoreChart.map((entry, idx) => (
                      <Cell key={idx} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
};
