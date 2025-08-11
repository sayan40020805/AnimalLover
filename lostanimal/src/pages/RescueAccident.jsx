// src/pages/RescueAccident.jsx
import React, { useState } from "react";
import api from "../api/api"; // ✅ Centralized axios instance
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

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const resetForm = () => {
    setFormData({
      animalType: "",
      location: "",
      description: "",
      reporterName: "",
      reporterPhone: "",
      image: null,
    });
    document.getElementById("imageInput").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !userId) {
      alert("Please log in before submitting a report.");
      return;
    }

    if (!formData.animalType || !formData.location || !formData.description || !formData.reporterName || !formData.reporterPhone) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });
      data.append("reportedBy", userId);

      const res = await api.post("/rescue/accident", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201 || res.status === 200) {
        setSuccessMessage("✅ Accident report submitted successfully!");
        resetForm();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert(res.data.message || "Failed to submit report.");
      }
    } catch (error) {
      console.error("❌ Report Error:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rescue-accident-container">
      <h2>Report an Injured Animal</h2>
      <p>If you see an injured animal, please provide details so we can help.</p>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="rescue-accident-form">
        <input
          type="text"
          name="animalType"
          placeholder="Animal Type (e.g., Dog, Cat)"
          value={formData.animalType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Describe the situation"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="reporterName"
          placeholder="Your Name"
          value={formData.reporterName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="reporterPhone"
          placeholder="Your Phone Number"
          value={formData.reporterPhone}
          onChange={handleChange}
          required
        />

        <label className="image-upload">
          Upload Image
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default RescueAccident;
