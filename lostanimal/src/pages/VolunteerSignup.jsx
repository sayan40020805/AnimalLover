import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

const VolunteerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/volunteers/signup", formData);

      if (res.data.success) {
        alert("Volunteer registered successfully!");
        navigate("/login");
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Volunteer Sign Up</h2>

      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
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
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default VolunteerSignup;
