import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Zap,
  TrendingDown,
  HelpCircle,
  AlertTriangle,
  Play,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const TuningView: React.FC = () => {
  const { indexes, createIndex, removeIndex } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);
  const [benchmarkStatus, setBenchmarkStatus] = useState<'idle' | 'unindexed' | 'indexed'>('idle');

  const hasIndex = indexes.some((i) => i.columnName === 'department_id');

  const handleRunUnindexed = () => {
    // If index exists, remove it temporarily to show full scan
    const found = indexes.find((i) => i.columnName === 'department_id');
    if (found) removeIndex(found.id);
    setBenchmarkStatus('unindexed');
  };

  const handleAddIndexAndRun = () => {
    createIndex('Dim_Student', 'department_id', 'Bitmap');
    setBenchmarkStatus('indexed');
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Manager 9 of 10 • Process Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Tuning Manager (Performance Optimization)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Builds B-Tree and Bitmap indexes to convert slow sequential Full Table Scans into fast sub-second Index Scans.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
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
            Without an index, the database engine must physically read every single disk block from beginning to end (Full Table Scan) to find matching student rows. The Tuning Manager creates specialized indexes (such as Bitmap Indexes for department_id) that allow the engine to jump directly to matching rows, cutting query latency by over 70%.
          </span>
        </div>
      </div>

      {/* Interactive Simulation: Before vs After Benchmark */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Interactive Simulation: Before & After Optimization Benchmark
        </h2>

        <div className="bg-slate-950 text-slate-200 p-3 rounded-xl font-mono text-xs">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Test Query:</span>
          <span className="text-emerald-400">SELECT * FROM Dim_Student WHERE department_id = 'CSE'</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleRunUnindexed}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              benchmarkStatus === 'unindexed'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>1. Run Without Index (Slow Full Scan)</span>
          </button>

          <button
            onClick={handleAddIndexAndRun}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              benchmarkStatus === 'indexed'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>2. Build Bitmap Index & Re-Run (Fast)</span>
          </button>
        </div>

        {/* Visual Benchmark Comparison */}
        {benchmarkStatus !== 'idle' && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs animate-in fade-in">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Performance Comparison:</span>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full text-[11px]">
                {benchmarkStatus === 'indexed' ? '🚀 74.8% Latency Reduction' : '⚠️ Unoptimized Baseline'}
              </span>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                  <span>Without Index (Full Table Scan)</span>
                  <span className="font-mono text-red-600 font-bold">48.5 ms</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[95%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                  <span>With Bitmap Index (Index Scan)</span>
                  <span className="font-mono text-emerald-600 font-bold">12.2 ms (~4.0x faster)</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-500 ${benchmarkStatus === 'indexed' ? 'bg-emerald-500 w-[24%]' : 'bg-slate-300 w-[0%]'}`}></div>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 font-mono bg-white p-2.5 rounded-lg border border-slate-200">
              <strong>Query Execution Plan: </strong>
              {benchmarkStatus === 'indexed'
                ? 'INDEX SCAN using [idx_student_dept] on Dim_Student.department_id (Bitmap Structure)'
                : 'FULL TABLE SCAN across all physical blocks'}
            </div>
          </div>
        )}
      </div>

      <EduInfoModal managerId="tuning" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
