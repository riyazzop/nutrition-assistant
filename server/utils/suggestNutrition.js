// utils/suggestNutrition.js
// Calculates daily calorie needs and macronutrient targets using the
// Mifflin-St Jeor BMR formula, then suggests appropriate meals.

/**
 * suggestNutrition
 *
 * @param {Object} params
 * @param {number} params.age           - Age in years
 * @param {number} params.weight        - Weight in kilograms
 * @param {number} params.height        - Height in centimeters
 * @param {string} params.activityLevel - One of: sedentary | light | moderate | active | very_active
 * @param {string} params.goal          - One of: weight loss | weight gain | maintain
 *
 * @returns {Object} { dailyCalories, macros: { protein, carbs, fats }, mealSuggestions }
 */
const suggestNutrition = ({ age, weight, height, activityLevel, goal }) => {
  // ─── Step 1: Calculate BMR using Mifflin-St Jeor formula ─────────────────
  // We assume male formula here for simplicity; extend later for gender input
  // BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5
  const BMR = 10 * weight + 6.25 * height - 5 * age + 5;

  // ─── Step 2: Apply Activity Level Multiplier (TDEE) ──────────────────────
  const activityMultipliers = {
    sedentary: 1.2,    // Little or no exercise
    light: 1.375,      // Light exercise 1-3 days/week
    moderate: 1.55,    // Moderate exercise 3-5 days/week
    active: 1.725,     // Hard exercise 6-7 days/week
    very_active: 1.9,  // Very hard exercise or physical job
  };

  // Default to sedentary if activityLevel is unrecognized
  const multiplier = activityMultipliers[activityLevel] || 1.2;
  let TDEE = Math.round(BMR * multiplier); // Total Daily Energy Expenditure

  // ─── Step 3: Adjust Calories Based on Goal ───────────────────────────────
  if (goal === "weight loss") {
    TDEE -= 500; // Caloric deficit of ~500 kcal/day → ~0.5 kg/week loss
  } else if (goal === "weight gain") {
    TDEE += 500; // Caloric surplus of ~500 kcal/day → ~0.5 kg/week gain
  }
  // For "maintain", TDEE stays the same

  const dailyCalories = TDEE;

  // ─── Step 4: Calculate Macronutrient Breakdown ───────────────────────────
  // Standard split: 30% protein, 40% carbs, 30% fats
  // 1g protein = 4 kcal | 1g carbs = 4 kcal | 1g fat = 9 kcal
  const proteinCalories = dailyCalories * 0.30;
  const carbCalories    = dailyCalories * 0.40;
  const fatCalories     = dailyCalories * 0.30;

  const macros = {
    protein: Math.round(proteinCalories / 4), // grams
    carbs:   Math.round(carbCalories / 4),    // grams
    fats:    Math.round(fatCalories / 9),     // grams
  };

  // ─── Step 5: Generate Meal Suggestions Based on Goal ─────────────────────
  const mealSuggestionsByGoal = {
    "weight loss": [
      "Breakfast: Greek yogurt with berries and chia seeds",
      "Snack: Apple slices with almond butter",
      "Lunch: Grilled chicken salad with olive oil dressing",
      "Snack: Cucumber and hummus",
      "Dinner: Baked salmon with steamed broccoli and quinoa",
    ],
    "weight gain": [
      "Breakfast: Oatmeal with banana, peanut butter, and whole milk",
      "Snack: Trail mix with nuts and dried fruit",
      "Lunch: Brown rice with grilled chicken thighs and avocado",
      "Snack: Protein shake with full-fat milk",
      "Dinner: Beef stir-fry with noodles and mixed vegetables",
    ],
    "maintain": [
      "Breakfast: Scrambled eggs with whole wheat toast and orange juice",
      "Snack: Mixed nuts and a piece of fruit",
      "Lunch: Turkey sandwich on whole grain bread with a side salad",
      "Snack: Cottage cheese with pineapple",
      "Dinner: Grilled fish with sweet potato and green beans",
    ],
  };

  const mealSuggestions =
    mealSuggestionsByGoal[goal] || mealSuggestionsByGoal["maintain"];

  // ─── Return Final Result ──────────────────────────────────────────────────
  return {
    dailyCalories,
    macros,
    mealSuggestions,
  };
};

module.exports = suggestNutrition;
