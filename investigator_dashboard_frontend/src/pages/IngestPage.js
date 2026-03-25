import React, { useState } from "react";
import { PageHeader, Alert } from "../components/ui";

/**
 * PUBLIC_INTERFACE
 * IngestPage provides claim ingestion UI (manual entry / file upload placeholder).
 */
export function IngestPage() {
  const [claimId, setClaimId] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState({ kind: null, message: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder until backend provides ingestion endpoints.
    setStatus({
      kind: "success",
      message: `Captured ingestion request for ${claimId || "(no id)"} (mock only).`,
    });
    setClaimId("");
    setNotes("");
  };

  return (
    <>
      <PageHeader
        title="Claim Ingestion"
        subtitle="Upload or enter claim records to score and route to investigators."
        actions={<a className="btn btn-primary" href="/queue">Go to Queue</a>}
      />

      {status.kind ? (
        <Alert variant={status.kind} title={status.kind === "success" ? "Saved" : "Error"}>
          {status.message}
        </Alert>
      ) : null}

      <div className="grid grid-2" style={{ marginTop: 14 }}>
        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Manual entry</h2>
          <p className="page-subtitle" style={{ marginTop: 6 }}>
            Quickly add a claim stub and supporting notes.
          </p>

          <form onSubmit={onSubmit}>
            <div className="field" style={{ marginTop: 10 }}>
              <label htmlFor="claimId">Claim ID</label>
              <input
                id="claimId"
                className="input"
                placeholder="e.g., CLM-100301"
                value={claimId}
                onChange={(e) => setClaimId(e.target.value)}
              />
            </div>

            <div className="field" style={{ marginTop: 10 }}>
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                className="textarea"
                placeholder="Add context (loss description, adjuster concerns, etc.)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button className="btn btn-primary" type="submit">Submit for scoring</button>
              <button className="btn" type="button" onClick={() => { setClaimId(""); setNotes(""); }}>
                Clear
              </button>
            </div>

            <div className="footer-note">
              Next: validate schema, attach documents, and call backend ingestion endpoint.
            </div>
          </form>
        </div>

        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>File upload (placeholder)</h2>
          <p className="page-subtitle" style={{ marginTop: 6 }}>
            Upload CSV/JSON exports from claims systems.
          </p>

          <div className="alert" style={{ marginTop: 10 }}>
            <strong style={{ display: "block", marginBottom: 6 }}>Not yet connected</strong>
            <div style={{ fontSize: 13 }}>
              Backend currently exposes only <code>/health/</code>. Upload will be wired once ingestion APIs exist.
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <input className="input" type="file" disabled aria-label="Upload file (disabled)" />
            <div className="help">Supported: CSV, JSON. (Disabled for now.)</div>
          </div>
        </div>
      </div>
    </>
  );
}
