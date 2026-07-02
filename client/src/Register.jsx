// src/Register.jsx
// Registration form — creates a new user account and stores JWT

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";

function Register() {
  // ── Controlled form state ──────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ── Handle input changes ───────────────────────────────────────────────────
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── Handle form submission ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // POST new user data to the backend register endpoint
      const response = await axiosInstance.post("/users/register", formData);

      // Save the JWT token received after successful registration
      localStorage.setItem("token", response.data.token);

      // Redirect to the main app dashboard
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="text-center mb-4">
          <span style={{ fontSize: "2.5rem" }}>🥗</span>
          <h2 className="mt-2">Create Account</h2>
          <p className="text-muted">Start your nutrition journey today</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="reg-name" className="form-label fw-semibold">
              Full Name
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
            <label htmlFor="reg-email" className="form-label fw-semibold">
              Email Address
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

          <div className="mb-4">
            <label htmlFor="reg-password" className="form-label fw-semibold">
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
            className="btn w-100 text-white fw-semibold"
            style={{ background: "linear-gradient(90deg, #2d6a4f, #52b788)" }}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Redirect to Login */}
        <p className="text-center mt-3 mb-0 text-muted">
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#2d6a4f", fontWeight: "600" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
