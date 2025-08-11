// src/pages/UserSignup.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api"; // Axios instance
import "../styles/Signup.css";

const UserSignup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trimStart(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    // Client-side validation
    if (!form.name || !form.email || !form.password || !form.phone) {
      setErrorMsg("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setErrorMsg("Phone number must be 10 digits.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/users/register", { ...form, role: "user" });
      alert("User registered successfully! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>User Signup</h2>

      {errorMsg && <p className="error-message">{errorMsg}</p>}

      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password (min 6 chars)"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default UserSignup;
