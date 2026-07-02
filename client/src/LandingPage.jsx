// src/LandingPage.jsx
// Public marketing-style landing page — shown to unauthenticated visitors

import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-hero">
      <div>
        {/* App logo / icon */}
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🥗</div>

        {/* Main heading */}
        <h1>Nutrition Assistant</h1>

        {/* Subheading / value proposition */}
        <p>
          Get personalized nutrition plans tailored to your body, goals, and
          lifestyle — powered by science.
        </p>

        {/* Feature highlights */}
        <div
          className="d-flex justify-content-center gap-4 mb-4 flex-wrap"
          style={{ opacity: 0.9 }}
        >
          <span>✅ Personalized Calorie Targets</span>
          <span>✅ Macro Breakdowns</span>
          <span>✅ Meal Suggestions</span>
        </div>

        {/* CTA Buttons */}
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link
            to="/register"
            className="btn btn-light btn-lg"
            style={{ color: "#2d6a4f", fontWeight: "600" }}
          >
            Get Started — It's Free
          </Link>
          <Link
            to="/login"
            className="btn btn-outline-light btn-lg"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
