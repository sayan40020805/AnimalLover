//import React from "react";
import "../styles/About.css";

import aboutImage from "../assets/rescue.png"; // Make sure you have this image in your /assets folder

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Our Mission</h2>
            <p className="about-description">
              The Lost Animal Web App is designed to help people report and find
              lost or found animals in their communities. Whether it’s a stray
              dog in your neighborhood or an injured animal that needs help, you
              can easily submit a report with a photo and description.
            </p>
            <p className="about-description">
              If an animal looks sick or injured, users can send reports
              directly to wildlife or forest authorities. Our goal is to protect
              animals, assist in their recovery, and reconnect them with their
              rightful owners.
            </p>
            <p className="about-highlight">
              Together, we can make a safer world for our voiceless friends.
            </p>
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="Lost animal" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
