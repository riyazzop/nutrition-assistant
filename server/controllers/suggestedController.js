const Suggestion = require("../models/Suggestion");
const suggestNutrition = require("../utils/suggestNutrition");

const createSuggestion = async (req, res) => {
  const { goal, age, weight, height, activityLevel } = req.body;

  if (!goal || !age || !weight || !height || !activityLevel) {
    return res.status(400).json({
      message: "Please provide goal, age, weight, height, and activityLevel",
    });
  }

  try {
    const nutritionResult = suggestNutrition({
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      activityLevel,
      goal,
    });

    const suggestion = await Suggestion.create({
      userId: req.user._id,
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

const getSuggestions = async (req, res) => {
  try {
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
