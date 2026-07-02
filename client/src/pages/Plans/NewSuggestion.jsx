// src/pages/Plans/NewSuggestion.jsx
// Form to input body metrics and goal → calls backend → displays nutrition plan

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import LNavbar from "../../components/LNavbar";

function NewSuggestion() {
  // ── Form input state ───────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    activityLevel: "moderate",
    goal: "maintain",
  });

  // ── Result & UI state ──────────────────────────────────────────────────────
  const [result, setResult] = useState(null);  // Returned suggestion from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ── Handle input changes ───────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── Handle form submission ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      // POST body metrics to the backend — JWT auto-attached by axiosInstance interceptor
      const response = await axiosInstance.post("/suggestions/create", formData);
      // Store the suggestion result to display below the form
      setResult(response.data.suggestion);
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired or invalid — send user to login
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to generate suggestion. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <LNavbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-7">
            {/* Page title */}
            <div className="text-center mb-4">
              <h2>✨ Get Your Nutrition Suggestion</h2>
              <p className="text-muted">
                Fill in your details below and we'll calculate your personalized plan.
              </p>
            </div>

            {/* Input Form Card */}
            <div className="card p-4 mb-4">
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Age */}
                <div className="mb-3">
                  <label htmlFor="ns-age" className="form-label fw-semibold">Age (years)</label>
                  <input
                    id="ns-age"
                    type="number"
                    name="age"
                    className="form-control"
                    placeholder="e.g. 25"
                    value={formData.age}
                    onChange={handleChange}
                    min="10"
                    max="100"
                    required
                  />
                </div>

                {/* Weight */}
                <div className="mb-3">
                  <label htmlFor="ns-weight" className="form-label fw-semibold">Weight (kg)</label>
                  <input
                    id="ns-weight"
                    type="number"
                    name="weight"
                    className="form-control"
                    placeholder="e.g. 70"
                    value={formData.weight}
                    onChange={handleChange}
                    min="20"
                    max="300"
                    required
                  />
                </div>

                {/* Height */}
                <div className="mb-3">
                  <label htmlFor="ns-height" className="form-label fw-semibold">Height (cm)</label>
                  <input
                    id="ns-height"
                    type="number"
                    name="height"
                    className="form-control"
                    placeholder="e.g. 175"
                    value={formData.height}
                    onChange={handleChange}
                    min="100"
                    max="250"
                    required
                  />
                </div>

                {/* Activity Level */}
                <div className="mb-3">
                  <label htmlFor="ns-activity" className="form-label fw-semibold">Activity Level</label>
                  <select
                    id="ns-activity"
                    name="activityLevel"
                    className="form-select"
                    value={formData.activityLevel}
                    onChange={handleChange}
                  >
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Light (1–3 days/week)</option>
                    <option value="moderate">Moderate (3–5 days/week)</option>
                    <option value="active">Active (6–7 days/week)</option>
                    <option value="very_active">Very Active (physical job or 2x/day)</option>
                  </select>
                </div>

                {/* Goal */}
                <div className="mb-4">
                  <label htmlFor="ns-goal" className="form-label fw-semibold">Your Goal</label>
                  <select
                    id="ns-goal"
                    name="goal"
                    className="form-select"
                    value={formData.goal}
                    onChange={handleChange}
                  >
                    <option value="weight loss">Weight Loss</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="weight gain">Weight Gain / Muscle Building</option>
                  </select>
                </div>

                <button
                  id="generate-suggestion-btn"
                  type="submit"
                  className="btn w-100 text-white fw-semibold"
                  style={{ background: "linear-gradient(90deg, #2d6a4f, #52b788)" }}
                  disabled={loading}
                >
                  {loading ? "Generating your plan..." : "✨ Generate My Plan"}
                </button>
              </form>
            </div>

            {/* ── Result Section ─────────────────────────────────────────────── */}
            {result && (
              <div className="card p-4">
                <h4 className="mb-3 text-success">🎉 Your Personalized Plan</h4>

                {/* Daily Calories */}
                <div className="text-center mb-4">
                  <h2 style={{ color: "#2d6a4f", fontWeight: "800" }}>
                    {result.dailyCalories}
                  </h2>
                  <p className="text-muted mb-0">Calories per day</p>
                </div>

                {/* Macros */}
                <h6 className="fw-semibold mb-2">Daily Macros</h6>
                <div className="d-flex justify-content-around flex-wrap mb-4">
                  <div className="macro-badge">
                    <span>{result.macros?.protein}g</span>
                    <span>Protein</span>
                  </div>
                  <div className="macro-badge">
                    <span>{result.macros?.carbs}g</span>
                    <span>Carbs</span>
                  </div>
                  <div className="macro-badge">
                    <span>{result.macros?.fats}g</span>
                    <span>Fats</span>
                  </div>
                </div>

                {/* Meal Suggestions */}
                <h6 className="fw-semibold mb-2">🍽 Meal Suggestions</h6>
                <ul className="list-group list-group-flush">
                  {result.mealSuggestions?.map((meal, index) => (
                    <li key={index} className="list-group-item py-2">
                      {meal}
                    </li>
                  ))}
                </ul>

                {/* View history link */}
                <div className="text-center mt-3">
                  <a href="/suggestions" className="btn btn-outline-success btn-sm">
                    View All My Plans →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewSuggestion;
