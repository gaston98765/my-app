
import React from "react";

function StatsStrip() {
  return (
    <section className="stats">
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">1.2K</div>
          <div className="stat-label">Registered students</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">450+</div>
          <div className="stat-label">Tasks completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">30 DT</div>
          <div className="stat-label">Avg. earning / task</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4.9★</div>
          <div className="stat-label">Avg. rating</div>
        </div>
      </div>
    </section>
  );
}
export default StatsStrip;
