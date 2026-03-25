import React, { useState } from "react";
import { PageHeader, Alert } from "../components/ui";

const mockCases = [
  { caseId: "CASE-9021", claimId: "CLM-100233", investigator: "Taylor", status: "In Progress", outcome: "—", updated: "1h" },
  { caseId: "CASE-9017", claimId: "CLM-100110", investigator: "Morgan", status: "Awaiting Docs", outcome: "—", updated: "6h" },
  { caseId: "CASE-8999", claimId: "CLM-100032", investigator: "Riley", status: "Closed", outcome: "Fraud Confirmed", updated: "2d" },
];

/**
 * PUBLIC_INTERFACE
 * CasesPage manages assigned investigations and outcome recording.
 */
export function CasesPage() {
  const [selected, setSelected] = useState(mockCases[0]);
  const [outcome, setOutcome] = useState("");
  const [note, setNote] = useState("");
  const [statusMsg, setStatusMsg] = useState(null);

  const onSave = () => {
    setStatusMsg(`Recorded outcome "${outcome || "—"}" for ${selected.caseId} (mock only).`);
    setOutcome("");
    setNote("");
  };

  return (
    <>
      <PageHeader
        title="Cases"
        subtitle="Assignments, investigation notes, and outcomes."
        actions={<a className="btn btn-primary" href="/queue">Back to Queue</a>}
      />

      {statusMsg ? (
        <Alert variant="success" title="Saved (mock)">
          {statusMsg}
        </Alert>
      ) : null}

      <div className="grid grid-2" style={{ marginTop: 14 }}>
        <div className="card">
          <div className="card-pad">
            <h2 style={{ margin: 0, fontSize: 14 }}>Assigned cases</h2>
            <p className="page-subtitle" style={{ marginTop: 6 }}>Select a case to update details.</p>
          </div>
          <div className="card-pad" style={{ paddingTop: 0 }}>
            <table className="table" aria-label="Cases table">
              <thead>
                <tr>
                  <th>Case</th>
                  <th>Claim</th>
                  <th>Investigator</th>
                  <th>Status</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {mockCases.map((c) => (
                  <tr
                    key={c.caseId}
                    onClick={() => setSelected(c)}
                    style={{ cursor: "pointer", background: selected.caseId === c.caseId ? "rgba(244,114,182,0.10)" : "transparent" }}
                  >
                    <td style={{ textDecoration: "underline" }}>{c.caseId}</td>
                    <td>{c.claimId}</td>
                    <td>{c.investigator}</td>
                    <td><span className="badge secondary">{c.status}</span></td>
                    <td>{c.updated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="footer-note">Mock data until cases endpoints are available.</div>
          </div>
        </div>

        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Record outcome</h2>
          <p className="page-subtitle" style={{ marginTop: 6 }}>
            {selected.caseId} • {selected.claimId}
          </p>

          <div className="field" style={{ marginTop: 10 }}>
            <label htmlFor="outcome">Outcome</label>
            <select
              id="outcome"
              className="select"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
            >
              <option value="">Select…</option>
              <option value="False Positive">False Positive</option>
              <option value="Inconclusive">Inconclusive</option>
              <option value="Fraud Confirmed">Fraud Confirmed</option>
              <option value="Referred to Legal">Referred to Legal</option>
            </select>
          </div>

          <div className="field" style={{ marginTop: 10 }}>
            <label htmlFor="note">Investigation note</label>
            <textarea
              id="note"
              className="textarea"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a concise rationale and evidence summary…"
            />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className="btn btn-primary" type="button" onClick={onSave}>Save</button>
            <button className="btn" type="button" onClick={() => { setOutcome(""); setNote(""); }}>
              Reset
            </button>
          </div>

          <div className="footer-note">
            Future: persist to backend, role-based access, attachments, and audit history.
          </div>
        </div>
      </div>
    </>
  );
}
