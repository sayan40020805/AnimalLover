// src/pages/RescueDead.jsx
import React, { useState } from "react";
import api from "../api/api"; // ✅ centralized API
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

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("token");

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

    if (!token) {
      alert("Please log in before submitting a report.");
      return;
    }

    if (!formData.animalType || !formData.location || !formData.description || !formData.reporterName || !formData.reporterPhone) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      const res = await api.post("/rescue/dead", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201 || res.status === 200) {
        setSuccessMessage("✅ Report for the deceased animal submitted successfully!");
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
    <div className="rescue-dead-container">
      <h2>Report a Deceased Animal</h2>
      <p>If you have spotted a deceased animal, please provide details below.</p>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="rescue-dead-form">
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

export default RescueDead;
