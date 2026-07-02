import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import LNavbar from "../../components/LNavbar";

function SuggestedNutrition() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axiosInstance.get("/suggestions/my-suggestions");
        setSuggestions(response.data.suggestions);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Failed to load your plans. Please refresh and try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [navigate]);

  const getGoalBadgeClass = (goal) => {
    if (goal === "weight loss") return "goal-badge loss";
    if (goal === "weight gain") return "goal-badge gain";
    return "goal-badge maintain";
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="page-wrapper">
        <LNavbar />
        <div className="loading-wrap">
          <div className="spinner-border spinner-border-sm text-secondary" role="status" />
          <p>Loading your plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <LNavbar />

      <div className="container" style={{ maxWidth: 1000 }}>
        {/* Header */}
        <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>My Plans</h1>
            <p>
              {suggestions.length > 0
                ? `${suggestions.length} plan${suggestions.length !== 1 ? "s" : ""} generated`
                : "No plans yet"}
            </p>
          </div>
          <Link
            to="/suggestions/new"
            id="new-suggestion-link"
            className="btn-primary-custom"
            style={{ width: "auto", padding: "9px 20px" }}
          >
            New plan
          </Link>
        </div>

        {/* Error */}
        {error && <div className="alert-error">{error}</div>}

        {/* Empty state */}
        {suggestions.length === 0 && !error && (
          <div className="empty-state">
            <h4>No plans generated yet</h4>
            <p>
              Get your first personalized nutrition suggestion to get started.
            </p>
            <Link to="/suggestions/new" className="btn-card-action" style={{ display: "inline-block" }}>
              Get my first plan
            </Link>
          </div>
        )}

        {/* Cards */}
        <div className="row g-3">
          {suggestions.map((s) => (
            <div key={s._id} className="col-md-6 col-lg-4">
              <div className="suggestion-card">
                {/* Card top: goal + date */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  }}
                >
                  <span className={getGoalBadgeClass(s.goal)}>{s.goal}</span>
                  <span className="text-muted-sm">{formatDate(s.createdAt)}</span>
                </div>

                {/* Calories */}
                <div style={{ marginBottom: 14 }}>
                  <div className="calorie-display">{s.dailyCalories}</div>
                  <div className="calorie-label">kcal per day</div>
                </div>

                {/* Macros */}
                <div
                  style={{
                    display: "flex",
                    gap: 0,
                    borderTop: "1px solid #f1f5f9",
                    borderBottom: "1px solid #f1f5f9",
                    paddingTop: 12,
                    paddingBottom: 12,
                    marginBottom: 14,
                  }}
                >
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{s.macros?.protein}g</div>
                    <div style={{ fontSize: 10.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Protein</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center", borderLeft: "1px solid #f1f5f9", borderRight: "1px solid #f1f5f9" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{s.macros?.carbs}g</div>
                    <div style={{ fontSize: 10.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Carbs</div>
                  </div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{s.macros?.fats}g</div>
                    <div style={{ fontSize: 10.5, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Fats</div>
                  </div>
                </div>

                {/* Meal preview */}
                <div className="text-muted-sm fw-600" style={{ marginBottom: 8 }}>Meals</div>
                <ul className="meal-list">
                  {s.mealSuggestions?.slice(0, 3).map((meal, i) => (
                    <li key={i}>{meal}</li>
                  ))}
                  {s.mealSuggestions?.length > 3 && (
                    <li style={{ color: "#94a3b8" }}>
                      +{s.mealSuggestions.length - 3} more
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
