import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  HardDriveDownload,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Database,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const LoadManagerView: React.FC = () => {
  const { runETL, attendance, students } = useSimulation();

  const [selectedFeed, setSelectedFeed] = useState<'attendance_batch_dirty' | 'attendance_batch_valid'>('attendance_batch_dirty');
  const [etlResult, setEtlResult] = useState<{ processed: number; loaded: number; rejected: number; errors: string[] } | null>(null);
  const [showEduModal, setShowEduModal] = useState(false);

  const handleRunETL = () => {
    const res = runETL(selectedFeed);
    setEtlResult(res);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Manager 6 of 10 • Process Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <HardDriveDownload className="w-5 h-5 text-blue-600" />
            Load Manager (ETL Pipeline Engine)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Extracts raw operational feeds, cleanses duplicates and malformed records, and loads pristine facts into the warehouse.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
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
            Raw records from different departments contain duplicate biometric scans, missing student IDs, and lowercase names ("cse" vs "CSE"). If loaded directly into the warehouse, management reports become corrupted. The Load Manager's ETL pipeline (Extract &rarr; Transform &rarr; Load) filters out errors before inserting into Fact_Attendance.
          </span>
        </div>
      </div>

      {/* Visual Pipeline Bar */}
      <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
        <div className="p-3 bg-blue-50 text-blue-900 rounded-xl border border-blue-200">
          <div className="text-[10px] text-blue-600 uppercase font-mono">Stage 1</div>
          <div>EXTRACT (CSV Feed)</div>
        </div>
        <div className="p-3 bg-indigo-50 text-indigo-900 rounded-xl border border-indigo-200">
          <div className="text-[10px] text-indigo-600 uppercase font-mono">Stage 2</div>
          <div>TRANSFORM (Clean & Dedupe)</div>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
          <div className="text-[10px] text-emerald-600 uppercase font-mono">Stage 3</div>
          <div>LOAD (Fact_Attendance)</div>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Interactive Simulation: Run ETL Pipeline
        </h2>

        <div className="space-y-2 text-xs">
          <label className="block font-semibold text-slate-700">Select Input Dataset:</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                setSelectedFeed('attendance_batch_dirty');
                setEtlResult(null);
              }}
              className={`p-3 rounded-xl border text-left transition space-y-1 ${
                selectedFeed === 'attendance_batch_dirty'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-950 font-bold'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="font-semibold">⚠️ Dirty Batch (Contains 1 Dupe & 1 Invalid FK)</div>
              <div className="text-[11px] text-slate-500 font-normal">
                Tests how the ETL engine detects duplicate IDs and rejects unmapped records.
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedFeed('attendance_batch_valid');
                setEtlResult(null);
              }}
              className={`p-3 rounded-xl border text-left transition space-y-1 ${
                selectedFeed === 'attendance_batch_valid'
                  ? 'border-blue-600 bg-blue-50/60 text-blue-950 font-bold'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="font-semibold">✅ Clean Batch (7 Valid Records)</div>
              <div className="text-[11px] text-slate-500 font-normal">
                Standard biometric scan batch with 100% valid student records.
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={handleRunETL}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>Run Extract &rarr; Transform &rarr; Load Pipeline</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Results Box */}
      {etlResult && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4 animate-in fade-in text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-900 text-sm">ETL Execution Summary:</span>
            <span className="font-mono text-slate-500">Target: Fact_Attendance</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-[10px] uppercase font-bold text-blue-700 block">Total Read</span>
              <span className="text-lg font-black text-blue-900">{etlResult.processed}</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Clean Loaded</span>
              <span className="text-lg font-black text-emerald-900">{etlResult.loaded}</span>
            </div>
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-[10px] uppercase font-bold text-rose-700 block">Rejected / Quarantined</span>
              <span className="text-lg font-black text-rose-900">{etlResult.rejected}</span>
            </div>
          </div>

          {etlResult.errors.length > 0 ? (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1 font-mono text-[11px] text-rose-900">
              <strong className="block text-rose-950">Detected & Rejected Bad Records:</strong>
              {etlResult.errors.map((err, i) => (
                <div key={i}>&bull; {err}</div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All records were valid and loaded directly into Fact_Attendance!</span>
            </div>
          )}

          <div className="text-[11px] text-slate-500 font-mono text-right">
            Fact_Attendance now holds <strong>{attendance.length} total rows</strong>.
          </div>
        </div>
      )}

      <EduInfoModal managerId="load" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
