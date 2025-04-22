import { useState } from "react";
import "../styles/RescueDead.css";

const RescueDead = () => {
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    image: null,
  });

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
    console.log("Dead Animal Report Submitted:", formData);
    alert("Report for the deceased animal submitted successfully!");
    // Here, you can send the data to the backend API
  };

  return (
    <div className="rescue-dead-container">
      <h2>Report a Deceased Animal</h2>
      <p>
        If you have spotted a deceased animal, please provide details below.
      </p>

      <form onSubmit={handleSubmit} className="rescue-dead-form">
        <label>
          Location:
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

export default RescueDead;
