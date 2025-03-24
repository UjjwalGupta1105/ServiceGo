import React from "react";
import img from "../assets/sideimg.png"
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-container">
      {/* Left Content */}
      <div className="hero-text">
        <h1>Your Trusted Home Service Partner!</h1>
        <p className="hero-subtext">
          Say goodbye to home maintenance stress! Get expert help for plumbing, electrical repairs, deep cleaning, appliance installation, painting, and much more—all at your convenience.
        </p>
        <p className="hero-highlight">
          Reliable, fast, and affordable services at your doorstep.
        </p>
        <button onClick={()=>navigate("/Services/all-services")} className="hero-button">Book a Service Now</button>
      </div>

      {/* Right Image */}
      <div className="hero-image">
        <img
          src={img}
          alt="Home Services"
        />
      </div>
    </section>
  );
};

export default HeroSection;
