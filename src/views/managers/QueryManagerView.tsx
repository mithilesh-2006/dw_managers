import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  History,
  Layers,
  FileText,
  Clock,
  Sparkles,
  Download,
  Copy,
} from 'lucide-react';
import { QueryExecutionResult } from '../../services/sqlEngine';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const QueryManagerView: React.FC = () => {
  const { executeQuery, queryHistory, currentUser, systemHealth } = useSimulation();

  const [sqlText, setSqlText] = useState(
    'SELECT department_id, COUNT(*) as total_offers, ROUND(AVG(package_lpa), 2) as avg_package_lpa, MAX(package_lpa) as highest_package_lpa FROM Fact_Placement GROUP BY department_id ORDER BY avg_package_lpa DESC'
  );

  const [lastResult, setLastResult] = useState<QueryExecutionResult | null>(null);
  const [showEduModal, setShowEduModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Predefined educational sample queries
  const sampleQueries = [
    {
      label: '1. Department-wise Placement Analytics',
      desc: 'Calculate total offers, average package, and dream offer per branch',
      sql: 'SELECT department_id, COUNT(*) as total_offers, ROUND(AVG(package_lpa), 2) as avg_package_lpa, MAX(package_lpa) as highest_package_lpa FROM Fact_Placement GROUP BY department_id ORDER BY avg_package_lpa DESC',
    },
    {
      label: '2. Low Attendance Warning (< 75%)',
      desc: 'Detect students ineligible for Anna University semester exams',
      sql: 'SELECT student_id, student_name, department_id, percentage, status FROM Fact_Attendance WHERE percentage < 75 ORDER BY percentage ASC',
    },
    {
      label: '3. Top 10 Merit Rankers by CGPA',
      desc: 'Find college toppers across all 5 engineering branches',
      sql: 'SELECT student_id, name, department_id, cgpa, placement_status FROM Dim_Student ORDER BY cgpa DESC LIMIT 10',
    },
    {
      label: '4. Department-wise Average CGPA',
      desc: 'Evaluate academic performance across CSE, ECE, EEE, IT, MECH',
      sql: 'SELECT department_id, COUNT(*) as total_students, ROUND(AVG(cgpa), 2) as avg_cgpa, MAX(cgpa) as max_cgpa FROM Dim_Student GROUP BY department_id ORDER BY avg_cgpa DESC',
    },
    {
      label: '5. Cross-Table Fact Join (Exam Marks & Placement Status)',
      desc: 'Join Fact_Examination with Dim_Student to evaluate placement correlation',
      sql: 'SELECT s.student_id, s.name, s.department_id, s.cgpa, e.subject_code, e.total_marks, e.grade, s.placement_status FROM Dim_Student s JOIN Fact_Examination e ON s.student_id = e.student_id WHERE s.cgpa > 8.5 ORDER BY s.cgpa DESC',
    },
  ];

  const handleRun = () => {
    const res = executeQuery(sqlText);
    setLastResult(res);
  };

  const handleCopyResults = () => {
    if (!lastResult || !lastResult.rows.length) return;
    navigator.clipboard.writeText(JSON.stringify(lastResult.rows, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <span>Process Management Module 8</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Terminal className="w-7 h-7 text-blue-600" />
            Query Manager (SQL & OLAP Execution Engine)
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Parses, validates, executes relational and multi-dimensional SQL queries against in-memory warehouse tables using AlaSQL engine.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start md:self-center"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Syllabus Notes & Quiz</span>
        </button>
      </div>

      {/* Problem Scenario */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Executive Information Retrieval & Ad-hoc Analytics</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            The college Principal needs department-wise placement statistics and low-attendance students for an urgent NAAC meeting. Manually scanning spreadsheets takes days. The Query Manager processes SQL queries over thousands of records, generating instant consolidated reports.
          </p>
        </div>
      </div>

      {/* Query Console & Predefined Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: SQL Editor */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span className="text-xs font-mono font-bold text-slate-600 ml-2">SQL Console Editor</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Session: <strong className="text-slate-700">{currentUser.username}</strong> ({currentUser.role})
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              rows={6}
              value={sqlText}
              onChange={(e) => setSqlText(e.target.value)}
              className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600 leading-relaxed selection:bg-blue-600 selection:text-white"
              placeholder="SELECT ... FROM Dim_Student ..."
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Tables available: <strong className="text-slate-600">Dim_Student, Dim_Department, Fact_Attendance, Fact_Examination, Fact_Placement</strong>
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSqlText('SELECT * FROM Dim_Student LIMIT 10')}
                className="px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold transition"
              >
                Clear / Sample
              </button>
              <button
                onClick={handleRun}
                className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Execute Query</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Preset Educational Queries */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Syllabus Example Queries
            </h2>
            <span className="text-[10px] font-mono text-slate-400">Click to Load</span>
          </div>

          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSqlText(q.sql);
                  const res = executeQuery(q.sql);
                  setLastResult(res);
                }}
                className="w-full text-left p-2.5 rounded-xl border border-slate-100 hover:border-blue-400 hover:bg-blue-50/50 transition text-xs space-y-1 group"
              >
                <div className="font-bold text-slate-800 group-hover:text-blue-700">{q.label}</div>
                <div className="text-[11px] text-slate-400 leading-snug">{q.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Query Execution Result & Plan */}
      {lastResult && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden space-y-0 animate-in fade-in">
          {/* Result Status Header */}
          <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div className="flex items-center gap-3">
              {lastResult.success ? (
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>SUCCESSFUL EXECUTION</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-700 font-bold text-xs bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>EXECUTION FAILED</span>
                </div>
              )}
              <div className="text-xs text-slate-500 flex items-center gap-3 font-mono">
                <span>Rows: <strong className="text-slate-800">{lastResult.rowCount}</strong></span>
                <span>•</span>
                <span>Time: <strong className="text-blue-600">{lastResult.executionTimeMs} ms</strong></span>
                {lastResult.indexUsed && (
                  <>
                    <span>•</span>
                    <span className="text-purple-600 font-semibold">Indexed: [{lastResult.indexUsed}]</span>
                  </>
                )}
              </div>
            </div>

            {lastResult.success && lastResult.rowCount > 0 && (
              <button
                onClick={handleCopyResults}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied JSON!' : 'Copy Results'}</span>
              </button>
            )}
          </div>

          {/* Error Banner */}
          {lastResult.error && (
            <div className="p-4 bg-rose-50 border-b border-rose-100 text-xs text-rose-950 font-mono">
              <strong>Error:</strong> {lastResult.error}
            </div>
          )}

          {/* Execution Plan View */}
          <div className="p-4 bg-slate-900 text-slate-200 border-b border-slate-800 text-xs font-mono space-y-1">
            <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider mb-1">
              Query Optimizer Simulated Execution Plan:
            </div>
            {lastResult.plan.map((step, idx) => (
              <div key={idx} className="text-slate-300">
                {step}
              </div>
            ))}
          </div>

          {/* Data Table */}
          {lastResult.success && (
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono font-semibold sticky top-0">
                    {lastResult.columns.map((col) => (
                      <th key={col} className="py-2.5 px-3 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {lastResult.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 font-mono text-[11px]">
                      {lastResult.columns.map((col) => (
                        <td key={col} className="py-2.5 px-3 whitespace-nowrap">
                          {typeof row[col] === 'number'
                            ? Number.isInteger(row[col])
                              ? row[col]
                              : row[col].toFixed(2)
                            : String(row[col] ?? 'NULL')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Query Execution History */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <History className="w-4 h-4 text-slate-500" />
          Recent Query Execution Telemetry
        </h3>
        <div className="divide-y divide-slate-100 text-xs">
          {queryHistory.slice(0, 5).map((item) => (
            <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-lg">
              <div className="truncate font-mono text-slate-700">{item.sql}</div>
              <div className="flex items-center gap-3 shrink-0 font-mono text-slate-400">
                <span className="text-slate-600">{item.rowCount} rows</span>
                <span className="text-blue-600 font-semibold">{item.executionTimeMs} ms</span>
                <span>{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EduInfoModal managerId="query" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
