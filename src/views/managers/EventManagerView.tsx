import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  BellRing,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
  Trash2,
  ShieldAlert,
} from 'lucide-react';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const EventManagerView: React.FC = () => {
  const { events, acknowledgeEvent, clearEvents, logEvent } = useSimulation();

  const [showEduModal, setShowEduModal] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const filteredEvents = events.filter((e) => {
    if (filter === 'all') return true;
    return e.category === filter;
  });

  const handleSimulateAlert = (type: 'etl' | 'storage' | 'crash') => {
    if (type === 'etl') {
      logEvent(
        'Load Manager',
        'error',
        'ETL Batch Failed: Biometric file rejected due to 5 duplicate student IDs.',
        'Duplicate keys: PSG21CS001, PSG21CS004. Quarantined in error table.',
        'Open Load Manager and review deduplication rules.'
      );
    } else if (type === 'storage') {
      logEvent(
        'System Configuration Manager',
        'warning',
        'Low Storage Warning: Fact_Attendance table reached 88% capacity.',
        'Only 150 MB remaining before next write lock.',
        'Expand Storage Volume in System Configuration Manager.'
      );
    } else {
      logEvent(
        'System Database Manager',
        'critical',
        'Unauthorized Access Blocked: User "guest_auditor" attempted DELETE query.',
        'Access denied by Database RBAC policy.',
        'Review role privileges in System Database Manager.'
      );
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* Title & Concept Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Manager 3 of 10 • System Management
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-0.5 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-amber-600" />
            System Event Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            The central alarm and audit logging system that captures operational warnings and errors across all managers.
          </p>
        </div>
        <button
          onClick={() => setShowEduModal(true)}
          className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-xs font-semibold self-start sm:self-center transition flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Syllabus Notes</span>
        </button>
      </div>

      {/* The Problem in Plain English */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-900 font-bold block">The Problem it Solves:</strong>
          <span>
            If an attendance batch fails at 2:00 AM, without an Event Manager no one knows about it until someone notices attendance reports are empty days later. The Event Manager records every failure instantly and provides recommended actions to fix it.
          </span>
        </div>
      </div>

      {/* Interactive Simulation: Generate Test Events */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900">
          Interactive Simulation: Trigger an Operational Alert
        </h2>
        <p className="text-xs text-slate-500">
          Click any button to test how the Event Manager captures incidents in real-time:
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => handleSimulateAlert('etl')}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition"
          >
            + Trigger ETL Batch Error
          </button>
          <button
            onClick={() => handleSimulateAlert('storage')}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-xs font-semibold transition"
          >
            + Trigger Low Storage Warning
          </button>
          <button
            onClick={() => handleSimulateAlert('crash')}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-semibold transition"
          >
            + Trigger Security Violation
          </button>
        </div>
      </div>

      {/* Live Event Stream */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900">Live Central Event Feed</span>
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              {filteredEvents.length} Events
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white font-medium"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical Only</option>
              <option value="error">Errors Only</option>
              <option value="warning">Warnings Only</option>
              <option value="info">Info Only</option>
            </select>
            <button
              onClick={clearEvents}
              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg transition"
              title="Clear event logs"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="py-3 text-xs space-y-1">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      evt.category === 'critical'
                        ? 'bg-red-100 text-red-800'
                        : evt.category === 'error'
                        ? 'bg-rose-100 text-rose-800'
                        : evt.category === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {evt.category}
                  </span>
                  <span className="font-bold text-slate-900">{evt.message}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">{evt.timestamp}</span>
              </div>

              {evt.details && (
                <p className="text-slate-500 text-[11px] pl-2 border-l-2 border-slate-200 mt-1">
                  {evt.details}
                </p>
              )}

              {evt.recommendedAction && (
                <div className="text-[11px] text-blue-700 bg-blue-50/70 p-2 rounded-lg mt-1 font-medium">
                  <strong>Recommended Action:</strong> {evt.recommendedAction}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <EduInfoModal managerId="event" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
