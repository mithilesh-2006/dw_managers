import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Boxes,
  Split,
  HelpCircle,
  AlertTriangle,
  Network,
  CheckCircle2,
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
  } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Manager 7 of 10 • Process Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <Boxes className="w-5 h-5 text-indigo-600" />
            Warehouse Manager (Dimensional Modeling)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Structures data into a Star Schema (Fact vs Dimension tables) and manages historical academic year partitions.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
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
            Storing student history in giant unorganized flat tables makes analytical queries scan millions of irrelevant past rows. The Warehouse Manager organizes records into Star Schemas (connecting numeric facts to student/department dimensions) and divides data into partitions by Academic Year so queries scan 75% less data.
          </span>
        </div>
      </div>

      {/* Visual Star Schema Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Network className="w-4 h-4 text-indigo-600" />
            PSG iTech Star Schema Architecture
          </h2>
          <span className="text-xs text-slate-400 font-mono">1 Fact : N Dimensions</span>
        </div>

        {/* 3-Col Visual Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-2">
          {/* Dimension 1 & 2 */}
          <div className="space-y-3">
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-blue-900 block">Dim_Student ({students.length} rows)</span>
              <p className="text-slate-600 text-[11px]">PK: student_id &bull; name &bull; cgpa</p>
            </div>
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-emerald-900 block">Dim_Department ({departments.length} rows)</span>
              <p className="text-slate-600 text-[11px]">PK: department_id &bull; hod &bull; intake</p>
            </div>
          </div>

          {/* Center Fact */}
          <div className="p-4 bg-indigo-900 text-white rounded-2xl shadow-md text-center space-y-2 border-2 border-indigo-400">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300 block font-mono">
              Central Fact Table
            </span>
            <div className="font-mono font-bold text-sm">Fact_Attendance</div>
            <div className="text-[11px] text-indigo-200">
              {attendance.length} Biometric Facts
            </div>
            <div className="text-[10px] text-indigo-300 font-mono border-t border-indigo-800 pt-1.5 text-left">
              <div>&bull; hours_attended (Metric)</div>
              <div>&bull; percentage (Metric)</div>
              <div>&bull; student_id (FK)</div>
              <div>&bull; department_id (FK)</div>
            </div>
          </div>

          {/* Dimension 3 & 4 */}
          <div className="space-y-3">
            <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-purple-900 block">Dim_Date (Time Dimension)</span>
              <p className="text-slate-600 text-[11px]">PK: date_key &bull; academic_year &bull; sem</p>
            </div>
            <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-rose-900 block">Dim_Faculty ({faculty.length} rows)</span>
              <p className="text-slate-600 text-[11px]">PK: faculty_id &bull; specialization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partitions Manager */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Split className="w-4 h-4 text-indigo-600" />
            Interactive Simulation: Academic Year Table Partitions
          </h2>
          <span className="text-xs text-slate-400 font-mono">Partition Pruning</span>
        </div>

        <p className="text-xs text-slate-500">
          Mounting or detaching partitions demonstrates partition pruning: the query engine scans only active year partitions instead of the whole history.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {partitions.map((part) => (
            <div
              key={part.name}
              className={`p-3.5 rounded-xl border text-center space-y-2 transition ${
                part.active ? 'border-indigo-300 bg-indigo-50/50' : 'border-slate-200 bg-slate-50 opacity-60'
              }`}
            >
              <div className="font-bold text-slate-900 font-mono">{part.year}</div>
              <div className="text-[11px] text-slate-500 font-mono">{part.rowCount} Rows</div>
              <button
                onClick={() => togglePartition(part.name)}
                className={`w-full py-1 rounded-lg text-xs font-semibold transition ${
                  part.active
                    ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {part.active ? 'Detach' : 'Mount'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <EduInfoModal managerId="warehouse" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
