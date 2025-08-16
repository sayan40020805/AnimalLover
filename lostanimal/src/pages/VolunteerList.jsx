import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/VolunteerList.css";

const VolunteerList = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/volunteers/all');
            setVolunteers(response.data.volunteers);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading volunteers...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="volunteer-list-container">
            <h1>Volunteer List</h1>
            <p className="subtitle">Meet our amazing volunteers who want to help animals in need</p>
            
            {volunteers.length === 0 ? (
                <div className="no-volunteers">
                    <p>No volunteers found. Be the first to sign up!</p>
                </div>
            ) : (
                <div className="volunteers-grid">
                    {volunteers.map((volunteer) => (
                        <div key={volunteer._id} className="volunteer-card">
                            <div className="volunteer-info">
                                <h3>{volunteer.name}</h3>
                                <p><strong>Email:</strong> {volunteer.email}</p>
                                <p><strong>Phone:</strong> {volunteer.phone}</p>
                                <p><strong>Location:</strong> {volunteer.location}</p>
                                <p><strong>Experience:</strong> {volunteer.experience || 'Not specified'}</p>
                                <p><strong>Status:</strong> 
                                    <span className={volunteer.isApproved ? 'approved' : 'pending'}>
                                        {volunteer.isApproved ? 'Approved' : 'Pending'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VolunteerList;
