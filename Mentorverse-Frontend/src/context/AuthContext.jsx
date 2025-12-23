import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // <--- new

  useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    setLoading(false);
    return;
  }

  api.get("/auth/validate-token")
    .then(() => {
      // token valid → keep user
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
      setToken(storedToken);
    })
    .catch(() => {
      // token expired
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setToken(null);
    })
    .finally(() => setLoading(false));
}, []);

const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // must be stringified
    setUser(data.user);
    setToken(data.token);
  if (!data.user || !data.token) {
    console.error("Login failed: missing user or token", data);
    return;
  }
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
