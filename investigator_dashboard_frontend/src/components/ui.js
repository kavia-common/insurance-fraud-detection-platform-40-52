import React from "react";

/**
 * PUBLIC_INTERFACE
 * PageHeader renders a standard page header with title/subtitle and optional actions.
 */
export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="page-header">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
      </div>
      {actions ? <div style={{ display: "flex", gap: 10 }}>{actions}</div> : null}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Alert shows an inline message.
 */
export function Alert({ variant = "error", title, children }) {
  return (
    <div className={`alert ${variant}`} role={variant === "error" ? "alert" : "status"}>
      {title ? <strong style={{ display: "block", marginBottom: 6 }}>{title}</strong> : null}
      <div style={{ fontSize: 13, color: "rgba(55,65,81,0.95)" }}>{children}</div>
    </div>
  );
}
