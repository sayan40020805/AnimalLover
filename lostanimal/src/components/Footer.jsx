// src/components/Footer.jsx
import React from 'react';
import "../styles/Footer.css";

const Footer = () => {
    return (
        <footer className="home-footer">
            <p>&copy; {new Date().getFullYear()} Lost Pet Rescue. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
