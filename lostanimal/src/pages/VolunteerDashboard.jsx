// src/pages/VolunteerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/VolunteerDashboard.css";

const VolunteerDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("You are not logged in. Please log in to view reports.");
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      try {
        const res = await api.get("/reports/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError(
          err.response?.data?.message || "Failed to fetch reports. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]); // ✅ re-fetch if token changes

  return (
    <div className="dashboard-container">
      <h2>Volunteer Dashboard</h2>

      {loading && <p>Loading reports...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && reports.length === 0 && (
        <p>No reports available yet.</p>
      )}

      {!loading && !error && reports.length > 0 && (
        <ul className="report-list">
          {reports.map((report) => (
            <li key={report._id} className="report-item">
              <strong>Type:</strong> {report.type} <br />
              <strong>Reported by:</strong> {report.reportedBy?.name || "Unknown"} <br />
              <strong>Details:</strong> {report.description} <br />
              <strong>Location:</strong> {report.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VolunteerDashboard;
