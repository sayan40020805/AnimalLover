// src/pages/VolunteerDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/VolunteerDashboard.css";

const VolunteerDashboard = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get("/reports/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(res.data || []);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Volunteer Dashboard</h2>
      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports available yet.</p>
      ) : (
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
