# Model-View-Controller (MVC) Pattern

This document explains how the Nutrition Assistant backend application implements the Model-View-Controller (MVC) architectural pattern to decouple data schemas, business logic, and presentation routing.

---

## MVC Structure Overview

[![Model-View-Controller (MVC) Diagram](https://drive.google.com/uc?export=view&id=16Nzjy1KJI76jH-cQt31vgY69HLRKcL70)](https://drive.google.com/file/d/16Nzjy1KJI76jH-cQt31vgY69HLRKcL70/view?usp=sharing)

---

## Architecture Components

### 1. Model Layer (Data Layer)
The Model layer is responsible for defining data structures, validations, and communicating with the database.
*   **Implementation:** Developed using Mongoose schemas mapping to MongoDB collections.
*   **Core Files:**
    *   `server/models/User.js` (User profiles, password validation logic, credentials hashing)
    *   `server/models/Suggestion.js` (Calculated nutrition results and recommendations logs)
*   **Responsibilities:** Validating fields, database CRUD operations, hashing user secrets, and executing pre-save hooks.

### 2. View Layer (Presentation Layer)
The View layer represents the UI components that the client interacts with. In our decoupled MERN architecture, this corresponds to the React client.
*   **Implementation:** React Single Page Application (SPA) compiled via Vite.
*   **Core Pages:**
    *   `client/src/LandingPage.jsx` (Landing page)
    *   `client/src/Login.jsx` & `client/src/Register.jsx` (Auth gateways)
    *   `client/src/components/Home.jsx` (User home dashboard)
    *   `client/src/pages/Plans/` (Forms to request plans and lists of generated summaries)
*   **Responsibilities:** Displaying visual summaries, handling inputs, client-side routing, and making API requests.

### 3. Controller Layer (Logic Layer)
The Controller layer sits between the View and the Model, handling business rules, request validation, mathematical logic, and API route dispatching.
*   **Implementation:** Express route endpoints paired with control functions.
*   **Core Files:**
    *   `server/controllers/userController.js` (Login and registration validation)
    *   `server/controllers/suggestedController.js` (Creating suggestions and returning historical plans)
    *   `server/routes/userRoute.js` & `server/routes/suggestionRoute.js` (Routing endpoints)
    *   `server/utils/suggestNutrition.js` (BMR & macro math engine)
*   **Responsibilities:** Sanitizing incoming HTTP requests, executing algorithms, accessing models for DB operations, and returning standardized JSON payloads.

---

## Detailed Data Flow

1. **Routing Action:** A user clicks a button or submits a form in the **View** (React client).
2. **Request Gateway:** The client dispatches an HTTP request mapped to a specific API **Route**.
3. **Controller Handling:** The mapped Express **Controller** accepts the request, validates session JWTs via auth middleware, and runs calculations.
4. **Model Interaction:** The controller calls the Mongoose **Model** schema to fetch or insert metrics.
5. **Database Transaction:** The model runs database operations with the MongoDB **Database** instance.
6. **Response Cycle:** The controller sends the computed results back as a structured JSON payload to the **User** view, updating state.
