// src/pages/PostTask.jsx
import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function PostTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !description.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!budget || Number(budget) <= 0) {
      setError("Please enter a valid budget (greater than 0).");
      return;
    }

    // frontend only – later we call backend here
    console.log("Task posted:", { title, description, budget, deadline });

    setSuccess("Your task has been posted! (frontend only for now)");
    setTitle("");
    setDescription("");
    setBudget("");
    setDeadline("");
  }

  return (
    <div className="page">
      <Navbar />
      <main className="auth-page">
        <div className="auth-card">
          <h1>Post a new task</h1>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Task title
              <input
                type="text"
                placeholder="e.g. Help me move to a new dorm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label>
              Description
              <textarea
                placeholder="Describe what needs to be done..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="auth-textarea"
                required
              />
            </label>

            <label>
              Budget (DT)
              <input
                type="number"
                placeholder="30"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </label>

            <label>
              Deadline
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </label>

            <button type="submit" className="primary-btn full-width">
              Submit task
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
