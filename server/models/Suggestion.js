// models/Suggestion.js
// Defines the Mongoose schema for a nutrition suggestion/plan

const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
  {
    // Reference to the User who owns this suggestion
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // The user's fitness goal
    goal: {
      type: String,
      enum: ["weight loss", "weight gain", "maintain"],
      required: [true, "Goal is required"],
    },

    // Calculated daily calorie target
    dailyCalories: {
      type: Number,
      required: true,
    },

    // Macronutrient breakdown in grams per day
    macros: {
      protein: { type: Number, required: true }, // grams of protein
      carbs: { type: Number, required: true },   // grams of carbohydrates
      fats: { type: Number, required: true },    // grams of fats
    },

    // Array of suggested meal descriptions or meal names
    mealSuggestions: {
      type: [String],
      default: [],
    },
  },
  {
    // Automatically adds createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
