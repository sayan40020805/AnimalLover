import React, { useState } from "react";
import "../styles/RescueAccident.css";

const RescueAccident = () => {
  const [formData, setFormData] = useState({
    animalType: "",
    location: "",
    description: "",
    reporterName: "",
    reporterPhone: "",
    image: null,
  });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

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

    if (!token || !userId) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    data.append("reportedBy", userId); // required in backend

    try {
      const res = await fetch("http://localhost:5000/api/rescue/accident", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Accident report submitted successfully!");
        setFormData({
          animalType: "",
          location: "",
          description: "",
          reporterName: "",
          reporterPhone: "",
          image: null,
        });
        document.getElementById("imageInput").value = "";
      } else {
        alert(result.message || "Failed to submit report");
      }
    } catch (err) {
      console.error("Error submitting accident report:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="rescue-accident-container">
      <h2>Report an Injured Animal</h2>
      <p>If you see an injured animal, please provide details so we can help.</p>

      <form onSubmit={handleSubmit} className="rescue-accident-form">
        <label>
          Animal Type:
          <input
            type="text"
            name="animalType"
            value={formData.animalType}
            onChange={handleChange}
            required
          />
        </label>

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
          Your Name:
          <input
            type="text"
            name="reporterName"
            value={formData.reporterName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Your Phone:
          <input
            type="text"
            name="reporterPhone"
            value={formData.reporterPhone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Upload Image:
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <button type="submit" className="submit-button">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default RescueAccident;
