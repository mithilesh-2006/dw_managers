import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Home, GraduationCap, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Organization & Title */}
      <Link to="/" className="flex items-center space-x-2.5 group">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition">
              Data Warehouse Visualizer
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hidden sm:inline-block">
              Anna Univ R2021
            </span>
          </div>
          <p className="text-[11px] text-slate-500 hidden sm:block">
            Understanding What Happens Behind the Scenes
          </p>
        </div>
      </Link>

      {/* Right: Simple Navigation */}
      <div className="flex items-center space-x-2">
        <Link
          to="/"
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
            isHome
              ? 'bg-blue-50 text-blue-700 border border-blue-200'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>All 10 Managers</span>
        </Link>
      </div>
    </header>
  );
};
