// src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_URL } from "../api";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const categoryFilter = searchParams.get("category");

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/tasks`);
        if (!res.ok) {
          throw new Error("Failed to load tasks.");
        }
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
        setError("Could not load tasks.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory = categoryFilter
      ? task.category === categoryFilter
      : true;

    const matchesSearch = searchText
      ? task.title.toLowerCase().includes(searchText.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="page">
      <Navbar />
      <main className="dashboard-page">
        <section className="dashboard-card">
          <header className="dashboard-header">
            <div>
              <h1>Student Dashboard</h1>
              <p className="dashboard-sub">
                Find quick jobs posted by other students on your campus.
              </p>
              {categoryFilter && (
                <p className="dashboard-sub">
                  Filtering by category: <strong>{categoryFilter}</strong>
                </p>
              )}
            </div>

            <div className="dashboard-search">
              <input
                type="text"
                placeholder="Search a job..."
                className="dashboard-search-input"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </header>

          {loading && <p className="dashboard-sub">Loading tasks...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && (
            <div className="dashboard-job-list">
              {filteredTasks.map((job) => (
                <article key={job._id} className="job-card">
                  <div className="job-main">
                    <h3>{job.title}</h3>
                    <p className="job-meta">
                      {job.location} · {job.category}
                    </p>
                  </div>
                  <div className="job-side">
                    <p className="job-price">{job.budget} DT</p>
                    <button
                      className="primary-btn job-apply-btn"
                      onClick={() => navigate(`/tasks/${job._id}`)}
                    >
                      View &amp; apply
                    </button>
                  </div>
                </article>
              ))}

              {filteredTasks.length === 0 && (
                <p className="dashboard-sub">No tasks match your filters.</p>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
