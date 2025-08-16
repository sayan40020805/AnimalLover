import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchPendingVolunteers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await api.get("/admin/pending-volunteers");
            setVolunteers(res.data.volunteers || []);
        } catch (err) {
            console.error("Error fetching volunteers:", err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setError("Failed to load volunteers.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await api.put(`/admin/approve/${id}`);
            alert("Volunteer approved successfully.");
            fetchPendingVolunteers();
        } catch (err) {
            console.error("Approval failed:", err);
            alert("Error approving volunteer.");
        }
    };

    useEffect(() => {
        // Check if user is admin
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        
        fetchPendingVolunteers();
    }, [navigate]);

    return (
        <div className="admin-dashboard">
            <h2>Pending Volunteer Requests</h2>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <>
                    {volunteers.length === 0 ? (
                        <p className="no-volunteers">No pending volunteers.</p>
                    ) : (
                        <ul className="volunteer-list">
                            {volunteers.map((vol) => (
                                <li key={vol._id} className="volunteer-item">
                                    <div>
                                        <strong>{vol.name}</strong> ({vol.email}) - {vol.location}
                                    </div>
                                    <button onClick={() => handleApprove(vol._id)}>Approve</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminDashboard;
