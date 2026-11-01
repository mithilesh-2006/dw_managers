import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Database,
  Table,
  Shield,
  HelpCircle,
  AlertTriangle,
  Key,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const DatabaseManagerView: React.FC = () => {
  const {
    students,
    departments,
    attendance,
    exams,
    placements,
    users,
    currentUser,
    switchUser,
  } = useSimulation();

  const [selectedTable, setSelectedTable] = useState<'Dim_Student' | 'Fact_Attendance' | 'Fact_Examination' | 'Fact_Placement'>('Dim_Student');
  const [showEduModal, setShowEduModal] = useState(false);

  const tablesInfo = [
    { name: 'Dim_Student', type: 'Dimension Table', count: students.length, desc: 'Student profile, CGPA, department, and contact info' },
    { name: 'Fact_Attendance', type: 'Fact Table', count: attendance.length, desc: 'Daily biometric attendance hours and percentage' },
    { name: 'Fact_Examination', type: 'Fact Table', count: exams.length, desc: 'Subject-wise internal, external marks and letter grades' },
    { name: 'Fact_Placement', type: 'Fact Table', count: placements.length, desc: 'Campus company offers and package LPA' },
  ];

  const getTableRows = () => {
    switch (selectedTable) {
      case 'Dim_Student':
        return students.slice(0, 5);
      case 'Fact_Attendance':
        return attendance.slice(0, 5);
      case 'Fact_Examination':
        return exams.slice(0, 5);
      case 'Fact_Placement':
        return placements.slice(0, 5);
      default:
        return [];
    }
  };

  const rows = getTableRows();
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Manager 4 of 10 • System Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            System Database Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Administers the relational tables, column structures, and Role-Based Access Control (RBAC).
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
            Without database administration and access security, any user could modify exam grades or delete historical attendance. The Database Manager manages table structures and assigns permissions (SELECT, INSERT, UPDATE, DELETE) to protect sensitive college data.
          </span>
        </div>
      </div>

      {/* Role-Based Access Control Simulator */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            Interactive Simulation: Active Database User & Permissions
          </h2>
          <span className="text-xs text-slate-400 font-mono">RBAC Security</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-600 font-medium">Switch Active User:</span>
          {users.map((u) => (
            <button
              key={u.id}
              onClick={() => switchUser(u.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                currentUser.id === u.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{u.username}</span>
              <span className="text-[10px] opacity-80 font-normal">({u.role})</span>
            </button>
          ))}
        </div>

        <div className="p-3 bg-slate-50 rounded-xl flex flex-wrap items-center justify-between text-xs font-mono text-slate-700">
          <div>
            Active Role: <strong className="text-emerald-700">{currentUser.role}</strong>
          </div>
          <div className="flex items-center gap-3">
            <span>SELECT: <strong>{currentUser.permissions.select ? '✅ ALLOWED' : '❌ DENIED'}</strong></span>
            <span>INSERT: <strong>{currentUser.permissions.insert ? '✅ ALLOWED' : '❌ DENIED'}</strong></span>
            <span>DELETE: <strong>{currentUser.permissions.delete ? '✅ ALLOWED' : '❌ DENIED'}</strong></span>
          </div>
        </div>
      </div>

      {/* Table Browser */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-600" />
          Warehouse Tables Catalog
        </h2>

        {/* 4 Table Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tablesInfo.map((t) => (
            <button
              key={t.name}
              onClick={() => setSelectedTable(t.name as any)}
              className={`p-3 rounded-xl border text-left transition space-y-1 ${
                selectedTable === t.name
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="font-mono text-xs">{t.name}</div>
              <div className="text-[11px] text-slate-500 font-normal">{t.count} Rows</div>
            </button>
          ))}
        </div>

        {/* Sample Records Display */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">
              Previewing Sample Rows from <strong>{selectedTable}</strong>:
            </span>
            <span className="text-slate-400 font-mono text-[11px]">Synced with in-memory warehouse</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  {columns.map((c) => (
                    <th key={c} className="p-2.5 whitespace-nowrap">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {rows.map((row: any, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50">
                    {columns.map((c) => (
                      <td key={c} className="p-2.5 whitespace-nowrap">
                        {String(row[c] ?? '-')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EduInfoModal managerId="database" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
