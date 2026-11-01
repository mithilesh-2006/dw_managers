import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './views/HomePage';
import { ManagerVisualizerView } from './views/ManagerVisualizerView';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Header />
        <main className="flex-1">
          <Routes>
            {/* Section A: Home Page displaying all 10 managers */}
            <Route path="/" element={<HomePage />} />

            {/* Section B: Unified Manager Visualization Page */}
            <Route path="/manager/:id" element={<ManagerVisualizerView />} />

            {/* Backward compatibility redirects */}
            <Route path="/config" element={<Navigate to="/manager/config" replace />} />
            <Route path="/scheduling" element={<Navigate to="/manager/scheduling" replace />} />
            <Route path="/events" element={<Navigate to="/manager/event" replace />} />
            <Route path="/event" element={<Navigate to="/manager/event" replace />} />
            <Route path="/database" element={<Navigate to="/manager/database" replace />} />
            <Route path="/backup" element={<Navigate to="/manager/backup" replace />} />
            <Route path="/load" element={<Navigate to="/manager/load" replace />} />
            <Route path="/warehouse" element={<Navigate to="/manager/warehouse" replace />} />
            <Route path="/query" element={<Navigate to="/manager/query" replace />} />
            <Route path="/tuning" element={<Navigate to="/manager/tuning" replace />} />
            <Route path="/testing" element={<Navigate to="/manager/testing" replace />} />

            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
