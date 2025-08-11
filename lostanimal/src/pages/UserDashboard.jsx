import React, { useEffect, useState } from "react";
import "../styles/UserDashboard.css";

const UserDashboard = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!userId || !token) {
            setError("You must be logged in to view your reports.");
            setLoading(false);
            return;
        }

        const fetchReports = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/lost-animals?reportedBy=${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch reports");
                }

                setReports(data.lostAnimals || []);
            } catch (err) {
                setError(err.message || "Error fetching reports");
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []); // runs once on mount

    return (
        <div className="user-dashboard-container">
            <h2>Your Lost Animal Reports</h2>

            {loading && <p className="loading">Loading...</p>}

            {error && <p className="error">{error}</p>}

            {!loading && !error && reports.length === 0 && (
                <p className="no-reports">No reports found.</p>
            )}

            {!loading && !error && reports.length > 0 && (
                <div className="reports-list">
                    {reports.map((report) => (
                        <div key={report._id} className="report-card">
                            <h3>{report.animalType}</h3>
                            <p><strong>Last Seen:</strong> {report.lastSeenLocation}</p>
                            <p><strong>Description:</strong> {report.description}</p>
                            <p><strong>Status:</strong> {report.status}</p>
                            {report.image && (
                                <img
                                    src={
                                        report.image.startsWith("/")
                                            ? `http://localhost:5000${report.image}`
                                            : report.image
                                    }
                                    alt="Lost Animal"
                                    className="report-image"
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
