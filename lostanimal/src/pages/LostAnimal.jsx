// src/pages/LostAnimal.jsx
import React, { useState } from "react";
import api from "../api/api"; // ✅ use centralized axios
import "../styles/LostAnimal.css";

const LostAnimal = () => {
  const [formData, setFormData] = useState({
    animalType: "",
    lastSeenLocation: "",
    description: "",
    reporterName: "",
    reporterPhone: "",
    image: null,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const resetForm = () => {
    setFormData({
      animalType: "",
      lastSeenLocation: "",
      description: "",
      reporterName: "",
      reporterPhone: "",
      image: null,
    });
    document.getElementById("imageUpload").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      const res = await api.post("/lost-animals", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201 || res.status === 200) {
        alert("Lost animal report submitted successfully!");
        resetForm();
      } else {
        alert(res.data.message || "Submission failed");
      }
    } catch (error) {
      console.error("❌ Submit Error:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lost-animal-container">
      <h2>Report a Lost Animal</h2>
      <p>Please fill in the details below to help us locate the animal.</p>

      <form onSubmit={handleSubmit} className="lost-animal-form">
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
          Last Seen Location:
          <input
            type="text"
            name="lastSeenLocation"
            value={formData.lastSeenLocation}
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
          />
        </label>

        <label>
          Reporter Name:
          <input
            type="text"
            name="reporterName"
            value={formData.reporterName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Reporter Phone:
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
            id="imageUpload"
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

export default LostAnimal;
