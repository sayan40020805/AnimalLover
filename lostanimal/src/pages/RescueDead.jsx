import React, { useState } from "react";
import "../styles/RescueDead.css";

const RescueDead = () => {
  const [formData, setFormData] = useState({
    animalType: "",
    location: "",
    description: "",
    reporterName: "",
    reporterPhone: "",
    image: null,
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch("http://localhost:5000/api/rescue/dead", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token for protected route
        },
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Report for the deceased animal submitted successfully!");
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
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="rescue-dead-container">
      <h2>Report a Deceased Animal</h2>
      <p>If you have spotted a deceased animal, please provide details below.</p>

      <form onSubmit={handleSubmit} className="rescue-dead-form">
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

export default RescueDead;
