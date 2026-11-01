import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Zap,
  Plus,
  Trash2,
  TrendingDown,
  Gauge,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Layers,
  ArrowRight,
  Database,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const TuningView: React.FC = () => {
  const { indexes, createIndex, removeIndex } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState('Dim_Student');
  const [selectedCol, setSelectedCol] = useState('department_id');
  const [indexType, setIndexType] = useState<'B-Tree' | 'Bitmap'>('Bitmap');

  // Benchmark query selection for comparison
  const [activeBenchmarkQuery, setActiveBenchmarkQuery] = useState<'dept_filter' | 'cgpa_range' | 'attendance_join'>('dept_filter');

  const benchmarkPresets = {
    dept_filter: {
      name: 'Department Filter OLAP Query',
      sql: "SELECT * FROM Dim_Student WHERE department_id = 'CSE'",
      column: 'department_id',
      unindexedMs: 48.5,
      indexedMs: 12.2,
      reductionPct: '74.8%',
      planUnindexed: 'FULL TABLE SCAN: Scanning all 60 physical student records from block 0x00 to 0x3F.',
      planIndexed: 'BITMAP INDEX SCAN: [idx_student_dept] matched 15 bits. Direct tuple pointer retrieval.',
    },
    cgpa_range: {
      name: 'CGPA Range Filter (> 8.5) & Order',
      sql: 'SELECT student_id, name, cgpa FROM Dim_Student WHERE cgpa >= 8.5 ORDER BY cgpa DESC',
      column: 'cgpa',
      unindexedMs: 62.0,
      indexedMs: 14.8,
      reductionPct: '76.1%',
      planUnindexed: 'FULL TABLE SCAN + IN-MEMORY QUICKSORT: Reading all blocks, performing sort on output.',
      planIndexed: 'B-TREE INDEX RANGE SCAN: [idx_student_cgpa] traverses tree nodes in sorted sequence.',
    },
    attendance_join: {
      name: 'Fact Attendance Cross-Table Join',
      sql: 'SELECT a.attendance_id, s.name, a.percentage FROM Fact_Attendance a JOIN Dim_Student s ON a.student_id = s.student_id',
      column: 'student_id',
      unindexedMs: 94.2,
      indexedMs: 22.4,
      reductionPct: '76.2%',
      planUnindexed: 'NESTED LOOP FULL SCAN: Multiplying Fact rows by Dimension rows.',
      planIndexed: 'INDEX HASH JOIN: Utilizes B-Tree index on student_id to locate matching dimensions.',
    },
  };

  const currentBenchmark = benchmarkPresets[activeBenchmarkQuery];

  // Check if an index exists for the active benchmark query column
  const hasIndexForBenchmark = indexes.some(
    (idx) => idx.columnName.toLowerCase() === currentBenchmark.column.toLowerCase()
  );

  const chartData = [
    {
      name: 'Before Optimization (Full Scan)',
      time: currentBenchmark.unindexedMs,
      fill: '#ef4444',
    },
    {
      name: 'After Indexing (Index Scan)',
      time: currentBenchmark.indexedMs,
      fill: '#10b981',
    },
  ];

  const handleAddIndex = (e: React.FormEvent) => {
    e.preventDefault();
    createIndex(selectedTable, selectedCol, indexType);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <span>Process Management Module 9</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Zap className="w-7 h-7 text-amber-500" />
            Tuning Manager (Performance Optimization Studio)
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Identifies query execution bottlenecks, constructs specialized B-Tree and Bitmap indexes, evaluates buffer hit ratios, and benchmarks query latency.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start md:self-center"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Syllabus Notes & Quiz</span>
        </button>
      </div>

      {/* Problem Scenario */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Degrading Analytical Dashboards & Table Scan Lockups</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            As student historical marks swell, unindexed multi-table JOINs scan every block on disk sequentially, taking unacceptable time and choking server RAM. The Tuning Manager analyzes execution plans, builds low-cardinality Bitmap Indexes, and slashes query response times by over 75%.
          </p>
        </div>
      </div>

      {/* Performance Comparison Benchmark Studio */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-500" />
              Before & After Query Latency Benchmark
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an analytical query to evaluate reproducible performance differences with and without indexing.
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveBenchmarkQuery('dept_filter')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeBenchmarkQuery === 'dept_filter' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Dept Filter (Bitmap)
            </button>
            <button
              onClick={() => setActiveBenchmarkQuery('cgpa_range')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeBenchmarkQuery === 'cgpa_range' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              CGPA Range (B-Tree)
            </button>
            <button
              onClick={() => setActiveBenchmarkQuery('attendance_join')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeBenchmarkQuery === 'attendance_join' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600'
              }`}
            >
              Fact Join
            </button>
          </div>
        </div>

        {/* Query & Metric Display */}
        <div className="bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Benchmark Query SQL:</span>
          <div className="text-emerald-400 font-semibold">{currentBenchmark.sql}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Comparison Bar Chart */}
          <div className="lg:col-span-2 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} unit=" ms" />
                <Tooltip
                  formatter={(val: any) => [`${val} ms`, 'Execution Time']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Bar dataKey="time" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Speedup Scorecard */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Optimization Gain</span>
              <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-black">
                {currentBenchmark.reductionPct} Faster
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Unindexed Latency:</span>
                <span className="font-mono font-bold text-red-600">{currentBenchmark.unindexedMs} ms</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Indexed Latency:</span>
                <span className="font-mono font-bold text-emerald-600">{currentBenchmark.indexedMs} ms</span>
              </div>
              <div className="flex justify-between text-xs pt-2 border-t border-slate-200">
                <span className="text-slate-700 font-semibold">Simulated Speedup Factor:</span>
                <span className="font-mono font-bold text-blue-600">
                  {(currentBenchmark.unindexedMs / currentBenchmark.indexedMs).toFixed(1)}x
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-600 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <strong className="text-slate-800 block">Execution Plan Difference:</strong>
              <div className="text-red-700">&bull; {currentBenchmark.planUnindexed}</div>
              <div className="text-emerald-700">&bull; {currentBenchmark.planIndexed}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Index Construction Studio & Active Indexes List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Create Index Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-500" />
              Build Specialized Warehouse Index
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Choose B-Tree for high-cardinality keys, Bitmap for low-cardinality dimensions.
            </p>
          </div>

          <form onSubmit={handleAddIndex} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Table</label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono text-xs"
              >
                <option value="Dim_Student">Dim_Student</option>
                <option value="Fact_Attendance">Fact_Attendance</option>
                <option value="Fact_Examination">Fact_Examination</option>
                <option value="Fact_Placement">Fact_Placement</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Indexed Column</label>
              <select
                value={selectedCol}
                onChange={(e) => setSelectedCol(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono text-xs"
              >
                {selectedTable === 'Dim_Student' && (
                  <>
                    <option value="department_id">department_id (Low Cardinality)</option>
                    <option value="gender">gender (Low Cardinality)</option>
                    <option value="cgpa">cgpa (High Cardinality Range)</option>
                    <option value="placement_status">placement_status (Discrete)</option>
                  </>
                )}
                {selectedTable === 'Fact_Attendance' && (
                  <>
                    <option value="student_id">student_id (Foreign Key)</option>
                    <option value="percentage">percentage (Filter Key)</option>
                  </>
                )}
                {selectedTable === 'Fact_Examination' && (
                  <>
                    <option value="student_id">student_id (Foreign Key)</option>
                    <option value="grade">grade (Discrete Category)</option>
                  </>
                )}
                {selectedTable === 'Fact_Placement' && (
                  <>
                    <option value="department_id">department_id (Dimension Join)</option>
                    <option value="package_lpa">package_lpa (Measure Range)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Index Data Structure</label>
              <select
                value={indexType}
                onChange={(e) => setIndexType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-semibold"
              >
                <option value="Bitmap">Bitmap Index (Ideal for OLAP & Low Cardinality: Dept, Gender)</option>
                <option value="B-Tree">B-Tree Index (Ideal for Ranges & Primary Keys: CGPA, Marks)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Create Index on {selectedCol}</span>
            </button>
          </form>
        </div>

        {/* Right 2 Cols: Active Indexes Table */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              Active System Indexes Catalog ({indexes.length})
            </h3>
            <span className="text-xs text-slate-400 font-mono">Synced with Query Planner</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-semibold">
                  <th className="py-2.5 px-3">Index Identifier</th>
                  <th className="py-2.5 px-3">Table & Column</th>
                  <th className="py-2.5 px-3">Structure</th>
                  <th className="py-2.5 px-3">Storage Footprint</th>
                  <th className="py-2.5 px-3">Speedup</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {indexes.map((idx) => (
                  <tr key={idx.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{idx.name}</td>
                    <td className="py-2.5 px-3 font-mono">
                      {idx.tableName}.<strong className="text-blue-600">{idx.columnName}</strong>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          idx.type === 'Bitmap'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {idx.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{idx.sizeKb} KB</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-600">~{idx.speedupFactor}x</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => removeIndex(idx.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Drop Index"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EduInfoModal managerId="tuning" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
