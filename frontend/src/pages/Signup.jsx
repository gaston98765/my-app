import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultRole = searchParams.get("role") || "student";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(defaultRole);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!name.trim()) return "Name is required.";
    if (!email.trim()) return "Email is required.";
    if (!email.includes("@") || !email.includes(".")) return "Invalid email.";
    if (password.length < 4)
      return "Password must be at least 4 characters long.";
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

    const result = await signup({ name, email, password, role });

    setLoading(false);

    if (!result.success) {
      setError(result.error || "Signup failed.");
      return;
    }

    if (role === "student") {
      navigate("/dashboard/student");
    } else {
      navigate("/dashboard/client");
    }
  }

  return (
    <div className="page">
      <Navbar />
      <main className="auth-page">
        <div className="auth-card">
          <h1>Create your Vit&apos;fait account</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Full name
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              {role === "student" ? "University email" : "Email"}
              <input
                type="email"
                placeholder={
                  role === "student"
                    ? "you@student.university.tn"
                    : "you@example.com"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
              {loading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          {error && <p className="error-text">{error}</p>}

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
