import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HardDrive,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Database,
  LifeBuoy,
  Zap,
  TrendingDown,
  Boxes,
  Split,
  Award,
  Layers,
  Terminal,
  Activity,
  CheckCheck,
  XCircle,
} from 'lucide-react';

interface VisualOutcomeProps {
  managerId: string;
}

export const VisualOutcomeCard: React.FC<VisualOutcomeProps> = ({ managerId }) => {
  switch (managerId) {
    // 1. Configuration Manager Visual Outcome
    case 'config':
      return (
        <div className="bg-slate-950 border border-blue-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                Visual Outcome: Storage Capacity Expanded
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Safe Zone: 40% Utilized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Before */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="text-[11px] font-bold uppercase text-slate-400 font-mono">
                Before Allocation (Constrained)
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Allocated: 1536 GB</span>
                <span className="text-amber-400 font-bold">53% Full</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[53%]"></div>
              </div>
            </div>

            {/* After */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-blue-500/40 space-y-2">
              <div className="text-[11px] font-bold uppercase text-emerald-400 font-mono">
                After Reconfiguration (Expanded)
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-200">Allocated: 2048 GB</span>
                <span className="text-emerald-400 font-bold">40% Full (Healthy)</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[40%]"></div>
              </div>
            </div>
          </div>

          {/* 3 Visual Metric Badges */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="bg-blue-950/60 p-2.5 rounded-xl border border-blue-500/30">
              <span className="text-slate-400 text-[10px] block">Added Disk Capacity</span>
              <span className="text-blue-300 font-bold">+512 GB SAN Space</span>
            </div>
            <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-500/30">
              <span className="text-slate-400 text-[10px] block">RAM Buffer Pool</span>
              <span className="text-indigo-300 font-bold">16,384 MB Active</span>
            </div>
            <div className="bg-emerald-950/60 p-2.5 rounded-xl border border-emerald-500/30">
              <span className="text-slate-400 text-[10px] block">Disk Outage Risk</span>
              <span className="text-emerald-400 font-bold">0% (Guaranteed Safe)</span>
            </div>
          </div>
        </div>
      );

    // 2. Scheduling Manager Visual Outcome
    case 'scheduling':
      return (
        <div className="bg-slate-950 border border-purple-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                Visual Outcome: Automated Midnight Batch Window
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Job Status: COMPLETED
            </span>
          </div>

          {/* Timeline Diagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <div className="text-amber-400 font-bold">09:00 - 18:00 Peak Daytime</div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Heavy batch updates are locked out. Daytime college queries run at full speed with <strong>0% lock contention</strong>.
              </p>
            </div>
            <div className="bg-purple-950/60 p-3.5 rounded-xl border border-purple-500/40 space-y-1">
              <div className="text-purple-300 font-bold">23:30 Midnight Maintenance Window</div>
              <p className="text-slate-200 text-[11px] leading-relaxed">
                Scheduler automatically executed <strong>Biometric Attendance ETL</strong> in the background. Zero user disruption.
              </p>
            </div>
          </div>

          {/* Workflow Pipeline Line */}
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-around gap-2 text-xs font-mono text-center">
            <div className="text-slate-300">Biometric Campus RFID</div>
            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="text-purple-300 font-bold">Cron Scheduler Trigger</div>
            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="text-emerald-400 font-bold">Fact_Attendance (+60 records)</div>
          </div>
        </div>
      );

    // 3. Event Manager Visual Outcome
    case 'event':
      return (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Visual Outcome: Real-Time Incident Telemetry & Action Loop
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30">
              Alert Status: LOGGED & ACKNOWLEDGED
            </span>
          </div>

          {/* 4-Step Incident Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono text-center">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">1. Detection</span>
              <span className="font-bold text-rose-400">Incident Captured</span>
              <div className="text-[10px] text-slate-400">Timestamp: 23:30:12</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">2. Categorization</span>
              <span className="font-bold text-amber-400">Warning Alert</span>
              <div className="text-[10px] text-slate-400">Threshold Breached</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">3. Prescribed Action</span>
              <span className="font-bold text-blue-400">Mitigation Sent</span>
              <div className="text-[10px] text-slate-400">Quarantine Bad Rows</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">4. Resolution</span>
              <span className="font-bold text-emerald-400">Audit Saved</span>
              <div className="text-[10px] text-slate-400">Zero Silent Failures</div>
            </div>
          </div>
        </div>
      );

    // 4. Database Manager Visual Outcome
    case 'database':
      return (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Visual Outcome: Schema Catalog & RBAC Security Boundaries
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Access Matrix: ENFORCED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* SuperAdmin Role */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <div className="flex justify-between items-center text-emerald-400 font-bold">
                <span>Role: DB_ADMIN</span>
                <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">Admin</span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>SELECT: <strong className="text-emerald-400">ALLOWED ✅</strong></div>
                <div>INSERT: <strong className="text-emerald-400">ALLOWED ✅</strong></div>
                <div>UPDATE: <strong className="text-emerald-400">ALLOWED ✅</strong></div>
                <div>DELETE: <strong className="text-emerald-400">ALLOWED ✅</strong></div>
              </div>
            </div>

            {/* Guest Auditor Role */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-red-500/30 space-y-2">
              <div className="flex justify-between items-center text-rose-400 font-bold">
                <span>Role: GUEST_AUDITOR</span>
                <span className="text-[10px] bg-red-950 px-2 py-0.5 rounded border border-red-500/30">Restricted</span>
              </div>
              <div className="space-y-1 text-slate-300 text-[11px]">
                <div>SELECT: <strong className="text-slate-500">READ-ONLY 👁️</strong></div>
                <div>INSERT: <strong className="text-red-400">DENIED ❌</strong></div>
                <div>UPDATE: <strong className="text-red-400">DENIED ❌</strong></div>
                <div>DELETE: <strong className="text-red-400">DENIED ❌</strong></div>
              </div>
            </div>
          </div>
          <div className="text-[11px] font-mono text-slate-400 text-center">
            Sensitive student marks and attendance records are protected from unauthorized mutations.
          </div>
        </div>
      );

    // 5. Backup Recovery Manager Visual Outcome
    case 'backup':
      return (
        <div className="bg-slate-950 border border-teal-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-teal-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Visual Outcome: Catastrophic Crash & Point-in-Time Restoration
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Recovery: 100% SUCCESS
            </span>
          </div>

          {/* Visual Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs font-mono text-center">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">Step 1</span>
              <span className="font-bold text-teal-300">Snapshot Frozen</span>
              <div className="text-[10px] text-slate-400">142.5 MB Dump</div>
            </div>
            <div className="bg-red-950/60 p-3 rounded-xl border border-red-500/40 space-y-1">
              <span className="text-[10px] text-red-400 block">Step 2</span>
              <span className="font-bold text-red-300">Disk Failure ⚠️</span>
              <div className="text-[10px] text-red-400">Cluster Crashed</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-500 block">Step 3</span>
              <span className="font-bold text-blue-300">Point-in-Time Restore</span>
              <div className="text-[10px] text-slate-400">Catalog Mounted</div>
            </div>
            <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/40 space-y-1">
              <span className="text-[10px] text-emerald-400 block">Step 4</span>
              <span className="font-bold text-emerald-300">State Restored ✅</span>
              <div className="text-[10px] text-emerald-400">Health: NORMAL</div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between text-xs font-mono">
            <span className="text-slate-400">Recovery Point Objective (RPO): <strong className="text-emerald-400">0 Minutes Lost</strong></span>
            <span className="text-slate-400">Recovery Time (RTO): <strong className="text-teal-300">&lt; 2 Seconds</strong></span>
          </div>
        </div>
      );

    // 6. Load Manager (ETL) Visual Outcome
    case 'load':
      return (
        <div className="bg-slate-950 border border-blue-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                Visual Outcome: 3-Tier ETL Pipeline Execution
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Pipeline: EXTRACT &rarr; TRANSFORM &rarr; LOAD
            </span>
          </div>

          {/* 3 Step Visual Pipeline */}
          <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
            <div className="bg-slate-900 p-3 rounded-xl border border-blue-500/30 space-y-1">
              <span className="text-[10px] text-blue-400 uppercase block font-bold">1. Extract</span>
              <span className="text-base font-black text-white">7 Rows</span>
              <div className="text-[10px] text-slate-400">Raw Biometric CSV</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-indigo-500/30 space-y-1">
              <span className="text-[10px] text-indigo-400 uppercase block font-bold">2. Transform</span>
              <span className="text-base font-black text-amber-400">1 Rejected</span>
              <div className="text-[10px] text-slate-400">Duplicate Key Caught</div>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-emerald-400 uppercase block font-bold">3. Load</span>
              <span className="text-base font-black text-emerald-400">6 Clean Rows</span>
              <div className="text-[10px] text-slate-400">Fact_Attendance</div>
            </div>
          </div>

          {/* Clean vs Quarantined Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30 text-emerald-200">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Clean Facts Inserted:
              </div>
              <div className="text-[11px] text-slate-300">PSG21CS001, PSG21CS002, PSG21EC001... (100% Validated)</div>
            </div>
            <div className="bg-rose-950/40 p-3 rounded-xl border border-rose-500/30 text-rose-200">
              <div className="font-bold flex items-center gap-1.5 mb-1 text-rose-400">
                <XCircle className="w-3.5 h-3.5" /> Quarantined Error Row:
              </div>
              <div className="text-[11px] text-slate-300">Duplicate student_id "PSG21CS001" skipped to protect PK uniqueness.</div>
            </div>
          </div>
        </div>
      );

    // 7. Warehouse Manager Visual Outcome
    case 'warehouse':
      return (
        <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-400">
                Visual Outcome: Star Schema Topology & Partition Pruning
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              75% I/O Scan Reduction
            </span>
          </div>

          {/* Visual Star Schema */}
          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-center justify-center gap-4 text-xs font-mono flex-wrap">
            <div className="p-2.5 bg-blue-950 rounded-lg border border-blue-500/40 text-blue-300">
              Dim_Student
            </div>
            <div className="text-indigo-400">&larr;&rarr;</div>
            <div className="p-3.5 bg-indigo-900 rounded-xl border-2 border-indigo-400 font-bold text-white shadow-lg">
              Fact_Attendance (Central Fact)
            </div>
            <div className="text-indigo-400">&larr;&rarr;</div>
            <div className="p-2.5 bg-emerald-950 rounded-lg border border-emerald-500/40 text-emerald-300">
              Dim_Department
            </div>
          </div>

          {/* Partition Pruning Visual */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-500">
              2021-22 (Skipped ⏭️)
            </div>
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-500">
              2022-23 (Skipped ⏭️)
            </div>
            <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-slate-500">
              2023-24 (Skipped ⏭️)
            </div>
            <div className="p-2 bg-indigo-950 rounded-lg border border-indigo-400 text-indigo-200 font-bold">
              2024-25 (Scanned ✅)
            </div>
          </div>
        </div>
      );

    // 8. Query Manager Visual Outcome
    case 'query':
      return (
        <div className="bg-slate-950 border border-sky-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                Visual Outcome: Analytical Query Results (Fact_Placement)
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Executed in 14.2 ms
            </span>
          </div>

          {/* Visual Presentation Table */}
          <div className="overflow-x-auto border border-slate-800 rounded-xl font-mono text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-sky-400 border-b border-slate-800">
                  <th className="p-2.5">Department</th>
                  <th className="p-2.5">Offers Placed</th>
                  <th className="p-2.5">Avg Package (LPA)</th>
                  <th className="p-2.5">Highest Package (LPA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-200">
                <tr className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-blue-400">CSE</td>
                  <td className="p-2.5">11 Students</td>
                  <td className="p-2.5 text-emerald-400 font-bold">13.50 LPA</td>
                  <td className="p-2.5 text-amber-400 font-bold">24.00 LPA (AWS)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-indigo-400">ECE</td>
                  <td className="p-2.5">4 Students</td>
                  <td className="p-2.5 text-emerald-400 font-bold">11.88 LPA</td>
                  <td className="p-2.5 text-amber-400 font-bold">17.50 LPA (TI)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-purple-400">IT</td>
                  <td className="p-2.5">2 Students</td>
                  <td className="p-2.5 text-emerald-400 font-bold">16.50 LPA</td>
                  <td className="p-2.5 text-amber-400 font-bold">22.00 LPA (Goldman Sachs)</td>
                </tr>
                <tr className="hover:bg-slate-900/50">
                  <td className="p-2.5 font-bold text-teal-400">MECH</td>
                  <td className="p-2.5">1 Student</td>
                  <td className="p-2.5 text-emerald-400 font-bold">7.00 LPA</td>
                  <td className="p-2.5 text-amber-400 font-bold">7.00 LPA (L&T)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    // 9. Tuning Manager Visual Outcome
    case 'tuning':
      return (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                Visual Outcome: Before vs After Indexing Latency
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              🚀 4.0x Speedup (74.8% Faster)
            </span>
          </div>

          {/* Visual Latency Bars */}
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-400 text-[11px] mb-1">
                <span>Before Optimization: Full Table Scan (60 Blocks)</span>
                <span className="text-red-400 font-bold">48.5 ms</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-red-500 h-full w-[90%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 text-[11px] mb-1">
                <span className="text-emerald-400 font-bold">After Bitmap Index: Direct Tuple Lookup</span>
                <span className="text-emerald-400 font-bold">12.2 ms</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full w-[23%]"></div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 text-center">
            Optimizer switched access path from <strong>Full Table Scan</strong> to <strong>Bitmap Index Scan</strong>.
          </div>
        </div>
      );

    // 10. Testing Manager Visual Outcome
    case 'testing':
      return (
        <div className="bg-slate-950 border border-emerald-500/40 rounded-2xl p-5 space-y-4 animate-in fade-in zoom-in-95">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CheckCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                Visual Outcome: Automated Data Quality Audit Certificate
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Audit Status: 100% PASSED
            </span>
          </div>

          {/* 5-Test Visual Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs font-mono">
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 block">Test 1: Reconcile</span>
              <span className="text-emerald-300 font-bold">60 / 60</span>
              <div className="text-[10px] text-emerald-400">100% Matched ✅</div>
            </div>
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 block">Test 2: Uniqueness</span>
              <span className="text-emerald-300 font-bold">0 Dupes</span>
              <div className="text-[10px] text-emerald-400">PK Verified ✅</div>
            </div>
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 block">Test 3: Null Audit</span>
              <span className="text-emerald-300 font-bold">0 Nulls</span>
              <div className="text-[10px] text-emerald-400">Mandatory OK ✅</div>
            </div>
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 block">Test 4: Foreign Key</span>
              <span className="text-emerald-300 font-bold">0 Orphans</span>
              <div className="text-[10px] text-emerald-400">Integrity OK ✅</div>
            </div>
            <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-[10px] text-slate-400 block">Test 5: Domain Range</span>
              <span className="text-emerald-300 font-bold">CGPA 0-10</span>
              <div className="text-[10px] text-emerald-400">In Range ✅</div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 text-center font-bold">
            All 5 data quality assertions verified. Zero data anomalies present in the warehouse.
          </div>
        </div>
      );

    default:
      return null;
  }
};
