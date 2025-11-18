import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Login() {
  return (
    <div className="page">
      <Navbar />
      <main className="auth-page">
        <div className="auth-card">
          <h1>Login</h1>
          <form className="auth-form">
            <label>
              Email
              <input type="email" placeholder="you@student.university.tn" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Your password" />
            </label>
            <button type="submit" className="primary-btn full-width">
              Login
            </button>
          </form>
          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Login;