// src/components/Layout.jsx
import React from 'react';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "enabled"
    );

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
    };

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
    }, [darkMode]);

    return (
        <>
            <Navbar />

            {/* Dark Mode Toggle Button */}
            <button
                onClick={toggleDarkMode}
                className="dark-mode-toggle"
                aria-label="Toggle Dark Mode"
                style={{
                    position: "fixed",
                    top: 20,
                    left: 30,
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    fontSize: "1rem",
                    zIndex: 1000,
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                }}
            >
                {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
            </button>

            <main style={{ paddingTop: "80px" }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
