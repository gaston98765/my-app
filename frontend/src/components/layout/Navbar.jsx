// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth() || {};
  const { user, logout } = auth;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? "nav-link active" : "nav-link";

  const avatarLetter =
    (user?.name?.[0] || user?.email?.[0] || "U").toUpperCase();

  const categories = [
    "Room cleaning",
    "Moving & lifting",
    "Tutoring",
    "Groceries & errands",
    "Tech support",
    "Event setup",
    "Pet sitting",
    "Document organization",
  ];

  function handleCategoryClick(cat) {
    setIsCategoriesOpen(false);
    navigate(
      `/dashboard/student?category=${encodeURIComponent(cat)}`
    );
  }

  return (
    <header className="nav">
      <div className="nav-left">
        <Link to="/" className="logo">
          Vit&apos;fait
        </Link>
      </div>

      <nav className="nav-center">
        <div className="nav-categories">
          <button
            type="button"
            className="nav-link"
            onClick={() => setIsCategoriesOpen((o) => !o)}
          >
            Tasks categories ▾
          </button>

          {isCategoriesOpen && (
            <div className="nav-categories-menu">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className="nav-categories-item"
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="nav-link"
          onClick={() => navigate("/post-task")}
        >
          Post a task
        </button>

        {user?.role === "student" && (
          <button
            type="button"
            className="nav-link"
            onClick={() => navigate("/dashboard/student")}
          >
            Find a job
          </button>
        )}
      </nav>

      <div className="nav-right">
        {!user && (
          <>
            <Link to="/login" className={isActive("/login")}>
              Login
            </Link>
            <Link to="/signup" className="nav-cta">
              Sign up →
            </Link>
          </>
        )}

        {user && (
          <div className="nav-user">
            <button
              type="button"
              className="nav-user-btn"
              onClick={() => setIsProfileOpen((o) => !o)}
            >
              <span className="nav-user-avatar">{avatarLetter}</span>
              <span className="nav-user-name">
                {user.name || "Profile"}
              </span>
            </button>

            {isProfileOpen && (
              <div className="nav-user-menu">
                <div className="nav-user-info">
                  <div className="nav-user-avatar big">{avatarLetter}</div>
                  <div className="nav-user-text">
                    <div className="nav-user-name-full">
                      {user.name || "Vit&apos;fait user"}
                    </div>
                    <div className="nav-user-email">
                      {user.email || "No email set"}
                    </div>
                    <div className="nav-user-role">
                      {user.role === "student"
                        ? "Student · Job doer"
                        : "Task giver · Client"}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="nav-menu-item"
                  onClick={() => {
                    if (user.role === "student") {
                      navigate("/dashboard/student");
                    } else {
                      navigate("/dashboard/client");
                    }
                    setIsProfileOpen(false);
                  }}
                >
                  Dashboard
                </button>

                <button
                  type="button"
                  className="nav-menu-item danger"
                  onClick={() => {
                    logout && logout();
                    setIsProfileOpen(false);
                    navigate("/");
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
