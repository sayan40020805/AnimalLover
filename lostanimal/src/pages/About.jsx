import React from 'react';
import "../styles/About.css";
import aboutImage from "../assets/rescue.png";

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Our Mission</h2>
            <p className="about-description">
              The Lost Animal Web App is built to help individuals report and find
              lost or found animals in their community. Whether it’s a stray dog
              in your locality or an injured animal that needs help, you can
              easily submit a report with a photo and a short description.
            </p>
            <p className="about-description">
              If an animal appears to be sick or injured, users can directly notify
              wildlife or forest authorities through the app. Our mission is to
              protect animals, assist in their recovery, and reconnect them with
              their rightful owners.
            </p>
            <p className="about-highlight">
              Together, we can make the world a safer place for our voiceless friends.
            </p>
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="Rescued animal illustration" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
