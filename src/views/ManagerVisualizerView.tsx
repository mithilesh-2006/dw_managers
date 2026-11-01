import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MANAGERS_DATA, ManagerScenario } from '../data/visualizerData';
import {
  ArrowLeft,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  BookOpen,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Database,
  Layers,
  Presentation,
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

export const ManagerVisualizerView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find manager data or default to 'config'
  const managerId = id && MANAGERS_DATA[id] ? id : 'config';
  const manager: ManagerScenario = MANAGERS_DATA[managerId];

  // Simulation animation state: 'idle' | 'input_flowing' | 'step1' | 'step2' | 'step3' | 'output_flowing' | 'completed'
  const [simState, setSimState] = useState<string>('idle');
  const [activeStep, setActiveStep] = useState<number>(0);

  // Reset simulation state when manager changes
  useEffect(() => {
    setSimState('idle');
    setActiveStep(0);
  }, [managerId]);

  const runSimulation = () => {
    setSimState('input_flowing');
    setActiveStep(0);

    setTimeout(() => {
      setSimState('step1');
      setActiveStep(1);
    }, 700);

    setTimeout(() => {
      setSimState('step2');
      setActiveStep(2);
    }, 1700);

    setTimeout(() => {
      setSimState('step3');
      setActiveStep(3);
    }, 2700);

    setTimeout(() => {
      setSimState('output_flowing');
    }, 3700);

    setTimeout(() => {
      setSimState('completed');
    }, 4500);
  };

  const resetSimulation = () => {
    setSimState('idle');
    setActiveStep(0);
  };

  // Find previous and next managers for navigation
  const allManagers = Object.values(MANAGERS_DATA).sort((a, b) => a.number - b.number);
  const currentIndex = allManagers.findIndex((m) => m.id === manager.id);
  const prevManager = currentIndex > 0 ? allManagers[currentIndex - 1] : null;
  const nextManager = currentIndex < allManagers.length - 1 ? allManagers[currentIndex + 1] : null;

  const Icon = manager.icon;
  const isRunning = simState !== 'idle' && simState !== 'completed';
  const isCompleted = simState === 'completed';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Top Bar / Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All 10 Managers</span>
          </Link>

          {/* Quick Manager Switcher Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto py-1">
            {allManagers.map((m) => {
              const isActive = m.id === manager.id;
              return (
                <button
                  key={m.id}
                  onClick={() => navigate(`/manager/${m.id}`)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                  title={m.name}
                >
                  #{m.number}
                </button>
              );
            })}
          </div>

          <Link
            to="/presentation"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Presentation Mode</span>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Manager Title Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center space-x-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0 ${
                  manager.category === 'System Manager' ? 'bg-blue-600' : 'bg-emerald-600'
                }`}
              >
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Manager #{manager.number}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      manager.category === 'System Manager'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {manager.category}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {manager.name}
                </h1>
                <p className="text-sm text-slate-600 mt-1">{manager.oneLineSummary}</p>
              </div>
            </div>

            {/* Run Simulation Button */}
            <div className="flex items-center space-x-3 shrink-0">
              <button
                onClick={runSimulation}
                disabled={isRunning}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-md transition-all ${
                  isRunning
                    ? 'bg-amber-500 cursor-wait animate-pulse'
                    : isCompleted
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }`}
              >
                {isRunning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Simulating Step {activeStep}/3...</span>
                  </>
                ) : isCompleted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Run Again</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    <span>RUN SIMULATION</span>
                  </>
                )}
              </button>

              {(isCompleted || isRunning) && (
                <button
                  onClick={resetSimulation}
                  className="p-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition"
                  title="Reset to initial state"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Problem Statement Card */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Problem Solved by this Manager:
              </span>
              <p className="text-sm text-amber-900 font-medium mt-0.5">{manager.problem}</p>
            </div>
          </div>

          {/* Simple Explanation & Glossary */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  Simple Explanation:
                </span>
                <p className="text-xs sm:text-sm text-blue-950 mt-0.5 leading-relaxed">
                  {manager.simpleExplanation}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 flex items-start space-x-3">
              <BookOpen className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                  Key Concept: {manager.glossary.term}
                </span>
                <p className="text-xs text-purple-950 mt-0.5 leading-relaxed">
                  {manager.glossary.meaning}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-STAGE VISUAL DATA FLOW (INPUT -> PROCESS -> OUTPUT) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-blue-600" />
              <span>Three-Stage Visual Data Flow</span>
            </h2>
            <div className="text-xs font-semibold text-slate-500">
              {simState === 'idle' && 'Click RUN SIMULATION to see data move through the manager'}
              {simState === 'input_flowing' && '→ Input is entering the manager...'}
              {simState.startsWith('step') && `⚙️ Manager is executing Step ${activeStep}/3...`}
              {simState === 'output_flowing' && '→ Completed data is emerging...'}
              {simState === 'completed' && '✅ Operation completed successfully!'}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-stretch">
            {/* 1. INPUT STAGE (Cols 1-3) */}
            <div
              className={`lg:col-span-3 rounded-2xl border-2 p-5 flex flex-col justify-between transition-all duration-300 ${
                simState === 'input_flowing'
                  ? 'border-amber-400 bg-amber-50/70 shadow-md ring-2 ring-amber-300 ring-offset-1'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    STAGE 1: BEFORE
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                    {manager.input.visualBadge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1">{manager.input.title}</h3>
                <p className="text-xs text-slate-500 mb-4">{manager.input.description}</p>

                {/* Items List */}
                <div className="space-y-2">
                  {manager.input.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium flex items-center space-x-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
                Raw Input Data entering the Manager
              </div>
            </div>

            {/* Connecting Flow Arrow 1 (Col 4) */}
            <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  simState === 'input_flowing'
                    ? 'bg-amber-500 text-white animate-bounce shadow-md scale-110'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">Flow</span>
            </div>

            {/* 2. MANAGER PROCESS STAGE (Cols 5-7) */}
            <div
              className={`lg:col-span-3 rounded-2xl border-2 p-5 flex flex-col justify-between transition-all duration-300 ${
                simState.startsWith('step')
                  ? 'border-blue-500 bg-blue-50/40 shadow-lg ring-2 ring-blue-300 ring-offset-1'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                    STAGE 2: INSIDE MANAGER
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">3 Internal Steps</span>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base">{manager.name}</h3>
                </div>

                {/* Processing Steps */}
                <div className="space-y-2.5">
                  {manager.processSteps.map((step) => {
                    const isStepActive = activeStep === step.step;
                    const isStepDone = activeStep > step.step || isCompleted;

                    return (
                      <div
                        key={step.step}
                        className={`p-3 rounded-xl border transition-all duration-300 ${
                          isStepActive
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md scale-[1.02]'
                            : isStepDone
                            ? 'bg-emerald-50 text-slate-800 border-emerald-200'
                            : 'bg-slate-50 text-slate-600 border-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`text-[11px] font-bold uppercase tracking-wider ${
                              isStepActive ? 'text-blue-100' : isStepDone ? 'text-emerald-700' : 'text-slate-400'
                            }`}
                          >
                            Step {step.step}: {step.title}
                          </span>
                          {isStepDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : isStepActive ? (
                            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                          )}
                        </div>
                        <p
                          className={`text-xs ${
                            isStepActive ? 'text-blue-50' : 'text-slate-600'
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
                Automated Background Processing
              </div>
            </div>

            {/* Connecting Flow Arrow 2 (Col 8) */}
            <div className="lg:col-span-1 hidden lg:flex flex-col items-center justify-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  simState === 'output_flowing'
                    ? 'bg-emerald-500 text-white animate-bounce shadow-md scale-110'
                    : isCompleted
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                <ArrowRight className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase mt-2">Output</span>
            </div>

            {/* 3. OUTPUT STAGE (Cols 9-11) */}
            <div
              className={`lg:col-span-3 rounded-2xl border-2 p-5 flex flex-col justify-between transition-all duration-300 ${
                isCompleted
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-lg ring-2 ring-emerald-300 ring-offset-1'
                  : simState === 'output_flowing'
                  ? 'border-emerald-400 bg-emerald-50/70 shadow-md'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    STAGE 3: AFTER
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {manager.output.visualBadge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mb-1">{manager.output.title}</h3>
                <p className="text-xs text-slate-500 mb-4">{manager.output.description}</p>

                {/* Items List */}
                <div className="space-y-2">
                  {manager.output.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-lg border text-xs font-medium flex items-center space-x-2 transition-all ${
                        isCompleted
                          ? 'bg-white border-emerald-300 text-emerald-950 font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200/80 text-slate-700'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 ${
                          isCompleted ? 'text-emerald-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium">
                Verified Warehouse Output
              </div>
            </div>
          </div>
        </div>

        {/* DEDICATED VISUAL CHART SECTION */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs mb-8">
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <h2 className="text-lg font-extrabold text-slate-900">{manager.chartTitle}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">{manager.chartSubtitle}</p>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              {renderDedicatedChart(manager)}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Navigation (Previous / Next Manager) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200">
          {prevManager ? (
            <Link
              to={`/manager/${prevManager.id}`}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>
                Previous: #{prevManager.number} {prevManager.name.replace('System ', '').replace(' Manager', '')}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextManager ? (
            <Link
              to={`/manager/${nextManager.id}`}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs transition"
            >
              <span>
                Next: #{nextManager.number} {nextManager.name.replace('System ', '').replace(' Manager', '')}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              to="/"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-xs transition"
            >
              <span>Finish: Back to All Managers</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to render dedicated chart for each manager
function renderDedicatedChart(manager: ManagerScenario) {
  const data = manager.chartData;

  switch (manager.id) {
    case 'config':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis unit=" GB" tick={{ fontSize: 12, fill: '#475569' }} domain={[0, 1500]} />
          <Tooltip
            formatter={(value: any) => [`${value} GB Free Storage`, 'Available Space']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <Bar dataKey="freeGb" radius={[8, 8, 0, 0]} barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'scheduling':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="window" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis unit="%" tick={{ fontSize: 12, fill: '#475569' }} domain={[0, 100]} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <Legend />
          <Bar dataKey="collegeStaffQueries" name="Staff & Student Queries (%)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
          <Bar dataKey="batchLoad" name="Heavy Batch Data Loading (%)" fill="#10b981" radius={[6, 6, 0, 0]} />
        </BarChart>
      );

    case 'event':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="category" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis tick={{ fontSize: 12, fill: '#475569' }} allowDecimals={false} />
          <Tooltip
            formatter={(value: any) => [`${value} Events Logged`, 'Count']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={55}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'database':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="role" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis domain={[0, 4]} allowDecimals={false} tick={{ fontSize: 12, fill: '#475569' }} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }} />
          <Legend />
          <Bar dataKey="allowedPerms" name="Allowed Privileges (SELECT, INSERT, UPDATE, DELETE)" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="deniedPerms" name="Blocked Privileges" fill="#ef4444" radius={[6, 6, 0, 0]} />
        </BarChart>
      );

    case 'backup':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="state" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12, fill: '#475569' }} />
          <Tooltip
            formatter={(val: any) => [`${val}% Availability`, 'Warehouse Data']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <Bar dataKey="dataAvailablePct" radius={[8, 8, 0, 0]} barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'load':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="stage" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis domain={[0, 8]} allowDecimals={false} tick={{ fontSize: 12, fill: '#475569' }} />
          <Tooltip
            formatter={(val: any) => [`${val} Records`, 'Row Count']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={55}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'warehouse':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="method" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12, fill: '#475569' }} />
          <Tooltip
            formatter={(val: any) => [`${val}% of Database Scanned`, 'Disk I/O']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <Bar dataKey="diskScannedPct" radius={[8, 8, 0, 0]} barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'query':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="dept" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis unit=" LPA" domain={[0, 20]} tick={{ fontSize: 12, fill: '#475569' }} />
          <Tooltip
            formatter={(val: any) => [`${val} LPA Average Salary`, 'Package']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <Bar dataKey="avgSalaryLpa" radius={[8, 8, 0, 0]} barSize={50}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'tuning':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="type" tick={{ fontSize: 12, fill: '#475569' }} />
          <YAxis unit=" ms" domain={[0, 60]} tick={{ fontSize: 12, fill: '#475569' }} />
          <Tooltip
            formatter={(val: any) => [`${val} milliseconds`, 'Query Latency']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <Bar dataKey="timeMs" radius={[8, 8, 0, 0]} barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    case 'testing':
      return (
        <BarChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="testName" tick={{ fontSize: 11, fill: '#475569' }} />
          <YAxis unit="%" domain={[0, 100]} tick={{ fontSize: 12, fill: '#475569' }} />
          <Tooltip
            formatter={(val: any) => [`${val}% PASS`, 'Quality Check']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #cbd5e1' }}
          />
          <Bar dataKey="scorePct" radius={[8, 8, 0, 0]} barSize={45}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      );

    default:
      return <div>No chart data available</div>;
  }
}
