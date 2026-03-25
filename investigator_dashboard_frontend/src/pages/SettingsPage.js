import React, { useMemo, useState } from "react";
import { getConfig, parseFeatureFlags } from "../config";
import { PageHeader } from "../components/ui";

/**
 * PUBLIC_INTERFACE
 * SettingsPage shows runtime configuration and feature flags.
 */
export function SettingsPage() {
  const cfg = useMemo(() => getConfig(), []);
  const flags = useMemo(() => parseFeatureFlags(cfg.featureFlagsRaw), [cfg.featureFlagsRaw]);
  const [localExperimental, setLocalExperimental] = useState(Boolean(flags.experimental));

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Runtime configuration sourced from REACT_APP_* environment variables."
        actions={<a className="btn btn-primary" href="/">Done</a>}
      />

      <div className="grid grid-2">
        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Environment</h2>
          <table className="table" aria-label="Environment configuration table">
            <tbody>
              <tr><th style={{ width: 160 }}>apiBase</th><td>{cfg.apiBase || "(relative)"}</td></tr>
              <tr><th>backendUrl</th><td>{cfg.backendUrl || "(empty)"}</td></tr>
              <tr><th>frontendUrl</th><td>{cfg.frontendUrl || "(empty)"}</td></tr>
              <tr><th>wsUrl</th><td>{cfg.wsUrl || "(empty)"}</td></tr>
              <tr><th>nodeEnv</th><td>{cfg.nodeEnv}</td></tr>
              <tr><th>healthcheckPath</th><td>{cfg.healthcheckPath}</td></tr>
              <tr><th>logLevel</th><td>{cfg.logLevel}</td></tr>
            </tbody>
          </table>
          <div className="footer-note">
            To change these values, update the container’s environment variables (not in code).
          </div>
        </div>

        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Feature flags</h2>
          <p className="page-subtitle" style={{ marginTop: 6 }}>
            Read from <code>REACT_APP_FEATURE_FLAGS</code>. Local toggles below are UI-only.
          </p>

          <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox"
                checked={localExperimental}
                onChange={(e) => setLocalExperimental(e.target.checked)}
              />
              Enable experimental UI (local)
              <span className={`badge ${localExperimental ? "primary" : ""}`} style={{ marginLeft: "auto" }}>
                {localExperimental ? "on" : "off"}
              </span>
            </label>

            <div className="alert">
              <strong style={{ display: "block", marginBottom: 6 }}>Parsed flags</strong>
              <div style={{ fontSize: 13 }}>
                {Object.keys(flags).length ? (
                  <ul style={{ margin: "0 0 0 18px" }}>
                    {Object.keys(flags).map((k) => <li key={k}><code>{k}</code></li>)}
                  </ul>
                ) : (
                  <span>(none)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
