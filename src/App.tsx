import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import { Header } from './components/layout/Header';
import { HomePage } from './views/HomePage';
import { ManagerVisualizerView } from './views/ManagerVisualizerView';
import { PresentationModeView } from './views/PresentationModeView';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isPresentation = location.pathname === '/presentation';

  if (isPresentation) {
    return <PresentationModeView />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Routes>
          {/* Section A: Home Page displaying all 10 managers */}
          <Route path="/" element={<HomePage />} />

          {/* Section B: Unified Manager Visualization Page */}
          <Route path="/manager/:id" element={<ManagerVisualizerView />} />

          {/* Dedicated Presentation Mode Route */}
          <Route path="/presentation" element={<PresentationModeView />} />

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
  );
};

export const App: React.FC = () => {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </SimulationProvider>
  );
};

export default App;
