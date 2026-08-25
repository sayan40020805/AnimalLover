import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/VolunteerList.css";

const VolunteerList = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVolunteers();
    }, []);

    const fetchVolunteers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/volunteers/all');
            const data = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.volunteers)
                    ? response.data.volunteers
                    : Array.isArray(response.data?.data)
                        ? response.data.data
                        : [];

            setVolunteers(data);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to load volunteers');
            setLoading(false);
        }
    };

    const filteredVolunteers = volunteers.filter((volunteer) => {
        const search = searchTerm.toLowerCase().trim();
        if (!search) return true;

        const name = (volunteer.name || '').toLowerCase();
        const email = (volunteer.email || '').toLowerCase();
        const phone = (volunteer.phone || '').toLowerCase();
        const location = (typeof volunteer.location === 'string'
            ? volunteer.location
            : volunteer.location?.city || volunteer.location?.coveredAreas?.join(' ') || volunteer.address || '')
            .toLowerCase();

        return name.includes(search) || email.includes(search) || phone.includes(search) || location.includes(search);
    });

    if (loading) return <div className="loading">Loading volunteers...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="volunteer-list-container">
            <h1>Volunteer List</h1>
            <p className="subtitle">Meet our amazing volunteers who want to help animals in need</p>

            <div className="search-wrapper">
                <input
                    type="text"
                    className="volunteer-search"
                    placeholder="Search volunteer by name, email, phone, or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {filteredVolunteers.length === 0 ? (
                <div className="no-volunteers">
                    <p>No volunteers found matching your search.</p>
                </div>
            ) : (
                <div className="volunteers-grid">
                    {filteredVolunteers.map((volunteer) => (
                        <div key={volunteer._id || volunteer.id || volunteer.email} className="volunteer-card">
                            <div className="volunteer-info">
                                <h3>{volunteer.name || 'Unnamed Volunteer'}</h3>
                                <p><strong>Email:</strong> {volunteer.email || 'Not provided'}</p>
                                <p><strong>Phone:</strong> {volunteer.phone || 'Not provided'}</p>
                                <p>
                                    <strong>Location:</strong>{' '}
                                    {typeof volunteer.location === 'string'
                                        ? volunteer.location
                                        : volunteer.location?.city || volunteer.location?.name || volunteer.address || 'Not provided'}
                                </p>
                                <p><strong>Skills:</strong> {volunteer.skills || volunteer.experience || 'Not specified'}</p>
                                <p><strong>Status:</strong>
                                    <span className={volunteer.isApproved || volunteer.status === 'approved' ? 'approved' : 'pending'}>
                                        {volunteer.isApproved || volunteer.status === 'approved' ? 'Approved' : 'Pending'}
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
