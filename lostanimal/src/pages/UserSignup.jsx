import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const UserSignup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("User registered! Please login.");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <h2>User Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default UserSignup;
