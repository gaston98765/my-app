// src/pages/TaskDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { API_URL } from "../api";
import { useAuth } from "../context/AuthContext";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [task, setTask] = useState(null);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingTask, setLoadingTask] = useState(true);

  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(false);

  const [myApplication, setMyApplication] = useState(null);
  const [loadingMyApp, setLoadingMyApp] = useState(false);

  const userId = user?.id || user?._id;

  // createdBy can be either an ObjectId string or a populated object
  const taskOwnerId = task?.createdBy?._id || task?.createdBy;
  const isOwner =
    taskOwnerId && userId && String(taskOwnerId) === String(userId);

  // load task details
  useEffect(() => {
    let cancelled = false;

    async function loadTask() {
      try {
        setLoadingTask(true);
        setError("");
        setSuccess("");

        const res = await fetch(`${API_URL}/api/tasks/${id}`);
        if (!res.ok) throw new Error("Task not found");

        const data = await res.json();
        if (cancelled) return;

        setTask(data);
        setPrice(data.budget ?? "");
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Could not load task.");
      } finally {
        if (!cancelled) setLoadingTask(false);
      }
    }

    loadTask();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // load applicants if current user is owner
  useEffect(() => {
    let cancelled = false;

    async function loadApplications() {
      if (!token || !isOwner) return;

      try {
        setLoadingApps(true);

        const res = await fetch(`${API_URL}/api/tasks/${id}/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load applications");

        const data = await res.json();
        if (cancelled) return;

        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoadingApps(false);
      }
    }

    loadApplications();
    return () => {
      cancelled = true;
    };
  }, [id, token, isOwner]);

  // load my application (if not owner)
  useEffect(() => {
    let cancelled = false;

    async function loadMyApplication() {
      if (!token || !userId || isOwner) return;

      try {
        setLoadingMyApp(true);

        const res = await fetch(`${API_URL}/api/tasks/${id}/my-application`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to load your application");

        const data = await res.json();
        if (cancelled) return;

        setMyApplication(data); // either null or application object
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoadingMyApp(false);
      }
    }

    loadMyApplication();
    return () => {
      cancelled = true;
    };
  }, [id, token, userId, isOwner]);

  async function handleSubmit(e) {
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
    if (!token) {
      setError("You must be logged in to apply.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ price: Number(price), message }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.message || "Failed to send application.");
        return;
      }

      setSuccess("Your application has been sent!");
      setMessage("");
      setMyApplication(data); // hides the form immediately
    } catch (err) {
      console.error(err);
      setError("Network error while sending application.");
    }
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

          {/* OWNER: can't apply, just info + applicants */}
          {isOwner && (
            <div style={{ marginBottom: "1rem" }}>
              <p className="dashboard-sub">
                You posted this task, so you cannot apply to it.
              </p>
            </div>
          )}

          {/* STUDENT area (fixed: wait for myApplication to load before showing form) */}
          {!isOwner && (
            <>
              {loadingMyApp && (
                <p className="dashboard-sub">Checking your application...</p>
              )}

              {!loadingMyApp && myApplication && (
                <div style={{ marginBottom: "1rem" }}>
                  <p className="success-text">You already applied to this task.</p>
                  <p className="dashboard-sub">
                    Your price: <strong>{myApplication.price} DT</strong>
                  </p>
                  <p className="dashboard-sub">
                    Your message: <em>{myApplication.message}</em>
                  </p>
                </div>
              )}

              {!loadingMyApp && !myApplication && (
                <>
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
                </>
              )}
            </>
          )}

          {/* Applicants section for owner */}
          {isOwner && (
            <div style={{ marginTop: "1.5rem" }}>
              <h2 style={{ fontSize: "1rem", marginBottom: "0.6rem" }}>
                Applicants
              </h2>
              {loadingApps && (
                <p className="dashboard-sub">Loading applicants...</p>
              )}
              {!loadingApps && applications.length === 0 && (
                <p className="dashboard-sub">No one has applied yet.</p>
              )}
              {!loadingApps &&
                applications.map((app) => (
                  <div
                    key={app._id}
                    className="job-card"
                    style={{ marginBottom: "0.6rem" }}
                  >
                    <div className="job-main">
                      <p>
                        <strong>{app.applicant?.name}</strong>{" "}
                        <span className="job-meta">
                          ({app.applicant?.email} · {app.applicant?.role})
                        </span>
                      </p>
                      <p className="job-meta">{app.message}</p>
                    </div>
                    <div className="job-side">
                      <p className="job-price">{app.price} DT</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
