const express = require("express");
const {
  signupUser,
  loginUser,
  getCurrentUser,
} = require("../Controllers/userController");
const isAuth = require("../Middleware/isAuth");

const userRoute = express.Router();


userRoute.post("/signup", signupUser);
userRoute.post("/login", loginUser);
userRoute.get("/me", isAuth, getCurrentUser);


module.exports = userRoute;
