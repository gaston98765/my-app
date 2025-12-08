// backend/Routes/taskRoute.js
const express = require("express");
const {
  getTasks,
  getTaskById,
  createTask,
  getMyTasks,
  applyToTask,
  getApplicationsForTask,
  getMyApplicationForTask,
} = require("../Controllers/taskController");
const isAuth = require("../Middleware/isAuth");

const taskRoute = express.Router();

// tasks created by current user (client dashboard)
taskRoute.get("/mine", isAuth, getMyTasks);

// 👇 more specific routes FIRST
taskRoute.get("/:id/my-application", isAuth, getMyApplicationForTask);
taskRoute.get("/:id/applications", isAuth, getApplicationsForTask);

// all tasks (student dashboard)
taskRoute.get("/", getTasks);

// single task details
taskRoute.get("/:id", getTaskById);

// create new task
taskRoute.post("/", isAuth, createTask);

// apply to a task
taskRoute.post("/:id/apply", isAuth, applyToTask);

module.exports = taskRoute;
