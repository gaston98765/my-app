// src/pages/ClientDashboard.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

export default function ClientDashboard() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMyTasks() {
      if (!token) {
        setError("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/tasks/mine`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to load your tasks.");
        }

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
        setError("Could not load your tasks.");
      } finally {
        setLoading(false);
      }
    }

    loadMyTasks();
  }, [token]);

  return (
    <div className="page">
      <Navbar />
      <main className="dashboard-page">
        <section className="dashboard-card">
          <header className="dashboard-header">
            <div>
              <h1>Client Dashboard</h1>
              <p className="dashboard-sub">
                Tasks you have posted on Vit&apos;fait.
              </p>
            </div>
            <button
              className="primary-btn"
              onClick={() => navigate("/post-task")}
            >
              Post a new task
            </button>
          </header>

          {loading && <p className="dashboard-sub">Loading your tasks...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && !error && (
            <div className="dashboard-job-list">
              {tasks.map((task) => (
                <article key={task._id} className="job-card">
                  <div className="job-main">
                    <h3>{task.title}</h3>
                    <p className="job-meta">
                      {task.location} · {task.category}
                    </p>
                    {task.deadline && (
                      <p className="job-meta">
                        Deadline:{" "}
                        {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="job-side">
                    <p className="job-price">{task.budget} DT</p>
                    <button
                      className="secondary-btn"
                      onClick={() => navigate(`/tasks/${task._id}`)}
                    >
                      View &amp; applicants
                    </button>

                  </div>
                </article>
              ))}

              {tasks.length === 0 && (
                <p className="dashboard-sub">
                  You haven&apos;t posted any tasks yet.
                </p>
              )}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
