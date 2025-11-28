// src/components/layout/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const auth = useAuth();

  // if somehow provider is missing, avoid destructuring crash
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  const { user } = auth;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
