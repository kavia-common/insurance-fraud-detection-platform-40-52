import { getConfig } from "../config";

/**
 * Minimal API client. Uses fetch and returns JSON when possible.
 * This is intentionally lightweight to match the template constraints.
 */

function buildUrl(path) {
  const { apiBase } = getConfig();
  const p = path.startsWith("/") ? path : `/${path}`;
  // If apiBase is empty, fall back to relative paths (useful in dev/proxy setups)
  return apiBase ? `${apiBase}${p}` : p;
}

async function parseResponse(res) {
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");
  if (!res.ok) {
    const message =
      (body && typeof body === "object" && (body.detail || body.message)) ||
      (typeof body === "string" && body) ||
      `Request failed with status ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

/**
 * PUBLIC_INTERFACE
 * apiGet performs a GET request against the configured API base.
 */
export async function apiGet(path) {
  const res = await fetch(buildUrl(path), {
    method: "GET",
    headers: { Accept: "application/json" },
    // Do not include credentials by default.
    // When CORS_ALLOW_ALL_ORIGINS=True, browsers will reject responses that try to
    // use wildcard ACAO with credentials. Our current API is unauthenticated, so
    // credentials are unnecessary and can cause CORS failures.
  });
  return parseResponse(res);
}

/**
 * PUBLIC_INTERFACE
 * apiPost performs a POST request with a JSON body.
 */
export async function apiPost(path, payload) {
  const res = await fetch(buildUrl(path), {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    // See apiGet: credentials are intentionally omitted by default to avoid CORS
    // issues with wildcard origins in development/preview environments.
    body: JSON.stringify(payload ?? {}),
  });
  return parseResponse(res);
}

/**
 * PUBLIC_INTERFACE
 * getHealth calls backend health endpoint.
 * Note: discovered from backend swagger (currently only /health/ is present).
 */
export async function getHealth() {
  return apiGet("/health/");
}
