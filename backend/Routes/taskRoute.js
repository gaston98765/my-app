const express = require("express");
const { getTasks, getTaskById, createTask } = require("../Controllers/taskController");
const isAuth = require("../Middleware/isAuth");

const taskRoute = express.Router();

// GET /api/tasks
taskRoute.get("/", getTasks);

// GET /api/tasks/:id
taskRoute.get("/:id", getTaskById);

// POST /api/tasks  (must be logged in)
taskRoute.post("/", isAuth, createTask);

module.exports = taskRoute;
