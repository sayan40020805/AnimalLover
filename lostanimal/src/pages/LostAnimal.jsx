import { useState } from "react";
import "../styles/LostAnimal.css";

const LostAnimal = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image: null,
  });
  //const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lost Animal Report Submitted:", formData);
    alert("Lost animal report submitted successfully!");
  };

  return (
    <div className="lost-animal-container">
      {/* <button
        onClick={() => setDarkMode(!darkMode)}
        className="dark-mode-toggle"
      >
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button> */}
      <h2>Report a Lost Animal</h2>
      <p>If you have lost an animal, please provide the details below.</p>

      <form onSubmit={handleSubmit} className="lost-animal-form">
        <label>
          Animal Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Seen Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <button type="submit" className="submit-button">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default LostAnimal;
