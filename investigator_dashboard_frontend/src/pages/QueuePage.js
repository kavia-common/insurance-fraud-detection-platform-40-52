import React, { useMemo, useState } from "react";
import { PageHeader } from "../components/ui";

const mockQueue = [
  { id: "CLM-100182", claimant: "A. Rivera", score: 87, age: "2h", reason: "Inflated repair estimate", priority: "High" },
  { id: "CLM-100240", claimant: "M. Chen", score: 79, age: "6h", reason: "Address anomaly", priority: "High" },
  { id: "CLM-100151", claimant: "S. Johnson", score: 71, age: "1d", reason: "Staged incident pattern", priority: "Medium" },
  { id: "CLM-100139", claimant: "K. Singh", score: 62, age: "2d", reason: "Coverage mismatch", priority: "Medium" },
  { id: "CLM-100120", claimant: "D. Walker", score: 55, age: "3d", reason: "Late reporting", priority: "Low" },
];

/**
 * PUBLIC_INTERFACE
 * QueuePage displays prioritized claims awaiting investigator action.
 */
export function QueuePage() {
  const [minScore, setMinScore] = useState(60);
  const [priority, setPriority] = useState("All");

  const filtered = useMemo(() => {
    return mockQueue.filter((r) => {
      const okScore = r.score >= minScore;
      const okPriority = priority === "All" ? true : r.priority === priority;
      return okScore && okPriority;
    });
  }, [minScore, priority]);

  return (
    <>
      <PageHeader
        title="Investigation Queue"
        subtitle="Prioritized claim triage. Filter by score and priority."
        actions={
          <>
            <a className="btn btn-primary" href="/cases">View Cases</a>
            <a className="btn" href="/ingest">Ingest</a>
          </>
        }
      />

      <div className="grid grid-2">
        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Filters</h2>
          <div className="form-row" style={{ marginTop: 10 }}>
            <div className="field">
              <label htmlFor="minScore">Minimum score</label>
              <input
                id="minScore"
                className="input"
                type="number"
                min={0}
                max={100}
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
              />
              <div className="help">Higher scores are more suspicious.</div>
            </div>

            <div className="field">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                className="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <div className="help">Use priority to balance workload.</div>
            </div>
          </div>
        </div>

        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Quick actions</h2>
          <p className="page-subtitle" style={{ marginTop: 6 }}>
            Assign items, request documentation, and record outcomes (next steps).
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
            <button className="btn btn-primary" type="button">Assign selected</button>
            <button className="btn" type="button">Request docs</button>
            <button className="btn btn-secondary" type="button">Mark false positive</button>
          </div>
          <div className="footer-note">Buttons are placeholders until backend endpoints are available.</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Queue</h2>
          <p className="page-subtitle" style={{ marginTop: 6 }}>
            {filtered.length} item(s) match current filters.
          </p>
        </div>
        <div className="card-pad" style={{ paddingTop: 0 }}>
          <table className="table" aria-label="Investigation queue table">
            <thead>
              <tr>
                <th>Claim</th>
                <th>Claimant</th>
                <th>Score</th>
                <th>Age</th>
                <th>Signal</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td><a href="/cases" style={{ textDecoration: "underline" }}>{r.id}</a></td>
                  <td>{r.claimant}</td>
                  <td><span className="badge primary">{r.score}</span></td>
                  <td>{r.age}</td>
                  <td>{r.reason}</td>
                  <td>
                    <span className={`badge ${r.priority === "High" ? "error" : r.priority === "Medium" ? "secondary" : "success"}`}>
                      {r.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="footer-note">
            Future: sort, pagination, claim detail drawer, bulk assignment, and audit trail.
          </div>
        </div>
      </div>
    </>
  );
}
