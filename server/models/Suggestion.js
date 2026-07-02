const mongoose = require("mongoose");

const suggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    goal: {
      type: String,
      enum: ["weight loss", "weight gain", "maintain"],
      required: [true, "Goal is required"],
    },
    dailyCalories: {
      type: Number,
      required: true,
    },
    macros: {
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fats: { type: Number, required: true },
    },
    mealSuggestions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);

module.exports = Suggestion;
