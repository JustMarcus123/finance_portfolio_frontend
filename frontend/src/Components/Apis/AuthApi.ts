// AuthApi.ts

import BASE_URL from "../../config/api";

export interface AuthResponse {
  email: string;
  firstName: string;
  role: string;
  message: string;
}

export interface MeResponse {
  email: string;
  firstName: string;
  role: string;
}

// ── Silent Refresh ────────────────────────────────────────────────────────────
const tryRefreshToken = async (): Promise<boolean> => {
  try {
    console.log("→ [Refresh] Attempting silent refresh...");
    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      console.log("→ [Refresh] Server rejected refresh request");
      return false;
    }

    console.log("→ [Refresh] Token refreshed successfully ✅");
    return true;
  } catch (err) {
    console.error("→ [Refresh] Network error:", err);
    return false;
  }
};

// ── Request Wrapper ───────────────────────────────────────────────────────────
export const request = async <T>(
  method: string,
  path: string,
  body?: unknown,
  isRetry = false
): Promise<T> => {
  const url = `${BASE_URL}${path}`;

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch (error) {
    throw new Error("Cannot connect to server. Please check your internet.");
  }

  // ✅ auto refresh on 401
  if (res.status === 401 && !isRetry) {
    console.log("→ [API] 401 received — attempting silent refresh...");
    const refreshed = await tryRefreshToken();

    if (refreshed) {
      return request<T>(method, path, body, true); // retry once with new cookie
    }

    // refresh failed — session is dead
    window.location.href = "/login";
    throw new Error("Session expired. Please login again.");
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    if (!res.ok) throw new Error(`Server error (${res.status})`);
    throw new Error("Invalid response from server");
  }

  if (!res.ok) {
    const err = data as { message?: string };
    throw new Error(err.message ?? `Request failed (${res.status})`);
  }

  return data as T;
};

// ── getMeApi — separate, no refresh loop ─────────────────────────────────────
export const getMeApi = async (): Promise<MeResponse | null> => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      credentials: "include",
    });

    if (res.status === 401) {
      // ✅ access token expired on page load — try refresh once
      console.log("→ [Me] 401 on /me — trying refresh...");
      const refreshed = await tryRefreshToken();

      if (refreshed) {
        // retry /me with new access token cookie
        const retryRes = await fetch(`${BASE_URL}/api/auth/me`, {
          credentials: "include",
        });
        if (retryRes.ok) return await retryRes.json();
      }

      return null; // refresh failed — no session
    }

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

// ── Auth API calls ────────────────────────────────────────────────────────────
export const loginApi = (email: string, password: string) =>
  request<AuthResponse>("POST", "/api/auth/login", { email, password });

export const logoutApi = () =>
  request<void>("POST", "/api/auth/logout");