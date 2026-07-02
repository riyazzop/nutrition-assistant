// src/pages/Plans/SuggestedNutrition.jsx
// Displays all past nutrition suggestions for the logged-in user

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import LNavbar from "../../components/LNavbar";

function SuggestedNutrition() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ── Fetch Suggestions on Mount ─────────────────────────────────────────────
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // GET all suggestions — JWT auto-attached by axiosInstance interceptor
        const response = await axiosInstance.get("/suggestions/my-suggestions");
        setSuggestions(response.data.suggestions);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Failed to load suggestions. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [navigate]);

  // ── Goal badge color helper ────────────────────────────────────────────────
  const goalBadgeColor = (goal) => {
    if (goal === "weight loss") return "bg-primary";
    if (goal === "weight gain") return "bg-warning text-dark";
    return "bg-success";
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div>
        <LNavbar />
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status" />
          <p className="mt-2 text-muted">Loading your plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <LNavbar />

      <div className="container py-5">
        {/* Page Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2>📊 My Nutrition Plans</h2>
            <p className="text-muted mb-0">
              {suggestions.length} plan{suggestions.length !== 1 ? "s" : ""} generated
            </p>
          </div>
          <Link
            to="/suggestions/new"
            id="new-suggestion-link"
            className="btn text-white"
            style={{ background: "linear-gradient(90deg, #2d6a4f, #52b788)" }}
          >
            + New Plan
          </Link>
        </div>

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Empty State */}
        {suggestions.length === 0 && !error && (
          <div className="text-center py-5">
            <div style={{ fontSize: "4rem" }}>🌿</div>
            <h4 className="mt-3">No plans yet!</h4>
            <p className="text-muted">Generate your first nutrition suggestion to get started.</p>
            <Link to="/suggestions/new" className="btn btn-success mt-2">
              Get My First Plan
            </Link>
          </div>
        )}

        {/* Suggestion Cards */}
        <div className="row g-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion._id} className="col-md-6 col-lg-4">
              <div className="card h-100 p-3">
                {/* Card Header: goal + date */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className={`badge ${goalBadgeColor(suggestion.goal)}`}>
                    {suggestion.goal}
                  </span>
                  <small className="text-muted">
                    {new Date(suggestion.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </small>
                </div>

                {/* Calories */}
                <div className="text-center mb-3">
                  <h3 style={{ color: "#2d6a4f", fontWeight: "800" }}>
                    {suggestion.dailyCalories}
                  </h3>
                  <small className="text-muted">kcal / day</small>
                </div>

                {/* Macros */}
                <div className="d-flex justify-content-around mb-3">
                  <div className="text-center">
                    <div className="fw-bold text-success">{suggestion.macros?.protein}g</div>
                    <small className="text-muted">Protein</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold text-primary">{suggestion.macros?.carbs}g</div>
                    <small className="text-muted">Carbs</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold text-warning">{suggestion.macros?.fats}g</div>
                    <small className="text-muted">Fats</small>
                  </div>
                </div>

                {/* Meal suggestions preview */}
                <hr />
                <h6 className="fw-semibold mb-2">🍽 Meals</h6>
                <ul className="list-unstyled mb-0" style={{ fontSize: "0.85rem" }}>
                  {/* Show first 3 meals only to keep card compact */}
                  {suggestion.mealSuggestions?.slice(0, 3).map((meal, i) => (
                    <li key={i} className="text-muted mb-1">
                      • {meal}
                    </li>
                  ))}
                  {suggestion.mealSuggestions?.length > 3 && (
                    <li className="text-muted">
                      + {suggestion.mealSuggestions.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedNutrition;
