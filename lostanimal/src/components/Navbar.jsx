import { Link, useNavigate } from "react-router-dom";
import "../styles/Navber.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="top-navigation">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className="nav-link">About</Link>
                </li>
                {!isLoggedIn ? (
                    <>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="nav-link">Sign Up</Link>
                        </li>
                    </>
                ) : (
                    <li className="nav-item">
                        <button className="nav-link logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
