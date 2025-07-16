import React from 'react';
import { useState } from "react";
import "../styles/RescueAccident.css";

const RescueAccident = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("location", formData.location);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const res = await fetch("http://localhost:5000/api/rescue-accident", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Rescue report submitted successfully!");
        setFormData({
          location: "",
          description: "",
          image: null,
        });
      } else {
        alert(result.message || "Failed to submit report");
      }
    } catch (err) {
      console.error("Error submitting rescue report:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="rescue-accident-container">
      <h2>Report an Injured Animal</h2>
      <p>If you see an injured animal, please provide details so we can help.</p>

      <form onSubmit={handleSubmit} className="rescue-accident-form">
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

export default RescueAccident;
