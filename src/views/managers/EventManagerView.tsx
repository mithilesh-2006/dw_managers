import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import {
  BellRing,
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCircle2,
  Filter,
  Download,
  Trash2,
  HelpCircle,
  ShieldCheck,
  Search,
  ExternalLink,
} from 'lucide-react';
import { Severity } from '../../types';
import { EduInfoModal } from '../../components/common/EduInfoModal';

export const EventManagerView: React.FC = () => {
  const { events, acknowledgeEvent, clearEvents, logEvent, exportSimulationLogs } = useSimulation();

  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEduModal, setShowEduModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // Filter events
  const filteredEvents = events.filter((evt) => {
    const matchesSev = selectedSeverity === 'all' || evt.category === selectedSeverity;
    const matchesQuery =
      evt.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.sourceManager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.details && evt.details.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSev && matchesQuery;
  });

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  // Failure generator button for classroom demonstration
  const handleSimulateSampleFailure = (type: 'etl' | 'disk' | 'conn') => {
    if (type === 'etl') {
      logEvent(
        'Load Manager',
        'error',
        'ETL Batch Corrupted: Biometric data file "att_2024_11.csv" contained 14 unmapped foreign keys.',
        'Student IDs like PSG21XX999 failed referential integrity check against Dim_Student.',
        'Quarantine bad records in Load Manager and verify mapping catalog.'
      );
    } else if (type === 'disk') {
      logEvent(
        'System Configuration Manager',
        'warning',
        'Storage Saturation Alert: Table Fact_Attendance reached 88% partition allocation.',
        'Available unpartitioned disk pages below threshold of 200 MB.',
        'Expand Storage Volume in Configuration Manager or create archival partitions.'
      );
    } else {
      logEvent(
        'System Database Manager',
        'critical',
        'Connection Pool Starvation: 250 of 250 client sessions occupied by concurrent reporting jobs.',
        'Incoming analytical queries from Faculty portal are currently queuing.',
        'Increase Max Connections parameter in System Configuration Manager.'
      );
    }
  };

  const counts = {
    all: events.length,
    info: events.filter((e) => e.category === 'info').length,
    warning: events.filter((e) => e.category === 'warning').length,
    error: events.filter((e) => e.category === 'error').length,
    critical: events.filter((e) => e.category === 'critical').length,
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
            <span>System Management Module 3</span>
            <span>•</span>
            <span>Anna Univ R2021 Syllabus</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <BellRing className="w-7 h-7 text-amber-600" />
            System Event Manager
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Centralized telemetry and alert clearinghouse. Captures operational events, ETL errors, and hardware thresholds across all 10 managers.
          </p>
        </div>
        <div className="flex items-center space-x-2 self-start md:self-center">
          <button
            onClick={exportSimulationLogs}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
            title="Export full event history to JSON file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={() => setShowEduModal(true)}
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-bold transition flex items-center space-x-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Syllabus Notes</span>
          </button>
        </div>
      </div>

      {/* Problem Scenario */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <div className="font-bold text-amber-900 text-sm">Problem Scenario: Silent ETL Loading Failures & Unmonitored Cascades</div>
          <p className="mt-1 leading-relaxed text-amber-900/90">
            A midnight data pipeline encounters a malformed CSV record and silently crashes. Without an Event Manager, the college administrators assume attendance reports are fresh, leading to erroneous management decisions. The Event Manager logs incidents in real-time with prescribed actions.
          </p>
        </div>
      </div>

      {/* Interactive Demonstration: Inject Simulated Failures */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">⚡ Classroom Simulation:</span>
          <span>Generate test operational incidents to observe Event Manager response:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleSimulateSampleFailure('etl')}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg font-semibold transition"
          >
            + Simulate ETL Integrity Failure
          </button>
          <button
            onClick={() => handleSimulateSampleFailure('disk')}
            className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg font-semibold transition"
          >
            + Simulate Storage Threshold Warning
          </button>
          <button
            onClick={() => handleSimulateSampleFailure('conn')}
            className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg font-semibold transition"
          >
            + Simulate Connection Starvation
          </button>
        </div>
      </div>

      {/* Severity Filter Pills & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All Events', count: counts.all, color: 'text-slate-700' },
            { id: 'critical', label: 'Critical', count: counts.critical, color: 'text-red-700' },
            { id: 'error', label: 'Error', count: counts.error, color: 'text-rose-700' },
            { id: 'warning', label: 'Warning', count: counts.warning, color: 'text-amber-700' },
            { id: 'info', label: 'Information', count: counts.info, color: 'text-blue-700' },
          ].map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedSeverity(pill.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                selectedSeverity === pill.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{pill.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                selectedSeverity === pill.id ? 'bg-slate-700 text-white' : 'bg-slate-100 ' + pill.color
              }`}>
                {pill.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search message, manager, details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
            />
          </div>
          <button
            onClick={clearEvents}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition"
            title="Clear all events"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Live Events Stream & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Events Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-500" />
              Real-Time Event Stream ({filteredEvents.length})
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">Live Ingestion Active</span>
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No events match the selected criteria.
              </div>
            ) : (
              filteredEvents.map((evt) => {
                const isSelected = selectedEvent?.id === evt.id;
                return (
                  <div
                    key={evt.id}
                    onClick={() => setSelectedEventId(evt.id)}
                    className={`p-4 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      isSelected ? 'bg-amber-50/60 border-l-4 border-amber-600' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 mt-0.5 ${
                          evt.category === 'critical'
                            ? 'bg-red-100 text-red-800 border border-red-200'
                            : evt.category === 'error'
                            ? 'bg-rose-100 text-rose-800'
                            : evt.category === 'warning'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {evt.category}
                      </span>
                      <div>
                        <div className="font-semibold text-slate-800">{evt.message}</div>
                        <div className="text-slate-500 text-[11px] mt-0.5 flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-slate-600">{evt.sourceManager}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-400">{evt.timestamp}</span>
                          {evt.acknowledged && (
                            <span className="text-emerald-600 flex items-center gap-0.5 font-medium">
                              <CheckCircle2 className="w-3 h-3" /> Acknowledged
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                      {!evt.acknowledged && (
                        <button
                          onClick={() => acknowledgeEvent(evt.id)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 rounded-lg text-[11px] font-semibold transition"
                        >
                          Acknowledge
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Col: Selected Event Deep Inspector */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Incident Details & Mitigation</span>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  selectedEvent?.category === 'critical'
                    ? 'bg-red-100 text-red-800'
                    : selectedEvent?.category === 'error'
                    ? 'bg-rose-100 text-rose-800'
                    : selectedEvent?.category === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {selectedEvent?.category}
              </span>
              <span className="font-mono text-xs text-slate-400">{selectedEvent?.timestamp}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 mt-2">{selectedEvent?.message}</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Originating Manager</span>
              <span className="font-bold text-slate-800">{selectedEvent?.sourceManager}</span>
            </div>

            {selectedEvent?.details && (
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Technical Details</span>
                <p className="text-slate-700 font-mono text-[11px] leading-relaxed">{selectedEvent.details}</p>
              </div>
            )}

            {selectedEvent?.recommendedAction && (
              <div className="p-3.5 bg-blue-50/80 border border-blue-200 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-blue-900 block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  Prescribed Mitigation Action
                </span>
                <p className="text-slate-800 text-xs font-medium leading-relaxed">{selectedEvent.recommendedAction}</p>
              </div>
            )}
          </div>

          {!selectedEvent?.acknowledged && selectedEvent && (
            <button
              onClick={() => acknowledgeEvent(selectedEvent.id)}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Mark Incident Acknowledged
            </button>
          )}
        </div>
      </div>

      <EduInfoModal managerId="event" isOpen={showEduModal} onClose={() => setShowEduModal(false)} />
    </div>
  );
};
