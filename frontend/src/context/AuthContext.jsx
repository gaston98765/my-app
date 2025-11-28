// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // { id, name, email, role }
  const [token, setToken] = useState(
    () => localStorage.getItem("vitfait_token") || null
  );
  const [authReady, setAuthReady] = useState(false);

  // Load current user if we already have a token
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        setAuthReady(true);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          // token not valid anymore
          setUser(null);
          setToken(null);
          localStorage.removeItem("vitfait_token");
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        console.error("Error loading current user:", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("vitfait_token");
      } finally {
        setAuthReady(true);
      }
    }

    loadUser();
  }, [token]);

  // Real signup calling backend
  async function signup({ name, email, password, role }) {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.message || "Signup failed." };
      }

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("vitfait_token", data.token);

      return { success: true };
    } catch (err) {
      console.error("Signup error:", err);
      return { success: false, error: "Network error during signup." };
    }
  }

  // Real login calling backend
  async function login({ email, password, role }) {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.message || "Login failed." };
      }

      // Backend already knows the real role of the user, but
      // for now we still let the frontend choose (like before)
      const finalUser = { ...data.user, role: role || data.user.role };

      setUser(finalUser);
      setToken(data.token);
      localStorage.setItem("vitfait_token", data.token);

      return { success: true, user: finalUser };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: "Network error during login." };
    }
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("vitfait_token");
  }

  const value = {
    user,
    token,
    authReady,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
