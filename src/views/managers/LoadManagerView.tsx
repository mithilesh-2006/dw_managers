import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  HardDriveDownload,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSpreadsheet,
  Settings2,
  Database,
  HelpCircle,
  RefreshCw,
  Sparkles,
  Layers,
  Sliders,
} from 'lucide-react';
import { RAW_CSV_DATASETS } from '../../data/initialData';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const LoadManagerView: React.FC = () => {
  const { runETL, etlHistory, students, attendance, placements, systemHealth } = useSimulation();

  const [selectedDataset, setSelectedDataset] = useState<
    'attendance_batch_valid' | 'attendance_batch_dirty' | 'placement_batch_new' | 'student_batch_dirty'
  >('attendance_batch_dirty');

  // Transformation rules toggles
  const [deduplication, setDeduplication] = useState(true);
  const [normalization, setNormalization] = useState(true);
  const [nullHandling, setNullHandling] = useState(true);
  const [typeValidation, setTypeValidation] = useState(true);

  const [etlResult, setEtlResult] = useState<{
    processed: number;
    loaded: number;
    rejected: number;
    errors: string[];
  } | null>(null);

  const [showEduModal, setShowEduModal] = useState(false);
  const [currentStep, setCurrentStep] = useState<'extract' | 'transform' | 'load'>('extract');

  const rawContent = RAW_CSV_DATASETS[selectedDataset];

  // Parse raw preview
  const rawRows = rawContent
    .trim()
    .split('\n')
    .map((line) => line.split(','));
  const rawHeaders = rawRows[0] || [];
  const rawDataRows = rawRows.slice(1);

  const handleExecuteETL = () => {
    setCurrentStep('load');
    const result = runETL(selectedDataset, undefined, {
      deduplication,
      normalization,
      nullHandling,
      typeValidation,
    });
    setEtlResult(result);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <span>Process Management Module 6</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <HardDriveDownload className="w-7 h-7 text-blue-600" />
            Load Manager (ETL Pipeline Engine)
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Extracts heterogenous transactional feeds, cleanses duplicates and malformed records, transforms domain values, and loads clean facts into the warehouse.
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
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Heterogenous Data Discrepancies & Duplicate Pollution</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            Raw student records arrive from 5 different engineering departments in conflicting formats: some write "cse", others "Computer Science"; attendance logs contain duplicated biometric scans; null values crash queries. The Load Manager enforces the three-stage ETL pipeline to ensure only pristine data enters the warehouse.
          </p>
        </div>
      </div>

      {/* ETL Pipeline Stepper Visualizer */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
          <span>Three-Tier Data Warehouse Ingestion Pipeline</span>
          <span className="text-blue-600">Extract &rarr; Transform &rarr; Load</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            onClick={() => setCurrentStep('extract')}
            className={`p-4 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
              currentStep === 'extract'
                ? 'border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <div className="font-bold text-sm">EXTRACT (E)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Source CSV Feeds & Buffers</div>
            </div>
          </div>

          <div
            onClick={() => setCurrentStep('transform')}
            className={`p-4 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
              currentStep === 'transform'
                ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <div className="font-bold text-sm">TRANSFORM (T)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Cleanse, Deduplicate, Normalize</div>
            </div>
          </div>

          <div
            onClick={() => setCurrentStep('load')}
            className={`p-4 rounded-xl border transition cursor-pointer flex items-center gap-3 ${
              currentStep === 'load'
                ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-xs'
                : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <div className="font-bold text-sm">LOAD (L)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Commit to Star Schema Tables</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Step 1 & 2: Dataset Selection & Transformation Config */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              Stage 1: Select Operational Source Dataset
            </h2>
          </div>

          <div className="space-y-2 text-xs">
            <label className="block font-semibold text-slate-700">Source Operational Batch</label>
            <select
              value={selectedDataset}
              onChange={(e) => {
                setSelectedDataset(e.target.value as any);
                setEtlResult(null);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium text-slate-900"
            >
              <option value="attendance_batch_dirty">
                Biometric Attendance Batch (Dirty with 1 Dupe, 1 Invalid FK, 1 Null, 1 Range Error)
              </option>
              <option value="attendance_batch_valid">
                Biometric Attendance Batch (Clean 7 Records)
              </option>
              <option value="placement_batch_new">
                Placement Portal Batch (5 New Company Offers for Fact_Placement)
              </option>
              <option value="student_batch_dirty">
                ERP Student Intake Batch (Dirty with lowercase depts & invalid CGPA 14.5)
              </option>
            </select>
          </div>

          {/* Raw CSV Preview Box */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span>Raw Ingested Records ({rawDataRows.length} lines)</span>
              <span className="text-[11px] font-mono text-slate-400">CSV Stream</span>
            </div>
            <div className="bg-slate-950 text-slate-200 rounded-xl p-3 font-mono text-[11px] max-h-36 overflow-y-auto space-y-1 border border-slate-800">
              <div className="text-blue-400 font-bold">{rawRows[0]?.join(',')}</div>
              {rawDataRows.map((line, idx) => (
                <div key={idx} className="text-slate-300">
                  {line.join(',')}
                </div>
              ))}
            </div>
          </div>

          {/* Stage 2: Transformation Rules Engine */}
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Stage 2: ETL Cleansing & Transformation Rules
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Deduplication</span>
                  <span className="text-[10px] text-slate-500">Purge repeated student keys</span>
                </div>
                <input
                  type="checkbox"
                  checked={deduplication}
                  onChange={(e) => setDeduplication(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Normalization</span>
                  <span className="text-[10px] text-slate-500">Capitalize & format Dept IDs</span>
                </div>
                <input
                  type="checkbox"
                  checked={normalization}
                  onChange={(e) => setNormalization(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Null Handling</span>
                  <span className="text-[10px] text-slate-500">Quarantine missing values</span>
                </div>
                <input
                  type="checkbox"
                  checked={nullHandling}
                  onChange={(e) => setNullHandling(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Domain Validation</span>
                  <span className="text-[10px] text-slate-500">Validate FK & numerical bounds</span>
                </div>
                <input
                  type="checkbox"
                  checked={typeValidation}
                  onChange={(e) => setTypeValidation(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
              </div>
            </div>
          </div>

          {/* Execute ETL Button */}
          <div className="pt-2">
            <button
              onClick={handleExecuteETL}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center space-x-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Execute Extract &rarr; Transform &rarr; Load Pipeline</span>
            </button>
          </div>
        </div>

        {/* Stage 3: Load Execution Outcomes & Quarantine Bad Records */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600" />
                Stage 3: Load Results & Quarantine Audit
              </h2>
              <span className="text-xs text-slate-400 font-mono">Target: Warehouse Tables</span>
            </div>

            {etlResult ? (
              <div className="space-y-4 text-xs animate-in fade-in">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <span className="text-[10px] font-bold uppercase text-blue-700 block">Extracted</span>
                    <span className="text-lg font-black text-blue-900">{etlResult.processed}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 block">Loaded</span>
                    <span className="text-lg font-black text-emerald-900">{etlResult.loaded}</span>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <span className="text-[10px] font-bold uppercase text-rose-700 block">Rejected</span>
                    <span className="text-lg font-black text-rose-900">{etlResult.rejected}</span>
                  </div>
                </div>

                {/* Quarantined Records Error Details */}
                {etlResult.errors.length > 0 ? (
                  <div className="space-y-2">
                    <div className="font-bold text-rose-900 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Quarantined Bad Records ({etlResult.errors.length})</span>
                    </div>
                    <div className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl max-h-48 overflow-y-auto space-y-1.5 font-mono text-[11px] text-rose-950">
                      {etlResult.errors.map((err, i) => (
                        <div key={i} className="flex items-start gap-1.5 leading-relaxed">
                          <span className="text-rose-500 font-bold">&times;</span>
                          <span>{err}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>All extracted records passed validation and were successfully inserted into the warehouse!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-xl">
                Click "Execute Extract &rarr; Transform &rarr; Load Pipeline" to process the selected dataset.
              </div>
            )}
          </div>

          {/* Current Live Table Stats */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
            <span className="font-bold text-slate-900 block">Live Data Warehouse Row Counts:</span>
            <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
              <div>Students: <strong className="text-blue-600">{students.length}</strong></div>
              <div>Attendance: <strong className="text-emerald-600">{attendance.length}</strong></div>
              <div>Placements: <strong className="text-purple-600">{placements.length}</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical ETL Execution Log */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">ETL Pipeline Execution History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase font-semibold">
                <th className="py-2.5 px-3">Batch ID</th>
                <th className="py-2.5 px-3">Target Table</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Processed</th>
                <th className="py-2.5 px-3">Loaded</th>
                <th className="py-2.5 px-3">Rejected</th>
                <th className="py-2.5 px-3">Rules Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {etlHistory.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold">{batch.id}</td>
                  <td className="py-2.5 px-3 font-mono text-blue-600 font-semibold">{batch.targetTable}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400">{batch.timestamp}</td>
                  <td className="py-2.5 px-3 font-mono">{batch.totalExtracted}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-600 font-bold">{batch.loadedCount}</td>
                  <td className="py-2.5 px-3 font-mono text-rose-600 font-bold">{batch.rejectedCount}</td>
                  <td className="py-2.5 px-3 text-[11px] text-slate-500">
                    {[
                      batch.rulesApplied.deduplication && 'Dedupe',
                      batch.rulesApplied.normalization && 'Norm',
                      batch.rulesApplied.nullHandling && 'NullCheck',
                      batch.rulesApplied.typeValidation && 'Validate',
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EduInfoModal managerId="load" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
