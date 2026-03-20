import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginApi } from "../Components/Apis/AuthApi";

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
    const stored =
      localStorage.getItem("token") ?? sessionStorage.getItem("token");
      console.log("token state changes:", token ? "HAS TOKEN": "NULL");
    if (stored) {
      const decoded = decodedToken(stored);
      if (decoded) {
        setToken(stored);
        setUser(decoded);
      }
    }
    setIsLoading(false);
  }, []);

// login

const login = async (
  email: string,
  password: string,
  remember: boolean,
): Promise<void> => {
  const data = await loginApi(email, password);
  
  //spring boot return {token, email, message}

  const decoded = decodedToken(data.token);
  if(!decoded) throw new Error("Received invalid token from server");

  // remember me-> persist across browser close, otherwise session only

  if(remember){
    localStorage.setItem("token", data.token);

  }else{
    sessionStorage.setItem("token", data.token);
  }

  setToken(data.token);
  setUser(decoded);

};


//logout 

const logout =()=>{
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setToken(null);
    setUser(null);
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
