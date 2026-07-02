// src/pages/User/UserData.jsx
// Profile page — fetches and displays the logged-in user's account details

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import UNavBar from "./UNavBar";

function UserData() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(null);    // User profile data from the API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ── Fetch Profile on Mount ─────────────────────────────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // The axiosInstance interceptor automatically attaches the JWT header
        const response = await axiosInstance.get("/users/profile");
        setUser(response.data.user);
      } catch (err) {
        // If token is invalid or expired, redirect to login
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Failed to load profile. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]); // Re-run if navigate reference changes (it won't, but good practice)

  // ── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div>
        <UNavBar />
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status" />
          <p className="mt-2 text-muted">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // ── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div>
        <UNavBar />
        <div className="container py-4">
          <div className="alert alert-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* User-section navigation bar */}
      <UNavBar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              {/* Profile avatar / icon */}
              <div className="text-center mb-4">
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2d6a4f, #52b788)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    margin: "0 auto",
                  }}
                >
                  👤
                </div>
                <h3 className="mt-3">{user?.name}</h3>
                <span className="badge bg-success">{user?.role}</span>
              </div>

              {/* Profile Info Fields */}
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span className="fw-semibold text-muted">📧 Email</span>
                  <span>{user?.email}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span className="fw-semibold text-muted">🎭 Role</span>
                  <span className="text-capitalize">{user?.role}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center py-3">
                  <span className="fw-semibold text-muted">📅 Member Since</span>
                  <span>
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-4 text-center">
                <a href="/suggestions/new" className="btn btn-success me-2">
                  ✨ New Suggestion
                </a>
                <a href="/suggestions" className="btn btn-outline-success">
                  📊 View History
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserData;
