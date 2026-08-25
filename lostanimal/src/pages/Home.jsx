import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (role) {
      setUserType(role);
    }

    document.body.classList.remove("dark-mode");
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <main className="home-container">
      <Navbar />

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
          <div className="compact-card-row">
            {/* Volunteer Request Section */}
            {userType !== "volunteer" && (
              <section className="volunteer-request-section compact-card">
                <h2 className="volunteer-title glow-red">Become a Volunteer</h2>
                <p className="volunteer-subtitle">Join our rescue team.</p>
                <Link to="/volunteer-signup" className="volunteer-button home-button black-glow">Volunteer</Link>
              </section>
            )}

            <section className="adopt-section compact-card">
              <h2 className="adopt-title glow-red">Adopt</h2>
              <p className="adopt-subtitle">Give a home to animals in need.</p>
              <Link to="/view-animals" className="adopt-link home-button black-glow">
                View Animals
              </Link>
            </section>

            <section className="donate-section compact-card">
              <h2 className="donate-title glow-red">Donate</h2>
              <p className="donate-subtitle">Help rescue and rehome pets.</p>
              <Link to="/donate" className="donate-button home-button black-glow">
                Donate Now
              </Link>
            </section>
          </div>

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
                  Dead Animal
                </Link>
              </li>
              <li className="action-item">
                <Link to="/rescue-accident" className="action-link home-button black-glow">
                  Injured Animal
                </Link>
              </li>
              <li className="action-item">
                <Link to="/animal-info" className="action-link home-button black-glow">
                  First Aid
                </Link>
              </li>
            </ul>
          </section>
        </>
      )}

      <Footer />
    </main>
  );
};

export default Home;
