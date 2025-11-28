// src/pages/TaskDetails.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { MOCK_TASKS } from "../data/mockTasks";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const taskId = Number(id);
  const task = MOCK_TASKS.find((t) => t.id === taskId);

  const [price, setPrice] = useState(task ? task.budget : "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    // frontend only for now
    console.log("Application sent:", { taskId, price, message });

    setSuccess("Your application has been sent! (frontend only for now)");
    setMessage("");
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
            Posted by {task.postedBy} · {task.location}
          </p>

          <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
            <p>
              <strong>Category:</strong> {task.category}
            </p>
            <p>
              <strong>Budget:</strong> {task.budget} DT
            </p>
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
