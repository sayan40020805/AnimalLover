// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
      let endpoint = "http://localhost:5000/api/users/login";
      if (role === "admin") {
        endpoint = "http://localhost:5000/api/admin/login";
      } else if (role === "volunteer") {
        endpoint = "http://localhost:5000/api/volunteers/login";
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("🔁 Login Response:", data);

      if (res.ok) {
        const userData = data.user || data.volunteer || data.admin;

        if (!userData || (!userData._id && !userData.id)) {
          throw new Error("User data missing ID.");
        }

        const userId = userData._id || userData.id;

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("userType", role);
        localStorage.setItem("userId", userId);

        if (role === "admin") {
          alert("Welcome Admin!");
          return navigate("/admin-dashboard");
        }

        if (role === "volunteer" && userData.isApproved === false) {
          alert("Your account is not approved yet. Please wait for admin approval.");
          return;
        }

        alert("Login successful!");

        if (role === "volunteer") {
          navigate("/volunteer-dashboard");
        } else {
          navigate("/"); // normal user
        }
      } else {
        alert(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert(error.message || "Login failed. Please try again.");
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
