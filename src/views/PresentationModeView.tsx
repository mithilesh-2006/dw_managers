import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSimulation } from '../context/SimulationContext';
import { MANAGERS_DATA, ManagerScenario } from '../data/visualizerData';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  CheckCircle2,
  Play,
  ArrowRight,
  Lightbulb,
  BookOpen,
  Home,
  GraduationCap,
  Clock,
  HardDriveDownload,
  Boxes,
  Zap,
  Activity,
  AlertTriangle,
  HelpCircle,
  Database,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
  Legend,
} from 'recharts';

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
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Total slides: 0 (Intro), 1-10 (Managers), 11 (Big Picture), 12 (Summary)
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
    }
  }, [currentSlideIndex, TOTAL_SLIDES]);

  const handlePrev = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  }, [currentSlideIndex]);

  // Keyboard navigation
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
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          navigate('/');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, navigate]);

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
              DW Control Center: Presentation Demo
            </h1>
          </div>
        </div>

        {/* Slide quick jump pills */}
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
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit to Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Main Slide Body */}
      <div className="flex-1 max-w-[1500px] mx-auto w-full px-4 sm:px-6 py-5 flex flex-col justify-center">
        {currentSlideIndex === 0 && <SlideIntro onStart={() => setCurrentSlideIndex(1)} />}

        {currentSlideIndex >= 1 && currentSlideIndex <= 10 && (
          <SlideManager
            key={currentSlideIndex}
            managerNumber={currentSlideIndex}
            onSystemAction={{
              updateServerConfig,
              scheduledJobs,
              runJobManually,
              runETL,
              createBackup,
              executeQuery,
              createIndex,
              runDataQualityTests,
            }}
          />
        )}

        {currentSlideIndex === 11 && <SlideBigPicture />}

        {currentSlideIndex === 12 && <SlideSummary onRestart={() => setCurrentSlideIndex(0)} />}
      </div>

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
            Educational Content on <strong>LEFT</strong> • Click <strong>RUN LIVE SIMULATION</strong> on <strong>RIGHT</strong>
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
/* SLIDES 1-10: INDIVIDUAL MANAGER SLIDE (LEFT: CONTENT, RIGHT: SIMULATION)   */
/* -------------------------------------------------------------------------- */
interface SlideManagerProps {
  managerNumber: number;
  onSystemAction: any;
}

const MANAGERS_ORDER = [
  'config',
  'scheduling',
  'event',
  'database',
  'backup',
  'load',
  'warehouse',
  'query',
  'tuning',
  'testing',
];

const SYLLABUS_UNITS: Record<string, string> = {
  config: 'Unit IV: System Management - Configuration & Resource Limits',
  scheduling: 'Unit IV: Process Management - Scheduling Batch Processing',
  event: 'Unit IV: System Administration - Event Logging & Audit Trails',
  database: 'Unit IV: Data Warehouse Administration - Database Security & RBAC',
  backup: 'Unit IV: System Management - Backup & Disaster Recovery',
  load: 'Unit II & IV: ETL Architecture - Extraction, Cleaning & Loading',
  warehouse: 'Unit I & IV: Dimensional Modeling - Star Schema & Partitioning',
  query: 'Unit IV: Process Management - Query Management & Execution',
  tuning: 'Unit IV: Tuning & Testing - Bitmap & B-Tree Indexing Strategies',
  testing: 'Unit IV: Tuning & Testing - Data Quality & Reconciliation',
};

const SlideManager: React.FC<SlideManagerProps> = ({
  managerNumber,
  onSystemAction,
}) => {
  const managerId = MANAGERS_ORDER[managerNumber - 1];
  const manager: ManagerScenario = MANAGERS_DATA[managerId];
  const Icon = manager.icon;
  const isSystem = manager.category === 'System Manager';

  // Simulation Animation State: 'idle' | 'input_flowing' | 'step1' | 'step2' | 'step3' | 'output_flowing' | 'completed'
  const [simState, setSimState] = useState<string>('idle');
  const [activeStep, setActiveStep] = useState<number>(0);

  const runSimulation = useCallback(() => {
    setSimState('input_flowing');
    setActiveStep(0);

    setTimeout(() => {
      setSimState('step1');
      setActiveStep(1);
    }, 600);

    setTimeout(() => {
      setSimState('step2');
      setActiveStep(2);
    }, 1400);

    setTimeout(() => {
      setSimState('step3');
      setActiveStep(3);
    }, 2200);

    setTimeout(() => {
      setSimState('output_flowing');
    }, 3000);

    setTimeout(() => {
      setSimState('completed');
    }, 3700);

    // Trigger the central state update
    if (managerId === 'config') {
      onSystemAction.updateServerConfig?.({ storageAllocatedGb: 2048 });
    } else if (managerId === 'scheduling' && onSystemAction.scheduledJobs?.length > 0) {
      onSystemAction.runJobManually?.(onSystemAction.scheduledJobs[0].id);
    } else if (managerId === 'load') {
      onSystemAction.runETL?.('attendance_batch_valid');
    } else if (managerId === 'backup') {
      onSystemAction.createBackup?.('Presentation Demo Snapshot');
    } else if (managerId === 'query') {
      onSystemAction.executeQuery?.('SELECT department_id, COUNT(*) as offers, ROUND(AVG(package_lpa), 2) as avg_pkg FROM Fact_Placement GROUP BY department_id');
    } else if (managerId === 'tuning') {
      onSystemAction.createIndex?.('Dim_Student', 'department_id', 'Bitmap');
    } else if (managerId === 'testing') {
      onSystemAction.runDataQualityTests?.();
    }
  }, [managerId, onSystemAction]);

  const resetSimulation = () => {
    setSimState('idle');
    setActiveStep(0);
  };

  const isRunning = simState !== 'idle' && simState !== 'completed';
  const isCompleted = simState === 'completed';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-in fade-in duration-300">
      {/* ==================================================================== */}
      {/* LEFT COLUMN: EDUCATIONAL CONTENT (Width: 5 of 12 cols)               */}
      {/* ==================================================================== */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
        {/* 1. Header Information */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0 ${
                isSystem ? 'bg-blue-600' : 'bg-emerald-600'
              }`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                  MODULE #{manager.number} OF 10
                </span>
                <span className="text-slate-600">•</span>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isSystem ? 'bg-blue-900/60 text-blue-300' : 'bg-emerald-900/60 text-emerald-300'
                  }`}
                >
                  {manager.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                {manager.name}
              </h2>
            </div>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 inline-block">
            {SYLLABUS_UNITS[manager.id]}
          </div>

          {/* Key Summary Banner */}
          <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-l-4 border-blue-500 p-3 rounded-r-xl">
            <div className="flex items-center space-x-2 text-xs">
              <Lightbulb className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-blue-300 font-bold uppercase font-mono text-[11px]">Core Goal:</span>
              <span className="text-slate-200 font-medium">{manager.oneLineSummary}</span>
            </div>
          </div>
        </div>

        {/* 2. Educational Breakdown: Problem -> Why Required -> Solution */}
        <div className="space-y-3">
          {/* Card 1: Problem */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              1. The Real-World Problem
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{manager.problem}</p>
          </div>

          {/* Card 2: Why Required / Explanation */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-mono">
              <HelpCircle className="w-3.5 h-3.5" />
              2. Why This Manager is Required
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{manager.simpleExplanation}</p>
          </div>

          {/* Card 3: Key Concept to Know */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              3. Concept: {manager.glossary.term}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{manager.glossary.meaning}</p>
          </div>
        </div>

        {/* 3. Single Prominent Simulation Trigger */}
        <div className="pt-2 flex items-center space-x-3">
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className={`flex-1 py-3 px-5 rounded-xl font-black text-xs text-white shadow-lg transition-all flex items-center justify-center space-x-2 ${
              isRunning
                ? 'bg-amber-500 cursor-wait animate-pulse'
                : isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-500'
                : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
            }`}
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Executing Step {activeStep}/3...</span>
              </>
            ) : isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Run Simulation Again</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>RUN LIVE SIMULATION</span>
              </>
            )}
          </button>

          {(isCompleted || isRunning) && (
            <button
              onClick={resetSimulation}
              className="p-3 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition"
              title="Reset Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* RIGHT COLUMN: LIVE SIMULATION & VISUAL OUTCOMES (Width: 7 of 12 cols)*/}
      {/* ==================================================================== */}
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl">
        {/* Simulation Section Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Live Animated Data Flow Simulation
            </span>
          </div>

          <span
            className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
              simState === 'idle'
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : isRunning
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {simState === 'idle' && 'Status: Ready to Run'}
            {simState === 'input_flowing' && '→ Ingesting Input Data...'}
            {simState.startsWith('step') && `⚙️ Step ${activeStep}/3 Inside Manager...`}
            {simState === 'output_flowing' && '→ Committing Verified Output...'}
            {simState === 'completed' && '✅ Simulation Completed Successfully'}
          </span>
        </div>

        {/* 3-Stage Visual Grid: INPUT -> PROCESS -> OUTPUT */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-2.5 items-stretch">
          {/* Stage 1: Input (Before) */}
          <div
            className={`md:col-span-3 rounded-xl p-3 border transition-all duration-300 flex flex-col justify-between ${
              simState === 'input_flowing'
                ? 'bg-amber-500/20 border-amber-400 shadow-md ring-2 ring-amber-400/40'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-400">1. INPUT</span>
                <span className="text-[10px] font-semibold text-slate-400 truncate max-w-[90px]">
                  {manager.input.visualBadge}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white mb-2">{manager.input.title}</h4>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                {manager.input.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1"></span>
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flow Arrow 1 */}
          <div className="md:col-span-1 hidden md:flex items-center justify-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                simState === 'input_flowing'
                  ? 'bg-amber-500 text-white animate-bounce shadow'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stage 2: Process (Inside Manager) */}
          <div
            className={`md:col-span-3 rounded-xl p-3 border transition-all duration-300 flex flex-col justify-between ${
              simState.startsWith('step')
                ? 'bg-blue-950/60 border-blue-500 shadow-md ring-2 ring-blue-500/40'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-blue-400">2. PROCESS</span>
                <span className="text-[10px] text-slate-400">3 Internal Steps</span>
              </div>
              <h4 className="font-bold text-xs text-white mb-2">{manager.name}</h4>
              <div className="space-y-1.5">
                {manager.processSteps.map((step) => {
                  const isStepActive = activeStep === step.step;
                  const isStepDone = activeStep > step.step || isCompleted;

                  return (
                    <div
                      key={step.step}
                      className={`p-1.5 rounded-lg border text-[10px] transition-all ${
                        isStepActive
                          ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-xs'
                          : isStepDone
                          ? 'bg-emerald-950/60 text-slate-200 border-emerald-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate">
                          Step {step.step}: {step.title}
                        </span>
                        {isStepDone ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        ) : isStepActive ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping shrink-0"></span>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Flow Arrow 2 */}
          <div className="md:col-span-1 hidden md:flex items-center justify-center">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                simState === 'output_flowing'
                  ? 'bg-emerald-500 text-white animate-bounce shadow'
                  : isCompleted
                  ? 'bg-emerald-900/60 text-emerald-300'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stage 3: Output (After) */}
          <div
            className={`md:col-span-3 rounded-xl p-3 border transition-all duration-300 flex flex-col justify-between ${
              isCompleted
                ? 'bg-emerald-950/60 border-emerald-500 shadow-md ring-2 ring-emerald-500/40'
                : simState === 'output_flowing'
                ? 'bg-emerald-500/20 border-emerald-400'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400">3. OUTPUT</span>
                <span className="text-[10px] font-bold text-emerald-400 truncate max-w-[90px]">
                  {manager.output.visualBadge}
                </span>
              </div>
              <h4 className="font-bold text-xs text-white mb-2">{manager.output.title}</h4>
              <div className="space-y-1.5 text-[11px]">
                {manager.output.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-1.5 ${
                      isCompleted ? 'text-emerald-200 font-medium' : 'text-slate-400'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                        isCompleted ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    />
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Outcome Chart */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              {manager.chartTitle}
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              {manager.output.visualBadge}
            </span>
          </div>

          <div className="h-44 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              {renderDedicatedChart(manager)}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live System Outcome Alert Bar */}
        <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">
              <strong>Outcome:</strong> {manager.output.description}
            </span>
          </div>
          <span className="text-emerald-400 font-bold shrink-0 hidden sm:inline">
            PSG iTech State Updated
          </span>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* RECHARTS CHART RENDERER HELPER                                             */
/* -------------------------------------------------------------------------- */
function renderDedicatedChart(manager: ManagerScenario) {
  const data = manager.chartData;

  switch (manager.id) {
    case 'config':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} unit=" GB" domain={[0, 1500]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
            formatter={(value: any) => [`${value} GB Free Storage`, 'Capacity']}
          />
          <Bar dataKey="freeGb" radius={[6, 6, 0, 0]} barSize={48}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'scheduling':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="window" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} unit="%" domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
          <Bar dataKey="collegeStaffQueries" name="Staff Queries (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="batchLoad" name="Batch Data Loading (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      );

    case 'event':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="category" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
            formatter={(value: any) => [`${value} Events`, 'Count']}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={44}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'database':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="role" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 4]} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
          <Bar dataKey="allowedPerms" name="Allowed (SELECT, INSERT, UPDATE)" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="deniedPerms" name="Denied / Blocked" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      );

    case 'backup':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="state" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} unit="%" domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
            formatter={(val: any) => [`${val}% Availability`, 'Status']}
          />
          <Bar dataKey="dataAvailablePct" radius={[6, 6, 0, 0]} barSize={48}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'load':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="stage" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 8]} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
            formatter={(val: any) => [`${val} Records`, 'Row Count']}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={44}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'warehouse':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="method" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} unit="%" domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
            formatter={(val: any) => [`${val}% Disk Scanned`, 'Disk I/O']}
          />
          <Bar dataKey="diskScannedPct" radius={[6, 6, 0, 0]} barSize={48}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'query':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="dept" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} unit=" LPA" domain={[0, 20]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
            formatter={(val: any) => [`${val} LPA Avg Package`, 'Recruitment']}
          />
          <Bar dataKey="avgSalaryLpa" radius={[6, 6, 0, 0]} barSize={42}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'tuning':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="type" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={11} unit=" ms" domain={[0, 60]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
            formatter={(val: any) => [`${val} milliseconds`, 'Query Latency']}
          />
          <Bar dataKey="timeMs" radius={[6, 6, 0, 0]} barSize={48}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'testing':
      return (
        <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
          <XAxis dataKey="testName" stroke="#94a3b8" fontSize={10} />
          <YAxis stroke="#94a3b8" fontSize={11} unit="%" domain={[0, 100]} />
          <Tooltip
            contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
            formatter={(val: any) => [`${val}% Pass`, 'Quality Check']}
          />
          <Bar dataKey="scorePct" radius={[6, 6, 0, 0]} barSize={38}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    default:
      return <div className="text-xs text-slate-500">No chart data</div>;
  }
}

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
        your answer into these 4 stages: Resource Scheduling → ETL & Ingestion → Storage & Backup → Querying & Quality Audit.
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
