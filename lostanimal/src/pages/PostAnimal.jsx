// src/pages/PostAnimal.jsx
import React, { useState } from "react";
import api from "../api/api"; // ✅ Use your central axios instance
import "../styles/PostAnimal.css";

const PostAnimal = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    animalType: "",
    location: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      animalType: "",
      location: "",
      description: "",
      image: null,
    });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !userId) {
      alert("Please log in before posting an animal.");
      return;
    }

    if (Object.values(formData).some((field) => !field)) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    try {
      setSubmitting(true);

      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });
      data.append("createdBy", userId);

      const res = await api.post("/animals", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201 || res.status === 200) {
        setSuccessMessage("✅ Animal posted for adoption successfully!");
        resetForm();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert(res.data.message || "Failed to post animal.");
      }
    } catch (error) {
      console.error("❌ Post Error:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="post-animal-container">
      <h2>Post an Animal for Adoption</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="post-animal-form">
        <input
          type="text"
          name="name"
          placeholder="Animal Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="age"
          placeholder="Age (e.g., 2 years)"
          value={formData.age}
          onChange={handleChange}
          required
        />
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
          placeholder="Location (City, State)"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Describe the pet"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <label className="image-upload">
          Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </label>

        {preview && <img src={preview} alt="Preview" className="preview-image" />}

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? "Posting..." : "Post for Adoption"}
        </button>
      </form>
    </div>
  );
};

export default PostAnimal;
