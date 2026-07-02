// src/components/Home.jsx
// Dashboard / Home page shown to logged-in users

import { Link } from "react-router-dom";
import LNavbar from "./LNavbar";

function Home() {
  // Try to get the user's name from localStorage for a personalized greeting
  // (You could also fetch from the API, but localStorage keeps it simple)
  const token = localStorage.getItem("token");

  return (
    <div>
      {/* Top navigation bar */}
      <LNavbar />

      {/* Hero / Welcome Header */}
      <div className="dashboard-header">
        <h1>Welcome to Your Nutrition Dashboard 🥗</h1>
        <p className="lead mb-0">
          Track your nutrition, get personalized meal plans, and reach your health goals.
        </p>
      </div>

      <div className="container py-4">
        <h2 className="mb-4 text-center text-muted">What would you like to do today?</h2>

        {/* Quick Action Cards */}
        <div className="row g-4 justify-content-center">
          {/* Card: New Nutrition Suggestion */}
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div style={{ fontSize: "3rem" }}>✨</div>
              <h4 className="mt-3">Get a Suggestion</h4>
              <p className="text-muted">
                Enter your body metrics and goal to get a personalized calorie and
                macro breakdown with meal ideas.
              </p>
              <Link
                to="/suggestions/new"
                id="quick-link-new-suggestion"
                className="btn mt-auto text-white"
                style={{ background: "linear-gradient(90deg, #2d6a4f, #52b788)" }}
              >
                Start Now →
              </Link>
            </div>
          </div>

          {/* Card: View Past Suggestions */}
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div style={{ fontSize: "3rem" }}>📊</div>
              <h4 className="mt-3">My Suggestions</h4>
              <p className="text-muted">
                View all your previously generated nutrition plans and track your
                progress over time.
              </p>
              <Link
                to="/suggestions"
                id="quick-link-suggestions"
                className="btn mt-auto btn-outline-success"
              >
                View History →
              </Link>
            </div>
          </div>

          {/* Card: Create a Plan */}
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div style={{ fontSize: "3rem" }}>📋</div>
              <h4 className="mt-3">Create a Plan</h4>
              <p className="text-muted">
                Build a custom nutrition or meal plan tailored to your specific
                weekly schedule and preferences.
              </p>
              <Link
                to="/plans/new"
                id="quick-link-new-plan"
                className="btn mt-auto btn-outline-secondary"
              >
                Create Plan →
              </Link>
            </div>
          </div>
        </div>

        {/* Profile quick access */}
        <div className="text-center mt-5">
          <p className="text-muted">
            Want to update your details?{" "}
            <Link to="/profile" style={{ color: "#2d6a4f", fontWeight: "600" }}>
              View your profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
