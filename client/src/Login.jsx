// src/Login.jsx
// Login form — authenticates user and stores JWT in localStorage

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "./api/axiosConfig";

function Login() {
  // ── Controlled form state ──────────────────────────────────────────────────
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");       // Error message to display
  const [loading, setLoading] = useState(false); // Disable button during request

  const navigate = useNavigate(); // Used to redirect after successful login

  // ── Handle input changes ───────────────────────────────────────────────────
  const handleChange = (e) => {
    // Update the specific field that changed using computed property names
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ── Handle form submission ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent browser default form reload
    setError("");
    setLoading(true);

    try {
      // POST credentials to the backend
      const response = await axiosInstance.post("/users/login", formData);

      // Store the JWT token in localStorage so it persists across page reloads
      localStorage.setItem("token", response.data.token);

      // Redirect to the dashboard/home page
      navigate("/home");
    } catch (err) {
      // Show the error message from the server, or a generic fallback
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
          <h2 className="mt-2">Welcome Back</h2>
          <p className="text-muted">Sign in to your Nutrition Assistant account</p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label fw-semibold">
              Email Address
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

          <div className="mb-4">
            <label htmlFor="login-password" className="form-label fw-semibold">
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
            className="btn w-100 text-white fw-semibold"
            style={{ background: "linear-gradient(90deg, #2d6a4f, #52b788)" }}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="text-center mt-3 mb-0 text-muted">
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#2d6a4f", fontWeight: "600" }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
