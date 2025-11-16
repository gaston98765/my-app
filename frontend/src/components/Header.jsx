import { Link } from "react-router-dom";
import React from "react";


 function Header() {
  return (
    <header className="header">
      <div className="logo">Vitefait</div>

      <nav className="nav">
        <a href="#">Categories</a>
        <a href="#">For Students</a>
        <a href="#">24U24</a>
      </nav>

      <div>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/signup" className="btn-primary">Sign Up</Link>
      </div>
    </header>
  );
}
export default Header;