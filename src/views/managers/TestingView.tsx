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
  FileText,
  ShieldCheck,
  Download,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { DataQualityTest } from '../../types';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const TestingView: React.FC = () => {
  const {
    students,
    departments,
    attendance,
    exams,
    placements,
    testResults,
    runDataQualityTests,
    fixDuplicateStudents,
    injectQualityAnomalies,
  } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  useEffect(() => {
    if (testResults.length === 0) {
      runDataQualityTests();
    }
  }, []);

  const handleRunTests = () => {
    runDataQualityTests();
  };

  const selectedTest = testResults.find((t) => t.id === selectedTestId) || testResults[0];
  const passedCount = testResults.filter((t) => t.status === 'PASS').length;
  const failedCount = testResults.filter((t) => t.status === 'FAIL').length;

  const handleExportTestReport = () => {
    const report = {
      title: 'PSG iTech College Data Warehouse - Data Quality Audit Report',
      timestamp: new Date().toLocaleString(),
      totalTests: testResults.length,
      passed: passedCount,
      failed: failedCount,
      overallStatus: failedCount === 0 ? 'COMPLIANT (100% QUALITY PASSED)' : 'NON-COMPLIANT (DISCREPANCIES DETECTED)',
      tests: testResults,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `DW_Quality_Report_${Date.now()}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <span>Process Management Module 10</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <CheckCheck className="w-7 h-7 text-emerald-600" />
            Testing Manager (Data Quality & Verification)
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Executes source-to-target reconciliation, detects missing or duplicate primary keys, verifies foreign key referential integrity, and enforces domain constraints.
          </p>
        </div>
        <div className="flex items-center space-x-2 self-start md:self-center">
          <button
            onClick={handleExportTestReport}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
          <button
            onClick={() => setShowEduModal(true)}
            className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
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
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Source-to-Target Record Count Discrepancy & Bad Data Infiltration</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            The college ERP contains 60 active student records, but an unvalidated ETL pipeline loaded only 52 into Dim_Student due to unhandled exceptions. Without automated reconciliation testing, dean analytics miss students entirely. The Testing Manager audits warehouse tables against source integrity rules.
          </p>
        </div>
      </div>

      {/* Classroom Demonstration Anomaly Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <span className="p-1.5 bg-indigo-100 text-indigo-700 rounded-lg">⚡ Demonstration Controls:</span>
          <span>Inject or resolve data discrepancies to observe automated test suite reactions:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={injectQualityAnomalies}
            className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg font-bold transition flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Inject Duplicate & Out-of-Range Anomalies</span>
          </button>
          <button
            onClick={fixDuplicateStudents}
            className="px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg font-bold transition flex items-center gap-1"
          >
            <Wrench className="w-3.5 h-3.5 text-emerald-600" />
            <span>Auto-Remediate Duplicates</span>
          </button>
          <button
            onClick={handleRunTests}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-xs transition flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Test Suite</span>
          </button>
        </div>
      </div>

      {/* Test Suite Scorecard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Test Cases</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{testResults.length} Tests</div>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <CheckCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Passed Tests</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">{passedCount} Passed</div>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Failed Discrepancies</span>
            <div className={`text-2xl font-black mt-1 ${failedCount > 0 ? 'text-red-600' : 'text-slate-400'}`}>
              {failedCount} Discrepancies
            </div>
          </div>
          <div className={`p-3 rounded-xl ${failedCount > 0 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-400'}`}>
            <XCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Grid: Test Cases List & Discrepancy Record Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Test Cases List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Automated Data Warehouse Test Cases
            </h3>
            <span className="text-xs text-slate-400 font-mono">Real-Time Inspection</span>
          </div>

          <div className="divide-y divide-slate-100">
            {testResults.map((test) => {
              const isSelected = selectedTest?.id === test.id;
              return (
                <div
                  key={test.id}
                  onClick={() => setSelectedTestId(test.id)}
                  className={`p-4 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                    isSelected ? 'bg-emerald-50/50 border-l-4 border-emerald-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{test.name}</span>
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                          test.status === 'PASS'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800 animate-pulse'
                        }`}
                      >
                        {test.status}
                      </span>
                    </div>
                    <div className="text-slate-500 text-[11px] flex flex-wrap items-center gap-2">
                      <span>Category: <strong className="text-slate-700">{test.category}</strong></span>
                      <span>•</span>
                      <span>Expected: <strong className="font-mono text-slate-700">{test.expected}</strong></span>
                      <span>•</span>
                      <span>Actual: <strong className="font-mono text-slate-700">{test.actual}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    {test.failingCount > 0 ? (
                      <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                        {test.failingCount} Faulty Rows
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Deep Inspection of Selected Test Failure Records */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Test Execution Details</span>
            <h4 className="text-sm font-bold text-slate-900 mt-1">{selectedTest?.name}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{selectedTest?.description}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Verification Benchmark</span>
              <div className="font-mono text-slate-700">Expected: {selectedTest?.expected}</div>
              <div className="font-mono font-bold text-slate-900">Actual: {selectedTest?.actual}</div>
            </div>

            {selectedTest?.status === 'FAIL' ? (
              <div className="space-y-2">
                <span className="text-xs font-bold text-red-700 block flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                  Identified Failing Discrepancy Rows:
                </span>
                <div className="bg-slate-950 text-red-300 p-3 rounded-xl font-mono text-[11px] max-h-48 overflow-y-auto space-y-1">
                  {selectedTest.failingRecords.map((rec, rIdx) => (
                    <div key={rIdx} className="border-b border-slate-800 pb-1 last:border-0">
                      {JSON.stringify(rec, null, 1)}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Integrity condition satisfied. Zero invalid rows found in active warehouse state.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <EduInfoModal managerId="testing" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
