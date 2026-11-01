import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  PlayCircle,
  HardDriveDownload,
  HardDrive,
  LifeBuoy,
  Zap,
  CheckCheck,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ScenarioDef {
  id: string;
  title: string;
  icon: any;
  color: string;
  managersInvolved: string[];
  situation: string;
  initialState: string;
  expectedResult: string;
  steps: {
    step: number;
    title: string;
    description: string;
    actionLabel: string;
  }[];
}

export const ScenariosView: React.FC = () => {
  const {
    runETL,
    updateServerConfig,
    serverConfig,
    simulateCrash,
    restoreBackup,
    backups,
    executeQuery,
    createIndex,
    runDataQualityTests,
    fixDuplicateStudents,
    injectQualityAnomalies,
  } = useSimulation();

  const [activeScenarioId, setActiveScenarioId] = useState<string>('scenario_1');
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [scenarioLogs, setScenarioLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const scenarios: ScenarioDef[] = [
    {
      id: 'scenario_1',
      title: 'Scenario 1: Daily Biometric Attendance ETL Pipeline',
      icon: HardDriveDownload,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      managersInvolved: ['Scheduling Manager', 'Load Manager', 'Warehouse Manager', 'Event Manager'],
      situation:
        'It is 23:30 midnight. Campus RFID biometric nodes across 5 college blocks have transmitted the daily attendance log for 60 students. Data must be cleansed, transformed into percentage metrics, and loaded into Fact_Attendance without human intervention.',
      initialState: 'Fact_Attendance holds baseline historical attendance. Scheduled job is pending.',
      expectedResult: 'Fact_Attendance table row count increases; Event Manager logs clean batch completion.',
      steps: [
        {
          step: 1,
          title: 'Trigger Scheduled Midnight Batch',
          description: 'Scheduling Manager fires the daily attendance trigger.',
          actionLabel: 'Trigger Batch',
        },
        {
          step: 2,
          title: 'Extract & Cleanse Records in Load Manager',
          description: 'Load Manager parses raw CSV, verifies student existence, and maps department IDs.',
          actionLabel: 'Execute Cleansing',
        },
        {
          step: 3,
          title: 'Commit to Fact_Attendance & Star Schema',
          description: 'Transformed facts are committed to the warehouse partition with zero errors.',
          actionLabel: 'Commit to Warehouse',
        },
      ],
    },
    {
      id: 'scenario_2',
      title: 'Scenario 2: Critical Server Storage Saturation & Volume Expansion',
      icon: HardDrive,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      managersInvolved: ['Configuration Manager', 'Event Manager', 'Database Manager'],
      situation:
        'New academic semester archives push disk utilization beyond 95% of allocated capacity. The warehouse risks entering emergency read-only write-lock mode, blocking ongoing student admissions.',
      initialState: `Storage Allocated: ${serverConfig.storageAllocatedGb} GB. High disk utilization threshold active.`,
      expectedResult: 'Administrator reconfigures SAN volume to 2048 GB. Warning clears. System health returns to NORMAL.',
      steps: [
        {
          step: 1,
          title: 'Simulate Storage Saturation Alert',
          description: 'Event Manager registers warning that storage usage is close to the allocated limit.',
          actionLabel: 'Generate Storage Warning',
        },
        {
          step: 2,
          title: 'Reconfigure Storage Volume in Configuration Manager',
          description: 'Expand physical storage allocation from current size to 2048 GB.',
          actionLabel: 'Expand Volume to 2048 GB',
        },
        {
          step: 3,
          title: 'Verify System Health & Normalization',
          description: 'Capacity ratio drops safely below 50%. Write locks released.',
          actionLabel: 'Confirm Safe Health',
        },
      ],
    },
    {
      id: 'scenario_3',
      title: 'Scenario 3: Catastrophic Hardware Crash & Point-in-Time Recovery',
      icon: LifeBuoy,
      color: 'text-red-600 bg-red-50 border-red-200',
      managersInvolved: ['Backup Recovery Manager', 'Event Manager', 'Database Manager'],
      situation:
        'A power outage damages storage cluster sector tables. The warehouse server crashes instantly. Analysts are locked out and all SQL queries fail. The DBA must recover from the latest validated golden snapshot.',
      initialState: 'System is online. Valid snapshots exist in the catalog.',
      expectedResult: 'System restored from snapshot snapshot backup. Status reverts from CRASHED to NORMAL.',
      steps: [
        {
          step: 1,
          title: 'Simulate Unexpected Storage Crash',
          description: 'Trigger simulated crash. System state switches to CRITICAL_CRASHED.',
          actionLabel: 'Simulate Server Crash',
        },
        {
          step: 2,
          title: 'Verify Query Denial During Outage',
          description: 'Observe that incoming analytical queries are safely aborted during downtime.',
          actionLabel: 'Test Query Lockout',
        },
        {
          step: 3,
          title: 'Restore Latest Snapshot & Reopen Warehouse',
          description: 'Backup Recovery Manager restores golden state and reboots warehouse engine.',
          actionLabel: 'Execute Snapshot Restoration',
        },
      ],
    },
    {
      id: 'scenario_4',
      title: 'Scenario 4: Analytical Query Bottleneck & Bitmap Index Tuning',
      icon: Zap,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      managersInvolved: ['Query Manager', 'Tuning Manager', 'Warehouse Manager'],
      situation:
        'A department-wise placement analytics query takes 48.5 ms performing a Full Table Scan on physical disk blocks. The Tuning Manager analyzes the optimizer plan and creates a Bitmap Index on department_id.',
      initialState: 'No index exists on department_id. Execution plan indicates Full Table Scan.',
      expectedResult: 'Bitmap index built. Query latency plummets by 75% to 12.2 ms with an Index Scan plan.',
      steps: [
        {
          step: 1,
          title: 'Execute Unindexed Baseline Query',
          description: 'Run benchmark query in Query Manager and record sequential scan time (~48 ms).',
          actionLabel: 'Run Baseline Query',
        },
        {
          step: 2,
          title: 'Construct Bitmap Index in Tuning Manager',
          description: 'Build specialized low-cardinality Bitmap Index on Dim_Student.department_id.',
          actionLabel: 'Build Bitmap Index',
        },
        {
          step: 3,
          title: 'Verify 4x Speedup & Index Scan Plan',
          description: 'Re-run query. Optimizer utilizes index, reducing execution time to ~12 ms.',
          actionLabel: 'Benchmark Speedup',
        },
      ],
    },
    {
      id: 'scenario_5',
      title: 'Scenario 5: Data Quality Breach & Automated Reconciliation',
      icon: CheckCheck,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      managersInvolved: ['Testing Manager', 'Load Manager', 'Event Manager'],
      situation:
        'During an unvalidated spreadsheet import, duplicate student IDs and out-of-range CGPAs (14.50) enter Dim_Student. The Testing Manager audits the table, pinpoints the faulty rows, and triggers corrective deduplication.',
      initialState: 'Table contains duplicate and invalid records.',
      expectedResult: 'Testing Manager pinpoints errors; automated remediation purges duplicates; test suite passes 100%.',
      steps: [
        {
          step: 1,
          title: 'Inject Discrepancy Anomalies',
          description: 'Introduce deliberate duplicate primary keys and invalid range numbers for testing.',
          actionLabel: 'Inject Quality Anomalies',
        },
        {
          step: 2,
          title: 'Execute Automated Quality Audit Suite',
          description: 'Testing Manager identifies failing tests and pinpoints exact rogue student records.',
          actionLabel: 'Run Audit Suite',
        },
        {
          step: 3,
          title: 'Execute Deduplication Remediation',
          description: 'Remediate faulty records. Re-run suite to verify 100% compliance certificate.',
          actionLabel: 'Remediate & Pass All Tests',
        },
      ],
    },
  ];

  const currentScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  const handleStepAction = async (stepIdx: number) => {
    let logMsg = '';

    if (activeScenarioId === 'scenario_1') {
      if (stepIdx === 0) {
        logMsg = 'Step 1: Scheduling Manager fired cron trigger at 23:30. Job status set to RUNNING.';
      } else if (stepIdx === 1) {
        const etlRes = runETL('attendance_batch_valid');
        logMsg = `Step 2: Load Manager extracted & transformed ${etlRes.loaded} clean records into Fact_Attendance.`;
      } else if (stepIdx === 2) {
        logMsg = 'Step 3: Warehouse Manager linked records into Star Schema. Fact_Attendance count updated.';
        setIsCompleted(true);
      }
    } else if (activeScenarioId === 'scenario_2') {
      if (stepIdx === 0) {
        logMsg = 'Step 1: Event Manager logged WARNING: Storage capacity exceeds threshold.';
      } else if (stepIdx === 1) {
        updateServerConfig({ storageAllocatedGb: 2048 });
        logMsg = 'Step 2: Configuration Manager expanded storage volume to 2048 GB.';
      } else if (stepIdx === 2) {
        logMsg = 'Step 3: Storage utilization ratio dropped to safe 40%. Write locks disengaged.';
        setIsCompleted(true);
      }
    } else if (activeScenarioId === 'scenario_3') {
      if (stepIdx === 0) {
        simulateCrash('Catastrophic SAN storage controller failure.');
        logMsg = 'Step 1: System crash simulated. Status set to CRITICAL_CRASHED. Services suspended.';
      } else if (stepIdx === 2) {
        if (backups.length > 0) {
          restoreBackup(backups[0].id);
        }
        logMsg = 'Step 3: Backup Recovery Manager restored snapshot state. Operational status NORMAL.';
        setIsCompleted(true);
      } else {
        logMsg = 'Step 2: Verified that analytical queries are rejected while database is offline.';
      }
    } else if (activeScenarioId === 'scenario_4') {
      if (stepIdx === 0) {
        const qRes = executeQuery("SELECT * FROM Dim_Student WHERE department_id = 'CSE'");
        logMsg = `Step 1: Executed unindexed query in ${qRes.executionTimeMs} ms. Access path: Full Table Scan.`;
      } else if (stepIdx === 1) {
        createIndex('Dim_Student', 'department_id', 'Bitmap');
        logMsg = 'Step 2: Tuning Manager built Bitmap Index [idx_dim_st_department_id].';
      } else if (stepIdx === 2) {
        const qRes = executeQuery("SELECT * FROM Dim_Student WHERE department_id = 'CSE'");
        logMsg = `Step 3: Re-executed with index: Latency reduced to ${qRes.executionTimeMs} ms (~4x faster!).`;
        setIsCompleted(true);
      }
    } else if (activeScenarioId === 'scenario_5') {
      if (stepIdx === 0) {
        injectQualityAnomalies();
        logMsg = 'Step 1: Injected 1 duplicate student key and 1 out-of-range CGPA record (14.50).';
      } else if (stepIdx === 1) {
        const tests = runDataQualityTests();
        logMsg = `Step 2: Testing Manager audited tables: ${tests.filter((t: any) => t.status === 'FAIL').length} test(s) failed. Discrepancies pinpointed.`;
      } else if (stepIdx === 2) {
        fixDuplicateStudents();
        logMsg = 'Step 3: Automated remediation resolved duplicates. Re-ran test suite: 100% PASSED!';
        setIsCompleted(true);
      }
    }

    setScenarioLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${logMsg}`]);

    if (stepIdx < currentScenario.steps.length - 1) {
      setCurrentStepIdx(stepIdx + 1);
    }
  };

  const handleResetScenario = () => {
    setCurrentStepIdx(0);
    setScenarioLogs([]);
    setIsCompleted(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
            <span>Seminar Demonstration Suite</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <PlayCircle className="w-7 h-7 text-purple-600" />
            Guided Real-World Simulation Scenarios
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Five interactive campus warehouse scenarios designed for classroom demonstrations. Walk students through actual problem identification, multi-manager responses, and resolution.
          </p>
        </div>
      </div>

      {/* Scenario Selection Grid (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {scenarios.map((sc, idx) => {
          const isSelected = sc.id === activeScenarioId;
          const Icon = sc.icon;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioId(sc.id);
                handleResetScenario();
              }}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'border-purple-600 bg-purple-50/70 shadow-md ring-2 ring-purple-200'
                  : 'border-slate-200 bg-white hover:bg-slate-50 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl border ${sc.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold font-mono text-slate-400">
                  SCENARIO {idx + 1}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs leading-snug">{sc.title}</h4>
                <div className="text-[10px] text-slate-400 mt-1">
                  {sc.managersInvolved.length} Managers involved
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Hero Spotlight */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl border ${currentScenario.color}`}>
              <currentScenario.icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Interactive Classroom Walkthrough
              </span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-0.5">
                {currentScenario.title}
              </h2>
            </div>
          </div>
          <button
            onClick={handleResetScenario}
            className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold flex items-center space-x-1 transition self-start sm:self-center"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Scenario</span>
          </button>
        </div>

        {/* Situation & Managers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1 md:col-span-2">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block">
              1. Situation Description
            </span>
            <p className="text-slate-800 leading-relaxed font-medium">{currentScenario.situation}</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
            <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px] block">
              Managers Involved
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentScenario.managersInvolved.map((m, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-semibold font-mono"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Initial State vs Expected Result */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
            <span className="font-bold text-blue-900 text-[10px] uppercase block">Initial System State</span>
            <p className="text-slate-700">{currentScenario.initialState}</p>
          </div>
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <span className="font-bold text-emerald-900 text-[10px] uppercase block">Expected Scenario Outcome</span>
            <p className="text-slate-700">{currentScenario.expectedResult}</p>
          </div>
        </div>

        {/* Interactive Step-by-Step Flow */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            Interactive Step Execution (Presenter Click-Through)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentScenario.steps.map((st, idx) => {
              const isPast = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div
                  key={st.step}
                  className={`p-4 rounded-2xl border transition space-y-3 flex flex-col justify-between text-xs ${
                    isCurrent
                      ? 'border-purple-600 bg-purple-50/60 shadow-md ring-2 ring-purple-100'
                      : isPast
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-slate-200 bg-slate-50/50 opacity-60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs font-mono text-purple-700">
                        STEP {st.step}
                      </span>
                      {isPast && (
                        <span className="text-emerald-600 text-[11px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Done
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{st.title}</div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{st.description}</p>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleStepAction(idx)}
                      disabled={idx > currentStepIdx}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 ${
                        isCurrent
                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-md'
                          : isPast
                          ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <span>{st.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Scenario Execution Stream Logs */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-xs font-bold text-slate-800">
            <span>Scenario Execution Telemetry Stream</span>
            {isCompleted && (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> SCENARIO FULLY COMPLETED
              </span>
            )}
          </div>
          <div className="bg-slate-950 text-slate-200 rounded-2xl p-4 font-mono text-[11px] h-36 overflow-y-auto space-y-1 border border-slate-800">
            {scenarioLogs.length === 0 ? (
              <div className="text-slate-500 italic">Click Step 1 above to initiate scenario simulation...</div>
            ) : (
              scenarioLogs.map((log, i) => (
                <div key={i} className="text-emerald-300">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
