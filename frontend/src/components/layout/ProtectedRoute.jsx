// src/components/layout/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, token, authReady } = useAuth();

  // Wait until we know if user is logged in or not
  if (!authReady) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If no token/user -> login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
