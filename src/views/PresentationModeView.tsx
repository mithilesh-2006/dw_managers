import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { VisualOutcomeCard } from '../components/presentation/VisualOutcomeCard';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  CheckCircle2,
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
  BookOpen,
  Home,
  Layers,
  GraduationCap,
  MessageSquare,
  HelpCircle,
  Clock,
  Activity,
  Workflow,
  ShieldCheck,
} from 'lucide-react';

export const PresentationModeView: React.FC = () => {
  const navigate = useNavigate();
  const {
    updateServerConfig,
    scheduledJobs,
    runJobManually,
    runETL,
    createBackup,
    executeQuery,
    createIndex,
    runDataQualityTests,
  } = useSimulation();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [simulationRan, setSimulationRan] = useState(false);
  const [simulationOutput, setSimulationOutput] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [autoRunDemo, setAutoRunDemo] = useState(true);

  // Define total slides:
  // 0: Seminar Title & Agenda
  // 1-10: The 10 Managers
  // 11: End-to-End Grand Architecture (All 10 Working Together)
  // 12: Seminar Conclusion & Q&A
  const TOTAL_SLIDES = 13;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleNext = useCallback(() => {
    if (currentSlideIndex < TOTAL_SLIDES - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setSimulationRan(false);
      setSimulationOutput(null);
    }
  }, [currentSlideIndex, TOTAL_SLIDES]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setSimulationRan(false);
      setSimulationOutput(null);
    }
  }, [currentSlideIndex]);

  const runManagerSimulation = useCallback(async (managerId: string) => {
    setSimulationRan(true);

    if (managerId === 'config') {
      updateServerConfig({ storageAllocatedGb: 2048 });
      setSimulationOutput('SAN Storage expanded to 2048 GB (+512 GB). Free space increased to 1228 GB.');
    } else if (managerId === 'scheduling') {
      if (scheduledJobs.length > 0) {
        await runJobManually(scheduledJobs[0].id);
      }
      setSimulationOutput('Midnight cron job fired at 23:30. 60 attendance records committed with 0% daytime slowdown.');
    } else if (managerId === 'event') {
      setSimulationOutput('Failure captured in audit log: Event EVT-BATCH-ERR classified as ERROR with alert sent to admin.');
    } else if (managerId === 'database') {
      setSimulationOutput('RBAC verified: Admin granted write access; Guest write request blocked with Permission Denied.');
    } else if (managerId === 'backup') {
      const snap = createBackup('Seminar Presentation Snapshot');
      setSimulationOutput(`Golden snapshot ${snap.id} frozen with ${snap.recordCount} records. Disaster Recovery ready.`);
    } else if (managerId === 'load') {
      const res = runETL('attendance_batch_valid');
      setSimulationOutput(`ETL complete: 7 raw records extracted, 6 clean records loaded, 1 duplicate quarantined.`);
    } else if (managerId === 'warehouse') {
      setSimulationOutput('Star Schema initialized with 4 Year Partitions. Partition pruning eliminates 75% of disk reads.');
    } else if (managerId === 'query') {
      const q = executeQuery('SELECT department_id, COUNT(*) as offers, ROUND(AVG(package_lpa), 2) as avg_pkg FROM Fact_Placement GROUP BY department_id');
      setSimulationOutput(`Analytics SQL executed in ${q.executionTimeMs} ms: Department placement statistics returned to Principal.`);
    } else if (managerId === 'tuning') {
      createIndex('Dim_Student', 'department_id', 'Bitmap');
      setSimulationOutput('Bitmap Index active on department_id: Query benchmark accelerated from 48.5 ms to 12.2 ms (4x faster).');
    } else if (managerId === 'testing') {
      const tests = runDataQualityTests();
      setSimulationOutput(`Quality audit passed: ${tests.filter((t: any) => t.status === 'PASS').length} of ${tests.length} tests verified.`);
    }
  }, [createBackup, createIndex, executeQuery, runDataQualityTests, runETL, runJobManually, scheduledJobs, updateServerConfig]);

  // Keyboard navigation for presentation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowSpeakerNotes((prev) => !prev);
      } else if (e.key === 'd' || e.key === 'D' || e.key === 'Enter') {
        // Run demo simulation if on a manager slide
        if (currentSlideIndex >= 1 && currentSlideIndex <= 10) {
          e.preventDefault();
          const managerIds = ['config', 'scheduling', 'event', 'database', 'backup', 'load', 'warehouse', 'query', 'tuning', 'testing'];
          runManagerSimulation(managerIds[currentSlideIndex - 1]);
        }
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          navigate('/');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, handleNext, handlePrev, navigate, runManagerSimulation]);

  // Auto-run simulation when switching to a manager slide if enabled
  useEffect(() => {
    if (autoRunDemo && currentSlideIndex >= 1 && currentSlideIndex <= 10) {
      const timer = setTimeout(() => {
        const managerIds = ['config', 'scheduling', 'event', 'database', 'backup', 'load', 'warehouse', 'query', 'tuning', 'testing'];
        runManagerSimulation(managerIds[currentSlideIndex - 1]);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentSlideIndex, autoRunDemo, runManagerSimulation]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between select-none">
      {/* Top Presentation Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black tracking-widest text-blue-400 font-mono uppercase">
                Anna Univ R2021 Seminar
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700">
                Data Warehousing
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
              DW Control Center: 10 Managers Visualizer Demo
            </h1>
          </div>
        </div>

        {/* Slide navigation quick jump pills */}
        <div className="hidden xl:flex items-center space-x-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setCurrentSlideIndex(0)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              currentSlideIndex === 0 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Intro
          </button>
          {Array.from({ length: 10 }).map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => setCurrentSlideIndex(idx + 1)}
              className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center ${
                currentSlideIndex === idx + 1
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title={`Manager ${idx + 1}`}
            >
              #{idx + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentSlideIndex(11)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              currentSlideIndex === 11 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Big Picture
          </button>
          <button
            onClick={() => setCurrentSlideIndex(12)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
              currentSlideIndex === 12 ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Summary
          </button>
        </div>

        {/* Top Control Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Speaker Notes Toggle */}
          <button
            onClick={() => setShowSpeakerNotes((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 border ${
              showSpeakerNotes
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
            title="Toggle Speaker Presentation Script (N)"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speaker Notes</span>
          </button>

          {/* Auto-Demo Toggle */}
          <button
            onClick={() => setAutoRunDemo((prev) => !prev)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 border ${
              autoRunDemo
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border-slate-800'
            }`}
            title="Toggle Auto-running simulation on slide change"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Auto-Demo: {autoRunDemo ? 'ON' : 'OFF'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Exit Button */}
          <Link
            to="/"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition flex items-center space-x-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </Link>
        </div>
      </div>

      {/* Main Slide Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 flex flex-col justify-center">
        {currentSlideIndex === 0 && <SlideIntro onStart={() => setCurrentSlideIndex(1)} />}

        {currentSlideIndex >= 1 && currentSlideIndex <= 10 && (
          <SlideManager
            managerNumber={currentSlideIndex}
            simulationRan={simulationRan}
            simulationOutput={simulationOutput}
            onRunSimulation={runManagerSimulation}
          />
        )}

        {currentSlideIndex === 11 && <SlideBigPicture />}

        {currentSlideIndex === 12 && <SlideSummary onRestart={() => setCurrentSlideIndex(0)} />}
      </div>

      {/* Collapsible Speaker Notes Drawer */}
      {showSpeakerNotes && (
        <div className="bg-slate-900 border-t border-amber-500/40 p-4 max-w-7xl mx-auto w-full animate-in slide-in-from-bottom">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" />
              Speaker Notes • What to explain to the seminar audience
            </span>
            <span className="text-[11px] text-slate-400">Press 'N' to close</span>
          </div>
          <SpeakerNotesContent slideIndex={currentSlideIndex} />
        </div>
      )}

      {/* Bottom Presenter Navigation Bar */}
      <div className="bg-slate-900/95 border-t border-slate-800 px-6 py-3 flex items-center justify-between sticky bottom-0 z-30">
        <button
          onClick={handlePrev}
          disabled={currentSlideIndex === 0}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous (Left Arrow)</span>
        </button>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono font-bold text-slate-400">
            Slide <span className="text-white font-extrabold">{currentSlideIndex + 1}</span> of {TOTAL_SLIDES}
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Use <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-[10px] font-mono">←</kbd>{' '}
            <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700 text-[10px] font-mono">→</kbd> keys
            to navigate
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={currentSlideIndex === TOTAL_SLIDES - 1}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 rounded-xl text-xs font-bold shadow-md transition flex items-center space-x-1.5 text-white"
        >
          <span>Next (Right Arrow)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SLIDE 0: TITLE & AGENDA INTRO                                              */
/* -------------------------------------------------------------------------- */
const SlideIntro: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="text-center max-w-4xl mx-auto py-8 space-y-8 animate-in fade-in duration-500">
      <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest font-mono">
        <GraduationCap className="w-4 h-4 text-blue-400" />
        <span>Anna University R2021 Syllabus • Unit IV Presentation Seminar</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Data Warehouse <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
            System & Process Management
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-300 font-medium">
          A Live Interactive Simulation of All 10 Data Warehouse Managers
        </p>
      </div>

      {/* Case Study Callout */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl max-w-2xl mx-auto text-left flex items-start space-x-4 shadow-xl">
        <div className="p-3 rounded-xl bg-blue-600/30 text-blue-400 shrink-0">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Case Study: PSG iTech College Data Warehouse
          </span>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
            Managing student information, academic attendance, semester marks, department placements, and faculty
            records across CSE, ECE, EEE, IT, and MECH departments.
          </p>
        </div>
      </div>

      {/* Agenda Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left">
        <div className="p-4 bg-blue-950/40 rounded-xl border border-blue-500/30">
          <div className="text-xs font-mono font-bold uppercase text-blue-400 mb-1">
            Part 1: System Management (5 Managers)
          </div>
          <p className="text-xs text-slate-300">
            Configuration, Scheduling, Event Logging, Database Administration, and Backup Disaster Recovery.
          </p>
        </div>
        <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
          <div className="text-xs font-mono font-bold uppercase text-emerald-400 mb-1">
            Part 2: Process Management (5 Managers)
          </div>
          <p className="text-xs text-slate-300">
            Load Manager (ETL), Warehouse Manager (Star Schema), Query Manager (SQL), Tuning (Indexes), and Testing.
          </p>
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={onStart}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-extrabold shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center space-x-2"
        >
          <span>Start Presentation Deck (12 Slides)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SLIDES 1-10: INDIVIDUAL MANAGER DEMO SLIDE                                 */
/* -------------------------------------------------------------------------- */
interface SlideManagerProps {
  managerNumber: number;
  simulationRan: boolean;
  simulationOutput: string | null;
  onRunSimulation: (id: string) => void;
}

const MANAGERS_META = [
  {
    id: 'config',
    number: 1,
    name: 'System Configuration Manager',
    category: 'System Management',
    icon: Cpu,
    problem: 'Storage and memory limits are almost exhausted. Incoming batches of student records risk out-of-disk crashes.',
    whyRequired: 'Dynamically manages server storage limits, RAM buffer cache, and prevents catastrophic disk-full errors.',
    solution: 'Allocate +512 GB from enterprise SAN storage, expanding allocation to 2048 GB with 16 GB buffer memory.',
    actionName: 'Expand Storage Allocation to 2048 GB',
    annaUnivUnit: 'Unit IV: System Management - Configuration & Resource Allocation',
    takeaway: 'The hardware controller guaranteeing the warehouse never runs out of disk or memory.',
  },
  {
    id: 'scheduling',
    number: 2,
    name: 'System Scheduling Manager',
    category: 'System Management',
    icon: CalendarClock,
    problem: 'Manual biometric uploads during working hours lock database tables, slowing down staff and college users.',
    whyRequired: 'Orchestrates batch workflows to execute automatically during off-peak midnight windows (23:30).',
    solution: 'Schedule automated midnight cron jobs so heavy data ingestion runs with 0% daytime impact.',
    actionName: 'Trigger Midnight Attendance Job',
    annaUnivUnit: 'Unit IV: Process Management - Scheduling Batch Processing & Maintenance',
    takeaway: 'The automated alarm clock ensuring heavy ingestion runs during off-peak hours.',
  },
  {
    id: 'event',
    number: 3,
    name: 'System Event Manager',
    category: 'System Management',
    icon: BellRing,
    problem: 'A background data loading task fails silently at 2:00 AM, resulting in empty reports for the Dean.',
    whyRequired: 'Captures every warning, failure, or security breach in real time and immediately alerts the administrator.',
    solution: 'Log event in audit trail, classify severity (Error), and send instant alert with prescribed remediation.',
    actionName: 'Simulate Telemetry Failure Detection',
    annaUnivUnit: 'Unit IV: System Administration - Event Logging, Alerting & Audit Trails',
    takeaway: 'The black-box flight recorder keeping administrators aware of every system error.',
  },
  {
    id: 'database',
    number: 4,
    name: 'System Database Manager',
    category: 'System Management',
    icon: Database,
    problem: 'Unauthorized users attempt to modify or delete student examination records directly in tables.',
    whyRequired: 'Enforces table columns, data dictionaries, and strict Role-Based Access Control (RBAC) permissions.',
    solution: 'Grant full write access to DB_ADMIN while strictly blocking Guest and Analyst write requests.',
    actionName: 'Enforce RBAC Access Boundaries',
    annaUnivUnit: 'Unit IV: Data Warehouse Administration - Database Security & Schemas',
    takeaway: 'The security gatekeeper protecting table structures and enforcing access rights.',
  },
  {
    id: 'backup',
    number: 5,
    name: 'System Backup Recovery Manager',
    category: 'System Management',
    icon: LifeBuoy,
    problem: 'A catastrophic server crash strikes the campus hardware, taking all student marks offline.',
    whyRequired: 'Takes point-in-time snapshot freezes and re-hydrates the entire database with zero data loss.',
    solution: 'Mount clean golden snapshot BAK-001 and restore all tables back to 100% operational state.',
    actionName: 'Capture & Restore Golden Snapshot',
    annaUnivUnit: 'Unit IV: System Management - Backup Strategies & Disaster Recovery',
    takeaway: 'The life insurance policy of the data warehouse that reverses server crashes.',
  },
  {
    id: 'load',
    number: 6,
    name: 'Load Manager (ETL Pipeline)',
    category: 'Process Management',
    icon: HardDriveDownload,
    problem: 'Raw attendance CSV files contain duplicate student scans, formatting typos, and corrupted entries.',
    whyRequired: 'Executes the core ETL pipeline: Extract from files, Transform & clean duplicates, and Load clean rows.',
    solution: 'Clean 7 raw records: quarantine 1 duplicate student ID and load 6 valid records into Fact_Attendance.',
    actionName: 'Run Extract, Cleanse & Load (ETL)',
    annaUnivUnit: 'Unit II & IV: ETL Architecture - Extraction, Transformation, Cleansing and Loading',
    takeaway: 'The refinery that cleans raw, messy spreadsheets into clean warehouse facts.',
  },
  {
    id: 'warehouse',
    number: 7,
    name: 'Warehouse Manager (Star Schema)',
    category: 'Process Management',
    icon: Boxes,
    problem: 'Historical attendance records from multiple years are unorganized, making historical searches slow.',
    whyRequired: 'Designs Star Schemas (Facts & Dimensions) and divides large tables into academic year partitions.',
    solution: 'Link Fact_Attendance with Dim_Student and enable year partitions (skipping 75% irrelevant data).',
    actionName: 'Mount Year Partitions & Star Schema',
    annaUnivUnit: 'Unit I & IV: Dimensional Modeling - Star Schema & Table Partitioning',
    takeaway: 'The architect arranging numbers into Star Schemas and year partitions.',
  },
  {
    id: 'query',
    number: 8,
    name: 'Query Manager (Analytical SQL)',
    category: 'Process Management',
    icon: Terminal,
    problem: 'The college Principal needs department-wise average placement salaries calculated instantly.',
    whyRequired: 'Parses complex SQL statements, executes in-memory aggregations, and returns sub-second summaries.',
    solution: 'Execute SELECT department_id, AVG(package_lpa)... returning IT, CSE, ECE, MECH averages in 14 ms.',
    actionName: 'Execute Analytical SQL Aggregation',
    annaUnivUnit: 'Unit IV: Process Management - Query Management, Parsing & Execution',
    takeaway: 'The search engine translating analytical questions into instant executive reports.',
  },
  {
    id: 'tuning',
    number: 9,
    name: 'Tuning Manager (Indexing)',
    category: 'Process Management',
    icon: Zap,
    problem: 'A filter query takes 48.5 ms because the database performs an expensive Full Table Scan across all disk pages.',
    whyRequired: 'Identifies performance bottlenecks and constructs Bitmap and B-Tree indexes for fast pointer lookups.',
    solution: 'Build Bitmap Index on department_id, dropping execution time from 48.5 ms down to 12.2 ms (4x faster).',
    actionName: 'Construct Bitmap Index & Benchmark',
    annaUnivUnit: 'Unit IV: Tuning & Testing - Bitmap & B-Tree Indexing Strategies',
    takeaway: 'The performance mechanic that supercharges slow queries with indexes.',
  },
  {
    id: 'testing',
    number: 10,
    name: 'Testing Manager (Quality & Reconciliation)',
    category: 'Process Management',
    icon: CheckCheck,
    problem: 'Source ERP portal has 60 students, but only 52 records appear in the warehouse after loading.',
    whyRequired: 'Reconciles source vs target row counts, verifies unique keys, checks null values, and validates integrity.',
    solution: 'Execute 5 automated data quality tests, pinpoint 8 missing IDs, and achieve 100% test pass rate.',
    actionName: 'Run 5 Data Quality Audit Tests',
    annaUnivUnit: 'Unit IV: Tuning & Testing - Data Quality, Completeness & Reconciliation',
    takeaway: 'The quality inspector guaranteeing warehouse numbers are 100% accurate and trustworthy.',
  },
];

const SlideManager: React.FC<SlideManagerProps> = ({
  managerNumber,
  simulationRan,
  simulationOutput,
  onRunSimulation,
}) => {
  const meta = MANAGERS_META[managerNumber - 1];
  const Icon = meta.icon;
  const isSystem = meta.category === 'System Management';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
              isSystem ? 'bg-blue-600' : 'bg-emerald-600'
            }`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                MODULE #{meta.number} OF 10
              </span>
              <span className="text-slate-600">•</span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  isSystem ? 'bg-blue-900/60 text-blue-300' : 'bg-emerald-900/60 text-emerald-300'
                }`}
              >
                {meta.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
              {meta.name}
            </h2>
          </div>
        </div>

        {/* Syllabus Tag & Demo Action Button */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 hidden lg:inline-block">
            {meta.annaUnivUnit}
          </span>
          <button
            onClick={() => onRunSimulation(meta.id)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center space-x-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{simulationRan ? 'Run Again' : meta.actionName}</span>
          </button>
        </div>
      </div>

      {/* Key Takeaway Banner */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-l-4 border-blue-500 p-3.5 rounded-r-xl">
        <div className="flex items-center space-x-2.5 text-xs sm:text-sm">
          <Lightbulb className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-blue-300 font-bold uppercase font-mono text-xs">Summary:</span>
          <span className="text-slate-200 font-medium">{meta.takeaway}</span>
        </div>
      </div>

      {/* 3-Card Concept Breakdown: 1. Problem -> 2. Why Required -> 3. Solution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block font-mono">
            1. The Problem
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{meta.problem}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block font-mono">
            2. Why Required
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{meta.whyRequired}</p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block font-mono">
            3. Architectural Solution
          </span>
          <p className="text-xs text-slate-300 leading-relaxed">{meta.solution}</p>
        </div>
      </div>

      {/* Visual Outcome Card & Chart */}
      <div className="space-y-3">
        <VisualOutcomeCard managerId={meta.id} />

        {simulationOutput && (
          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-emerald-300">Live Simulation Result:</strong> {simulationOutput}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SLIDE 11: GRAND END-TO-END VISUAL ARCHITECTURE                             */
/* -------------------------------------------------------------------------- */
const SlideBigPicture: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="text-center space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">
          The Grand Architecture • End-to-End Synergy
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight">
          How All 10 Managers Work Together in a Data Warehouse
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
          In a live Data Warehouse, managers do not work in isolation. Here is the exact end-to-end operational cycle
          when new semester data arrives.
        </p>
      </div>

      {/* 4-Phase End-to-End Cycle Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Phase 1 */}
        <div className="bg-slate-900 border border-blue-500/40 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-400">PHASE 1</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="font-bold text-sm text-white">Trigger & Resource Prep</h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-blue-400">#2 Scheduling:</span>
              <span>Reaches 11:30 PM off-peak maintenance window.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-blue-400">#1 Config:</span>
              <span>Reserves 16 GB buffer memory & ensures free disk space.</span>
            </li>
          </ul>
        </div>

        {/* Phase 2 */}
        <div className="bg-slate-900 border border-purple-500/40 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-purple-400">PHASE 2</span>
            <HardDriveDownload className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="font-bold text-sm text-white">Ingestion & Security</h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-purple-400">#6 Load:</span>
              <span>Extracts raw CSV, cleans typos, deduplicates student IDs.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-purple-400">#4 Database:</span>
              <span>Validates RBAC write permissions before commit.</span>
            </li>
          </ul>
        </div>

        {/* Phase 3 */}
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-emerald-400">PHASE 3</span>
            <Boxes className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="font-bold text-sm text-white">Structuring & Resilience</h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-emerald-400">#7 Warehouse:</span>
              <span>Inserts into Fact_Attendance & year partitions.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-emerald-400">#5 Backup:</span>
              <span>Freezes golden snapshot BAK-001 for disaster recovery.</span>
            </li>
          </ul>
        </div>

        {/* Phase 4 */}
        <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-amber-400">PHASE 4</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <h3 className="font-bold text-sm text-white">Quality, Speed & Queries</h3>
          <ul className="text-xs text-slate-300 space-y-2">
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-amber-400">#10 Testing:</span>
              <span>Audits row counts & runs 5 data quality rules.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-amber-400">#9 Tuning:</span>
              <span>Rebuilds Bitmap indexes for 4x faster lookup.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-amber-400">#8 Query:</span>
              <span>Delivers sub-second analytics to Principal & Dean.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-amber-400">#3 Event:</span>
              <span>Logs telemetry & audit trails across all stages.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center text-xs text-slate-300">
        💡 <strong className="text-white">Anna University Exam Tip:</strong> When asked how managers interact, divide
        your answer into these 4 stages: Resource Scheduling $\rightarrow$ ETL & Ingestion $\rightarrow$ Storage &
        Backup $\rightarrow$ Querying & Quality Audit.
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SLIDE 12: SEMINAR SUMMARY & Q&A                                            */
/* -------------------------------------------------------------------------- */
const SlideSummary: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  return (
    <div className="text-center max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
        <CheckCircle2 className="w-4 h-4" />
        <span>Seminar Conclusion & Key Learnings</span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-white">
        System Management vs Process Management
      </h2>

      {/* Comparison Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden text-left text-xs">
        <div className="grid grid-cols-2 bg-slate-950 p-3.5 border-b border-slate-800 font-bold font-mono">
          <div className="text-blue-400">System Management (Managers 1–5)</div>
          <div className="text-emerald-400">Process Management (Managers 6–10)</div>
        </div>
        <div className="divide-y divide-slate-800">
          <div className="grid grid-cols-2 p-3 text-slate-300">
            <div>Focuses on hardware, storage, and server uptime.</div>
            <div>Focuses on data cleansing, modeling, and queries.</div>
          </div>
          <div className="grid grid-cols-2 p-3 text-slate-300">
            <div>Operates at the infrastructure and OS boundary.</div>
            <div>Operates on tables, ETL feeds, and SQL logic.</div>
          </div>
          <div className="grid grid-cols-2 p-3 text-slate-300">
            <div>Protects against crashes, disk-full, and intruders.</div>
            <div>Guarantees query speed, zero duplicates, and reports.</div>
          </div>
          <div className="grid grid-cols-2 p-3 text-slate-300 font-medium">
            <div className="text-blue-300">Configuration, Scheduling, Event, Database, Backup</div>
            <div className="text-emerald-300">Load, Warehouse, Query, Tuning, Testing</div>
          </div>
        </div>
      </div>

      {/* Discussion Prompts */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 text-left space-y-2">
        <span className="text-xs font-mono font-bold text-amber-400 uppercase">
          Seminar Discussion & Viva Questions:
        </span>
        <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
          <li>Why does the Scheduling Manager run ETL at midnight rather than in real time during college hours?</li>
          <li>What is the difference between Bitmap Indexing (Tuning Manager) and B-Tree Indexing?</li>
          <li>How does partition pruning in Warehouse Manager save 75% of disk read input/output?</li>
        </ul>
      </div>

      <div className="pt-2 flex justify-center space-x-3">
        <button
          onClick={onRestart}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart Presentation from Slide 1</span>
        </button>
        <Link
          to="/"
          className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>Return to Visualizer Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* SPEAKER NOTES SCRIPT COMPONENT                                             */
/* -------------------------------------------------------------------------- */
const SpeakerNotesContent: React.FC<{ slideIndex: number }> = ({ slideIndex }) => {
  const notes = [
    {
      title: 'Introduction Slide',
      sayThis: 'Introduce the seminar topic: Data Warehousing System and Process Management under Unit IV of Anna University R2021. Explain that we are using a real college case study (PSG iTech) to demonstrate how all 10 managers work together.',
      analogy: 'A Data Warehouse is like an airport control tower — without proper traffic controllers, flights (data) will collide or crash.',
    },
    {
      title: 'Manager 1: System Configuration Manager',
      sayThis: 'Explain that the college warehouse was running low on storage (only 716 GB free). Point to the live simulation expanding allocation to 2048 GB with 16 GB RAM buffer pool.',
      analogy: 'Like upgrading from a 64 GB phone to a 256 GB phone so your video recordings do not crash halfway through.',
    },
    {
      title: 'Manager 2: System Scheduling Manager',
      sayThis: 'Highlight why we cannot load attendance during the day (it locks tables). Show the 24-hour timeline chart: daytime is 100% reserved for users, while the batch loader fires automatically at 11:30 PM.',
      analogy: 'Like scheduling a phone operating system update to install at 2:00 AM while you are asleep.',
    },
    {
      title: 'Manager 3: System Event Manager',
      sayThis: 'Discuss the problem of silent failures. When a midnight network drops, this manager captures the error, tags it as ERROR severity, and alerts the administrator immediately.',
      analogy: 'The black-box flight recorder and alarm bell of the warehouse.',
    },
    {
      title: 'Manager 4: System Database Manager',
      sayThis: 'Explain Role-Based Access Control (RBAC). Point to the permission matrix chart: Admin has write privileges, but unauthorized Guest accounts are blocked from tampering with marks.',
      analogy: 'Security badges in an office: only managers can enter the vault, visitors are read-only.',
    },
    {
      title: 'Manager 5: System Backup Recovery Manager',
      sayThis: 'Demonstrate disaster recovery. Show the timeline: 100% before crash, 0% during crash, and 100% restored after mounting snapshot BAK-001.',
      analogy: 'System Restore point in Windows or an iCloud backup for your smartphone.',
    },
    {
      title: 'Manager 6: Load Manager (ETL Pipeline)',
      sayThis: 'Explain Extract, Transform, Load. Point to the ETL funnel chart: 7 raw records extracted from campus scanners, 1 duplicate student ID quarantined, and 6 clean records loaded.',
      analogy: 'An oil refinery taking crude oil and removing impurities before delivering petrol.',
    },
    {
      title: 'Manager 7: Warehouse Manager (Dimensional Modeling)',
      sayThis: 'Show how flat tables are organized into a central Fact_Attendance connected to Dim_Student and Dim_Department. Point to the chart: partition pruning reads only the 2024 partition, saving 75% disk work.',
      analogy: 'Filing college records in 4 labeled folders (2021, 2022, 2023, 2024) instead of dumping them all into one massive box.',
    },
    {
      title: 'Manager 8: Query Manager (Analytical SQL)',
      sayThis: 'Explain how the Principal’s SQL query is parsed and executed in 14 milliseconds, returning department-wise placement package averages (IT 16.5 LPA, CSE 13.5 LPA).',
      analogy: 'Google search for your enterprise database: parses the question, groups results, and calculates averages instantly.',
    },
    {
      title: 'Manager 9: Tuning Manager (Indexing)',
      sayThis: 'Contrast Full Table Scan with Index Scan. Show the benchmark: searching without index took 48.5 ms; building a Bitmap Index dropped latency to 12.2 ms (4x faster).',
      analogy: 'The index at the back of a 500-page textbook: jumping straight to page 142 instead of reading every page from page 1.',
    },
    {
      title: 'Manager 10: Testing Manager (Quality Audit)',
      sayThis: 'Explain data reconciliation. The source portal had 60 students but warehouse only showed 52. Testing Manager pinpoints the 8 missing IDs and verifies all 5 quality tests at 100%.',
      analogy: 'Quality control inspector at an automobile factory inspecting every car before it leaves the assembly line.',
    },
    {
      title: 'End-to-End Grand Architecture',
      sayThis: 'Walk through the 4 phases: Scheduling triggers at 11:30 PM -> Config prepares buffer -> Load extracts and cleans -> Database checks RBAC -> Warehouse partitions -> Backup snapshots -> Testing verifies -> Tuning accelerates -> Query serves Dean.',
      analogy: 'A well-rehearsed symphony orchestra where every musician plays their part in harmony.',
    },
    {
      title: 'Conclusion & Summary',
      sayThis: 'Summarize the core exam distinction: System Management handles infrastructure and security; Process Management handles ETL, modeling, and queries.',
      analogy: 'Hardware vs Software in computer systems.',
    },
  ];

  const note = notes[slideIndex] || notes[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
        <span className="text-blue-400 font-bold block mb-1">🗣️ What to Say to the Audience:</span>
        <p className="text-slate-300 leading-relaxed font-sans">{note.sayThis}</p>
      </div>
      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
        <span className="text-amber-400 font-bold block mb-1">💡 Real-World Analogy to Use:</span>
        <p className="text-slate-300 leading-relaxed font-sans">{note.analogy}</p>
      </div>
    </div>
  );
};
