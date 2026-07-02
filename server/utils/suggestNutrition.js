const suggestNutrition = ({ age, weight, height, activityLevel, goal }) => {
  const BMR = 10 * weight + 6.25 * height - 5 * age + 5;

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  };

  const multiplier = activityMultipliers[activityLevel] || 1.2;
  let TDEE = Math.round(BMR * multiplier);

  if (goal === "weight loss") {
    TDEE -= 500;
  } else if (goal === "weight gain") {
    TDEE += 500;
  }

  const dailyCalories = TDEE;

  const proteinCalories = dailyCalories * 0.30;
  const carbCalories = dailyCalories * 0.40;
  const fatCalories = dailyCalories * 0.30;

  const macros = {
    protein: Math.round(proteinCalories / 4),
    carbs: Math.round(carbCalories / 4),
    fats: Math.round(fatCalories / 9),
  };

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

  return {
    dailyCalories,
    macros,
    mealSuggestions,
  };
};

module.exports = suggestNutrition;
