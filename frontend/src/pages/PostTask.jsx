import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { API_URL } from "../api";

export default function PostTask() {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [category, setCategory] = useState("Room cleaning");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim() || !description.trim()) {
      setError("Please fill in title and description.");
      return;
    }

    if (!budget || Number(budget) <= 0) {
      setError("Please enter a valid budget (greater than 0).");
      return;
    }

    if (!token) {
      setError("You must be logged in to post a task.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          budget: Number(budget),
          category,
          location: location || "Campus",
          deadline: deadline || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to post task.");
      } else {
        setSuccess("Your task has been posted!");
        setTitle("");
        setDescription("");
        setBudget("");
        setLocation("");
        setDeadline("");
      }
    } catch (err) {
      console.error(err);
      setError("Network error while posting task.");
    } finally {
      setLoading(false);
    }
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
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="auth-select"
              >
                <option value="Room cleaning">Room cleaning</option>
                <option value="Moving & lifting">Moving & lifting</option>
                <option value="Tutoring">Tutoring</option>
                <option value="Groceries & errands">Groceries & errands</option>
                <option value="Tech support">Tech support</option>
                <option value="Event setup">Event setup</option>
                <option value="Pet sitting">Pet sitting</option>
                <option value="Document organization">
                  Document organization
                </option>
              </select>
            </label>

            <label>
              Location
              <input
                type="text"
                placeholder="e.g. Residence A, campus"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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

            <button
              type="submit"
              className="primary-btn full-width"
              disabled={loading}
            >
              {loading ? "Posting..." : "Submit task"}
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
