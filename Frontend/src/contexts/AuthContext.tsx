import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { loginAPI } from "../api/auth.api";

interface AuthContextType {
  user: { email: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const res = await loginAPI(email, password);
    if (!res || !res.access_token) {
      throw new Error("Login failed");
    }

    const token = res.access_token;
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUser({ email });
  };

  const register = async (email: string, password: string) => {
    // TODO: Replace with API call
    setUser({ email });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setUser({ email });
    }
    setLoading(false);
  }, []);

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
