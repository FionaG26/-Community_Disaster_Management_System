import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component

const Hero = () => {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const toggleModal = () => {
    setShowModal(!showModal); // Toggle modal visibility
  };

  return (
    <section className="hero">
      <h1>Community Disaster Management System</h1>
      <p>Providing help and support during times of need</p>
      <button className="cta-button" onClick={toggleModal}>
        Get Involved
      </button>

      {/* Pass the modal visibility state and close function */}
      <Modal show={showModal} close={toggleModal} />
    </section>
  );
};

export default Hero;
