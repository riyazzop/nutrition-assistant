// src/pages/User/UNavBar.jsx
// Navigation bar scoped to the User section of the app

import { Link, useNavigate } from "react-router-dom";

function UNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/home">
          🥗 NutriAssist
        </Link>

        {/* Mobile hamburger */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbar"
          aria-controls="userNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* User section focused links */}
        <div className="collapse navbar-collapse" id="userNavbar">
          <ul className="navbar-nav ms-auto gap-2 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/profile">
                👤 My Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/suggestions">
                📊 My Suggestions
              </Link>
            </li>
            <li className="nav-item">
              <button
                id="user-logout-btn"
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

export default UNavBar;
