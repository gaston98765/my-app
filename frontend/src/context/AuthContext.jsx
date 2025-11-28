// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

// create the context
export const AuthContext = createContext(null);

// provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // user will look like: { name, email, role }

  function signup({ name, email, role }) {
    // later: call backend, for now just store in state
    setUser({ name, email, role });
  }

  function login({ email, role }) {
    // later: real auth
    setUser({ name: "Vitfait User", email, role });
  }

  function logout() {
    setUser(null);
  }

  const value = { user, signup, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// small helper hook
export function useAuth() {
  return useContext(AuthContext);
}
