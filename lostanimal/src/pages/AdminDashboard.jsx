// frontend/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import api from "../api/api"; // Your central axios instance
import "../styles/AdminDashboard.css"; // Optional CSS

const AdminDashboard = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingVolunteers = async () => {
        try {
            const res = await api.get("/admin/pending-volunteers");
            setVolunteers(res.data.volunteers || []);
        } catch (err) {
            console.error("Error fetching volunteers:", err);
            alert("Failed to load volunteers.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await api.put(`/admin/approve/${id}`);
            alert("Volunteer approved successfully.");
            fetchPendingVolunteers(); // Refresh the list
        } catch (err) {
            console.error("Approval failed:", err);
            alert("Error approving volunteer.");
        }
    };

    useEffect(() => {
        fetchPendingVolunteers();
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>Pending Volunteer Requests</h2>
            {loading ? (
                <p>Loading...</p>
            ) : volunteers.length === 0 ? (
                <p>No pending volunteers.</p>
            ) : (
                <ul className="volunteer-list">
                    {volunteers.map((vol) => (
                        <li key={vol._id} className="volunteer-item">
                            <strong>{vol.name}</strong> ({vol.email}) - {vol.location}
                            <button onClick={() => handleApprove(vol._id)}>Approve</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminDashboard;
