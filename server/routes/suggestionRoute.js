// routes/suggestionRoute.js
// Defines all nutrition suggestion API endpoints

const express = require("express");
const router = express.Router();

const { createSuggestion, getSuggestions } = require("../controllers/suggestedController");
const { protect } = require("../middlewares/authMiddleware");

// @route   POST /api/suggestions/create
// @desc    Create a new nutrition suggestion based on user metrics
// @access  Protected — requires valid JWT
router.post("/create", protect, createSuggestion);

// @route   GET /api/suggestions/my-suggestions
// @desc    Get all suggestions for the logged-in user
// @access  Protected — requires valid JWT
router.get("/my-suggestions", protect, getSuggestions);

module.exports = router;
