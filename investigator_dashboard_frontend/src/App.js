import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AppShell } from "./components/AppShell";
import { OverviewPage } from "./pages/OverviewPage";
import { QueuePage } from "./pages/QueuePage";
import { IngestPage } from "./pages/IngestPage";
import { CasesPage } from "./pages/CasesPage";
import { NetworkPage } from "./pages/NetworkPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";

/**
 * PUBLIC_INTERFACE
 * App is the React entry component for the Investigator Dashboard.
 * It defines navigation and core screens.
 */
function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/ingest" element={<IngestPage />} />
          <Route path="/cases" element={<CasesPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<OverviewPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
