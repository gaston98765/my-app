import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Signup() {
  return (
    <div className="page">
      <Navbar />
      <main className="auth-page">
        <div className="auth-card">
          <h1>Create your Vit&apos;fait account</h1>
          <form className="auth-form">
            <label>
              Full name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              University email
              <input type="email" placeholder="you@student.university.tn" />
            </label>
            <label>
              Password
              <input type="password" placeholder="Create a password" />
            </label>
            <button type="submit" className="primary-btn full-width">
              Sign up
            </button>
          </form>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Signup;