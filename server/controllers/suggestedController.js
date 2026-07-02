// controllers/suggestedController.js
// Handles creating nutrition suggestions and fetching past suggestions

const Suggestion = require("../models/Suggestion");
const suggestNutrition = require("../utils/suggestNutrition");

// ─── Controller: Create Suggestion ───────────────────────────────────────────
/**
 * @route   POST /api/suggestions/create
 * @access  Protected (requires JWT)
 * @desc    Takes user body metrics and goal, calculates nutrition plan, saves to DB
 */
const createSuggestion = async (req, res) => {
  const { goal, age, weight, height, activityLevel } = req.body;

  // Validate all required fields are present
  if (!goal || !age || !weight || !height || !activityLevel) {
    return res.status(400).json({
      message: "Please provide goal, age, weight, height, and activityLevel",
    });
  }

  try {
    // Call the utility function to calculate calorie needs and macros
    const nutritionResult = suggestNutrition({
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      activityLevel,
      goal,
    });

    // Save the result as a Suggestion document linked to the logged-in user
    const suggestion = await Suggestion.create({
      userId: req.user._id, // req.user is set by the authMiddleware
      goal,
      dailyCalories: nutritionResult.dailyCalories,
      macros: nutritionResult.macros,
      mealSuggestions: nutritionResult.mealSuggestions,
    });

    res.status(201).json({
      message: "Nutrition suggestion created successfully",
      suggestion,
    });
  } catch (error) {
    console.error("Create suggestion error:", error.message);
    res.status(500).json({ message: "Server error creating suggestion" });
  }
};

// ─── Controller: Get User's Suggestions ──────────────────────────────────────
/**
 * @route   GET /api/suggestions/my-suggestions
 * @access  Protected (requires JWT)
 * @desc    Fetches all nutrition suggestions belonging to the logged-in user
 */
const getSuggestions = async (req, res) => {
  try {
    // Query suggestions where the userId matches the logged-in user
    // Sort by most recent first
    const suggestions = await Suggestion.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: suggestions.length,
      suggestions,
    });
  } catch (error) {
    console.error("Get suggestions error:", error.message);
    res.status(500).json({ message: "Server error fetching suggestions" });
  }
};

module.exports = { createSuggestion, getSuggestions };
