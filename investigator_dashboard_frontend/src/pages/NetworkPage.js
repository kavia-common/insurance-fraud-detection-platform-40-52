import React from "react";
import { PageHeader, Alert } from "../components/ui";

/**
 * PUBLIC_INTERFACE
 * NetworkPage visualizes related claims/actors (placeholder).
 */
export function NetworkPage() {
  return (
    <>
      <PageHeader
        title="Network"
        subtitle="Explore relationships between claims, claimants, vehicles, providers, and addresses."
        actions={<a className="btn btn-primary" href="/queue">Investigate</a>}
      />

      <Alert variant="success" title="Coming next">
        This panel will render a relationship graph and allow drill-down into connected entities.
      </Alert>

      <div className="grid grid-2" style={{ marginTop: 14 }}>
        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Relationship signals</h2>
          <ul style={{ margin: "10px 0 0 18px", color: "rgba(55,65,81,0.92)" }}>
            <li>Shared address across multiple claimants</li>
            <li>Common repair shop / medical provider cluster</li>
            <li>Repeat vehicles, VIN anomalies, or policy overlap</li>
            <li>Temporal patterns (multiple incidents in short period)</li>
          </ul>
        </div>

        <div className="card card-pad">
          <h2 style={{ margin: 0, fontSize: 14 }}>Graph canvas (placeholder)</h2>
          <div
            style={{
              marginTop: 10,
              height: 260,
              borderRadius: 14,
              border: "1px dashed rgba(55,65,81,0.22)",
              background: "linear-gradient(135deg, rgba(244,114,182,0.10), rgba(245,158,11,0.08))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(55,65,81,0.70)",
              fontWeight: 700,
            }}
          >
            Graph rendering will appear here
          </div>
          <div className="footer-note">
            Future: use backend graph endpoint + interactive layout (pan/zoom, filters).
          </div>
        </div>
      </div>
    </>
  );
}
