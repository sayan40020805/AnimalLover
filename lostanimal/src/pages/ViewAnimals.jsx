import { useNavigate } from "react-router-dom";
import "../styles/ViewAnimals.css";

const ViewAnimals = () => {
  const navigate = useNavigate();

  const animals = [
    {
      id: 1,
      name: "Buddy",
      age: "2 years",
      breed: "Golden Retriever",
      location: "New York",
      description: "Friendly and playful dog looking for a loving home.",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Mittens",
      age: "1 year",
      breed: "Persian Cat",
      location: "Los Angeles",
      description: "Calm and affectionate cat seeking a cozy home.",
      imageUrl: "https://via.placeholder.com/200",
    },
  ];

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
            <div key={animal.id} className="animal-card">
              <img src={animal.imageUrl} alt={animal.name} />
              <h3>{animal.name}</h3>
              <p>
                <strong>Breed:</strong> {animal.breed}
              </p>
              <p>
                <strong>Age:</strong> {animal.age}
              </p>
              <p>
                <strong>Location:</strong> {animal.location}
              </p>
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
