import React from "react";
import { PageHeader } from "../components/ui";

/**
 * PUBLIC_INTERFACE
 * ReportsPage provides fraud analytics and operational reporting (placeholder).
 */
export function ReportsPage() {
  return (
    <>
      <PageHeader
        title="Reports"
        subtitle="Fraud outcomes, investigator productivity, and scoring distribution."
        actions={<a className="btn btn-primary" href="/">Back to Overview</a>}
      />

      <div className="grid grid-3">
        <div className="card card-pad">
          <div className="kpi">
            <div>
              <h3>Confirmed fraud (30d)</h3>
              <strong>23</strong>
              <div className="footer-note">Closed cases with outcome: Fraud Confirmed</div>
            </div>
            <span className="trend up">+9%</span>
          </div>
        </div>
        <div className="card card-pad">
          <div className="kpi">
            <div>
              <h3>False positives (30d)</h3>
              <strong>41</strong>
              <div className="footer-note">Helps tune rules & thresholds</div>
            </div>
            <span className="trend down">-3%</span>
          </div>
        </div>
        <div className="card card-pad">
          <div className="kpi">
            <div>
              <h3>Recovered amount (est.)</h3>
              <strong>$184k</strong>
              <div className="footer-note">Placeholder until finance integration</div>
            </div>
            <span className="trend up">+4%</span>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Exports (placeholder)</h2>
          <p className="page-subtitle" style={{ marginTop: 6 }}>
            Download filtered reports as CSV/PDF once backend endpoints are available.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
            <button className="btn btn-primary" type="button">Export CSV</button>
            <button className="btn" type="button">Export PDF</button>
          </div>
          <div className="footer-note">Buttons are currently non-functional.</div>
        </div>
      </div>
    </>
  );
}
