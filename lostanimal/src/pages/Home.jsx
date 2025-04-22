import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  // State for Dark Mode
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "enabled"
  );

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  };

  // Apply Dark Mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <main className={`home-container ${darkMode ? "dark" : ""}`}>
      {/* Navigation Section - Top Right */}
      <nav className="top-navigation">
        <ul className="nav-list">
          {/* <li className="nav-item">
            <Link to="/" className="nav-link primary-button">
              Home
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to="/about" className="nav-link primary-button">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link primary-button">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link primary-button">
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>

      {/* Dark Mode Toggle Button */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      {/* Header Section */}
      <header className="home-header">
        <h1 className="home-title">Welcome to AnimalLover</h1>
        <p className="home-subtitle">
          Helping lost and injured animals find their way home.
        </p>
      </header>

      {/* Action Buttons */}
      <section className="action-section">
        <h2 className="action-title">Take Action</h2>
        <ul className="action-list">
          <li className="action-item">
            <Link to="/lost-animal" className="action-link home-button">
              Report Lost Animal
            </Link>
          </li>
          <li className="action-item">
            <Link to="/rescue-dead" className="action-link home-button">
              Report Dead Animal
            </Link>
          </li>
          <li className="action-item">
            <Link to="/rescue-accident" className="action-link home-button">
              Report Injured Animal
            </Link>
          </li>
          <li className="action-item">
            <Link to="/animal-info" className="action-link home-button">
              Animal First Aid
            </Link>
          </li>
        </ul>
      </section>

      {/* Adopt an Animal Section */}
      <section className="adopt-section">
        <h2 className="adopt-title">Adopt an Animal</h2>
        <p className="adopt-subtitle">
          Give a loving home to animals in need. Adopt a pet today and make a
          difference.
        </p>
        <Link to="/view-animals" className="adopt-link home-button">
          View Animals for Adoption
        </Link>
      </section>

      {/* Footer Section */}
      <footer className="home-footer">
        <p>&copy; 2025 Lost Pet Rescue. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Home;
