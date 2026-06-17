import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginApi, logoutApi, getMeApi } from "../Components/Apis/AuthApi";

interface User {
  email: string;
  name: string;
  firstName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // on app mount — restore session via cookie
useEffect(() => {
  const restoreSession = async () => {
    try {
      const data = await getMeApi(); //  returns null if no session, no refresh triggered
      if (data) {
        setUser({
          email: data.email,
          firstName: data.firstName,
          name: data.firstName,
          role: data.role,
        });
      }
      // if null → user stays null → not logged in, that's fine
    } catch (err) {
      console.log("No active session");
    } finally {
      setIsLoading(false);
    }
  };
  restoreSession();
}, []);

  // login
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data = await loginApi(email, password); // ✅ cookie set by backend

      setUser({
        email: data.email,
        firstName: data.firstName,
        name: data.firstName,
        role: data.role,
      });

      if (data.role === "SUPER_ADMIN") window.location.href = "/admin/dashboard";
      else if (data.role === "EMPLOYER_ADMIN") window.location.href = "/employer/dashboard";
      else if (data.role === "EMPLOYEE") window.location.href = "/employee/dashboard";

    } catch (error: any) {
      console.error("Login failed:", error.message);
      throw error; // rethrow so Login.tsx can show the error
    }
  };

  // logout
  const logout = async (): Promise<void> => {
    try {
      await logoutApi(); // ✅ cookie cleared by backend
    } catch (error) {
      console.warn("Server logout failed");
    } finally {
      setUser(null);
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};