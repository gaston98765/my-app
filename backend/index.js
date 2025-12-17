const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./Configuration/connectDB");
const userRoute = require("./Routes/userRoute");
const taskRoute = require("./Routes/taskRoute");

dotenv.config();

const app = express();
connectDB();

//  Allow localhost in dev + Render frontend in production
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // e.g. https://vitfait-frontend.onrender.com
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
