// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../api";

const AuthContext = createContext(null);

function normalizeUser(raw) {
  if (!raw) return null;

  // Ensure we always have user.id available everywhere
  const id = raw.id || raw._id;

  return {
    ...raw,
    id,
    _id: raw._id || id,
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // normalized user
  const [token, setToken] = useState(
    () => localStorage.getItem("vitfait_token") || null
  );
  const [authReady, setAuthReady] = useState(false);

  // Load current user if we already have a token
  useEffect(() => {
    let cancelled = false;

    async function loadUser() {
      if (!token) {
        if (!cancelled) {
          setUser(null);
          setAuthReady(true);
        }
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
          if (!cancelled) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("vitfait_token");
          }
        } else {
          const data = await res.json();
          if (!cancelled) setUser(normalizeUser(data));
        }
      } catch (err) {
        console.error("Error loading current user:", err);
        if (!cancelled) {
          setUser(null);
          setToken(null);
          localStorage.removeItem("vitfait_token");
        }
      } finally {
        if (!cancelled) setAuthReady(true);
      }
    }

    loadUser();

    return () => {
      cancelled = true;
    };
  }, [token]);

  // Signup
  async function signup({ name, email, password, role }) {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return { success: false, error: data.message || "Signup failed." };
      }

      setUser(normalizeUser(data.user));
      setToken(data.token);
      localStorage.setItem("vitfait_token", data.token);

      return { success: true, user: normalizeUser(data.user) };
    } catch (err) {
      console.error("Signup error:", err);
      return { success: false, error: "Network error during signup." };
    }
  }

  // Login
  async function login({ email, password, role }) {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        return { success: false, error: data.message || "Login failed." };
      }

      // IMPORTANT FIX:
      // Do NOT let frontend override the real backend role.
      // If user selected a role on the login page, just validate it matches.
      if (role && data.user?.role && role !== data.user.role) {
        return {
          success: false,
          error: `This account is registered as "${data.user.role}".`,
        };
      }

      const finalUser = normalizeUser(data.user);

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
