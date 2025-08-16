// src/pages/VolunteerSignup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // ✅ centralized axios instance
import "../styles/Signup.css";

const VolunteerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    coveredLocations: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // ✅ Client-side validation
    if (!formData.name || !formData.email || !formData.password || !formData.phone || !formData.location) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorMsg("Phone number must be 10 digits.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/register/volunteer", formData);

      if (res.status === 201) {
        alert("Volunteer registered successfully! Awaiting admin approval.");
        navigate("/login");
      } else {
        setErrorMsg(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg(err.response?.data?.message || "Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Volunteer Sign Up</h2>
      <p className="info-message">
        Fill out the form below to apply as a volunteer. Your application will be reviewed by an admin. You can log in only after approval.
      </p>

      {errorMsg && <p className="error-message">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 chars)"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default VolunteerSignup;
