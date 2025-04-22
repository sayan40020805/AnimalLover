import { Link } from "react-router-dom";
import "../styles/SignupSelection.css";

const SignupSelection = () => {
  return (
    <div className="signup-selection-container">
      <h2>Select Account Type</h2>
      <div className="signup-options">
        <Link to="/usersignup" className="signup-option-button">
          Sign Up as User
        </Link>
        <Link to="/volunteersignup" className="signup-option-button">
          Sign Up as Volunteer
        </Link>
      </div>
    </div>
  );
};

export default SignupSelection;
