// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import LostAnimal from "./pages/LostAnimal";
import RescueDead from "./pages/RescueDead";
import RescueAccident from "./pages/RescueAccident";
import AnimalInfo from "./pages/AnimalInfo";
import ViewAnimals from "./pages/ViewAnimals";
import PostAnimal from "./pages/PostAnimal"; // ✅ fixed naming
import Login from "./pages/Login";
import Donate from "./pages/Donate";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import UserDashboard from "./pages/UserDashboard";
import UserSignup from "./pages/UserSignup";
import VolunteerSignup from "./pages/VolunteerSignup";
import SignupSelection from "./pages/SignupSelection";

import "./App.css";

// ✅ Improved ProtectedRoute
function ProtectedRoute({ element, allowedRole }) {
  const token = localStorage.getItem("token");
  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Invalid user data in localStorage");
  }

  if (!token || !user || user.role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="user-signup" element={<UserSignup />} />
          <Route path="volunteer-signup" element={<VolunteerSignup />} />
          <Route path="signup" element={<SignupSelection />} />
          <Route path="donate" element={<Donate />} />

          {/* Protected Routes */}
          <Route
            path="admin"
            element={<ProtectedRoute element={<AdminDashboard />} allowedRole="admin" />}
          />
          <Route
            path="volunteer"
            element={<ProtectedRoute element={<VolunteerDashboard />} allowedRole="volunteer" />}
          />
          <Route
            path="user-dashboard"
            element={<ProtectedRoute element={<UserDashboard />} allowedRole="user" />}
          />

          {/* Public Pages */}
          <Route path="lost-animal" element={<LostAnimal />} />
          <Route path="rescue-dead" element={<RescueDead />} />
          <Route path="rescue-accident" element={<RescueAccident />} />
          <Route path="animal-info" element={<AnimalInfo />} />
          <Route path="view-animals" element={<ViewAnimals />} />
          <Route path="post-animal" element={<PostAnimal />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div style={{ textAlign: "center", padding: "50px" }}>
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
