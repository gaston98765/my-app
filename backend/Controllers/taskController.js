const Task = require("../Models/Task");
const Application = require("../Models/Application");

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
const createTask = async (req, res) => {
  try {
    const { title, description, budget, category, location, deadline } = req.body;

    if (!title || !description || !budget || !category) {
      return res.status(400).json({
        message: "Title, description, budget, and category are required.",
      });
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

// GET /api/tasks/mine
const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.userId }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error("Get my tasks error:", err.message);
    res.status(500).json({ message: "Server error while fetching my tasks." });
  }
};

// POST /api/tasks/:id/apply
const applyToTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { price, message } = req.body;

    if (!price || Number(price) <= 0 || !message || !message.trim()) {
      return res.status(400).json({
        message: "Price and message are required.",
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (task.createdBy.toString() === req.userId) {
      return res.status(400).json({
        message: "You cannot apply to your own task.",
      });
    }

    const alreadyApplied = await Application.findOne({
      task: taskId,
      applicant: req.userId,
    });

    if (alreadyApplied) {
      return res.status(409).json({
        message: "You have already applied to this task.",
      });
    }

    const application = await Application.create({
      task: taskId,
      applicant: req.userId,
      price,
      message,
    });

    res.status(201).json(application);
  } catch (err) {
    console.error("Apply to task error:", err.message);
    res.status(500).json({ message: "Server error while applying to task." });
  }
};

// GET /api/tasks/:id/applications
const getApplicationsForTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    if (task.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "You are not allowed to view applicants.",
      });
    }

    const applications = await Application.find({ task: taskId })
      .populate("applicant", "name email role")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (err) {
    console.error("Get applications error:", err.message);
    res.status(500).json({ message: "Server error while loading applicants." });
  }
};

// GET /api/tasks/:id/my-application
const getMyApplicationForTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const app = await Application.findOne({
      task: taskId,
      applicant: req.userId,
    });

    if (!app) {
      return res.json(null);
    }

    res.json(app);
  } catch (err) {
    console.error("Get my application error:", err.message);
    res.status(500).json({
      message: "Server error while checking your application.",
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  getMyTasks,
  applyToTask,
  getApplicationsForTask,
  getMyApplicationForTask,
};
