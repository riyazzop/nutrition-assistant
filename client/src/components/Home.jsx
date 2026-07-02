import { Link } from "react-router-dom";
import LNavbar from "./LNavbar";

// SVG icon components — keeps it dependency-free
const IconChart = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconList = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

function Home() {
  return (
    <div className="page-wrapper">
      <LNavbar />

      <div className="container" style={{ maxWidth: 960 }}>
        {/* Page header */}
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Manage your nutrition plans and track your progress</p>
        </div>

        {/* Quick actions */}
        <h6 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8", marginBottom: 14 }}>
          Quick Actions
        </h6>

        <div className="row g-3">
          {/* Get suggestion */}
          <div className="col-md-4">
            <div className="action-card">
              <div className="action-card-icon">
                <IconChart />
              </div>
              <h5>Get a Suggestion</h5>
              <p>
                Enter your body metrics and goal to get a calorie target and
                macronutrient breakdown with meal ideas.
              </p>
              <Link to="/suggestions/new" id="quick-link-new-suggestion" className="btn-card-action">
                Start now
              </Link>
            </div>
          </div>

          {/* View history */}
          <div className="col-md-4">
            <div className="action-card">
              <div className="action-card-icon">
                <IconList />
              </div>
              <h5>My Plans</h5>
              <p>
                View all previously generated nutrition plans. Each plan shows
                calories, macros, and meal suggestions.
              </p>
              <Link to="/suggestions" id="quick-link-suggestions" className="btn-card-action">
                View history
              </Link>
            </div>
          </div>

          {/* New plan */}
          <div className="col-md-4">
            <div className="action-card">
              <div className="action-card-icon">
                <IconPlus />
              </div>
              <h5>Create a Plan</h5>
              {/* slightly less bottom margin — natural inconsistency */}
              <p style={{ marginBottom: 14 }}>
                Build a custom weekly meal plan around your schedule and
                dietary preferences.
              </p>
              <Link to="/plans/new" id="quick-link-new-plan" className="btn-card-action">
                Create plan
              </Link>
            </div>
          </div>
        </div>

        {/* Info row */}
        <div
          className="alert-info-soft"
          style={{ marginTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}
        >
          <span style={{ fontSize: 13, color: "#475569" }}>
            Need to update your personal details?
          </span>
          <Link to="/profile" style={{ fontSize: 13, fontWeight: 500, color: "#16a34a" }}>
            View profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
