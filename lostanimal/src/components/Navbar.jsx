// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const isAdmin = user?.role === "admin";
    const isVolunteer = user?.role === "volunteer";
    const isUser = user?.role === "user";

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="top-navigation" role="navigation">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>

                {/* Admin Dashboard */}
                {isLoggedIn && isAdmin && (
                    <li className="nav-item">
                        <Link to="/admin" className="nav-link">Admin Dashboard</Link>
                    </li>
                )}

                {/* Volunteer Dashboard */}
                {isLoggedIn && isVolunteer && (
                    <li className="nav-item">
                        <Link to="/volunteer" className="nav-link">Volunteer Dashboard</Link>
                    </li>
                )}

                {/* User Dashboard */}
                {isLoggedIn && isUser && (
                    <li className="nav-item">
                        <Link to="/user-dashboard" className="nav-link">User Dashboard</Link>
                    </li>
                )}

                {/* Auth Buttons */}
                {!isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                    </>
                ) : (
                    <li className="nav-item">
                        <button
                            className="nav-link logout-button"
                            onClick={handleLogout}
                            aria-label="Logout"
                        >
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
