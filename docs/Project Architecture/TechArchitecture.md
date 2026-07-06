# Technical Architecture

This document describes the high-level system architecture and component structure of the Nutrition Assistant application.

---

## Architecture Diagram Overview

[![Technical Architecture Diagram](https://drive.google.com/uc?export=view&id=1u3bcNMcpRrOgroIEjdENbWUvMLmcWga_)](https://drive.google.com/file/d/1u3bcNMcpRrOgroIEjdENbWUvMLmcWga_/view?usp=sharing)

---

## Core System Components

### 1. User Interface (Frontend Client)
A responsive Single Page Application (SPA) built using modern web standards.
*   **Framework:** React 18.x with Vite as the build tool.
*   **Styling:** Customized design system built using CSS and responsive layouts, with no emojis or cluttered branding.
*   **Routing:** React Router v6 for secure routing and client-side view management.
*   **API Client:** Axios instance pre-configured with headers and request interceptors to attach JSON Web Tokens (JWT) automatically.

### 2. Backend Services (Express API)
A RESTful API built on Node.js using the MVC pattern pattern.
*   **Server Framework:** Express.js.
*   **Database Client:** Mongoose ODM mapping schemas for User accounts and Nutrition Suggestions.
*   **Authentication & Security:** JWT for session handling and bcrypt for hashing user passwords.
*   **CORS Configuration:** Built-in CORS handler supporting environment-configured clients for clean cross-domain requests in split deployments.

### 3. Database Layer
A document-based schema mapping user accounts to their historic generated nutrition plans.
*   **Technology:** MongoDB.
*   **Models:**
    *   **User Schema:** Stores username, email, role, and hashed passwords.
    *   **Suggestion Schema:** Stores body metrics, target calories, macro splits (protein, carbohydrates, fats in grams), and generated meal items.

### 4. Nutrition Engine (Utility Layer)
The math and logic module powering the application.
*   **Calorie Target Calculator:** Implements the Mifflin-St Jeor equation to calculate Basal Metabolic Rate (BMR) and applies multipliers for different activity levels.
*   **Macronutrient Distributor:** Calculates protein, carb, and fat targets in grams based on calculated calorie targets.
*   **Meal Recommendation Engine:** Maps nutrition plan goals to concrete breakfast, lunch, dinner, and snack templates.

---

## Data Flow Pipeline

1. **User Request:** The client sends user body metrics (age, weight, height, activity, goal) to the `/api/suggestions/create` endpoint.
2. **Authorization Check:** The authentication middleware validates the JWT in the Request headers.
3. **Calculation Phase:** The controller calls the nutrition engine (`suggestNutrition.js`) to compute target outputs.
4. **Data Persistence:** The controller saves the results to MongoDB associated with the requesting user.
5. **JSON Response:** The server returns the final calorie target, macros, and suggested meal plan back to the frontend.
