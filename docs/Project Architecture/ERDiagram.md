# Entity-Relationship (ER) Diagram

This document describes the database schema, core entities, and structural relationships that power the Nutrition Assistant application.

---

## ER Diagram Overview

[![Entity-Relationship (ER) Diagram](https://drive.google.com/uc?export=view&id=1OavEIsMDaTqXJX_eLIkxG6ox-pEc9IQN)](https://drive.google.com/file/d/1OavEIsMDaTqXJX_eLIkxG6ox-pEc9IQN/view?usp=sharing)

---

## Entities and Attributes

### 1. User
Represents a registered user of the system.
*   **_id** (ObjectID, Primary Key)
*   **name** (String)
*   **email** (String, Unique)
*   **password** (String, Hashed)
*   **role** (Enum: user, dietitian, admin)
*   **weight** (Number, kg)
*   **height** (Number, cm)
*   **gender** (String)
*   **activityLevel** (Enum: sedentary, light, moderate, active, very_active)

### 2. Food
Represents food items and their raw nutritional metrics.
*   **_id** (ObjectID, Primary Key)
*   **name** (String)
*   **calories** (Number)
*   **carbohydrates** (Number, g)
*   **proteins** (Number, g)
*   **fats** (Number, g)

### 3. Meal
Represents a log of food items eaten by a user at a given date.
*   **_id** (ObjectID, Primary Key)
*   **userId** (ObjectID, Foreign Key -> User)
*   **date** (Date)
*   **foodItems** (Array of ObjectIDs -> Food)

### 4. DietPlan
Represents a personalized plan recommended to or followed by a user.
*   **_id** (ObjectID, Primary Key)
*   **userId** (ObjectID, Foreign Key -> User)
*   **startDate** (Date)
*   **endDate** (Date)

### 5. NutritionFact
Stores calculated daily goals and limits for meals or full diet plans.
*   **_id** (ObjectID, Primary Key)
*   **mealId** (ObjectID, Foreign Key -> Meal, Optional)
*   **dietPlanId** (ObjectID, Foreign Key -> DietPlan, Optional)
*   **dailyCalories** (Number)
*   **protein** (Number, g)
*   **carbs** (Number, g)
*   **fats** (Number, g)

---

## Entity Relationships

*   **User ─── (creates) ───► Meal:** One-to-many relationship. A user can record multiple meals.
*   **User ─── (consumes) ───► Food:** Many-to-many relationship. Users consume various foods over time.
*   **User ─── (follows) ───► DietPlan:** One-to-many relationship. A user can have historical and current diet plans.
*   **Meal ─── (includes) ───► Food:** Many-to-many relationship. A meal consists of one or more food items.
*   **Meal ─── (has) ───► NutritionFact:** One-to-one relationship. A meal resolves to a specific set of nutrition facts.
*   **DietPlan ─── (recommends) ───► NutritionFact:** One-to-one relationship. A diet plan targets a specific set of daily nutrition facts.
