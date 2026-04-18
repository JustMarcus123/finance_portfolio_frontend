
import TokenStorage from "../../context/TokenStorage";

const BASE_URL ="http://localhost:8080"

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    email: string;
    message:string
}

// ── Silent Refresh Logic ──────────────────────────────────────────────────────
const tryRefreshToken = async (): Promise<boolean> => {
  const refreshToken = TokenStorage.getRefresh();
  if (!refreshToken) {
    console.log("→ [Refresh] No refresh token available");
    return false;
  }

  try {
    console.log("→ [Refresh] Attempting silent refresh...");

    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      console.log("→ [Refresh] Server rejected refresh request");
      return false;
    }

    const data: AuthResponse = await res.json();
    TokenStorage.setAccess(data.accessToken);

    console.log("→ [Refresh] New access token stored successfully ✅");
    return true;
  } catch (err) {
    console.error("→ [Refresh] Network error during refresh:", err);
    return false;
  }
};

//request wrapper
const request=async<T>(method: string,  path:string, body?:unknown, authenticated=false, isRetry=false): Promise<T> =>{

    const url = `${BASE_URL}${path}`;

    const headers: Record<string, string>={
        "Content-type":"application/json",

    };

    if(authenticated){
        const token = TokenStorage.getAccess();

        if(token){
            headers["Authorization"] =`Bearer ${token}`;
        }
    }

    let res: Response;
    try {
        res = await fetch (url,{
            method, headers,body:body ? JSON.stringify(body) : undefined,

        });
    } catch (error) {
        console.error("netWork error", error);
        throw new Error("cannot connect to server. please check your internet");

    }

    // Auto refresh on 401
  if (res.status === 401 && authenticated && !isRetry) {
    console.log("→ [API] Received 401 — attempting silent refresh...");
    const refreshed = await tryRefreshToken();

    if (refreshed) {
      return request<T>(method, path, body, authenticated, true); // retry once
    }

    // Refresh failed → force logout
    TokenStorage.clearAll();
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

    

    return data as T

}


 export const loginApi =(email:string, password:string)=>
   request<AuthResponse>("POST","/api/auth/login",{email, password});

 export const logoutApi=(refreshToken:string)=>
    request<AuthResponse>("POST","/api/auth/lougout")




