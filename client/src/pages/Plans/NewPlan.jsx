import { useState } from "react";
import { Link } from "react-router-dom";
import LNavbar from "../../components/LNavbar";

function NewPlan() {
  const [formData, setFormData] = useState({
    planName: "",
    goal: "",
    duration: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="page-wrapper">
      <LNavbar />

      <div className="container" style={{ maxWidth: 720 }}>
        <div className="page-header">
          <h1>Create a Plan</h1>
          <p>Build a custom nutrition or meal plan for your schedule</p>
        </div>

        <div className="row g-4">
          <div className="col-md-8">
            <div className="form-section">
              <div className="section-title">Plan details</div>
              <div className="section-desc">This feature is under development</div>

              <div className="mb-3">
                <label htmlFor="plan-name" className="form-label">Plan name</label>
                <input
                  id="plan-name"
                  type="text"
                  name="planName"
                  className="form-control"
                  placeholder="e.g. 4-week weight loss plan"
                  value={formData.planName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="plan-goal" className="form-label">Goal</label>
                <select
                  id="plan-goal"
                  name="goal"
                  className="form-select"
                  value={formData.goal}
                  onChange={handleChange}
                >
                  <option value="">Select a goal</option>
                  <option value="weight loss">Weight loss</option>
                  <option value="maintain">Maintain weight</option>
                  <option value="weight gain">Weight gain</option>
                </select>
              </div>

              {/* duration and notes not on same row — developer just put them separate */}
              <div className="mb-3">
                <label htmlFor="plan-duration" className="form-label">Duration</label>
                <select
                  id="plan-duration"
                  name="duration"
                  className="form-select"
                  value={formData.duration}
                  onChange={handleChange}
                >
                  <option value="">Select duration</option>
                  <option value="1">1 week</option>
                  <option value="2">2 weeks</option>
                  <option value="4">4 weeks</option>
                  <option value="8">8 weeks</option>
                </select>
              </div>

              <div style={{ marginBottom: 22 }}>
                <label htmlFor="plan-notes" className="form-label">Notes / preferences</label>
                <textarea
                  id="plan-notes"
                  name="notes"
                  className="form-control"
                  rows={3}
                  placeholder="e.g. vegetarian, no dairy, prefer simple recipes..."
                  value={formData.notes}
                  onChange={handleChange}
                  style={{ resize: "vertical" }}
                />
              </div>

              <button
                id="create-plan-btn"
                type="button"
                className="btn-primary-custom"
                disabled
                style={{ opacity: 0.45, cursor: "not-allowed" }}
              >
                Create plan
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-md-4">
            <div className="alert-info-soft" style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#334155", marginBottom: 6 }}>
                Coming soon
              </div>
              <p style={{ fontSize: 12.5, margin: 0 }}>
                The custom plan builder is still being worked on. In the meantime, use the
                suggestion tool to get an instant plan.
              </p>
            </div>
            <Link to="/suggestions/new" className="btn-card-action" style={{ display: "block", textAlign: "center" }}>
              Try instant suggestion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPlan;
