const express = require("express");
const router = express.Router();

const { createSuggestion, getSuggestions } = require("../controllers/suggestedController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/create", protect, createSuggestion);
router.get("/my-suggestions", protect, getSuggestions);

module.exports = router;
