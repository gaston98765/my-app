// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email.trim()) return "Email is required.";
    if (!email.includes("@") || !email.includes(".")) return "Invalid email.";
    if (!password.trim()) return "Password is required.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    // simulate backend call
    setTimeout(() => {
      login({ email, role });

      if (role === "student") navigate("/dashboard/student");
      else navigate("/dashboard/client");

      setLoading(false);
    }, 600);
  }

  return (
    <div className="page">
      <Navbar />
      <main className="auth-page">
        <div className="auth-card">
          <h1>Login</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                placeholder="you@student.university.tn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label>
              Role
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="auth-select"
              >
                <option value="student">Student (Job Doer)</option>
                <option value="client">Task Giver</option>
              </select>
            </label>

            <button
              type="submit"
              className="primary-btn full-width"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {error && <p className="error-text">{error}</p>}

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
