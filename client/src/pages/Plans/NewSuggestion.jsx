import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import LNavbar from "../../components/LNavbar";

function NewSuggestion() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    activityLevel: "moderate",
    goal: "maintain",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post("/suggestions/create", formData);
      setResult(response.data.suggestion);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <LNavbar />

      <div className="container" style={{ maxWidth: 820 }}>
        <div className="page-header">
          <h1>Get a Nutrition Suggestion</h1>
          <p>Fill in your details below to calculate your daily calorie and macro targets</p>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="form-section">
              <div className="section-title">Your details</div>
              <div className="section-desc">All values should reflect your current stats</div>

              {error && <div className="alert-error">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-6">
                    <label htmlFor="ns-age" className="form-label">Age (yrs)</label>
                    <input
                      id="ns-age"
                      type="number"
                      name="age"
                      className="form-control"
                      placeholder="25"
                      value={formData.age}
                      onChange={handleChange}
                      min="10"
                      max="100"
                      required
                    />
                  </div>

                  <div className="col-6">
                    <label htmlFor="ns-weight" className="form-label">Weight (kg)</label>
                    <input
                      id="ns-weight"
                      type="number"
                      name="weight"
                      className="form-control"
                      placeholder="70"
                      value={formData.weight}
                      onChange={handleChange}
                      min="20"
                      max="300"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="ns-height" className="form-label">Height (cm)</label>
                    <input
                      id="ns-height"
                      type="number"
                      name="height"
                      className="form-control"
                      placeholder="175"
                      value={formData.height}
                      onChange={handleChange}
                      min="100"
                      max="250"
                      required
                    />
                  </div>
                </div>

                <div className="divider" />

                <div className="mb-3">
                  <label htmlFor="ns-activity" className="form-label">Activity level</label>
                  <select
                    id="ns-activity"
                    name="activityLevel"
                    className="form-select"
                    value={formData.activityLevel}
                    onChange={handleChange}
                  >
                    <option value="sedentary">Sedentary — little or no exercise</option>
                    <option value="light">Light — 1 to 3 days per week</option>
                    <option value="moderate">Moderate — 3 to 5 days per week</option>
                    <option value="active">Active — 6 to 7 days per week</option>
                    <option value="very_active">Very active — physical job or twice daily</option>
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label htmlFor="ns-goal" className="form-label">Goal</label>
                  <select
                    id="ns-goal"
                    name="goal"
                    className="form-select"
                    value={formData.goal}
                    onChange={handleChange}
                  >
                    <option value="weight loss">Weight loss</option>
                    <option value="maintain">Maintain weight</option>
                    <option value="weight gain">Weight gain / muscle building</option>
                  </select>
                </div>

                <button
                  id="generate-suggestion-btn"
                  type="submit"
                  className="btn-primary-custom"
                  disabled={loading}
                >
                  {loading ? "Calculating..." : "Calculate my plan"}
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-6">
            {!result && !loading && (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f8fafc",
                  border: "1px dashed #e2e8f0",
                  borderRadius: 10,
                  padding: "48px 24px",
                  textAlign: "center",
                }}
              >
                <div>
                  <p style={{ fontSize: 13.5, color: "#94a3b8", margin: 0 }}>
                    Your personalized plan will appear here once you submit the form.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="loading-wrap">
                <div className="spinner-border spinner-border-sm text-secondary" role="status" />
                <p>Calculating your plan...</p>
              </div>
            )}

            {result && (
              <div className="result-section">
                <div className="result-header">
                  <h4>Your plan</h4>
                  <p style={{ textTransform: "capitalize" }}>Goal: {result.goal}</p>
                </div>
                <div className="result-body">
                  <div style={{ marginBottom: 20 }}>
                    <div className="calorie-display" style={{ fontSize: 38, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.04em" }}>
                      {result.dailyCalories}
                      <span style={{ fontSize: 15, fontWeight: 400, color: "#94a3b8", marginLeft: 6 }}>kcal / day</span>
                    </div>
                  </div>

                  <div className="divider" />

                  <div style={{ marginBottom: 20 }}>
                    <div className="text-muted-sm fw-600" style={{ marginBottom: 10 }}>
                      Daily macros
                    </div>
                    <div className="macro-row">
                      <div className="macro-item">
                        <span className="value">{result.macros?.protein}g</span>
                        <span className="label">Protein</span>
                      </div>
                      <div className="macro-item">
                        <span className="value">{result.macros?.carbs}g</span>
                        <span className="label">Carbs</span>
                      </div>
                      <div className="macro-item">
                        <span className="value">{result.macros?.fats}g</span>
                        <span className="label">Fats</span>
                      </div>
                    </div>
                  </div>

                  <div className="divider" />

                  <div>
                    <div className="text-muted-sm fw-600" style={{ marginBottom: 10 }}>
                      Meal suggestions
                    </div>
                    <ul className="meal-list">
                      {result.mealSuggestions?.map((meal, index) => (
                        <li key={index}>{meal}</li>
                      ))}
                    </ul>
                  </div>
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
