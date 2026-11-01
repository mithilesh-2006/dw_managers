import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Terminal,
  Play,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { QueryExecutionResult } from '../../services/sqlEngine';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const QueryManagerView: React.FC = () => {
  const { executeQuery } = useSimulation();

  const [sqlText, setSqlText] = useState(
    'SELECT department_id, COUNT(*) as placed_students, ROUND(AVG(package_lpa), 2) as avg_package_lpa, MAX(package_lpa) as highest_lpa FROM Fact_Placement GROUP BY department_id ORDER BY avg_package_lpa DESC'
  );

  const [queryResult, setQueryResult] = useState<QueryExecutionResult | null>(null);
  const [showEduModal, setShowEduModal] = useState(false);

  const sampleQueries = [
    {
      label: 'Department Placements',
      sql: 'SELECT department_id, COUNT(*) as placed_students, ROUND(AVG(package_lpa), 2) as avg_package_lpa, MAX(package_lpa) as highest_lpa FROM Fact_Placement GROUP BY department_id ORDER BY avg_package_lpa DESC',
    },
    {
      label: 'Attendance < 75% Alert',
      sql: 'SELECT student_id, student_name, department_id, percentage, status FROM Fact_Attendance WHERE percentage < 75 ORDER BY percentage ASC',
    },
    {
      label: 'Top 10 CGPA Students',
      sql: 'SELECT student_id, name, department_id, cgpa, placement_status FROM Dim_Student ORDER BY cgpa DESC LIMIT 10',
    },
  ];

  const handleRun = () => {
    const res = executeQuery(sqlText);
    setQueryResult(res);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-sky-600">
            Manager 8 of 10 • Process Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-sky-600" />
            Query Manager (SQL & OLAP Engine)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Accepts, parses, and executes analytical SQL queries against the in-memory college warehouse tables.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
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
            The college Principal needs department-wise placement statistics and lists of low-attendance students across thousands of student records. Manually reviewing spreadsheets takes days. The Query Manager parses standard SQL queries and returns aggregated analytical results in milliseconds.
          </span>
        </div>
      </div>

      {/* Interactive SQL Console */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Quick Sample Buttons */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            One-Click Sample Seminar Queries:
          </span>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSqlText(q.sql);
                  const res = executeQuery(q.sql);
                  setQueryResult(res);
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-sky-50 hover:border-sky-300 text-slate-700 hover:text-sky-900 border border-slate-200 rounded-lg text-xs font-semibold transition"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700">SQL Statement:</label>
          <textarea
            rows={4}
            value={sqlText}
            onChange={(e) => setSqlText(e.target.value)}
            className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-3.5 rounded-xl border border-slate-800 focus:outline-hidden focus:ring-1 focus:ring-sky-500 leading-relaxed"
          />
        </div>

        {/* Run Button */}
        <div className="flex justify-between items-center pt-1">
          <span className="text-[11px] text-slate-400 font-mono">
            Tables: Dim_Student, Fact_Attendance, Fact_Placement, Fact_Examination
          </span>
          <button
            onClick={handleRun}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute SQL Query</span>
          </button>
        </div>
      </div>

      {/* Results View */}
      {queryResult && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 animate-in fade-in text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-bold text-slate-900">Query Output ({queryResult.rowCount} Rows Returned)</span>
            </div>
            <div className="font-mono text-slate-500 text-[11px]">
              Execution Time: <strong className="text-sky-600">{queryResult.executionTimeMs} ms</strong>
            </div>
          </div>

          {queryResult.error ? (
            <div className="p-3 bg-red-50 border border-red-200 text-red-900 rounded-xl font-mono text-xs">
              <strong>Error:</strong> {queryResult.error}
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-72 overflow-y-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold sticky top-0">
                    {queryResult.columns.map((col) => (
                      <th key={col} className="p-2.5 whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {queryResult.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50">
                      {queryResult.columns.map((col) => (
                        <td key={col} className="p-2.5 whitespace-nowrap">
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

      <EduInfoModal managerId="query" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
