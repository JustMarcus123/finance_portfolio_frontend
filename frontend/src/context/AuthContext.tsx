import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginApi, logoutApi } from "../Components/Apis/AuthApi";
import TokenStorage from "./TokenStorage";

interface User {
  email: string;
  name: string;
  firstName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, remember: boolean) => Promise<void>;
  logout: () => void;
}

// let's create the context here

const AuthContext = createContext<AuthContextType | null>(null);

//helper: decode jwt payload (no library needed)
const decodedToken = (jwt: string): User | null => {
  try {
    const payload = JSON.parse(atob(jwt.split(".")[1]));

    // check expiry
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null; // token expired
    }

    return {
      email: payload.sub, //spring boots sets subject = email
      name: payload.name ?? payload.sub,
      firstName: payload.firstName ?? "",
      role: payload.role ?? "USER",
    };
  } catch (error) {
    return null;
  }
};

//provider

export const AuthProvider = ({children}:{children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // it should be true until we check storage


  //on app mount restore session from storage
useEffect(() => {
  const restoreSession = async () => {
    const storedAccess  = TokenStorage.getAccess();
    const storedRefresh = TokenStorage.getRefresh();

    if (storedAccess) {
      // Access token exists — decode and restore
      const decoded = decodedToken(storedAccess);
      if (decoded) {
        setToken(storedAccess);
        setUser(decoded);
        console.log("Session restored from access token:", decoded);
        setIsLoading(false);
        return; 
      }
    }

   
    if (storedRefresh) {
      console.log("No valid access token — attempting silent refresh...");
      try {
        const res = await fetch("http://localhost:8080/api/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: storedRefresh }),
        });

        if (res.ok) {
          const data = await res.json();
          TokenStorage.setAccess(data.accessToken);
          const decoded = decodedToken(data.accessToken);
          if (decoded) {
            setToken(data.accessToken);
            setUser(decoded);
            console.log("Session silently restored via refresh token:", decoded);
          }
        } else {
          console.log("Refresh token rejected — clearing session");
          TokenStorage.clearAll();
        }
      } catch (err) {
        console.log("Refresh request failed:", err);
        TokenStorage.clearAll();
      }
    } else {
      console.log("No tokens found — user not authenticated");
    }

    setIsLoading(false);
  };

  restoreSession();
}, []);
// login
const login = async (
  email: string,
  password: string,
  remember: boolean,
): Promise<void> => {
  try {
    const data = await loginApi(email, password);

    if (!data.accessToken) throw new Error("No access token received");

    const decoded = decodedToken(data.accessToken);
    if (!decoded) throw new Error("Invalid access token received");

    TokenStorage.setAccess(data.accessToken);
    TokenStorage.setRefresh(data.refreshToken, remember);

    setToken(data.accessToken);
    setUser(decoded);

    console.log("Login successful — role:", decoded.role);

    // ← redirect based on role
    if (decoded.role === "SUPER_ADMIN") {
      window.location.href = "/dashboard";
    } else if (decoded.role === "EMPLOYER_ADMIN") {
      window.location.href = "/dashboard";
    }

  } catch (error: any) {
    console.error("login failed:", error.message);
    throw error; // ← rethrow so Login.tsx can show the error to the user
  }
};


//logout 

const logout =async(): Promise<void>=>{
    try {
      const refreshToken = TokenStorage.getRefresh();
      if(refreshToken){
        await logoutApi(refreshToken)
        console.log("Server session revoked");
      }
    } catch (error) {
      console.warn("Server logout failed, clearing local tokens anyway");
    }

    //clear everything locally
    TokenStorage.clearAll()
    setToken(null);
    setUser(null);
    console.log("Local session cleared")

}

return (
    <AuthContext.Provider value={{user, token,isLoading,login,logout}}>
        {children}
    </AuthContext.Provider>
)

};


//hook

export const useAuth=(): AuthContextType=>{
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error ("useAuth must be used inside <AuthProvider?>");
    return ctx;
}
