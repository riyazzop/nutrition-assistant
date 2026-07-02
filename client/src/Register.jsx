import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
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
      const response = await axiosInstance.post("/users/register", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 36 }}>
            <span className="brand-dot" style={{ width: 10, height: 10 }}></span>
            <span style={{ color: "#ffffff", fontWeight: 700, fontSize: 15 }}>NutriAssist</span>
          </div>
          <h2>Start your nutrition<br />journey today.</h2>
          <p style={{ marginTop: 12 }}>
            Create your account and get a personalized nutrition plan within minutes —
            no equipment or dietitian required.
          </p>
          <ul className="auth-feature-list">
            <li>Free to get started</li>
            <li>Calorie and macro calculations</li>
            <li>Weight loss, gain or maintain goals</li>
            <li>Saves all your plans automatically</li>
          </ul>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-box">
          <h3>Create account</h3>
          <p className="subtitle">Fill in your details to get started</p>

          {error && <div className="alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="reg-name" className="form-label">
                Full name
              </label>
              <input
                id="reg-name"
                type="text"
                name="name"
                className="form-control"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="reg-email" className="form-label">
                Email address
              </label>
              <input
                id="reg-email"
                type="email"
                name="email"
                className="form-control"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label htmlFor="reg-password" className="form-label">
                Password
              </label>
              <input
                id="reg-password"
                type="password"
                name="password"
                className="form-control"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary-custom"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
