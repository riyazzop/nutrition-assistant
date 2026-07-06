# Key Features

This document provides a brief description of the core features implemented in the Nutrition Assistant application.

---

## Core Capabilities

### 1. Personalized Daily Calorie Targets
*   **Scientific Calculation:** Employs the Mifflin-St Jeor equation to compute Basal Metabolic Rate (BMR).
*   **Activity Adjustment:** Applies precise activity multipliers (sedentary, light, moderate, active, very active) to estimate Total Daily Energy Expenditure (TDEE).
*   **Goal-Driven Adjustments:** Deducts or adds calories automatically based on the user's specific targets (deficits for weight loss, surpluses for muscle gain, and baseline levels for maintenance).

### 2. Macronutrient Breakdown
*   **Distribution Split:** Automatically calculates target macronutrients in grams using a standard split of 30% protein, 40% carbohydrates, and 30% fats.
*   **Conversion Metrics:** Converts calorie targets into grams dynamically (4 kcal/g for protein and carbs, 9 kcal/g for fat).

### 3. Smart Meal Recommendations
*   **Goal-Based Curation:** Maps the generated target to tailored meal combinations (breakfast, lunch, dinner, and snacks) mapped specifically to weight loss, maintenance, or muscle building goals.

### 4. Historical Plan History
*   **Data Persistence:** Saves each generated target and recommendation history to the database.
*   **Review Panel:** Allows the user to view all previously generated plans from their personal dashboard.

### 5. Profile & Metrics Tracking
*   **Dynamic Metrics:** Tracks age, weight, height, activity, and goals.
*   **Update Support:** Allows users to update their profile stats anytime to regenerate updated nutrition structures.

### 6. Secure Authentication
*   **JWT Sessions:** Manages user authentication state securely.
*   **Data Security:** Hashing algorithm encrypts password values prior to database transactions.
