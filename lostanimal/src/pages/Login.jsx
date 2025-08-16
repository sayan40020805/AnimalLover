import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, role: userType }),
      });

      const data = await res.json();
      console.log("🔁 Login Response:", data);

      if (!res.ok) {
        alert(data.message || "Login failed. Please check your credentials.");
        return;
      }

      let userData;
      if (userType === 'admin') {
        userData = data.admin;
      } else {
        userData = data[userType]; // 'user' or 'volunteer'
      }

      if (!userData || !userData.id) {
        throw new Error("User data missing or invalid.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userType", userType);
      localStorage.setItem("userId", userData.id);

      // 🎯 Role-specific logic
      if (userType === "admin") {
        alert("Welcome Admin!");
        return navigate("/admin");
      }

      if (userType === "volunteer" && userData.isApproved === false) {
        alert("Your account is not approved yet. Please wait for admin approval.");
        return;
      }

      alert("Login successful!");

      if (userType === "volunteer") {
        navigate("/volunteer-dashboard");
      } else {
        navigate("/"); // user
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login to AnimalLover</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="userType">Login as:</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
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
