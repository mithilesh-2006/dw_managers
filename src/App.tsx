import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SimulationProvider } from './context/SimulationContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { SystemCrashBanner } from './components/common/SystemCrashBanner';

import { OverviewDashboard } from './views/OverviewDashboard';
import { ConfigManagerView } from './views/managers/ConfigManagerView';
import { SchedulingManagerView } from './views/managers/SchedulingManagerView';
import { EventManagerView } from './views/managers/EventManagerView';
import { DatabaseManagerView } from './views/managers/DatabaseManagerView';
import { BackupRecoveryView } from './views/managers/BackupRecoveryView';
import { LoadManagerView } from './views/managers/LoadManagerView';
import { WarehouseManagerView } from './views/managers/WarehouseManagerView';
import { QueryManagerView } from './views/managers/QueryManagerView';
import { TuningView } from './views/managers/TuningView';
import { TestingView } from './views/managers/TestingView';
import { CrossManagerWorkflowView } from './views/CrossManagerWorkflowView';
import { ScenariosView } from './views/ScenariosView';
import { PresentationModeView } from './views/PresentationModeView';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isPresentation = location.pathname === '/presentation';

  if (isPresentation) {
    return <PresentationModeView />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header />
        <SystemCrashBanner />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<OverviewDashboard />} />
            <Route path="/config" element={<ConfigManagerView />} />
            <Route path="/scheduling" element={<SchedulingManagerView />} />
            <Route path="/events" element={<EventManagerView />} />
            <Route path="/database" element={<DatabaseManagerView />} />
            <Route path="/backup" element={<BackupRecoveryView />} />
            <Route path="/load" element={<LoadManagerView />} />
            <Route path="/warehouse" element={<WarehouseManagerView />} />
            <Route path="/query" element={<QueryManagerView />} />
            <Route path="/tuning" element={<TuningView />} />
            <Route path="/testing" element={<TestingView />} />
            <Route path="/workflow" element={<CrossManagerWorkflowView />} />
            <Route path="/scenarios" element={<ScenariosView />} />
          </Routes>
        </main>
      </div>
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
