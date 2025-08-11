// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api"; // ✅ centralized axios instance
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Adjust endpoint to your backend’s login route
      const res = await api.post("/users/login", { email, password, role });

      const { token, user } = res.data;

      if (!user || !user._id) {
        throw new Error("Invalid user data received from server.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user._id);

      if (user.role === "admin") {
        alert("Welcome Admin!");
        return navigate("/admin");
      }

      if (user.role === "volunteer" && !user.isApproved) {
        alert("Your account is not approved yet. Please wait for admin approval.");
        return;
      }

      alert("Login successful!");
      if (user.role === "volunteer") {
        navigate("/volunteer");
      } else if (user.role === "user") {
        navigate("/user-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login to AnimalLover</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="form-group">
          <label>Login as:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-input"
          >
            <option value="user">User</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="signup-link">
        Don’t have an account?{" "}
        <Link to="/signup" className="signup-link-text">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
