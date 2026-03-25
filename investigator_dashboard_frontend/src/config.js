/**
 * Centralized configuration for the frontend.
 * Reads from existing REACT_APP_* environment variables.
 */

const trimTrailingSlash = (v) => (v ? String(v).replace(/\/+$/, "") : v);

/**
 * PUBLIC_INTERFACE
 * getConfig returns normalized config values used throughout the app.
 */
export function getConfig() {
  const apiBase =
    trimTrailingSlash(process.env.REACT_APP_API_BASE) ||
    trimTrailingSlash(process.env.REACT_APP_BACKEND_URL) ||
    "";

  return {
    apiBase,
    backendUrl: trimTrailingSlash(process.env.REACT_APP_BACKEND_URL) || apiBase,
    frontendUrl: trimTrailingSlash(process.env.REACT_APP_FRONTEND_URL) || "",
    wsUrl: trimTrailingSlash(process.env.REACT_APP_WS_URL) || "",
    nodeEnv: process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV || "development",
    logLevel: process.env.REACT_APP_LOG_LEVEL || "info",
    healthcheckPath: process.env.REACT_APP_HEALTHCHECK_PATH || "/health/",
    featureFlagsRaw: process.env.REACT_APP_FEATURE_FLAGS || "",
    experimentsEnabled: String(process.env.REACT_APP_EXPERIMENTS_ENABLED || "false") === "true",
  };
}

/**
 * PUBLIC_INTERFACE
 * parseFeatureFlags converts REACT_APP_FEATURE_FLAGS to a set-like object.
 * Expected formats:
 * - "flagA,flagB"
 * - "flagA;flagB"
 * - "flagA flagB"
 */
export function parseFeatureFlags(raw) {
  const v = (raw ?? "").trim();
  if (!v) return {};
  const parts = v.split(/[,\s;]+/g).map((s) => s.trim()).filter(Boolean);
  return parts.reduce((acc, k) => {
    acc[k] = true;
    return acc;
  }, {});
}
