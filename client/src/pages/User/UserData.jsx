import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import UNavBar from "./UNavBar";

function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");
        setUser(response.data.user);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Could not load profile. Please refresh and try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Loading
  if (loading) {
    return (
      <div className="page-wrapper">
        <UNavBar />
        <div className="loading-wrap">
          <div className="spinner-border spinner-border-sm text-secondary" role="status" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="page-wrapper">
        <UNavBar />
        <div className="container" style={{ maxWidth: 640, paddingTop: 32 }}>
          <div className="alert-error">{error}</div>
        </div>
      </div>
    );
  }

  // Get initials for avatar
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "?";

  return (
    <div className="page-wrapper">
      <UNavBar />

      <div className="container" style={{ maxWidth: 680 }}>
        <div className="page-header">
          <h1>Profile</h1>
          <p>Your account information</p>
        </div>

        <div className="profile-card">
          {/* Profile header */}
          <div className="profile-header">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-name">{user?.name}</div>
            <span className="role-badge">{user?.role}</span>
          </div>

          {/* Fields */}
          <div className="profile-field-list">
            <div className="profile-field">
              <span className="profile-field-label">Email address</span>
              <span className="profile-field-value">{user?.email}</span>
            </div>

            <div className="profile-field">
              <span className="profile-field-label">Account role</span>
              <span className="profile-field-value" style={{ textTransform: "capitalize" }}>
                {user?.role}
              </span>
            </div>

            {/* slightly more padding on last row — human touch */}
            <div className="profile-field" style={{ paddingBottom: 18 }}>
              <span className="profile-field-label">Member since</span>
              <span className="profile-field-value">
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
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <Link to="/suggestions/new" className="btn-card-action">
            Get a suggestion
          </Link>
          <Link
            to="/suggestions"
            className="btn-card-action"
            style={{ marginLeft: 2 }}
          >
            View my plans
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserData;
