import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { DataQualityTest } from '../types';
import {
  GitBranch,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Cpu,
  CalendarClock,
  BellRing,
  Database,
  LifeBuoy,
  HardDriveDownload,
  Boxes,
  Terminal,
  Zap,
  CheckCheck,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkflowStep {
  stepNumber: number;
  managerId: string;
  managerName: string;
  icon: any;
  category: 'System Management' | 'Process Management';
  operationName: string;
  description: string;
  actionLabel: string;
  expectedOutput: string;
  failureScenario: string;
}

export const CrossManagerWorkflowView: React.FC = () => {
  const {
    serverConfig,
    scheduledJobs,
    runJobManually,
    events,
    runETL,
    createBackup,
    runDataQualityTests,
    executeQuery,
    createIndex,
    logEvent,
    students,
    attendance,
  } = useSimulation();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [stepOutputs, setStepOutputs] = useState<Record<number, { success: boolean; text: string; details?: string }>>({});
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [failureInjected, setFailureInjected] = useState(false);

  const workflowSteps: WorkflowStep[] = [
    {
      stepNumber: 1,
      managerId: 'config',
      managerName: '1. System Configuration Manager',
      icon: Cpu,
      category: 'System Management',
      operationName: 'Verify Hardware & Allocate Memory/Disk Buffers',
      description: 'Verifies available server RAM (48 GB) and disk partition (1536 GB) before batch loading begins.',
      actionLabel: 'Verify Resources',
      expectedOutput: `Storage OK: ${serverConfig.storageUsedGb} GB / ${serverConfig.storageAllocatedGb} GB. Buffer pool 16384 MB ready.`,
      failureScenario: 'Insufficient disk volume halts write allocations.',
    },
    {
      stepNumber: 2,
      managerId: 'scheduling',
      managerName: '2. System Scheduling Manager',
      icon: CalendarClock,
      category: 'System Management',
      operationName: 'Trigger Daily Attendance Batch Schedule',
      description: 'Activates batch execution trigger for midnight biometric attendance ingestion job.',
      actionLabel: 'Trigger Batch Job',
      expectedOutput: 'Trigger signal emitted: Job "Daily Biometric Attendance Sync" transitioned to RUNNING state.',
      failureScenario: 'Disabled or missed cron triggers stall daily reporting.',
    },
    {
      stepNumber: 3,
      managerId: 'event',
      managerName: '3. System Event Manager',
      icon: BellRing,
      category: 'System Management',
      operationName: 'Monitor Execution Telemetry & Audit Heartbeat',
      description: 'Ingests runtime heartbeat, registers operational start event, and monitors error streams.',
      actionLabel: 'Log Audit Start',
      expectedOutput: 'Event EVT-BATCH-INIT registered in audit trail with INFO severity.',
      failureScenario: 'Unmonitored batch crashes silently without DBA notification.',
    },
    {
      stepNumber: 4,
      managerId: 'database',
      managerName: '4. System Database Manager',
      icon: Database,
      category: 'System Management',
      operationName: 'Prepare Table Catalogs & Verify User RBAC',
      description: 'Validates Fact_Attendance schema catalog, column types, and checks active user write permissions.',
      actionLabel: 'Validate Schema & RBAC',
      expectedOutput: 'Catalog unlocked: Fact_Attendance write locks acquired for active ETL service account.',
      failureScenario: 'Privilege denial: unauthorized user blocked from inserting records.',
    },
    {
      stepNumber: 5,
      managerId: 'load',
      managerName: '5. Load Manager (ETL)',
      icon: HardDriveDownload,
      category: 'Process Management',
      operationName: 'Extract, Transform, Deduplicate & Load Records',
      description: 'Extracts 7 attendance records, removes duplicate student keys, normalizes departments, and inserts clean facts.',
      actionLabel: 'Execute ETL Pipeline',
      expectedOutput: 'ETL Completed: Clean facts inserted into Fact_Attendance. Zero duplicate keys.',
      failureScenario: 'Malformed CSV entries or foreign key violations rejected into quarantine log.',
    },
    {
      stepNumber: 6,
      managerId: 'warehouse',
      managerName: '6. Warehouse Manager',
      icon: Boxes,
      category: 'Process Management',
      operationName: 'Organize Dimensional Star Schema & Mount Partition',
      description: 'Links new fact records with Dim_Student and Dim_Department dimensions in Star Schema and updates partition.',
      actionLabel: 'Organize Star Schema',
      expectedOutput: 'Star schema relationships synchronized. Academic Year 2024-2025 partition mounted.',
      failureScenario: 'Unpartitioned table scan degrades query response across millions of legacy rows.',
    },
    {
      stepNumber: 7,
      managerId: 'testing',
      managerName: '7. Testing Manager',
      icon: CheckCheck,
      category: 'Process Management',
      operationName: 'Run Data Quality Reconciliation & Integrity Tests',
      description: 'Compares source record counts against warehouse table, audits nulls, and validates CGPA / attendance ranges.',
      actionLabel: 'Run Quality Tests',
      expectedOutput: 'All 5 Data Quality Tests PASSED! 100% referential integrity and zero duplicates verified.',
      failureScenario: 'Source-to-target mismatch detected: 8 missing records quarantined.',
    },
    {
      stepNumber: 8,
      managerId: 'query',
      managerName: '8. Query Manager',
      icon: Terminal,
      category: 'Process Management',
      operationName: 'Retrieve Executive Attendance Analytics via SQL',
      description: 'Executes analytical SQL query to calculate department-wise average attendance for College Dean review.',
      actionLabel: 'Execute Analytical SQL',
      expectedOutput: 'Query executed successfully: Retrieved department averages across 5 engineering branches.',
      failureScenario: 'SQL syntax or catalog missing-table error halts report generation.',
    },
    {
      stepNumber: 9,
      managerId: 'tuning',
      managerName: '9. Tuning Manager',
      icon: Zap,
      category: 'Process Management',
      operationName: 'Optimize Access Path with Bitmap Index',
      description: 'Constructs Bitmap Index on Fact_Attendance(percentage) reducing full table scan latency by ~4x.',
      actionLabel: 'Apply Bitmap Index Tuning',
      expectedOutput: 'Index [idx_fact_att_pct] active. Converted full sequential disk scan to index range lookup.',
      failureScenario: 'Missing index causes expensive disk I/O bottlenecks during concurrent reporting.',
    },
    {
      stepNumber: 10,
      managerId: 'backup',
      managerName: '10. System Backup Recovery Manager',
      icon: LifeBuoy,
      category: 'System Management',
      operationName: 'Create Resilient Snapshot of Consolidated Warehouse State',
      description: 'Freezes an immutable recovery snapshot of all 6 updated tables to protect newly loaded data against hardware crashes.',
      actionLabel: 'Snapshot Warehouse State',
      expectedOutput: 'Snapshot backup created successfully! Captured current records into disaster recovery catalog.',
      failureScenario: 'Unbacked warehouse is vulnerable to catastrophic data loss on power failure.',
    },
  ];

  const currentStep = workflowSteps[currentStepIndex];

  // Execute single step
  const executeStep = async (stepIdx: number) => {
    const step = workflowSteps[stepIdx];

    if (failureInjected && stepIdx === 4) {
      // Simulate failure at Load Manager
      logEvent('Load Manager', 'error', 'Workflow Injected Failure: Biometric feed corrupted with malformed foreign key.');
      setStepOutputs((prev) => ({
        ...prev,
        [stepIdx]: {
          success: false,
          text: 'ETL Pipeline FAILED: Student ID "PSG21XX999" does not exist in Dim_Student. Event Manager logged error.',
          details: 'Discrepancy caught by foreign key referential integrity rule. Event Manager alerted admin.',
        },
      }));
      return;
    }

    let outText = step.expectedOutput;

    if (stepIdx === 0) {
      outText = `Hardware Validated: 16 Cores, ${serverConfig.ramAllocatedGb} GB RAM, ${serverConfig.storageUsedGb} GB / ${serverConfig.storageAllocatedGb} GB Disk.`;
    } else if (stepIdx === 1) {
      if (scheduledJobs.length > 0) {
        await runJobManually(scheduledJobs[0].id);
      }
      outText = 'Job "Daily Biometric Attendance Sync" triggered and executed through Scheduling Manager.';
    } else if (stepIdx === 2) {
      logEvent('System Event Manager', 'info', 'Step 3 Audit: Operational batch pipeline progressing normally.');
      outText = 'Audit telemetry ingested. Telemetry stream healthy across all 10 managers.';
    } else if (stepIdx === 3) {
      outText = 'Database catalog verified. Table Fact_Attendance columns and constraints validated for insertion.';
    } else if (stepIdx === 4) {
      const etlRes = runETL('attendance_batch_valid');
      outText = `Load Manager successfully transformed & loaded ${etlRes.loaded} records into Fact_Attendance.`;
    } else if (stepIdx === 5) {
      outText = 'Warehouse Manager Star Schema updated. Dimensions (Dim_Student, Dim_Department) joined with Fact_Attendance.';
    } else if (stepIdx === 6) {
      const tests: DataQualityTest[] = runDataQualityTests();
      outText = `Testing Manager completed: ${tests.filter((t: DataQualityTest) => t.status === 'PASS').length} of ${tests.length} tests PASSED.`;
    } else if (stepIdx === 7) {
      const qRes = executeQuery('SELECT department_id, AVG(percentage) as avg_attendance FROM Fact_Attendance GROUP BY department_id');
      outText = `Query Manager executed in ${qRes.executionTimeMs} ms: Yielded ${qRes.rowCount} departmental averages.`;
    } else if (stepIdx === 8) {
      createIndex('Fact_Attendance', 'percentage', 'Bitmap');
      outText = 'Tuning Manager applied Bitmap Index on percentage. Access plan converted to Index Scan.';
    } else if (stepIdx === 9) {
      const snap = createBackup('End-of-Workflow Golden State Snapshot');
      outText = `Backup Recovery Manager generated snapshot "${snap.id}" (${snap.recordCount} rows, ${snap.sizeMb} MB).`;
    }

    setStepOutputs((prev) => ({
      ...prev,
      [stepIdx]: {
        success: true,
        text: outText,
      },
    }));

    if (stepIdx < workflowSteps.length - 1) {
      setCurrentStepIndex(stepIdx + 1);
    }
  };

  const handleRunAllSteps = async () => {
    setIsRunningAll(true);
    for (let i = 0; i < workflowSteps.length; i++) {
      setCurrentStepIndex(i);
      await executeStep(i);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }
    setIsRunningAll(false);
  };

  const handleResetWorkflow = () => {
    setCurrentStepIndex(0);
    setStepOutputs({});
    setFailureInjected(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <span>Anna University R2021 Core Capstone</span>
            <span>•</span>
            <span>All 10 Managers Orchestration</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <GitBranch className="w-7 h-7 text-blue-600" />
            Cross-Manager Integrated Workflow Simulation
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Live demonstration showing how all 10 Data Warehouse System & Process Managers collaborate synchronously to ingest, transform, organize, test, query, optimize, and protect college data.
          </p>
        </div>
        <div className="flex items-center space-x-2 self-start md:self-center">
          <button
            onClick={() => setFailureInjected(!failureInjected)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
              failureInjected
                ? 'bg-red-600 text-white border-red-700 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
            title="Inject failure at Step 5 (ETL) to demonstrate cross-manager resilience"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{failureInjected ? 'Failure Injected at Step 5' : 'Simulate Mid-Flow Failure'}</span>
          </button>
          <button
            onClick={handleRunAllSteps}
            disabled={isRunningAll}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Auto-Run All 10 Steps</span>
          </button>
          <button
            onClick={handleResetWorkflow}
            className="p-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition"
            title="Reset Workflow"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar / Step Dots */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-800">
            Pipeline Progress: Step {currentStepIndex + 1} of {workflowSteps.length}
          </span>
          <span className="text-blue-600 font-mono">
            {Object.keys(stepOutputs).length} Steps Completed
          </span>
        </div>
        <div className="grid grid-cols-10 gap-1.5">
          {workflowSteps.map((step, idx) => {
            const out = stepOutputs[idx];
            let dotColor = 'bg-slate-200';
            if (out) {
              dotColor = out.success ? 'bg-emerald-500' : 'bg-red-500';
            } else if (idx === currentStepIndex) {
              dotColor = 'bg-blue-600 ring-4 ring-blue-100';
            }
            return (
              <div
                key={step.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${dotColor}`}
                title={`Step ${step.stepNumber}: ${step.managerName}`}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Current Step Spotlight Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
              <currentStep.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Step {currentStep.stepNumber} • {currentStep.category}
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-0.5">
                {currentStep.managerName}
              </h2>
            </div>
          </div>
          <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-slate-300 border border-white/10 font-mono">
            PSG iTech DW Simulation
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
          <div className="text-xs text-blue-300 font-bold uppercase tracking-wide">
            Operation: {currentStep.operationName}
          </div>
          <p className="text-sm text-slate-200 leading-relaxed max-w-3xl">
            {currentStep.description}
          </p>
        </div>

        {/* Step Outcome Feedback if executed */}
        {stepOutputs[currentStepIndex] && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
              stepOutputs[currentStepIndex].success
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/60 border-red-500/50 text-red-200'
            }`}
          >
            <div className="font-bold flex items-center gap-2">
              {stepOutputs[currentStepIndex].success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>STEP EXECUTION SUCCEEDED:</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span>STEP EXECUTION ENCOUNTERED FAILURE:</span>
                </>
              )}
            </div>
            <div className="font-mono text-[11px]">{stepOutputs[currentStepIndex].text}</div>
          </div>
        )}

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400">
            {currentStepIndex > 0 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                className="text-slate-300 hover:text-white underline mr-3"
              >
                &larr; Previous Step
              </button>
            ) : null}
            {currentStepIndex < workflowSteps.length - 1 ? (
              <button
                onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                className="text-slate-300 hover:text-white underline"
              >
                Next Step &rarr;
              </button>
            ) : null}
          </div>

          <button
            onClick={() => executeStep(currentStepIndex)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition flex items-center space-x-2"
          >
            <span>Execute {currentStep.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 10-Step Interactive Pipeline Overview List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-slate-500" />
          Sequential 10-Manager Collaboration Chain
        </h3>

        <div className="divide-y divide-slate-100">
          {workflowSteps.map((step, idx) => {
            const out = stepOutputs[idx];
            const isCurrent = idx === currentStepIndex;
            const Icon = step.icon;

            return (
              <div
                key={step.stepNumber}
                onClick={() => setCurrentStepIndex(idx)}
                className={`py-3.5 px-3 transition cursor-pointer rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                  isCurrent ? 'bg-blue-50/70 border border-blue-200' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      out
                        ? out.success
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                        : isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {step.stepNumber}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span>{step.managerName}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({step.category})</span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{step.operationName}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {out ? (
                    out.success ? (
                      <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold flex items-center gap-1 text-[11px]">
                        <XCircle className="w-3.5 h-3.5" /> Failed
                      </span>
                    )
                  ) : (
                    <span className="text-slate-400 text-[11px]">Pending</span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
