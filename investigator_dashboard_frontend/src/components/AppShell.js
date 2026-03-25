import React from "react";
import { NavLink } from "react-router-dom";
import { getConfig, parseFeatureFlags } from "../config";

function NavItem({ to, label, meta }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
    >
      <span>{label}</span>
      {meta ? <small>{meta}</small> : null}
    </NavLink>
  );
}

/**
 * PUBLIC_INTERFACE
 * AppShell provides the top navigation + left-side menu layout.
 */
export function AppShell({ children }) {
  const cfg = getConfig();
  const flags = parseFeatureFlags(cfg.featureFlagsRaw);

  return (
    <div className="page-shell">
      <header className="topbar" role="banner">
        <div className="brand" aria-label="Application brand">
          <div className="brand-badge" aria-hidden="true" />
          <div className="brand-title">
            <strong>Investigator Dashboard</strong>
            <span>Insurance SIU • Fraud Triage & Casework</span>
          </div>
        </div>

        <div className="topbar-actions">
          <div className="pill" title="API base URL">
            API: <strong>{cfg.apiBase || "(relative)"}</strong>
          </div>
          {flags.experimental ? (
            <div className="pill" title="Feature flags">
              Flags: <strong>experimental</strong>
            </div>
          ) : null}
          <a className="btn btn-secondary" href="/reports">
            Reports
          </a>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar" aria-label="Primary navigation">
          <div className="nav-section-title">Dashboards</div>
          <NavItem to="/" label="Overview" meta="KPIs" />
          <NavItem to="/queue" label="Investigation Queue" meta="Triage" />
          <NavItem to="/network" label="Network" meta="Links" />

          <div className="nav-section-title">Operations</div>
          <NavItem to="/ingest" label="Claim Ingestion" meta="Upload" />
          <NavItem to="/cases" label="Cases" meta="Assignments" />

          <div className="nav-section-title">System</div>
          <NavItem to="/settings" label="Settings" meta="Config" />
        </aside>

        <main className="main" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
