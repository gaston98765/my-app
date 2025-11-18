
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="logo">
          Vit&apos;fait
        </Link>
      </div>

      <nav className="nav-center">
        <button className="nav-link">Tasks categories ▾</button>
        <button className="nav-link">Post a task</button>
        <button className="nav-link">Find a job</button>
      </nav>

      <div className="nav-right">
        <Link to="/login" className={isActive("/login")}>
          Login
        </Link>
        <Link to="/signup" className="nav-cta">
          Sign up →
        </Link>
      </div>
    </header>
  );
}

export default Navbar;