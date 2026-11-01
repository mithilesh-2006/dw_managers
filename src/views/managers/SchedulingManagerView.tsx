import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  CalendarClock,
  Play,
  Plus,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  Activity,
  Layers,
} from 'lucide-react';
import { JobType, JobFrequency } from '../../types';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const SchedulingManagerView: React.FC = () => {
  const { scheduledJobs, createJob, toggleJob, runJobManually, deleteJob, systemHealth } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>(scheduledJobs[0]?.id || '');
  const [isExecuting, setIsExecuting] = useState(false);

  // New Job Modal state
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState<JobType>('attendance_loading');
  const [frequency, setFrequency] = useState<JobFrequency>('Daily (Midnight)');
  const [time, setTime] = useState('23:00');

  const selectedJob = scheduledJobs.find((j) => j.id === selectedJobId) || scheduledJobs[0];

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createJob({
      name,
      type,
      frequency,
      time,
      enabled: true,
      nextRun: `Scheduled for ${time} (${frequency})`,
    });

    setName('');
    setIsCreating(false);
  };

  const handleRunNow = async (jobId: string) => {
    setIsExecuting(true);
    await runJobManually(jobId);
    setIsExecuting(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
            <span>System Management Module 2</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <CalendarClock className="w-7 h-7 text-purple-600" />
            System Scheduling Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Automates batch execution windows for ETL loads, materialized view refreshments, and periodic snapshots.
          </p>
        </div>
        <div className="flex items-center space-x-2 self-start md:self-center">
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule New Job</span>
          </button>
          <button
            onClick={() => setShowEduModal(true)}
            className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Syllabus Notes</span>
          </button>
        </div>
      </div>

      {/* Problem Scenario */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Manual Loading Delays & Peak-Hour Lock Contention</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            If college attendance or exam scores are uploaded manually during office hours, the massive table lock and CPU spike stalls interactive queries used by the Principal and HODs. The Scheduling Manager moves heavy ETL batches to midnight off-peak windows.
          </p>
        </div>
      </div>

      {/* Jobs Catalog & Live Log Inspection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Job List Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-600" />
              Registered Batch Jobs ({scheduledJobs.length})
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">Click a job to inspect live execution stream</span>
          </div>

          <div className="divide-y divide-slate-100">
            {scheduledJobs.map((job) => {
              const isSelected = selectedJob?.id === job.id;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-4 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    isSelected ? 'bg-purple-50/60 border-l-4 border-purple-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{job.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          job.status === 'RUNNING'
                            ? 'bg-blue-100 text-blue-800 animate-pulse'
                            : job.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : job.status === 'FAILED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {job.status}
                      </span>
                    </div>
                    <div className="text-slate-500 flex flex-wrap items-center gap-3 text-[11px]">
                      <span>ID: <strong className="font-mono text-slate-700">{job.id}</strong></span>
                      <span>•</span>
                      <span>Freq: <strong>{job.frequency}</strong></span>
                      <span>•</span>
                      <span>Time: <strong>{job.time}</strong></span>
                      <span>•</span>
                      <span>Runs: <strong>{job.executionCount}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Toggle Enable/Disable */}
                    <button
                      onClick={() => toggleJob(job.id)}
                      className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
                        job.enabled
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                      title={job.enabled ? 'Click to Disable Job' : 'Click to Enable Job'}
                    >
                      {job.enabled ? (
                        <>
                          <ToggleRight className="w-4 h-4 text-emerald-600" />
                          <span>Enabled</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4 text-slate-400" />
                          <span>Disabled</span>
                        </>
                      )}
                    </button>

                    {/* Manual Run Now */}
                    <button
                      onClick={() => handleRunNow(job.id)}
                      disabled={isExecuting || !job.enabled}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition flex items-center space-x-1 shadow-xs"
                      title="Trigger immediate execution"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Run Now</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete job"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Selected Job Telemetry & Execution Log Stream */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Selected Job Telemetry</span>
              <h2 className="text-base font-bold text-slate-900 mt-0.5">{selectedJob?.name}</h2>
              <div className="text-xs text-slate-500 mt-1">Type: <span className="font-mono text-purple-700 font-semibold">{selectedJob?.type}</span></div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 text-[10px] block font-bold uppercase">Last Run</span>
                <span className="font-semibold text-slate-800">{selectedJob?.lastRun || 'Never'}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-400 text-[10px] block font-bold uppercase">Next Run</span>
                <span className="font-semibold text-slate-800">{selectedJob?.nextRun}</span>
              </div>
            </div>

            {/* Live Terminal Log Viewer */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  Execution Logs & Output
                </span>
                <span className="text-[10px] text-slate-400 font-mono">STDOUT</span>
              </div>
              <div className="bg-slate-950 text-slate-200 rounded-xl p-3.5 font-mono text-[11px] h-60 overflow-y-auto space-y-1.5 border border-slate-800">
                {selectedJob?.logs.map((line, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-purple-400">{line.slice(0, 10)}</span>
                    <span className="text-slate-300">{line.slice(10)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 text-xs text-purple-950">
            <strong>Cross-Manager Link:</strong> Clicking "Run Now" on an attendance job directly executes the Load Manager ETL pipeline and logs events in the Event Manager.
          </div>
        </div>
      </div>

      {/* Schedule Job Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900">Schedule New Warehouse Batch Job</h3>
            <form onSubmit={handleCreateJob} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Daily Placement Portal Sync"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Module Operation</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as JobType)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
                >
                  <option value="attendance_loading">Biometric Attendance Loading (Fact_Attendance)</option>
                  <option value="exam_loading">Semester Marks Result Loading (Fact_Examination)</option>
                  <option value="placement_loading">Campus Placement Data Loading (Fact_Placement)</option>
                  <option value="backup">System Snapshot Backup (Backup Manager)</option>
                  <option value="report_generation">Accreditation Summary Generation (NAAC / NBA)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as JobFrequency)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-900"
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Daily (Midnight)">Daily (Midnight)</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Manual">Manual On-Demand</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Execution Window (Time)</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-md"
                >
                  Register Scheduled Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <EduInfoModal managerId="scheduling" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
