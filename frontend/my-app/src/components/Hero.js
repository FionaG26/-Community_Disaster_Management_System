import React from 'react';

const Hero = () => {
  const scrollToVolunteer = () => {
    const volunteerSection = document.getElementById("volunteer");
    if (volunteerSection) {
      volunteerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <h1>Community Disaster Management System</h1>
      <p>Providing help and support during times of need</p>
      <button className="cta-button" onClick={scrollToVolunteer}>
        Get Involved
      </button>
    </section>
  );
};

export default Hero;
