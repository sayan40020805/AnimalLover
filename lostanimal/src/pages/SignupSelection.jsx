import React from 'react';
import { Link } from "react-router-dom";
import "../styles/SignupSelection.css";

const SignupSelection = () => {
  return (
    <div className="signup-selection-container">
      <h2 className="selection-title">Select Account Type</h2>

      <div className="signup-options">
        <Link to="/user-signup" className="signup-option-button">
          🧍 Sign Up as User
        </Link>
        <Link to="/volunteer-signup" className="signup-option-button">
          🤝 Sign Up as Volunteer
        </Link>
      </div>
    </div>
  );
};

export default SignupSelection;
