import React from "react";
import { FaCheckCircle, FaUsers, FaTools, FaStar, FaThumbsUp, FaShieldAlt } from "react-icons/fa";
import img from "../assets/logo2.jpg";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-text">
          <h1>About Us</h1>
          <p>Connecting You with Trusted Home Service Professionals</p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Who We Are</h2>
            <p>
              We are a platform dedicated to bringing skilled professionals to your doorstep. 
              Whether you need a **plumber, electrician, cleaner, carpenter, or any other home service expert**, 
              we ensure you get **trusted, reliable, and verified professionals** who are the best at what they do.
            </p>
            <p>
              Our mission is simple: **make home services hassle-free and accessible for everyone**. No more searching for 
              local professionals or worrying about pricing—we provide transparent pricing, quality assurance, and a seamless booking experience.
            </p>
          </div>
          <div className="about-image">
            <img src={img} alt="Who We Are" />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <p>We go beyond just connecting you with service providers. Here's why thousands trust us:</p>
        <div className="features">
          <div className="feature">
            <FaShieldAlt className="feature-icon" />
            <h3>100% Verified Professionals</h3>
            <p>All service providers go through background checks and skill assessments.</p>
          </div>
          <div className="feature">
            <FaStar className="feature-icon" />
            <h3>Top-Rated Services</h3>
            <p>With thousands of happy customers, we maintain high service standards.</p>
          </div>
          <div className="feature">
            <FaTools className="feature-icon" />
            <h3>Wide Range of Services</h3>
            <p>From **repairs to cleaning to salon at home**, we cover everything.</p>
          </div>
          <div className="feature">
            <FaThumbsUp className="feature-icon" />
            <h3>Affordable & Transparent Pricing</h3>
            <p>No hidden costs! Get upfront pricing for every service.</p>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          To revolutionize the way people access home services by **providing a seamless, reliable, and high-quality experience** 
          while empowering local professionals with more opportunities.
        </p>
      </section>
    </div>
  );
};

export default About;
