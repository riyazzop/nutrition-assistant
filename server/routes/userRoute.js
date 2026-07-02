// routes/userRoute.js
// Defines all user-related API endpoints

const express = require("express");
const router = express.Router();

const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", loginUser);

// @route   GET /api/users/profile
// @desc    Get logged-in user's profile
// @access  Protected — requires valid JWT
router.get("/profile", protect, getUserProfile);

module.exports = router;
