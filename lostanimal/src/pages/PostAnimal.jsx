import React from 'react';
import { useState } from "react";
import "../styles/PostAnimal.css";

const PostAnimal = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    location: "",
    description: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, age, breed, location, description, image } = formData;

    if (!name || !age || !breed || !location || !description || !image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    try {
      setSubmitting(true);
      const data = new FormData();
      data.append("name", name);
      data.append("age", age);
      data.append("breed", breed);
      data.append("location", location);
      data.append("description", description);
      data.append("image", image);

      const res = await fetch("/api/animals", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        setSuccessMessage("Animal posted for adoption successfully!");
        setFormData({
          name: "",
          age: "",
          breed: "",
          location: "",
          description: "",
          image: null,
        });
        setPreview(null);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        alert(result.message || "Failed to post animal.");
      }
    } catch (error) {
      console.error("Post error:", error);
      alert("Something went wrong. Please try again.");
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
          placeholder="Age (e.g. 2 years)"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="breed"
          placeholder="Breed"
          value={formData.breed}
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

        {preview && (
          <img src={preview} alt="Preview" className="preview-image" />
        )}

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? "Posting..." : "Post for Adoption"}
        </button>
      </form>
    </div>
  );
};

export default PostAnimal;
