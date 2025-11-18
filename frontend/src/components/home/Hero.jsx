import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <button className="chip">Only for university students</button>
        <h1 className="hero-title">
          Get help from students,
          <br />
          or earn money doing small jobs.
        </h1>
        <p className="hero-subtitle">
          Post a quick task—like moving boxes, cleaning your room, tutoring, or organizing notes—and let other students bid
          in an Indrive-style auction. Fast, affordable, and safe.
        </p>
        <div className="hero-actions">
          <Link to="/signup" className="primary-btn">
            Post a task
          </Link>
          <Link to="/signup" className="secondary-btn">
            Start earning
          </Link>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-card">
          <div className="hero-sidebar">
            <div className="sidebar-logo">Vit&apos;fait</div>
            <nav className="sidebar-nav">
              <div className="sidebar-item active">Dashboard</div>
              <div className="sidebar-item">My tasks</div>
              <div className="sidebar-item">My bids</div>
            </nav>
          </div>
          <div className="hero-dashboard">
            <div className="dash-header">
              <h3>Active tasks near you</h3>
              <p className="dash-meta">Negotiated in real-time between students.</p>
            </div>
            <div className="dash-pill-row">
              <div className="pill">Cleaning</div>
              <div className="pill">Moving</div>
              <div className="pill">Tutoring</div>
              <div className="pill">Tech help</div>
            </div>
            <div className="dash-content">
              <div className="dash-card">
                <span className="dash-label">Help me move to a new dorm</span>
                <span className="dash-meta">🎒 6 bids • starting at 20 DT</span>
              </div>
              <div className="dash-card">
                <span className="dash-label">Organize lecture notes</span>
                <span className="dash-meta">📚 4 bids • starting at 10 DT</span>
              </div>
              <div className="dash-card">
                <span className="dash-label">Clean my room before inspection</span>
                <span className="dash-meta">🧹 8 bids • starting at 25 DT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;