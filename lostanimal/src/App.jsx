// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import About from "./pages/About";
import LostAnimal from "./pages/LostAnimal";
import RescueDead from "./pages/RescueDead";
import RescueAccident from "./pages/RescueAccident";
import AnimalInfo from "./pages/AnimalInfo";
import ViewAnimals from "./pages/ViewAnimals";
import PostAnimals from "./pages/PostAnimal";
import Login from "./pages/Login";
import Donate from "./pages/Donate";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ single admin page
import UserSignup from "./pages/UserSignup";
import VolunteerSignup from "./pages/VolunteerSignup";
import SignupSelection from "./pages/SignupSelection";

import "./App.css";

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
          <Route path="/donate" element={<Donate />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="lost-animal" element={<LostAnimal />} />
          <Route path="rescue-dead" element={<RescueDead />} />
          <Route path="rescue-accident" element={<RescueAccident />} />
          <Route path="animal-info" element={<AnimalInfo />} />
          <Route path="view-animals" element={<ViewAnimals />} />
          <Route path="post-animal" element={<PostAnimals />} />

          {/* 404 Fallback Route */}
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
