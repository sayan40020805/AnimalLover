// src/components/Layout.jsx
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
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }
    }, [darkMode]);

    return (
        <>
            <Navbar />
            <button
                onClick={toggleDarkMode}
                className="dark-mode-toggle"
                style={{
                    position: "fixed",
                    top: 20,
                    left: 30,
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "white",
                    fontSize: "1rem",
                    zIndex: 1000,
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
