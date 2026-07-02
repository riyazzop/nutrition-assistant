// src/pages/Plans/NewPlan.jsx
// Placeholder page for creating a custom nutrition / meal plan
// Build out the full plan builder here in a future iteration

import { Link } from "react-router-dom";
import LNavbar from "../../components/LNavbar";

function NewPlan() {
  return (
    <div>
      <LNavbar />

      <div className="container py-5">
        {/* Page header */}
        <div className="text-center mb-5">
          <h2>📋 Create a New Plan</h2>
          <p className="text-muted">
            Design a custom weekly nutrition or meal plan tailored to your schedule.
          </p>
        </div>

        {/* Placeholder Form Card */}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4">
              {/* Plan name */}
              <div className="mb-3">
                <label htmlFor="plan-name" className="form-label fw-semibold">
                  Plan Name
                </label>
                <input
                  id="plan-name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. My 4-Week Weight Loss Plan"
                />
              </div>

              {/* Goal */}
              <div className="mb-3">
                <label htmlFor="plan-goal" className="form-label fw-semibold">
                  Goal
                </label>
                <select id="plan-goal" className="form-select">
                  <option value="">Select a goal...</option>
                  <option value="weight loss">Weight Loss</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="weight gain">Weight Gain / Muscle Building</option>
                </select>
              </div>

              {/* Duration */}
              <div className="mb-3">
                <label htmlFor="plan-duration" className="form-label fw-semibold">
                  Duration
                </label>
                <select id="plan-duration" className="form-select">
                  <option value="">Select duration...</option>
                  <option value="1">1 Week</option>
                  <option value="2">2 Weeks</option>
                  <option value="4">4 Weeks</option>
                  <option value="8">8 Weeks</option>
                </select>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <label htmlFor="plan-notes" className="form-label fw-semibold">
                  Notes / Preferences
                </label>
                <textarea
                  id="plan-notes"
                  className="form-control"
                  rows={3}
                  placeholder="e.g. vegetarian, no dairy, prefer simple recipes..."
                />
              </div>

              {/* Coming soon notice */}
              <div className="alert alert-info py-2 text-center mb-3" role="alert">
                🚧 Full plan builder coming soon! For now, try our{" "}
                <Link to="/suggestions/new" style={{ color: "#0c5460" }}>
                  instant nutrition suggestion
                </Link>
                .
              </div>

              {/* Disabled submit */}
              <button
                id="create-plan-btn"
                type="button"
                className="btn w-100 text-white fw-semibold"
                style={{ background: "linear-gradient(90deg, #2d6a4f, #52b788)" }}
                disabled
              >
                Create Plan (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPlan;
