// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [pendingVolunteers, setPendingVolunteers] = useState([]);
    const [allVolunteers, setAllVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("pending");
    const navigate = useNavigate();

    const fetchPendingVolunteers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await api.get("/admin/pending-volunteers");
            setPendingVolunteers(res.data.volunteers || []);
        } catch (err) {
            console.error("Error fetching pending volunteers:", err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setError("Failed to load pending volunteers.");
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchAllVolunteers = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await api.get("/admin/all-volunteers");
            setAllVolunteers(res.data.volunteers || []);
        } catch (err) {
            console.error("Error fetching all volunteers:", err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
            } else {
                setError("Failed to load all volunteers.");
            }
        } finally {
            setLoading(false);
        }
    };

    const approveVolunteer = async (id) => {
        if (!window.confirm("Approve this volunteer?")) return;
        try {
            await api.put(`/admin/approve/${id}`);
            setPendingVolunteers(pendingVolunteers.filter((v) => v._id !== id));
            // Also update all volunteers list
            setAllVolunteers(allVolunteers.map(v => 
                v._id === id ? { ...v, isApproved: true } : v
            ));
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
        fetchAllVolunteers();
    }, [navigate]);

    if (loading && pendingVolunteers.length === 0 && allVolunteers.length === 0) {
        return <p>Loading volunteers...</p>;
    }
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Admin Dashboard</h1>
            
            <div style={{ marginBottom: "20px" }}>
                <button 
                    onClick={() => setActiveTab("pending")}
                    style={{
                        padding: "10px 20px",
                        marginRight: "10px",
                        backgroundColor: activeTab === "pending" ? "#007bff" : "#f8f9fa",
                        color: activeTab === "pending" ? "white" : "black",
                        border: "1px solid #dee2e6",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Pending Volunteers ({pendingVolunteers.length})
                </button>
                <button 
                    onClick={() => setActiveTab("all")}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: activeTab === "all" ? "#007bff" : "#f8f9fa",
                        color: activeTab === "all" ? "white" : "black",
                        border: "1px solid #dee2e6",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    All Volunteers ({allVolunteers.length})
                </button>
            </div>

            {activeTab === "pending" && (
                <div>
                    <h2>Pending Volunteers</h2>
                    {pendingVolunteers.length === 0 ? (
                        <p>No pending volunteers.</p>
                    ) : (
                        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingVolunteers.map((vol) => (
                                    <tr key={vol._id}>
                                        <td>{vol.name}</td>
                                        <td>{vol.email}</td>
                                        <td>{vol.phone}</td>
                                        <td>Pending</td>
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
            )}

            {activeTab === "all" && (
                <div>
                    <h2>All Volunteers</h2>
                    {allVolunteers.length === 0 ? (
                        <p>No volunteers found.</p>
                    ) : (
                        <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allVolunteers.map((vol) => (
                                    <tr key={vol._id}>
                                        <td>{vol.name}</td>
                                        <td>{vol.email}</td>
                                        <td>{vol.phone}</td>
                                        <td>{vol.isApproved ? "Approved" : "Pending"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
