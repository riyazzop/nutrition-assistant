import { Link, useNavigate, useLocation } from "react-router-dom";

function LNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="app-navbar navbar navbar-expand-lg">
      <div className="container-fluid px-0">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/home">
          <span className="brand-dot"></span>
          NutriAssist
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ boxShadow: "none", padding: "4px 8px" }}
        >
          <span className="navbar-toggler-icon" style={{ filter: "invert(1)", width: 18, height: 18 }} />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center" style={{ gap: 2 }}>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/home") ? "active-link" : ""}`}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/plans/new") ? "active-link" : ""}`}
                to="/plans/new"
              >
                New Plan
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/suggestions/new") ? "active-link" : ""}`}
                to="/suggestions/new"
              >
                Get Suggestion
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/suggestions") ? "active-link" : ""}`}
                to="/suggestions"
              >
                My Plans
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/profile") ? "active-link" : ""}`}
                to="/profile"
              >
                Profile
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <button
                id="logout-btn"
                className="btn-logout"
                onClick={handleLogout}
              >
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LNavbar;
