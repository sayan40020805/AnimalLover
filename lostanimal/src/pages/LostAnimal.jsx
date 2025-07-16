import React from 'react';
import { useState } from "react";
import "../styles/LostAnimal.css";

const LostAnimal = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    image: null,
  });

  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("location", formData.location);
      data.append("description", formData.description);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await fetch("/api/lost-animals", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Lost animal report submitted successfully!");
        // Reset form
        setFormData({
          name: "",
          location: "",
          description: "",
          image: null,
        });
      } else {
        alert(result.message || "Submission failed");
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lost-animal-container">
      <h2>Report a Lost Animal</h2>
      <p>If you have lost an animal, please provide the details below.</p>

      <form onSubmit={handleSubmit} className="lost-animal-form">
        <label>
          Animal Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Last Seen Location:
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
          <input
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
