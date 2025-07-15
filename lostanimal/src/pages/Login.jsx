import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // default is user
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint =
      userType === "user"
        ? "/api/users/login"
        : "/api/volunteers/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user || data.volunteer));
        localStorage.setItem("userType", userType);
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
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
          />
        </div>

        <div className="form-group">
          <label>Login as:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="form-input"
          >
            <option value="user">User</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        <button type="submit" className="login-button">
          Login
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
