import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  CalendarClock,
  Play,
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const SchedulingManagerView: React.FC = () => {
  const { scheduledJobs, toggleJob, runJobManually } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);
  const [runningJobId, setRunningJobId] = useState<string | null>(null);
  const [lastExecutedLog, setLastExecutedLog] = useState<string | null>(null);

  const handleRunNow = async (jobId: string, jobName: string) => {
    setRunningJobId(jobId);
    const ok = await runJobManually(jobId);
    setRunningJobId(null);
    if (ok) {
      setLastExecutedLog(`Job "${jobName}" executed successfully. Shared warehouse updated.`);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-purple-600">
            Manager 2 of 10 • System Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-purple-600" />
            System Scheduling Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automates the execution of heavy ETL loads and backups during off-peak midnight hours.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Syllabus Notes</span>
        </button>
      </div>

      {/* The Problem in Plain English */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900 font-bold block">The Problem it Solves:</strong>
          <span>
            If the college staff manually updates 5,000 student attendance records during working hours, the database locks up, and the Principal cannot view reports. The Scheduling Manager moves heavy jobs to 23:30 midnight so daytime queries run at full speed.
          </span>
        </div>
      </div>

      {lastExecutedLog && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{lastExecutedLog}</span>
        </div>
      )}

      {/* Scheduled Jobs Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600" />
            Registered Batch Jobs
          </h2>
          <span className="text-xs text-slate-400 font-medium">Click "Run Job Now" to simulate execution</span>
        </div>

        <div className="divide-y divide-slate-100">
          {scheduledJobs.map((job) => (
            <div
              key={job.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{job.name}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      job.enabled ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {job.enabled ? 'Scheduled' : 'Disabled'}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] flex flex-wrap items-center gap-2">
                  <span>Frequency: <strong>{job.frequency} at {job.time}</strong></span>
                  <span>•</span>
                  <span>Last Run: <strong>{job.lastRun || 'Pending'}</strong></span>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => toggleJob(job.id)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium transition flex items-center gap-1"
                >
                  {job.enabled ? (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-600" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <ToggleLeft className="w-4 h-4 text-slate-400" />
                      <span>Paused</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleRunNow(job.id, job.name)}
                  disabled={runningJobId === job.id || !job.enabled}
                  className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1 shadow-xs"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{runningJobId === job.id ? 'Running...' : 'Run Job Now'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it connects to other managers */}
      <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl text-xs text-purple-950 space-y-1">
        <strong className="block font-bold">How it connects to other managers:</strong>
        <p className="leading-relaxed">
          When you click "Run Job Now" on the attendance job, the <strong>Scheduling Manager</strong> hands the task to the <strong>Load Manager</strong> to perform the actual data extraction and loading, while the <strong>Event Manager</strong> logs the completion status.
        </p>
      </div>

      <EduInfoModal managerId="scheduling" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
