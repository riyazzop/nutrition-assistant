// src/components/LNavbar.jsx
// Main navigation bar shown to logged-in users across the app

import { Link, useNavigate } from "react-router-dom";

function LNavbar() {
  const navigate = useNavigate();

  // ── Logout Handler ──────────────────────────────────────────────────────────
  const handleLogout = () => {
    // Remove the JWT from storage to "log out" the user
    localStorage.removeItem("token");
    // Redirect to the landing page
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Brand / Logo */}
        <Link className="navbar-brand" to="/home">
          🥗 NutriAssist
        </Link>

        {/* Hamburger toggle for mobile screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto gap-2 align-items-lg-center">
            {/* Dashboard link */}
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                🏠 Home
              </Link>
            </li>

            {/* Create a new nutrition plan */}
            <li className="nav-item">
              <Link className="nav-link" to="/plans/new">
                📋 New Plan
              </Link>
            </li>

            {/* Get a new AI suggestion */}
            <li className="nav-item">
              <Link className="nav-link" to="/suggestions/new">
                ✨ New Suggestion
              </Link>
            </li>

            {/* View past suggestions */}
            <li className="nav-item">
              <Link className="nav-link" to="/suggestions">
                📊 My Suggestions
              </Link>
            </li>

            {/* User profile */}
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                👤 Profile
              </Link>
            </li>

            {/* Logout button */}
            <li className="nav-item">
              <button
                id="logout-btn"
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LNavbar;
