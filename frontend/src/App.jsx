import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import PostTask from "./pages/PostTask";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import TaskDetails from "./pages/TaskDetails";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* student dashboard – only for role "student" */}
        <Route
          path="/dashboard/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* client dashboard – only for role "client" */}
        <Route
          path="/dashboard/client"
          element={
            <ProtectedRoute role="client">
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* post task – any logged-in user can use (student or client) */}
        <Route
          path="/post-task"
          element={
            <ProtectedRoute>
              <PostTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetails />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}
