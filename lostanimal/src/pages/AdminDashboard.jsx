// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = ({ token }) => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            setError("No admin token provided. Please log in as admin.");
            setLoading(false);
            return;
        }
        const fetchPendingVolunteers = async () => {
            try {
                const res = await axios.get("/api/admin/pending-volunteers", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setVolunteers(res.data.volunteers || []);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPendingVolunteers();
    }, [token]);

    // Approve volunteer
    const approveVolunteer = async (id) => {
        if (!window.confirm("Approve this volunteer?")) return;

        try {
            await axios.put(`/api/admin/approve/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setVolunteers(volunteers.filter((v) => v._id !== id)); // remove approved volunteer from list
            alert("Volunteer approved successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to approve volunteer");
        }
    };

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
