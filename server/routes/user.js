const express = require("express");
const userController = require("../controlllers/user");
const authMiddleware = require("../middlewares/authMiddleware");
const passport = require("passport");
const router = express.Router();

// OAuth Routes
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  userController.googleLogin
);
router.get("/auth/failure", (req, res) =>
  res.status(401).json({ message: "OAuth Login Failed" })
);

// User Authentication Routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Protected Routes users list
router.get("/users", authMiddleware, userController.users);

module.exports = router;
