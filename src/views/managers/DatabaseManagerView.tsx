import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  Database,
  Table,
  Shield,
  Key,
  Users,
  Plus,
  Eye,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Layers,
  FileCode,
  HardDrive,
} from 'lucide-react';
import { DatabaseTableMeta, SimulatedUser } from '../../types';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const DatabaseManagerView: React.FC = () => {
  const {
    students,
    departments,
    attendance,
    exams,
    placements,
    faculty,
    users,
    currentUser,
    switchUser,
    updateUserPermissions,
    customTables,
    createCustomTable,
  } = useSimulation();

  const [activeTab, setActiveTab] = useState<'tables' | 'users' | 'metadata'>('tables');
  const [selectedTable, setSelectedTable] = useState<string>('Dim_Student');
  const [showEduModal, setShowEduModal] = useState(false);
  const [isCreatingTable, setIsCreatingTable] = useState(false);

  // Form for table creation
  const [newTableName, setNewTableName] = useState('');
  const [newTableType, setNewTableType] = useState<'Fact' | 'Dimension' | 'Staging' | 'Aggregation'>('Dimension');
  const [newColName, setNewColName] = useState('');
  const [newColType, setNewColType] = useState('VARCHAR(100)');
  const [columnsList, setColumnsList] = useState<DatabaseTableMeta['columns']>([
    { name: 'id', type: 'VARCHAR(20)', isPrimary: true, nullable: false },
  ]);

  // Built-in tables metadata
  const tablesMeta: DatabaseTableMeta[] = [
    {
      name: 'Dim_Student',
      type: 'Dimension',
      recordCount: students.length,
      sizeKb: Math.round(students.length * 1.8),
      columns: [
        { name: 'student_id', type: 'VARCHAR(15)', isPrimary: true, nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'gender', type: 'CHAR(1)', nullable: false },
        { name: 'department_id', type: 'VARCHAR(10)', isForeign: true, refTable: 'Dim_Department' },
        { name: 'batch', type: 'VARCHAR(10)' },
        { name: 'cgpa', type: 'DECIMAL(3,2)' },
        { name: 'attendance_pct', type: 'DECIMAL(5,2)' },
        { name: 'email', type: 'VARCHAR(120)' },
        { name: 'placement_status', type: 'VARCHAR(20)' },
      ],
      indexes: ['idx_student_dept'],
    },
    {
      name: 'Dim_Department',
      type: 'Dimension',
      recordCount: departments.length,
      sizeKb: 8,
      columns: [
        { name: 'department_id', type: 'VARCHAR(10)', isPrimary: true, nullable: false },
        { name: 'department_name', type: 'VARCHAR(100)', nullable: false },
        { name: 'hod_name', type: 'VARCHAR(100)' },
        { name: 'intake', type: 'INT' },
        { name: 'labs_count', type: 'INT' },
      ],
    },
    {
      name: 'Fact_Attendance',
      type: 'Fact',
      recordCount: attendance.length,
      sizeKb: Math.round(attendance.length * 1.2),
      columns: [
        { name: 'attendance_id', type: 'VARCHAR(20)', isPrimary: true, nullable: false },
        { name: 'student_id', type: 'VARCHAR(15)', isForeign: true, refTable: 'Dim_Student' },
        { name: 'department_id', type: 'VARCHAR(10)', isForeign: true, refTable: 'Dim_Department' },
        { name: 'date', type: 'DATE' },
        { name: 'academic_year', type: 'VARCHAR(10)' },
        { name: 'semester', type: 'INT' },
        { name: 'hours_attended', type: 'INT' },
        { name: 'total_hours', type: 'INT' },
        { name: 'percentage', type: 'DECIMAL(5,2)' },
        { name: 'status', type: 'VARCHAR(10)' },
      ],
      partitions: ['2021-2022', '2022-2023', '2023-2024', '2024-2025'],
    },
    {
      name: 'Fact_Examination',
      type: 'Fact',
      recordCount: exams.length,
      sizeKb: Math.round(exams.length * 1.4),
      columns: [
        { name: 'exam_id', type: 'VARCHAR(20)', isPrimary: true, nullable: false },
        { name: 'student_id', type: 'VARCHAR(15)', isForeign: true, refTable: 'Dim_Student' },
        { name: 'department_id', type: 'VARCHAR(10)', isForeign: true, refTable: 'Dim_Department' },
        { name: 'academic_year', type: 'VARCHAR(10)' },
        { name: 'semester', type: 'INT' },
        { name: 'subject_code', type: 'VARCHAR(10)' },
        { name: 'subject_name', type: 'VARCHAR(100)' },
        { name: 'internal_marks', type: 'INT' },
        { name: 'external_marks', type: 'INT' },
        { name: 'total_marks', type: 'INT' },
        { name: 'grade', type: 'CHAR(2)' },
      ],
      indexes: ['idx_exam_student_id'],
    },
    {
      name: 'Fact_Placement',
      type: 'Fact',
      recordCount: placements.length,
      sizeKb: Math.round(placements.length * 1.5),
      columns: [
        { name: 'placement_id', type: 'VARCHAR(20)', isPrimary: true, nullable: false },
        { name: 'student_id', type: 'VARCHAR(15)', isForeign: true, refTable: 'Dim_Student' },
        { name: 'company_name', type: 'VARCHAR(100)', nullable: false },
        { name: 'package_lpa', type: 'DECIMAL(4,2)' },
        { name: 'role', type: 'VARCHAR(100)' },
        { name: 'offer_type', type: 'VARCHAR(20)' },
        { name: 'status', type: 'VARCHAR(20)' },
      ],
    },
    {
      name: 'Dim_Faculty',
      type: 'Dimension',
      recordCount: faculty.length,
      sizeKb: 6,
      columns: [
        { name: 'faculty_id', type: 'VARCHAR(15)', isPrimary: true, nullable: false },
        { name: 'name', type: 'VARCHAR(100)', nullable: false },
        { name: 'department_id', type: 'VARCHAR(10)', isForeign: true, refTable: 'Dim_Department' },
        { name: 'designation', type: 'VARCHAR(50)' },
        { name: 'specialization', type: 'VARCHAR(120)' },
      ],
    },
    ...customTables,
  ];

  const currentTableMeta = tablesMeta.find((t) => t.name === selectedTable) || tablesMeta[0];

  // Live records getter
  const getLiveRecords = (tableName: string) => {
    switch (tableName) {
      case 'Dim_Student':
        return students;
      case 'Dim_Department':
        return departments;
      case 'Fact_Attendance':
        return attendance;
      case 'Fact_Examination':
        return exams;
      case 'Fact_Placement':
        return placements;
      case 'Dim_Faculty':
        return faculty;
      default:
        return [];
    }
  };

  const handleAddColumn = () => {
    if (!newColName.trim()) return;
    setColumnsList((prev) => [
      ...prev,
      { name: newColName.trim().toLowerCase(), type: newColType, nullable: true },
    ]);
    setNewColName('');
  };

  const handleCreateTableSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim() || columnsList.length === 0) return;

    createCustomTable({
      name: newTableName.trim(),
      type: newTableType,
      recordCount: 0,
      sizeKb: 4,
      columns: columnsList,
    });

    setIsCreatingTable(false);
    setSelectedTable(newTableName.trim());
    setNewTableName('');
    setColumnsList([{ name: 'id', type: 'VARCHAR(20)', isPrimary: true, nullable: false }]);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
            <span>System Management Module 4</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Database className="w-7 h-7 text-emerald-600" />
            System Database Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Administers the relational data dictionary, schema catalogs, table storage metrics, and role-based access control (RBAC).
          </p>
        </div>
        <div className="flex items-center space-x-2 self-start md:self-center">
          <button
            onClick={() => setIsCreatingTable(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Table</span>
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
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Disorganized Catalogs & Unauthorized Privilege Escalation</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            Without strict database schema administration and role permissions, guest users or students could execute UPDATE/DELETE queries on exam grades or attendance facts. The Database Manager enforces schema catalogs and granular RBAC security boundaries.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab('tables')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'tables' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>Warehouse Tables ({tablesMeta.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'users' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Security & User Permissions (RBAC)</span>
        </button>
        <button
          onClick={() => setActiveTab('metadata')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'metadata' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Metadata Dictionary</span>
        </button>
      </div>

      {/* TAB 1: Tables & Data Browser */}
      {activeTab === 'tables' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Table List */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Database Tables</h3>
            <div className="space-y-1">
              {tablesMeta.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setSelectedTable(t.name)}
                  className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center justify-between transition ${
                    selectedTable === t.name
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="truncate">
                    <div className="font-bold">{t.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      {t.type} • {t.columns.length} columns
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {t.recordCount} rows
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Table Structure & Sample Data */}
          <div className="lg:col-span-3 space-y-6">
            {/* Table Definition */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Table className="w-4 h-4 text-emerald-600" />
                    {currentTableMeta.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Classification: <strong className="text-emerald-700">{currentTableMeta.type} Table</strong> • Estimated Storage: <strong className="font-mono">{currentTableMeta.sizeKb} KB</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-semibold">
                    {currentTableMeta.recordCount} Active Records
                  </span>
                </div>
              </div>

              {/* Column Schema Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-semibold">
                      <th className="py-2 px-3">Column Name</th>
                      <th className="py-2 px-3">SQL Data Type</th>
                      <th className="py-2 px-3">Constraints & Keys</th>
                      <th className="py-2 px-3">Nullable</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {currentTableMeta.columns.map((col, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="py-2 px-3 font-mono font-semibold text-slate-800">{col.name}</td>
                        <td className="py-2 px-3 font-mono text-blue-600">{col.type}</td>
                        <td className="py-2 px-3">
                          {col.isPrimary && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded mr-1">
                              <Key className="w-3 h-3 text-amber-600" /> PK
                            </span>
                          )}
                          {col.isForeign && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                              FK &rarr; {col.refTable}
                            </span>
                          )}
                          {!col.isPrimary && !col.isForeign && <span className="text-slate-400">Regular</span>}
                        </td>
                        <td className="py-2 px-3">
                          {col.nullable ? (
                            <span className="text-slate-500">YES</span>
                          ) : (
                            <span className="text-red-600 font-semibold">NOT NULL</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Data Preview */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Sample Live Rows Preview ({getLiveRecords(selectedTable).length} total records)
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">Synced with AlaSQL in-memory engine</span>
              </div>
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                      {currentTableMeta.columns.slice(0, 6).map((c) => (
                        <th key={c.name} className="py-2 px-3 font-mono">
                          {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {getLiveRecords(selectedTable)
                      .slice(0, 8)
                      .map((row: any, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          {currentTableMeta.columns.slice(0, 6).map((c) => (
                            <td key={c.name} className="py-2 px-3 truncate max-w-[150px]">
                              {String(row[c.name] ?? '-')}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Security & Role-Based Access Control (RBAC) */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              Role-Based Access Control (RBAC) & Privileges
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select or modify user permissions. The active user's permissions directly restrict Query Manager and Database operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {users.map((u) => {
              const isActive = currentUser.id === u.id;
              return (
                <div
                  key={u.id}
                  className={`p-4 rounded-xl border transition space-y-4 ${
                    isActive ? 'border-emerald-500 bg-emerald-50/40 shadow-xs' : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{u.username}</div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {u.role}
                      </span>
                    </div>
                    {isActive ? (
                      <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full">
                        ACTIVE
                      </span>
                    ) : (
                      <button
                        onClick={() => switchUser(u.id)}
                        className="text-xs text-blue-600 hover:underline font-semibold"
                      >
                        Switch To
                      </button>
                    )}
                  </div>

                  {/* Permissions checkboxes */}
                  <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">Assigned Privileges</span>
                    {(['select', 'insert', 'update', 'delete'] as const).map((perm) => (
                      <div key={perm} className="flex items-center justify-between">
                        <label className="text-slate-700 uppercase font-mono font-semibold cursor-pointer">
                          {perm}
                        </label>
                        <input
                          type="checkbox"
                          checked={u.permissions[perm]}
                          onChange={(e) =>
                            updateUserPermissions(u.id, {
                              ...u.permissions,
                              [perm]: e.target.checked,
                            })
                          }
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-700 leading-relaxed border border-slate-200">
            <strong>Demonstration Tip:</strong> Switch to the <code>guest_auditor</code> role (which has all permissions disabled) and then try executing a query in the Query Manager. You will witness immediate permission denial!
          </div>
        </div>
      )}

      {/* TAB 3: Metadata Dictionary */}
      {activeTab === 'metadata' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Data Warehouse Metadata Catalog & Lineage</h3>
          <p className="text-xs text-slate-500">
            Comprehensive repository containing technical schema descriptions, source-to-target mappings, and refresh cadences.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-semibold">
                  <th className="py-2.5 px-3">Table Name</th>
                  <th className="py-2.5 px-3">Model Type</th>
                  <th className="py-2.5 px-3">Operational Source System</th>
                  <th className="py-2.5 px-3">Refresh Cadence</th>
                  <th className="py-2.5 px-3">Integrity Constraints</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 px-3 font-bold font-mono">Dim_Student</td>
                  <td className="py-2.5 px-3">Dimension</td>
                  <td className="py-2.5 px-3">College ERP (Oracle DB)</td>
                  <td className="py-2.5 px-3">Semester Start</td>
                  <td className="py-2.5 px-3">PK: student_id, FK: department_id</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold font-mono">Dim_Department</td>
                  <td className="py-2.5 px-3">Dimension</td>
                  <td className="py-2.5 px-3">Academic Dean Registry</td>
                  <td className="py-2.5 px-3">Annual</td>
                  <td className="py-2.5 px-3">PK: department_id</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold font-mono">Fact_Attendance</td>
                  <td className="py-2.5 px-3">Fact (Additive)</td>
                  <td className="py-2.5 px-3">Campus Biometric & RFID Nodes</td>
                  <td className="py-2.5 px-3">Daily at 23:30</td>
                  <td className="py-2.5 px-3">PK: attendance_id, FKs: student_id, dept_id</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold font-mono">Fact_Examination</td>
                  <td className="py-2.5 px-3">Fact (Additive)</td>
                  <td className="py-2.5 px-3">Controller of Examinations (COE)</td>
                  <td className="py-2.5 px-3">End of Semester</td>
                  <td className="py-2.5 px-3">PK: exam_id, Grade constraints</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-bold font-mono">Fact_Placement</td>
                  <td className="py-2.5 px-3">Fact (Semi-Additive)</td>
                  <td className="py-2.5 px-3">Training & Placement Cell (TPC)</td>
                  <td className="py-2.5 px-3">Weekly during drive</td>
                  <td className="py-2.5 px-3">PK: placement_id, Package &gt; 0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Table Modal */}
      {isCreatingTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-slate-900">Define New Warehouse Table Schema</h3>
            <form onSubmit={handleCreateTableSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Table Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dim_Scholarship"
                    value={newTableName}
                    onChange={(e) => setNewTableName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Classification Type</label>
                  <select
                    value={newTableType}
                    onChange={(e) => setNewTableType(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 font-medium"
                  >
                    <option value="Dimension">Dimension Table</option>
                    <option value="Fact">Fact Table</option>
                    <option value="Staging">Staging Table</option>
                    <option value="Aggregation">Materialized Summary</option>
                  </select>
                </div>
              </div>

              {/* Columns Editor */}
              <div className="border border-slate-200 rounded-xl p-3 space-y-3 bg-slate-50/50">
                <div className="font-bold text-slate-800">Add Schema Columns</div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="column_name"
                    value={newColName}
                    onChange={(e) => setNewColName(e.target.value)}
                    className="flex-1 bg-white border border-slate-200 rounded-lg p-1.5 font-mono text-xs"
                  />
                  <select
                    value={newColType}
                    onChange={(e) => setNewColType(e.target.value)}
                    className="bg-white border border-slate-200 rounded-lg p-1.5 font-mono text-xs"
                  >
                    <option value="VARCHAR(50)">VARCHAR(50)</option>
                    <option value="VARCHAR(100)">VARCHAR(100)</option>
                    <option value="INT">INT</option>
                    <option value="DECIMAL(5,2)">DECIMAL(5,2)</option>
                    <option value="DATE">DATE</option>
                  </select>
                  <button
                    type="button"
                    onClick={handleAddColumn}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-bold"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {columnsList.map((col, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-1.5 bg-white rounded border border-slate-200 text-xs font-mono"
                    >
                      <span>
                        {col.name} <span className="text-blue-600">({col.type})</span>
                        {col.isPrimary && <strong className="text-amber-600 ml-1.5">[PK]</strong>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingTable(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-md"
                >
                  Create Table in Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <EduInfoModal managerId="database" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
