import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { VisualOutcomeCard } from '../components/presentation/VisualOutcomeCard';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
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
  Play,
  ArrowRight,
  Lightbulb,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Slide {
  id: string;
  managerNumber: number;
  managerName: string;
  category: 'System Management' | 'Process Management';
  icon: any;
  problemStatement: string;
  whyRequired: string;
  proposedSolution: string;
  simulationAction: string;
  outcomeExplanation: string;
  annaUnivTopic: string;
  keyTakeaway: string;
}

export const PresentationModeView: React.FC = () => {
  const {
    serverConfig,
    updateServerConfig,
    scheduledJobs,
    runJobManually,
    runETL,
    createBackup,
    executeQuery,
    createIndex,
    runDataQualityTests,
    students,
    attendance,
  } = useSimulation();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [simulationRan, setSimulationRan] = useState(false);
  const [simulationOutput, setSimulationOutput] = useState<string | null>(null);

  const slides: Slide[] = [
    {
      id: 'config',
      managerNumber: 1,
      managerName: 'System Configuration Manager',
      category: 'System Management',
      icon: Cpu,
      problemStatement: 'PSG iTech Data Warehouse is expanding with 600 new students, but current memory buffer and storage limits risk transaction lockouts and memory swapping.',
      whyRequired: 'Without dynamic resource allocation, large ETL batches crash due to out-of-disk exceptions.',
      proposedSolution: 'Dynamically expand SAN storage volume allocation to 2048 GB and dedicate 48 GB RAM with 16384 MB buffer pool.',
      simulationAction: 'Expand Storage to 2048 GB',
      outcomeExplanation: 'Storage allocation expanded successfully. Disk utilization dropped safely to 40%, guaranteeing room for upcoming semester batches.',
      annaUnivTopic: 'Unit IV: Data Warehouse Operations - Server Configuration & Resource Management',
      keyTakeaway: 'The hardware pilot that guarantees the warehouse never runs out of memory or storage.',
    },
    {
      id: 'scheduling',
      managerNumber: 2,
      managerName: 'System Scheduling Manager',
      category: 'System Management',
      icon: CalendarClock,
      problemStatement: 'Manual uploading of biometric attendance and exam grades during daytime locks transactional tables and degrades dean analytical queries.',
      whyRequired: 'Orchestrates batch workflows to execute automatically during off-peak midnight windows (23:30).',
      proposedSolution: 'Automate daily cron jobs for biometric ingestion and snapshot backups with dependency triggers.',
      simulationAction: 'Trigger Midnight Attendance Job',
      outcomeExplanation: 'Job executed at midnight off-peak: Extracted biometric records and populated Fact_Attendance without daytime lock contention.',
      annaUnivTopic: 'Unit IV: Process Management - Scheduling Batch Processing & Maintenance',
      keyTakeaway: 'The clockwork engine ensuring batch processing runs seamlessly without human intervention.',
    },
    {
      id: 'event',
      managerNumber: 3,
      managerName: 'System Event Manager',
      category: 'System Management',
      icon: BellRing,
      problemStatement: 'A midnight loading script fails silently due to network dropouts. Administrators remain unaware, and dean reports display stale data.',
      whyRequired: 'Ingests real-time telemetry, categorizes severity (Info, Warning, Error, Critical), and alerts DBAs with recommended mitigation.',
      proposedSolution: 'Centralized telemetry logging capturing all operational errors, thresholds, and security breaches.',
      simulationAction: 'Simulate Telemetry Ingestion',
      outcomeExplanation: 'Operational telemetry logged in audit trail. Critical errors alert administrators with prescriptive mitigation steps.',
      annaUnivTopic: 'Unit IV: Warehouse Administration - Event Logging, Alerting & Audit Trails',
      keyTakeaway: 'The black box flight recorder keeping administrators aware of everything happening in the warehouse.',
    },
    {
      id: 'database',
      managerNumber: 4,
      managerName: 'System Database Manager',
      category: 'System Management',
      icon: Database,
      problemStatement: 'Student information is poorly structured, and unauthorized users could execute UPDATE/DELETE on examination grades or attendance facts.',
      whyRequired: 'Enforces strict relational schemas, metadata dictionary definitions, and Role-Based Access Control (RBAC).',
      proposedSolution: 'Define clean Fact & Dimension catalog schemas, restrict write privileges to DB_ADMIN, and grant SELECT-only to auditors.',
      simulationAction: 'Validate RBAC Boundaries',
      outcomeExplanation: 'Schema catalogs validated. User roles enforced: Guests and Analysts blocked from mutating historical grades.',
      annaUnivTopic: 'Unit IV: Data Warehouse System Management - Database Administration & Security',
      keyTakeaway: 'The gatekeeper of physical tables, metadata dictionaries, and database security roles.',
    },
    {
      id: 'backup',
      managerNumber: 5,
      managerName: 'System Backup Recovery Manager',
      category: 'System Management',
      icon: LifeBuoy,
      problemStatement: 'A catastrophic storage hardware crash strikes the campus server, rendering student academic records inaccessible before NAAC inspection.',
      whyRequired: 'Protects institutional data with point-in-time snapshot freezes and rapid disaster restoration routines.',
      proposedSolution: 'Capture consistent snapshots of all 6 tables and restore the warehouse to a golden baseline after simulated crashes.',
      simulationAction: 'Capture Snapshot Backup',
      outcomeExplanation: 'Point-in-time snapshot generated with checksum. Guaranteed RPO resilience: system can be recovered in seconds.',
      annaUnivTopic: 'Unit IV: System Administration - Backup Strategies & Disaster Recovery',
      keyTakeaway: 'The life insurance policy of the data warehouse that reverses catastrophic losses.',
    },
    {
      id: 'load',
      managerNumber: 6,
      managerName: 'Load Manager (ETL Pipeline)',
      category: 'Process Management',
      icon: HardDriveDownload,
      problemStatement: 'Raw student files arrive from 5 departments with conflicting formats (e.g. "cse" vs "CSE"), duplicate student scans, and null values.',
      whyRequired: 'Executes the core Extract &rarr; Transform &rarr; Load pipeline to cleanse and normalize raw feeds before committing to warehouse.',
      proposedSolution: 'Apply automated deduplication, department capitalization normalization, range validation, and bad-record quarantine.',
      simulationAction: 'Execute Cleanse & Load Pipeline',
      outcomeExplanation: 'ETL Pipeline finished: duplicate keys purged, department names normalized, and pristine facts committed to Fact_Attendance.',
      annaUnivTopic: 'Unit II & IV: ETL Architecture - Extraction, Transformation, Cleansing and Loading',
      keyTakeaway: 'The refinery that turns raw, dirty departmental spreadsheets into clean analytical gold.',
    },
    {
      id: 'warehouse',
      managerNumber: 7,
      managerName: 'Warehouse Manager (Dimensional Modeling)',
      category: 'Process Management',
      icon: Boxes,
      problemStatement: 'Massive flat tables make slicing, dicing, and multi-year historical trend analysis painfully complex and slow.',
      whyRequired: 'Organizes data into Star Schemas with central Fact tables and surrounding Dimensions, and partitions history by Academic Year.',
      proposedSolution: 'Design Star Schema linking Fact_Attendance with Dim_Student, Dim_Department, and partition history into 2021-25 partitions.',
      simulationAction: 'Mount Range Partition',
      outcomeExplanation: 'Star Schema synchronized. Partition pruning enabled: queries for 2024 only scan the active year partition, saving 75% I/O.',
      annaUnivTopic: 'Unit I & IV: Dimensional Modeling - Star Schema, Fact Constellation & Partitioning',
      keyTakeaway: 'The architect of Star Schemas, dimensional cubes, and performance partitions.',
    },
    {
      id: 'query',
      managerNumber: 8,
      managerName: 'Query Manager (Analytical SQL)',
      category: 'Process Management',
      icon: Terminal,
      problemStatement: 'The college Principal wants instant department-wise placement statistics and low-attendance students across thousands of rows.',
      whyRequired: 'Accepts, parses, and executes complex OLAP and SQL analytical queries with sub-second response times.',
      proposedSolution: 'Execute relational JOINs and aggregations over in-memory warehouse tables using AlaSQL engine.',
      simulationAction: 'Execute Placement Analytics SQL',
      outcomeExplanation: 'SQL query executed in 14 ms. Aggregated department offers, average packages, and dream offers across all 5 branches.',
      annaUnivTopic: 'Unit IV: Process Management - Query Management, Execution & Optimization',
      keyTakeaway: 'The query gateway connecting analytical SQL to warehouse data.',
    },
    {
      id: 'tuning',
      managerNumber: 9,
      managerName: 'Tuning Manager (Indexing & Optimization)',
      category: 'Process Management',
      icon: Zap,
      problemStatement: 'A demographic filter query takes 48.5 ms because the database performs an expensive Full Table Scan across all disk pages.',
      whyRequired: 'Identifies query bottlenecks, builds specialized B-Tree and Bitmap indexes, and optimizes memory buffer cache hits.',
      proposedSolution: 'Construct a Bitmap Index on Dim_Student(department_id), converting full sequential scans into index bitwise lookups.',
      simulationAction: 'Construct Bitmap Index & Benchmark',
      outcomeExplanation: 'Bitmap index built. Query latency plummeted from 48.5 ms to 12.2 ms: 75% faster execution with Index Scan plan!',
      annaUnivTopic: 'Unit IV: Tuning and Testing the Data Warehouse - Indexing Strategies & Query Optimization',
      keyTakeaway: 'The performance mechanic that supercharges slow queries with indexes and optimization plans.',
    },
    {
      id: 'testing',
      managerNumber: 10,
      managerName: 'Testing Manager (Quality & Reconciliation)',
      category: 'Process Management',
      icon: CheckCheck,
      problemStatement: 'The source ERP had 60 students, but an unvalidated import loaded only 52 into the warehouse. Executive metrics are missing students.',
      whyRequired: 'Reconciles source vs target row counts, detects duplicate keys, audits null values, and validates referential integrity.',
      proposedSolution: 'Run automated 5-test data quality audit suite, pinpoint faulty rows, and trigger automated duplicate remediation.',
      simulationAction: 'Run Full Data Quality Audit',
      outcomeExplanation: '100% of test cases PASSED! Verified zero duplicates, perfect source reconciliation, and Anna University range compliance.',
      annaUnivTopic: 'Unit IV: Tuning and Testing the Data Warehouse - Data Quality, Completeness & Reconciliation',
      keyTakeaway: 'The quality inspector guaranteeing warehouse metrics are 100% accurate, complete, and trustworthy.',
    },
  ];

  const currentSlide = slides[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setSimulationRan(false);
      setSimulationOutput(null);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setSimulationRan(false);
      setSimulationOutput(null);
    }
  };

  const handleRunSimulation = async () => {
    setSimulationRan(true);

    if (currentSlide.id === 'config') {
      updateServerConfig({ storageAllocatedGb: 2048 });
      setSimulationOutput('SAN Storage Volume expanded to 2048 GB. Storage utilization ratio normalized to 40%.');
    } else if (currentSlide.id === 'scheduling') {
      if (scheduledJobs.length > 0) {
        await runJobManually(scheduledJobs[0].id);
      }
      setSimulationOutput('Job "Daily Biometric Attendance Sync" fired. Attendance batch loaded into Fact_Attendance.');
    } else if (currentSlide.id === 'load') {
      const res = runETL('attendance_batch_valid');
      setSimulationOutput(`Load Manager parsed raw CSV: Cleansed and loaded ${res.loaded} records into Fact_Attendance.`);
    } else if (currentSlide.id === 'backup') {
      const snap = createBackup('Presentation Demo Snapshot');
      setSimulationOutput(`Snapshot "${snap.id}" frozen with ${snap.recordCount} records across all 6 warehouse entities.`);
    } else if (currentSlide.id === 'query') {
      const q = executeQuery('SELECT department_id, COUNT(*) as offers, ROUND(AVG(package_lpa), 2) as avg_pkg FROM Fact_Placement GROUP BY department_id');
      setSimulationOutput(`Query executed in ${q.executionTimeMs} ms: Yielded ${q.rowCount} departmental placement metrics.`);
    } else if (currentSlide.id === 'tuning') {
      createIndex('Dim_Student', 'department_id', 'Bitmap');
      setSimulationOutput('Bitmap Index active on department_id. Converted Full Table Scan to Bitmap Index Scan (~4x faster).');
    } else if (currentSlide.id === 'testing') {
      const tests = runDataQualityTests();
      setSimulationOutput(`Audit Suite Complete: ${tests.filter((t: any) => t.status === 'PASS').length} of ${tests.length} tests PASSED.`);
    } else {
      setSimulationOutput(currentSlide.outcomeExplanation);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Presentation Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-lg">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">
              Seminar Presentation Mode • Anna Univ R2021
            </div>
            <h1 className="text-lg font-black tracking-tight text-white">
              PSG iTech College Data Warehouse Simulator
            </h1>
          </div>
        </div>

        {/* Manager Quick Switcher Pills */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentSlideIndex(idx);
                setSimulationRan(false);
                setSimulationOutput(null);
              }}
              className={`w-7 h-7 rounded-xl text-xs font-bold font-mono transition flex items-center justify-center ${
                currentSlideIndex === idx
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={s.managerName}
            >
              {s.managerNumber}
            </button>
          ))}
        </div>

        {/* Exit Presentation */}
        <Link
          to="/"
          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition"
        >
          Exit to Dashboard
        </Link>
      </div>

      {/* Main Slide Content (Large Text for Projectors) */}
      <div className="max-w-6xl mx-auto w-full my-6 space-y-6">
        {/* Slide Header & Manager Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-400/30">
              <currentSlide.icon className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
                MODULE {currentSlide.managerNumber} OF 10 • {currentSlide.category}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-0.5">
                {currentSlide.managerName}
              </h2>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            Syllabus: {currentSlide.annaUnivTopic.split(':')[0]}
          </span>
        </div>

        {/* One-Line Key Takeaway Card */}
        <div className="bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-l-4 border-blue-500 p-4 rounded-r-2xl">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-blue-400 shrink-0" />
            <div className="text-sm sm:text-base font-semibold text-blue-100">
              <strong className="text-blue-400 uppercase font-mono text-xs mr-2">Key Takeaway:</strong>
              {currentSlide.keyTakeaway}
            </div>
          </div>
        </div>

        {/* Grid: 1. Problem -> 2. Why Required -> 3. Solution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Problem */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block font-mono">
              1. The Real Problem
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentSlide.problemStatement}
            </p>
          </div>

          {/* Card 2: Why Required */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block font-mono">
              2. Why Manager is Required
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentSlide.whyRequired}
            </p>
          </div>

          {/* Card 3: Proposed Solution */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block font-mono">
              3. Architectural Solution
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentSlide.proposedSolution}
            </p>
          </div>
        </div>

        {/* Interactive Live Simulation Stage */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                Live Classroom Demonstration Action
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Perform Actual Simulation on PSG iTech Shared State
              </h3>
            </div>
            <button
              onClick={handleRunSimulation}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-lg shadow-blue-500/20 transition flex items-center space-x-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Perform: {currentSlide.simulationAction}</span>
            </button>
          </div>

          {/* Rich Visual Presentation Outcome */}
          {simulationRan && (
            <div className="space-y-3 pt-2">
              <VisualOutcomeCard managerId={currentSlide.id} />
              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  <strong>Explanation for Students:</strong> {currentSlide.outcomeExplanation}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Presenter Controls */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-4 max-w-6xl mx-auto w-full">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-30 border border-slate-800 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Manager</span>
        </button>

        <span className="text-xs font-mono text-slate-400">
          Slide {currentSlideIndex + 1} of {slides.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === slides.length - 1}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 rounded-xl text-xs font-bold shadow transition flex items-center space-x-1.5"
        >
          <span>Next Manager</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
