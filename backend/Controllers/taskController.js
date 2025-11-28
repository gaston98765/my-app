// backend/Controllers/taskController.js
const Task = require("../Models/Task");

// GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Get tasks error:", err.message);
    res.status(500).json({ message: "Server error while fetching tasks." });
  }
};

// GET /api/tasks/:id
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.json(task);
  } catch (err) {
    console.error("Get task by id error:", err.message);
    res.status(500).json({ message: "Server error while fetching task." });
  }
};

// POST /api/tasks
// requires isAuth, uses req.userId from token
const createTask = async (req, res) => {
  try {
    const { title, description, budget, category, location, deadline } =
      req.body;

    if (!title || !description || !budget || !category) {
      return res
        .status(400)
        .json({ message: "Title, description, budget, and category are required." });
    }

    const task = await Task.create({
      title,
      description,
      budget,
      category,
      location: location || "Campus",
      deadline: deadline ? new Date(deadline) : undefined,
      createdBy: req.userId,
    });

    res.status(201).json(task);
  } catch (err) {
    console.error("Create task error:", err.message);
    res.status(500).json({ message: "Server error while creating task." });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
};
