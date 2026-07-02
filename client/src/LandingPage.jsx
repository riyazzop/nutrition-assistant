import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", position: "relative" }}>

      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-logo">
          <span className="brand-dot"></span>
          NutriAssist
        </div>
        <div className="landing-nav-links">
          <Link to="/login">Sign in</Link>
          <Link
            to="/register"
            style={{
              marginLeft: 24,
              backgroundColor: "#16a34a",
              color: "#fff",
              padding: "7px 18px",
              borderRadius: 7,
              fontSize: 13.5,
              fontWeight: 600,
            }}
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-tag">Nutrition Planning</div>

          <h1>
            Know exactly what<br />
            your body <span>needs</span>
          </h1>

          <p>
            Calculate your daily calorie targets, macronutrient breakdown, and get
            meal suggestions — all based on your body metrics and fitness goal.
          </p>

          <div className="landing-cta-group">
            <Link to="/register" className="btn-landing-primary">
              Create free account
            </Link>
            <Link to="/login" className="btn-landing-secondary">
              Sign in
            </Link>
          </div>

          {/* Stats row */}
          <div className="landing-stats">
            <div className="landing-stat">
              <h3>BMR</h3>
              <p>Mifflin-St Jeor formula</p>
            </div>
            <div className="landing-stat">
              <h3>3</h3>
              <p>Fitness goals supported</p>
            </div>
            <div className="landing-stat">
              <h3>5+</h3>
              <p>Activity levels</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
