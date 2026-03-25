import React, { useEffect, useState } from "react";
import { getClaims, getHealth } from "../api/client";
import { PageHeader, Alert } from "../components/ui";

const mockTopFindings = [
  { claimId: "CLM-100182", claimant: "A. Rivera", score: 87, reason: "Inflated repair estimate", status: "queued" },
  { claimId: "CLM-100233", claimant: "J. Patel", score: 82, reason: "Prior claim overlap", status: "assigned" },
  { claimId: "CLM-100240", claimant: "M. Chen", score: 79, reason: "Address anomaly", status: "queued" },
];

/**
 * PUBLIC_INTERFACE
 * OverviewPage shows high-level KPIs and a prioritized snapshot.
 */
export function OverviewPage() {
  const [health, setHealth] = useState({ loading: true, ok: false, data: null, error: null });
  const [claims, setClaims] = useState({ loading: true, ok: false, data: null, error: null });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getHealth();
        if (!cancelled) setHealth({ loading: false, ok: true, data, error: null });
      } catch (e) {
        if (!cancelled) setHealth({ loading: false, ok: false, data: null, error: e });
      }
    })();

    (async () => {
      try {
        const data = await getClaims();
        if (!cancelled) setClaims({ loading: false, ok: true, data, error: null });
      } catch (e) {
        if (!cancelled) setClaims({ loading: false, ok: false, data: null, error: e });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <PageHeader
        title="Overview"
        subtitle="Monitor fraud signals, workload, and operational health."
        actions={
          <>
            <a className="btn btn-primary" href="/queue">
              Open Queue
            </a>
            <a className="btn" href="/ingest">
              Ingest Claims
            </a>
          </>
        }
      />

      {!health.loading && !health.ok ? (
        <Alert variant="error" title="Backend unreachable">
          Health check failed. Ensure API base is correct via <code>REACT_APP_API_BASE</code> (or{" "}
          <code>REACT_APP_BACKEND_URL</code>).
          <div className="footer-note">Error: {String(health.error?.message || health.error)}</div>
        </Alert>
      ) : null}

      {!claims.loading && !claims.ok ? (
        <Alert variant="error" title="Claims endpoint unreachable">
          Fetching <code>/api/claims/</code> failed. This verifies frontend-to-backend connectivity and CORS.
          <div className="footer-note">Error: {String(claims.error?.message || claims.error)}</div>
        </Alert>
      ) : null}

      <div className="grid grid-3" style={{ marginTop: 14 }}>
        <div className="card card-pad">
          <div className="kpi">
            <div>
              <h3>High-risk queued</h3>
              <strong>14</strong>
              <div className="footer-note">Score ≥ 75, unassigned</div>
            </div>
            <span className="trend up">+6%</span>
          </div>
        </div>
        <div className="card card-pad">
          <div className="kpi">
            <div>
              <h3>Open cases</h3>
              <strong>38</strong>
              <div className="footer-note">Assigned & in progress</div>
            </div>
            <span className="trend down">-2%</span>
          </div>
        </div>
        <div className="card card-pad">
          <div className="kpi">
            <div>
              <h3>Avg. time to first touch</h3>
              <strong>5.4h</strong>
              <div className="footer-note">Last 7 days</div>
            </div>
            <span className="trend up">+1%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginTop: 14 }}>
        <div className="card">
          <div className="card-pad">
            <h2 style={{ margin: 0, fontSize: 14, letterSpacing: 0.2 }}>Prioritized findings</h2>
            <p className="page-subtitle" style={{ marginTop: 6 }}>Top signals requiring review.</p>
          </div>
          <div className="card-pad" style={{ paddingTop: 0 }}>
            <table className="table" aria-label="Prioritized findings table">
              <thead>
                <tr>
                  <th>Claim</th>
                  <th>Claimant</th>
                  <th>Score</th>
                  <th>Signal</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTopFindings.map((r) => (
                  <tr key={r.claimId}>
                    <td>
                      <a href="/cases" style={{ textDecoration: "underline" }}>
                        {r.claimId}
                      </a>
                    </td>
                    <td>{r.claimant}</td>
                    <td>
                      <span className="badge primary">{r.score}</span>
                    </td>
                    <td>{r.reason}</td>
                    <td>
                      <span className={`badge ${r.status === "assigned" ? "secondary" : "primary"}`}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="footer-note">Note: This is mock data until additional backend endpoints are added.</div>
          </div>
        </div>

        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14, letterSpacing: 0.2 }}>System status</h2>
          <p className="page-subtitle" style={{ marginTop: 6 }}>Connectivity & deployment configuration.</p>

          <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
            <div className="pill">
              Backend health: <strong>{health.loading ? "checking…" : health.ok ? "ok" : "down"}</strong>
            </div>
            <div className="pill">
              Health payload:{" "}
              <strong>{health.ok ? (typeof health.data === "string" ? health.data : "received") : "n/a"}</strong>
            </div>
            <div className="pill">
              Claims list:{" "}
              <strong>
                {claims.loading
                  ? "loading…"
                  : claims.ok
                    ? Array.isArray(claims.data)
                      ? `${claims.data.length} claim(s)`
                      : "received"
                    : "failed"}
              </strong>
            </div>
          </div>

          <div className="footer-note">
            These checks call <code>/api/health/</code> and <code>/api/claims/</code> using the configured API base URL.
            If either fails, verify environment variables and backend CORS.
          </div>
        </div>
      </div>
    </>
  );
}
