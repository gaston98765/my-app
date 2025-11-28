import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";

const MOCK_TASKS = [
  {
    id: 1,
    title: "Carry boxes to storage",
    status: "2 applicants",
    budget: "30 DT",
  },
  {
    id: 2,
    title: "Clean my room before inspection",
    status: "Pending",
    budget: "40 DT",
  },
];

export default function ClientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="page">
      <Navbar />
      <main className="dashboard-page">
        <section className="dashboard-card dashboard-client">
          <header className="dashboard-header">
            <div>
              <h1>Client Dashboard</h1>
              <p className="dashboard-sub">
                {user
                  ? `Hi ${user.name || "there"} – manage your tasks and review applicants.`
                  : "Post tasks and manage applications from students."}
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() => navigate("/post-task")}
            >
              + Post a new task
            </button>
          </header>

          <div className="dashboard-task-list">
            {MOCK_TASKS.map((task) => (
              <article key={task.id} className="job-card">
                <div className="job-main">
                  <h3>{task.title}</h3>
                  <p className="job-meta">{task.status}</p>
                </div>
                <div className="job-side">
                  <p className="job-price">{task.budget}</p>
                  <button className="secondary-btn job-apply-btn">
                    View applicants
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
