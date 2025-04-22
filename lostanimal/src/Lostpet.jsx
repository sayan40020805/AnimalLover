import { useState } from "react";
import "../styles/LostAnimal.css";

const LostAnimal = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Lost Animal Report Submitted:", formData);
    // Add API call or backend integration here
  };

  return (
    <div className="lost-animal-container">
      <h2>Report a Lost Animal</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Last Seen Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Upload Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
};

export default LostAnimal;
