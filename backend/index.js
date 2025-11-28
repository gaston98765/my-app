const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Configuration/connectDB");
const userRoute = require("./Routes/userRoute");
const taskRoute = require("./Routes/taskRoute");

dotenv.config();

const app = express();
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// auth routes
app.use("/api/auth", userRoute);

// task routes
app.use("/api/tasks", taskRoute);

app.get("/", (req, res) => {
  res.send("Vit'fait API is running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
