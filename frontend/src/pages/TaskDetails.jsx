// src/pages/TaskDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_URL } from "../api";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingTask, setLoadingTask] = useState(true);

  useEffect(() => {
    async function loadTask() {
      try {
        setLoadingTask(true);
        const res = await fetch(`${API_URL}/api/tasks/${id}`);
        if (!res.ok) {
          throw new Error("Task not found");
        }
        const data = await res.json();
        setTask(data);
        setPrice(data.budget);
      } catch (err) {
        console.error(err);
        setError("Could not load task.");
      } finally {
        setLoadingTask(false);
      }
    }

    loadTask();
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!price || Number(price) <= 0) {
      setError("Please enter a valid proposed price.");
      return;
    }

    if (!message.trim()) {
      setError("Please add a short message for the client.");
      return;
    }

    // still frontend-only for now (no applications backend yet)
    console.log("Application sent (frontend only):", { taskId: id, price, message });
    setSuccess("Your application has been sent! (frontend only for now)");
    setMessage("");
  }

  if (loadingTask) {
    return (
      <div className="page">
        <Navbar />
        <main className="auth-page">
          <div className="auth-card">
            <p>Loading task...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="page">
        <Navbar />
        <main className="auth-page">
          <div className="auth-card">
            <h1>Task not found</h1>
            <button
              className="primary-btn full-width"
              onClick={() => navigate("/dashboard/student")}
            >
              Back to jobs
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page">
      <Navbar />
      <main className="dashboard-page">
        <div className="dashboard-card">
          <button
            className="secondary-btn"
            onClick={() => navigate(-1)}
            style={{ marginBottom: "0.8rem" }}
          >
            ← Back
          </button>

          <h1>{task.title}</h1>
          <p className="dashboard-sub">
            {task.location} · {task.category}
          </p>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <p>
              <strong>Budget:</strong> {task.budget} DT
            </p>
            {task.deadline && (
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(task.deadline).toLocaleDateString()}
              </p>
            )}
            <p style={{ marginTop: "0.7rem" }}>{task.description}</p>
          </div>

          <hr style={{ borderColor: "rgba(31,41,55,1)", margin: "1rem 0" }} />

          <h2 style={{ fontSize: "1rem", marginBottom: "0.6rem" }}>
            Apply for this task
          </h2>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Proposed price (DT)
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>

            <label>
              Message to client
              <textarea
                className="auth-textarea"
                rows={3}
                placeholder="Explain why you are a good fit..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="primary-btn">
              Send application
            </button>
          </form>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}
