import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/users/login", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left panel */}
      <div className="auth-left">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36 }}>
            <span className="brand-dot" style={{ width: 10, height: 10 }}></span>
            <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 15 }}>NutriAssist</span>
          </div>
          <h2>Plan your nutrition.<br />Reach your goals.</h2>
          <p style={{ marginTop: 12 }}>
            Get science-based calorie targets and macronutrient breakdowns
            tailored to your body and fitness goal.
          </p>
          <ul className="auth-feature-list">
            <li>Personalized daily calorie targets</li>
            <li>Protein, carbs and fat breakdown</li>
            <li>Goal-specific meal suggestions</li>
            <li>Track multiple nutrition plans</li>
          </ul>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="auth-form-box">
          <h3>Sign in</h3>
          <p className="subtitle">Enter your credentials to access your account</p>

          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="login-email" className="form-label">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                name="email"
                className="form-control"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: 22 }}>
              <label htmlFor="login-password" className="form-label">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary-custom"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
