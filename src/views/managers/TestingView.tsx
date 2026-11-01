import React, { useState, useEffect } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  CheckCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  HelpCircle,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const TestingView: React.FC = () => {
  const {
    students,
    testResults,
    runDataQualityTests,
    fixDuplicateStudents,
    injectQualityAnomalies,
  } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);

  useEffect(() => {
    if (testResults.length === 0) {
      runDataQualityTests();
    }
  }, []);

  const failedCount = testResults.filter((t) => t.status === 'FAIL').length;
  const passedCount = testResults.filter((t) => t.status === 'PASS').length;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Manager 10 of 10 • Process Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <CheckCheck className="w-5 h-5 text-emerald-600" />
            Testing Manager (Data Quality & Reconciliation)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Reconciles source vs target row counts, verifies primary key uniqueness, and catches invalid range values.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
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
            If the source college ERP contains 60 students but only 52 make it into the warehouse due to an ETL error, the Principal will see incomplete reports. The Testing Manager validates that 100% of source records are present, checks for duplicate IDs, and prevents illegal numbers like CGPA 14.5.
          </span>
        </div>
      </div>

      {/* Interactive Simulation Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900">
          Interactive Simulation: Inject & Fix Data Discrepancies
        </h2>
        <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
          <button
            onClick={injectQualityAnomalies}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl font-bold transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>1. Inject Test Discrepancies (Dupe & Invalid CGPA)</span>
          </button>

          <button
            onClick={() => runDataQualityTests()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>2. Run 5-Test Audit Suite</span>
          </button>

          <button
            onClick={fixDuplicateStudents}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl font-bold transition flex items-center gap-1.5"
          >
            <Wrench className="w-4 h-4 text-emerald-600" />
            <span>3. Auto-Remediate Discrepancies</span>
          </button>
        </div>
      </div>

      {/* Test Results Scorecard */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Passed Tests</span>
            <span className="text-lg font-black text-emerald-900">{passedCount} of {testResults.length}</span>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>

        <div className={`p-3.5 rounded-xl border flex items-center justify-between text-xs ${
          failedCount > 0 ? 'bg-rose-50 border-rose-200 text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}>
          <div>
            <span className="text-[10px] uppercase font-bold block">Failed Discrepancies</span>
            <span className="text-lg font-black">{failedCount} Failures</span>
          </div>
          <XCircle className={`w-5 h-5 ${failedCount > 0 ? 'text-rose-600' : 'text-slate-400'}`} />
        </div>
      </div>

      {/* 5 Test Cases List */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Automated Data Quality Audit Cases
        </h3>

        <div className="divide-y divide-slate-100 text-xs">
          {testResults.map((t) => (
            <div key={t.id} className="py-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{t.name}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    t.status === 'PASS'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-red-100 text-red-800 animate-pulse'
                  }`}
                >
                  {t.status}
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">{t.description}</p>
              <div className="text-[11px] font-mono text-slate-600 bg-slate-50 p-2 rounded-lg flex items-center justify-between">
                <span>Expected: <strong>{t.expected}</strong></span>
                <span>Actual: <strong className={t.status === 'FAIL' ? 'text-red-600' : 'text-emerald-600'}>{t.actual}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EduInfoModal managerId="testing" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
