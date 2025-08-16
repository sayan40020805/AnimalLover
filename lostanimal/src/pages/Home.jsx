import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (role) {
      setUserType(role);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const isAdmin = user?.role === "admin";

  return (
    <main className={`home-container ${darkMode ? "dark" : ""}`}>
      <Navbar />

      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <header className="home-header">
        <h1 className="home-title">
          {isAdmin
            ? `Welcome Admin 👑`
            : `Welcome to AnimalLover`}
        </h1>
        <p className="home-subtitle">
          {isAdmin
            ? "Manage volunteer requests and monitor system activity."
            : "Helping lost and injured animals find their way home."}
        </p>
      </header>

      {/* Admin-only Section */}
      {isAdmin && (
        <section className="admin-section">
          <h2>Admin Actions</h2>
          <Link to="/admin" className="home-button">
            Go to Admin Dashboard
          </Link>
        </section>
      )}

      {/* Non-admin Sections */}
      {!isAdmin && (
        <>
          {/* Volunteer Request Section */}
          {userType !== "volunteer" && (
            <section className="volunteer-request-section">
              <h2 className="volunteer-title glow-red">Become a Volunteer</h2>
              <p className="volunteer-subtitle">Help rescue and support animals in your area. Join our volunteer team!</p>
              <Link to="/volunteer-signup" className="volunteer-button home-button black-glow">Request to be a Volunteer</Link>
            </section>
          )}

          <section className="action-section">
            <h2 className="action-title glow-red">Take Action</h2>
            <ul className="action-list">
              <li className="action-item">
                <Link to="/lost-animal" className="action-link home-button black-glow">
                  Report Lost Animal
                </Link>
              </li>
              <li className="action-item">
                <Link to="/rescue-dead" className="action-link home-button black-glow">
                  Report Dead Animal
                </Link>
              </li>
              <li className="action-item">
                <Link to="/rescue-accident" className="action-link home-button black-glow">
                  Report Injured Animal
                </Link>
              </li>
              <li className="action-item">
                <Link to="/animal-info" className="action-link home-button black-glow">
                  Animal First Aid
                </Link>
              </li>
            </ul>
          </section>

          <section className="adopt-section">
            <h2 className="adopt-title glow-red">Adopt an Animal</h2>
            <p className="adopt-subtitle">
              Give a loving home to animals in need. Adopt a pet today and make a difference.
            </p>
            <Link to="/view-animals" className="adopt-link home-button black-glow">
              View Animals for Adoption
            </Link>
          </section>

          <section className="donate-section">
            <h2 className="donate-title glow-red">Support Our Cause</h2>
            <p className="donate-subtitle">
              Help us continue rescuing, treating, and rehoming animals in need.
            </p>
            <Link to="/donate" className="donate-button home-button black-glow">
              Donate Now 💖
            </Link>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
};

export default Home;
