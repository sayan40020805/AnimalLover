import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewAnimals.css";

const ViewAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/animals");
        if (!res.ok) throw new Error("Failed to fetch animals");
        const data = await res.json();
        setAnimals(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="view-animals-container">
      <h2>Animals Available for Adoption</h2>

      <button
        className="post-animal-button"
        onClick={() => navigate("/post-animal")}
      >
        Post an Animal for Adoption
      </button>

      {loading && <p className="loading-text">Loading animals...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && animals.length === 0 && (
        <p>No animals available for adoption yet.</p>
      )}

      {!loading && !error && animals.length > 0 && (
        <div className="animal-list">
          {animals.map((animal) => (
            <div key={animal._id} className="animal-card">
              <img
                src={
                  animal.image?.startsWith("http")
                    ? animal.image
                    : `http://localhost:5000${animal.image}`
                }
                alt={animal.name}
              />
              <h3>{animal.name}</h3>
              <p><strong>Type:</strong> {animal.animalType}</p>
              <p><strong>Age:</strong> {animal.age}</p>
              <p><strong>Location:</strong> {animal.location}</p>
              <p className="description">{animal.description}</p>
              <button
                className="adopt-button"
                onClick={() => navigate(`/adopt/${animal._id}`)}
              >
                Adopt Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAnimals;
