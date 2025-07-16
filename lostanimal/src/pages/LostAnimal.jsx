import React, { useState } from "react";
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
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();
      data.append("animalType", formData.animalType);
      data.append("lastSeenLocation", formData.lastSeenLocation);
      data.append("description", formData.description);
      data.append("reporterName", formData.reporterName);
      data.append("reporterPhone", formData.reporterPhone);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const res = await fetch("http://localhost:5000/api/lost-animals", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Lost animal report submitted successfully!");
        setFormData({
          animalType: "",
          lastSeenLocation: "",
          description: "",
          reporterName: "",
          reporterPhone: "",
          image: null,
        });
        document.getElementById("imageUpload").value = "";
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
          ></textarea>
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
