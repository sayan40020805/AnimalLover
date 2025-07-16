import React from 'react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ViewAnimals.css";

const ViewAnimals = () => {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/animals");
        const data = await res.json();
        setAnimals(data);
      } catch (error) {
        console.error("Error fetching animals:", error);
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

      {animals.length === 0 ? (
        <p>No animals available for adoption yet.</p>
      ) : (
        <div className="animal-list">
          {animals.map((animal) => (
            <div key={animal._id} className="animal-card">
              <img src={animal.imageUrl} alt={animal.name} />
              <h3>{animal.name}</h3>
              <p><strong>Breed:</strong> {animal.breed}</p>
              <p><strong>Age:</strong> {animal.age}</p>
              <p><strong>Location:</strong> {animal.location}</p>
              <p>{animal.description}</p>
              <button className="adopt-button">Adopt Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAnimals;
