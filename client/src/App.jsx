// src/App.jsx
// Root component — sets up all React Router routes for the app

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "./LandingPage";
import Login from "./Login";
import Register from "./Register";

// Main app pages
import Home from "./components/Home";
import UserData from "./pages/User/UserData";

// Plans & Suggestions pages
import NewPlan from "./pages/Plans/NewPlan";
import NewSuggestion from "./pages/Plans/NewSuggestion";
import SuggestedNutrition from "./pages/Plans/SuggestedNutrition";

// Bootstrap CSS — provides utility classes used throughout the app
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Protected Routes (user must be logged in) ── */}
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<UserData />} />

        {/* ── Plans & Suggestions ── */}
        <Route path="/plans/new" element={<NewPlan />} />
        <Route path="/suggestions/new" element={<NewSuggestion />} />
        <Route path="/suggestions" element={<SuggestedNutrition />} />
      </Routes>
    </Router>
  );
}

export default App;
