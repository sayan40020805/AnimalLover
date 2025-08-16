// src/pages/AdminDashboard.jsx
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

    const approveVolunteer = async (id) => {
        if (!window.confirm("Approve this volunteer?")) return;
        try {
            await api.put(`/admin/approve/${id}`);
            setVolunteers(volunteers.filter((v) => v._id !== id));
            alert("Volunteer approved successfully!");
        } catch (err) {
            console.error("Approval failed:", err);
            alert("Error approving volunteer.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchPendingVolunteers();
    }, [navigate]);

    if (loading) return <p>Loading pending volunteers...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h2>Pending Volunteers</h2>
            {volunteers.length === 0 ? (
                <p>No pending volunteers.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Approve</th>
                        </tr>
                    </thead>
                    <tbody>
                        {volunteers.map((vol) => (
                            <tr key={vol._id}>
                                <td>{vol.name}</td>
                                <td>{vol.email}</td>
                                <td>{vol.phone}</td>
                                <td>
                                    <button onClick={() => approveVolunteer(vol._id)}>
                                        Approve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
