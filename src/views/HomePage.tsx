import React from 'react';
import { Link } from 'react-router-dom';
import { MANAGERS_DATA, ManagerScenario } from '../data/visualizerData';
import {
  Layers,
  ArrowRight,
  Sparkles,
  Server,
  Workflow,
  GraduationCap,
  PlayCircle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const managersList = Object.values(MANAGERS_DATA).sort((a, b) => a.number - b.number);
  const systemManagers = managersList.filter((m) => m.category === 'System Manager');
  const processManagers = managersList.filter((m) => m.category === 'Process Manager');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white pt-10 pb-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Anna University R2021 Data Warehousing Syllabus</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
            Data Warehouse Visualizer
          </h1>
          <p className="text-lg sm:text-xl text-blue-200 font-medium max-w-3xl mx-auto mb-6">
            Understanding What Happens Behind the Scenes
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            A Data Warehouse has 10 dedicated managers working together. Select any manager below to
            see an interactive simulation of its <strong className="text-white">Input</strong>,{' '}
            <strong className="text-white">Internal Processing</strong>, and{' '}
            <strong className="text-white">Output</strong> with visual charts.
          </p>

          {/* Quick Jump Bar */}
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {managersList.map((m) => (
              <Link
                key={m.id}
                to={`/manager/${m.id}`}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-800/80 hover:bg-blue-600 border border-slate-700 text-xs text-slate-200 hover:text-white transition"
              >
                <span className="font-bold text-blue-400">#{m.number}</span>
                <span>{m.name.replace('System ', '').replace(' Manager', '')}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Section 1: System Managers */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-5 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-slate-900">System Managers</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Managers 1 to 5
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Manage infrastructure, background operations, storage, access control, and disaster recovery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {systemManagers.map((m) => (
              <ManagerCard key={m.id} manager={m} />
            ))}
          </div>
        </div>

        {/* Section 2: Process Managers */}
        <div>
          <div className="flex items-center space-x-3 mb-5 bg-white px-5 py-3 rounded-xl border border-slate-200 shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-slate-900">Process Managers</h2>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Managers 6 to 10
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Handle data flow, star schema modeling, analytical SQL queries, indexing, and quality audits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {processManagers.map((m) => (
              <ManagerCard key={m.id} manager={m} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ManagerCardProps {
  manager: ManagerScenario;
}

const ManagerCard: React.FC<ManagerCardProps> = ({ manager }) => {
  const Icon = manager.icon;
  const isSystem = manager.category === 'System Manager';

  return (
    <Link
      to={`/manager/${manager.id}`}
      className="group bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                isSystem ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              #{manager.number}
            </span>
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isSystem ? 'bg-slate-100 text-slate-600' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {manager.category}
            </span>
          </div>

          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              isSystem
                ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Manager Name */}
        <h3 className="font-bold text-slate-900 text-base mb-1.5 group-hover:text-blue-600 transition-colors">
          {manager.name}
        </h3>

        {/* One-Line Explanation */}
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {manager.oneLineSummary}
        </p>

        {/* 3-Stage Preview Pills */}
        <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 text-[11px] text-slate-600 space-y-1 mb-4">
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-500 w-14">Input:</span>
            <span className="truncate text-slate-700">{manager.input.title}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-semibold text-slate-500 w-14">Output:</span>
            <span className="truncate font-medium text-emerald-700">{manager.output.visualBadge}</span>
          </div>
        </div>
      </div>

      {/* Button link */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
        <span className="inline-flex items-center space-x-1">
          <PlayCircle className="w-4 h-4" />
          <span>Run Visualizer</span>
        </span>
        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
