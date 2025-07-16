// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navber.css"; // ✅ Make sure the filename matches exactly

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

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
