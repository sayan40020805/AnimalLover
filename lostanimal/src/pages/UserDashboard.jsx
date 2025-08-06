import React, { useEffect, useState } from "react";
import api from "../api/api";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchUserReports = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/reports/my-reports", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setReports(res.data.reports || []);
        } catch (err) {
            console.error("Error fetching user reports:", err);
            setError("Failed to load your reports.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserReports();
    }, []);

    return (
        <div className="user-dashboard">
            <h2>Your Submitted Reports</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : reports.length === 0 ? (
                <p>No reports submitted yet.</p>
            ) : (
                <ul className="report-list">
                    {reports.map((report) => (
                        <li key={report._id} className="report-item">
                            <strong>Type:</strong> {report.type} <br />
                            <strong>Description:</strong> {report.description} <br />
                            <strong>Location:</strong> {report.location} <br />
                            <strong>Status:</strong> {report.status || "Pending"} <br />
                            <strong>Submitted:</strong>{" "}
                            {new Date(report.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserDashboard;
