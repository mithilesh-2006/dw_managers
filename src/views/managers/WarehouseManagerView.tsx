import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Boxes,
  Layers,
  Network,
  Split,
  Plus,
  HelpCircle,
  AlertTriangle,
  Database,
  ArrowRight,
  CheckCircle2,
  Table,
  HardDrive,
  Calendar,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const WarehouseManagerView: React.FC = () => {
  const {
    students,
    departments,
    attendance,
    exams,
    placements,
    faculty,
    partitions,
    togglePartition,
    aggregations,
    createAggregation,
  } = useSimulation();

  const [activeTab, setActiveTab] = useState<'schema' | 'partitions' | 'aggregations'>('schema');
  const [selectedFact, setSelectedFact] = useState<'Fact_Attendance' | 'Fact_Examination' | 'Fact_Placement'>('Fact_Attendance');
  const [showEduModal, setShowEduModal] = useState(false);

  // Form for custom aggregation
  const [isCreatingAgg, setIsCreatingAgg] = useState(false);
  const [aggName, setAggName] = useState('');
  const [aggDesc, setAggDesc] = useState('');
  const [aggSql, setAggSql] = useState('');

  const handleCreateAggSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aggName.trim() || !aggSql.trim()) return;
    createAggregation(aggName.trim(), aggDesc.trim(), aggSql.trim());
    setIsCreatingAgg(false);
    setAggName('');
    setAggDesc('');
    setAggSql('');
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
            <span>Process Management Module 7</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Boxes className="w-7 h-7 text-indigo-600" />
            Warehouse Manager (Dimensional Architecture)
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Designs and maintains the Star Schema, coordinates fact constellation joins, manages historical academic year partitions, and provisions pre-aggregated summary cubes.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 self-start md:self-center"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Syllabus Notes & Quiz</span>
        </button>
      </div>

      {/* Problem Scenario */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: High-Volume Analytical Congestion & Scan Overhead</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            A college data warehouse accumulates millions of biometric attendance scans and examination marks over decades. Running queries over the entire history causes massive disk I/O. The Warehouse Manager models data into Star Schemas, partitions tables by Academic Year, and builds pre-aggregated materialized summary cubes.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'schema' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Star Schema Interactive Visualizer</span>
        </button>
        <button
          onClick={() => setActiveTab('partitions')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'partitions' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Split className="w-4 h-4" />
          <span>Academic Year Partitioning ({partitions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('aggregations')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'aggregations' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Materialized Summary Aggregations ({aggregations.length})</span>
        </button>
      </div>

      {/* TAB 1: Star Schema Visualizer */}
      {activeTab === 'schema' && (
        <div className="space-y-6">
          {/* Fact Table Switcher */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-800">Select Center Fact Table:</span>
            <div className="flex flex-wrap items-center gap-2">
              {(['Fact_Attendance', 'Fact_Examination', 'Fact_Placement'] as const).map((fact) => (
                <button
                  key={fact}
                  onClick={() => setSelectedFact(fact)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition font-mono ${
                    selectedFact === fact
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {fact}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Visual Star Schema Diagram */}
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl border border-slate-800 space-y-8 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white tracking-tight">PSG iTech College Star Schema Architecture</h3>
              </div>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full font-mono font-medium">
                1 Fact : N Dimensions
              </span>
            </div>

            {/* Diagram Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Left Dimensions */}
              <div className="space-y-4">
                {/* Dim_Student */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg hover:border-blue-400 transition">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="font-bold text-xs text-blue-400 uppercase font-mono">Dim_Student</span>
                    <span className="text-[10px] text-slate-400 font-mono">{students.length} rows</span>
                  </div>
                  <div className="mt-2.5 space-y-1 font-mono text-[11px] text-slate-300">
                    <div className="text-amber-400 font-bold">PK: student_id</div>
                    <div>name (VARCHAR)</div>
                    <div>gender (CHAR)</div>
                    <div>cgpa (DECIMAL)</div>
                    <div>department_id &rarr; FK</div>
                  </div>
                </div>

                {/* Dim_Department */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg hover:border-emerald-400 transition">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="font-bold text-xs text-emerald-400 uppercase font-mono">Dim_Department</span>
                    <span className="text-[10px] text-slate-400 font-mono">{departments.length} rows</span>
                  </div>
                  <div className="mt-2.5 space-y-1 font-mono text-[11px] text-slate-300">
                    <div className="text-amber-400 font-bold">PK: department_id</div>
                    <div>department_name</div>
                    <div>hod_name</div>
                    <div>intake (INT)</div>
                  </div>
                </div>
              </div>

              {/* CENTER: Selected Fact Table */}
              <div className="bg-gradient-to-b from-indigo-950 to-slate-900 border-2 border-indigo-500 rounded-3xl p-6 shadow-2xl relative space-y-4">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full tracking-wider shadow">
                  Central Fact Table
                </div>

                <div className="text-center pt-2">
                  <h4 className="text-lg font-black text-white font-mono">{selectedFact}</h4>
                  <p className="text-xs text-indigo-200 mt-0.5">
                    {selectedFact === 'Fact_Attendance' && `${attendance.length} Biometric Attendance Scans`}
                    {selectedFact === 'Fact_Examination' && `${exams.length} Semester Grade Facts`}
                    {selectedFact === 'Fact_Placement' && `${placements.length} Campus Placement Records`}
                  </p>
                </div>

                <div className="bg-slate-950/70 rounded-xl p-4 border border-indigo-900/60 font-mono text-[11px] space-y-1.5 text-slate-200">
                  <div className="text-amber-400 font-bold">
                    PK: {selectedFact === 'Fact_Attendance' ? 'attendance_id' : selectedFact === 'Fact_Examination' ? 'exam_id' : 'placement_id'}
                  </div>
                  <div className="text-blue-400">FK: student_id &rarr; Dim_Student</div>
                  <div className="text-emerald-400">FK: department_id &rarr; Dim_Department</div>
                  <div className="text-purple-400">FK: date / year &rarr; Dim_Date</div>
                  <div className="pt-2 border-t border-slate-800 text-white font-bold">
                    Numeric Measures (Metrics):
                  </div>
                  {selectedFact === 'Fact_Attendance' && (
                    <>
                      <div className="text-indigo-300">&bull; hours_attended (ADDITIVE)</div>
                      <div className="text-indigo-300">&bull; total_hours (ADDITIVE)</div>
                      <div className="text-indigo-300">&bull; percentage (NON-ADDITIVE)</div>
                    </>
                  )}
                  {selectedFact === 'Fact_Examination' && (
                    <>
                      <div className="text-indigo-300">&bull; internal_marks (ADDITIVE)</div>
                      <div className="text-indigo-300">&bull; external_marks (ADDITIVE)</div>
                      <div className="text-indigo-300">&bull; total_marks (ADDITIVE)</div>
                      <div className="text-indigo-300">&bull; credits (WEIGHT)</div>
                    </>
                  )}
                  {selectedFact === 'Fact_Placement' && (
                    <>
                      <div className="text-indigo-300">&bull; package_lpa (SEMI-ADDITIVE)</div>
                      <div className="text-indigo-300">&bull; interview_rounds (ADDITIVE)</div>
                    </>
                  )}
                </div>
              </div>

              {/* Right Dimensions */}
              <div className="space-y-4">
                {/* Dim_Date */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg hover:border-purple-400 transition">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="font-bold text-xs text-purple-400 uppercase font-mono">Dim_Date</span>
                    <span className="text-[10px] text-slate-400 font-mono">Time Axis</span>
                  </div>
                  <div className="mt-2.5 space-y-1 font-mono text-[11px] text-slate-300">
                    <div className="text-amber-400 font-bold">PK: date_key</div>
                    <div>academic_year (2021-25)</div>
                    <div>semester (1-8)</div>
                    <div>month, day, quarter</div>
                  </div>
                </div>

                {/* Dim_Faculty */}
                <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-lg hover:border-rose-400 transition">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="font-bold text-xs text-rose-400 uppercase font-mono">Dim_Faculty</span>
                    <span className="text-[10px] text-slate-400 font-mono">{faculty.length} rows</span>
                  </div>
                  <div className="mt-2.5 space-y-1 font-mono text-[11px] text-slate-300">
                    <div className="text-amber-400 font-bold">PK: faculty_id</div>
                    <div>name, designation</div>
                    <div>department_id &rarr; FK</div>
                    <div>specialization</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Partitioning Studio */}
      {activeTab === 'partitions' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Split className="w-5 h-5 text-indigo-600" />
              Academic Year Range Partitioning
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Table <code>Fact_Attendance</code> is horizontally partitioned by Academic Year. Detaching or mounting partitions simulates partition pruning: the query engine scans only active, relevant year partitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {partitions.map((part) => (
              <div
                key={part.name}
                className={`p-4 rounded-xl border transition space-y-3 ${
                  part.active ? 'border-indigo-300 bg-indigo-50/40 shadow-xs' : 'border-slate-200 bg-slate-50 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Range Partition
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{part.year}</h4>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      part.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {part.active ? 'ONLINE' : 'DETACHED'}
                  </span>
                </div>

                <div className="text-xs space-y-1 font-mono text-slate-600">
                  <div>Table: <strong>{part.name}</strong></div>
                  <div>Rows: <strong>{part.rowCount.toLocaleString()}</strong></div>
                  <div>Size: <strong>{part.sizeMb} MB</strong></div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => togglePartition(part.name)}
                    className={`w-full py-1.5 rounded-lg text-xs font-semibold transition ${
                      part.active
                        ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {part.active ? 'Detach Partition' : 'Mount Partition'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Materialized Summary Aggregations */}
      {activeTab === 'aggregations' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-600" />
                Materialized Aggregation Views (Summary Tables)
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Pre-calculated analytical cubes that allow executive college dashboards to retrieve aggregated metrics in sub-milliseconds without scanning raw facts.
              </p>
            </div>
            <button
              onClick={() => setIsCreatingAgg(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5 self-start sm:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>Create Aggregation Cube</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aggregations.map((agg, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 font-mono text-sm">{agg.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{agg.description}</p>
                  </div>
                  <span className="text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold">
                    {agg.rowCount} CUBED ROWS
                  </span>
                </div>

                <div className="bg-slate-900 text-indigo-300 p-2.5 rounded-lg font-mono text-[11px] overflow-x-auto">
                  {agg.sql}
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Created: {agg.created}</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 8.4x Query Speedup
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Aggregation Creator Modal */}
      {isCreatingAgg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900">Define Materialized Summary Cube</h3>
            <form onSubmit={handleCreateAggSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Aggregation View Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agg_Dept_Exam_GPA"
                  value={aggName}
                  onChange={(e) => setAggName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Business Purpose</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Departmental average marks summary for Anna University audit"
                  value={aggDesc}
                  onChange={(e) => setAggDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Materialization SQL Definition</label>
                <textarea
                  required
                  rows={3}
                  value={aggSql}
                  onChange={(e) => setAggSql(e.target.value)}
                  placeholder="SELECT department_id, AVG(total_marks) as avg_marks FROM Fact_Examination GROUP BY department_id"
                  className="w-full bg-slate-900 text-slate-100 font-mono border border-slate-800 rounded-lg p-2 text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingAgg(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md"
                >
                  Materialize Aggregation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <EduInfoModal managerId="warehouse" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
